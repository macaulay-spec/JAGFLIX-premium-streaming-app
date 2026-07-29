import { Activity, BarChart3, Flag, Server, Users } from 'lucide-react';

export default function AdminPage() {
  const cards = [
    { title: 'Analytics', icon: BarChart3 },
    { title: 'Users', icon: Users },
    { title: 'Reports', icon: Flag },
    { title: 'API Monitoring', icon: Server },
    { title: 'Logs', icon: Activity },
  ];
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-10">
      <p className="text-sm font-black uppercase tracking-[0.35em] text-[var(--brand)]">Operations</p>
      <h1 className="mt-3 text-5xl font-black tracking-[-0.04em]">Admin command center</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map(({ title, icon: Icon }) => <div key={title} className="glass rounded-[2rem] p-6"><Icon className="text-[var(--brand)]" /><h2 className="mt-5 font-black">{title}</h2></div>)}
      </div>
    </div>
  );
}
