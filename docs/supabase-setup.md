# Supabase setup for JagFlix

## Schema

The production schema lives in:

```text
supabase/migrations/20260730000100_jagflix_core_schema.sql
```

It creates:

- `viewer_profiles`
- `playback_history`
- `watchlist`
- `favorites`
- `ratings`
- `reviews`
- `notifications`
- `ai_preferences`
- `user_settings`
- `download_queue`
- `item_rating_summary` view

It also enables Row Level Security and owner-only policies for private user data.

## Apply options

### Option A — Supabase SQL editor

Open Supabase Dashboard → SQL Editor and run the migration SQL.

### Option B — Supabase CLI locally

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

### Option C — GitHub Actions

This repo includes a workflow at `.github/workflows/supabase-migrations.yml`.
It automatically pushes migrations when these repository secrets exist:

- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_PROJECT_ID`
- `SUPABASE_DB_PASSWORD`

Do not paste these secrets in chat or commit them to Git.

## Application environment variables

Configure these in your deployment platform:

```bash
ZST_API_KEY=server-only-value
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

`ZST_API_KEY` must remain server-only. JagFlix proxies ZST through `/api/zst/[endpoint]`.
