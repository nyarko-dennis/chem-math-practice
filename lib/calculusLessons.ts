import type { CalculusQuestion } from './calculusTypes.ts';
import {
  generatePowerRule,
  generateProductRule,
  generateQuotientRule,
  generateChainRule,
  generateTrigExpLog,
  randId,
} from './calculusGenerators.ts';
import { implicitHigherOrderQuestions } from './calculusImplicitBank.ts';
import { partialDifferentiationQuestions } from './calculusPartialBank.ts';
import { applicationsQuestions } from './calculusApplicationsBank.ts';

export interface ExampleStep {
  explanation: string;
  latex: string;
}

export interface WorkedExample {
  id: string;
  title: string;
  prompt: string;
  steps: ExampleStep[];
  answer: string;
}

export interface CalculusLesson {
  id: string;
  title: string;
  intro: string;
  examples: WorkedExample[];
  tryIt: () => CalculusQuestion;
}

function drawFrom(bank: CalculusQuestion[]): CalculusQuestion {
  const q = bank[Math.floor(Math.random() * bank.length)];
  return { ...q, id: randId() };
}

// Bank slices by position (ids are ordered: ih-01..12 implicit, ih-13..24 higher-order, ih-25..30 parametric)
const implicitSlice = implicitHigherOrderQuestions.slice(0, 12);
const higherOrderSlice = implicitHigherOrderQuestions.slice(12, 24);
const parametricSlice = implicitHigherOrderQuestions.slice(24, 30);

export const calculusLessons: CalculusLesson[] = [
  {
    id: 'lesson-01',
    title: 'Power rule',
    intro: 'The power rule is the workhorse of differentiation. For any power of x, you bring the power down to the front as a multiplier, then knock the power down by one. It works for whole numbers, negatives, and fractions alike.',
    examples: [
      {
        id: 'ex-power-1',
        title: 'Differentiate y = 5x^3',
        prompt: 'y=5x^{3}',
        steps: [
          { explanation: 'The power rule says: bring the power down front as a multiplier, then reduce the power by one.', latex: '\\frac{d}{dx}x^{n}=nx^{n-1}' },
          { explanation: 'Here the power is 3. Bring the 3 down and multiply it by the 5 already in front, then drop the power from 3 to 2.', latex: '\\frac{dy}{dx}=5\\cdot 3x^{3-1}' },
          { explanation: 'Tidy up: 5 times 3 is 15.', latex: '\\frac{dy}{dx}=15x^{2}' },
        ],
        answer: '15x^{2}',
      },
      {
        id: 'ex-power-2',
        title: 'Differentiate y = 2x^4 + 7x',
        prompt: 'y=2x^{4}+7x',
        steps: [
          { explanation: 'When terms are added, differentiate each term on its own (term-by-term).', latex: '\\frac{dy}{dx}=\\frac{d}{dx}(2x^{4})+\\frac{d}{dx}(7x)' },
          { explanation: 'First term: bring down the 4, multiply by 2, drop the power to 3. Second term: the derivative of 7x is just 7, because x to the power 1 differentiates to 1.', latex: '\\frac{dy}{dx}=2\\cdot 4x^{3}+7' },
          { explanation: 'Tidy up.', latex: '\\frac{dy}{dx}=8x^{3}+7' },
        ],
        answer: '8x^{3}+7',
      },
    ],
    tryIt: generatePowerRule,
  },
  {
    id: 'lesson-02',
    title: 'Product rule',
    intro: 'When two expressions are multiplied together, you cannot just differentiate each and multiply. The product rule says: differentiate the first and keep the second, then keep the first and differentiate the second, and add the two pieces.',
    examples: [
      {
        id: 'ex-prod-1',
        title: 'Differentiate y = (x^2 + 3)(x^4 + 1)',
        prompt: 'y=(x^{2}+3)(x^{4}+1)',
        steps: [
          { explanation: 'Name the two factors: u is the first bracket, v is the second.', latex: 'u=x^{2}+3,\\quad v=x^{4}+1' },
          { explanation: 'Differentiate each factor separately with the power rule.', latex: "u'=2x,\\quad v'=4x^{3}" },
          { explanation: 'Apply the product rule: (derivative of first)(second) + (first)(derivative of second).', latex: "\\frac{dy}{dx}=u'v+uv'=2x(x^{4}+1)+(x^{2}+3)\\cdot 4x^{3}" },
          { explanation: 'Multiply out both pieces.', latex: '\\frac{dy}{dx}=2x^{5}+2x+4x^{5}+12x^{3}' },
          { explanation: 'Collect like terms: 2x^5 and 4x^5 combine to 6x^5.', latex: '\\frac{dy}{dx}=6x^{5}+12x^{3}+2x' },
        ],
        answer: '6x^{5}+12x^{3}+2x',
      },
      {
        id: 'ex-prod-2',
        title: 'Differentiate y = x^2 sin(x)',
        prompt: 'y=x^{2}\\sin(x)',
        steps: [
          { explanation: 'Name the factors: u is x squared, v is sin(x).', latex: 'u=x^{2},\\quad v=\\sin(x)' },
          { explanation: 'Differentiate each: the power rule gives 2x, and the derivative of sin is cos.', latex: "u'=2x,\\quad v'=\\cos(x)" },
          { explanation: 'Apply the product rule and leave the answer tidy - there are no like terms to collect here.', latex: '\\frac{dy}{dx}=2x\\sin(x)+x^{2}\\cos(x)' },
        ],
        answer: '2x\\sin(x)+x^{2}\\cos(x)',
      },
    ],
    tryIt: generateProductRule,
  },
  {
    id: 'lesson-03',
    title: 'Quotient rule',
    intro: 'For one expression divided by another, use the quotient rule: (derivative of top times bottom, minus top times derivative of bottom), all over the bottom squared. The subtraction order matters - top first.',
    examples: [
      {
        id: 'ex-quot-1',
        title: 'Differentiate y = (3x+4)/(9x+2)',
        prompt: 'y=\\frac{3x+4}{9x+2}',
        steps: [
          { explanation: 'Name the parts: u is the top (numerator), v is the bottom (denominator).', latex: 'u=3x+4,\\quad v=9x+2' },
          { explanation: 'Differentiate each part. Both are straight lines, so the derivatives are just the x-coefficients.', latex: "u'=3,\\quad v'=9" },
          { explanation: "Apply the quotient rule: (u'v - uv') over v squared.", latex: "\\frac{dy}{dx}=\\frac{u'v-uv'}{v^{2}}=\\frac{3(9x+2)-9(3x+4)}{(9x+2)^{2}}" },
          { explanation: 'Expand the top: 27x + 6 - 27x - 36. The x terms cancel.', latex: '\\frac{dy}{dx}=\\frac{-30}{(9x+2)^{2}}' },
        ],
        answer: '\\frac{-30}{(9x+2)^{2}}',
      },
      {
        id: 'ex-quot-2',
        title: 'Differentiate y = x^2/(x+1)',
        prompt: 'y=\\frac{x^{2}}{x+1}',
        steps: [
          { explanation: 'Name the parts: u is x squared on top, v is x+1 on the bottom.', latex: 'u=x^{2},\\quad v=x+1' },
          { explanation: 'Differentiate each part.', latex: "u'=2x,\\quad v'=1" },
          { explanation: 'Apply the quotient rule.', latex: '\\frac{dy}{dx}=\\frac{2x(x+1)-x^{2}\\cdot 1}{(x+1)^{2}}' },
          { explanation: 'Expand and simplify the top: 2x^2 + 2x - x^2 leaves x^2 + 2x.', latex: '\\frac{dy}{dx}=\\frac{x^{2}+2x}{(x+1)^{2}}' },
        ],
        answer: '\\frac{x^{2}+2x}{(x+1)^{2}}',
      },
    ],
    tryIt: generateQuotientRule,
  },
  {
    id: 'lesson-04',
    title: 'Chain rule',
    intro: 'The chain rule handles a function wrapped inside another function - like a bracket raised to a power, or sin of something. Differentiate the outside function first (leaving the inside untouched), then multiply by the derivative of the inside.',
    examples: [
      {
        id: 'ex-chain-1',
        title: 'Differentiate y = (2x+9)^3',
        prompt: 'y=(2x+9)^{3}',
        steps: [
          { explanation: 'Spot the structure: something (the inside, 2x+9) raised to the power 3 (the outside).', latex: '\\text{inside}=2x+9,\\quad \\text{outside}=(\\ )^{3}' },
          { explanation: 'Differentiate the outside with the power rule, keeping the inside exactly as it is: bring the 3 down, reduce the power to 2.', latex: '3(2x+9)^{2}' },
          { explanation: 'Now multiply by the derivative of the inside. The inside 2x+9 differentiates to 2.', latex: '\\frac{dy}{dx}=3(2x+9)^{2}\\cdot 2' },
          { explanation: 'Tidy up: 3 times 2 is 6.', latex: '\\frac{dy}{dx}=6(2x+9)^{2}' },
        ],
        answer: '6(2x+9)^{2}',
      },
      {
        id: 'ex-chain-2',
        title: 'Differentiate y = sin(5x)',
        prompt: 'y=\\sin(5x)',
        steps: [
          { explanation: 'Spot the structure: the inside is 5x, the outside is sin of something.', latex: '\\text{inside}=5x,\\quad \\text{outside}=\\sin(\\ )' },
          { explanation: 'Differentiate the outside: sin becomes cos, inside untouched.', latex: '\\cos(5x)' },
          { explanation: 'Multiply by the derivative of the inside: 5x differentiates to 5.', latex: '\\frac{dy}{dx}=5\\cos(5x)' },
        ],
        answer: '5\\cos(5x)',
      },
    ],
    tryIt: generateChainRule,
  },
  {
    id: 'lesson-05',
    title: 'Trig, exponential & log derivatives',
    intro: 'A few derivatives you simply memorise: sin goes to cos, cos goes to minus sin, e to the x stays itself, and ln(x) goes to 1 over x. Combined with the chain rule, these cover most functions you will meet.',
    examples: [
      {
        id: 'ex-trig-1',
        title: 'Differentiate y = 4sin(3x)',
        prompt: 'y=4\\sin(3x)',
        steps: [
          { explanation: 'The standard result: sin differentiates to cos. Because the inside is 3x (not just x), the chain rule also multiplies by 3.', latex: '\\frac{d}{dx}\\sin(kx)=k\\cos(kx)' },
          { explanation: 'Apply it with k = 3, keeping the 4 in front.', latex: '\\frac{dy}{dx}=4\\cdot 3\\cos(3x)' },
          { explanation: 'Tidy up.', latex: '\\frac{dy}{dx}=12\\cos(3x)' },
        ],
        answer: '12\\cos(3x)',
      },
      {
        id: 'ex-trig-2',
        title: 'Differentiate y = e^(2x)',
        prompt: 'y=e^{2x}',
        steps: [
          { explanation: 'e to the x is the function that is its own derivative. With 2x in the power, the chain rule multiplies by the derivative of 2x, which is 2.', latex: '\\frac{d}{dx}e^{kx}=ke^{kx}' },
          { explanation: 'Apply it with k = 2.', latex: '\\frac{dy}{dx}=2e^{2x}' },
        ],
        answer: '2e^{2x}',
      },
      {
        id: 'ex-trig-3',
        title: 'Differentiate y = ln(4x)',
        prompt: 'y=\\ln(4x)',
        steps: [
          { explanation: 'Use a log law first: ln(4x) splits into ln(4) + ln(x). ln(4) is just a constant number, and constants vanish when differentiated.', latex: 'y=\\ln(4)+\\ln(x)' },
          { explanation: 'The standard result: ln(x) differentiates to 1 over x.', latex: '\\frac{dy}{dx}=\\frac{1}{x}' },
        ],
        answer: '\\frac{1}{x}',
      },
    ],
    tryIt: generateTrigExpLog,
  },
  {
    id: 'lesson-06',
    title: 'Implicit differentiation',
    intro: 'Sometimes y is tangled up with x in one equation and you cannot make y the subject. Implicit differentiation says: differentiate both sides with respect to x, and every time you differentiate a y-term, tag on a dy/dx (because y secretly depends on x). Then solve for dy/dx.',
    examples: [
      {
        id: 'ex-impl-1',
        title: 'Find dy/dx for x^2 + y^2 = 25',
        prompt: 'x^{2}+y^{2}=25',
        steps: [
          { explanation: 'Differentiate every term with respect to x. The x-term is normal. The y-term gets differentiated too, but tagged with dy/dx. The constant 25 differentiates to 0.', latex: "2x+2y\\,y'=0" },
          { explanation: "Move the x-term across and divide by the coefficient of dy/dx (written y' for short).", latex: "2y\\,y'=-2x" },
          { explanation: 'Divide both sides by 2y.', latex: "y'=-\\frac{x}{y}" },
        ],
        answer: '-\\frac{x}{y}',
      },
      {
        id: 'ex-impl-2',
        title: 'Find dy/dx for x^2 y = 8',
        prompt: 'x^{2}y=8',
        steps: [
          { explanation: 'The left side is a product of x^2 and y, so use the product rule while differentiating. The y-factor contributes a dy/dx tag.', latex: "2xy+x^{2}y'=0" },
          { explanation: 'Isolate the dy/dx term.', latex: "x^{2}y'=-2xy" },
          { explanation: 'Divide by x squared and cancel one x.', latex: "y'=-\\frac{2y}{x}" },
        ],
        answer: '-\\frac{2y}{x}',
      },
    ],
    tryIt: () => drawFrom(implicitSlice),
  },
  {
    id: 'lesson-07',
    title: 'Higher-order derivatives',
    intro: 'The second derivative is simply the derivative of the derivative - differentiate once, then differentiate the result again. It measures how the slope itself is changing, which is why it shows up in acceleration and in max/min tests.',
    examples: [
      {
        id: 'ex-high-1',
        title: 'Find the second derivative of y = x^4',
        prompt: 'y=x^{4}',
        steps: [
          { explanation: 'Differentiate once with the power rule.', latex: "y'=4x^{3}" },
          { explanation: 'Differentiate the result again: bring down the 3, multiply by 4, drop the power to 2.', latex: "y''=12x^{2}" },
        ],
        answer: '12x^{2}',
      },
      {
        id: 'ex-high-2',
        title: 'Find the second derivative of y = e^(2x)',
        prompt: 'y=e^{2x}',
        steps: [
          { explanation: 'First derivative: e to the 2x stays itself, times the chain-rule factor 2.', latex: "y'=2e^{2x}" },
          { explanation: 'Differentiate again: another factor of 2 comes down.', latex: "y''=4e^{2x}" },
        ],
        answer: '4e^{2x}',
      },
    ],
    tryIt: () => drawFrom(higherOrderSlice),
  },
  {
    id: 'lesson-08',
    title: 'Parametric differentiation',
    intro: 'When x and y are each given in terms of a third variable t (a parameter), you do not need y as a function of x. Differentiate both with respect to t, then divide: dy/dx equals (dy/dt) over (dx/dt).',
    examples: [
      {
        id: 'ex-param-1',
        title: 'Find dy/dx for x = t^2, y = t^3',
        prompt: 'x=t^{2},\\ y=t^{3}',
        steps: [
          { explanation: 'Differentiate each equation with respect to t.', latex: '\\frac{dx}{dt}=2t,\\quad \\frac{dy}{dt}=3t^{2}' },
          { explanation: 'Divide dy/dt by dx/dt.', latex: '\\frac{dy}{dx}=\\frac{3t^{2}}{2t}' },
          { explanation: 'Cancel one t.', latex: '\\frac{dy}{dx}=\\frac{3t}{2}' },
        ],
        answer: '\\frac{3t}{2}',
      },
      {
        id: 'ex-param-2',
        title: 'Find dy/dx for x = 2t, y = t^2',
        prompt: 'x=2t,\\ y=t^{2}',
        steps: [
          { explanation: 'Differentiate each with respect to t.', latex: '\\frac{dx}{dt}=2,\\quad \\frac{dy}{dt}=2t' },
          { explanation: 'Divide and simplify: 2t over 2 is t.', latex: '\\frac{dy}{dx}=\\frac{2t}{2}=t' },
        ],
        answer: 't',
      },
    ],
    tryIt: () => drawFrom(parametricSlice),
  },
  {
    id: 'lesson-09',
    title: 'Partial differentiation',
    intro: 'For a function of two variables like f(x, y), a partial derivative asks: how does f change if I nudge just one variable and freeze the other? Differentiate with respect to the chosen variable and treat the other one exactly like a constant number.',
    examples: [
      {
        id: 'ex-part-1',
        title: 'Find both first partials of f = x^2 + 3xy + y^2',
        prompt: 'f(x,y)=x^{2}+3xy+y^{2}',
        steps: [
          { explanation: 'For the partial with respect to x, pretend y is a constant. x^2 gives 2x; 3xy is (3y) times x, so it gives 3y; y^2 is a pure constant, giving 0.', latex: '\\frac{\\partial f}{\\partial x}=2x+3y' },
          { explanation: 'For the partial with respect to y, pretend x is a constant. x^2 gives 0; 3xy gives 3x; y^2 gives 2y.', latex: '\\frac{\\partial f}{\\partial y}=3x+2y' },
        ],
        answer: '2x+3y',
      },
      {
        id: 'ex-part-2',
        title: 'Find the mixed partial f_xy of f = x^2 y^3',
        prompt: 'f(x,y)=x^{2}y^{3}',
        steps: [
          { explanation: 'First differentiate with respect to x (y frozen): y^3 rides along as a constant.', latex: 'f_{x}=2xy^{3}' },
          { explanation: 'Now differentiate that result with respect to y (x frozen): bring down the 3.', latex: 'f_{xy}=6xy^{2}' },
        ],
        answer: '6xy^{2}',
      },
    ],
    tryIt: () => drawFrom(partialDifferentiationQuestions),
  },
  {
    id: 'lesson-10',
    title: 'Applications: tangents, max/min, kinematics',
    intro: 'The derivative is a slope-measuring machine, and that has three big uses: finding tangent lines to curves, locating maximum and minimum points (where the slope is zero), and turning displacement into velocity and acceleration.',
    examples: [
      {
        id: 'ex-app-1',
        title: 'Tangent to y = x^2 at x = 3',
        prompt: 'y=x^{2},\\ x=3',
        steps: [
          { explanation: 'The derivative gives the slope of the curve at any point.', latex: '\\frac{dy}{dx}=2x' },
          { explanation: 'Substitute x = 3 to get the slope of the tangent there.', latex: '\\text{slope}=2(3)=6' },
          { explanation: 'The point on the curve is (3, 9). Use the straight-line formula y - y1 = m(x - x1).', latex: 'y-9=6(x-3)' },
          { explanation: 'Rearrange into y = mx + c form.', latex: 'y=6x-9' },
        ],
        answer: 'y=6x-9',
      },
      {
        id: 'ex-app-2',
        title: 'Minimum of y = x^2 - 6x + 5',
        prompt: 'y=x^{2}-6x+5',
        steps: [
          { explanation: 'At a maximum or minimum the slope is zero, so differentiate and set the result to 0.', latex: '\\frac{dy}{dx}=2x-6=0' },
          { explanation: 'Solve for x.', latex: 'x=3' },
          { explanation: 'Check it is a minimum: the second derivative is 2, which is positive, so the curve bends upwards (a valley, not a hill).', latex: '\\frac{d^{2}y}{dx^{2}}=2>0' },
          { explanation: 'Substitute x = 3 back to get the minimum value of y.', latex: 'y=9-18+5=-4' },
        ],
        answer: '-4',
      },
      {
        id: 'ex-app-3',
        title: 'Velocity from displacement: s = t^3 - 3t at t = 2',
        prompt: 's=t^{3}-3t,\\ t=2',
        steps: [
          { explanation: 'Velocity is the rate of change of displacement - differentiate s with respect to t.', latex: 'v=\\frac{ds}{dt}=3t^{2}-3' },
          { explanation: 'Substitute t = 2.', latex: 'v=3(4)-3=9' },
        ],
        answer: '9',
      },
    ],
    tryIt: () => drawFrom(applicationsQuestions),
  },
];
