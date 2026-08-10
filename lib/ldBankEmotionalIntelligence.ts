import type { LeadershipQuestion } from './leadershipTypes.ts';

// Topic: Emotional Intelligence (EI) for leaders.
// Standard curriculum: Goleman's five components (self-awareness,
// self-regulation, motivation, empathy, social skills) and EI vs IQ. No
// dedicated deck was provided; authored from general knowledge and disclosed in
// the build report.
export const emotionalIntelligenceQuestions: LeadershipQuestion[] = [
  {
    id: 'ldemo-001',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: 'Emotional intelligence (EI) is best defined as the ability to:',
    choices: [
      'Recognise, understand, and manage your own emotions and those of others',
      'Solve complex mathematics quickly',
      'Lift heavy physical loads',
      'Memorise long lists of facts',
    ],
    correctIndex: 0,
    rationale:
      'Emotional intelligence is the capacity to be aware of, understand, and manage emotions - both your own and other people’s - and to use that awareness to guide behaviour and relationships.',
  },
  {
    id: 'ldemo-002',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: 'Which set correctly lists Goleman’s five components of emotional intelligence?',
    choices: [
      'Height, wealth, age, speed, and strength',
      'Self-awareness, self-regulation, motivation, empathy, and social skills',
      'Reading, writing, spelling, counting, and drawing',
      'Planning, budgeting, hiring, firing, and auditing',
    ],
    correctIndex: 1,
    rationale:
      'Goleman’s model has five components: self-awareness, self-regulation (self-management), motivation, empathy, and social skills.',
  },
  {
    id: 'ldemo-003',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: '"Self-awareness" in emotional intelligence means:',
    choices: [
      'Controlling other people’s feelings',
      'Ignoring your own feelings',
      'Recognising your own emotions and how they affect your thinking and behaviour',
      'Always hiding what you feel',
    ],
    correctIndex: 2,
    rationale:
      'Self-awareness is the ability to notice your own emotions as they arise and understand how they influence your judgement and actions - the foundation on which the other components build.',
  },
  {
    id: 'ldemo-004',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: '"Self-regulation" (self-management) in emotional intelligence means:',
    choices: [
      'Acting on every impulse instantly',
      'Blaming others for your mood',
      'Never feeling any emotion',
      'Managing and controlling your emotions and impulses rather than being ruled by them',
    ],
    correctIndex: 3,
    rationale:
      'Self-regulation is the ability to manage disruptive emotions and impulses - staying calm, thinking before acting, and adapting - instead of reacting automatically to whatever you feel.',
  },
  {
    id: 'ldemo-005',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: 'In Goleman’s model, "motivation" refers to:',
    choices: [
      'An inner drive to achieve for its own sake, beyond money or status',
      'Forcing others to work through fear',
      'Avoiding all goals',
      'Waiting to be told what to do',
    ],
    correctIndex: 0,
    rationale:
      'In EI, motivation is an internal drive - a passion to pursue goals with energy and persistence for personal satisfaction and achievement, rather than only for external rewards.',
  },
  {
    id: 'ldemo-006',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: '"Empathy" in emotional intelligence means:',
    choices: [
      'Feeling nothing for others',
      'Sensing and understanding other people’s emotions and perspectives',
      'Always agreeing with everyone',
      'Telling others to hide their feelings',
    ],
    correctIndex: 1,
    rationale:
      'Empathy is the ability to sense and understand what others are feeling and to see things from their point of view - which helps a leader respond thoughtfully to people’s needs.',
  },
  {
    id: 'ldemo-007',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: '"Social skills" in Goleman’s model refer to:',
    choices: [
      'Avoiding people whenever possible',
      'Working strictly alone',
      'Managing relationships well - building rapport, communicating, and handling conflict',
      'Speaking only to give orders',
    ],
    correctIndex: 2,
    rationale:
      'Social skills are the abilities used to manage relationships and build networks - communicating clearly, building rapport, influencing, cooperating, and resolving conflict.',
  },
  {
    id: 'ldemo-008',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: 'How does emotional intelligence (EI) differ from IQ?',
    choices: [
      'They are identical measures',
      'EI measures only reading speed',
      'IQ measures emotions and EI measures logic',
      'IQ is about intellectual/reasoning ability, while EI is about handling emotions',
    ],
    correctIndex: 3,
    rationale:
      'IQ concerns cognitive abilities such as reasoning and problem solving, whereas EI concerns awareness and management of emotions - in oneself and others. They are different capacities.',
  },
  {
    id: 'ldemo-009',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: 'Why is emotional intelligence especially valuable for leaders?',
    choices: [
      'It helps them manage themselves and their relationships, and motivate and understand others',
      'It replaces the need for any skills',
      'It guarantees higher pay automatically',
      'It lets them ignore their team',
    ],
    correctIndex: 0,
    rationale:
      'Leadership is largely about people. EI helps a leader stay composed, read others accurately, motivate the team, and manage relationships and conflict - all central to leading effectively.',
  },
  {
    id: 'ldemo-010',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: 'Which is the clearest example of self-awareness?',
    choices: [
      'A leader shouting without noticing their own anger',
      'A leader noticing they are becoming angry and realising it may cloud their judgement',
      'A leader blaming the team for everything',
      'A leader ignoring how they feel entirely',
    ],
    correctIndex: 1,
    rationale:
      'Self-awareness is shown when the leader recognises the emotion (rising anger) in the moment and understands how it could affect their decisions - the first step to managing it.',
  },
  {
    id: 'ldemo-011',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: 'Which is the clearest example of self-regulation?',
    choices: [
      'Snapping back immediately when provoked',
      'Storming out of every difficult meeting',
      'Pausing to stay calm and choosing a measured response when provoked',
      'Hiding from all challenges',
    ],
    correctIndex: 2,
    rationale:
      'Self-regulation is displayed when a leader feels the urge to react but manages it - pausing, staying calm, and responding thoughtfully rather than lashing out.',
  },
  {
    id: 'ldemo-012',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: 'Which is the clearest example of empathy in a leader?',
    choices: [
      'Ignoring a struggling team member',
      'Assuming everyone feels exactly as the leader does',
      'Dismissing personal problems as irrelevant',
      'Noticing a team member seems stressed and asking how they can help',
    ],
    correctIndex: 3,
    rationale:
      'Empathy is shown when the leader picks up on another person’s emotional state (stress) and responds with understanding and support, rather than overlooking it.',
  },
  {
    id: 'ldemo-013',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: 'Which is the clearest example of strong social skills?',
    choices: [
      'Helping two colleagues resolve a dispute and rebuild cooperation',
      'Refusing to speak to anyone',
      'Avoiding all teamwork',
      'Keeping every idea secret',
    ],
    correctIndex: 0,
    rationale:
      'Social skills show in managing relationships well - here, mediating a conflict and restoring cooperation, which draws on communication, empathy, and influence.',
  },
  {
    id: 'ldemo-014',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: 'Which is the clearest example of EI "motivation" (in Goleman’s sense)?',
    choices: [
      'Working only when threatened with punishment',
      'Pursuing a challenging goal for the personal satisfaction of achieving it',
      'Refusing to set any goals',
      'Doing the minimum to avoid trouble',
    ],
    correctIndex: 1,
    rationale:
      'EI motivation is an inner drive: pursuing goals energetically for the satisfaction of achievement and growth, not merely for external rewards or to avoid punishment.',
  },
  {
    id: 'ldemo-015',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: 'A leader with low emotional intelligence is most likely to:',
    choices: [
      'Build strong trust automatically',
      'Always make perfect decisions',
      'Have more workplace conflict, weaker relationships, and lower team morale',
      'Communicate flawlessly',
    ],
    correctIndex: 2,
    rationale:
      'Low EI - poor self-control and little empathy - tends to produce misread situations, damaged relationships, unresolved conflict, and lower morale among the team.',
  },
  {
    id: 'ldemo-016',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: 'What does Goleman suggest about whether emotional intelligence can change over time?',
    choices: [
      'It is fixed at birth and cannot change',
      'It falls automatically with age',
      'It depends only on wealth',
      'It can be developed and improved with practice',
    ],
    correctIndex: 3,
    rationale:
      'Unlike the traditional view of a fixed IQ, Goleman argued that emotional intelligence can be learned and strengthened over time through self-reflection and deliberate practice.',
  },
  {
    id: 'ldemo-017',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: 'Empathy does NOT require a leader to:',
    choices: [
      'Agree with, or give in to, everything the other person wants',
      'Understand the other person’s feelings',
      'Consider the other person’s perspective',
      'Listen carefully to the other person',
    ],
    correctIndex: 0,
    rationale:
      'Empathy is understanding how another feels; it does not mean agreeing with them or always doing what they want. A leader can empathise and still make a different decision.',
  },
  {
    id: 'ldemo-018',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: 'A key benefit of self-regulation for a leader is that it:',
    choices: [
      'Removes the need to make decisions',
      'Helps them stay calm under pressure and think before acting',
      'Guarantees the team never disagrees',
      'Lets them ignore feedback',
    ],
    correctIndex: 1,
    rationale:
      'Self-regulation lets a leader keep composure in stressful moments and respond deliberately rather than impulsively, which builds trust and leads to steadier decisions.',
  },
  {
    id: 'ldemo-019',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: 'Why is self-awareness often called the foundation of emotional intelligence?',
    choices: [
      'Because it lets you avoid all emotions',
      'Because it replaces the need for empathy',
      'Because you must first recognise an emotion before you can manage it',
      'Because it measures IQ',
    ],
    correctIndex: 2,
    rationale:
      'You cannot manage what you do not notice. Recognising your own emotions (self-awareness) is the prerequisite for regulating them and for reading others accurately.',
  },
  {
    id: 'ldemo-020',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: 'How does empathy help a leader of a diverse team?',
    choices: [
      'It lets the leader ignore differences',
      'It forces everyone to think alike',
      'It removes the need to communicate',
      'It helps the leader understand different perspectives and respond to varied needs',
    ],
    correctIndex: 3,
    rationale:
      'Empathy helps a leader appreciate that members may see situations differently and have different needs, so the leader can adapt their approach and treat people fairly.',
  },
  {
    id: 'ldemo-021',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: 'Which of the following is NOT one of Goleman’s five components of emotional intelligence?',
    choices: [
      'Physical strength',
      'Empathy',
      'Self-awareness',
      'Social skills',
    ],
    correctIndex: 0,
    rationale:
      'Physical strength is not part of EI. Goleman’s five components are self-awareness, self-regulation, motivation, empathy, and social skills.',
  },
  {
    id: 'ldemo-022',
    topic: 'emotionalIntelligence',
    type: 'mcq',
    prompt: 'How can unmanaged strong emotions affect a leader’s decisions?',
    choices: [
      'They can distort judgement, leading to rushed or biased decisions',
      'They always improve decisions',
      'They have no effect at all',
      'They guarantee objectivity',
    ],
    correctIndex: 0,
    rationale:
      'Strong emotions that go unmanaged - anger, fear, excitement - can cloud thinking and push a leader toward impulsive or biased choices, which is why self-regulation matters for decisions.',
  },
  {
    id: 'ldemo-023',
    topic: 'emotionalIntelligence',
    type: 'tf',
    prompt: 'Self-awareness is recognising your own emotions and how they affect your behaviour.',
    correctAnswer: true,
    rationale:
      'True. Self-awareness is noticing your emotions as they occur and understanding their influence on your thoughts and actions.',
  },
  {
    id: 'ldemo-024',
    topic: 'emotionalIntelligence',
    type: 'tf',
    prompt: 'Emotional intelligence and IQ are simply the same thing measured in different ways.',
    correctAnswer: false,
    rationale:
      'False. IQ measures intellectual/reasoning ability, while EI measures awareness and management of emotions. They are distinct capacities.',
  },
  {
    id: 'ldemo-025',
    topic: 'emotionalIntelligence',
    type: 'tf',
    prompt: 'Empathy means understanding another person’s feelings, though not necessarily agreeing with them.',
    correctAnswer: true,
    rationale:
      'True. Empathy is grasping how someone else feels and seeing their perspective; it does not require agreeing with them or doing whatever they want.',
  },
  {
    id: 'ldemo-026',
    topic: 'emotionalIntelligence',
    type: 'tf',
    prompt: 'Self-regulation means expressing every emotion immediately without any control.',
    correctAnswer: false,
    rationale:
      'False. Self-regulation is the opposite - managing and controlling emotions and impulses so you respond thoughtfully rather than reacting automatically.',
  },
  {
    id: 'ldemo-027',
    topic: 'emotionalIntelligence',
    type: 'tf',
    prompt: 'Goleman argued that emotional intelligence can be developed and improved with practice.',
    correctAnswer: true,
    rationale:
      'True. Goleman held that, unlike a largely fixed IQ, EI can be strengthened over time through self-reflection, feedback, and deliberate practice.',
  },
  {
    id: 'ldemo-028',
    topic: 'emotionalIntelligence',
    type: 'tf',
    prompt: 'Social skills, in Goleman’s model, mean avoiding contact with other people.',
    correctAnswer: false,
    rationale:
      'False. Social skills are about managing relationships well - communicating, building rapport, influencing, and resolving conflict - which requires engaging with others, not avoiding them.',
  },
  {
    id: 'ldemo-029',
    topic: 'emotionalIntelligence',
    type: 'tf',
    prompt: 'In emotional intelligence, "motivation" refers to an inner drive to achieve beyond external rewards like money.',
    correctAnswer: true,
    rationale:
      'True. EI motivation is the internal passion to pursue goals for achievement and growth, going beyond external incentives such as money or status.',
  },
  {
    id: 'ldemo-030',
    topic: 'emotionalIntelligence',
    type: 'tf',
    prompt: 'A leader’s emotional intelligence has no effect on team morale.',
    correctAnswer: false,
    rationale:
      'False. A leader’s EI strongly shapes morale: self-control and empathy build trust and a positive climate, while low EI tends to create conflict and lower morale.',
  },
];
