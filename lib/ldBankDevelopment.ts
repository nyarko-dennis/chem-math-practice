import type { LeadershipQuestion } from './leadershipTypes.ts';

// Topic: Leadership Development.
// Standard curriculum: mentoring vs coaching, formal training and experiential
// learning, 360-degree feedback, self-development, succession planning, and
// Dweck's growth vs fixed mindset. No dedicated deck was provided; authored from
// general knowledge and disclosed in the build report.
export const developmentQuestions: LeadershipQuestion[] = [
  {
    id: 'lddev-001',
    topic: 'development',
    type: 'mcq',
    prompt: 'Leadership development is best described as:',
    choices: [
      'Planned activities that build a person’s leadership knowledge, skills, and capacity',
      'A one-time exam with no follow-up',
      'Something only born leaders can skip',
      'The paperwork for hiring staff',
    ],
    correctIndex: 0,
    rationale:
      'Leadership development refers to the deliberate activities - training, coaching, experience, feedback - used to grow a person’s ability to lead over time.',
  },
  {
    id: 'lddev-002',
    topic: 'development',
    type: 'mcq',
    prompt: 'Mentoring is best described as:',
    choices: [
      'A single lecture given once',
      'A more experienced person guiding a less experienced one, usually over a longer period',
      'A punishment for poor performance',
      'A way to avoid developing staff',
    ],
    correctIndex: 1,
    rationale:
      'Mentoring pairs a more experienced person (the mentor) with a less experienced one (the mentee), offering broad guidance on career and growth through an ongoing relationship.',
  },
  {
    id: 'lddev-003',
    topic: 'development',
    type: 'mcq',
    prompt: 'Coaching, as a development method, mainly focuses on:',
    choices: [
      'Doing the person’s job for them',
      'Replacing the need for any practice',
      'Improving specific skills or performance, often by helping the person find their own solutions',
      'Giving lifelong career advice only',
    ],
    correctIndex: 2,
    rationale:
      'Coaching is usually focused and shorter-term, aimed at building particular skills or performance. A good coach asks questions that help the person work out their own solutions rather than simply issuing answers.',
  },
  {
    id: 'lddev-004',
    topic: 'development',
    type: 'mcq',
    prompt: 'Which best captures a common difference between mentoring and coaching?',
    choices: [
      'Mentoring is a punishment; coaching is a reward',
      'They are exactly the same activity',
      'Coaching is always longer than mentoring',
      'Mentoring is broader and longer-term (career and growth); coaching is narrower and focused on specific skills or performance',
    ],
    correctIndex: 3,
    rationale:
      'Mentoring tends to be a broad, long-term relationship covering career and personal development, while coaching is typically narrower and shorter-term, targeting specific skills or performance goals.',
  },
  {
    id: 'lddev-005',
    topic: 'development',
    type: 'mcq',
    prompt: '"360-degree feedback" gathers input on a person from:',
    choices: [
      'People all around them - managers, peers, and subordinates',
      'Only the person’s manager',
      'Only the person themselves',
      'Only customers outside the organisation',
    ],
    correctIndex: 0,
    rationale:
      '360-degree feedback collects views from the full circle around a person - their boss, peers, and direct reports (and sometimes others) - giving a rounded picture of strengths and gaps.',
  },
  {
    id: 'lddev-006',
    topic: 'development',
    type: 'mcq',
    prompt: '"Self-development" as a leader mainly means:',
    choices: [
      'Waiting for others to arrange all your growth',
      'Taking personal responsibility for your own learning and improvement',
      'Refusing to learn anything new',
      'Copying a colleague exactly',
    ],
    correctIndex: 1,
    rationale:
      'Self-development is the leader owning their own growth - seeking feedback, reflecting, reading, and pursuing learning opportunities rather than waiting to be developed by others.',
  },
  {
    id: 'lddev-007',
    topic: 'development',
    type: 'mcq',
    prompt: '"Succession planning" is the process of:',
    choices: [
      'Removing all future leaders',
      'Deciding salaries for the year',
      'Identifying and preparing people to fill key leadership roles in the future',
      'Reducing the number of managers to zero',
    ],
    correctIndex: 2,
    rationale:
      'Succession planning identifies promising people and develops them in advance so the organisation has ready, capable leaders when key roles become vacant.',
  },
  {
    id: 'lddev-008',
    topic: 'development',
    type: 'mcq',
    prompt: 'A "growth mindset" (Dweck) is the belief that:',
    choices: [
      'Talent is fixed and cannot change',
      'Only some people can ever learn',
      'Effort makes no difference to ability',
      'Abilities can be developed through effort, learning, and persistence',
    ],
    correctIndex: 3,
    rationale:
      'A growth mindset holds that abilities are not fixed but can be built through effort, good strategies, and learning from setbacks - which encourages people to keep improving.',
  },
  {
    id: 'lddev-009',
    topic: 'development',
    type: 'mcq',
    prompt: 'A "fixed mindset" is the belief that:',
    choices: [
      'Your abilities are basically static and cannot really be improved',
      'Anyone can improve with practice',
      'Mistakes are useful for learning',
      'Effort is the key to growth',
    ],
    correctIndex: 0,
    rationale:
      'A fixed mindset assumes talent and intelligence are set traits that cannot change much, which can make people avoid challenges and give up more easily after failure.',
  },
  {
    id: 'lddev-010',
    topic: 'development',
    type: 'mcq',
    prompt: 'Why does a growth mindset help a developing leader?',
    choices: [
      'It lets them avoid all challenges',
      'It encourages them to learn from mistakes and keep trying rather than give up',
      'It guarantees they never fail',
      'It removes the need for feedback',
    ],
    correctIndex: 1,
    rationale:
      'Believing abilities can grow makes a leader more willing to take on challenges, treat setbacks as lessons, and persist - the very behaviours that build leadership skill over time.',
  },
  {
    id: 'lddev-011',
    topic: 'development',
    type: 'mcq',
    prompt: 'A "stretch assignment" develops a leader by:',
    choices: [
      'Giving them only tasks they have already mastered',
      'Removing all responsibility',
      'Giving them a challenging real task slightly beyond their current experience',
      'Sending them home',
    ],
    correctIndex: 2,
    rationale:
      'A stretch assignment is experiential learning: taking on a demanding, unfamiliar task builds new skills and confidence through real experience, with support to manage the risk.',
  },
  {
    id: 'lddev-012',
    topic: 'development',
    type: 'mcq',
    prompt: 'Formal training programmes (courses and workshops) contribute to leadership development by:',
    choices: [
      'Guaranteeing promotion',
      'Replacing all on-the-job experience',
      'Removing the need to practise',
      'Providing structured knowledge and skills in a planned setting',
    ],
    correctIndex: 3,
    rationale:
      'Formal training delivers structured knowledge and skills - for example, on communication or decision making - in a planned setting, complementing (not replacing) learning from real experience.',
  },
  {
    id: 'lddev-013',
    topic: 'development',
    type: 'mcq',
    prompt: 'What is the main role of feedback in a leader’s development?',
    choices: [
      'It reveals blind spots and shows where to improve',
      'It is only used to punish',
      'It has no effect on growth',
      'It replaces the need to act',
    ],
    correctIndex: 0,
    rationale:
      'Feedback shows a developing leader how their behaviour is seen and where the gaps are - information they often cannot get on their own, and which guides deliberate improvement.',
  },
  {
    id: 'lddev-014',
    topic: 'development',
    type: 'mcq',
    prompt: 'Which best describes "constructive" feedback?',
    choices: [
      'A vague, personal attack on the individual',
      'Specific comments on behaviour, aimed at helping the person improve',
      'Praise only, with nothing to work on',
      'Silence about any problems',
    ],
    correctIndex: 1,
    rationale:
      'Constructive feedback is specific and focused on behaviour and its effects, offered to help the person improve - not a general or personal attack, and not empty praise.',
  },
  {
    id: 'lddev-015',
    topic: 'development',
    type: 'mcq',
    prompt: 'A mentor’s proper role is to:',
    choices: [
      'Do the mentee’s work for them',
      'Take credit for the mentee’s success',
      'Guide, share experience, and open opportunities, while the mentee does the growing',
      'Keep the mentee dependent forever',
    ],
    correctIndex: 2,
    rationale:
      'A mentor guides, advises, shares hard-won experience, and helps open doors - but the mentee remains responsible for their own effort and growth. The aim is to build the mentee’s independence.',
  },
  {
    id: 'lddev-016',
    topic: 'development',
    type: 'mcq',
    prompt: 'A typical coaching stance is to:',
    choices: [
      'Give orders and forbid questions',
      'Solve every problem for the person',
      'Ignore the person’s own ideas',
      'Ask questions that help the person find their own solutions',
    ],
    correctIndex: 3,
    rationale:
      'Coaching often works by asking well-chosen questions that prompt the person to think through the problem and reach their own solution, which builds lasting capability.',
  },
  {
    id: 'lddev-017',
    topic: 'development',
    type: 'mcq',
    prompt: '"Job rotation" develops leaders by:',
    choices: [
      'Moving them through different roles to broaden their experience',
      'Keeping them in one narrow task forever',
      'Preventing them from learning new areas',
      'Reducing their responsibilities to nothing',
    ],
    correctIndex: 0,
    rationale:
      'Job rotation moves a developing leader through a range of roles or departments, broadening their understanding of the organisation and building a wider set of skills.',
  },
  {
    id: 'lddev-018',
    topic: 'development',
    type: 'mcq',
    prompt: '"Lifelong learning" for a leader means:',
    choices: [
      'Stopping learning once promoted',
      'Continuing to learn and grow throughout one’s whole career',
      'Learning only in school',
      'Avoiding any new knowledge',
    ],
    correctIndex: 1,
    rationale:
      'Lifelong learning is the ongoing pursuit of knowledge and skills across a career, reflecting that leadership can always be developed further as roles and conditions change.',
  },
  {
    id: 'lddev-019',
    topic: 'development',
    type: 'mcq',
    prompt: 'How can delegation double as a development tool?',
    choices: [
      'It keeps team members from ever learning',
      'It hides work from the team',
      'It gives team members challenging tasks that build their skills and confidence',
      'It removes all responsibility from everyone',
    ],
    correctIndex: 2,
    rationale:
      'Beyond freeing the leader’s time, delegation gives team members responsibility for meaningful tasks, letting them practise skills and grow - a practical form of on-the-job development.',
  },
  {
    id: 'lddev-020',
    topic: 'development',
    type: 'mcq',
    prompt: '"Self-reflection" contributes to development because it:',
    choices: [
      'Wastes time with no benefit',
      'Replaces the need for any action',
      'Only matters for beginners',
      'Helps a leader review their experiences and draw lessons from them',
    ],
    correctIndex: 3,
    rationale:
      'Self-reflection is deliberately reviewing what happened and why - turning raw experience into lessons that improve future decisions and behaviour.',
  },
  {
    id: 'lddev-021',
    topic: 'development',
    type: 'mcq',
    prompt: 'A key benefit of succession planning to an organisation is:',
    choices: [
      'Continuity - ready, capable leaders are available when key roles open up',
      'Guaranteed lower salaries',
      'Fewer products to sell',
      'An excuse to stop training anyone',
    ],
    correctIndex: 0,
    rationale:
      'By developing future leaders in advance, succession planning ensures smooth continuity: the organisation is not left scrambling when a key person departs.',
  },
  {
    id: 'lddev-022',
    topic: 'development',
    type: 'mcq',
    prompt: 'Which of the following is NOT a genuine leadership development method?',
    choices: [
      'Refusing all feedback and avoiding new challenges',
      'Mentoring',
      'Coaching',
      'Formal training and stretch assignments',
    ],
    correctIndex: 0,
    rationale:
      'Refusing feedback and avoiding challenge blocks growth. Mentoring, coaching, training, and stretch assignments are all recognised development methods.',
  },
  {
    id: 'lddev-023',
    topic: 'development',
    type: 'tf',
    prompt: 'Mentoring usually involves a longer-term relationship offering broad career and personal guidance.',
    correctAnswer: true,
    rationale:
      'True. Mentoring is typically an ongoing relationship in which an experienced mentor gives broad guidance on career and growth, beyond a single specific skill.',
  },
  {
    id: 'lddev-024',
    topic: 'development',
    type: 'tf',
    prompt: 'Coaching and mentoring are identical, with no meaningful difference.',
    correctAnswer: false,
    rationale:
      'False. They overlap but differ: coaching is usually narrower and focused on specific skills or performance, while mentoring is broader and longer-term.',
  },
  {
    id: 'lddev-025',
    topic: 'development',
    type: 'tf',
    prompt: 'A growth mindset is the belief that abilities can be developed through effort and learning.',
    correctAnswer: true,
    rationale:
      'True. A growth mindset holds that abilities are not fixed and can be built through effort, strategy, and learning from setbacks.',
  },
  {
    id: 'lddev-026',
    topic: 'development',
    type: 'tf',
    prompt: 'Succession planning means waiting until a leader has already left before thinking about a replacement.',
    correctAnswer: false,
    rationale:
      'False. Succession planning is proactive: it identifies and develops potential leaders in advance so replacements are ready before a role becomes vacant.',
  },
  {
    id: 'lddev-027',
    topic: 'development',
    type: 'tf',
    prompt: '360-degree feedback gathers input from people all around a person, including peers and subordinates.',
    correctAnswer: true,
    rationale:
      'True. 360-degree feedback collects perspectives from the full circle around a person - manager, peers, and direct reports - not just from one source.',
  },
  {
    id: 'lddev-028',
    topic: 'development',
    type: 'tf',
    prompt: 'Self-development means relying entirely on other people to plan and drive your growth.',
    correctAnswer: false,
    rationale:
      'False. Self-development means taking personal responsibility for your own learning and improvement, rather than depending entirely on others to arrange it.',
  },
  {
    id: 'lddev-029',
    topic: 'development',
    type: 'tf',
    prompt: 'Constructive feedback focuses on specific behaviour and how to improve, rather than on personal attacks.',
    correctAnswer: true,
    rationale:
      'True. Constructive feedback is specific, behaviour-focused, and aimed at improvement - which makes it useful for development, unlike vague or personal criticism.',
  },
  {
    id: 'lddev-030',
    topic: 'development',
    type: 'tf',
    prompt: 'Once someone becomes a leader, further learning and development are no longer necessary.',
    correctAnswer: false,
    rationale:
      'False. Leadership can always be developed further; effective leaders keep learning throughout their careers as roles, people, and conditions change.',
  },
];
