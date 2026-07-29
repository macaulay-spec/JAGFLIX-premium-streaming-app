import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import type { Movie } from '@/types/media';

export function MovieCard({ movie, priority = false }: { movie: Movie; priority?: boolean }) {
  const image = movie.images.poster ?? movie.images.backdrop;
  return (
    <Link href={`/details/${encodeURIComponent(movie.id)}`} className="focus-ring group block min-w-[154px] overflow-hidden rounded-[1.45rem] sm:min-w-[190px]">
      <div className="relative aspect-[2/3] overflow-hidden rounded-[1.45rem] bg-white/10">
        {image ? (
          <Image src={image} alt="" fill sizes="(max-width: 768px) 42vw, 190px" priority={priority} className="object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 p-4 text-center text-sm font-black text-slate-400">{movie.title}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
        {movie.rating?.average ? (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/65 px-2 py-1 text-xs font-bold backdrop-blur">
            <Star size={12} className="fill-[var(--brand)] text-[var(--brand)]" /> {movie.rating.average.toFixed(1)}
          </div>
        ) : null}
      </div>
      <div className="px-1 py-3">
        <h3 className="line-clamp-1 font-bold tracking-tight">{movie.title}</h3>
        <p className="mt-1 text-xs text-slate-400">{[movie.year, movie.contentType !== 'unknown' ? movie.contentType : undefined].filter(Boolean).join(' • ')}</p>
      </div>
    </Link>
  );
}
