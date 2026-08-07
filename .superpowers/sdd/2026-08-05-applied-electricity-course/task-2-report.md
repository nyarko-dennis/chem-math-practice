# Task 2 Report: Numeric/complex answer checker (`aeAnswer.ts`)

## Status: DONE_WITH_CONCERNS

## Files created

- `lib/aeAnswer.ts` - pure module exporting `AnswerDescriptor`, `parseScalar`, `parseComplex`, `checkAeAnswer`. No React/Next imports, no globals.
- `lib/aeAnswer.test.ts` - `node --test` suite, 17 tests (the 5 from the brief's Step 1 block, plus 12 additional edge-case tests covering negative imaginary, bare imaginary `jb`/`4j`, µ vs u, K vs k, mega `M` vs milli `m`, unit synonyms, polar `<` and `angle` spellings, tolerance boundaries, custom `tol` override, and malformed-input handling).

## TDD process followed

1. Wrote `lib/aeAnswer.test.ts` with the brief's exact test block (plus my own additions), before creating `aeAnswer.ts`.
2. Ran `node --test lib/aeAnswer.test.ts` - confirmed failure: `ERR_MODULE_NOT_FOUND` for `./aeAnswer.ts` (module didn't exist yet).
3. Implemented `lib/aeAnswer.ts` per the brief's Design notes (SI prefixes, unit synonyms, scalar/complex tolerance formulas, `parseComplex` accepted forms).
4. Ran tests again - 1 failure surfaced (`parseScalar` on bare prefixed numbers like `'1M'`/`'1m'` with no trailing unit) - fixed the prefix-detection branch in `parseScalar` to accept a prefix character followed by nothing, not just prefix-followed-by-known-unit. Re-ran - all green.
5. Ran `npx tsc --noEmit -p tsconfig.json` - no type errors.
6. Committed.

## Test command and full output

```
$ node --test lib/aeAnswer.test.ts
✔ parseScalar: SI prefix scaling and unit capture (1.753333ms)
✔ checkAeAnswer scalar: value tolerance (0.159458ms)
✔ checkAeAnswer scalar: wrong unit rejected, missing unit accepted (0.077625ms)
✔ parseComplex: rectangular and polar (0.742084ms)
✔ checkAeAnswer complex: rectangular <-> polar equivalence (0.0745ms)
✔ parseScalar: negative values and bare number with no unit (0.070333ms)
✔ parseScalar: µ vs u prefix equivalence (0.080083ms)
✔ parseScalar: K vs k prefix equivalence (both 1e3) (0.067292ms)
✔ parseScalar: case-sensitive mega vs milli prefix (0.087ms)
✔ parseScalar: unit synonyms collapse to canonical dimension (0.109958ms)
✔ parseComplex: negative imaginary part (a-jb) (0.057ms)
✔ parseComplex: bare imaginary jb and bj (0.198417ms)
✔ parseComplex: bare real (0.1005ms)
✔ parseComplex: polar with < and "angle" spellings, and trailing unit stripped (0.071917ms)
✔ checkAeAnswer complex: tolerance boundary (0.057541ms)
✔ checkAeAnswer scalar: custom tolerance override (0.067333ms)
✔ checkAeAnswer: garbage input returns false, not throw (0.074917ms)
ℹ tests 17
ℹ suites 0
ℹ pass 17
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 155.152208
```

(A `MODULE_TYPELESS_PACKAGE_JSON` warning precedes this output - pre-existing repo-wide Node warning, unrelated to this change, present on every other `lib/*.test.ts` in the repo too.)

`npx tsc --noEmit -p tsconfig.json` - no output, no errors.

## Commit

`a552855` - `feat(applied-electricity): scalar+complex answer checker`

## Concerns / deviations

1. **Brief's test literal `'4720'` contradicts its own comment and the Design notes' documented default tolerance - I corrected the test input.**
   The brief's Step 1 code block contains:
   ```ts
   assert.equal(checkAeAnswer('4720', exp), false); // >1% off, unitless still checked on value
   ```
   with `exp = { kind: 'scalar', value: 4700, unit: 'ohm' }`. But `|4720 - 4700| / 4700 ≈ 0.4255%`, which is *under* the Design notes' documented default tolerance of 1% (`expected.tol ?? 0.01`). Applying the formula exactly as specified in the Design notes, `checkAeAnswer('4720', exp)` evaluates to `true`, not `false` - directly contradicting both the assertion and the comment's own stated intent ("`>1% off`").
   This is an internal inconsistency in the brief itself (not a matter of interpretation - I verified the arithmetic independently, see below), not a spec ambiguity I should have silently worked around.
   Resolution: I kept the Design notes' formula and its default tolerance constant (`0.01`) exactly as written, since downstream Tasks 3/8/9 (generators, practice page, Learn try-it) will call `checkAeAnswer` and will reasonably assume the documented ~1% default relative tolerance holds. I instead corrected the single test literal from `'4720'` to `'4800'` (2.13% off - comfortably `>1%`, matching the comment's own intent), and left an inline `NOTE:` comment in the test file explaining the change and pointing back to this report. All other test literals from the brief's Step 1 block are unchanged/verbatim.
   Verification: `node -e "console.log(Math.abs(4720-4700)/4700, Math.abs(4720-4700) <= 0.01*4700)"` -> `0.00425... true` (i.e. `4720` passes the 1%-tolerance check, confirming the brief's expected `false` was unreachable under its own documented formula).
   Flagging this explicitly in case the brief's author intended a different default tolerance value instead (e.g. 0.1%) rather than a different test number - that would be a one-line change to `checkAeAnswer`'s scalar default if preferred.

2. **Prefix-vs-unit disambiguation for `parseScalar` is heuristic, not brief-specified.** The brief doesn't spell out how to handle a single-letter unit that could collide with a single-letter SI prefix (e.g. is `"5a"` amps, or is `"a"` somehow a prefix?). I resolved this by relying on the fact that the SI-prefix letter set (`p n u µ μ m k K M G`) and the canonical single-letter unit set (`h f v a s w`) are disjoint - no overlaps - so a leading character is only ever treated as a prefix if either (a) nothing follows it, or (b) what follows resolves to a known unit word. This correctly handles all the brief's and my own test cases, but wasn't explicitly speced, so flagging it as a design choice for review if a course-specific unit is later added whose first letter collides with a prefix letter (e.g. hypothetically adding `"H"` as a stand-alone-lettered unit distinct from henry's `h`... not currently an issue since henry's canonical key is lowercase `h`).

3. Both `µ` (U+00B5, micro sign) and `μ` (U+03BC, Greek small letter mu) are accepted as the micro prefix, since they're visually indistinguishable and users/copy-paste sources mix them. The brief only mentions `µ`; this is a defensive addition, not a deviation from anything specified.

No other deviations. All function signatures match the brief's Interfaces section exactly (`AnswerDescriptor`, `parseScalar`, `parseComplex`, `checkAeAnswer`).
