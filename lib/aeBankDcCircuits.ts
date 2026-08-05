import type { MCQuestion, TFQuestion, AppliedElectricityQuestion } from './appliedElectricityTypes.ts';

// DC Circuits bank: Ohm's law, series/parallel resistance, dividers, power,
// short/open circuits, internal resistance, conductance, current direction.
// 22 MCQ + 8 TF (exactly 4 true / 4 false).

const mcqs: MCQuestion[] = [
  {
    id: 'aedc-001',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt: "Ohm's law relates the voltage across a resistor to the current through it. Which equation correctly states Ohm's law?",
    choices: ['V = IR', 'V = I/R', 'R = VI', 'P = IR'],
    correctIndex: 0,
    rationale:
      "Ohm's law states that voltage (the electrical push that drives current, measured in volts) equals current (the flow of electric charge, measured in amperes) multiplied by resistance (a component's opposition to current flow, measured in ohms): V = IR.",
  },
  {
    id: 'aedc-002',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt:
      'A resistor carries a current of 0.5 A and has a resistance of 20 Ω. What voltage is measured across it?',
    choices: ['40 V', '10 V', '0.025 V', '20.5 V'],
    correctIndex: 1,
    rationale:
      'Using Ohm’s law, voltage (electrical push, measured in volts) equals current (flow of electric charge, measured in amperes) times resistance (opposition to current flow, measured in ohms): V = IR = 0.5 A × 20 Ω = 10 V.',
  },
  {
    id: 'aedc-003',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt: 'A 12 V source drives a current of 3 A through a resistor. What is the resistance of that resistor?',
    choices: ['36 Ω', '0.25 Ω', '4 Ω', '15 Ω'],
    correctIndex: 2,
    rationale:
      'Rearranging Ohm’s law for resistance (a component’s opposition to current flow) gives R = V/I, where V is voltage (electrical push) and I is current (flow of charge): R = 12 V ÷ 3 A = 4 Ω.',
  },
  {
    id: 'aedc-004',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt:
      'Three resistors R1, R2, and R3 are connected in series (one after another, so the same current flows through all of them). What is their combined resistance?',
    choices: [
      '1 / (1/R1 + 1/R2 + 1/R3)',
      'R1 × R2 × R3',
      '(R1 + R2 + R3) ÷ 3',
      'R1 + R2 + R3',
    ],
    correctIndex: 3,
    rationale:
      'For resistors in series (connected end to end so the same current flows through each), the total resistance (opposition to current flow) is simply the sum of the individual resistances, since current must push through each one in turn.',
  },
  {
    id: 'aedc-005',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt: 'Three resistors of 10 Ω, 15 Ω, and 25 Ω are wired in series. What is the total resistance?',
    choices: ['50 Ω', '0.1 Ω', '16.7 Ω', '375 Ω'],
    correctIndex: 0,
    rationale:
      'Series resistances (opposition to current flow, connected end to end) simply add: 10 Ω + 15 Ω + 25 Ω = 50 Ω.',
  },
  {
    id: 'aedc-006',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt: 'Two resistors, 6 Ω and 3 Ω, are connected in parallel. What is their combined resistance?',
    choices: ['9 Ω', '2 Ω', '4.5 Ω', '18 Ω'],
    correctIndex: 1,
    rationale:
      'For exactly two resistors in parallel (wired across the same two points, sharing the same voltage), the total resistance (opposition to current flow) is their product divided by their sum: (6 × 3) ÷ (6 + 3) = 18 ÷ 9 = 2 Ω.',
  },
  {
    id: 'aedc-007',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt:
      'For resistors connected in parallel (wired across the same two points so they share the same voltage), which expression gives the total resistance?',
    choices: [
      'R_total = R1 + R2 + R3',
      'R_total = R1 × R2 × R3',
      '1/R_total = 1/R1 + 1/R2 + 1/R3',
      'R_total = (R1 + R2 + R3) ÷ 3',
    ],
    correctIndex: 2,
    rationale:
      'For any number of resistors in parallel (sharing the same voltage across them), the reciprocal of the total resistance (opposition to current flow) equals the sum of the reciprocals of each individual resistance.',
  },
  {
    id: 'aedc-008',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt:
      'A technician adds a second resistor in parallel (connected across the same two points, sharing the same voltage) alongside an existing resistor. What happens to the total resistance of the combination?',
    choices: [
      'It rises above the value of the original resistor by itself',
      'It stays exactly the same',
      'It becomes infinitely large',
      'It drops below the value of the original resistor by itself',
    ],
    correctIndex: 3,
    rationale:
      'Adding another path for current to flow through in parallel (wired across the same two points as the original resistor) always gives current more routes to take, so the combination’s total resistance (opposition to current flow) drops below what the original resistor alone had.',
  },
  {
    id: 'aedc-009',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt:
      'In a voltage divider (a series chain of resistors that splits the source voltage between them), what determines the share of the total voltage that appears across one resistor?',
    choices: [
      "The resistor's own resistance divided by the total resistance of the series chain, multiplied by the source voltage",
      "The resistor's own resistance divided by the current flowing through it",
      'The source voltage divided evenly among every resistor, no matter its size',
      "The source voltage minus the resistor's own resistance",
    ],
    correctIndex: 0,
    rationale:
      'A voltage divider is a series chain of resistors (connected end to end, sharing the same current) that splits the source voltage (electrical push) between them; each resistor’s share equals its own resistance (opposition to current flow) divided by the chain’s total resistance, times the source voltage.',
  },
  {
    id: 'aedc-010',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt:
      'A 20 V source is connected across two resistors in series: 30 Ω and 70 Ω. What voltage appears across the 70 Ω resistor?',
    choices: ['6 V', '14 V', '20 V', '10 V'],
    correctIndex: 1,
    rationale:
      'Using the voltage-divider rule, the share of voltage (electrical push) across one resistor equals its own resistance (opposition to current flow) divided by the total series resistance, times the source voltage: 20 V × (70 Ω ÷ 100 Ω) = 14 V.',
  },
  {
    id: 'aedc-011',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt:
      'Two resistors are connected in parallel and share a total incoming current. Which statement about how that current divides between them is correct?',
    choices: [
      'The branch with the larger resistance carries the larger share of the current',
      'Both branches always carry exactly equal current, regardless of resistance',
      'The branch with the smaller resistance carries the larger share of the current',
      'All of the current flows through only one branch, whichever is listed first',
    ],
    correctIndex: 2,
    rationale:
      'In a current divider (resistors wired in parallel, sharing the same voltage, that split an incoming current between them), current (flow of electric charge) favors the path of least opposition, so the branch with the smaller resistance carries more of the total current.',
  },
  {
    id: 'aedc-012',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt:
      'A total current of 8 A splits between two resistors wired in parallel: 4 Ω and 12 Ω. How much current flows through the 4 Ω resistor?',
    choices: ['2 A', '4 A', '8 A', '6 A'],
    correctIndex: 3,
    rationale:
      'For two resistors in parallel (sharing the same voltage), the current-divider rule sends more current down the branch with less resistance (opposition to current flow): the current through the 4 Ω resistor is 8 A × (12 Ω ÷ (4 Ω + 12 Ω)) = 8 A × 0.75 = 6 A.',
  },
  {
    id: 'aedc-013',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt:
      'Which equation gives the electrical power dissipated by a resistor in terms of the voltage across it and the current through it?',
    choices: ['P = VI', 'P = V + I', 'P = V/I', 'P = V - I'],
    correctIndex: 0,
    rationale:
      'Electrical power (the rate at which electrical energy is used, measured in watts) equals voltage (electrical push, measured in volts) multiplied by current (flow of charge, measured in amperes): P = VI.',
  },
  {
    id: 'aedc-014',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt:
      "If you know the current through a resistor and its resistance, but not the voltage across it, which power formula lets you find the power dissipated without first calculating the voltage?",
    choices: ['P = V²/R', 'P = I²R', 'P = VI', 'P = V/R²'],
    correctIndex: 1,
    rationale:
      'Substituting Ohm’s law (V = IR) into P = VI gives P = I²R, which lets you find power (rate of energy use, in watts) directly from current (flow of charge) and resistance (opposition to current flow) without needing the voltage.',
  },
  {
    id: 'aedc-015',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt: 'A 100 Ω resistor has 20 V across it. How much power does it dissipate?',
    choices: ['0.2 W', '2000 W', '4 W', '20 W'],
    correctIndex: 2,
    rationale:
      'Substituting Ohm’s law into P = VI gives P = V²/R, so power (rate of energy use, in watts) here is 20² ÷ 100 = 400 ÷ 100 = 4 W.',
  },
  {
    id: 'aedc-016',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt:
      'A wire accidentally connects two points that should only be joined through a resistor, creating a short circuit (an unintended path of very low resistance). What typically happens?',
    choices: [
      'No current flows, because the path has infinite resistance',
      'The voltage across the path becomes very large',
      "The circuit's total resistance increases sharply",
      'A much larger current flows than the circuit was designed for, because resistance in that path is close to zero',
    ],
    correctIndex: 3,
    rationale:
      'A short circuit is an unintended path with resistance (opposition to current flow) close to zero, so by Ohm’s law a much larger current (flow of electric charge) than intended flows through it.',
  },
  {
    id: 'aedc-017',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt:
      "A wire breaks, leaving a gap in a circuit's path (an open circuit). What happens to the current in that branch?",
    choices: [
      'It drops to zero, since a break behaves like an infinitely large resistance',
      'It becomes very large, since resistance in the gap is nearly zero',
      'It stays the same as before the break',
      'It reverses direction',
    ],
    correctIndex: 0,
    rationale:
      'An open circuit is a break in the path, which behaves like an infinitely large resistance (opposition to current flow); since current (flow of charge) needs a complete path, it drops to zero in that branch.',
  },
  {
    id: 'aedc-018',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt:
      "A real battery is often modeled as an ideal voltage source in series with a small internal resistance (built-in resistance inside the source itself). What is the effect of this internal resistance when the battery supplies current to a circuit?",
    choices: [
      'It has no effect unless the battery is short-circuited',
      'Some of the source’s driving voltage is used up inside the battery itself, so less voltage is available at its terminals',
      'It increases the voltage delivered to the external circuit',
      'It only matters for alternating current, not direct current',
    ],
    correctIndex: 1,
    rationale:
      'A real source’s internal resistance (built-in opposition to current flow inside the source itself) uses up some of the source’s driving voltage whenever current (flow of charge) flows, leaving less voltage available at the terminals for the rest of the circuit.',
  },
  {
    id: 'aedc-019',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt:
      'A battery has an emf (its full driving voltage measured with no current flowing) of 9 V and an internal resistance of 0.5 Ω. While it delivers 2 A to a circuit, what is its terminal voltage (the voltage actually available at its output terminals)?',
    choices: ['9 V', '9.5 V', '8 V', '4.5 V'],
    correctIndex: 2,
    rationale:
      'Terminal voltage (the voltage available at a source’s output terminals) equals the emf (electromotive force — the source’s full driving voltage with no current flowing) minus the voltage used up across its internal resistance (built-in opposition to current flow): 9 V − (2 A × 0.5 Ω) = 9 V − 1 V = 8 V.',
  },
  {
    id: 'aedc-020',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt:
      'Conductance describes how easily a component lets current pass through it and is the mathematical reciprocal of resistance. In which unit is conductance measured?',
    choices: ['Ohms (Ω)', 'Volts (V)', 'Amperes (A)', 'Siemens (S)'],
    correctIndex: 3,
    rationale:
      'Conductance is the reciprocal of resistance (opposition to current flow) — it measures how easily current can pass through a component — and it is measured in siemens (S).',
  },
  {
    id: 'aedc-021',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt: "By convention, which direction is 'conventional current' in a circuit taken to flow?",
    choices: [
      'From the positive terminal of the source, through the external circuit, to the negative terminal',
      'From the negative terminal of the source, through the external circuit, to the positive terminal',
      'In the same direction as electron flow everywhere in the circuit',
      'It has no defined direction; only magnitude matters',
    ],
    correctIndex: 0,
    rationale:
      'By convention, current (the flow of electric charge) is treated as flowing from a source’s positive terminal, through the external circuit, and back to its negative terminal, even though electrons themselves physically move the opposite way.',
  },
  {
    id: 'aedc-022',
    topic: 'dcCircuits',
    type: 'mcq',
    prompt:
      'A 24 V source is connected to two resistors in series: 4 Ω and 8 Ω. What power is dissipated in the 8 Ω resistor?',
    choices: ['8 W', '32 W', '48 W', '16 W'],
    correctIndex: 1,
    rationale:
      'First find the total resistance (opposition to current flow) in series: 4 Ω + 8 Ω = 12 Ω. Then the current (flow of charge) is 24 V ÷ 12 Ω = 2 A. Power (rate of energy use, in watts) in the 8 Ω resistor is P = I²R = 2² × 8 = 32 W.',
  },
];

const tfs: TFQuestion[] = [
  {
    id: 'aedc-023',
    topic: 'dcCircuits',
    type: 'tf',
    prompt: 'In a series circuit, the same current flows through every resistor.',
    correctAnswer: true,
    rationale:
      'True. In a series circuit (components connected end to end so there is only one path), the same current (flow of electric charge, measured in amperes) must pass through every component, since there is nowhere else for the charge to go.',
  },
  {
    id: 'aedc-024',
    topic: 'dcCircuits',
    type: 'tf',
    prompt:
      'Connecting two resistors in parallel always gives a total resistance greater than either resistor alone.',
    correctAnswer: false,
    rationale:
      'False. Connecting resistors in parallel (wired across the same two points so they share the same voltage) actually gives a total resistance (opposition to current flow) that is always smaller than the smallest individual resistor, because the extra path gives current more ways to flow.',
  },
  {
    id: 'aedc-025',
    topic: 'dcCircuits',
    type: 'tf',
    prompt: 'An open circuit has zero resistance and allows current to flow freely.',
    correctAnswer: false,
    rationale:
      'False. An open circuit (a break in the current path) behaves like an infinitely large resistance (opposition to current flow), so it blocks current rather than letting it flow freely; a break stops current, it does not free it.',
  },
  {
    id: 'aedc-026',
    topic: 'dcCircuits',
    type: 'tf',
    prompt: 'A short circuit provides a path of very low resistance, so a large current can flow through it.',
    correctAnswer: true,
    rationale:
      'True. A short circuit (an unintended path with very low resistance, or opposition to current flow) lets current rise well above normal, because there is almost nothing to hold it back.',
  },
  {
    id: 'aedc-027',
    topic: 'dcCircuits',
    type: 'tf',
    prompt: 'Conductance is measured in siemens and equals the reciprocal of resistance.',
    correctAnswer: true,
    rationale:
      'True. Conductance is the mathematical reciprocal of resistance (opposition to current flow) — it measures how easily current can pass — and its unit is the siemens (S).',
  },
  {
    id: 'aedc-028',
    topic: 'dcCircuits',
    type: 'tf',
    prompt:
      'By convention, current is assumed to flow from the negative terminal to the positive terminal through the external circuit.',
    correctAnswer: false,
    rationale:
      'False. By convention, current (the flow of electric charge) is taken to flow from the positive terminal of a source, through the external circuit, to the negative terminal — the opposite of what this statement claims.',
  },
  {
    id: 'aedc-029',
    topic: 'dcCircuits',
    type: 'tf',
    prompt: 'The terminal voltage of a battery equals its emf when current is drawn from it, regardless of internal resistance.',
    correctAnswer: false,
    rationale:
      'False. Terminal voltage (the voltage available at a source’s output terminals) is always less than the emf (electromotive force — the source’s full driving voltage with no current flowing) whenever current flows, because some voltage is used up pushing current through the source’s own internal resistance (built-in opposition to current flow inside the source).',
  },
  {
    id: 'aedc-030',
    topic: 'dcCircuits',
    type: 'tf',
    prompt: 'Doubling the resistance in a circuit while keeping the voltage constant halves the current.',
    correctAnswer: true,
    rationale:
      'True. By Ohm’s law, current (flow of electric charge) equals voltage divided by resistance (opposition to current flow); if resistance doubles while voltage is held constant, current is cut in half.',
  },
];

export const dcCircuitsQuestions: AppliedElectricityQuestion[] = [...mcqs, ...tfs];
