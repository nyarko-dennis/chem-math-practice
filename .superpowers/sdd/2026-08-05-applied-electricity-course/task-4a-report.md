# Task 4a report: dcCircuits bank

File: `lib/aeBankDcCircuits.ts`
Export: `dcCircuitsQuestions: AppliedElectricityQuestion[]`

## Counts

- Total items: 30 (aedc-001 .. aedc-030, sequential, verified programmatically)
- MCQ: 22, TF: 8
- TF true/false split: 4 true / 4 false
- MCQ `correctIndex` distribution: 0 -> 6, 1 -> 6, 2 -> 5, 3 -> 5 (spread across 0-3)
- Every MCQ has exactly 4 choices, exactly one correct answer, no "all/none of the above" option

## Checklist bullet -> item id coverage map

| checklist bullet | covering item ids |
|---|---|
| Ohm's law (V=IR and rearrangements) | aedc-001 (recall), aedc-002 (solve for V), aedc-003 (solve for R) |
| resistors in series (sum) | aedc-004 (formula), aedc-005 (applied), aedc-023 (TF: same current) |
| resistors in parallel (reciprocal sum / product-over-sum for two) | aedc-006 (two-resistor product/sum), aedc-007 (general reciprocal formula), aedc-024 (TF, false misconception) |
| voltage-divider rule | aedc-009 (rule), aedc-010 (applied compute) |
| current-divider rule | aedc-011 (rule/understanding), aedc-012 (applied compute) |
| power in a resistor (P=VI=I²R=V²/R) | aedc-013 (P=VI), aedc-014 (P=I²R), aedc-015 (P=V²/R), aedc-022 (applied combined problem) |
| short circuit vs open circuit behaviour | aedc-016 (short), aedc-017 (open), aedc-025 (TF, open circuit false claim), aedc-026 (TF, short circuit true) |
| effect of adding a parallel resistor on total resistance | aedc-008 (MCQ) |
| internal resistance of a source / terminal voltage | aedc-018 (concept), aedc-019 (applied compute), aedc-029 (TF, false claim) |
| conductance as 1/R | aedc-020 (MCQ), aedc-027 (TF) |
| conventional current direction | aedc-021 (MCQ), aedc-028 (TF, false claim) |

All 10 checklist bullets covered by at least one item; most by 2-4 items across different difficulty tiers.

## Difficulty mix

Roughly 1/3 recall (e.g. aedc-001, 004, 007, 009, 013, 020, 021, 023, 024, 027), 1/3 understanding (e.g. aedc-008, 011, 014, 016, 017, 018, 025, 026, 028), 1/3 applied/computational (e.g. aedc-002, 003, 005, 006, 010, 012, 015, 019, 022, 029, 030).

## Facts not found in extracts (standard first-year EE facts used, per brief's allowance)

The lecture-deck extract contains only bare slide titles for this topic - "Ohm's Laws / Ohm's Law (1)" (slide 2), "Series Circuits Defined" / "Calculating Equivalent Resistances in Series Circuits" (slides 59-60), "Parallel Circuits Defined" / "Calculating Equivalent Resistances in Parallel Circuits" (slides 61-62) - with no formulas, numeric examples, or definitions given in the visible text. Every quantitative/definitional fact below was therefore supplied from standard first-year EE knowledge rather than the extract:

- Ohm's law statement V = IR and its rearrangements (I = V/R, R = V/I)
- Series resistors sum: R_total = R1 + R2 + R3 + ...
- Parallel resistors: reciprocal-sum formula and the two-resistor product-over-sum shortcut
- Effect of adding a parallel resistor (total resistance decreases below the smallest branch)
- Voltage-divider rule and formula
- Current-divider rule and formula
- Power formulas P = VI, P = I²R, P = V²/R
- Short-circuit behaviour (near-zero resistance, excess current)
- Open-circuit behaviour (infinite resistance, zero current)
- Internal resistance / emf / terminal-voltage relationship (V_terminal = emf − I·r)
- Conductance as the reciprocal of resistance, unit siemens
- Conventional current direction (positive terminal -> external circuit -> negative terminal)

None of these are stated explicitly anywhere in `docs/appliedElectricity/source-extracts/lecture-deck.txt`; the extract's DC-circuits section is topic-title-only.

## N-gram originality check

Ran an automated 8-word n-gram overlap scan comparing normalized text (lowercased, punctuation stripped) of the new file against the full lecture-deck extract text. Result: **0 overlapping 8-grams**. No phrase of 8+ words is shared with the source.

## tsc result

`npx tsc --noEmit` completed with no output (clean pass) after the file was authored.

## Commit

`3b2ad850d7cbca09a15feb1ec683890df0355901` — "feat(applied-electricity): dcCircuits MCQ/TF bank (30)"

## Fix pass (coordinator review)

Findings from review and what changed, all in `lib/aeBankDcCircuits.ts`:

| finding | item | change |
|---|---|---|
| Compound TF stem ("zero resistance AND allows current to flow freely") | aedc-025 | Prompt reduced to one claim: "An open circuit behaves like a path of zero resistance." Kept `correctAnswer: false` (unchanged) and rewrote the rationale to match the new single-claim wording — explains the true fact is infinite, not zero, resistance. |
| Compound TF stem ("very low resistance, SO a large current can flow" — cause/effect chaining) | aedc-026 | Prompt reduced to one claim: "A short circuit is a path of very low resistance." Kept `correctAnswer: true` (unchanged). Also glossed "current" on its use in the rationale: "current (the flow of electric charge through it)". |
| Compound TF stem ("measured in siemens AND equals the reciprocal of resistance" — two facts) | aedc-027 | Prompt reduced to the single definitional claim: "Conductance is the mathematical reciprocal of resistance." Kept `correctAnswer: true` (unchanged). Rationale still mentions the siemens unit as supporting context, but the tested stem itself now asserts only the one fact. |
| "voltage" used twice in rationale, never glossed | aedc-018 | Rationale edited to gloss on first use: "driving voltage (the electrical push that drives current)". |
| "series" ungLossed in "total series resistance" | aedc-010 | Rationale edited to gloss inline: "the total resistance of the series (components connected end to end, so the same current flows through each) chain". |
| Current-divider concept not explained standalone (relied on sibling item aedc-011) | aedc-012 | Rationale edited to add a defining clause: "the current-divider rule — which describes how a shared total current splits between parallel branches in inverse proportion to their resistance —". |

None of these edits changed any `correctIndex` (MCQ) or flipped a `correctAnswer` (TF), so no wrong keys were introduced. Re-checked TF true/false balance after all edits: still exactly 4 true (aedc-023, 026, 027, 030) / 4 false (aedc-024, 025, 028, 029).

### tsc result (fix pass)

`npx tsc --noEmit` completed with no output (clean pass).

### Counts re-verified (fix pass)

30 total ids (aedc-001..030), 22 MCQ / 8 TF, TF true/false = 4/4 — verified programmatically after edits.

### Commit (fix pass)

`24f048aee4193a85bdf6fbbd8386d3e93c771c65` — "fix(applied-electricity): dcCircuits bank — decompound TF stems, gloss gaps"
