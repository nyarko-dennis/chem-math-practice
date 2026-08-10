import { test } from 'node:test';
import assert from 'node:assert/strict';
import { leadershipDrills } from './leadershipDrills.ts';
import { LEADERSHIP_TOPIC_LABELS, LEADERSHIP_DRILL_LABELS } from './leadershipTypes.ts';

test('24 drills, 3 per topic, sequential ids', () => {
  assert.equal(leadershipDrills.length, 24);
  leadershipDrills.forEach((d, i) => {
    assert.equal(d.id, `lddr-${String(i + 1).padStart(3, '0')}`);
  });
  for (const topic of Object.keys(LEADERSHIP_TOPIC_LABELS)) {
    assert.equal(leadershipDrills.filter((d) => d.topic === topic).length, 3, topic);
  }
});

test('every drill is well-formed; rubric marks sum to total; marks in 6..10', () => {
  for (const d of leadershipDrills) {
    assert.equal(d.type, 'drill');
    assert.ok(d.drillKind in LEADERSHIP_DRILL_LABELS);
    assert.ok(d.prompt.length > 20);
    assert.ok(d.marks >= 6 && d.marks <= 10, `${d.id} marks ${d.marks}`);
    assert.ok(d.rubric.length >= 3);
    const sum = d.rubric.reduce((s, r) => s + r.marks, 0);
    assert.equal(sum, d.marks, `${d.id} rubric sums ${sum} != ${d.marks}`);
    const rids = d.rubric.map((r) => r.id);
    assert.equal(new Set(rids).size, rids.length);
  }
});

test('every drill kind is used at least twice across the set', () => {
  for (const kind of Object.keys(LEADERSHIP_DRILL_LABELS)) {
    assert.ok(leadershipDrills.filter((d) => d.drillKind === kind).length >= 2, kind);
  }
});

test('model answers run 150-400 words and are fully populated', () => {
  for (const d of leadershipDrills) {
    const words = d.modelAnswer.trim().split(/\s+/).length;
    assert.ok(words >= 150 && words <= 400, `${d.id} words ${words}`);
  }
});
