import type { ContentType, ImageSet, PaginatedResult } from '@/types/common';
import type { Cast, Crew, DownloadSource, Episode, FootballMatch, HomepageSection, MediaPlayback, MediaSource, Movie, Recommendation, Season, Subtitle } from '@/types/media';
import { getArray, getNumber, getRecord, getString, isRecord } from '@/utils/object';

const contentTypeFrom = (value?: string): ContentType => {
  const normalized = value?.toLowerCase();
  if (normalized === 'movie' || normalized === 'series' || normalized === 'episode' || normalized === 'season' || normalized === 'collection') return normalized;
  return 'unknown';
};

const maybeUrl = (value?: string): string | undefined => (value?.startsWith('http://') || value?.startsWith('https://') ? value : undefined);

export const normalizeImages = (raw: Record<string, unknown>): ImageSet => {
  const imageRecord = getRecord(raw, ['images', 'image', 'posterImage', 'media']) ?? raw;
  return {
    poster: maybeUrl(getString(imageRecord, ['poster', 'posterUrl', 'poster_url', 'image', 'cover', 'thumbnail'])) ?? maybeUrl(getString(raw, ['poster', 'posterUrl', 'poster_path', 'image'])) ,
    backdrop: maybeUrl(getString(imageRecord, ['backdrop', 'backdropUrl', 'backdrop_url', 'banner', 'hero'])) ?? maybeUrl(getString(raw, ['backdrop', 'backdropUrl', 'banner'])) ,
    logo: maybeUrl(getString(imageRecord, ['logo', 'logoUrl'])) ?? maybeUrl(getString(raw, ['logo', 'logoUrl'])) ,
    thumbnail: maybeUrl(getString(imageRecord, ['thumbnail', 'thumb', 'still'])) ?? maybeUrl(getString(raw, ['thumbnail', 'thumb'])) ,
    blurHash: getString(imageRecord, ['blurHash', 'blurhash']),
  };
};

const normalizePerson = (value: unknown): Cast | Crew | undefined => {
  if (!isRecord(value)) return undefined;
  const name = getString(value, ['name', 'fullName', 'title']);
  if (!name) return undefined;
  return {
    id: getString(value, ['id', '_id', 'personId']),
    name,
    character: getString(value, ['character', 'role', 'as']),
    job: getString(value, ['job', 'known_for_department']),
    department: getString(value, ['department']),
    image: maybeUrl(getString(value, ['image', 'profile', 'avatar'])),
  };
};

export const normalizeMovie = (value: unknown): Movie | undefined => {
  if (!isRecord(value)) return undefined;
  const id = getString(value, ['id', '_id', 'tmdbId', 'imdbId', 'slug', 'movieId', 'seriesId']);
  const title = getString(value, ['title', 'name', 'originalTitle', 'original_name']);
  if (!id || !title) return undefined;
  const year = getNumber(value, ['year', 'releaseYear']);
  return {
    id,
    title,
    contentType: contentTypeFrom(getString(value, ['type', 'contentType', 'mediaType', 'category'])),
    synopsis: getString(value, ['synopsis', 'overview', 'description', 'plot']),
    releaseDate: getString(value, ['releaseDate', 'release_date', 'first_air_date', 'date']),
    year,
    runtimeMinutes: getNumber(value, ['runtime', 'runtimeMinutes', 'duration', 'durationMinutes']),
    genres: getArray(value, ['genres', 'genre']).filter((item): item is string => typeof item === 'string'),
    countries: getArray(value, ['countries', 'country']).filter((item): item is string => typeof item === 'string'),
    languages: getArray(value, ['languages', 'language']).filter((item): item is string => typeof item === 'string'),
    images: normalizeImages(value),
    rating: {
      average: getNumber(value, ['rating', 'vote_average', 'score', 'imdbRating']),
      count: getNumber(value, ['ratingCount', 'vote_count']),
      source: getString(value, ['ratingSource']),
    },
    cast: getArray(value, ['cast', 'actors']).map(normalizePerson).filter((item): item is Cast => Boolean(item?.name)),
    crew: getArray(value, ['crew']).map(normalizePerson).filter((item): item is Crew => Boolean(item?.name)),
    trailerUrl: maybeUrl(getString(value, ['trailer', 'trailerUrl', 'trailer_url'])),
  };
};

export const extractItems = (payload: unknown): unknown[] => {
  if (Array.isArray(payload)) return payload;
  if (!isRecord(payload)) return [];
  for (const key of ['items', 'results', 'data', 'movies', 'series', 'content', 'list']) {
    const value = payload[key];
    if (Array.isArray(value)) return value;
    if (isRecord(value)) {
      const nested = extractItems(value);
      if (nested.length > 0) return nested;
    }
  }
  return [];
};

export const normalizeMovieList = (payload: unknown): Movie[] => extractItems(payload).map(normalizeMovie).filter((item): item is Movie => Boolean(item));

export const normalizePaginatedMovies = (payload: unknown): PaginatedResult<Movie> => {
  const record = isRecord(payload) ? payload : {};
  return {
    items: normalizeMovieList(payload),
    page: getNumber(record, ['page', 'currentPage']),
    totalPages: getNumber(record, ['totalPages', 'pages']),
    totalResults: getNumber(record, ['totalResults', 'total', 'count']),
    hasMore: typeof record.hasMore === 'boolean' ? record.hasMore : undefined,
  };
};

export const normalizeHomepage = (payload: unknown): HomepageSection[] => {
  if (!isRecord(payload)) return [{ id: 'featured', title: 'Featured', layout: 'hero', items: normalizeMovieList(payload) }];
  const candidates = getArray(payload, ['sections', 'shelves', 'rows', 'homepage']);
  if (candidates.length === 0) {
    const fallbackSections: HomepageSection[] = [
      { id: 'hero', title: 'Featured', layout: 'hero', items: normalizeMovieList(payload).slice(0, 8) },
      { id: 'all', title: 'Popular Now', layout: 'row', items: normalizeMovieList(payload) },
    ];
    return fallbackSections.filter((section) => section.items.length > 0);
  }
  return candidates
    .map((section, index): HomepageSection | undefined => {
      if (!isRecord(section)) return undefined;
      const title = getString(section, ['title', 'name', 'label']) ?? `Shelf ${index + 1}`;
      return {
        id: getString(section, ['id', 'slug']) ?? title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title,
        subtitle: getString(section, ['subtitle', 'description']),
        layout: index === 0 ? 'hero' : 'row',
        items: normalizeMovieList(section),
      };
    })
    .filter((section): section is HomepageSection => Boolean(section && section.items.length > 0));
};

const normalizeSourceType = (url: string): MediaSource['type'] => {
  if (url.includes('.m3u8')) return 'hls';
  if (url.includes('.mp4')) return 'mp4';
  if (url.includes('.mpd')) return 'dash';
  return 'unknown';
};

const normalizeMediaSource = (value: unknown): MediaSource | undefined => {
  if (typeof value === 'string') return { url: value, type: normalizeSourceType(value) };
  if (!isRecord(value)) return undefined;
  const url = getString(value, ['url', 'file', 'src', 'link']);
  if (!url) return undefined;
  return {
    id: getString(value, ['id']),
    url,
    type: normalizeSourceType(url),
    quality: getString(value, ['quality', 'label', 'resolution']),
    bitrate: getNumber(value, ['bitrate']),
    width: getNumber(value, ['width']),
    height: getNumber(value, ['height']),
  };
};

const normalizeSubtitle = (value: unknown): Subtitle | undefined => {
  if (!isRecord(value)) return undefined;
  const url = getString(value, ['url', 'file', 'src']);
  if (!url) return undefined;
  return {
    id: getString(value, ['id']),
    label: getString(value, ['label', 'language', 'lang']) ?? 'Subtitle',
    language: getString(value, ['language', 'lang', 'srclang']),
    url,
    format: url.endsWith('.vtt') ? 'vtt' : url.endsWith('.srt') ? 'srt' : url.endsWith('.ass') ? 'ass' : 'unknown',
    default: typeof value.default === 'boolean' ? value.default : undefined,
  };
};

const normalizeDownload = (value: unknown): DownloadSource | undefined => {
  if (!isRecord(value)) return undefined;
  const url = getString(value, ['url', 'file', 'src', 'link']);
  if (!url) return undefined;
  return {
    id: getString(value, ['id']),
    url,
    quality: getString(value, ['quality', 'label']),
    sizeBytes: getNumber(value, ['sizeBytes', 'size']),
    mimeType: getString(value, ['mimeType', 'type']),
  };
};

export const normalizeMediaPlayback = (payload: unknown, itemId = 'unknown'): MediaPlayback => {
  const record = isRecord(payload) ? payload : {};
  return {
    itemId: getString(record, ['itemId', 'id', 'movieId', 'seriesId']) ?? itemId,
    sources: getArray(record, ['sources', 'streams', 'videos', 'media']).map(normalizeMediaSource).filter((item): item is MediaSource => Boolean(item)),
    subtitles: getArray(record, ['subtitles', 'tracks', 'captions']).map(normalizeSubtitle).filter((item): item is Subtitle => Boolean(item)),
    downloads: getArray(record, ['downloads', 'downloadUrls']).map(normalizeDownload).filter((item): item is DownloadSource => Boolean(item)),
    introStartSeconds: getNumber(record, ['introStartSeconds']),
    introEndSeconds: getNumber(record, ['introEndSeconds']),
    creditsStartSeconds: getNumber(record, ['creditsStartSeconds']),
  };
};

export const normalizeRecommendations = (payload: unknown): Recommendation[] =>
  normalizeMovieList(payload).map((item) => ({ item }));

export const normalizeEpisode = (value: unknown): Episode | undefined => {
  if (!isRecord(value)) return undefined;
  const id = getString(value, ['id', '_id', 'episodeId']);
  if (!id) return undefined;
  return {
    id,
    title: getString(value, ['title', 'name']),
    seasonNumber: getNumber(value, ['seasonNumber', 'season']),
    episodeNumber: getNumber(value, ['episodeNumber', 'episode']),
    overview: getString(value, ['overview', 'synopsis', 'description']),
    runtimeMinutes: getNumber(value, ['runtime', 'runtimeMinutes', 'duration']),
    images: normalizeImages(value),
    releaseDate: getString(value, ['releaseDate', 'airDate']),
  };
};

export const normalizeSeasons = (payload: unknown): Season[] => {
  if (!isRecord(payload)) return [];
  return getArray(payload, ['seasons']).map((value, index): Season | undefined => {
    if (!isRecord(value)) return undefined;
    const id = getString(value, ['id', '_id']) ?? `season-${index + 1}`;
    return {
      id,
      seasonNumber: getNumber(value, ['seasonNumber', 'season']) ?? index + 1,
      title: getString(value, ['title', 'name']),
      overview: getString(value, ['overview', 'description']),
      episodes: getArray(value, ['episodes']).map(normalizeEpisode).filter((episode): episode is Episode => Boolean(episode)),
    };
  }).filter((season): season is Season => Boolean(season));
};

export const normalizeFootball = (payload: unknown): FootballMatch[] => extractItems(payload).map((value): FootballMatch | undefined => {
  if (!isRecord(value)) return undefined;
  const id = getString(value, ['id', '_id', 'matchId']);
  if (!id) return undefined;
  return {
    id,
    homeTeam: getString(value, ['homeTeam', 'home']),
    awayTeam: getString(value, ['awayTeam', 'away']),
    league: getString(value, ['league', 'competition']),
    status: getString(value, ['status', 'state']),
    startTime: getString(value, ['startTime', 'date', 'kickoff']),
    streams: getArray(value, ['streams', 'sources']).map(normalizeMediaSource).filter((source): source is MediaSource => Boolean(source)),
  };
}).filter((match): match is FootballMatch => Boolean(match));
