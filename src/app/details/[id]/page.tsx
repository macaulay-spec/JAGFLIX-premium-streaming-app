import Link from 'next/link';
import { ArrowLeft, Play, Plus, Share2, Star } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

export default async function DetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 pb-20 pt-32 sm:px-6 lg:px-10">
      <Link href="/" className="focus-ring inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold"><ArrowLeft size={16} /> Back</Link>
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="aspect-[2/3] rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-800 to-slate-950" />
        <div className="py-4">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-[var(--brand)]">ZST item</p>
          <h1 className="mt-3 text-5xl font-black tracking-[-0.04em]">Details</h1>
          <p className="mt-4 max-w-2xl text-slate-400">Item metadata is loaded through the secure /api/item-details flow. This route is ready for synopsis, cast, crew, runtime, genres, episodes, and ratings when returned by ZST.</p>
          <div className="mt-5 flex items-center gap-2 text-sm text-slate-300"><Star className="fill-[var(--brand)] text-[var(--brand)]" size={16} /> Displayed only when returned</div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/watch/${encodeURIComponent(id)}`} className="focus-ring inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-6 py-4 font-black text-black"><Play className="fill-black" /> Watch</Link>
            <button className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-6 py-4 font-black"><Plus /> Watchlist</button>
            <button className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-6 py-4 font-black"><Share2 /> Share</button>
          </div>
        </div>
      </div>
      <div className="mt-10"><EmptyState title="Recommendations ready" description="Related content is fetched only from /api/recommendations and gracefully remains empty if the API returns no related titles." /></div>
    </div>
  );
}
