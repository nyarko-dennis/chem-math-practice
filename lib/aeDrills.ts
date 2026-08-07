import type { AeDrill } from './appliedElectricityTypes.ts';

export { AE_DRILL_LABELS } from './appliedElectricityTypes.ts';
export type { AeDrill, AeDrillKind, RubricPoint } from './appliedElectricityTypes.ts';

export const aeDrills: AeDrill[] = [
  // ---------------------------------------------------------------------
  // dcCircuits
  // ---------------------------------------------------------------------
  {
    id: 'aedr-001',
    topic: 'dcCircuits',
    drillKind: 'explainConcept',
    type: 'drill',
    prompt:
      'State Ohm\'s law and explain, in plain terms, why a resistor placed in a circuit turns electrical energy into heat. ' +
      'Use the formula P = I²R in your explanation.',
    marks: 6,
    rubric: [
      { id: 'r1', label: 'Ohm\'s law stated', detail: 'V = IR: the voltage (electrical push, measured in volts) across a resistor equals the current (flow of charge, measured in amps) through it times its resistance (opposition to that flow, measured in ohms).', marks: 2 },
      { id: 'r2', label: 'Why heat is produced', detail: 'Moving charge carriers collide with the fixed atoms inside the resistor and lose energy on every collision; that lost energy appears as heat.', marks: 2 },
      { id: 'r3', label: 'Power formula linked', detail: 'P = I²R gives the rate that energy is turned into heat, and shows the heat grows with the square of the current, not just in proportion to it.', marks: 2 },
    ],
    modelAnswer:
      'Ohm\'s law says that the voltage (the electrical push that drives charge around a circuit, measured in volts) across a resistor equals the current (the flow of charge past a point, measured in amps) through it, multiplied by its resistance (how much the resistor opposes that flow, measured in ohms). Written as a formula, this is V = IR.\n\n' +
      'A resistor turns electrical energy into heat because of what is happening at the level of the moving charge. Current is really a stream of tiny charged particles, electrons, drifting through the material. As they drift, they constantly bump into the fixed atoms that make up the resistor. Each collision knocks a small amount of energy out of the moving electron and into the atom it hit, making that atom vibrate a little more. More vibration of the atoms is exactly what heat is, so every collision converts a little electrical energy into heat energy. A resistor is simply a material chosen to make plenty of these collisions happen.\n\n' +
      'The formula P = I²R, where P is power (the rate energy is used, measured in watts), captures this precisely. It shows that the heat produced does not just grow in step with the current, it grows with the current squared, so doubling the current quadruples the heat produced. This happens because a bigger current means both more collisions per second and each collision on average carrying more energy, and those two effects multiply together. This is why a wire carrying too much current can overheat even though its resistance did not change.',
  },
  {
    id: 'aedr-002',
    topic: 'dcCircuits',
    drillKind: 'analyseCircuit',
    type: 'drill',
    prompt:
      'A 12 V battery supplies a 4 Ω resistor in series with a parallel combination of a 6 Ω and a 3 Ω resistor. ' +
      'Find (a) the equivalent resistance of the parallel pair, (b) the total circuit resistance, (c) the total current drawn from the battery, ' +
      'and (d) the voltage across the parallel pair.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Parallel pair combined', detail: 'The 6 Ω and 3 Ω resistors sitting side by side (in parallel) combine to 1/(1/6 + 1/3) = 2 Ω.', marks: 2 },
      { id: 'r2', label: 'Total resistance found', detail: 'The 4 Ω resistor sits in the same current path as the pair (in series), so the total opposition is 4 + 2 = 6 Ω.', marks: 2 },
      { id: 'r3', label: 'Total current found', detail: 'Using V = IR on the whole circuit: I = 12 / 6 = 2 A drawn from the battery.', marks: 2 },
      { id: 'r4', label: 'Parallel-pair voltage found', detail: 'The same 2 A flows through the 2 Ω equivalent, so its voltage is V = IR = 2 × 2 = 4 V.', marks: 2 },
    ],
    modelAnswer:
      'The two resistors that sit side by side, sharing the same two connection points, are said to be in parallel (6 Ω and 3 Ω). Resistors in parallel combine by adding the reciprocals of each value: 1/Rp = 1/6 + 1/3 = 1/6 + 2/6 = 3/6, so Rp = 2 Ω. This equivalent resistance is always smaller than the smallest individual resistor, because adding a second path gives the current more ways through.\n\n' +
      'The 4 Ω resistor sits in the single path that all the current must pass through before it reaches that parallel pair, so it is in series with the pair. Resistors in series simply add: total resistance = 4 + 2 = 6 Ω.\n\n' +
      'With the whole circuit reduced to one resistance, Ohm\'s law (voltage equals current times resistance, V = IR) can be applied to the battery and the total resistance together: current I = V / R = 12 / 6 = 2 amps. This 2 A is the total current the battery has to supply, and because the 4 Ω resistor is in series, this entire 2 A must flow through it before splitting between the 6 Ω and 3 Ω branches.\n\n' +
      'Because the 4 Ω resistor and the parallel pair are in series, the same 2 A that flows through the 4 Ω resistor also flows into the parallel pair as a whole (it then splits unevenly between the 6 Ω and 3 Ω branches inside the pair, with more going through the smaller 3 Ω path). The voltage across the whole parallel pair is therefore V = IR = 2 A × 2 Ω = 4 V. As a check, the 4 Ω resistor must carry the remaining 12 - 4 = 8 V, and 8 V / 4 Ω = 2 A, which matches the total current found above.',
  },
  {
    id: 'aedr-003',
    topic: 'dcCircuits',
    drillKind: 'computeStepwise',
    type: 'drill',
    prompt:
      'A voltage divider is built from a 20 V supply feeding two resistors in series: R1 = 8 Ω and R2 = 12 Ω. ' +
      'Compute, step by step, the current in the circuit, the voltage across R2, and the power dissipated in R2.',
    marks: 7,
    rubric: [
      { id: 'r1', label: 'Total resistance found', detail: 'R1 and R2 sit in a single loop (series), so total resistance = 8 + 12 = 20 Ω.', marks: 1 },
      { id: 'r2', label: 'Current found', detail: 'I = V / R_total = 20 / 20 = 1 A, the same current flows through both resistors since they are in series.', marks: 2 },
      { id: 'r3', label: 'Voltage across R2 found', detail: 'Using the divider idea (or V = IR directly): V2 = I × R2 = 1 × 12 = 12 V.', marks: 2 },
      { id: 'r4', label: 'Power in R2 found', detail: 'P2 = I²R2 = 1² × 12 = 12 W (or equivalently V2 × I = 12 × 1 = 12 W).', marks: 2 },
    ],
    modelAnswer:
      'The first step is to find the total resistance the 20 V supply is pushing current through. Because R1 and R2 sit one after the other in a single loop with no branching (this arrangement is called series), their resistances simply add: R_total = R1 + R2 = 8 + 12 = 20 Ω.\n\n' +
      'The second step uses Ohm\'s law (V = IR, relating voltage, current, and resistance) on the whole loop to find the current: I = V / R_total = 20 / 20 = 1 A. Because R1 and R2 are in series, exactly this same 1 A flows through both of them, one after the other, with none of it branching off anywhere else.\n\n' +
      'The third step finds the voltage across R2 alone, which is the idea behind a "voltage divider" - splitting a supply voltage across two or more series resistors in proportion to their size. Since the same 1 A flows through R2, Ohm\'s law applied just to R2 gives V2 = I × R2 = 1 × 12 = 12 V. As a sanity check, R1 must then be dropping the remaining 20 - 12 = 8 V, and indeed 1 A × 8 Ω = 8 V, so the two voltages add back up to the 20 V supplied.\n\n' +
      'The final step finds the power dissipated (the rate at which electrical energy is being turned into heat, measured in watts) in R2, using P = I²R: P2 = 1² × 12 = 12 W. The same answer comes from P = V × I = 12 × 1 = 12 W, confirming the result.',
  },

  // ---------------------------------------------------------------------
  // networkTheorems
  // ---------------------------------------------------------------------
  {
    id: 'aedr-004',
    topic: 'networkTheorems',
    drillKind: 'deriveEquivalent',
    type: 'drill',
    prompt:
      'A 24 V battery is connected in series with a 6 Ω resistor (R1), and this pair feeds a load resistor RL through node A. ' +
      'A second resistor, R2 = 12 Ω, connects node A to the negative battery terminal (i.e. R2 is in parallel with the RL terminals, ' +
      'seen from A back into the source). Derive the Thevenin equivalent circuit (Thevenin voltage and Thevenin resistance) as seen by RL, step by step.',
    marks: 9,
    rubric: [
      { id: 'r1', label: 'Load removed', detail: 'The first step of any Thevenin derivation is to mentally disconnect the load (RL) from the two terminals being analysed, leaving the rest of the network open at those terminals.', marks: 1 },
      { id: 'r2', label: 'Open-circuit voltage set up', detail: 'With RL removed, no current flows into the open branch, so R1 and R2 form a simple series loop across the 24 V source, letting a plain voltage-divider calculation give the voltage at node A.', marks: 2 },
      { id: 'r3', label: 'Thevenin voltage computed', detail: 'V_th = 24 × R2 / (R1 + R2) = 24 × 12 / 18 = 16 V.', marks: 2 },
      { id: 'r4', label: 'Sources deactivated', detail: 'To find the resistance, the voltage source is replaced by a short circuit (a plain wire), since an ideal voltage source has zero internal resistance.', marks: 2 },
      { id: 'r5', label: 'Thevenin resistance computed', detail: 'Looking back into the terminals with the source shorted, R1 and R2 now sit side by side (in parallel): R_th = (6 × 12) / (6 + 12) = 4 Ω.', marks: 2 },
    ],
    modelAnswer:
      'Deriving a Thevenin equivalent (a simplified stand-in circuit made of just one voltage source and one series resistance that behaves exactly like the original network, as seen from two chosen terminals) always starts the same way: temporarily remove the load, here RL, leaving the two terminals it was connected to open.\n\n' +
      'With RL disconnected, no current can flow into that open branch, so the only current path left is the simple loop formed by the 24 V source, R1, and R2 in series. Because R1 and R2 now form a plain voltage divider (a series pair that splits a supply voltage in proportion to resistance) across the source, the voltage appearing at node A (which is the open-circuit voltage between the two terminals, called the Thevenin voltage) is V_th = 24 × R2 / (R1 + R2) = 24 × 12 / (6 + 12) = 24 × 12 / 18 = 16 V.\n\n' +
      'To find the Thevenin resistance (the resistance measured looking back into the terminals with every source turned off), the 24 V source is replaced by a short circuit - a plain connecting wire with no resistance of its own - because an ideal voltage source is assumed to offer no opposition to current on its own. With the source shorted, R1 and R2 are no longer in series; instead, both now connect the same two terminals to each other, which is the definition of being in parallel. Their combined value is R_th = (R1 × R2) / (R1 + R2) = (6 × 12) / 18 = 72 / 18 = 4 Ω.\n\n' +
      'So the whole network, as seen by RL, behaves exactly like a single 16 V source in series with a single 4 Ω resistor, whatever value RL is reconnected with afterward.',
  },
  {
    id: 'aedr-005',
    topic: 'networkTheorems',
    drillKind: 'deriveEquivalent',
    type: 'drill',
    prompt:
      'For the same network as above (24 V source, R1 = 6 Ω in series with the source, R2 = 12 Ω across the output terminals where RL connects), ' +
      'derive the Norton equivalent circuit (Norton current and Norton resistance) step by step, and state how a Norton equivalent relates to a Thevenin equivalent.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Terminals shorted', detail: 'A Norton derivation replaces the load with a plain wire (a short circuit) across the same two terminals, instead of leaving them open as Thevenin does.', marks: 2 },
      { id: 'r2', label: 'Short-circuit current found', detail: 'Shorting the output terminals removes R2 from the current path (all current takes the zero-resistance short instead), so the current from the source is limited only by R1: I_N = 24 / 6 = 4 A.', marks: 2 },
      { id: 'r3', label: 'Norton resistance found', detail: 'Norton resistance is found the same way as Thevenin resistance: deactivate the source (short it) and look back into the terminals, giving the same R1 ∥ R2 = 4 Ω found before.', marks: 2 },
      { id: 'r4', label: 'Relationship to Thevenin stated', detail: 'A Norton equivalent (current source with a parallel resistance) and a Thevenin equivalent (voltage source with a series resistance) describe the exact same network and always share the same resistance value; they convert into each other using V_th = I_N × R_N.', marks: 2 },
    ],
    modelAnswer:
      'A Norton equivalent is a simplified stand-in circuit made of a single current source with a resistance in parallel with it, and it is derived with almost the same procedure as a Thevenin equivalent, except for one key step.\n\n' +
      'Instead of leaving the output terminals open (as in a Thevenin derivation), a Norton derivation places a short circuit - a plain wire with no resistance - directly across the two terminals where the load used to connect, and asks how much current flows through that short. In this circuit, shorting the output terminals means R2 no longer carries any current, because current always prefers the path of zero resistance offered by the short rather than flowing through R2 at all. This leaves R1 as the only thing limiting current from the source, so the short-circuit current is I_N = V / R1 = 24 / 6 = 4 A. This value, I_N, is the Norton current.\n\n' +
      'The Norton resistance is found exactly the same way as a Thevenin resistance: turn off the source (replace the 24 V battery with a short circuit) and look back into the terminals to see what resistance remains. With the source shorted, R1 and R2 both connect the same two terminals, so they are in parallel: R_N = (6 × 12) / 18 = 4 Ω, matching R_th found for this same network by the Thevenin method.\n\n' +
      'A Norton equivalent and a Thevenin equivalent are not two different results, they are two different ways of describing the exact same network as seen from the same two terminals, and they always share the same resistance value (R_N = R_th). They convert into one another with V_th = I_N × R_N, giving 4 A × 4 Ω = 16 V, which matches the 16 V Thevenin voltage found for this network directly.',
  },
  {
    id: 'aedr-006',
    topic: 'networkTheorems',
    drillKind: 'explainConcept',
    type: 'drill',
    prompt:
      'Explain Kirchhoff\'s Current Law (KCL) and Kirchhoff\'s Voltage Law (KVL) in plain terms, stating the physical conservation ' +
      'principle each law rests on.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'KCL stated', detail: 'At any junction (a point where three or more wires meet) in a circuit, the total current flowing in equals the total current flowing out.', marks: 2 },
      { id: 'r2', label: 'KCL principle', detail: 'KCL rests on conservation of charge: charge cannot pile up or vanish at a junction, so whatever current arrives must leave by some path.', marks: 2 },
      { id: 'r3', label: 'KVL stated', detail: 'Around any closed loop (a path that starts and ends at the same point) in a circuit, the sum of all the voltage rises and drops adds up to zero.', marks: 2 },
      { id: 'r4', label: 'KVL principle', detail: 'KVL rests on conservation of energy: a charge that travels all the way around a loop and returns to its starting point must end up with exactly the same energy it started with, so every energy gain from a source must be matched by an equal energy loss across the components.', marks: 2 },
    ],
    modelAnswer:
      'Kirchhoff\'s Current Law (KCL) says that at any junction in a circuit - a point where three or more wires meet - the total current flowing into that point must exactly equal the total current flowing out of it. If three wires meet at a junction and two of them are carrying current in, the third wire must be carrying exactly the sum of those two currents back out.\n\n' +
      'The physical idea behind KCL is conservation of charge, the principle that electric charge is never created or destroyed, only moved around. A junction is just a point in a wire, it has no way to store extra charge or manufacture new charge out of nothing, so whatever amount of charge flows in during any moment must flow back out during that same moment. If current in did not equal current out, charge would have to be silently piling up or disappearing at that single point, which is not physically possible.\n\n' +
      'Kirchhoff\'s Voltage Law (KVL) says that if you add up all the voltage rises (gains, such as from a battery) and voltage drops (losses, such as across a resistor) all the way around any closed loop in a circuit - meaning a path of wires and components that starts and ends at the same point - the total comes to exactly zero.\n\n' +
      'The physical idea behind KVL is conservation of energy: a small charge that travels once all the way around a closed loop and returns to exactly where it started must return with exactly the same amount of energy it had at the start, because nothing else in the loop can create or destroy energy on its own. Every bit of energy the charge picks up from a source (a voltage rise) must therefore be matched by an equal amount of energy it gives up crossing resistors and other components (voltage drops) by the time it gets back around.',
  },

  // ---------------------------------------------------------------------
  // capacitors
  // ---------------------------------------------------------------------
  {
    id: 'aedr-007',
    topic: 'capacitors',
    drillKind: 'explainConcept',
    type: 'drill',
    prompt:
      'Explain why a capacitor blocks steady direct current (DC) once it is fully charged, but allows current to flow briefly the ' +
      'moment it is first connected.',
    marks: 7,
    rubric: [
      { id: 'r1', label: 'Capacitor structure', detail: 'A capacitor is two conducting plates separated by an insulating gap (a dielectric), so no charge can physically cross straight through it.', marks: 2 },
      { id: 'r2', label: 'Initial charging current', detail: 'When first connected, charge piles up on one plate and is pushed off the other, which looks like current flowing "through" the capacitor even though no charge actually crosses the gap.', marks: 2 },
      { id: 'r3', label: 'Steady-state blocking behaviour', detail: 'As charge builds up, it creates an opposing voltage across the gap that grows until it matches the supply voltage exactly, at which point no further charge moves and the current drops to zero.', marks: 3 },
    ],
    modelAnswer:
      'A capacitor is built from two conducting plates (usually thin metal) with an insulating gap between them, called the dielectric, that ordinary charge cannot physically cross. Because of this gap, no direct current can actually flow straight through a capacitor the way it flows through a plain wire or a resistor.\n\n' +
      'However, the instant a capacitor is first connected to a DC supply (a source that pushes charge in one steady direction, such as a battery), current does flow for a short while, even though nothing crosses the gap. What is really happening is that the supply pushes electrons onto one plate, building up a negative charge there, while at the same time pulling an equal number of electrons off the other plate, leaving it positively charged. Charge is moving onto one plate and off the other plate at the same rate, and to any meter connected in the circuit this looks exactly like ordinary current flowing "through" the capacitor, even though every electron involved only ever moves as far as its own plate.\n\n' +
      'As more and more charge piles up on the two plates, it creates its own voltage across the gap, pushing back against the supply voltage that is driving the charging. This opposing voltage keeps growing as charging continues, and the rate of charging slows down as it does, because the difference between the supply voltage and the capacitor\'s own voltage is what is actually driving the remaining charge movement. Once the capacitor\'s voltage has grown to exactly match the steady supply voltage, there is no voltage difference left to push any more charge onto the plates, so the current falls to zero. From that point on, the fully charged capacitor simply sits there blocking any further steady current, which is exactly why a capacitor is described as blocking DC once fully charged.',
  },
  {
    id: 'aedr-008',
    topic: 'capacitors',
    drillKind: 'analyseCircuit',
    type: 'drill',
    prompt:
      'Two capacitors, C1 = 6 μF and C2 = 3 μF, are connected in series across a 9 V supply. Find (a) the equivalent capacitance, ' +
      '(b) the charge stored on the combination, and (c) the voltage across C2.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Series capacitance formula used', detail: 'Capacitors joined end to end in a single path (in series) combine by adding reciprocals, the opposite rule from resistors: 1/Ceq = 1/C1 + 1/C2.', marks: 2 },
      { id: 'r2', label: 'Equivalent capacitance computed', detail: '1/Ceq = 1/6 + 1/3 = 1/6 + 2/6 = 3/6, so Ceq = 2 μF.', marks: 2 },
      { id: 'r3', label: 'Charge computed', detail: 'Using Q = CV on the equivalent: Q = 2 μF × 9 V = 18 μC. Series-connected capacitors all carry this same charge.', marks: 2 },
      { id: 'r4', label: 'Voltage across C2 found', detail: 'Since C2 carries the same 18 μC as the combination, V2 = Q / C2 = 18 μC / 3 μF = 6 V.', marks: 2 },
    ],
    modelAnswer:
      'Capacitance (C) is a measure of how much electric charge (Q, in coulombs) a capacitor can store for each volt (V) of voltage placed across it, linked by Q = CV, and it is measured in farads (here, microfarads, μF, meaning millionths of a farad).\n\n' +
      'When two capacitors are connected end to end in a single path with no branching, called being in series, they combine by adding the reciprocals of their values, which is the opposite rule to resistors in series. For C1 = 6 μF and C2 = 3 μF: 1/Ceq = 1/C1 + 1/C2 = 1/6 + 1/3 = 1/6 + 2/6 = 3/6, giving Ceq = 2 μF. Notice this equivalent value is smaller than either original capacitor, because putting capacitors in series is really like making the effective gap between the outer plates bigger, which reduces the total capacitance.\n\n' +
      'The total charge stored is found by applying Q = CV to this equivalent capacitance and the full supply voltage: Q = 2 μF × 9 V = 18 μC (microcoulombs). A key fact about series-connected capacitors is that, because they form a single unbroken path, exactly the same charge, 18 μC, sits on each individual capacitor in the chain, not just on the equivalent.\n\n' +
      'Knowing that C2 carries this same 18 μC lets its own voltage be found directly from Q = CV, rearranged to V = Q / C: V2 = 18 μC / 3 μF = 6 V. As a check, C1 must then carry the remaining voltage, V1 = 18 / 6 = 3 V, and 3 V + 6 V = 9 V, matching the supply exactly.',
  },
  {
    id: 'aedr-009',
    topic: 'capacitors',
    drillKind: 'computeStepwise',
    type: 'drill',
    prompt:
      'A 10 μF capacitor is charged through a 5 kΩ resistor from a 20 V supply. Compute, step by step, the RC time constant, ' +
      'and the approximate voltage on the capacitor after one time constant has passed (using the rule that a charging capacitor reaches ' +
      'about 63% of the supply voltage after one time constant).',
    marks: 7,
    rubric: [
      { id: 'r1', label: 'Time constant formula used', detail: 'The RC time constant (τ, tau) is the product of resistance and capacitance, τ = R × C, and sets the natural timescale of charging or discharging.', marks: 2 },
      { id: 'r2', label: 'Time constant computed with correct units', detail: 'τ = 5,000 Ω × 10 × 10⁻⁶ F = 0.05 s (50 ms).', marks: 2 },
      { id: 'r3', label: '63% rule applied', detail: 'After one time constant, a charging capacitor has climbed to about 63% of the way from its starting voltage to the final supply voltage.', marks: 1 },
      { id: 'r4', label: 'Voltage after one τ computed', detail: 'V ≈ 0.63 × 20 V = 12.6 V (starting from 0 V).', marks: 2 },
    ],
    modelAnswer:
      'The first step is to work out the RC time constant, written as τ (the Greek letter tau), which is the natural timescale that governs how fast a capacitor charges or discharges through a resistor. It is found simply by multiplying the resistance by the capacitance: τ = R × C.\n\n' +
      'Before multiplying, the units need to be consistent: R = 5 kΩ = 5,000 Ω, and C = 10 μF = 10 × 10⁻⁶ F (microfarads, meaning millionths of a farad). Multiplying these together: τ = 5,000 × 10 × 10⁻⁶ = 50,000 × 10⁻⁶ = 0.05 seconds, or 50 milliseconds. This means the capacitor\'s charging behaviour naturally unfolds over roughly a twentieth of a second, a useful sense-check on the size of the components involved.\n\n' +
      'The second step uses a standard rule about how a charging capacitor behaves: it does not charge at a constant rate, but rises quickly at first and then more and more slowly as it gets closer to the supply voltage. A convenient rule of thumb is that after exactly one time constant has passed, the capacitor has climbed about 63% of the way from wherever it started to the final voltage it is heading toward.\n\n' +
      'Starting from 0 V (uncharged) and charging toward the 20 V supply, after one time constant (50 ms) the capacitor voltage is approximately V ≈ 0.63 × 20 V = 12.6 V. The capacitor is still 7.4 V short of the full supply voltage at this point, and it will continue climbing, covering roughly 63% of whatever gap remains during each further time constant that passes, getting closer and closer to 20 V without ever quite reaching it in theory.',
  },

  // ---------------------------------------------------------------------
  // inductors
  // ---------------------------------------------------------------------
  {
    id: 'aedr-010',
    topic: 'inductors',
    drillKind: 'explainConcept',
    type: 'drill',
    prompt:
      'State Lenz\'s law and use it to explain why an inductor opposes a sudden change in the current flowing through it.',
    marks: 7,
    rubric: [
      { id: 'r1', label: 'Lenz\'s law stated', detail: 'The voltage (emf) induced by a changing magnetic field always acts in the direction that opposes the very change that produced it.', marks: 2 },
      { id: 'r2', label: 'Inductor structure/behaviour', detail: 'An inductor is usually a coil of wire; current flowing through it creates a magnetic field, and any change in that current changes the field.', marks: 2 },
      { id: 'r3', label: 'Opposition explained', detail: 'Because the induced voltage fights the change that caused it, an inductor resists a sudden increase or decrease in its own current, producing a back-voltage that pushes against the change.', marks: 3 },
    ],
    modelAnswer:
      'Lenz\'s law says that whenever a changing magnetic field induces a voltage (called an electromotive force, or emf) in a nearby conductor, that induced voltage always acts in whichever direction opposes the very change that created it in the first place, never in the direction that would help the change along.\n\n' +
      'An inductor is typically built as a coil of wire, and whenever current flows through it, that current sets up a magnetic field threading through the coil, similar to the field around any current-carrying wire but reinforced by the coil\'s many turns. If the current through the coil is perfectly steady, the magnetic field is steady too, and nothing changes, so nothing extra happens.\n\n' +
      'The moment the current tries to change, though, whether increasing or decreasing, the magnetic field threading the coil must change along with it, and by Faraday\'s and Lenz\'s laws, that changing field induces a voltage across the coil itself. Following Lenz\'s law, this induced voltage always points in the direction that opposes the change in current that produced it: if the current is trying to increase, the induced voltage pushes back against that increase; if the current is trying to decrease, the induced voltage instead tries to keep it flowing.\n\n' +
      'This is exactly why an inductor resists sudden changes in its own current. It is not that current cannot change through an inductor at all, it is that the coil always generates a back-voltage working against whatever change is being attempted, so the current can only actually change gradually rather than instantly. This behaviour is the direct electrical counterpart to a capacitor resisting sudden changes in its own voltage, and it is the reason inductors are used in circuits that need to smooth out current, such as filters and power supplies.',
  },
  {
    id: 'aedr-011',
    topic: 'inductors',
    drillKind: 'analyseCircuit',
    type: 'drill',
    prompt:
      'Two inductors, L1 = 8 mH and L2 = 4 mH, are connected in parallel with no mutual coupling between them. Find (a) the equivalent ' +
      'inductance, and (b) the energy stored in the equivalent inductor when the total current through the combination is 2 A ' +
      '(use E = ½LI²).',
    marks: 7,
    rubric: [
      { id: 'r1', label: 'Parallel inductance rule used', detail: 'Inductors in parallel combine by adding reciprocals, the same rule as resistors in parallel: 1/Leq = 1/L1 + 1/L2.', marks: 2 },
      { id: 'r2', label: 'Equivalent inductance computed', detail: '1/Leq = 1/8 + 1/4 = 1/8 + 2/8 = 3/8, so Leq = 8/3 ≈ 2.67 mH.', marks: 2 },
      { id: 'r3', label: 'Energy formula used', detail: 'The energy stored in an inductor\'s magnetic field is E = ½LI².', marks: 1 },
      { id: 'r4', label: 'Energy computed', detail: 'E = 0.5 × 2.67 × 10⁻³ × 2² = 0.5 × 2.67 × 10⁻³ × 4 ≈ 5.33 × 10⁻³ J ≈ 5.33 mJ.', marks: 2 },
    ],
    modelAnswer:
      'An inductor is a coil of wire that stores energy in the magnetic field it builds up as current flows through it; inductance (L, measured in henries, here millihenries, mH, meaning thousandths of a henry) measures how strongly a given change in current builds that field.\n\n' +
      'When two inductors are connected in parallel, meaning both ends of one are joined directly to both ends of the other so current can split between them, and there is no shared magnetic coupling between the coils, they combine using the same reciprocal rule as resistors in parallel: 1/Leq = 1/L1 + 1/L2. Substituting the given values: 1/Leq = 1/8 + 1/4 = 1/8 + 2/8 = 3/8, so Leq = 8/3 mH, which is approximately 2.67 mH. As expected for a parallel combination, this equivalent value is smaller than either individual inductor, since splitting the current across two paths reduces the overall opposition each path\'s field has to overcome.\n\n' +
      'The energy stored in an inductor\'s magnetic field is given by E = ½LI², where I is the current flowing through it. Using the equivalent inductance found above, converted to henries (2.67 mH = 2.67 × 10⁻³ H), and the given total current of 2 A: E = 0.5 × 2.67 × 10⁻³ × 2² = 0.5 × 2.67 × 10⁻³ × 4 ≈ 5.33 × 10⁻³ joules, or about 5.33 millijoules. This is the total energy tied up in the combined magnetic field of the two coils at the instant the current through them is 2 A.',
  },
  {
    id: 'aedr-012',
    topic: 'inductors',
    drillKind: 'compare',
    type: 'drill',
    prompt:
      'Compare capacitors and inductors under: (a) what physical quantity each stores energy in, (b) their behaviour to a sudden step ' +
      'in DC voltage or current, and (c) their behaviour once a steady DC condition is reached.',
    marks: 9,
    rubric: [
      { id: 'r1', label: 'Capacitor energy storage', detail: 'A capacitor stores energy in an electric field built up between its two charged plates.', marks: 1.5 },
      { id: 'r2', label: 'Inductor energy storage', detail: 'An inductor stores energy in a magnetic field built up around its current-carrying coil.', marks: 1.5 },
      { id: 'r3', label: 'Capacitor sudden-change behaviour', detail: 'A capacitor resists a sudden change in its own voltage; its voltage cannot jump instantly, but its current can.', marks: 1.5 },
      { id: 'r4', label: 'Inductor sudden-change behaviour', detail: 'An inductor resists a sudden change in its own current; its current cannot jump instantly, but its voltage can.', marks: 1.5 },
      { id: 'r5', label: 'Capacitor steady-DC behaviour', detail: 'Once fully charged under steady DC, a capacitor draws no more current and behaves like an open circuit (a break).', marks: 1.5 },
      { id: 'r6', label: 'Inductor steady-DC behaviour', detail: 'Once current is steady under DC, an inductor\'s field stops changing, it induces no more opposing voltage, and it behaves like a short circuit (a plain wire, aside from any winding resistance).', marks: 1.5 },
    ],
    modelAnswer:
      'A capacitor stores its energy in an electric field, built up in the insulating gap between its two oppositely charged plates. An inductor instead stores its energy in a magnetic field, built up in and around the coil of wire as current flows through it. Both are ways of storing energy without turning it into heat, but they store it in physically different fields.\n\n' +
      'The two components also react oppositely to a sudden change applied from outside. A capacitor fights any sudden change in its own voltage: because voltage is tied directly to how much charge sits on its plates, and charge cannot appear or vanish instantly, a capacitor\'s voltage can only change gradually, even though the current flowing into or out of it can jump instantly. An inductor does the reverse: because its induced voltage always opposes a change in its own current (by Lenz\'s law), an inductor\'s current can only change gradually, even though the voltage across it can jump instantly.\n\n' +
      'Finally, once a circuit settles into a steady, unchanging DC condition, the two components end up behaving like opposites. A fully charged capacitor under steady DC has no voltage difference left to drive further charge onto its plates, so no more current flows into it, and it behaves like an open circuit, a complete break in the path. An inductor under steady DC, by contrast, has a current that is no longer changing, so its magnetic field is no longer changing either, which means it induces no further opposing voltage at all; it then behaves like a short circuit, a plain connecting wire, aside from whatever small resistance its own winding has. This opposite steady-state behaviour, capacitor as an open circuit and inductor as a short circuit, is one of the most useful facts for quickly analysing DC circuits containing both.',
  },

  // ---------------------------------------------------------------------
  // acFundamentals
  // ---------------------------------------------------------------------
  {
    id: 'aedr-013',
    topic: 'acFundamentals',
    drillKind: 'explainConcept',
    type: 'drill',
    prompt:
      'Explain why the rms (root-mean-square) value of an alternating voltage or current matters, rather than just quoting its peak ' +
      'value, and why a simple half-cycle average is not the useful number for AC power calculations.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Peak value insufficient alone', detail: 'The peak (maximum) value of a sine wave only tells you the highest point reached; the wave spends almost no time actually at that value, so peak alone overstates the "typical" effect of the wave.', marks: 2 },
      { id: 'r2', label: 'True average is not useful', detail: 'A plain average of a full sine-wave cycle is zero, since the positive and negative halves cancel out, and even a half-cycle average does not correctly predict heating or power effects.', marks: 2 },
      { id: 'r3', label: 'rms defined', detail: 'The rms value is the equivalent steady DC value that would deliver the same average heating (power dissipation) effect in a resistor as the actual AC waveform does.', marks: 2 },
      { id: 'r4', label: 'Why rms is used practically', detail: 'Because rms is defined by matching real power/heating effect, it is the value used for rated equipment voltages/currents and for real power calculations, unlike peak or plain average.', marks: 2 },
    ],
    modelAnswer:
      'An alternating voltage or current is constantly changing in size and, for AC, direction, rising to a maximum, falling back through zero, and reversing, over and over. Quoting only its peak value (the single highest point the wave reaches) is misleading, because the wave only touches that exact peak for an instant during each cycle and spends most of its time at lower values; peak value alone overstates how strongly the wave is really acting most of the time.\n\n' +
      'A plain average is not the answer either. Averaged over a full cycle, a symmetric sine wave gives exactly zero, since the positive half and the negative half are mirror images and cancel out completely, even though the wave is clearly doing real work the whole time. Even averaging over just the positive half-cycle does not match how much heating or power the wave actually delivers, because heating effects depend on the square of the current or voltage, not on its plain size.\n\n' +
      'This is why the rms (root-mean-square) value is used instead. The rms value of an AC waveform is defined as the equivalent steady DC value that would produce exactly the same average heating effect in a plain resistor as the real, constantly changing AC waveform does. It is found, as the name suggests, by squaring the waveform (removing the effect of its changing sign), averaging that squared value over a full cycle, then taking the square root to bring the units back to normal voltage or current.\n\n' +
      'Because rms is defined this way, it is the number that correctly predicts real-world heating and power effects, which is why household mains voltage, equipment ratings, and power calculations are always quoted in rms rather than peak or plain average. For a sine wave, rms works out to the peak value divided by the square root of two, about 0.707 times the peak.',
  },
  {
    id: 'aedr-014',
    topic: 'acFundamentals',
    drillKind: 'computeStepwise',
    type: 'drill',
    prompt:
      'A sinusoidal AC supply has a peak voltage of 340 V and a frequency of 50 Hz. Compute, step by step, (a) the rms voltage, ' +
      '(b) the period of the waveform, and (c) the angular frequency in radians per second.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'rms relationship used', detail: 'For a sine wave, rms value = peak value / √2 ≈ peak × 0.707.', marks: 2 },
      { id: 'r2', label: 'rms voltage computed', detail: 'Vrms = 340 / √2 ≈ 340 / 1.414 ≈ 240 V.', marks: 2 },
      { id: 'r3', label: 'Period computed', detail: 'Period T = 1 / frequency = 1 / 50 = 0.02 s (20 ms), the time taken to complete one full cycle.', marks: 2 },
      { id: 'r4', label: 'Angular frequency computed', detail: 'ω = 2πf = 2π × 50 ≈ 314 rad/s.', marks: 2 },
    ],
    modelAnswer:
      'The first quantity to find is the rms (root-mean-square) voltage, the equivalent steady value that would give the same heating effect as the real AC wave. For any pure sine wave, the rms value is always the peak value divided by the square root of two: Vrms = Vpeak / √2. Substituting the given peak of 340 V: Vrms = 340 / 1.414 ≈ 240 V. This is recognisable as the standard mains rms voltage used in many countries, showing that a 240 V rms supply actually peaks at around 340 V twice in every cycle.\n\n' +
      'The second quantity is the period, T, the time taken to complete exactly one full cycle of the wave (from one point on the wave back to the same point on the next repeat of the pattern). Period and frequency are reciprocals of each other: T = 1 / f. With f = 50 Hz (50 complete cycles happening every second), T = 1 / 50 = 0.02 seconds, or 20 milliseconds, meaning each full swing up, down, and back happens in one fiftieth of a second.\n\n' +
      'The third quantity is the angular frequency, ω (the Greek letter omega), which expresses how fast the wave cycles in radians per second rather than in cycles per second, and is what actually appears inside the sine function used to describe the wave mathematically. It is found from ω = 2πf, since one full cycle corresponds to 2π radians (a full circle) being swept through. Substituting f = 50 Hz: ω = 2π × 50 = 100π ≈ 314 radians per second.',
  },
  {
    id: 'aedr-015',
    topic: 'acFundamentals',
    drillKind: 'compare',
    type: 'drill',
    prompt:
      'Compare alternating current (AC) and direct current (DC) under: (a) how magnitude and direction behave over time, ' +
      '(b) suitability for long-distance transmission, and (c) how easily voltage level can be changed.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'AC magnitude/direction', detail: 'AC continuously varies in size and periodically reverses direction, tracing out a repeating waveform such as a sine wave.', marks: 1.5 },
      { id: 'r2', label: 'DC magnitude/direction', detail: 'DC flows steadily in one direction only, with a magnitude that stays constant (ignoring ripple or noise).', marks: 1.5 },
      { id: 'r3', label: 'AC transmission suitability', detail: 'AC is favoured for long-distance transmission because its voltage can be stepped up for transmission (cutting current and resistive loss) and stepped back down for delivery.', marks: 1.5 },
      { id: 'r4', label: 'DC transmission note', detail: 'DC is harder to change voltage level on directly, though modern high-voltage DC (HVDC) links exist for certain very-long-distance routes using power-electronic converters.', marks: 1.5 },
      { id: 'r5', label: 'Voltage-changing ease', detail: 'AC voltage is changed simply and efficiently with a transformer (relying on a changing magnetic field), which will not work on steady DC since DC produces no changing field.', marks: 2 },
    ],
    modelAnswer:
      'Direct current (DC) flows steadily in a single, unchanging direction, and its magnitude (size) stays constant over time, aside from small ripple in practical supplies. Alternating current (AC), by contrast, continuously changes in magnitude and periodically reverses direction altogether, tracing out a repeating pattern over time, most commonly a smooth sine wave, though square and triangular patterns exist too.\n\n' +
      'AC is strongly favoured for transporting electrical power over long distances, mainly because of how easily its voltage level can be changed. Raising the transmission voltage lets the same amount of power be sent using a much smaller current, and since resistive heating losses in a cable depend on current squared, a smaller current means dramatically smaller losses over long transmission lines. Because this stepping-up-then-down trick relies on a continuously changing magnetic field, it only works naturally with AC.\n\n' +
      'Changing an AC voltage level is done simply and efficiently with a transformer, a device with two coils of wire wound near each other around a shared iron core, that uses a changing magnetic field to induce a different voltage in the second coil depending on how the turns are wound. A steady DC voltage cannot be changed this way at all, since a transformer only works when the magnetic field it relies on is actively changing, and steady DC produces no changing field. Changing a DC voltage level instead needs more complex power-electronic converter circuitry.\n\n' +
      'Because of this, DC has traditionally been considered less suited to very long-distance bulk transmission, although modern high-voltage direct current (HVDC) links, built using such converters, are now used on certain very-long or undersea transmission routes where they actually lose less energy than AC would over the same distance.',
  },

  // ---------------------------------------------------------------------
  // acAnalysis
  // ---------------------------------------------------------------------
  {
    id: 'aedr-016',
    topic: 'acAnalysis',
    drillKind: 'analyseCircuit',
    type: 'drill',
    prompt:
      'A series RL circuit has R = 30 Ω and an inductor with reactance XL = 40 Ω at the supply frequency, connected across a ' +
      '100 V (rms) AC supply. Find (a) the total impedance, (b) the current drawn from the supply, and (c) the phase angle between ' +
      'the current and the supply voltage, stating whether the current leads or lags.',
    marks: 9,
    rubric: [
      { id: 'r1', label: 'Impedance triangle set up', detail: 'Resistance and reactance combine at right angles (not by plain addition) because the resistor\'s voltage and the inductor\'s voltage are 90° out of step with each other: Z = √(R² + XL²).', marks: 2 },
      { id: 'r2', label: 'Impedance computed', detail: 'Z = √(30² + 40²) = √(900 + 1600) = √2500 = 50 Ω.', marks: 2 },
      { id: 'r3', label: 'Current computed', detail: 'I = V / Z = 100 / 50 = 2 A (rms).', marks: 2 },
      { id: 'r4', label: 'Phase angle computed', detail: 'θ = tan⁻¹(XL / R) = tan⁻¹(40 / 30) = tan⁻¹(1.333) ≈ 53.1°.', marks: 2 },
      { id: 'r5', label: 'Lag direction stated', detail: 'Because the circuit is inductive (has an inductor), the current lags behind (falls behind in time) the supply voltage by this angle.', marks: 1 },
    ],
    modelAnswer:
      'In a series RL circuit, the resistor limits current the same way it does in a DC circuit, but the inductor limits current through reactance (XL, in ohms), an AC-only kind of opposition that comes from the inductor constantly fighting the changing current, rather than from resistance to steady flow.\n\n' +
      'These two oppositions cannot simply be added together directly, because the voltage across the resistor stays in step with the current, while the voltage across the inductor runs 90 degrees out of step (ahead of it in time). Combining quantities that are 90° apart uses the same right-angle rule as combining the two legs of a right triangle, giving the total opposition, called impedance (Z, in ohms): Z = √(R² + XL²) = √(30² + 40²) = √(900 + 1600) = √2500 = 50 Ω.\n\n' +
      'With the total impedance known, the rms current drawn from the supply follows from the AC version of Ohm\'s law: I = V / Z = 100 / 50 = 2 A (rms).\n\n' +
      'The phase angle, θ, is the angle by which the current and voltage fall out of step with each other in time, and for a series RL circuit it is found from θ = tan⁻¹(XL / R) = tan⁻¹(40 / 30) = tan⁻¹(1.333) ≈ 53.1°.\n\n' +
      'Because this circuit contains an inductor, which always resists a change in current, the current physically cannot keep up with the voltage driving it, so the current falls behind, or lags, the supply voltage by this 53.1°. This is the standard behaviour for any inductive circuit: current lagging voltage, the mirror image of a capacitive circuit, where current instead leads voltage.',
  },
  {
    id: 'aedr-017',
    topic: 'acAnalysis',
    drillKind: 'computeStepwise',
    type: 'drill',
    prompt:
      'At a supply frequency of 50 Hz, compute step by step (a) the inductive reactance XL of a 100 mH inductor, and (b) the ' +
      'capacitive reactance XC of a 20 μF capacitor, using XL = ωL and XC = 1/(ωC).',
    marks: 7,
    rubric: [
      { id: 'r1', label: 'Angular frequency computed', detail: 'ω = 2πf = 2π × 50 ≈ 314 rad/s.', marks: 1 },
      { id: 'r2', label: 'Inductive reactance computed', detail: 'XL = ωL = 314 × 0.1 ≈ 31.4 Ω.', marks: 2 },
      { id: 'r3', label: 'Capacitive reactance set up', detail: 'XC = 1 / (ωC), with C converted to farads (20 μF = 20 × 10⁻⁶ F) before substituting.', marks: 2 },
      { id: 'r4', label: 'Capacitive reactance computed', detail: 'XC = 1 / (314 × 20 × 10⁻⁶) = 1 / (6.28 × 10⁻³) ≈ 159 Ω.', marks: 2 },
    ],
    modelAnswer:
      'Reactance is the AC-only opposition to current offered by an inductor or a capacitor, measured in ohms just like resistance, but unlike resistance it depends on how fast the supply is changing, that is, on its frequency.\n\n' +
      'Both reactance formulas need the angular frequency, ω (omega), which expresses frequency in radians per second rather than cycles per second: ω = 2πf = 2π × 50 ≈ 314 rad/s, using the given 50 Hz supply.\n\n' +
      'The inductive reactance of a 100 mH (0.1 H) inductor is found from XL = ωL: XL = 314 × 0.1 ≈ 31.4 Ω. This value rises directly with frequency, which makes sense physically: a faster-changing current fights harder against the inductor\'s opposition to change, so at higher frequencies an inductor blocks more.\n\n' +
      'The capacitive reactance of a 20 μF capacitor is found from XC = 1 / (ωC). Before substituting, the capacitance must be converted from microfarads into plain farads: 20 μF = 20 × 10⁻⁶ F. Then XC = 1 / (314 × 20 × 10⁻⁶) = 1 / (6.28 × 10⁻³) ≈ 159 Ω.\n\n' +
      'Notice that capacitive reactance falls as frequency rises, the opposite trend to inductive reactance: a faster-changing voltage charges and discharges a capacitor\'s plates more rapidly, letting more current pass on average, so the capacitor blocks less at higher frequency. This opposite behaviour, XL rising and XC falling with frequency, is the underlying reason inductors and capacitors are used together to build frequency-selective circuits such as filters.',
  },
  {
    id: 'aedr-018',
    topic: 'acAnalysis',
    drillKind: 'explainConcept',
    type: 'drill',
    prompt:
      'Explain what a phasor is and why phasor diagrams are a useful tool for analysing AC circuits, referring to how phase angle ' +
      'is represented.',
    marks: 7,
    rubric: [
      { id: 'r1', label: 'Phasor defined', detail: 'A phasor is a rotating-arrow (vector) representation of a sinusoidal quantity, where the arrow\'s length stands for the wave\'s amplitude (or rms value) and its angle stands for the wave\'s phase.', marks: 3 },
      { id: 'r2', label: 'Why phasors help', detail: 'Phasors let sinusoidal voltages/currents that differ in phase be combined using ordinary vector/triangle geometry instead of tracking the full time-varying waveform.', marks: 2 },
      { id: 'r3', label: 'Phase angle shown', detail: 'The angle between two phasors on the diagram directly shows how far apart in time (as a fraction of a cycle) the two waveforms are, such as current lagging or leading voltage.', marks: 2 },
    ],
    modelAnswer:
      'A phasor is a way of representing a sinusoidal (sine-wave shaped) voltage or current as a single arrow, similar to a vector, rather than as a full wave that has to be tracked moment by moment over time. The length of the arrow stands for the size of the wave, usually its rms value, and the angle the arrow is drawn at stands for the wave\'s phase, meaning how far along its repeating cycle it currently is compared to some reference point, usually the supply voltage.\n\n' +
      'Phasors are useful because AC circuits are full of sinusoidal quantities that are shifted in time relative to one another, for instance a resistor\'s voltage staying in step with the current while an inductor\'s voltage runs ahead of it. Trying to add these waveforms together point by point over time, second by second, would be extremely tedious. Because a phasor freezes each wave as a single arrow of fixed length and angle, though, waveforms that are out of step with each other can be added together using the ordinary rules of vector geometry, drawing arrows tip to tail or using right-angle triangles, instead of working through the changing wave shapes directly.\n\n' +
      'The phase angle itself, the angle between two phasors drawn on the same diagram, directly shows how far apart the two corresponding waveforms are in time, expressed as a fraction of a full cycle (in degrees or radians). If a current phasor sits behind a voltage phasor by some angle, that visually shows the current lagging the voltage, meaning it reaches its own peak slightly later in time; a current phasor drawn ahead of the voltage phasor instead shows the current leading, reaching its peak slightly earlier. This turns an abstract timing relationship into a simple, readable picture.',
  },

  // ---------------------------------------------------------------------
  // power
  // ---------------------------------------------------------------------
  {
    id: 'aedr-019',
    topic: 'power',
    drillKind: 'computeStepwise',
    type: 'drill',
    prompt:
      'A load draws 100 V (rms) and 5 A (rms) at a phase angle of 36.87° (current lagging voltage). Compute, step by step, ' +
      'the apparent power, the real power, the reactive power, and the power factor.',
    marks: 9,
    rubric: [
      { id: 'r1', label: 'Apparent power computed', detail: 'Apparent power S = V × I = 100 × 5 = 500 VA (volt-amps), the total power the supply must be capable of delivering.', marks: 2 },
      { id: 'r2', label: 'Real power computed', detail: 'Real power P = S × cosθ = 500 × cos(36.87°) = 500 × 0.8 = 400 W, the power actually doing useful work.', marks: 2 },
      { id: 'r3', label: 'Reactive power computed', detail: 'Reactive power Q = S × sinθ = 500 × sin(36.87°) = 500 × 0.6 = 300 VAR, the power sloshing back and forth without doing useful work.', marks: 3 },
      { id: 'r4', label: 'Power factor computed', detail: 'Power factor = cosθ = P / S = 400 / 500 = 0.8, lagging (since current lags voltage).', marks: 2 },
    ],
    modelAnswer:
      'The first quantity to compute is the apparent power, S, which is simply the rms voltage multiplied by the rms current, ignoring any timing mismatch between them: S = V × I = 100 × 5 = 500 volt-amps (VA). Apparent power represents the total capacity the supply, wiring, and transformer all have to be sized for, whether or not all of it is doing useful work.\n\n' +
      'The real power, P, sometimes called true or active power, is the part of that apparent power that actually does useful work, such as producing heat, light, or motion. It is found by multiplying the apparent power by the cosine of the phase angle between voltage and current: P = S × cosθ = 500 × cos(36.87°) = 500 × 0.8 = 400 watts (W).\n\n' +
      'The reactive power, Q, is the remaining part of the apparent power, the portion that sloshes back and forth between the source and the load\'s magnetic or electric fields each cycle without ever being consumed as useful work. It is found using the sine of the same angle: Q = S × sinθ = 500 × sin(36.87°) = 500 × 0.6 = 300 volt-amps-reactive (VAR). As a check, real and reactive power should combine, like the two legs of a right triangle, back into the apparent power: √(400² + 300²) = √(160000 + 90000) = √250000 = 500 VA, which matches.\n\n' +
      'Finally, the power factor, a single number between 0 and 1 describing how much of the apparent power is actually useful, is the cosine of the phase angle, and equals real power divided by apparent power: power factor = cosθ = P / S = 400 / 500 = 0.8. Since the current lags the voltage here (an inductive load), this is called a lagging power factor of 0.8.',
  },
  {
    id: 'aedr-020',
    topic: 'power',
    drillKind: 'computeStepwise',
    type: 'drill',
    prompt:
      'A factory load draws 50 kW of real power at a lagging power factor of 0.6 from a 400 V (rms), 50 Hz supply. Compute, step by ' +
      'step, the reactive power the load currently draws, and explain (with the numbers) why adding capacitors in parallel with the ' +
      'load corrects a lagging power factor toward 1.0.',
    marks: 9,
    rubric: [
      { id: 'r1', label: 'Phase angle recovered', detail: 'cosθ = 0.6 gives θ = cos⁻¹(0.6) ≈ 53.1°.', marks: 2 },
      { id: 'r2', label: 'Apparent power computed', detail: 'S = P / power factor = 50,000 / 0.6 ≈ 83.3 kVA.', marks: 2 },
      { id: 'r3', label: 'Reactive power computed', detail: 'Q = S × sinθ ≈ 83.3 × sin(53.1°) ≈ 83.3 × 0.8 ≈ 66.7 kVAR (lagging).', marks: 2 },
      { id: 'r4', label: 'Correction mechanism explained', detail: 'A capacitor draws current that leads voltage (the opposite sign of reactive power to an inductive load), so connecting a capacitor bank in parallel supplies reactive power locally, cancelling out some of the load\'s lagging reactive power and pulling the overall angle, and hence the power factor, back toward zero degrees (unity, 1.0).', marks: 3 },
    ],
    modelAnswer:
      'A power factor of 0.6 means cosθ = 0.6, so the phase angle by which the current lags the voltage is θ = cos⁻¹(0.6) ≈ 53.1°.\n\n' +
      'The apparent power the supply must actually deliver is found by rearranging the power-factor relationship P = S × cosθ into S = P / cosθ = 50,000 / 0.6 ≈ 83,300 VA, or about 83.3 kVA. Notice this is considerably more than the 50 kW of real power actually being used, because the low power factor forces the supply to carry far more current than the useful work alone would require.\n\n' +
      'The reactive power, the part of the load\'s demand that sloshes back and forth without doing useful work, follows from Q = S × sinθ ≈ 83,300 × sin(53.1°) ≈ 83,300 × 0.8 ≈ 66,700 VAR, or about 66.7 kVAR, and because the load is lagging (inductive, drawing current that falls behind voltage), this reactive power is described as lagging, or positive by convention.\n\n' +
      'Power factor correction works because a capacitor behaves as the electrical opposite of an inductor: a capacitor draws current that leads the voltage, producing reactive power of the opposite sign to an inductive load\'s lagging reactive power. Connecting a bank of capacitors in parallel with the factory\'s inductive load supplies leading reactive power locally, right at the load, which cancels out part of the lagging reactive power the inductive machinery demands. As the net reactive power drawn from the supply shrinks toward zero, the phase angle θ shrinks toward zero degrees as well, and since power factor is cosθ, the power factor climbs back up toward 1.0 (unity), meaning the supply now only has to carry current close to what the real 50 kW of useful work actually requires.',
  },
  {
    id: 'aedr-021',
    topic: 'power',
    drillKind: 'explainConcept',
    type: 'drill',
    prompt:
      'Explain what real power, reactive power, and apparent power represent physically, and why a low power factor costs a factory ' +
      'money even though it is not paying directly for reactive power.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Real power explained', detail: 'Real power (P, in watts) is the power actually converted into useful work such as heat, light, or motion.', marks: 2 },
      { id: 'r2', label: 'Reactive power explained', detail: 'Reactive power (Q, in VAR) is power that is temporarily stored in a load\'s magnetic or electric field each cycle and then handed straight back to the supply, doing no net useful work.', marks: 2 },
      { id: 'r3', label: 'Apparent power explained', detail: 'Apparent power (S, in VA) is the combination of both, and represents the total current (and hence capacity) the supply, cables, and transformers actually have to carry.', marks: 2 },
      { id: 'r4', label: 'Cost explanation given', detail: 'A low power factor means a large apparent power (and hence current) is needed to deliver a given amount of real power, forcing the utility and factory to size cables, transformers, and generation capacity larger than the useful power alone would require, and utilities often charge extra for this.', marks: 2 },
    ],
    modelAnswer:
      'Real power, P, measured in watts, is the portion of electrical power that is actually converted into useful work, such as heat from a heating element, light from a bulb, or mechanical motion from a motor shaft. This is the power a factory genuinely benefits from and the amount its meter is typically billed on directly.\n\n' +
      'Reactive power, Q, measured in volt-amps-reactive (VAR), is different: it is the power that inductive loads (such as motors and transformers) and capacitive loads temporarily draw from the supply to build up a magnetic or electric field, and then hand straight back to the supply as that field collapses again, every single cycle. None of this power is actually consumed doing useful work; it simply sloshes back and forth between the supply and the load.\n\n' +
      'Apparent power, S, measured in volt-amps (VA), combines both of the above (as the two legs of a right triangle combine into its longer side), and it represents the true total current, and hence the true total capacity, that the supply cables, transformers, and generating equipment must actually be sized to carry, regardless of how much of that capacity ends up doing useful work.\n\n' +
      'This is exactly why a low power factor costs money even when a factory is not billed directly for reactive power. A low power factor means the real power being usefully consumed is only a small fraction of the total apparent power flowing through the system, so a much larger current has to be pushed through every cable, switch, and transformer than the useful work alone would ever require. That oversized current still causes real resistive heating losses in the wiring, still requires larger, more expensive cables and transformers to be installed in the first place, and still eats into a utility\'s overall generation and transmission capacity, which is why many utilities charge industrial customers a separate penalty for running a poor power factor.',
  },

  // ---------------------------------------------------------------------
  // threePhase
  // ---------------------------------------------------------------------
  {
    id: 'aedr-022',
    topic: 'threePhase',
    drillKind: 'compare',
    type: 'drill',
    prompt:
      'Compare the STAR (wye) and DELTA connections of a balanced three-phase source or load under: (a) how the three windings ' +
      'are physically joined, (b) the relationship between line voltage and phase voltage, and (c) the relationship between line ' +
      'current and phase current.',
    marks: 9,
    rubric: [
      { id: 'r1', label: 'Star wiring described', detail: 'In star (wye), one end of each of the three windings is joined together at a common neutral point, and the other end of each winding brings out one of the three line wires.', marks: 1.5 },
      { id: 'r2', label: 'Delta wiring described', detail: 'In delta, the three windings are connected end to end in a closed triangle, and each of the three junctions between windings brings out one line wire; there is no neutral point.', marks: 1.5 },
      { id: 'r3', label: 'Star voltage relationship', detail: 'In star, line voltage (between any two line wires) is larger than phase voltage (across one winding) by a factor of √3: VL = √3 × Vph.', marks: 2 },
      { id: 'r4', label: 'Delta voltage relationship', detail: 'In delta, line voltage equals phase voltage directly, since each winding is connected straight across two line wires: VL = Vph.', marks: 1.5 },
      { id: 'r5', label: 'Star and delta current relationships', detail: 'In star, line current equals phase current (IL = Iph), since each winding carries the same current as its line wire; in delta, line current is larger than phase current by √3 (IL = √3 × Iph).', marks: 2.5 },
    ],
    modelAnswer:
      'A balanced three-phase supply or load uses three separate windings, each carrying its own alternating voltage, timed so the three are evenly spaced one-third of a cycle (120°) apart. There are two standard ways to connect these three windings together: star and delta.\n\n' +
      'In a star (also called wye, from its Y shape) connection, one end of each of the three windings is joined together at a single shared point called the neutral, while the other end of each winding is brought out separately to form the three line wires that connect to the rest of the circuit. In a delta connection, by contrast, the three windings are connected end to end in a closed triangle (delta, from the Greek letter shaped like a triangle), with no shared neutral point at all; each of the three corners of the triangle, where two windings meet, is brought out as one of the three line wires.\n\n' +
      'This difference in wiring changes how the voltage measured between two line wires (called line voltage, VL) compares to the voltage across a single winding (called phase voltage, Vph). In star, each line voltage is actually the combination of two winding voltages added together at 120° apart, which works out (using the same triangle geometry as combining phasors) to line voltage being larger than phase voltage by a factor of the square root of three: VL = √3 × Vph. In delta, each winding is connected directly straight across two line wires, so line voltage and phase voltage are simply equal: VL = Vph.\n\n' +
      'Current behaves the opposite way around. In star, each winding carries exactly the same current as flows in its own line wire, so line current equals phase current, IL = Iph. In delta, each line wire instead carries the combination of two winding currents, giving line current larger than phase current by that same √3 factor: IL = √3 × Iph.',
  },
  {
    id: 'aedr-023',
    topic: 'threePhase',
    drillKind: 'computeStepwise',
    type: 'drill',
    prompt:
      'A balanced three-phase load draws a line current of 20 A from a 400 V (rms) line-to-line supply at a power factor of 0.85 ' +
      'lagging. Compute, step by step, the total real power delivered to the load, using P = √3 × VL × IL × cosθ.',
    marks: 6,
    rubric: [
      { id: 'r1', label: 'Formula identified with quantities named', detail: 'Total three-phase real power uses the line quantities directly: P = √3 × VL × IL × cosθ, where VL is line-to-line voltage, IL is line current, and cosθ is the power factor.', marks: 2 },
      { id: 'r2', label: '√3 factor evaluated', detail: '√3 ≈ 1.732.', marks: 1 },
      { id: 'r3', label: 'Substitution shown', detail: 'P = 1.732 × 400 × 20 × 0.85.', marks: 1 },
      { id: 'r4', label: 'Final answer computed', detail: 'P = 1.732 × 400 × 20 × 0.85 ≈ 11,777 W ≈ 11.78 kW.', marks: 2 },
    ],
    modelAnswer:
      'For a balanced three-phase load, meaning all three phases are carrying equal, evenly spaced currents, the total real power delivered can be computed directly from the quantities that are actually measured out on the line wires, without needing to first work out the individual phase voltage or phase current: P = √3 × VL × IL × cosθ. Here VL is the line-to-line voltage (measured between any two of the three line wires), IL is the line current (measured flowing in any one line wire), and cosθ is the power factor, the fraction of the apparent power that is actually real, useful power.\n\n' +
      'The √3 factor appears here because it is already built into this line-quantity version of the formula to account for the 120° phase spacing between the three phases and, for a star-connected load, the √3 relationship between line and phase voltage discussed elsewhere; using this version means the star-versus-delta wiring detail does not need to be untangled separately. Numerically, √3 ≈ 1.732.\n\n' +
      'Substituting the given values directly: P = 1.732 × 400 × 20 × 0.85.\n\n' +
      'Multiplying step by step: 1.732 × 400 = 692.8; then 692.8 × 20 = 13,856; then 13,856 × 0.85 ≈ 11,777.6. So the total real power delivered to the balanced three-phase load is approximately 11,777.6 W, or about 11.78 kW. This is the actual useful power the load is consuming; the supply must additionally carry the reactive power associated with the 0.85 lagging power factor, but that portion does no useful work at the load.',
  },
  {
    id: 'aedr-024',
    topic: 'threePhase',
    drillKind: 'analyseCircuit',
    type: 'drill',
    prompt:
      'A balanced three-phase star-connected load has a phase voltage of 230 V (rms) and a phase impedance of 46 Ω resistive in ' +
      'each of the three windings. Find (a) the phase current, (b) the line current, and (c) the line-to-line voltage of the supply.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Phase current computed', detail: 'Using Ohm\'s law on one winding directly: Iph = Vph / Zph = 230 / 46 = 5 A.', marks: 2 },
      { id: 'r2', label: 'Star current relationship applied', detail: 'In a star connection, each winding\'s current flows straight out along its own line wire, so line current equals phase current.', marks: 2 },
      { id: 'r3', label: 'Line current stated', detail: 'IL = Iph = 5 A.', marks: 2 },
      { id: 'r4', label: 'Line voltage computed', detail: 'In a star connection, VL = √3 × Vph = 1.732 × 230 ≈ 398.4 V.', marks: 2 },
    ],
    modelAnswer:
      'This load is star-connected (wye-connected), meaning one end of each of the three winding impedances is joined at a shared neutral point, while the other end of each winding is brought out to one of the three line wires supplying the load.\n\n' +
      'The phase current, Iph, the current flowing through a single winding, is found using Ohm\'s law applied directly to that one winding and the voltage across it, the phase voltage: Iph = Vph / Zph = 230 / 46 = 5 A. Since the impedance is described as purely resistive, no phase-angle correction is needed here, and this 5 A is also the rms current value.\n\n' +
      'In a star connection, there is only one path for current between each winding and its own line wire, current does not split or combine anywhere along the way, so whatever current flows through a winding is exactly the same current flowing in that line wire. This means the line current, IL, simply equals the phase current already found: IL = Iph = 5 A.\n\n' +
      'The line-to-line voltage, VL, the voltage measured between any two of the three line wires, is larger than the phase voltage in a star connection, because it is really the combination of two winding voltages that are 120° apart in phase rather than simply lined up. Combining two such voltages at 120° works out, using the same triangle geometry that applies to phasors, to a factor of the square root of three: VL = √3 × Vph = 1.732 × 230 ≈ 398.4 V. This value, close to the standard 400 V three-phase supply used in many countries, is what would be measured with a meter connected across any two of the three incoming line wires.',
  },
];
