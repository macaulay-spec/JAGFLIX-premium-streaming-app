import { Bell, Heart, History, Settings, UserRound } from 'lucide-react';

export default function ProfilePage() {
  const cards = [
    { title: 'Profiles', icon: UserRound },
    { title: 'Continue Watching', icon: History },
    { title: 'Favorites', icon: Heart },
    { title: 'Notifications', icon: Bell },
    { title: 'Settings', icon: Settings },
  ];
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 pb-20 pt-32 sm:px-6 lg:px-10">
      <h1 className="text-5xl font-black tracking-[-0.04em]">Your space</h1>
      <p className="mt-4 max-w-2xl text-slate-400">Supabase-backed profiles, playback history, watchlist, favorites, ratings, reviews, notifications, AI preferences, and privacy settings.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ title, icon: Icon }) => <div key={title} className="glass rounded-[2rem] p-6"><Icon className="text-[var(--brand)]" /><h2 className="mt-5 text-xl font-black">{title}</h2></div>)}
      </div>
    </div>
  );
}
