import type { CalculusQuestion } from './calculusTypes.ts';

const impl = (
  id: string,
  instructions: string,
  prompt: string,
  correctAnswer: string,
  solution: string,
): CalculusQuestion => ({ id, category: 'implicitHigherOrder', source: 'static', instructions, prompt, correctAnswer, solution });

const IMPLICIT = 'Find dy/dx by implicit differentiation:';
const SECOND = 'Find the second derivative d^2y/dx^2:';
const THIRD = 'Find the third derivative d^3y/dx^3:';
const PARAM = 'Find dy/dx for the parametric equations:';

export const implicitHigherOrderQuestions: CalculusQuestion[] = [
  impl('ih-01', IMPLICIT, 'x^{2}+y^{2}=25', '-\\frac{x}{y}', `\\text{Differentiate: }2x+2yy'=0\\Rightarrow y'=-\\frac{x}{y}`),
  impl('ih-02', IMPLICIT, 'x^{2}-y^{2}=16', '\\frac{x}{y}', `\\text{Differentiate: }2x-2yy'=0\\Rightarrow y'=\\frac{x}{y}`),
  impl('ih-03', IMPLICIT, 'x^{2}+xy+y^{2}=7', '-\\frac{2x+y}{x+2y}', `\\text{Differentiate: }2x+y+xy'+2yy'=0\\Rightarrow y'=-\\frac{2x+y}{x+2y}`),
  impl('ih-04', IMPLICIT, 'x^{3}+y^{3}=6xy', '\\frac{2y-x^{2}}{y^{2}-2x}', `\\text{Differentiate: }3x^{2}+3y^{2}y'=6y+6xy'\\Rightarrow y'=\\frac{2y-x^{2}}{y^{2}-2x}`),
  impl('ih-05', IMPLICIT, 'xy=12', '-\\frac{y}{x}', `\\text{Product rule: }y+xy'=0\\Rightarrow y'=-\\frac{y}{x}`),
  impl('ih-06', IMPLICIT, 'x^{2}y=8', '-\\frac{2y}{x}', `\\text{Differentiate: }2xy+x^{2}y'=0\\Rightarrow y'=-\\frac{2y}{x}`),
  impl('ih-07', IMPLICIT, '\\sin(y)=x', '\\frac{1}{\\cos(y)}', `\\text{Differentiate: }\\cos(y)y'=1\\Rightarrow y'=\\frac{1}{\\cos(y)}`),
  impl('ih-08', IMPLICIT, 'y^{2}=4x', '\\frac{2}{y}', `\\text{Differentiate: }2yy'=4\\Rightarrow y'=\\frac{2}{y}`),
  impl('ih-09', IMPLICIT, 'x^{2}+4y^{2}=36', '-\\frac{x}{4y}', `\\text{Differentiate: }2x+8yy'=0\\Rightarrow y'=-\\frac{x}{4y}`),
  impl('ih-10', IMPLICIT, 'e^{y}=x', '\\frac{1}{e^{y}}', `\\text{Differentiate: }e^{y}y'=1\\Rightarrow y'=\\frac{1}{e^{y}}`),
  impl('ih-11', IMPLICIT, 'x+y=xy', '\\frac{y-1}{1-x}', `\\text{Differentiate: }1+y'=y+xy'\\Rightarrow y'=\\frac{y-1}{1-x}`),
  impl('ih-12', IMPLICIT, '\\cos(x)+\\sin(y)=1', '\\frac{\\sin(x)}{\\cos(y)}', `\\text{Differentiate: }-\\sin(x)+\\cos(y)y'=0\\Rightarrow y'=\\frac{\\sin(x)}{\\cos(y)}`),
  impl('ih-13', SECOND, 'y=x^{4}', '12x^{2}', `y'=4x^{3},\\ y''=12x^{2}`),
  impl('ih-14', SECOND, 'y=x^{5}', '20x^{3}', `y'=5x^{4},\\ y''=20x^{3}`),
  impl('ih-15', SECOND, 'y=x^{3}-4x^{2}+2x', '6x-8', `y'=3x^{2}-8x+2,\\ y''=6x-8`),
  impl('ih-16', SECOND, 'y=2x^{4}-x^{2}', '24x^{2}-2', `y'=8x^{3}-2x,\\ y''=24x^{2}-2`),
  impl('ih-17', SECOND, 'y=\\sin(x)', '-\\sin(x)', `y'=\\cos(x),\\ y''=-\\sin(x)`),
  impl('ih-18', SECOND, 'y=\\cos(x)', '-\\cos(x)', `y'=-\\sin(x),\\ y''=-\\cos(x)`),
  impl('ih-19', SECOND, 'y=e^{2x}', '4e^{2x}', `y'=2e^{2x},\\ y''=4e^{2x}`),
  impl('ih-20', SECOND, 'y=\\ln(x)', '-\\frac{1}{x^{2}}', `y'=\\frac{1}{x},\\ y''=-\\frac{1}{x^{2}}`),
  impl('ih-21', SECOND, 'y=\\frac{1}{x}', '\\frac{2}{x^{3}}', `y'=-x^{-2},\\ y''=2x^{-3}=\\frac{2}{x^{3}}`),
  impl('ih-22', SECOND, 'y=e^{-x}', 'e^{-x}', `y'=-e^{-x},\\ y''=e^{-x}`),
  impl('ih-23', THIRD, 'y=x^{3}', '6', `y'=3x^{2},\\ y''=6x,\\ y'''=6`),
  impl('ih-24', THIRD, 'y=3x^{5}-x^{3}', '180x^{2}-6', `y'=15x^{4}-3x^{2},\\ y''=60x^{3}-6x,\\ y'''=180x^{2}-6`),
  impl('ih-25', PARAM, 'x=t^{2},\\ y=t^{3}', '\\frac{3t}{2}', `\\frac{dy}{dx}=\\frac{3t^{2}}{2t}=\\frac{3t}{2}`),
  impl('ih-26', PARAM, 'x=t^{3},\\ y=t^{2}', '\\frac{2}{3t}', `\\frac{dy}{dx}=\\frac{2t}{3t^{2}}=\\frac{2}{3t}`),
  impl('ih-27', PARAM, 'x=2t,\\ y=t^{2}', 't', `\\frac{dy}{dx}=\\frac{2t}{2}=t`),
  impl('ih-28', PARAM, 'x=\\cos(t),\\ y=\\sin(t)', '-\\frac{\\cos(t)}{\\sin(t)}', `\\frac{dy}{dx}=\\frac{\\cos(t)}{-\\sin(t)}=-\\frac{\\cos(t)}{\\sin(t)}`),
  impl('ih-29', PARAM, 'x=t+1,\\ y=t^{2}', '2t', `\\frac{dy}{dx}=\\frac{2t}{1}=2t`),
  impl('ih-30', PARAM, 'x=t^{2},\\ y=2t', '\\frac{1}{t}', `\\frac{dy}{dx}=\\frac{2}{2t}=\\frac{1}{t}`),
];
