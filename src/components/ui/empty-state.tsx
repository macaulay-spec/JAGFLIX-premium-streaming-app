import { RefreshCw } from 'lucide-react';

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="glass rounded-[2rem] p-8 text-center">
      <RefreshCw className="mx-auto mb-4 text-[var(--brand)]" />
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}
