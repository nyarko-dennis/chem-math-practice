// Matches a single (possibly one-level-nested) \frac{...}{...} occurrence.
const FRAC = /\\frac\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/;

// A numerator doesn't need wrapping parens if it's a single token (no
// top-level +/- after its first character), or if it's already a
// parenthesized group with an optional exponent suffix, e.g. (9x+2)^{2} or
// (9x+2)^2. Numerator products are mathematically safe to leave bare:
// a*(b/c) = (ab)/c.
function wrapNumerator(operand: string): string {
  const alreadyGrouped = /^\(.*\)(\^\{?[0-9a-zA-Z]+\}?)?$/.test(operand);
  const hasTopLevelSign = /[+-]/.test(operand.slice(1));
  return hasTopLevelSign && !alreadyGrouped ? `(${operand})` : operand;
}

// A denominator, unlike a numerator, is NOT safe to leave bare unless it is a
// single atom: a/(bc) != (a/b)c, so a multi-factor denominator like "3t" must
// stay grouped once the fraction is flattened, or "2/3t" would be misread as
// "(2/3)*t". Atoms (integers, single letters, letter^exponent, e^{...},
// function calls, and already-parenthesized groups) are safe to leave bare.
const DENOMINATOR_ATOM_PATTERNS = [
  /^-?\d+$/,
  /^[a-zA-Z]$/,
  /^[a-zA-Z]\^\{?[0-9a-zA-Z]+\}?$/,
  /^e\^\{[^{}]+\}$/,
  /^\\?(sin|cos|tan|sec|csc|cot|ln|log)\([^()]+\)$/,
  /^\(.*\)(\^\{?[0-9a-zA-Z]+\}?)?$/,
];

function wrapDenominator(operand: string): string {
  const isAtom = DENOMINATOR_ATOM_PATTERNS.some((re) => re.test(operand));
  return isAtom ? operand : `(${operand})`;
}

// Flattens \frac{X}{Y} into X/Y so fractions typed naturally with a literal
// "/" (as MathLive serializes them) compare equal to canonical \frac answers.
// Runs multiple passes (bounded) to unwind fractions nested inside fractions.
function flattenFrac(latex: string): string {
  let out = latex;
  for (let i = 0; i < 3; i++) {
    const next = out.replace(new RegExp(FRAC.source, 'g'), (_match, num: string, den: string) => {
      return `${wrapNumerator(num)}/${wrapDenominator(den)}`;
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
