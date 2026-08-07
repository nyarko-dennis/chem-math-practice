## Tasks 4a-4h: Curated MCQ/TF banks (one task per topic, 30 items each)

Each of the eight tasks is identical in shape - only the topic key, file name, id prefix, and coverage checklist differ. Author with a fresh subagent per topic; review (fact-check + n-gram originality) before marking complete. **Repeat the full procedure per task; do not cross-reference.**

**Per-task shape (substitute from the table):**
- Create: `lib/aeBank<Name>.ts` exporting `export const <camelTopic>Questions: AppliedElectricityQuestion[]` of exactly 30 items.
- Consumes: `MCQuestion`, `TFQuestion`, `AppliedElectricityQuestion` from `./appliedElectricityTypes.ts`.
- Composition: ~22 MCQ + 8 TF. TF block **exactly 4 true / 4 false**. MCQ each exactly 4 choices, exactly one correct, `correctIndex` spread across 0-3, never "all/none of the above".
- ids: `<prefix>-001` .. `<prefix>-030`, sequential.
- rationale 1-3 sentences, plain language, every technical term glossed on every standalone use.
- Difficulty mix ~1/3 recall, 1/3 understanding, 1/3 applied.

| task | topic key | file | export | id prefix |
|---|---|---|---|---|
| 4a | `dcCircuits` | `lib/aeBankDcCircuits.ts` | `dcCircuitsQuestions` | `aedc` |
| 4b | `networkTheorems` | `lib/aeBankNetworkTheorems.ts` | `networkTheoremsQuestions` | `aent` |
| 4c | `capacitors` | `lib/aeBankCapacitors.ts` | `capacitorsQuestions` | `aecap` |
| 4d | `inductors` | `lib/aeBankInductors.ts` | `inductorsQuestions` | `aeind` |
| 4e | `acFundamentals` | `lib/aeBankAcFundamentals.ts` | `acFundamentalsQuestions` | `aeacf` |
| 4f | `acAnalysis` | `lib/aeBankAcAnalysis.ts` | `acAnalysisQuestions` | `aeaca` |
| 4g | `power` | `lib/aeBankPower.ts` | `powerQuestions` | `aepow` |
| 4h | `threePhase` | `lib/aeBankThreePhase.ts` | `threePhaseQuestions` | `ae3ph` |

**Coverage checklists (every bullet -> at least one question):**

- **4a dcCircuits:** Ohm's law (V=IR and rearrangements); resistors in series (sum) vs parallel (reciprocal sum / product-over-sum for two); voltage-divider rule; current-divider rule; power in a resistor (P=VI=I²R=V²/R); short circuit vs open circuit behaviour; effect of adding a parallel resistor on total resistance; internal resistance of a source / terminal voltage; conductance as 1/R; conventional current direction.
- **4b networkTheorems:** KCL statement (sum of currents at a node = 0) and its basis (charge conservation); KVL statement (sum of voltages round a loop = 0) and its basis (energy conservation); Thevenin theorem statement + what Vth and Rth are; Norton theorem statement + Norton current/resistance; Thevenin↔Norton source transformation; superposition theorem (linear circuits, one independent source at a time, others zeroed - voltage sources shorted, current sources opened); maximum power transfer condition (R_load = Rth); when superposition does NOT apply (power, non-linear elements); reciprocity theorem (idea only); Millman's theorem (idea only).
- **4c capacitors:** definition (stores energy in an electric field); Q=CV; capacitors in parallel add (larger total) while in series combine reciprocally (smaller total) - opposite of resistors; energy stored E=½CV²; a capacitor blocks DC in steady state (acts open) but passes changing/AC signals; charging/discharging through a resistor and the RC time constant τ=RC (meaning of “one time constant” ≈ 63% charged); voltage across a capacitor cannot change instantly; effect of plate area / separation / dielectric on capacitance; unit farad.
- **4d inductors:** definition (stores energy in a magnetic field); induced emf v=L(di/dt) and Lenz's law (opposes the change); inductors in series add while in parallel combine reciprocally (like resistors, opposite of capacitors); energy stored E=½LI²; an inductor passes DC in steady state (acts as a short) but opposes changing/AC current; RL time constant τ=L/R; current through an inductor cannot change instantly; self- vs mutual inductance (idea); unit henry; factors affecting inductance (turns, core material).
- **4e acFundamentals:** what alternating current is (periodically reverses direction); peak (amplitude), peak-to-peak, instantaneous values; rms value and why it matters (equivalent heating DC value); for a sinusoid Vrms=Vpeak/√2 and Vavg (half-cycle)=2Vpeak/π; period T and frequency f=1/T; angular frequency ω=2πf; phase and phase difference (lead/lag); mains frequency concept (50/60 Hz); form factor / crest factor (idea).
- **4f acAnalysis:** inductive reactance Xl=ωL (rises with frequency); capacitive reactance Xc=1/(ωC) (falls with frequency); impedance Z combines resistance and reactance; a phasor represents magnitude and phase; in a pure resistor V and I are in phase; in a pure inductor current lags voltage by 90°; in a pure capacitor current leads voltage by 90°; impedance of series RL / RC / RLC; resonance (Xl=Xc) in a series RLC circuit; rectangular vs polar representation of impedance. (Deck is THIN here - most facts will be standard first-year; disclose each.)
- **4g power:** real/active power P (watts, the power actually consumed); reactive power Q (VAR, exchanged with L/C, does no net work); apparent power S (VA, S=√(P²+Q²)); power triangle relationship; power factor pf=cosφ=P/S and leading vs lagging; P=VI cosφ for AC; why a low power factor is undesirable (higher current for same real power); power-factor correction with a capacitor (idea); instantaneous vs average power; power in a purely reactive element averages to zero.
- **4h threePhase:** why three-phase (constant power delivery, efficient transmission); phase sequence; star (wye) connection line-vs-phase relationships (VL=√3·Vph, IL=Iph); delta connection relationships (VL=Vph, IL=√3·Iph); total three-phase power P=√3·VL·IL·cosφ; balanced vs unbalanced load; role of the neutral in a star system; four-wire vs three-wire systems; comparison of star vs delta use.

**Steps per bank task:**

- [ ] **Step 1:** Read `docs/appliedElectricity/source-extracts/lecture-deck.txt` (the whole file), then author 30 items against the checklist for this topic. Import types from `./appliedElectricityTypes.ts`.
- [ ] **Step 2:** Self-check before finishing: exactly 30 items; 4 true / 4 false among the TF items; every MCQ has 4 choices and one correct; ids sequential; every jargon term glossed on each use; no 8+ word phrase copied from the extract (run an n-gram check); list any facts not found in the extract.
- [ ] **Step 3:** Run `npx tsc --noEmit` - the file must type-check against `appliedElectricityTypes.ts`.
- [ ] **Step 4: Commit**

```bash
git add lib/aeBank<Name>.ts
git commit -m "feat(applied-electricity): <topic> MCQ/TF bank (30)"
```

---

