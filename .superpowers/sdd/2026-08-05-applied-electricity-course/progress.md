# SDD ledger — plan: docs/superpowers/plans/2026-08-05-applied-electricity-course.md

Branch: feat/applied-electricity-course

Tasks:
1. Shared types
2. aeAnswer checker
3. Generators
4a-4h. Curated banks (8)
5. Barrel + invariants
6. Drills
7. Lessons
8. Practice page
9. Learn page
10. Registry/labels/stats/gate

## Log
Task 1: complete (commits 3a481f6..72fab20, review clean)
Task 2: minor (deferred): aeAnswer.ts matchUnitWord loop is dead code, equivalent to canonicalUnit(text.trim())
Task 2: complete (commits 72fab20..a552855, review clean; test fixed 4720->4800, self-contradictory brief literal)
Task 3: complete (commits a552855..53a7d4f, review clean; all 8 generators physics-verified)
Task 4a: fix round 1/5 (6 addressed, 0 open; commits 3b2ad85..24f048a)
Task 4a: complete (commits 53a7d4f..24f048a, review clean; dcCircuits 30)
Task 4b: complete (commits 24f048a..83f9cd7, review clean; networkTheorems 30)
Task 4c: fix round 1/5 (3 addressed incl Critical aecap-013, 0 open; commits 1563bad..1b8b868; 20 reordered MCQs verified)
Task 4c: complete (commits 83f9cd7..1b8b868, review clean; capacitors 30)
Task 4d: complete (commits 1b8b868..696f059, review clean; inductors 30)
Task 4e: complete (commits 696f059..e2cd103, review clean; acFundamentals 30)
Task 4f: fix round 1/5 (6 gloss addressed, 0 open; commits 9dc08aa..fc2e530)
Task 4f: complete (commits e2cd103..fc2e530, review clean; acAnalysis 30)
Task 4g: fix round 1/5 (3 gloss addressed, 0 open; commits 883c68d..58b619e)
Task 4g: complete (commits fc2e530..58b619e, review clean; power 30)
Task 4h: fix round 1/5 (1 important + 1 minor addressed; commits c4447c1..05b84bf; 2-line prose diff verified inline)
Task 4h: complete (commits 58b619e..05b84bf, review clean; threePhase 30)
ALL 8 BANKS COMPLETE (240 MCQ/TF)
Task 5: complete (commits 05b84bf..dbf3055, invariants 3/3 + full suite 128/128; barrel test verified real)
Task 6: complete (commits dbf3055..bc2b5c4, review clean; 24 drills, all numerics verified)
Task 7: complete (commits bc2b5c4..194e670, review clean; 8 lessons, 15 worked examples verified)
Task 8: fix round 1/5 (shuffle MCQ addressed; commits 1ce3913..cf92fa1)
Task 8: fix round 2/5 (re-review found new Important: MCQ missing-shuffle rendered TF/mis-scored; fix landed 0ba02cb)
Task 8: complete (0ba02cb re-reviewed clean — all shuffles[q.id] access routes through mcqDisplayFor fail-safe; guarded non-null assertions correct)
Task 9: complete (commit e9f612c; learn page mirrors calculus/learn, plain-text input + checkAeAnswer, sky accent; build clean, /applied-electricity/learn present)
Task 10: complete (commit 4f351c8; COURSES card + courseLabels + stats route; full gate: 135/135 tests pass, build clean, all 3 routes present)
FINAL WHOLE-BRANCH REVIEW: clean. Shared-layer wiring verified in practice page (pickWeightedType+pickSpacedQuestions on start, recordAttempt first-attempt on check, saveCourseProgress on finish, ReviewList on finished screen, resume w/ shuffle backfill). All 10 tasks done.
Branch: work now on claude/applied-electricity-tasks-8-10-fqxxvm (designated push target). Ready to push.
