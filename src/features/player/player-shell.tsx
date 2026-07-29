'use client';

import { useQuery } from '@tanstack/react-query';
import { MediaPlayer, MediaProvider, Track } from '@vidstack/react';
import '@vidstack/react/player/styles/base.css';
import { AlertTriangle } from 'lucide-react';
import { getMedia } from '@/services/media.service';

export function PlayerShell({ itemId }: { itemId: string }) {
  const { data, isLoading, error } = useQuery({ queryKey: ['media', itemId], queryFn: () => getMedia(itemId) });
  const source = data?.sources[0];

  return (
    <div className="min-h-screen bg-black px-4 pb-24 pt-28 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl">
          {isLoading ? <div className="flex aspect-video items-center justify-center text-slate-400">Validating media sources…</div> : null}
          {error ? <div className="flex aspect-video flex-col items-center justify-center gap-3 text-rose-200"><AlertTriangle /> {error.message}</div> : null}
          {source ? (
            <MediaPlayer title="JagFlix playback" src={{ src: source.url, type: source.type === 'hls' ? 'application/x-mpegurl' : 'video/mp4' }} playsInline controls className="aspect-video w-full bg-black">
              <MediaProvider>
                {data.subtitles.map((subtitle) => <Track key={subtitle.url} src={subtitle.url} kind="subtitles" label={subtitle.label} lang={subtitle.language ?? 'en'} default={subtitle.default} />)}
              </MediaProvider>
            </MediaPlayer>
          ) : null}
          {!isLoading && !error && !source ? <div className="flex aspect-video items-center justify-center text-slate-400">No playable stream was returned by /api/media.</div> : null}
        </div>
        <p className="mt-4 text-sm text-slate-500">Playback uses item details → media validation → Vidstack. Downloads are enabled only when ZST returns download URLs.</p>
      </div>
    </div>
  );
}
