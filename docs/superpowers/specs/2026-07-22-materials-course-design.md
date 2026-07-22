# Engineering Materials Course - Design Spec

## Context

Second course for the electrical engineering student (Robotics & Automation,
Level 100, Pentecost University; course code PENG102, lecturer Mr. Richard
Brace). Follows the Calculus course (shipped 2026-07-22, see
`2026-07-22-calculus-course-design.md`) as the second of 8 planned EE course
modules.

Official topic list (from
`electrical-engineering/Level100_EEE_Second_Semester_Courses_and_Topics.pdf`):
Intro; Atomic structure; Crystal structure; Imperfections; Solidification;
Ferrous materials; Steel production; Heat treatment; Iron-carbon diagram;
Mechanical properties; Testing; Corrosion; Composites; Smart & Advanced
materials. Full-syllabus coverage in this build (per user decision).

### Source material findings

Unlike Calculus, this course has genuine course materials in
`electrical-engineering/`:

- `ENGINEERING-MATERIALS.pdf` (~7k lines extracted) - the PRIMARY source: a
  full course module whose chapters map 1:1 onto the syllabus
  (classification, atomic structure/bonding, crystal structures BCC/FCC/HCP,
  solidification/solid solutions, diffusion, crystal imperfections,
  mechanical properties + hardness testing, iron-carbon diagram, iron/steel
  production, ferrous metals incl. AISI/SAE designation, stainless, tool
  steels, cast iron).
- `Engineering Materials Lecture 1 - 2. - 2026.pptx` (107 slides) - history
  of materials, classification, property definitions.
- `Engineering Materials Lecture 3.pdf` - classification detail.
- `Classification_of_Steel_Presentation [Autosaved] (1) (1).pdf` - AISI/SAE
  4-digit system.
- `The Smart and Advanced Materials Age.pptx`, `smart system
  presentation-1.pptx` - smart materials.
- `ENGINEERING MATERIALS Ppt.pptx` and `Ppt-1.pptx` are identical (15
  slides); `Engineering Material.pptx` (13 slides) - intro material.
- Callister textbook - copyrighted commercial text; NOT used as a source.

Question content is original writing grounded in these course materials
(facts paraphrased, never copied verbatim). Extracted text lives in the
session scratchpad under `materials/`.

## Format

Mirrors the Surgery course (the repo's most complete knowledge-course
pattern):

- **Quick Practice**: MCQ + True/False bank with per-question rationale.
- **Subjective Drills**: open-ended exam-style prompts with marks, a
  self-marking rubric (`RubricPoint[]`), and a plain-language model answer
  (every technical term glossed in everyday words - established user rule).

No Learn mode in this build (may be added later following the Calculus
pattern).

## Topics

8 quiz sections covering the 14 syllabus items:

| id | label |
|---|---|
| `introClassification` | Intro & Classification (materials science vs engineering, metal/polymer/ceramic/composite/electronic/smart classes, history) |
| `atomicCrystal` | Atomic Structure & Crystal Structures (bonding, BCC/FCC/HCP, crystalline vs amorphous) |
| `solidificationDefects` | Solidification, Solid Solutions & Imperfections (nucleation, dendrites, solid solutions, diffusion, point/line/planar defects) |
| `mechanicalTesting` | Mechanical Properties & Testing (stress/strain, elasticity, ductility, toughness, fatigue, creep, hardness tests, tensile test) |
| `ironCarbonHeat` | Iron-Carbon Diagram & Heat Treatment (phases, eutectoid, annealing/normalizing/quenching/tempering/case hardening) |
| `steelProduction` | Iron & Steel Production (pig iron, blast furnace, BOF/EAF) |
| `ferrousSteels` | Ferrous Metals & Steel Classification (carbon steel grades, AISI/SAE, alloying effects, stainless/tool steels, cast irons) |
| `corrosionAdvanced` | Corrosion, Composites & Smart Materials |

## Content volume

- ~240 MCQ/TF (~30 per topic), ids `<topic-prefix>-NNN`.
- ~24 drills (3 per topic). Drill kinds:

| kind | label |
|---|---|
| `defineTerms` | Define key materials terms |
| `classify` | Classify materials / steels / defects |
| `explainProcess` | Explain a process step by step |
| `compare` | Compare / contrast two things |
| `selectMaterial` | Select a material for an application & justify |

## Data model

Mirrors `lib/surgeryQuestions.ts` / `lib/surgeryDrills.ts`:

```typescript
// lib/materialsQuestions.ts
export type MaterialsTopic =
  | 'introClassification' | 'atomicCrystal' | 'solidificationDefects'
  | 'mechanicalTesting' | 'ironCarbonHeat' | 'steelProduction'
  | 'ferrousSteels' | 'corrosionAdvanced';
export const MATERIALS_TOPIC_LABELS: Record<MaterialsTopic, string>;
export interface MCQuestion { id; topic; type: 'mcq'; prompt; choices: string[]; correctIndex; rationale }
export interface TFQuestion { id; topic; type: 'tf'; prompt; correctAnswer: boolean; rationale }
export type MaterialsQuestion = MCQuestion | TFQuestion;
export const materialsQuestions: MaterialsQuestion[];

// lib/materialsDrills.ts
export type MaterialsDrillKind = 'defineTerms' | 'classify' | 'explainProcess' | 'compare' | 'selectMaterial';
export interface RubricPoint { id; label; detail; marks }
export interface MaterialsDrill { id; topic: MaterialsTopic; drillKind; type: 'drill'; prompt; marks; rubric: RubricPoint[]; modelAnswer }
export const materialsDrills: MaterialsDrill[];
```

Both files framework-free with `node --test` unit tests (well-formedness, id
uniqueness, topic tags, correctIndex in range, rubric marks summing to
`marks`) - the testing discipline added by the Calculus build, which the
older Surgery files lack.

## UI

`app/materials/page.tsx` mirrors `app/surgery/page.tsx`:

- Start screen with mode toggle (Quick Practice / Subjective Drills), topic
  checkboxes, question count.
- Quick mode: MCQ/TF with instant feedback + rationale.
- Drill mode: prompt -> student writes/thinks -> reveal rubric and
  plain-language model answer -> self-mark against rubric points.
- Resume + progress via `progressTracker`, courseId `'materials'`.
- Home card in `app/page.tsx`, accent cyan (`text-cyan-600`/`text-cyan-700`).

## Out of scope

- Learn mode (future amendment, Calculus pattern).
- The remaining 6 EE courses.
- Any changes to shared infra (`checkAnswer`, `progressTracker`, components).
