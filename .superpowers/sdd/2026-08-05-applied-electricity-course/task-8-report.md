## Task 8 report: Practice page (`app/applied-electricity/page.tsx`)

### What the page does

`'use client'` component, `COURSE_ID = 'applied-electricity'`. Single config screen with a
Practice/Drill mode toggle (mirrors surgery's quick/drill tab bar), one-question-at-a-time
loop, and a finished screen with `ReviewList`.

**Practice mode config:** 8 topic checkboxes (all `APPLIED_ELECTRICITY_TOPIC_LABELS`, default
all on, showing curated-count badges), a difficulty selector (`easy|medium|hard`, default
medium), and a question-count input (1-60, default 10).

**Practice mode loop** (`buildPracticeQueue`): for each of `practiceCount` slots — topic =
`pickWeightedType(COURSE_ID, selectedTopics)`; full curated pool for that topic =
`appliedElectricityQuestions.filter(q => q.topic === topic)`; a per-session `usedCurated` Set
tracks curated ids already drawn this session and is subtracted from the full pool before
calling `pickSpacedQuestions(COURSE_ID, available, 1)` — this satisfies "pass the full topic
pool" for the weighting algorithm while preventing the same curated item repeating within one
session. ~50% coin flip (`Math.random() < 0.5`) decides generated-vs-curated intent; falls back
to `AE_GENERATORS[topic](difficulty)` whenever the curated draw isn't wanted or the topic's
pool is exhausted for the session (`available.length === 0`).

- **Generated item:** `MathDisplay` renders `q.prompt` (block); answer via a plain text
  `<input>`; `checkAeAnswer(userInput, q.answer)` on check. First miss allows one retry
  (amber "try once more" message) before revealing `q.answerDisplay` + `q.solution` (both via
  `MathDisplay`) and locking in Incorrect. `recordAttempt(COURSE_ID, { topicKey: q.category,
  correct })` — no `questionId` — fired only on the **first** attempt.
- **Curated MCQ/TF:** button choices (no shuffle — bank prompts/choices are plain text, no
  `MathDisplay` needed), instant feedback + `rationale` on click of "Check Answer".
  `recordAttempt(COURSE_ID, { questionId: q.id, topicKey: q.topic, correct })`.

**Drill mode config:** same 8 topic checkboxes (drill-count badges from `aeDrills`) plus a
drill-count input capped at the pool size. `startDrillMode` filters `aeDrills` by selected
topics, Fisher-Yates shuffles, slices to count.

**Drill loop:** mirrors `app/surgery/page.tsx` — prompt shown, "Reveal Model Answer" button,
then `d.rubric` checkboxes with expandable detail, self-score = sum of ticked `marks`.
`recordAttempt(COURSE_ID, { questionId: drill.id, topicKey: drill.topic, correct: score >=
drill.marks / 2 })` fires once per drill (guarded by a `scoredDrills` set) when "Next Drill" is
clicked, not on every rubric toggle.

**Resume:** a single `useEffect` on mount checks `getActiveSession(COURSE_ID)`; if present shows
a "Session in Progress" banner (Resume/Discard) naming the saved mode. A second `useEffect`
persists the full mode-specific state (`saveActiveSession`) on every relevant state change while
`started && !finished`. `clearActiveSession` is called explicitly at the finish transition
(both modes), matching calculus's explicit-call pattern rather than a separate finish-effect.

**Finish:** `saveCourseProgress(COURSE_ID, { type: 'quick', correct, total })` for practice and
`{ type: 'drill', ... }` for drills — `SessionHistoryItem.type` is a fixed `'quick'|'drill'|
'math'` union in `lib/progressTracker.ts`, so `'practice'` isn't a valid literal; practice maps
to `'quick'` (same convention surgery/nutrition/etc. use for their MCQ/TF-mixed mode). Both
finished screens render `ReviewList` (practice: generated items get `promptIsLatex`/
`answerIsLatex`/`explanationIsLatex: true` with `q.answerDisplay` as the shown correct answer;
curated items are plain text with `q.rationale` as explanation). Drill finish screen also shows
per-drill and per-topic self-score breakdowns, matching surgery's layout.

Accent color: `sky` (unused by any other course so far — `lib/courses.ts` doesn't yet register
`applied-electricity`, that's task 10 per `progress.md`; `CourseTabs` degrades gracefully to a
default slate accent until then).

### Build / route / tests

- `npm run build`: **compiles successfully**, TypeScript passes, `/applied-electricity` appears
  in the route list (static).
- `npm run test`: **135/135 pass**, no regressions.
- `npx eslint app/applied-electricity/page.tsx`: 0 errors, 2 warnings (both "unused eslint-disable
  directive" on the `setMounted`/`useEffect` lines — kept per repo convention even though this
  particular effect shape doesn't trigger the rule; calculus/surgery have real
  `react-hooks/set-state-in-effect` errors elsewhere, confirming the documented lint caveat).

Commit: `1ce3913` — `feat(applied-electricity): practice page (generated + curated + drills)`
(1 file changed, 1071 insertions).

### Concerns

- Curated MCQ choices are **not shuffled** (surgery/other pages shuffle `correctIndex` per
  render). The brief's interface list didn't call for it and bank prompts/choices are plain
  text with a fixed answer-key position across the whole session; low risk but flagging since
  it's a deliberate scope-reduction versus the sibling pages' pattern.
- `saveCourseProgress` type mapping (`practice` → `'quick'`) is a judgment call forced by the
  existing `SessionHistoryItem.type` union — no dashboard code branches on the literal value
  today (verified via grep), so this is safe, but worth knowing if task 10 wires up
  type-specific analytics.
- `lib/courses.ts` still has no `applied-electricity` entry (expected — task 10), so `CourseTabs`
  shows without the course name/accent dot until that lands.

## Fix: shuffle curated MCQ choices (coordinator review)

**Issue:** curated MCQ choice order was never shuffled. Every other curated-MCQ course
(surgery, materials, nutrition, palliative, pharmacology, research) shuffles via a `shuffleMCQ`
helper. Since Applied Electricity's curated items resurface through the Leitner spaced-repetition
scheduler, a fixed answer position would let a student memorize "the answer is option B" instead
of the content.

**Change:** added `ShuffledMCQ`/`shuffleMCQ` (identical Fisher-Yates + index-remap logic to
`app/surgery/page.tsx`) and a `shuffles: Record<string, ShuffledMCQ>` state.

- `buildPracticeQueue` now returns `{ items, shuffles }`: every curated MCQ drawn into the queue
  gets `shuffleMCQ(picked)` computed once at build time and stored keyed by question id.
  `startPractice` sets both `queue` and `shuffles`.
- `checkPractice`'s curated-MCQ branch compares `sel === sh.correctDisplayIndex` (falls back to
  `q.correctIndex` if a shuffle entry is somehow missing) instead of the raw bank index, so
  `recordAttempt`'s `correct` value and the on-screen feedback stay accurate against the
  *displayed* choice order.
- The in-progress render uses `sh.displayChoices` / `sh.correctDisplayIndex` for button
  labels/highlighting; the TF branch's `isAnswer` check was tightened to
  `q.type === 'tf' && opt.value === q.correctAnswer` (explicit guard) because the ternary's
  `q.type === 'mcq' && sh` condition is a compound expression TypeScript can't narrow through in
  the `else` arm — mirrors surgery's exact same guard for the same reason.
- The finished-screen `ReviewList` builder now reads `sh.displayChoices[sh.correctDisplayIndex]`
  / `sh.displayChoices[sel]` for `correctAnswer`/`yourAnswer` so the review shows the same choice
  text the student actually saw.
- `shuffles` is persisted in `saveActiveSession`/restored in `resumeSession`/cleared in
  `resetAll`, so a resumed mid-session MCQ keeps its original shuffle rather than re-shuffling
  (which would desync `selections` indices from the displayed order).

**Verification:**
- `npm run build`: compiles, TypeScript passes, `/applied-electricity` still in the route list.
- `npm run test`: 135/135 pass, no regressions.
- `npx eslint app/applied-electricity/page.tsx`: 0 errors, same 2 pre-existing harmless
  "unused eslint-disable directive" warnings as before.

Commit: `cf92fa1` — `fix(applied-electricity): shuffle curated MCQ choices (match sibling courses)`
(1 file changed, 53 insertions, 10 deletions).

## Fix: fail-safe render/score for curated MCQ missing shuffle entry (coordinator review)

**Issue:** the shuffle fix's render gate was `q.type === 'mcq' && sh ? <mcq buttons> : <True/False buttons>`,
where `sh = shuffles[q.id]`. A curated MCQ item reachable in the queue with no `shuffles[q.id]`
entry — the concrete case being a session saved *before* the shuffle fix, then resumed after it —
fell through to the True/False renderer: an MCQ question showed True/False buttons and was
auto-scored wrong regardless of what the user clicked (`sel === q.correctAnswer` compares a
`number` selection to a `boolean`, always `false`).

**Change:** implemented both of the coordinator's suggested layers.

1. **`mcqDisplayFor(q, shuffles)`** — new module-level helper, single source of truth for "how
   should this MCQ's choices display." Returns `null` for TF items; for MCQ items returns
   `shuffles[q.id]` if present, otherwise an **identity** `ShuffledMCQ` built straight from
   `q.choices`/`q.correctIndex` (raw bank order — deliberately *not* a fresh `shuffleMCQ()` call,
   since a random reshuffle here would desync any `selections[q.id]` index already recorded
   against the order the user actually saw). `checkPractice`, the in-progress render, and the
   finished-screen `ReviewList` builder were all switched to call this helper instead of reading
   `shuffles[q.id]` directly — an MCQ item now *always* has a non-null display object, so the
   `q.type === 'mcq' && sh` render gate can never fall through to the TF branch for a real MCQ.
2. **`resumeSession` backfill** — after restoring `queue`/`shuffles` from the saved session, walks
   the restored queue and adds an identity `ShuffledMCQ` entry (same raw-order construction as the
   helper's fallback) into the `shuffles` map for every curated MCQ item that doesn't already have
   one, before calling `setShuffles`. This makes the persisted `shuffles` map complete going
   forward (so it round-trips through subsequent `saveActiveSession` calls too), on top of the
   helper already making the gap harmless at read time.

TF and generated-question code paths are untouched.

**Verification:**
- `npm run build`: compiles, TypeScript passes, `/applied-electricity` still in the route list.
- `npm run test`: 135/135 pass, no regressions.
- `npx eslint app/applied-electricity/page.tsx`: 0 errors, same 2 pre-existing harmless warnings.
- **Manual browser repro** (`preview_start` + seeded `localStorage`): wrote a legacy active-session
  object for `applied-electricity` — one curated MCQ item (`aedc-001`, Ohm's law) in the queue with
  **no `shuffles` key at all**, matching exactly what a pre-fix save would look like — then loaded
  `/applied-electricity`, clicked Resume, and confirmed the question rendered as **Multiple
  Choice** with all 4 real choices (A–D: `V = IR`, `V = I/R`, `R = VI`, `P = IR`), not True/False.
  Selected the raw-order correct choice (A) and checked: scored **Correct!** with the real
  rationale. Confirms both the render and scoring gaps are closed.

Commit: `0ba02cb` — `fix(applied-electricity): fail-safe render/score for curated MCQ missing shuffle entry`
(1 file changed, 44 insertions, 8 deletions).
