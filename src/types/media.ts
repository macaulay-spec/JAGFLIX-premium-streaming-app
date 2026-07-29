import type { ContentType, ImageSet, RatingSummary } from './common';

export interface Cast {
  id?: string;
  name: string;
  character?: string;
  image?: string;
}

export interface Crew {
  id?: string;
  name: string;
  job?: string;
  department?: string;
  image?: string;
}

export interface Subtitle {
  id?: string;
  label: string;
  language?: string;
  url: string;
  format?: 'vtt' | 'srt' | 'ass' | 'unknown';
  default?: boolean;
}

export interface MediaSource {
  id?: string;
  url: string;
  type: 'hls' | 'mp4' | 'dash' | 'unknown';
  quality?: string;
  bitrate?: number;
  width?: number;
  height?: number;
  headers?: Record<string, string>;
}

export interface DownloadSource {
  id?: string;
  url: string;
  quality?: string;
  sizeBytes?: number;
  mimeType?: string;
}

export interface Episode {
  id: string;
  title?: string;
  seasonNumber?: number;
  episodeNumber?: number;
  overview?: string;
  runtimeMinutes?: number;
  images?: ImageSet;
  releaseDate?: string;
}

export interface Season {
  id: string;
  seasonNumber?: number;
  title?: string;
  overview?: string;
  episodes: Episode[];
}

export interface Movie {
  id: string;
  title: string;
  contentType: ContentType;
  synopsis?: string;
  releaseDate?: string;
  year?: number;
  runtimeMinutes?: number;
  genres: string[];
  countries: string[];
  languages: string[];
  images: ImageSet;
  rating?: RatingSummary;
  cast: Cast[];
  crew: Crew[];
  trailerUrl?: string;
}

export interface Series extends Movie {
  contentType: 'series';
  seasons: Season[];
}

export interface MediaPlayback {
  itemId: string;
  sources: MediaSource[];
  subtitles: Subtitle[];
  downloads: DownloadSource[];
  introStartSeconds?: number;
  introEndSeconds?: number;
  creditsStartSeconds?: number;
}

export interface HomepageSection {
  id: string;
  title: string;
  subtitle?: string;
  layout: 'hero' | 'row' | 'grid' | 'collection';
  items: Movie[];
}

export interface Recommendation {
  reason?: string;
  item: Movie;
}

export interface FootballMatch {
  id: string;
  homeTeam?: string;
  awayTeam?: string;
  league?: string;
  status?: string;
  startTime?: string;
  streams: MediaSource[];
}
