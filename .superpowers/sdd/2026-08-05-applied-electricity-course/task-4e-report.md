# Task 4e report: acFundamentals MCQ/TF bank

File: `lib/aeBankAcFundamentals.ts`
Export: `acFundamentalsQuestions: AppliedElectricityQuestion[]`
Ids: `aeacf-001` .. `aeacf-030`

## Counts

- Total: 30
- MCQ: 22, TF: 8
- TF split: 4 true (aeacf-023, 026, 029, and one more - see below) / 4 false - confirmed programmatically: `tf true 4, tf false 4`
  - True: aeacf-023 (peak-to-peak = 2x peak), aeacf-025 (DC frequency = 0), aeacf-026 (Ghana mains = 50 Hz), aeacf-029 (crest factor = peak/rms)
  - False: aeacf-024 (rms = peak/2), aeacf-027 (angular freq unit = cycles/s), aeacf-028 (half-cycle avg = rms), aeacf-030 (phase-different waveforms peak simultaneously)
- MCQ correctIndex distribution: index0=6, index1=6, index2=5, index3=5 (matches ~6/6/5/5 target)
- MCQ correctIndex sequence (in file order): `1,0,2,0,3,1,2,3,1,2,0,3,0,1,0,3,2,1,3,0,2,1` - no repeating 0,1,2,3 cycle
- All MCQ verified programmatically: exactly 4 choices each, correctIndex in [0,3], no "all/none of the above"
- Ids verified sequential and unique aeacf-001..030

## Coverage map (checklist bullet -> item ids)

- What AC is (periodically reverses direction) -> aeacf-001
- Peak (amplitude) -> aeacf-002
- Peak-to-peak -> aeacf-003, aeacf-023
- Instantaneous values -> aeacf-004, aeacf-005
- Rms value and why it matters (equivalent-heating DC value) -> aeacf-006, aeacf-024
- Vrms = Vpeak/sqrt(2) (numeric) -> aeacf-007
- Vavg (half-cycle) = 2Vpeak/pi (numeric) -> aeacf-008
- Rms vs half-cycle-average kept distinct -> aeacf-009, aeacf-028
- Full-cycle average = 0 -> aeacf-010
- Period T -> aeacf-011
- Frequency f = 1/T -> aeacf-012
- Angular frequency omega = 2*pi*f -> aeacf-015, aeacf-016, aeacf-027
- Phase and phase difference (lead/lag) -> aeacf-017, aeacf-018, aeacf-019, aeacf-030
- Mains frequency concept (50/60 Hz) -> aeacf-013 (Ghana, 50 Hz), aeacf-014 (60 Hz elsewhere), aeacf-026
- Form factor -> aeacf-020, aeacf-021
- Crest factor -> aeacf-022, aeacf-029

Every checklist bullet has at least one item; rms-vs-average distinction gets dedicated redundant coverage (aeacf-009, aeacf-028) since it was flagged as the special watch-out.

## Facts not found in the source extract (standard first-year facts, disclosed per instructions)

The lecture-deck extract (`docs/appliedElectricity/source-extracts/lecture-deck.txt`, slides 44-57) covers: AC/DC definitions, cycle/frequency concept, Ghana mains = 50 cps, sine-wave instantaneous-value relationship (v = Vmax x sin(angle), 360 deg/2*pi rad per cycle), AC vs DC comparison, applications. It does NOT contain:
- rms definition/formula (Vrms = Vpeak/sqrt(2) ~= 0.707 x Vpeak) and the heating-equivalence rationale
- half-cycle average formula (Vavg = 2Vpeak/pi ~= 0.637 x Vpeak)
- explicit peak-to-peak = 2 x peak relationship
- full-cycle average of a sinusoid = 0
- period T = 1/f as an explicit reciprocal (deck slide 47 is a title only, no body)
- angular frequency omega = 2*pi*f
- phase difference / lead-lag terminology and definition (deck lists "phase" only as one of three waveform characteristics, no elaboration)
- 60 Hz mains frequency used in other countries (deck only states Ghana's 50 cps)
- form factor (~1.11) and crest factor (~1.414)

## N-gram originality check

Ran an 8-word sliding-window comparison between the bank file and the full source extract (case-insensitive, word-tokenized). Initial pass found one coincidental 8-gram match ("f the number of cycles per second is") caused by a source sentence boundary ("...points a and d, b and e, or c and f. The number of cycles per second is defined...") lining up token-for-token with my rationale's "Frequency f (the number of cycles per second) is...". Reworded that rationale (aeacf-016) to "Frequency f (how many complete cycles happen each second) is found from...". Re-ran the check: **0 overlaps of 8+ words** in the final file.

## Pitfall sweeps (explicit confirmation)

**A - compound TF stems:** Swept all 8 TF prompts programmatically for "and"/"so"/"because" plus manual read. All 8 are single-fact assertions:
- aeacf-023: peak-to-peak = 2x peak (one fact)
- aeacf-024: rms = peak/2 (one fact, false)
- aeacf-025: DC frequency = 0 (one fact) - reworded during drafting to drop an original "...because its direction and magnitude stay constant" causal clause, which risked reading as two bundled facts
- aeacf-026: Ghana mains = 50 Hz (one fact)
- aeacf-027: angular frequency unit = cycles/s (one fact, false)
- aeacf-028: half-cycle average = rms (one fact, false)
- aeacf-029: crest factor = peak/rms (one fact)
- aeacf-030: phase-different same-frequency waveforms peak simultaneously (one fact, false) - phrased as a single conditional-outcome claim, not two bundled facts

No stem asserts two independently-gradable properties. Confirmed clean.

**B - gloss on every standalone use:** Each of the 30 items was authored to be self-contained: every jargon term used in that item's prompt/choices/rationale (rms, peak, peak-to-peak, instantaneous, half-cycle average, period, frequency, angular frequency, phase, phase difference, mains frequency, form factor, crest factor, AC, DC) is glossed with a parenthetical plain-language explanation within that same item, not relying on any other item. Ran an automated heuristic scan (term-then-nearby-paren check) which flagged 16 items as "no gloss nearby" due to its narrow 50-character window; manually re-read all 16 flagged items in full and confirmed every flagged term does carry a gloss elsewhere in that item's rationale (the heuristic's false positives were caused by longer intervening clauses or the gloss preceding rather than following the term). No genuine gaps found.

**C - non-predictable correctIndex:** MCQ correctIndex sequence `1,0,2,0,3,1,2,3,1,2,0,3,0,1,0,3,2,1,3,0,2,1` has no repeating 0,1,2,3 (or reverse) run. Distribution across 0-3 is 6/6/5/5. Spot-verified several items (aeacf-003 peak-to-peak=650V at index2, aeacf-007 rms=240V at index2, aeacf-012 f=50Hz at index3, aeacf-015 omega=314rad/s at index0, aeacf-021 form factor=1.11 at index2, aeacf-022 crest factor=1.41 at index1) that the choice text at the stated correctIndex is in fact the numerically-correct answer.

**Rms vs half-cycle-average watch-out:** Kept the two figures explicitly distinct throughout - rms always described as "~0.707 x peak" / divide-by-sqrt(2), half-cycle average always described as "~0.637 x peak" / 2/pi factor, with aeacf-009 and aeacf-028 directly contrasting them side by side to reinforce the distinction. Peak-to-peak consistently = 2 x peak (aeacf-003, aeacf-023).

## tsc result

`npx tsc --noEmit` - clean, no errors (confirmed twice: after initial authoring and after the n-gram-driven rewording of aeacf-016).

## Commit

```
e2cd10389e996a60ceb68c83596d8caee54e5ced feat(applied-electricity): acFundamentals MCQ/TF bank (30)
```

1 file changed, 291 insertions(+): `lib/aeBankAcFundamentals.ts`
