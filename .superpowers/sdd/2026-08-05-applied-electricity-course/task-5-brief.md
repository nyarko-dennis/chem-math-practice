## Task 5: Bank barrel + invariant test (`appliedElectricityQuestions.ts`)

**Files:**
- Create: `lib/appliedElectricityQuestions.ts`, `lib/appliedElectricityQuestions.test.ts`

**Interfaces:**
- Consumes: the 8 bank exports (Tasks 4a-4h), types (Task 1).
- Produces: `appliedElectricityQuestions: AppliedElectricityQuestion[]`; re-exports `AppliedElectricityTopic`, `AppliedElectricityQuestion`, `MCQuestion`, `TFQuestion`, `APPLIED_ELECTRICITY_TOPIC_LABELS`.

- [ ] **Step 1: Write the failing test**

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { appliedElectricityQuestions } from './appliedElectricityQuestions.ts';
import { APPLIED_ELECTRICITY_TOPIC_LABELS } from './appliedElectricityTypes.ts';

const topics = Object.keys(APPLIED_ELECTRICITY_TOPIC_LABELS);

test('240 total, 30 per topic', () => {
  assert.equal(appliedElectricityQuestions.length, 240);
  for (const t of topics) {
    assert.equal(appliedElectricityQuestions.filter((q) => q.topic === t).length, 30, `topic ${t}`);
  }
});

test('ids unique', () => {
  const ids = appliedElectricityQuestions.map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('MCQ well-formed; TF balanced 4/4 per topic', () => {
  for (const t of topics) {
    const items = appliedElectricityQuestions.filter((q) => q.topic === t);
    for (const q of items) {
      if (q.type === 'mcq') {
        assert.equal(q.choices.length, 4);
        assert.ok(q.correctIndex >= 0 && q.correctIndex < 4);
      }
    }
    const tf = items.filter((q) => q.type === 'tf');
    assert.equal(tf.filter((q) => q.type === 'tf' && q.correctAnswer === true).length, 4, `${t} true`);
    assert.equal(tf.filter((q) => q.type === 'tf' && q.correctAnswer === false).length, 4, `${t} false`);
  }
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test lib/appliedElectricityQuestions.test.ts`
Expected: FAIL (barrel not defined).

- [ ] **Step 3: Write the barrel** (mirror `lib/materialsQuestions.ts`): import the 8 arrays, spread them into `appliedElectricityQuestions`, re-export the types + labels.

- [ ] **Step 4: Run to verify it passes**

Run: `node --test lib/appliedElectricityQuestions.test.ts`
Expected: PASS. If a TF-balance assertion fails, fix the offending bank (flip a stem's truth value and its rationale), then re-run.

- [ ] **Step 5: Commit**

```bash
git add lib/appliedElectricityQuestions.ts lib/appliedElectricityQuestions.test.ts
git commit -m "feat(applied-electricity): question barrel + invariants (240)"
```

---

