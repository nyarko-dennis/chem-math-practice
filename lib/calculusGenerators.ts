import type { CalculusQuestion, CalculusQuestionCore } from './calculusTypes.ts';

export function randId(): string {
  return Math.random().toString(36).slice(2, 11);
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Render a single "coef * x^exp" term with no sign handling for exp/coef edge cases.
// coef is used verbatim (may be negative) - used for the FIRST term of a polynomial.
function fmtTerm(coef: number, exp: number): string {
  if (exp === 0) return `${coef}`;
  const sign = coef < 0 ? '-' : '';
  const mag = Math.abs(coef);
  const coefStr = mag === 1 ? '' : `${mag}`;
  const varStr = exp === 1 ? 'x' : `x^{${exp}}`;
  return `${sign}${coefStr}${varStr}`;
}

// Join [coef, exp] terms (given in the desired order) into a canonical no-space polynomial.
function poly(terms: Array<[number, number]>): string {
  const nz = terms.filter(([c]) => c !== 0);
  if (nz.length === 0) return '0';
  let out = fmtTerm(nz[0][0], nz[0][1]);
  for (let i = 1; i < nz.length; i++) {
    const [c, e] = nz[i];
    out += (c < 0 ? '-' : '+') + fmtTerm(Math.abs(c), e);
  }
  return out;
}

export function buildPowerRule(p: { a: number; p: number; b: number; q: number }): CalculusQuestionCore {
  const prompt = poly([[p.a, p.p], [p.b, p.q]]);
  const correctAnswer = poly([[p.a * p.p, p.p - 1], [p.b * p.q, p.q - 1]]);
  return {
    category: 'basicRules',
    source: 'generated',
    instructions: 'Differentiate with respect to x:',
    prompt,
    correctAnswer,
    solution: `\\text{Power rule term-by-term: }\\frac{d}{dx}\\left(${prompt}\\right)=${correctAnswer}`,
  };
}

export function buildProductRule(p: { m: number; a: number; n: number; b: number }): CalculusQuestionCore {
  const uPow = p.m === 1 ? 'x' : `x^{${p.m}}`;
  const vPow = p.n === 1 ? 'x' : `x^{${p.n}}`;
  const prompt = `(${uPow}+${p.a})(${vPow}+${p.b})`;
  // expand: x^{m+n} + b x^{m} + a x^{n} + ab ; derivative:
  const correctAnswer = poly([
    [p.m + p.n, p.m + p.n - 1],
    [p.b * p.m, p.m - 1],
    [p.a * p.n, p.n - 1],
  ]);
  return {
    category: 'basicRules',
    source: 'generated',
    instructions: 'Differentiate using the product rule:',
    prompt,
    correctAnswer,
    solution: `\\text{With }u=${uPow}+${p.a},\\ v=${vPow}+${p.b}:\\ u'v+uv'=${correctAnswer}`,
  };
}

export function buildQuotientRule(p: { a: number; b: number; c: number; d: number }): CalculusQuestionCore {
  const numer = p.a * p.d - p.b * p.c;
  const prompt = `\\frac{${p.a}x+${p.b}}{${p.c}x+${p.d}}`;
  const correctAnswer = `\\frac{${numer}}{(${p.c}x+${p.d})^{2}}`;
  return {
    category: 'basicRules',
    source: 'generated',
    instructions: 'Differentiate using the quotient rule:',
    prompt,
    correctAnswer,
    solution: `\\text{Quotient rule: }\\frac{(${p.c}x+${p.d})(${p.a})-(${p.a}x+${p.b})(${p.c})}{(${p.c}x+${p.d})^{2}}=${correctAnswer}`,
  };
}

export function buildChainRule(p: { a: number; b: number; n: number }): CalculusQuestionCore {
  const prompt = `(${p.a}x+${p.b})^{${p.n}}`;
  const coef = p.n * p.a;
  const innerExp = p.n - 1;
  return {
    category: 'basicRules',
    source: 'generated',
    instructions: 'Differentiate using the chain rule:',
    prompt,
    correctAnswer: `${coef}(${p.a}x+${p.b})${innerExp === 1 ? '' : `^{${innerExp}}`}`,
    solution: `\\text{Chain rule: bring down }${p.n}\\text{, reduce power, times inner derivative }${p.a}:\\ ${coef}(${p.a}x+${p.b})${innerExp === 1 ? '' : `^{${innerExp}}`}`,
  };
}

export function buildTrigExpLog(p: { variant: 'sin' | 'cos' | 'exp' | 'ln'; a: number; k: number }): CalculusQuestionCore {
  let prompt = '';
  let correctAnswer = '';
  let solution = '';
  if (p.variant === 'sin') {
    prompt = `${p.a}\\sin(${p.k}x)`;
    correctAnswer = `${p.a * p.k}\\cos(${p.k}x)`;
    solution = `\\text{d/dx of }a\\sin(kx)=ak\\cos(kx):\\ ${correctAnswer}`;
  } else if (p.variant === 'cos') {
    prompt = `${p.a}\\cos(${p.k}x)`;
    correctAnswer = `${-p.a * p.k}\\sin(${p.k}x)`;
    solution = `\\text{d/dx of }a\\cos(kx)=-ak\\sin(kx):\\ ${correctAnswer}`;
  } else if (p.variant === 'exp') {
    prompt = `${p.a}e^{${p.k}x}`;
    correctAnswer = `${p.a * p.k}e^{${p.k}x}`;
    solution = `\\text{d/dx of }ae^{kx}=ake^{kx}:\\ ${correctAnswer}`;
  } else {
    prompt = `${p.a}\\ln(x)`;
    correctAnswer = `\\frac{${p.a}}{x}`;
    solution = `\\text{d/dx of }a\\ln(x)=\\frac{a}{x}:\\ ${correctAnswer}`;
  }
  return { category: 'basicRules', source: 'generated', instructions: 'Differentiate with respect to x:', prompt, correctAnswer, solution };
}

export function generatePowerRule(): CalculusQuestion {
  const pp = randInt(2, 5);
  const q = randInt(1, pp - 1);
  return { id: randId(), ...buildPowerRule({ a: randInt(1, 9), p: pp, b: randInt(1, 9), q }) };
}

export function generateProductRule(): CalculusQuestion {
  const n = randInt(1, 3);
  const m = randInt(n + 1, 4);
  return { id: randId(), ...buildProductRule({ m, a: randInt(1, 9), n, b: randInt(1, 9) }) };
}

export function generateQuotientRule(): CalculusQuestion {
  let a = 0, b = 0, c = 0, d = 0;
  do {
    a = randInt(1, 9); b = randInt(1, 9); c = randInt(1, 9); d = randInt(1, 9);
  } while (a * d - b * c === 0);
  return { id: randId(), ...buildQuotientRule({ a, b, c, d }) };
}

export function generateChainRule(): CalculusQuestion {
  return { id: randId(), ...buildChainRule({ a: randInt(2, 5), b: randInt(1, 9), n: randInt(2, 5) }) };
}

export function generateTrigExpLog(): CalculusQuestion {
  const variants: Array<'sin' | 'cos' | 'exp' | 'ln'> = ['sin', 'cos', 'exp', 'ln'];
  const variant = variants[randInt(0, 3)];
  const k = variant === 'ln' ? 1 : randInt(2, 9);
  return { id: randId(), ...buildTrigExpLog({ variant, a: randInt(2, 9), k }) };
}

export function randomBasicRuleQuestion(): CalculusQuestion {
  const gens = [generatePowerRule, generateProductRule, generateQuotientRule, generateChainRule, generateTrigExpLog];
  return gens[randInt(0, gens.length - 1)]();
}
