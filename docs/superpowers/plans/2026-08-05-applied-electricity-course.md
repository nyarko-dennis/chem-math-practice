# Applied Electricity Course Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship an Applied Electricity practice course - hybrid generated-numeric + curated MCQ/TF + rubric drills + Learn mode - wired into the shared spaced-repetition, progress, and sync layer.

**Architecture:** Two content paradigms feed one course id (`applied-electricity`). Generated numeric problems (8 categories, easy/medium/hard) are produced on the fly and checked by a new pure `aeAnswer` module that understands scalars-with-units and complex/phasor answers (rectangular ↔ polar equivalence). Curated MCQ/TF banks (240) and rubric drills (24) mirror the Materials data model. A practice page and a Learn page mirror the Calculus and Surgery pages.

**Tech Stack:** Next.js App Router, TypeScript strict, Tailwind v4, KaTeX (`MathDisplay`), Node built-in test runner (`node --test`, `.ts` sources).

## Global Constraints

- **Node 22 type-stripping:** cross-file imports inside `lib/` and every `*.test.ts` use explicit `.ts` extensions (e.g. `from './aeAnswer.ts'`). Production `app/` imports use `@/` WITHOUT extension. No `enum`, no `namespace`, no constructor parameter properties, no decorators.
- **Gates:** `npm run build` (runs `tsc`) and `npm run test` are the real gates. `npm run lint` has pre-existing `react-hooks/set-state-in-effect` errors on other pages - keep new code lint-clean but a red lint from those pre-existing lines is not a failure.
- **Course id / route slug:** `applied-electricity`. Accent color orange (`#EA580C`, `text-orange-600`, `text-orange-700`).
- **Shared-layer wiring is mandatory:** spaced/weighted selection on start, `recordAttempt` on every check, `saveCourseProgress` on finish, `ReviewList` on the finished screen.
- **Authoring rules (all curated content):** ground every fact in `docs/appliedElectricity/source-extracts/lecture-deck.txt`; paraphrase, never copy (no 8+ word phrase shared with the extract - verify with an n-gram check); standard first-year EE facts allowed where the deck is thin but each disclosed in the report under "facts not found in extracts"; every technical term glossed in everyday words on EVERY standalone use (quiz draws are random); plain language throughout.
- **Topic keys (used by BOTH generated categories and curated banks):** `dcCircuits`, `networkTheorems`, `capacitors`, `inductors`, `acFundamentals`, `acAnalysis`, `power`, `threePhase`.

---

## File Structure

**New library files**
- `lib/appliedElectricityTypes.ts` - topic union + labels; MCQ/TF/drill/rubric interfaces + drill-kind labels. Single definition site.
- `lib/aeAnswer.ts` - pure numeric/complex answer checker + `AnswerDescriptor` type. New core logic.
- `lib/aeGenerators.ts` - generated-numeric question builders/generators (`AeGeneratedQuestion`).
- `lib/aeBankDcCircuits.ts`, `lib/aeBankNetworkTheorems.ts`, `lib/aeBankCapacitors.ts`, `lib/aeBankInductors.ts`, `lib/aeBankAcFundamentals.ts`, `lib/aeBankAcAnalysis.ts`, `lib/aeBankPower.ts`, `lib/aeBankThreePhase.ts` - 30 curated MCQ/TF each.
- `lib/appliedElectricityQuestions.ts` - barrel concatenating the 8 banks + re-exporting types/labels.
- `lib/aeDrills.ts` - 24 rubric drills (3/topic).
- `lib/aeLessons.ts` - Learn-mode lessons.

**New test files**
- `lib/aeAnswer.test.ts`, `lib/aeGenerators.test.ts`, `lib/appliedElectricityQuestions.test.ts` (barrel invariants), `lib/aeDrills.test.ts`, `lib/aeLessons.test.ts`, and per-bank invariant tests are folded into the barrel test (asserts per-topic counts) plus a TF-balance assertion.

**New app files**
- `app/applied-electricity/page.tsx` - practice page (mirrors `app/calculus/page.tsx` + `app/surgery/page.tsx`).
- `app/applied-electricity/learn/page.tsx` - Learn mode (mirrors `app/calculus/learn/page.tsx`).
- `app/applied-electricity/stats/page.tsx` - per-course stats (mirrors `app/calculus/stats/page.tsx`).

**Modified files**
- `lib/courses.ts` - append the `applied-electricity` `CourseMeta`.
- `lib/courseLabels.ts` - add `APPLIED_ELECTRICITY_TOPIC_LABELS` to `COURSE_TOPIC_LABELS`.

---

## Task 1: Shared types (`appliedElectricityTypes.ts`)

**Files:**
- Create: `lib/appliedElectricityTypes.ts`
- Test: (none - pure type/label module; consumed and thus type-checked by later tasks and `npm run build`)

**Interfaces:**
- Produces: `AppliedElectricityTopic` (8-key union), `APPLIED_ELECTRICITY_TOPIC_LABELS: Record<AppliedElectricityTopic,string>`, `MCQuestion`, `TFQuestion`, `AppliedElectricityQuestion`, `AeDrillKind`, `AE_DRILL_LABELS`, `RubricPoint`, `AeDrill`.

- [ ] **Step 1: Write the module**

```ts
export type AppliedElectricityTopic =
  | 'dcCircuits'
  | 'networkTheorems'
  | 'capacitors'
  | 'inductors'
  | 'acFundamentals'
  | 'acAnalysis'
  | 'power'
  | 'threePhase';

export const APPLIED_ELECTRICITY_TOPIC_LABELS: Record<AppliedElectricityTopic, string> = {
  dcCircuits: 'DC Circuits (Ohm’s law, series/parallel, dividers, power)',
  networkTheorems: 'Network Theorems (Thevenin, Norton, superposition, max power, KCL/KVL)',
  capacitors: 'Capacitors (charge, energy, series/parallel, RC)',
  inductors: 'Inductors (energy, series/parallel, RL, induced emf)',
  acFundamentals: 'AC Fundamentals (peak/rms/average, period, frequency)',
  acAnalysis: 'AC Analysis (reactance, impedance, phasors)',
  power: 'Electrical Power (real/reactive/apparent, power factor)',
  threePhase: 'Three-Phase Systems (star/delta, line/phase, total power)',
};

export interface MCQuestion {
  id: string;
  topic: AppliedElectricityTopic;
  type: 'mcq';
  prompt: string; // may contain LaTeX
  choices: string[];
  correctIndex: number;
  rationale: string;
}

export interface TFQuestion {
  id: string;
  topic: AppliedElectricityTopic;
  type: 'tf';
  prompt: string;
  correctAnswer: boolean;
  rationale: string;
}

export type AppliedElectricityQuestion = MCQuestion | TFQuestion;

export type AeDrillKind =
  | 'deriveEquivalent'
  | 'analyseCircuit'
  | 'explainConcept'
  | 'compare'
  | 'computeStepwise';

export const AE_DRILL_LABELS: Record<AeDrillKind, string> = {
  deriveEquivalent: 'Derive an equivalent circuit (Thevenin/Norton)',
  analyseCircuit: 'Analyse a circuit for the requested quantities',
  explainConcept: 'Explain a concept or law in plain terms',
  compare: 'Compare / contrast two ideas',
  computeStepwise: 'Compute a result showing each step',
};

export interface RubricPoint {
  id: string;
  label: string;
  detail: string;
  marks: number;
}

export interface AeDrill {
  id: string;
  topic: AppliedElectricityTopic;
  drillKind: AeDrillKind;
  type: 'drill';
  prompt: string;
  marks: number;
  rubric: RubricPoint[];
  modelAnswer: string;
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no new errors referencing `appliedElectricityTypes.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/appliedElectricityTypes.ts
git commit -m "feat(applied-electricity): shared question/drill types"
```

---

## Task 2: Numeric/complex answer checker (`aeAnswer.ts`)

The core new logic. Pure functions, fully unit-tested. `checkAeAnswer(user, expected)` returns whether the user's typed string matches the canonical answer.

**Files:**
- Create: `lib/aeAnswer.ts`
- Test: `lib/aeAnswer.test.ts`

**Interfaces:**
- Produces:
  - `type AnswerDescriptor = { kind: 'scalar'; value: number; unit?: string; tol?: number } | { kind: 'complex'; re: number; im: number; tol?: number }`
  - `parseScalar(input: string): { value: number; unit: string | null } | null`
  - `parseComplex(input: string): { re: number; im: number } | null`
  - `checkAeAnswer(user: string, expected: AnswerDescriptor): boolean`
- Consumed by: `aeGenerators.ts` (Task 3), the practice page (Task 8), and Learn try-it (Task 9).

**Design notes (implement to satisfy the tests below):**
- SI prefixes (case-sensitive): `p=1e-12, n=1e-9, u=1e-6, µ=1e-6, m=1e-3, k=1e3, K=1e3, M=1e6, G=1e9`.
- Unit synonyms collapse to a canonical dimension so a wrong unit can be rejected but a synonym is accepted: `ohm|ohms|Ω -> ohm`; `hz -> hz`; `v|volt|volts -> v`; `a|amp|amps|ampere -> a`; `f|farad -> f`; `h|henry -> h`; `w|watt|watts -> w`; `var -> var`; `va -> va`; `s|sec|second|seconds -> s`; `rad/s -> rad/s`; angle unit `deg|°` handled inside `parseComplex`.
- Scalar match: `|user.value - expected.value| <= (expected.tol ?? 0.01) * max(|expected.value|, 1e-9)`. If `expected.unit` is set AND the user supplied a unit, the canonical dimensions must match; if the user omits a unit, accept on value alone.
- Complex match: convert both operands to `(re, im)`; accept if `hypot(userRe-expRe, userIm-expIm) <= (expected.tol ?? 0.02) * max(hypot(expRe,expIm), 1e-9)`. This single metric makes a rectangular answer and its polar equivalent both pass.
- `parseComplex` accepts rectangular `a+jb`, `a+bj`, `a+bi`, `a-jb`, bare real `a`, bare imaginary `jb`/`bj`; and polar `M∠θ`, `M<θ`, `M angle θ` with `θ` in degrees (convert: `re=M*cos, im=M*sin`). Strip any trailing unit before parsing.

- [ ] **Step 1: Write the failing tests**

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseScalar, parseComplex, checkAeAnswer, type AnswerDescriptor } from './aeAnswer.ts';

test('parseScalar: SI prefix scaling and unit capture', () => {
  assert.deepEqual(parseScalar('4.7 kΩ'), { value: 4700, unit: 'ohm' });
  assert.deepEqual(parseScalar('10mA'), { value: 0.01, unit: 'a' });
  assert.deepEqual(parseScalar('2.2 µF'), { value: 2.2e-6, unit: 'f' });
  assert.deepEqual(parseScalar('50'), { value: 50, unit: null });
});

test('checkAeAnswer scalar: value tolerance', () => {
  const exp: AnswerDescriptor = { kind: 'scalar', value: 4700, unit: 'ohm' };
  assert.equal(checkAeAnswer('4.7 kΩ', exp), true);
  assert.equal(checkAeAnswer('4700 ohms', exp), true);
  assert.equal(checkAeAnswer('4720', exp), false); // >1% off, unitless still checked on value
});

test('checkAeAnswer scalar: wrong unit rejected, missing unit accepted', () => {
  const exp: AnswerDescriptor = { kind: 'scalar', value: 5, unit: 'a' };
  assert.equal(checkAeAnswer('5 V', exp), false);  // wrong dimension
  assert.equal(checkAeAnswer('5', exp), true);     // no unit -> value only
  assert.equal(checkAeAnswer('5 A', exp), true);
});

test('parseComplex: rectangular and polar', () => {
  assert.deepEqual(parseComplex('3+j4'), { re: 3, im: 4 });
  assert.deepEqual(parseComplex('3+4i'), { re: 3, im: 4 });
  const p = parseComplex('5∠53.13');
  assert.ok(p && Math.abs(p.re - 3) < 1e-2 && Math.abs(p.im - 4) < 1e-2);
});

test('checkAeAnswer complex: rectangular <-> polar equivalence', () => {
  const exp: AnswerDescriptor = { kind: 'complex', re: 3, im: 4 };
  assert.equal(checkAeAnswer('3+j4', exp), true);
  assert.equal(checkAeAnswer('5∠53.13', exp), true); // polar equivalent
  assert.equal(checkAeAnswer('3+j5', exp), false);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test lib/aeAnswer.test.ts`
Expected: FAIL (module/exports not defined).

- [ ] **Step 3: Implement `aeAnswer.ts`** to satisfy the tests, following the Design notes above. Keep every function pure and self-contained.

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test lib/aeAnswer.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/aeAnswer.ts lib/aeAnswer.test.ts
git commit -m "feat(applied-electricity): scalar+complex answer checker"
```

---

## Task 3: Generated-numeric problems (`aeGenerators.ts`)

**Files:**
- Create: `lib/aeGenerators.ts`
- Test: `lib/aeGenerators.test.ts`

**Interfaces:**
- Consumes: `AppliedElectricityTopic` (Task 1); `AnswerDescriptor`, `checkAeAnswer` (Task 2); `Difficulty` from `./generators.ts` (`'easy'|'medium'|'hard'`).
- Produces:
  - `interface AeGeneratedQuestion { id: string; category: AppliedElectricityTopic; source: 'generated'; difficulty: Difficulty; instructions: string; prompt: string; answer: AnswerDescriptor; answerDisplay: string; solution: string }`
  - `randId(): string`
  - One generator per category: `generateDcCircuits`, `generateCapacitors`, `generateInductors`, `generateAcFundamentals`, `generateAcAnalysis`, `generatePower`, `generateThreePhase`, `generateNetworkTheorems` - each `(d?: Difficulty) => AeGeneratedQuestion`.
  - `AE_GENERATORS: Record<AppliedElectricityTopic, (d?: Difficulty) => AeGeneratedQuestion>` (barrel used by page + lessons + tests).

**Design notes:**
- Reuse the `byDifficulty(d, easy, medium, hard)` pattern from `lib/generators.ts` for value ranges / element counts. `randId()` = `Math.random().toString(36).slice(2, 11)` (same as calculus).
- `prompt` is LaTeX for `MathDisplay`. `answerDisplay` is the human canonical string (e.g. `"4.7\\ \\text{k}\\Omega"` or `"3+j4\\ \\Omega"`) used on the review/feedback screen. `answer` is the machine `AnswerDescriptor`.
- `networkTheorems` generation is limited to fixed templates: a single voltage source with two resistors for Thevenin (Vth = V·R2/(R1+R2), Rth = R1∥R2) and its Norton dual. Do NOT attempt arbitrary topology.
- `acAnalysis` / `threePhase` may emit `kind:'complex'` answers (e.g. series RL impedance `Z = R + jX`). Others are `kind:'scalar'` with the right unit.

- [ ] **Step 1: Write the failing tests**

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AE_GENERATORS, type AeGeneratedQuestion } from './aeGenerators.ts';
import { checkAeAnswer } from './aeAnswer.ts';
import { APPLIED_ELECTRICITY_TOPIC_LABELS } from './appliedElectricityTypes.ts';

const topics = Object.keys(APPLIED_ELECTRICITY_TOPIC_LABELS) as (keyof typeof APPLIED_ELECTRICITY_TOPIC_LABELS)[];

test('a generator exists for every topic', () => {
  for (const t of topics) assert.equal(typeof AE_GENERATORS[t], 'function', `missing generator: ${t}`);
});

test('every generated question is self-consistent: its own canonical answer passes the checker', () => {
  for (const t of topics) {
    for (const d of ['easy', 'medium', 'hard'] as const) {
      for (let i = 0; i < 25; i++) {
        const q: AeGeneratedQuestion = AE_GENERATORS[t](d);
        assert.equal(q.category, t);
        assert.ok(q.prompt.length > 0 && q.solution.length > 0 && q.answerDisplay.length > 0);
        // The displayed canonical answer must satisfy the machine descriptor.
        assert.equal(
          checkAeAnswer(stripLatex(q.answerDisplay), q.answer),
          true,
          `${t}/${d} answerDisplay "${q.answerDisplay}" failed its own checker`,
        );
      }
    }
  }
});

// Helper: reduce a LaTeX answerDisplay to a plain typed form the checker parses.
function stripLatex(s: string): string {
  return s
    .replace(/\\\\ /g, ' ')
    .replace(/\\text\{([^}]*)\}/g, '$1')
    .replace(/\\Omega/g, 'Ω')
    .replace(/\\angle/g, '∠')
    .replace(/[{}]/g, '')
    .trim();
}
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test lib/aeGenerators.test.ts`
Expected: FAIL (module not defined).

- [ ] **Step 3: Implement generators** one category at a time, re-running the test after each so the self-consistency assertion guards every category. Ensure `answerDisplay` (after `stripLatex`) is parseable by `aeAnswer` - keep it simple (avoid decorative LaTeX the stripper doesn't handle).

- [ ] **Step 4: Run to verify it passes**

Run: `node --test lib/aeGenerators.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/aeGenerators.ts lib/aeGenerators.test.ts
git commit -m "feat(applied-electricity): generated numeric problems (8 categories)"
```

---

## Tasks 4a-4h: Curated MCQ/TF banks (one task per topic, 30 items each)

Each of the eight tasks is identical in shape - only the topic key, file name, id prefix, and coverage checklist differ. Author with a fresh subagent per topic; review (fact-check + n-gram originality) before marking complete. **Repeat the full procedure per task; do not cross-reference.**

**Per-task shape (substitute from the table):**
- Create: `lib/aeBank<Name>.ts` exporting `export const <camelTopic>Questions: AppliedElectricityQuestion[]` of exactly 30 items.
- Consumes: `MCQuestion`, `TFQuestion`, `AppliedElectricityQuestion` from `./appliedElectricityTypes.ts`.
- Composition: ~22 MCQ + 8 TF. TF block **exactly 4 true / 4 false**. MCQ each exactly 4 choices, exactly one correct, `correctIndex` spread across 0-3, never "all/none of the above".
- ids: `<prefix>-001` .. `<prefix>-030`, sequential.
- rationale 1-3 sentences, plain language, every technical term glossed on every standalone use.
- Difficulty mix ~1/3 recall, 1/3 understanding, 1/3 applied.

| task | topic key | file | export | id prefix |
|---|---|---|---|---|
| 4a | `dcCircuits` | `lib/aeBankDcCircuits.ts` | `dcCircuitsQuestions` | `aedc` |
| 4b | `networkTheorems` | `lib/aeBankNetworkTheorems.ts` | `networkTheoremsQuestions` | `aent` |
| 4c | `capacitors` | `lib/aeBankCapacitors.ts` | `capacitorsQuestions` | `aecap` |
| 4d | `inductors` | `lib/aeBankInductors.ts` | `inductorsQuestions` | `aeind` |
| 4e | `acFundamentals` | `lib/aeBankAcFundamentals.ts` | `acFundamentalsQuestions` | `aeacf` |
| 4f | `acAnalysis` | `lib/aeBankAcAnalysis.ts` | `acAnalysisQuestions` | `aeaca` |
| 4g | `power` | `lib/aeBankPower.ts` | `powerQuestions` | `aepow` |
| 4h | `threePhase` | `lib/aeBankThreePhase.ts` | `threePhaseQuestions` | `ae3ph` |

**Coverage checklists (every bullet -> at least one question):**

- **4a dcCircuits:** Ohm's law (V=IR and rearrangements); resistors in series (sum) vs parallel (reciprocal sum / product-over-sum for two); voltage-divider rule; current-divider rule; power in a resistor (P=VI=I²R=V²/R); short circuit vs open circuit behaviour; effect of adding a parallel resistor on total resistance; internal resistance of a source / terminal voltage; conductance as 1/R; conventional current direction.
- **4b networkTheorems:** KCL statement (sum of currents at a node = 0) and its basis (charge conservation); KVL statement (sum of voltages round a loop = 0) and its basis (energy conservation); Thevenin theorem statement + what Vth and Rth are; Norton theorem statement + Norton current/resistance; Thevenin↔Norton source transformation; superposition theorem (linear circuits, one independent source at a time, others zeroed - voltage sources shorted, current sources opened); maximum power transfer condition (R_load = Rth); when superposition does NOT apply (power, non-linear elements); reciprocity theorem (idea only); Millman's theorem (idea only).
- **4c capacitors:** definition (stores energy in an electric field); Q=CV; capacitors in parallel add (larger total) while in series combine reciprocally (smaller total) - opposite of resistors; energy stored E=½CV²; a capacitor blocks DC in steady state (acts open) but passes changing/AC signals; charging/discharging through a resistor and the RC time constant τ=RC (meaning of “one time constant” ≈ 63% charged); voltage across a capacitor cannot change instantly; effect of plate area / separation / dielectric on capacitance; unit farad.
- **4d inductors:** definition (stores energy in a magnetic field); induced emf v=L(di/dt) and Lenz's law (opposes the change); inductors in series add while in parallel combine reciprocally (like resistors, opposite of capacitors); energy stored E=½LI²; an inductor passes DC in steady state (acts as a short) but opposes changing/AC current; RL time constant τ=L/R; current through an inductor cannot change instantly; self- vs mutual inductance (idea); unit henry; factors affecting inductance (turns, core material).
- **4e acFundamentals:** what alternating current is (periodically reverses direction); peak (amplitude), peak-to-peak, instantaneous values; rms value and why it matters (equivalent heating DC value); for a sinusoid Vrms=Vpeak/√2 and Vavg (half-cycle)=2Vpeak/π; period T and frequency f=1/T; angular frequency ω=2πf; phase and phase difference (lead/lag); mains frequency concept (50/60 Hz); form factor / crest factor (idea).
- **4f acAnalysis:** inductive reactance Xl=ωL (rises with frequency); capacitive reactance Xc=1/(ωC) (falls with frequency); impedance Z combines resistance and reactance; a phasor represents magnitude and phase; in a pure resistor V and I are in phase; in a pure inductor current lags voltage by 90°; in a pure capacitor current leads voltage by 90°; impedance of series RL / RC / RLC; resonance (Xl=Xc) in a series RLC circuit; rectangular vs polar representation of impedance. (Deck is THIN here - most facts will be standard first-year; disclose each.)
- **4g power:** real/active power P (watts, the power actually consumed); reactive power Q (VAR, exchanged with L/C, does no net work); apparent power S (VA, S=√(P²+Q²)); power triangle relationship; power factor pf=cosφ=P/S and leading vs lagging; P=VI cosφ for AC; why a low power factor is undesirable (higher current for same real power); power-factor correction with a capacitor (idea); instantaneous vs average power; power in a purely reactive element averages to zero.
- **4h threePhase:** why three-phase (constant power delivery, efficient transmission); phase sequence; star (wye) connection line-vs-phase relationships (VL=√3·Vph, IL=Iph); delta connection relationships (VL=Vph, IL=√3·Iph); total three-phase power P=√3·VL·IL·cosφ; balanced vs unbalanced load; role of the neutral in a star system; four-wire vs three-wire systems; comparison of star vs delta use.

**Steps per bank task:**

- [ ] **Step 1:** Read `docs/appliedElectricity/source-extracts/lecture-deck.txt` (the whole file), then author 30 items against the checklist for this topic. Import types from `./appliedElectricityTypes.ts`.
- [ ] **Step 2:** Self-check before finishing: exactly 30 items; 4 true / 4 false among the TF items; every MCQ has 4 choices and one correct; ids sequential; every jargon term glossed on each use; no 8+ word phrase copied from the extract (run an n-gram check); list any facts not found in the extract.
- [ ] **Step 3:** Run `npx tsc --noEmit` - the file must type-check against `appliedElectricityTypes.ts`.
- [ ] **Step 4: Commit**

```bash
git add lib/aeBank<Name>.ts
git commit -m "feat(applied-electricity): <topic> MCQ/TF bank (30)"
```

---

## Task 5: Bank barrel + invariant test (`appliedElectricityQuestions.ts`)

**Files:**
- Create: `lib/appliedElectricityQuestions.ts`, `lib/appliedElectricityQuestions.test.ts`

**Interfaces:**
- Consumes: the 8 bank exports (Tasks 4a-4h), types (Task 1).
- Produces: `appliedElectricityQuestions: AppliedElectricityQuestion[]`; re-exports `AppliedElectricityTopic`, `AppliedElectricityQuestion`, `MCQuestion`, `TFQuestion`, `APPLIED_ELECTRICITY_TOPIC_LABELS`.

- [ ] **Step 1: Write the failing test**

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { appliedElectricityQuestions } from './appliedElectricityQuestions.ts';
import { APPLIED_ELECTRICITY_TOPIC_LABELS } from './appliedElectricityTypes.ts';

const topics = Object.keys(APPLIED_ELECTRICITY_TOPIC_LABELS);

test('240 total, 30 per topic', () => {
  assert.equal(appliedElectricityQuestions.length, 240);
  for (const t of topics) {
    assert.equal(appliedElectricityQuestions.filter((q) => q.topic === t).length, 30, `topic ${t}`);
  }
});

test('ids unique', () => {
  const ids = appliedElectricityQuestions.map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('MCQ well-formed; TF balanced 4/4 per topic', () => {
  for (const t of topics) {
    const items = appliedElectricityQuestions.filter((q) => q.topic === t);
    for (const q of items) {
      if (q.type === 'mcq') {
        assert.equal(q.choices.length, 4);
        assert.ok(q.correctIndex >= 0 && q.correctIndex < 4);
      }
    }
    const tf = items.filter((q) => q.type === 'tf');
    assert.equal(tf.filter((q) => q.type === 'tf' && q.correctAnswer === true).length, 4, `${t} true`);
    assert.equal(tf.filter((q) => q.type === 'tf' && q.correctAnswer === false).length, 4, `${t} false`);
  }
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test lib/appliedElectricityQuestions.test.ts`
Expected: FAIL (barrel not defined).

- [ ] **Step 3: Write the barrel** (mirror `lib/materialsQuestions.ts`): import the 8 arrays, spread them into `appliedElectricityQuestions`, re-export the types + labels.

- [ ] **Step 4: Run to verify it passes**

Run: `node --test lib/appliedElectricityQuestions.test.ts`
Expected: PASS. If a TF-balance assertion fails, fix the offending bank (flip a stem's truth value and its rationale), then re-run.

- [ ] **Step 5: Commit**

```bash
git add lib/appliedElectricityQuestions.ts lib/appliedElectricityQuestions.test.ts
git commit -m "feat(applied-electricity): question barrel + invariants (240)"
```

---

## Task 6: Rubric drills (`aeDrills.ts`)

**Files:**
- Create: `lib/aeDrills.ts`, `lib/aeDrills.test.ts`

**Interfaces:**
- Consumes: `AeDrill`, `AeDrillKind`, `RubricPoint`, `AppliedElectricityTopic` (Task 1).
- Produces: `aeDrills: AeDrill[]` (24 items, 3 per topic); re-export `AE_DRILL_LABELS`, `AeDrill`, `AeDrillKind`, `RubricPoint`.

**Content:** 3 drills per topic (24 total), 6-10 marks each; use each of the 5 `AeDrillKind`s at least twice across the set; rubric marks sum EXACTLY to `drill.marks`; modelAnswer 150-400 words, fully glossed. Ground in the deck extract; disclose standard-fact substitutions. Example angles: Thevenin derivation (`deriveEquivalent`, networkTheorems), analyse a series RLC for impedance and phase (`analyseCircuit`, acAnalysis), explain why a capacitor blocks DC (`explainConcept`, capacitors), compare star vs delta (`compare`, threePhase), compute total three-phase power step by step (`computeStepwise`, threePhase). id prefix `aedr-001`..`aedr-024`.

- [ ] **Step 1: Write the failing test**

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aeDrills } from './aeDrills.ts';
import { APPLIED_ELECTRICITY_TOPIC_LABELS, AE_DRILL_LABELS } from './appliedElectricityTypes.ts';

test('24 drills, 3 per topic', () => {
  assert.equal(aeDrills.length, 24);
  for (const t of Object.keys(APPLIED_ELECTRICITY_TOPIC_LABELS)) {
    assert.equal(aeDrills.filter((d) => d.topic === t).length, 3, `topic ${t}`);
  }
});

test('rubric marks sum to drill.marks; marks in 6..10', () => {
  for (const d of aeDrills) {
    assert.ok(d.marks >= 6 && d.marks <= 10, `${d.id} marks ${d.marks}`);
    assert.equal(d.rubric.reduce((s, r) => s + r.marks, 0), d.marks, `${d.id} rubric sum`);
  }
});

test('each drill kind used at least twice', () => {
  for (const kind of Object.keys(AE_DRILL_LABELS)) {
    assert.ok(aeDrills.filter((d) => d.drillKind === kind).length >= 2, `kind ${kind}`);
  }
});

test('ids unique; modelAnswer length bounds', () => {
  const ids = aeDrills.map((d) => d.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const d of aeDrills) {
    const words = d.modelAnswer.trim().split(/\s+/).length;
    assert.ok(words >= 150 && words <= 400, `${d.id} words ${words}`);
  }
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test lib/aeDrills.test.ts`
Expected: FAIL.

- [ ] **Step 3: Author the 24 drills** (mirror `lib/materialsDrills.ts` structure), satisfying every assertion.

- [ ] **Step 4: Run to verify it passes**

Run: `node --test lib/aeDrills.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/aeDrills.ts lib/aeDrills.test.ts
git commit -m "feat(applied-electricity): rubric drills (24)"
```

---

## Task 7: Learn-mode lessons (`aeLessons.ts`)

**Files:**
- Create: `lib/aeLessons.ts`, `lib/aeLessons.test.ts`

**Interfaces:**
- Consumes: `AeGeneratedQuestion`, `AE_GENERATORS`, `randId` (Task 3); `AppliedElectricityTopic` (Task 1).
- Produces: `interface ExampleStep { explanation: string; latex: string }`, `interface WorkedExample { id; title; prompt; steps: ExampleStep[]; answer: string }`, `interface AeLesson { id: string; topic: AppliedElectricityTopic; title: string; intro: string; examples: WorkedExample[]; tryIt: () => AeGeneratedQuestion }`, `aeLessons: AeLesson[]`.

**Content:** one lesson per topic (8), mirroring `lib/calculusLessons.ts`: plain-language intro, >=1 worked example with step-by-step reveal, `tryIt` returns `AE_GENERATORS[topic]()`.

- [ ] **Step 1: Write the failing test**

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aeLessons } from './aeLessons.ts';
import { APPLIED_ELECTRICITY_TOPIC_LABELS } from './appliedElectricityTypes.ts';

test('one lesson per topic; each has intro, an example with steps, and a working tryIt', () => {
  const topics = Object.keys(APPLIED_ELECTRICITY_TOPIC_LABELS);
  assert.equal(aeLessons.length, topics.length);
  for (const l of aeLessons) {
    assert.ok(l.intro.length > 0);
    assert.ok(l.examples.length >= 1 && l.examples[0].steps.length >= 1);
    const q = l.tryIt();
    assert.equal(q.category, l.topic);
  }
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test lib/aeLessons.test.ts`
Expected: FAIL.

- [ ] **Step 3: Author lessons.** - [ ] **Step 4:** `node --test lib/aeLessons.test.ts` -> PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/aeLessons.ts lib/aeLessons.test.ts
git commit -m "feat(applied-electricity): Learn-mode lessons"
```

---

## Task 8: Practice page (`app/applied-electricity/page.tsx`)

**Files:**
- Create: `app/applied-electricity/page.tsx`

**Interfaces:**
- Consumes: `AE_GENERATORS`, `AeGeneratedQuestion` (Task 3); `checkAeAnswer` (Task 2); `appliedElectricityQuestions`, `APPLIED_ELECTRICITY_TOPIC_LABELS` (Task 5); `aeDrills`, `AE_DRILL_LABELS` (Task 6); `pickSpacedQuestions`, `pickWeightedType`, `recordAttempt` from `@/lib/practiceStats`; `saveCourseProgress`, `saveActiveSession`, `getActiveSession`, `clearActiveSession` from `@/lib/progressTracker`; `Difficulty` from `@/lib/generators`; `MathDisplay` and `ReviewList` from `@/components/...`.

**Behaviour (adapt `app/calculus/page.tsx` for quick/generated + curated mix, and `app/surgery/page.tsx` for the drill self-marking mode):**
- `'use client'`. `courseId = 'applied-electricity'`. Add `// eslint-disable-line react-hooks/set-state-in-effect` on the `setMounted(true)` line (repo convention).
- **Config screen:** pick mode - **Practice** (generated + curated) or **Drill** (subjective). Practice mode: topic checkboxes (all 8) + a difficulty selector (`easy|medium|hard`) for generated content + question count.
- **Practice loop (one at a time):** build the session by, for each slot, choosing a topic via `pickWeightedType(courseId, selectedTopics)`, then either generating (`AE_GENERATORS[topic](difficulty)`) or drawing a curated item for that topic via `pickSpacedQuestions(courseId, poolForTopic, 1)` (pass the FULL topic pool). Roughly half generated / half curated, but always generate when a topic has no curated pool left.
  - Generated item: render `prompt` with `MathDisplay`; answer via a plain text `<input>`; check with `checkAeAnswer(userInput, q.answer)`; on check show correct/incorrect + `q.answerDisplay` + `q.solution`. `recordAttempt(courseId, { topicKey: q.category, correct })` (NO questionId).
  - Curated MCQ/TF: buttons; instant feedback + `rationale`. `recordAttempt(courseId, { questionId: q.id, topicKey: q.topic, correct })`.
  - Record the FIRST attempt if you allow retry-before-solution.
- **Drill mode:** mirror `app/surgery/page.tsx` - show `prompt`, reveal `rubric` checkboxes, score = sum of ticked marks; `recordAttempt(courseId, { questionId: drill.id, topicKey: drill.topic, correct: score >= drill.marks/2 })`.
- **Resume:** persist in-progress state via `saveActiveSession`/`getActiveSession`/`clearActiveSession`.
- **Finish:** call `saveCourseProgress(courseId, { type: mode, correct, total })`, then render `ReviewList` of missed items (it supports plain text + LaTeX).

- [ ] **Step 1:** Build the config screen + Practice loop (generated path first, then curated path), wiring the selection + `recordAttempt` calls above.
- [ ] **Step 2:** Add Drill mode (self-marking) adapted from the Surgery page.
- [ ] **Step 3:** Add resume + finish (`saveCourseProgress` + `ReviewList`).
- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: compiles; `/applied-electricity` in the route list.

- [ ] **Step 5: Commit**

```bash
git add app/applied-electricity/page.tsx
git commit -m "feat(applied-electricity): practice page (generated + curated + drills)"
```

---

## Task 9: Learn page (`app/applied-electricity/learn/page.tsx`)

**Files:**
- Create: `app/applied-electricity/learn/page.tsx`

**Interfaces:**
- Consumes: `aeLessons` (Task 7); `checkAeAnswer` (Task 2); `MathDisplay`.

**Behaviour:** mirror `app/calculus/learn/page.tsx` - list lessons; per lesson show intro + worked examples with step-by-step reveal; "try it" renders `lesson.tryIt()` with a text input checked by `checkAeAnswer` against the generated `answer`, showing `answerDisplay` + `solution` on submit.

- [ ] **Step 1:** Build the page. - [ ] **Step 2:** `npm run build` -> `/applied-electricity/learn` present.
- [ ] **Step 3: Commit**

```bash
git add app/applied-electricity/learn/page.tsx
git commit -m "feat(applied-electricity): Learn mode page"
```

---

## Task 10: Registry, labels, stats route, final gate

**Files:**
- Modify: `lib/courses.ts`, `lib/courseLabels.ts`
- Create: `app/applied-electricity/stats/page.tsx`

- [ ] **Step 1:** Append to `COURSES` in `lib/courses.ts`:

```ts
  {
    id: 'applied-electricity',
    title: 'Applied Electricity Practice',
    shortTitle: 'Applied Elec.',
    blurb:
      'DC circuits, network theorems, capacitors, inductors, AC analysis, power, and three-phase - generated numeric problems plus curated MCQ/TF and drills.',
    accent: '#EA580C',
    textColor: 'text-orange-600',
    hoverText: 'text-orange-700',
  },
```

- [ ] **Step 2:** In `lib/courseLabels.ts`, import `APPLIED_ELECTRICITY_TOPIC_LABELS` from `./appliedElectricityTypes` and add `'applied-electricity': APPLIED_ELECTRICITY_TOPIC_LABELS` to `COURSE_TOPIC_LABELS`.

- [ ] **Step 3:** Create `app/applied-electricity/stats/page.tsx` by adapting `app/calculus/stats/page.tsx` (swap `courseId` to `'applied-electricity'` and the label map).

- [ ] **Step 4: Full gate**

Run: `npm run test && npm run build`
Expected: all tests PASS; build succeeds; `/applied-electricity`, `/applied-electricity/learn`, `/applied-electricity/stats` all in the route list; the course card appears on the dashboard (reads `COURSES`).

- [ ] **Step 5: Commit**

```bash
git add lib/courses.ts lib/courseLabels.ts app/applied-electricity/stats/page.tsx
git commit -m "feat(applied-electricity): register course, labels, stats route"
```

---

## Self-review (done while writing)

- **Spec coverage:** hybrid format (Tasks 3 + 4 + 6), Learn mode (Tasks 7 + 9), full complex/phasor answers (Task 2 complex descriptor + acAnalysis/threePhase generators in Task 3), drills 3/topic (Task 6), 240 MCQ/TF 30/topic (Tasks 4 + 5), orange registry card (Task 10), shared-layer wiring (Task 8), source grounding (Global Constraints + Task 4 steps), stats route (Task 10). All covered.
- **Placeholders:** code steps carry real test code and concrete interfaces; content tasks carry per-topic coverage checklists (the substance an author needs).
- **Type consistency:** topic keys identical across Tasks 1/3/4/5/6/7; `AnswerDescriptor` defined in Task 2 and consumed in Tasks 3/8/9; `AeGeneratedQuestion` defined in Task 3 and consumed in 7/8/9; `AeDrill` defined in Task 1 and consumed in Task 6.
