import { ZST_CACHE_SECONDS, ZST_ENDPOINTS, type ZstEndpoint } from '@/constants/api';
import { zstConfig } from '@/config/env';
import type { ApiEnvelope } from '@/types/common';
import type { ZstResponse } from '@/types/zst';

export const isZstEndpoint = (value: string): value is ZstEndpoint =>
  (ZST_ENDPOINTS as readonly string[]).includes(value);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class ZstApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string,
  ) {
    super(message);
    this.name = 'ZstApiError';
  }
}

export interface ZstFetchOptions {
  endpoint: ZstEndpoint;
  searchParams?: URLSearchParams;
  signal?: AbortSignal;
}

export async function zstFetch({ endpoint, searchParams, signal }: ZstFetchOptions): Promise<ApiEnvelope<ZstResponse>> {
  if (!zstConfig.apiKey) {
    throw new ZstApiError('ZST_API_KEY is not configured on the server.', 500, 'ZST_MISSING_API_KEY');
  }

  const url = new URL(`/api/${endpoint}`, zstConfig.baseUrl);
  searchParams?.forEach((value, key) => url.searchParams.append(key, value));

  let lastError: Error | undefined;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-api-key': zstConfig.apiKey,
          Accept: 'application/json',
        },
        cache: ZST_CACHE_SECONDS[endpoint] > 0 ? 'force-cache' : 'no-store',
        next: ZST_CACHE_SECONDS[endpoint] > 0 ? { revalidate: ZST_CACHE_SECONDS[endpoint] } : undefined,
        signal,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new ZstApiError(text || `ZST request failed with ${response.status}`, response.status, 'ZST_UPSTREAM_ERROR');
      }

      const data = (await response.json()) as ZstResponse;
      return { data, source: 'zst', cached: false, fetchedAt: new Date().toISOString() };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown ZST error');
      if (attempt < 2) await sleep(250 * 2 ** attempt);
    }
  }

  if (lastError instanceof ZstApiError) throw lastError;
  throw new ZstApiError(lastError?.message ?? 'ZST request failed', 502, 'ZST_FETCH_FAILED');
}
