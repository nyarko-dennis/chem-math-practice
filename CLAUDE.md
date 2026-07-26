# CLAUDE.md

Guidance for working in this repository.

## What this is

A Next.js (App Router) practice-quiz app for chemistry/math and several
nursing/engineering courses. Each course is a page under `app/<course>/` that
runs a self-contained quiz loop (configure → answer one question at a time →
check → review). All state is client-side; there is no backend or database.

## Commands

```bash
npm run dev      # local dev server on :3000 (Turbopack)
npm run build    # production build — the definitive check (runs tsc)
npm run lint     # eslint (see caveat below)
npm run test     # node --test — runs all lib/*.test.ts
```

Run a single test file: `node --test lib/checkAnswer.test.ts`

- **Node 22**, so tests are `.ts` and run through Node's built-in type
  stripping (no ts-node/jest). Because of that, **source-to-source imports must
  use explicit `.ts` extensions** (e.g. `import { x } from './foo.ts'`) — this
  is why `allowImportingTsExtensions` is enabled in `tsconfig.json`. Type
  stripping cannot transform TS-only syntax: **no `enum`, no `namespace`, no
  constructor parameter properties** (`constructor(private x)`), no decorators.
- Path alias `@/*` maps to the repo root (used by app code, not by tests).
- **Lint caveat:** the repo has pre-existing `react-hooks/set-state-in-effect`
  errors on several pages, and `next build` does not fail on them. Don't treat a
  red `npm run lint` as your changes being broken — check whether the errors are
  on lines you touched. Keep new code lint-clean; `npm run build` + `npm run
  test` are the real gates.

## Architecture

### Two question paradigms

1. **Curated banks** (nutrition, palliative, research, pharmacology, surgery,
   materials, and calculus' non-generated items): hand-written questions with a
   **stable `id`** and a `topic`/`category`. Shapes live in
   `lib/<course>Questions.ts` / `lib/<course>Types.ts`. MCQ/TF questions carry a
   `rationale`; drills carry a rubric.
2. **Generated** (math via `lib/generators.ts`, calculus basic-rules via
   `lib/calculusGenerators.ts`): questions are produced on the fly with a random
   id and a `type`/`category`. No stable identity, so only the *type* is
   trackable, not the individual question.

A typical course page holds the whole quiz in `useState` (started/finished,
questions, current index, selections, checked/feedback) and renders three
phases: config screen, in-progress question, finished screen. Several pages
have multiple modes (`quick` MCQ + `drill`/`case`/`calc`).

### Shared learning-efficiency layer

- **`lib/practiceStats.ts`** — localStorage-backed spaced repetition. Per
  question: a Leitner box + `dueAt`; per topic/type: seen/correct aggregates.
  - Curated pages select a session with `pickSpacedQuestions(courseId, pool,
    count)` (weights due → missed → unseen). Pass the **full topic pool**, not a
    pre-sampled subset.
  - Generated pages pick each next type with `pickWeightedType(courseId, keys)`
    (weights weaker/unseen types higher).
  - Every answer check calls `recordAttempt(courseId, { questionId?, topicKey,
    correct })`. `questionId` only for curated (stable-id) items. Record the
    **first attempt** when retry-before-solution is in play.
  - Analytics: `getTopicMastery`, `countDueQuestions`.
  - Scheduling logic is pure (rng + now injectable) and unit tested.
- **`components/ReviewList.tsx`** — post-quiz review of missed questions
  (supports plain text and LaTeX). Used on every finished screen.
- **`lib/checkAnswer.ts`** — answer comparison for generated math. Algebra uses
  **`lib/mathEquivalence.ts`** (a small symbolic evaluator that accepts any
  algebraically-equivalent rearrangement, verified numerically). Sig-figs check
  both value and displayed precision.
- **`lib/progressTracker.ts`** — per-course session history/accuracy, the
  in-progress "active session" (resume), and the daily practice **streak**
  (`getStreak`/`recordPracticeDay`, updated from `saveCourseProgress`).
- **`lib/courseLabels.ts`** — maps topic/type keys → human labels for analytics
  surfaces (the home dashboard).

### Persistence

Everything is **localStorage, per-device** — progress, spaced-repetition stats,
streaks, and in-progress sessions. There is no auth or sync. Keys are namespaced
by prefix + courseId. Guard all access with `typeof window` checks (these
modules are imported by client components but functions may run during SSR).

## Conventions

- Course pages are client components (`'use client'`) using Tailwind v4.
- Math is rendered with `MathDisplay` (KaTeX) and entered with `MathInput`
  (MathLive), both in `components/`.
- When adding a course or wiring a new one into the shared layer, mirror an
  existing page: spaced/weighted selection on start, `recordAttempt` on check,
  `saveCourseProgress` on finish, and a `ReviewList` on the finished screen.
- Add a `lib/<thing>.test.ts` for new pure logic; keep tests runnable under
  `node --test` (remember the `.ts` import-extension rule).

## Known follow-ups

- **Difficulty tiers** are implemented for *generated* content only (math has an
  easy/medium/hard selector). Curated banks have no difficulty metadata and
  would need a per-question tagging pass.
- **No cross-device sync.** A Supabase (email/password) auth + sync layer was
  scoped but not built; localStorage is the only store today.
