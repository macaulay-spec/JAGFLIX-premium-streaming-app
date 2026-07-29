import { DownloadCloud, HardDrive } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

export default function DownloadsPage() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 pb-20 pt-32 sm:px-6 lg:px-10">
      <p className="text-sm font-black uppercase tracking-[0.35em] text-[var(--brand)]">Offline mode</p>
      <h1 className="mt-3 text-5xl font-black tracking-[-0.04em]">Download manager</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {['Queued', 'Active', 'Completed'].map((title) => <div key={title} className="glass rounded-[2rem] p-6"><DownloadCloud className="text-[var(--brand)]" /><h2 className="mt-5 text-2xl font-black">{title}</h2><p className="mt-2 text-sm text-slate-400">Automatically enabled only when /api/media returns download URLs.</p></div>)}
      </div>
      <div className="mt-8"><EmptyState title="No downloads available" description="JagFlix never fakes downloads. Download controls stay disabled until official downloadable sources are returned." /></div>
      <div className="mt-4 flex items-center gap-2 text-sm text-slate-500"><HardDrive size={16} /> IndexedDB, Cache Storage, background sync, pause/resume queue architecture prepared.</div>
    </div>
  );
}
