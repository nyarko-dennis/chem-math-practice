// Answer comparison for the generated chem/math questions.
// Handles LaTeX normalization, numeric tolerance, significant-figure rules,
// and algebraic equivalence (so any equivalent rearrangement is accepted).

import { areEquivalent } from './mathEquivalence.ts';

// Basic normalization for comparing LaTeX strings
export function normalizeLatex(latex: string): number | string {
    if (!latex) return '';

    // Remove all whitespace
    let norm = latex.replace(/\s+/g, '');

    // Remove \left and \right
    norm = norm.replace(/\\left/g, '').replace(/\\right/g, '');

    // Remove \text{...} but keep the content inside (iteratively for safety)
    while (norm.includes('\\text{')) {
        norm = norm.replace(/\\text{([^{}]+)}/g, '$1');
    }

    // Remove $$ wrappers
    norm = norm.replace(/^\$\$|\$\$$/g, '');

    return norm;
}

/** Parse a broad range of numeric/LaTeX inputs into a JS number (NaN if impossible). */
export function parseToNumber(input: string): number {
    if (!input) return NaN;

    // 1. Try direct JS parse
    const direct = Number(input);
    if (!isNaN(direct) && input.trim() !== '') return direct;

    // 2. Fractions first (before we strip backslashes)
    if (input.includes('\\frac')) {
        const fracMatch = input.match(/\\frac\{([^{}]+)\}\{([^{}]+)\}/);
        if (fracMatch) {
            const num = parseToNumber(fracMatch[1]);
            const den = parseToNumber(fracMatch[2]);
            if (!isNaN(num) && !isNaN(den) && den !== 0) return num / den;
        }
    }

    // 3. Pre-process LaTeX
    let norm = input
        .replace(/\\text\{[^}]+\}/g, '') // Remove units in text
        .replace(/\s+/g, '')             // Remove spaces
        .replace(/\\left|\\right/g, '')  // Remove sizing
        .replace(/\\,/g, '')             // Remove thin spaces
        .replace(/\\/g, '')              // Remove remaining backslashes
        .replace(/^\$\$|\$\$$/g, '');    // Remove $$ wrappers if present

    // 4. Scientific notation: 1.2 x 10^3 / 1.2 cdot 10^3 / 10^3
    norm = norm
        .replace(/times10\^?\{?(-?\d+)\}?/g, 'e$1')
        .replace(/cdot10\^?\{?(-?\d+)\}?/g, 'e$1')
        .replace(/10\^?\{?(-?\d+)\}?/g, '1e$1'); // bare 10^x -> 1eX

    // 5. Final numeric extraction
    const cleanMatch = norm.match(/[+-]?\d*\.?\d+(?:e[+-]?\d+)?/);
    if (cleanMatch) return parseFloat(cleanMatch[0]);

    return NaN;
}

/**
 * Count significant figures using standard chemistry rules.
 * Mirrors the generator's convention: for integers with no decimal point,
 * trailing zeros are treated as not significant (ambiguous case).
 */
export function sigFigCount(raw: string): number {
    if (!raw) return 0;
    let s = raw.trim().toLowerCase();

    // Normalize LaTeX/scientific forms to a plain mantissa[e exp]
    s = s
        .replace(/\\times|\\cdot/g, 'x')
        .replace(/\\[a-z]+/g, '')
        .replace(/[{}\s]/g, '');
    s = s.replace(/x10\^?(-?\d+)/g, 'e$1');

    // Keep only the mantissa (before an exponent marker)
    const mantissa = s.split(/e/)[0].replace(/^[+-]/, '');
    if (!/\d/.test(mantissa)) return 0;

    if (mantissa.includes('.')) {
        const digits = mantissa.replace('.', '').replace(/^0+/, '');
        return digits.length; // trailing zeros after a decimal ARE significant
    }
    // Integer: strip leading and trailing zeros
    const trimmed = mantissa.replace(/^0+/, '').replace(/0+$/, '');
    return trimmed.length || (mantissa.includes('0') ? 1 : 0);
}

export function checkAnswer(questionType: string, expected: string, actual: string): boolean {
    if (!actual) return false;

    // --- ALGEBRA: accept any algebraically-equivalent rearrangement ---
    if (questionType === 'algebra') {
        if (areEquivalent(expected, actual)) return true;
        // Fallback to normalized string compare if equivalence can't parse.
        return normalizeLatex(expected) === normalizeLatex(actual);
    }

    // --- SIG FIGS ---
    if (questionType === 'sigfigs') {
        const expIsCount = !/[.eE]/.test(expected.trim());
        if (expIsCount) {
            // "How many significant figures?" — compare the integer count.
            const e = parseToNumber(expected);
            const a = parseToNumber(actual);
            return !isNaN(e) && !isNaN(a) && e === a;
        }
        // Calculation result: the value must round correctly AND the student must
        // display the target number of significant figures.
        const target = sigFigCount(expected);
        const eNum = parseToNumber(expected);
        const aNum = parseToNumber(actual);
        if (isNaN(eNum) || isNaN(aNum) || target === 0) return false;
        const valuesMatch = parseFloat(aNum.toPrecision(target)) === parseFloat(eNum.toPrecision(target));
        return valuesMatch && sigFigCount(actual) === target;
    }

    // --- NUMERIC TYPES (Stoichiometry, Gas Laws, Density, Arithmetic, Dimensional Analysis) ---
    const numericTypes = ['stoichiometry', 'gasLaws', 'density', 'arithmetic', 'Dimensional Analysis'];
    if (numericTypes.includes(questionType)) {
        const expectedNum = parseToNumber(expected);
        const actualNum = parseToNumber(actual);

        if (!isNaN(expectedNum) && !isNaN(actualNum)) {
            // Allow ~2% tolerance for intermediate rounding.
            const tolerance = Math.abs(expectedNum) * 0.02 || 1e-7;
            if (Math.abs(expectedNum - actualNum) <= tolerance) return true;
            // Fall through to string compare for unit-bearing answers (e.g. "10 ms^-1").
        }
    }

    // ALGEBRA / STRING COMPARISON FALLBACK
    const normExpected = normalizeLatex(expected);
    const normActual = normalizeLatex(actual);

    return normExpected === normActual;
}
