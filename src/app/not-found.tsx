import Link from 'next/link';

export default function NotFound() {
  return <div className="flex min-h-screen items-center justify-center px-6 text-center"><div><h1 className="text-6xl font-black">404</h1><p className="mt-3 text-slate-400">This scene is not in the catalog.</p><Link className="mt-8 inline-flex rounded-full bg-[var(--brand)] px-6 py-3 font-black text-black" href="/">Go home</Link></div></div>;
}
