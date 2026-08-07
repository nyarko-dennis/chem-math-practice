# Task 7 report: Learn-mode lessons (`aeLessons.ts`)

## Summary

Created `lib/aeLessons.ts` and `lib/aeLessons.test.ts` per the brief. 8 lessons, one per `AppliedElectricityTopic`, mirroring the shape and plain-language style of `lib/calculusLessons.ts`.

## Lesson count and per-topic titles

| id | topic | title | # examples |
|---|---|---|---|
| ae-lesson-01 | dcCircuits | DC Circuits | 2 |
| ae-lesson-02 | networkTheorems | Network Theorems | 1 |
| ae-lesson-03 | capacitors | Capacitors | 2 |
| ae-lesson-04 | inductors | Inductors | 2 |
| ae-lesson-05 | acFundamentals | AC Fundamentals | 2 |
| ae-lesson-06 | acAnalysis | AC Analysis | 2 |
| ae-lesson-07 | power | Electrical Power | 2 |
| ae-lesson-08 | threePhase | Three-Phase Systems | 2 |

Total: 8 lessons, 15 worked examples, each with >=2 steps. Every `intro` glosses technical terms in plain language (voltage/current/resistance, reactance/impedance lag-lead, real/reactive/apparent power, star vs delta line/phase relationships, etc.), consistent with the codebase's plain-language-answers convention.

Each lesson's `tryIt` calls `AE_GENERATORS[<topic>]()` directly (e.g. `AE_GENERATORS.dcCircuits()`), guaranteeing `category === topic`.

## Physics correctness spot-check

- dcCircuits: `V=IR`; parallel product-over-sum; series sum — matches `generateDcCircuits`.
- networkTheorems: `Vth = V*R2/(R1+R2)`, `Rth = R1‖R2` — matches `generateNetworkTheorems`'s fixed two-resistor template exactly (source in series with R1, output across R2).
- capacitors: `Q=CV`, `E=0.5CV^2`, `tau=RC` — matches.
- inductors: `E=0.5LI^2`, `v=L di/dt`, `tau=L/R` — matches.
- acFundamentals: `Vrms=Vpeak/sqrt2` (explicitly distinguished from half-cycle average, `2Vp/pi`, to avoid the rms-vs-average mixup flagged in the brief), `omega=2*pi*f` — matches.
- acAnalysis: `Xl=omega*L` (lag), `Xc=1/(omega*C)` (lead), `Z=R+jX` (capacitor uses `-jXc`, explicitly called out as the sign that differs from the inductor's `+jXl`) — matches `generateAcAnalysis`'s zRL/zRC sign convention.
- power: `S=sqrt(P^2+Q^2)`, `pf=P/S` — matches.
- threePhase: star `VL=sqrt3*Vph` (phase current = line current, not called into this example), delta `IL=sqrt3*Iph` (line voltage = phase voltage, noted in intro), `P=sqrt3*VL*IL*cos(phi)` — intro explicitly warns against swapping the star/delta sqrt(3) factor between voltage and current.

## Test results

- `node --test lib/aeLessons.test.ts`: 3/3 pass (topic-count/intro/example/tryIt-category check from the brief, plus two extra checks I added: full topic-set coverage, and lesson/example id uniqueness).
- `npm run test` (full suite): 135/135 pass, no regressions.
- `npx tsc --noEmit`: clean, no output/errors.

## Commit

`194e670` — "feat(applied-electricity): Learn-mode lessons"
Files: `lib/aeLessons.ts`, `lib/aeLessons.test.ts` (279 insertions).

## Concerns

None. No deviations from the brief. The two additional test cases (topic-set coverage, id uniqueness) are supplementary to the brief's required test and don't change its behavior.
