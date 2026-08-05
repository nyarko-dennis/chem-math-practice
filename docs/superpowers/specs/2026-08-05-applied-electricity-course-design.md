# Applied Electricity - course design

Date: 2026-08-05
Status: approved design, pre-plan
Student: Electrical Engineering (Robotics & Automation), Level 100, Pentecost University
Course: Applied Electricity (Level 100 EEE, second semester)

## Purpose

Add a practice-quiz course for Applied Electricity, the computational core of the
EEE major. The syllabus (authoritative source
`electrical-engineering/Level100_EEE_Second_Semester_Courses_and_Topics.pdf`) lists
eight topics:

DC circuits; Network theorems; Capacitors; Inductors; AC fundamentals; AC analysis;
Electrical power; Three-phase systems.

The course is calculation-heavy (Ohm's law, KCL/KVL, network theorems, phasors,
power, three-phase relationships), so the design uses a **hybrid** of on-the-fly
generated numeric problems plus curated concept banks, mirroring the Calculus course
the student already uses.

## Source material

- Lecturer deck `electrical-engineering/APPLIED ELECTRICTY  - Copy.pptx` (145 slides),
  extracted to `docs/appliedElectricity/source-extracts/lecture-deck.txt`. It is the
  authoring ground-truth. Coverage is good for DC circuits and network theorems,
  moderate for capacitors/inductors/AC fundamentals/power/three-phase, and **thin for
  AC analysis** (reactance/impedance/phasor appear only a handful of times).
- Where the deck is thin, standard first-year EE facts are permitted, but each such
  fact must be listed under "facts not found in extracts" in the authoring report
  (same rule the Materials build used).

## Decisions taken during brainstorm

1. **Format: hybrid** - generated numeric problems for computation + curated MCQ/TF
   banks for concepts.
2. **Learn mode: yes** - worked examples with step-by-step reveal + try-it, like Calculus.
3. **AC depth: full complex/phasor** - AC-analysis / three-phase answers may be complex
   numbers; the checker accepts rectangular (`a+jb`) and polar (`M∠θ°`) forms as equivalent.
4. **Drills: yes** - self-marking rubric drills, 3 per topic (24 total), like Materials.
5. **Curated bank size: 30 per topic (240 MCQ/TF total)**, Materials-level density.
6. **Accent color: orange.** Slug/id/route: `applied-electricity`.

## Architecture

### Routes and registry

- `/applied-electricity` - practice page (config → question → check → review).
- `/applied-electricity/learn` - Learn mode.
- `/applied-electricity/stats` - per-course stats (reuse existing stats route pattern).
- Register in `lib/courses.ts` COURSES (accent `orange`). Do **not** edit `app/page.tsx`
  directly - the dashboard reads the registry.

### Content paradigm A - generated numeric (`lib/aeGenerators.ts`)

Framework-free, `.ts`-extension imports. Each generator returns a question with a random
id, a `category` equal to the topic key, a difficulty (`easy`/`medium`/`hard`),
`instructions`, a `prompt` (LaTeX for MathDisplay), the canonical `correctAnswer`
(scalar-with-unit or complex), and a `solution` (worked steps for review/Learn try-it).

Categories and representative problems:

| category | problems |
|---|---|
| `dcCircuits` | Ohm's law solve for V/I/R; series & parallel resistance; voltage divider; current divider; power P=VI=I²R=V²/R |
| `capacitors` | series & parallel C; charge Q=CV; stored energy E=½CV²; RC time constant τ=RC |
| `inductors` | series & parallel L; stored energy E=½LI²; RL time constant τ=L/R; induced emf v=L·di/dt |
| `acFundamentals` | peak↔rms↔average conversions; period↔frequency; angular frequency ω=2πf |
| `acAnalysis` | inductive reactance Xl=ωL; capacitive reactance Xc=1/(ωC); series RL/RC/RLC impedance Z (complex); current phasor I=V/Z |
| `power` | real P, reactive Q, apparent S; power factor cosφ; P=VI·cosφ |
| `threePhase` | star/delta line↔phase voltage & current; total power √3·VL·IL·cosφ |
| `networkTheorems` | Thevenin voltage/resistance and Norton current on **fixed simple templates** (single source + 2-3 resistors); superposition on a two-source template |

Difficulty tiers apply to generated content only (consistent with math/calculus), varying
component counts and value ranges. `networkTheorems` generation is deliberately limited to
a few hand-built topologies because arbitrary topology generation is out of scope; broader
network-theorem practice lives in the curated bank + drills.

Selection uses `pickWeightedType(courseId, categoryKeys)`; every check calls
`recordAttempt(courseId, { topicKey: category, correct })` with **no** questionId (generated
items have no stable identity). Record the first attempt if retry-before-solution is enabled.

### Content paradigm B - curated MCQ/TF banks

- Types in `lib/appliedElectricityTypes.ts` (single definition site), mirroring
  `lib/materialsTypes.ts`:
  - `AppliedElectricityTopic` union of the 8 topic keys + `APPLIED_ELECTRICITY_TOPIC_LABELS`.
  - `MCQuestion { id; topic; type:'mcq'; prompt; choices:string[]; correctIndex; rationale }`
  - `TFQuestion { id; topic; type:'tf'; prompt; correctAnswer:boolean; rationale }`
  - `AppliedElectricityQuestion = MCQuestion | TFQuestion`
- One bank file per topic `lib/aeBank<Topic>.ts` exporting a 30-item array; barrel
  `lib/appliedElectricityQuestions.ts` concatenates all 8 and re-exports types + labels.
- Prompts may contain LaTeX (rendered by MathDisplay / ReviewList, both already LaTeX-aware).
- Concept focus per topic: theorem *statements* and conditions (Thevenin, Norton,
  superposition, maximum power transfer, reciprocity, Millman, KCL, KVL), definitions
  (rms/peak/average, reactance vs resistance, real/reactive/apparent power, power factor,
  star vs delta), and qualitative behaviour (capacitor/inductor transient & steady-state,
  phase relationships). Numeric-answer MCQs are allowed but computation is mainly the
  generated paradigm's job.
- Selection uses `pickSpacedQuestions(courseId, fullTopicPool, count)` (pass the full pool,
  not a pre-sampled subset); `recordAttempt` includes the stable `questionId`.

**Authoring rules (identical to the Materials build - front-load into every implementer task):**
- Ground every fact in `docs/appliedElectricity/source-extracts/`. Paraphrase, never copy;
  no 8+ word phrase shared with any extract (verify with an n-gram check). Standard
  first-year facts allowed where the deck is thin, but each disclosed in the report.
- MCQ: exactly 4 choices, exactly one correct, plausible distractors, never "all/none of
  the above", `correctIndex` balanced across 0-3.
- TF: one unambiguous non-compound claim per stem; exactly 4 true / 4 false per 8-TF block;
  each false stem is a genuine student misconception whose rationale explains why it is false.
- rationale: 1-3 sentences, plain language, **every technical term glossed in everyday
  words on every standalone use** (quiz draws are random, so each item must stand alone),
  e.g. `reactance (the opposition an inductor or capacitor gives to changing current)`.
- 30 items/topic ≈ 22 MCQ + 8 TF; difficulty roughly 1/3 recall, 1/3 understanding,
  1/3 applied. ids `<prefix>-001`… sequential per bank.

### Content paradigm B' - subjective drills (`lib/aeDrills.ts`)

3 drills per topic (24 total), mirroring `lib/materialsDrills.ts`:
`Drill { id; topic; drillKind; type:'drill'; prompt; marks; rubric:RubricPoint[]; modelAnswer }`.
- `drillKind` set adapted to this course, e.g. `deriveEquivalent` (Thevenin/Norton),
  `analyseCircuit`, `explainConcept`, `compare`, `computeStepwise`. Use ≥2 of each kind.
- 6-10 marks each; **rubric marks sum exactly to `drill.marks`**.
- modelAnswer 150-400 words, fully glossed per the plain-language rule.
- Self-marked on the finished screen (reveal rubric checkboxes, score = sum of ticked marks),
  exactly like Materials/Surgery.

### Numeric answer checker (`lib/aeAnswer.ts`) - new pure module

The core new logic. Pure functions (no React/Next), fully unit-tested. Public entry
compares a user string against a canonical answer descriptor.

Answer descriptor kinds:
- **Scalar**: `{ kind:'scalar', value:number, unit?:string, tol?:number }`. Parse the user
  string into a number + optional unit; apply SI prefix scaling (p, n, µ/u, m, k, M) so
  `4.7 kΩ` → 4700; compare value within relative tolerance (default ~1%). If a unit is
  present it must be dimensionally consistent with the expected unit (accept synonyms:
  `ohm`/`Ω`/`ohms`, `Hz`/`hz`, `F`, `H`, `V`, `A`, `W`, `VAR`, `VA`).
- **Complex**: `{ kind:'complex', re:number, im:number, tol?:number }`. Parse rectangular
  `a+jb` / `a+bj` / `a+bi` and polar `M∠θ` (θ in degrees, `∠` or `<` or `angle`). Normalize
  both to (re, im); accept if magnitude **and** phase are within tolerance, so a rectangular
  answer and its polar equivalent both pass.
- Sig-fig awareness where useful (reuse ideas from `lib/checkAnswer.ts`), but the primary
  gate is relative tolerance to avoid over-strict rejection of valid rounding.

The generated-content input widget is a plain text `<input>` (values, units, phasors);
MCQ uses buttons; drills are free-text self-marked. `MathInput` (MathLive) is **not** used
here - it targets LaTeX symbolic math, not scalar/complex numeric entry. Prompts render with
`MathDisplay`.

### Learn mode (`lib/aeLessons.ts` + `app/applied-electricity/learn/page.tsx`)

~8-10 lessons (roughly one per topic), mirroring `lib/calculusLessons.ts` +
`app/calculus/learn`: concept explanation, one or more worked examples with step-by-step
reveal, and a "try it" that hands the student a freshly generated problem of that category
and checks it with `aeAnswer`.

### Page composition (`app/applied-electricity/page.tsx`)

Adapt the Calculus page: a config screen selecting categories (the generated categories +
curated concept banks appear together) and a difficulty tier for generated content; then a
one-question-at-a-time loop that mixes generated draws (`pickWeightedType`) and curated draws
(`pickSpacedQuestions`); check with instant feedback (rationale for curated, worked
`solution` for generated); resume via `progressTracker`; on finish `saveCourseProgress`
(which updates streak and, if Supabase env is set, pushes state) and render a `ReviewList`
of missed items. Drills follow the Materials two-mode pattern (Quick vs Drill) or a separate
mode toggle - final page mode layout to be fixed in the plan against `app/surgery/page.tsx`
and `app/calculus/page.tsx`. New page needs `// eslint-disable-line
react-hooks/set-state-in-effect` on the `setMounted` line (repo convention).

### Shared-layer wiring (mandatory)

- `pickSpacedQuestions` / `pickWeightedType` on start; `recordAttempt` on every check;
  `saveCourseProgress` on finish; `ReviewList` on finished screen.
- `lib/courseLabels.ts`: add topic/category → human label mappings for analytics surfaces.
- Supabase cross-device sync is automatic through `saveCourseProgress` and inert unless env
  vars are set - no course-specific work.

## Testing

Node built-in runner, `.ts` imports with explicit extensions, no enum/namespace/param-props.

- `lib/aeAnswer.test.ts` - scalar tolerance pass/fail, SI-prefix scaling, unit synonyms,
  wrong-unit rejection, complex rectangular parsing, polar parsing, rectangular↔polar
  equivalence, phase/magnitude tolerance boundaries.
- `lib/aeGenerators.test.ts` - each category produces a solvable problem whose own
  `correctAnswer` passes `aeAnswer`; value ranges sane; difficulty honored; ids unique-ish.
- Per-bank invariant tests + a global barrel test: 240 total, 30/topic, unique ids,
  MCQ has 4 choices / exactly one correct, TF 4-true/4-false per 8-TF block.
- `lib/aeDrills.test.ts` - 24 drills, 3/topic, rubric marks sum to `drill.marks`, each
  `drillKind` used ≥2×, modelAnswer within length bounds.
- `lib/aeLessons.test.ts` - structural (each lesson has concept, ≥1 worked example with
  steps, a try-it category that exists in the generators).

## Build process

Follow `superpowers:subagent-driven-development` per the EE handoff:
- Branch `feat/applied-electricity-course`; ledger `.superpowers/sdd/progress-applied-electricity.md`.
- Code parts (types, `aeAnswer`, `aeGenerators`, `aeLessons`, page, learn page, registry
  wiring) built TDD by the controller.
- Curated banks (240 MCQ/TF) and drills (24) authored by subagents against the cached
  deck extracts with per-topic coverage checklists (Materials plan is the template),
  implementer → review (fact-check + n-gram originality) → fix → re-review per bank.
- Final whole-branch review, then `superpowers:finishing-a-development-branch` (merge + push).

## Out of scope / follow-ups

- Arbitrary circuit-topology generation for network theorems (only fixed templates generated;
  richer cases via curated bank + drills).
- Difficulty tiers on curated banks (none, consistent with the rest of the app).
- Interactive circuit diagrams / SVG schematics (prompts are text + LaTeX only for now).
