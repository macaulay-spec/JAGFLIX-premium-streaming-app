import { ContentRow } from '@/components/media/content-row';
import { EmptyState } from '@/components/ui/empty-state';
import { Hero } from '@/features/home/hero';
import { getHomepage, getTrending } from '@/services/homepage.service';
import type { HomepageSection, Movie } from '@/types/media';

async function loadHome(): Promise<{ sections: HomepageSection[]; trending: Movie[]; error?: string }> {
  try {
    const [sections, trending] = await Promise.all([getHomepage(), getTrending().catch(() => [])]);
    return { sections, trending };
  } catch (error) {
    return { sections: [], trending: [], error: error instanceof Error ? error.message : 'Unable to load ZST content.' };
  }
}

export default async function HomePage() {
  const { sections, trending, error } = await loadHome();
  const heroItem = sections.find((section) => section.layout === 'hero')?.items[0] ?? trending[0];

  return (
    <>
      <Hero item={heroItem} />
      <div className="mx-auto max-w-[1800px] pb-16">
        {error ? <div className="px-4 sm:px-6 lg:px-10"><EmptyState title="Connect the official ZST Labs API" description="The interface is ready, but server-side ZST_API_KEY must be configured in your deployment environment before live catalog data can appear. The key is never exposed to the browser." /></div> : null}
        {trending.length > 0 ? <ContentRow title="Trending now" subtitle="Fast-moving titles from the official ZST feed." items={trending} /> : null}
        {sections.map((section) => (
          <ContentRow key={section.id} title={section.title} subtitle={section.subtitle} items={section.items} />
        ))}
      </div>
    </>
  );
}
