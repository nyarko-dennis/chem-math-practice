import type { LeadershipQuestion } from './leadershipTypes.ts';

// Topic: Leadership Styles.
// Grounded where noted in preparing-african-leaders.txt (primus inter pares vs
// the "coconut" Western style, community-minded leadership, the Kitenge
// example, and the call to balance the two). The classic Lewin styles
// (autocratic/democratic/laissez-faire) and the task- vs people-oriented
// contrast are standard curriculum, authored from general knowledge and
// disclosed in the build report.
export const stylesQuestions: LeadershipQuestion[] = [
  {
    id: 'ldsty-001',
    topic: 'styles',
    type: 'mcq',
    prompt: 'What best describes an autocratic (authoritarian) leadership style?',
    choices: [
      'The leader makes decisions alone, with little input from the team',
      'The team decides everything and the leader never participates',
      'The leader and team always vote on every tiny detail',
      'Decisions are left entirely to chance',
    ],
    correctIndex: 0,
    rationale:
      'In an autocratic style, the leader keeps decision-making authority to themselves and gives orders with little consultation. It can be fast but may lower morale if overused.',
  },
  {
    id: 'ldsty-002',
    topic: 'styles',
    type: 'mcq',
    prompt: 'What best describes a democratic (participative) leadership style?',
    choices: [
      'The leader hides all information from the team',
      'The leader involves team members in making decisions before deciding',
      'The leader refuses to make any decision ever',
      'The leader punishes anyone who speaks',
    ],
    correctIndex: 1,
    rationale:
      'A democratic style invites input and shared discussion before decisions are made. It tends to build commitment and ownership, though it can be slower than deciding alone.',
  },
  {
    id: 'ldsty-003',
    topic: 'styles',
    type: 'mcq',
    prompt: 'What best describes a laissez-faire ("hands-off") leadership style?',
    choices: [
      'The leader micromanages every action',
      'The leader threatens the team constantly',
      'The leader gives the team freedom to make its own decisions with minimal interference',
      'The leader forbids all independent work',
    ],
    correctIndex: 2,
    rationale:
      'Laissez-faire (a French phrase meaning "let them do") leadership is hands-off: the leader sets few controls and leaves decisions largely to the team, offering help only when asked.',
  },
  {
    id: 'ldsty-004',
    topic: 'styles',
    type: 'mcq',
    prompt: 'Which style is usually most appropriate during a genuine emergency that demands a fast, clear decision?',
    choices: [
      'Laissez-faire, because no decision is needed',
      'A long democratic vote among everyone',
      'No leadership at all',
      'Autocratic, because one person can decide quickly and give clear orders',
    ],
    correctIndex: 3,
    rationale:
      'In a true emergency, an autocratic style can be best: a single clear decision made quickly avoids the delay of wide consultation when there is no time to lose.',
  },
  {
    id: 'ldsty-005',
    topic: 'styles',
    type: 'mcq',
    prompt: 'For a capable, experienced team working on a complex problem, which style tends to build the most commitment?',
    choices: [
      'Democratic, because involving the team increases ownership of the decision',
      'Purely autocratic, because orders are quickest',
      'Constant punishment',
      'Ignoring the team entirely',
    ],
    correctIndex: 0,
    rationale:
      'When the team has the skill and knowledge to contribute, a democratic style draws on their ideas and gives them a stake in the outcome, which raises commitment.',
  },
  {
    id: 'ldsty-006',
    topic: 'styles',
    type: 'mcq',
    prompt: 'What is the main risk of a laissez-faire style with an inexperienced team?',
    choices: [
      'The team becomes over-supervised',
      'Decisions are made far too quickly',
      'The team can lack direction, leading to confusion and poor results',
      'Morale is always guaranteed to rise',
    ],
    correctIndex: 2,
    rationale:
      'Hands-off leadership assumes the team can steer itself. With inexperienced members who need guidance, it can leave them without direction, causing confusion and weak results.',
  },
  {
    id: 'ldsty-007',
    topic: 'styles',
    type: 'mcq',
    prompt: 'A laissez-faire style tends to work best with:',
    choices: [
      'Brand-new trainees on their first day',
      'A team that needs constant instruction',
      'Highly skilled, self-motivated experts who work well on their own',
      'People who dislike their work',
    ],
    correctIndex: 2,
    rationale:
      'Laissez-faire leadership suits highly competent, self-driven professionals who have the expertise and motivation to manage their own work with little supervision.',
  },
  {
    id: 'ldsty-008',
    topic: 'styles',
    type: 'mcq',
    prompt: 'A task-oriented leadership style focuses mainly on:',
    choices: [
      'Only the leader’s personal comfort',
      'Avoiding all deadlines',
      'Socialising and nothing else',
      'Getting the job done - structure, roles, schedules, and results',
    ],
    correctIndex: 3,
    rationale:
      'A task-oriented style concentrates on the work itself: defining roles, planning, setting deadlines, and driving toward results.',
  },
  {
    id: 'ldsty-009',
    topic: 'styles',
    type: 'mcq',
    prompt: 'A people-oriented (relationship-oriented) leadership style focuses mainly on:',
    choices: [
      'Supporting team members’ wellbeing, motivation, and relationships',
      'Ignoring how the team feels',
      'Only the paperwork',
      'Cutting the team out of all decisions',
    ],
    correctIndex: 0,
    rationale:
      'A people-oriented style prioritises the team’s morale, relationships, and development, on the view that supported, motivated people produce good work.',
  },
  {
    id: 'ldsty-010',
    topic: 'styles',
    type: 'mcq',
    prompt: 'In the "Preparing African Leaders" discussion, the phrase "primus inter pares" describes a leader who is:',
    choices: [
      'A distant ruler who never consults anyone',
      '"First among equals" - rooted in local community norms and part of the group',
      'Only interested in personal wealth',
      'Someone with no followers at all',
    ],
    correctIndex: 1,
    rationale:
      '"Primus inter pares" means "first among equals". In the essay it stands for a leadership style rooted in local African norms, where the leader remains part of the community rather than standing above it.',
  },
  {
    id: 'ldsty-011',
    topic: 'styles',
    type: 'mcq',
    prompt: 'In that same discussion, the "coconut" style is used as a label for:',
    choices: [
      'A style based on farming coconuts',
      'A style with no name or meaning',
      'Western-style leadership, contrasted with the local "first among equals" approach',
      'A style used only by children',
    ],
    correctIndex: 2,
    rationale:
      'The essay contrasts the locally rooted "primus inter pares" approach with a "coconut" style, which it uses as shorthand for Western-style leadership.',
  },
  {
    id: 'ldsty-012',
    topic: 'styles',
    type: 'mcq',
    prompt: 'What does the "Preparing African Leaders" note conclude a good leader should do about the two styles?',
    choices: [
      'Always use the coconut style only',
      'Always use the primus-inter-pares style only',
      'Abandon leadership altogether',
      'Create a balance between the two in decision-making, authority, and communication',
    ],
    correctIndex: 3,
    rationale:
      'The note concludes that neither style is simply better; a leader should balance the primus-inter-pares and "coconut" styles in how they make decisions, express authority, and communicate.',
  },
  {
    id: 'ldsty-013',
    topic: 'styles',
    type: 'mcq',
    prompt: 'According to the note, a chief’s first priority in the communities studied was to:',
    choices: [
      'Protect social harmony and encourage interaction among communities',
      'Collect as much personal wealth as possible',
      'Avoid meeting any community members',
      'Keep all decisions permanently secret',
    ],
    correctIndex: 0,
    rationale:
      'The note reports that a chief’s first priority was to protect "social energy" (community harmony) and to encourage interaction among different communities, reflecting a community-minded view of leadership.',
  },
  {
    id: 'ldsty-014',
    topic: 'styles',
    type: 'mcq',
    prompt: 'In the note’s example, the businessman Kitenge succeeded partly because he:',
    choices: [
      'Refused to hire anyone at all',
      'Blended African values with his Western training, hiring through family and friend networks',
      'Used only foreign experts and ignored local workers',
      'Borrowed heavily from wealthy relatives',
    ],
    correctIndex: 1,
    rationale:
      'The example describes Kitenge, trained in Paris, mixing African values with Western methods - hiring through family and friend networks and choosing local workers - and his business grew as a result.',
  },
  {
    id: 'ldsty-015',
    topic: 'styles',
    type: 'mcq',
    prompt: 'Which is a common drawback of relying only on an autocratic style day to day?',
    choices: [
      'It always speeds up creativity',
      'It guarantees strong relationships',
      'It can lower morale and discourage team members from offering ideas',
      'It removes the need for any decisions',
    ],
    correctIndex: 2,
    rationale:
      'Used constantly, an autocratic style can leave people feeling unheard, lowering morale and discouraging the input and initiative that improve decisions.',
  },
  {
    id: 'ldsty-016',
    topic: 'styles',
    type: 'mcq',
    prompt: 'Which is a common drawback of a democratic style when a quick decision is essential?',
    choices: [
      'It makes decisions instantly',
      'It removes all team involvement',
      'It ignores team opinions',
      'Gathering input takes time, which can slow the decision down',
    ],
    correctIndex: 3,
    rationale:
      'Consulting the team takes time. When speed is critical, the deliberation that makes a democratic style valuable can become a disadvantage.',
  },
  {
    id: 'ldsty-017',
    topic: 'styles',
    type: 'mcq',
    prompt: 'The idea that a skilled leader adjusts their style to fit the situation and the followers is best described as:',
    choices: [
      'Adapting the style flexibly rather than using one fixed style',
      'Refusing ever to change approach',
      'Using the loudest voice at all times',
      'Copying another leader exactly',
    ],
    correctIndex: 0,
    rationale:
      'Effective leaders treat style as flexible, shifting between more directive and more participative approaches depending on the task, the urgency, and the readiness of the people involved.',
  },
  {
    id: 'ldsty-018',
    topic: 'styles',
    type: 'mcq',
    prompt: 'A brand-new team with little experience on a task will usually benefit most from a leader who is, at first:',
    choices: [
      'Completely hands-off',
      'More directive, giving clear guidance and structure',
      'Absent from the workplace',
      'Silent and unavailable',
    ],
    correctIndex: 1,
    rationale:
      'Inexperienced teams generally need clearer direction and structure early on; a more directive approach reduces confusion until they build competence and confidence.',
  },
  {
    id: 'ldsty-019',
    topic: 'styles',
    type: 'mcq',
    prompt: 'Why does involving people democratically tend to increase their "ownership" of a decision?',
    choices: [
      'Because it hides the decision from them',
      'Because it forces them to obey',
      'Because having a say makes people feel the decision is partly theirs, so they support it more',
      'Because it removes their responsibility',
    ],
    correctIndex: 2,
    rationale:
      'When people contribute to a decision, they see their own input reflected in it and feel responsible for its success, which raises their commitment to carrying it out.',
  },
  {
    id: 'ldsty-020',
    topic: 'styles',
    type: 'mcq',
    prompt: 'An autocratic style is most defensible when:',
    choices: [
      'The team is highly expert and wants autonomy',
      'There is unlimited time to consult',
      'Everyone already agrees on the answer',
      'The team lacks the expertise and a quick, clear decision is genuinely required',
    ],
    correctIndex: 3,
    rationale:
      'Autocratic leadership fits situations where followers lack the knowledge to decide well and a prompt, unambiguous decision is needed - for instance a safety emergency.',
  },
  {
    id: 'ldsty-021',
    topic: 'styles',
    type: 'mcq',
    prompt: 'Which statement about the link between style and power is most accurate?',
    choices: [
      'An autocratic style leans on positional authority, while a democratic style relies more on shared influence',
      'Democratic leaders never use any influence',
      'Autocratic leaders have no authority',
      'Style and power are completely unrelated',
    ],
    correctIndex: 0,
    rationale:
      'An autocratic style typically relies on the leader’s formal (positional) authority to direct others, whereas a democratic style draws more on shared discussion and influence than on giving orders.',
  },
  {
    id: 'ldsty-022',
    topic: 'styles',
    type: 'mcq',
    prompt: 'The "Preparing African Leaders" note suggests balancing the two styles specifically in which areas?',
    choices: [
      'Only in choosing office furniture',
      'Decision-making, how authority is expressed, and how one communicates with people',
      'Only in setting salaries',
      'Only in choosing company colours',
    ],
    correctIndex: 1,
    rationale:
      'The note names three areas for balance between the primus-inter-pares and "coconut" styles: making decisions, expressing authority, and communicating with people.',
  },
  {
    id: 'ldsty-023',
    topic: 'styles',
    type: 'tf',
    prompt: 'A laissez-faire (hands-off) style can work well with a team of skilled, self-motivated experts.',
    correctAnswer: true,
    rationale:
      'True. When followers are highly competent and self-driven, a hands-off style gives them the autonomy to do their best work with little supervision.',
  },
  {
    id: 'ldsty-024',
    topic: 'styles',
    type: 'tf',
    prompt: 'An autocratic style always produces the highest morale and engagement in a team.',
    correctAnswer: false,
    rationale:
      'False. Used constantly, an autocratic style often lowers morale and discourages input; it is best reserved for situations that truly need a fast, single decision.',
  },
  {
    id: 'ldsty-025',
    topic: 'styles',
    type: 'tf',
    prompt: '"Primus inter pares" means "first among equals" - a leader who stays rooted in local community norms.',
    correctAnswer: true,
    rationale:
      'True. In the "Preparing African Leaders" note, primus inter pares stands for a locally rooted style in which the leader is first among equals and remains part of the community.',
  },
  {
    id: 'ldsty-026',
    topic: 'styles',
    type: 'tf',
    prompt: 'A democratic leadership style means the leader ignores the team and decides everything alone.',
    correctAnswer: false,
    rationale:
      'False. That describes an autocratic style. A democratic style deliberately involves the team in decisions before the leader settles on a course of action.',
  },
  {
    id: 'ldsty-027',
    topic: 'styles',
    type: 'tf',
    prompt: 'The "Preparing African Leaders" note concludes that a leader should balance the primus-inter-pares and "coconut" styles rather than use only one.',
    correctAnswer: true,
    rationale:
      'True. The note argues neither style is simply superior and that a leader should create a balance between them in decision-making, authority, and communication.',
  },
  {
    id: 'ldsty-028',
    topic: 'styles',
    type: 'tf',
    prompt: 'Task-oriented and people-oriented leadership are exactly the same thing.',
    correctAnswer: false,
    rationale:
      'False. Task-oriented leadership focuses on the work (structure, deadlines, results), while people-oriented leadership focuses on relationships and team wellbeing - different emphases.',
  },
  {
    id: 'ldsty-029',
    topic: 'styles',
    type: 'tf',
    prompt: 'An autocratic style can be useful in a genuine emergency that needs a fast, clear decision.',
    correctAnswer: true,
    rationale:
      'True. When time is short and clarity is vital, a single decisive leader can act faster than a group discussion, which is one situation where an autocratic style fits.',
  },
  {
    id: 'ldsty-030',
    topic: 'styles',
    type: 'tf',
    prompt: 'Laissez-faire leadership means giving very close, constant supervision.',
    correctAnswer: false,
    rationale:
      'False. Laissez-faire is a hands-off style with minimal supervision; close, constant oversight is the opposite of it.',
  },
];
