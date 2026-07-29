'use client';

import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { useDeferredValue, useState } from 'react';
import { MovieCard } from '@/components/media/movie-card';
import { Skeleton } from '@/components/ui/skeleton';
import { searchContent } from '@/services/search.service';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const { data, isLoading, error } = useQuery({
    queryKey: ['search', deferredQuery],
    queryFn: () => searchContent({ query: deferredQuery, page: 1 }),
    enabled: deferredQuery.trim().length > 1,
  });

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-10">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-[var(--brand)]">Instant search</p>
        <h1 className="mt-3 text-5xl font-black tracking-[-0.04em] sm:text-7xl">Find your next obsession.</h1>
      </div>
      <label className="glass mt-8 flex items-center gap-3 rounded-[2rem] px-5 py-4">
        <Search className="text-slate-400" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search movies, series, genres…" className="w-full bg-transparent text-lg outline-none placeholder:text-slate-500" />
      </label>
      <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-300">
        {['Newest', 'Most popular', 'Highest rated', 'Movies', 'Series', 'K-Drama', 'Anime'].map((filter) => <span key={filter} className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{filter}</span>)}
      </div>
      {isLoading ? <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">{Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} className="aspect-[2/3]" />)}</div> : null}
      {error ? <p className="mt-8 text-sm text-rose-300">{error.message}</p> : null}
      {data ? <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">{data.items.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div> : null}
    </div>
  );
}
