// Generated-numeric problem builders for the Applied Electricity course.
// One generator per topic, plus a barrel `AE_GENERATORS` used by the page,
// the Learn try-it widgets, and tests. No React/Next imports.

import type { AppliedElectricityTopic } from './appliedElectricityTypes.ts';
import type { AnswerDescriptor } from './aeAnswer.ts';
import type { Difficulty } from './generators.ts';

export interface AeGeneratedQuestion {
  id: string;
  category: AppliedElectricityTopic;
  source: 'generated';
  difficulty: Difficulty;
  instructions: string;
  prompt: string; // LaTeX, rendered with MathDisplay
  answer: AnswerDescriptor; // machine-checkable canonical answer
  answerDisplay: string; // LaTeX human-readable canonical answer (review/feedback screen)
  solution: string; // LaTeX worked solution
}

export function randId(): string {
  return Math.random().toString(36).slice(2, 11);
}

/** Pick a value by difficulty. 'medium' preserves the original behavior. */
function byDifficulty<T>(d: Difficulty, easy: T, medium: T, hard: T): T {
  return d === 'easy' ? easy : d === 'hard' ? hard : medium;
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number, decimals: number = 2): number {
  const v = Math.random() * (max - min) + min;
  const f = Math.pow(10, decimals);
  return Math.round(v * f) / f;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Round to `sig` significant figures (display only - the machine `answer`
// keeps full precision, so the 1%/2% checker tolerance easily absorbs any
// rounding shown to the student).
function roundSig(v: number, sig: number): number {
  if (v === 0) return 0;
  const sign = v < 0 ? -1 : 1;
  const av = Math.abs(v);
  const d = Math.ceil(Math.log10(av));
  const power = sig - d;
  const magnitude = Math.pow(10, power);
  return (sign * Math.round(av * magnitude)) / magnitude;
}

// Format an already-rounded base-unit number for display. Uses exponential
// notation for very small/large magnitudes (e.g. farads, henries in base
// units) instead of long decimal strings or SI prefixes - prefixes are
// avoided entirely because the test's `stripLatex` helper does plain text
// substitution and does not understand LaTeX prefix macros, so the safest
// canonical form is "fully-scaled base value + base unit" (per task brief).
function fmtBaseNum(v: number): string {
  if (v === 0) return '0';
  const av = Math.abs(v);
  if (av < 1e-3 || av >= 1e6) {
    return v.toExponential(3);
  }
  let s = v.toPrecision(4);
  if (/e/i.test(s)) {
    s = v.toFixed(6);
  }
  if (s.includes('.')) {
    s = s.replace(/0+$/, '').replace(/\.$/, '');
  }
  return s;
}

// Canonical unit LaTeX for each unit `checkAeAnswer` understands. Plain
// spaces (not `\\ ` backslash-space) separate value and unit so the test's
// stripLatex helper (which only strips a literal double-backslash+space)
// never leaves a stray backslash character for `parseScalar` to choke on.
const UNIT_TEX = {
  ohm: '\\Omega',
  v: '\\text{V}',
  a: '\\text{A}',
  w: '\\text{W}',
  var: '\\text{VAR}',
  va: '\\text{VA}',
  hz: '\\text{Hz}',
  f: '\\text{F}',
  h: '\\text{H}',
  s: '\\text{s}',
  'rad/s': '\\text{rad/s}',
} as const;

type AeUnit = keyof typeof UNIT_TEX;

function makeScalar(raw: number, unit: AeUnit): { answer: AnswerDescriptor; display: string } {
  const shown = roundSig(raw, 4);
  return {
    answer: { kind: 'scalar', value: raw, unit },
    display: `${fmtBaseNum(shown)} ${UNIT_TEX[unit]}`,
  };
}

// For quantities with no unit `checkAeAnswer` understands (e.g. charge in
// coulombs, energy in joules, power factor - dimensionless) the answer
// descriptor omits `unit` entirely so the checker skips the unit comparison
// and only checks magnitude. A cosmetic unit label may still be shown to the
// student (it is simply left unparsed by the checker).
function makeScalarNoUnit(raw: number, cosmeticUnitTex?: string): { answer: AnswerDescriptor; display: string } {
  const shown = roundSig(raw, 4);
  const numStr = fmtBaseNum(shown);
  return {
    answer: { kind: 'scalar', value: raw },
    display: cosmeticUnitTex ? `${numStr} ${cosmeticUnitTex}` : numStr,
  };
}

function makeComplex(reRaw: number, imRaw: number): { answer: AnswerDescriptor; display: string } {
  const shownRe = roundSig(reRaw, 4);
  const shownIm = roundSig(imRaw, 4);
  const sign = shownIm < 0 ? '-' : '+';
  const display = `${fmtBaseNum(shownRe)} ${sign} j${fmtBaseNum(Math.abs(shownIm))} \\Omega`;
  return {
    answer: { kind: 'complex', re: reRaw, im: imRaw },
    display,
  };
}

// ---------------------------------------------------------------------------
// dcCircuits: Ohm's law, series/parallel resistance, voltage/current
// dividers, power (P=VI=I^2R=V^2/R).
// ---------------------------------------------------------------------------
export function generateDcCircuits(d?: Difficulty): AeGeneratedQuestion {
  const diff = d ?? 'medium';
  const variant = pick(['ohmV', 'ohmI', 'ohmR', 'series', 'parallel', 'vdiv', 'idiv', 'power']);
  const rMax = byDifficulty(diff, 1000, 4700, 47000);
  const vMax = byDifficulty(diff, 12, 24, 48);

  let prompt = '';
  let solution = '';
  let raw = 0;
  let unit: AeUnit = 'v';

  switch (variant) {
    case 'ohmV': {
      const R = randInt(10, rMax);
      const I = randFloat(0.01, 5, 3);
      raw = I * R;
      unit = 'v';
      prompt = `\\text{A resistor } R=${R}\\ \\Omega \\text{ carries a current } I=${I}\\ \\text{A}. \\text{ Find the voltage } V \\text{ across it.}`;
      solution = `V = IR = (${I})(${R}) = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{V}`;
      break;
    }
    case 'ohmI': {
      const R = randInt(10, rMax);
      const V = randInt(1, vMax);
      raw = V / R;
      unit = 'a';
      prompt = `\\text{A resistor } R=${R}\\ \\Omega \\text{ has a voltage } V=${V}\\ \\text{V} \\text{ across it. Find the current } I.`;
      solution = `I = \\frac{V}{R} = \\frac{${V}}{${R}} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{A}`;
      break;
    }
    case 'ohmR': {
      const I = randFloat(0.01, 5, 3);
      const V = randInt(1, vMax);
      raw = V / I;
      unit = 'ohm';
      prompt = `\\text{A device draws } I=${I}\\ \\text{A} \\text{ when } V=${V}\\ \\text{V} \\text{ is applied. Find its resistance } R.`;
      solution = `R = \\frac{V}{I} = \\frac{${V}}{${I}} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\Omega`;
      break;
    }
    case 'series': {
      const R1 = randInt(10, rMax);
      const R2 = randInt(10, rMax);
      const R3 = randInt(10, rMax);
      raw = R1 + R2 + R3;
      unit = 'ohm';
      prompt = `\\text{Three resistors } R_1=${R1}\\ \\Omega, R_2=${R2}\\ \\Omega, R_3=${R3}\\ \\Omega \\text{ are connected in series. Find the equivalent resistance.}`;
      solution = `R_{eq} = R_1+R_2+R_3 = ${R1}+${R2}+${R3} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\Omega`;
      break;
    }
    case 'parallel': {
      const R1 = randInt(10, rMax);
      const R2 = randInt(10, rMax);
      raw = (R1 * R2) / (R1 + R2);
      unit = 'ohm';
      prompt = `\\text{Two resistors } R_1=${R1}\\ \\Omega \\text{ and } R_2=${R2}\\ \\Omega \\text{ are connected in parallel. Find the equivalent resistance.}`;
      solution = `R_{eq} = \\frac{R_1 R_2}{R_1+R_2} = \\frac{${R1}\\times${R2}}{${R1}+${R2}} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\Omega`;
      break;
    }
    case 'vdiv': {
      const V = randInt(5, vMax);
      const R1 = randInt(10, rMax);
      const R2 = randInt(10, rMax);
      raw = (V * R2) / (R1 + R2);
      unit = 'v';
      prompt = `\\text{A } ${V}\\ \\text{V} \\text{ source drives series resistors } R_1=${R1}\\ \\Omega \\text{ and } R_2=${R2}\\ \\Omega. \\text{ Find the voltage across } R_2.`;
      solution = `V_{R_2} = V\\frac{R_2}{R_1+R_2} = ${V}\\times\\frac{${R2}}{${R1}+${R2}} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{V}`;
      break;
    }
    case 'idiv': {
      const Itot = randFloat(0.05, 5, 3);
      const R1 = randInt(10, rMax);
      const R2 = randInt(10, rMax);
      raw = (Itot * R2) / (R1 + R2);
      unit = 'a';
      prompt = `\\text{A total current } I=${Itot}\\ \\text{A} \\text{ splits between parallel resistors } R_1=${R1}\\ \\Omega \\text{ and } R_2=${R2}\\ \\Omega. \\text{ Find the current through } R_1.`;
      solution = `I_{R_1} = I\\frac{R_2}{R_1+R_2} = ${Itot}\\times\\frac{${R2}}{${R1}+${R2}} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{A}`;
      break;
    }
    case 'power': {
      const sub = pick(['vi', 'i2r', 'v2r']);
      const R = randInt(10, rMax);
      unit = 'w';
      if (sub === 'vi') {
        const V = randInt(1, vMax);
        const I = randFloat(0.01, 5, 3);
        raw = V * I;
        prompt = `\\text{A device has } V=${V}\\ \\text{V} \\text{ and } I=${I}\\ \\text{A}. \\text{ Find the power dissipated.}`;
        solution = `P = VI = ${V}\\times${I} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{W}`;
      } else if (sub === 'i2r') {
        const I = randFloat(0.01, 5, 3);
        raw = I * I * R;
        prompt = `\\text{A current } I=${I}\\ \\text{A} \\text{ flows through } R=${R}\\ \\Omega. \\text{ Find the power dissipated.}`;
        solution = `P = I^2R = (${I})^2\\times${R} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{W}`;
      } else {
        const V = randInt(1, vMax);
        raw = (V * V) / R;
        prompt = `\\text{A voltage } V=${V}\\ \\text{V} \\text{ is applied across } R=${R}\\ \\Omega. \\text{ Find the power dissipated.}`;
        solution = `P = \\frac{V^2}{R} = \\frac{${V}^2}{${R}} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{W}`;
      }
      break;
    }
  }

  const { answer, display } = makeScalar(raw, unit);
  return {
    id: randId(),
    category: 'dcCircuits',
    source: 'generated',
    difficulty: diff,
    instructions: 'Solve for the requested quantity in this DC circuit:',
    prompt,
    answer,
    answerDisplay: display,
    solution,
  };
}

// ---------------------------------------------------------------------------
// networkTheorems: fixed template only (single source + two resistors) -
// Thevenin (Vth = V*R2/(R1+R2), Rth = R1||R2) and its Norton dual
// (In = V/R1 = Vth/Rth, Rn = Rth). No arbitrary topology.
// ---------------------------------------------------------------------------
export function generateNetworkTheorems(d?: Difficulty): AeGeneratedQuestion {
  const diff = d ?? 'medium';
  const vMax = byDifficulty(diff, 20, 50, 100);
  const rMax = byDifficulty(diff, 2000, 10000, 47000);
  const V = randInt(5, vMax);
  const R1 = randInt(100, rMax);
  const R2 = randInt(100, rMax);
  const Rth = (R1 * R2) / (R1 + R2);
  const Vth = (V * R2) / (R1 + R2);
  const In = V / R1;
  const Rn = Rth;

  const ask = pick(['vth', 'rth', 'in', 'rn']);
  const baseDesc = `\\text{A DC source } V=${V}\\ \\text{V} \\text{ is in series with } R_1=${R1}\\ \\Omega, \\text{ feeding a node from which } R_2=${R2}\\ \\Omega \\text{ connects to the reference node. The output terminals are taken across } R_2.`;

  let prompt = '';
  let solution = '';
  let raw = 0;
  let unit: AeUnit = 'v';

  if (ask === 'vth') {
    raw = Vth;
    unit = 'v';
    prompt = `${baseDesc} \\text{ Find the Thevenin voltage } V_{th} \\text{ seen from these terminals.}`;
    solution = `V_{th} = V\\frac{R_2}{R_1+R_2} = ${V}\\times\\frac{${R2}}{${R1}+${R2}} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{V}`;
  } else if (ask === 'rth') {
    raw = Rth;
    unit = 'ohm';
    prompt = `${baseDesc} \\text{ Find the Thevenin resistance } R_{th} \\text{ seen from these terminals (source zeroed).}`;
    solution = `R_{th} = R_1 \\| R_2 = \\frac{${R1}\\times${R2}}{${R1}+${R2}} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\Omega`;
  } else if (ask === 'in') {
    raw = In;
    unit = 'a';
    prompt = `${baseDesc} \\text{ Find the Norton current } I_N \\text{ (short-circuit current) at these terminals.}`;
    solution = `I_N = \\frac{V_{th}}{R_{th}} = \\frac{V}{R_1} = \\frac{${V}}{${R1}} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{A}`;
  } else {
    raw = Rn;
    unit = 'ohm';
    prompt = `${baseDesc} \\text{ Find the Norton resistance } R_N \\text{ seen from these terminals.}`;
    solution = `R_N = R_{th} = R_1 \\| R_2 = ${fmtBaseNum(roundSig(raw, 4))}\\ \\Omega`;
  }

  const { answer, display } = makeScalar(raw, unit);
  return {
    id: randId(),
    category: 'networkTheorems',
    source: 'generated',
    difficulty: diff,
    instructions: 'Apply Thevenin/Norton analysis to this fixed two-resistor network:',
    prompt,
    answer,
    answerDisplay: display,
    solution,
  };
}

// ---------------------------------------------------------------------------
// capacitors: Q=CV, E=1/2 CV^2, series (reciprocal-sum) / parallel (sum),
// RC time constant tau=RC.
// ---------------------------------------------------------------------------
export function generateCapacitors(d?: Difficulty): AeGeneratedQuestion {
  const diff = d ?? 'medium';
  const variant = pick(['qcv', 'energy', 'series', 'parallel', 'rc']);
  const cMaxUF = byDifficulty(diff, 10, 100, 1000);
  const vMax = byDifficulty(diff, 12, 50, 200);

  let prompt = '';
  let solution = '';
  let raw = 0;
  let unit: AeUnit | null = null;
  let cosmeticUnit: string | undefined;

  switch (variant) {
    case 'qcv': {
      const C_uF = randFloat(1, cMaxUF, 2);
      const C = C_uF * 1e-6;
      const V = randInt(1, vMax);
      raw = C * V;
      cosmeticUnit = '\\text{C}';
      prompt = `\\text{A capacitor } C=${C_uF}\\ \\mu\\text{F} \\text{ is charged to } V=${V}\\ \\text{V}. \\text{ Find the charge stored } Q.`;
      solution = `Q = CV = (${C_uF}\\times10^{-6})(${V}) = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{C}`;
      break;
    }
    case 'energy': {
      const C_uF = randFloat(1, cMaxUF, 2);
      const C = C_uF * 1e-6;
      const V = randInt(1, vMax);
      raw = 0.5 * C * V * V;
      cosmeticUnit = '\\text{J}';
      prompt = `\\text{A capacitor } C=${C_uF}\\ \\mu\\text{F} \\text{ is charged to } V=${V}\\ \\text{V}. \\text{ Find the energy stored } E.`;
      solution = `E = \\tfrac{1}{2}CV^2 = 0.5\\times(${C_uF}\\times10^{-6})\\times${V}^2 = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{J}`;
      break;
    }
    case 'series': {
      const C1 = randFloat(1, cMaxUF, 2) * 1e-6;
      const C2 = randFloat(1, cMaxUF, 2) * 1e-6;
      raw = (C1 * C2) / (C1 + C2);
      unit = 'f';
      prompt = `\\text{Two capacitors } C_1=${(C1 * 1e6).toFixed(2)}\\ \\mu\\text{F} \\text{ and } C_2=${(C2 * 1e6).toFixed(2)}\\ \\mu\\text{F} \\text{ are connected in series. Find the equivalent capacitance.}`;
      solution = `C_{eq} = \\frac{C_1 C_2}{C_1+C_2} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{F}`;
      break;
    }
    case 'parallel': {
      const C1 = randFloat(1, cMaxUF, 2) * 1e-6;
      const C2 = randFloat(1, cMaxUF, 2) * 1e-6;
      raw = C1 + C2;
      unit = 'f';
      prompt = `\\text{Two capacitors } C_1=${(C1 * 1e6).toFixed(2)}\\ \\mu\\text{F} \\text{ and } C_2=${(C2 * 1e6).toFixed(2)}\\ \\mu\\text{F} \\text{ are connected in parallel. Find the equivalent capacitance.}`;
      solution = `C_{eq} = C_1+C_2 = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{F}`;
      break;
    }
    case 'rc': {
      const C_uF = randFloat(1, cMaxUF, 2);
      const C = C_uF * 1e-6;
      const R = randInt(100, byDifficulty(diff, 2000, 10000, 100000));
      raw = R * C;
      unit = 's';
      prompt = `\\text{A capacitor } C=${C_uF}\\ \\mu\\text{F} \\text{ charges through a resistor } R=${R}\\ \\Omega. \\text{ Find the time constant } \\tau.`;
      solution = `\\tau = RC = ${R}\\times(${C_uF}\\times10^{-6}) = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{s}`;
      break;
    }
  }

  const { answer, display } = unit ? makeScalar(raw, unit) : makeScalarNoUnit(raw, cosmeticUnit);
  return {
    id: randId(),
    category: 'capacitors',
    source: 'generated',
    difficulty: diff,
    instructions: 'Solve for the requested quantity:',
    prompt,
    answer,
    answerDisplay: display,
    solution,
  };
}

// ---------------------------------------------------------------------------
// inductors: E=1/2 LI^2, v=L di/dt, series (sum) / parallel (reciprocal-sum),
// RL time constant tau=L/R.
// ---------------------------------------------------------------------------
export function generateInductors(d?: Difficulty): AeGeneratedQuestion {
  const diff = d ?? 'medium';
  const variant = pick(['energy', 'vLdidt', 'series', 'parallel', 'tau']);
  const lMaxMH = byDifficulty(diff, 10, 100, 1000);

  let prompt = '';
  let solution = '';
  let raw = 0;
  let unit: AeUnit | null = null;
  let cosmeticUnit: string | undefined;

  switch (variant) {
    case 'energy': {
      const L_mH = randFloat(1, lMaxMH, 2);
      const L = L_mH * 1e-3;
      const I = randFloat(0.1, 10, 2);
      raw = 0.5 * L * I * I;
      cosmeticUnit = '\\text{J}';
      prompt = `\\text{An inductor } L=${L_mH}\\ \\text{mH} \\text{ carries a current } I=${I}\\ \\text{A}. \\text{ Find the energy stored } E.`;
      solution = `E = \\tfrac{1}{2}LI^2 = 0.5\\times(${L_mH}\\times10^{-3})\\times${I}^2 = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{J}`;
      break;
    }
    case 'vLdidt': {
      const L_mH = randFloat(1, lMaxMH, 2);
      const L = L_mH * 1e-3;
      const dI = randFloat(0.1, 5, 2);
      const dt = randFloat(0.001, 0.1, 4);
      raw = L * (dI / dt);
      unit = 'v';
      prompt = `\\text{An inductor } L=${L_mH}\\ \\text{mH} \\text{ has current changing by } ${dI}\\ \\text{A} \\text{ in } ${dt}\\ \\text{s}. \\text{ Find the induced emf } v.`;
      solution = `v = L\\frac{di}{dt} = (${L_mH}\\times10^{-3})\\times\\frac{${dI}}{${dt}} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{V}`;
      break;
    }
    case 'series': {
      const L1 = randFloat(1, lMaxMH, 2) * 1e-3;
      const L2 = randFloat(1, lMaxMH, 2) * 1e-3;
      raw = L1 + L2;
      unit = 'h';
      prompt = `\\text{Two inductors } L_1=${(L1 * 1e3).toFixed(2)}\\ \\text{mH} \\text{ and } L_2=${(L2 * 1e3).toFixed(2)}\\ \\text{mH} \\text{ are connected in series. Find the equivalent inductance.}`;
      solution = `L_{eq} = L_1+L_2 = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{H}`;
      break;
    }
    case 'parallel': {
      const L1 = randFloat(1, lMaxMH, 2) * 1e-3;
      const L2 = randFloat(1, lMaxMH, 2) * 1e-3;
      raw = (L1 * L2) / (L1 + L2);
      unit = 'h';
      prompt = `\\text{Two inductors } L_1=${(L1 * 1e3).toFixed(2)}\\ \\text{mH} \\text{ and } L_2=${(L2 * 1e3).toFixed(2)}\\ \\text{mH} \\text{ are connected in parallel. Find the equivalent inductance.}`;
      solution = `L_{eq} = \\frac{L_1 L_2}{L_1+L_2} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{H}`;
      break;
    }
    case 'tau': {
      const L_mH = randFloat(1, lMaxMH, 2);
      const L = L_mH * 1e-3;
      const R = randInt(10, byDifficulty(diff, 100, 1000, 10000));
      raw = L / R;
      unit = 's';
      prompt = `\\text{An inductor } L=${L_mH}\\ \\text{mH} \\text{ is in series with } R=${R}\\ \\Omega. \\text{ Find the time constant } \\tau.`;
      solution = `\\tau = \\frac{L}{R} = \\frac{${L_mH}\\times10^{-3}}{${R}} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{s}`;
      break;
    }
  }

  const { answer, display } = unit ? makeScalar(raw, unit) : makeScalarNoUnit(raw, cosmeticUnit);
  return {
    id: randId(),
    category: 'inductors',
    source: 'generated',
    difficulty: diff,
    instructions: 'Solve for the requested quantity:',
    prompt,
    answer,
    answerDisplay: display,
    solution,
  };
}

// ---------------------------------------------------------------------------
// acFundamentals: Vrms=Vpeak/sqrt2, Vavg=2Vpeak/pi, f=1/T, T=1/f, omega=2*pi*f.
// ---------------------------------------------------------------------------
export function generateAcFundamentals(d?: Difficulty): AeGeneratedQuestion {
  const diff = d ?? 'medium';
  const variant = pick(['vrms', 'vavg', 'freq', 'period', 'omega']);
  const vpMax = byDifficulty(diff, 20, 100, 400);
  const fMax = byDifficulty(diff, 100, 1000, 10000);

  let prompt = '';
  let solution = '';
  let raw = 0;
  let unit: AeUnit = 'v';

  switch (variant) {
    case 'vrms': {
      const Vp = randInt(1, vpMax);
      raw = Vp / Math.SQRT2;
      unit = 'v';
      prompt = `\\text{A sinusoidal voltage has peak value } V_p=${Vp}\\ \\text{V}. \\text{ Find the rms value } V_{rms}.`;
      solution = `V_{rms} = \\frac{V_p}{\\sqrt2} = \\frac{${Vp}}{\\sqrt2} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{V}`;
      break;
    }
    case 'vavg': {
      const Vp = randInt(1, vpMax);
      raw = (2 * Vp) / Math.PI;
      unit = 'v';
      prompt = `\\text{A sinusoidal voltage has peak value } V_p=${Vp}\\ \\text{V}. \\text{ Find the half-cycle average value } V_{avg}.`;
      solution = `V_{avg} = \\frac{2V_p}{\\pi} = \\frac{2\\times${Vp}}{\\pi} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{V}`;
      break;
    }
    case 'freq': {
      const T = randFloat(0.0001, 0.1, 5);
      raw = 1 / T;
      unit = 'hz';
      prompt = `\\text{A waveform has period } T=${T}\\ \\text{s}. \\text{ Find the frequency } f.`;
      solution = `f = \\frac{1}{T} = \\frac{1}{${T}} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{Hz}`;
      break;
    }
    case 'period': {
      const f = randInt(1, fMax);
      raw = 1 / f;
      unit = 's';
      prompt = `\\text{A waveform has frequency } f=${f}\\ \\text{Hz}. \\text{ Find the period } T.`;
      solution = `T = \\frac{1}{f} = \\frac{1}{${f}} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{s}`;
      break;
    }
    case 'omega': {
      const f = randInt(1, fMax);
      raw = 2 * Math.PI * f;
      unit = 'rad/s';
      prompt = `\\text{A waveform has frequency } f=${f}\\ \\text{Hz}. \\text{ Find the angular frequency } \\omega.`;
      solution = `\\omega = 2\\pi f = 2\\pi\\times${f} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{rad/s}`;
      break;
    }
  }

  const { answer, display } = makeScalar(raw, unit);
  return {
    id: randId(),
    category: 'acFundamentals',
    source: 'generated',
    difficulty: diff,
    instructions: 'Solve for the requested quantity:',
    prompt,
    answer,
    answerDisplay: display,
    solution,
  };
}

// ---------------------------------------------------------------------------
// acAnalysis: Xl=omega*L, Xc=1/(omega*C), Z=R+jX for series RL/RC (complex).
// ---------------------------------------------------------------------------
export function generateAcAnalysis(d?: Difficulty): AeGeneratedQuestion {
  const diff = d ?? 'medium';
  const variant = pick(['xl', 'xc', 'zRL', 'zRC']);
  const fMax = byDifficulty(diff, 100, 1000, 10000);
  const rMax = byDifficulty(diff, 100, 1000, 10000);

  let prompt = '';
  let solution = '';
  let instructions = 'Solve for the requested quantity:';
  let scalarUnit: AeUnit | null = null;
  let raw = 0;
  let isComplex = false;
  let reRaw = 0;
  let imRaw = 0;

  switch (variant) {
    case 'xl': {
      const f = randInt(10, fMax);
      const L_mH = randFloat(1, byDifficulty(diff, 50, 200, 1000), 2);
      const L = L_mH * 1e-3;
      const omega = 2 * Math.PI * f;
      raw = omega * L;
      scalarUnit = 'ohm';
      prompt = `\\text{An inductor } L=${L_mH}\\ \\text{mH} \\text{ is driven at } f=${f}\\ \\text{Hz}. \\text{ Find the inductive reactance } X_L.`;
      solution = `X_L = 2\\pi f L = 2\\pi\\times${f}\\times(${L_mH}\\times10^{-3}) = ${fmtBaseNum(roundSig(raw, 4))}\\ \\Omega`;
      break;
    }
    case 'xc': {
      const f = randInt(10, fMax);
      const C_uF = randFloat(0.1, byDifficulty(diff, 10, 100, 1000), 3);
      const C = C_uF * 1e-6;
      const omega = 2 * Math.PI * f;
      raw = 1 / (omega * C);
      scalarUnit = 'ohm';
      prompt = `\\text{A capacitor } C=${C_uF}\\ \\mu\\text{F} \\text{ is driven at } f=${f}\\ \\text{Hz}. \\text{ Find the capacitive reactance } X_C.`;
      solution = `X_C = \\frac{1}{2\\pi f C} = \\frac{1}{2\\pi\\times${f}\\times(${C_uF}\\times10^{-6})} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\Omega`;
      break;
    }
    case 'zRL': {
      const R = randInt(10, rMax);
      const f = randInt(10, fMax);
      const L_mH = randFloat(1, byDifficulty(diff, 50, 200, 1000), 2);
      const L = L_mH * 1e-3;
      const omega = 2 * Math.PI * f;
      const Xl = omega * L;
      reRaw = R;
      imRaw = Xl;
      isComplex = true;
      instructions = 'Find the impedance in rectangular form (R + jX):';
      prompt = `\\text{A series RL circuit has } R=${R}\\ \\Omega, L=${L_mH}\\ \\text{mH}, \\text{ driven at } f=${f}\\ \\text{Hz}. \\text{ Find the impedance } Z.`;
      solution = `Z = R + j\\omega L = ${R} + j(2\\pi\\times${f}\\times${L_mH}\\times10^{-3}) = ${fmtBaseNum(roundSig(R, 4))} + j${fmtBaseNum(roundSig(Xl, 4))}\\ \\Omega`;
      break;
    }
    case 'zRC': {
      const R = randInt(10, rMax);
      const f = randInt(10, fMax);
      const C_uF = randFloat(0.1, byDifficulty(diff, 10, 100, 1000), 3);
      const C = C_uF * 1e-6;
      const omega = 2 * Math.PI * f;
      const Xc = 1 / (omega * C);
      reRaw = R;
      imRaw = -Xc;
      isComplex = true;
      instructions = 'Find the impedance in rectangular form (R + jX):';
      prompt = `\\text{A series RC circuit has } R=${R}\\ \\Omega, C=${C_uF}\\ \\mu\\text{F}, \\text{ driven at } f=${f}\\ \\text{Hz}. \\text{ Find the impedance } Z.`;
      solution = `Z = R - j\\frac{1}{\\omega C} = ${R} - j${fmtBaseNum(roundSig(Xc, 4))}\\ \\Omega`;
      break;
    }
  }

  const { answer, display } = isComplex ? makeComplex(reRaw, imRaw) : makeScalar(raw, scalarUnit as AeUnit);
  return {
    id: randId(),
    category: 'acAnalysis',
    source: 'generated',
    difficulty: diff,
    instructions,
    prompt,
    answer,
    answerDisplay: display,
    solution,
  };
}

// ---------------------------------------------------------------------------
// power: P (real), Q (reactive), S=sqrt(P^2+Q^2) (apparent), pf=cos(phi)=P/S.
// ---------------------------------------------------------------------------
export function generatePower(d?: Difficulty): AeGeneratedQuestion {
  const diff = d ?? 'medium';
  const variant = pick(['real', 'apparent', 'reactive', 'pf']);
  const vMax = byDifficulty(diff, 120, 240, 415);
  const iMax = byDifficulty(diff, 5, 20, 100);

  let prompt = '';
  let solution = '';
  let raw = 0;
  let unit: AeUnit | null = null;
  let cosmeticUnit: string | undefined;

  switch (variant) {
    case 'real': {
      const V = randInt(10, vMax);
      const I = randFloat(0.5, iMax, 2);
      const pf = randFloat(0.5, 1, 2);
      raw = V * I * pf;
      unit = 'w';
      prompt = `\\text{A load draws } I=${I}\\ \\text{A} \\text{ from a } V=${V}\\ \\text{V} \\text{ supply at power factor } \\cos\\varphi=${pf}. \\text{ Find the real power } P.`;
      solution = `P = VI\\cos\\varphi = ${V}\\times${I}\\times${pf} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{W}`;
      break;
    }
    case 'apparent': {
      const P = randInt(100, byDifficulty(diff, 1000, 5000, 20000));
      const Q = randInt(50, byDifficulty(diff, 800, 4000, 15000));
      raw = Math.sqrt(P * P + Q * Q);
      unit = 'va';
      prompt = `\\text{A load has real power } P=${P}\\ \\text{W} \\text{ and reactive power } Q=${Q}\\ \\text{VAR}. \\text{ Find the apparent power } S.`;
      solution = `S = \\sqrt{P^2+Q^2} = \\sqrt{${P}^2+${Q}^2} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{VA}`;
      break;
    }
    case 'reactive': {
      const P = randInt(100, byDifficulty(diff, 1000, 5000, 20000));
      const extra = randInt(50, byDifficulty(diff, 800, 4000, 15000));
      const S = Math.sqrt(P * P + extra * extra);
      raw = Math.sqrt(Math.max(S * S - P * P, 0));
      unit = 'var';
      prompt = `\\text{A load has real power } P=${P}\\ \\text{W} \\text{ and apparent power } S=${fmtBaseNum(roundSig(S, 4))}\\ \\text{VA}. \\text{ Find the reactive power } Q.`;
      solution = `Q = \\sqrt{S^2-P^2} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{VAR}`;
      break;
    }
    case 'pf': {
      const P = randInt(100, byDifficulty(diff, 1000, 5000, 20000));
      const Q = randInt(50, byDifficulty(diff, 800, 4000, 15000));
      const S = Math.sqrt(P * P + Q * Q);
      raw = P / S;
      prompt = `\\text{A load has real power } P=${P}\\ \\text{W} \\text{ and reactive power } Q=${Q}\\ \\text{VAR}. \\text{ Find the power factor } \\cos\\varphi = P/S.`;
      solution = `S=\\sqrt{P^2+Q^2}=${fmtBaseNum(roundSig(S, 4))}\\ \\text{VA}, \\quad \\cos\\varphi = \\frac{P}{S} = ${fmtBaseNum(roundSig(raw, 4))}`;
      break;
    }
  }

  const { answer, display } = unit ? makeScalar(raw, unit) : makeScalarNoUnit(raw, cosmeticUnit);
  return {
    id: randId(),
    category: 'power',
    source: 'generated',
    difficulty: diff,
    instructions: 'Solve for the requested quantity:',
    prompt,
    answer,
    answerDisplay: display,
    solution,
  };
}

// ---------------------------------------------------------------------------
// threePhase: star VL=sqrt3*Vph, delta IL=sqrt3*Iph, P=sqrt3*VL*IL*cos(phi).
// ---------------------------------------------------------------------------
export function generateThreePhase(d?: Difficulty): AeGeneratedQuestion {
  const diff = d ?? 'medium';
  const variant = pick(['starVL', 'starVph', 'deltaIL', 'power']);
  const vphMax = byDifficulty(diff, 120, 230, 400);
  const iphMax = byDifficulty(diff, 5, 20, 100);

  let prompt = '';
  let solution = '';
  let raw = 0;
  let unit: AeUnit = 'v';

  switch (variant) {
    case 'starVL': {
      const Vph = randInt(50, vphMax);
      raw = Math.sqrt(3) * Vph;
      unit = 'v';
      prompt = `\\text{A balanced star (wye) load has phase voltage } V_{ph}=${Vph}\\ \\text{V}. \\text{ Find the line voltage } V_L.`;
      solution = `V_L = \\sqrt3\\,V_{ph} = \\sqrt3\\times${Vph} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{V}`;
      break;
    }
    case 'starVph': {
      const VL = randInt(100, vphMax * 2);
      raw = VL / Math.sqrt(3);
      unit = 'v';
      prompt = `\\text{A balanced star (wye) load has line voltage } V_L=${VL}\\ \\text{V}. \\text{ Find the phase voltage } V_{ph}.`;
      solution = `V_{ph} = \\frac{V_L}{\\sqrt3} = \\frac{${VL}}{\\sqrt3} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{V}`;
      break;
    }
    case 'deltaIL': {
      const Iph = randFloat(1, iphMax, 2);
      raw = Math.sqrt(3) * Iph;
      unit = 'a';
      prompt = `\\text{A balanced delta load has phase current } I_{ph}=${Iph}\\ \\text{A}. \\text{ Find the line current } I_L.`;
      solution = `I_L = \\sqrt3\\,I_{ph} = \\sqrt3\\times${Iph} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{A}`;
      break;
    }
    case 'power': {
      const VL = randInt(100, vphMax * 2);
      const IL = randFloat(1, iphMax, 2);
      const pf = randFloat(0.6, 1, 2);
      raw = Math.sqrt(3) * VL * IL * pf;
      unit = 'w';
      prompt = `\\text{A balanced three-phase load has line voltage } V_L=${VL}\\ \\text{V}, \\text{ line current } I_L=${IL}\\ \\text{A}, \\text{ power factor } \\cos\\varphi=${pf}. \\text{ Find the total power } P.`;
      solution = `P = \\sqrt3\\,V_L I_L\\cos\\varphi = \\sqrt3\\times${VL}\\times${IL}\\times${pf} = ${fmtBaseNum(roundSig(raw, 4))}\\ \\text{W}`;
      break;
    }
  }

  const { answer, display } = makeScalar(raw, unit);
  return {
    id: randId(),
    category: 'threePhase',
    source: 'generated',
    difficulty: diff,
    instructions: 'Solve for the requested quantity:',
    prompt,
    answer,
    answerDisplay: display,
    solution,
  };
}

export const AE_GENERATORS: Record<AppliedElectricityTopic, (d?: Difficulty) => AeGeneratedQuestion> = {
  dcCircuits: generateDcCircuits,
  networkTheorems: generateNetworkTheorems,
  capacitors: generateCapacitors,
  inductors: generateInductors,
  acFundamentals: generateAcFundamentals,
  acAnalysis: generateAcAnalysis,
  power: generatePower,
  threePhase: generateThreePhase,
};
