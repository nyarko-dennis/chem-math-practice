import type { AppliedElectricityTopic } from './appliedElectricityTypes.ts';
import { AE_GENERATORS, type AeGeneratedQuestion } from './aeGenerators.ts';

export interface ExampleStep {
  explanation: string;
  latex: string;
}

export interface WorkedExample {
  id: string;
  title: string;
  prompt: string;
  steps: ExampleStep[];
  answer: string;
}

export interface AeLesson {
  id: string;
  topic: AppliedElectricityTopic;
  title: string;
  intro: string;
  examples: WorkedExample[];
  tryIt: () => AeGeneratedQuestion;
}

export const aeLessons: AeLesson[] = [
  {
    id: 'ae-lesson-01',
    topic: 'dcCircuits',
    title: 'DC Circuits',
    intro: 'A DC circuit carries current that flows in one direction only, driven by a steady voltage (electrical "push", measured in volts) from a battery or power supply. Ohm\'s law ties three quantities together: voltage (V), current (the flow of charge, in amps) and resistance (how much a component opposes that flow, in ohms). When resistors are chained one after another (in series), their resistances simply add up. When resistors sit side by side sharing the same two connection points (in parallel), the combined resistance is always smaller than the smallest one, found with the product-over-sum shortcut. A voltage divider uses two series resistors to produce a smaller voltage than the source; a current divider does the same trick for current in a parallel pair.',
    examples: [
      {
        id: 'ae-ex-dc-1',
        title: 'Ohm\'s law: find the voltage',
        prompt: 'R=100\\ \\Omega,\\ I=0.5\\ \\text{A}',
        steps: [
          { explanation: 'Ohm\'s law says voltage equals current multiplied by resistance.', latex: 'V=IR' },
          { explanation: 'Plug in the current (0.5 A) and the resistance (100 ohms).', latex: 'V=(0.5)(100)' },
          { explanation: 'Multiply out to get the voltage across the resistor.', latex: 'V=50\\ \\text{V}' },
        ],
        answer: '50\\ \\text{V}',
      },
      {
        id: 'ae-ex-dc-2',
        title: 'Series and parallel combination',
        prompt: 'R_1=10\\ \\Omega,\\ R_2=20\\ \\Omega \\text{ in series with } R_3=30\\ \\Omega \\text{ (in parallel with } R_2\\text{)}',
        steps: [
          { explanation: 'First combine the two resistors that are side by side (in parallel): the combined value is the product over the sum, and it always comes out smaller than either one alone.', latex: 'R_{23}=\\frac{R_2 R_3}{R_2+R_3}=\\frac{20\\times30}{20+30}=12\\ \\Omega' },
          { explanation: 'Now that parallel pair is effectively one resistor, add it to the one that is chained after it (in series) - series resistances just add.', latex: 'R_{eq}=R_1+R_{23}=10+12=22\\ \\Omega' },
        ],
        answer: '22\\ \\Omega',
      },
    ],
    tryIt: () => AE_GENERATORS.dcCircuits(),
  },
  {
    id: 'ae-lesson-02',
    topic: 'networkTheorems',
    title: 'Network Theorems',
    intro: 'Thevenin\'s theorem lets you replace a whole messy network of sources and resistors, as seen from two output terminals, with just one simple equivalent: a single voltage source in series with a single resistor. The equivalent voltage (Vth) is what you would measure across the open terminals with nothing connected. The equivalent resistance (Rth) is found by "zeroing" the sources (turning voltage sources into a plain wire) and working out the resistance looking back into the terminals. Norton\'s theorem is the mirror image: a single current source in parallel with a resistor, where the current (In) is what would flow if you short-circuited (directly wired together) the terminals, and the resistance (Rn) is the same as Rth.',
    examples: [
      {
        id: 'ae-ex-net-1',
        title: 'Thevenin equivalent of a source with two resistors',
        prompt: 'V=12\\ \\text{V},\\ R_1=100\\ \\Omega \\text{ (in series with the source)},\\ R_2=200\\ \\Omega \\text{ (across the output)}',
        steps: [
          { explanation: 'With nothing connected to the output terminals, no current flows anywhere except around the R1-R2 loop, so the terminal voltage is just what R2 gets from a voltage divider between R1 and R2.', latex: 'V_{th}=V\\frac{R_2}{R_1+R_2}' },
          { explanation: 'Plug in the numbers.', latex: 'V_{th}=12\\times\\frac{200}{100+200}=8\\ \\text{V}' },
          { explanation: 'For the equivalent resistance, replace the voltage source with a plain wire (zero it out), then find the resistance looking into the terminals: R1 and R2 are now side by side (in parallel).', latex: 'R_{th}=R_1\\|R_2=\\frac{R_1R_2}{R_1+R_2}=\\frac{100\\times200}{100+200}\\approx66.7\\ \\Omega' },
        ],
        answer: 'V_{th}=8\\ \\text{V},\\ R_{th}\\approx66.7\\ \\Omega',
      },
    ],
    tryIt: () => AE_GENERATORS.networkTheorems(),
  },
  {
    id: 'ae-lesson-03',
    topic: 'capacitors',
    title: 'Capacitors',
    intro: 'A capacitor is a component that stores electrical charge on two plates separated by an insulator, and it is rated by its capacitance (C, measured in farads) - how much charge it can hold per volt applied. Charging it to a voltage V stores a charge Q=CV, and the energy tucked away inside is E = half of C times V squared. Wiring capacitors side by side (in parallel) adds their capacitances directly, while chaining them one after another (in series) combines them the reciprocal way, like parallel resistors do, so the total is always smaller than the smallest one. When a capacitor charges or discharges through a resistor, the speed of that process is set by the time constant tau (the time to reach about 63% of the way to the final value), given by tau = R times C.',
    examples: [
      {
        id: 'ae-ex-cap-1',
        title: 'Charge and energy stored',
        prompt: 'C=10\\ \\mu\\text{F},\\ V=20\\ \\text{V}',
        steps: [
          { explanation: 'Charge stored equals capacitance times voltage.', latex: 'Q=CV=(10\\times10^{-6})(20)=2\\times10^{-4}\\ \\text{C}' },
          { explanation: 'Energy stored is half of C times V squared.', latex: 'E=\\tfrac{1}{2}CV^2=0.5\\times(10\\times10^{-6})\\times20^2=2\\times10^{-3}\\ \\text{J}' },
        ],
        answer: 'Q=2\\times10^{-4}\\ \\text{C},\\ E=2\\times10^{-3}\\ \\text{J}',
      },
      {
        id: 'ae-ex-cap-2',
        title: 'RC time constant',
        prompt: 'R=1000\\ \\Omega,\\ C=100\\ \\mu\\text{F}',
        steps: [
          { explanation: 'The time constant of an RC charging circuit is resistance times capacitance.', latex: '\\tau=RC=1000\\times(100\\times10^{-6})' },
          { explanation: 'Multiply out - this is how long (in seconds) it takes to get roughly 63% of the way to full charge.', latex: '\\tau=0.1\\ \\text{s}' },
        ],
        answer: '0.1\\ \\text{s}',
      },
    ],
    tryIt: () => AE_GENERATORS.capacitors(),
  },
  {
    id: 'ae-lesson-04',
    topic: 'inductors',
    title: 'Inductors',
    intro: 'An inductor is a coil of wire that stores energy in a magnetic field when current flows through it, rated by its inductance (L, measured in henries) - a measure of how strongly it resists a change in current. The energy stored is E = half of L times I squared. If the current through it is changing, the inductor pushes back with an induced voltage (emf) given by v = L times the rate of change of current (di/dt) - the faster the current changes, the bigger the kick. Wiring inductors one after another (in series) adds their inductances directly, like resistors; wiring them side by side (in parallel) combines them the reciprocal way, like parallel resistors. In a circuit with an inductor and a resistor, the current rises or falls with a time constant tau = L divided by R.',
    examples: [
      {
        id: 'ae-ex-ind-1',
        title: 'Energy stored in an inductor',
        prompt: 'L=50\\ \\text{mH},\\ I=2\\ \\text{A}',
        steps: [
          { explanation: 'Energy stored is half of L times I squared.', latex: 'E=\\tfrac{1}{2}LI^2=0.5\\times(50\\times10^{-3})\\times2^2' },
          { explanation: 'Multiply out.', latex: 'E=0.1\\ \\text{J}' },
        ],
        answer: '0.1\\ \\text{J}',
      },
      {
        id: 'ae-ex-ind-2',
        title: 'RL time constant',
        prompt: 'L=200\\ \\text{mH},\\ R=50\\ \\Omega',
        steps: [
          { explanation: 'The time constant of an RL circuit is inductance divided by resistance - the bigger the inductance or the smaller the resistance, the slower the current rises or falls.', latex: '\\tau=\\frac{L}{R}=\\frac{200\\times10^{-3}}{50}' },
          { explanation: 'Divide out.', latex: '\\tau=4\\times10^{-3}\\ \\text{s}' },
        ],
        answer: '4\\times10^{-3}\\ \\text{s}',
      },
    ],
    tryIt: () => AE_GENERATORS.inductors(),
  },
  {
    id: 'ae-lesson-05',
    topic: 'acFundamentals',
    title: 'AC Fundamentals',
    intro: 'Unlike DC, an alternating current (AC) supply reverses direction over and over in a smooth wave shape (sinusoid), repeating every period T seconds - the number of repeats per second is the frequency f (measured in hertz), and f = 1 divided by T. Because the wave constantly swings up and down, we describe its size a few different ways: the peak value is the highest point it reaches; the rms value (root-mean-square) is the "effective" steady value that would deliver the same heating power, and for a sine wave it equals the peak divided by the square root of 2; the half-cycle average is a plain average over one hump of the wave, equal to 2 times the peak divided by pi - it is smaller than rms and the two must never be mixed up. Angular frequency omega (in radians per second) is just the frequency expressed as a rotation speed: omega = 2 times pi times f.',
    examples: [
      {
        id: 'ae-ex-acf-1',
        title: 'RMS value from peak',
        prompt: 'V_p=100\\ \\text{V}',
        steps: [
          { explanation: 'For a sine wave, the rms (effective) value is the peak divided by the square root of 2 - this is NOT the same as the half-cycle average, so do not confuse the two.', latex: 'V_{rms}=\\frac{V_p}{\\sqrt2}' },
          { explanation: 'Plug in the peak voltage.', latex: 'V_{rms}=\\frac{100}{\\sqrt2}\\approx70.7\\ \\text{V}' },
        ],
        answer: '\\approx70.7\\ \\text{V}',
      },
      {
        id: 'ae-ex-acf-2',
        title: 'Angular frequency from frequency',
        prompt: 'f=50\\ \\text{Hz}',
        steps: [
          { explanation: 'Angular frequency converts cycles-per-second into radians-per-second by multiplying by 2 pi (a full circle in radians).', latex: '\\omega=2\\pi f' },
          { explanation: 'Plug in the frequency.', latex: '\\omega=2\\pi\\times50\\approx314.2\\ \\text{rad/s}' },
        ],
        answer: '\\approx314.2\\ \\text{rad/s}',
      },
    ],
    tryIt: () => AE_GENERATORS.acFundamentals(),
  },
  {
    id: 'ae-lesson-06',
    topic: 'acAnalysis',
    title: 'AC Analysis',
    intro: 'When AC current flows through a capacitor or an inductor, those components resist the current the way a resistor does, but this "AC resistance" - called reactance (X, in ohms) - also depends on frequency. An inductor\'s reactance grows with frequency (Xl = omega times L: it makes the current lag behind the voltage, arriving late like a heavy flywheel), while a capacitor\'s reactance shrinks with frequency (Xc = 1 divided by omega times C: it makes the current lead the voltage, arriving early because it responds to how fast the voltage is changing). Combining resistance and reactance gives the total opposition to AC current: impedance Z, written as a complex number Z = R + jX, where R is the plain resistive part and X is the reactive part (positive for inductors, negative for capacitors, and the two never swap roles).',
    examples: [
      {
        id: 'ae-ex-aca-1',
        title: 'Inductive reactance',
        prompt: 'L=100\\ \\text{mH},\\ f=60\\ \\text{Hz}',
        steps: [
          { explanation: 'Inductive reactance is 2 pi times frequency times inductance.', latex: 'X_L=2\\pi f L=2\\pi\\times60\\times(100\\times10^{-3})' },
          { explanation: 'Multiply out.', latex: 'X_L\\approx37.7\\ \\Omega' },
        ],
        answer: '\\approx37.7\\ \\Omega',
      },
      {
        id: 'ae-ex-aca-2',
        title: 'Impedance of a series RC circuit',
        prompt: 'R=50\\ \\Omega,\\ C=20\\ \\mu\\text{F},\\ f=60\\ \\text{Hz}',
        steps: [
          { explanation: 'First find the capacitive reactance: 1 over (2 pi times frequency times capacitance).', latex: 'X_C=\\frac{1}{2\\pi fC}=\\frac{1}{2\\pi\\times60\\times(20\\times10^{-6})}\\approx132.6\\ \\Omega' },
          { explanation: 'A capacitor\'s reactance is written with a minus sign in the impedance (it makes current lead voltage), unlike an inductor\'s plus sign.', latex: 'Z=R-jX_C\\approx50-j132.6\\ \\Omega' },
        ],
        answer: '\\approx50-j132.6\\ \\Omega',
      },
    ],
    tryIt: () => AE_GENERATORS.acAnalysis(),
  },
  {
    id: 'ae-lesson-07',
    topic: 'power',
    title: 'Electrical Power',
    intro: 'In an AC circuit, "power" splits into three related ideas. Real power P (in watts) is the power that actually does useful work, like heating a wire or turning a motor. Reactive power Q (in VAR - volt-amps reactive) is power that sloshes back and forth into and out of capacitors and inductors without being consumed - it is not wasted as heat, but it still has to be supplied by the source. Apparent power S (in VA - volt-amps) is what you get from simply multiplying voltage by current, and it combines the other two like the sides of a right triangle: S = square root of (P squared plus Q squared). The power factor (cos phi) tells you what fraction of the apparent power is actually real power: cos phi = P divided by S, and it ranges from 0 (all reactive, nothing useful) to 1 (all real, no waste).',
    examples: [
      {
        id: 'ae-ex-pow-1',
        title: 'Apparent power from real and reactive power',
        prompt: 'P=800\\ \\text{W},\\ Q=600\\ \\text{VAR}',
        steps: [
          { explanation: 'Apparent power combines real and reactive power like the hypotenuse of a right triangle.', latex: 'S=\\sqrt{P^2+Q^2}=\\sqrt{800^2+600^2}' },
          { explanation: 'Work out the square root.', latex: 'S=1000\\ \\text{VA}' },
        ],
        answer: '1000\\ \\text{VA}',
      },
      {
        id: 'ae-ex-pow-2',
        title: 'Power factor',
        prompt: 'P=800\\ \\text{W},\\ S=1000\\ \\text{VA}',
        steps: [
          { explanation: 'Power factor is the fraction of apparent power that is actually real (useful) power.', latex: '\\cos\\varphi=\\frac{P}{S}=\\frac{800}{1000}' },
          { explanation: 'Divide out.', latex: '\\cos\\varphi=0.8' },
        ],
        answer: '0.8',
      },
    ],
    tryIt: () => AE_GENERATORS.power(),
  },
  {
    id: 'ae-lesson-08',
    topic: 'threePhase',
    title: 'Three-Phase Systems',
    intro: 'Three-phase power uses three AC voltages that are staggered in time to spread the load more evenly, wired in one of two arrangements. In a star (also called wye) connection, each of the three windings has one end tied together at a common centre point, and each "line" wire also carries the same current as its own winding (phase) directly - but the voltage measured between two lines (VL) is bigger than the voltage across one winding alone (Vph), by a factor of the square root of 3: VL = square root of 3 times Vph. In a delta connection, the windings form a closed triangle, so each pair of lines sits directly across one winding - meaning line voltage equals phase voltage - but the current in each line is now the combination of two winding currents, bigger than one winding\'s current (Iph) by the same square-root-of-3 factor: IL = square root of 3 times Iph. Whichever arrangement is used, for a balanced (evenly loaded) three-phase system the total real power delivered is P = square root of 3 times line voltage times line current times the power factor.',
    examples: [
      {
        id: 'ae-ex-3ph-1',
        title: 'Star connection: line voltage from phase voltage',
        prompt: 'V_{ph}=230\\ \\text{V (star/wye)}',
        steps: [
          { explanation: 'In a star (wye) connection, line voltage is the square root of 3 times the phase voltage - do not use this factor for delta, where line voltage instead equals phase voltage directly.', latex: 'V_L=\\sqrt3\\,V_{ph}' },
          { explanation: 'Plug in the phase voltage.', latex: 'V_L=\\sqrt3\\times230\\approx398.4\\ \\text{V}' },
        ],
        answer: '\\approx398.4\\ \\text{V}',
      },
      {
        id: 'ae-ex-3ph-2',
        title: 'Total power of a balanced three-phase load',
        prompt: 'V_L=400\\ \\text{V},\\ I_L=10\\ \\text{A},\\ \\cos\\varphi=0.9',
        steps: [
          { explanation: 'For a balanced three-phase load (star or delta, the formula is the same when using line values), total real power is the square root of 3 times line voltage times line current times power factor.', latex: 'P=\\sqrt3\\,V_LI_L\\cos\\varphi' },
          { explanation: 'Plug in the numbers.', latex: 'P=\\sqrt3\\times400\\times10\\times0.9\\approx6235\\ \\text{W}' },
        ],
        answer: '\\approx6235\\ \\text{W}',
      },
    ],
    tryIt: () => AE_GENERATORS.threePhase(),
  },
];
