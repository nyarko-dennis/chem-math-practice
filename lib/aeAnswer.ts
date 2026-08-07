// Pure numeric/complex answer checker for the Applied Electricity course.
// No React/Next imports, no globals — safe to call from generators, the
// practice page, and Learn try-it widgets alike.

export type AnswerDescriptor =
  | { kind: 'scalar'; value: number; unit?: string; tol?: number }
  | { kind: 'complex'; re: number; im: number; tol?: number };

// SI prefixes are case-sensitive: m (milli, 1e-3) vs M (mega, 1e6),
// and both k and K mean kilo (1e3) — calculators/students use either.
const SI_PREFIXES: Record<string, number> = {
  p: 1e-12,
  n: 1e-9,
  u: 1e-6,
  'µ': 1e-6, // µ (micro sign)
  'μ': 1e-6, // μ (greek mu, visually identical, distinct codepoint)
  m: 1e-3,
  k: 1e3,
  K: 1e3,
  M: 1e6,
  G: 1e9,
};

// Unit synonyms collapse to a canonical dimension token. Longer/more-specific
// keys are matched before shorter ones by iterating sorted-by-length below.
const UNIT_SYNONYMS: Record<string, string> = {
  'ohm': 'ohm',
  'ohms': 'ohm',
  'Ω': 'ohm', // Ω
  'hz': 'hz',
  'v': 'v',
  'volt': 'v',
  'volts': 'v',
  'a': 'a',
  'amp': 'a',
  'amps': 'a',
  'ampere': 'a',
  'amperes': 'a',
  'f': 'f',
  'farad': 'f',
  'farads': 'f',
  'h': 'h',
  'henry': 'h',
  'henries': 'h',
  'w': 'w',
  'watt': 'w',
  'watts': 'w',
  'var': 'var',
  'va': 'va',
  's': 's',
  'sec': 's',
  'second': 's',
  'seconds': 's',
  'rad/s': 'rad/s',
};

// Unit words, longest-first, so e.g. "seconds" matches before "s" would
// otherwise be tried as a prefix-consuming substring.
const UNIT_WORDS = Object.keys(UNIT_SYNONYMS).sort((a, b) => b.length - a.length);

function canonicalUnit(word: string): string | null {
  const w = word.trim();
  if (w === '') return null;
  const hit = UNIT_SYNONYMS[w] ?? UNIT_SYNONYMS[w.toLowerCase()];
  return hit ?? null;
}

/**
 * Parse a scalar magnitude with an optional SI prefix and unit, e.g.
 * "4.7 kΩ", "10mA", "2.2 µF", "50". Returns null if no number is found.
 */
export function parseScalar(input: string): { value: number; unit: string | null } | null {
  if (typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (trimmed === '') return null;

  // Number, optionally followed by whitespace, then the rest (prefix+unit).
  const m = trimmed.match(/^([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(.*)$/);
  if (!m) return null;

  const numStr = m[1];
  let rest = m[2].trim();
  const num = Number(numStr);
  if (!Number.isFinite(num)) return null;

  if (rest === '') {
    return { value: num, unit: null };
  }

  // Try to peel off a single-character SI prefix from the front of `rest`.
  // Two cases are accepted:
  //   1. Prefix + nothing else (e.g. "1M", "1m") -> scaled bare number.
  //      Safe because the prefix-letter set (p n u µ μ m k K M G) and the
  //      canonical unit-letter set (h f v a s w) are disjoint, so a lone
  //      prefix character is never itself a valid unit.
  //   2. Prefix + a word that resolves to a known unit (e.g. "mA" -> m + a).
  // Anything else (e.g. a bare "a" for amps) is left for the plain
  // unit-word lookup below, so single-letter units aren't misread as prefixes.
  let value = num;
  let unitPart = rest;

  const firstChar = rest.charAt(0);
  if (Object.prototype.hasOwnProperty.call(SI_PREFIXES, firstChar)) {
    const remainder = rest.slice(1);
    if (remainder.trim() === '') {
      return { value: num * SI_PREFIXES[firstChar], unit: null };
    }
    const remainderCanonical = matchUnitWord(remainder);
    if (remainderCanonical !== null) {
      value = num * SI_PREFIXES[firstChar];
      unitPart = remainder;
    }
  }

  const unit = matchUnitWord(unitPart);
  if (unit === null) {
    // Unrecognized unit text: still return the numeric value scaled only by
    // whatever prefix we already committed to (none, since we required the
    // remainder to resolve above). Treat as no unit if nothing matched at all.
    if (unitPart.trim() === '') {
      return { value, unit: null };
    }
    return { value: num, unit: null };
  }

  return { value, unit };
}

function matchUnitWord(text: string): string | null {
  const t = text.trim();
  if (t === '') return null;
  for (const word of UNIT_WORDS) {
    if (t.toLowerCase() === word.toLowerCase() || t === word) {
      return canonicalUnit(t);
    }
  }
  return canonicalUnit(t);
}

/**
 * Parse a complex number in rectangular (a+jb, a+bj, a+bi, a-jb, bare real,
 * bare imaginary) or polar (M∠θ, M<θ, "M angle θ") form. Angle is in degrees.
 * Any trailing unit text is stripped before parsing.
 */
export function parseComplex(input: string): { re: number; im: number } | null {
  if (typeof input !== 'string') return null;
  let s = input.trim();
  if (s === '') return null;

  // Strip a trailing unit word (and any deg/° angle-unit noise handled below).
  s = stripTrailingUnit(s);

  // Polar forms: M∠θ, M<θ, "M angle θ" (optionally followed by deg/°).
  const polarMatch = s.match(
    /^([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:∠|<|angle)\s*([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:deg|°)?\s*$/i
  );
  if (polarMatch) {
    const mag = Number(polarMatch[1]);
    const thetaDeg = Number(polarMatch[2]);
    if (!Number.isFinite(mag) || !Number.isFinite(thetaDeg)) return null;
    const thetaRad = (thetaDeg * Math.PI) / 180;
    return { re: mag * Math.cos(thetaRad), im: mag * Math.sin(thetaRad) };
  }

  // Rectangular forms.
  const cleaned = s.replace(/\s+/g, '');

  // a+jb / a-jb (j or i before the imaginary coefficient)
  let m = cleaned.match(
    /^([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)([+-])[ji](\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)$/
  );
  if (m) {
    const re = Number(m[1]);
    const sign = m[2] === '-' ? -1 : 1;
    const im = sign * Number(m[3]);
    if (Number.isFinite(re) && Number.isFinite(im)) return { re, im };
  }

  // a+bj / a-bi (j or i after the imaginary coefficient)
  m = cleaned.match(
    /^([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)([+-])(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)[ji]$/
  );
  if (m) {
    const re = Number(m[1]);
    const sign = m[2] === '-' ? -1 : 1;
    const im = sign * Number(m[3]);
    if (Number.isFinite(re) && Number.isFinite(im)) return { re, im };
  }

  // Bare imaginary: jb, bj, -jb, -bj (no real part at all).
  m = cleaned.match(/^([+-]?)[ji](\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)$/);
  if (m) {
    const sign = m[1] === '-' ? -1 : 1;
    const im = sign * Number(m[2]);
    if (Number.isFinite(im)) return { re: 0, im };
  }
  m = cleaned.match(/^([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)[ji]$/);
  if (m) {
    const im = Number(m[1]);
    if (Number.isFinite(im)) return { re: 0, im };
  }

  // Bare real number.
  m = cleaned.match(/^([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)$/);
  if (m) {
    const re = Number(m[1]);
    if (Number.isFinite(re)) return { re, im: 0 };
  }

  return null;
}

// Removes a trailing unit word (ohm, v, a, hz, etc.) from a complex-number
// string, e.g. "5∠53.13° V" -> "5∠53.13°", "3+j4 ohm" -> "3+j4".
// This intentionally leaves deg/° alone since those are angle markers
// consumed by the polar regex itself, not electrical units.
function stripTrailingUnit(s: string): string {
  const trimmed = s.trim();
  const parts = trimmed.split(/\s+/);
  if (parts.length <= 1) return trimmed;
  const last = parts[parts.length - 1];
  const lastNoDeg = last.replace(/(deg|°)$/i, '');
  if (lastNoDeg === '') return trimmed; // last token was purely deg/°, keep it
  if (matchUnitWord(lastNoDeg) !== null) {
    return parts.slice(0, -1).join(' ');
  }
  return trimmed;
}

export function checkAeAnswer(user: string, expected: AnswerDescriptor): boolean {
  if (expected.kind === 'scalar') {
    const parsed = parseScalar(user);
    if (parsed === null) return false;
    const tol = expected.tol ?? 0.01;
    const diff = Math.abs(parsed.value - expected.value);
    const allowed = tol * Math.max(Math.abs(expected.value), 1e-9);
    if (diff > allowed) return false;

    if (expected.unit && parsed.unit) {
      const expCanonical = canonicalUnit(expected.unit) ?? expected.unit;
      if (parsed.unit !== expCanonical) return false;
    }
    return true;
  }

  // complex
  const parsed = parseComplex(user);
  if (parsed === null) return false;
  const tol = expected.tol ?? 0.02;
  const dre = parsed.re - expected.re;
  const dim = parsed.im - expected.im;
  const dist = Math.hypot(dre, dim);
  const allowed = tol * Math.max(Math.hypot(expected.re, expected.im), 1e-9);
  return dist <= allowed;
}
