-- JagFlix local-first persistence plan
-- Supabase has intentionally been removed from this project.
-- User data is stored in browser-managed localStorage/IndexedDB by the app services.

-- Local stores used by the app:
-- jagflix:guest-user              -> current guest/local profile session
-- jagflix:playback-progress       -> continue watching + playback history
-- jagflix:watchlist               -> local watchlist
-- jagflix:favorites               -> local favorites
-- jagflix:ratings                 -> local ratings
-- jagflix:settings                -> user playback/theme/subtitle settings
-- jagflix:download-queue          -> offline/download queue metadata

-- If a server database is added later, these stores can be migrated into
-- equivalent SQL tables without changing the public UI contract.
