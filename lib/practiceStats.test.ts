import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  applyResult,
  questionWeight,
  weightedSample,
  selectSpaced,
  weightedTypePick,
  emptyStats,
  MAX_BOX,
  type CoursePracticeStats,
} from './practiceStats.ts';

const DAY = 24 * 60 * 60 * 1000;

test('applyResult promotes box on correct and resets to 1 on wrong', () => {
  const now = 1_000_000;
  let s = applyResult(undefined, true, now);
  assert.equal(s.box, 2);
  assert.equal(s.seen, 1);
  assert.equal(s.correct, 1);
  assert.equal(s.dueAt, now + 1 * DAY);

  s = applyResult(s, true, now);
  assert.equal(s.box, 3);

  s = applyResult(s, false, now);
  assert.equal(s.box, 1, 'wrong answer drops to box 1');
  assert.equal(s.dueAt, now, 'box 1 is due immediately');
  assert.equal(s.lastCorrect, false);
});

test('box never exceeds MAX_BOX', () => {
  const now = 0;
  let s = applyResult(undefined, true, now);
  for (let i = 0; i < 20; i++) s = applyResult(s, true, now);
  assert.equal(s.box, MAX_BOX);
});

test('questionWeight ranks wrong > new > mastered', () => {
  const now = 10 * DAY;
  const unseen = questionWeight(undefined, now);
  const wrong = questionWeight(applyResult(undefined, false, now), now);
  const mastered = questionWeight({ box: 5, seen: 5, correct: 5, lastSeen: now, dueAt: now + 16 * DAY, lastCorrect: true }, now);
  assert.ok(wrong > unseen, 'recently wrong outranks new');
  assert.ok(unseen > mastered, 'new outranks mastered/not-due');
});

test('weightedSample is without replacement and respects count', () => {
  const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
  const picked = weightedSample(items, () => 1, 2, () => 0.5);
  assert.equal(picked.length, 2);
  assert.equal(new Set(picked.map((p) => p.id)).size, 2, 'no duplicates');
});

test('weightedSample returns all when count exceeds pool', () => {
  const items = [{ id: 'a' }, { id: 'b' }];
  const picked = weightedSample(items, () => 0, 10, () => 0.99);
  assert.equal(picked.length, 2);
});

test('selectSpaced favors due/wrong questions over mastered ones', () => {
  const now = 30 * DAY;
  const stats: CoursePracticeStats = emptyStats();
  // q1 answered wrong (due, box1). q2 mastered and not due.
  stats.questions['q1'] = applyResult(undefined, false, now);
  stats.questions['q2'] = { box: 5, seen: 5, correct: 5, lastSeen: now, dueAt: now + 16 * DAY, lastCorrect: true };
  const pool = [{ id: 'q1' }, { id: 'q2' }, { id: 'q3' }];

  const counts: Record<string, number> = { q1: 0, q2: 0, q3: 0 };
  for (let i = 0; i < 300; i++) {
    const rng = () => (i % 10) / 10 + 0.001;
    const chosen = selectSpaced(pool, stats, 1, now, rng);
    counts[chosen[0].id]++;
  }
  assert.ok(counts['q1'] > counts['q2'], `q1(${counts['q1']}) should beat mastered q2(${counts['q2']})`);
});

test('weightedTypePick explores unseen and favors weak types', () => {
  const stats: CoursePracticeStats = emptyStats();
  stats.topics['strong'] = { seen: 20, correct: 20 }; // 100%
  stats.topics['weak'] = { seen: 20, correct: 4 }; // 20%
  const keys = ['strong', 'weak', 'fresh'];
  const tally: Record<string, number> = { strong: 0, weak: 0, fresh: 0 };
  for (let i = 0; i < 2000; i++) {
    tally[weightedTypePick(keys, stats, Math.random)]++;
  }
  assert.ok(tally['weak'] > tally['strong'], 'weak type appears more than strong');
  assert.ok(tally['fresh'] > tally['strong'], 'unseen type is explored more than mastered');
});
