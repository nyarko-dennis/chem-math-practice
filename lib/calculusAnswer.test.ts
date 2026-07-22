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

test('fractions pass through consistently', () => {
  assert.equal(normalizeCalculusLatex('-\\frac{x}{y}'), '-\\frac{x}{y}');
});
