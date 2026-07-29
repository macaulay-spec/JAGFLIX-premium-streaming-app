import { bffGet } from '@/lib/api/http';
import { normalizeMediaPlayback } from '@/lib/api/normalizers';
import type { MediaPlayback } from '@/types/media';

export async function getMedia(itemId: string, episodeId?: string): Promise<MediaPlayback> {
  const envelope = await bffGet('media', { id: itemId, episodeId });
  return normalizeMediaPlayback(envelope.data, itemId);
}
