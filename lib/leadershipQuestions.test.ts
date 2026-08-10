import { test } from 'node:test';
import assert from 'node:assert/strict';
import { leadershipQuestions } from './leadershipQuestions.ts';
import { LEADERSHIP_TOPIC_LABELS } from './leadershipTypes.ts';

test('bank totals 240 questions, 30 per topic', () => {
  assert.equal(leadershipQuestions.length, 240);
  for (const topic of Object.keys(LEADERSHIP_TOPIC_LABELS)) {
    const n = leadershipQuestions.filter((q) => q.topic === topic).length;
    assert.equal(n, 30, `topic ${topic} has ${n}`);
  }
});

test('ids are globally unique', () => {
  const ids = leadershipQuestions.map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('every question has a known topic', () => {
  for (const q of leadershipQuestions) {
    assert.ok(q.topic in LEADERSHIP_TOPIC_LABELS, `unknown topic ${q.topic}`);
  }
});

test('TF answers are exactly balanced 4 true / 4 false within every topic', () => {
  for (const topic of Object.keys(LEADERSHIP_TOPIC_LABELS)) {
    const tf = leadershipQuestions.filter((q) => q.topic === topic && q.type === 'tf');
    const trues = tf.filter((q) => q.type === 'tf' && q.correctAnswer).length;
    const falses = tf.filter((q) => q.type === 'tf' && !q.correctAnswer).length;
    assert.equal(trues, 4, `${topic}: ${trues} true`);
    assert.equal(falses, 4, `${topic}: ${falses} false`);
  }
});
