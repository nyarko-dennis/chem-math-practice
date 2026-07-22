import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculusLessons } from './calculusLessons.ts';

test('there are 10 lessons with unique ids', () => {
  assert.equal(calculusLessons.length, 10);
  const ids = calculusLessons.map((l) => l.id);
  assert.equal(new Set(ids).size, 10);
});

test('every lesson is well-formed', () => {
  for (const l of calculusLessons) {
    assert.ok(l.title && l.intro);
    assert.ok(l.examples.length >= 2, `${l.id} needs >=2 examples`);
    for (const ex of l.examples) {
      assert.ok(ex.id && ex.title && ex.prompt && ex.answer);
      assert.ok(ex.steps.length >= 2, `${ex.id} needs >=2 steps`);
      for (const s of ex.steps) assert.ok(s.explanation && s.latex);
    }
  }
});

test('example ids are globally unique', () => {
  const ids = calculusLessons.flatMap((l) => l.examples.map((e) => e.id));
  assert.equal(new Set(ids).size, ids.length);
});

test('tryIt draws a matching question for every lesson', () => {
  const expectCategory: Record<string, string> = {
    'lesson-01': 'basicRules', 'lesson-02': 'basicRules', 'lesson-03': 'basicRules',
    'lesson-04': 'basicRules', 'lesson-05': 'basicRules',
    'lesson-06': 'implicitHigherOrder', 'lesson-07': 'implicitHigherOrder',
    'lesson-08': 'implicitHigherOrder',
    'lesson-09': 'partial', 'lesson-10': 'applications',
  };
  for (const l of calculusLessons) {
    for (let i = 0; i < 5; i++) {
      const q = l.tryIt();
      assert.equal(q.category, expectCategory[l.id], `${l.id} drew wrong category`);
      assert.ok(q.prompt && q.correctAnswer && q.solution);
    }
  }
});

test('bank-backed lessons draw from the right subtopic slice', () => {
  const byId = Object.fromEntries(calculusLessons.map((l) => [l.id, l]));
  // implicit: source ids ih-01..ih-12; higher-order: ih-13..ih-24; parametric: ih-25..ih-30.
  // tryIt re-ids drawn questions, so check the prompt appears in the right slice instead.
  for (let i = 0; i < 10; i++) {
    assert.match(byId['lesson-06'].tryIt().instructions, /implicit/i);
    assert.match(byId['lesson-07'].tryIt().instructions, /second|third/i);
    assert.match(byId['lesson-08'].tryIt().instructions, /parametric/i);
  }
});

test('spot-check example math', () => {
  const allExamples = Object.fromEntries(
    calculusLessons.flatMap((l) => l.examples.map((e) => [e.id, e]))
  );
  assert.equal(allExamples['ex-power-1'].answer, '15x^{2}');
  assert.equal(allExamples['ex-quot-1'].answer, '\\frac{-30}{(9x+2)^{2}}');
  assert.equal(allExamples['ex-chain-1'].answer, '6(2x+9)^{2}');
  assert.equal(allExamples['ex-impl-1'].answer, '-\\frac{x}{y}');
});
