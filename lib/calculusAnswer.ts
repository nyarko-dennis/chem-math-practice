// Bridges MathLive keyboard input to the canonical answer strings used by the
// calculus generators/banks, without modifying the shared checkAnswer.
// Applied identically to both expected and actual before comparison, so it
// only merges formatting variants and cannot break a previously-equal pair.
export function normalizeCalculusLatex(latex: string): string {
  if (!latex) return latex;
  let out = latex;
  // MathLive sizing variants of parentheses
  out = out.replace(/\\mleft/g, '').replace(/\\mright/g, '');
  // \sin -> sin etc., so command form and plain-letters form compare equal
  out = out.replace(/\\(sin|cos|tan|sec|csc|cot|ln|log|pi)(?![a-zA-Z])/g, '$1');
  // ^{2} -> ^2 for single-token exponents, so braced and unbraced compare equal
  out = out.replace(/\^\{([0-9a-zA-Z])\}/g, '^$1');
  return out;
}
