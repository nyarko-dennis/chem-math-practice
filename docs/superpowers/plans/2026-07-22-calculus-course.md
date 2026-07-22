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

## Self-Review Notes

- **Spec coverage:** basic-rules generators (Task 2) ✓; implicit/higher-order bank ~30 (Task 3) ✓; partial bank ~30 (Task 4) ✓; applications bank ~30 (Task 5, added by amendment) ✓; new route `app/calculus/page.tsx` (Task 7) ✓; reuse of MathInput/MathDisplay/checkAnswer/progressTracker ✓; home card teal (Task 8) ✓; courseId `'calculus'` ✓; no `checkAnswer.ts` change ✓; integration out of scope ✓.
- **Answer-format risk:** documented as an accepted limitation matching the existing Math course; solution panel always reveals the expected string.
- **Type consistency:** `CalculusQuestion`/`CalculusQuestionCore`/`CalculusCategory` defined once in Task 1 and imported everywhere; `assembleQuiz`/`CalculusConfig` signatures consistent between Task 5 definition and Task 6 consumption.
- **Prime-character escaping:** Task 3 explicitly flags that `solution` strings containing `y'` must use backtick literals (or escaped quotes) - the most likely transcription bug.
