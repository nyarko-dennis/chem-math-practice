import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assembleQuiz } from './calculusQuestions.ts';

test('returns exactly `count` questions', () => {
  const qs = assembleQuiz({ basicRules: true, implicitHigherOrder: true, partial: true, applications: true, count: 12 });
  assert.equal(qs.length, 12);
});

test('respects category selection - basicRules only', () => {
  const qs = assembleQuiz({ basicRules: true, implicitHigherOrder: false, partial: false, applications: false, count: 20 });
  assert.ok(qs.every((q) => q.category === 'basicRules'));
});

test('respects category selection - partial only', () => {
  const qs = assembleQuiz({ basicRules: false, implicitHigherOrder: false, partial: true, applications: false, count: 15 });
  assert.ok(qs.every((q) => q.category === 'partial'));
});

test('respects category selection - applications only', () => {
  const qs = assembleQuiz({ basicRules: false, implicitHigherOrder: false, partial: false, applications: true, count: 15 });
  assert.ok(qs.every((q) => q.category === 'applications'));
});

test('assigns a unique id to every drawn question', () => {
  const qs = assembleQuiz({ basicRules: false, implicitHigherOrder: true, partial: false, applications: false, count: 40 });
  const ids = qs.map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('returns empty array when no categories selected', () => {
  const qs = assembleQuiz({ basicRules: false, implicitHigherOrder: false, partial: false, applications: false, count: 10 });
  assert.equal(qs.length, 0);
});
