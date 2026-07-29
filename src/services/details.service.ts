import { bffGet } from '@/lib/api/http';
import { normalizeMovie, normalizeSeasons } from '@/lib/api/normalizers';
import type { Movie, Season, Series } from '@/types/media';

export interface ItemDetails extends Movie {
  seasons?: Season[];
}

export async function getItemDetails(id: string): Promise<ItemDetails | undefined> {
  const envelope = await bffGet('item-details', { id });
  const movie = normalizeMovie(envelope.data);
  if (!movie) return undefined;
  const seasons = normalizeSeasons(envelope.data);
  if (seasons.length > 0) return { ...movie, contentType: 'series', seasons } satisfies Series;
  return movie;
}
