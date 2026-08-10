import type { LeadershipQuestion } from './leadershipTypes.ts';

// Topic: Leadership Concepts.
// Grounded in the two committed student extracts where noted (resource-allocator
// role / the 4 Ms, from leadership-assignments.txt). Remaining items are
// standard first-year leadership curriculum (French & Raven's bases of power,
// leadership-vs-management distinction, leadership as process) authored from
// general knowledge and disclosed in the build report.
export const conceptsQuestions: LeadershipQuestion[] = [
  {
    id: 'ldcon-001',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'Which statement best captures what leadership is?',
    choices: [
      'The process of influencing other people so they work willingly toward a shared goal',
      'The act of owning the largest share of a company',
      'The paperwork required to register a new business',
      'The seniority a person gains purely from years on the job',
    ],
    correctIndex: 0,
    rationale:
      'Leadership is usually defined as a process of influence - guiding and motivating others so they choose to work toward a common goal. It is about influence, not ownership, paperwork, or age.',
  },
  {
    id: 'ldcon-002',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'Which option best distinguishes leadership from management?',
    choices: [
      'Leadership and management mean exactly the same thing',
      'Leadership applies only to armies and management only to shops',
      'Leadership sets direction and inspires people; management organises resources and keeps existing systems running',
      'Management inspires people while leadership only files reports',
    ],
    correctIndex: 2,
    rationale:
      'A common distinction: leadership is about setting direction and influencing people toward a vision, while management is about planning, organising, and controlling resources to keep things running smoothly. The two overlap but are not identical.',
  },
  {
    id: 'ldcon-003',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'In the resource-allocator role of leadership, a leader is mainly responsible for distributing which four categories of resource?',
    choices: [
      'Emails, meetings, memos, and slogans',
      'People (human resources), money, materials, and time',
      'Shares, bonds, dividends, and taxes',
      'Slogans, logos, uniforms, and posters',
    ],
    correctIndex: 1,
    rationale:
      'The resource-allocator role covers the "4 Ms": Man (people), Money, Materials, and Time. How a leader shares out these four resources largely decides whether the organisation reaches its goals.',
  },
  {
    id: 'ldcon-004',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'A manager assigns underqualified staff to a critical bridge-design task to save money. According to the resource-allocator view, what is the most likely result?',
    choices: [
      'Guaranteed faster completion with no downside',
      'An automatic increase in staff motivation',
      'A permanent fall in the price of building materials',
      'Project delays, safety risks, and damage to the firm’s reputation',
    ],
    correctIndex: 3,
    rationale:
      'Misallocation of human resources - putting underqualified people on critical tasks - is described as leading to delays, safety risks, and reputational damage. When assigning people, a leader has to weigh each person’s expertise, their current workload, and what motivates them.',
  },
  {
    id: 'ldcon-005',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'Referent power is a source of a leader’s influence. What is it based on?',
    choices: [
      'The leader’s ability to hand out fines and punishments',
      'The official job title printed on the leader’s door',
      'Others admiring, respecting, or identifying with the leader, so they want to follow',
      'The leader’s control of the payroll budget',
    ],
    correctIndex: 2,
    rationale:
      'Referent power (influence that comes from being admired) works because followers respect or identify with the leader and so are willing to follow. It does not depend on punishment, title, or budget.',
  },
  {
    id: 'ldcon-006',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'Which situation is the clearest example of expert power?',
    choices: [
      'Engineers follow a senior colleague’s advice because she has deep, proven technical knowledge',
      'Staff obey a manager only because he can dock their pay',
      'Workers comply because the person holds the title of director',
      'People follow someone because they find him personally likeable',
    ],
    correctIndex: 0,
    rationale:
      'Expert power (influence that comes from knowledge or skill) is at work when people follow someone because of their proven expertise. Punishment is coercive power, title is legitimate power, and likeability is referent power.',
  },
  {
    id: 'ldcon-007',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'A leader relies on the threat of penalties and demotions to get compliance. Which base of power is this?',
    choices: [
      'Reward power',
      'Coercive power',
      'Expert power',
      'Referent power',
    ],
    correctIndex: 1,
    rationale:
      'Coercive power (influence through the ability to punish) uses threats of penalties, demotions, or other unpleasant outcomes to force compliance. Overusing it tends to breed fear and resentment.',
  },
  {
    id: 'ldcon-008',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'What is legitimate power?',
    choices: [
      'Influence that comes only from being liked by others',
      'Influence that comes from special technical skill',
      'Influence that comes from the ability to give bonuses',
      'Influence that comes from a person’s formal position or title in the organisation',
    ],
    correctIndex: 3,
    rationale:
      'Legitimate power (also called positional power) is the authority that comes with a formal role or title - for example, a supervisor can give instructions because the organisation has placed them in that position.',
  },
  {
    id: 'ldcon-009',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'Reward power is best described as a leader’s ability to:',
    choices: [
      'Punish followers with fines and suspensions',
      'Rely on a job title alone to gain obedience',
      'Give followers things they value, such as pay rises, praise, or promotions',
      'Draw on personal charm to win people over',
    ],
    correctIndex: 2,
    rationale:
      'Reward power (influence through the ability to give benefits) works by offering things people want - money, recognition, or promotion - in exchange for cooperation.',
  },
  {
    id: 'ldcon-010',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'An employee with no official title still strongly shapes how her teammates work and think. What is she best described as?',
    choices: [
      'A legitimate authority only',
      'An informal leader',
      'A passive follower',
      'A resource that cannot lead',
    ],
    correctIndex: 1,
    rationale:
      'An informal leader influences others without holding an official position of authority. This shows leadership is about influence, not just job titles.',
  },
  {
    id: 'ldcon-011',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'Saying that "leadership is a process, not a position" mainly means that:',
    choices: [
      'Leadership is something a person does by influencing others, which can happen with or without a title',
      'Only people with the title of "leader" can ever influence a group',
      'Leadership is a one-time event that never changes',
      'Leadership is purely about signing documents',
    ],
    correctIndex: 0,
    rationale:
      'Viewing leadership as a process highlights the ongoing act of influencing others toward a goal - it can be exercised by anyone who influences the group, not only by whoever holds the top title.',
  },
  {
    id: 'ldcon-012',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'Why are followers considered essential to leadership?',
    choices: [
      'Followers pay the leader’s salary directly',
      'Followers are only there to be punished',
      'Leadership can exist fully with no other people involved',
      'Leadership is an influence relationship, so there must be people who choose to be influenced',
    ],
    correctIndex: 3,
    rationale:
      'Leadership is a relationship of influence between a leader and followers. Without followers - people who respond to the influence - there is no one to lead, so leadership cannot occur.',
  },
  {
    id: 'ldcon-013',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'In leadership, a "vision" refers to:',
    choices: [
      'The eyesight test required before a promotion',
      'The company’s tax return for the year',
      'A clear, appealing picture of a desired future that the leader communicates to guide the group',
      'A daily to-do list of small tasks',
    ],
    correctIndex: 2,
    rationale:
      'A vision is a clear and motivating picture of where the group is heading - the desired future the leader paints so that people understand and commit to the direction.',
  },
  {
    id: 'ldcon-014',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'A well-known saying is that "managers do things right, while leaders do the right things." What point is it making?',
    choices: [
      'Managers are always wrong and leaders are always right',
      'Management focuses on efficient execution, while leadership focuses on choosing the right direction',
      'Leaders never need to worry about getting details correct',
      'There is no real difference between the two roles',
    ],
    correctIndex: 1,
    rationale:
      'The saying contrasts efficiency (management: carrying out tasks correctly) with effectiveness of direction (leadership: deciding which goals are worth pursuing). Both matter, but they emphasise different things.',
  },
  {
    id: 'ldcon-015',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'Which of these is the best example of the difference between authority and influence?',
    choices: [
      'Authority and influence are identical and interchangeable',
      'Only junior staff can ever have influence',
      'Influence always requires a formal title',
      'A supervisor can order a task (authority), but a respected colleague can persuade the team to embrace it (influence)',
    ],
    correctIndex: 3,
    rationale:
      'Authority is the formal right to give orders that comes with a position; influence is the ability to affect others’ behaviour or attitudes, which can exist with or without formal authority.',
  },
  {
    id: 'ldcon-016',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'The resource-allocator view calls time "perhaps the most sensitive resource." Rushing a project to meet an unrealistic deadline most likely leads to:',
    choices: [
      'Guaranteed higher quality',
      'Lower costs with no risks',
      'Poor workmanship and safety hazards',
      'An automatic boost to staff morale',
    ],
    correctIndex: 2,
    rationale:
      'Time misallocation - squeezing phases such as testing to hit an unrealistic deadline - is linked to poor workmanship, safety hazards, and staff burnout. Leaders must balance urgency with quality.',
  },
  {
    id: 'ldcon-017',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'According to the resource-allocator role, underfunding maintenance or quality assurance (money misallocation) can lead to:',
    choices: [
      'Equipment breakdowns and client dissatisfaction',
      'Permanently faster projects',
      'Automatic gains in reputation',
      'No consequences at all',
    ],
    correctIndex: 0,
    rationale:
      'Financial misallocation, such as starving maintenance or quality assurance of funds, is described as causing equipment breakdowns, client dissatisfaction, and long-term costs. Leaders must budget prudently for both immediate needs and long-term investment.',
  },
  {
    id: 'ldcon-018',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'In allocating materials for a bridge, using certified steel instead of a cheaper substitute mainly protects:',
    choices: [
      'Only the colour of the finished structure',
      'Safety, durability, and compliance with standards',
      'The size of the marketing budget',
      'The number of meetings held each week',
    ],
    correctIndex: 1,
    rationale:
      'Allocating high-quality materials to critical infrastructure guarantees safety and longevity, whereas cheaper alternatives may compromise structural integrity. Good material allocation needs foresight and strict quality standards.',
  },
  {
    id: 'ldcon-019',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'Which action best reflects sound allocation of human resources on an engineering project?',
    choices: [
      'Assigning tasks at random regardless of skill',
      'Giving the most critical task to whoever is cheapest',
      'Leaving all roles unfilled to save money',
      'Matching experienced structural engineers to design work and skilled technicians to execution',
    ],
    correctIndex: 3,
    rationale:
      'Good human-resource allocation assigns the right people to the right tasks - experienced engineers to design, skilled technicians to execution - which ensures efficiency and quality and prevents costly errors.',
  },
  {
    id: 'ldcon-020',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'The resource-allocator role concludes that leaders should approach allocation with "strategic foresight, fairness, and accountability." Accountability here means:',
    choices: [
      'Avoiding any record of decisions',
      'Being answerable for how resources are distributed and for the results',
      'Blaming staff for every outcome',
      'Spending as little time as possible on decisions',
    ],
    correctIndex: 1,
    rationale:
      'Accountability means the leader takes responsibility for allocation choices and their consequences. Combined with foresight and fairness, it helps ensure resources are used in ways that serve the organisation.',
  },
  {
    id: 'ldcon-021',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'Which pair correctly matches a base of power with its source?',
    choices: [
      'Legitimate power - the formal position; Expert power - special knowledge',
      'Legitimate power - special knowledge; Expert power - the formal position',
      'Reward power - the ability to punish; Coercive power - the ability to give benefits',
      'Referent power - the job title; Legitimate power - being admired',
    ],
    correctIndex: 0,
    rationale:
      'Legitimate power comes from formal position; expert power from knowledge or skill; reward power from the ability to give benefits; coercive power from the ability to punish; referent power from being respected or admired.',
  },
  {
    id: 'ldcon-022',
    topic: 'concepts',
    type: 'mcq',
    prompt: 'Holding a lot of power does not automatically make someone a good leader because:',
    choices: [
      'Power and leadership are completely unrelated ideas',
      'Good leadership depends on how power is used to influence and serve others, not just on having it',
      'Only powerless people can lead',
      'Power always guarantees followers’ trust',
    ],
    correctIndex: 1,
    rationale:
      'Power is the capacity to influence, but leadership quality depends on how that power is exercised - fairly, toward shared goals, and in ways that build trust. Power misused can destroy rather than build a following.',
  },
  {
    id: 'ldcon-023',
    topic: 'concepts',
    type: 'tf',
    prompt: 'Leadership can be exercised by a person who holds no official management title.',
    correctAnswer: true,
    rationale:
      'True. Because leadership is about influencing others toward a goal, an informal leader without a title can still lead - leadership is a process, not merely a position.',
  },
  {
    id: 'ldcon-024',
    topic: 'concepts',
    type: 'tf',
    prompt: 'Leadership and management are exactly the same thing, with no meaningful difference.',
    correctAnswer: false,
    rationale:
      'False. They overlap but differ: leadership sets direction and influences people toward a vision, while management plans, organises, and controls resources to keep systems running.',
  },
  {
    id: 'ldcon-025',
    topic: 'concepts',
    type: 'tf',
    prompt: 'In the resource-allocator role, time is treated as a resource to be distributed carefully, not only money and materials.',
    correctAnswer: true,
    rationale:
      'True. The 4 Ms include time, described as perhaps the most sensitive resource - leaders must spread it realistically across planning, execution, and evaluation.',
  },
  {
    id: 'ldcon-026',
    topic: 'concepts',
    type: 'tf',
    prompt: 'Referent power comes from the formal job title a leader holds.',
    correctAnswer: false,
    rationale:
      'False. Referent power comes from being respected, admired, or identified with. Power that comes from a formal title is legitimate (positional) power.',
  },
  {
    id: 'ldcon-027',
    topic: 'concepts',
    type: 'tf',
    prompt: 'Expert power is based on a leader’s special knowledge or skill.',
    correctAnswer: true,
    rationale:
      'True. Expert power is the influence a person gains when others follow their guidance because of proven knowledge or technical skill.',
  },
  {
    id: 'ldcon-028',
    topic: 'concepts',
    type: 'tf',
    prompt: 'A person can be a leader even if no one at all follows or responds to them.',
    correctAnswer: false,
    rationale:
      'False. Leadership is a relationship of influence, so it requires followers - people who respond to the leader. With no followers there is no one to lead.',
  },
  {
    id: 'ldcon-029',
    topic: 'concepts',
    type: 'tf',
    prompt: 'Misallocating human resources, such as placing underqualified staff on critical tasks, can cause project delays and safety risks.',
    correctAnswer: true,
    rationale:
      'True. Assigning the wrong people to critical work is described as leading to delays, safety risks, and reputational damage, which is why leaders must match expertise to the task.',
  },
  {
    id: 'ldcon-030',
    topic: 'concepts',
    type: 'tf',
    prompt: 'Coercive power is the ability to give followers rewards and benefits.',
    correctAnswer: false,
    rationale:
      'False. Coercive power is the ability to punish (threaten penalties). The ability to give rewards and benefits is reward power.',
  },
];
