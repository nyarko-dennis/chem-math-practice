import type { CalculusQuestion, CalculusCategory } from './calculusTypes.ts';
import { randomBasicRuleQuestion, randId } from './calculusGenerators.ts';
import { implicitHigherOrderQuestions } from './calculusImplicitBank.ts';
import { partialDifferentiationQuestions } from './calculusPartialBank.ts';
import { applicationsQuestions } from './calculusApplicationsBank.ts';

export type { CalculusQuestion, CalculusCategory } from './calculusTypes.ts';
export { implicitHigherOrderQuestions } from './calculusImplicitBank.ts';
export { partialDifferentiationQuestions } from './calculusPartialBank.ts';
export { applicationsQuestions } from './calculusApplicationsBank.ts';

export interface CalculusConfig {
  basicRules: boolean;
  implicitHigherOrder: boolean;
  partial: boolean;
  applications: boolean;
  count: number;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function assembleQuiz(config: CalculusConfig): CalculusQuestion[] {
  const categories: CalculusCategory[] = [];
  if (config.basicRules) categories.push('basicRules');
  if (config.implicitHigherOrder) categories.push('implicitHigherOrder');
  if (config.partial) categories.push('partial');
  if (config.applications) categories.push('applications');

  if (categories.length === 0) return [];

  const out: CalculusQuestion[] = [];
  for (let i = 0; i < config.count; i++) {
    const cat = pickRandom(categories);
    let q: CalculusQuestion;
    if (cat === 'basicRules') {
      q = randomBasicRuleQuestion();
    } else if (cat === 'implicitHigherOrder') {
      q = pickRandom(implicitHigherOrderQuestions);
    } else if (cat === 'partial') {
      q = pickRandom(partialDifferentiationQuestions);
    } else {
      q = pickRandom(applicationsQuestions);
    }
    // Fresh id per drawn question so repeats of a static item don't collide as React keys.
    out.push({ ...q, id: randId() });
  }
  return out;
}
