import type { LeadershipQuestion } from './leadershipTypes.ts';

// Topic: Communication (for leaders).
// Standard curriculum: the sender-message-channel-receiver-feedback process,
// verbal vs non-verbal communication, active listening, communication barriers,
// and directions/channels of communication. No dedicated deck was provided;
// authored from general knowledge and disclosed in the build report.
export const communicationQuestions: LeadershipQuestion[] = [
  {
    id: 'ldcom-001',
    topic: 'communication',
    type: 'mcq',
    prompt: 'Communication is best defined as the process of:',
    choices: [
      'Sharing information and meaning so that it is understood by others',
      'Talking as loudly as possible',
      'Sending emails no one reads',
      'Keeping all information to yourself',
    ],
    correctIndex: 0,
    rationale:
      'Communication is the process of passing information and meaning from one person to another so that it is received and understood - not just sent.',
  },
  {
    id: 'ldcom-002',
    topic: 'communication',
    type: 'mcq',
    prompt: 'In the communication process, who or what is the "sender"?',
    choices: [
      'The device that carries the message',
      'The person who originates and transmits the message',
      'The interference that distorts the message',
      'The person who only listens',
    ],
    correctIndex: 1,
    rationale:
      'The sender (or source) is the person who has an idea and starts the communication by putting it into a message and transmitting it.',
  },
  {
    id: 'ldcom-003',
    topic: 'communication',
    type: 'mcq',
    prompt: '"Encoding" a message means:',
    choices: [
      'Deleting the message',
      'Ignoring the receiver',
      'Turning an idea into words, symbols, or gestures that can be sent',
      'Waiting for feedback',
    ],
    correctIndex: 2,
    rationale:
      'Encoding is the step where the sender converts their idea into a form - words, symbols, tone, or gestures - that can be transmitted to the receiver.',
  },
  {
    id: 'ldcom-004',
    topic: 'communication',
    type: 'mcq',
    prompt: 'The "channel" in the communication process is:',
    choices: [
      'The idea inside the sender’s head',
      'The receiver’s reply',
      'The emotion behind the message',
      'The medium or path the message travels through, such as speech, email, or a report',
    ],
    correctIndex: 3,
    rationale:
      'The channel is the means by which the message travels from sender to receiver - for example a face-to-face conversation, a phone call, an email, or a written memo.',
  },
  {
    id: 'ldcom-005',
    topic: 'communication',
    type: 'mcq',
    prompt: '"Decoding" a message means:',
    choices: [
      'The receiver interpreting and making sense of the message',
      'The sender writing the message',
      'The channel breaking down',
      'Deleting the message unread',
    ],
    correctIndex: 0,
    rationale:
      'Decoding is the receiver’s step of interpreting the words, symbols, and tone to work out the meaning the sender intended.',
  },
  {
    id: 'ldcom-006',
    topic: 'communication',
    type: 'mcq',
    prompt: 'What is "feedback" in the communication process?',
    choices: [
      'The interference that blocks a message',
      'The receiver’s response that tells the sender whether the message was understood',
      'The first idea the sender has',
      'The channel used to send the message',
    ],
    correctIndex: 1,
    rationale:
      'Feedback is the receiver’s response back to the sender. It closes the loop, letting the sender know whether the message was received and understood as intended.',
  },
  {
    id: 'ldcom-007',
    topic: 'communication',
    type: 'mcq',
    prompt: 'In communication, "noise" refers to:',
    choices: [
      'Only literal loud sounds',
      'The sender’s job title',
      'Anything that interferes with or distorts the message, whether physical or mental',
      'The feedback from the receiver',
    ],
    correctIndex: 2,
    rationale:
      'Noise is any interference that distorts the message - physical (background sound, poor connection) or psychological (stress, bias, distraction) - reducing how faithfully it gets through.',
  },
  {
    id: 'ldcom-008',
    topic: 'communication',
    type: 'mcq',
    prompt: 'Which of the following is an example of non-verbal communication?',
    choices: [
      'A written report',
      'A spoken announcement',
      'A recorded voicemail',
      'Facial expression, posture, and tone of voice',
    ],
    correctIndex: 3,
    rationale:
      'Non-verbal communication is the meaning carried without words - through body language, facial expression, gestures, eye contact, and tone of voice.',
  },
  {
    id: 'ldcom-009',
    topic: 'communication',
    type: 'mcq',
    prompt: 'Why is non-verbal communication important for a leader?',
    choices: [
      'It can reinforce or contradict the spoken words and often carries much of the real meaning',
      'It has no effect on how messages are received',
      'It only matters in writing',
      'It replaces the need to speak clearly',
    ],
    correctIndex: 0,
    rationale:
      'Non-verbal signals can strengthen a message or undercut it (for example, saying "I’m listening" while looking away). Because people read these cues, leaders must align their body language with their words.',
  },
  {
    id: 'ldcom-010',
    topic: 'communication',
    type: 'mcq',
    prompt: 'Active listening is best described as:',
    choices: [
      'Interrupting to give your opinion quickly',
      'Fully concentrating on the speaker to understand, then responding and confirming meaning',
      'Nodding while thinking about something else',
      'Waiting silently only to plan your reply',
    ],
    correctIndex: 1,
    rationale:
      'Active listening means giving full attention to the speaker, working to understand their meaning, and reflecting it back (for example by paraphrasing) - not merely hearing while preparing your own response.',
  },
  {
    id: 'ldcom-011',
    topic: 'communication',
    type: 'mcq',
    prompt: 'A "semantic barrier" to communication arises when:',
    choices: [
      'The room is physically noisy',
      'The internet connection fails',
      'The same word or term means different things to the sender and the receiver',
      'The message is sent at night',
    ],
    correctIndex: 2,
    rationale:
      'Semantic barriers come from meaning: jargon, ambiguous words, or terms understood differently by each party cause the receiver to decode a different message than the sender intended.',
  },
  {
    id: 'ldcom-012',
    topic: 'communication',
    type: 'mcq',
    prompt: 'Which is an example of a psychological barrier to communication?',
    choices: [
      'A broken microphone',
      'A long physical distance',
      'A power cut',
      'Anger, prejudice, or defensiveness that colours how a message is received',
    ],
    correctIndex: 3,
    rationale:
      'Psychological barriers are internal: emotions such as anger or fear, bias, or defensiveness distort how a person encodes or decodes a message, regardless of the physical setting.',
  },
  {
    id: 'ldcom-013',
    topic: 'communication',
    type: 'mcq',
    prompt: 'Which is an example of a physical barrier to communication?',
    choices: [
      'Loud background noise or a faulty phone line',
      'A personal grudge',
      'A difference in values',
      'A confusing choice of words',
    ],
    correctIndex: 0,
    rationale:
      'Physical barriers are external obstacles in the environment or channel - background noise, distance, or faulty equipment - that physically interfere with the message.',
  },
  {
    id: 'ldcom-014',
    topic: 'communication',
    type: 'mcq',
    prompt: '"Downward" communication in an organisation flows:',
    choices: [
      'From employees up to senior managers',
      'From managers down to their subordinates, such as instructions and goals',
      'Only between friends outside work',
      'Sideways between equal peers',
    ],
    correctIndex: 1,
    rationale:
      'Downward communication moves from higher levels to lower levels - managers passing instructions, expectations, and feedback down to staff.',
  },
  {
    id: 'ldcom-015',
    topic: 'communication',
    type: 'mcq',
    prompt: '"Upward" communication in an organisation flows:',
    choices: [
      'From managers down to staff',
      'Between two departments at the same level',
      'From employees up to managers, such as reports, ideas, and concerns',
      'Only from customers',
    ],
    correctIndex: 2,
    rationale:
      'Upward communication moves from lower levels to higher levels - staff sending feedback, progress reports, suggestions, or concerns up to management.',
  },
  {
    id: 'ldcom-016',
    topic: 'communication',
    type: 'mcq',
    prompt: '"Horizontal" (lateral) communication takes place:',
    choices: [
      'Only from the top of the organisation',
      'Only with outside suppliers',
      'Only in writing',
      'Between people at the same level, such as two team leaders coordinating work',
    ],
    correctIndex: 3,
    rationale:
      'Horizontal or lateral communication happens between peers at the same level - for example, colleagues or departments coordinating with one another.',
  },
  {
    id: 'ldcom-017',
    topic: 'communication',
    type: 'mcq',
    prompt: 'The informal communication network that spreads news through casual conversation is often called the:',
    choices: [
      'Grapevine',
      'Chain of command',
      'Official memo',
      'Annual report',
    ],
    correctIndex: 0,
    rationale:
      'The grapevine is the informal network of communication in an organisation - unofficial, person-to-person, and fast, though it can also spread rumours and inaccuracies.',
  },
  {
    id: 'ldcom-018',
    topic: 'communication',
    type: 'mcq',
    prompt: 'A wise leader pays attention to the grapevine because it:',
    choices: [
      'Is always completely accurate',
      'Can spread information and rumours quickly and reveals staff concerns',
      'Never affects morale',
      'Replaces the need for any official communication',
    ],
    correctIndex: 1,
    rationale:
      'The grapevine moves fast and reflects what people are actually thinking. Leaders monitor it to sense concerns and correct rumours, while still relying on clear official channels for accuracy.',
  },
  {
    id: 'ldcom-019',
    topic: 'communication',
    type: 'mcq',
    prompt: 'A key advantage of two-way communication over one-way communication is that it:',
    choices: [
      'Is always faster',
      'Removes the need to listen',
      'Allows the receiver to ask questions and clarify, reducing misunderstanding',
      'Guarantees no one disagrees',
    ],
    correctIndex: 2,
    rationale:
      'Two-way communication lets the receiver respond, question, and confirm understanding, so errors can be caught and corrected - something one-way communication cannot do.',
  },
  {
    id: 'ldcom-020',
    topic: 'communication',
    type: 'mcq',
    prompt: 'Why should a leader confirm that feedback matches the intended message?',
    choices: [
      'To make meetings longer',
      'To avoid ever giving instructions',
      'To show off vocabulary',
      'To check the message was understood as intended before acting on it',
    ],
    correctIndex: 3,
    rationale:
      'Checking feedback confirms the receiver decoded the message the way the sender meant it. Catching a mismatch early prevents costly mistakes from a misunderstood instruction.',
  },
  {
    id: 'ldcom-021',
    topic: 'communication',
    type: 'mcq',
    prompt: 'Which practice best helps overcome communication barriers?',
    choices: [
      'Using clear, simple language, listening actively, and choosing an appropriate channel',
      'Using as much technical jargon as possible',
      'Speaking only once and never checking understanding',
      'Ignoring the receiver’s reaction',
    ],
    correctIndex: 0,
    rationale:
      'Barriers shrink when the sender uses plain language suited to the audience, listens for feedback, and picks a channel that fits the message - for example, meeting in person for a sensitive issue.',
  },
  {
    id: 'ldcom-022',
    topic: 'communication',
    type: 'mcq',
    prompt: '"Information overload" as a communication barrier means:',
    choices: [
      'Too little information is given',
      'So much information arrives at once that the receiver cannot process it all',
      'The message is perfectly clear',
      'Only pictures are used',
    ],
    correctIndex: 1,
    rationale:
      'Information overload occurs when a receiver is given more than they can absorb at once, so important points get lost. Leaders reduce it by prioritising and structuring information.',
  },
  {
    id: 'ldcom-023',
    topic: 'communication',
    type: 'tf',
    prompt: 'Feedback lets the sender know whether a message was understood as intended.',
    correctAnswer: true,
    rationale:
      'True. Feedback is the receiver’s response that closes the communication loop and confirms (or corrects) how the message was understood.',
  },
  {
    id: 'ldcom-024',
    topic: 'communication',
    type: 'tf',
    prompt: 'Non-verbal cues such as tone of voice and body language play no part in communication.',
    correctAnswer: false,
    rationale:
      'False. Non-verbal cues carry a large share of meaning and can reinforce or contradict spoken words, so they are a major part of communication.',
  },
  {
    id: 'ldcom-025',
    topic: 'communication',
    type: 'tf',
    prompt: 'Semantic barriers arise when the same word carries different meanings for the sender and the receiver.',
    correctAnswer: true,
    rationale:
      'True. Semantic barriers are about meaning - jargon or ambiguous words decoded differently by the receiver than the sender intended.',
  },
  {
    id: 'ldcom-026',
    topic: 'communication',
    type: 'tf',
    prompt: 'Active listening just means staying silent while planning your own reply.',
    correctAnswer: false,
    rationale:
      'False. Active listening means concentrating on the speaker to understand their meaning and reflecting it back - not simply staying quiet while preparing your response.',
  },
  {
    id: 'ldcom-027',
    topic: 'communication',
    type: 'tf',
    prompt: 'The informal communication network in an organisation is often called the grapevine.',
    correctAnswer: true,
    rationale:
      'True. The grapevine is the unofficial, person-to-person network through which news and rumours travel quickly, alongside the formal channels.',
  },
  {
    id: 'ldcom-028',
    topic: 'communication',
    type: 'tf',
    prompt: 'Downward communication flows from employees up to senior managers.',
    correctAnswer: false,
    rationale:
      'False. Downward communication flows from managers to subordinates. Communication from employees up to managers is called upward communication.',
  },
  {
    id: 'ldcom-029',
    topic: 'communication',
    type: 'tf',
    prompt: '"Noise" in the communication process is anything that distorts or interferes with the message.',
    correctAnswer: true,
    rationale:
      'True. Noise covers any interference - physical or psychological - that reduces how accurately the message reaches and is understood by the receiver.',
  },
  {
    id: 'ldcom-030',
    topic: 'communication',
    type: 'tf',
    prompt: 'Using heavy technical jargon with a non-expert audience improves the clarity of a message.',
    correctAnswer: false,
    rationale:
      'False. Jargon a listener does not share creates a semantic barrier and reduces clarity. Clear communication uses language matched to the audience.',
  },
];
