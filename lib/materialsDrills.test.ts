import { test } from 'node:test';
import assert from 'node:assert/strict';
import { materialsDrills } from './materialsDrills.ts';
import { MATERIALS_TOPIC_LABELS, MATERIALS_DRILL_LABELS } from './materialsTypes.ts';

test('24 drills, 3 per topic, sequential ids', () => {
  assert.equal(materialsDrills.length, 24);
  materialsDrills.forEach((d, i) => {
    assert.equal(d.id, `mdr-${String(i + 1).padStart(3, '0')}`);
  });
  for (const topic of Object.keys(MATERIALS_TOPIC_LABELS)) {
    assert.equal(materialsDrills.filter((d) => d.topic === topic).length, 3, topic);
  }
});

test('every drill is well-formed and rubric marks sum to total', () => {
  for (const d of materialsDrills) {
    assert.equal(d.type, 'drill');
    assert.ok(d.drillKind in MATERIALS_DRILL_LABELS);
    assert.ok(d.prompt.length > 20);
    assert.ok(d.modelAnswer.length > 100);
    assert.ok(d.rubric.length >= 3);
    const sum = d.rubric.reduce((s, r) => s + r.marks, 0);
    assert.equal(sum, d.marks, `${d.id} rubric sums ${sum} != ${d.marks}`);
    const rids = d.rubric.map((r) => r.id);
    assert.equal(new Set(rids).size, rids.length);
  }
});

test('every drill kind is used at least twice across the set', () => {
  for (const kind of Object.keys(MATERIALS_DRILL_LABELS)) {
    assert.ok(materialsDrills.filter((d) => d.drillKind === kind).length >= 2, kind);
  }
});
