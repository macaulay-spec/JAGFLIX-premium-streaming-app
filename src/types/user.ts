export interface User {
  id: string;
  email?: string;
  displayName?: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  name: string;
  avatarUrl?: string;
  maturityRating?: string;
  language?: string;
  isKids?: boolean;
}

export interface PlaybackProgress {
  userId: string;
  profileId?: string;
  itemId: string;
  episodeId?: string;
  positionSeconds: number;
  durationSeconds?: number;
  updatedAt: string;
}

export interface WatchHistory extends PlaybackProgress {
  completedAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body?: string;
  readAt?: string;
  createdAt: string;
}

export interface Settings {
  theme: 'system' | 'dark' | 'light';
  language: string;
  autoplay: boolean;
  subtitlesEnabled: boolean;
  subtitleSize: 'sm' | 'md' | 'lg' | 'xl';
  subtitleColor: string;
  subtitleBackgroundOpacity: number;
  privacyMode: boolean;
}
