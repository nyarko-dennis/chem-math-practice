import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aeLessons } from './aeLessons.ts';
import { APPLIED_ELECTRICITY_TOPIC_LABELS } from './appliedElectricityTypes.ts';

test('one lesson per topic; each has intro, an example with steps, and a working tryIt', () => {
  const topics = Object.keys(APPLIED_ELECTRICITY_TOPIC_LABELS);
  assert.equal(aeLessons.length, topics.length);
  for (const l of aeLessons) {
    assert.ok(l.intro.length > 0);
    assert.ok(l.examples.length >= 1 && l.examples[0].steps.length >= 1);
    const q = l.tryIt();
    assert.equal(q.category, l.topic);
  }
});

test('lessons cover every topic exactly once', () => {
  const topics = Object.keys(APPLIED_ELECTRICITY_TOPIC_LABELS);
  const lessonTopics = aeLessons.map((l) => l.topic).sort();
  assert.deepEqual(lessonTopics, [...topics].sort());
});

test('lesson and example ids are unique', () => {
  const ids = aeLessons.map((l) => l.id);
  assert.equal(new Set(ids).size, ids.length);
  const exampleIds = aeLessons.flatMap((l) => l.examples.map((e) => e.id));
  assert.equal(new Set(exampleIds).size, exampleIds.length);
});
