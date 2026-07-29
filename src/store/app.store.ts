import { create } from 'zustand';
import type { Settings } from '@/types/user';
import { defaultSettings } from '@/services/user.service';

interface AppState {
  settings: Settings;
  activeProfileId?: string;
  setActiveProfileId: (profileId: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  settings: defaultSettings,
  activeProfileId: undefined,
  setActiveProfileId: (profileId) => set({ activeProfileId: profileId }),
  updateSettings: (settings) => set((state) => ({ settings: { ...state.settings, ...settings } })),
}));
