import { Clapperboard, KeyRound, UserRound } from 'lucide-react';

export default function AuthPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl items-center px-4 py-32 sm:px-6">
      <div className="glass w-full rounded-[2rem] p-8">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-[var(--brand)]">Local-first access</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.04em]">Enter JagFlix</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Supabase has been removed. JagFlix now runs with local guest profiles, browser storage, and the secure server-side ZST movie API proxy.
        </p>
        <div className="mt-8 grid gap-3">
          <button className="focus-ring flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-5 py-4 font-black text-black"><UserRound /> Continue as guest</button>
          <button className="focus-ring flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-4 font-black"><Clapperboard /> Create local profile</button>
          <button className="focus-ring flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-4 font-black text-slate-300"><KeyRound /> Sync account coming later</button>
        </div>
      </div>
    </div>
  );
}
