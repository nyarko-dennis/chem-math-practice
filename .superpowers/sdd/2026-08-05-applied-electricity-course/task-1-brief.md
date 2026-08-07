## Task 1: Shared types (`appliedElectricityTypes.ts`)

**Files:**
- Create: `lib/appliedElectricityTypes.ts`
- Test: (none - pure type/label module; consumed and thus type-checked by later tasks and `npm run build`)

**Interfaces:**
- Produces: `AppliedElectricityTopic` (8-key union), `APPLIED_ELECTRICITY_TOPIC_LABELS: Record<AppliedElectricityTopic,string>`, `MCQuestion`, `TFQuestion`, `AppliedElectricityQuestion`, `AeDrillKind`, `AE_DRILL_LABELS`, `RubricPoint`, `AeDrill`.

- [ ] **Step 1: Write the module**

```ts
export type AppliedElectricityTopic =
  | 'dcCircuits'
  | 'networkTheorems'
  | 'capacitors'
  | 'inductors'
  | 'acFundamentals'
  | 'acAnalysis'
  | 'power'
  | 'threePhase';

export const APPLIED_ELECTRICITY_TOPIC_LABELS: Record<AppliedElectricityTopic, string> = {
  dcCircuits: 'DC Circuits (Ohm’s law, series/parallel, dividers, power)',
  networkTheorems: 'Network Theorems (Thevenin, Norton, superposition, max power, KCL/KVL)',
  capacitors: 'Capacitors (charge, energy, series/parallel, RC)',
  inductors: 'Inductors (energy, series/parallel, RL, induced emf)',
  acFundamentals: 'AC Fundamentals (peak/rms/average, period, frequency)',
  acAnalysis: 'AC Analysis (reactance, impedance, phasors)',
  power: 'Electrical Power (real/reactive/apparent, power factor)',
  threePhase: 'Three-Phase Systems (star/delta, line/phase, total power)',
};

export interface MCQuestion {
  id: string;
  topic: AppliedElectricityTopic;
  type: 'mcq';
  prompt: string; // may contain LaTeX
  choices: string[];
  correctIndex: number;
  rationale: string;
}

export interface TFQuestion {
  id: string;
  topic: AppliedElectricityTopic;
  type: 'tf';
  prompt: string;
  correctAnswer: boolean;
  rationale: string;
}

export type AppliedElectricityQuestion = MCQuestion | TFQuestion;

export type AeDrillKind =
  | 'deriveEquivalent'
  | 'analyseCircuit'
  | 'explainConcept'
  | 'compare'
  | 'computeStepwise';

export const AE_DRILL_LABELS: Record<AeDrillKind, string> = {
  deriveEquivalent: 'Derive an equivalent circuit (Thevenin/Norton)',
  analyseCircuit: 'Analyse a circuit for the requested quantities',
  explainConcept: 'Explain a concept or law in plain terms',
  compare: 'Compare / contrast two ideas',
  computeStepwise: 'Compute a result showing each step',
};

export interface RubricPoint {
  id: string;
  label: string;
  detail: string;
  marks: number;
}

export interface AeDrill {
  id: string;
  topic: AppliedElectricityTopic;
  drillKind: AeDrillKind;
  type: 'drill';
  prompt: string;
  marks: number;
  rubric: RubricPoint[];
  modelAnswer: string;
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no new errors referencing `appliedElectricityTypes.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/appliedElectricityTypes.ts
git commit -m "feat(applied-electricity): shared question/drill types"
```

---

