import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkAnswer, sigFigCount, parseToNumber } from './checkAnswer.ts';
import { areEquivalent } from './mathEquivalence.ts';

test('algebra accepts equivalent rearrangements', () => {
  // ax + by = c, solve for x  ->  (c - by)/a
  const expected = '\\frac{c-by}{a}';
  assert.ok(checkAnswer('algebra', expected, '\\frac{c-by}{a}'));
  assert.ok(checkAnswer('algebra', expected, '\\frac{c-b\\cdot y}{a}'));
  assert.ok(checkAnswer('algebra', expected, '(c-by)/a'));
  assert.ok(checkAnswer('algebra', expected, '\\frac{-by+c}{a}'));
  assert.ok(checkAnswer('algebra', expected, 'c/a - b y / a'));
});

test('algebra rejects non-equivalent answers', () => {
  const expected = '\\frac{c-by}{a}';
  assert.equal(checkAnswer('algebra', expected, '\\frac{c+by}{a}'), false);
  assert.equal(checkAnswer('algebra', expected, '\\frac{c-by}{b}'), false);
  assert.equal(checkAnswer('algebra', expected, 'garbage$$'), false);
});

test('areEquivalent handles y = mx + b rearrangement', () => {
  assert.ok(areEquivalent('\\frac{y-b}{m}', '(y-b)/m'));
  assert.ok(areEquivalent('\\frac{a}{y}', 'a/y'));
});

test('sigFigCount follows chemistry rules', () => {
  assert.equal(sigFigCount('4.0'), 2);
  assert.equal(sigFigCount('4'), 1);
  assert.equal(sigFigCount('4.00'), 3);
  assert.equal(sigFigCount('120'), 2); // trailing zero, no decimal -> not significant
  assert.equal(sigFigCount('0.0043'), 2);
  assert.equal(sigFigCount('1.20'), 3);
  assert.equal(sigFigCount('1.2e2'), 2);
});

test('sigfigs counting question compares the integer count', () => {
  assert.ok(checkAnswer('sigfigs', '3', '3'));
  assert.equal(checkAnswer('sigfigs', '3', '2'), false);
});

test('sigfigs calculation requires correct value AND displayed precision', () => {
  // target 2 sig figs, value 4.0
  assert.ok(checkAnswer('sigfigs', '4.0', '4.0'));
  assert.equal(checkAnswer('sigfigs', '4.0', '4'), false, 'too few sig figs');
  assert.equal(checkAnswer('sigfigs', '4.0', '4.00'), false, 'too many sig figs');
  assert.equal(checkAnswer('sigfigs', '4.0', '3.9'), false, 'wrong value');
  // exponential expected form should accept the plain form with same sig figs
  assert.ok(checkAnswer('sigfigs', '1.2e+2', '120'));
});

test('numeric types keep tolerance behavior', () => {
  assert.ok(checkAnswer('density', '7.87', '7.87'));
  assert.ok(checkAnswer('gasLaws', '1.00', '1.001'));
  assert.equal(checkAnswer('stoichiometry', '18.02', '25'), false);
});

test('parseToNumber handles latex fractions and scientific notation', () => {
  assert.equal(parseToNumber('\\frac{1}{2}'), 0.5);
  assert.equal(parseToNumber('1.2 \\times 10^{3}'), 1200);
  assert.equal(parseToNumber('42'), 42);
});
