import { bffGet } from '@/lib/api/http';
import { normalizeHomepage, normalizeMovieList } from '@/lib/api/normalizers';
import { zstFetch } from '@/lib/api/zst-client';
import type { HomepageSection, Movie } from '@/types/media';

export async function getHomepage(): Promise<HomepageSection[]> {
  const envelope = await zstFetch({ endpoint: 'homepage' });
  return normalizeHomepage(envelope.data);
}

export async function getHomepageClient(): Promise<HomepageSection[]> {
  const envelope = await bffGet('homepage');
  return normalizeHomepage(envelope.data);
}

export async function getTrending(): Promise<Movie[]> {
  const envelope = await zstFetch({ endpoint: 'trending' });
  return normalizeMovieList(envelope.data);
}
