import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { LeadershipQuestion, LeadershipTopic } from './leadershipTypes.ts';
import { LEADERSHIP_TOPIC_LABELS } from './leadershipTypes.ts';

// Shared per-bank invariants, called from each lib/ldBank<Topic>.test.ts.
// Enforces the authoring contract: exactly 30 items, sequential prefixed ids,
// well-formed MCQ/TF, a ~22/8 mix, all four correctIndex positions used, and a
// balanced 4-true / 4-false TF block.
export function runBankInvariants(
  questions: LeadershipQuestion[],
  prefix: string,
  topic: LeadershipTopic,
): void {
  test(`${topic} bank has exactly 30 items with sequential prefixed ids`, () => {
    assert.equal(questions.length, 30);
    questions.forEach((q, i) => {
      assert.equal(q.id, `${prefix}-${String(i + 1).padStart(3, '0')}`);
    });
  });

  test(`${topic} items are well-formed and correctly tagged`, () => {
    for (const q of questions) {
      assert.equal(q.topic, topic);
      assert.ok(q.topic in LEADERSHIP_TOPIC_LABELS);
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

  test(`${topic} mix ~22 MCQ / ~8 TF, all four correctIndex positions used, TF 4/4`, () => {
    const mcq = questions.filter((q) => q.type === 'mcq');
    const tf = questions.filter((q) => q.type === 'tf');
    assert.ok(mcq.length >= 20 && mcq.length <= 24, `mcq count ${mcq.length}`);
    assert.ok(tf.length >= 6 && tf.length <= 10, `tf count ${tf.length}`);
    const used = new Set(mcq.map((q) => (q.type === 'mcq' ? q.correctIndex : -1)));
    assert.equal(used.size, 4, 'all four correctIndex positions used');
    const trues = tf.filter((q) => q.type === 'tf' && q.correctAnswer).length;
    const falses = tf.filter((q) => q.type === 'tf' && !q.correctAnswer).length;
    assert.equal(trues, 4, `${trues} true`);
    assert.equal(falses, 4, `${falses} false`);
  });
}
