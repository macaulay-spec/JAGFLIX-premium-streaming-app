'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Download, UserRound, Dumbbell } from 'lucide-react';
import clsx from 'clsx';

const items = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/search', label: 'Search', Icon: Search },
  { href: '/football', label: 'Sports', Icon: Dumbbell },
  { href: '/downloads', label: 'Downloads', Icon: Download },
  { href: '/profile', label: 'Profile', Icon: UserRound },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-3 left-3 right-3 z-50 rounded-[2rem] border border-white/10 bg-slate-950/88 p-2 shadow-2xl backdrop-blur-2xl lg:hidden" aria-label="Primary mobile navigation">
      <div className="grid grid-cols-5 gap-1">
        {items.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className={clsx('focus-ring flex flex-col items-center gap-1 rounded-3xl px-2 py-2 text-[0.68rem] font-bold transition', active ? 'bg-[var(--brand)] text-black' : 'text-slate-400 hover:bg-white/10 hover:text-white')}>
              <Icon size={19} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
