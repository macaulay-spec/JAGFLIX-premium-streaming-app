-- JagFlix core production schema for Supabase Auth.
-- Safe to run repeatedly through Supabase migrations.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.viewer_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  avatar_url text,
  maturity_rating text,
  language text not null default 'en',
  is_kids boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists viewer_profiles_user_name_idx on public.viewer_profiles(user_id, lower(name));
create index if not exists viewer_profiles_user_id_idx on public.viewer_profiles(user_id);

drop trigger if exists viewer_profiles_set_updated_at on public.viewer_profiles;
create trigger viewer_profiles_set_updated_at
before update on public.viewer_profiles
for each row execute function public.set_updated_at();

create table if not exists public.playback_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  profile_id uuid references public.viewer_profiles(id) on delete cascade,
  item_id text not null,
  episode_id text,
  position_seconds integer not null default 0 check (position_seconds >= 0),
  duration_seconds integer check (duration_seconds is null or duration_seconds >= 0),
  progress_percent numeric(5,2) generated always as (
    case
      when duration_seconds is null or duration_seconds <= 0 then null
      else least(100, round((position_seconds::numeric / duration_seconds::numeric) * 100, 2))
    end
  ) stored,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, profile_id, item_id, episode_id)
);

create index if not exists playback_history_continue_idx on public.playback_history(user_id, profile_id, updated_at desc)
where completed_at is null;
create index if not exists playback_history_item_idx on public.playback_history(item_id);

drop trigger if exists playback_history_set_updated_at on public.playback_history;
create trigger playback_history_set_updated_at
before update on public.playback_history
for each row execute function public.set_updated_at();

create table if not exists public.watchlist (
  user_id uuid not null references auth.users(id) on delete cascade,
  profile_id uuid references public.viewer_profiles(id) on delete cascade,
  item_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, profile_id, item_id)
);

create index if not exists watchlist_profile_created_idx on public.watchlist(profile_id, created_at desc);

create table if not exists public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  profile_id uuid references public.viewer_profiles(id) on delete cascade,
  item_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, profile_id, item_id)
);

create index if not exists favorites_profile_created_idx on public.favorites(profile_id, created_at desc);

create table if not exists public.ratings (
  user_id uuid not null references auth.users(id) on delete cascade,
  profile_id uuid references public.viewer_profiles(id) on delete cascade,
  item_id text not null,
  rating numeric(3,1) not null check (rating >= 0 and rating <= 10),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, profile_id, item_id)
);

create index if not exists ratings_item_idx on public.ratings(item_id, rating desc);

drop trigger if exists ratings_set_updated_at on public.ratings;
create trigger ratings_set_updated_at
before update on public.ratings
for each row execute function public.set_updated_at();

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  profile_id uuid references public.viewer_profiles(id) on delete cascade,
  item_id text not null,
  body text not null check (char_length(body) between 1 and 5000),
  is_spoiler boolean not null default false,
  is_reported boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists reviews_item_created_idx on public.reviews(item_id, created_at desc);
create index if not exists reviews_user_created_idx on public.reviews(user_id, created_at desc);

drop trigger if exists reviews_set_updated_at on public.reviews;
create trigger reviews_set_updated_at
before update on public.reviews
for each row execute function public.set_updated_at();

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 160),
  body text,
  kind text not null default 'system',
  action_url text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_unread_idx on public.notifications(user_id, created_at desc)
where read_at is null;

create table if not exists public.ai_preferences (
  user_id uuid not null references auth.users(id) on delete cascade,
  profile_id uuid references public.viewer_profiles(id) on delete cascade,
  preferred_genres text[] not null default '{}',
  preferred_languages text[] not null default '{}',
  disliked_genres text[] not null default '{}',
  content_safety_level text not null default 'balanced',
  personalization_enabled boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (user_id, profile_id)
);

drop trigger if exists ai_preferences_set_updated_at on public.ai_preferences;
create trigger ai_preferences_set_updated_at
before update on public.ai_preferences
for each row execute function public.set_updated_at();

create table if not exists public.user_settings (
  user_id uuid not null references auth.users(id) on delete cascade,
  profile_id uuid references public.viewer_profiles(id) on delete cascade,
  theme text not null default 'dark' check (theme in ('system', 'dark', 'light')),
  language text not null default 'en',
  autoplay boolean not null default true,
  subtitles_enabled boolean not null default true,
  subtitle_size text not null default 'md' check (subtitle_size in ('sm', 'md', 'lg', 'xl')),
  subtitle_color text not null default '#ffffff',
  subtitle_background_opacity numeric(3,2) not null default 0.55 check (subtitle_background_opacity >= 0 and subtitle_background_opacity <= 1),
  privacy_mode boolean not null default false,
  extra jsonb not null default '{}',
  updated_at timestamptz not null default now(),
  primary key (user_id, profile_id)
);

drop trigger if exists user_settings_set_updated_at on public.user_settings;
create trigger user_settings_set_updated_at
before update on public.user_settings
for each row execute function public.set_updated_at();

create table if not exists public.download_queue (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  profile_id uuid references public.viewer_profiles(id) on delete cascade,
  item_id text not null,
  episode_id text,
  source_url text not null,
  quality text,
  status text not null default 'queued' check (status in ('queued', 'downloading', 'paused', 'completed', 'failed', 'cancelled')),
  progress_percent numeric(5,2) not null default 0 check (progress_percent >= 0 and progress_percent <= 100),
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists download_queue_user_status_idx on public.download_queue(user_id, profile_id, status, updated_at desc);

drop trigger if exists download_queue_set_updated_at on public.download_queue;
create trigger download_queue_set_updated_at
before update on public.download_queue
for each row execute function public.set_updated_at();

create or replace view public.item_rating_summary as
select
  item_id,
  round(avg(rating), 2) as average_rating,
  count(*)::integer as rating_count
from public.ratings
group by item_id;

alter table public.viewer_profiles enable row level security;
alter table public.playback_history enable row level security;
alter table public.watchlist enable row level security;
alter table public.favorites enable row level security;
alter table public.ratings enable row level security;
alter table public.reviews enable row level security;
alter table public.notifications enable row level security;
alter table public.ai_preferences enable row level security;
alter table public.user_settings enable row level security;
alter table public.download_queue enable row level security;

-- Owner-only policies for private user data.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'viewer_profiles', 'playback_history', 'watchlist', 'favorites', 'ratings',
    'notifications', 'ai_preferences', 'user_settings', 'download_queue'
  ] loop
    execute format('drop policy if exists "%1$s_select_own" on public.%1$I', table_name);
    execute format('create policy "%1$s_select_own" on public.%1$I for select using (auth.uid() = user_id)', table_name);
    execute format('drop policy if exists "%1$s_insert_own" on public.%1$I', table_name);
    execute format('create policy "%1$s_insert_own" on public.%1$I for insert with check (auth.uid() = user_id)', table_name);
    execute format('drop policy if exists "%1$s_update_own" on public.%1$I', table_name);
    execute format('create policy "%1$s_update_own" on public.%1$I for update using (auth.uid() = user_id) with check (auth.uid() = user_id)', table_name);
    execute format('drop policy if exists "%1$s_delete_own" on public.%1$I', table_name);
    execute format('create policy "%1$s_delete_own" on public.%1$I for delete using (auth.uid() = user_id)', table_name);
  end loop;
end $$;

-- Reviews can be read by authenticated users, but edited only by their author.
drop policy if exists "reviews_select_authenticated" on public.reviews;
create policy "reviews_select_authenticated" on public.reviews
for select to authenticated using (true);

drop policy if exists "reviews_insert_own" on public.reviews;
create policy "reviews_insert_own" on public.reviews
for insert with check (auth.uid() = user_id);

drop policy if exists "reviews_update_own" on public.reviews;
create policy "reviews_update_own" on public.reviews
for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "reviews_delete_own" on public.reviews;
create policy "reviews_delete_own" on public.reviews
for delete using (auth.uid() = user_id);

grant usage on schema public to anon, authenticated;
grant select on public.item_rating_summary to anon, authenticated;
