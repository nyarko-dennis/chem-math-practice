import type { MaterialsQuestion } from './materialsTypes.ts';

export const steelProductionQuestions: MaterialsQuestion[] = [
  {
    id: 'sp-001',
    topic: 'steelProduction',
    type: 'mcq',
    prompt: 'Which three raw materials are charged into the top of a blast furnace to make pig iron?',
    choices: [
      'Iron ore, coke, and limestone',
      'Iron ore, scrap steel, and pure oxygen',
      'Coke, quicklime, and sand',
      'Iron ore, sulfur, and clay',
    ],
    correctIndex: 0,
    rationale:
      'Iron ore supplies the iron, coke is both fuel and reducing agent (a substance that strips oxygen off another), and limestone is a flux (a cleaning agent) that removes rocky impurities. Hot air is also blown in, but it is not one of the three solid materials.',
  },
  {
    id: 'sp-002',
    topic: 'steelProduction',
    type: 'mcq',
    prompt: 'What job does coke do inside a blast furnace?',
    choices: [
      'It supplies the iron atoms that end up in the pig iron',
      'It burns to supply heat and produces the gas that strips oxygen from the iron ore',
      'It cools the furnace so the iron does not overheat',
      'It hardens the finished steel after casting',
    ],
    correctIndex: 1,
    rationale:
      'Coke is a carbon-rich fuel. Burning it heats the furnace and creates carbon monoxide gas, which pulls oxygen off the iron ore (a process called reduction) so metallic iron is left behind.',
  },
  {
    id: 'sp-003',
    topic: 'steelProduction',
    type: 'mcq',
    prompt: 'What role does limestone play in a blast furnace?',
    choices: [
      'It supplies the extra carbon found in pig iron',
      'It replaces coke as the main fuel in the furnace',
      'It acts as a flux, combining with rocky impurities to form a slag that can be drained off',
      'It is the main source of iron in the charge',
    ],
    correctIndex: 2,
    rationale:
      'Limestone acts as a flux, meaning it grabs onto the sandy, rocky impurities carried in with the ore and turns them into a melted waste material called slag, which can then be drained away from the iron.',
  },
  {
    id: 'sp-004',
    topic: 'steelProduction',
    type: 'tf',
    prompt: 'Blast furnaces preheat the blast of air fed in at the bottom so the coke can burn more efficiently.',
    correctAnswer: true,
    rationale:
      'The furnace reuses heat from its own hot exhaust gases to warm the incoming air, which helps the coke (fuel) burn hot enough to drive the reactions that free the iron.',
  },
  {
    id: 'sp-005',
    topic: 'steelProduction',
    type: 'mcq',
    prompt: 'Why do blast furnaces preheat the air that is blown in at the bottom?',
    choices: [
      'It removes sulfur from the coke before it burns',
      'It stops the limestone from decomposing too early',
      'It slows the melting of the iron ore so it can be inspected',
      "It reuses waste heat from the furnace's own exhaust gases so less fuel is needed to reach reaction temperature",
    ],
    correctIndex: 3,
    rationale:
      "Preheating recycles heat that would otherwise escape up the chimney, so less coke (fuel) has to be burned to reach the temperatures the furnace's reactions need.",
  },
  {
    id: 'sp-006',
    topic: 'steelProduction',
    type: 'mcq',
    prompt: 'Which gas does most of the actual reducing work inside a blast furnace, pulling oxygen off the iron ore?',
    choices: ['Carbon monoxide', 'Carbon dioxide', 'Oxygen', 'Nitrogen'],
    correctIndex: 0,
    rationale:
      'Carbon monoxide, a gas made when coke burns and reacts further with carbon dioxide, is the main substance that pulls oxygen away from the iron ore so liquid iron is left behind.',
  },
  {
    id: 'sp-007',
    topic: 'steelProduction',
    type: 'mcq',
    prompt: 'Why can adding too much limestone risk cooling down a blast furnace?',
    choices: [
      'Limestone reacts explosively with coke, wasting fuel',
      'Breaking down limestone into lime absorbs heat from the furnace',
      'Limestone melts at a lower temperature than iron, causing blockages',
      'Limestone reacts with iron ore to reform unreduced oxide',
    ],
    correctIndex: 1,
    rationale:
      'Limestone breaks down into lime in a reaction that soaks up heat rather than giving it off (an endothermic reaction). Charging too much of it can cool the furnace instead of helping it.',
  },
  {
    id: 'sp-008',
    topic: 'steelProduction',
    type: 'tf',
    prompt: 'The chemical reaction that breaks down limestone inside a blast furnace gives off extra heat.',
    correctAnswer: false,
    rationale:
      'This reaction actually absorbs heat (it is endothermic), which is why operators avoid overloading the furnace with limestone, or it will cool the furnace down.',
  },
  {
    id: 'sp-009',
    topic: 'steelProduction',
    type: 'mcq',
    prompt: 'Chemically, what is the slag that forms in a blast furnace?',
    choices: [
      'Unreacted iron ore that failed to melt',
      'A mixture of coke ash and sulfur',
      'A calcium silicate formed when lime reacts with silica-rich impurities in the ore',
      'Pure calcium carbonate that never decomposed',
    ],
    correctIndex: 2,
    rationale:
      'Slag is a glassy waste material called calcium silicate. It forms when lime (made by heating the limestone) reacts with the sandy, silica-based impurities that came in with the iron ore.',
  },
  {
    id: 'sp-010',
    topic: 'steelProduction',
    type: 'mcq',
    prompt:
      'A construction company wants a byproduct of ironmaking to use as road-base aggregate and in cement blends. Which byproduct fits this use?',
    choices: ['Pig iron', 'Coke breeze', 'Furnace gas', 'Slag'],
    correctIndex: 3,
    rationale:
      'Slag, the melted waste material left over from ironmaking, is commonly reused as an aggregate in road building and ground up for use in cement blends.',
  },
  {
    id: 'sp-011',
    topic: 'steelProduction',
    type: 'tf',
    prompt: 'In a blast furnace, molten slag sinks below the molten iron because slag is the denser of the two liquids.',
    correctAnswer: false,
    rationale:
      'It is the opposite: slag is less dense than molten iron, so it floats on top of the iron and can be skimmed or tapped off separately.',
  },
  {
    id: 'sp-012',
    topic: 'steelProduction',
    type: 'mcq',
    prompt: 'What is the molten product tapped from the bottom of a blast furnace called?',
    choices: [
      'Pig iron (also called hot metal)',
      'Finished structural steel',
      'Cast iron pipe fittings',
      'Wrought iron bar stock',
    ],
    correctIndex: 0,
    rationale:
      'The liquid metal that trickles out of the bottom of a blast furnace is called pig iron, or hot metal, while it is still molten.',
  },
  {
    id: 'sp-013',
    topic: 'steelProduction',
    type: 'mcq',
    prompt: "Why can't pig iron straight from the blast furnace be used for most structural engineering parts?",
    choices: [
      'It contains too little carbon to hold a shape',
      'Its high carbon content (roughly 3-4%) makes it hard but brittle',
      'It cools too slowly to be cast into any shape',
      'It has no iron content left after reduction',
    ],
    correctIndex: 1,
    rationale:
      'Pig iron carries roughly 3 to 4 percent carbon, far more than steel needs. That much dissolved carbon makes it hard but also brittle (it snaps rather than bends), so it is unsuitable for most structural uses straight from the furnace.',
  },
  {
    id: 'sp-014',
    topic: 'steelProduction',
    type: 'tf',
    prompt: 'Pig iron typically carries around 3 to 4 percent carbon, well above what is allowed in finished steel.',
    correctAnswer: true,
    rationale:
      'That high carbon content is exactly why pig iron must be refined further in a steelmaking furnace before it behaves like structural steel.',
  },
  {
    id: 'sp-015',
    topic: 'steelProduction',
    type: 'mcq',
    prompt:
      'An engineer needs a ductile steel beam, but only has pig iron freshly tapped from a blast furnace. What must happen before it can be rolled into that beam?',
    choices: [
      'Pour the tapped pig iron directly into the beam mold',
      'Send the pig iron to a steelmaking furnace (BOF or EAF) to remove excess carbon and impurities first',
      'Add more coke to the tapped pig iron to raise its carbon further',
      'Reheat the pig iron in the blast furnace a second time',
    ],
    correctIndex: 1,
    rationale:
      'Freshly tapped pig iron still holds too much carbon and other impurities to be ductile (able to bend without snapping). It must pass through a steelmaking furnace, such as a BOF or EAF, where most of that carbon is burned away.',
  },
  {
    id: 'sp-016',
    topic: 'steelProduction',
    type: 'tf',
    prompt: 'Steelmaking mainly means adding extra carbon to pig iron so it becomes stronger.',
    correctAnswer: false,
    rationale:
      'Steelmaking does the opposite: it removes most of the carbon and other impurities, such as silicon and manganese, that pig iron already carries, rather than adding more.',
  },
  {
    id: 'sp-017',
    topic: 'steelProduction',
    type: 'mcq',
    prompt: 'What is blown into a Basic Oxygen Furnace (BOF) to convert pig iron and scrap into steel?',
    choices: ['Compressed air', 'Nitrogen gas', 'Natural gas', 'Pure oxygen'],
    correctIndex: 3,
    rationale:
      'A Basic Oxygen Furnace blows a jet of nearly pure oxygen into the molten pig iron and scrap mixture, burning off carbon and other impurities.',
  },
  {
    id: 'sp-018',
    topic: 'steelProduction',
    type: 'mcq',
    prompt: 'Why is the Basic Oxygen Furnace (BOF) described as self-sufficient in energy (autogenous)?',
    choices: [
      'Oxidizing carbon, silicon, and other elements in the melt releases enough heat on its own to melt the added scrap',
      'An external gas burner supplies all the heat needed',
      'Electric arcs from graphite electrodes supply the heat',
      'The furnace is preheated overnight before every batch',
    ],
    correctIndex: 0,
    rationale:
      'Autogenous means self-powering. In a BOF, the oxygen reacts with carbon, silicon, and other elements already in the melt, and those reactions release enough heat by themselves to melt the scrap without an outside fuel source.',
  },
  {
    id: 'sp-019',
    topic: 'steelProduction',
    type: 'mcq',
    prompt:
      'A mill wants to convert mostly molten pig iron, plus a smaller share of scrap, into a large batch of steel within about an hour. Which furnace type is built for this job?',
    choices: [
      'Electric Arc Furnace (EAF)',
      'Basic Oxygen Furnace (BOF)',
      'Open-hearth furnace',
      'Cupola furnace',
    ],
    correctIndex: 1,
    rationale:
      'A Basic Oxygen Furnace is built for exactly this job: charging mostly molten pig iron with some scrap and turning it into a large batch of steel within roughly an hour.',
  },
  {
    id: 'sp-020',
    topic: 'steelProduction',
    type: 'tf',
    prompt: 'A Basic Oxygen Furnace usually needs several days to turn a charge of pig iron and scrap into a batch of steel.',
    correctAnswer: false,
    rationale:
      'A BOF is actually one of the fastest steelmaking methods, typically finishing a batch (called a heat) in under an hour rather than days.',
  },
  {
    id: 'sp-021',
    topic: 'steelProduction',
    type: 'mcq',
    prompt: 'What actually melts the metal charge inside an Electric Arc Furnace (EAF)?',
    choices: [
      'Burning coke at the base of the furnace',
      'Pure oxygen jets alone',
      'Electric arcs struck from graphite electrodes',
      'Waste heat recovered from a blast furnace',
    ],
    correctIndex: 2,
    rationale:
      'In an Electric Arc Furnace, electricity jumps as arcs between graphite electrodes and the metal charge, and the intense heat of those arcs melts the scrap.',
  },
  {
    id: 'sp-022',
    topic: 'steelProduction',
    type: 'mcq',
    prompt: 'Why is an EAF often preferred for recycling scrap and producing specialty alloy steels?',
    choices: [
      'It can only process fresh pig iron, never scrap',
      'It requires a constant supply of iron ore rather than scrap',
      'It produces only one fixed steel grade regardless of the charge',
      'It runs mainly on scrap and lets alloying elements be added and adjusted for each batch',
    ],
    correctIndex: 3,
    rationale:
      'An EAF is charged mainly with recycled scrap rather than fresh pig iron, and operators can add different alloying elements batch by batch, which suits recycling and specialty alloy production well.',
  },
  {
    id: 'sp-023',
    topic: 'steelProduction',
    type: 'tf',
    prompt: 'Electric arc furnaces are charged mainly with recycled steel scrap rather than fresh molten pig iron.',
    correctAnswer: true,
    rationale:
      "Unlike a blast furnace or a BOF, an EAF's main raw material is scrap metal, which is melted down using electric arcs.",
  },
  {
    id: 'sp-024',
    topic: 'steelProduction',
    type: 'mcq',
    prompt:
      'A foundry wants to recycle scrap car-body steel into a specialty alloy steel in flexible, small batches. Which furnace type suits this best?',
    choices: [
      'Blast furnace',
      'Basic Oxygen Furnace (BOF)',
      'Open-hearth furnace',
      'Electric Arc Furnace (EAF)',
    ],
    correctIndex: 3,
    rationale:
      'An Electric Arc Furnace is charged mainly with scrap and lets operators adjust the alloy mix batch by batch, which fits a foundry recycling scrap into a specialty alloy steel far better than a process built around fresh pig iron.',
  },
  {
    id: 'sp-025',
    topic: 'steelProduction',
    type: 'mcq',
    prompt: 'How did an open-hearth furnace melt its charge?',
    choices: [
      'Electric arcs between graphite electrodes',
      'Burning fuel, such as gas or oil, that heats the melt from above',
      'Pure oxygen lances alone',
      'Nuclear-generated heat',
    ],
    correctIndex: 1,
    rationale:
      'An open-hearth furnace melted its charge using burning fuel, such as gas or oil, directed across the top of a shallow hearth, rather than electric arcs or an oxygen jet.',
  },
  {
    id: 'sp-026',
    topic: 'steelProduction',
    type: 'mcq',
    prompt: 'Why was open-hearth steelmaking largely replaced by the Basic Oxygen Furnace?',
    choices: [
      'Open-hearth steel had too much oxygen dissolved in it',
      'Open-hearth furnaces could not use any scrap steel',
      'The Basic Oxygen Furnace makes steel far faster, so far fewer furnaces were needed for the same output',
      'The Basic Oxygen Furnace was cheaper to build even though it was slower',
    ],
    correctIndex: 2,
    rationale:
      'A Basic Oxygen Furnace could turn out steel far faster than an open-hearth furnace, so only a couple of BOFs were needed to replace a whole bank of slower open-hearth furnaces doing the same job.',
  },
  {
    id: 'sp-027',
    topic: 'steelProduction',
    type: 'tf',
    prompt: 'The Bessemer process made steel by blowing air through molten pig iron to burn out impurities.',
    correctAnswer: true,
    rationale:
      'Blowing air through the molten metal reacted with and burned away carbon and other impurities, which is how the Bessemer process turned pig iron into steel.',
  },
  {
    id: 'sp-028',
    topic: 'steelProduction',
    type: 'mcq',
    prompt: 'Why has continuous casting largely replaced pouring steel into individual ingot molds at most modern mills?',
    choices: [
      'It produces a smaller total output per hour than ingot casting',
      'It requires no cooling of the steel at all',
      'It only works for stainless steel grades',
      'It solidifies steel directly into long semi-finished shapes without the delays and losses of casting and stripping individual ingots',
    ],
    correctIndex: 3,
    rationale:
      'Continuous casting solidifies molten steel straight into long semi-finished shapes, such as blooms, billets, or slabs, in one ongoing operation, avoiding the delays and material losses that come with pouring, cooling, and stripping each ingot separately.',
  },
  {
    id: 'sp-029',
    topic: 'steelProduction',
    type: 'mcq',
    prompt: 'What semi-finished shapes does a continuous caster solidify molten steel into?',
    choices: [
      'Blooms, billets, and slabs',
      'Ingots and pigs only',
      'Wire rod and rebar only',
      'Finished I-beams and channel',
    ],
    correctIndex: 0,
    rationale:
      'A continuous caster solidifies molten steel directly into semi-finished shapes called blooms, billets, and slabs, which are later reheated and rolled into finished products.',
  },
  {
    id: 'sp-030',
    topic: 'steelProduction',
    type: 'mcq',
    prompt: 'Which sequence correctly summarizes the overall route from raw ore to a finished steel product?',
    choices: [
      'Pig iron -> iron ore -> blast furnace -> steel -> casting',
      'Iron ore -> blast furnace -> pig iron -> steelmaking furnace -> steel -> casting and rolling',
      'Iron ore -> steelmaking furnace -> blast furnace -> pig iron -> casting',
      'Iron ore -> casting -> blast furnace -> pig iron -> steel',
    ],
    correctIndex: 1,
    rationale:
      'The overall route runs from mined iron ore, through the blast furnace to make pig iron, then through a steelmaking furnace (BOF or EAF) that removes excess carbon and impurities, giving steel that is finally cast and rolled into usable shapes.',
  },
];
