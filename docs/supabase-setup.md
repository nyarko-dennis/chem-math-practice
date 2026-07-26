# Supabase session tracking — setup

This app can back up practice sessions to Supabase and let users sign in so
their progress follows them across devices. It's built to share an **existing**
Supabase project (e.g. one already used by another app): everything lives in one
`practice_`-prefixed table in the `public` schema, guarded by Row Level
Security, so the other app is untouched.

If the two environment variables below are left unset, the app runs exactly as
before — progress is kept in `localStorage` only and every cloud feature quietly
no-ops.

## Identity model

- **A — Anonymous device identity.** On first load the app calls
  `signInAnonymously()`, giving each visitor a real (anonymous) auth user. Their
  sessions are stored and scoped to that user by RLS. No login required.
- **B — Real account.** From the home page a user can enter their email to
  receive a magic link. If they're currently anonymous, the email is attached to
  the **same** user (upgrade in place — the uid is preserved), so their existing
  history carries over. On a new device the same email signs them back into that
  account.
- **C — later.** Merging any pre-existing `localStorage`-only history into the
  cloud account is a follow-up; the schema is already account-ready.

## One-time dashboard configuration

In the existing project's dashboard:

1. **Run the migration.** SQL Editor → paste and run
   [`supabase/migrations/0001_practice_sessions.sql`](../supabase/migrations/0001_practice_sessions.sql).
   (Or, with the Supabase CLI linked to the project: `supabase db push`.)
2. **Enable anonymous sign-ins.** Authentication → Providers → **Anonymous** →
   enable. Without this, Option A silently no-ops (the app still works, local-only).
3. **Confirm email auth is on** (Authentication → Providers → **Email**) for the
   magic-link sign-in used by Option B.
4. **Add the site URL** under Authentication → URL Configuration so the magic
   link redirects back (e.g. `http://localhost:3000` for local dev and your
   deployed origin).

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in from Settings → API:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>
```

Both are safe in the browser (the anon key is public and protected by RLS).
**Never** put the `service_role` key here.

## What syncs today

Cloud sync is wired into `saveCourseProgress()` in
[`lib/progressTracker.ts`](../lib/progressTracker.ts) — the single point every
course funnels a completed session through. All eight courses record sessions
there, so every course syncs automatically once credentials are configured.

## Data model

`public.practice_sessions` — one row per completed session:

| column       | notes                                             |
| ------------ | ------------------------------------------------- |
| `user_id`    | `auth.uid()`; RLS restricts rows to their owner   |
| `course_id`  | `'math'`, `'calculus'`, …                         |
| `type`       | `'quick' | 'drill' | 'math'`                      |
| `correct`    | number correct                                    |
| `total`      | number of questions                               |
| `created_at` | timestamp                                          |
