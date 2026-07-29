import type { PlaybackProgress } from '@/types/user';

const key = 'jagflix:playback-progress';

export function savePlaybackProgress(progress: PlaybackProgress): void {
  if (typeof window === 'undefined') return;
  const current = getPlaybackProgress();
  const next = current.filter((item) => !(item.itemId === progress.itemId && item.episodeId === progress.episodeId));
  next.unshift(progress);
  window.localStorage.setItem(key, JSON.stringify(next.slice(0, 100)));
}

export function getPlaybackProgress(): PlaybackProgress[] {
  if (typeof window === 'undefined') return [];
  try {
    const value = window.localStorage.getItem(key);
    if (!value) return [];
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? parsed.filter(isPlaybackProgress) : [];
  } catch {
    return [];
  }
}

const isPlaybackProgress = (value: unknown): value is PlaybackProgress =>
  typeof value === 'object' && value !== null && 'itemId' in value && 'positionSeconds' in value && 'updatedAt' in value;
