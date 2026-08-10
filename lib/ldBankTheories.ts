import type { LeadershipQuestion } from './leadershipTypes.ts';

// Topic: Leadership Theories.
// Standard first-year leadership theory (trait/Great Man, behavioural theories,
// Fiedler's contingency model, Hersey-Blanchard situational leadership, House's
// path-goal, Bass's transformational vs transactional, Greenleaf's servant
// leadership). No dedicated deck was provided; authored from general knowledge
// and disclosed in the build report.
export const theoriesQuestions: LeadershipQuestion[] = [
  {
    id: 'ldthe-001',
    topic: 'theories',
    type: 'mcq',
    prompt: 'What is the central claim of trait theory of leadership?',
    choices: [
      'Effective leaders can only ever come from wealthy families',
      'Effective leaders share certain personal qualities or characteristics',
      'Leadership depends entirely on the size of the budget',
      'Leadership behaviour cannot be studied at all',
    ],
    correctIndex: 1,
    rationale:
      'Trait theory holds that effective leaders share particular personal qualities (traits) - such as confidence, drive, or intelligence - that set them apart from non-leaders.',
  },
  {
    id: 'ldthe-002',
    topic: 'theories',
    type: 'mcq',
    prompt: 'The "Great Man" theory of leadership is best summarised as the idea that:',
    choices: [
      'Anyone can easily be trained into a great leader in a week',
      'Leadership is only about managing money',
      'Great leaders are born with natural leadership qualities rather than made',
      'Leadership belongs only to elected officials',
    ],
    correctIndex: 2,
    rationale:
      'The Great Man theory (an early trait view) claimed that great leaders are born, not made - that they arrive with innate qualities. Modern research treats this as too simple, since many leadership skills can be developed.',
  },
  {
    id: 'ldthe-003',
    topic: 'theories',
    type: 'mcq',
    prompt: 'Behavioural theories of leadership shifted the main question away from "who leaders are" toward:',
    choices: [
      'How much leaders are paid',
      'Where leaders were born',
      'Which family a leader comes from',
      'What leaders actually do - the behaviours they show',
    ],
    correctIndex: 3,
    rationale:
      'Behavioural theories focus on leaders’ actions - the behaviours they display toward followers - rather than inborn traits. A key implication is that such behaviours can be learned.',
  },
  {
    id: 'ldthe-004',
    topic: 'theories',
    type: 'mcq',
    prompt: 'The Ohio State leadership studies identified two main dimensions of leader behaviour. What were they?',
    choices: [
      'Initiating structure (task focus) and consideration (people focus)',
      'Wealth and fame',
      'Height and age',
      'Punishment and reward only',
    ],
    correctIndex: 0,
    rationale:
      'The Ohio State studies described two independent behaviour dimensions: initiating structure (organising the work and defining roles) and consideration (showing warmth, trust, and concern for people).',
  },
  {
    id: 'ldthe-005',
    topic: 'theories',
    type: 'mcq',
    prompt: 'In the Ohio State studies, "initiating structure" describes a leader who:',
    choices: [
      'Ignores the task entirely',
      'Focuses only on being liked',
      'Organises the work - defining roles, tasks, goals, and schedules',
      'Refuses to make any decisions',
    ],
    correctIndex: 2,
    rationale:
      'Initiating structure is task-oriented behaviour: the leader clarifies roles, sets goals, plans the work, and defines how it will be done.',
  },
  {
    id: 'ldthe-006',
    topic: 'theories',
    type: 'mcq',
    prompt: 'In the Ohio State studies, "consideration" describes a leader who:',
    choices: [
      'Only cares about hitting production targets',
      'Shows warmth, trust, respect, and concern for followers’ wellbeing',
      'Avoids all contact with the team',
      'Punishes mistakes harshly',
    ],
    correctIndex: 1,
    rationale:
      'Consideration is relationship-oriented behaviour: the leader builds trust and rapport and shows genuine concern for followers’ feelings and needs.',
  },
  {
    id: 'ldthe-007',
    topic: 'theories',
    type: 'mcq',
    prompt: 'The Blake and Mouton Managerial (Leadership) Grid plots leadership style along which two concerns?',
    choices: [
      'Concern for profit and concern for tax',
      'Concern for speed and concern for cost',
      'Concern for advertising and concern for sales',
      'Concern for people and concern for production',
    ],
    correctIndex: 3,
    rationale:
      'The Managerial Grid maps a leader’s "concern for people" against their "concern for production (results)", producing styles at different combinations of the two.',
  },
  {
    id: 'ldthe-008',
    topic: 'theories',
    type: 'mcq',
    prompt: 'On the Managerial Grid, the "team management" (9,9) position represents a leader with:',
    choices: [
      'High concern for both people and production',
      'Low concern for both people and production',
      'High concern for production but none for people',
      'High concern for people but none for production',
    ],
    correctIndex: 0,
    rationale:
      'The 9,9 "team management" style combines high concern for people with high concern for production, and Blake and Mouton presented it as the most effective position on the grid.',
  },
  {
    id: 'ldthe-009',
    topic: 'theories',
    type: 'mcq',
    prompt: 'What is the central idea shared by contingency and situational leadership theories?',
    choices: [
      'One fixed style is always best in every case',
      'Leadership traits are all that matter',
      'There is no single best style; the most effective approach depends on the situation',
      'Leaders should never change their behaviour',
    ],
    correctIndex: 2,
    rationale:
      'Contingency and situational theories argue that effective leadership is "it depends" - the best style varies with the circumstances, the followers, and the task.',
  },
  {
    id: 'ldthe-010',
    topic: 'theories',
    type: 'mcq',
    prompt: 'Fiedler’s contingency model says leadership effectiveness depends on:',
    choices: [
      'The leader’s salary alone',
      'The match between the leader’s style and how favourable the situation is',
      'The leader’s height and appearance',
      'Removing all rules from the workplace',
    ],
    correctIndex: 1,
    rationale:
      'Fiedler argued that effectiveness comes from the fit (match) between a leader’s natural style - task- or relationship-motivated - and the favourableness of the situation (leader-member relations, task structure, and position power).',
  },
  {
    id: 'ldthe-011',
    topic: 'theories',
    type: 'mcq',
    prompt: 'Fiedler’s "Least Preferred Co-worker" (LPC) scale is used to gauge whether a leader is mainly:',
    choices: [
      'Wealthy or poor',
      'Young or old',
      'Formally trained or self-taught',
      'Task-motivated or relationship-motivated',
    ],
    correctIndex: 3,
    rationale:
      'The LPC scale asks a leader to rate the co-worker they least like to work with. A harsh rating suggests a task-motivated style; a more generous rating suggests a relationship-motivated style.',
  },
  {
    id: 'ldthe-012',
    topic: 'theories',
    type: 'mcq',
    prompt: 'Hersey and Blanchard’s situational leadership model says a leader should choose a style based mainly on:',
    choices: [
      'The readiness (competence and willingness) of the followers',
      'The colour of the office walls',
      'The leader’s own mood that morning',
      'The time of year',
    ],
    correctIndex: 0,
    rationale:
      'In situational leadership, the leader adjusts how much direction and support to give according to followers’ readiness (also called maturity) - their competence and willingness for the task.',
  },
  {
    id: 'ldthe-013',
    topic: 'theories',
    type: 'mcq',
    prompt: 'Under Hersey-Blanchard situational leadership, which style best fits a team that is highly skilled AND highly willing?',
    choices: [
      'Telling - give detailed step-by-step orders',
      'Selling - persuade and closely explain everything',
      'Delegating - hand over responsibility and step back',
      'Controlling - watch every move constantly',
    ],
    correctIndex: 2,
    rationale:
      'When followers are both able and willing (high readiness), a delegating style works best: the leader entrusts them with responsibility and provides little direction or hand-holding.',
  },
  {
    id: 'ldthe-014',
    topic: 'theories',
    type: 'mcq',
    prompt: 'House’s path-goal theory describes the leader’s main job as:',
    choices: [
      'Blocking followers from reaching goals',
      'Clearing the path and providing support so followers can reach their goals',
      'Setting goals no one can achieve',
      'Ignoring goals altogether',
    ],
    correctIndex: 1,
    rationale:
      'Path-goal theory says the leader’s role is to help followers reach goals by clarifying the path, removing obstacles, and offering the support or direction that the situation and the followers need.',
  },
  {
    id: 'ldthe-015',
    topic: 'theories',
    type: 'mcq',
    prompt: 'Transactional leadership motivates followers mainly through:',
    choices: [
      'Exchanges - rewards for good performance and correction for poor performance',
      'Inspiring a bold shared vision that changes people’s values',
      'Removing all supervision',
      'Random, unpredictable decisions',
    ],
    correctIndex: 0,
    rationale:
      'Transactional leadership works through exchange: the leader clarifies expectations and gives rewards for meeting them (and corrections for falling short), operating within the existing system.',
  },
  {
    id: 'ldthe-016',
    topic: 'theories',
    type: 'mcq',
    prompt: 'Transformational leadership is best described as leadership that:',
    choices: [
      'Focuses only on short-term bonuses',
      'Avoids any contact with followers',
      'Inspires and elevates followers to look beyond self-interest toward a shared vision',
      'Relies solely on strict rules and punishments',
    ],
    correctIndex: 2,
    rationale:
      'Transformational leaders raise followers’ motivation and commitment by inspiring them with a vision, stimulating their thinking, and attending to their growth - moving them beyond narrow self-interest.',
  },
  {
    id: 'ldthe-017',
    topic: 'theories',
    type: 'mcq',
    prompt: 'The "four I’s" (idealised influence, inspirational motivation, intellectual stimulation, individualised consideration) describe which kind of leadership?',
    choices: [
      'Transactional leadership',
      'Laissez-faire leadership',
      'Autocratic leadership',
      'Transformational leadership',
    ],
    correctIndex: 3,
    rationale:
      'The four I’s are the components of transformational leadership: being a role model, inspiring with vision, encouraging fresh thinking, and coaching each follower individually.',
  },
  {
    id: 'ldthe-018',
    topic: 'theories',
    type: 'mcq',
    prompt: 'Within transformational leadership, "idealised influence" means the leader:',
    choices: [
      'Acts as a role model whom followers admire and want to emulate',
      'Threatens followers with dismissal',
      'Keeps all information secret',
      'Refuses to set any example',
    ],
    correctIndex: 0,
    rationale:
      'Idealised influence means the leader behaves in admirable, principled ways, becoming a role model that followers respect, trust, and want to imitate.',
  },
  {
    id: 'ldthe-019',
    topic: 'theories',
    type: 'mcq',
    prompt: 'Within transformational leadership, "intellectual stimulation" means the leader:',
    choices: [
      'Discourages any new ideas',
      'Encourages followers to question assumptions and think creatively about problems',
      'Solves every problem alone in secret',
      'Bans followers from asking questions',
    ],
    correctIndex: 1,
    rationale:
      'Intellectual stimulation is the transformational behaviour of challenging followers to rethink old assumptions, question the status quo, and find creative solutions.',
  },
  {
    id: 'ldthe-020',
    topic: 'theories',
    type: 'mcq',
    prompt: 'Within transformational leadership, "individualised consideration" means the leader:',
    choices: [
      'Treats everyone identically and ignores personal needs',
      'Only meets the team as a large crowd',
      'Attends to each follower’s needs, acting as a coach or mentor',
      'Avoids giving any feedback',
    ],
    correctIndex: 2,
    rationale:
      'Individualised consideration means paying attention to each follower as an individual - coaching, mentoring, and supporting their particular development needs.',
  },
  {
    id: 'ldthe-021',
    topic: 'theories',
    type: 'mcq',
    prompt: 'Servant leadership, as described by Greenleaf, puts which priority first?',
    choices: [
      'Serving, supporting, and developing followers before the leader’s own status',
      'Maximising the leader’s personal power',
      'Cutting all support to save money',
      'Keeping followers dependent and uninformed',
    ],
    correctIndex: 0,
    rationale:
      'Servant leadership reverses the usual focus: the leader’s first concern is to serve and grow their followers, trusting that a well-served, developed team will in turn perform well.',
  },
  {
    id: 'ldthe-022',
    topic: 'theories',
    type: 'mcq',
    prompt: 'A key practical difference between behavioural theories and trait theory is that behavioural theories imply leadership:',
    choices: [
      'Is fixed at birth and cannot change',
      'Can be developed by learning effective behaviours',
      'Depends only on physical appearance',
      'Is impossible to describe',
    ],
    correctIndex: 1,
    rationale:
      'Because behavioural theories focus on what leaders do, they imply those behaviours can be taught and practised - a more hopeful, trainable view than trait theory’s emphasis on inborn qualities.',
  },
  {
    id: 'ldthe-023',
    topic: 'theories',
    type: 'tf',
    prompt: 'Behavioural theories assume that leadership behaviours can be learned, whereas trait theory stresses inborn qualities.',
    correctAnswer: true,
    rationale:
      'True. Behavioural theories study actions that can be developed through learning and practice, in contrast to trait theory’s emphasis on natural, inborn characteristics.',
  },
  {
    id: 'ldthe-024',
    topic: 'theories',
    type: 'tf',
    prompt: 'The Great Man theory claims leadership ability is spread evenly across everyone and is easily learned by anyone.',
    correctAnswer: false,
    rationale:
      'False. The Great Man theory claimed the opposite - that great leaders are born with rare natural qualities, not that leadership is evenly distributed and easily learned.',
  },
  {
    id: 'ldthe-025',
    topic: 'theories',
    type: 'tf',
    prompt: 'In Fiedler’s contingency model, the most effective leadership style depends on how favourable the situation is.',
    correctAnswer: true,
    rationale:
      'True. Fiedler held that effectiveness comes from matching the leader’s style to situational favourableness (leader-member relations, task structure, and position power).',
  },
  {
    id: 'ldthe-026',
    topic: 'theories',
    type: 'tf',
    prompt: 'Transformational leadership works only by giving cash rewards in exchange for hitting targets.',
    correctAnswer: false,
    rationale:
      'False. That describes transactional leadership. Transformational leadership motivates through vision, role-modelling, intellectual stimulation, and individual coaching - not merely reward-for-performance exchanges.',
  },
  {
    id: 'ldthe-027',
    topic: 'theories',
    type: 'tf',
    prompt: 'In Hersey-Blanchard situational leadership, a leader should give more direction to followers who are new and less ready.',
    correctAnswer: true,
    rationale:
      'True. When followers have low readiness (less competence or confidence), the model recommends a more directive "telling" style; direction is reduced as readiness grows.',
  },
  {
    id: 'ldthe-028',
    topic: 'theories',
    type: 'tf',
    prompt: 'In the Ohio State studies, "consideration" refers strictly to organising tasks and schedules.',
    correctAnswer: false,
    rationale:
      'False. Consideration refers to warmth, trust, and concern for people. Organising tasks and schedules is the other dimension, "initiating structure".',
  },
  {
    id: 'ldthe-029',
    topic: 'theories',
    type: 'tf',
    prompt: 'Servant leadership places serving and developing followers ahead of the leader’s own status.',
    correctAnswer: true,
    rationale:
      'True. Servant leadership begins with the desire to serve; the leader’s priority is meeting followers’ needs and helping them grow, rather than pursuing personal power or prestige.',
  },
  {
    id: 'ldthe-030',
    topic: 'theories',
    type: 'tf',
    prompt: 'Contingency theories argue that there is one single best leadership style for every situation.',
    correctAnswer: false,
    rationale:
      'False. Contingency theories argue the opposite - that no single style is best for all situations; the most effective style depends on the circumstances.',
  },
];
