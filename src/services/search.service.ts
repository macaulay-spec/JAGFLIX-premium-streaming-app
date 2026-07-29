import { bffGet } from '@/lib/api/http';
import { normalizePaginatedMovies } from '@/lib/api/normalizers';
import type { PaginatedResult } from '@/types/common';
import type { Movie } from '@/types/media';

export interface SearchParams {
  query?: string;
  page?: number;
  type?: 'movie' | 'series';
  genre?: string;
  year?: number;
  language?: string;
  rating?: string;
  popularity?: string;
  country?: string;
  sort?: 'newest' | 'oldest' | 'popular' | 'rated';
}

export async function searchContent(params: SearchParams): Promise<PaginatedResult<Movie>> {
  const queryParams: Record<string, string | number | boolean | undefined> = { ...params };
  const envelope = await bffGet('search', queryParams);
  return normalizePaginatedMovies(envelope.data);
}
