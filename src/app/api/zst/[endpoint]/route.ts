import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isZstEndpoint, zstFetch, ZstApiError } from '@/lib/api/zst-client';

const querySchema = z.record(z.string().max(512));
const buckets = new Map<string, { count: number; resetAt: number }>();

const rateLimit = (request: NextRequest) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (bucket.count >= 120) return false;
  bucket.count += 1;
  return true;
};

export async function GET(request: NextRequest, context: { params: Promise<{ endpoint: string }> }) {
  const { endpoint } = await context.params;

  if (!isZstEndpoint(endpoint)) {
    return NextResponse.json({ error: 'Unsupported ZST endpoint.', code: 'UNSUPPORTED_ENDPOINT' }, { status: 404 });
  }

  if (!rateLimit(request)) {
    return NextResponse.json({ error: 'Too many requests. Please slow down.', code: 'RATE_LIMITED' }, { status: 429 });
  }

  const query = Object.fromEntries(request.nextUrl.searchParams.entries());
  const parsedQuery = querySchema.safeParse(query);
  if (!parsedQuery.success) {
    return NextResponse.json({ error: 'Invalid query parameters.', code: 'INVALID_QUERY' }, { status: 400 });
  }

  try {
    const envelope = await zstFetch({ endpoint, searchParams: request.nextUrl.searchParams, signal: request.signal });
    return NextResponse.json(envelope, {
      headers: {
        'Cache-Control': endpoint === 'media' ? 'no-store' : 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    if (error instanceof ZstApiError) {
      return NextResponse.json({ error: error.message, code: error.code }, { status: error.status });
    }
    return NextResponse.json({ error: 'Unexpected server error.', code: 'UNEXPECTED_ERROR' }, { status: 500 });
  }
}
