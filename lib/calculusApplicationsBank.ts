import type { CalculusQuestion } from './calculusTypes.ts';

const ap = (
  id: string,
  instructions: string,
  prompt: string,
  correctAnswer: string,
  solution: string,
): CalculusQuestion => ({ id, category: 'applications', source: 'static', instructions, prompt, correctAnswer, solution });

const TAN_GRAD = 'Find the gradient of the tangent to the curve at the given x-value:';
const TAN_EQ = 'Find the equation of the tangent to the curve at the given point (answer as y=mx+c):';
const NORM_GRAD = 'Find the gradient of the normal to the curve at the given x-value:';
const STAT_X = 'Find the x-coordinate of the stationary point:';
const STAT_X_POS = 'Find the positive x-coordinate of a stationary point:';
const MIN_V = 'Find the minimum value of y:';
const MAX_V = 'Find the maximum value of y:';
const VEL_AT = 'The displacement is s(t) metres after t seconds. Find the velocity at the given time:';
const ACC_AT = 'The displacement is s(t) metres after t seconds. Find the acceleration at the given time:';
const RATE_AT = 'Find the rate of change at the given value:';

export const applicationsQuestions: CalculusQuestion[] = [
  ap('ap-01', TAN_GRAD, 'y=x^{2},\\ x=3', '6', '\\frac{dy}{dx}=2x.\\text{ At }x=3:\\ 2(3)=6.'),
  ap('ap-02', TAN_GRAD, 'y=x^{3},\\ x=2', '12', '\\frac{dy}{dx}=3x^{2}.\\text{ At }x=2:\\ 3(4)=12.'),
  ap('ap-03', TAN_GRAD, 'y=x^{2}-4x,\\ x=1', '-2', '\\frac{dy}{dx}=2x-4.\\text{ At }x=1:\\ 2-4=-2.'),
  ap('ap-04', TAN_EQ, 'y=x^{2}\\text{ at }(2,4)', 'y=4x-4', '\\text{Slope }=2x=4.\\ y-4=4(x-2)\\Rightarrow y=4x-4.'),
  ap('ap-05', TAN_EQ, 'y=x^{2}+1\\text{ at }(1,2)', 'y=2x', '\\text{Slope }=2x=2.\\ y-2=2(x-1)\\Rightarrow y=2x.'),
  ap('ap-06', TAN_EQ, 'y=x^{3}\\text{ at }(1,1)', 'y=3x-2', '\\text{Slope }=3x^{2}=3.\\ y-1=3(x-1)\\Rightarrow y=3x-2.'),
  ap('ap-07', NORM_GRAD, 'y=x^{2},\\ x=1', '-\\frac{1}{2}', '\\text{Tangent slope }=2x=2.\\text{ Normal slope }=-\\frac{1}{2}.'),
  ap('ap-08', NORM_GRAD, 'y=x^{3},\\ x=1', '-\\frac{1}{3}', '\\text{Tangent slope }=3x^{2}=3.\\text{ Normal slope }=-\\frac{1}{3}.'),
  ap('ap-09', 'Find the x-value where the tangent to the curve is horizontal:', 'y=x^{2}-6x', '3', '\\frac{dy}{dx}=2x-6=0\\Rightarrow x=3.'),
  ap('ap-10', 'Find the x-value where the gradient of the curve equals 10:', 'y=x^{2}+4x', '3', '\\frac{dy}{dx}=2x+4=10\\Rightarrow x=3.'),
  ap('ap-11', STAT_X, 'y=x^{2}-4x+1', '2', '\\frac{dy}{dx}=2x-4=0\\Rightarrow x=2.'),
  ap('ap-12', STAT_X, 'y=x^{2}+6x', '-3', '\\frac{dy}{dx}=2x+6=0\\Rightarrow x=-3.'),
  ap('ap-13', MIN_V, 'y=x^{2}-6x+5', '-4', '\\frac{dy}{dx}=2x-6=0\\Rightarrow x=3.\\ y=9-18+5=-4.'),
  ap('ap-14', MIN_V, 'y=x^{2}+2x+3', '2', '\\frac{dy}{dx}=2x+2=0\\Rightarrow x=-1.\\ y=1-2+3=2.'),
  ap('ap-15', MAX_V, 'y=-x^{2}+4x+1', '5', '\\frac{dy}{dx}=-2x+4=0\\Rightarrow x=2.\\ y=-4+8+1=5.'),
  ap('ap-16', STAT_X_POS, 'y=x^{3}-3x', '1', '\\frac{dy}{dx}=3x^{2}-3=0\\Rightarrow x=\\pm 1.\\text{ Positive: }x=1.'),
  ap('ap-17', STAT_X_POS, 'y=x^{3}-12x', '2', '\\frac{dy}{dx}=3x^{2}-12=0\\Rightarrow x=\\pm 2.\\text{ Positive: }x=2.'),
  ap('ap-18', 'Evaluate \\frac{d^{2}y}{dx^{2}} at the stationary point:', 'y=x^{2}-4x+1', '2', '\\frac{d^{2}y}{dx^{2}}=2\\text{ (constant), positive so the point is a minimum}.'),
  ap('ap-19', STAT_X_POS, 'y=2x^{3}-6x', '1', '\\frac{dy}{dx}=6x^{2}-6=0\\Rightarrow x=\\pm 1.\\text{ Positive: }x=1.'),
  ap('ap-20', MIN_V, 'y=x^{2}-2x', '-1', '\\frac{dy}{dx}=2x-2=0\\Rightarrow x=1.\\ y=1-2=-1.'),
  ap('ap-21', VEL_AT, 's=t^{2}+3t,\\ t=2', '7', 'v=\\frac{ds}{dt}=2t+3.\\text{ At }t=2:\\ 4+3=7.'),
  ap('ap-22', VEL_AT, 's=t^{3}-3t,\\ t=2', '9', 'v=\\frac{ds}{dt}=3t^{2}-3.\\text{ At }t=2:\\ 12-3=9.'),
  ap('ap-23', ACC_AT, 's=t^{3},\\ t=2', '12', 'v=3t^{2},\\ a=\\frac{d^{2}s}{dt^{2}}=6t.\\text{ At }t=2:\\ 12.'),
  ap('ap-24', VEL_AT, 's=5t^{2},\\ t=3', '30', 'v=\\frac{ds}{dt}=10t.\\text{ At }t=3:\\ 30.'),
  ap('ap-25', 'The displacement is s(t). Find the time t>0 when the velocity is zero:', 's=t^{3}-6t^{2}', '4', 'v=3t^{2}-12t=3t(t-4)=0\\Rightarrow t=4\\ (t>0).'),
  ap('ap-26', 'The displacement is s(t). Find the velocity as a function of t:', 's=t^{2}-4t', '2t-4', 'v=\\frac{ds}{dt}=2t-4.'),
  ap('ap-27', RATE_AT, 'A=x^{2},\\ x=5', '10', '\\frac{dA}{dx}=2x.\\text{ At }x=5:\\ 10.'),
  ap('ap-28', RATE_AT, 'V=x^{3},\\ x=2', '12', '\\frac{dV}{dx}=3x^{2}.\\text{ At }x=2:\\ 12.'),
  ap('ap-29', RATE_AT, 'A=\\pi r^{2},\\ r=3', '6\\pi', '\\frac{dA}{dr}=2\\pi r.\\text{ At }r=3:\\ 6\\pi.'),
  ap('ap-30', 'The displacement is s(t). Find the acceleration as a function of t:', 's=t^{3}-3t^{2}', '6t-6', 'v=3t^{2}-6t,\\ a=\\frac{dv}{dt}=6t-6.'),
];
