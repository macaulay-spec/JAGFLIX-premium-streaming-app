import type { Movie } from '@/types/media';
import { MovieCard } from './movie-card';

export function ContentRow({ title, subtitle, items }: { title: string; subtitle?: string; items: Movie[] }) {
  if (items.length === 0) return null;
  return (
    <section className="py-7">
      <div className="mb-4 flex items-end justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <div>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
        </div>
      </div>
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-10">
        {items.map((movie, index) => (
          <MovieCard key={`${movie.id}-${index}`} movie={movie} priority={index < 3} />
        ))}
      </div>
    </section>
  );
}
