// Basic normalization for comparing LaTeX strings
// MathLive outputs things like \frac{1}{2}, generators might output 1/2 or \frac{1}{2}
// We also need to handle numeric values that might be entered in various ways (1000 vs 1,000)

export function normalizeLatex(latex: string): number | string {
    if (!latex) return '';

    // Remove all whitespace
    let norm = latex.replace(/\s+/g, '');

    // Remove \left and \right
    norm = norm.replace(/\\left/g, '').replace(/\\right/g, '');

    // Remove \text{...} but keep the content inside
    // This is a simple recursive removal for nested standard latex, but for \text{unit} it's usually simple
    // Replacing \text{abc} with abc.
    // Regex explanation: Match \text{, capture content until }, replace with content
    // Note: this is a simple regex and might fail on nested braces inside \text, but sufficient for our units
    // Iteratively remove \text{...} in case of nesting or multiple occurrences
    while (norm.includes('\\text{')) {
        norm = norm.replace(/\\text{([^{}]+)}/g, '$1');
    }

    // Remove $$ wrappers
    norm = norm.replace(/^\$\$|\$\$$/g, '');

    return norm;
}

export function checkAnswer(questionType: string, expected: string, actual: string): boolean {
    if (!actual) return false;

    // --- SIG FIGS ---
    if (questionType === 'sigfigs') {
        // Strict string comparison but allow "40." vs "40"
        const cleanExp = expected.trim().replace(/\.$/, '');
        const cleanAct = actual.trim().replace(/\.$/, '');
        return cleanExp === cleanAct;
    }

    // --- NUMERIC TYPES (Stoichiometry, Gas Laws, Density, Arithmetic, Dimensional Analysis) ---
    const numericTypes = ['stoichiometry', 'gasLaws', 'density', 'arithmetic', 'Dimensional Analysis'];
    if (numericTypes.includes(questionType)) {
        try {
            // Function to parse a broad range of inputs to a number
            const parseToNumber = (input: string): number => {
                if (!input) return NaN;

                // 1. Try direct JS parse
                let direct = Number(input);
                if (!isNaN(direct)) return direct;

                // 2. Pre-process LaTeX
                let norm = input
                    .replace(/\\text\{[^}]+\}/g, '') // Remove units in text
                    .replace(/\s+/g, '')             // Remove spaces
                    .replace(/\\left|\\right/g, '')  // Remove sizing
                    .replace(/\\,/g, '')             // Remove thin spaces
                    .replace(/\\/g, '')              // Remove remaining backslashes
                    .replace(/^\$\$|\$\$$/g, '');    // Remove $$ wrappers if present

                // 3. Handle Scientific Notation: 1.2 x 10^3
                // Common formats: 1.2times10^{3}, 1.2cdot10^3, 10^3

                // Convert (A)times10^(B) -> AeB
                norm = norm
                    .replace(/times10\^?\{?(-?\d+)\}?/g, 'e$1')
                    .replace(/cdot10\^?\{?(-?\d+)\}?/g, 'e$1')
                    .replace(/10\^?\{?(-?\d+)\}?/g, '1e$1'); // bare 10^x -> 1eX

                // 4. Handle Fractions? \frac{A}{B} was stripped of \frac, so checks A}{B or A/B depending on input
                // If the user typed a fraction, MathLive gives \frac{num}{den}
                // Our aggressive strip removed \frac. So input `\frac{1}{2}` became `{1}{2}` -> `12`. BAD.

                // Let's go back to the raw input for fraction handling
                if (input.includes('\\frac')) {
                    const fracMatch = input.match(/\\frac\{([^}]+)\}\{([^}]+)\}/);
                    if (fracMatch) {
                        const num = parseToNumber(fracMatch[1]);
                        const den = parseToNumber(fracMatch[2]);
                        if (!isNaN(num) && !isNaN(den) && den !== 0) return num / den;
                    }
                }

                // 5. Clean up for final parse
                // Remove any remaining braces or non-numeric/non-scientific chars
                // Keep digits, ., -, +, e
                const cleanMatch = norm.match(/[+-]?\d*\.?\d+(?:e[+-]?\d+)?/);
                if (cleanMatch) {
                    return parseFloat(cleanMatch[0]);
                }

                return NaN;
            };

            const expectedNum = parseToNumber(expected); // usually clean number string
            const actualNum = parseToNumber(actual);

            if (!isNaN(expectedNum) && !isNaN(actualNum)) {
                // Determine tolerance
                // If expected is 0, strict? or small epsilon
                // 0.44 vs 0.4444... is ~1% error. Allow 2% tolerance.
                const tolerance = Math.abs(expectedNum) * 0.02 || 1e-7;
                return Math.abs(expectedNum - actualNum) <= tolerance;
            }
        } catch (e) {
            console.error("Error checking numeric answer:", e);
        }
    }

    // ALGEBRA / STRING COMPARISON FALLBACK
    const normExpected = normalizeLatex(expected);
    const normActual = normalizeLatex(actual);

    return normExpected === normActual;
}
