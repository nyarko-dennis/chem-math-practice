## Task 7: Learn-mode lessons (`aeLessons.ts`)

**Files:**
- Create: `lib/aeLessons.ts`, `lib/aeLessons.test.ts`

**Interfaces:**
- Consumes: `AeGeneratedQuestion`, `AE_GENERATORS`, `randId` (Task 3); `AppliedElectricityTopic` (Task 1).
- Produces: `interface ExampleStep { explanation: string; latex: string }`, `interface WorkedExample { id; title; prompt; steps: ExampleStep[]; answer: string }`, `interface AeLesson { id: string; topic: AppliedElectricityTopic; title: string; intro: string; examples: WorkedExample[]; tryIt: () => AeGeneratedQuestion }`, `aeLessons: AeLesson[]`.

**Content:** one lesson per topic (8), mirroring `lib/calculusLessons.ts`: plain-language intro, >=1 worked example with step-by-step reveal, `tryIt` returns `AE_GENERATORS[topic]()`.

- [ ] **Step 1: Write the failing test**

```ts
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
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test lib/aeLessons.test.ts`
Expected: FAIL.

- [ ] **Step 3: Author lessons.** - [ ] **Step 4:** `node --test lib/aeLessons.test.ts` -> PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/aeLessons.ts lib/aeLessons.test.ts
git commit -m "feat(applied-electricity): Learn-mode lessons"
```

---

