# Leadership & Development course — build report

Course id: `leadership-development`. Route slug `/leadership-development`
(+ `/leadership-development/stats`). Accent pink (`#DB2777`).

Pure knowledge course (mirrors Engineering Materials): 240 curated MCQ/TF across
8 topic banks (30 each) + 24 self-marking subjective drills (3 per topic). No
generated-numeric content, no Learn page.

## Source grounding & disclosure

Per the authoring recipe, every fact is either grounded in the two committed
student extracts under `source-extracts/` or drawn from standard, widely taught,
non-copyrighted leadership curriculum and disclosed below. No 8+ word phrase is
shared with either extract (verified by an 8-gram overlap check over all content
files).

### Grounded in the committed extracts

- **`leadership-assignments.txt`** (resource-allocator memo, MK Yeboah) →
  `concepts` bank items ldcon-003, 004, 016–020, 025, 029, and drills lddr-001
  (part), **lddr-002**, **lddr-003**: the resource-allocator role, the "4 Ms"
  (Man, Money, Materials, Time), and the good/poor-allocation consequences.
- **`preparing-african-leaders.txt`** (D. Adjin-Tettey) → `styles` bank items
  ldsty-010–014, 022, 025, 027, and drill **lddr-009**: primus inter pares
  ("first among equals") vs the "coconut" (Western) style, community-minded
  leadership, the Kitenge example, and the call to balance the two styles in
  decision-making, authority, and communication.

### Facts NOT found in the extracts (standard curriculum, authored from general knowledge)

The two extracts cover only resource allocation and a leadership-style contrast;
the remaining ~7 topics were authored against the syllabus topic list using
standard first-year leadership material, namely:

- **concepts:** French & Raven's five bases of power (legitimate, reward,
  coercive, expert, referent); the leadership-vs-management distinction;
  leadership as a process/informal leadership.
- **theories:** trait/Great Man theory; behavioural theories (Ohio State
  initiating structure & consideration; Blake & Mouton Managerial Grid);
  Fiedler's contingency model & LPC; Hersey-Blanchard situational leadership;
  House's path-goal theory; Bass's transformational vs transactional (the "four
  I's"); Greenleaf's servant leadership.
- **styles:** Lewin's autocratic/democratic/laissez-faire styles; task- vs
  people-oriented leadership.
- **communication:** the sender-encoding-message-channel-receiver-decoding-
  feedback-noise process; verbal/non-verbal; active listening; barriers
  (physical/semantic/psychological); directions/channels; the grapevine.
- **decisionMaking:** the rational model; Simon's bounded rationality &
  satisficing; programmed vs non-programmed; certainty/risk/uncertainty;
  group decision making; Janis's groupthink; decision biases (confirmation,
  anchoring, escalation of commitment, overconfidence).
- **teamBuilding:** team vs group; Tuckman's stages; Belbin team roles;
  cohesion; conflict types & Thomas-Kilmann resolution styles; delegation;
  synergy; norms.
- **emotionalIntelligence:** Goleman's five components; EI vs IQ.
- **development:** mentoring vs coaching; 360-degree feedback; self-development;
  succession planning; Dweck's growth vs fixed mindset; formal/experiential
  learning.

All are established, non-proprietary concepts standard to an introductory
leadership syllabus.

## Gates

- `npm run test`: 167/167 pass (8 bank invariant tests + barrel + drills).
- `npm run build`: compiles; `/leadership-development` and
  `/leadership-development/stats` in the route list; course card on the dashboard.
- `npx eslint` on new files: clean.
- Invariants enforced by tests: 240 total / 30 per topic, unique ids, ~22 MCQ /
  8 TF per bank with all four correctIndex positions used and exactly 4 true / 4
  false; 24 drills / 3 per topic, rubric marks sum to totals, every drill kind
  used ≥2×, model answers 150–400 words.
