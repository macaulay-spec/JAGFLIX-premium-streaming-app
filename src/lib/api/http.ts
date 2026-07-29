import type { ApiEnvelope } from '@/types/common';
import type { ZstResponse } from '@/types/zst';

export async function bffGet(endpoint: string, params?: Record<string, string | number | boolean | undefined>): Promise<ApiEnvelope<ZstResponse>> {
  const url = new URL(`/api/zst/${endpoint}`, window.location.origin);
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== '') url.searchParams.set(key, String(value));
  });
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    const body = (await response.json().catch(() => ({ error: 'Request failed' }))) as { error?: string };
    throw new Error(body.error ?? 'Request failed');
  }
  return (await response.json()) as ApiEnvelope<ZstResponse>;
}
