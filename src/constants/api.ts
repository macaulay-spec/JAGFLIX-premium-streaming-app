export const ZST_ENDPOINTS = [
  'homepage',
  'search',
  'trending',
  'hot-movies-series',
  'item-details',
  'media',
  'recommendations',
  'popular-searches',
  'football',
] as const;

export type ZstEndpoint = (typeof ZST_ENDPOINTS)[number];

export const ZST_CACHE_SECONDS: Record<ZstEndpoint, number> = {
  homepage: 300,
  search: 60,
  trending: 600,
  'hot-movies-series': 600,
  'item-details': 86_400,
  media: 0,
  recommendations: 1_800,
  'popular-searches': 600,
  football: 20,
};
