# Calculus Course - Design Spec

## Context

The user is an electrical engineering student (Robotics & Automation Engineering,
Level 100, Pentecost University). Their 2nd-semester timetable (see
`electrical-engineering/WhatsApp Image 2026-07-21 at 23.40.34.jpeg`) lists 13
courses; "Numerical Methods" (PENG108) has since been replaced with "Calculus".
This is the first of 8 planned course modules to add to this test-generator app
(the others - Engineering Materials, Renewable Energy System, Applied
Electricity, Introduction to Environmental Studies, Leadership Development &
Society, French II, Introduction to African Studies - will each get their own
design/plan/build cycle later).

The student has only covered **differentiation and partial differentiation**
so far in the actual course; integration has not been taught yet and is
explicitly out of scope for this build.

### Source material findings

Four files in `electrical-engineering/` looked calculus-relevant but none are
usable as direct source content:

- `EBS301 CALCULUS - Units 1 and 2.pdf` - unrelated. It's a B.Ed Primary/JHS
  teacher-training module (Ghana Cares programme, coordinator Dr. Samuel M.
  Naandam), a different institution and audience entirely.
- `calculus solution.pdf` - a pirated solutions manual for Stewart's
  *Calculus: Early Transcendentals* (8th ed.), watermarked "NOT FOR SALE" with
  ad links. Copyrighted; also starts at limits/tangent lines, not the
  differentiation/partial-differentiation scope needed.
- `Calculus, 7th Edition ( PDFDrive ) (1).pdf` - the Stewart textbook itself
  (copyrighted).
- `engineering-mathematics.pdf` - John Bird's *Engineering Mathematics* (5th
  ed.), also a copyrighted commercial textbook.

**Decision:** question content will be original, written to standard
first-year differentiation/partial-differentiation curriculum, the same way
the existing Surgery and Pharmacology question banks in this repo were
originally written rather than copied from a source text.

## Scope

Four content categories, matching what the student has actually covered:

1. **Basic rules & standard derivatives** - power, product, quotient, and
   chain rule; derivatives of trig, exponential, and log functions.
2. **Implicit & higher-order differentiation** - implicit differentiation,
   2nd/3rd derivatives, parametric differentiation.
3. **Partial differentiation** - first/second-order partial derivatives,
   mixed partials, multivariable chain rule.
4. **Applications of differentiation** - tangent/normal lines, stationary
   points and max/min, rates of change and kinematics. (Added by amendment
   2026-07-22: the official Level 100 EEE syllabus PDF
   `Level100_EEE_Second_Semester_Courses_and_Topics.pdf` lists
   "Applications" as a taught differentiation topic.)

Explicitly out of scope: integration, applications of integration,
differential equations, and infinite series - these appear in the official
syllabus but have not been taught yet.

## Architecture

Follows the existing per-course pattern in this repo (see `app/surgery/`,
`app/math/`, `lib/surgeryQuestions.ts`, `lib/generators.ts`):

- New route: `app/calculus/page.tsx`
- New lib file: `lib/calculusQuestions.ts`
- Reuses existing shared infrastructure unchanged:
  - `components/MathInput.tsx` / `components/MathDisplay.tsx` for LaTeX
    input/rendering
  - `lib/checkAnswer.ts` - no changes needed; calculus answers fall through
    to the existing algebra-type path (LaTeX normalization + string
    comparison)
  - `lib/progressTracker.ts` - new courseId `'calculus'`, used the same way
    `app/surgery/page.tsx` uses it (active-session resume + completed-session
    stats)
- `app/page.tsx` gets a new course card for `calculus` (new accent color -
  teal/cyan, since blue/emerald/violet/indigo/rose/amber are already used by
  other courses)

## Data model

```typescript
export type CalculusCategory = 'basicRules' | 'implicitHigherOrder' | 'partial' | 'applications';

export interface CalculusQuestion {
  id: string;
  category: CalculusCategory;
  source: 'generated' | 'static';
  instructions: string;
  prompt: string;        // LaTeX
  correctAnswer: string; // LaTeX, canonical form
  solution: string;      // LaTeX, step-by-step
}
```

### Basic rules (algorithmic generation)

Five generator functions, mirroring the style of `lib/generators.ts`
(randomized-but-clean coefficients, e.g. integers chosen so results don't
produce ugly fractions unless the topic calls for it):

- `generatePowerRuleQuestion`
- `generateProductRuleQuestion`
- `generateQuotientRuleQuestion`
- `generateChainRuleQuestion`
- `generateTrigExpLogQuestion`

Each returns a `CalculusQuestion` with `category: 'basicRules'`,
`source: 'generated'`. Unlimited practice volume - a new random question each
time the generator runs.

### Implicit & higher-order differentiation (static bank)

`implicitHigherOrderQuestions: CalculusQuestion[]` - approximately 25-30
hand-written problems covering implicit differentiation, 2nd/3rd derivatives,
and parametric differentiation. `source: 'static'`.

### Partial differentiation (static bank)

`partialDifferentiationQuestions: CalculusQuestion[]` - approximately 25-30
hand-written problems covering first/second-order partials, mixed partials,
and the multivariable chain rule. `source: 'static'`.

### Answer format convention

To keep the existing normalized-string-comparison in `checkAnswer.ts`
reliable, all generated and static answers use a consistent canonical LaTeX
form: descending powers, `^{n}` notation, no unnecessary parentheses -
matching the convention already used in `lib/generators.ts`'s algebra
questions.

## UI flow

`app/calculus/page.tsx` mirrors `app/math/page.tsx`'s quiz flow:

1. **Start screen** - checkboxes for the 3 categories + a question-count
   input, "Start Quiz" button.
2. **Quiz loop** - `MathDisplay` renders the prompt, `MathInput` captures the
   answer, "Check Answer" calls `checkAnswer('algebra', ...)`, shows
   correct/incorrect + a "Solution" panel (rendered via `MathDisplay`) when
   wrong, "Next Question" advances.
3. **Finish screen** - score summary, "Start New Quiz" button.

Additionally (matching `app/surgery/page.tsx`, which `app/math/page.tsx`
currently lacks):

- On mount, check `getActiveSession('calculus')` and offer to resume an
  in-progress quiz.
- On each answer/question change, `saveActiveSession('calculus', ...)`.
- On quiz completion, `saveCourseProgress('calculus', ...)` and
  `clearActiveSession('calculus')`.
- On exit-without-finishing, `clearActiveSession('calculus')`.

## Out of scope / explicit non-goals

- Integration (not yet taught)
- Applications of differentiation (tangent lines, max/min, curve sketching,
  related rates)
- The other 7 planned courses (Engineering Materials, Renewable Energy
  System, Applied Electricity, Environmental Studies, Leadership Development
  & Society, French II, Introduction to African Studies) - each gets its own
  design/plan/build cycle
- Any change to `checkAnswer.ts`'s comparison logic itself
