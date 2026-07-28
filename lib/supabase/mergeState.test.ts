import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mergeState, type PracticeState } from './mergeState.ts';

const emptyStreak = { current: 0, longest: 0, lastDate: '' };

function state(partial: Partial<PracticeState>): PracticeState {
  return { version: 1, updatedAt: 0, courses: {}, streak: emptyStreak, ...partial };
}

function course(sessions: number, answered: number, correct: number, history: any[] = [], stats: any = { questions: {}, topics: {} }) {
  return {
    progress: { completedSessionsCount: sessions, totalQuestionsAnswered: answered, totalCorrectAnswers: correct, history },
    stats,
  };
}

test('fresh device: empty local + populated cloud -> cloud restored', () => {
  const local = state({ updatedAt: 0 });
  const cloud = state({
    updatedAt: 1000,
    courses: { math: course(3, 30, 24, [{ date: 'd1', type: 'math', correct: 8, total: 10 }], { questions: { q1: { box: 2 } }, topics: {} }) },
    streak: { current: 3, longest: 3, lastDate: '2026-07-20' },
  });
  const merged = mergeState(local, cloud);
  assert.deepEqual(merged.courses.math.progress, cloud.courses.math.progress);
  assert.deepEqual(merged.courses.math.stats, cloud.courses.math.stats);
  assert.equal(merged.streak.current, 3);
  assert.equal(merged.updatedAt, 1000);
});

test('sequential: local superset (newer, more sessions) wins counters and stats', () => {
  const local = state({ updatedAt: 2000, courses: { math: course(12, 120, 100, [], { questions: { q1: { box: 4 } }, topics: {} }) } });
  const cloud = state({ updatedAt: 1000, courses: { math: course(10, 100, 85, [], { questions: { q1: { box: 3 } }, topics: {} }) } });
  const merged = mergeState(local, cloud);
  assert.equal(merged.courses.math.progress.completedSessionsCount, 12);
  assert.equal(merged.courses.math.stats.questions.q1.box, 4);
});

test('conflict: local newer but fewer sessions -> counters from cloud, no double-count, history unioned', () => {
  const local = state({
    updatedAt: 3000,
    courses: { math: course(3, 30, 25, [{ date: 'dB', type: 'math', correct: 9, total: 10 }], { questions: { q9: { box: 2 } }, topics: {} }) },
  });
  const cloud = state({
    updatedAt: 1000,
    courses: { math: course(30, 300, 240, [{ date: 'dA', type: 'math', correct: 7, total: 10 }], { questions: { q1: { box: 5 } }, topics: {} }) },
  });
  const merged = mergeState(local, cloud);
  // counters come from the higher-session side (cloud), never summed
  assert.equal(merged.courses.math.progress.completedSessionsCount, 30);
  assert.equal(merged.courses.math.progress.totalQuestionsAnswered, 300);
  // history unions both devices' items
  assert.equal(merged.courses.math.progress.history.length, 2);
  // stats come from the newer snapshot (local)
  assert.deepEqual(merged.courses.math.stats.questions, { q9: { box: 2 } });
});

test('course union: each side has a course the other lacks', () => {
  const local = state({ updatedAt: 2000, courses: { math: course(2, 20, 18) } });
  const cloud = state({ updatedAt: 1000, courses: { nutrition: course(1, 10, 9) } });
  const merged = mergeState(local, cloud);
  assert.ok(merged.courses.math);
  assert.ok(merged.courses.nutrition);
});

test('streak: later lastDate wins, longest is the max', () => {
  const local = state({ updatedAt: 2000, streak: { current: 2, longest: 5, lastDate: '2026-07-25' } });
  const cloud = state({ updatedAt: 1000, streak: { current: 9, longest: 9, lastDate: '2026-07-28' } });
  const merged = mergeState(local, cloud);
  assert.equal(merged.streak.current, 9);
  assert.equal(merged.streak.lastDate, '2026-07-28');
  assert.equal(merged.streak.longest, 9);
});

test('history: identical items deduped and capped at 50', () => {
  const dup = { date: 'd', type: 'quick', correct: 1, total: 2 };
  const many = Array.from({ length: 40 }, (_, i) => ({ date: `d${i}`, type: 'quick', correct: 1, total: 2 }));
  const local = state({ updatedAt: 1, courses: { math: course(1, 2, 1, [dup, ...many]) } });
  const cloud = state({ updatedAt: 2, courses: { math: course(1, 2, 1, [dup, ...many]) } });
  const merged = mergeState(local, cloud);
  assert.equal(merged.courses.math.progress.history.length, 41); // dup + 40 unique, deduped
});

test('history: 120 distinct items (60 local + 60 cloud) truncated to 50', () => {
  const localHistory = Array.from({ length: 60 }, (_, i) => ({ date: `L${i}`, type: 'math', correct: 1, total: 2 }));
  const cloudHistory = Array.from({ length: 60 }, (_, i) => ({ date: `C${i}`, type: 'math', correct: 1, total: 2 }));
  const local = state({ updatedAt: 1, courses: { math: course(1, 2, 1, localHistory) } });
  const cloud = state({ updatedAt: 2, courses: { math: course(1, 2, 1, cloudHistory) } });
  const merged = mergeState(local, cloud);
  // 60 local + 60 cloud = 120 unique; truncated to 50 tail
  assert.equal(merged.courses.math.progress.history.length, 50);
  // tail of [...local, ...cloud] is C10..C59
  assert.equal(merged.courses.math.progress.history[0].date, 'C10');
  assert.equal(merged.courses.math.progress.history[49].date, 'C59');
});
