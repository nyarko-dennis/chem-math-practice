// Matches a single (possibly one-level-nested) \frac{...}{...} occurrence.
const FRAC = /\\frac\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/;

// An operand doesn't need wrapping parens if it's a single token (no top-level
// +/- after its first character), or if it's already a parenthesized group
// with an optional exponent suffix, e.g. (9x+2)^{2} or (9x+2)^2.
function wrapFracOperand(operand: string): string {
  const alreadyGrouped = /^\(.*\)(\^\{?[0-9a-zA-Z]+\}?)?$/.test(operand);
  const hasTopLevelSign = /[+-]/.test(operand.slice(1));
  return hasTopLevelSign && !alreadyGrouped ? `(${operand})` : operand;
}

// Flattens \frac{X}{Y} into X/Y so fractions typed naturally with a literal
// "/" (as MathLive serializes them) compare equal to canonical \frac answers.
// Runs multiple passes (bounded) to unwind fractions nested inside fractions.
function flattenFrac(latex: string): string {
  let out = latex;
  for (let i = 0; i < 3; i++) {
    const next = out.replace(new RegExp(FRAC.source, 'g'), (_match, num: string, den: string) => {
      return `${wrapFracOperand(num)}/${wrapFracOperand(den)}`;
    });
    if (next === out) break;
    out = next;
  }
  return out;
}

// Bridges MathLive keyboard input to the canonical answer strings used by the
// calculus generators/banks, without modifying the shared checkAnswer.
// Applied identically to both expected and actual before comparison, so it
// only merges formatting variants and cannot break a previously-equal pair.
export function normalizeCalculusLatex(latex: string): string {
  if (!latex) return latex;
  let out = latex;
  // MathLive sizing variants of parentheses
  out = out.replace(/\\mleft/g, '').replace(/\\mright/g, '');
  // \left( / \right) sizing, stripped up front so flattenFrac sees plain
  // parens (harmless duplication of what checkAnswer's normalizeLatex does).
  out = out.replace(/\\left/g, '').replace(/\\right/g, '');
  // \frac{X}{Y} -> X/Y (with parens only where needed), so MathLive's literal
  // "/" input compares equal to canonical \frac answers.
  out = flattenFrac(out);
  // \sin -> sin etc., so command form and plain-letters form compare equal
  out = out.replace(/\\(sin|cos|tan|sec|csc|cot|ln|log|pi)(?![a-zA-Z])/g, '$1');
  // ^{2} -> ^2 for single-token exponents, so braced and unbraced compare equal
  out = out.replace(/\^\{([0-9a-zA-Z])\}/g, '^$1');
  return out;
}
