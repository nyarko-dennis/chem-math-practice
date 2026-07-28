# Email+Password Cross-Device Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the write-only anonymous Supabase layer with sign-up-only email+password auth and full study-state cross-device sync via a per-user JSON snapshot.

**Architecture:** The cloud is a backup of localStorage. A single `practice_state` row per user holds a JSON snapshot of every course's progress + spaced-repetition stats + streak. It is upserted when a session finishes and, on sign-in, fetched and union-merged into localStorage (which stays the authoritative read path for the UI).

**Tech Stack:** Next.js 16 App Router (client components), TypeScript, `@supabase/supabase-js` v2, Node 22 `node --test`, Tailwind v4.

## Global Constraints

- **Node 22**, tests are `.ts` run via `node --test` with built-in type stripping. **No `enum`, `namespace`, constructor parameter properties, or decorators** in any file.
- **lib-to-lib *runtime* relative imports MUST use explicit `.ts` extensions** (e.g. `import { x } from './state.ts'`). `import type` lines are erased by type stripping, so they may omit the extension.
- Path alias `@/*` maps to the repo root (app→lib imports; no extension).
- `npm run build` (runs `tsc`) and `npm run test` are the real gates. Keep new code lint-clean.
- Guard every localStorage access with `typeof window !== 'undefined'` (modules run during SSR).
- Prose/UI copy: use plain dashes `-`, never mdash.
- Target hosted project: **StayByPlan** (`zwqbrcwjhvfjnrnbznav`), shared with another app; all objects namespaced `practice_`. `.env.local` already holds its URL + anon key.
- Spec: `docs/superpowers/specs/2026-07-28-supabase-email-password-sync-design.md`.

## File Structure

- Create: `supabase/migrations/0002_practice_state.sql` - drop `practice_sessions`, create `practice_state`.
- Create: `lib/supabase/mergeState.ts` - `PracticeState`/`CourseState` types + pure `mergeState`.
- Create: `lib/supabase/mergeState.test.ts` - `node --test` unit tests.
- Create: `lib/supabase/state.ts` - `snapshotLocal` / `applyToLocal` (localStorage <-> `PracticeState`).
- Modify: `lib/practiceStats.ts` - add `replaceStats`.
- Modify: `lib/progressTracker.ts` - add `replaceCourseProgress`, `replaceStreak`, `getStateUpdatedAt`, `setStateUpdatedAt`; swap sync hook.
- Rewrite: `lib/supabase/auth.ts` - email+password, sign-up-only.
- Rewrite: `lib/supabase/sync.ts` - `pushState` / `pullAndMerge`.
- Rewrite: `components/AccountMenu.tsx` - email+password form.
- Modify: `docs/supabase-setup.md`, `CLAUDE.md` - docs.

`lib/supabase/client.ts` is unchanged.

---

### Task 1: Snapshot table migration

**Files:**
- Create: `supabase/migrations/0002_practice_state.sql`

**Interfaces:**
- Produces: the `public.practice_state` table (`user_id uuid pk`, `state jsonb`, `updated_at timestamptz`) with RLS select/insert/update policies scoped to `auth.uid() = user_id`.

- [ ] **Step 1: Write the migration file**

Create `supabase/migrations/0002_practice_state.sql`:

```sql
-- Cross-device sync for the chem-math-practice app.
--
-- Replaces the throwaway practice_sessions table with a single snapshot row per
-- user: a JSON backup of that user's localStorage practice state (progress +
-- spaced-repetition stats + streak). Namespaced `practice_` and RLS-scoped so it
-- safely shares a project with another app.

drop table if exists public.practice_sessions;

create table if not exists public.practice_state (
  user_id    uuid        primary key default auth.uid() references auth.users (id) on delete cascade,
  state      jsonb       not null,
  updated_at timestamptz not null default now()
);

comment on table public.practice_state is
  'One JSON snapshot row per user (chem-math-practice app).';

alter table public.practice_state enable row level security;

-- A user may only read and write their own snapshot row.
drop policy if exists practice_state_select_own on public.practice_state;
create policy practice_state_select_own
  on public.practice_state for select
  to authenticated using (auth.uid() = user_id);

drop policy if exists practice_state_insert_own on public.practice_state;
create policy practice_state_insert_own
  on public.practice_state for insert
  to authenticated with check (auth.uid() = user_id);

drop policy if exists practice_state_update_own on public.practice_state;
create policy practice_state_update_own
  on public.practice_state for update
  to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

- [ ] **Step 2: Verify it is valid SQL syntax locally (no DB write)**

Run: `grep -c 'create policy' supabase/migrations/0002_practice_state.sql`
Expected: `3`

Note: this is applied to hosted StayByPlan by the user in the dashboard SQL editor - not by this plan.

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/0002_practice_state.sql
git commit -m "feat(supabase): add practice_state snapshot table migration"
```

---

### Task 2: PracticeState types + pure mergeState (TDD)

**Files:**
- Create: `lib/supabase/mergeState.ts`
- Test: `lib/supabase/mergeState.test.ts`

**Interfaces:**
- Consumes (type-only, erased at runtime): `CourseProgress`, `StreakInfo`, `SessionHistoryItem` from `../progressTracker`; `CoursePracticeStats` from `../practiceStats`.
- Produces:
  - `interface CourseState { progress: CourseProgress; stats: CoursePracticeStats }`
  - `interface PracticeState { version: 1; updatedAt: number; courses: Record<string, CourseState>; streak: StreakInfo }`
  - `function mergeState(local: PracticeState, cloud: PracticeState): PracticeState`

- [ ] **Step 1: Write the failing test**

Create `lib/supabase/mergeState.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mergeState, type PracticeState } from './mergeState.ts';

const emptyStreak = { current: 0, longest: 0, lastDate: '' };

function state(partial: Partial<PracticeState>): PracticeState {
  return { version: 1, updatedAt: 0, courses: {}, streak: emptyStreak, ...partial };
}

function course(sessions: number, answered: number, correct: number, history: any[] = [], stats: any = { questions: {}, topics: {} }) {
  return {
    progress: { completedSessionsCount: sessions, totalQuestionsAnswered: answered, totalCorrectAnswers: correct, history },
    stats,
  };
}

test('fresh device: empty local + populated cloud -> cloud restored', () => {
  const local = state({ updatedAt: 0 });
  const cloud = state({
    updatedAt: 1000,
    courses: { math: course(3, 30, 24, [{ date: 'd1', type: 'math', correct: 8, total: 10 }], { questions: { q1: { box: 2 } }, topics: {} }) },
    streak: { current: 3, longest: 3, lastDate: '2026-07-20' },
  });
  const merged = mergeState(local, cloud);
  assert.deepEqual(merged.courses.math.progress, cloud.courses.math.progress);
  assert.deepEqual(merged.courses.math.stats, cloud.courses.math.stats);
  assert.equal(merged.streak.current, 3);
  assert.equal(merged.updatedAt, 1000);
});

test('sequential: local superset (newer, more sessions) wins counters and stats', () => {
  const local = state({ updatedAt: 2000, courses: { math: course(12, 120, 100, [], { questions: { q1: { box: 4 } }, topics: {} }) } });
  const cloud = state({ updatedAt: 1000, courses: { math: course(10, 100, 85, [], { questions: { q1: { box: 3 } }, topics: {} }) } });
  const merged = mergeState(local, cloud);
  assert.equal(merged.courses.math.progress.completedSessionsCount, 12);
  assert.equal(merged.courses.math.stats.questions.q1.box, 4);
});

test('conflict: local newer but fewer sessions -> counters from cloud, no double-count, history unioned', () => {
  const local = state({
    updatedAt: 3000,
    courses: { math: course(3, 30, 25, [{ date: 'dB', type: 'math', correct: 9, total: 10 }], { questions: { q9: { box: 2 } }, topics: {} }) },
  });
  const cloud = state({
    updatedAt: 1000,
    courses: { math: course(30, 300, 240, [{ date: 'dA', type: 'math', correct: 7, total: 10 }], { questions: { q1: { box: 5 } }, topics: {} }) },
  });
  const merged = mergeState(local, cloud);
  // counters come from the higher-session side (cloud), never summed
  assert.equal(merged.courses.math.progress.completedSessionsCount, 30);
  assert.equal(merged.courses.math.progress.totalQuestionsAnswered, 300);
  // history unions both devices' items
  assert.equal(merged.courses.math.progress.history.length, 2);
  // stats come from the newer snapshot (local)
  assert.deepEqual(merged.courses.math.stats.questions, { q9: { box: 2 } });
});

test('course union: each side has a course the other lacks', () => {
  const local = state({ updatedAt: 2000, courses: { math: course(2, 20, 18) } });
  const cloud = state({ updatedAt: 1000, courses: { nutrition: course(1, 10, 9) } });
  const merged = mergeState(local, cloud);
  assert.ok(merged.courses.math);
  assert.ok(merged.courses.nutrition);
});

test('streak: later lastDate wins, longest is the max', () => {
  const local = state({ updatedAt: 2000, streak: { current: 2, longest: 5, lastDate: '2026-07-25' } });
  const cloud = state({ updatedAt: 1000, streak: { current: 9, longest: 9, lastDate: '2026-07-28' } });
  const merged = mergeState(local, cloud);
  assert.equal(merged.streak.current, 9);
  assert.equal(merged.streak.lastDate, '2026-07-28');
  assert.equal(merged.streak.longest, 9);
});

test('history: identical items deduped and capped at 50', () => {
  const dup = { date: 'd', type: 'quick', correct: 1, total: 2 };
  const many = Array.from({ length: 40 }, (_, i) => ({ date: `d${i}`, type: 'quick', correct: 1, total: 2 }));
  const local = state({ updatedAt: 1, courses: { math: course(1, 2, 1, [dup, ...many]) } });
  const cloud = state({ updatedAt: 2, courses: { math: course(1, 2, 1, [dup, ...many]) } });
  const merged = mergeState(local, cloud);
  assert.equal(merged.courses.math.progress.history.length, 41); // dup + 40 unique, deduped
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test lib/supabase/mergeState.test.ts`
Expected: FAIL - `Cannot find module './mergeState.ts'`.

- [ ] **Step 3: Write the implementation**

Create `lib/supabase/mergeState.ts`:

```ts
// Pure union-merge of two PracticeState snapshots. No I/O, no localStorage - so
// it is unit-testable under `node --test`. Type imports are erased by type
// stripping, so this module has no runtime dependencies.

import type { CoursePracticeStats } from '../practiceStats';
import type { CourseProgress, StreakInfo, SessionHistoryItem } from '../progressTracker';

export interface CourseState {
  progress: CourseProgress;
  stats: CoursePracticeStats;
}

export interface PracticeState {
  version: 1;
  updatedAt: number;
  courses: Record<string, CourseState>;
  streak: StreakInfo;
}

const HISTORY_CAP = 50;

function mergeHistory(a: SessionHistoryItem[], b: SessionHistoryItem[]): SessionHistoryItem[] {
  const seen = new Set<string>();
  const out: SessionHistoryItem[] = [];
  for (const item of [...a, ...b]) {
    const key = `${item.date}|${item.type}|${item.correct}|${item.total}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out.slice(-HISTORY_CAP);
}

function mergeCourse(
  local: CourseState | undefined,
  cloud: CourseState | undefined,
  localNewer: boolean,
): CourseState {
  if (!local) return cloud as CourseState;
  if (!cloud) return local;

  // Counters: take the whole triple from the side with more completed sessions
  // (tie -> newer snapshot). Taking it as a unit never double-counts shared
  // sessions and keeps the triple internally consistent.
  const localMore =
    local.progress.completedSessionsCount > cloud.progress.completedSessionsCount ||
    (local.progress.completedSessionsCount === cloud.progress.completedSessionsCount && localNewer);
  const base = localMore ? local.progress : cloud.progress;

  const progress: CourseProgress = {
    completedSessionsCount: base.completedSessionsCount,
    totalQuestionsAnswered: base.totalQuestionsAnswered,
    totalCorrectAnswers: base.totalCorrectAnswers,
    history: mergeHistory(local.progress.history, cloud.progress.history),
  };

  // Spaced-repetition boxes are point-in-time and not additive: newest wins.
  const stats = localNewer ? local.stats : cloud.stats;

  return { progress, stats };
}

export function mergeState(local: PracticeState, cloud: PracticeState): PracticeState {
  const localNewer = local.updatedAt >= cloud.updatedAt;
  const ids = new Set([...Object.keys(local.courses), ...Object.keys(cloud.courses)]);
  const courses: Record<string, CourseState> = {};
  for (const id of ids) {
    courses[id] = mergeCourse(local.courses[id], cloud.courses[id], localNewer);
  }

  const longest = Math.max(local.streak.longest, cloud.streak.longest);
  const streak: StreakInfo =
    local.streak.lastDate >= cloud.streak.lastDate
      ? { ...local.streak, longest }
      : { ...cloud.streak, longest };

  return {
    version: 1,
    updatedAt: Math.max(local.updatedAt, cloud.updatedAt),
    courses,
    streak,
  };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test lib/supabase/mergeState.test.ts`
Expected: PASS - 6 tests.

- [ ] **Step 5: Run the full suite to confirm nothing regressed**

Run: `npm run test`
Expected: all tests pass (existing suite + 6 new).

- [ ] **Step 6: Commit**

```bash
git add lib/supabase/mergeState.ts lib/supabase/mergeState.test.ts
git commit -m "feat(supabase): add pure PracticeState union-merge with tests"
```

---

### Task 3: localStorage snapshot/apply + replace-helpers

**Files:**
- Modify: `lib/practiceStats.ts`
- Modify: `lib/progressTracker.ts`
- Create: `lib/supabase/state.ts`

**Interfaces:**
- Consumes: `PracticeState`, `CourseState` from `./mergeState.ts`; `COURSES` from `../courses.ts`; `loadStats`, `CoursePracticeStats` from `../practiceStats.ts`; `getCourseProgress`, `getStreak`, `CourseProgress` from `../progressTracker.ts`.
- Produces:
  - `practiceStats.ts`: `export function replaceStats(courseId: string, stats: CoursePracticeStats): void`
  - `progressTracker.ts`: `replaceCourseProgress(courseId, progress)`, `replaceStreak(streak)`, `getStateUpdatedAt(): number`, `setStateUpdatedAt(ts: number): void`
  - `state.ts`: `snapshotLocal(): PracticeState`, `applyToLocal(state: PracticeState): void`

- [ ] **Step 1: Add `replaceStats` to `lib/practiceStats.ts`**

`saveStats` is already defined (private) in this file. Add this exported wrapper immediately after the `saveStats` function definition:

```ts
/** Overwrite the stored stats for a course. Used by cloud restore. */
export function replaceStats(courseId: string, stats: CoursePracticeStats): void {
  saveStats(courseId, stats);
}
```

- [ ] **Step 2: Add the replace/updatedAt helpers to `lib/progressTracker.ts`**

Add a key constant next to the existing `STREAK_KEY` declaration:

```ts
const STATE_UPDATED_AT_KEY = 'chem_math_practice_state_updated_at';
```

Add these exported functions (e.g. after `getStreak`):

```ts
/** Read the local "state last changed" timestamp (ms epoch); 0 if never set. */
export function getStateUpdatedAt(): number {
  if (typeof window === 'undefined') return 0;
  const raw = localStorage.getItem(STATE_UPDATED_AT_KEY);
  return raw ? Number(raw) || 0 : 0;
}

/** Set the local "state last changed" timestamp. */
export function setStateUpdatedAt(ts: number): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STATE_UPDATED_AT_KEY, String(ts));
  } catch {
    /* ignore quota errors */
  }
}

/** Overwrite a course's progress record (used by cloud restore). */
export function replaceCourseProgress(courseId: string, progress: CourseProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${PROGRESS_KEY_PREFIX}${courseId}`, JSON.stringify(progress));
  } catch (e) {
    console.error('Error replacing course progress:', e);
  }
}

/** Overwrite the streak record (used by cloud restore). */
export function replaceStreak(streak: StreakInfo): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
  } catch (e) {
    console.error('Error replacing streak:', e);
  }
}
```

- [ ] **Step 3: Create `lib/supabase/state.ts`**

```ts
'use client';

import { COURSES } from '../courses.ts';
import { loadStats, replaceStats } from '../practiceStats.ts';
import {
  getCourseProgress,
  replaceCourseProgress,
  getStreak,
  replaceStreak,
  getStateUpdatedAt,
  setStateUpdatedAt,
} from '../progressTracker.ts';
import type { PracticeState, CourseState } from './mergeState.ts';

const EMPTY_PROGRESS = {
  completedSessionsCount: 0,
  totalQuestionsAnswered: 0,
  totalCorrectAnswers: 0,
  history: [],
};

/** Read the full local practice state from localStorage into a PracticeState. */
export function snapshotLocal(): PracticeState {
  const courses: Record<string, CourseState> = {};
  for (const c of COURSES) {
    const progress = getCourseProgress(c.id);
    const stats = loadStats(c.id);
    const hasProgress = !!progress && (progress.completedSessionsCount > 0 || progress.history.length > 0);
    const hasStats = Object.keys(stats.questions).length > 0 || Object.keys(stats.topics).length > 0;
    if (hasProgress || hasStats) {
      courses[c.id] = { progress: progress ?? { ...EMPTY_PROGRESS }, stats };
    }
  }
  return { version: 1, updatedAt: getStateUpdatedAt(), courses, streak: getStreak() };
}

/** Write a merged PracticeState back into localStorage. */
export function applyToLocal(state: PracticeState): void {
  for (const [courseId, cs] of Object.entries(state.courses)) {
    replaceCourseProgress(courseId, cs.progress);
    replaceStats(courseId, cs.stats);
  }
  replaceStreak(state.streak);
  setStateUpdatedAt(state.updatedAt);
}
```

- [ ] **Step 4: Build to type-check the new module and exports**

Run: `npm run build`
Expected: build succeeds, `tsc` clean. (`state.ts` has no consumers yet; this verifies types and the `.ts` import rule.)

- [ ] **Step 5: Confirm tests still pass**

Run: `npm run test`
Expected: all pass (unchanged from Task 2).

- [ ] **Step 6: Commit**

```bash
git add lib/practiceStats.ts lib/progressTracker.ts lib/supabase/state.ts
git commit -m "feat(supabase): add localStorage snapshot/apply and replace helpers"
```

---

### Task 4: Auth + sync cutover (auth.ts, sync.ts, progressTracker hook, AccountMenu)

These four changes are one atomic cutover: rewriting `auth.ts`/`sync.ts` removes the old anonymous API that `progressTracker` and `AccountMenu` import, so `tsc` only goes green once all four land together.

**Files:**
- Rewrite: `lib/supabase/auth.ts`
- Rewrite: `lib/supabase/sync.ts`
- Modify: `lib/progressTracker.ts` (swap hook)
- Rewrite: `components/AccountMenu.tsx`

**Interfaces:**
- Consumes: `getSupabase`, `isSupabaseConfigured` from `./client`; `snapshotLocal`, `applyToLocal` from `./state`; `mergeState`, `PracticeState` from `./mergeState`; `setStateUpdatedAt` from `../progressTracker`.
- Produces:
  - `auth.ts`: `interface AccountState { user: User | null }`, `getCurrentUser()`, `signUp(email, password)`, `signIn(email, password)`, `signOut()`, `onAccountChange(cb)`.
  - `sync.ts`: `pushState(): Promise<void>`, `pullAndMerge(): Promise<boolean>` (true iff local was changed).

- [ ] **Step 1: Rewrite `lib/supabase/auth.ts`**

Replace the entire file with:

```ts
'use client';

import type { User } from '@supabase/supabase-js';
import { getSupabase } from './client';

// Sign-up-only email + password identity. Confirm-email is OFF in the dashboard,
// so signUp/signIn return a live session immediately - no email, no redirect.

export interface AccountState {
  user: User | null;
}

export async function getCurrentUser(): Promise<User | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function signUp(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'Cloud sync is not configured.' };
  const { error } = await supabase.auth.signUp({ email: email.trim(), password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function signIn(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'Cloud sync is not configured.' };
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function signOut(): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  await supabase.auth.signOut();
}

/** Subscribe to auth changes. Returns an unsubscribe function. */
export function onAccountChange(cb: (state: AccountState) => void): () => void {
  const supabase = getSupabase();
  if (!supabase) {
    cb({ user: null });
    return () => {};
  }
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    cb({ user: session?.user ?? null });
  });
  return () => data.subscription.unsubscribe();
}
```

- [ ] **Step 2: Rewrite `lib/supabase/sync.ts`**

Replace the entire file with:

```ts
'use client';

import { getSupabase } from './client';
import { getCurrentUser } from './auth';
import { snapshotLocal, applyToLocal } from './state.ts';
import { mergeState, type PracticeState } from './mergeState.ts';

// Cloud sync of the whole local practice snapshot. Writes are fire-and-forget;
// localStorage stays the authoritative read path. No-ops when unconfigured or
// signed out.

const TABLE = 'practice_state';

function meaningfulKey(s: PracticeState): string {
  return JSON.stringify({ courses: s.courses, streak: s.streak });
}

/** Upsert the current local snapshot for the signed-in user. */
export async function pushState(): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  try {
    const user = await getCurrentUser();
    if (!user) return;
    const state = snapshotLocal();
    const { error } = await supabase
      .from(TABLE)
      .upsert({ user_id: user.id, state, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
    if (error) console.warn('pushState failed:', error.message);
  } catch (e) {
    console.warn('pushState error:', e);
  }
}

/**
 * On sign-in: fetch the cloud snapshot, union-merge with local, write the merged
 * result to localStorage, and push it back. Returns true iff local was changed
 * (so the caller can refresh the UI). Idempotent: a second call with no remote
 * change returns false.
 */
export async function pullAndMerge(): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;
  try {
    const user = await getCurrentUser();
    if (!user) return false;

    const { data, error } = await supabase.from(TABLE).select('state').eq('user_id', user.id).maybeSingle();
    if (error) {
      console.warn('pullAndMerge fetch failed:', error.message);
      return false;
    }

    const local = snapshotLocal();
    if (!data) {
      // No cloud row yet - first backup for this account.
      await pushState();
      return false;
    }

    const cloud = data.state as PracticeState;
    const merged = mergeState(local, cloud);
    const localChanged = meaningfulKey(merged) !== meaningfulKey(local);
    const cloudChanged = meaningfulKey(merged) !== meaningfulKey(cloud);
    if (localChanged) applyToLocal(merged);
    if (localChanged || cloudChanged) await pushState();
    return localChanged;
  } catch (e) {
    console.warn('pullAndMerge error:', e);
    return false;
  }
}
```

- [ ] **Step 3: Swap the sync hook in `lib/progressTracker.ts`**

Change the top-of-file import:

```ts
// BEFORE
import { syncSession } from './supabase/sync';
// AFTER
import { pushState } from './supabase/sync';
```

In `saveCourseProgress`, replace the trailing fire-and-forget block (the `void syncSession({ ... })` call and its comment) with:

```ts
  // Bump the local state timestamp and back the whole snapshot up to the cloud.
  // No-ops when signed out or unconfigured; never blocks or throws into caller.
  setStateUpdatedAt(Date.now());
  void pushState();
```

(`setStateUpdatedAt` is defined in this same file from Task 3.)

- [ ] **Step 4: Rewrite `components/AccountMenu.tsx`**

Replace the entire file with:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { AccountState, getCurrentUser, onAccountChange, signIn, signUp, signOut } from '@/lib/supabase/auth';
import { pullAndMerge } from '@/lib/supabase/sync';

/**
 * Account control for the dashboard.
 *   * Local-only mode (no Supabase configured) -> renders nothing.
 *   * Signed out -> email + password form with a Sign in / Create account toggle.
 *   * Signed in -> email + a sign-out button.
 * On sign-in the cloud snapshot is union-merged into localStorage; if that
 * changed local data, the page reloads so the dashboard reflects it.
 */
export default function AccountMenu() {
  const [configured, setConfigured] = useState(false);
  const [account, setAccount] = useState<AccountState>({ user: null });
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    setConfigured(true);

    let synced = false;
    const syncOnce = async () => {
      if (synced) return;
      synced = true;
      const changed = await pullAndMerge();
      if (changed && typeof window !== 'undefined') window.location.reload();
    };

    getCurrentUser().then((u) => {
      setAccount({ user: u });
      if (u) void syncOnce();
    });

    return onAccountChange((state) => {
      setAccount(state);
      if (state.user) void syncOnce();
    });
  }, []);

  if (!configured) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = mode === 'signup' ? await signUp(email, password) : await signIn(email, password);
    setBusy(false);
    if (!res.ok) {
      setError(res.error || 'Something went wrong.');
      return;
    }
    setPassword('');
    // onAccountChange fires on success and handles pull + reload.
  };

  if (account.user) {
    return (
      <div className="mb-8 rounded-xl border border-slate-100 bg-white p-4 shadow-sm flex items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          Signed in as <span className="font-semibold text-slate-800">{account.user.email}</span>
          <span className="block text-xs text-slate-400">Your progress is backed up and synced across devices.</span>
        </p>
        <button onClick={() => signOut()} className="text-sm font-medium text-slate-500 hover:text-slate-800">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="mb-8 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="text-sm text-slate-600">
          {mode === 'signin' ? 'Sign in to sync your progress across devices.' : 'Create an account to sync across devices.'}
          <span className="block text-xs text-slate-400">Your progress is saved on this device either way.</span>
        </p>
        <button
          type="button"
          onClick={() => {
            setMode(mode === 'signin' ? 'signup' : 'signin');
            setError('');
          }}
          className="whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          {mode === 'signin' ? 'Create account' : 'Have an account?'}
        </button>
      </div>
      <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-48"
        />
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-40"
        />
        <button
          type="submit"
          disabled={busy}
          className="whitespace-nowrap rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-slate-300"
        >
          {busy ? 'Working...' : mode === 'signin' ? 'Sign in' : 'Create account'}
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
```

- [ ] **Step 5: Verify no dangling references to the removed anonymous API**

Run: `grep -rn 'ensureAnonymousSession\|upgradeOrSignIn\|accountFromUser\|isAnonymous\|syncSession\|fetchCourseAggregates\|SessionInsert\|SessionBootstrap' app components lib`
Expected: no output (empty). Any hit is a dangling reference to fix.

- [ ] **Step 6: Build**

Run: `npm run build`
Expected: build succeeds, `tsc` clean, all routes compile.

- [ ] **Step 7: Run tests**

Run: `npm run test`
Expected: all pass.

- [ ] **Step 8: Commit**

```bash
git add lib/supabase/auth.ts lib/supabase/sync.ts lib/progressTracker.ts components/AccountMenu.tsx
git commit -m "feat(supabase): email+password sign-up-only auth with full-state sync"
```

---

### Task 5: Update docs

**Files:**
- Modify: `docs/supabase-setup.md`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Rewrite `docs/supabase-setup.md`**

Replace the entire file with:

```markdown
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
```

- [ ] **Step 2: Update the Persistence section in `CLAUDE.md`**

Replace the paragraph that begins "An **optional Supabase layer**" (in the `### Persistence` section) with:

```markdown
An **optional Supabase layer** (`lib/supabase/*`, wired at `saveCourseProgress`)
adds cross-device sync on top of this via a sign-up-only **email + password**
account (confirm-email off, no password recovery). The whole local practice
state is snapshotted to a per-user `practice_state` JSON row on session finish
(`pushState`), and on sign-in `pullAndMerge` union-merges the cloud snapshot back
into localStorage (`lib/supabase/mergeState.ts` holds the pure, unit-tested merge).
It is inert unless `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
are set (see `docs/supabase-setup.md`).
```

- [ ] **Step 3: Update the Known follow-ups section in `CLAUDE.md`**

Replace the "Cross-device read-back not wired" bullet with:

```markdown
- **Session history dedupe is tuple-based.** `SessionHistoryItem` has no stable
  id, so the sync merge dedupes history by `(date, type, correct, total)` and can
  collapse two genuinely-identical same-day sessions into one history entry
  (totals are unaffected, since they come from monotonic counters). Adding a
  stable `id` to `SessionHistoryItem` would remove this.
```

- [ ] **Step 4: Commit**

```bash
git add docs/supabase-setup.md CLAUDE.md
git commit -m "docs: document email+password cross-device sync"
```

---

## Self-Review

**Spec coverage:**
- Sign-up-only email+password -> Task 4 (auth.ts). ✓
- Confirm-email off / no recovery -> no confirmation code paths; documented Task 5. ✓
- `practice_state` migration (drop sessions) -> Task 1. ✓
- Full study-state snapshot -> Task 3 (`snapshotLocal`/`applyToLocal`). ✓
- Union-merge with monotonic-counter + history-cap rules -> Task 2 (`mergeState` + tests). ✓
- Push on finish / pull+merge on sign-in / dead-code removal -> Task 4. ✓
- AccountMenu rewrite -> Task 4. ✓
- `mergeState` unit tests -> Task 2. ✓
- Docs -> Task 5. ✓

**Placeholder scan:** No TBD/TODO; all steps carry full code. ✓

**Type consistency:** `PracticeState`/`CourseState` defined in Task 2 and imported unchanged in Tasks 3-4. `pushState()`/`pullAndMerge()` signatures match between sync.ts (Task 4) and AccountMenu/progressTracker callers. `AccountState { user }` consistent across auth.ts and AccountMenu. `setStateUpdatedAt`/`getStateUpdatedAt` defined Task 3, used Task 3-4. ✓

**Dashboard prerequisite:** Task 1's migration and the Task 5 auth toggles are applied by the user in the StayByPlan dashboard before the manual cross-device verification.
