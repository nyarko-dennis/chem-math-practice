# Task 4c report: capacitors MCQ/TF bank

## Counts

- Total items: 30 (aecap-001 .. aecap-030), sequential ids.
- MCQ: 22 (aecap-001 .. aecap-022). TF: 8 (aecap-023 .. aecap-030).
- TF split: 4 true (aecap-023, 024, 025, 026) / 4 false (aecap-027, 028, 029, 030). Confirmed by script: `tf true 4 tf false 4`.
- MCQ shape: all 22 have exactly 4 choices, `correctIndex` in [0,3], no malformed items (`bad mcq shape 0`).
- `correctIndex` distribution across the 22 MCQs: idx0=6, idx1=6, idx2=5, idx3=5 (script-verified).
- No "all of the above" / "none of the above" choices anywhere (script-verified, 0 violations).
- Difficulty mix (self-tagged during authoring, not stored in data): roughly 7 recall / 8 understanding / 7 applied (numeric-calculation and scenario items counted as applied) - matches the ~1/3 each target.

## Coverage map (checklist bullet -> item ids)

- Definition (stores energy in an electric field): aecap-001
- Q = CV: aecap-003, 004, 005, 006, 023
- Capacitors in parallel add (larger total) / series combine reciprocally (smaller total) - opposite of resistors: aecap-009, 010, 011, 012, 013, 025, 030
- Energy stored E = ½CV²: aecap-007, 008, 024
- Blocks DC in steady state (acts open) but passes changing/AC signals: aecap-014, 015, 016, 026
- RC charging through a resistor, time constant τ = RC, "one time constant" ≈ 63%: aecap-018, 019, 020, 021, 028
- Voltage across a capacitor cannot change instantly: aecap-017, 027
- Effect of plate area / separation / dielectric on capacitance: aecap-022 (area + separation), 029 (dielectric)
- Unit farad: aecap-002

Every checklist bullet has at least one item; most have 2+ including at least one MCQ and one TF (positive and negated framings) for the higher-risk conceptual points (series/parallel direction, DC blocking, voltage continuity, time-constant meaning, dielectric effect).

## Facts not found in extracts

The source lecture deck (`docs/appliedElectricity/source-extracts/lecture-deck.txt`) does not treat capacitors as a standalone topic - it only lists them as a passive component alongside resistors and inductors (slide 11, Thevenin discussion) and mentions capacitor banks / energy "stored in the device's... electric field" / leading current in passing while discussing AC power factor (slides 89, 91). None of the deck's slide titles or dedicated content sections cover capacitors specifically (unlike DC circuits, Kirchhoff's laws, Thevenin/Norton, or AC waveforms, which each have multiple dedicated slides).

As a result, nearly the entire technical content of this bank is standard first-year electrical-engineering material not found in the extract, specifically:
- Q = CV and all its rearrangements
- E = ½CV² (energy stored)
- The parallel-add / series-reciprocal combination rules and the "opposite of resistors" comparison
- The capacitor's DC-blocking / AC-passing behavior at steady state
- RC charging/discharging through a resistor, τ = RC, and the ~63% rule for one time constant
- Voltage continuity (cannot change instantaneously)
- Plate area, plate separation, and dielectric effects on capacitance
- The farad as the SI unit of capacitance

Only the general notion of a capacitor as a passive component that stores energy in an electric field (used to ground aecap-001) is loosely traceable to the extract's phrasing in slide 89 ("stored in the device's magnetic or electric field"); it was paraphrased, not quoted, and confirmed via the n-gram check below.

## N-gram originality check

Ran an 8-word n-gram overlap check (Python, lowercased, word-tokenized) between `lib/aeBankCapacitors.ts` and `docs/appliedElectricity/source-extracts/lecture-deck.txt`.

Result: **0 overlapping 8-word sequences.**

## Pitfall A sweep (compound TF stems)

Read all 8 TF stems individually; each asserts exactly one fact, no "and"/"so"/"because"/cause-effect chaining of two distinct claims:
- aecap-023: Q=CV relationship correctness (one claim about one formula) - true
- aecap-024: E=½CV² correctness (one claim about one formula) - true
- aecap-025: series capacitance is smaller than the smaller individual value (one comparative claim) - true
- aecap-026: capacitor behaves as open circuit once at DC steady state (one behavioral claim; "fully charged" and "reached steady state" describe the same condition, not two independent facts) - true
- aecap-027: voltage can change instantaneously on switching (one claim) - false
- aecap-028: capacitor is fully charged after one time constant (one claim) - false
- aecap-029: dielectric decreases capacitance (one claim) - false
- aecap-030: parallel combination is smaller than either alone (one claim) - false

No stem combines two independently-verifiable facts. Confirmed clean.

## Pitfall B sweep (gloss on every standalone use)

Manually swept every item's prompt + rationale. Every use of "capacitor," "capacitance," "charge," "voltage," "current," "resistor"/"resistance," "farad," "dielectric," "steady state," "DC," "AC," "open circuit," "electric field," and "time constant" is glossed with a plain-language parenthetical on each item where it appears - each item is self-contained (no reliance on a gloss established in another item). Special watch item: the series/parallel direction is stated correctly and explicitly flagged as the *opposite* of resistors in aecap-009, 011, 013 (MCQ) and aecap-025, 030 (TF) - parallel capacitors add to a larger total, series capacitors combine reciprocally to a smaller total. Verified no instance accidentally states the resistor-style rule for capacitors.

## tsc result

`npx tsc --noEmit` - clean, no errors.

## Commit

`1563bad` - "feat(applied-electricity): capacitors MCQ/TF bank (30)"

## Fix pass (coordinator review)

A coordinator review found three issues, all fixed in `lib/aeBankCapacitors.ts`:

1. **Critical - aecap-013 wrong comparison direction.** The rationale claimed adding a series capacitor lowering total capacitance was "the opposite of what happens when a parallel resistor is added to a resistor network." That's wrong: adding a parallel resistor also *lowers* total resistance (same direction, not opposite). The keyed answer (`correctIndex: 0`) was already correct - only the comparison was wrong. Fixed by comparing against a **series** resistor instead, which does increase total resistance (the true opposite): rationale now reads "...the opposite of what happens when a resistor (component opposing current flow) is added in series to a resistor network, which always makes the total resistance rise."

2. **Important - aecap-021 gloss gap.** "resistor" and "voltage" appeared unglossed in the prompt (first use), and "voltage" appeared unglossed in the rationale (first use). Added `(a component that opposes the flow of current)` after resistor and `(the electrical push that drives current)` after voltage on first use in the prompt, and the same voltage gloss on first use in the rationale.

3. **Important - predictable correctIndex pattern.** The 22 MCQ `correctIndex` values ran in a perfectly repeating `0,1,2,3,0,1,2,3,...` cycle across aecap-001..022, making the answer position predictable from the question number. Reshuffled to a non-periodic sequence while preserving the same 6/6/5/5 balance across indices 0-3: new sequence is `1,0,3,1,2,0,1,3,0,2,1,3,0,2,1,0,3,2,1,0,3,2`. For every item whose `correctIndex` changed, the `choices` array was physically reordered so the same correct-answer text now sits at the new index (verified programmatically - each MCQ still has exactly one correct choice, at the value stated by `correctIndex`). No `correctIndex`/`correctAnswer` *content* (i.e., which fact is correct) was altered anywhere - only position.

### Post-fix verification

- Total items: still 30. MCQ: 22, TF: 8.
- TF split: still 4 true / 4 false (script-verified).
- Every MCQ still has exactly 4 choices and one correct choice at its stated `correctIndex` (script-verified, 0 malformed items).
- `correctIndex` distribution: 0=6, 1=6, 2=5, 3=5 (unchanged balance).
- Checked programmatically that the sequence is no longer period-4 periodic (`seq[i] === seq[i+4]` fails for multiple `i`).
- `npx tsc --noEmit` - clean, no errors.

### Fix commit

`1b8b868` - "fix(applied-electricity): capacitors bank — fix aecap-013 comparison, gloss, de-pattern correctIndex"
