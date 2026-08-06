# Task 4g report — power MCQ/TF bank

## Counts
- Total items: 30 (aepow-001 .. aepow-030, sequential, no gaps)
- MCQ: 22 (aepow-001..022), each exactly 4 choices, one correct, no "all/none of the above"
- TF: 8 (aepow-023..030), split exactly 4 true / 4 false
  - True: aepow-023, 024, 027, 029
  - False: aepow-025, 026, 028, 030
- MCQ correctIndex distribution across 0-3: [6, 5, 5, 6] (idx0=6, idx1=5, idx2=5, idx3=6), order:
  1,2,1,1,0,2,1,3,3,0,2,3,0,1,3,2,0,3,0,2,3,0 — no short repeating cycle.

## Coverage map (checklist bullet -> item ids)
- Real/active power P (W, actually consumed): aepow-001, 002, 015
- Reactive power Q (VAR, exchanged with L/C, no net work): aepow-003, 004, 016, 025
- Apparent power S (VA, S=√(P²+Q²)): aepow-005, 006, 023, 026
- Power triangle relationship: aepow-007, 008
- Power factor pf=cosφ=P/S, leading vs lagging: aepow-009, 010, 013, 014, 028
- P=VI cosφ: aepow-015
- Q=VI sinφ: aepow-016
- Why low pf is undesirable (more current for same real power): aepow-017, 030
- Power-factor correction with a capacitor: aepow-019, 020, 029
- Instantaneous vs average power: aepow-021, 022
- Power in a purely reactive element averages to zero: aepow-022, 027
- Purely resistive load pf=1 / purely reactive load pf=0 (extract-grounded): aepow-011, 012, 024

Every checklist bullet has at least one covering item; several (pf leading/lagging, PFC, reactive-average-zero) are covered from multiple angles (definition + numeric + TF).

## Facts not found in extracts (standard first-year facts used)
1. Explicit Pythagorean formula S = √(P²+Q²) — extract (line 416) only describes apparent power as the magnitude of the "vector sum" / "complex power" of real and reactive power, no formula given.
2. Power triangle as a right triangle with P and Q as perpendicular legs, S as hypotenuse, φ as the included angle — extract (line 400) has only the bare slide title "Power Triangle" with no body content.
3. Explicit formulas P = VI cos φ and Q = VI sin φ.
4. Definition of instantaneous power (product of instantaneous v and i at one moment) and its explicit contrast with average power.
5. That average power delivered to a purely reactive element (ideal inductor or capacitor alone) is exactly zero over a complete cycle.

All other facts (pf ratio real/apparent, pf range 0–1, purely resistive → pf=1, purely reactive → pf=0, leading=capacitive/lagging=inductive, PFC via capacitors for lagging loads, PFC reduces current/burden on supply, low-pf-needs-more-apparent-power numeric relationship) are grounded in `docs/appliedElectricity/source-extracts/lecture-deck.txt` lines 388–421 (paraphrased, numbers changed from the extract's own worked example).

## N-gram originality check
Ran an 8-gram token overlap check (lowercased, alphanumeric tokens) between `lecture-deck.txt` and `aeBankPower.ts`.
- First pass found 5 shared 8-grams: three from "...back to the source during the rest of the cycle" (item aepow-004) and two from "...the ratio of real power to apparent power" (item aepow-009, reused in rationales of aepow-011, 012, 017, 020).
- Fixed by rewording aepow-004's rationale and replacing the recurring "ratio of real power to apparent power" gloss with "real power divided by apparent power" everywhere it appeared.
- Re-ran the check: **0 shared 8-grams** remaining.

## Pitfall sweeps (explicit confirmation)
- **A — compound TF stems:** Read all 8 TF prompts individually; each states exactly one fact, no "and"/"so"/"because"/two-property chaining in the stem itself (rationales may explain with connectives, stems do not). Confirmed clean.
- **B — gloss on every standalone use:** Every item was authored independently with its own glosses for jargon it uses (real/active power, reactive power, apparent power, VAR, VA, power factor, leading/lagging, power triangle, purely reactive/resistive element, instantaneous/average power) — no reliance on a term being glossed in a different item. Spot-checked items 1, 3, 5, 9, 13, 14, 21, 22, 27, 28 for self-contained glossing; all pass.
- **C — non-predictable correctIndex:** Full 22-value MCQ correctIndex sequence is `1,2,1,1,0,2,1,3,3,0,2,3,0,1,3,2,0,3,0,2,3,0`. Distribution is 6/5/5/6 across 0–3. Checked for repeating windows of length 2–4; no sustained periodic cycle across the sequence (one triplet, `3,0,2` at positions 9–11, recurs once at positions 18–20 as `3,0,2`, but this is an isolated coincidence, not a tiling pattern covering the sequence).

## Physics/units self-check
- P in W, Q in VAR, S in VA used consistently throughout (spot-checked aepow-001/002/003/005/006/015/016/023/025).
- S=√(P²+Q²) used correctly (aepow-006: 6²+8²=100→10 kVA); aepow-026 (TF, false) explicitly rejects the wrong S=P+Q sum.
- Leading = capacitive (current leads voltage), lagging = inductive (current lags voltage) — correct in aepow-013/014/028.
- Power-factor correction for a lagging (inductive) load uses a capacitor — correct in aepow-019/029.
- Numeric items independently verified: aepow-006 (10 kVA), aepow-010 (0.9), aepow-015 (1600 W), aepow-016 (1200 VAR), aepow-018 (8 kVA).

## tsc result
`npx tsc --noEmit` — clean, no errors (exit 0).

## Commit
`883c68d` — "feat(applied-electricity): power MCQ/TF bank (30)"

## Fix pass — coordinator gloss review (commit 58b619e)

The coordinator's review confirmed all physics correct and flagged three gloss gaps missed by the item-1/3/5/9/13/14/21/22/27/28 spot check above — each item is drawn independently, so a term glossed in a sibling item does not count.

- **aepow-015 / aepow-016:** "rms" was used unglossed in both prompts. Added `rms (root-mean-square, the equivalent steady value)` on first use in each item's prompt.
- **aepow-002:** rationale named `reactive power` and `apparent power` only via their units (VAR, VA) without defining the concepts. Added `reactive power (power that flows back and forth with inductors or capacitors and does no net useful work)` and `apparent power (the total power the supply must provide, combining real and reactive power)`.
- **aepow-008:** same gap — `reactive power` and `apparent power` appeared as bare unit-corrections. Added the same two definitions, consistent with aepow-001/003/005.

No ids, choices, or `correctIndex`/TF truth values were touched — confirmed via `git diff lib/aeBankPower.ts` (4 lines changed, all within prompt/rationale strings only).

Re-verified after the fix:
- `npx tsc --noEmit` — clean.
- Counts: 30 ids sequential, 22 MCQ / 8 TF, 4 true / 4 false, correctIndex tally unchanged at [6, 5, 5, 6].
- N-gram check vs `lecture-deck.txt` — 0 shared 8-grams (unchanged from before the fix).

Commit: `58b619e` — "fix(applied-electricity): power bank — gloss rms and reactive/apparent power"
