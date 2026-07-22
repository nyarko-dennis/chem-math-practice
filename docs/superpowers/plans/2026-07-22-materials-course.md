# Engineering Materials Course Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an Engineering Materials practice course (8 topics, ~240 MCQ/TF + 24 subjective drills, full official syllabus) to the existing Next.js test-generator app, mirroring the Surgery course UX with the Calculus course's testing discipline.

**Architecture:** Framework-free question data in focused per-topic `lib/materialsBank*.ts` files with a `lib/materialsQuestions.ts` barrel, plus `lib/materialsDrills.ts`, all unit-tested with Node's built-in test runner. A new `app/materials/page.tsx` route adapts `app/surgery/page.tsx`'s two-mode UI (Quick Practice MCQ/TF + Subjective Drills with self-marking rubric). Content is authored per-task from committed source extracts.

**Tech Stack:** Next.js 16, React 19, TypeScript 5 (strict), Tailwind, Node 26 built-in test runner (`node --test`, native TS execution).

## Global Constraints

- No new npm dependencies. Cross-file imports in `lib/` and `*.test.ts` files MUST use explicit `.ts` extensions (Node test runner); production `app/` imports use `@/` WITHOUT extensions. `allowImportingTsExtensions` is already enabled.
- `lib/materials*.ts` files must be framework-free (no React/Next imports).
- Shared infra is NOT modified: `lib/progressTracker.ts` (courseId `'materials'`), `lib/checkAnswer.ts` (not used by this course), components.
- Course accent color: cyan (`text-cyan-600` / `text-cyan-700`, `accent-cyan-600`, `bg-cyan-600 hover:bg-cyan-700`); teal is taken by Calculus.
- **Content authoring rules (bind every bank/drill task):**
  - Ground every fact in the committed extracts under `docs/materials/source-extracts/`. Paraphrase - never copy sentences verbatim. Where an extract is thin on a syllabus topic, standard first-year materials-engineering facts are allowed, but list them under "facts not found in extracts" in your report.
  - MCQ: exactly 4 choices, exactly one correct, plausible distractors, never "all/none of the above"; vary `correctIndex` across questions (roughly balanced 0-3).
  - TF: a single unambiguous claim.
  - Every `rationale` is 1-3 sentences in plain language - every technical term glossed in everyday words (established user rule; e.g. "austenite (the form iron takes when very hot)").
  - Per topic: 30 items, roughly 22 MCQ + 8 TF, ids `<prefix>-001`..`<prefix>-030`.
  - Difficulty spread per topic: ~1/3 recall (definitions, facts), ~1/3 understanding (why/how), ~1/3 applied (pick the material/process/classification for a scenario).
- The topic union, labels, and question interfaces are defined once in Task 1 (`lib/materialsTypes.ts`) and imported everywhere.

## File Structure

- `docs/materials/source-extracts/` (Task 1) - committed text extracts of the course materials (authoring + review ground truth).
- `lib/materialsTypes.ts` (Task 1) - `MaterialsTopic`, `MATERIALS_TOPIC_LABELS`, `MCQuestion`, `TFQuestion`, `MaterialsQuestion`, plus drill types `MaterialsDrillKind`, `MATERIALS_DRILL_LABELS`, `RubricPoint`, `MaterialsDrill`.
- `lib/materialsBankIntro.ts` + `.test.ts` (Task 1) - topic `introClassification`, ids `ic-*`.
- `lib/materialsBankAtomic.ts` + `.test.ts` (Task 2) - topic `atomicCrystal`, ids `at-*`.
- `lib/materialsBankSolidification.ts` + `.test.ts` (Task 3) - topic `solidificationDefects`, ids `sd-*`.
- `lib/materialsBankMechanical.ts` + `.test.ts` (Task 4) - topic `mechanicalTesting`, ids `mt-*`.
- `lib/materialsBankIronCarbon.ts` + `.test.ts` (Task 5) - topic `ironCarbonHeat`, ids `ih-*`.
- `lib/materialsBankSteelProduction.ts` + `.test.ts` (Task 6) - topic `steelProduction`, ids `sp-*`.
- `lib/materialsBankFerrous.ts` + `.test.ts` (Task 7) - topic `ferrousSteels`, ids `fs-*`.
- `lib/materialsBankCorrosion.ts` + `.test.ts` (Task 8) - topic `corrosionAdvanced`, ids `ca-*`.
- `lib/materialsQuestions.ts` + `.test.ts` (Task 9) - barrel: concatenated `materialsQuestions` array + re-exports; global invariants test.
- `lib/materialsDrills.ts` + `.test.ts` (Task 10) - 24 drills, ids `mdr-001`..`mdr-024`.
- `app/materials/page.tsx` (Task 11) - two-mode UI.
- `app/page.tsx` (Task 12, modify) - home card.

---

### Task 1: Source extracts, types, and the Intro & Classification bank

**Files:**
- Create: `docs/materials/source-extracts/README.md`, plus 6 extract files (Step 1)
- Create: `lib/materialsTypes.ts`
- Create: `lib/materialsBankIntro.ts`
- Test: `lib/materialsBankIntro.test.ts`

**Interfaces:**
- Produces: everything in `lib/materialsTypes.ts` (Step 3 below - exact code); `introClassificationQuestions: MaterialsQuestion[]` (30 items, topic `'introClassification'`, ids `ic-001`..`ic-030`).

- [ ] **Step 1: Commit the source extracts**

The session scratchpad holds text extracted from the course files. Copy into the repo (create the directory):

```bash
mkdir -p docs/materials/source-extracts
S=/private/tmp/claude-501/-Users-Apple-Desktop-development-work-test-generator-chem-math-practice/e57ebf33-5039-452a-b1ba-9cc561335cbc/scratchpad/materials
cp "$S/ENGINEERING-MATERIALS.txt"                                    docs/materials/source-extracts/course-module.txt
cp "$S/Engineering_Materials_Lecture_1_-_2._-_2026.pptx.md"          docs/materials/source-extracts/lecture-1-2.md
cp "$S/Lecture3.txt"                                                 docs/materials/source-extracts/lecture-3-classification.txt
cp "$S/Steel.txt"                                                    docs/materials/source-extracts/steel-classification.txt
cp "$S/The_Smart_and_Advanced_Materials_Age.pptx.md"                 docs/materials/source-extracts/smart-materials.md
cp "$S/Engineering_Material.pptx.md"                                 docs/materials/source-extracts/intro-deck.md
```

If the scratchpad is gone, re-extract: `pdftotext -layout` for the PDFs in `electrical-engineering/`, and python-pptx text dump for the pptx files (slide-by-slide `<!-- Slide N -->` markers).

Create `docs/materials/source-extracts/README.md`:

```markdown
# Engineering Materials - source extracts

Text extracted from the student's own course materials in
`electrical-engineering/` (PENG102, Pentecost University). These are the
ground truth for authoring and fact-checking the question banks in
`lib/materialsBank*.ts`. The Callister textbook is deliberately NOT
extracted (copyrighted commercial text).

- `course-module.txt` - ENGINEERING-MATERIALS.pdf, the full course module (primary source: all 10 chapters).
- `lecture-1-2.md` - 107-slide lecture deck: history, classification, properties.
- `lecture-3-classification.txt` - classification of engineering materials.
- `steel-classification.txt` - AISI/SAE steel designation system.
- `smart-materials.md` - smart & advanced materials deck.
- `intro-deck.md` - intro deck (13 slides).
```

- [ ] **Step 2: Write the failing test**

Create `lib/materialsBankIntro.test.ts`:

```typescript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { introClassificationQuestions } from './materialsBankIntro.ts';
import { MATERIALS_TOPIC_LABELS } from './materialsTypes.ts';

test('bank has exactly 30 items with sequential prefixed ids', () => {
  assert.equal(introClassificationQuestions.length, 30);
  introClassificationQuestions.forEach((q, i) => {
    assert.equal(q.id, `ic-${String(i + 1).padStart(3, '0')}`);
  });
});

test('every item is well-formed and correctly tagged', () => {
  for (const q of introClassificationQuestions) {
    assert.equal(q.topic, 'introClassification');
    assert.ok(q.topic in MATERIALS_TOPIC_LABELS);
    assert.ok(q.prompt.length > 10);
    assert.ok(q.rationale.length > 20);
    if (q.type === 'mcq') {
      assert.equal(q.choices.length, 4);
      assert.ok(q.correctIndex >= 0 && q.correctIndex <= 3);
      assert.equal(new Set(q.choices).size, 4);
    } else {
      assert.equal(q.type, 'tf');
      assert.equal(typeof q.correctAnswer, 'boolean');
    }
  }
});

test('mix is roughly 22 MCQ / 8 TF and correctIndex varies', () => {
  const mcq = introClassificationQuestions.filter((q) => q.type === 'mcq');
  const tf = introClassificationQuestions.filter((q) => q.type === 'tf');
  assert.ok(mcq.length >= 20 && mcq.length <= 24, `mcq count ${mcq.length}`);
  assert.ok(tf.length >= 6 && tf.length <= 10, `tf count ${tf.length}`);
  const used = new Set(mcq.map((q) => (q.type === 'mcq' ? q.correctIndex : -1)));
  assert.equal(used.size, 4, 'all four correctIndex positions used');
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `node --test lib/materialsBankIntro.test.ts`
Expected: FAIL - cannot find module `./materialsBankIntro.ts`.

- [ ] **Step 4: Create the types file**

Create `lib/materialsTypes.ts` exactly:

```typescript
export type MaterialsTopic =
  | 'introClassification'
  | 'atomicCrystal'
  | 'solidificationDefects'
  | 'mechanicalTesting'
  | 'ironCarbonHeat'
  | 'steelProduction'
  | 'ferrousSteels'
  | 'corrosionAdvanced';

export const MATERIALS_TOPIC_LABELS: Record<MaterialsTopic, string> = {
  introClassification: 'Intro & Classification (material classes, materials science vs engineering, history)',
  atomicCrystal: 'Atomic Structure & Crystal Structures (bonding, BCC/FCC/HCP, crystalline vs amorphous)',
  solidificationDefects: 'Solidification, Solid Solutions & Imperfections (nucleation, solid solutions, diffusion, defects)',
  mechanicalTesting: 'Mechanical Properties & Testing (stress/strain, ductility, toughness, fatigue, creep, hardness tests)',
  ironCarbonHeat: 'Iron-Carbon Diagram & Heat Treatment (phases, eutectoid, annealing/quenching/tempering)',
  steelProduction: 'Iron & Steel Production (pig iron, blast furnace, BOF/EAF)',
  ferrousSteels: 'Ferrous Metals & Steel Classification (carbon steels, AISI/SAE, alloying, stainless/tool steels, cast irons)',
  corrosionAdvanced: 'Corrosion, Composites & Smart Materials',
};

export interface MCQuestion {
  id: string;
  topic: MaterialsTopic;
  type: 'mcq';
  prompt: string;
  choices: string[];
  correctIndex: number;
  rationale: string;
}

export interface TFQuestion {
  id: string;
  topic: MaterialsTopic;
  type: 'tf';
  prompt: string;
  correctAnswer: boolean;
  rationale: string;
}

export type MaterialsQuestion = MCQuestion | TFQuestion;

export type MaterialsDrillKind =
  | 'defineTerms'
  | 'classify'
  | 'explainProcess'
  | 'compare'
  | 'selectMaterial';

export const MATERIALS_DRILL_LABELS: Record<MaterialsDrillKind, string> = {
  defineTerms: 'Define key materials terms',
  classify: 'Classify materials / steels / defects',
  explainProcess: 'Explain a process step by step',
  compare: 'Compare / contrast two things',
  selectMaterial: 'Select a material for an application & justify',
};

export interface RubricPoint {
  id: string;
  label: string;
  detail: string;
  marks: number;
}

export interface MaterialsDrill {
  id: string;
  topic: MaterialsTopic;
  drillKind: MaterialsDrillKind;
  type: 'drill';
  prompt: string;
  marks: number;
  rubric: RubricPoint[];
  modelAnswer: string;
}
```

- [ ] **Step 5: Author the Intro & Classification bank**

Create `lib/materialsBankIntro.ts`:

```typescript
import type { MaterialsQuestion } from './materialsTypes.ts';

export const introClassificationQuestions: MaterialsQuestion[] = [
  // 30 authored items, ids ic-001..ic-030
];
```

Author the 30 items yourself per the Global Constraints authoring rules,
grounded in `docs/materials/source-extracts/course-module.txt` (chapter 1),
`lecture-1-2.md`, `lecture-3-classification.txt`, and `intro-deck.md`.
Coverage checklist - every bullet gets at least one question:

- Definition and scope of materials science vs materials engineering (science = structure-properties relationships; engineering = designing/using materials).
- The processing -> structure -> properties -> performance chain.
- The six classes from the module: metals, polymers, ceramics, composites, electronic materials, smart materials - defining features and one everyday example each.
- Metals: good electrical/thermal conductors, ductile, crystalline.
- Polymers: long carbon-chain molecules, light, low melting, insulators.
- Ceramics: hard, brittle, high-temperature resistant, insulators (compounds of metal + non-metal).
- Composites: two or more materials combined for properties neither has alone (example: fibreglass, reinforced concrete).
- Smart materials: respond to a stimulus (shape-memory alloys, piezoelectric).
- History timeline: Copper Age (~4000 BC, first metal used), Bronze Age (~3000 BC, bronze = copper + tin, first alloy), Iron Age (~2000 BC), cast iron (~500 AD), steel-era developments.
- Why material selection matters in engineering design (properties, cost, availability).
- Everyday engineering materials from lecture 3: wood, stone/granite, copper, steel, aluminium, plastics - and that materials are often used together.

- [ ] **Step 6: Run test to verify it passes**

Run: `node --test lib/materialsBankIntro.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 7: Commit**

```bash
git add docs/materials/source-extracts lib/materialsTypes.ts lib/materialsBankIntro.ts lib/materialsBankIntro.test.ts
git commit -m "feat(materials): add source extracts, types, and intro/classification bank"
```

---

### Task 2: Atomic Structure & Crystal Structures bank

**Files:**
- Create: `lib/materialsBankAtomic.ts`
- Test: `lib/materialsBankAtomic.test.ts`

**Interfaces:**
- Consumes: `MaterialsQuestion`, `MATERIALS_TOPIC_LABELS` from `./materialsTypes.ts`.
- Produces: `atomicCrystalQuestions: MaterialsQuestion[]` (30 items, topic `'atomicCrystal'`, ids `at-001`..`at-030`).

- [ ] **Step 1: Write the failing test**

Create `lib/materialsBankAtomic.test.ts` - same three tests as `lib/materialsBankIntro.test.ts` with the import changed to `{ atomicCrystalQuestions } from './materialsBankAtomic.ts'`, the array variable renamed accordingly, topic asserted as `'atomicCrystal'`, and the id prefix asserted as `at-`:

```typescript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { atomicCrystalQuestions } from './materialsBankAtomic.ts';
import { MATERIALS_TOPIC_LABELS } from './materialsTypes.ts';

test('bank has exactly 30 items with sequential prefixed ids', () => {
  assert.equal(atomicCrystalQuestions.length, 30);
  atomicCrystalQuestions.forEach((q, i) => {
    assert.equal(q.id, `at-${String(i + 1).padStart(3, '0')}`);
  });
});

test('every item is well-formed and correctly tagged', () => {
  for (const q of atomicCrystalQuestions) {
    assert.equal(q.topic, 'atomicCrystal');
    assert.ok(q.topic in MATERIALS_TOPIC_LABELS);
    assert.ok(q.prompt.length > 10);
    assert.ok(q.rationale.length > 20);
    if (q.type === 'mcq') {
      assert.equal(q.choices.length, 4);
      assert.ok(q.correctIndex >= 0 && q.correctIndex <= 3);
      assert.equal(new Set(q.choices).size, 4);
    } else {
      assert.equal(q.type, 'tf');
      assert.equal(typeof q.correctAnswer, 'boolean');
    }
  }
});

test('mix is roughly 22 MCQ / 8 TF and correctIndex varies', () => {
  const mcq = atomicCrystalQuestions.filter((q) => q.type === 'mcq');
  const tf = atomicCrystalQuestions.filter((q) => q.type === 'tf');
  assert.ok(mcq.length >= 20 && mcq.length <= 24, `mcq count ${mcq.length}`);
  assert.ok(tf.length >= 6 && tf.length <= 10, `tf count ${tf.length}`);
  const used = new Set(mcq.map((q) => (q.type === 'mcq' ? q.correctIndex : -1)));
  assert.equal(used.size, 4, 'all four correctIndex positions used');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test lib/materialsBankAtomic.test.ts`
Expected: FAIL - cannot find module.

- [ ] **Step 3: Author the bank**

Create `lib/materialsBankAtomic.ts` (same shape as `materialsBankIntro.ts`, exporting `atomicCrystalQuestions`). Ground in `course-module.txt` chapters 2-3. Coverage checklist:

- Parts of the atom (protons, neutrons, electrons), atomic number, atomic mass.
- Why atomic bonding matters for material properties.
- Primary bonds: ionic (electron transfer, e.g. NaCl; hard, brittle, insulating), covalent (electron sharing, e.g. diamond; very strong, directional), metallic (electron "sea"/cloud shared among positive ions; explains conductivity and ductility).
- Secondary bonds: van der Waals and hydrogen bonds - much weaker, explain low-melting molecular solids.
- Crystalline vs amorphous: ordered repeating lattice vs random arrangement (glass).
- Unit cell concept; lattice.
- BCC: 2 atoms/unit cell, coordination number 8, examples alpha-iron (ferrite), chromium, tungsten.
- FCC: 4 atoms/unit cell, coordination number 12, examples aluminium, copper, nickel, gamma-iron (austenite); more ductile (more slip systems / closer packing).
- HCP: 6 atoms/unit cell, coordination number 12, examples zinc, magnesium, titanium; limited slip, more brittle than FCC.
- Allotropy/polymorphism of iron (BCC at room temp, FCC when hot) - the basis of heat treatment.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test lib/materialsBankAtomic.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/materialsBankAtomic.ts lib/materialsBankAtomic.test.ts
git commit -m "feat(materials): add atomic structure and crystal structures bank"
```

---

### Task 3: Solidification, Solid Solutions & Imperfections bank

**Files:**
- Create: `lib/materialsBankSolidification.ts`
- Test: `lib/materialsBankSolidification.test.ts`

**Interfaces:**
- Consumes: `MaterialsQuestion`, `MATERIALS_TOPIC_LABELS` from `./materialsTypes.ts`.
- Produces: `solidificationDefectsQuestions: MaterialsQuestion[]` (30 items, topic `'solidificationDefects'`, ids `sd-001`..`sd-030`).

- [ ] **Step 1: Write the failing test**

Create `lib/materialsBankSolidification.test.ts` - identical structure to Task 2's test with import `{ solidificationDefectsQuestions } from './materialsBankSolidification.ts'`, topic `'solidificationDefects'`, id prefix `sd-`.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test lib/materialsBankSolidification.test.ts`
Expected: FAIL - cannot find module.

- [ ] **Step 3: Author the bank**

Create `lib/materialsBankSolidification.ts` exporting `solidificationDefectsQuestions`. Ground in `course-module.txt` chapters 4-6. Coverage checklist:

- Solidification stages: nucleation (seed crystals form) then crystal growth; grains and grain boundaries form where crystals meet.
- Homogeneous vs heterogeneous nucleation.
- Dendrites (tree-like growth in castings).
- Grain size effect: fine grains = stronger, tougher; slow cooling = coarse grains.
- Solid solution definition: solute atoms dissolved in a solvent metal's lattice.
- Substitutional solid solution (similar-size atoms replace lattice atoms, e.g. Cu-Ni) vs interstitial (small atoms fit in gaps, e.g. carbon in iron).
- Hume-Rothery-style conditions for substitutional solubility (similar atomic size, same crystal structure, similar electronegativity/valence).
- Diffusion: atom movement in solids; vacancy vs interstitial mechanisms; faster at higher temperature; applications (case hardening/carburising).
- Point defects: vacancy, interstitial, substitutional impurity.
- Line defects: dislocations (edge, screw) - why they let metals deform at lower stress than a perfect crystal would need (slip).
- Planar/surface defects: grain boundaries, twin boundaries.
- Why defects matter: strengthening mechanisms work by blocking dislocation motion.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test lib/materialsBankSolidification.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/materialsBankSolidification.ts lib/materialsBankSolidification.test.ts
git commit -m "feat(materials): add solidification and imperfections bank"
```

---

### Task 4: Mechanical Properties & Testing bank

**Files:**
- Create: `lib/materialsBankMechanical.ts`
- Test: `lib/materialsBankMechanical.test.ts`

**Interfaces:**
- Consumes: `MaterialsQuestion`, `MATERIALS_TOPIC_LABELS` from `./materialsTypes.ts`.
- Produces: `mechanicalTestingQuestions: MaterialsQuestion[]` (30 items, topic `'mechanicalTesting'`, ids `mt-001`..`mt-030`).

- [ ] **Step 1: Write the failing test**

Create `lib/materialsBankMechanical.test.ts` - identical structure with import `{ mechanicalTestingQuestions } from './materialsBankMechanical.ts'`, topic `'mechanicalTesting'`, id prefix `mt-`.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test lib/materialsBankMechanical.test.ts`
Expected: FAIL - cannot find module.

- [ ] **Step 3: Author the bank**

Create `lib/materialsBankMechanical.ts` exporting `mechanicalTestingQuestions`. Ground in `course-module.txt` chapter 7 and `lecture-1-2.md` property slides. Coverage checklist:

- Stress (force per area) and strain (fractional stretch); units.
- Elastic vs plastic deformation; yield point; Young's modulus = stiffness (slope of elastic region).
- Tensile test: what it measures (yield strength, ultimate tensile strength, % elongation); stress-strain curve regions.
- Ductility (draw into wire / plastic stretch before breaking) vs brittleness (breaks with little warning); malleability (hammer/roll into sheets).
- Toughness (energy absorbed before fracture - impact tests) vs hardness (resistance to indentation/scratching).
- Hardness tests: Brinell (hard ball indenter, BHN), Rockwell (direct-reading scales, minor+major load), Vickers (diamond pyramid, good for very hard materials) - when each is used.
- Fatigue: failure under repeated/cyclic loads below yield strength; fatigue limit; classic example (rotating shafts, aircraft).
- Creep: slow permanent deformation under constant load at high temperature (turbine blades).
- Strength vs temperature: strength generally falls as temperature rises; polymers only for low temperatures, ceramics good at high temperature.
- Elasticity and stiffness distinction; resilience.
- Impact tests (Charpy/Izod) measure toughness.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test lib/materialsBankMechanical.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/materialsBankMechanical.ts lib/materialsBankMechanical.test.ts
git commit -m "feat(materials): add mechanical properties and testing bank"
```

---

### Task 5: Iron-Carbon Diagram & Heat Treatment bank

**Files:**
- Create: `lib/materialsBankIronCarbon.ts`
- Test: `lib/materialsBankIronCarbon.test.ts`

**Interfaces:**
- Consumes: `MaterialsQuestion`, `MATERIALS_TOPIC_LABELS` from `./materialsTypes.ts`.
- Produces: `ironCarbonHeatQuestions: MaterialsQuestion[]` (30 items, topic `'ironCarbonHeat'`, ids `ih-001`..`ih-030`).

- [ ] **Step 1: Write the failing test**

Create `lib/materialsBankIronCarbon.test.ts` - identical structure with import `{ ironCarbonHeatQuestions } from './materialsBankIronCarbon.ts'`, topic `'ironCarbonHeat'`, id prefix `ih-`.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test lib/materialsBankIronCarbon.test.ts`
Expected: FAIL - cannot find module.

- [ ] **Step 3: Author the bank**

Create `lib/materialsBankIronCarbon.ts` exporting `ironCarbonHeatQuestions`. Ground in `course-module.txt` chapter 8 (iron-carbon diagram); heat-treatment facts beyond the module are allowed as standard first-year content (flag in report per Global Constraints). Coverage checklist:

- Phases: ferrite (alpha-iron, BCC, soft, little carbon), austenite (gamma-iron, FCC, exists hot, dissolves more carbon), cementite (Fe3C, iron carbide, very hard and brittle), pearlite (layered ferrite + cementite mixture).
- Eutectoid point: ~0.8% C, ~727 C - austenite transforms to pearlite; hypo- vs hyper-eutectoid steels.
- Steel vs cast iron by carbon content (steel up to ~2% C; cast iron ~2-4% C).
- Martensite: very hard, brittle phase from rapid quenching (trapped carbon).
- Why the diagram matters: predicts structure (and so properties) at a given carbon content and temperature.
- Annealing: heat then slow cool (in furnace) - softens, relieves stress, refines grains.
- Normalizing: heat then air cool - stronger/finer structure than annealing.
- Quenching (hardening): heat to austenite then rapid cool in water/oil - hard but brittle (martensite).
- Tempering: reheat quenched steel below critical temperature - trades some hardness for toughness.
- Case hardening / carburising: hard skin, tough core; where used (gears).
- Effect of cooling rate on final structure and hardness.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test lib/materialsBankIronCarbon.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/materialsBankIronCarbon.ts lib/materialsBankIronCarbon.test.ts
git commit -m "feat(materials): add iron-carbon diagram and heat treatment bank"
```

---

### Task 6: Iron & Steel Production bank

**Files:**
- Create: `lib/materialsBankSteelProduction.ts`
- Test: `lib/materialsBankSteelProduction.test.ts`

**Interfaces:**
- Consumes: `MaterialsQuestion`, `MATERIALS_TOPIC_LABELS` from `./materialsTypes.ts`.
- Produces: `steelProductionQuestions: MaterialsQuestion[]` (30 items, topic `'steelProduction'`, ids `sp-001`..`sp-030`).

- [ ] **Step 1: Write the failing test**

Create `lib/materialsBankSteelProduction.test.ts` - identical structure with import `{ steelProductionQuestions } from './materialsBankSteelProduction.ts'`, topic `'steelProduction'`, id prefix `sp-`.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test lib/materialsBankSteelProduction.test.ts`
Expected: FAIL - cannot find module.

- [ ] **Step 3: Author the bank**

Create `lib/materialsBankSteelProduction.ts` exporting `steelProductionQuestions`. Ground in `course-module.txt` chapter 9. Coverage checklist:

- Raw materials for iron making: iron ore, coke, limestone (flux), hot air.
- Blast furnace: what happens (coke burns, CO reduces ore to iron, limestone forms slag that floats), product = pig iron (high carbon, impure).
- Pig iron properties (3-4%+ carbon, brittle) - why it must be refined into steel.
- Slag: what it is and its uses.
- Steelmaking = removing excess carbon and impurities from pig iron.
- Basic Oxygen Furnace/process (BOF): oxygen blown onto molten pig iron + scrap, fast (a heat in under an hour), main modern route.
- Electric Arc Furnace (EAF): melts mostly scrap with electric arcs; flexible, used for recycling and alloy/special steels.
- Older processes named by the module (e.g. Bessemer, open hearth) and why they were replaced.
- Casting after steelmaking: ingots vs continuous casting.
- The overall route: ore -> blast furnace -> pig iron -> steelmaking furnace -> steel -> casting/rolling.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test lib/materialsBankSteelProduction.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/materialsBankSteelProduction.ts lib/materialsBankSteelProduction.test.ts
git commit -m "feat(materials): add iron and steel production bank"
```

---

### Task 7: Ferrous Metals & Steel Classification bank

**Files:**
- Create: `lib/materialsBankFerrous.ts`
- Test: `lib/materialsBankFerrous.test.ts`

**Interfaces:**
- Consumes: `MaterialsQuestion`, `MATERIALS_TOPIC_LABELS` from `./materialsTypes.ts`.
- Produces: `ferrousSteelsQuestions: MaterialsQuestion[]` (30 items, topic `'ferrousSteels'`, ids `fs-001`..`fs-030`).

- [ ] **Step 1: Write the failing test**

Create `lib/materialsBankFerrous.test.ts` - identical structure with import `{ ferrousSteelsQuestions } from './materialsBankFerrous.ts'`, topic `'ferrousSteels'`, id prefix `fs-`.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test lib/materialsBankFerrous.test.ts`
Expected: FAIL - cannot find module.

- [ ] **Step 3: Author the bank**

Create `lib/materialsBankFerrous.ts` exporting `ferrousSteelsQuestions`. Ground in `course-module.txt` chapter 10 and `steel-classification.txt`. Coverage checklist:

- Ferrous vs non-ferrous definition.
- Plain carbon steel classes: low (<0.3% C, mild steel - car bodies, structures), medium (0.3-0.6% C - axles, gears), high (0.6-1.4% C - tools, springs) and their property trade-off (more carbon = harder but less ductile).
- AISI/SAE 4-digit system: 1st digit = steel type/major alloying element (1 = plain carbon), 2nd digit = secondary element/modification, last two digits = carbon content in hundredths of a percent; worked example SAE 1045 = plain carbon, 0.45% C.
- More designation examples (e.g. 10xx plain carbon, 41xx chromium-molybdenum).
- Effects of alloying elements per the module: chromium (hardness, corrosion resistance), nickel (toughness), manganese (strength, deoxidiser), molybdenum (high-temp strength), vanadium (grain refinement), tungsten (hardness at heat).
- Stainless steel: >= ~10.5-12% chromium forming a protective oxide layer; common types (austenitic 18-8, ferritic, martensitic).
- Tool and die steels: purpose and key properties (hardness, wear resistance, hot hardness).
- Cast iron types: grey (graphite flakes, good damping, machinable), white (cementite, very hard/brittle), malleable, ductile/nodular (graphite spheres, tougher) - and typical uses.
- Wrought iron (nearly carbon-free, fibrous slag) as historical material.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test lib/materialsBankFerrous.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/materialsBankFerrous.ts lib/materialsBankFerrous.test.ts
git commit -m "feat(materials): add ferrous metals and steel classification bank"
```

---

### Task 8: Corrosion, Composites & Smart Materials bank

**Files:**
- Create: `lib/materialsBankCorrosion.ts`
- Test: `lib/materialsBankCorrosion.test.ts`

**Interfaces:**
- Consumes: `MaterialsQuestion`, `MATERIALS_TOPIC_LABELS` from `./materialsTypes.ts`.
- Produces: `corrosionAdvancedQuestions: MaterialsQuestion[]` (30 items, topic `'corrosionAdvanced'`, ids `ca-001`..`ca-030`).

- [ ] **Step 1: Write the failing test**

Create `lib/materialsBankCorrosion.test.ts` - identical structure with import `{ corrosionAdvancedQuestions } from './materialsBankCorrosion.ts'`, topic `'corrosionAdvanced'`, id prefix `ca-`.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test lib/materialsBankCorrosion.test.ts`
Expected: FAIL - cannot find module.

- [ ] **Step 3: Author the bank**

Create `lib/materialsBankCorrosion.ts` exporting `corrosionAdvancedQuestions`. Ground in `course-module.txt` (corrosion coverage where present), `smart-materials.md`, and `lecture-1-2.md` composites slides; standard first-year corrosion/composites facts allowed where extracts are thin (flag in report). Coverage checklist:

- Corrosion definition: unwanted chemical/electrochemical attack on a metal by its environment; rusting of iron needs oxygen AND water.
- Electrochemical basis: anode corrodes, cathode protected; galvanic corrosion when two different metals touch in an electrolyte.
- Common corrosion types: uniform, galvanic, pitting, crevice, stress corrosion.
- Prevention: paint/coatings, galvanising (zinc layer), sacrificial anodes, cathodic protection, alloying (stainless), design (avoid trapped moisture).
- Why aluminium resists corrosion (self-healing oxide film) despite being reactive.
- Composites: matrix + reinforcement roles; fibre-reinforced (fibreglass, carbon fibre), particle-reinforced (concrete), laminates (plywood).
- Composite property logic: strength of fibres + toughness/shape of matrix; high strength-to-weight (aircraft, sports gear).
- Smart materials from the deck: shape-memory alloys (return to shape when heated, e.g. nitinol), piezoelectric (voltage <-> pressure), thermochromic/photochromic, magnetostrictive, self-healing materials.
- Applications of smart materials (sensors, actuators, biomedical stents, smart glasses).
- Metamaterials / advanced materials as engineered-structure materials (from lecture deck's 2015 metamaterials slide).

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test lib/materialsBankCorrosion.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/materialsBankCorrosion.ts lib/materialsBankCorrosion.test.ts
git commit -m "feat(materials): add corrosion, composites and smart materials bank"
```

---

### Task 9: Barrel and global invariants

**Files:**
- Create: `lib/materialsQuestions.ts`
- Test: `lib/materialsQuestions.test.ts`

**Interfaces:**
- Consumes: all eight `*Questions` arrays from Tasks 1-8; types from `./materialsTypes.ts`.
- Produces: `materialsQuestions: MaterialsQuestion[]` (240 items); re-exports of `MaterialsTopic`, `MATERIALS_TOPIC_LABELS`, `MaterialsQuestion`, `MCQuestion`, `TFQuestion`.

- [ ] **Step 1: Write the failing test**

Create `lib/materialsQuestions.test.ts`:

```typescript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { materialsQuestions } from './materialsQuestions.ts';
import { MATERIALS_TOPIC_LABELS } from './materialsTypes.ts';

test('bank totals 240 questions, 30 per topic', () => {
  assert.equal(materialsQuestions.length, 240);
  for (const topic of Object.keys(MATERIALS_TOPIC_LABELS)) {
    const n = materialsQuestions.filter((q) => q.topic === topic).length;
    assert.equal(n, 30, `topic ${topic} has ${n}`);
  }
});

test('ids are globally unique', () => {
  const ids = materialsQuestions.map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test lib/materialsQuestions.test.ts`
Expected: FAIL - cannot find module `./materialsQuestions.ts`.

- [ ] **Step 3: Write the barrel**

Create `lib/materialsQuestions.ts`:

```typescript
import type { MaterialsQuestion } from './materialsTypes.ts';
import { introClassificationQuestions } from './materialsBankIntro.ts';
import { atomicCrystalQuestions } from './materialsBankAtomic.ts';
import { solidificationDefectsQuestions } from './materialsBankSolidification.ts';
import { mechanicalTestingQuestions } from './materialsBankMechanical.ts';
import { ironCarbonHeatQuestions } from './materialsBankIronCarbon.ts';
import { steelProductionQuestions } from './materialsBankSteelProduction.ts';
import { ferrousSteelsQuestions } from './materialsBankFerrous.ts';
import { corrosionAdvancedQuestions } from './materialsBankCorrosion.ts';

export type { MaterialsTopic, MaterialsQuestion, MCQuestion, TFQuestion } from './materialsTypes.ts';
export { MATERIALS_TOPIC_LABELS } from './materialsTypes.ts';

export const materialsQuestions: MaterialsQuestion[] = [
  ...introClassificationQuestions,
  ...atomicCrystalQuestions,
  ...solidificationDefectsQuestions,
  ...mechanicalTestingQuestions,
  ...ironCarbonHeatQuestions,
  ...steelProductionQuestions,
  ...ferrousSteelsQuestions,
  ...corrosionAdvancedQuestions,
];
```

- [ ] **Step 4: Run tests**

Run: `node --test lib/materialsQuestions.test.ts` -> PASS (2 tests).
Run: `npm test` -> all materials + calculus tests pass.

- [ ] **Step 5: Commit**

```bash
git add lib/materialsQuestions.ts lib/materialsQuestions.test.ts
git commit -m "feat(materials): add question bank barrel with global invariants"
```

---

### Task 10: Subjective drills

**Files:**
- Create: `lib/materialsDrills.ts`
- Test: `lib/materialsDrills.test.ts`

**Interfaces:**
- Consumes: `MaterialsDrill`, `MaterialsDrillKind`, `MATERIALS_DRILL_LABELS`, `RubricPoint`, `MaterialsTopic` from `./materialsTypes.ts`.
- Produces: `materialsDrills: MaterialsDrill[]` (24 items, ids `mdr-001`..`mdr-024`, 3 per topic); re-exports `MATERIALS_DRILL_LABELS`, types `MaterialsDrill`, `MaterialsDrillKind`, `RubricPoint`.

- [ ] **Step 1: Write the failing test**

Create `lib/materialsDrills.test.ts`:

```typescript
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test lib/materialsDrills.test.ts`
Expected: FAIL - cannot find module.

- [ ] **Step 3: Author the drills**

Create `lib/materialsDrills.ts`:

```typescript
import type { MaterialsDrill } from './materialsTypes.ts';

export { MATERIALS_DRILL_LABELS } from './materialsTypes.ts';
export type { MaterialsDrill, MaterialsDrillKind, RubricPoint } from './materialsTypes.ts';

export const materialsDrills: MaterialsDrill[] = [
  // 24 authored drills, mdr-001..mdr-024, in topic order (3 each):
  // introClassification, atomicCrystal, solidificationDefects, mechanicalTesting,
  // ironCarbonHeat, steelProduction, ferrousSteels, corrosionAdvanced
];
```

Author 24 drills (3 per topic, in the topic order above so ids stay sequential), each 6-10 marks, using all five kinds at least twice across the set. Model answers in plain language per Global Constraints. Quality bar - match this fully-worked example (an `ironCarbonHeat` `compare` drill):

```typescript
{
  id: 'mdr-0XX',
  topic: 'ironCarbonHeat',
  drillKind: 'compare',
  type: 'drill',
  prompt:
    'Compare ANNEALING and QUENCHING of a medium-carbon steel under these headings:\n' +
    '(a) how each is carried out\n(b) the structure it produces\n(c) the resulting properties\n(d) one typical use of each',
  marks: 8,
  rubric: [
    { id: 'r1', label: 'Annealing method', detail: 'Heat above the critical temperature, then cool very slowly (usually in the switched-off furnace).', marks: 1 },
    { id: 'r2', label: 'Quenching method', detail: 'Heat above the critical temperature, then cool very fast by plunging into water or oil.', marks: 1 },
    { id: 'r3', label: 'Annealing structure', detail: 'Soft, coarse pearlite (layered mixture) - the slow cool gives atoms time to arrange.', marks: 1.5 },
    { id: 'r4', label: 'Quenching structure', detail: 'Martensite - a distorted, stressed structure because trapped carbon had no time to escape.', marks: 1.5 },
    { id: 'r5', label: 'Annealed properties', detail: 'Soft, ductile (bends without breaking), easy to machine; internal stresses relieved.', marks: 1 },
    { id: 'r6', label: 'Quenched properties', detail: 'Very hard and wear-resistant but brittle (snaps rather than bends).', marks: 1 },
    { id: 'r7', label: 'One use of each', detail: 'Annealing: softening steel before machining/forming. Quenching: hardening tools, springs, gears (usually followed by tempering).', marks: 1 },
  ],
  modelAnswer:
    'Annealing means heating the steel until its structure changes to austenite (the form iron takes when very hot), then letting it cool very slowly, usually inside the furnace. The slow cooling gives the atoms time to settle into soft, coarse pearlite - a layered mixture of soft iron and hard iron carbide. The result is steel that is soft, ductile (it bends and stretches without breaking) and easy to machine, with its internal stresses relieved. It is used to soften steel before machining or forming.\n\n' +
    'Quenching heats the steel the same way but then cools it very fast by plunging it into water or oil. The carbon atoms are trapped because they have no time to move, producing martensite - a strained, distorted structure. This makes the steel very hard and wear-resistant but brittle (it snaps rather than bends). It is used to harden cutting tools, springs and gears, and is almost always followed by tempering (a gentle reheat) to trade a little hardness for toughness.',
},
```

Suggested drill spread (adapt as needed, keep 3/topic and every kind used >= 2 times):
- introClassification: defineTerms (the 6 material classes), classify (everyday objects -> class), compare (metals vs ceramics vs polymers).
- atomicCrystal: defineTerms (bond types), compare (BCC vs FCC), explainProcess (why metallic bonding explains conductivity + ductility).
- solidificationDefects: explainProcess (solidification stages), defineTerms (defect types), compare (substitutional vs interstitial solution).
- mechanicalTesting: defineTerms (property terms), compare (hardness test methods), explainProcess (tensile test and what the curve shows).
- ironCarbonHeat: the example above (compare), defineTerms (phases), explainProcess (tempering and why it follows quenching).
- steelProduction: explainProcess (blast furnace), explainProcess (BOF vs EAF as a compare-style process question - use kind `compare`), defineTerms (pig iron, slag, flux).
- ferrousSteels: classify (AISI/SAE codes -> steel type + carbon %), selectMaterial (choose a steel class for car body / cutting tool / spring), compare (grey vs white cast iron).
- corrosionAdvanced: explainProcess (how rusting happens + two preventions), selectMaterial (material for a corrosive marine part), defineTerms (smart material types).

- [ ] **Step 4: Run tests**

Run: `node --test lib/materialsDrills.test.ts` -> PASS (3 tests).
Run: `npm test` -> everything passes.

- [ ] **Step 5: Commit**

```bash
git add lib/materialsDrills.ts lib/materialsDrills.test.ts
git commit -m "feat(materials): add subjective drills with rubrics"
```

---

### Task 11: Materials course page

**Files:**
- Create: `app/materials/page.tsx`
- Reference (read, do NOT modify): `app/surgery/page.tsx` - the pattern to adapt.

**Interfaces:**
- Consumes: `materialsQuestions`, `MATERIALS_TOPIC_LABELS`, `MaterialsQuestion`, `MaterialsTopic` from `@/lib/materialsQuestions`; `materialsDrills`, `MATERIALS_DRILL_LABELS`, `MaterialsDrill` from `@/lib/materialsDrills`; `saveActiveSession`, `getActiveSession`, `clearActiveSession`, `saveCourseProgress` from `@/lib/progressTracker`.
- Production imports use `@/` with NO `.ts` extensions.

- [ ] **Step 1: Write the page**

Read `app/surgery/page.tsx` first and adapt it. `'use client'` page, default export `MaterialsPage`. Requirements (each maps to a surgery-page behaviour - keep the same state/persistence structure, swap the domain):

1. **Start screen**: title "Engineering Materials Practice", "← Home" link, mode toggle buttons (Quick Practice / Subjective Drills), topic checkboxes for all 8 topics from `MATERIALS_TOPIC_LABELS` (all checked by default), question-count input (default 15, min 1, max 50 - clamp in onChange with `Math.min(50, Math.max(1, parseInt(e.target.value) || 15))`), Start button. Accent cyan everywhere surgery uses amber.
2. **Quick mode**: draw `count` random questions from the selected topics (shuffle a filtered copy, slice). MCQ renders 4 choice buttons; TF renders True/False buttons. On answer: mark correct/incorrect immediately, show the rationale panel, then Next. Track score.
3. **Drill mode**: draw min(count, available) drills from selected topics. Show prompt + marks. Student thinks/writes offline, then clicks "Reveal model answer & rubric". Rubric renders as checkboxes (one per `RubricPoint`, showing label, detail, marks); the student ticks the points they got; the drill score = sum of ticked marks. "Next drill" advances. Final screen shows total self-marked score / total possible marks.
4. **Resume**: on mount, `getActiveSession('materials')`; if present show a resume banner naming the saved mode. Persist on every answer/advance/tick with the full state (mode, questions or drills, index, answers/feedback or ticks). `clearActiveSession('materials')` on exit and on finish.
5. **Progress**: on finish - quick mode: `saveCourseProgress('materials', { type: 'quick', correct, total })`; drill mode: `saveCourseProgress('materials', { type: 'drill', correct: Math.round(earnedMarks), total: totalMarks })`.
6. **Finish screens** with score and "Start New Session".
7. Mounted-guard for SSR hydration like the other pages; add `// eslint-disable-line react-hooks/set-state-in-effect` on the `setMounted(true)` line (repo decision from the Calculus build - the new page must lint clean).

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit -p tsconfig.json` -> no errors referencing `app/materials/page.tsx`.
Run: `npx eslint app/materials/page.tsx` -> clean.

- [ ] **Step 3: Commit**

```bash
git add app/materials/page.tsx
git commit -m "feat(materials): add course page with quick and drill modes"
```

---

### Task 12: Home page card

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: existing `renderCard(id, title, description, textColor, hoverText)` helper.

- [ ] **Step 1: Add `'materials'` to both course arrays**

In `app/page.tsx`, append `'materials'` to the `courses` array (currently ends with `'calculus'`) AND to the SSR skeleton array. Both become:

```tsx
['math', 'nutrition', 'palliative', 'research', 'pharmacology', 'surgery', 'calculus', 'materials']
```

- [ ] **Step 2: Add the card**

Immediately after the calculus `renderCard(...)` call inside the grid, add:

```tsx
          {renderCard(
            'materials',
            'Engineering Materials Practice',
            'MCQ/TF on material classes, atomic & crystal structure, defects, mechanical properties & testing, iron-carbon diagram, heat treatment, steel production & classification, corrosion, composites, and smart materials. Subjective drills with self-marking rubrics.',
            'text-cyan-600',
            'text-cyan-700'
          )}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json` -> no errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat(materials): add Engineering Materials card to home page"
```

---

### Task 13: Full verification (tests, lint, build, browser)

**Files:** none created; verification only.

- [ ] **Step 1: Unit suite**

Run: `npm test` -> all pass (47 calculus + 8x3 bank + 2 barrel + 3 drills = 76 total).

- [ ] **Step 2: Lint**

Run: `npx eslint lib/materialsTypes.ts lib/materialsBank*.ts lib/materialsQuestions.ts lib/materialsQuestions.test.ts lib/materialsDrills.ts lib/materialsDrills.test.ts app/materials/page.tsx` -> clean. (Repo-wide `npm run lint` still reports pre-existing errors in older pages - not in scope.)

- [ ] **Step 3: Build**

Run: `npm run build` -> succeeds; route list includes `/materials`.

- [ ] **Step 4: Browser smoke test**

Dev server via the existing `.claude/launch.json` preview. Verify:
1. Home shows the cyan "Engineering Materials Practice" card.
2. `/materials` start screen: mode toggle, 8 topic checkboxes, count input.
3. Quick mode: MCQ answer -> feedback + rationale; TF question works; finish screen shows score; home card shows updated stats.
4. Drill mode: prompt -> reveal -> rubric checkboxes tick and total updates -> finish screen shows self-marked score.
5. Mid-session reload -> resume banner appears and restores position (both modes).

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "chore(materials): verification fixes"
```

---

## Self-Review Notes

- **Spec coverage:** 8 topics x 30 = 240 MCQ/TF (Tasks 1-9) ✓; 24 drills, 3/topic, 5 kinds (Task 10) ✓; two-mode page mirroring surgery with rubric self-marking (Task 11) ✓; cyan home card (Task 12) ✓; courseId `'materials'` ✓; framework-free tested libs ✓; source extracts committed as ground truth (Task 1) ✓; no Learn mode (spec out-of-scope) ✓.
- **Authoring model:** unlike the Calculus plan, question text is authored per-task by the implementer against per-topic coverage checklists and committed source extracts, with reviewers fact-checking against the same extracts. Every checklist bullet must map to >= 1 question; the checklists (not verbatim question text) are this plan's completeness contract for content.
- **Type consistency:** all banks import from `materialsTypes.ts` (single definition site); barrel re-exports; drill types re-exported via `materialsDrills.ts`; page imports only from the two barrels + progressTracker.
- **Test-count arithmetic (Task 13):** 47 existing + 24 bank (8 files x 3) + 2 barrel + 3 drills = 76.
