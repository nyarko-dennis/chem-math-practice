## Task 6: Rubric drills (`aeDrills.ts`)

**Files:**
- Create: `lib/aeDrills.ts`, `lib/aeDrills.test.ts`

**Interfaces:**
- Consumes: `AeDrill`, `AeDrillKind`, `RubricPoint`, `AppliedElectricityTopic` (Task 1).
- Produces: `aeDrills: AeDrill[]` (24 items, 3 per topic); re-export `AE_DRILL_LABELS`, `AeDrill`, `AeDrillKind`, `RubricPoint`.

**Content:** 3 drills per topic (24 total), 6-10 marks each; use each of the 5 `AeDrillKind`s at least twice across the set; rubric marks sum EXACTLY to `drill.marks`; modelAnswer 150-400 words, fully glossed. Ground in the deck extract; disclose standard-fact substitutions. Example angles: Thevenin derivation (`deriveEquivalent`, networkTheorems), analyse a series RLC for impedance and phase (`analyseCircuit`, acAnalysis), explain why a capacitor blocks DC (`explainConcept`, capacitors), compare star vs delta (`compare`, threePhase), compute total three-phase power step by step (`computeStepwise`, threePhase). id prefix `aedr-001`..`aedr-024`.

- [ ] **Step 1: Write the failing test**

```ts
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
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test lib/aeDrills.test.ts`
Expected: FAIL.

- [ ] **Step 3: Author the 24 drills** (mirror `lib/materialsDrills.ts` structure), satisfying every assertion.

- [ ] **Step 4: Run to verify it passes**

Run: `node --test lib/aeDrills.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/aeDrills.ts lib/aeDrills.test.ts
git commit -m "feat(applied-electricity): rubric drills (24)"
```

---

