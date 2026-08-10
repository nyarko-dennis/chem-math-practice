import type { LeadershipQuestion } from './leadershipTypes.ts';

// Topic: Team Building.
// Standard curriculum: team vs group, Tuckman's stages of development, team
// roles (Belbin), cohesion, conflict and its resolution styles, and delegation.
// No dedicated deck was provided; authored from general knowledge and disclosed
// in the build report.
export const teamBuildingQuestions: LeadershipQuestion[] = [
  {
    id: 'ldtem-001',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'What mainly distinguishes a team from a mere group of people?',
    choices: [
      'A team shares a common goal and holds mutual accountability for the result',
      'A team is always larger than a group',
      'A team never has a leader',
      'A team members never talk to each other',
    ],
    correctIndex: 0,
    rationale:
      'A team is more than people sharing a space: members work toward a common goal and are mutually accountable - they depend on and answer to one another for the shared result.',
  },
  {
    id: 'ldtem-002',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'In Tuckman’s model of team development, what happens in the "forming" stage?',
    choices: [
      'The team is at peak productivity',
      'Members meet, are polite, and get oriented to the task and each other',
      'The team disbands',
      'Members openly clash over roles',
    ],
    correctIndex: 1,
    rationale:
      'Forming is the first stage: members come together, are usually polite and tentative, and orient themselves to the task, the leader, and one another.',
  },
  {
    id: 'ldtem-003',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'In Tuckman’s model, the "storming" stage is characterised by:',
    choices: [
      'Smooth, effortless cooperation',
      'The team formally ending',
      'Conflict and tension as members jostle over roles, ideas, and influence',
      'Members not yet having met',
    ],
    correctIndex: 2,
    rationale:
      'Storming is the stage of friction: differences in ideas, working styles, and bids for influence surface as conflict. Handled well, the team works through it toward agreed ways of operating.',
  },
  {
    id: 'ldtem-004',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'In Tuckman’s model, the "norming" stage is when:',
    choices: [
      'The team first meets',
      'Conflict is at its worst',
      'The team permanently breaks up',
      'Shared norms and cohesion develop and roles settle',
    ],
    correctIndex: 3,
    rationale:
      'Norming follows storming: the team agrees on shared expectations (norms), roles settle, trust and cohesion grow, and members start pulling together.',
  },
  {
    id: 'ldtem-005',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'In Tuckman’s model, the "performing" stage is when:',
    choices: [
      'The team works effectively and productively toward its goal',
      'Members have just been introduced',
      'The team argues constantly',
      'No work is possible',
    ],
    correctIndex: 0,
    rationale:
      'Performing is the mature stage: with roles clear and trust established, the team channels its energy into the task and produces results with less need for supervision.',
  },
  {
    id: 'ldtem-006',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'The "adjourning" stage in Tuckman’s model refers to:',
    choices: [
      'The team’s first meeting',
      'The team completing its work and disbanding',
      'The team’s biggest argument',
      'A permanent freeze on all decisions',
    ],
    correctIndex: 1,
    rationale:
      'Adjourning (added later to the model) is when a temporary team wraps up its task and disbands, often with a sense of closure and reflection on what was achieved.',
  },
  {
    id: 'ldtem-007',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'What is the correct order of Tuckman’s first four stages?',
    choices: [
      'Norming, performing, forming, storming',
      'Storming, forming, performing, norming',
      'Forming, storming, norming, performing',
      'Performing, norming, storming, forming',
    ],
    correctIndex: 2,
    rationale:
      'The stages run forming → storming → norming → performing (with adjourning added at the end for temporary teams). The rhyme "form, storm, norm, perform" helps recall the order.',
  },
  {
    id: 'ldtem-008',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'Belbin’s work on team roles suggests that effective teams need:',
    choices: [
      'Everyone to play exactly the same role',
      'No roles at all',
      'Only one very strong leader and no one else',
      'A balance of different, complementary roles',
    ],
    correctIndex: 3,
    rationale:
      'Belbin found that balanced teams include a mix of complementary roles - such as idea generators, coordinators, and implementers - so the team’s strengths cover one another’s gaps.',
  },
  {
    id: 'ldtem-009',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'Team "cohesion" refers to:',
    choices: [
      'How strongly members are attracted to the team and want to stay part of it',
      'The number of desks in the office',
      'The team’s annual budget',
      'How far apart members sit',
    ],
    correctIndex: 0,
    rationale:
      'Cohesion is the strength of the bonds that hold a team together - how much members value belonging and want to remain in the team. It generally supports morale and cooperation.',
  },
  {
    id: 'ldtem-010',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'A possible downside of very high team cohesion is that it can:',
    choices: [
      'Make communication impossible',
      'Encourage groupthink, where members suppress dissent to preserve harmony',
      'Guarantee poor morale',
      'Prevent members from ever agreeing',
    ],
    correctIndex: 1,
    rationale:
      'Very tight-knit teams may value agreement so much that members hold back criticism, sliding into groupthink. Some openness to challenge keeps a cohesive team from deciding poorly.',
  },
  {
    id: 'ldtem-011',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'Which statement about conflict in teams is most accurate?',
    choices: [
      'All conflict is always destructive',
      'Conflict never affects performance',
      'Constructive conflict over ideas and tasks can actually improve decisions',
      'Conflict only occurs in bad teams',
    ],
    correctIndex: 2,
    rationale:
      'Task (constructive) conflict - respectful disagreement about ideas and approaches - can surface better options and sharpen decisions. It is relationship conflict (personal hostility) that tends to harm teams.',
  },
  {
    id: 'ldtem-012',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'Which of the following is a type of conflict that usually harms a team?',
    choices: [
      'Respectful debate about the best method',
      'Comparing two designs on their merits',
      'Questioning an assumption politely',
      'Personal hostility and dislike between members (relationship conflict)',
    ],
    correctIndex: 3,
    rationale:
      'Relationship conflict - personal friction, hostility, or dislike - drains energy and trust and generally hurts performance, unlike task-focused disagreement that can be productive.',
  },
  {
    id: 'ldtem-013',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'Which is a common source of conflict within teams?',
    choices: [
      'Competition over limited resources such as budget, time, or equipment',
      'Everyone agreeing on everything',
      'Having a clear shared goal',
      'Plentiful resources for all',
    ],
    correctIndex: 0,
    rationale:
      'Conflict often arises when members compete for scarce resources - budget, time, staff, or equipment - as well as from differing goals, values, or personalities.',
  },
  {
    id: 'ldtem-014',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'The "collaborating" approach to conflict aims to:',
    choices: [
      'Let the loudest person win',
      'Find a win-win solution that satisfies the genuine needs of both sides',
      'Avoid the issue entirely',
      'Give in completely to keep the peace',
    ],
    correctIndex: 1,
    rationale:
      'Collaborating (problem-solving) works to understand both sides’ underlying needs and craft a solution that meets them - aiming for a genuine win-win rather than one side losing.',
  },
  {
    id: 'ldtem-015',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'The "compromising" approach to conflict means:',
    choices: [
      'One side gets everything it wants',
      'Both sides refuse to move',
      'Each side gives up something to reach an acceptable middle ground',
      'The conflict is ignored forever',
    ],
    correctIndex: 2,
    rationale:
      'Compromise splits the difference: each party concedes something so both gain part of what they wanted. It is quicker than full collaboration but may not fully satisfy either side.',
  },
  {
    id: 'ldtem-016',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'A drawback of the "avoiding" approach to conflict is that it:',
    choices: [
      'Always solves the problem instantly',
      'Forces an immediate win-win',
      'Requires too much discussion',
      'Can leave the underlying issue unresolved, so it resurfaces later',
    ],
    correctIndex: 3,
    rationale:
      'Avoiding sidesteps the conflict rather than settling it. While useful to cool tempers briefly, relying on it leaves the real issue unaddressed, so it tends to return, often larger.',
  },
  {
    id: 'ldtem-017',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'Delegation is best defined as:',
    choices: [
      'Assigning tasks - and the authority to do them - to team members',
      'Doing every task yourself',
      'Refusing to give anyone responsibility',
      'Firing team members',
    ],
    correctIndex: 0,
    rationale:
      'Delegation means entrusting a task, along with enough authority to carry it out, to a team member - freeing the leader’s time and developing the person given the work.',
  },
  {
    id: 'ldtem-018',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'When a leader delegates a task, what happens to their accountability for the result?',
    choices: [
      'It disappears entirely',
      'The leader remains ultimately accountable for the outcome',
      'It transfers fully to the customer',
      'It is cancelled by the delegation',
    ],
    correctIndex: 1,
    rationale:
      'A leader can delegate a task and authority, but they stay ultimately accountable for the result. Delegation shares the work, not the leader’s final responsibility for it.',
  },
  {
    id: 'ldtem-019',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'Which is a genuine benefit of delegation?',
    choices: [
      'It guarantees no mistakes',
      'It removes the leader’s responsibility',
      'It frees the leader’s time and develops team members’ skills',
      'It stops the team from ever growing',
    ],
    correctIndex: 2,
    rationale:
      'Delegation lets the leader focus on higher-level work while giving team members the chance to build skills and confidence, strengthening the whole team over time.',
  },
  {
    id: 'ldtem-020',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: '"Synergy" in a team means that:',
    choices: [
      'Members work in complete isolation',
      'The team always underperforms',
      'Only the leader’s effort counts',
      'The combined result is greater than the sum of members’ individual efforts',
    ],
    correctIndex: 3,
    rationale:
      'Synergy is the "1 + 1 = 3" effect: by combining complementary strengths and cooperating, a team can achieve more together than the members could achieve separately.',
  },
  {
    id: 'ldtem-021',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'Team "norms" are:',
    choices: [
      'Shared, often unwritten expectations about how members should behave',
      'The company’s official legal contracts',
      'The seating plan of the office',
      'The team’s bank balance',
    ],
    correctIndex: 0,
    rationale:
      'Norms are the informal, usually unwritten rules a team develops about acceptable behaviour - such as being on time or how disagreements are handled - that guide how members act.',
  },
  {
    id: 'ldtem-022',
    topic: 'teamBuilding',
    type: 'mcq',
    prompt: 'Why is trust often called the foundation of effective teamwork?',
    choices: [
      'Because it lets the leader avoid the team',
      'Because it allows members to rely on one another and share ideas openly',
      'Because it removes the need for any goals',
      'Because it guarantees profit',
    ],
    correctIndex: 1,
    rationale:
      'When members trust one another, they can depend on each other, admit mistakes, ask for help, and speak openly - all of which are needed for a team to cooperate and perform.',
  },
  {
    id: 'ldtem-023',
    topic: 'teamBuilding',
    type: 'tf',
    prompt: 'In Tuckman’s model, the "storming" stage typically involves conflict as members work out roles and differences.',
    correctAnswer: true,
    rationale:
      'True. Storming is the stage where disagreements and competition over roles and ideas surface; working through it leads to the shared norms of the next stage.',
  },
  {
    id: 'ldtem-024',
    topic: 'teamBuilding',
    type: 'tf',
    prompt: 'A team and a random group of people who happen to be together are exactly the same thing.',
    correctAnswer: false,
    rationale:
      'False. A team is bound by a shared goal and mutual accountability, whereas a random group may share only a location without any common purpose or interdependence.',
  },
  {
    id: 'ldtem-025',
    topic: 'teamBuilding',
    type: 'tf',
    prompt: 'Delegating a task does not remove the leader’s ultimate accountability for the result.',
    correctAnswer: true,
    rationale:
      'True. A leader can hand over a task and the authority to do it, but remains ultimately answerable for the outcome.',
  },
  {
    id: 'ldtem-026',
    topic: 'teamBuilding',
    type: 'tf',
    prompt: 'All conflict within a team is harmful and should always be eliminated completely.',
    correctAnswer: false,
    rationale:
      'False. Constructive, task-focused conflict can improve decisions. It is personal (relationship) conflict that harms teams; the goal is to manage conflict, not eliminate all of it.',
  },
  {
    id: 'ldtem-027',
    topic: 'teamBuilding',
    type: 'tf',
    prompt: 'Very high team cohesion can raise the risk of groupthink.',
    correctAnswer: true,
    rationale:
      'True. In highly cohesive teams the wish to preserve harmony can discourage members from voicing dissent, making groupthink more likely.',
  },
  {
    id: 'ldtem-028',
    topic: 'teamBuilding',
    type: 'tf',
    prompt: 'In Tuckman’s model, "performing" comes before "forming".',
    correctAnswer: false,
    rationale:
      'False. The order is forming, storming, norming, then performing - forming is first and performing is later.',
  },
  {
    id: 'ldtem-029',
    topic: 'teamBuilding',
    type: 'tf',
    prompt: 'Synergy means a team’s combined result can exceed the sum of the members’ individual efforts.',
    correctAnswer: true,
    rationale:
      'True. Synergy is the extra value created when members combine complementary strengths and cooperate, producing more together than they would separately.',
  },
  {
    id: 'ldtem-030',
    topic: 'teamBuilding',
    type: 'tf',
    prompt: 'Team norms are formal written laws enforced by the courts.',
    correctAnswer: false,
    rationale:
      'False. Norms are informal, usually unwritten expectations about behaviour that a team develops itself - not legal laws enforced externally.',
  },
];
