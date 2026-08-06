# Task 4f report: acAnalysis MCQ/TF bank

File: `lib/aeBankAcAnalysis.ts`
Export: `acAnalysisQuestions: AppliedElectricityQuestion[]`
Ids: `aeaca-001` .. `aeaca-030`

## Counts

- Total items: 30
- MCQ: 22, TF: 8
- TF split: 4 true / 4 false (T: aeaca-023, 025, 027, 028; F: aeaca-024, 026, 029, 030)
- MCQ `correctIndex` distribution: {0: 6, 1: 5, 2: 6, 3: 5}
- `correctIndex` sequence (item 1→22): `1,0,3,0,2,3,2,1,2,2,3,1,0,0,0,3,2,1,3,1,0,2` — non-periodic, no repeating cycle
- Every MCQ has exactly 4 choices, one correct; no "all/none of the above" (grepped, zero hits)
- Ids sequential `aeaca-001`..`aeaca-030` (verified programmatically)
- Difficulty mix (self-classified): recall 10, understanding 11, applied 9 (~33/37/30%)

## Coverage map (checklist bullet → item ids)

- Inductive reactance $X_L=2\pi fL$, rises with frequency: 001, 003, 005, 023
- Capacitive reactance $X_C=1/(2\pi fC)$, falls with frequency: 002, 004, 005, 024
- Impedance combines resistance + reactance, $|Z|=\sqrt{R^2+X^2}$: 006, 007, 022
- Phasor = magnitude + phase: 008, 009, 029
- Pure resistor: V, I in phase: 010, 011, 025
- Pure inductor: current lags voltage 90° (ELI): 012, 013, 026
- Pure capacitor: current leads voltage 90° (ICE): 014, 015, 027
- Series RL impedance $Z=R+jX_L$: 016, 017
- Series RC impedance $Z=R-jX_C$: 018, 019, 030
- Series RLC impedance $Z=R+j(X_L-X_C)$: 020
- Resonance ($X_L=X_C$, net reactance zero, $Z=R$ min): 021, 028
- Rectangular vs polar representation: 016, 018, 022

Every checklist bullet is covered by at least one item (most by 2-4).

## Facts not found in the source extract (deck is thin here, per brief)

The lecture-deck extract has essentially no worked AC-analysis content for this topic: slide 50 is a bare "Phasor representation of a sine wave" figure title (no textual definition); slides 96–98 are bare titles ("RL Series Circuit", "R and L Vector Diagrams", "Phasor Diagram for the Series RL Circuit") with zero body text or formulas. The following are standard first-year facts not grounded in the extract, disclosed in a header comment in the file:

- Inductive reactance formula $X_L=2\pi fL=\omega L$ and its rise with frequency
- Capacitive reactance formula $X_C=1/(2\pi fC)=1/(\omega C)$ and its fall with frequency
- Formal definition of impedance combining R and X, and $|Z|=\sqrt{R^2+X^2}$
- Formal definition of a phasor as a rotating arrow (magnitude + phase)
- The exact 90° figure for inductor/capacitor phase lag/lead (extract only says "lagging"/"leading" qualitatively, under the power-factor section, slide 89 — not this topic's slides)
- ELI / ICE mnemonics
- Series RL, RC, RLC impedance formulas in rectangular form
- Resonance condition ($X_L=X_C$) and minimum-impedance-at-resonance
- Rectangular vs polar representation and conversion between them

One partial grounding point used (paraphrased, not copied): slide 89 states that for a purely resistive load "current and voltage will change polarity in step" and that capacitive loads are "leading (current leads voltage)" while inductive loads are "lagging (current lags voltage)" — this grounds the *qualitative direction* of the in-phase/lag/lead facts (items 010–015, 025–027), even though it appears under the deck's power-factor slides rather than a dedicated AC-analysis slide, and even though the exact 90° figures and mnemonics are added as standard facts.

## N-gram originality check

Compared all 8-word sequences in the bank file against all 8-word sequences in `docs/appliedElectricity/source-extracts/lecture-deck.txt` (lowercased, punctuation-stripped). Result: **0 overlapping 8-grams.** No phrase of 8+ words was copied from the extract.

## Pitfall sweeps (explicit confirmation)

**A — compound TF stems:** All 8 TF stems (aeaca-023..030) reviewed individually. Each asserts exactly one fact; none contain "and"/"so"/"because"/chained two-property claims. Confirmed clean.

**B — gloss on every standalone use:** Every MCQ prompt and every rationale (all 30 items) glosses each technical term (reactance, inductive reactance, capacitive reactance, impedance, phasor, phase, phase difference, in phase, lags, leads, resonance, rectangular form, polar form, pure resistor/inductor/capacitor) inline in parentheses at first use within that item's prompt and again at first use within that item's rationale, mirroring the existing `aeBankAcFundamentals.ts` convention. TF stems are left plain (no inline gloss in the stem itself) with the gloss carried in the rationale, matching the precedent set by the existing acFundamentals bank. Swept all 30 items; no un-glossed jargon found in prompts/rationales.

**C — non-predictable correctIndex:** Distribution is {0:6, 1:5, 2:6, 3:5}; sequence `1,0,3,0,2,3,2,1,2,2,3,1,0,0,0,3,2,1,3,1,0,2` has no repeating period. Confirmed via script.

**Lead/lag special watch:** Verified explicitly — inductor → current LAGS voltage (voltage leads), mnemonic ELI, used consistently in items 012/013/026. Capacitor → current LEADS voltage, mnemonic ICE, used consistently in items 014/015/027. No swaps found on re-read.

**Reactance-frequency direction:** $X_L$ rises with frequency (001, 003, 005, 023); $X_C$ falls with frequency (002, 004, 005, 024). Verified consistent throughout, no swaps.

**Impedance signs:** Series RL uses $+jX_L$ (016, 017); series RC uses $-jX_C$ (018, 019, 030 — 030 is the false TF asserting the wrong `+jX_C` sign, correctly marked false); series RLC uses $+j(X_L-X_C)$ (020). Verified consistent.

**Numeric conversions:** $X_L$ = 2π×50×0.2 ≈ 62.8 Ω (003); $X_C$ = 1/(2π×1000×10×10⁻⁶) ≈ 15.9 Ω (004); $|Z|$ = √(30²+40²) = 50 Ω (007); RL $|Z|$ = √(8²+6²) = 10 Ω (017); RC $|Z|$ = √(9²+12²) = 15 Ω (019); rectangular→polar magnitude √(3²+4²) = 5 Ω (022). All recomputed and correct.

## tsc

`npx tsc --noEmit` — clean, no errors.

## Commit

Committed as `feat(applied-electricity): acAnalysis MCQ/TF bank (30)`.

## Fix: gloss "impedance" in standalone items (coordinator review)

Coordinator review found that six items used the word "impedance" without glossing it anywhere within that item — a gloss present only in a *different* item doesn't count, since each item is drawn independently by spaced repetition. The original B-sweep had glossed impedance's *component parts* ("rectangular form", "the resistance part plus an imaginary reactance part") in these items but missed the bare word "impedance" itself.

Items fixed, each given the gloss `impedance (a circuit's total opposition to alternating current, combining resistance and reactance)` at first use, matching the phrasing already used in items 006/007/017/019/028:

- **aeaca-016** — added to the prompt ("How is the impedance (...) of a series RL circuit...")
- **aeaca-018** — added to the prompt (same pattern, series RC)
- **aeaca-020** — added to the rationale ("the series RLC impedance (...) formula $Z=R+j(X_L-X_C)$...")
- **aeaca-021** — added to the prompt ("...what happens to the circuit's impedance (...)?") — previously glossed in neither prompt nor rationale
- **aeaca-022** — added to the prompt (first of 4 uses in the item; used 0 times before this fix)
- **aeaca-030** — added to the rationale ("a series RC circuit's (...) impedance (...) in rectangular form...")

No ids, choice arrays, `correctIndex` values, or `correctAnswer` (TF truth) values were touched — verified via `git diff`, which shows only prose-string edits on the six affected lines/blocks.

Post-fix verification (re-run programmatically):
- Total items: 30 (unchanged)
- MCQ 22 / TF 8 (unchanged)
- TF true/false: 4/4 (unchanged)
- Ids sequential `aeaca-001`..`aeaca-030` (unchanged)
- MCQ `correctIndex` distribution: {0: 6, 1: 5, 2: 6, 3: 5} (unchanged)
- All six flagged items now match the impedance gloss regex (verified programmatically): aeaca-016, 018, 020, 021, 022, 030 — all `true`

`npx tsc --noEmit` — clean, no errors.

Commit: `fix(applied-electricity): acAnalysis bank — gloss impedance in standalone items`
