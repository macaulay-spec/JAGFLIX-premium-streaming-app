import { PlayerShell } from '@/features/player/player-shell';

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PlayerShell itemId={id} />;
}
