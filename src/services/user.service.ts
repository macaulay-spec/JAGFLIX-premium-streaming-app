import type { Settings, UserProfile } from '@/types/user';

export const defaultSettings: Settings = {
  theme: 'dark',
  language: 'en',
  autoplay: true,
  subtitlesEnabled: true,
  subtitleSize: 'md',
  subtitleColor: '#ffffff',
  subtitleBackgroundOpacity: 0.55,
  privacyMode: false,
};

export function createGuestProfile(): UserProfile {
  return {
    id: 'guest',
    userId: 'anonymous',
    name: 'Guest',
    language: defaultSettings.language,
  };
}
