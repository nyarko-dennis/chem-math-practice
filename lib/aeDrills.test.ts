import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aeDrills } from './aeDrills.ts';
import { APPLIED_ELECTRICITY_TOPIC_LABELS, AE_DRILL_LABELS } from './appliedElectricityTypes.ts';

test('24 drills, 3 per topic', () => {
  assert.equal(aeDrills.length, 24);
  for (const t of Object.keys(APPLIED_ELECTRICITY_TOPIC_LABELS)) {
    assert.equal(aeDrills.filter((d) => d.topic === t).length, 3, `topic ${t}`);
  }
});

test('rubric marks sum to drill.marks; marks in 6..10', () => {
  for (const d of aeDrills) {
    assert.ok(d.marks >= 6 && d.marks <= 10, `${d.id} marks ${d.marks}`);
    assert.equal(d.rubric.reduce((s, r) => s + r.marks, 0), d.marks, `${d.id} rubric sum`);
  }
});

test('each drill kind used at least twice', () => {
  for (const kind of Object.keys(AE_DRILL_LABELS)) {
    assert.ok(aeDrills.filter((d) => d.drillKind === kind).length >= 2, `kind ${kind}`);
  }
});

test('ids unique; modelAnswer length bounds', () => {
  const ids = aeDrills.map((d) => d.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const d of aeDrills) {
    const words = d.modelAnswer.trim().split(/\s+/).length;
    assert.ok(words >= 150 && words <= 400, `${d.id} words ${words}`);
  }
});
