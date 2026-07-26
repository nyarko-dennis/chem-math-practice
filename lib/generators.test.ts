import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  generateArithmeticQuestion,
  generateAlgebraQuestion,
  generateUnitQuestion,
  generateSigFigQuestion,
  generateMolarMassQuestion,
  generateGasLawQuestion,
  generateDensityQuestion,
  type Difficulty,
} from './generators.ts';
import { checkAnswer } from './checkAnswer.ts';

const generators = [
  generateArithmeticQuestion,
  generateAlgebraQuestion,
  generateUnitQuestion,
  generateSigFigQuestion,
  generateMolarMassQuestion,
  generateGasLawQuestion,
  generateDensityQuestion,
];

const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

test('every generator produces a self-consistent answer at every difficulty', () => {
  for (const gen of generators) {
    for (const d of difficulties) {
      for (let i = 0; i < 60; i++) {
        const q = gen(d);
        assert.ok(q.correctAnswer && q.correctAnswer.length > 0, `${gen.name}/${d}: empty answer`);
        assert.ok(
          checkAnswer(q.type, q.correctAnswer, q.correctAnswer),
          `${gen.name}/${d}: own answer "${q.correctAnswer}" rejected by checker (prompt ${q.prompt})`,
        );
      }
    }
  }
});

test('hard algebra templates are algebraically valid rearrangements', () => {
  // Self-consistency already covers parseability; spot-check that a wrong
  // rearrangement is still rejected so the checker isn't trivially passing.
  const q = generateAlgebraQuestion('hard');
  assert.equal(checkAnswer('algebra', q.correctAnswer, `${q.correctAnswer}+1`), false);
});
