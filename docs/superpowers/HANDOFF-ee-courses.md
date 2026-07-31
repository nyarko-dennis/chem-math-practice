# Handoff — EE course banks (chem-math-practice)

Next session continues building practice courses for an electrical-engineering student
(Robotics & Automation, Level 100, Pentecost University). This doc carries the authoring
recipe, conventions, pitfalls, and remaining topic lists so you can generate banks without
re-deriving context.

## State shipped (all on `main`, pushed)

- **Calculus** (2026-07-22): `/calculus` + `/calculus/learn`. Generated basic-rule
  derivatives + 3 static banks (implicit/higher-order, partial, applications) + Learn mode
  (10 lessons, step-by-step worked examples, try-it). Answer checking via
  `lib/calculusAnswer.ts` `normalizeCalculusLatex` (MathLive input → canonical LaTeX; handles
  `\sin`→`sin`, `^{n}`→`^n`, frac flatten). Spec: `docs/superpowers/specs/2026-07-22-calculus-course-design.md`.
- **Engineering Materials** (2026-07-23): `/materials` (Quick MCQ/TF + Subjective Drill
  two-mode page, mirrors `app/surgery/page.tsx`) + `/materials/stats`. **240 MCQ/TF** across
  8 topic banks + **24 self-marking drills**. Spec: `docs/superpowers/specs/2026-07-22-materials-course-design.md`.
  Plan (has FULL per-topic coverage checklists — reuse as the template):
  `docs/superpowers/plans/2026-07-22-materials-course.md`.
- Home page redesigned (not by course work): cards live in `lib/courses.ts` (COURSES registry),
  `/courses` route, per-course `/stats`. Add new courses to `lib/courses.ts`, not `app/page.tsx`.

## App shape

- Next.js App Router, TS strict, Tailwind. Node 26 built-in test runner.
- `lib/*.ts` framework-free (no React/Next). **Cross-file imports in lib + `*.test.ts` need
  explicit `.ts` extension** (e.g. `from './materialsTypes.ts'`). `allowImportingTsExtensions`
  on. Production `app/` imports use `@/` WITHOUT extension.
- Commands: `npm test` (node --test, all `lib/*.test.ts`), `npm run build` (definitive, runs
  tsc), `npm run lint`. Run one test: `node --test lib/foo.test.ts`.
- Persistence: localStorage via `lib/progressTracker.ts` (courseId string per course). Reuse it.
- Home card accent colors used: blue/emerald/violet/indigo/rose/amber/teal(calculus)/cyan(materials).

## Knowledge-course authoring recipe (worked well for Materials — reuse verbatim)

Subagent-driven: one bank per task, fresh implementer per topic, review after each. Model:
implementers + reviewers on standard tier (`sonnet`); barrel/home-card transcription tasks on
cheap tier (`haiku`).

Per bank (30 items): implementer READS the committed source extracts for that topic, then
AUTHORS original questions against a **coverage checklist** (every checklist bullet → ≥1
question). Reviewer FACT-CHECKS every keyed answer against the same extracts + runs an n-gram
originality check. Controller fixes findings via a fix subagent, re-reviews, then marks the
task complete in a ledger file.

### Binding authoring rules (front-load ALL of these into every implementer dispatch)

- Ground every fact in committed extracts under `docs/<course>/source-extracts/`. **Paraphrase —
  never copy. No 8+ word phrase shared with any extract (verify with an n-gram check).** Where
  extracts thin, standard first-year facts allowed BUT each must be listed in the implementer's
  report under "facts not found in extracts".
- MCQ: exactly 4 choices, exactly one correct, plausible distractors, **never "all/none of the
  above"**, correctIndex roughly balanced across 0-3.
- TF: **one unambiguous NON-COMPOUND claim** (one fact per stem, no "and"/"so"-chained
  assertions). **Exactly 4 true / 4 false per 8-TF bank** (false = genuine student
  misconception, rationale explains why false).
- rationale: 1-3 sentences, plain language, **every technical term glossed in everyday words on
  EVERY standalone use** — not just first use in file (quiz draws are random; each item must
  stand alone). Gloss style: `austenite (the form iron takes when very hot)`.
- 30 items/topic: ~22 MCQ + ~8 TF. Difficulty ~1/3 recall, 1/3 understanding, 1/3 applied.
- ids `<prefix>-001`.. sequential. Framework-free, `.ts` imports.

### Recurring pitfalls (caught repeatedly in Materials — pre-empt them)

1. TF sets drift all-true. A **TF-balance test now exists** — but tell implementer 4/4 up front.
2. Compound TF stems (needed fixes in 3 banks). One claim per stem.
3. Near-verbatim phrase lifts from extracts. Enforce n-gram check.
4. Jargon glossed only on first use in file. Sweep for repeat standalone uses.
5. Duplicate question angle across two banks (e.g. same fact as MCQ in two topics). Re-angle.
6. Undisclosed standard-fact substitution — reviewer must be strict on thin-extract topics.

### Data model (Materials — copy shape for next knowledge courses)

`lib/materialsTypes.ts` (single definition site, imported everywhere):
```ts
export type MaterialsTopic = 'introClassification' | 'atomicCrystal' | ... ;
export const MATERIALS_TOPIC_LABELS: Record<MaterialsTopic, string>;
export interface MCQuestion { id; topic; type:'mcq'; prompt; choices:string[]; correctIndex; rationale }
export interface TFQuestion { id; topic; type:'tf'; prompt; correctAnswer:boolean; rationale }
export type MaterialsQuestion = MCQuestion | TFQuestion;
// drills:
export type MaterialsDrillKind = 'defineTerms'|'classify'|'explainProcess'|'compare'|'selectMaterial';
export interface RubricPoint { id; label; detail; marks }
export interface MaterialsDrill { id; topic; drillKind; type:'drill'; prompt; marks; rubric:RubricPoint[]; modelAnswer }
```
- Per-topic bank file `lib/materialsBank<Topic>.ts` exports one array; barrel
  `lib/materialsQuestions.ts` concatenates all 8 + re-exports types/labels; global-invariant test
  asserts 240 total / 30 per topic / unique ids.
- Drills `lib/materialsDrills.ts`: 24 (3/topic), 6-10 marks each, **rubric marks sum exactly to
  drill.marks**, all 5 kinds used ≥2×, model answer 150-400 words fully glossed. Test guards the
  marks-sum + kind-usage + 3-per-topic.
- Page `app/materials/page.tsx`: adapt `app/surgery/page.tsx` (Quick MCQ/TF instant feedback +
  rationale; Drill reveal-rubric-checkboxes self-mark, score = sum ticked marks; resume via
  progressTracker; finish screens). New page needs `// eslint-disable-line
  react-hooks/set-state-in-effect` on the setMounted line (repo convention).

## Reference: the 8 Materials topics (already shipped — model of good scoping)

`introClassification, atomicCrystal, solidificationDefects, mechanicalTesting, ironCarbonHeat,
steelProduction, ferrousSteels, corrosionAdvanced`. Full per-topic coverage checklists are in the
Materials plan file — read it as the pattern for how granular a checklist should be.

## Remaining 6 courses (each = own spec→plan→build cycle)

Authoritative topic source: `electrical-engineering/Level100_EEE_Second_Semester_Courses_and_Topics.pdf`.
Other files in that folder are mostly copyrighted textbooks or irrelevant. Extracted topic lists:

- **Applied Electricity** (core to major; only 1 thin lecture deck `APPLIED ELECTRICTY - Copy.pptx`
  as source — likely needs standard first-year EE content): DC circuits; Network theorems;
  Capacitors; Inductors; AC fundamentals; AC analysis; Electrical power; Three-phase systems.
  NOTE: this course is computational (Ohm's law, node/mesh, phasors) — may want the calculus-style
  generated-numeric + normalizer approach, not pure MCQ. Decide format at brainstorm.
- **Renewable Energy**: Intro; Solar; Wind; Hydropower; Biomass; Geothermal; Ocean; Energy storage;
  Smart grid; Efficiency; Economics. Sources: lecturer's own deck + Kanoglu/Cengel textbook (copyrighted).
- **Leadership & Development**: Leadership concepts; Theories; Styles; Communication; Decision making;
  Team building; Emotional intelligence; Development.
- **African Studies**: History; Geography; Colonialism; Independence; Culture; Economy; Politics; AU.
- **French II**: Greetings; Introductions; Numbers; Time; Family; Grammar; Reading; Writing; Speaking.
  Language practice — NOT MCQ-shaped; needs different format (brainstorm before building).
- **Ethics of Hard Work** (PDF lists this) vs **Environmental Studies** (timetable image lists this).
  Discrepancy: memory said Environmental Studies remains, but the topics PDF names "Ethics of Hard
  Work" instead. **Confirm with user which course before building.** Ethics topics per PDF: Work
  ethics; Integrity; Discipline; Accountability; Time management; Teamwork; Leadership.

## Process to run (subagent-driven-development skill)

1. `superpowers:brainstorming` → decide format (MCQ/drill vs generated-numeric vs language) per course.
2. `superpowers:writing-plans` → plan with per-topic coverage checklists (materials plan = template).
3. `superpowers:subagent-driven-development` → branch `feat/<course>-course`, ledger at
   `.superpowers/sdd/progress-<course>.md`, task-brief per task, implementer→review→fix→re-review loop.
4. Final whole-branch review (opus), then `superpowers:finishing-a-development-branch` (merge+push).

Materials build committed 13 tasks + final review + polish. Ledger from that build:
`.superpowers/sdd/progress-materials.md`. Extract text cached under
`docs/materials/source-extracts/`.
