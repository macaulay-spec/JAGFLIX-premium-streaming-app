import type { User } from '@/types/user';

const guestKey = 'jagflix:guest-user';

export interface LocalAuthSession {
  user: User;
  provider: 'guest' | 'local';
  createdAt: string;
}

export function createGuestSession(displayName = 'Guest'): LocalAuthSession {
  const session: LocalAuthSession = {
    user: {
      id: `guest-${globalThis.crypto?.randomUUID?.() ?? Date.now().toString(36)}`,
      displayName,
      createdAt: new Date().toISOString(),
    },
    provider: 'guest',
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(guestKey, JSON.stringify(session));
  }

  return session;
}

export function getLocalSession(): LocalAuthSession | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = window.localStorage.getItem(guestKey);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as unknown;
    if (!isLocalAuthSession(parsed)) return undefined;
    return parsed;
  } catch {
    return undefined;
  }
}

export function clearLocalSession(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(guestKey);
}

const isLocalAuthSession = (value: unknown): value is LocalAuthSession => {
  if (typeof value !== 'object' || value === null) return false;
  const maybe = value as Partial<LocalAuthSession>;
  return typeof maybe.createdAt === 'string' && typeof maybe.user?.id === 'string';
};
