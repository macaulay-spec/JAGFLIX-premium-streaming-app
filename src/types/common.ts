export type ContentType = 'movie' | 'series' | 'episode' | 'season' | 'collection' | 'unknown';

export interface ImageSet {
  poster?: string;
  backdrop?: string;
  logo?: string;
  thumbnail?: string;
  blurHash?: string;
}

export interface RatingSummary {
  average?: number;
  count?: number;
  source?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  page?: number;
  totalPages?: number;
  totalResults?: number;
  hasMore?: boolean;
}

export interface ApiEnvelope<T> {
  data: T;
  source: 'zst';
  cached: boolean;
  fetchedAt: string;
}

export interface ApiErrorBody {
  error: string;
  code: string;
  details?: string;
}
