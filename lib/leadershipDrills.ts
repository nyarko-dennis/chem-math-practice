import type { LeadershipDrill } from './leadershipTypes.ts';

export { LEADERSHIP_DRILL_LABELS } from './leadershipTypes.ts';
export type { LeadershipDrill, LeadershipDrillKind, RubricPoint } from './leadershipTypes.ts';

// 24 subjective drills, 3 per topic. Grounded in the two committed student
// extracts where noted (resource-allocator role; primus inter pares vs the
// "coconut" style); the rest is standard leadership curriculum authored from
// general knowledge and disclosed in the build report. Rubric marks sum exactly
// to each drill's total; model answers run 150-400 words.
export const leadershipDrills: LeadershipDrill[] = [
  // ---------------------------------------------------------------------
  // concepts
  // ---------------------------------------------------------------------
  {
    id: 'lddr-001',
    topic: 'concepts',
    drillKind: 'defineTerms',
    type: 'drill',
    prompt:
      'Define each of the following in plain language: (a) leadership, (b) how leadership differs from management, and (c) any one base (source) of a leader’s power.',
    marks: 6,
    rubric: [
      { id: 'r1', label: 'Leadership defined', detail: 'Leadership is the process of influencing others so they work willingly toward a shared goal - an influence relationship, not a title.', marks: 2 },
      { id: 'r2', label: 'Leadership vs management', detail: 'Leadership sets direction and inspires people; management plans, organises, and controls resources to keep existing systems running. They overlap but are not identical.', marks: 2 },
      { id: 'r3', label: 'One base of power', detail: 'Any one correctly explained: legitimate (from formal position), reward (ability to give benefits), coercive (ability to punish), expert (knowledge/skill), or referent (being respected/admired).', marks: 2 },
    ],
    modelAnswer:
      'Leadership is the process of influencing other people so that they work willingly toward a shared goal. The key word is influence: leadership is a relationship between a leader and followers, not simply a title or a rank. Because it is about influence, someone with no official position can still lead, and someone with a grand title may fail to lead at all.\n\n' +
      'Leadership and management overlap but are not the same. Leadership is mainly about setting a direction, creating a vision, and inspiring people to pursue it. Management is mainly about planning, organising, and controlling resources so that existing systems run smoothly and reliably. A common way to put it is that managers "do things right" (efficient execution) while leaders "do the right things" (choosing the right direction). Most effective people in charge need to do both.\n\n' +
      'A base of power is a source of a leader’s ability to influence. One example is legitimate power, which comes from a person’s formal position or title - a supervisor can give instructions because the organisation has placed them in that role. Other bases include reward power (the ability to give benefits such as pay rises or praise), coercive power (the ability to punish), expert power (influence from proven knowledge or skill), and referent power (influence from being respected or admired). Good leaders rely more on expert and referent power than on coercion, because respect and competence build willing followers rather than fear.',
  },
  {
    id: 'lddr-002',
    topic: 'concepts',
    drillKind: 'explainConcept',
    type: 'drill',
    prompt:
      'Explain the "resource-allocator" role of a leader. Name the four categories of resource a leader distributes, say why the role matters, and describe what good and poor allocation look like.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'The four resources', detail: 'Names the "4 Ms": Man (people/human resources), Money, Materials, and Time.', marks: 2 },
      { id: 'r2', label: 'Why the role matters', detail: 'Explains that how resources are distributed decides what gets prioritised, whether departments thrive, and ultimately organisational success or failure.', marks: 2 },
      { id: 'r3', label: 'Good allocation', detail: 'Gives an example of sound allocation - e.g. matching experienced engineers to critical design work, funding safety, using certified materials, allowing realistic time.', marks: 2 },
      { id: 'r4', label: 'Poor allocation and its remedy', detail: 'Notes consequences of misallocation (delays, safety risks, breakdowns, reputational damage) and that leaders should allocate with foresight, fairness, and accountability.', marks: 2 },
    ],
    modelAnswer:
      'The resource-allocator role is one of the most important responsibilities of leadership. It means deciding how to distribute the organisation’s limited resources, and those resources fall into four categories often called the "4 Ms": Man (people or human resources), Money, Materials, and Time. How a leader shares out these four resources largely determines what projects are prioritised, which departments thrive, and whether the organisation reaches its strategic goals.\n\n' +
      'The role matters because resources are always limited, so every allocation is also a choice about what will not get done. In engineering firms, where projects are complex and resource-intensive, allocation decisions carry heavy consequences. Good allocation means putting the right resource in the right place: assigning experienced structural engineers to design work and skilled technicians to execution; budgeting enough money for safety training and maintenance; using certified materials on critical structures; and allowing realistic time for planning, execution, and evaluation, such as proper soil testing before construction.\n\n' +
      'Poor allocation produces the opposite. Assigning underqualified staff to critical tasks invites delays, safety risks, and reputational damage. Underfunding maintenance or quality assurance leads to equipment breakdowns and unhappy clients. Cheap substitute materials can compromise structural integrity, and rushing to meet an unrealistic deadline causes poor workmanship and staff burnout. For these reasons a leader must approach resource allocation with strategic foresight, fairness, and accountability - recognising that how resources are distributed ultimately defines what gets done and what remains undone.',
  },
  {
    id: 'lddr-003',
    topic: 'concepts',
    drillKind: 'applyScenario',
    type: 'drill',
    prompt:
      'You lead an engineering firm with two important projects starting at once, but only enough experienced engineers for one, a tight budget, and a client pushing for a fast deadline. Using the resource-allocator idea, explain how you would allocate people, money, and time, and justify your trade-offs.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Human-resource allocation', detail: 'Assigns experienced engineers to the most critical/risky work and explains the reasoning; avoids putting underqualified staff on critical tasks.', marks: 2 },
      { id: 'r2', label: 'Money allocation', detail: 'Prioritises spending prudently - covering safety, quality assurance, and essential needs - rather than cutting corners that create long-term cost.', marks: 2 },
      { id: 'r3', label: 'Time allocation', detail: 'Sets a realistic schedule, resisting an unrealistic deadline that would cause poor workmanship or safety hazards; sequences or phases the work if needed.', marks: 2 },
      { id: 'r4', label: 'Justified trade-offs and accountability', detail: 'Explains the trade-offs openly (e.g. staggering the projects), balances urgency with quality, and takes accountability for the choices.', marks: 2 },
    ],
    modelAnswer:
      'I would treat this as a resource-allocation problem across the 4 Ms, starting with people. Since I have enough experienced engineers for only one project, I would assign them to the project - or the parts of each project - where an error would be most costly or dangerous, such as structural design. Underqualified staff would not go on critical tasks, because that invites delays, safety risks, and reputational damage. Where possible I would pair less experienced staff with senior ones so critical work is covered and people still develop.\n\n' +
      'For money, I would allocate prudently rather than cheaply. Safety, quality assurance, and essential materials come first, because underfunding them causes breakdowns, liabilities, and client dissatisfaction that cost far more later. I would protect the budget lines that carry the greatest risk and trim discretionary spending instead.\n\n' +
      'For time, I would resist the client’s unrealistic deadline. Rushing produces poor workmanship and safety hazards and burns out staff. A realistic schedule that allows proper planning, execution, and checking is safer and, in the end, faster than reworking failures. Practically, I would likely stagger the two projects - fully resourcing the more urgent or higher-risk one first, then shifting the experienced team to the second - rather than half-resourcing both and doing neither well.\n\n' +
      'Finally, I would explain these trade-offs honestly to the client and the team, balancing urgency with quality, and take accountability for the decisions and their outcomes.',
  },
  // ---------------------------------------------------------------------
  // theories
  // ---------------------------------------------------------------------
  {
    id: 'lddr-004',
    topic: 'theories',
    drillKind: 'explainConcept',
    type: 'drill',
    prompt:
      'Explain transformational leadership, including its four components (the "four I’s"). Give a short example of each component in action.',
    marks: 10,
    rubric: [
      { id: 'r1', label: 'Transformational leadership defined', detail: 'Leadership that inspires and elevates followers beyond self-interest toward a shared vision, raising their motivation and commitment.', marks: 2 },
      { id: 'r2', label: 'Idealised influence', detail: 'Acting as a principled role model whom followers admire and want to emulate; example given.', marks: 2 },
      { id: 'r3', label: 'Inspirational motivation', detail: 'Communicating an appealing vision that energises and gives meaning; example given.', marks: 2 },
      { id: 'r4', label: 'Intellectual stimulation', detail: 'Encouraging followers to question assumptions and think creatively; example given.', marks: 2 },
      { id: 'r5', label: 'Individualised consideration', detail: 'Attending to each follower’s needs as a coach or mentor; example given.', marks: 2 },
    ],
    modelAnswer:
      'Transformational leadership is leadership that inspires and elevates followers so they look beyond their own immediate self-interest and commit to a shared vision. Rather than simply exchanging rewards for performance, a transformational leader raises followers’ motivation, confidence, and sense of purpose, often producing effort and loyalty well above the minimum. Its four components are known as the "four I’s".\n\n' +
      'Idealised influence means the leader acts as a principled role model whom followers respect and want to imitate. For example, a manager who admits her own mistakes and keeps her promises earns trust that makes people follow her example.\n\n' +
      'Inspirational motivation means communicating an appealing, meaningful vision that energises people. A team leader who paints a vivid picture of how a project will improve patients’ lives gives the work meaning beyond the paycheck.\n\n' +
      'Intellectual stimulation means encouraging followers to question old assumptions and think creatively. A supervisor who invites the team to challenge the usual process and propose better methods, rather than punishing new ideas, is using this component.\n\n' +
      'Individualised consideration means attending to each follower as an individual, acting as a coach or mentor. A leader who notices one person needs more guidance while another is ready for a stretch task, and supports each accordingly, shows this behaviour.\n\n' +
      'Together, the four I’s explain how transformational leaders build committed, capable followers - contrasting with transactional leadership, which relies mainly on rewards and corrections within the existing system.',
  },
  {
    id: 'lddr-005',
    topic: 'theories',
    drillKind: 'compare',
    type: 'drill',
    prompt:
      'Compare transactional and transformational leadership. Describe each, state the key difference, and explain a situation where each is appropriate.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Transactional described', detail: 'Motivates through exchange - rewards for good performance and corrections for poor - operating within the existing system.', marks: 2 },
      { id: 'r2', label: 'Transformational described', detail: 'Inspires and elevates followers beyond self-interest toward a shared vision, raising motivation and commitment.', marks: 2 },
      { id: 'r3', label: 'Key difference', detail: 'Transactional maintains and rewards within the status quo; transformational changes and elevates people and direction.', marks: 2 },
      { id: 'r4', label: 'When each fits', detail: 'Transactional suits routine, stable tasks needing clear standards; transformational suits change, growth, or the need to inspire high commitment.', marks: 2 },
    ],
    modelAnswer:
      'Transactional and transformational leadership are often contrasted as two ends of a spectrum. Transactional leadership motivates followers through exchange: the leader sets clear expectations and gives rewards for meeting them and corrections when they are not met. It operates within the existing system, keeping things running and reinforcing agreed standards. Think of a supervisor who offers a bonus for hitting a target and addresses lapses through the usual procedures.\n\n' +
      'Transformational leadership works differently. Instead of simply trading rewards for performance, it inspires and elevates followers so they look beyond their own self-interest toward a shared vision. Through role-modelling, an energising vision, intellectual stimulation, and individual coaching (the "four I’s"), the leader raises people’s motivation, commitment, and confidence.\n\n' +
      'The key difference is that transactional leadership maintains and rewards behaviour within the current system, while transformational leadership seeks to change and elevate both people and direction. Transactional is about stability and exchange; transformational is about inspiration and growth.\n\n' +
      'Each fits different situations. Transactional leadership suits routine, stable work where clear standards and fair rewards keep performance reliable - for instance, a well-established production line. Transformational leadership suits times of change, ambitious goals, or low morale, where people need to be inspired and their commitment lifted - for instance, turning around a struggling team or launching a bold new project. In practice, effective leaders often blend the two, providing clear structure and rewards while also inspiring a larger purpose.',
  },
  {
    id: 'lddr-006',
    topic: 'theories',
    drillKind: 'applyScenario',
    type: 'drill',
    prompt:
      'Using Hersey and Blanchard’s situational leadership model, explain how you would adjust your approach for three team members: (a) a brand-new hire with low skill and low confidence, (b) someone with growing skill but still needing support, and (c) a highly skilled, self-motivated expert.',
    marks: 9,
    rubric: [
      { id: 'r1', label: 'Readiness principle', detail: 'Explains that the model matches leadership style to followers’ readiness (competence and willingness), adjusting how much direction and support to give.', marks: 3 },
      { id: 'r2', label: 'Low readiness → directing', detail: 'For the new hire, gives clear direction and structure (a "telling"/directing style) with close guidance.', marks: 2 },
      { id: 'r3', label: 'Moderate readiness → coaching/supporting', detail: 'For the growing member, combines direction with support and encouragement (a "selling"/coaching or supporting style).', marks: 2 },
      { id: 'r4', label: 'High readiness → delegating', detail: 'For the expert, hands over responsibility with little direction (a "delegating" style).', marks: 2 },
    ],
    modelAnswer:
      'Hersey and Blanchard’s situational leadership model says there is no single best style; the leader should match their approach to the readiness of each follower - that is, the follower’s competence (skill) and willingness (confidence and motivation) for the task. As readiness rises, the leader gives less direction and, later, less hand-holding support.\n\n' +
      'For the brand-new hire with low skill and low confidence, I would use a directing ("telling") style. This person needs clear, specific instructions, structure, and close guidance: what to do, how to do it, and by when. Leaving them to work it out alone would cause confusion and mistakes, so direction is high and I check in frequently.\n\n' +
      'For the member with growing skill who still needs support, I would use a coaching or supporting style. They can do more, so I explain the reasoning behind tasks, invite their input, and encourage them, while still offering guidance where gaps remain. Here I combine direction with plenty of two-way support to build confidence.\n\n' +
      'For the highly skilled, self-motivated expert, I would use a delegating style. They have both the ability and the drive, so I hand over responsibility, agree the goal, and step back, offering help only when asked. Over-supervising them would frustrate them and waste my time.\n\n' +
      'The general lesson is to read each person’s readiness and flex the style accordingly, moving from directing toward delegating as people grow.',
  },
  // ---------------------------------------------------------------------
  // styles
  // ---------------------------------------------------------------------
  {
    id: 'lddr-007',
    topic: 'styles',
    drillKind: 'compare',
    type: 'drill',
    prompt:
      'Compare the autocratic and democratic leadership styles. Describe each, give one advantage and one drawback of each, and state a situation where each is the better choice.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Autocratic described', detail: 'Leader makes decisions alone with little input; relies on positional authority.', marks: 2 },
      { id: 'r2', label: 'Democratic described', detail: 'Leader involves the team in decisions before deciding; draws on shared discussion.', marks: 2 },
      { id: 'r3', label: 'Advantage/drawback of each', detail: 'Autocratic: fast decisions but can lower morale and stifle input. Democratic: builds commitment and better ideas but is slower.', marks: 2 },
      { id: 'r4', label: 'When each fits', detail: 'Autocratic suits emergencies or inexperienced teams needing a quick, clear decision; democratic suits capable teams and decisions needing buy-in.', marks: 2 },
    ],
    modelAnswer:
      'The autocratic and democratic styles differ mainly in who makes the decisions. In an autocratic (authoritarian) style, the leader decides alone, with little consultation, and gives orders that rely on their formal position. In a democratic (participative) style, the leader involves team members in the discussion and draws on their ideas before settling on a decision.\n\n' +
      'Each has strengths and weaknesses. The autocratic style’s main advantage is speed: a single person can decide quickly and give clear direction, which is valuable when time is short. Its drawback is that, used constantly, it can lower morale and discourage people from offering ideas, so the team feels unheard and initiative fades. The democratic style’s advantage is that involving people improves the quality of decisions and builds their commitment, because they feel ownership of a choice they helped shape. Its drawback is that consultation takes time, which can slow things down when a fast decision is needed.\n\n' +
      'The better choice depends on the situation. An autocratic style fits a genuine emergency - say, a safety incident on site - or a very inexperienced team that needs clear, quick direction. A democratic style fits a capable, experienced team working on a complex problem, or any decision whose success depends on people buying into it. In practice, skilled leaders treat style as flexible, leaning autocratic when speed and clarity matter most and democratic when commitment and good ideas matter most.',
  },
  {
    id: 'lddr-008',
    topic: 'styles',
    drillKind: 'applyScenario',
    type: 'drill',
    prompt:
      'For each situation, choose the most appropriate leadership style and justify it: (a) a fire breaks out in a workshop and people must be evacuated immediately, and (b) an experienced research team is designing a creative new product with plenty of time.',
    marks: 6,
    rubric: [
      { id: 'r1', label: 'Emergency → autocratic', detail: 'Chooses an autocratic/directive style for the fire and justifies it: one person deciding quickly and giving clear orders saves time when there is none to lose.', marks: 2 },
      { id: 'r2', label: 'Expert team → democratic/laissez-faire', detail: 'Chooses a democratic or laissez-faire style for the research team and justifies it: skilled, self-motivated experts contribute best with involvement and autonomy.', marks: 2 },
      { id: 'r3', label: 'General principle', detail: 'States the underlying principle: match the style to the urgency and to the readiness of the people - directive when speed/safety dominate, participative when expertise and commitment matter.', marks: 2 },
    ],
    modelAnswer:
      'The right style depends on the situation, so I would use very different approaches for these two cases.\n\n' +
      'For the workshop fire, I would use an autocratic (directive) style. In a genuine emergency there is no time to consult or debate; a single leader must decide quickly and give clear, firm orders - "everyone out through the east door now" - so that people evacuate safely. The strength of the autocratic style here is exactly its speed and clarity. Its usual drawback, that it can lower morale by not involving people, does not matter when lives are at risk and seconds count. Clear command reduces panic and confusion.\n\n' +
      'For the experienced research team designing a creative product with plenty of time, I would use a democratic style, shading toward laissez-faire. These are skilled, self-motivated experts, and creative work benefits from many ideas and from people feeling ownership of the direction. A democratic style invites their input and builds commitment, while a hands-off, laissez-faire touch gives such capable professionals the autonomy to explore and innovate. An autocratic style here would waste their expertise, stifle creativity, and probably frustrate them.\n\n' +
      'The general principle is to match the style to the urgency and to the readiness of the people: directive when speed and safety dominate, participative or hands-off when expertise, creativity, and commitment matter most.',
  },
  {
    id: 'lddr-009',
    topic: 'styles',
    drillKind: 'reflect',
    type: 'drill',
    prompt:
      'The "Preparing African Leaders" discussion contrasts a locally rooted "primus inter pares" (first among equals) style with a Western "coconut" style and argues a leader should balance the two. Reflect on which you lean toward and how you would balance them in decision-making, authority, and communication.',
    marks: 6,
    rubric: [
      { id: 'r1', label: 'Explains the two styles', detail: 'Correctly describes primus inter pares (first among equals, rooted in local community norms, consultative) and the "coconut" (Western) style, as contrasted in the note.', marks: 2 },
      { id: 'r2', label: 'Honest self-reflection', detail: 'Identifies which style they currently lean toward, with a reason drawn from their own experience or values.', marks: 2 },
      { id: 'r3', label: 'How to balance the two', detail: 'Explains balancing the styles specifically in decision-making, how authority is expressed, and how one communicates - the three areas named in the note.', marks: 2 },
    ],
    modelAnswer:
      'The "Preparing African Leaders" note contrasts two approaches. The "primus inter pares" or "first among equals" style is rooted in local African community norms: the leader stays part of the group, consults widely, and prioritises social harmony and interaction among people. The "coconut" style is used in the note as shorthand for Western-style leadership, which tends to be more individual and hierarchical. The note concludes that neither is simply better and that a good leader should balance the two.\n\n' +
      'Reflecting honestly, I lean toward the primus-inter-pares style. I am most comfortable consulting the people I work with, building consensus, and protecting relationships, partly because I value community and have seen decisions stick better when people feel included. However, I recognise this can be slow and can blur accountability when a firm, individual decision is needed.\n\n' +
      'To balance the two, I would adjust in the three areas the note names. In decision-making, I would consult and seek consensus for important, people-affecting choices, but be ready to decide decisively and alone when speed or clarity demands it. In how authority is expressed, I would stay approachable and part of the team, yet be clear that I carry final responsibility and will exercise it. In communication, I would keep the warm, relational, face-to-face style that builds trust, while also being direct and explicit so expectations are unmistakable. The aim is to combine the inclusiveness of the local model with the decisiveness of the Western one.',
  },
  // ---------------------------------------------------------------------
  // communication
  // ---------------------------------------------------------------------
  {
    id: 'lddr-010',
    topic: 'communication',
    drillKind: 'defineTerms',
    type: 'drill',
    prompt:
      'Define the main elements of the communication process: sender and encoding, message and channel, receiver and decoding, and feedback and noise. Show how a message travels from one person to another.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Sender and encoding', detail: 'Sender originates the message; encoding is turning the idea into words, symbols, or gestures.', marks: 2 },
      { id: 'r2', label: 'Message and channel', detail: 'Message is the content; channel is the medium/path it travels through (speech, email, report).', marks: 2 },
      { id: 'r3', label: 'Receiver and decoding', detail: 'Receiver gets the message; decoding is interpreting and making sense of it.', marks: 2 },
      { id: 'r4', label: 'Feedback and noise', detail: 'Feedback is the receiver’s response confirming understanding; noise is anything (physical or mental) that distorts the message.', marks: 2 },
    ],
    modelAnswer:
      'Communication is the process of sharing information and meaning so that it is understood, and it can be described as a chain of elements a message passes through.\n\n' +
      'It begins with the sender (or source), the person who has an idea and starts the communication. To send it, the sender must encode the idea - turn it into words, symbols, tone, or gestures that can be transmitted. Encoding is where a private thought becomes a shareable form.\n\n' +
      'The message is the actual content being conveyed. It travels along a channel, which is the medium or path chosen - a face-to-face conversation, a phone call, an email, or a written report. The channel matters, because a sensitive matter is often better handled in person than by email.\n\n' +
      'At the other end is the receiver, the person the message is aimed at. The receiver must decode it - interpret the words and tone to work out the meaning the sender intended. Communication only succeeds if the decoded meaning matches the intended one.\n\n' +
      'To confirm this, the receiver gives feedback: a response - a reply, a question, a nod - that tells the sender whether the message was understood. Feedback closes the loop and turns one-way transmission into genuine two-way communication.\n\n' +
      'Throughout, noise can interfere. Noise is anything that distorts the message, whether physical (background sound, a poor connection) or psychological (stress, bias, distraction). Good communicators reduce noise, choose the right channel, and check feedback so the message arrives as intended.',
  },
  {
    id: 'lddr-011',
    topic: 'communication',
    drillKind: 'explainConcept',
    type: 'drill',
    prompt:
      'Explain the main types of barrier to communication (physical, semantic, and psychological) with an example of each, and describe practical ways a leader can overcome them.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Physical barrier', detail: 'External interference in the environment or channel - e.g. background noise, distance, faulty equipment - with an example.', marks: 2 },
      { id: 'r2', label: 'Semantic barrier', detail: 'Barrier of meaning - jargon or words understood differently by sender and receiver - with an example.', marks: 2 },
      { id: 'r3', label: 'Psychological barrier', detail: 'Internal barrier - emotions, prejudice, defensiveness - that distorts encoding or decoding, with an example.', marks: 2 },
      { id: 'r4', label: 'Ways to overcome', detail: 'Practical strategies: clear/simple language, active listening, choosing an appropriate channel, seeking feedback to confirm understanding.', marks: 2 },
    ],
    modelAnswer:
      'A communication barrier is anything that stops a message from being understood as intended. Three common types are physical, semantic, and psychological.\n\n' +
      'Physical barriers are external obstacles in the environment or channel. Loud background noise on a factory floor, a poor phone connection, or a large distance between people can all physically interfere with a message. For example, an instruction shouted over machinery may simply not be heard correctly.\n\n' +
      'Semantic barriers are barriers of meaning. They arise when the same word or term means different things to the sender and the receiver, often because of technical jargon. For example, an engineer telling a new apprentice to "check the tolerances" may be misunderstood if the apprentice does not yet know the term.\n\n' +
      'Psychological barriers are internal. Emotions such as anger or fear, prejudice, or defensiveness colour how a person encodes or decodes a message. For example, an employee who feels criticised may become defensive and hear an objection where none was intended.\n\n' +
      'A leader can overcome these barriers in several ways. Against physical barriers, choose a suitable setting and channel - a quiet room or a written summary. Against semantic barriers, use clear, simple language matched to the audience and avoid unexplained jargon. Against psychological barriers, manage the emotional climate, stay calm, and build trust so people are less defensive. Across all three, active listening and seeking feedback are powerful: by inviting the receiver to respond or paraphrase, the leader can catch a misunderstanding early and correct it before it causes harm.',
  },
  {
    id: 'lddr-012',
    topic: 'communication',
    drillKind: 'applyScenario',
    type: 'drill',
    prompt:
      'A manager emails a rushed instruction to a busy team; the team misreads it and completes the wrong task. Analyse where the communication broke down, identify the barrier or noise involved, explain the role feedback should have played, and say how you would prevent a repeat.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Where it broke down', detail: 'Identifies the breakdown - e.g. a rushed, unclear message was encoded poorly and decoded differently than intended.', marks: 2 },
      { id: 'r2', label: 'Barrier / noise named', detail: 'Names the relevant barrier or noise - e.g. semantic (ambiguous wording), information overload, or a poorly chosen channel for a complex instruction.', marks: 2 },
      { id: 'r3', label: 'Role of feedback', detail: 'Explains that two-way feedback (confirming/paraphrasing understanding) would have caught the mismatch before work began.', marks: 2 },
      { id: 'r4', label: 'Prevention', detail: 'Gives concrete fixes: clearer language, a better channel, confirming understanding, checking in early.', marks: 2 },
    ],
    modelAnswer:
      'The communication broke down between encoding and decoding. The manager had a clear intention but, in a rush, encoded it into a hurried, ambiguous email. The busy team then decoded that message differently from what was meant and acted on their interpretation, completing the wrong task. Because the meaning received did not match the meaning intended, communication failed even though a message was sent.\n\n' +
      'Several barriers are at work. There is a semantic barrier: the wording was ambiguous, so it could be read more than one way. There may also be information overload - a busy team skimming a dense email under time pressure - and a poorly chosen channel, since a one-way email is a weak medium for a complex or important instruction that needs to be certain.\n\n' +
      'Feedback should have prevented this. In two-way communication, the receiver responds so the sender can confirm understanding. If the team had briefly restated the task in their own words, or the manager had asked them to confirm what they were about to do, the mismatch would have surfaced immediately - before any work was wasted. Feedback closes the loop that a rushed one-way email leaves open.\n\n' +
      'To prevent a repeat, I would write clearer, simpler instructions and highlight the key action; choose a better channel for important tasks, such as a short call or a face-to-face briefing; and always ask the team to confirm their understanding before starting. A quick early check-in would also catch any drift while it is still cheap to correct.',
  },
  // ---------------------------------------------------------------------
  // decisionMaking
  // ---------------------------------------------------------------------
  {
    id: 'lddr-013',
    topic: 'decisionMaking',
    drillKind: 'explainConcept',
    type: 'drill',
    prompt:
      'Explain the steps of the rational decision-making model, from identifying the problem to evaluating the outcome. Then note one realistic limit on it, using the idea of bounded rationality.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Define the problem', detail: 'The model starts by identifying and clearly defining the real problem before seeking solutions.', marks: 2 },
      { id: 'r2', label: 'Generate and evaluate alternatives', detail: 'Gather information, generate possible options, and weigh them against the goal/criteria.', marks: 2 },
      { id: 'r3', label: 'Choose and implement', detail: 'Select the best alternative and put it into action.', marks: 2 },
      { id: 'r4', label: 'Evaluate outcome + bounded-rationality limit', detail: 'Review whether the decision worked; note that in reality limited information, time, and mental capacity mean people satisfice rather than optimise.', marks: 2 },
    ],
    modelAnswer:
      'The rational decision-making model sets out a logical sequence for making good decisions. The first and most important step is to identify and clearly define the problem. If the real problem is misunderstood, every later step aims at the wrong target, so effort is wasted.\n\n' +
      'Next, the decision maker gathers relevant information and generates a range of possible alternatives rather than seizing the first idea. Each alternative is then evaluated against the goal and against criteria such as cost, risk, and feasibility, so their strengths and weaknesses can be compared.\n\n' +
      'The decision maker then chooses the alternative that best meets the goal and implements it - putting the decision into action with the necessary resources and communication. Finally, they evaluate the outcome: did the decision solve the problem? This review provides feedback that can trigger adjustments and improves future decisions.\n\n' +
      'In reality, though, the model is an ideal. Herbert Simon’s idea of bounded rationality points out that real decision makers rarely have complete information, unlimited time, or unlimited mental capacity to weigh every option. Because of these limits, people often "satisfice" - they choose the first alternative that is good enough rather than searching exhaustively for the perfect one. So while the rational model is a valuable guide to thinking systematically, leaders should recognise that practical constraints, along with biases such as anchoring or confirmation bias, mean decisions are usually made under bounded rather than perfect rationality.',
  },
  {
    id: 'lddr-014',
    topic: 'decisionMaking',
    drillKind: 'compare',
    type: 'drill',
    prompt:
      'Compare programmed and non-programmed decisions. Describe each, give an example, and explain how the way a leader handles them differs.',
    marks: 6,
    rubric: [
      { id: 'r1', label: 'Programmed decision', detail: 'Routine, repetitive decision handled with established rules or procedures; example given (e.g. reordering stock).', marks: 2 },
      { id: 'r2', label: 'Non-programmed decision', detail: 'Novel, complex, unstructured decision needing judgement rather than a set rule; example given (e.g. entering a new market).', marks: 2 },
      { id: 'r3', label: 'How handling differs', detail: 'Explains that programmed decisions can be delegated to rules/junior staff for consistency and speed, while non-programmed decisions need the leader’s time, judgement, and acceptance of risk.', marks: 2 },
    ],
    modelAnswer:
      'Decisions can be sorted by how routine they are, and programmed versus non-programmed decisions sit at the two ends.\n\n' +
      'A programmed decision is routine and repetitive - the kind of situation that comes up often enough to be handled by an established rule, policy, or procedure. Because a reliable method already exists, the leader does not need to reason it out afresh each time. An everyday example is reordering stock when supplies fall below a set level: a standing rule triggers the order automatically. Approving a standard leave request or processing a routine payment are similar. Handling these well is mostly about having clear, consistent procedures and applying them fairly and efficiently.\n\n' +
      'A non-programmed decision is novel, complex, or unstructured, with no ready-made rule to follow. It calls for judgement, analysis, and often creativity. An example is deciding whether to enter a new market, launch an unfamiliar product, or respond to an unexpected crisis. There is no checklist that settles it, and the stakes and uncertainty are usually higher.\n\n' +
      'The way a leader handles them therefore differs. Programmed decisions can be delegated to rules or to junior staff, freeing the leader’s attention; the goal is consistency and speed. Non-programmed decisions demand the leader’s time and thought: gathering information, generating and weighing alternatives, consulting others, and accepting more risk and uncertainty. Recognising which type a decision is helps a leader spend their limited attention where genuine judgement is needed rather than on what a procedure could handle.',
  },
  {
    id: 'lddr-015',
    topic: 'decisionMaking',
    drillKind: 'applyScenario',
    type: 'drill',
    prompt:
      'In a project committee, everyone quickly agrees with the senior manager’s first suggestion and no one raises concerns, even though the plan has obvious risks. Identify what is happening, explain why it is dangerous, and describe how you would improve the group’s decision-making.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Identifies groupthink', detail: 'Names groupthink - the desire for harmony/agreement leading members to suppress doubts.', marks: 2 },
      { id: 'r2', label: 'Why it is dangerous', detail: 'Explains that suppressed dissent lets flawed options pass unchallenged, producing poor decisions.', marks: 2 },
      { id: 'r3', label: 'Devil’s advocate / encouraging dissent', detail: 'Suggests inviting open dissent or appointing a devil’s advocate to challenge the emerging view.', marks: 2 },
      { id: 'r4', label: 'Other remedies', detail: 'Adds further measures: leader withholding their view early, seeking outside input, anonymous ideas, considering alternatives before deciding.', marks: 2 },
    ],
    modelAnswer:
      'What is happening is groupthink. The committee values agreement and harmony so highly - and defers so readily to the senior manager - that members are suppressing their doubts and going along with the first suggestion. The quick, unquestioning consensus, despite obvious risks, is the classic warning sign.\n\n' +
      'Groupthink is dangerous because it switches off the group’s critical thinking. When members hold back concerns to avoid rocking the boat, flawed options pass unchallenged and real risks go unexamined. The group can march confidently toward a poor decision that any one member might have questioned privately. The very advantage of deciding as a group - pooling diverse perspectives - is lost.\n\n' +
      'To improve the group’s decision-making, I would first make it safe and expected to disagree. Appointing a devil’s advocate - someone whose job is to argue the opposing case and probe weaknesses - forces the group to examine the plan properly. As the leader, I would also withhold my own opinion early on, since stating it first pressures others to agree; letting members speak before the senior voice reduces that pull.\n\n' +
      'Beyond that, I would ask the group to generate and weigh at least one or two genuine alternatives before committing, invite quieter members to speak, and where useful seek an outside view or allow ideas to be submitted anonymously. Finally, I would deliberately list the plan’s risks and how we would handle them. These steps reintroduce the honest debate that groupthink removes, so the committee decides on the merits rather than on the comfort of agreement.',
  },
  // ---------------------------------------------------------------------
  // teamBuilding
  // ---------------------------------------------------------------------
  {
    id: 'lddr-016',
    topic: 'teamBuilding',
    drillKind: 'explainConcept',
    type: 'drill',
    prompt:
      'Explain Tuckman’s stages of team development (forming, storming, norming, performing, and adjourning), describing what happens at each stage and what the leader should focus on.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Forming', detail: 'Members meet, are polite and tentative, and orient to the task and each other; leader provides direction and clarity.', marks: 2 },
      { id: 'r2', label: 'Storming', detail: 'Conflict and tension over roles, ideas, and influence; leader manages conflict constructively and keeps focus on goals.', marks: 2 },
      { id: 'r3', label: 'Norming', detail: 'Shared norms and cohesion develop, roles settle, trust grows; leader reinforces cooperation and standards.', marks: 2 },
      { id: 'r4', label: 'Performing (and adjourning)', detail: 'Team works effectively toward the goal with less supervision; adjourning is when a temporary team completes its work and disbands.', marks: 2 },
    ],
    modelAnswer:
      'Tuckman’s model describes the stages a team typically passes through as it develops, summarised as "form, storm, norm, perform" (with adjourning added later).\n\n' +
      'In forming, the team first comes together. Members are usually polite and tentative as they get oriented to the task, the leader, and one another, and roles are still unclear. The leader’s focus here is to provide direction, clarify the goal and expectations, and help people settle in.\n\n' +
      'In storming, differences surface. Members jostle over roles, ideas, and influence, and conflict or tension appears - this is often the hardest stage. The leader’s job is to manage that conflict constructively, keeping disagreement focused on the task rather than on personalities, and steering the team back toward its shared goals.\n\n' +
      'In norming, the team works through its conflicts. Shared norms - agreed expectations about how members behave - take hold, roles settle, trust and cohesion grow, and people start cooperating. The leader reinforces these standards and encourages the emerging teamwork.\n\n' +
      'In performing, the team is mature. With clear roles and established trust, it channels its energy into the work and produces results with less need for supervision. The leader can step back, delegate, and focus on removing obstacles.\n\n' +
      'Finally, adjourning applies to temporary teams: once the task is complete, the team disbands. A good leader marks the ending, recognises what was achieved, and helps members move on. Knowing which stage a team is in helps a leader give it exactly what it needs at that point.',
  },
  {
    id: 'lddr-017',
    topic: 'teamBuilding',
    drillKind: 'applyScenario',
    type: 'drill',
    prompt:
      'A newly formed team is stuck in conflict: members argue over roles and approaches, and little work is getting done. Using what you know about team development and conflict, explain how you would move the team forward.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Diagnose the stage', detail: 'Recognises the team is in the "storming" stage of Tuckman’s model, where role and idea conflicts are normal.', marks: 2 },
      { id: 'r2', label: 'Manage conflict constructively', detail: 'Distinguishes task conflict (useful) from relationship conflict (harmful) and channels disagreement toward ideas, not personalities.', marks: 2 },
      { id: 'r3', label: 'Move toward norming', detail: 'Clarifies roles and goals, and helps the team agree shared norms/ways of working.', marks: 2 },
      { id: 'r4', label: 'Build cohesion and trust', detail: 'Takes steps to build trust and cohesion so members cooperate and the team can reach performing.', marks: 2 },
    ],
    modelAnswer:
      'I would first recognise where the team is. A newly formed team arguing over roles and approaches is in the storming stage of Tuckman’s model. Storming is normal and even necessary - it is where members work out differences - so I would not panic or crack down on all disagreement, but I would manage it actively so the team does not get stuck.\n\n' +
      'My next focus would be to manage the conflict constructively. I would distinguish task conflict from relationship conflict. Disagreement about the best approach is task conflict, which can actually improve decisions, so I would keep that debate open but focused on ideas and evidence. Personal, hostile conflict is relationship conflict, which harms teams, so I would address it directly and keep discussion on the work rather than on personalities.\n\n' +
      'To move the team toward norming, I would bring clarity. I would clarify the shared goal and each person’s role and responsibilities, since much of the arguing comes from role confusion. I would then help the team agree some norms - simple shared expectations about how decisions are made, how disagreements are handled, and how people communicate - so there is an agreed way of working.\n\n' +
      'Finally, I would build cohesion and trust: giving the team early, achievable wins, encouraging members to listen to one another, and showing fairness so people feel safe relying on each other. As trust and norms take hold, the team should settle into norming and then into performing, where it can focus its energy on the task with far less friction.',
  },
  {
    id: 'lddr-018',
    topic: 'teamBuilding',
    drillKind: 'reflect',
    type: 'drill',
    prompt:
      'Think of a team you have been part of (at work, school, or elsewhere). Reflect on how it developed through Tuckman’s stages, and draw one lesson you would apply as a leader of a future team.',
    marks: 6,
    rubric: [
      { id: 'r1', label: 'Describes the team', detail: 'Briefly and clearly describes a real team, its purpose, and your role in it.', marks: 2 },
      { id: 'r2', label: 'Maps it to Tuckman’s stages', detail: 'Relates the team’s experience to at least some of Tuckman’s stages (forming/storming/norming/performing), with specifics.', marks: 2 },
      { id: 'r3', label: 'Lesson for leading', detail: 'Draws a concrete, sensible lesson about leading teams from the reflection.', marks: 2 },
    ],
    modelAnswer:
      'A team I was part of was a four-person group project at university, tasked with designing and presenting a small engineering solution over one semester. I was one of the members and later took on coordinating our meetings.\n\n' +
      'Looking back, the team moved through Tuckman’s stages fairly clearly. In the forming stage, we were polite and a little cautious; we were unsure of each other’s strengths and no one wanted to step on toes, so early meetings were friendly but not very productive. Storming arrived when deadlines loomed: we disagreed about the design approach and about who should do what, and a couple of tense exchanges followed as stronger personalities pushed their ideas. Once we talked openly and agreed on roles - who would handle design, calculations, writing, and the presentation - we reached norming: we settled into a rhythm, trusted each other more, and set simple expectations about meeting times and sharing work. By the final weeks we were performing, working efficiently and supporting one another to finish strongly. When the project ended, we effectively adjourned.\n\n' +
      'The main lesson I would apply as a future leader is not to fear the storming stage or try to suppress all conflict, but to move the team through it quickly by clarifying roles and goals early. Much of our friction came from unclear responsibilities; had we agreed roles and norms sooner, we would have reached productive teamwork faster and with less stress. As a leader, I would set that clarity up front and treat honest, task-focused disagreement as a normal part of a team finding its feet.',
  },
  // ---------------------------------------------------------------------
  // emotionalIntelligence
  // ---------------------------------------------------------------------
  {
    id: 'lddr-019',
    topic: 'emotionalIntelligence',
    drillKind: 'defineTerms',
    type: 'drill',
    prompt:
      'Define Goleman’s five components of emotional intelligence - self-awareness, self-regulation, motivation, empathy, and social skills - and give a one-line example of each in a leader.',
    marks: 10,
    rubric: [
      { id: 'r1', label: 'Self-awareness', detail: 'Recognising your own emotions and how they affect your behaviour; example given.', marks: 2 },
      { id: 'r2', label: 'Self-regulation', detail: 'Managing and controlling your emotions and impulses rather than being ruled by them; example given.', marks: 2 },
      { id: 'r3', label: 'Motivation', detail: 'An inner drive to achieve beyond external rewards; example given.', marks: 2 },
      { id: 'r4', label: 'Empathy', detail: 'Sensing and understanding others’ emotions and perspectives; example given.', marks: 2 },
      { id: 'r5', label: 'Social skills', detail: 'Managing relationships well - rapport, communication, conflict handling; example given.', marks: 2 },
    ],
    modelAnswer:
      'Emotional intelligence (EI) is the ability to recognise, understand, and manage emotions in oneself and others. Goleman describes it through five components.\n\n' +
      'Self-awareness is recognising your own emotions as they arise and understanding how they affect your thinking and behaviour. Example: a leader notices they are becoming frustrated in a meeting and realises it could sharpen their tone, so they take care.\n\n' +
      'Self-regulation is managing and controlling those emotions and impulses instead of being ruled by them - staying calm and thinking before acting. Example: provoked by a rude email, the leader pauses and replies calmly the next morning rather than firing back.\n\n' +
      'Motivation, in Goleman’s sense, is an inner drive to achieve for the satisfaction of achievement and growth, beyond external rewards like money or status. Example: a leader pushes to improve a process simply because they care about doing excellent work.\n\n' +
      'Empathy is sensing and understanding what others are feeling and seeing things from their point of view. Example: a leader notices a team member seems withdrawn and quietly checks in to see how they can help.\n\n' +
      'Social skills are the abilities used to manage relationships well - building rapport, communicating clearly, influencing, and handling conflict. Example: a leader helps two colleagues resolve a dispute and restores cooperation between them.\n\n' +
      'Together these five components explain why EI matters so much in leadership, which is largely about managing oneself and one’s relationships with people. Goleman also argued that, unlike a fairly fixed IQ, emotional intelligence can be developed with reflection and practice.',
  },
  {
    id: 'lddr-020',
    topic: 'emotionalIntelligence',
    drillKind: 'applyScenario',
    type: 'drill',
    prompt:
      'Two of your team members have a heated disagreement in front of others, and you feel your own temper rising. Explain how you would use emotional intelligence - drawing on at least three of Goleman’s components - to handle the situation well.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Self-awareness and self-regulation', detail: 'Notices own rising temper (self-awareness) and manages it, staying calm rather than reacting (self-regulation).', marks: 2 },
      { id: 'r2', label: 'Empathy', detail: 'Seeks to understand both members’ feelings and viewpoints rather than taking sides prematurely.', marks: 2 },
      { id: 'r3', label: 'Social skills', detail: 'Uses relationship and communication skills to de-escalate, perhaps moving the discussion to private, and to resolve the conflict.', marks: 2 },
      { id: 'r4', label: 'Sound outcome and why EI mattered', detail: 'Reaches a constructive resolution and explains that EI prevented a worse outcome and protected trust/morale.', marks: 2 },
    ],
    modelAnswer:
      'I would handle this by consciously using several components of emotional intelligence, starting with myself. First, self-awareness: I notice my own temper rising and recognise that, if I let it show, I could make things worse and lose the team’s respect. Then self-regulation: I manage that impulse, keep my voice calm and steady, and avoid reacting sharply. Modelling composure also helps lower the temperature in the room.\n\n' +
      'Next, I would use empathy. Rather than taking sides immediately, I would try to understand what each person is feeling and why - both may feel unheard, under pressure, or disrespected. Understanding their perspectives (without necessarily agreeing with either) lets me respond to the real issue rather than just the shouting.\n\n' +
      'Then I would draw on social skills to manage the situation. Because the argument is in front of others, I would de-escalate first - calmly pausing the exchange and moving the discussion somewhere private, so no one is humiliated. In private, I would let each person explain their view, keep the focus on the problem rather than personalities, and guide them toward a fair resolution or compromise, restoring cooperation.\n\n' +
      'A good outcome would be that both feel heard, the immediate tension cools, and the two can work together again. Emotional intelligence mattered because it prevented a worse outcome: had I reacted with my own anger or embarrassed them publicly, I would have damaged trust and morale across the whole team. Managing my emotions and understanding theirs is what turned a flare-up into a chance to strengthen the team.',
  },
  {
    id: 'lddr-021',
    topic: 'emotionalIntelligence',
    drillKind: 'reflect',
    type: 'drill',
    prompt:
      'Reflect on your own emotional intelligence. Identify one component (from Goleman’s five) that is a strength for you and one that is a development area, and describe how you would strengthen the weaker one.',
    marks: 6,
    rubric: [
      { id: 'r1', label: 'A genuine EI strength', detail: 'Names one of Goleman’s five components as a personal strength, with a brief honest example.', marks: 2 },
      { id: 'r2', label: 'A genuine development area', detail: 'Names a different component as a development area, with honest self-awareness.', marks: 2 },
      { id: 'r3', label: 'How to strengthen it', detail: 'Gives concrete, realistic actions to develop the weaker component (e.g. practice, feedback, specific techniques).', marks: 2 },
    ],
    modelAnswer:
      'Reflecting honestly on Goleman’s five components, I think empathy is a strength for me. I tend to notice when someone is quiet or under strain and to consider how a situation looks from their side, which helps me respond to people rather than just to tasks. For example, in group work I usually sense when a teammate is overloaded and offer to rebalance the work.\n\n' +
      'My clearest development area is self-regulation. When I am under time pressure or feel criticised, I can react too quickly - a sharp reply or visible frustration - before I have thought it through. My self-awareness is reasonable, so I often notice the emotion, but I do not always manage it well in the moment.\n\n' +
      'To strengthen self-regulation, I would use a few concrete techniques. The simplest is to build in a pause: when I feel a strong reaction, I would give myself a short delay before responding - waiting a few seconds in conversation, or sleeping on a heated email before replying. I would also try to identify my triggers in advance so I can prepare for them, and practise calming habits such as slow breathing when tension rises. Finally, I would ask a trusted colleague or mentor for honest feedback on how I come across under pressure, and treat setbacks as practice rather than failure. Because emotional intelligence can be developed with reflection and repetition, I expect that consistently pausing and seeking feedback would, over time, make measured responses more automatic.',
  },
  // ---------------------------------------------------------------------
  // development
  // ---------------------------------------------------------------------
  {
    id: 'lddr-022',
    topic: 'development',
    drillKind: 'compare',
    type: 'drill',
    prompt:
      'Compare mentoring and coaching as methods of developing people. Describe each, explain the main differences, and say when a leader would choose one over the other.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Mentoring described', detail: 'A more experienced person guiding a less experienced one over a longer term, giving broad career and personal guidance.', marks: 2 },
      { id: 'r2', label: 'Coaching described', detail: 'A focused, often shorter-term process aimed at specific skills or performance, often helping the person find their own solutions.', marks: 2 },
      { id: 'r3', label: 'Main differences', detail: 'Mentoring is broader, relationship-based, and longer-term; coaching is narrower, skill/performance-focused, and usually shorter-term.', marks: 2 },
      { id: 'r4', label: 'When to use each', detail: 'Coaching for a specific skill or performance gap; mentoring for broader career growth and guidance over time.', marks: 2 },
    ],
    modelAnswer:
      'Mentoring and coaching are both ways of developing people, and they overlap, but they differ in scope and purpose.\n\n' +
      'Mentoring pairs a more experienced person (the mentor) with a less experienced one (the mentee), usually over a longer period. The mentor offers broad guidance - on career direction, navigating the organisation, and personal growth - sharing hard-won experience and sometimes opening opportunities. It is a relationship built on trust, and its aim is the mentee’s overall development, not a single skill.\n\n' +
      'Coaching is typically more focused and often shorter-term. It targets specific skills or performance - say, improving someone’s presentation skills or helping them handle delegation. A good coach tends to work by asking questions that help the person think through the problem and find their own solutions, rather than simply handing over answers, which builds lasting capability.\n\n' +
      'The main differences follow from this. Mentoring is broad, relationship-based, and long-term, concerned with the whole person and their career; coaching is narrower, skill- or performance-based, and usually shorter-term, concerned with a particular goal. A mentor draws heavily on their own experience; a coach draws out the other person’s thinking.\n\n' +
      'A leader chooses between them according to the need. If a team member has a specific skill or performance gap to close, coaching is the better fit - focused, practical, and time-bound. If someone shows potential and needs broader guidance to grow over time and progress in their career, mentoring is more appropriate. In practice the two are complementary, and a leader may arrange both for the same person.',
  },
  {
    id: 'lddr-023',
    topic: 'development',
    drillKind: 'applyScenario',
    type: 'drill',
    prompt:
      'A talented engineer has just been promoted to supervise a team but is weak at communication and reluctant to delegate. Design a practical development plan for their first six months, using a mix of development methods, and say how you would measure progress.',
    marks: 9,
    rubric: [
      { id: 'r1', label: 'Assess needs and set goals', detail: 'Starts by assessing the gaps (e.g. via feedback such as 360-degree feedback) and setting clear development goals for communication and delegation.', marks: 2 },
      { id: 'r2', label: 'Formal training', detail: 'Includes structured training/workshops on communication and on delegation/supervision skills.', marks: 2 },
      { id: 'r3', label: 'Experiential + mentoring/coaching', detail: 'Adds on-the-job development - delegating real tasks, stretch assignments - plus a mentor or coach for support.', marks: 3 },
      { id: 'r4', label: 'Measure progress', detail: 'Explains how progress will be reviewed and measured (follow-up feedback, check-ins, observable behaviour change, team results).', marks: 2 },
    ],
    modelAnswer:
      'I would build a six-month plan that combines several development methods and starts from a clear picture of the gaps.\n\n' +
      'First, assess needs and set goals. I would gather feedback - ideally 360-degree feedback from the new supervisor’s manager, peers, and team - to pin down exactly how the communication and delegation weaknesses show up. From that I would agree two or three specific, measurable goals with them, such as running clear weekly team briefings and delegating a defined share of their technical tasks.\n\n' +
      'Second, formal training. I would enrol them in structured workshops on communication skills (active listening, giving instructions, feedback) and on supervision and delegation, giving them the underlying knowledge in a planned setting.\n\n' +
      'Third, and most important, experiential learning with support. Knowledge only sticks when practised, so I would have them deliberately delegate real tasks to team members and take on a stretch assignment that forces them to communicate and rely on others. Delegation itself develops both them and their team. Alongside this, I would pair them with a mentor - an experienced supervisor for broad guidance - and possibly a coach to work on the specific communication skills, helping them reflect and adjust.\n\n' +
      'Finally, measure progress. I would hold regular check-ins to review how it is going, repeat the feedback survey near the six-month mark to see whether others notice a change, and look at observable evidence: is the person delegating more, are briefings clearer, is the team’s workload better shared and its performance steady? Comparing the later feedback and behaviour against the starting point shows whether the plan is working, so it can be adjusted.',
  },
  {
    id: 'lddr-024',
    topic: 'development',
    drillKind: 'reflect',
    type: 'drill',
    prompt:
      'Reflect on your own leadership development. Identify one leadership strength you already have and one development goal, then outline concrete actions you would take and how you would know you are making progress.',
    marks: 6,
    rubric: [
      { id: 'r1', label: 'A genuine strength', detail: 'Names a real leadership strength with a brief supporting example.', marks: 2 },
      { id: 'r2', label: 'A clear development goal', detail: 'States a specific leadership development goal, honestly identified.', marks: 2 },
      { id: 'r3', label: 'Actions and measures of progress', detail: 'Gives concrete actions (training, practice, seeking feedback, a mentor) and a way to tell whether progress is being made.', marks: 2 },
    ],
    modelAnswer:
      'Reflecting on my own leadership, one strength I already have is reliability combined with a willingness to take responsibility. In group settings I am usually the person who keeps track of what needs doing and follows through, and others tend to trust me with commitments because I meet them. For example, in a recent project I volunteered to coordinate deadlines and made sure the team stayed on schedule.\n\n' +
      'A clear development goal for me is to become more confident at delegating rather than taking on too much myself. My reliability has a downside: because I want things done well, I tend to hold onto tasks I could hand over, which limits both my capacity and other people’s growth.\n\n' +
      'To work on this, I would take a few concrete actions. I would deliberately delegate specific tasks on my next project, agreeing the outcome and then stepping back rather than hovering, and treat any early mistakes as part of the learning. I would seek out short guidance on delegation - a workshop or reading - and ask a more experienced person to mentor me and give honest feedback on how I am doing. I would also reflect after each project on what I delegated and how it went.\n\n' +
      'I would know I am making progress in a few ways: I am handing over a growing share of work rather than doing it all myself; teammates are taking on more responsibility and developing; feedback from others notes that I trust the team more; and, despite delegating, our results stay strong. Because leadership can be developed with practice and feedback, I expect steady improvement if I keep at it.',
  },
];
