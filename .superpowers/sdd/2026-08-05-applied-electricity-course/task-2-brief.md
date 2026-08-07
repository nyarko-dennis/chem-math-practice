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

