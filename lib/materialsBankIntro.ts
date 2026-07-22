import type { MaterialsQuestion } from './materialsTypes.ts';

export const introClassificationQuestions: MaterialsQuestion[] = [
  {
    id: 'ic-001',
    topic: 'introClassification',
    type: 'mcq',
    prompt:
      "What is materials science mainly concerned with, according to the course module's materials-knowledge spectrum?",
    choices: [
      "Building basic knowledge about a material's structure, properties, and how it can be processed",
      'Converting that basic knowledge into finished products people need',
      'Setting the market price of raw materials',
      'Inspecting finished parts for defects on a factory line',
    ],
    correctIndex: 0,
    rationale:
      "The module places materials science at the 'basic knowledge' end of the spectrum - it studies structure (how atoms are arranged), properties, and processing, while materials engineering (the applied side) turns that knowledge into products.",
  },
  {
    id: 'ic-002',
    topic: 'introClassification',
    type: 'mcq',
    prompt:
      'A team uses existing knowledge of plastic resins to design and mold a new type of phone case for the market. Which discipline, as defined in the course module, are they mainly practicing?',
    choices: [
      'Materials science, because they are discovering new structure-property relationships',
      'Materials engineering, because they are using existing materials knowledge to make a product society needs',
      'Neither, because plastic resins are not real materials',
      'Materials science, because they are only measuring atomic bonds',
    ],
    correctIndex: 1,
    rationale:
      'Materials engineering, per the module, uses existing scientific knowledge of materials so they can be converted into products society wants and needs - exactly what designing and molding a new case involves.',
  },
  {
    id: 'ic-003',
    topic: 'introClassification',
    type: 'tf',
    prompt:
      "Materials science is centered on investigating the relationship between a material's structure (how its atoms are arranged) and its properties (like strength or conductivity).",
    correctAnswer: true,
    rationale:
      'This matches the definition given in the lecture: materials science investigates the link between structure and properties, while materials engineering designs that structure to hit a target set of properties.',
  },
  {
    id: 'ic-004',
    topic: 'introClassification',
    type: 'mcq',
    prompt:
      'A team takes an existing steel alloy and works out a new heat-treatment process to make a stronger bicycle frame from it. Which role are they mainly performing?',
    choices: [
      'Materials science, because they are discovering a brand-new chemical element',
      'Materials science, because they are only measuring atomic bonds',
      'Materials engineering, because they are using existing materials knowledge to create a new product and a new processing technique',
      'Neither, because no materials knowledge is involved',
    ],
    correctIndex: 2,
    rationale:
      "Per the lecture, the materials engineer's role is to create new products or systems from existing materials and to develop processing techniques (the steps used to shape or treat a material) - exactly what this team is doing.",
  },
  {
    id: 'ic-005',
    topic: 'introClassification',
    type: 'mcq',
    prompt:
      "Which sequence correctly describes the chain the lecture identifies for engineering materials?",
    choices: [
      'Performance -> Properties -> Structure -> Processing',
      'Structure -> Processing -> Performance -> Properties',
      'Properties -> Structure -> Performance -> Processing',
      'Processing -> Structure -> Properties -> Performance',
    ],
    correctIndex: 3,
    rationale:
      'The lecture repeatedly frames this as Processing -> Structure -> Properties -> Performance: how a material is processed (made or shaped) sets its internal structure, which sets its properties, which then sets how it performs in use.',
  },
  {
    id: 'ic-006',
    topic: 'introClassification',
    type: 'tf',
    prompt:
      'A workshop switches to a different heat treatment for the same steel part and finds it now bends more before cracking. This best illustrates that a change in processing can alter a material\'s internal structure, and that changed structure can then change its properties.',
    correctAnswer: true,
    rationale:
      "The lecture states that properties depend on structure and that processing is what changes structure, so a different heat treatment (a controlled heating and cooling process) can change how much a part bends before it cracks.",
  },
  {
    id: 'ic-007',
    topic: 'introClassification',
    type: 'mcq',
    prompt:
      "The course module lists five named classes of engineering materials in Chapter One plus one further class, smart materials. Which of the following is NOT one of these six classes?",
    choices: ['Ceramics', 'Textiles', 'Composites', 'Electronic materials'],
    correctIndex: 1,
    rationale:
      "The module's six classes are metals, polymers, ceramics, composites, electronic materials, and smart materials. Textiles (woven fabric materials) is not one of the six named classes.",
  },
  {
    id: 'ic-008',
    topic: 'introClassification',
    type: 'tf',
    prompt:
      'Smart materials are listed as one of the module\'s six main classes of engineering materials, alongside metals, polymers, ceramics, composites, and electronic materials.',
    correctAnswer: true,
    rationale:
      "Chapter One's classification section adds composite, electronic, and smart materials to the three traditional classes (metal, polymer, ceramic), making six classes in total.",
  },
  {
    id: 'ic-009',
    topic: 'introClassification',
    type: 'mcq',
    prompt: 'Which set of properties does the course material use to describe metals in general?',
    choices: [
      'Good electrical and thermal conductors, ductile (able to stretch or bend without breaking), and crystalline (atoms arranged in a repeating pattern)',
      'Poor conductors, very brittle, and always non-crystalline',
      'Transparent, low density, and always non-crystalline',
      'High electrical resistance and no fixed atomic arrangement',
    ],
    correctIndex: 0,
    rationale:
      "The material describes metals as good conductors of heat and electricity, ductile (they stretch or bend rather than snap), and crystalline (their atoms sit in a regular, repeating pattern).",
  },
  {
    id: 'ic-010',
    topic: 'introClassification',
    type: 'mcq',
    prompt:
      "A supplier's stockroom has two labeled bars: Bar A is '99% iron with added carbon' and Bar B is 'pure aluminum.' Based on the course material's ferrous/non-ferrous split, how should these be classified?",
    choices: [
      'Both are ferrous, since both are metals',
      'Bar A is non-ferrous and Bar B is ferrous',
      'Bar A is ferrous (mostly iron) and Bar B is non-ferrous (no iron)',
      'Both are non-ferrous, since neither is pure iron',
    ],
    correctIndex: 2,
    rationale:
      "Ferrous metals are defined as containing a large percentage of iron (like steel), so the iron-carbon bar is ferrous; non-ferrous metals contain little or no iron (like aluminum), so the aluminum bar is non-ferrous.",
  },
  {
    id: 'ic-011',
    topic: 'introClassification',
    type: 'tf',
    prompt:
      'All metals and alloys are described in the lecture as crystalline materials, meaning their atoms are arranged in a long-range, repeating pattern.',
    correctAnswer: true,
    rationale:
      'The lecture states plainly that all metals and alloys are crystalline, listing examples like iron, steel, copper, and aluminum, in contrast to amorphous materials like glass, which lack that regular repeating pattern.',
  },
  {
    id: 'ic-012',
    topic: 'introClassification',
    type: 'mcq',
    prompt:
      'An engineer needs a material for household electrical wiring that must conduct electricity well and also bend around corners without snapping. Which class of material best fits, based on the general properties described in the course?',
    choices: [
      'Ceramic, because ceramics are strong insulators',
      'Polymer, because polymers conduct electricity well',
      'Composite, because composites are always used for wiring',
      'Metal, because metals are good electrical conductors and ductile',
    ],
    correctIndex: 3,
    rationale:
      'Metals are described as good electrical conductors and ductile (able to bend without breaking), which is exactly what wiring needs; ceramics and most polymers are poor conductors instead.',
  },
  {
    id: 'ic-013',
    topic: 'introClassification',
    type: 'mcq',
    prompt:
      'Polymeric materials consist mainly of long, organic (carbon-based) molecular chains. Based on this composition, which property would you expect polymers to generally have?',
    choices: [
      'Very high density (heavy for their size), similar to metals',
      'Low density (light for their size) and relatively low softening or melting temperatures',
      'Excellent electrical conductivity',
      'A tightly packed metallic crystal lattice',
    ],
    correctIndex: 1,
    rationale:
      'The course material describes polymers as having low density and a relatively low softening/decomposition temperature, which follows from their loosely packed carbon-chain structure.',
  },
  {
    id: 'ic-014',
    topic: 'introClassification',
    type: 'tf',
    prompt: 'According to the course material, polymers are generally good conductors of electricity.',
    correctAnswer: false,
    rationale:
      'The material states that most polymers are poor conductors of electricity, which is why they are often used as electrical insulation (a barrier that blocks current) instead.',
  },
  {
    id: 'ic-015',
    topic: 'introClassification',
    type: 'mcq',
    prompt:
      'A manufacturer wants a cheap, lightweight coating to insulate an electrical cable. Based on the course\'s description of polymer properties, why would a polymer suit this job?',
    choices: [
      'Polymers are generally poor conductors of electricity and are lightweight and easy to process into coatings',
      'Polymers are excellent electrical conductors and very dense',
      'Polymers always have very high melting points, so they resist heat damage indefinitely',
      'Polymers are always crystalline, giving them high strength',
    ],
    correctIndex: 0,
    rationale:
      'The course describes polymers as poor conductors of electricity, low in density (light for their size), and easy to process as coatings or sheets - all reasons they work well as cable insulation.',
  },
  {
    id: 'ic-016',
    topic: 'introClassification',
    type: 'mcq',
    prompt: 'How does the course material describe ceramic materials?',
    choices: [
      'Metals combined only with other metals, always ductile',
      'Pure carbon-chain compounds with low melting points',
      'Inorganic compounds of metallic and non-metallic elements, chemically bonded together, generally hard, brittle, and resistant to high temperatures',
      'Materials made purely of free-flowing electrons with no fixed structure',
    ],
    correctIndex: 2,
    rationale:
      'Ceramics are metallic and non-metallic elements chemically bonded together (stuck together at the atomic level); the course notes they are hard and have high-temperature strength but tend to be brittle, meaning they crack rather than bend under stress.',
  },
  {
    id: 'ic-017',
    topic: 'introClassification',
    type: 'tf',
    prompt:
      'The course material describes ceramics as generally maintaining more strength at high temperatures than most metals, though they tend to be brittle.',
    correctAnswer: true,
    rationale:
      'The module notes ceramics have high hardness and high-temperature strength, but this comes with brittleness - meaning they crack rather than bend under stress.',
  },
  {
    id: 'ic-018',
    topic: 'introClassification',
    type: 'mcq',
    prompt:
      'A furnace needs a lining material that resists very high temperatures and does not let heat escape easily. Which material class best fits, based on the properties described in the course?',
    choices: [
      'Polymer, because polymers have very high melting points',
      'Metal, because metals are poor conductors of heat',
      'Electronic material, because silicon resists high heat best',
      'Ceramic, because ceramics resist high temperatures and insulate against heat',
    ],
    correctIndex: 3,
    rationale:
      'Ceramics are described as heat- and wear-resistant with insulative properties (they block heat from passing through), which is exactly why the course notes they are used to line furnaces holding molten metal.',
  },
  {
    id: 'ic-019',
    topic: 'introClassification',
    type: 'mcq',
    prompt:
      'Composites combine two or more materials, such as glass fiber and polymer resin. Which best explains why the combination can achieve properties that neither original material has by itself?',
    choices: [
      'The materials chemically react to form a brand new pure element',
      'Combining the two materials\' distinct characteristics (like fiber strength and polymer formability) produces a mixture that captures the best of both',
      'Composites are simply mixtures with no real change in properties',
      'Only ceramics can be combined with metals to form composites',
    ],
    correctIndex: 1,
    rationale:
      'A composite mixes two or more materials - usually a filler or reinforcement plus a binder - so the combination gets characteristics that neither ingredient has by itself, such as a fiber\'s strength paired with a polymer\'s ability to be molded.',
  },
  {
    id: 'ic-020',
    topic: 'introClassification',
    type: 'mcq',
    prompt:
      'A boat builder combines glass fibers with a polymer resin to make a hull that is both strong and lightweight - the fibreglass example given in the course material. Which material class does this belong to?',
    choices: [
      'Composite, because it combines glass fibers with a polymer matrix (the surrounding material that holds the fibers together) to get strength and light weight neither ingredient has alone',
      'Ceramic, because glass fibers are ceramics on their own',
      'Metal, because it behaves like a metal alloy',
      'Electronic material, because it is used in circuit boards',
    ],
    correctIndex: 0,
    rationale:
      'Fibreglass combines glass fibers (the reinforcement) with a polymer matrix (the material that surrounds and binds the fibers), so it is classed as a composite - getting strength from the glass and formability from the polymer.',
  },
  {
    id: 'ic-021',
    topic: 'introClassification',
    type: 'tf',
    prompt:
      "The course material states that a composite's overall properties can be more desirable than what any single one of its component materials could achieve alone.",
    correctAnswer: true,
    rationale:
      "The lecture describes composites as having properties that result from the combination - useful qualities that neither ingredient has on its own, which is the whole point of combining materials like glass fiber and polymer.",
  },
  {
    id: 'ic-022',
    topic: 'introClassification',
    type: 'mcq',
    prompt: "What defining feature makes a material 'smart' according to the course sources?",
    choices: [
      'It is the cheapest material available for a given job',
      'It never reacts with its environment',
      'It automatically senses and responds to a change in its environment, such as heat or pressure (a stimulus)',
      'It is always a pure metal with no alloying elements',
    ],
    correctIndex: 2,
    rationale:
      'Smart materials are described as built so they react on their own when their surroundings change (a stimulus, such as heat or pressure), unlike ordinary materials that just sit passively under load or heat.',
  },
  {
    id: 'ic-023',
    topic: 'introClassification',
    type: 'mcq',
    prompt:
      "A metal component is designed so that heating it makes it snap back to a shape it 'remembers.' Which type of smart material does this describe?",
    choices: [
      'Piezoelectric material, because it generates electricity under pressure',
      'Ceramic composite, because it resists heat',
      'Electronic material, because it involves an electrical signal',
      'Shape-memory alloy, because it is a metal that returns to its original shape when heated',
    ],
    correctIndex: 3,
    rationale:
      'The course material defines a shape-memory alloy as a metal that, after being bent, springs back to the shape it was made in once it is warmed - exactly the behavior described.',
  },
  {
    id: 'ic-024',
    topic: 'introClassification',
    type: 'mcq',
    prompt:
      'According to the history timeline in the lecture, which metal was the first to be used by early humans, around 4000 B.C.?',
    choices: ['Copper', 'Bronze', 'Iron', 'Steel'],
    correctIndex: 0,
    rationale:
      'The lecture places the Copper Age at roughly 4000 B.C., stating copper was the first metal used for tools, implements, and weapons.',
  },
  {
    id: 'ic-025',
    topic: 'introClassification',
    type: 'mcq',
    prompt: 'How does the lecture describe bronze, the first alloy used by early humans, dated to roughly 3000 B.C.?',
    choices: [
      'Bronze is pure copper with no other element added',
      'Bronze is copper combined with about 12% tin',
      'Bronze is iron combined with carbon',
      'Bronze is a ceramic made from clay and sand',
    ],
    correctIndex: 1,
    rationale:
      'The lecture defines bronze as copper plus roughly 12% tin (an alloy is a mixture of a metal with one or more other elements), making it the first alloy in the history timeline, following the Copper Age.',
  },
  {
    id: 'ic-026',
    topic: 'introClassification',
    type: 'tf',
    prompt:
      "According to the lecture's history timeline, the Iron Age (roughly 2000 B.C.) came before the Bronze Age (roughly 3000 B.C.).",
    correctAnswer: false,
    rationale:
      'The timeline actually runs Copper Age (~4000 B.C.), then Bronze Age (~3000 B.C.), then Iron Age (~2000 B.C.), so bronze use came before iron use, not after.',
  },
  {
    id: 'ic-027',
    topic: 'introClassification',
    type: 'mcq',
    prompt:
      "According to the lecture's history timeline, which group is credited with being first to produce cast iron (around 500 A.D.) and, earlier, steel using a technique that blew air through molten metal to remove impurities, similar to the later Bessemer process?",
    choices: ['The Romans', 'The Egyptians', 'The Chinese', 'The Mesopotamians'],
    correctIndex: 2,
    rationale:
      'The timeline credits the Chinese with producing steel using a technique that blew air through molten iron to remove impurities (similar to the later Bessemer process) and with being first to produce cast iron.',
  },
  {
    id: 'ic-028',
    topic: 'introClassification',
    type: 'mcq',
    prompt:
      'According to the course module, what is the most important electronic material, one that is modified in various ways to change its electrical characteristics?',
    choices: ['Copper', 'Steel', 'Glass', 'Silicon'],
    correctIndex: 3,
    rationale:
      'The module singles out pure silicon as the most important electronic material - a small-volume but critical class of materials whose electrical behavior (how well it conducts or blocks electricity) can be finely tuned for use in electronics.',
  },
  {
    id: 'ic-029',
    topic: 'introClassification',
    type: 'mcq',
    prompt:
      "An engineer is choosing between two candidate alloys for a bridge part and weighs each one's price against how well its properties (strength, corrosion resistance) meet the job's needs. What does the lecture say should mainly guide this kind of decision?",
    choices: [
      'Considerations of cost and performance (how well the properties match what the job needs)',
      'Whichever material is the newest one discovered',
      'Whichever material is heaviest and densest',
      'The material the client happened to mention first',
    ],
    correctIndex: 0,
    rationale:
      'The lecture states engineers should be able to choose a material by weighing what it costs against how well it does the job - balancing price and performance to match what the job needs.',
  },
  {
    id: 'ic-030',
    topic: 'introClassification',
    type: 'mcq',
    prompt:
      "A building's design uses steel beams, wooden framing, and plastic piping together in the same structure. What point from Lecture 3's list of everyday engineering materials does this best illustrate?",
    choices: [
      'Only one material class is ever used in a single structure',
      'Materials are often used together within the same structure or product',
      'Wood is never used in modern engineering',
      'Plastics cannot be combined with any other material',
    ],
    correctIndex: 1,
    rationale:
      "Lecture 3's overview of everyday materials (wood, stone/granite, copper, steel, aluminum, plastics) shows that real products and structures usually combine several materials, each chosen for what it does best.",
  },
];
