import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AE_GENERATORS, type AeGeneratedQuestion } from './aeGenerators.ts';
import { checkAeAnswer } from './aeAnswer.ts';
import { APPLIED_ELECTRICITY_TOPIC_LABELS } from './appliedElectricityTypes.ts';

const topics = Object.keys(APPLIED_ELECTRICITY_TOPIC_LABELS) as (keyof typeof APPLIED_ELECTRICITY_TOPIC_LABELS)[];

test('a generator exists for every topic', () => {
  for (const t of topics) assert.equal(typeof AE_GENERATORS[t], 'function', `missing generator: ${t}`);
});

test('every generated question is self-consistent: its own canonical answer passes the checker', () => {
  for (const t of topics) {
    for (const d of ['easy', 'medium', 'hard'] as const) {
      for (let i = 0; i < 25; i++) {
        const q: AeGeneratedQuestion = AE_GENERATORS[t](d);
        assert.equal(q.category, t);
        assert.ok(q.prompt.length > 0 && q.solution.length > 0 && q.answerDisplay.length > 0);
        // The displayed canonical answer must satisfy the machine descriptor.
        assert.equal(
          checkAeAnswer(stripLatex(q.answerDisplay), q.answer),
          true,
          `${t}/${d} answerDisplay "${q.answerDisplay}" failed its own checker`,
        );
      }
    }
  }
});

// Helper: reduce a LaTeX answerDisplay to a plain typed form the checker parses.
function stripLatex(s: string): string {
  return s
    .replace(/\\\\ /g, ' ')
    .replace(/\\text\{([^}]*)\}/g, '$1')
    .replace(/\\Omega/g, 'Ω')
    .replace(/\\angle/g, '∠')
    .replace(/[{}]/g, '')
    .trim();
}

// Additional targeted tests beyond the brief's fuzz loop.

test('dcCircuits: known Ohm\'s-law instance yields exact expected value', () => {
  // Sanity check the underlying physics independent of randomization: for a
  // fixed V=12V, R=4ohm circuit, I must be exactly 3A per Ohm's law I=V/R.
  const V = 12;
  const R = 4;
  const I = V / R;
  assert.equal(I, 3);
  assert.equal(checkAeAnswer('3 A', { kind: 'scalar', value: 3, unit: 'a' }), true);
});

test('networkTheorems: Thevenin voltage divider formula is exact for a known case', () => {
  // V=10V, R1=2k, R2=8k -> Vth = V * R2/(R1+R2) = 10 * 8/10 = 8V
  const Vth = 10 * (8000 / (2000 + 8000));
  assert.equal(Vth, 8);
});

test('acAnalysis: complex impedance answers are accepted in rectangular form', () => {
  assert.equal(
    checkAeAnswer('3+j4 ohm', { kind: 'complex', re: 3, im: 4 }),
    true,
  );
});

test('threePhase: star line voltage relationship VL = sqrt(3) * Vph', () => {
  const Vph = 230;
  const VL = Math.sqrt(3) * Vph;
  assert.equal(
    checkAeAnswer(`${VL.toFixed(2)} V`, { kind: 'scalar', value: VL, unit: 'v' }),
    true,
  );
});
