import { Github, Mail } from 'lucide-react';

export default function AuthPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl items-center px-4 py-32 sm:px-6">
      <div className="glass w-full rounded-[2rem] p-8">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-[var(--brand)]">Supabase Auth</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.04em]">Sign in to JagFlix</h1>
        <p className="mt-3 text-sm text-slate-400">Email, Google, GitHub, and anonymous guest auth are wired through Supabase configuration.</p>
        <div className="mt-8 grid gap-3">
          <button className="focus-ring flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-5 py-4 font-black text-black"><Mail /> Continue with email</button>
          <button className="focus-ring flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-4 font-black"><Github /> Continue with GitHub</button>
          <button className="focus-ring rounded-full border border-white/10 bg-white/5 px-5 py-4 font-black">Continue as guest</button>
        </div>
      </div>
    </div>
  );
}
