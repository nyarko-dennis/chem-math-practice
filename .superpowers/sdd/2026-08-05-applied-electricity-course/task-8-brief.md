## Task 8: Practice page (`app/applied-electricity/page.tsx`)

**Files:**
- Create: `app/applied-electricity/page.tsx`

**Interfaces:**
- Consumes: `AE_GENERATORS`, `AeGeneratedQuestion` (Task 3); `checkAeAnswer` (Task 2); `appliedElectricityQuestions`, `APPLIED_ELECTRICITY_TOPIC_LABELS` (Task 5); `aeDrills`, `AE_DRILL_LABELS` (Task 6); `pickSpacedQuestions`, `pickWeightedType`, `recordAttempt` from `@/lib/practiceStats`; `saveCourseProgress`, `saveActiveSession`, `getActiveSession`, `clearActiveSession` from `@/lib/progressTracker`; `Difficulty` from `@/lib/generators`; `MathDisplay` and `ReviewList` from `@/components/...`.

**Behaviour (adapt `app/calculus/page.tsx` for quick/generated + curated mix, and `app/surgery/page.tsx` for the drill self-marking mode):**
- `'use client'`. `courseId = 'applied-electricity'`. Add `// eslint-disable-line react-hooks/set-state-in-effect` on the `setMounted(true)` line (repo convention).
- **Config screen:** pick mode - **Practice** (generated + curated) or **Drill** (subjective). Practice mode: topic checkboxes (all 8) + a difficulty selector (`easy|medium|hard`) for generated content + question count.
- **Practice loop (one at a time):** build the session by, for each slot, choosing a topic via `pickWeightedType(courseId, selectedTopics)`, then either generating (`AE_GENERATORS[topic](difficulty)`) or drawing a curated item for that topic via `pickSpacedQuestions(courseId, poolForTopic, 1)` (pass the FULL topic pool). Roughly half generated / half curated, but always generate when a topic has no curated pool left.
  - Generated item: render `prompt` with `MathDisplay`; answer via a plain text `<input>`; check with `checkAeAnswer(userInput, q.answer)`; on check show correct/incorrect + `q.answerDisplay` + `q.solution`. `recordAttempt(courseId, { topicKey: q.category, correct })` (NO questionId).
  - Curated MCQ/TF: buttons; instant feedback + `rationale`. `recordAttempt(courseId, { questionId: q.id, topicKey: q.topic, correct })`.
  - Record the FIRST attempt if you allow retry-before-solution.
- **Drill mode:** mirror `app/surgery/page.tsx` - show `prompt`, reveal `rubric` checkboxes, score = sum of ticked marks; `recordAttempt(courseId, { questionId: drill.id, topicKey: drill.topic, correct: score >= drill.marks/2 })`.
- **Resume:** persist in-progress state via `saveActiveSession`/`getActiveSession`/`clearActiveSession`.
- **Finish:** call `saveCourseProgress(courseId, { type: mode, correct, total })`, then render `ReviewList` of missed items (it supports plain text + LaTeX).

- [ ] **Step 1:** Build the config screen + Practice loop (generated path first, then curated path), wiring the selection + `recordAttempt` calls above.
- [ ] **Step 2:** Add Drill mode (self-marking) adapted from the Surgery page.
- [ ] **Step 3:** Add resume + finish (`saveCourseProgress` + `ReviewList`).
- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: compiles; `/applied-electricity` in the route list.

- [ ] **Step 5: Commit**

```bash
git add app/applied-electricity/page.tsx
git commit -m "feat(applied-electricity): practice page (generated + curated + drills)"
```

---

