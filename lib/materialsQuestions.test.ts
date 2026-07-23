import { test } from 'node:test';
import assert from 'node:assert/strict';
import { materialsQuestions } from './materialsQuestions.ts';
import { MATERIALS_TOPIC_LABELS } from './materialsTypes.ts';

test('bank totals 240 questions, 30 per topic', () => {
  assert.equal(materialsQuestions.length, 240);
  for (const topic of Object.keys(MATERIALS_TOPIC_LABELS)) {
    const n = materialsQuestions.filter((q) => q.topic === topic).length;
    assert.equal(n, 30, `topic ${topic} has ${n}`);
  }
});

test('ids are globally unique', () => {
  const ids = materialsQuestions.map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('TF answers are roughly balanced within every topic', () => {
  for (const topic of Object.keys(MATERIALS_TOPIC_LABELS)) {
    const tf = materialsQuestions.filter((q) => q.topic === topic && q.type === 'tf');
    const trues = tf.filter((q) => q.type === 'tf' && q.correctAnswer).length;
    assert.ok(trues >= 3 && trues <= 5, `${topic}: ${trues} true of ${tf.length} TF`);
  }
});
