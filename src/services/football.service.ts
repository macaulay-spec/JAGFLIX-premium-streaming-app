import { bffGet } from '@/lib/api/http';
import { normalizeFootball } from '@/lib/api/normalizers';
import type { FootballMatch } from '@/types/media';

export async function getFootball(): Promise<FootballMatch[]> {
  const envelope = await bffGet('football');
  return normalizeFootball(envelope.data);
}
