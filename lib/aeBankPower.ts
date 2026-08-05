import type { MCQuestion, TFQuestion, AppliedElectricityQuestion } from './appliedElectricityTypes.ts';

// Curated MCQ/TF bank for the "power" topic of the Applied Electricity course.
// 22 MCQ + 8 TF (exactly 4 true / 4 false). Ids aepow-001 .. aepow-030.
//
// Facts not found in the source lecture-deck extract (docs/appliedElectricity/source-extracts/lecture-deck.txt),
// included as standard first-year electrical-engineering facts:
//  - the explicit Pythagorean formula S = sqrt(P^2 + Q^2) (the deck only describes apparent power as the
//    "vector sum" / "complex power" magnitude of real and reactive power, without giving the formula)
//  - the power triangle as a right triangle with P and Q as the two perpendicular legs, S as the hypotenuse,
//    and phi as the included angle (the deck has only a bare slide title "Power Triangle" with no body content)
//  - the explicit formulas P = VI cos(phi) and Q = VI sin(phi)
//  - the definition of instantaneous power (the product of instantaneous voltage and instantaneous current
//    at one moment) and its explicit contrast with average power
//  - that the average power delivered to a purely reactive element (an ideal inductor or capacitor alone)
//    is exactly zero over a complete cycle

const mcq = (
  id: string,
  prompt: string,
  choices: [string, string, string, string],
  correctIndex: number,
  rationale: string,
): MCQuestion => ({
  id,
  topic: 'power',
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
  topic: 'power',
  type: 'tf',
  prompt,
  correctAnswer,
  rationale,
});

export const powerQuestions: AppliedElectricityQuestion[] = [
  mcq(
    'aepow-001',
    'In an AC circuit, what does real power (also called active power), P, represent?',
    [
      'The power exchanged back and forth with inductors and capacitors that does no net work',
      'The power actually consumed by the load and converted to useful work or heat',
      'The total combined power flowing in the circuit regardless of phase',
      "The power rating printed on a transformer's nameplate, always in kVA",
    ],
    1,
    'Real power (also called active power, measured in watts, W - the power actually consumed by the load and converted into useful work or heat) does useful work, unlike reactive power (power that sloshes back and forth with inductors or capacitors without doing net work).',
  ),
  mcq(
    'aepow-002',
    'What is the standard unit of real (active) power?',
    ['Volt-amperes reactive (VAR)', 'Ohms', 'Watts (W)', 'Volt-amperes (VA)'],
    2,
    'Real power (also called active power - the power actually consumed by a load and converted to useful work or heat) is measured in watts, W; volt-amperes reactive, or VAR, measures reactive power instead, and volt-amperes, or VA, measures apparent power.',
  ),
  mcq(
    'aepow-003',
    'What is reactive power, Q, in an AC circuit?',
    [
      'The power actually consumed and converted to heat or work, measured in watts',
      'The power exchanged back and forth with inductors and capacitors, doing no net work, measured in volt-amperes reactive (VAR)',
      'The combined magnitude of all power flowing in the circuit, measured in volt-amperes (VA)',
      'The power lost to resistance in the transmission wires only',
    ],
    1,
    "Reactive power (Q, measured in volt-amperes reactive, or VAR) sloshes back and forth between the source and an inductor's or capacitor's field each cycle; it does no net work, unlike real power (the power actually consumed, in watts).",
  ),
  mcq(
    'aepow-004',
    "Why is it said that reactive power (Q) 'does no net work'?",
    [
      'Because it only exists in DC circuits, not AC',
      "Because the energy it represents is stored in an inductor's or capacitor's field for part of the cycle and returned to the source the rest of the cycle, with zero net transfer",
      'Because it is always exactly equal to the real power',
      'Because reactive power only flows through resistors',
    ],
    1,
    "Reactive power (Q, measured in volt-amperes reactive, VAR) is stored in an inductor's magnetic field or a capacitor's electric field during part of the AC (alternating current - current that periodically reverses direction) cycle, then given straight back to the source later in that same cycle, so the net energy transferred over a full cycle is zero.",
  ),
  mcq(
    'aepow-005',
    'What is apparent power, S, in an AC circuit?',
    [
      'The vector combination of real and reactive power, measured in volt-amperes (VA)',
      "Only the resistive part of the load's power, measured in watts",
      'The power factor expressed as a percentage',
      'The peak instantaneous power reached during the cycle',
    ],
    0,
    'Apparent power (S, measured in volt-amperes, VA) combines real power (P, the power actually consumed, in watts) and reactive power (Q, the power exchanged with inductors or capacitors, in VAR) into a single total; it is their vector combination, not a plain sum.',
  ),
  mcq(
    'aepow-006',
    'A load draws real power P = 6 kW and reactive power Q = 8 kVAR. Using $S = \\sqrt{P^2+Q^2}$, what is the apparent power S?',
    ['14 kVA', '2 kVA', '10 kVA', '48 kVA'],
    2,
    'Apparent power S (the vector combination of real power P, in watts, and reactive power Q, in VAR, itself measured in volt-amperes, VA) is $S=\\sqrt{P^2+Q^2}=\\sqrt{6^2+8^2}=\\sqrt{100}=10$ kVA; simply adding P and Q, giving 14 kVA, ignores that they combine at right angles rather than in a straight line.',
  ),
  mcq(
    'aepow-007',
    'In the power triangle, which quantity forms the hypotenuse (longest side), with real power and reactive power as the two shorter, perpendicular sides?',
    ['Power factor', 'Apparent power (S)', 'Reactive power (Q)', 'Real power (P)'],
    1,
    'The power triangle is a right-triangle picture of the relationship $S=\\sqrt{P^2+Q^2}$: real power (P, in watts, the power actually consumed) and reactive power (Q, in VAR, the power exchanged with inductors or capacitors) form the two perpendicular sides, and apparent power (S, in VA, their combined total) forms the hypotenuse.',
  ),
  mcq(
    'aepow-008',
    'In the power triangle, the angle φ between the real-power side and the apparent-power side (the hypotenuse) is used to define which quantity?',
    ['The apparent power in VAR', 'The frequency of the supply', 'The reactive power in watts', 'The power factor, as cos φ'],
    3,
    'The angle phi (φ - the phase angle between the real-power side, P, and the hypotenuse, apparent power S, in the power triangle) defines the power factor as cos φ; it is not itself a power quantity like reactive power (Q, correctly in VAR, not watts) or apparent power (correctly in VA, not VAR).',
  ),
  mcq(
    'aepow-009',
    'How is the power factor of an AC circuit defined?',
    [
      'As the reactive power divided by the real power',
      'As the square root of the apparent power',
      'As the frequency divided by the period',
      'As real power divided by apparent power, cos φ = P/S',
    ],
    3,
    'Power factor (pf, a dimensionless number describing how much of the apparent power S, in volt-amperes, VA, is actually real power P, in watts) is defined as $\\cos\\varphi = P/S$, where φ is the phase angle between voltage and current.',
  ),
  mcq(
    'aepow-010',
    'An AC load has a real power of 4500 W and an apparent power of 5000 VA. Using pf = P/S, what is its power factor?',
    ['0.9', '0.6', '1.11', '4500'],
    0,
    'Power factor (pf, the ratio of real power P, in watts, to apparent power S, in volt-amperes, VA) is $4500/5000 = 0.9$, a value between 0 and 1 that shows most of the apparent power supplied is being used as real power.',
  ),
  mcq(
    'aepow-011',
    'For a purely resistive AC load (a load containing only resistance, no inductance or capacitance), what is its power factor?',
    ['0', '0.5', '1', '-1'],
    2,
    'A purely resistive load (one with only resistance, no inductive or capacitive reactance) has voltage and current perfectly in phase, giving a power factor (pf = cos φ, real power divided by apparent power) of 1, meaning all the apparent power is real power.',
  ),
  mcq(
    'aepow-012',
    'For a purely inductive or purely capacitive AC load (a load with no resistance at all), what is its power factor?',
    ['1', '0.5', '0.707', '0'],
    3,
    "A purely inductive or purely capacitive load (containing no resistance) has current and voltage 90 degrees out of phase, so all the power flowing is reactive power (power exchanged with the inductor's or capacitor's field, doing no net work) and the power factor (pf = cos φ, real power divided by apparent power) is 0.",
  ),
  mcq(
    'aepow-013',
    "A load's current waveform reaches its peak before the voltage waveform does. What kind of power factor and load does this indicate?",
    [
      'A leading power factor, indicating a capacitive load',
      'A lagging power factor, indicating an inductive load',
      'A unity power factor, indicating a purely resistive load',
      'A lagging power factor, indicating a capacitive load',
    ],
    0,
    'When current reaches its peak ahead of voltage, the current is said to lead the voltage, which gives a leading power factor (pf = cos φ with current ahead of voltage in phase) - the signature of a capacitive load, one dominated by capacitance.',
  ),
  mcq(
    'aepow-014',
    "A load's current waveform reaches its peak after the voltage waveform does. What kind of power factor and load does this indicate?",
    [
      'A leading power factor, indicating a capacitive load',
      'A lagging power factor, indicating an inductive load',
      'A unity power factor, indicating a purely resistive load',
      'A leading power factor, indicating a purely resistive load',
    ],
    1,
    'When current reaches its peak after voltage, the current is said to lag the voltage, which gives a lagging power factor (pf = cos φ with current behind voltage in phase) - the signature of an inductive load, one dominated by inductance.',
  ),
  mcq(
    'aepow-015',
    'An AC load has an rms voltage of 200 V, an rms current of 10 A, and a power factor of 0.8. Using $P = VI\\cos\\varphi$, what is the real power delivered?',
    ['2000 W', '1000 W', '1250 W', '1600 W'],
    3,
    'Real power (P, the power actually consumed by the load, in watts) is $P = VI\\cos\\varphi = 200 \\times 10 \\times 0.8 = 1600$ W; multiplying V and I alone without the power factor (cos φ, the ratio of real to apparent power) would wrongly give the full 2000 VA of apparent power instead.',
  ),
  mcq(
    'aepow-016',
    'For the same AC load (200 V rms, 10 A rms, power factor 0.8, so sin φ = 0.6), using $Q = VI\\sin\\varphi$, what is the reactive power?',
    ['2000 VAR', '1600 VAR', '1200 VAR', '600 VAR'],
    2,
    'Reactive power (Q, the power exchanged with the load\'s inductive or capacitive part, in volt-amperes reactive, VAR) is $Q = VI\\sin\\varphi = 200 \\times 10 \\times 0.6 = 1200$ VAR, distinct from the real power (P, in watts) of 1600 W found using cos φ instead of sin φ.',
  ),
  mcq(
    'aepow-017',
    'Two loads both need to deliver the same real power, P, from the same supply voltage. Load A has a power factor of 0.9 and Load B has a power factor of 0.5. Which load draws more current from the supply?',
    [
      'Load B, because its lower power factor means more apparent power (and thus more current) is needed for the same real power',
      'Load A, because a higher power factor always means more current',
      'Both draw exactly the same current regardless of power factor',
      'Neither draws any current since both deliver the same real power',
    ],
    0,
    'Since $P = VI\\cos\\varphi$, for a fixed real power P and voltage V, a lower power factor (cos φ, real power divided by apparent power) means the current I must be larger to compensate, so Load B, with the lower power factor of 0.5, draws more current than Load A.',
  ),
  mcq(
    'aepow-018',
    'A factory needs to deliver 2 kW of real power to its equipment. At a power factor of 0.25, using $S = P/\\cos\\varphi$, how much apparent power must the supply provide?',
    ['0.5 kVA', '2 kVA', '4 kVA', '8 kVA'],
    3,
    'Apparent power (S, in volt-amperes, VA - what the supply and wiring must actually carry) is $S = P/\\cos\\varphi = 2\\text{ kW}/0.25 = 8$ kVA; at a low power factor (cos φ, the fraction of apparent power that is real power) like 0.25, far more apparent power must be supplied than the 2 kW of real power actually used.',
  ),
  mcq(
    'aepow-019',
    'A factory has a large bank of induction motors, giving the overall load a lagging power factor (current behind voltage, typical of inductive loads). What component is typically added to correct this toward unity power factor?',
    ['Capacitors', 'Resistors', 'Inductors, to add more lag', 'Transformers rated in kVA'],
    0,
    "Power-factor correction (adjusting a lagging power factor, caused by inductive loads such as motors, back toward 1) is achieved by connecting capacitors to the supply, since a capacitor's leading effect (current ahead of voltage) offsets the motor's lagging effect (current behind voltage).",
  ),
  mcq(
    'aepow-020',
    'What is the main practical benefit of power-factor correction (adding capacitors to raise a lagging power factor toward 1) for a factory\'s electrical supply?',
    [
      'It increases the real power the equipment can produce',
      'It changes the mains frequency to reduce losses',
      'It reduces the current the supply must carry for the same real power, cutting losses and easing the burden on the supply',
      'It eliminates the need for real power entirely',
    ],
    2,
    'Because a higher power factor (cos φ, real power divided by apparent power) means less current is needed to deliver the same real power (P, in watts), power-factor correction (raising the power factor of an inductive, or lagging, load with capacitors) reduces current, transmission losses, and the load on the supply system.',
  ),
  mcq(
    'aepow-021',
    'What does the instantaneous power in an AC circuit refer to?',
    [
      'The power factor at the start of the cycle',
      'The average power delivered over one full cycle',
      'The peak power reached only once per cycle',
      'The power at one specific moment in time, given by the product of the instantaneous voltage and instantaneous current at that instant',
    ],
    3,
    'Instantaneous power (the power at one specific moment, found by multiplying the instantaneous voltage and instantaneous current - their values at that exact instant - together) constantly changes throughout the AC cycle, unlike average power (the mean power delivered over a full cycle), which is a single steady figure.',
  ),
  mcq(
    'aepow-022',
    'For a purely resistive AC load, how does the average power delivered over a complete cycle compare to the instantaneous power at any single moment?',
    [
      'The instantaneous power (power at one specific moment) rises and falls throughout the cycle, while the average power (the mean value over the full cycle) is a single steady figure found using the rms voltage and current',
      'They are always identical at every instant',
      'The average power is always zero, like in a purely reactive element',
      'The instantaneous power never varies for a resistive load',
    ],
    0,
    'In a purely resistive load, the instantaneous power (power at one specific moment, from multiplying instantaneous voltage and instantaneous current) rises and falls twice per cycle as the current reverses, but because power is always positive in a pure resistor, the average power (the mean over a full cycle) is a single non-zero steady value, unlike a purely reactive element (an inductor or capacitor alone), where the average power is zero.',
  ),
  tf(
    'aepow-023',
    'Apparent power, S, is measured in volt-amperes (VA).',
    true,
    'This is true: apparent power (S - the vector combination of real power and reactive power) is measured in volt-amperes, or VA, not watts.',
  ),
  tf(
    'aepow-024',
    'In a purely resistive AC circuit, current and voltage are in phase with each other.',
    true,
    'This is true: in a purely resistive circuit (one containing only resistors, no inductors or capacitors), current and voltage rise and fall together with zero phase angle between them, giving a power factor of 1.',
  ),
  tf(
    'aepow-025',
    'Reactive power, Q, is measured in watts.',
    false,
    'This is false: reactive power (Q - the power exchanged back and forth with an inductor or capacitor, doing no net work) is measured in volt-amperes reactive, or VAR; watts are the unit of real power.',
  ),
  tf(
    'aepow-026',
    'The apparent power of a circuit is found by simply adding the real power and the reactive power together (S = P + Q).',
    false,
    'This is false: apparent power (S, in volt-amperes, VA) is found from the Pythagorean combination $S=\\sqrt{P^2+Q^2}$, not a plain sum, because real power (P, in watts) and reactive power (Q, in VAR) act at right angles to each other.',
  ),
  tf(
    'aepow-027',
    'The power delivered to a purely reactive component, such as an ideal inductor or capacitor, averages to zero over a complete AC cycle.',
    true,
    'This is true: a purely reactive component (one with no resistance, only inductance or capacitance) stores energy from the source for part of the cycle and returns all of it during the rest of the cycle, so the average power over a full cycle is zero even though the instantaneous power is not.',
  ),
  tf(
    'aepow-028',
    'A leading power factor is associated with an inductive load.',
    false,
    'This is false: a leading power factor (where the current waveform reaches its peak before the voltage waveform does) is associated with a capacitive load; an inductive load instead produces a lagging power factor, with current peaking after voltage.',
  ),
  tf(
    'aepow-029',
    'Power-factor correction for an inductive (lagging) load is typically achieved by adding capacitors to the circuit.',
    true,
    'This is true: power-factor correction (adjusting a circuit\'s power factor closer to 1 by adding reactive components) for an inductive load (one that produces a lagging power factor, current behind voltage) is done by connecting capacitors, which supply a leading effect that offsets the lag.',
  ),
  tf(
    'aepow-030',
    'A low power factor means less current is needed to deliver the same real power to a load.',
    false,
    'This is false: a low power factor (a small ratio of real power, in watts, to apparent power, in VA) means more current is needed to deliver the same real power, not less, since a larger share of the apparent power is reactive rather than real.',
  ),
];
