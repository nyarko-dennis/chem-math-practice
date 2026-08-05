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
  // NOTE: brief literal was '4720', which is only ~0.43% off 4700 and would
  // pass a 1% default tolerance, contradicting its own ">1% off" comment and
  // the documented default in the brief's Design notes. Corrected to a value
  // that is actually >1% off, per the comment's own stated intent. See
  // task-2-report.md for details.
  assert.equal(checkAeAnswer('4800', exp), false); // >1% off, unitless still checked on value
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

// --- Additional edge-case coverage beyond the brief ---

test('parseScalar: negative values and bare number with no unit', () => {
  assert.deepEqual(parseScalar('-3.3'), { value: -3.3, unit: null });
  assert.deepEqual(parseScalar('-12 V'), { value: -12, unit: 'v' });
});

test('parseScalar: µ vs u prefix equivalence', () => {
  assert.deepEqual(parseScalar('2.2 µF'), { value: 2.2e-6, unit: 'f' });
  assert.deepEqual(parseScalar('2.2 uF'), { value: 2.2e-6, unit: 'f' });
});

test('parseScalar: K vs k prefix equivalence (both 1e3)', () => {
  assert.deepEqual(parseScalar('4.7 KΩ'), { value: 4700, unit: 'ohm' });
  assert.deepEqual(parseScalar('4.7 kΩ'), { value: 4700, unit: 'ohm' });
});

test('parseScalar: case-sensitive mega vs milli prefix', () => {
  assert.deepEqual(parseScalar('1M'), { value: 1e6, unit: null });
  assert.deepEqual(parseScalar('1m'), { value: 1e-3, unit: null });
  assert.deepEqual(parseScalar('1 MHz'), { value: 1e6, unit: 'hz' });
  assert.deepEqual(parseScalar('1 mHz'), { value: 1e-3, unit: 'hz' });
});

test('parseScalar: unit synonyms collapse to canonical dimension', () => {
  assert.deepEqual(parseScalar('12 volts'), { value: 12, unit: 'v' });
  assert.deepEqual(parseScalar('12 volt'), { value: 12, unit: 'v' });
  assert.deepEqual(parseScalar('2 amps'), { value: 2, unit: 'a' });
  assert.deepEqual(parseScalar('2 ampere'), { value: 2, unit: 'a' });
  assert.deepEqual(parseScalar('100 watts'), { value: 100, unit: 'w' });
  assert.deepEqual(parseScalar('5 sec'), { value: 5, unit: 's' });
  assert.deepEqual(parseScalar('5 seconds'), { value: 5, unit: 's' });
});

test('parseComplex: negative imaginary part (a-jb)', () => {
  assert.deepEqual(parseComplex('3-j4'), { re: 3, im: -4 });
});

test('parseComplex: bare imaginary jb and bj', () => {
  assert.deepEqual(parseComplex('j4'), { re: 0, im: 4 });
  assert.deepEqual(parseComplex('4j'), { re: 0, im: 4 });
  assert.deepEqual(parseComplex('-j4'), { re: 0, im: -4 });
});

test('parseComplex: bare real', () => {
  assert.deepEqual(parseComplex('7'), { re: 7, im: 0 });
});

test('parseComplex: polar with < and "angle" spellings, and trailing unit stripped', () => {
  const a = parseComplex('5<53.13');
  assert.ok(a && Math.abs(a.re - 3) < 1e-2 && Math.abs(a.im - 4) < 1e-2);
  const b = parseComplex('5 angle 53.13 deg');
  assert.ok(b && Math.abs(b.re - 3) < 1e-2 && Math.abs(b.im - 4) < 1e-2);
  const c = parseComplex('5∠53.13°');
  assert.ok(c && Math.abs(c.re - 3) < 1e-2 && Math.abs(c.im - 4) < 1e-2);
});

test('checkAeAnswer complex: tolerance boundary', () => {
  const exp: AnswerDescriptor = { kind: 'complex', re: 3, im: 4 }; // |exp| = 5
  // default tol 0.02 -> allowed distance 0.1
  assert.equal(checkAeAnswer('3.05+j4', exp), true);
  assert.equal(checkAeAnswer('3.2+j4', exp), false);
});

test('checkAeAnswer scalar: custom tolerance override', () => {
  const exp: AnswerDescriptor = { kind: 'scalar', value: 100, tol: 0.1 };
  assert.equal(checkAeAnswer('108', exp), true); // within 10%
  assert.equal(checkAeAnswer('115', exp), false); // outside 10%
});

test('checkAeAnswer: garbage input returns false, not throw', () => {
  const exp: AnswerDescriptor = { kind: 'scalar', value: 5 };
  assert.equal(checkAeAnswer('not a number', exp), false);
  const expC: AnswerDescriptor = { kind: 'complex', re: 1, im: 1 };
  assert.equal(checkAeAnswer('garbage', expC), false);
});
