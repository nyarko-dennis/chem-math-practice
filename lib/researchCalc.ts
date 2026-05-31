// Generators for Yamane and Cochran sample-size practice problems.
// Source: docs/research/research.md — Yamane's & Cochran's formulas with worked examples.

export type CalcType = 'yamane' | 'cochranInfinite' | 'cochranFinite';

export interface CalcProblem {
  id: string;
  type: CalcType;
  prompt: string;
  given: { label: string; value: string }[];
  formula: string;
  rawAnswer: number;       // unrounded
  roundedAnswer: number;   // ceiling — conventional reporting
  workedSteps: string[];   // shown after submission
}

// ---------------- helpers ----------------

const STUDY_CONTEXTS_FINITE = [
  { setting: 'nurses working at a regional hospital', focus: 'job satisfaction' },
  { setting: 'pregnant women attending antenatal clinics in a municipality', focus: 'knowledge of pregnancy nutrition' },
  { setting: 'midwives in a district hospital', focus: 'use of the partograph' },
  { setting: 'final-year nursing students at a college', focus: 'infection prevention practices' },
  { setting: 'ICU nurses in a teaching hospital', focus: 'pain assessment practices' },
  { setting: 'community health workers in a sub-district', focus: 'malaria case-management practice' },
  { setting: 'patients enrolled in the diabetes clinic', focus: 'medication adherence' },
  { setting: 'staff nurses in two public hospitals', focus: 'work-related stress' },
  { setting: 'mothers attending the postnatal ward', focus: 'exclusive breastfeeding practice' },
  { setting: 'school-aged children in a rural community', focus: 'malaria prevention practices' },
];

const STUDY_CONTEXTS_INFINITE = [
  { setting: 'nurses', focus: 'knowledge of hand hygiene practices' },
  { setting: 'mothers in a district', focus: 'exclusive breastfeeding' },
  { setting: 'community health workers', focus: 'COVID-19 vaccination attitudes' },
  { setting: 'pregnant women', focus: 'knowledge of Rhesus incompatibility' },
  { setting: 'adults', focus: 'controlled hypertension' },
  { setting: 'healthcare providers', focus: 'adherence to infection-prevention guidelines' },
  { setting: 'adolescents', focus: 'awareness of HIV testing' },
  { setting: 'caregivers', focus: 'recognition of pneumonia danger signs' },
  { setting: 'nursing students', focus: 'knowledge of Hepatitis B prevention' },
  { setting: 'health workers', focus: 'pharmacovigilance practice' },
];

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let counter = 0;
function nextId(prefix: string): string {
  counter += 1;
  return `${prefix}-${Date.now().toString(36)}-${counter}`;
}

// ---------------- Yamane ----------------
// n = N / (1 + N · e²)

export function generateYamane(): CalcProblem {
  const N = randInt(200, 5000);
  // pick a margin of error from the standard set in the notes (0.05, 0.04, 0.03)
  const e = rand([0.05, 0.05, 0.05, 0.04, 0.03]);
  const ctx = rand(STUDY_CONTEXTS_FINITE);

  const denom = 1 + N * e * e;
  const raw = N / denom;
  const rounded = Math.ceil(raw);

  return {
    id: nextId('ym'),
    type: 'yamane',
    prompt: `A researcher wants to study ${ctx.focus} among ${ctx.setting}. The total population is N = ${N}, and the desired margin of error is e = ${e}. Using Yamane's formula, calculate the required sample size n.`,
    given: [
      { label: 'N (population)', value: `${N}` },
      { label: 'e (margin of error)', value: `${e}` },
    ],
    formula: 'n = N / (1 + N · e²)',
    rawAnswer: raw,
    roundedAnswer: rounded,
    workedSteps: [
      `n = ${N} / (1 + ${N} × ${e}²)`,
      `n = ${N} / (1 + ${N} × ${(e * e).toFixed(4)})`,
      `n = ${N} / (1 + ${(N * e * e).toFixed(4)})`,
      `n = ${N} / ${denom.toFixed(4)}`,
      `n ≈ ${raw.toFixed(2)}  →  round up to n = ${rounded}`,
    ],
  };
}

// ---------------- Cochran (infinite / unknown population) ----------------
// n₀ = Z² · p · (1 − p) / d²

export function generateCochranInfinite(): CalcProblem {
  const ctx = rand(STUDY_CONTEXTS_INFINITE);
  // p from typical KAP / prevalence values seen in the notes (0.45, 0.50, 0.65, etc.)
  const pOptions = [0.30, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 0.70];
  const p = rand(pOptions);
  const d = rand([0.05, 0.05, 0.05, 0.04, 0.03]);
  // 95% CI → Z = 1.96 (as per notes)
  const Z = 1.96;

  const raw = (Z * Z * p * (1 - p)) / (d * d);
  const rounded = Math.ceil(raw);

  return {
    id: nextId('co'),
    type: 'cochranInfinite',
    prompt: `A researcher wants to assess ${ctx.focus} among ${ctx.setting}. A previous study reported the prevalence as p = ${p} (i.e., ${Math.round(p * 100)}%). Using 95% confidence (Z = ${Z}) and a margin of error d = ${d}, apply Cochran's formula to determine the required sample size.`,
    given: [
      { label: 'Z (95% CI)', value: `${Z}` },
      { label: 'p (prevalence)', value: `${p}` },
      { label: '1 − p', value: `${(1 - p).toFixed(2)}` },
      { label: 'd (margin of error)', value: `${d}` },
    ],
    formula: 'n = Z² · p · (1 − p) / d²',
    rawAnswer: raw,
    roundedAnswer: rounded,
    workedSteps: [
      `n = (${Z})² × ${p} × (1 − ${p}) / (${d})²`,
      `n = ${(Z * Z).toFixed(4)} × ${p} × ${(1 - p).toFixed(2)} / ${(d * d).toFixed(4)}`,
      `n = ${(Z * Z * p * (1 - p)).toFixed(4)} / ${(d * d).toFixed(4)}`,
      `n ≈ ${raw.toFixed(2)}  →  round up to n = ${rounded}`,
    ],
  };
}

// ---------------- Cochran with finite-population correction ----------------
// n₀ = Z²·p·(1−p)/d²,  then  n = n₀ / (1 + (n₀ − 1)/N)

export function generateCochranFinite(): CalcProblem {
  const ctx = rand(STUDY_CONTEXTS_INFINITE);
  const p = rand([0.30, 0.40, 0.50, 0.60, 0.65]);
  const d = rand([0.05, 0.05, 0.04]);
  const Z = 1.96;
  const N = randInt(150, 1200);

  const n0 = (Z * Z * p * (1 - p)) / (d * d);
  const raw = n0 / (1 + (n0 - 1) / N);
  const rounded = Math.ceil(raw);

  return {
    id: nextId('cf'),
    type: 'cochranFinite',
    prompt: `A researcher wants to assess ${ctx.focus} among ${ctx.setting}. The eligible population is finite (N = ${N}). A previous study reported the prevalence as p = ${p}. Using Z = ${Z} (95% CI) and d = ${d}, apply Cochran's formula with the finite-population correction to determine the required sample size.`,
    given: [
      { label: 'Z (95% CI)', value: `${Z}` },
      { label: 'p', value: `${p}` },
      { label: '1 − p', value: `${(1 - p).toFixed(2)}` },
      { label: 'd', value: `${d}` },
      { label: 'N (finite population)', value: `${N}` },
    ],
    formula: 'n₀ = Z²·p·(1−p)/d²    then    n = n₀ / (1 + (n₀ − 1)/N)',
    rawAnswer: raw,
    roundedAnswer: rounded,
    workedSteps: [
      `Step 1 — compute n₀:`,
      `n₀ = (${Z})² × ${p} × ${(1 - p).toFixed(2)} / (${d})²`,
      `n₀ = ${(Z * Z * p * (1 - p)).toFixed(4)} / ${(d * d).toFixed(4)}`,
      `n₀ ≈ ${n0.toFixed(2)}`,
      `Step 2 — apply finite-population correction with N = ${N}:`,
      `n = ${n0.toFixed(2)} / (1 + (${n0.toFixed(2)} − 1)/${N})`,
      `n = ${n0.toFixed(2)} / (1 + ${((n0 - 1) / N).toFixed(4)})`,
      `n ≈ ${raw.toFixed(2)}  →  round up to n = ${rounded}`,
    ],
  };
}

// ---------------- session generator ----------------

export function generateCalcSession(
  count: number,
  mix: { yamane: boolean; cochranInfinite: boolean; cochranFinite: boolean },
): CalcProblem[] {
  const pool: (() => CalcProblem)[] = [];
  if (mix.yamane) pool.push(generateYamane);
  if (mix.cochranInfinite) pool.push(generateCochranInfinite);
  if (mix.cochranFinite) pool.push(generateCochranFinite);
  if (pool.length === 0) return [];

  const out: CalcProblem[] = [];
  for (let i = 0; i < count; i++) {
    out.push(rand(pool)());
  }
  return out;
}

// Accept either the rounded-up integer (the conventional reported sample size)
// or the unrounded value within a small tolerance.
export function isAnswerCorrect(p: CalcProblem, userInputRaw: string): boolean {
  const trimmed = userInputRaw.trim();
  if (!trimmed) return false;
  const value = Number(trimmed);
  if (!Number.isFinite(value)) return false;

  // Allow conventional rounded-up integer answer.
  if (value === p.roundedAnswer) return true;
  // Also accept Math.round (typical learner shortcut) and floor.
  if (value === Math.round(p.rawAnswer)) return true;
  if (value === Math.floor(p.rawAnswer)) return true;
  // Also accept the unrounded decimal within ±0.5 (numerical sloppiness).
  if (Math.abs(value - p.rawAnswer) < 0.5) return true;
  return false;
}
