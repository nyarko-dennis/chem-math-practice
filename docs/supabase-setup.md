# Supabase cross-device sync - setup

This app can back up your practice state to Supabase and sync it across devices
via an email + password account. It shares an existing Supabase project (e.g.
one already used by another app): everything lives in one `practice_`-prefixed
table in the `public` schema, guarded by Row Level Security, so the other app is
untouched.

If the two environment variables below are left unset, the app runs exactly as
before - progress is kept in `localStorage` only and every cloud feature quietly
no-ops.

## Identity model

- **Sign-up-only, email + password.** There are no anonymous users. Practice is
  saved in `localStorage`; the cloud engages only once a user creates an account.
- **Confirm-email is OFF**, so sign-up and sign-in return a live session
  immediately - no confirmation email, no redirect URL, no magic link. The
  trade-off is that there is **no password recovery**: a forgotten password means
  starting a new account (on-device progress is never lost).

## One-time dashboard configuration

1. **Run the migration.** SQL Editor -> paste and run
   [`supabase/migrations/0002_practice_state.sql`](../supabase/migrations/0002_practice_state.sql).
2. **Enable email auth.** Authentication -> Providers -> Email -> enable, and set
   **Confirm email OFF**.
3. **Leave Anonymous sign-ins disabled.** They are not used.

No redirect URL / site URL configuration is required (no email links are sent).

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in from Settings -> API:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>
```

Both are safe in the browser (the anon key is public and protected by RLS).
**Never** put the `service_role` key here.

## What syncs

The whole local practice state - per-course progress and history, the
spaced-repetition review queue and topic mastery, and the daily streak - is
snapshotted to the cloud when a session finishes (`saveCourseProgress` ->
`pushState`). On sign-in, `pullAndMerge` fetches the cloud snapshot,
union-merges it with whatever is on the device, writes the result back to
`localStorage`, and pushes the merged result up. Signing in on a fresh device
restores everything.

## Data model

`public.practice_state` - one JSON snapshot row per user:

| column       | notes                                             |
| ------------ | ------------------------------------------------- |
| `user_id`    | `auth.uid()`; RLS restricts rows to their owner   |
| `state`      | `jsonb` snapshot of the user's localStorage state |
| `updated_at` | timestamp of the last push                        |
