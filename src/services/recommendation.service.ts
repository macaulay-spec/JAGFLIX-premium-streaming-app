import { bffGet } from '@/lib/api/http';
import { normalizeRecommendations } from '@/lib/api/normalizers';
import type { Recommendation } from '@/types/media';

export async function getRecommendations(itemId?: string): Promise<Recommendation[]> {
  const envelope = await bffGet('recommendations', { id: itemId });
  return normalizeRecommendations(envelope.data);
}
