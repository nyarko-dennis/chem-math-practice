# Task 4h report — threePhase MCQ/TF bank

File: `lib/aeBankThreePhase.ts`
Export: `threePhaseQuestions: AppliedElectricityQuestion[]`
Ids: `ae3ph-001` .. `ae3ph-030`

## Counts

- Total items: 30 (confirmed by script: `ids.length === 30`, sequential 001-030)
- MCQ: 22 (each with exactly 4 choices, one `correctIndex`, no "all/none of the above")
- TF: 8, exactly 4 true / 4 false (`aepow` pattern followed) — true: ae3ph-023, 026, 028, 029; false: ae3ph-024, 025, 027, 030
- Difficulty mix: roughly 1/3 recall (definitions of phase sequence, star/delta relationships, neutral role, four-wire/three-wire), 1/3 understanding (why three-phase, unbalanced-load consequence, star-vs-delta usage, delta needing no neutral), 1/3 applied (6 numeric calculations: ae3ph-006, 010, 011, 012, 014, plus the swap-trap pairing item ae3ph-022)

## Coverage map (checklist bullet -> items)

- Why three-phase (constant power, efficient transmission): ae3ph-001, 002, TF-025
- Phase sequence: ae3ph-003, 004, TF-029
- Star (wye) line-vs-phase relationships (VL=√3·Vph, IL=Iph): ae3ph-005, 006, 007, 012, 022, TF-023, TF-030
- Delta (mesh) relationships (VL=Vph, IL=√3·Iph): ae3ph-008, 009, 010, 011, 022, TF-024
- Total three-phase power P=√3·VL·IL·cosφ (same formula, both connections): ae3ph-013, 014, TF-028
- Balanced vs unbalanced load: ae3ph-015, 016
- Role of neutral wire: ae3ph-017, 018, TF-026
- Four-wire vs three-wire systems: ae3ph-019, 020, TF-027
- Star vs delta usage comparison: ae3ph-021

All nine checklist bullets are covered by at least one (usually multiple) items.

## Facts not found in the source extract

The extract's only three-phase-specific content is a bare slide title, "A 3-phase Transformer" (slide 65, no body text), plus a few passing mentions that three-phase alternating current powers AC motors and produces a rotating magnetic field. None of the following are in the extract at all, so they are included as standard first-year electrical-engineering facts (documented in the file's header comment):

- Why three-phase is used (near-constant power delivery to a balanced load; more efficient, lower-conductor-material transmission than single-phase)
- Phase sequence concept and notation (R-Y-B) and its effect on motor rotation direction
- Star (wye) connection and its VL=√3·Vph, IL=Iph relationships
- Delta (mesh) connection and its VL=Vph, IL=√3·Iph relationships
- The total three-phase power formula P=√3·VL·IL·cosφ and that it holds in line quantities for both connections
- Balanced vs unbalanced loads, and the neutral wire's role as unbalance-current return path
- Four-wire vs three-wire systems
- Typical star-vs-delta usage split (star for four-wire distribution to single-phase loads; delta for motor windings/industrial loads)
- The 230 V phase / 400 V line numeric example
- √3 ≈ 1.732

This bank is thinner on extract grounding than most of the other seven topics — the deck simply does not cover three-phase wiring/formulas at all, only a transformer slide title and motor-context mentions.

## N-gram originality check

Ran an 8-word shingle overlap check (`node` script, case/punctuation-normalized) between `lib/aeBankThreePhase.ts` and `docs/appliedElectricity/source-extracts/lecture-deck.txt`.

Result: **0 matching 8-word n-grams.**

## Pitfall sweeps (explicit confirmation)

**A — compound TF stems.** Swept all 8 TF stems individually; each asserts exactly one fact, no "and"/"so"/"because"/chained-property construction in any stem (rationales legitimately use "because"/"so" to explain, which is fine — only stems were checked):
- 023 VL=√3·Vph in star — single fact
- 024 IL=Iph in delta (false) — single fact
- 025 three-phase pulses to zero like single-phase (false) — single fact
- 026 neutral current = 0 when balanced — single fact
- 027 delta requires a neutral (false) — single fact
- 028 P=√3·VL·IL·cosφ applies to both connections — single fact
- 029 phase sequence definition — single fact
- 030 IL=√3·Iph in star (false) — single fact

**B — gloss on every standalone use.** Initial draft had 7 instances where "star (wye)" or "delta (mesh)" appeared as a bare alias without a full topology definition anywhere in that same item (ae3ph-010, 013, 015, 022, 024, 028, 030). Fixed all 7 by inserting the full parenthetical definition ("one end of each of the three phase windings joined at a common neutral point" / "the three phase windings joined end-to-end in a closed triangle, with no neutral point") at the term's first use within each affected item. Re-verified with a script that scans every item block for "star/wye" and "delta/mesh" mentions and checks a full-gloss string is present somewhere in that same block — remaining flags were false positives from a minor wording variant ("windings joined end-to-end..." vs "the three phase windings joined end-to-end...") that is still a complete definition, confirmed by manual read of ae3ph-010, 011, 015, 016, 019, 020, 021.

**C — non-predictable correctIndex.** Actual distribution across the 22 MCQs (verified by script): `{0: 6, 1: 5, 2: 5, 3: 6}` — matches the requested ~6/6/5/5 spread (as {6,6,5,5} across the four indices). Sequence of correctIndex values in item order: `0,0,1,0,3,3,1,2,3,3,2,2,1,2,0,2,3,3,1,0,0,1` — no repeating block/period, no run longer than 2.

**Star/delta swap check (special watch item).** Every item was checked individually against: STAR → VL=√3·Vph, IL=Iph; DELTA → VL=Vph, IL=√3·Iph. No item has these swapped. ae3ph-022 and TF-024/TF-030 specifically target the classic swap error as distractors/false statements, always with the correct (non-swapped) relationship as the keyed answer.

## Numeric item verification

- ae3ph-006: star, Vph=230V → VL=1.732×230≈398V ✓
- ae3ph-010: delta, Iph=10A → IL=1.732×10≈17.3A ✓
- ae3ph-011: delta, IL=34.6A → Iph=34.6/1.732≈20A ✓
- ae3ph-012: star, VL=400V → Vph=400/1.732≈231V ✓
- ae3ph-014: P=√3×400×20×0.8≈11,085W≈11.1kW (distractor 6.4kW = same numbers without √3) ✓

## tsc result

`npx tsc --noEmit` — clean, exit 0, no errors.

## Commit

`c4447c1e4f7344541cabd5dddee28fdec6799d3d` — "feat(applied-electricity): threePhase MCQ/TF bank (30)"

## Fix pass (coordinator review)

Two issues raised by the coordinator's review, both addressed:

- **ae3ph-016 (important):** the third choice used "in a star, or wye, system" as a bare synonym with no full topology gloss in the choice text itself (the rationale had it, but the choice didn't, so the choice wasn't self-contained). Expanded to: "in a star (wye) system — one end of each of the three phase windings joined at a common neutral point".
- **ae3ph-014 (minor):** prompt asked "to the nearest kilowatt" but the keyed answer is "11.1 kW" (one decimal place) and there is no "11 kW" choice. Changed prompt wording to "to one decimal place", matching ae3ph-010's phrasing style. Choices, key, and TF truth values were not touched.

Verified after editing:
- `npx tsc --noEmit` — clean, exit 0
- id count still 30, sequential 001-030; MCQ 22 / TF 8 unchanged
- `git diff --stat` showed exactly 2 lines changed in the one file, confirming no unintended edits elsewhere

Commit: `05b84bf98b7357527ee881da22dbadd1b1f245b4` — "fix(applied-electricity): threePhase bank - gloss star in choice, fix 014 rounding wording"
