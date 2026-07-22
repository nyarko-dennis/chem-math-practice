import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mechanicalTestingQuestions } from './materialsBankMechanical.ts';
import { MATERIALS_TOPIC_LABELS } from './materialsTypes.ts';

test('bank has exactly 30 items with sequential prefixed ids', () => {
  assert.equal(mechanicalTestingQuestions.length, 30);
  mechanicalTestingQuestions.forEach((q, i) => {
    assert.equal(q.id, `mt-${String(i + 1).padStart(3, '0')}`);
  });
});

test('every item is well-formed and correctly tagged', () => {
  for (const q of mechanicalTestingQuestions) {
    assert.equal(q.topic, 'mechanicalTesting');
    assert.ok(q.topic in MATERIALS_TOPIC_LABELS);
    assert.ok(q.prompt.length > 10);
    assert.ok(q.rationale.length > 20);
    if (q.type === 'mcq') {
      assert.equal(q.choices.length, 4);
      assert.ok(q.correctIndex >= 0 && q.correctIndex <= 3);
      assert.equal(new Set(q.choices).size, 4);
    } else {
      assert.equal(q.type, 'tf');
      assert.equal(typeof q.correctAnswer, 'boolean');
    }
  }
});

test('mix is roughly 22 MCQ / 8 TF and correctIndex varies', () => {
  const mcq = mechanicalTestingQuestions.filter((q) => q.type === 'mcq');
  const tf = mechanicalTestingQuestions.filter((q) => q.type === 'tf');
  assert.ok(mcq.length >= 20 && mcq.length <= 24, `mcq count ${mcq.length}`);
  assert.ok(tf.length >= 6 && tf.length <= 10, `tf count ${tf.length}`);
  const used = new Set(mcq.map((q) => (q.type === 'mcq' ? q.correctIndex : -1)));
  assert.equal(used.size, 4, 'all four correctIndex positions used');
});
