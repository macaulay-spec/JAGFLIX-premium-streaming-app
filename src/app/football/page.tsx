import { Dumbbell } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

export default function FootballPage() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 pb-20 pt-32 sm:px-6 lg:px-10">
      <div className="flex items-center gap-4"><Dumbbell className="text-[var(--brand)]" /><p className="text-sm font-black uppercase tracking-[0.35em] text-[var(--brand)]">Live football</p></div>
      <h1 className="mt-3 text-5xl font-black tracking-[-0.04em]">Matches and live streams</h1>
      <div className="mt-8"><EmptyState title="Awaiting football feed" description="Live matches, status, and stream URLs are displayed strictly from the official /api/football endpoint." /></div>
    </div>
  );
}
