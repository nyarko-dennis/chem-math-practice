# Task 3 report: generated-numeric problem builders (`aeGenerators.ts`)

## Files created

- `lib/aeGenerators.ts` — implementation.
- `lib/aeGenerators.test.ts` — the brief's failing test (written first, verified
  failing on missing module), plus four extra targeted tests.

## TDD sequence

1. Wrote `lib/aeGenerators.test.ts` exactly as specified in the brief (topic x
   difficulty x 25 samples, asserting each question's own `answerDisplay`
   round-trips through `checkAeAnswer`), plus my own additions:
   - `dcCircuits`: exact Ohm's-law sanity check (V=12, R=4 -> I=3A).
   - `networkTheorems`: exact Thevenin-voltage-divider sanity check.
   - `acAnalysis`: complex rectangular-form parse sanity check ("3+j4 ohm").
   - `threePhase`: star line-voltage relationship sanity check (VL=√3·Vph).
2. Ran `node --test lib/aeGenerators.test.ts` — confirmed FAIL
   (`ERR_MODULE_NOT_FOUND: lib/aeGenerators.ts`).
3. Implemented `lib/aeGenerators.ts` in full (all 8 generators + barrel), then
   re-ran the test — passed on the first attempt, all 6 tests green.
4. Re-ran the fuzz test 8 more times back-to-back (600 random samples per run,
   4800 total across the extra runs) to stress the randomization — all green,
   no intermittent failures.
5. `npx tsc --noEmit` — clean.
6. `npm run test` (full suite) — 125/125 passing, no regressions.
7. `npm run build` — clean production build.

## Design decisions

- **Answer/display precision split**: `answer.value` (or `re`/`im` for
  complex) always carries the *unrounded* computed value; `answerDisplay`
  shows a 4-significant-figure rounded value. Since `checkAeAnswer` defaults
  to 1% (scalar) / 2% (complex) tolerance and 4-sig-fig rounding error is at
  most ~0.05%, this is always comfortably inside tolerance without needing to
  force display and machine value to be bit-identical.
- **No SI prefixes in `answerDisplay`**: per the brief's explicit warning,
  every scalar is shown as a fully-scaled base-unit value (e.g. capacitance in
  farads, not µF). Values needing prefixes for readability (capacitance,
  inductance) use exponential notation (`v.toExponential(3)`) instead of a
  prefix letter — `parseScalar`'s number regex accepts `e`/`E` scientific
  notation natively, so this is unambiguous and avoids the whole
  prefix-vs-stripper interaction the brief flagged as risky.
- **Plain-space separators, not `\ ` (backslash-space)**: the test's
  `stripLatex` only strips a literal *double*-backslash+space; a
  single-backslash+space (as produced by typing `\\ ` in a JS/TS source
  string) leaves a stray backslash character embedded in the string, which
  breaks `parseScalar`. All generators use an actual space character between
  the numeric value and the unit LaTeX macro.
- **Charge (C) and energy (J) have no `unit` in `AnswerDescriptor`**: `ohm,
  hz, v, a, f, h, w, var, va, s` (and `rad/s`) are the only units
  `checkAeAnswer` understands — coulombs and joules aren't among them. For
  those quantities the descriptor omits `unit` entirely (skips the unit
  check, compares magnitude only), while `answerDisplay` still shows a
  cosmetic `\text{C}` / `\text{J}` suffix for the student — safe because
  `C`/`J` are not SI-prefix letters, so no prefix-scaling ambiguity is
  possible; the checker just discards the trailing unit text.
- **Power factor** is dimensionless: same no-unit-in-descriptor treatment,
  displayed as a bare number.

## Per-category formulas

- **dcCircuits** (`generateDcCircuits`): randomly picks one of 8 templates —
  Ohm's law solved for V, I, or R (`V=IR`); series resistance (`R_eq =
  R1+R2+R3`); parallel resistance of two resistors
  (`R_eq = R1*R2/(R1+R2)`); voltage-divider (`V_R2 = V*R2/(R1+R2)`);
  current-divider (`I_R1 = I*R2/(R1+R2)`); power via `P=VI`, `P=I²R`, or
  `P=V²/R`.
- **networkTheorems** (`generateNetworkTheorems`): fixed template only — one
  voltage source `V` in series with `R1`, feeding a node from which `R2` goes
  to the reference node, output terminals across `R2`. Asks for one of
  `Vth = V·R2/(R1+R2)`, `Rth = R1∥R2`, `In = V/R1` (verified equal to
  `Vth/Rth`), or `Rn = Rth` (Norton dual). No arbitrary topology, per the
  brief's constraint.
- **capacitors** (`generateCapacitors`): `Q=CV` (no unit, cosmetic C); `E =
  ½CV²` (no unit, cosmetic J); series `C_eq = C1·C2/(C1+C2)`; parallel `C_eq =
  C1+C2`; RC time constant `τ=RC` (seconds).
- **inductors** (`generateInductors`): `E = ½LI²` (no unit, cosmetic J);
  induced emf `v = L·(di/dt)` (volts); series `L_eq=L1+L2`; parallel
  `L_eq=L1·L2/(L1+L2)`; RL time constant `τ=L/R` (seconds).
- **acFundamentals** (`generateAcFundamentals`): `Vrms = Vpeak/√2`; `Vavg =
  2·Vpeak/π`; `f = 1/T`; `T = 1/f`; `ω = 2πf` (rad/s).
- **acAnalysis** (`generateAcAnalysis`): `Xl = ωL` (ohm, scalar); `Xc =
  1/(ωC)` (ohm, scalar); series RL impedance `Z = R + jωL` (complex); series
  RC impedance `Z = R − j/(ωC)` (complex, negative imaginary part).
- **power** (`generatePower`): real power `P = VI·cosφ`; apparent power `S =
  √(P²+Q²)`; reactive power `Q = √(S²−P²)`; power factor `pf = cosφ = P/S`
  (no unit, dimensionless).
- **threePhase** (`generateThreePhase`): star `VL = √3·Vph` and its inverse
  `Vph = VL/√3`; delta `IL = √3·Iph`; total power `P = √3·VL·IL·cosφ`.

## Test command + full pass output

```
$ node --test lib/aeGenerators.test.ts
✔ a generator exists for every topic (0.9ms)
✔ every generated question is self-consistent: its own canonical answer passes the checker (6.1ms)
✔ dcCircuits: known Ohm's-law instance yields exact expected value (0.07ms)
✔ networkTheorems: Thevenin voltage divider formula is exact for a known case (0.05ms)
✔ acAnalysis: complex impedance answers are accepted in rectangular form (0.13ms)
✔ threePhase: star line voltage relationship VL = sqrt(3) * Vph (0.05ms)
ℹ tests 6
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
```

Also verified:
- `npx tsc --noEmit` — no output (clean).
- `npm run test` — 125/125 passing (full repo suite, no regressions).
- `npm run build` — production build succeeds.
- Reran the fuzz test 8 additional times to check for randomization-dependent
  flakiness — all green every time.

## Commit

`53a7d4f42212a70e12f00b6a1d459a320e3d09b3` — "feat(applied-electricity):
generated numeric problems (8 categories)"

## Concerns

- None blocking. Two things worth flagging for whoever builds the page/lesson
  layer on top of this (Tasks 4a-4h / page task are out of scope here):
  1. `answerDisplay` for capacitance/inductance uses exponential notation for
     values outside `[1e-3, 1e6)` in base units (e.g. `4.700e-6 F` rather than
     `4.7 µF`). This is correct and round-trips through `checkAeAnswer`, but
     is less friendly to read than an SI-prefixed form — a future polish pass
     could special-case a prefix-aware formatter if desired, as long as it's
     re-verified against `stripLatex`.
  2. Charge/energy/power-factor answers have `unit: undefined` in their
     `AnswerDescriptor`, so `checkAeAnswer` only checks magnitude, not any
     unit the student types. This is intentional (no coulomb/joule unit
     exists in `aeAnswer`'s vocabulary) but means a student answer like
     `5 mA` would technically still pass a charge question expecting `5`
     (since the unit is never checked). Low risk given tolerance is tight and
     values are unlikely to coincidentally collide, but worth knowing.
