
export type QuestionType =
  | 'arithmetic'
  | 'algebra'
  | 'Dimensional Analysis'
  | 'sigfigs'
  | 'stoichiometry'
  | 'gasLaws'
  | 'density';

export interface Question {
  id: string;
  type: QuestionType;
  instructions: string;
  prompt: string;
  correctAnswer: string;
  solution?: string;
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min: number, max: number, decimals: number = 1) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

function countSigFigs(n: string): number {
  n = n.toLowerCase().replace(/x10\^.*/, '').replace(/e.*/, ''); // Remove scientific notation part for counting
  if (n.includes('.')) {
    // If decimal point, all digits are significant except leading zeros
    return n.replace('.', '').replace(/^0+/, '').length;
  }
  // If no decimal, trailing zeros are ambiguous/not significant usually, but for this generator we might generate explicit decimals like "20."
  // Or just "20" (ambiguous, usually 1).
  // Let's rely on standard chemistry rules: non-zero integers, captive zeros, trailing zeros ONLY if decimal.
  return n.replace(/^0+/, '').replace(/0+$/, '').length;
}

// ARITHMETIC GENERATOR
export function generateArithmeticQuestion(): Question {
  const isScientific = Math.random() > 0.5;

  if (isScientific) {
    // Format: (A * 10^B) / (C * 10^D)
    const coef1 = getRandomFloat(1, 9, 1);
    const exp1 = getRandomInt(-10, 10);
    const coef2 = getRandomFloat(1, 9, 1);
    const exp2 = getRandomInt(-10, 10);

    const val1 = coef1 * Math.pow(10, exp1);
    const val2 = coef2 * Math.pow(10, exp2);
    const result = val1 / val2;

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'arithmetic',
      instructions: 'Calculate the following:',
      prompt: `(${coef1} \\times 10^{${exp1}}) / (${coef2} \\times 10^{${exp2}})`,
      correctAnswer: result.toExponential(4),
      solution: `\\text{Dividing coefficients: } \\frac{${coef1}}{${coef2}} = ${(coef1 / coef2).toFixed(4)} \\\\ \\text{Subtracting exponents: } ${exp1} - ${exp2} = ${exp1 - exp2} \\\\ \\text{Result: } ${(coef1 / coef2).toExponential(4)}`
    };
  } else {
    // Format: (A + B) / (C + D)
    const a = getRandomInt(10, 100);
    const b = getRandomInt(10, 100);
    const c = getRandomInt(10, 100);
    const d = getRandomInt(10, 100);

    const result = (a + b) / (c + d);

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'arithmetic',
      instructions: 'Calculate the following:',
      prompt: `\\frac{${a} + ${b}}{${c} + ${d}}`,
      correctAnswer: result.toFixed(4),
      solution: `\\text{Numerator: } ${a}+${b}=${a + b} \\\\ \\text{Denominator: } ${c}+${d}=${c + d} \\\\ \\text{Result: } \\frac{${a + b}}{${c + d}} \\approx ${(a + b) / (c + d)}`
    };
  }
}

// ALGEBRA GENERATOR
export function generateAlgebraQuestion(): Question {
  const templates = [
    {
      // ax + by = c, solve for x
      vars: ['a', 'b', 'c', 'x', 'y'],
      target: 'x',
      makePrompt: (v: any) => `${v.a}${v.x} + ${v.b}${v.y} = ${v.c}`,
      makeAnswer: (v: any) => `\\frac{${v.c}-${v.b}${v.y}}{${v.a}}`
    },
    {
      // a/x = y, solve for x
      vars: ['a', 'x', 'y'],
      target: 'x',
      makePrompt: (v: any) => `\\frac{${v.a}}{${v.x}} = ${v.y}`,
      makeAnswer: (v: any) => `\\frac{${v.a}}{${v.y}}`
    },
    {
      // y = mx + b, solve for x
      vars: ['y', 'm', 'x', 'b'],
      target: 'x',
      makePrompt: (v: any) => `${v.y} = ${v.m}${v.x} + ${v.b}`,
      makeAnswer: (v: any) => `\\frac{${v.y}-${v.b}}{${v.m}}`
    }
  ];

  const template = templates[Math.floor(Math.random() * templates.length)];
  const mapping: any = {};

  // Assign random letters if we wanted, but sticking to template vars is consistent with typical chemistry/physics formulas
  // For now, use the template vars directly as they are common
  template.vars.forEach(v => mapping[v] = v);

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'algebra',
    instructions: `Rearrange the equation to solve for ${mapping[template.target]}:`,
    prompt: template.makePrompt(mapping),
    correctAnswer: template.makeAnswer(mapping).replace(/\s+/g, ''), // Normalize spaces for checking
    solution: `\\text{Isolate } ${template.target}: ${template.makeAnswer(mapping)}`
  };
}

// UNITS GENERATOR
export function generateUnitQuestion(): Question {
  const isDivision = Math.random() > 0.5;

  // Simple dimensional analysis practice
  if (isDivision) {
    const units = ['kg', 'm', 's', 'mol', 'L'];
    const unit = units[Math.floor(Math.random() * units.length)];

    const val1 = getRandomInt(1, 10);
    const val2 = getRandomInt(1, 10);

    // Problem: (val1 unit) / (val2 unit^-1)
    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'Dimensional Analysis',
      instructions: 'Solve and write the answer with correct units:',
      prompt: `\\frac{${val1} \\text{${unit}} + ${val1} \\text{${unit}}}{${val2} \\text{${unit}}^{-1}}`,
      correctAnswer: `\\frac{${2 * val1}}{${val2}}${unit}^2`,
      solution: `\\text{Numerator: } ${2 * val1} \\text{ ${unit}} \\\\ \\text{Denominator: } ${val2} \\text{ ${unit}}^{-1} \\\\ \\text{Result: } \\frac{${2 * val1}}{${val2}} \\text{ ${unit}}^2`
    };
  } else {
    // Pattern: (val1 s)(val2 m s^-2) -> val1*val2 m s^-1
    const val1 = getRandomInt(1, 10);
    const val2 = getRandomInt(1, 10);

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'Dimensional Analysis',
      instructions: 'Solve and write the answer with correct units:',
      prompt: `(${val1} \\text{s})(${val2} \\text{m} \\text{s}^{-2})`,
      correctAnswer: `${val1 * val2}ms^{-1}`,
      solution: `\\text{Multiply numbers: } ${val1} \\times ${val2} = ${val1 * val2} \\\\ \\text{Multiply units: } \\text{s} \\cdot \\text{m} \\cdot \\text{s}^{-2} = \\text{m} \\cdot \\text{s}^{-1}`
    };
  }
}

// SIG FIGS GENERATOR
export function generateSigFigQuestion(): Question {
  const type = Math.random();

  if (type < 0.5) {
    // Counting sig figs

    const subtype = Math.random();
    let numStr = "";
    let count = 0;

    if (subtype < 0.33) {
      // Decimal with leading zeros
      const zeros = "0".repeat(getRandomInt(1, 3));
      const digits = getRandomInt(1, 9) + "" + getRandomInt(0, 9) + "" + getRandomInt(1, 9); // Non-zero start/end to be safe
      numStr = `0.${zeros}${digits}`;
      count = 3;
    } else if (subtype < 0.66) {
      // Trailing zeros with decimal
      const n = getRandomInt(1, 9);
      const d = getRandomInt(0, 9);
      const zeros = "0".repeat(getRandomInt(1, 2));
      numStr = `${n}.${d}${zeros}`; // e.g. 1.200 (4 sig figs)
      count = 2 + zeros.length;
    } else {
      // Scientific
      const n = getRandomInt(1, 9);
      const d = getRandomInt(0, 9);
      const d2 = getRandomInt(0, 9);
      numStr = `${n}.${d}${d2} \\times 10^${getRandomInt(2, 5)}`;
      count = 3;
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'sigfigs',
      instructions: 'How many significant figures are in this value?',
      prompt: numStr,
      correctAnswer: count.toString(),
      solution: `\\text{Count the significant digits according to the rules.}`
    };
  } else {
    // Operation
    // A * B or A / B
    const aVal = getRandomFloat(1, 9, 2); // 3 sig figs commonly e.g 1.23
    const bVal = getRandomFloat(1, 9, 1); // 2 sig figs e.g 1.2

    // Ensure exact strings for sig fig consistent logic
    const aStr = aVal.toFixed(2); // 3 sig figs
    const bStr = bVal.toFixed(1); // 2 sig figs

    const op = Math.random() > 0.5 ? '*' : '/';
    let resNum = op === '*' ? parseFloat(aStr) * parseFloat(bStr) : parseFloat(aStr) / parseFloat(bStr);

    // Rule: result has same num sig figs as factor with least sig figs (2)
    const targetSigFigs = 2;

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'sigfigs',
      instructions: 'Perform the calculation and round to the correct number of significant figures:',
      prompt: `${aStr} ${op === '*' ? '\\times' : '\\div'} ${bStr}`,
      correctAnswer: resNum.toPrecision(targetSigFigs), // toPrecision handles sig figs
      solution: `\\text{Least number of sig figs is } ${targetSigFigs} \\text{ (from } ${bStr} \\text{). Result } ${resNum} \\text{ rounded to } ${targetSigFigs} \\text{ sig figs.}`
    };
  }
}

// MOLAR MASS GENERATOR
export function generateMolarMassQuestion(): Question {
  // Simple Molar Mass problem: m = n * MM
  // Elements: C (12.01), H (1.008), O (16.00), N (14.01)
  const elements = { 'C': 12.01, 'H': 1.008, 'O': 16.00, 'N': 14.01 };
  const compounds = [
    { formula: 'H_2O', mm: 18.016 },
    { formula: 'CO_2', mm: 44.01 },
    { formula: 'CH_4', mm: 16.04 },
    { formula: 'NH_3', mm: 17.03 }
  ];

  const cmp = compounds[Math.floor(Math.random() * compounds.length)];

  // Type 1: Calculate Mass given Moles
  // Type 2: Calculate Moles given Mass
  // Type 3: Calculate MM given mass and moles (Problem in image)

  // Type 3: MM = mass / moles
  const moles = getRandomFloat(0.1, 2.0, 2); // e.g. 0.50 mol
  const rawMass = moles * cmp.mm; // e.g. ~9g

  // Derive the expected answer from the values actually displayed to the
  // student (both rounded to 2 dp), so their computed answer matches exactly
  // rather than the unrounded reference molar mass.
  const massStr = rawMass.toFixed(2);
  const molesStr = moles.toFixed(2);
  const computedMM = parseFloat(massStr) / parseFloat(molesStr);

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'stoichiometry',
    instructions: `Calculate the Molar Mass given: Mass = ${massStr} g, Moles = ${molesStr} mol.`,
    prompt: `MM = \\frac{${massStr} \\text{ g}}{${molesStr} \\text{ mol}}`,
    correctAnswer: computedMM.toFixed(2),
    solution: `MM = \\frac{\\text{mass}}{\\text{moles}} = \\frac{${massStr}}{${molesStr}} = ${computedMM.toFixed(2)} \\text{ g/mol}`
  };
}

// GAS LAW GENERATOR
export function generateGasLawQuestion(): Question {
  // PV = nRT
  // R = 0.08206
  const R = 0.08206;

  // Choose variable to solve for: P, V, n, T
  const target = ['P', 'V', 'n', 'T'][getRandomInt(0, 3)];

  let P = getRandomFloat(0.5, 2.0, 2); // atm
  let V = getRandomFloat(1.0, 10.0, 1); // L
  let n = getRandomFloat(0.1, 1.0, 2); // mol
  let T = getRandomInt(250, 400); // K

  // Recalculate one to be valid
  if (target === 'P') P = (n * R * T) / V;
  if (target === 'V') V = (n * R * T) / P;
  if (target === 'n') n = (P * V) / (R * T);
  if (target === 'T') T = (P * V) / (n * R);

  const pStr = P.toFixed(2);
  const vStr = V.toFixed(2);
  const nStr = n.toFixed(3);
  const tStr = T.toFixed(0);

  let latex = "";
  let ans = "";
  let unit = "";

  if (target === 'P') {
    latex = `P = \\frac{(${nStr} \\text{ mol})(0.08206 \\text{ L atm mol}^{-1} \\text{K}^{-1})(${tStr} \\text{ K})}{${vStr} \\text{ L}}`;
    ans = P.toFixed(2);
    unit = "atm";
  } else if (target === 'V') {
    latex = `V = \\frac{(${nStr} \\text{ mol})(0.08206)(${tStr} \\text{ K})}{${pStr} \\text{ atm}}`;
    ans = V.toFixed(2);
    unit = "L";
  } else if (target === 'n') {
    latex = `n = \\frac{(${pStr} \\text{ atm})(${vStr} \\text{ L})}{(0.08206)(${tStr} \\text{ K})}`;
    ans = n.toFixed(3);
    unit = "mol";
  } else {
    latex = `T = \\frac{(${pStr} \\text{ atm})(${vStr} \\text{ L})}{(${nStr} \\text{ mol})(0.08206)}`;
    ans = T.toFixed(0);
    unit = "K";
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'gasLaws',
    instructions: `Solve for ${target} using the Ideal Gas Law:`,
    prompt: latex,
    correctAnswer: ans, // Just the number for now, relying on checkAnswer modification
    solution: `\\text{Calculate result: } ${ans} \\text{ ${unit}}`
  };
}

// DENSITY GENERATOR
export function generateDensityQuestion(): Question {
  // d = m/V
  const compounds = [
    { name: 'Water', d: 1.00 },
    { name: 'Iron', d: 7.87 },
    { name: 'Gold', d: 19.3 },
    { name: 'Ethanol', d: 0.789 }
  ];

  const cmp = compounds[Math.floor(Math.random() * compounds.length)];
  const target = Math.random() > 0.5 ? 'density' : 'mass'; // or volume

  if (target === 'density') {
    const vol = getRandomFloat(1, 10, 1);
    const mass = vol * cmp.d;

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'density',
      instructions: `Calculate the density given Mass = ${mass.toFixed(2)} g and Volume = ${vol.toFixed(1)} mL:`,
      prompt: `d = \\frac{${mass.toFixed(2)} \\text{ g}}{${vol.toFixed(1)} \\text{ mL}}`,
      correctAnswer: cmp.d.toString(), // or string with units
      solution: `d = \\frac{m}{V} = \\frac{${mass.toFixed(2)}}{${vol.toFixed(1)}} = ${cmp.d} \\text{ g/mL}`
    };
  } else {
    // Find mass
    const vol = getRandomFloat(1, 50, 1);
    const mass = vol * cmp.d;

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: 'density',
      instructions: `Calculate the mass of a ${vol.toFixed(1)} mL sample of ${cmp.name} (density = ${cmp.d} g/mL):`,
      prompt: `m = (${cmp.d} \\text{ g/mL})(${vol.toFixed(1)} \\text{ mL})`,
      correctAnswer: mass.toFixed(2),
      solution: `m = d \\times V = ${cmp.d} \\times ${vol.toFixed(1)} = ${mass.toFixed(2)} \\text{ g}`
    };
  }
}
