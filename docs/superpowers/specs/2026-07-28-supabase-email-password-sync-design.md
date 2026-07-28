# Supabase email+password cross-device sync — design

**Date:** 2026-07-28
**Branch:** `feat/supabase-sync-setup`
**Status:** Approved (design), pending spec review

## Problem

The merged learning-efficiency work added an optional Supabase layer, but it is
**write-only and anonymous-first**: it inserts per-session totals into
`practice_sessions` and never reads them back, so signing in on a new device
restores nothing. The read path (`fetchCourseAggregates`) is dead code. We want
**real cross-device sync**: a user signs in on any device and their full study
state — progress, spaced-repetition review queue, topic mastery, and streak —
follows them.

## Decisions (locked with the user)

1. **Sign-up-only, email + password.** No anonymous users. Practice stays in
   localStorage exactly as today; the cloud only engages once the user creates
   an account. This removes the captcha, anon-MAU, and anonymous-role RLS
   exposure concerns on the shared StayByPlan project entirely. Anonymous
   sign-ins can stay disabled in the dashboard.
2. **Confirm-email OFF, no password recovery.** `signUp`/`signIn` return a live
   session immediately — no email round-trip, no redirect URL, no magic link.
   Accepted trade: a forgotten password locks the account (local progress is
   still safe on-device; the user starts a fresh account to re-sync).
3. **Full study state** syncs, via a **per-user JSON snapshot** of localStorage
   (not normalized per-session rows).
4. **Union-merge on sign-in** so practice done while signed out is never
   silently lost.

## Target environment

- Hosted project: **StayByPlan** (`zwqbrcwjhvfjnrnbznav`), shared with the `sbp`
  app. Our objects are namespaced (`practice_` prefix, `public` schema, RLS),
  so the other app is untouched.
- `.env.local` (gitignored) already points at the hosted URL + anon key.
- The throwaway `practice_sessions` table was applied to hosted already; the new
  migration drops it.

## Architecture

### 1. Data model — `supabase/migrations/0002_practice_state.sql`

Replace the per-session table with one snapshot row per user.

```sql
drop table if exists public.practice_sessions;

create table if not exists public.practice_state (
  user_id    uuid        primary key default auth.uid() references auth.users(id) on delete cascade,
  state      jsonb       not null,
  updated_at timestamptz not null default now()
);

alter table public.practice_state enable row level security;

drop policy if exists practice_state_select_own on public.practice_state;
create policy practice_state_select_own on public.practice_state
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists practice_state_insert_own on public.practice_state;
create policy practice_state_insert_own on public.practice_state
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists practice_state_update_own on public.practice_state;
create policy practice_state_update_own on public.practice_state
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

Both `insert` and `update` policies are required because sync upserts.

### 2. Snapshot shape — `PracticeState`

```ts
interface PracticeState {
  version: 1;
  updatedAt: number;                 // ms epoch, bumped on every local write
  courses: Record<string, {
    progress: CourseProgress;        // from progressTracker
    stats: CoursePracticeStats;      // from practiceStats (questions + topics)
  }>;
  streak: StreakInfo;                // from progressTracker (global)
}
```

This is a straight backup of what already lives in localStorage — no new
authoritative data, so the UI keeps reading localStorage as it does today.
`snapshotLocal()` reads `updatedAt` from a `chem_math_practice_state_updated_at`
key, defaulting to `0` when absent (so a fresh device's snapshot is always
"older" than any cloud row).

### 3. Modules

- **`lib/supabase/auth.ts` (rewrite).** Remove all anonymous logic
  (`ensureAnonymousSession`, `upgradeOrSignIn`, `isAnonymous`). Expose:
  `signUp(email, password)`, `signIn(email, password)`, `signOut()`,
  `getCurrentUser()`, `onAccountChange(cb)`. `AccountState` collapses to
  `{ user: User | null }`.
- **`lib/supabase/state.ts` (new).** `PracticeState` types; `snapshotLocal()`
  reads every course's progress+stats plus the streak from localStorage;
  `applyToLocal(state)` writes them back; **`mergeState(local, cloud)`** is a
  pure function (the only unit-tested piece).
- **`lib/supabase/sync.ts` (rewrite).** `pushState()` upserts `snapshotLocal()`
  into `practice_state` (fire-and-forget; replaces `syncSession`).
  `pullAndMerge()` fetches the cloud row, merges, writes local, pushes the merged
  result back. Delete `fetchCourseAggregates` / `SessionInsert`.
- **`lib/practiceStats.ts`.** Add `replaceStats(courseId, stats)` (public wrapper
  over the private `saveStats`) so `state.ts` never touches raw keys.
- **`lib/progressTracker.ts`.** Add `replaceCourseProgress(courseId, progress)`
  and `replaceStreak(streak)`. Swap the `syncSession(...)` hook in
  `saveCourseProgress` for `void pushState()`, and bump `PracticeState.updatedAt`
  (a `chem_math_practice_state_updated_at` localStorage key) on each save.
- **`components/AccountMenu.tsx` (rewrite).** Not-configured → renders nothing.
  Signed out → email + password fields with a **Sign in / Create account**
  toggle. Signed in → "Signed in as … — progress backed up & synced" + Sign out.
  On successful sign-in/up → `pullAndMerge()` then refresh the dashboard.

Module boundaries: `sync.ts` and `state.ts` know the Supabase table and the
`PracticeState` shape; only `practiceStats.ts` and `progressTracker.ts` know
their own localStorage key formats.

## Data flow

- **Finish a session:** `saveCourseProgress` writes localStorage (unchanged) →
  bumps `updatedAt` → `void pushState()` upserts the whole snapshot. One write
  per finished session captures the final spaced-rep state too. No-ops when not
  signed in or not configured.
- **Sign in / sign up:** `onAccountChange` SIGNED_IN → `pullAndMerge()` →
  `applyToLocal(merged)` → `pushState(merged)` → dashboard refresh.
- **Sign out:** clears the Supabase session; localStorage is untouched (the
  device keeps working locally).

## Merge semantics (`mergeState(local, cloud)`, pure)

Constraints from the existing code: `SessionHistoryItem` has no stable id;
`history` is capped at 50; `CourseProgress` counters are monotonic and
maintained separately from `history`, so they cannot be recomputed from it.

Rules, per course in `union(localCourses, cloudCourses)`:

- Only one side has the course → take that side.
- Both sides:
  - **progress counters** (`completedSessionsCount`, `totalQuestionsAnswered`,
    `totalCorrectAnswers`): take the whole triple from the side with the greater
    `completedSessionsCount` (tie → newer `updatedAt`). Taking the triple as a
    unit keeps it internally consistent and **never double-counts** shared
    sessions.
  - **progress.history**: union of both lists, deduped by the tuple
    `(date, type, correct, total)`, then keep the most recent 50. Feeds only the
    trend chart / recent-sessions list, not the totals.
  - **stats** (`CoursePracticeStats`): take from the snapshot with the newer
    top-level `updatedAt` (spaced-repetition is point-in-time; newest scheduling
    wins). Leitner boxes are not additive, so no per-question merge.
- **streak**: `{ current, lastDate }` from the side with the later `lastDate`;
  `longest = max(local.longest, cloud.longest)`.
- **merged.updatedAt** = `max(local.updatedAt, cloud.updatedAt)`.

When the cloud row is absent, `pullAndMerge` pushes the local snapshot as the
first backup (no merge).

### Known limitations (accepted for this iteration)

- **Signed-out practice then sign into a more-active account.** The freshly
  practiced local sessions appear in merged `history` and (if that device's
  snapshot is newer) in `stats`, but the monotonic totals come from the
  higher-session side, so those few sessions are not added to the counters.
  No corruption, no crash — a slight undercount, and strictly better than plain
  last-write-wins, which would drop them entirely.
- **Tuple dedupe of history** can collapse two genuinely-identical same-day
  sessions into one history entry (totals are unaffected). Adding a stable
  `id` to `SessionHistoryItem` would remove this; deferred to avoid scope creep.

## Error handling

- Every cloud call is guarded: no Supabase client (env unset) → no-op; not
  signed in → no-op. `pushState` is fire-and-forget and never throws into
  `saveCourseProgress`. `pullAndMerge` failures (offline, RLS) leave localStorage
  untouched and log a warning; the app keeps working locally.
- `signUp`/`signIn` surface Supabase error messages to `AccountMenu` (e.g.
  "User already registered", "Invalid login credentials").

## Testing

- **`lib/supabase/state.test.ts`** (`node --test`, `.ts` imports) covers
  `mergeState`: fresh-device restore (empty local + cloud → cloud), sequential
  update (local superset → local), the signed-out-then-sign-in conflict
  (union of history, no double-count of counters), streak resolution, and
  course-union when each side has courses the other lacks.
- Auth and sync are thin wrappers over the Supabase SDK — verified manually
  against hosted StayByPlan (create account, finish a session, sign in on a
  second browser profile, confirm the review queue + mastery restore).

## Out of scope

- Password reset / email verification (deliberately off).
- Realtime/multi-tab live sync (snapshot-on-finish + merge-on-sign-in only).
- Normalized server-side session analytics (the blob is opaque by design).
- Migrating the localStorage-only history of users who never sign up.

## Dashboard steps (user, one-time)

1. Run `supabase/migrations/0002_practice_state.sql` in the SQL editor.
2. Auth → Providers: Email on, **Confirm email OFF**, Anonymous off. (Done.)
