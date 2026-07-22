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

test('buildChainRule collapses exponent 1 to no exponent notation', () => {
  // f = (2x+3)^{2} -> f' = 2*2*(2x+3)^{1} = 4(2x+3)
  const q = buildChainRule({ a: 2, b: 3, n: 2 });
  assert.equal(q.correctAnswer, '4(2x+3)');
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
