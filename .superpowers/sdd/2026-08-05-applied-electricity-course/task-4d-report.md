# Task 4d report: inductors MCQ/TF bank

## Counts

- Total items: 30 (aeind-001 .. aeind-030), sequential ids (script-verified).
- MCQ: 22 (aeind-001 .. aeind-022). TF: 8 (aeind-023 .. aeind-030).
- TF split: 4 true (aeind-023, 024, 025, 026) / 4 false (aeind-027, 028, 029, 030). Confirmed by script: `tf true 4 tf false 4`.
- MCQ shape: all 22 have exactly 4 choices, `correctIndex` in [0,3], correct choice text verified to sit at the stated index for every item (script-verified).
- `correctIndex` distribution across the 22 MCQs: idx0=6, idx1=5, idx2=6, idx3=5. Sequence: `1,3,0,2,2,1,3,0,1,2,0,3,2,0,1,3,0,2,3,1,2,0`. Checked programmatically for period-2/3/4 repetition across the full sequence - not periodic at any of those periods.
- No "all of the above" / "none of the above" choices anywhere (grep-verified, 0 hits).
- Difficulty mix (self-tagged during authoring): roughly 7 recall (definition, unit, formulas) / 8 understanding (Lenz's law, series/parallel direction, DC-short vs AC-opposition, self/mutual, turns/core) / 7 applied (numeric energy/series/parallel/τ calculations, switch-opening scenario, DC-inductor-vs-capacitor contrast) - matches the ~1/3 each target.

## Coverage map (checklist bullet -> item ids)

- Definition (stores energy in a magnetic field): aeind-001, 023
- Induced emf v = L(di/dt) and Lenz's law (opposes the change): aeind-003, 004, 015, 022, 026
- Inductors in series add / parallel combine reciprocally (like resistors, opposite of capacitors): aeind-007, 008, 009, 020, 025, 027
- Energy stored E = ½LI²: aeind-005, 006
- Passes DC in steady state (acts as a short) but opposes changing/AC current: aeind-010, 011, 021, 028
- RL time constant τ = L/R: aeind-012, 013, 014, 029
- Current through an inductor cannot change instantly: aeind-015, 026
- Self- vs mutual inductance (idea): aeind-016, 017
- Unit henry: aeind-002, 024
- Factors affecting inductance (turns, core material): aeind-018, 019, 030

Every checklist bullet has at least one item; the higher-risk points (series/parallel direction vs. resistors/capacitors, DC-short vs. AC-opposition, current continuity, τ formula direction) each get both an MCQ and a TF (including a negated/false framing).

## Facts not found in extracts

The source lecture deck (`docs/appliedElectricity/source-extracts/lecture-deck.txt`) has **no standalone "inductors" section** - grepped for "induct|henry|self.inductance|mutual" and confirmed the deck never defines an inductor, gives v = L(di/dt), E = ½LI², the series/parallel rules, τ = L/R, or the henry. The deck only grounds a few adjacent ideas:

- Inductors listed as a passive component alongside resistors and capacitors (slide 11, Thevenin discussion).
- "Inductive loads" absorbing energy that is "stored in the device's magnetic or electric field, only to return this energy back to the source" during an AC cycle, with current lagging voltage (slides 89, 411) - used loosely to ground aeind-001/023 (energy stored in a magnetic field) and aeind-011 (AC opposition), paraphrased not quoted.
- Mutual induction and electromagnetic induction discussed in the transformer and generator sections (slides 63-66, 261, 274, 276, 587-588) - used to ground aeind-017 (mutual inductance / transformer coupling).

Everything else is standard first-year electrical-engineering material not found in the extract, specifically:
- The definition of an inductor and its magnetic-field energy storage (beyond the loose "inductive load" phrasing above)
- v = L(di/dt) and Lenz's law wording
- The series-add / parallel-reciprocal combination rules and the "opposite of capacitors" comparison
- E = ½LI² (energy stored) and all numeric applications
- The DC-short / AC-opposition behaviour at steady state, and the inductor-vs-capacitor steady-state contrast (aeind-021)
- The RL time constant τ = L/R and the ~63% rule for one time constant
- Current continuity (cannot change instantaneously) and the switch-opening voltage-spike scenario
- Self-inductance as a distinct concept from mutual inductance
- The henry as the SI unit of inductance
- Turns and core-material effects on inductance

## N-gram originality check

Ran an 8-word n-gram overlap check (Python, lowercased, word-tokenized) between `lib/aeBankInductors.ts` and `docs/appliedElectricity/source-extracts/lecture-deck.txt`.

- Raw file (including the header comment, which contains one direct, quotation-marked citation of the extract's phrase "stored in the device's magnetic or electric field ... to return this energy back to the source" to document grounding): 12 overlapping 8-grams, all from that single quoted comment sentence.
- **Question content only (prompts, choices, rationales - header comment excluded): 0 overlapping 8-word sequences.**

## Pitfall A sweep (compound TF stems)

Read all 8 TF stems individually; each asserts exactly one fact, no "and"/"so"/"because"/cause-effect chaining of two distinct claims:
- aeind-023: energy stored mainly in a magnetic field (one claim) - true
- aeind-024: henry is the unit of inductance (one claim) - true
- aeind-025: series (no coupling) inductances sum (one claim; the "no shared coupling" clause is a qualifier on the single claim, not a second claim) - true
- aeind-026: current through an inductor cannot change instantaneously (one claim) - true
- aeind-027: parallel inductors simply add (one claim) - false
- aeind-028: ideal inductor is an open circuit at steady DC (one claim) - false
- aeind-029: τ = R/L (one claim about one formula) - false
- aeind-030: more turns decreases inductance (one claim) - false

No stem combines two independently-verifiable facts. Confirmed clean.

## Pitfall B sweep (gloss on every standalone use)

Manually swept every item's prompt + rationale. Every use of "inductor," "inductance," "induced emf"/"electromotive force," "Lenz's law," "magnetic field," "henry," "current," "voltage," "steady state," "DC," "short circuit," "open circuit," "time constant," "self-inductance," "mutual inductance," "turns," and "ferromagnetic core" is glossed with a plain-language parenthetical on each item where it appears, independent of any gloss established in another item (each item authored/checked as self-contained). No gloss was assumed to carry over from a prior item.

## Pitfall C sweep (non-predictable correctIndex) + series/parallel & DC-behaviour direction check

- `correctIndex` sequence for the 22 MCQs: `1,3,0,2,2,1,3,0,1,2,0,3,2,0,1,3,0,2,3,1,2,0` - script-checked for period-2/3/4 repetition across the whole sequence: not periodic. Distribution 6/5/6/5 across indices 0-3.
- Special-watch direction check: inductors in series add (aeind-007, 020, 025) and in parallel combine reciprocally (aeind-008, 009, 020, 027) - explicitly stated as matching resistors and as the **opposite** of how capacitors combine (aeind-008 rationale states this comparison directly; no item states or implies the reverse).
- DC steady-state direction check: inductor at steady DC is a **short** (low-resistance path) - aeind-010, 021, 028; capacitor at steady DC is the **open** one - only referenced contrastively in aeind-021, correctly stated as the inductor being the short and the capacitor being the open circuit (correctIndex 2, verified against choice text). No item states an inductor is open at DC or a capacitor is short at DC.

## tsc result

`npx tsc --noEmit` - clean, no errors (no output, exit 0).

## Commit

`696f059` - "feat(applied-electricity): inductors MCQ/TF bank (30)"
