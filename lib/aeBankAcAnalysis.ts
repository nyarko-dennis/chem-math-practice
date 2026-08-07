import type { MCQuestion, TFQuestion, AppliedElectricityQuestion } from './appliedElectricityTypes.ts';

// Curated MCQ/TF bank for the "acAnalysis" topic of the Applied Electricity course.
// 22 MCQ + 8 TF (exactly 4 true / 4 false). Ids aeaca-001 .. aeaca-030.
//
// The source lecture-deck extract (docs/appliedElectricity/source-extracts/lecture-deck.txt) is thin
// on this topic: slide 50 shows a "Phasor representation of a sine wave" figure title with no textual
// definition; slides 96-98 are bare titles ("RL Series Circuit", "R and L Vector Diagrams", "Phasor
// Diagram for the Series RL Circuit") with no body content or formulas; and slide 89 (under power
// factor) states that "current leads voltage" for capacitive loads and "current lags voltage" for
// inductive loads, and that a purely resistive load has current and voltage "change polarity in step"
// (grounds the qualitative lead/lag/in-phase directions used below, paraphrased).
//
// Facts not found in the source extract, included as standard first-year electrical-engineering facts:
//  - inductive reactance formula X_L = 2*pi*f*L = omega*L, and that it rises with frequency
//  - capacitive reactance formula X_C = 1/(2*pi*f*C) = 1/(omega*C), and that it falls with frequency
//  - the formal definition of impedance as combining resistance and reactance, and |Z| = sqrt(R^2+X^2)
//  - the formal definition of a phasor as a rotating arrow representing magnitude and phase
//  - the exact 90-degree figure for inductor/capacitor phase lag/lead (extract only says "lagging"/"leading")
//  - the ELI and ICE mnemonics for inductor/capacitor phase relationships
//  - series RL, RC, and RLC impedance formulas in rectangular form (Z = R + jX_L, Z = R - jX_C, Z = R + j(X_L-X_C))
//  - the resonance condition (X_L = X_C), and that impedance is minimum (= R) at resonance
//  - rectangular (a+jb) vs polar (magnitude-angle) representation of impedance, and converting between them

const mcq = (
  id: string,
  prompt: string,
  choices: [string, string, string, string],
  correctIndex: number,
  rationale: string,
): MCQuestion => ({
  id,
  topic: 'acAnalysis',
  type: 'mcq',
  prompt,
  choices,
  correctIndex,
  rationale,
});

const tf = (
  id: string,
  prompt: string,
  correctAnswer: boolean,
  rationale: string,
): TFQuestion => ({
  id,
  topic: 'acAnalysis',
  type: 'tf',
  prompt,
  correctAnswer,
  rationale,
});

export const acAnalysisQuestions: AppliedElectricityQuestion[] = [
  mcq(
    'aeaca-001',
    'What is inductive reactance ($X_L$), and how is it calculated for a coil, or inductor, on an AC supply?',
    [
      "The energy stored in an inductor's magnetic field, calculated as $E=\\frac12LI^2$",
      'The opposition an inductor gives to alternating current, calculated as $X_L=2\\pi fL$',
      "The voltage drop across an inductor's internal resistance, calculated as $V=IR$",
      'The rate at which current changes in an inductor, calculated as $di/dt$',
    ],
    1,
    "Inductive reactance $X_L$ (the opposition a coil, or inductor, gives to alternating current, or AC, because of its changing magnetic field, measured in ohms) is calculated as $X_L=2\\pi fL=\\omega L$, where $f$ is frequency (cycles per second) and $L$ is inductance (a coil's property, measured in henries).",
  ),
  mcq(
    'aeaca-002',
    'What is capacitive reactance ($X_C$), and how is it calculated for a capacitor on an AC supply?',
    [
      'The opposition a capacitor gives to alternating current, calculated as $X_C=1/(2\\pi fC)$',
      "The energy stored in a capacitor's electric field, calculated as $E=\\frac12CV^2$",
      'The charge stored on a capacitor\'s plates, calculated as $Q=CV$',
      'The time needed for a capacitor to charge, calculated as $\\tau=RC$',
    ],
    0,
    "Capacitive reactance $X_C$ (the opposition a capacitor gives to alternating current, or AC, because it repeatedly charges and discharges, measured in ohms) is calculated as $X_C=1/(2\\pi fC)=1/(\\omega C)$, where $f$ is frequency (cycles per second) and $C$ is capacitance (a capacitor's property, measured in farads).",
  ),
  mcq(
    'aeaca-003',
    'A coil used as an inductor has inductance $L=0.2$ H and is connected to a 50 Hz AC supply. Using $X_L=2\\pi fL$, what is its inductive reactance (the opposition it offers to the alternating current, in ohms)?',
    ['≈31.4 Ω', '≈125.6 Ω', '≈6.28 Ω', '≈62.8 Ω'],
    3,
    "Inductive reactance (the opposition a coil, or inductor, gives to alternating current, measured in ohms) is $X_L=2\\pi fL=2\\pi\\times50\\times0.2\\approx62.8\\ \\Omega$; halving or doubling this value, or forgetting the $2\\pi$ factor, gives the wrong distractor answers.",
  ),
  mcq(
    'aeaca-004',
    'A capacitor of $C=10\\ \\mu F$ is connected to a 1000 Hz (1 kHz) AC supply. Using $X_C=1/(2\\pi fC)$, what is its capacitive reactance (the opposition it offers to the alternating current, in ohms), to the nearest 0.1 Ω?',
    ['≈15.9 Ω', '≈31.8 Ω', '≈7.96 Ω', '≈100 Ω'],
    0,
    "Capacitive reactance (the opposition a capacitor gives to alternating current, measured in ohms) is $X_C=1/(2\\pi fC)=1/(2\\pi\\times1000\\times10\\times10^{-6})\\approx15.9\\ \\Omega$; forgetting the $2\\pi$ factor would wrongly give 100 Ω.",
  ),
  mcq(
    'aeaca-005',
    "As the frequency of an AC supply increases, what happens to inductive reactance ($X_L$, an inductor's opposition to alternating current) and capacitive reactance ($X_C$, a capacitor's opposition to alternating current)?",
    [
      'Both rise with frequency',
      'Both fall with frequency',
      '$X_L$ rises with frequency while $X_C$ falls with frequency',
      '$X_L$ falls with frequency while $X_C$ rises with frequency',
    ],
    2,
    "Since $X_L=2\\pi fL$, inductive reactance (a coil's opposition to alternating current) rises as frequency rises; since $X_C=1/(2\\pi fC)$, capacitive reactance (a capacitor's opposition to alternating current) falls as frequency rises - the two move in opposite directions.",
  ),
  mcq(
    'aeaca-006',
    "In an AC circuit containing both resistance and reactance, why is the single term impedance ($Z$) used instead of resistance alone?",
    [
      'Because impedance measures only the reactive opposition, ignoring resistance entirely',
      'Because impedance replaces the need to know frequency',
      'Because impedance is only meaningful in DC circuits',
      "Because impedance combines a circuit's resistance and reactance into one overall opposition to alternating current",
    ],
    3,
    "Impedance $Z$ (the total opposition a circuit offers to alternating current, or AC, combining resistance, the plain opposition that dissipates energy as heat, with reactance, the opposition from inductors or capacitors, both measured in ohms) is needed because AC circuits generally have both effects acting together.",
  ),
  mcq(
    'aeaca-007',
    'A circuit has resistance $R=30\\ \\Omega$ and net reactance $X=40\\ \\Omega$. Using $|Z|=\\sqrt{R^2+X^2}$, what is the magnitude of its impedance (the circuit\'s total opposition to alternating current, in ohms)?',
    ['70 Ω', '35 Ω', '50 Ω', '10 Ω'],
    2,
    "The magnitude of impedance (the circuit's total opposition to alternating current, in ohms, combining resistance and reactance) is $|Z|=\\sqrt{30^2+40^2}=\\sqrt{900+1600}=\\sqrt{2500}=50\\ \\Omega$, following the same right-triangle relationship as a 3-4-5 triangle scaled by 10.",
  ),
  mcq(
    'aeaca-008',
    'What does a phasor represent in AC circuit analysis?',
    [
      "A graph of a waveform's instantaneous value plotted second by second over one full cycle",
      'A rotating arrow whose length shows a sinusoidal quantity\'s magnitude and whose angle shows its phase relative to a reference',
      'A table listing every instantaneous value of a waveform',
      'A device used to measure resistance directly',
    ],
    1,
    "A phasor (a rotating arrow that represents a sinusoidal quantity's magnitude, or size, and phase, or timing position within its cycle, at a single instant, assuming a fixed frequency) is a simplified way to analyse AC circuits without tracking every instantaneous value over time.",
  ),
  mcq(
    'aeaca-009',
    'Two phasors representing AC voltages of the same frequency are drawn 30° apart on a phasor diagram. What does this angle represent?',
    [
      'The ratio of their peak, or maximum instantaneous, values',
      'The difference in their frequencies',
      'The phase difference (offset in timing position within the cycle) between the two voltages',
      'The resistance of the circuit',
    ],
    2,
    "The angle between two phasors (rotating arrows representing sinusoidal quantities' magnitude and phase) on a shared diagram shows their phase difference (the timing offset, in angle, between corresponding points of the two waveforms), not a difference in size or frequency.",
  ),
  mcq(
    'aeaca-010',
    'In a circuit containing only a pure resistor connected to an AC supply, how do the voltage across it and the current through it relate in time?',
    [
      'The current lags the voltage by 90°',
      'The current leads the voltage by 90°',
      'The voltage and current are in phase (they rise, peak, and fall together)',
      'The voltage and current are 180° out of phase',
    ],
    2,
    "In a pure resistor (a component with resistance but no reactance), voltage and current are in phase (they reach their peak, or maximum instantaneous, values at the same instant) because a resistor's opposition does not depend on how fast the current is changing, unlike an inductor or capacitor's reactance.",
  ),
  mcq(
    'aeaca-011',
    'A pure resistor is connected across an AC voltage source. If the voltage waveform reaches its peak value at $t=0$, at what time does the current waveform reach its peak?',
    [
      'One quarter-cycle after $t=0$',
      'One quarter-cycle before $t=0$',
      'Half a cycle after $t=0$',
      'At $t=0$, the same instant',
    ],
    3,
    "Because voltage and current are in phase (reach corresponding points, such as their peaks, at the same instant) in a pure resistor (a component with resistance but no reactance), the current peaks at exactly the same instant, $t=0$, as the voltage.",
  ),
  mcq(
    'aeaca-012',
    'In a circuit containing only a pure inductor connected to an AC supply, how does the current relate to the voltage, and what mnemonic captures this?',
    [
      'The current leads the voltage by 90°, remembered by ICE',
      'The current lags the voltage by 90°, remembered by ELI',
      'The current and voltage are in phase, remembered by RVI',
      'The current lags the voltage by 180°, remembered by ELV',
    ],
    1,
    "In a pure inductor (a coil with reactance but no resistance), the current lags the voltage by 90° - remembered by the mnemonic ELI, where in an inductor (L) the voltage, E, comes before the current, I, meaning voltage leads (equivalently, current lags).",
  ),
  mcq(
    'aeaca-013',
    'A pure inductor is connected to an AC voltage source whose waveform reaches its peak value at $t=0°$ (0 degrees into the cycle). Since current lags voltage by 90° in a pure inductor (a coil with reactance but no resistance), at what angle does the current waveform reach its peak?',
    ['At 90°', 'At 0°, the same instant', 'At 180°', 'At -90° (a quarter-cycle earlier)'],
    0,
    "Since the current lags the voltage by 90° in a pure inductor (a coil with reactance but no resistance) - meaning it reaches corresponding points later in time than the voltage - the current reaches its peak, or maximum instantaneous, value 90° after the voltage does, that is, at 90°.",
  ),
  mcq(
    'aeaca-014',
    'In a circuit containing only a pure capacitor connected to an AC supply, how does the current relate to the voltage, and what mnemonic captures this?',
    [
      'The current leads the voltage by 90°, remembered by ICE',
      'The current lags the voltage by 90°, remembered by ELI',
      'The current and voltage are in phase, remembered by RVI',
      'The current leads the voltage by 180°, remembered by ICV',
    ],
    0,
    "In a pure capacitor (a component with reactance but no resistance, storing energy in an electric field), the current leads the voltage by 90° - remembered by the mnemonic ICE, where in a capacitor (C) the current, I, comes before the voltage, E, meaning current leads.",
  ),
  mcq(
    'aeaca-015',
    'A pure capacitor is connected to an AC voltage source whose waveform reaches its peak value at $t=90°$ (90 degrees into the cycle). Since current leads voltage by 90° in a pure capacitor (a component with reactance but no resistance), at what angle does the current waveform reach its peak?',
    ['At 0°', 'At 90°, the same instant', 'At 180°', 'At 270°'],
    0,
    "Since the current leads the voltage by 90° in a pure capacitor (a component with reactance but no resistance) - meaning it reaches corresponding points earlier in time than the voltage - the current reaches its peak, or maximum instantaneous, value 90° before the voltage, so at $90°-90°=0°$.",
  ),
  mcq(
    'aeaca-016',
    'How is the impedance (a circuit\'s total opposition to alternating current, combining resistance and reactance) of a series RL circuit (a resistor and inductor connected in series on an AC supply) written in rectangular form (a real resistance part plus an imaginary reactance part)?',
    ['$Z=R-jX_L$', '$Z=R\\times X_L$', '$Z=X_L-jR$', '$Z=R+jX_L$'],
    3,
    "In rectangular form (writing impedance as a resistance part plus an imaginary reactance part), a series RL circuit's impedance is $Z=R+jX_L$, where $R$ is resistance and $X_L$ is inductive reactance (the coil's opposition to alternating current); the positive sign on the imaginary part marks it as inductive.",
  ),
  mcq(
    'aeaca-017',
    'A series RL circuit (a resistor and inductor connected in series on an AC supply) has $R=8\\ \\Omega$ and inductive reactance $X_L=6\\ \\Omega$. Using $|Z|=\\sqrt{R^2+X_L^2}$, what is the magnitude of its impedance?',
    ['14 Ω', '2 Ω', '10 Ω', '48 Ω'],
    2,
    "The magnitude of impedance (the circuit's total opposition to alternating current) for this series RL circuit is $|Z|=\\sqrt{8^2+6^2}=\\sqrt{64+36}=\\sqrt{100}=10\\ \\Omega$, a 6-8-10 right-triangle relationship.",
  ),
  mcq(
    'aeaca-018',
    'How is the impedance (a circuit\'s total opposition to alternating current, combining resistance and reactance) of a series RC circuit (a resistor and capacitor connected in series on an AC supply) written in rectangular form (a real resistance part plus an imaginary reactance part)?',
    ['$Z=R+jX_C$', '$Z=R-jX_C$', '$Z=X_C-jR$', '$Z=R\\times X_C$'],
    1,
    "In rectangular form (writing impedance as a resistance part plus an imaginary reactance part), a series RC circuit's impedance is $Z=R-jX_C$, where $R$ is resistance and $X_C$ is capacitive reactance (the capacitor's opposition to alternating current); the negative sign on the imaginary part marks it as capacitive.",
  ),
  mcq(
    'aeaca-019',
    'A series RC circuit (a resistor and capacitor connected in series on an AC supply) has $R=9\\ \\Omega$ and capacitive reactance $X_C=12\\ \\Omega$. Using $|Z|=\\sqrt{R^2+X_C^2}$, what is the magnitude of its impedance?',
    ['21 Ω', '3 Ω', '108 Ω', '15 Ω'],
    3,
    "The magnitude of impedance (the circuit's total opposition to alternating current) for this series RC circuit is $|Z|=\\sqrt{9^2+12^2}=\\sqrt{81+144}=\\sqrt{225}=15\\ \\Omega$, a 9-12-15 right-triangle relationship (a scaled 3-4-5 triangle).",
  ),
  mcq(
    'aeaca-020',
    'A series RLC circuit (a resistor, inductor, and capacitor connected in series on an AC supply) has inductive reactance $X_L$ greater than capacitive reactance $X_C$. Using $Z=R+j(X_L-X_C)$, what does this tell us about the circuit\'s overall reactive behaviour?',
    [
      'The circuit behaves as net capacitive, since $X_L-X_C$ is positive',
      'The circuit behaves as net inductive, since $X_L-X_C$ is positive',
      'The circuit behaves as purely resistive, since the reactances cancel',
      "The circuit's impedance cannot be determined from this information",
    ],
    1,
    "In the series RLC impedance (a circuit's total opposition to alternating current, combining resistance and reactance) formula $Z=R+j(X_L-X_C)$ (combining resistance with the net reactance, the difference between inductive reactance $X_L$ and capacitive reactance $X_C$), a positive net reactance means the inductive effect dominates, so the circuit behaves as net inductive overall.",
  ),
  mcq(
    'aeaca-021',
    'A series RLC circuit (resistor, inductor, and capacitor connected in series on an AC supply) is tuned so that inductive reactance $X_L$ equals capacitive reactance $X_C$. What is this condition called, and what happens to the circuit\'s impedance (a circuit\'s total opposition to alternating current, combining resistance and reactance)?',
    [
      'Resonance; the net reactance becomes zero and impedance is minimum, equal to $R$',
      'Resonance; the net reactance doubles and impedance is maximum',
      'Saturation; the net reactance becomes zero and impedance is zero',
      'Resonance; resistance becomes zero',
    ],
    0,
    "This condition is called resonance (the state in a series RLC circuit where inductive reactance $X_L$ and capacitive reactance $X_C$ are equal): they cancel in the reactance term $X_L-X_C$, so the net reactance is zero and the impedance drops to its minimum value, equal to the resistance $R$ alone.",
  ),
  mcq(
    'aeaca-022',
    "A circuit's impedance (a circuit's total opposition to alternating current, combining resistance and reactance) is given in rectangular form (a real resistance part plus an imaginary reactance part) as $Z=3+j4\\ \\Omega$. What is the magnitude of this impedance when expressed in polar form (magnitude∠angle)?",
    ['7 Ω', '1 Ω', '5 Ω', '12 Ω'],
    2,
    "Converting from rectangular form (writing impedance as a resistance part, 3, plus an imaginary reactance part, 4) to polar form (writing impedance as a magnitude and an angle) uses $|Z|=\\sqrt{R^2+X^2}=\\sqrt{3^2+4^2}=\\sqrt{9+16}=\\sqrt{25}=5\\ \\Omega$; the full polar form would also need the angle, $\\theta=\\tan^{-1}(4/3)$.",
  ),
  tf(
    'aeaca-023',
    'Inductive reactance rises as the frequency of an AC supply increases.',
    true,
    "This is true: inductive reactance $X_L$ (a coil's, or inductor's, opposition to alternating current, measured in ohms) is calculated as $X_L=2\\pi fL$, which grows directly as frequency $f$ (cycles per second) increases.",
  ),
  tf(
    'aeaca-024',
    'Capacitive reactance rises as the frequency of an AC supply increases.',
    false,
    "This is false: capacitive reactance $X_C$ (a capacitor's opposition to alternating current, measured in ohms) is calculated as $X_C=1/(2\\pi fC)$, which falls, not rises, as frequency $f$ (cycles per second) increases.",
  ),
  tf(
    'aeaca-025',
    'In a pure resistor connected to an AC supply, the voltage and current are in phase.',
    true,
    "This is true: a pure resistor (a component with resistance but no reactance) has no timing effect on the current, so voltage and current are in phase (they reach corresponding points, such as their peaks, at the same instant).",
  ),
  tf(
    'aeaca-026',
    'In a pure inductor connected to an AC supply, the current leads the voltage by 90°.',
    false,
    "This is false: in a pure inductor (a coil with reactance but no resistance), the current lags the voltage by 90°, not leads it - remembered by the mnemonic ELI, where voltage (E) comes before current (I) for an inductor (L).",
  ),
  tf(
    'aeaca-027',
    'In a pure capacitor connected to an AC supply, the current leads the voltage by 90°.',
    true,
    "This is true: in a pure capacitor (a component with reactance but no resistance), the current reaches corresponding points, such as its peaks, 90° earlier than the voltage - remembered by the mnemonic ICE, where current (I) comes before voltage (E) for a capacitor (C).",
  ),
  tf(
    'aeaca-028',
    "At resonance in a series RLC circuit, the circuit's impedance is at its minimum value.",
    true,
    "This is true: at resonance (the condition where inductive reactance $X_L$ equals capacitive reactance $X_C$ in a series RLC circuit), the two reactances cancel, leaving impedance (the circuit's total opposition to alternating current) at its minimum value, equal to the resistance $R$ alone.",
  ),
  tf(
    'aeaca-029',
    "A phasor diagram shows how a sinusoidal quantity's instantaneous value changes second by second over a full cycle.",
    false,
    "This is false: a phasor (a rotating arrow representing a sinusoidal quantity's magnitude and phase at a single instant) is a static snapshot used to simplify AC analysis, not a moment-by-moment plot of the waveform over time; that kind of second-by-second plot is a waveform graph, not a phasor diagram.",
  ),
  tf(
    'aeaca-030',
    'The impedance of a series RC circuit is written in rectangular form as $Z=R+jX_C$.',
    false,
    "This is false: a series RC circuit's (a resistor and capacitor connected in series on an AC supply) impedance (a circuit's total opposition to alternating current, combining resistance and reactance) in rectangular form (a resistance part plus an imaginary reactance part) is $Z=R-jX_C$, with a negative sign, since capacitive reactance $X_C$ opposes inductive reactance in direction on the imaginary axis.",
  ),
];
