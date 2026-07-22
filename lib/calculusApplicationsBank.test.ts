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
