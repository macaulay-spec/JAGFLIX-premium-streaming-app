import Image from 'next/image';
import Link from 'next/link';
import { Info, Play, Sparkles } from 'lucide-react';
import type { Movie } from '@/types/media';

export function Hero({ item }: { item?: Movie }) {
  const backdrop = item?.images.backdrop ?? item?.images.poster;
  return (
    <section className="relative min-h-[86svh] overflow-hidden px-4 pt-32 sm:px-6 lg:px-10">
      {backdrop ? <Image src={backdrop} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-60" /> : null}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(214,255,63,0.18),transparent_28rem),linear-gradient(90deg,rgba(5,6,10,0.96)_0%,rgba(5,6,10,0.72)_42%,rgba(5,6,10,0.4)_100%),linear-gradient(0deg,#05060a_0%,rgba(5,6,10,0)_42%)]" />
      <div className="mx-auto flex min-h-[70svh] max-w-7xl items-center">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/30 bg-[var(--brand)]/10 px-4 py-2 text-sm font-black text-[var(--brand)]">
            <Sparkles size={16} /> AI-curated cinematic premiere
          </div>
          <h1 className="text-5xl font-black tracking-[-0.05em] text-white sm:text-7xl lg:text-8xl">{item?.title ?? 'A faster, sharper way to stream.'}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{item?.synopsis ?? 'JagFlix blends a glassmorphic interface, bottom-first mobile navigation, secure server-side ZST API access, and a production streaming architecture built for premium playback.'}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={item ? `/watch/${encodeURIComponent(item.id)}` : '/search'} className="focus-ring inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-6 py-4 font-black text-black shadow-[0_0_44px_rgba(214,255,63,0.25)] transition hover:scale-[1.02]"><Play className="fill-black" size={19} /> Watch now</Link>
            <Link href={item ? `/details/${encodeURIComponent(item.id)}` : '/search'} className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-4 font-black text-white backdrop-blur transition hover:bg-white/15"><Info size={19} /> Details</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
