import type { LeadershipQuestion } from './leadershipTypes.ts';

// Topic: Decision Making (for leaders).
// Standard curriculum: the rational decision model, Simon's bounded rationality
// and satisficing, programmed vs non-programmed decisions, decision conditions
// (certainty/risk/uncertainty), group decision making and groupthink, and
// common decision biases. No dedicated deck was provided; authored from general
// knowledge and disclosed in the build report.
export const decisionMakingQuestions: LeadershipQuestion[] = [
  {
    id: 'lddec-001',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'What is the first step in the rational decision-making model?',
    choices: [
      'Identifying and clearly defining the problem',
      'Choosing a solution at random',
      'Implementing before thinking',
      'Evaluating the outcome',
    ],
    correctIndex: 0,
    rationale:
      'The rational model starts by identifying and defining the problem. Only once the real problem is clear can useful alternatives be generated and compared.',
  },
  {
    id: 'lddec-002',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'The classic rational decision-making model assumes the decision maker:',
    choices: [
      'Ignores all information',
      'Has full information and picks the option that best meets the goal',
      'Decides purely by flipping a coin',
      'Never evaluates alternatives',
    ],
    correctIndex: 1,
    rationale:
      'The rational model assumes a decision maker with complete information who weighs all alternatives logically and selects the one that maximises the desired outcome - an ideal that real conditions rarely allow.',
  },
  {
    id: 'lddec-003',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'Herbert Simon’s idea of "bounded rationality" says that in practice people:',
    choices: [
      'Always find the perfect answer',
      'Never use any logic',
      'Make decisions within the limits of their information, time, and mental capacity',
      'Can process unlimited information instantly',
    ],
    correctIndex: 2,
    rationale:
      'Bounded rationality recognises that real decision makers face limits - incomplete information, limited time, and limited mental processing - so they reason as well as they can within those bounds rather than perfectly.',
  },
  {
    id: 'lddec-004',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: '"Satisficing" a decision means:',
    choices: [
      'Searching forever for the perfect option',
      'Refusing to decide at all',
      'Always choosing the most expensive option',
      'Accepting the first option that is "good enough" rather than the optimal one',
    ],
    correctIndex: 3,
    rationale:
      'Satisficing (a blend of "satisfy" and "suffice") means settling for the first alternative that meets the minimum requirements, instead of exhaustively searching for the very best - a practical response to bounded rationality.',
  },
  {
    id: 'lddec-005',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'A "programmed" decision is one that is:',
    choices: [
      'Routine and repetitive, handled with established rules or procedures',
      'Completely new and never seen before',
      'Always made by a computer only',
      'Impossible to make',
    ],
    correctIndex: 0,
    rationale:
      'Programmed decisions are routine and recurring, so they can be handled by standard rules, policies, or procedures - for example, reordering stock when it runs low.',
  },
  {
    id: 'lddec-006',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'A "non-programmed" decision is one that is:',
    choices: [
      'Handled automatically by a fixed rule',
      'Novel, complex, and requires judgement rather than a set procedure',
      'Always trivial',
      'Never faced by leaders',
    ],
    correctIndex: 1,
    rationale:
      'Non-programmed decisions are new, unstructured, or complex situations with no ready-made rule, so they call for judgement, analysis, and creativity - for example, whether to enter a new market.',
  },
  {
    id: 'lddec-007',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'A decision made under conditions of "risk" is one where:',
    choices: [
      'Every outcome is fully known in advance',
      'The decision is illegal',
      'Outcomes are uncertain but their probabilities can be estimated',
      'There is nothing to decide',
    ],
    correctIndex: 2,
    rationale:
      'Under risk, the decision maker does not know exactly what will happen but can estimate the probability of each outcome - for example, using past data to judge the chance of a project succeeding.',
  },
  {
    id: 'lddec-008',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'A decision made under conditions of "certainty" is one where:',
    choices: [
      'Nothing can be predicted',
      'The probabilities are unknown',
      'The decision maker is guessing blindly',
      'The outcome of each option is known in advance',
    ],
    correctIndex: 3,
    rationale:
      'Under certainty, the decision maker knows exactly what result each alternative will produce, making the choice straightforward - though few real decisions are this clear-cut.',
  },
  {
    id: 'lddec-009',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'A decision made under conditions of "uncertainty" is one where:',
    choices: [
      'The probabilities of the possible outcomes are unknown',
      'Every outcome is guaranteed',
      'The decision is purely routine',
      'No alternatives exist',
    ],
    correctIndex: 0,
    rationale:
      'Under uncertainty, the decision maker cannot even reliably estimate the probabilities of outcomes, so judgement, intuition, and scenario-thinking play a larger role.',
  },
  {
    id: 'lddec-010',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'Which is a genuine advantage of group decision making?',
    choices: [
      'It is always the fastest method',
      'It brings more knowledge and ideas together and can increase buy-in',
      'It removes all responsibility',
      'It guarantees there will be no disagreement',
    ],
    correctIndex: 1,
    rationale:
      'Groups pool more information, perspectives, and ideas than an individual, and people who help make a decision tend to be more committed to carrying it out.',
  },
  {
    id: 'lddec-011',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'Which is a genuine disadvantage of group decision making?',
    choices: [
      'It always produces worse ideas',
      'It never involves anyone',
      'It can be slower and is vulnerable to groupthink',
      'It removes the need for a decision',
    ],
    correctIndex: 2,
    rationale:
      'Group decisions take more time and can fall into groupthink or be dominated by a few loud voices, which is why leaders manage the process deliberately.',
  },
  {
    id: 'lddec-012',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'What is "groupthink"?',
    choices: [
      'A method for generating many creative ideas',
      'A way of measuring probabilities',
      'A type of programmed decision',
      'When the desire for harmony makes group members suppress disagreement, leading to poor decisions',
    ],
    correctIndex: 3,
    rationale:
      'Groupthink happens when a group values agreement and harmony so highly that members hold back doubts and critical thinking, allowing flawed decisions to pass unchallenged.',
  },
  {
    id: 'lddec-013',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'Which practice helps reduce groupthink?',
    choices: [
      'Encouraging open dissent, or appointing someone to argue the opposing case (a "devil’s advocate")',
      'Punishing anyone who disagrees',
      'Letting the most senior person speak first and decide',
      'Rushing to unanimous agreement',
    ],
    correctIndex: 0,
    rationale:
      'Deliberately inviting dissent and assigning a devil’s advocate to challenge the emerging view forces the group to examine weaknesses, counteracting the pressure for premature agreement.',
  },
  {
    id: 'lddec-014',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'A key benefit of participative decision making (involving those affected) is that it:',
    choices: [
      'Always shortens the decision',
      'Increases people’s commitment to carrying out the decision',
      'Removes the leader’s responsibility',
      'Guarantees the cheapest option',
    ],
    correctIndex: 1,
    rationale:
      'When people help shape a decision that affects them, they understand it better and feel ownership of it, which raises their commitment to making it work.',
  },
  {
    id: 'lddec-015',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'What is "confirmation bias" in decision making?',
    choices: [
      'Deciding too slowly',
      'Ignoring all evidence',
      'Favouring information that supports what you already believe, and downplaying evidence against it',
      'Always changing your mind',
    ],
    correctIndex: 2,
    rationale:
      'Confirmation bias is the tendency to seek, notice, and weigh evidence that confirms an existing belief while dismissing information that contradicts it - which can lock in a flawed decision.',
  },
  {
    id: 'lddec-016',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'What is "anchoring" bias?',
    choices: [
      'Refusing to gather any data',
      'Deciding by committee only',
      'Making only routine decisions',
      'Relying too heavily on the first piece of information received when judging',
    ],
    correctIndex: 3,
    rationale:
      'Anchoring is over-relying on an initial figure or fact (the "anchor"), so later judgements stay too close to it even when better information arrives - for example, fixating on the first price quoted.',
  },
  {
    id: 'lddec-017',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: '"Escalation of commitment" describes a decision maker who:',
    choices: [
      'Keeps investing more into a failing course of action to justify past decisions',
      'Quickly abandons any plan',
      'Never starts a project',
      'Always chooses the cheapest option',
    ],
    correctIndex: 0,
    rationale:
      'Escalation of commitment is throwing good resources after bad - continuing or increasing investment in a failing choice because of what has already been spent, rather than cutting losses.',
  },
  {
    id: 'lddec-018',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'What is "overconfidence" bias?',
    choices: [
      'Doubting every decision endlessly',
      'Overestimating how accurate one’s own knowledge or judgement is',
      'Always deferring to others',
      'Gathering too much data',
    ],
    correctIndex: 1,
    rationale:
      'Overconfidence bias is placing too much faith in the accuracy of one’s own judgement or predictions, which can lead to underestimating risks and skipping useful checks.',
  },
  {
    id: 'lddec-019',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'A core rule of effective brainstorming is to:',
    choices: [
      'Criticise each idea the instant it is offered',
      'Allow only the manager to speak',
      'Generate many ideas first and hold criticism until later',
      'Accept the first idea and stop',
    ],
    correctIndex: 2,
    rationale:
      'Brainstorming separates idea generation from judgement: members produce as many ideas as possible without early criticism, which encourages creativity, and evaluation comes afterward.',
  },
  {
    id: 'lddec-020',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'How is intuition best understood in leadership decisions?',
    choices: [
      'A guaranteed substitute for analysis',
      'A sign of weak leadership',
      'Something to be avoided completely',
      'Fast judgement drawn from experience - useful, but able to mislead if unchecked',
    ],
    correctIndex: 3,
    rationale:
      'Intuition is rapid judgement built from experience and pattern recognition. It is valuable, especially under time pressure, but can be biased, so experienced leaders combine it with analysis.',
  },
  {
    id: 'lddec-021',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'Reaching a "consensus" in group decision making means:',
    choices: [
      'Arriving at a decision that everyone can accept and support, even if it was not their first choice',
      'A decision imposed by force',
      'A decision no one agrees with',
      'A decision made by ignoring the group',
    ],
    correctIndex: 0,
    rationale:
      'Consensus is broad agreement the whole group can live with and support. It is not necessarily unanimity of first choice, but a solution everyone is willing to back.',
  },
  {
    id: 'lddec-022',
    topic: 'decisionMaking',
    type: 'mcq',
    prompt: 'Why is correctly defining the problem so important before choosing a solution?',
    choices: [
      'It makes the meeting longer',
      'It impresses senior managers',
      'Solving the wrong problem wastes effort and can make things worse',
      'It removes the need for alternatives',
    ],
    correctIndex: 2,
    rationale:
      'If the problem is misdefined, even a well-chosen solution addresses the wrong issue. Defining the real problem first ensures the effort that follows is aimed correctly.',
  },
  {
    id: 'lddec-023',
    topic: 'decisionMaking',
    type: 'tf',
    prompt: 'Bounded rationality says people make "good enough" decisions within the limits of their information and time.',
    correctAnswer: true,
    rationale:
      'True. Bounded rationality recognises real limits on information, time, and mental capacity, so people reason within those bounds rather than achieving perfect rationality.',
  },
  {
    id: 'lddec-024',
    topic: 'decisionMaking',
    type: 'tf',
    prompt: 'A programmed decision is a brand-new, one-off choice with no rules to guide it.',
    correctAnswer: false,
    rationale:
      'False. That describes a non-programmed decision. A programmed decision is routine and repetitive, handled by established rules or procedures.',
  },
  {
    id: 'lddec-025',
    topic: 'decisionMaking',
    type: 'tf',
    prompt: 'Groupthink can lead a team to a poor decision because members suppress disagreement to keep harmony.',
    correctAnswer: true,
    rationale:
      'True. Under groupthink, the drive for agreement discourages members from voicing doubts, so flawed options go unchallenged and poor decisions result.',
  },
  {
    id: 'lddec-026',
    topic: 'decisionMaking',
    type: 'tf',
    prompt: 'Confirmation bias is the tendency to actively seek out information that proves your existing belief wrong.',
    correctAnswer: false,
    rationale:
      'False. Confirmation bias is the opposite - favouring information that supports an existing belief while downplaying evidence against it.',
  },
  {
    id: 'lddec-027',
    topic: 'decisionMaking',
    type: 'tf',
    prompt: 'Involving the people affected in a decision tends to increase their commitment to carrying it out.',
    correctAnswer: true,
    rationale:
      'True. Participation builds understanding and ownership, so those involved are usually more committed to implementing the decision successfully.',
  },
  {
    id: 'lddec-028',
    topic: 'decisionMaking',
    type: 'tf',
    prompt: 'Under conditions of certainty, the probabilities of the outcomes are completely unknown.',
    correctAnswer: false,
    rationale:
      'False. Under certainty the outcome of each option is known in advance. It is under uncertainty that the probabilities are unknown.',
  },
  {
    id: 'lddec-029',
    topic: 'decisionMaking',
    type: 'tf',
    prompt: 'Satisficing means accepting the first option that is good enough rather than searching for the optimal one.',
    correctAnswer: true,
    rationale:
      'True. Satisficing stops the search once an alternative meets the minimum acceptable standard, instead of continuing to look for the very best option.',
  },
  {
    id: 'lddec-030',
    topic: 'decisionMaking',
    type: 'tf',
    prompt: 'Brainstorming works best when every idea is criticised immediately as it is suggested.',
    correctAnswer: false,
    rationale:
      'False. Brainstorming deliberately delays criticism so that many ideas flow freely; judging ideas as they appear discourages the creativity the technique is meant to unlock.',
  },
];
