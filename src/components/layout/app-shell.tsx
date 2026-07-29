import { BottomNav } from './bottom-nav';
import { TopNav } from './top-nav';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-24 lg:pb-0">
      <TopNav />
      <main>{children}</main>
      <BottomNav />
    </div>
  );
}
