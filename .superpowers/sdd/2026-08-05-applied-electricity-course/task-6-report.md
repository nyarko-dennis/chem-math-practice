# Task 6 report: Applied Electricity rubric drills (`aeDrills.ts`)

## Files created

- `lib/aeDrills.ts` — `export const aeDrills: AeDrill[]` (24 drills), re-exports `AE_DRILL_LABELS`, `AeDrill`, `AeDrillKind`, `RubricPoint` from `lib/appliedElectricityTypes.ts`.
- `lib/aeDrills.test.ts` — exact Step-1 test code from the brief (4 tests).

## Drill count and per-topic distribution

24 drills total, ids `aedr-001`..`aedr-024`, exactly 3 per topic:

| topic | count |
|---|---|
| dcCircuits | 3 |
| networkTheorems | 3 |
| capacitors | 3 |
| inductors | 3 |
| acFundamentals | 3 |
| acAnalysis | 3 |
| power | 3 |
| threePhase | 3 |

## drillKind usage counts

| kind | count |
|---|---|
| deriveEquivalent | 2 (aedr-004 Thevenin derivation, aedr-005 Norton derivation) |
| analyseCircuit | 5 |
| explainConcept | 7 |
| compare | 3 |
| computeStepwise | 7 |

All 5 kinds used at least twice, satisfying the binding requirement.

## Marks-sum confirmation

Verified programmatically for every drill: `rubric.reduce((s,r)=>s+r.marks,0) === drill.marks`, and every `drill.marks` is in [6,10]. Marks distribution across the 24 drills ranges 6–9 (min aedr-001/aedr-023 at 6, max aedr-004/aedr-016/aedr-019/aedr-020/aedr-022 at 9). Confirmed by the automated test `rubric marks sum to drill.marks; marks in 6..10` (pass) and by a manual per-drill dump during authoring.

## modelAnswer word-count range

All 24 model answers fall between 247 and 320 words — comfortably inside the required 150–400 band (target buffer of 180–360 was met). Full per-drill counts were printed and inspected; none are near either boundary.

## Facts used beyond the lecture-deck extract (disclosed)

The deck (`docs/appliedElectricity/source-extracts/lecture-deck.txt`) is thin or slide-title-only on several of the 8 topics (DC series/parallel math, capacitors, inductors, RC/RL time-domain detail, reactance formulas, three-phase star/delta math). Per the brief's allowance, standard first-year EE facts were used to fill these gaps, specifically:

- DC circuits: Ohm's law power dissipation mechanism (electron–lattice collisions), series/parallel resistor combination formulas, voltage-divider formula — standard textbook material, deck only lists slide titles ("Series Circuits Defined", "Calculating Equivalent Resistances...") with no worked content.
- Capacitors: Q = CV, series/parallel capacitance combination rules, RC time constant (τ = RC) and the 63% charging rule — not present in the deck at all (deck has no capacitor section).
- Inductors: Lenz's law statement, series/parallel inductance combination rules, E = ½LI² energy formula — not present in the deck at all (deck has no inductor section).
- AC fundamentals: rms = peak/√2 relationship, T = 1/f, ω = 2πf — deck states general AC/rms/frequency concepts (slides 44–51) but gives no formulas; formulas are standard.
- AC analysis: XL = ωL, XC = 1/(ωC), impedance triangle Z = √(R²+X²), phasor concept — deck only shows slide titles for "RL Series Circuit" / "Phasor Diagram" (slides 96–98) with no content or formulas.
- Power: S = VI, P = Scosθ, Q = Ssinθ, power-triangle relationships — the deck's power-factor section (slides 85–95) is prose-only (no formulas), so the standard formulas were supplied.
- Three-phase: VL = √3·Vph (star), VL = Vph (delta), IL = Iph (star), IL = √3·Iph (delta), P = √3·VL·IL·cosθ — the deck does not cover three-phase star/delta relationships at all (only mentions three-phase motors/transformers in passing); this is entirely standard first-year three-phase theory.

Deck-grounded content used directly: Thevenin's theorem (deriveEquivalent drills aedr-004, aedr-005 follow the deck's own step sequence — remove load, find open-circuit voltage, deactivate sources, find resistance — slides 11–25), Norton's theorem (slides 35–43, same step structure), KCL/KVL statements and conservation principles (slides 5, 8), AC vs DC comparison content (slides 55–57, used in aedr-015), power factor / power-factor-correction concept and the capacitor-cancels-lagging-reactive-power mechanism (slides 85, 89–91, used in aedr-020, aedr-021).

## Test results

- `node --test lib/aeDrills.test.ts` — PASS (4/4 tests: drill count/per-topic, marks-sum bounds, drillKind coverage, id-uniqueness/word-count).
- `npm run test` (full suite) — PASS (132/132 tests across all `lib/*.test.ts` files, no regressions).
- `npx tsc --noEmit` — clean, no errors.

## Commit

`bc2b5c4` — `feat(applied-electricity): rubric drills (24)` (files: `lib/aeDrills.ts`, `lib/aeDrills.test.ts`).
