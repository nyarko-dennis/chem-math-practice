# Task 4b report - networkTheorems MCQ/TF bank

## File
`lib/aeBankNetworkTheorems.ts` - exports `networkTheoremsQuestions: AppliedElectricityQuestion[]`

## Counts
- Total: 30 items (ids `aent-001` .. `aent-030`, sequential, all unique)
- MCQ: 22 (aent-001..022) - each exactly 4 choices, exactly one correct
- TF: 8 (aent-023..030) - exactly 4 true / 4 false
- MCQ `correctIndex` distribution: `{0: 7, 1: 4, 2: 4, 3: 7}` - all four positions used, spread across 0-3
- No "all/none of the above" distractors anywhere

## Checklist coverage map (networkTheorems)

| Checklist bullet | Items |
|---|---|
| KCL statement | aent-001, aent-023 |
| KCL basis (charge conservation) | aent-002, aent-023 |
| KVL statement | aent-003 |
| KVL basis (energy conservation) | aent-004, aent-024 |
| Thevenin theorem statement + Vth/Rth meaning | aent-005, aent-006, aent-007, aent-020, aent-025 |
| Norton theorem statement + Norton current/resistance | aent-008, aent-009, aent-010, aent-021, aent-026, aent-027 |
| Thevenin <-> Norton source transformation | aent-011 |
| Superposition theorem (linear, one source at a time, others zeroed - voltage sources shorted, current sources opened) | aent-012, aent-013, aent-014 |
| When superposition does NOT apply (power, non-linear elements) | aent-015, aent-016, aent-029, aent-030 |
| Maximum power transfer condition (RL = Rth) | aent-017, aent-022, aent-028 |
| Reciprocity theorem (idea only) | aent-018 |
| Millman's theorem (idea only) | aent-019 |

Every bullet in the task-4-brief networkTheorems checklist has at least one item; several (Thevenin, Norton, superposition, max power) have multiple items spanning recall/understanding/applied.

## Difficulty mix
Roughly 1/3 recall (direct statements of KCL/KVL/theorems, ids 001-005, 008, 012, 018, 019, 023-027), 1/3 understanding (mechanics of the procedure - deactivating sources, why superposition fails for power/non-linear elements, Vth/Rth/In meaning, ids 006, 007, 009, 010, 013-016, 028-030), 1/3 applied/numeric (source-transformation formula and worked numeric problems, ids 011, 017, 020, 021, 022).

## Facts not found in extracts (standard first-year facts, disclosed per binding rule)
The lecture-deck extract (`docs/appliedElectricity/source-extracts/lecture-deck.txt`) covers KCL, KVL, Thevenin's theorem, and superposition in prose; Norton's theorem appears only as slide headers/step titles with no body text captured. The following are standard circuit-theory facts not present in the extract's text:
- Formal statement that Norton current In = short-circuit current at the terminals (extract only has step headers "Calculate the Norton Current" / "Calculate the Norton Resistance", no defining sentence)
- Norton resistance Rn equals Thevenin resistance Rth
- Source-transformation formula In = Vth / Rth
- Maximum power transfer condition RL = Rth (not mentioned anywhere in the extract)
- Reciprocity theorem (not mentioned in the extract at all - listed in the course's theorem list on slide 1 by name only, "Superposition Theorem / Thevenin Theorem / Norton Theorem" is all slide 1 names; reciprocity/Millman aren't even named there)
- Millman's theorem (same - not named or described anywhere in the extract; this is the thinnest-sourced topic in the bank)
- All three worked numeric examples (aent-020, aent-021, aent-022) use invented numbers, not values from the extract's Figure 1/Figure 4.9 examples (those figures/tables aren't captured as text in the extract)

## N-gram originality check
Ran an 8-word n-gram overlap check (lowercased, punctuation-stripped) between the full extract file and the full bank file. Result: **0 overlapping 8-grams**. No phrase of 8+ words is shared with the source extract.

## Pitfall sweeps (explicit confirmation)

**Pitfall A - compound TF stems:** Read all 8 TF stems (aent-023..030) individually. Each asserts exactly one claim:
- aent-023: KCL is based on conservation of charge (one claim)
- aent-024: KVL is based on conservation of charge (one claim, false)
- aent-025: Thevenin resistance is found with sources deactivated (one claim)
- aent-026: Norton current equals short-circuit current (one claim)
- aent-027: Norton resistance is always different from Thevenin resistance (one claim, false)
- aent-028: max power transfer when RL = Rth (one claim)
- aent-029: superposition can calculate power directly by adding per-source power (one claim, false)
- aent-030: superposition applies to circuits with non-linear elements (one claim, false)

No stem contains "and"/"so"/"because" joining two separate factual claims. Confirmed clean.

**Pitfall B - gloss every term on every standalone use:** Swept all 30 items individually (not relying on any other item's definitions). Recurring jargon - node, loop/closed loop, KCL, KVL, charge conservation, energy conservation, Thevenin theorem/equivalent/voltage/resistance, Norton theorem/equivalent/current/resistance, linear circuit, independent source, superposition, source transformation, short circuit, open circuit, load resistor, non-linear element, maximum power transfer, reciprocity theorem, Millman's theorem, node (again for Millman) - is parenthetically glossed inline every time it appears in a prompt, choice set, or rationale, in every item where it's used, not just on first occurrence across the file. Confirmed clean.

## tsc result
`npx tsc --noEmit` - clean, no errors.

## Test suite
`npm run test` - 125/125 passing (no regressions; this bank has no dedicated test file since it's static curated data, consistent with the other curated banks in the repo).

## Commit
`83f9cd7383c271b64e3e064b0b10d80854750059` - "feat(applied-electricity): networkTheorems MCQ/TF bank (30)"
