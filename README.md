# JagFlix — Premium Streaming Web App

Production-oriented Next.js 15 / React 19 streaming platform foundation powered by the official ZST Labs Movie API through secure Next.js route handlers.

## What is included

- Feature-based `src/` architecture
- Server-side ZST Backend-for-Frontend proxy at `/api/zst/[endpoint]`
- Strong TypeScript domain models and unknown-safe response normalizers
- Caching and retry strategy per documented endpoint
- Premium glassmorphic responsive UI with mobile bottom navigation
- Search, details, watch/player, downloads, profile, football, auth, admin, offline, 404, and error screens
- Vidstack player integration for HLS/MP4 sources returned by `/api/media`
- Supabase Auth client factory and SQL schema for user/profile/history/watchlist/favorites/ratings/reviews/notifications/preferences/settings
- PWA manifest and service worker shell cache
- ESLint, TypeScript strict mode, and production build support

## Environment

Create `.env.local` locally or configure deployment secrets:

```bash
ZST_API_KEY=your_server_only_zst_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Never expose `ZST_API_KEY` in browser code. All browser requests go through `/api/zst/[endpoint]`.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```
