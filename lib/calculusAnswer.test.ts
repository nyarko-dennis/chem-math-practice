import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeCalculusLatex } from './calculusAnswer.ts';

test('command-form and plain trig compare equal after normalization', () => {
  assert.equal(normalizeCalculusLatex('-63\\sin(9x)'), normalizeCalculusLatex('-63sin(9x)'));
});

test('braced and unbraced single-char exponents compare equal', () => {
  assert.equal(normalizeCalculusLatex('6x^{2}+10x-4'), normalizeCalculusLatex('6x^2+10x-4'));
});

test('pi command and plain pi compare equal', () => {
  assert.equal(normalizeCalculusLatex('6\\pi'), normalizeCalculusLatex('6pi'));
});

test('multi-char exponents keep their braces', () => {
  assert.equal(normalizeCalculusLatex('x^{12}'), 'x^{12}');
});

test('does not mangle words containing function names', () => {
  // \sinh must not become sinh via the sin rule (negative lookahead guards it)
  assert.equal(normalizeCalculusLatex('\\sinh(x)'), '\\sinh(x)');
});

test('fractions normalize deterministically', () => {
  assert.equal(normalizeCalculusLatex('-\\frac{x}{y}'), '-x/y');
});

test('frac and slash forms compare equal - quotient rule shape', () => {
  assert.equal(normalizeCalculusLatex('\\frac{-30}{(9x+2)^{2}}'), normalizeCalculusLatex('-30/(9x+2)^2'));
});

test('frac and slash forms compare equal - simple implicit shape', () => {
  assert.equal(normalizeCalculusLatex('-\\frac{x}{y}'), normalizeCalculusLatex('-x/y'));
});

test('multi-term numerator and denominator get parens when flattened', () => {
  assert.equal(normalizeCalculusLatex('-\\frac{2x+y}{x+2y}'), normalizeCalculusLatex('-(2x+y)/(x+2y)'));
});

test('frac with function operands flattens and matches plain typed form', () => {
  assert.equal(normalizeCalculusLatex('\\frac{1}{\\cos(y)}'), normalizeCalculusLatex('1/cos(y)'));
});

test('frac with sum denominator matches natural typed parens', () => {
  assert.equal(normalizeCalculusLatex('\\frac{2x}{x^{2}+y^{2}}'), normalizeCalculusLatex('2x/(x^2+y^2)'));
});

test('left-right sizing is stripped before flattening', () => {
  assert.equal(normalizeCalculusLatex('\\frac{-30}{\\left(9x+2\\right)^{2}}'), normalizeCalculusLatex('-30/(9x+2)^2'));
});
