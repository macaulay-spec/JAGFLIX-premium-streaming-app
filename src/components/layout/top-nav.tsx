import Link from 'next/link';
import { Search, Shield, Sparkles } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Search' },
  { href: '/football', label: 'Live Sports' },
  { href: '/admin', label: 'Admin' },
];

export function TopNav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-10">
      <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-full" aria-label="JagFlix home">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--brand)] text-black shadow-[0_0_38px_rgba(214,255,63,0.36)]">
            <Sparkles size={20} />
          </span>
          <span className="text-lg font-black tracking-tight">JagFlix</span>
        </Link>
        <div className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
          {links.map((link) => (
            <Link className="focus-ring rounded-full transition hover:text-white" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link href="/search" className="focus-ring hidden rounded-full bg-white/10 p-3 transition hover:bg-white/15 sm:block" aria-label="Search">
            <Search size={18} />
          </Link>
          <Link href="/auth" className="focus-ring flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-black transition hover:bg-[var(--brand)]">
            <Shield size={16} /> Sign in
          </Link>
        </div>
      </nav>
    </header>
  );
}
