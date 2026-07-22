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
