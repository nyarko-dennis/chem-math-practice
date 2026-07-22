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
