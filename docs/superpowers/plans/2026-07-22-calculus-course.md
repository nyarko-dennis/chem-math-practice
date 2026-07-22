# Calculus Course Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Calculus practice course (differentiation + applications + partial differentiation) to the existing Next.js test-generator app, with algorithmically generated basic-rule problems and curated static banks for implicit/higher-order, applications of differentiation, and partial differentiation.

> **Amendment (2026-07-22):** After Tasks 1-2 completed, the official Level 100 EEE syllabus (`Level100_EEE_Second_Semester_Courses_and_Topics.pdf`) confirmed "Applications" as a taught differentiation topic. A fourth category `applications` was added: new Task 5 (applications static bank + type-union extension), and Tasks 5-8 renumbered to 6-9 with config/test amendments.

**Architecture:** Framework-free question logic lives in focused `lib/calculus*.ts` files (pure TypeScript, unit-tested with Node's built-in test runner). A new `app/calculus/page.tsx` route reuses the existing `MathInput`/`MathDisplay` components, `checkAnswer.ts`, and `progressTracker.ts`. The home page gains a course card.

**Tech Stack:** Next.js 16, React 19, TypeScript 5 (strict), MathLive + KaTeX (already installed), Node 26 built-in test runner (`node --test`, native TS execution).

## Global Constraints

- No new npm dependencies. Node runs `.ts` directly and `node --test` discovers `*.test.ts`; cross-file imports in test/lib code MUST use explicit `.ts` extensions (e.g. `import { x } from './calculusTypes.ts'`).
- Next.js version 16.1.6, React 19.2.3, TypeScript strict mode - all already configured; do not change.
- `lib/calculus*.ts` files must be framework-free (no React, no Next imports) so `node --test` can run them.
- `lib/checkAnswer.ts` is NOT modified. Calculus answers use its existing `'algebra'`-type path: `normalizeLatex` strips whitespace + `\left`/`\right` + `\text{}`, then does string equality.
- Canonical answer form: **no spaces**, descending powers, `x^{n}` for exponent >= 2, `x` for exponent 1, plain number for exponent 0, unit coefficients dropped for non-constant terms (e.g. `6x^{2}+10x-4`, `-\frac{x}{y}`, `y\cos(xy)`). This matches how `checkAnswer` compares and is the same accepted limitation the existing `lib/generators.ts` algebra questions already have: exact-string matching, with the solution panel always revealing the expected answer.
- Course accent color: teal (`text-teal-600` / `text-teal-700`), since blue/emerald/violet/indigo/rose/amber are already used by other course cards.
- courseId string for `progressTracker` is `'calculus'`.

---

## File Structure

- `lib/calculusTypes.ts` (create) - `CalculusCategory`, `CalculusQuestion`, `CalculusQuestionCore` types.
- `lib/calculusGenerators.ts` (create) - pure `build*` functions + random `generate*` wrappers for the 5 basic-rule generators + `randomBasicRuleQuestion`.
- `lib/calculusImplicitBank.ts` (create) - `implicitHigherOrderQuestions: CalculusQuestion[]` static bank (30 items).
- `lib/calculusPartialBank.ts` (create) - `partialDifferentiationQuestions: CalculusQuestion[]` static bank (30 items).
- `lib/calculusApplicationsBank.ts` (create, Task 5) - `applicationsQuestions: CalculusQuestion[]` static bank (30 items); Task 5 also extends the `CalculusCategory` union in `lib/calculusTypes.ts` with `'applications'`.
- `lib/calculusQuestions.ts` (create) - `assembleQuiz(config)` entry point + re-exports.
- `lib/calculusGenerators.test.ts`, `lib/calculusImplicitBank.test.ts`, `lib/calculusPartialBank.test.ts`, `lib/calculusApplicationsBank.test.ts`, `lib/calculusQuestions.test.ts` (create) - unit tests.
- `app/calculus/page.tsx` (create) - the quiz UI.
- `app/page.tsx` (modify) - add the calculus course card.
- `package.json` (modify) - add `"test": "node --test"` script.

---

## Task 1: Types + test script

**Files:**
- Create: `lib/calculusTypes.ts`
- Modify: `package.json:5-10` (scripts block)

**Interfaces:**
- Produces: `CalculusCategory = 'basicRules' | 'implicitHigherOrder' | 'partial'`; `CalculusQuestion { id, category, source: 'generated'|'static', instructions, prompt, correctAnswer, solution }` (all string fields); `CalculusQuestionCore = Omit<CalculusQuestion, 'id'>`.

- [ ] **Step 1: Create the types file**

Create `lib/calculusTypes.ts`:

```typescript
export type CalculusCategory = 'basicRules' | 'implicitHigherOrder' | 'partial';

export interface CalculusQuestion {
  id: string;
  category: CalculusCategory;
  source: 'generated' | 'static';
  instructions: string;
  prompt: string;        // LaTeX
  correctAnswer: string; // LaTeX, canonical no-space form
  solution: string;      // LaTeX
}

export type CalculusQuestionCore = Omit<CalculusQuestion, 'id'>;
```

- [ ] **Step 2: Add the test script**

In `package.json`, add a `test` line to the `scripts` object so it reads:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "node --test"
  },
```

- [ ] **Step 3: Verify types compile**

Run: `cd /Users/Apple/Desktop/development-work/test-generator/chem-math-practice && npx tsc --noEmit -p tsconfig.json`
Expected: no errors referencing `lib/calculusTypes.ts`.

- [ ] **Step 4: Commit**

```bash
git add lib/calculusTypes.ts package.json
git commit -m "feat(calculus): add question types and test script"
```

---

## Task 2: Basic-rule generators

**Files:**
- Create: `lib/calculusGenerators.ts`
- Test: `lib/calculusGenerators.test.ts`

**Interfaces:**
- Consumes: `CalculusQuestion`, `CalculusQuestionCore`, `CalculusCategory` from `./calculusTypes.ts`.
- Produces:
  - `buildPowerRule(p: {a:number;p:number;b:number;q:number}): CalculusQuestionCore`
  - `buildProductRule(p: {m:number;a:number;n:number;b:number}): CalculusQuestionCore`
  - `buildQuotientRule(p: {a:number;b:number;c:number;d:number}): CalculusQuestionCore`
  - `buildChainRule(p: {a:number;b:number;n:number}): CalculusQuestionCore`
  - `buildTrigExpLog(p: {variant:'sin'|'cos'|'exp'|'ln';a:number;k:number}): CalculusQuestionCore`
  - `generatePowerRule/ProductRule/QuotientRule/ChainRule/TrigExpLog(): CalculusQuestion`
  - `randomBasicRuleQuestion(): CalculusQuestion`
  - `randId(): string`

- [ ] **Step 1: Write the failing test**

Create `lib/calculusGenerators.test.ts`:

```typescript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildPowerRule,
  buildProductRule,
  buildQuotientRule,
  buildChainRule,
  buildTrigExpLog,
  randomBasicRuleQuestion,
} from './calculusGenerators.ts';

test('buildPowerRule differentiates a two-term polynomial', () => {
  // d/dx (3x^{3} + 5x^{2}) = 9x^{2} + 10x
  const q = buildPowerRule({ a: 3, p: 3, b: 5, q: 2 });
  assert.equal(q.prompt, '3x^{3}+5x^{2}');
  assert.equal(q.correctAnswer, '9x^{2}+10x');
  assert.equal(q.category, 'basicRules');
  assert.equal(q.source, 'generated');
});

test('buildPowerRule drops unit coefficients and handles constant term', () => {
  // d/dx (x^{2} + 4x) = 2x + 4
  const q = buildPowerRule({ a: 1, p: 2, b: 4, q: 1 });
  assert.equal(q.prompt, 'x^{2}+4x');
  assert.equal(q.correctAnswer, '2x+4');
});

test('buildProductRule expands the derivative to a polynomial', () => {
  // f = (x^{2}+3)(x^{1}+2) -> f' = 3x^{2}+4x+3
  // expanded via [m+n, m-1, n-1] = [3x^{2}], [2*2 x^{1}]=4x, [3*1]=3
  const q = buildProductRule({ m: 2, a: 3, n: 1, b: 2 });
  assert.equal(q.prompt, '(x^{2}+3)(x+2)');
  assert.equal(q.correctAnswer, '3x^{2}+4x+3');
});

test('buildQuotientRule yields constant numerator over squared denominator', () => {
  // f = (2x+1)/(3x+4) -> f' = (2*4 - 1*3)/(3x+4)^2 = 5/(3x+4)^{2}
  const q = buildQuotientRule({ a: 2, b: 1, c: 3, d: 4 });
  assert.equal(q.prompt, '\\frac{2x+1}{3x+4}');
  assert.equal(q.correctAnswer, '\\frac{5}{(3x+4)^{2}}');
});

test('buildChainRule applies the chain rule to a linear inner function', () => {
  // f = (2x+3)^{4} -> f' = 4*2*(2x+3)^{3} = 8(2x+3)^{3}
  const q = buildChainRule({ a: 2, b: 3, n: 4 });
  assert.equal(q.prompt, '(2x+3)^{4}');
  assert.equal(q.correctAnswer, '8(2x+3)^{3}');
});

test('buildTrigExpLog covers each variant', () => {
  assert.equal(buildTrigExpLog({ variant: 'sin', a: 3, k: 2 }).correctAnswer, '6\\cos(2x)');
  assert.equal(buildTrigExpLog({ variant: 'cos', a: 3, k: 2 }).correctAnswer, '-6\\sin(2x)');
  assert.equal(buildTrigExpLog({ variant: 'exp', a: 3, k: 2 }).correctAnswer, '6e^{2x}');
  assert.equal(buildTrigExpLog({ variant: 'ln', a: 3, k: 1 }).correctAnswer, '\\frac{3}{x}');
});

test('randomBasicRuleQuestion returns a well-formed question', () => {
  for (let i = 0; i < 50; i++) {
    const q = randomBasicRuleQuestion();
    assert.equal(q.category, 'basicRules');
    assert.ok(q.id.length > 0);
    assert.ok(q.prompt.length > 0);
    assert.ok(q.correctAnswer.length > 0);
    assert.ok(q.solution.length > 0);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test lib/calculusGenerators.test.ts`
Expected: FAIL - cannot find module `./calculusGenerators.ts`.

- [ ] **Step 3: Write the implementation**

Create `lib/calculusGenerators.ts`:

```typescript
import type { CalculusQuestion, CalculusQuestionCore } from './calculusTypes.ts';

export function randId(): string {
  return Math.random().toString(36).slice(2, 11);
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Render a single "coef * x^exp" term with no sign handling for exp/coef edge cases.
// coef is used verbatim (may be negative) - used for the FIRST term of a polynomial.
function fmtTerm(coef: number, exp: number): string {
  if (exp === 0) return `${coef}`;
  const sign = coef < 0 ? '-' : '';
  const mag = Math.abs(coef);
  const coefStr = mag === 1 ? '' : `${mag}`;
  const varStr = exp === 1 ? 'x' : `x^{${exp}}`;
  return `${sign}${coefStr}${varStr}`;
}

// Join [coef, exp] terms (given in the desired order) into a canonical no-space polynomial.
function poly(terms: Array<[number, number]>): string {
  const nz = terms.filter(([c]) => c !== 0);
  if (nz.length === 0) return '0';
  let out = fmtTerm(nz[0][0], nz[0][1]);
  for (let i = 1; i < nz.length; i++) {
    const [c, e] = nz[i];
    out += (c < 0 ? '-' : '+') + fmtTerm(Math.abs(c), e);
  }
  return out;
}

export function buildPowerRule(p: { a: number; p: number; b: number; q: number }): CalculusQuestionCore {
  const prompt = poly([[p.a, p.p], [p.b, p.q]]);
  const correctAnswer = poly([[p.a * p.p, p.p - 1], [p.b * p.q, p.q - 1]]);
  return {
    category: 'basicRules',
    source: 'generated',
    instructions: 'Differentiate with respect to x:',
    prompt,
    correctAnswer,
    solution: `\\text{Power rule term-by-term: }\\frac{d}{dx}\\left(${prompt}\\right)=${correctAnswer}`,
  };
}

export function buildProductRule(p: { m: number; a: number; n: number; b: number }): CalculusQuestionCore {
  const uPow = p.m === 1 ? 'x' : `x^{${p.m}}`;
  const vPow = p.n === 1 ? 'x' : `x^{${p.n}}`;
  const prompt = `(${uPow}+${p.a})(${vPow}+${p.b})`;
  // expand: x^{m+n} + b x^{m} + a x^{n} + ab ; derivative:
  const correctAnswer = poly([
    [p.m + p.n, p.m + p.n - 1],
    [p.b * p.m, p.m - 1],
    [p.a * p.n, p.n - 1],
  ]);
  return {
    category: 'basicRules',
    source: 'generated',
    instructions: 'Differentiate using the product rule:',
    prompt,
    correctAnswer,
    solution: `\\text{With }u=${uPow}+${p.a},\\ v=${vPow}+${p.b}:\\ u'v+uv'=${correctAnswer}`,
  };
}

export function buildQuotientRule(p: { a: number; b: number; c: number; d: number }): CalculusQuestionCore {
  const numer = p.a * p.d - p.b * p.c;
  const prompt = `\\frac{${p.a}x+${p.b}}{${p.c}x+${p.d}}`;
  const correctAnswer = `\\frac{${numer}}{(${p.c}x+${p.d})^{2}}`;
  return {
    category: 'basicRules',
    source: 'generated',
    instructions: 'Differentiate using the quotient rule:',
    prompt,
    correctAnswer,
    solution: `\\text{Quotient rule: }\\frac{(${p.c}x+${p.d})(${p.a})-(${p.a}x+${p.b})(${p.c})}{(${p.c}x+${p.d})^{2}}=${correctAnswer}`,
  };
}

export function buildChainRule(p: { a: number; b: number; n: number }): CalculusQuestionCore {
  const prompt = `(${p.a}x+${p.b})^{${p.n}}`;
  const coef = p.n * p.a;
  const innerExp = p.n - 1;
  const correctAnswer = `${coef}(${p.a}x+${p.b})^{${innerExp === 1 ? '' : `{${innerExp}}`}}`
    .replace('^{}', `^{${innerExp}}`);
  return {
    category: 'basicRules',
    source: 'generated',
    instructions: 'Differentiate using the chain rule:',
    prompt,
    correctAnswer: `${coef}(${p.a}x+${p.b})^{${innerExp}}`,
    solution: `\\text{Chain rule: bring down }${p.n}\\text{, reduce power, times inner derivative }${p.a}:\\ ${coef}(${p.a}x+${p.b})^{${innerExp}}`,
  };
}

export function buildTrigExpLog(p: { variant: 'sin' | 'cos' | 'exp' | 'ln'; a: number; k: number }): CalculusQuestionCore {
  let prompt = '';
  let correctAnswer = '';
  let solution = '';
  if (p.variant === 'sin') {
    prompt = `${p.a}\\sin(${p.k}x)`;
    correctAnswer = `${p.a * p.k}\\cos(${p.k}x)`;
    solution = `\\text{d/dx of }a\\sin(kx)=ak\\cos(kx):\\ ${correctAnswer}`;
  } else if (p.variant === 'cos') {
    prompt = `${p.a}\\cos(${p.k}x)`;
    correctAnswer = `${-p.a * p.k}\\sin(${p.k}x)`;
    solution = `\\text{d/dx of }a\\cos(kx)=-ak\\sin(kx):\\ ${correctAnswer}`;
  } else if (p.variant === 'exp') {
    prompt = `${p.a}e^{${p.k}x}`;
    correctAnswer = `${p.a * p.k}e^{${p.k}x}`;
    solution = `\\text{d/dx of }ae^{kx}=ake^{kx}:\\ ${correctAnswer}`;
  } else {
    prompt = `${p.a}\\ln(x)`;
    correctAnswer = `\\frac{${p.a}}{x}`;
    solution = `\\text{d/dx of }a\\ln(x)=\\frac{a}{x}:\\ ${correctAnswer}`;
  }
  return { category: 'basicRules', source: 'generated', instructions: 'Differentiate with respect to x:', prompt, correctAnswer, solution };
}

export function generatePowerRule(): CalculusQuestion {
  const pp = randInt(2, 5);
  const q = randInt(1, pp - 1);
  return { id: randId(), ...buildPowerRule({ a: randInt(1, 9), p: pp, b: randInt(1, 9), q }) };
}

export function generateProductRule(): CalculusQuestion {
  const n = randInt(1, 3);
  const m = randInt(n + 1, 4);
  return { id: randId(), ...buildProductRule({ m, a: randInt(1, 9), n, b: randInt(1, 9) }) };
}

export function generateQuotientRule(): CalculusQuestion {
  let a = 0, b = 0, c = 0, d = 0;
  do {
    a = randInt(1, 9); b = randInt(1, 9); c = randInt(1, 9); d = randInt(1, 9);
  } while (a * d - b * c === 0);
  return { id: randId(), ...buildQuotientRule({ a, b, c, d }) };
}

export function generateChainRule(): CalculusQuestion {
  return { id: randId(), ...buildChainRule({ a: randInt(2, 5), b: randInt(1, 9), n: randInt(2, 5) }) };
}

export function generateTrigExpLog(): CalculusQuestion {
  const variants: Array<'sin' | 'cos' | 'exp' | 'ln'> = ['sin', 'cos', 'exp', 'ln'];
  const variant = variants[randInt(0, 3)];
  const k = variant === 'ln' ? 1 : randInt(2, 9);
  return { id: randId(), ...buildTrigExpLog({ variant, a: randInt(2, 9), k }) };
}

export function randomBasicRuleQuestion(): CalculusQuestion {
  const gens = [generatePowerRule, generateProductRule, generateQuotientRule, generateChainRule, generateTrigExpLog];
  return gens[randInt(0, gens.length - 1)]();
}
```

Note: the `buildChainRule` intermediate `correctAnswer` line with `.replace` is dead scaffolding — the returned object uses the clean `${coef}(${p.a}x+${p.b})^{${innerExp}}` directly. Delete the unused `const correctAnswer` line if the linter flags it.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test lib/calculusGenerators.test.ts`
Expected: PASS (7 tests).

- [ ] **Step 5: Remove dead code and re-run**

Delete the unused `const correctAnswer = ...replace(...)` statement inside `buildChainRule` (the return statement builds the answer inline). Re-run:
Run: `node --test lib/calculusGenerators.test.ts`
Expected: PASS (7 tests).

- [ ] **Step 6: Commit**

```bash
git add lib/calculusGenerators.ts lib/calculusGenerators.test.ts
git commit -m "feat(calculus): add basic-rule derivative generators"
```

---

## Task 3: Implicit & higher-order static bank

**Files:**
- Create: `lib/calculusImplicitBank.ts`
- Test: `lib/calculusImplicitBank.test.ts`

**Interfaces:**
- Consumes: `CalculusQuestion` from `./calculusTypes.ts`.
- Produces: `implicitHigherOrderQuestions: CalculusQuestion[]` (30 items, all `category: 'implicitHigherOrder'`, `source: 'static'`, ids `ih-01`..`ih-30`).

- [ ] **Step 1: Write the failing test**

Create `lib/calculusImplicitBank.test.ts`:

```typescript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { implicitHigherOrderQuestions } from './calculusImplicitBank.ts';

test('bank has at least 25 items', () => {
  assert.ok(implicitHigherOrderQuestions.length >= 25);
});

test('every item is well-formed and correctly tagged', () => {
  for (const q of implicitHigherOrderQuestions) {
    assert.equal(q.category, 'implicitHigherOrder');
    assert.equal(q.source, 'static');
    assert.ok(q.id && q.instructions && q.prompt && q.correctAnswer && q.solution);
  }
});

test('ids are unique', () => {
  const ids = implicitHigherOrderQuestions.map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('spot-check known answers', () => {
  const byId = Object.fromEntries(implicitHigherOrderQuestions.map((q) => [q.id, q]));
  assert.equal(byId['ih-01'].correctAnswer, '-\\frac{x}{y}');
  assert.equal(byId['ih-13'].correctAnswer, '12x^{2}');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test lib/calculusImplicitBank.test.ts`
Expected: FAIL - cannot find module `./calculusImplicitBank.ts`.

- [ ] **Step 3: Write the implementation**

Create `lib/calculusImplicitBank.ts`. Use this exact array (30 items: ih-01..ih-12 implicit differentiation, ih-13..ih-24 higher-order, ih-25..ih-30 parametric):

```typescript
import type { CalculusQuestion } from './calculusTypes.ts';

const impl = (
  id: string,
  instructions: string,
  prompt: string,
  correctAnswer: string,
  solution: string,
): CalculusQuestion => ({ id, category: 'implicitHigherOrder', source: 'static', instructions, prompt, correctAnswer, solution });

const IMPLICIT = 'Find dy/dx by implicit differentiation:';
const SECOND = 'Find the second derivative d^2y/dx^2:';
const THIRD = 'Find the third derivative d^3y/dx^3:';
const PARAM = 'Find dy/dx for the parametric equations:';

export const implicitHigherOrderQuestions: CalculusQuestion[] = [
  impl('ih-01', IMPLICIT, 'x^{2}+y^{2}=25', '-\\frac{x}{y}', '\\text{Differentiate: }2x+2yy'=0\\Rightarrow y'=-\\frac{x}{y}'),
  impl('ih-02', IMPLICIT, 'x^{2}-y^{2}=16', '\\frac{x}{y}', '\\text{Differentiate: }2x-2yy'=0\\Rightarrow y'=\\frac{x}{y}'),
  impl('ih-03', IMPLICIT, 'x^{2}+xy+y^{2}=7', '-\\frac{2x+y}{x+2y}', '\\text{Differentiate: }2x+y+xy'+2yy'=0\\Rightarrow y'=-\\frac{2x+y}{x+2y}'),
  impl('ih-04', IMPLICIT, 'x^{3}+y^{3}=6xy', '\\frac{2y-x^{2}}{y^{2}-2x}', '\\text{Differentiate: }3x^{2}+3y^{2}y'=6y+6xy'\\Rightarrow y'=\\frac{2y-x^{2}}{y^{2}-2x}'),
  impl('ih-05', IMPLICIT, 'xy=12', '-\\frac{y}{x}', '\\text{Product rule: }y+xy'=0\\Rightarrow y'=-\\frac{y}{x}'),
  impl('ih-06', IMPLICIT, 'x^{2}y=8', '-\\frac{2y}{x}', '\\text{Differentiate: }2xy+x^{2}y'=0\\Rightarrow y'=-\\frac{2y}{x}'),
  impl('ih-07', IMPLICIT, '\\sin(y)=x', '\\frac{1}{\\cos(y)}', '\\text{Differentiate: }\\cos(y)y'=1\\Rightarrow y'=\\frac{1}{\\cos(y)}'),
  impl('ih-08', IMPLICIT, 'y^{2}=4x', '\\frac{2}{y}', '\\text{Differentiate: }2yy'=4\\Rightarrow y'=\\frac{2}{y}'),
  impl('ih-09', IMPLICIT, 'x^{2}+4y^{2}=36', '-\\frac{x}{4y}', '\\text{Differentiate: }2x+8yy'=0\\Rightarrow y'=-\\frac{x}{4y}'),
  impl('ih-10', IMPLICIT, 'e^{y}=x', '\\frac{1}{e^{y}}', '\\text{Differentiate: }e^{y}y'=1\\Rightarrow y'=\\frac{1}{e^{y}}'),
  impl('ih-11', IMPLICIT, 'x+y=xy', '\\frac{y-1}{1-x}', '\\text{Differentiate: }1+y'=y+xy'\\Rightarrow y'=\\frac{y-1}{1-x}'),
  impl('ih-12', IMPLICIT, '\\cos(x)+\\sin(y)=1', '\\frac{\\sin(x)}{\\cos(y)}', '\\text{Differentiate: }-\\sin(x)+\\cos(y)y'=0\\Rightarrow y'=\\frac{\\sin(x)}{\\cos(y)}'),
  impl('ih-13', SECOND, 'y=x^{4}', '12x^{2}', 'y'=4x^{3},\\ y''=12x^{2}'),
  impl('ih-14', SECOND, 'y=x^{5}', '20x^{3}', 'y'=5x^{4},\\ y''=20x^{3}'),
  impl('ih-15', SECOND, 'y=x^{3}-4x^{2}+2x', '6x-8', 'y'=3x^{2}-8x+2,\\ y''=6x-8'),
  impl('ih-16', SECOND, 'y=2x^{4}-x^{2}', '24x^{2}-2', 'y'=8x^{3}-2x,\\ y''=24x^{2}-2'),
  impl('ih-17', SECOND, 'y=\\sin(x)', '-\\sin(x)', 'y'=\\cos(x),\\ y''=-\\sin(x)'),
  impl('ih-18', SECOND, 'y=\\cos(x)', '-\\cos(x)', 'y'=-\\sin(x),\\ y''=-\\cos(x)'),
  impl('ih-19', SECOND, 'y=e^{2x}', '4e^{2x}', 'y'=2e^{2x},\\ y''=4e^{2x}'),
  impl('ih-20', SECOND, 'y=\\ln(x)', '-\\frac{1}{x^{2}}', 'y'=\\frac{1}{x},\\ y''=-\\frac{1}{x^{2}}'),
  impl('ih-21', SECOND, 'y=\\frac{1}{x}', '\\frac{2}{x^{3}}', 'y'=-x^{-2},\\ y''=2x^{-3}=\\frac{2}{x^{3}}'),
  impl('ih-22', SECOND, 'y=e^{-x}', 'e^{-x}', 'y'=-e^{-x},\\ y''=e^{-x}'),
  impl('ih-23', THIRD, 'y=x^{3}', '6', 'y'=3x^{2},\\ y''=6x,\\ y'''=6'),
  impl('ih-24', THIRD, 'y=3x^{5}-x^{3}', '180x^{2}-6', 'y'=15x^{4}-3x^{2},\\ y''=60x^{3}-6x,\\ y'''=180x^{2}-6'),
  impl('ih-25', PARAM, 'x=t^{2},\\ y=t^{3}', '\\frac{3t}{2}', '\\frac{dy}{dx}=\\frac{3t^{2}}{2t}=\\frac{3t}{2}'),
  impl('ih-26', PARAM, 'x=t^{3},\\ y=t^{2}', '\\frac{2}{3t}', '\\frac{dy}{dx}=\\frac{2t}{3t^{2}}=\\frac{2}{3t}'),
  impl('ih-27', PARAM, 'x=2t,\\ y=t^{2}', 't', '\\frac{dy}{dx}=\\frac{2t}{2}=t'),
  impl('ih-28', PARAM, 'x=\\cos(t),\\ y=\\sin(t)', '-\\frac{\\cos(t)}{\\sin(t)}', '\\frac{dy}{dx}=\\frac{\\cos(t)}{-\\sin(t)}=-\\frac{\\cos(t)}{\\sin(t)}'),
  impl('ih-29', PARAM, 'x=t+1,\\ y=t^{2}', '2t', '\\frac{dy}{dx}=\\frac{2t}{1}=2t'),
  impl('ih-30', PARAM, 'x=t^{2},\\ y=2t', '\\frac{1}{t}', '\\frac{dy}{dx}=\\frac{2}{2t}=\\frac{1}{t}'),
];
```

Important: the `solution` strings contain apostrophes for primes (`y'`). Since the array uses single-quoted TS strings, escape each prime as `\'` or switch those string literals to backticks. Use backticks for any `solution`/`prompt` containing `'`. Rewrite each affected literal with backticks (template strings) so the primes render literally, e.g. `` `\text{Differentiate: }2x+2yy'=0\Rightarrow y'=-\frac{x}{y}` ``. Verify no unescaped `'` remains inside a single-quoted string.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test lib/calculusImplicitBank.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/calculusImplicitBank.ts lib/calculusImplicitBank.test.ts
git commit -m "feat(calculus): add implicit and higher-order static bank"
```

---

## Task 4: Partial differentiation static bank

**Files:**
- Create: `lib/calculusPartialBank.ts`
- Test: `lib/calculusPartialBank.test.ts`

**Interfaces:**
- Consumes: `CalculusQuestion` from `./calculusTypes.ts`.
- Produces: `partialDifferentiationQuestions: CalculusQuestion[]` (30 items, all `category: 'partial'`, `source: 'static'`, ids `pd-01`..`pd-30`).

- [ ] **Step 1: Write the failing test**

Create `lib/calculusPartialBank.test.ts`:

```typescript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { partialDifferentiationQuestions } from './calculusPartialBank.ts';

test('bank has at least 25 items', () => {
  assert.ok(partialDifferentiationQuestions.length >= 25);
});

test('every item is well-formed and correctly tagged', () => {
  for (const q of partialDifferentiationQuestions) {
    assert.equal(q.category, 'partial');
    assert.equal(q.source, 'static');
    assert.ok(q.id && q.instructions && q.prompt && q.correctAnswer && q.solution);
  }
});

test('ids are unique', () => {
  const ids = partialDifferentiationQuestions.map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('spot-check known answers', () => {
  const byId = Object.fromEntries(partialDifferentiationQuestions.map((q) => [q.id, q]));
  assert.equal(byId['pd-01'].correctAnswer, '2x');
  assert.equal(byId['pd-11'].correctAnswer, 'y\\cos(xy)');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test lib/calculusPartialBank.test.ts`
Expected: FAIL - cannot find module `./calculusPartialBank.ts`.

- [ ] **Step 3: Write the implementation**

Create `lib/calculusPartialBank.ts` (30 items: pd-01..pd-18 first-order partials, pd-19..pd-26 second-order/mixed, pd-27..pd-30 multivariable chain rule):

```typescript
import type { CalculusQuestion } from './calculusTypes.ts';

const pd = (
  id: string,
  instructions: string,
  prompt: string,
  correctAnswer: string,
  solution: string,
): CalculusQuestion => ({ id, category: 'partial', source: 'static', instructions, prompt, correctAnswer, solution });

export const partialDifferentiationQuestions: CalculusQuestion[] = [
  pd('pd-01', 'Find the partial derivative \\partial f/\\partial x (treat y as constant):', 'f(x,y)=x^{2}+y^{2}', '2x', 'Treating y as constant, \\partial f/\\partial x=2x.'),
  pd('pd-02', 'Find the partial derivative \\partial f/\\partial y (treat x as constant):', 'f(x,y)=x^{2}+y^{2}', '2y', 'Treating x as constant, \\partial f/\\partial y=2y.'),
  pd('pd-03', 'Find \\partial f/\\partial x:', 'f(x,y)=x^{2}y', '2xy', 'y is constant, so \\partial f/\\partial x=2xy.'),
  pd('pd-04', 'Find \\partial f/\\partial y:', 'f(x,y)=x^{2}y', 'x^{2}', 'x^{2} is constant, so \\partial f/\\partial y=x^{2}.'),
  pd('pd-05', 'Find \\partial f/\\partial x:', 'f(x,y)=x^{3}y^{2}', '3x^{2}y^{2}', 'y^{2} constant: \\partial f/\\partial x=3x^{2}y^{2}.'),
  pd('pd-06', 'Find \\partial f/\\partial y:', 'f(x,y)=x^{3}y^{2}', '2x^{3}y', 'x^{3} constant: \\partial f/\\partial y=2x^{3}y.'),
  pd('pd-07', 'Find \\partial f/\\partial x:', 'f(x,y)=x^{2}+3xy+y^{2}', '2x+3y', '\\partial f/\\partial x=2x+3y.'),
  pd('pd-08', 'Find \\partial f/\\partial y:', 'f(x,y)=x^{2}+3xy+y^{2}', '3x+2y', '\\partial f/\\partial y=3x+2y.'),
  pd('pd-09', 'Find \\partial f/\\partial x:', 'f(x,y)=xy+y^{3}', 'y', 'y^{3} constant in x: \\partial f/\\partial x=y.'),
  pd('pd-10', 'Find \\partial f/\\partial y:', 'f(x,y)=xy+y^{3}', 'x+3y^{2}', '\\partial f/\\partial y=x+3y^{2}.'),
  pd('pd-11', 'Find \\partial f/\\partial x:', 'f(x,y)=\\sin(xy)', 'y\\cos(xy)', 'Chain rule, inner derivative y: \\partial f/\\partial x=y\\cos(xy).'),
  pd('pd-12', 'Find \\partial f/\\partial y:', 'f(x,y)=\\sin(xy)', 'x\\cos(xy)', 'Chain rule, inner derivative x: \\partial f/\\partial y=x\\cos(xy).'),
  pd('pd-13', 'Find \\partial f/\\partial x:', 'f(x,y)=e^{xy}', 'ye^{xy}', 'Inner derivative y: \\partial f/\\partial x=ye^{xy}.'),
  pd('pd-14', 'Find \\partial f/\\partial y:', 'f(x,y)=e^{xy}', 'xe^{xy}', 'Inner derivative x: \\partial f/\\partial y=xe^{xy}.'),
  pd('pd-15', 'Find \\partial f/\\partial x:', 'f(x,y)=x^{2}e^{y}', '2xe^{y}', 'e^{y} constant: \\partial f/\\partial x=2xe^{y}.'),
  pd('pd-16', 'Find \\partial f/\\partial y:', 'f(x,y)=x^{2}e^{y}', 'x^{2}e^{y}', 'x^{2} constant: \\partial f/\\partial y=x^{2}e^{y}.'),
  pd('pd-17', 'Find \\partial f/\\partial x:', 'f(x,y)=\\ln(x^{2}+y^{2})', '\\frac{2x}{x^{2}+y^{2}}', 'Chain rule: \\partial f/\\partial x=\\frac{2x}{x^{2}+y^{2}}.'),
  pd('pd-18', 'Find \\partial f/\\partial y:', 'f(x,y)=\\ln(x^{2}+y^{2})', '\\frac{2y}{x^{2}+y^{2}}', 'Chain rule: \\partial f/\\partial y=\\frac{2y}{x^{2}+y^{2}}.'),
  pd('pd-19', 'Find the second partial derivative f_{xx}:', 'f(x,y)=x^{2}y^{3}', '2y^{3}', 'f_{x}=2xy^{3}, then f_{xx}=2y^{3}.'),
  pd('pd-20', 'Find the second partial derivative f_{yy}:', 'f(x,y)=x^{2}y^{3}', '6x^{2}y', 'f_{y}=3x^{2}y^{2}, then f_{yy}=6x^{2}y.'),
  pd('pd-21', 'Find the mixed partial derivative f_{xy}:', 'f(x,y)=x^{2}y^{3}', '6xy^{2}', 'f_{x}=2xy^{3}, then f_{xy}=6xy^{2}.'),
  pd('pd-22', 'Find the second partial derivative f_{xx}:', 'f(x,y)=x^{3}+x^{2}y^{2}+y^{3}', '6x+2y^{2}', 'f_{x}=3x^{2}+2xy^{2}, then f_{xx}=6x+2y^{2}.'),
  pd('pd-23', 'Find the mixed partial derivative f_{xy}:', 'f(x,y)=x^{3}+x^{2}y^{2}+y^{3}', '4xy', 'f_{x}=3x^{2}+2xy^{2}, then f_{xy}=4xy.'),
  pd('pd-24', 'Find the mixed partial derivative f_{xy}:', 'f(x,y)=e^{x}\\sin(y)', 'e^{x}\\cos(y)', 'f_{x}=e^{x}\\sin(y), then f_{xy}=e^{x}\\cos(y).'),
  pd('pd-25', 'Find the mixed partial derivative f_{xy}:', 'f(x,y)=xy', '1', 'f_{x}=y, then f_{xy}=1.'),
  pd('pd-26', 'Find the second partial derivative f_{xx}:', 'f(x,y)=x^{2}+y^{2}', '2', 'f_{x}=2x, then f_{xx}=2.'),
  pd('pd-27', 'Use the chain rule to find dz/dt:', 'z=x^{2}+y^{2},\\ x=t,\\ y=t^{2}', '2t+4t^{3}', 'dz/dt=2x(1)+2y(2t)=2t+4t^{3}.'),
  pd('pd-28', 'Use the chain rule to find dz/dt:', 'z=xy,\\ x=t,\\ y=t^{2}', '3t^{2}', 'dz/dt=y(1)+x(2t)=t^{2}+2t^{2}=3t^{2}.'),
  pd('pd-29', 'Use the chain rule to find dz/dt:', 'z=x^{2}y,\\ x=t,\\ y=t^{3}', '5t^{4}', 'dz/dt=2xy(1)+x^{2}(3t^{2})=2t^{4}+3t^{4}=5t^{4}.'),
  pd('pd-30', 'Use the chain rule to find dz/dt:', 'z=\\sin(x),\\ x=t^{2}', '2t\\cos(t^{2})', 'dz/dt=\\cos(x)(2t)=2t\\cos(t^{2}).'),
];
```

These literals contain no apostrophes, so single quotes are safe.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test lib/calculusPartialBank.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/calculusPartialBank.ts lib/calculusPartialBank.test.ts
git commit -m "feat(calculus): add partial differentiation static bank"
```

---

## Task 5: Applications of differentiation static bank

**Files:**
- Modify: `lib/calculusTypes.ts` (extend `CalculusCategory` union)
- Create: `lib/calculusApplicationsBank.ts`
- Test: `lib/calculusApplicationsBank.test.ts`

**Interfaces:**
- Consumes: `CalculusQuestion` from `./calculusTypes.ts`.
- Produces:
  - `CalculusCategory` gains `'applications'` (union becomes `'basicRules' | 'implicitHigherOrder' | 'partial' | 'applications'`).
  - `applicationsQuestions: CalculusQuestion[]` (30 items, all `category: 'applications'`, `source: 'static'`, ids `ap-01`..`ap-30`).

- [ ] **Step 1: Extend the category union**

In `lib/calculusTypes.ts`, change:

```typescript
export type CalculusCategory = 'basicRules' | 'implicitHigherOrder' | 'partial';
```

to:

```typescript
export type CalculusCategory = 'basicRules' | 'implicitHigherOrder' | 'partial' | 'applications';
```

- [ ] **Step 2: Write the failing test**

Create `lib/calculusApplicationsBank.test.ts`:

```typescript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applicationsQuestions } from './calculusApplicationsBank.ts';

test('bank has at least 25 items', () => {
  assert.ok(applicationsQuestions.length >= 25);
});

test('every item is well-formed and correctly tagged', () => {
  for (const q of applicationsQuestions) {
    assert.equal(q.category, 'applications');
    assert.equal(q.source, 'static');
    assert.ok(q.id && q.instructions && q.prompt && q.correctAnswer && q.solution);
  }
});

test('ids are unique', () => {
  const ids = applicationsQuestions.map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('spot-check known answers', () => {
  const byId = Object.fromEntries(applicationsQuestions.map((q) => [q.id, q]));
  assert.equal(byId['ap-01'].correctAnswer, '6');
  assert.equal(byId['ap-13'].correctAnswer, '-4');
  assert.equal(byId['ap-21'].correctAnswer, '7');
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `node --test lib/calculusApplicationsBank.test.ts`
Expected: FAIL - cannot find module `./calculusApplicationsBank.ts`.

- [ ] **Step 4: Write the implementation**

Create `lib/calculusApplicationsBank.ts` (30 items: ap-01..ap-10 tangents & normals, ap-11..ap-20 stationary points & max/min, ap-21..ap-30 rates of change & kinematics). None of these literals contain apostrophes - all solutions use `\frac{dy}{dx}` notation, so single quotes are safe:

```typescript
import type { CalculusQuestion } from './calculusTypes.ts';

const ap = (
  id: string,
  instructions: string,
  prompt: string,
  correctAnswer: string,
  solution: string,
): CalculusQuestion => ({ id, category: 'applications', source: 'static', instructions, prompt, correctAnswer, solution });

const TAN_GRAD = 'Find the gradient of the tangent to the curve at the given x-value:';
const TAN_EQ = 'Find the equation of the tangent to the curve at the given point (answer as y=mx+c):';
const NORM_GRAD = 'Find the gradient of the normal to the curve at the given x-value:';
const STAT_X = 'Find the x-coordinate of the stationary point:';
const STAT_X_POS = 'Find the positive x-coordinate of a stationary point:';
const MIN_V = 'Find the minimum value of y:';
const MAX_V = 'Find the maximum value of y:';
const VEL_AT = 'The displacement is s(t) metres after t seconds. Find the velocity at the given time:';
const ACC_AT = 'The displacement is s(t) metres after t seconds. Find the acceleration at the given time:';
const RATE_AT = 'Find the rate of change at the given value:';

export const applicationsQuestions: CalculusQuestion[] = [
  ap('ap-01', TAN_GRAD, 'y=x^{2},\\ x=3', '6', '\\frac{dy}{dx}=2x.\\text{ At }x=3:\\ 2(3)=6.'),
  ap('ap-02', TAN_GRAD, 'y=x^{3},\\ x=2', '12', '\\frac{dy}{dx}=3x^{2}.\\text{ At }x=2:\\ 3(4)=12.'),
  ap('ap-03', TAN_GRAD, 'y=x^{2}-4x,\\ x=1', '-2', '\\frac{dy}{dx}=2x-4.\\text{ At }x=1:\\ 2-4=-2.'),
  ap('ap-04', TAN_EQ, 'y=x^{2}\\text{ at }(2,4)', 'y=4x-4', '\\text{Slope }=2x=4.\\ y-4=4(x-2)\\Rightarrow y=4x-4.'),
  ap('ap-05', TAN_EQ, 'y=x^{2}+1\\text{ at }(1,2)', 'y=2x', '\\text{Slope }=2x=2.\\ y-2=2(x-1)\\Rightarrow y=2x.'),
  ap('ap-06', TAN_EQ, 'y=x^{3}\\text{ at }(1,1)', 'y=3x-2', '\\text{Slope }=3x^{2}=3.\\ y-1=3(x-1)\\Rightarrow y=3x-2.'),
  ap('ap-07', NORM_GRAD, 'y=x^{2},\\ x=1', '-\\frac{1}{2}', '\\text{Tangent slope }=2x=2.\\text{ Normal slope }=-\\frac{1}{2}.'),
  ap('ap-08', NORM_GRAD, 'y=x^{3},\\ x=1', '-\\frac{1}{3}', '\\text{Tangent slope }=3x^{2}=3.\\text{ Normal slope }=-\\frac{1}{3}.'),
  ap('ap-09', 'Find the x-value where the tangent to the curve is horizontal:', 'y=x^{2}-6x', '3', '\\frac{dy}{dx}=2x-6=0\\Rightarrow x=3.'),
  ap('ap-10', 'Find the x-value where the gradient of the curve equals 10:', 'y=x^{2}+4x', '3', '\\frac{dy}{dx}=2x+4=10\\Rightarrow x=3.'),
  ap('ap-11', STAT_X, 'y=x^{2}-4x+1', '2', '\\frac{dy}{dx}=2x-4=0\\Rightarrow x=2.'),
  ap('ap-12', STAT_X, 'y=x^{2}+6x', '-3', '\\frac{dy}{dx}=2x+6=0\\Rightarrow x=-3.'),
  ap('ap-13', MIN_V, 'y=x^{2}-6x+5', '-4', '\\frac{dy}{dx}=2x-6=0\\Rightarrow x=3.\\ y=9-18+5=-4.'),
  ap('ap-14', MIN_V, 'y=x^{2}+2x+3', '2', '\\frac{dy}{dx}=2x+2=0\\Rightarrow x=-1.\\ y=1-2+3=2.'),
  ap('ap-15', MAX_V, 'y=-x^{2}+4x+1', '5', '\\frac{dy}{dx}=-2x+4=0\\Rightarrow x=2.\\ y=-4+8+1=5.'),
  ap('ap-16', STAT_X_POS, 'y=x^{3}-3x', '1', '\\frac{dy}{dx}=3x^{2}-3=0\\Rightarrow x=\\pm 1.\\text{ Positive: }x=1.'),
  ap('ap-17', STAT_X_POS, 'y=x^{3}-12x', '2', '\\frac{dy}{dx}=3x^{2}-12=0\\Rightarrow x=\\pm 2.\\text{ Positive: }x=2.'),
  ap('ap-18', 'Evaluate \\frac{d^{2}y}{dx^{2}} at the stationary point:', 'y=x^{2}-4x+1', '2', '\\frac{d^{2}y}{dx^{2}}=2\\text{ (constant), positive so the point is a minimum}.'),
  ap('ap-19', STAT_X_POS, 'y=2x^{3}-6x', '1', '\\frac{dy}{dx}=6x^{2}-6=0\\Rightarrow x=\\pm 1.\\text{ Positive: }x=1.'),
  ap('ap-20', MIN_V, 'y=x^{2}-2x', '-1', '\\frac{dy}{dx}=2x-2=0\\Rightarrow x=1.\\ y=1-2=-1.'),
  ap('ap-21', VEL_AT, 's=t^{2}+3t,\\ t=2', '7', 'v=\\frac{ds}{dt}=2t+3.\\text{ At }t=2:\\ 4+3=7.'),
  ap('ap-22', VEL_AT, 's=t^{3}-3t,\\ t=2', '9', 'v=\\frac{ds}{dt}=3t^{2}-3.\\text{ At }t=2:\\ 12-3=9.'),
  ap('ap-23', ACC_AT, 's=t^{3},\\ t=2', '12', 'v=3t^{2},\\ a=\\frac{d^{2}s}{dt^{2}}=6t.\\text{ At }t=2:\\ 12.'),
  ap('ap-24', VEL_AT, 's=5t^{2},\\ t=3', '30', 'v=\\frac{ds}{dt}=10t.\\text{ At }t=3:\\ 30.'),
  ap('ap-25', 'The displacement is s(t). Find the time t>0 when the velocity is zero:', 's=t^{3}-6t^{2}', '4', 'v=3t^{2}-12t=3t(t-4)=0\\Rightarrow t=4\\ (t>0).'),
  ap('ap-26', 'The displacement is s(t). Find the velocity as a function of t:', 's=t^{2}-4t', '2t-4', 'v=\\frac{ds}{dt}=2t-4.'),
  ap('ap-27', RATE_AT, 'A=x^{2},\\ x=5', '10', '\\frac{dA}{dx}=2x.\\text{ At }x=5:\\ 10.'),
  ap('ap-28', RATE_AT, 'V=x^{3},\\ x=2', '12', '\\frac{dV}{dx}=3x^{2}.\\text{ At }x=2:\\ 12.'),
  ap('ap-29', RATE_AT, 'A=\\pi r^{2},\\ r=3', '6\\pi', '\\frac{dA}{dr}=2\\pi r.\\text{ At }r=3:\\ 6\\pi.'),
  ap('ap-30', 'The displacement is s(t). Find the acceleration as a function of t:', 's=t^{3}-3t^{2}', '6t-6', 'v=3t^{2}-6t,\\ a=\\frac{dv}{dt}=6t-6.'),
];
```

- [ ] **Step 5: Run test to verify it passes**

Run: `node --test lib/calculusApplicationsBank.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 6: Run the full lib suite to confirm the union extension broke nothing**

Run: `npm test`
Expected: all existing calculus tests still PASS (generators 8, implicit 4, partial 4, applications 4).

- [ ] **Step 7: Commit**

```bash
git add lib/calculusTypes.ts lib/calculusApplicationsBank.ts lib/calculusApplicationsBank.test.ts
git commit -m "feat(calculus): add applications-of-differentiation static bank"
```

---

## Task 6: Quiz assembly entry point

**Files:**
- Create: `lib/calculusQuestions.ts`
- Test: `lib/calculusQuestions.test.ts`

**Interfaces:**
- Consumes: `randomBasicRuleQuestion`, `randId` from `./calculusGenerators.ts`; `implicitHigherOrderQuestions` from `./calculusImplicitBank.ts`; `partialDifferentiationQuestions` from `./calculusPartialBank.ts`; `applicationsQuestions` from `./calculusApplicationsBank.ts`; types from `./calculusTypes.ts`.
- Produces:
  - `CalculusConfig = { basicRules: boolean; implicitHigherOrder: boolean; partial: boolean; applications: boolean; count: number }`
  - `assembleQuiz(config: CalculusConfig): CalculusQuestion[]`
  - Re-exports: `CalculusQuestion`, `CalculusCategory`, `implicitHigherOrderQuestions`, `partialDifferentiationQuestions`, `applicationsQuestions`.

- [ ] **Step 1: Write the failing test**

Create `lib/calculusQuestions.test.ts`:

```typescript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assembleQuiz } from './calculusQuestions.ts';

test('returns exactly `count` questions', () => {
  const qs = assembleQuiz({ basicRules: true, implicitHigherOrder: true, partial: true, applications: true, count: 12 });
  assert.equal(qs.length, 12);
});

test('respects category selection - basicRules only', () => {
  const qs = assembleQuiz({ basicRules: true, implicitHigherOrder: false, partial: false, applications: false, count: 20 });
  assert.ok(qs.every((q) => q.category === 'basicRules'));
});

test('respects category selection - partial only', () => {
  const qs = assembleQuiz({ basicRules: false, implicitHigherOrder: false, partial: true, applications: false, count: 15 });
  assert.ok(qs.every((q) => q.category === 'partial'));
});

test('respects category selection - applications only', () => {
  const qs = assembleQuiz({ basicRules: false, implicitHigherOrder: false, partial: false, applications: true, count: 15 });
  assert.ok(qs.every((q) => q.category === 'applications'));
});

test('assigns a unique id to every drawn question', () => {
  const qs = assembleQuiz({ basicRules: false, implicitHigherOrder: true, partial: false, applications: false, count: 40 });
  const ids = qs.map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('returns empty array when no categories selected', () => {
  const qs = assembleQuiz({ basicRules: false, implicitHigherOrder: false, partial: false, applications: false, count: 10 });
  assert.equal(qs.length, 0);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test lib/calculusQuestions.test.ts`
Expected: FAIL - cannot find module `./calculusQuestions.ts`.

- [ ] **Step 3: Write the implementation**

Create `lib/calculusQuestions.ts`:

```typescript
import type { CalculusQuestion, CalculusCategory } from './calculusTypes.ts';
import { randomBasicRuleQuestion, randId } from './calculusGenerators.ts';
import { implicitHigherOrderQuestions } from './calculusImplicitBank.ts';
import { partialDifferentiationQuestions } from './calculusPartialBank.ts';
import { applicationsQuestions } from './calculusApplicationsBank.ts';

export type { CalculusQuestion, CalculusCategory } from './calculusTypes.ts';
export { implicitHigherOrderQuestions } from './calculusImplicitBank.ts';
export { partialDifferentiationQuestions } from './calculusPartialBank.ts';
export { applicationsQuestions } from './calculusApplicationsBank.ts';

export interface CalculusConfig {
  basicRules: boolean;
  implicitHigherOrder: boolean;
  partial: boolean;
  applications: boolean;
  count: number;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function assembleQuiz(config: CalculusConfig): CalculusQuestion[] {
  const categories: CalculusCategory[] = [];
  if (config.basicRules) categories.push('basicRules');
  if (config.implicitHigherOrder) categories.push('implicitHigherOrder');
  if (config.partial) categories.push('partial');
  if (config.applications) categories.push('applications');

  if (categories.length === 0) return [];

  const out: CalculusQuestion[] = [];
  for (let i = 0; i < config.count; i++) {
    const cat = pickRandom(categories);
    let q: CalculusQuestion;
    if (cat === 'basicRules') {
      q = randomBasicRuleQuestion();
    } else if (cat === 'implicitHigherOrder') {
      q = pickRandom(implicitHigherOrderQuestions);
    } else if (cat === 'partial') {
      q = pickRandom(partialDifferentiationQuestions);
    } else {
      q = pickRandom(applicationsQuestions);
    }
    // Fresh id per drawn question so repeats of a static item don't collide as React keys.
    out.push({ ...q, id: randId() });
  }
  return out;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test lib/calculusQuestions.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 5: Run the whole suite**

Run: `npm test`
Expected: all calculus test files PASS (generators 8, implicit 4, partial 4, applications 4, questions 6).

- [ ] **Step 6: Commit**

```bash
git add lib/calculusQuestions.ts lib/calculusQuestions.test.ts
git commit -m "feat(calculus): add quiz assembly entry point"
```

---

## Task 7: Calculus quiz page

**Files:**
- Create: `app/calculus/page.tsx`
- Reference (read, do not modify): `app/surgery/page.tsx` (resume/progress pattern), `app/math/page.tsx` (MathInput quiz loop)

**Interfaces:**
- Consumes: `assembleQuiz`, `CalculusQuestion` from `@/lib/calculusQuestions`; `MathDisplay` from `@/components/MathDisplay`; `MathInput` from `@/components/MathInput`; `checkAnswer` from `@/lib/checkAnswer`; `saveActiveSession`, `getActiveSession`, `clearActiveSession`, `saveCourseProgress` from `@/lib/progressTracker`.
- Note: production imports (via `@/`) do NOT use `.ts` extensions - Next/webpack resolves them. Only `node --test` files need explicit `.ts`.

- [ ] **Step 1: Write the page**

Create `app/calculus/page.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { assembleQuiz, CalculusQuestion } from '@/lib/calculusQuestions';
import MathDisplay from '@/components/MathDisplay';
import MathInput from '@/components/MathInput';
import { checkAnswer } from '@/lib/checkAnswer';
import {
  saveActiveSession,
  getActiveSession,
  clearActiveSession,
  saveCourseProgress,
} from '@/lib/progressTracker';

export default function CalculusPage() {
  const [mounted, setMounted] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [questions, setQuestions] = useState<CalculusQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [feedback, setFeedback] = useState<{ [key: string]: boolean }>({});
  const [showSolution, setShowSolution] = useState(false);
  const [canResume, setCanResume] = useState(false);

  const [config, setConfig] = useState({
    basicRules: true,
    implicitHigherOrder: false,
    partial: false,
    applications: false,
    count: 10,
  });

  useEffect(() => {
    setMounted(true);
    const session = getActiveSession('calculus');
    if (session && session.questions && session.questions.length > 0) {
      setCanResume(true);
    }
  }, []);

  const resumeSession = () => {
    const session = getActiveSession('calculus');
    if (!session) return;
    setQuestions(session.questions);
    setCurrentIndex(session.currentIndex || 0);
    setAnswers(session.answers || {});
    setFeedback(session.feedback || {});
    setStarted(true);
    setCanResume(false);
  };

  const persist = (q: CalculusQuestion[], idx: number, ans: Record<string, string>, fb: Record<string, boolean>) => {
    saveActiveSession('calculus', { questions: q, currentIndex: idx, answers: ans, feedback: fb });
  };

  const startQuiz = () => {
    const newQuestions = assembleQuiz(config);
    if (newQuestions.length === 0) {
      alert('Please select at least one topic.');
      return;
    }
    setQuestions(newQuestions);
    setStarted(true);
    setFinished(false);
    setCurrentIndex(0);
    setAnswers({});
    setFeedback({});
    setShowSolution(false);
    setCanResume(false);
    persist(newQuestions, 0, {}, {});
  };

  const verifyAnswer = () => {
    const q = questions[currentIndex];
    const answer = answers[q.id] || '';
    const isCorrect = checkAnswer('algebra', q.correctAnswer, answer);
    const newFeedback = { ...feedback, [q.id]: isCorrect };
    setFeedback(newFeedback);
    setShowSolution(!isCorrect);
    persist(questions, currentIndex, answers, newFeedback);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setShowSolution(false);
      persist(questions, nextIdx, answers, feedback);
    } else {
      const correctCount = Object.values(feedback).filter(Boolean).length;
      saveCourseProgress('calculus', { type: 'math', correct: correctCount, total: questions.length });
      clearActiveSession('calculus');
      setFinished(true);
    }
  };

  const resetQuiz = () => {
    clearActiveSession('calculus');
    setStarted(false);
    setFinished(false);
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setFeedback({});
    setCanResume(false);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Calculus Practice</h1>
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-800">← Home</Link>
          </div>

          {canResume && (
            <button
              onClick={resumeSession}
              className="w-full mb-4 bg-teal-50 border border-teal-200 text-teal-700 font-semibold py-3 px-6 rounded-lg hover:bg-teal-100 transition-colors"
            >
              Resume in-progress session →
            </button>
          )}

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-700">Basic rules &amp; standard derivatives</label>
              <input type="checkbox" checked={config.basicRules}
                onChange={(e) => setConfig({ ...config, basicRules: e.target.checked })}
                className="w-5 h-5 accent-teal-600" />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-700">Implicit &amp; higher-order differentiation</label>
              <input type="checkbox" checked={config.implicitHigherOrder}
                onChange={(e) => setConfig({ ...config, implicitHigherOrder: e.target.checked })}
                className="w-5 h-5 accent-teal-600" />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-700">Partial differentiation</label>
              <input type="checkbox" checked={config.partial}
                onChange={(e) => setConfig({ ...config, partial: e.target.checked })}
                className="w-5 h-5 accent-teal-600" />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-700">Applications of differentiation</label>
              <input type="checkbox" checked={config.applications}
                onChange={(e) => setConfig({ ...config, applications: e.target.checked })}
                className="w-5 h-5 accent-teal-600" />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label className="block font-medium text-slate-700 mb-2">Number of Questions</label>
              <input type="number" min={1} max={50} value={config.count}
                onChange={(e) => setConfig({ ...config, count: parseInt(e.target.value) || 10 })}
                className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none" />
            </div>
          </div>

          <button onClick={startQuiz}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const correctCount = Object.values(feedback).filter(Boolean).length;
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">Quiz Complete!</h2>
          <div className="text-xl mb-6">
            Score: <span className="font-bold text-teal-600">{correctCount}</span> / {questions.length}
          </div>
          <button onClick={resetQuiz}
            className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Start New Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const hasAnswered = feedback[currentQ.id] !== undefined;

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 flex justify-between items-center">
          <h1 className="font-bold text-slate-700">Question {currentIndex + 1} of {questions.length}</h1>
          <button onClick={resetQuiz} className="text-sm text-red-500 hover:underline">Exit Quiz</button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
          <div className="mb-6">
            <p className="text-slate-500 text-sm mb-2 uppercase tracking-wide font-semibold">{currentQ.category}</p>
            <p className="text-lg mb-4 text-slate-800">{currentQ.instructions}</p>
            <div className="text-2xl text-center py-8 font-serif bg-slate-50 rounded-lg border border-slate-100 overflow-x-auto">
              <MathDisplay latex={currentQ.prompt} block />
            </div>
          </div>

          <div className="mb-6">
            <MathInput
              key={currentQ.id}
              value={answers[currentQ.id] || ''}
              onChange={(val) => setAnswers({ ...answers, [currentQ.id]: val })}
              disabled={hasAnswered}
            />
            {hasAnswered && (
              <div className={`mt-2 font-medium ${feedback[currentQ.id] ? 'text-green-600' : 'text-red-600'}`}>
                {feedback[currentQ.id] ? 'Correct!' : 'Incorrect'}
              </div>
            )}
          </div>

          {showSolution && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-slate-700">
              <h3 className="font-bold mb-2">Solution:</h3>
              <p className="mb-2">Correct Answer: <span className="font-mono font-bold">{currentQ.correctAnswer}</span></p>
              <div className="mt-4 pt-4 border-t border-yellow-200">
                <MathDisplay latex={currentQ.solution} />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            {!hasAnswered ? (
              <button onClick={verifyAnswer} disabled={!answers[currentQ.id]}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95">
                Check Answer
              </button>
            ) : (
              <button onClick={nextQuestion}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform active:scale-95">
                {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no errors referencing `app/calculus/page.tsx`.

- [ ] **Step 3: Commit**

```bash
git add app/calculus/page.tsx
git commit -m "feat(calculus): add quiz page with resume and progress tracking"
```

---

## Task 8: Home page course card

**Files:**
- Modify: `app/page.tsx:18` (courses array), `app/page.tsx:41` (skeleton array), `app/page.tsx:169-175` (after the surgery `renderCard` call)

**Interfaces:**
- Consumes: existing `renderCard(id, title, description, textColor, hoverText)` helper.

- [ ] **Step 1: Add `'calculus'` to the courses array**

In `app/page.tsx`, change line 18 from:

```tsx
    const courses = ['math', 'nutrition', 'palliative', 'research', 'pharmacology', 'surgery'];
```

to:

```tsx
    const courses = ['math', 'nutrition', 'palliative', 'research', 'pharmacology', 'surgery', 'calculus'];
```

- [ ] **Step 2: Add `'calculus'` to the SSR skeleton array**

In `app/page.tsx`, change line 41 from:

```tsx
            {['math', 'nutrition', 'palliative', 'research', 'pharmacology', 'surgery'].map((c) => (
```

to:

```tsx
            {['math', 'nutrition', 'palliative', 'research', 'pharmacology', 'surgery', 'calculus'].map((c) => (
```

- [ ] **Step 3: Add the card**

In `app/page.tsx`, immediately after the closing `)}` of the surgery `renderCard(...)` call (around line 175, before the closing `</div>` of the grid), add:

```tsx
          {renderCard(
            'calculus',
            'Calculus Practice',
            'Differentiation and partial differentiation: power/product/quotient/chain rules and standard derivatives (unlimited generated problems), plus curated implicit, higher-order, applications (tangents, max/min, kinematics), and partial-differentiation problems with worked solutions.',
            'text-teal-600',
            'text-teal-700'
          )}
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat(calculus): add Calculus card to home page"
```

---

## Task 9: Full verification (build, lint, browser)

**Files:** none created; verification only.

- [ ] **Step 1: Run the unit suite**

Run: `npm test`
Expected: all calculus test files PASS, no failures.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors in `lib/calculus*.ts` or `app/calculus/page.tsx`. Fix any (e.g. unused vars) and re-run.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: build succeeds; the route list includes `/calculus`.

- [ ] **Step 4: Browser smoke test**

Start the dev server and open the app (use the browser preview tooling, or `npm run dev` + open `http://localhost:3000`). Verify:
  1. Home page shows the teal "Calculus Practice" card.
  2. Clicking it opens `/calculus` with four topic checkboxes.
  3. Start a quiz with "Basic rules" only - a derivative prompt renders via KaTeX; typing an answer and "Check Answer" shows Correct/Incorrect; a wrong answer reveals the Solution panel.
  4. Start a quiz with "Implicit & higher-order", "Partial", and "Applications" enabled - static problems render correctly (fractions, trig, partial notation, kinematics wording).
  5. Mid-quiz, reload the page and return to `/calculus` - the "Resume in-progress session" button appears and restores position.
  6. Finish a quiz - the score screen shows; return home and confirm the Calculus card shows updated Answered/Accuracy stats.

Because MathLive answer-matching is exact-string (per Global Constraints), note during testing that some correct-but-differently-formatted inputs may read as Incorrect; the Solution panel always shows the accepted form. This is expected and consistent with the existing Math course.

- [ ] **Step 5: Final commit (if any lint/build fixes were made)**

```bash
git add -A
git commit -m "chore(calculus): lint and build fixes"
```

---

## Task 10: Learn-mode lesson data

> **Amendment 2 (2026-07-22):** Tasks 10-12 add Learn mode (per-topic worked
> examples with step-by-step reveal + try-it-yourself) per the spec's Learn
> mode section. Tasks 1-9 are complete at this point.

**Files:**
- Create: `lib/calculusLessons.ts`
- Test: `lib/calculusLessons.test.ts`

**Interfaces:**
- Consumes: `CalculusQuestion` from `./calculusTypes.ts`; `generatePowerRule`, `generateProductRule`, `generateQuotientRule`, `generateChainRule`, `generateTrigExpLog` from `./calculusGenerators.ts`; `implicitHigherOrderQuestions` from `./calculusImplicitBank.ts`; `partialDifferentiationQuestions` from `./calculusPartialBank.ts`; `applicationsQuestions` from `./calculusApplicationsBank.ts`; `randId` from `./calculusGenerators.ts`.
- Produces:
  - `ExampleStep { explanation: string; latex: string }`
  - `WorkedExample { id: string; title: string; prompt: string; steps: ExampleStep[]; answer: string }`
  - `CalculusLesson { id: string; title: string; intro: string; examples: WorkedExample[]; tryIt: () => CalculusQuestion }`
  - `calculusLessons: CalculusLesson[]` (10 lessons, ids `lesson-01`..`lesson-10`)

- [ ] **Step 1: Write the failing test**

Create `lib/calculusLessons.test.ts`:

```typescript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculusLessons } from './calculusLessons.ts';

test('there are 10 lessons with unique ids', () => {
  assert.equal(calculusLessons.length, 10);
  const ids = calculusLessons.map((l) => l.id);
  assert.equal(new Set(ids).size, 10);
});

test('every lesson is well-formed', () => {
  for (const l of calculusLessons) {
    assert.ok(l.title && l.intro);
    assert.ok(l.examples.length >= 2, `${l.id} needs >=2 examples`);
    for (const ex of l.examples) {
      assert.ok(ex.id && ex.title && ex.prompt && ex.answer);
      assert.ok(ex.steps.length >= 2, `${ex.id} needs >=2 steps`);
      for (const s of ex.steps) assert.ok(s.explanation && s.latex);
    }
  }
});

test('example ids are globally unique', () => {
  const ids = calculusLessons.flatMap((l) => l.examples.map((e) => e.id));
  assert.equal(new Set(ids).size, ids.length);
});

test('tryIt draws a matching question for every lesson', () => {
  const expectCategory: Record<string, string> = {
    'lesson-01': 'basicRules', 'lesson-02': 'basicRules', 'lesson-03': 'basicRules',
    'lesson-04': 'basicRules', 'lesson-05': 'basicRules',
    'lesson-06': 'implicitHigherOrder', 'lesson-07': 'implicitHigherOrder',
    'lesson-08': 'implicitHigherOrder',
    'lesson-09': 'partial', 'lesson-10': 'applications',
  };
  for (const l of calculusLessons) {
    for (let i = 0; i < 5; i++) {
      const q = l.tryIt();
      assert.equal(q.category, expectCategory[l.id], `${l.id} drew wrong category`);
      assert.ok(q.prompt && q.correctAnswer && q.solution);
    }
  }
});

test('bank-backed lessons draw from the right subtopic slice', () => {
  const byId = Object.fromEntries(calculusLessons.map((l) => [l.id, l]));
  // implicit: source ids ih-01..ih-12; higher-order: ih-13..ih-24; parametric: ih-25..ih-30.
  // tryIt re-ids drawn questions, so check the prompt appears in the right slice instead.
  const implicitPrompts = new Set(
    ['lesson-06', 'lesson-07', 'lesson-08'].map(() => '')
  );
  void implicitPrompts;
  for (let i = 0; i < 10; i++) {
    assert.match(byId['lesson-06'].tryIt().instructions, /implicit/i);
    assert.match(byId['lesson-07'].tryIt().instructions, /second|third/i);
    assert.match(byId['lesson-08'].tryIt().instructions, /parametric/i);
  }
});

test('spot-check example math', () => {
  const allExamples = Object.fromEntries(
    calculusLessons.flatMap((l) => l.examples.map((e) => [e.id, e]))
  );
  assert.equal(allExamples['ex-power-1'].answer, '15x^{2}');
  assert.equal(allExamples['ex-quot-1'].answer, '\\frac{-30}{(9x+2)^{2}}');
  assert.equal(allExamples['ex-chain-1'].answer, '6(2x+9)^{2}');
  assert.equal(allExamples['ex-impl-1'].answer, '-\\frac{x}{y}');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test lib/calculusLessons.test.ts`
Expected: FAIL - cannot find module `./calculusLessons.ts`.

- [ ] **Step 3: Write the implementation**

Create `lib/calculusLessons.ts`. Every `explanation` is plain language: technical terms glossed in everyday words.

```typescript
import type { CalculusQuestion } from './calculusTypes.ts';
import {
  generatePowerRule,
  generateProductRule,
  generateQuotientRule,
  generateChainRule,
  generateTrigExpLog,
  randId,
} from './calculusGenerators.ts';
import { implicitHigherOrderQuestions } from './calculusImplicitBank.ts';
import { partialDifferentiationQuestions } from './calculusPartialBank.ts';
import { applicationsQuestions } from './calculusApplicationsBank.ts';

export interface ExampleStep {
  explanation: string;
  latex: string;
}

export interface WorkedExample {
  id: string;
  title: string;
  prompt: string;
  steps: ExampleStep[];
  answer: string;
}

export interface CalculusLesson {
  id: string;
  title: string;
  intro: string;
  examples: WorkedExample[];
  tryIt: () => CalculusQuestion;
}

function drawFrom(bank: CalculusQuestion[]): CalculusQuestion {
  const q = bank[Math.floor(Math.random() * bank.length)];
  return { ...q, id: randId() };
}

// Bank slices by position (ids are ordered: ih-01..12 implicit, ih-13..24 higher-order, ih-25..30 parametric)
const implicitSlice = implicitHigherOrderQuestions.slice(0, 12);
const higherOrderSlice = implicitHigherOrderQuestions.slice(12, 24);
const parametricSlice = implicitHigherOrderQuestions.slice(24, 30);

export const calculusLessons: CalculusLesson[] = [
  {
    id: 'lesson-01',
    title: 'Power rule',
    intro: 'The power rule is the workhorse of differentiation. For any power of x, you bring the power down to the front as a multiplier, then knock the power down by one. It works for whole numbers, negatives, and fractions alike.',
    examples: [
      {
        id: 'ex-power-1',
        title: 'Differentiate y = 5x^3',
        prompt: 'y=5x^{3}',
        steps: [
          { explanation: 'The power rule says: bring the power down front as a multiplier, then reduce the power by one.', latex: '\\frac{d}{dx}x^{n}=nx^{n-1}' },
          { explanation: 'Here the power is 3. Bring the 3 down and multiply it by the 5 already in front, then drop the power from 3 to 2.', latex: '\\frac{dy}{dx}=5\\cdot 3x^{3-1}' },
          { explanation: 'Tidy up: 5 times 3 is 15.', latex: '\\frac{dy}{dx}=15x^{2}' },
        ],
        answer: '15x^{2}',
      },
      {
        id: 'ex-power-2',
        title: 'Differentiate y = 2x^4 + 7x',
        prompt: 'y=2x^{4}+7x',
        steps: [
          { explanation: 'When terms are added, differentiate each term on its own (term-by-term).', latex: '\\frac{dy}{dx}=\\frac{d}{dx}(2x^{4})+\\frac{d}{dx}(7x)' },
          { explanation: 'First term: bring down the 4, multiply by 2, drop the power to 3. Second term: the derivative of 7x is just 7, because x to the power 1 differentiates to 1.', latex: '\\frac{dy}{dx}=2\\cdot 4x^{3}+7' },
          { explanation: 'Tidy up.', latex: '\\frac{dy}{dx}=8x^{3}+7' },
        ],
        answer: '8x^{3}+7',
      },
    ],
    tryIt: generatePowerRule,
  },
  {
    id: 'lesson-02',
    title: 'Product rule',
    intro: 'When two expressions are multiplied together, you cannot just differentiate each and multiply. The product rule says: differentiate the first and keep the second, then keep the first and differentiate the second, and add the two pieces.',
    examples: [
      {
        id: 'ex-prod-1',
        title: 'Differentiate y = (x^2 + 3)(x^4 + 1)',
        prompt: 'y=(x^{2}+3)(x^{4}+1)',
        steps: [
          { explanation: 'Name the two factors: u is the first bracket, v is the second.', latex: 'u=x^{2}+3,\\quad v=x^{4}+1' },
          { explanation: 'Differentiate each factor separately with the power rule.', latex: "u'=2x,\\quad v'=4x^{3}" },
          { explanation: 'Apply the product rule: (derivative of first)(second) + (first)(derivative of second).', latex: "\\frac{dy}{dx}=u'v+uv'=2x(x^{4}+1)+(x^{2}+3)\\cdot 4x^{3}" },
          { explanation: 'Multiply out both pieces.', latex: '\\frac{dy}{dx}=2x^{5}+2x+4x^{5}+12x^{3}' },
          { explanation: 'Collect like terms: 2x^5 and 4x^5 combine to 6x^5.', latex: '\\frac{dy}{dx}=6x^{5}+12x^{3}+2x' },
        ],
        answer: '6x^{5}+12x^{3}+2x',
      },
      {
        id: 'ex-prod-2',
        title: 'Differentiate y = x^2 sin(x)',
        prompt: 'y=x^{2}\\sin(x)',
        steps: [
          { explanation: 'Name the factors: u is x squared, v is sin(x).', latex: 'u=x^{2},\\quad v=\\sin(x)' },
          { explanation: 'Differentiate each: the power rule gives 2x, and the derivative of sin is cos.', latex: "u'=2x,\\quad v'=\\cos(x)" },
          { explanation: 'Apply the product rule and leave the answer tidy - there are no like terms to collect here.', latex: '\\frac{dy}{dx}=2x\\sin(x)+x^{2}\\cos(x)' },
        ],
        answer: '2x\\sin(x)+x^{2}\\cos(x)',
      },
    ],
    tryIt: generateProductRule,
  },
  {
    id: 'lesson-03',
    title: 'Quotient rule',
    intro: 'For one expression divided by another, use the quotient rule: (derivative of top times bottom, minus top times derivative of bottom), all over the bottom squared. The subtraction order matters - top first.',
    examples: [
      {
        id: 'ex-quot-1',
        title: 'Differentiate y = (3x+4)/(9x+2)',
        prompt: 'y=\\frac{3x+4}{9x+2}',
        steps: [
          { explanation: 'Name the parts: u is the top (numerator), v is the bottom (denominator).', latex: 'u=3x+4,\\quad v=9x+2' },
          { explanation: 'Differentiate each part. Both are straight lines, so the derivatives are just the x-coefficients.', latex: "u'=3,\\quad v'=9" },
          { explanation: "Apply the quotient rule: (u'v - uv') over v squared.", latex: "\\frac{dy}{dx}=\\frac{u'v-uv'}{v^{2}}=\\frac{3(9x+2)-9(3x+4)}{(9x+2)^{2}}" },
          { explanation: 'Expand the top: 27x + 6 - 27x - 36. The x terms cancel.', latex: '\\frac{dy}{dx}=\\frac{-30}{(9x+2)^{2}}' },
        ],
        answer: '\\frac{-30}{(9x+2)^{2}}',
      },
      {
        id: 'ex-quot-2',
        title: 'Differentiate y = x^2/(x+1)',
        prompt: 'y=\\frac{x^{2}}{x+1}',
        steps: [
          { explanation: 'Name the parts: u is x squared on top, v is x+1 on the bottom.', latex: 'u=x^{2},\\quad v=x+1' },
          { explanation: 'Differentiate each part.', latex: "u'=2x,\\quad v'=1" },
          { explanation: 'Apply the quotient rule.', latex: '\\frac{dy}{dx}=\\frac{2x(x+1)-x^{2}\\cdot 1}{(x+1)^{2}}' },
          { explanation: 'Expand and simplify the top: 2x^2 + 2x - x^2 leaves x^2 + 2x.', latex: '\\frac{dy}{dx}=\\frac{x^{2}+2x}{(x+1)^{2}}' },
        ],
        answer: '\\frac{x^{2}+2x}{(x+1)^{2}}',
      },
    ],
    tryIt: generateQuotientRule,
  },
  {
    id: 'lesson-04',
    title: 'Chain rule',
    intro: 'The chain rule handles a function wrapped inside another function - like a bracket raised to a power, or sin of something. Differentiate the outside function first (leaving the inside untouched), then multiply by the derivative of the inside.',
    examples: [
      {
        id: 'ex-chain-1',
        title: 'Differentiate y = (2x+9)^3',
        prompt: 'y=(2x+9)^{3}',
        steps: [
          { explanation: 'Spot the structure: something (the inside, 2x+9) raised to the power 3 (the outside).', latex: '\\text{inside}=2x+9,\\quad \\text{outside}=(\\ )^{3}' },
          { explanation: 'Differentiate the outside with the power rule, keeping the inside exactly as it is: bring the 3 down, reduce the power to 2.', latex: '3(2x+9)^{2}' },
          { explanation: 'Now multiply by the derivative of the inside. The inside 2x+9 differentiates to 2.', latex: '\\frac{dy}{dx}=3(2x+9)^{2}\\cdot 2' },
          { explanation: 'Tidy up: 3 times 2 is 6.', latex: '\\frac{dy}{dx}=6(2x+9)^{2}' },
        ],
        answer: '6(2x+9)^{2}',
      },
      {
        id: 'ex-chain-2',
        title: 'Differentiate y = sin(5x)',
        prompt: 'y=\\sin(5x)',
        steps: [
          { explanation: 'Spot the structure: the inside is 5x, the outside is sin of something.', latex: '\\text{inside}=5x,\\quad \\text{outside}=\\sin(\\ )' },
          { explanation: 'Differentiate the outside: sin becomes cos, inside untouched.', latex: '\\cos(5x)' },
          { explanation: 'Multiply by the derivative of the inside: 5x differentiates to 5.', latex: '\\frac{dy}{dx}=5\\cos(5x)' },
        ],
        answer: '5\\cos(5x)',
      },
    ],
    tryIt: generateChainRule,
  },
  {
    id: 'lesson-05',
    title: 'Trig, exponential & log derivatives',
    intro: 'A few derivatives you simply memorise: sin goes to cos, cos goes to minus sin, e to the x stays itself, and ln(x) goes to 1 over x. Combined with the chain rule, these cover most functions you will meet.',
    examples: [
      {
        id: 'ex-trig-1',
        title: 'Differentiate y = 4sin(3x)',
        prompt: 'y=4\\sin(3x)',
        steps: [
          { explanation: 'The standard result: sin differentiates to cos. Because the inside is 3x (not just x), the chain rule also multiplies by 3.', latex: '\\frac{d}{dx}\\sin(kx)=k\\cos(kx)' },
          { explanation: 'Apply it with k = 3, keeping the 4 in front.', latex: '\\frac{dy}{dx}=4\\cdot 3\\cos(3x)' },
          { explanation: 'Tidy up.', latex: '\\frac{dy}{dx}=12\\cos(3x)' },
        ],
        answer: '12\\cos(3x)',
      },
      {
        id: 'ex-trig-2',
        title: 'Differentiate y = e^(2x)',
        prompt: 'y=e^{2x}',
        steps: [
          { explanation: 'e to the x is the function that is its own derivative. With 2x in the power, the chain rule multiplies by the derivative of 2x, which is 2.', latex: '\\frac{d}{dx}e^{kx}=ke^{kx}' },
          { explanation: 'Apply it with k = 2.', latex: '\\frac{dy}{dx}=2e^{2x}' },
        ],
        answer: '2e^{2x}',
      },
      {
        id: 'ex-trig-3',
        title: 'Differentiate y = ln(4x)',
        prompt: 'y=\\ln(4x)',
        steps: [
          { explanation: 'Use a log law first: ln(4x) splits into ln(4) + ln(x). ln(4) is just a constant number, and constants vanish when differentiated.', latex: 'y=\\ln(4)+\\ln(x)' },
          { explanation: 'The standard result: ln(x) differentiates to 1 over x.', latex: '\\frac{dy}{dx}=\\frac{1}{x}' },
        ],
        answer: '\\frac{1}{x}',
      },
    ],
    tryIt: generateTrigExpLog,
  },
  {
    id: 'lesson-06',
    title: 'Implicit differentiation',
    intro: 'Sometimes y is tangled up with x in one equation and you cannot make y the subject. Implicit differentiation says: differentiate both sides with respect to x, and every time you differentiate a y-term, tag on a dy/dx (because y secretly depends on x). Then solve for dy/dx.',
    examples: [
      {
        id: 'ex-impl-1',
        title: 'Find dy/dx for x^2 + y^2 = 25',
        prompt: 'x^{2}+y^{2}=25',
        steps: [
          { explanation: 'Differentiate every term with respect to x. The x-term is normal. The y-term gets differentiated too, but tagged with dy/dx. The constant 25 differentiates to 0.', latex: "2x+2y\\,y'=0" },
          { explanation: "Move the x-term across and divide by the coefficient of dy/dx (written y' for short).", latex: "2y\\,y'=-2x" },
          { explanation: 'Divide both sides by 2y.', latex: "y'=-\\frac{x}{y}" },
        ],
        answer: '-\\frac{x}{y}',
      },
      {
        id: 'ex-impl-2',
        title: 'Find dy/dx for x^2 y = 8',
        prompt: 'x^{2}y=8',
        steps: [
          { explanation: 'The left side is a product of x^2 and y, so use the product rule while differentiating. The y-factor contributes a dy/dx tag.', latex: "2xy+x^{2}y'=0" },
          { explanation: 'Isolate the dy/dx term.', latex: "x^{2}y'=-2xy" },
          { explanation: 'Divide by x squared and cancel one x.', latex: "y'=-\\frac{2y}{x}" },
        ],
        answer: '-\\frac{2y}{x}',
      },
    ],
    tryIt: () => drawFrom(implicitSlice),
  },
  {
    id: 'lesson-07',
    title: 'Higher-order derivatives',
    intro: 'The second derivative is simply the derivative of the derivative - differentiate once, then differentiate the result again. It measures how the slope itself is changing, which is why it shows up in acceleration and in max/min tests.',
    examples: [
      {
        id: 'ex-high-1',
        title: 'Find the second derivative of y = x^4',
        prompt: 'y=x^{4}',
        steps: [
          { explanation: 'Differentiate once with the power rule.', latex: "y'=4x^{3}" },
          { explanation: 'Differentiate the result again: bring down the 3, multiply by 4, drop the power to 2.', latex: "y''=12x^{2}" },
        ],
        answer: '12x^{2}',
      },
      {
        id: 'ex-high-2',
        title: 'Find the second derivative of y = e^(2x)',
        prompt: 'y=e^{2x}',
        steps: [
          { explanation: 'First derivative: e to the 2x stays itself, times the chain-rule factor 2.', latex: "y'=2e^{2x}" },
          { explanation: 'Differentiate again: another factor of 2 comes down.', latex: "y''=4e^{2x}" },
        ],
        answer: '4e^{2x}',
      },
    ],
    tryIt: () => drawFrom(higherOrderSlice),
  },
  {
    id: 'lesson-08',
    title: 'Parametric differentiation',
    intro: 'When x and y are each given in terms of a third variable t (a parameter), you do not need y as a function of x. Differentiate both with respect to t, then divide: dy/dx equals (dy/dt) over (dx/dt).',
    examples: [
      {
        id: 'ex-param-1',
        title: 'Find dy/dx for x = t^2, y = t^3',
        prompt: 'x=t^{2},\\ y=t^{3}',
        steps: [
          { explanation: 'Differentiate each equation with respect to t.', latex: '\\frac{dx}{dt}=2t,\\quad \\frac{dy}{dt}=3t^{2}' },
          { explanation: 'Divide dy/dt by dx/dt.', latex: '\\frac{dy}{dx}=\\frac{3t^{2}}{2t}' },
          { explanation: 'Cancel one t.', latex: '\\frac{dy}{dx}=\\frac{3t}{2}' },
        ],
        answer: '\\frac{3t}{2}',
      },
      {
        id: 'ex-param-2',
        title: 'Find dy/dx for x = 2t, y = t^2',
        prompt: 'x=2t,\\ y=t^{2}',
        steps: [
          { explanation: 'Differentiate each with respect to t.', latex: '\\frac{dx}{dt}=2,\\quad \\frac{dy}{dt}=2t' },
          { explanation: 'Divide and simplify: 2t over 2 is t.', latex: '\\frac{dy}{dx}=\\frac{2t}{2}=t' },
        ],
        answer: 't',
      },
    ],
    tryIt: () => drawFrom(parametricSlice),
  },
  {
    id: 'lesson-09',
    title: 'Partial differentiation',
    intro: 'For a function of two variables like f(x, y), a partial derivative asks: how does f change if I nudge just one variable and freeze the other? Differentiate with respect to the chosen variable and treat the other one exactly like a constant number.',
    examples: [
      {
        id: 'ex-part-1',
        title: 'Find both first partials of f = x^2 + 3xy + y^2',
        prompt: 'f(x,y)=x^{2}+3xy+y^{2}',
        steps: [
          { explanation: 'For the partial with respect to x, pretend y is a constant. x^2 gives 2x; 3xy is (3y) times x, so it gives 3y; y^2 is a pure constant, giving 0.', latex: '\\frac{\\partial f}{\\partial x}=2x+3y' },
          { explanation: 'For the partial with respect to y, pretend x is a constant. x^2 gives 0; 3xy gives 3x; y^2 gives 2y.', latex: '\\frac{\\partial f}{\\partial y}=3x+2y' },
        ],
        answer: '2x+3y',
      },
      {
        id: 'ex-part-2',
        title: 'Find the mixed partial f_xy of f = x^2 y^3',
        prompt: 'f(x,y)=x^{2}y^{3}',
        steps: [
          { explanation: 'First differentiate with respect to x (y frozen): y^3 rides along as a constant.', latex: 'f_{x}=2xy^{3}' },
          { explanation: 'Now differentiate that result with respect to y (x frozen): bring down the 3.', latex: 'f_{xy}=6xy^{2}' },
        ],
        answer: '6xy^{2}',
      },
    ],
    tryIt: () => drawFrom(partialDifferentiationQuestions),
  },
  {
    id: 'lesson-10',
    title: 'Applications: tangents, max/min, kinematics',
    intro: 'The derivative is a slope-measuring machine, and that has three big uses: finding tangent lines to curves, locating maximum and minimum points (where the slope is zero), and turning displacement into velocity and acceleration.',
    examples: [
      {
        id: 'ex-app-1',
        title: 'Tangent to y = x^2 at x = 3',
        prompt: 'y=x^{2},\\ x=3',
        steps: [
          { explanation: 'The derivative gives the slope of the curve at any point.', latex: '\\frac{dy}{dx}=2x' },
          { explanation: 'Substitute x = 3 to get the slope of the tangent there.', latex: '\\text{slope}=2(3)=6' },
          { explanation: 'The point on the curve is (3, 9). Use the straight-line formula y - y1 = m(x - x1).', latex: 'y-9=6(x-3)' },
          { explanation: 'Rearrange into y = mx + c form.', latex: 'y=6x-9' },
        ],
        answer: 'y=6x-9',
      },
      {
        id: 'ex-app-2',
        title: 'Minimum of y = x^2 - 6x + 5',
        prompt: 'y=x^{2}-6x+5',
        steps: [
          { explanation: 'At a maximum or minimum the slope is zero, so differentiate and set the result to 0.', latex: '\\frac{dy}{dx}=2x-6=0' },
          { explanation: 'Solve for x.', latex: 'x=3' },
          { explanation: 'Check it is a minimum: the second derivative is 2, which is positive, so the curve bends upwards (a valley, not a hill).', latex: '\\frac{d^{2}y}{dx^{2}}=2>0' },
          { explanation: 'Substitute x = 3 back to get the minimum value of y.', latex: 'y=9-18+5=-4' },
        ],
        answer: '-4',
      },
      {
        id: 'ex-app-3',
        title: 'Velocity from displacement: s = t^3 - 3t at t = 2',
        prompt: 's=t^{3}-3t,\\ t=2',
        steps: [
          { explanation: 'Velocity is the rate of change of displacement - differentiate s with respect to t.', latex: 'v=\\frac{ds}{dt}=3t^{2}-3' },
          { explanation: 'Substitute t = 2.', latex: 'v=3(4)-3=9' },
        ],
        answer: '9',
      },
    ],
    tryIt: () => drawFrom(applicationsQuestions),
  },
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test lib/calculusLessons.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 5: Run the whole suite**

Run: `npm test`
Expected: 44 tests pass (38 existing + 6 new).

- [ ] **Step 6: Commit**

```bash
git add lib/calculusLessons.ts lib/calculusLessons.test.ts
git commit -m "feat(calculus): add learn-mode lesson data with worked examples"
```

---

## Task 11: Learn-mode UI

**Files:**
- Create: `app/calculus/learn/page.tsx`
- Modify: `app/calculus/page.tsx` (add a "Learn the topics" link on the start screen)

**Interfaces:**
- Consumes: `calculusLessons`, `CalculusLesson`, `WorkedExample` from `@/lib/calculusLessons`; `CalculusQuestion` from `@/lib/calculusQuestions`; `normalizeCalculusLatex` from `@/lib/calculusAnswer`; `checkAnswer` from `@/lib/checkAnswer`; `MathDisplay`, `MathInput` components.
- Production imports use `@/` without `.ts` extensions.

- [ ] **Step 1: Write the learn page**

Create `app/calculus/learn/page.tsx`:

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculusLessons, CalculusLesson, WorkedExample } from '@/lib/calculusLessons';
import { CalculusQuestion } from '@/lib/calculusQuestions';
import { normalizeCalculusLatex } from '@/lib/calculusAnswer';
import { checkAnswer } from '@/lib/checkAnswer';
import MathDisplay from '@/components/MathDisplay';
import MathInput from '@/components/MathInput';

function ExampleCard({ example }: { example: WorkedExample }) {
  const [revealed, setRevealed] = useState(0);
  const done = revealed >= example.steps.length;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-4">
      <h3 className="font-bold text-slate-800 mb-2">{example.title}</h3>
      <div className="text-xl text-center py-4 bg-slate-50 rounded-lg border border-slate-100 overflow-x-auto mb-4">
        <MathDisplay latex={example.prompt} block />
      </div>

      {example.steps.slice(0, revealed).map((s, i) => (
        <div key={i} className="mb-3 pl-4 border-l-2 border-teal-200">
          <p className="text-sm text-slate-600 mb-1">
            <span className="font-semibold text-teal-700">Step {i + 1}.</span> {s.explanation}
          </p>
          <div className="overflow-x-auto">
            <MathDisplay latex={s.latex} block />
          </div>
        </div>
      ))}

      {!done ? (
        <button
          onClick={() => setRevealed(revealed + 1)}
          className="mt-2 bg-teal-50 border border-teal-200 text-teal-700 font-semibold py-2 px-4 rounded-lg hover:bg-teal-100 transition-colors text-sm"
        >
          {revealed === 0 ? 'Show first step' : 'Show next step'}
        </button>
      ) : (
        <div className="mt-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm font-medium flex items-center gap-2">
          <span>Final answer:</span>
          <MathDisplay latex={example.answer} />
        </div>
      )}
    </div>
  );
}

function TryIt({ lesson }: { lesson: CalculusLesson }) {
  const [question, setQuestion] = useState<CalculusQuestion | null>(null);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<boolean | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const draw = () => {
    setQuestion(lesson.tryIt());
    setAnswer('');
    setResult(null);
    setShowSolution(false);
  };

  const check = () => {
    if (!question) return;
    const ok = checkAnswer(
      'algebra',
      normalizeCalculusLatex(question.correctAnswer),
      normalizeCalculusLatex(answer),
    );
    setResult(ok);
    setShowSolution(!ok);
  };

  if (!question) {
    return (
      <button
        onClick={draw}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Try one yourself →
      </button>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-teal-200">
      <p className="text-sm uppercase tracking-wide font-semibold text-teal-700 mb-2">Your turn</p>
      <p className="text-slate-800 mb-3">{question.instructions}</p>
      <div className="text-xl text-center py-4 bg-slate-50 rounded-lg border border-slate-100 overflow-x-auto mb-4">
        <MathDisplay latex={question.prompt} block />
      </div>
      <MathInput key={question.id} value={answer} onChange={setAnswer} disabled={result === true} />
      {result !== null && (
        <div className={`mt-2 font-medium ${result ? 'text-green-600' : 'text-red-600'}`}>
          {result ? 'Correct!' : 'Not quite - see the worked solution below, then try another.'}
        </div>
      )}
      {showSolution && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-slate-700">
          <p className="mb-2 text-sm">
            Correct answer: <span className="font-mono font-bold">{question.correctAnswer}</span>
          </p>
          <div className="overflow-x-auto">
            <MathDisplay latex={question.solution} />
          </div>
        </div>
      )}
      <div className="flex justify-end gap-3 mt-4">
        {result !== true && (
          <button
            onClick={check}
            disabled={!answer}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            Check Answer
          </button>
        )}
        <button
          onClick={draw}
          className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Try another
        </button>
      </div>
    </div>
  );
}

export default function CalculusLearnPage() {
  const [lessonId, setLessonId] = useState<string | null>(null);
  const lesson = calculusLessons.find((l) => l.id === lessonId) ?? null;

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="max-w-2xl mx-auto py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Learn Calculus</h1>
            <Link href="/calculus" className="text-sm text-slate-500 hover:text-slate-800">← Back to practice</Link>
          </div>
          <p className="text-slate-600 mb-6">
            Pick a topic. Each lesson walks through worked examples one step at a time, then lets you try a question yourself.
          </p>
          <div className="grid gap-3">
            {calculusLessons.map((l, i) => (
              <button
                key={l.id}
                onClick={() => setLessonId(l.id)}
                className="text-left bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-teal-300 hover:shadow-md transition-all"
              >
                <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide">Lesson {i + 1}</span>
                <h2 className="font-bold text-slate-800">{l.title}</h2>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-slate-800">{lesson.title}</h1>
          <button onClick={() => setLessonId(null)} className="text-sm text-slate-500 hover:text-slate-800">
            ← All lessons
          </button>
        </div>
        <p className="text-slate-600 mb-6">{lesson.intro}</p>
        {lesson.examples.map((ex) => (
          <ExampleCard key={ex.id} example={ex} />
        ))}
        <div className="mt-6">
          <TryIt key={lesson.id} lesson={lesson} />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add the Learn link to the practice start screen**

In `app/calculus/page.tsx`, on the start screen (the `if (!started)` block), immediately AFTER the `{canResume && (...)}` block and BEFORE the `<div className="space-y-4 mb-6">`, add:

```tsx
          <Link
            href="/calculus/learn"
            className="block w-full mb-4 text-center bg-white border border-teal-300 text-teal-700 font-semibold py-3 px-6 rounded-lg hover:bg-teal-50 transition-colors"
          >
            📖 Learn the topics - worked examples, step by step
          </Link>
```

(`Link` is already imported in that file.)

- [ ] **Step 3: Type-check and lint**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no errors referencing `app/calculus/learn/page.tsx` or `app/calculus/page.tsx`.

Run: `npx eslint app/calculus/learn/page.tsx app/calculus/page.tsx`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add app/calculus/learn/page.tsx app/calculus/page.tsx
git commit -m "feat(calculus): add learn mode with step-by-step worked examples"
```

---

## Task 12: Learn-mode verification

**Files:** none created; verification only.

- [ ] **Step 1: Full suite, lint, build**

Run: `npm test` → 44 pass. `npm run lint` → no errors in calculus files. `npm run build` → succeeds, route list includes `/calculus/learn`.

- [ ] **Step 2: Browser smoke test**

With the dev server running:
1. `/calculus` start screen shows the "Learn the topics" link; clicking opens `/calculus/learn` with 10 lessons.
2. Open Lesson 1 (Power rule): intro renders, examples show prompt with steps hidden; "Show first step"/"Show next step" reveals steps one at a time with KaTeX math; after the last step the final answer chip appears.
3. "Try one yourself" draws a power-rule question; a correct typed answer (e.g. plain keyboard form) is marked Correct; "Try another" redraws.
4. Open a bank-backed lesson (e.g. Lesson 6 Implicit) and confirm the try-it question is an implicit-differentiation one.
5. "← All lessons" and "← Back to practice" navigation work.

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "chore(calculus): learn-mode verification fixes"
```

---

## Self-Review Notes

- **Spec coverage:** basic-rules generators (Task 2) ✓; implicit/higher-order bank ~30 (Task 3) ✓; partial bank ~30 (Task 4) ✓; applications bank ~30 (Task 5, added by amendment) ✓; new route `app/calculus/page.tsx` (Task 7) ✓; reuse of MathInput/MathDisplay/checkAnswer/progressTracker ✓; home card teal (Task 8) ✓; courseId `'calculus'` ✓; no `checkAnswer.ts` change ✓; integration out of scope ✓.
- **Answer-format risk:** documented as an accepted limitation matching the existing Math course; solution panel always reveals the expected string.
- **Type consistency:** `CalculusQuestion`/`CalculusQuestionCore`/`CalculusCategory` defined once in Task 1 and imported everywhere; `assembleQuiz`/`CalculusConfig` signatures consistent between Task 5 definition and Task 6 consumption.
- **Prime-character escaping:** Task 3 explicitly flags that `solution` strings containing `y'` must use backtick literals (or escaped quotes) - the most likely transcription bug.
