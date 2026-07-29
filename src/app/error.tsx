'use client';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return <div className="flex min-h-screen items-center justify-center px-6 text-center"><div><h1 className="text-4xl font-black">Something went wrong</h1><p className="mt-3 text-slate-400">{error.message}</p><button onClick={reset} className="mt-8 rounded-full bg-[var(--brand)] px-6 py-3 font-black text-black">Retry</button></div></div>;
}
