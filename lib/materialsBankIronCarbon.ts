import type { MaterialsQuestion } from './materialsTypes.ts';

export const ironCarbonHeatQuestions: MaterialsQuestion[] = [
  {
    id: 'ih-001',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt: 'On the iron-carbon diagram, ferrite (also called alpha-iron) is best described as which of the following?',
    choices: [
      'A liquid solution of carbon dissolved in molten iron',
      'An extremely hard iron-carbide compound with a fixed chemical formula',
      "A soft, low-carbon solid form of iron with a body-centered cubic (BCC) crystal structure (atoms arranged in a cube shape with one extra atom sitting at the center)",
      'A layered mixture of two different solid phases',
    ],
    correctIndex: 2,
    rationale:
      'Ferrite is the soft, iron-rich phase that can only take in a tiny amount of carbon; its atoms sit in a body-centered cubic (BCC) arrangement, meaning a cube of atoms with one extra atom in the middle.',
  },
  {
    id: 'ih-002',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt: 'Austenite (gamma-iron) only exists above a certain temperature. Which crystal structure does it have, and what does that structure let it do?',
    choices: [
      'Hexagonal close-packed (HCP), a structure that cannot dissolve any carbon',
      "Face-centered cubic (FCC), a structure that lets it dissolve far more carbon than the cooler, room-temperature form of iron can",
      'Body-centered cubic (BCC), the same structure iron has at room temperature',
      'No fixed crystal structure at all, because austenite is actually a liquid',
    ],
    correctIndex: 1,
    rationale:
      'Austenite forms once iron is heated hot enough to switch to a face-centered cubic (FCC) arrangement (atoms packed with extra atoms on every cube face), and that roomier packing lets it hold much more dissolved carbon than the cooler form of iron.',
  },
  {
    id: 'ih-003',
    topic: 'ironCarbonHeat',
    type: 'tf',
    prompt: 'Austenite (the hot, FCC form of iron) can dissolve far more carbon than ferrite (the cooler, BCC form) can.',
    correctAnswer: true,
    rationale:
      'This is true: austenite\'s roomier face-centered cubic (FCC) atom arrangement leaves more space between iron atoms, so it can hold noticeably more dissolved carbon than the tightly packed body-centered cubic (BCC) arrangement of ferrite.',
  },
  {
    id: 'ih-004',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt: 'Cementite is best described as which of the following?',
    choices: [
      'A soft, easily bent form of pure iron',
      'A liquid mixture of iron and carbon that resists turning solid',
      'Another name used for austenite (the form iron takes when very hot)',
      'Iron carbide, a compound of iron and carbon with a fixed composition that is very hard and brittle (it breaks rather than bends)',
    ],
    correctIndex: 3,
    rationale:
      'Cementite is the chemical compound iron carbide (Fe3C), a fixed combination of iron and carbon that is extremely hard but brittle, meaning it cracks instead of bending under stress.',
  },
  {
    id: 'ih-005',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt: 'Pearlite forms when austenite (the form iron takes when very hot) cools slowly and splits into thin alternating layers. What are those two layers made of?',
    choices: [
      'Soft ferrite and hard cementite, arranged as thin alternating bands',
      'Two different layers, both made purely of carbon',
      'Solid iron carbide sitting directly beside molten iron',
      'Ferrite and austenite, since some austenite always survives down to room temperature',
    ],
    correctIndex: 0,
    rationale:
      'Pearlite is a striped, layered mixture of soft ferrite and hard cementite that forms as austenite breaks down on slow cooling, and its combination of a soft layer with a hard layer gives it a balance of strength and some ductility (the ability to bend without snapping).',
  },
  {
    id: 'ih-006',
    topic: 'ironCarbonHeat',
    type: 'tf',
    prompt: 'Of the four main iron-carbon phases, cementite is the hardest one.',
    correctAnswer: true,
    rationale:
      'This is true: cementite (iron carbide) is a very hard, brittle compound, making it the hardest of the four main iron-carbon phases.',
  },
  {
    id: 'ih-007',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt: 'On the iron-carbon diagram, the eutectoid point sits at roughly which carbon content and temperature?',
    choices: [
      'About 4.3% carbon at roughly 1148 degrees C',
      'About 0.8% carbon at roughly 723 degrees C',
      'About 2% carbon at roughly 900 degrees C',
      'About 0.1% carbon at roughly 500 degrees C',
    ],
    correctIndex: 1,
    rationale:
      'The eutectoid point marks a specific spot on the diagram, at about 0.8% carbon and roughly 723 degrees C, where a single solid phase changes directly into two other solid phases on cooling.',
  },
  {
    id: 'ih-008',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt: 'What transformation happens as a steel cools slowly through the eutectoid temperature?',
    choices: [
      'Ferrite (the soft, nearly pure-iron form) melts and turns into a liquid',
      'Cementite (hard, brittle iron carbide) converts directly back into austenite',
      'Austenite breaks down into pearlite, the layered ferrite-cementite mixture',
      'Pearlite melts and turns back into liquid steel',
    ],
    correctIndex: 2,
    rationale:
      'At the eutectoid temperature, austenite (the hot, high-carbon-capacity phase) becomes unstable and breaks apart into pearlite, the striped ferrite-and-cementite mixture that forms once the steel cools slowly past this point.',
  },
  {
    id: 'ih-009',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt:
      'A steel sample contains 0.3% carbon, below the roughly 0.8% carbon content of the eutectoid point. What is this type of steel called, and what does its room-temperature structure mostly consist of?',
    choices: [
      'Hypoeutectoid steel, whose room-temperature structure is mostly leftover (proeutectoid) ferrite (the soft, nearly pure-iron form) plus pearlite (a layered mix of soft iron and hard iron carbide)',
      'Hypereutectoid steel, whose structure is mostly leftover cementite (hard, brittle iron carbide) plus pearlite',
      'Eutectoid steel, made up entirely of pearlite',
      'Cast iron, made up mostly of ledeburite',
    ],
    correctIndex: 0,
    rationale:
      'Any steel with less carbon than the eutectoid point (about 0.8%) is called a hypoeutectoid steel, and on slow cooling it ends up as a mix of leftover (proeutectoid, meaning formed before the eutectoid reaction) ferrite plus pearlite.',
  },
  {
    id: 'ih-010',
    topic: 'ironCarbonHeat',
    type: 'tf',
    prompt: 'A steel sample containing 1.2% carbon, which is above the roughly 0.8% eutectoid carbon content, is classified as a hypereutectoid steel.',
    correctAnswer: true,
    rationale:
      'This is true: any steel with more carbon than the eutectoid point (about 0.8%) is called hypereutectoid, and its room-temperature structure consists of leftover (proeutectoid) cementite (hard, brittle iron carbide) plus pearlite (a layered mix of soft iron and hard iron carbide).',
  },
  {
    id: 'ih-011',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt: 'Roughly what carbon-content ranges separate steels from cast irons on the iron-carbon diagram?',
    choices: [
      'Steels contain 10% to 20% carbon; cast irons contain under 1% carbon',
      'Steels and cast irons always contain exactly the same amount of carbon',
      'Steels contain essentially no carbon; only cast irons contain any carbon at all',
      'Steels contain up to roughly 2% carbon; cast irons contain roughly 2% to 4% carbon or somewhat more',
    ],
    correctIndex: 3,
    rationale:
      'The iron-carbon diagram draws the line between the two families mainly by carbon content: alloys with up to roughly 2% carbon are called steels, while alloys with roughly 2% to 4% carbon (and sometimes a little more) are called cast irons.',
  },
  {
    id: 'ih-012',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt:
      'Alloys in the cast-iron carbon range can go through a eutectic reaction, a transformation that happens directly from the liquid at one specific temperature. What mixture does this reaction produce on further cooling?',
    choices: [
      'Pure ferrite (the soft, nearly pure-iron form), with no cementite (hard, brittle iron carbide) present at all',
      'Ledeburite, a very fine blend in which austenite (the form iron takes when very hot) and cementite are interleaved, formed directly from the liquid',
      'Pure liquid metal that never solidifies',
      'Martensite, which only forms through rapid quenching (fast cooling)',
    ],
    correctIndex: 1,
    rationale:
      'Cast-iron-range alloys can solidify straight from the liquid into ledeburite, a very fine blend in which austenite and cementite are interleaved, at a fixed eutectic temperature; this is a separate transformation from the eutectoid one (the special composition/temperature where austenite transforms all at once) that happens later in fully solid steel.',
  },
  {
    id: 'ih-013',
    topic: 'ironCarbonHeat',
    type: 'tf',
    prompt: 'An iron-carbon alloy containing 5% carbon would be classified as a steel rather than a cast iron.',
    correctAnswer: false,
    rationale:
      'This is false: steels are limited to roughly 2% carbon or less, so an alloy with 5% carbon actually falls into the cast-iron carbon range instead. Mixing this up would wrongly suggest a very high-carbon alloy like this could still be forged and shaped like a typical steel, when its high carbon content in practice makes it behave more like a brittle cast iron.',
  },
  {
    id: 'ih-014',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt: "Martensite forms when steel is cooled from the austenite phase in a particular way. What is that way, and why does it make martensite so hard?",
    choices: [
      'By cooling so slowly that carbon has plenty of time to escape the iron structure completely',
      'By holding the steel at one constant high temperature for many hours',
      "By cooling so fast (quenching) that carbon atoms get trapped inside iron's crystal structure, distorting it and making the resulting phase very hard and brittle",
      'By adding extra carbon to already-cold steel with no heating step at all',
    ],
    correctIndex: 2,
    rationale:
      'Martensite forms when austenite is cooled so quickly (quenched) that carbon atoms have no time to leave; the trapped carbon distorts the iron\'s crystal lattice (its repeating atomic framework), and that distortion is what makes martensite so hard, though also brittle.',
  },
  {
    id: 'ih-015',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt:
      'A machinist rapidly quenches a thick steel part in water and it develops cracks. Which phase, produced by that fast cooling, is mainly responsible for the resulting brittleness?',
    choices: [
      'Martensite, the very hard but brittle phase produced by trapped carbon during rapid cooling',
      'Ferrite, the soft, low-carbon phase',
      'Pearlite, the layered ferrite-cementite (hard, brittle iron carbide) mixture typical of slow cooling',
      'Leftover liquid steel that never fully solidified',
    ],
    correctIndex: 0,
    rationale:
      'Rapid quenching pushes austenite (the form iron takes when very hot) to transform into martensite, and while martensite gives excellent hardness, its distorted crystal structure also makes it brittle, so parts hardened this way can crack, especially if the shape or cooling is uneven.',
  },
  {
    id: 'ih-016',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt: 'Why is the iron-carbon diagram considered such a useful tool for an engineer working with steel?',
    choices: [
      'It only records the color changes of the metal, with no link to its properties',
      'It lets an engineer predict which phases - and therefore which properties, such as hardness or softness - will show up at a given carbon content and temperature',
      'It applies only to non-metal materials such as plastics and ceramics',
      'It ignores temperature entirely and tracks only carbon content',
    ],
    correctIndex: 1,
    rationale:
      'Because the diagram maps out which phase (or mixture of phases) appears at any combination of carbon content and temperature, an engineer can use it to predict the resulting properties of a steel, and to plan heat treatments that aim for a particular structure.',
  },
  {
    id: 'ih-017',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt: 'Annealing is carried out by heating steel up into the austenite (the form iron takes when very hot) phase and then cooling it in which way?',
    choices: [
      'Rapidly, by plunging it into water or oil',
      'In still air outside the furnace',
      'By reheating it again immediately to an even higher temperature',
      'Very slowly, typically by leaving it inside a switched-off furnace to cool along with it',
    ],
    correctIndex: 3,
    rationale:
      'Annealing means heating steel into the austenite phase and then letting it cool very slowly, usually by leaving it inside a furnace that has been switched off, so the whole part cools down gradually together with the furnace.',
  },
  {
    id: 'ih-018',
    topic: 'ironCarbonHeat',
    type: 'tf',
    prompt: 'Annealing (heating steel, then cooling it very slowly) is mainly used to soften steel.',
    correctAnswer: true,
    rationale:
      "This is true: annealing's slow furnace cooling produces a soft, coarse structure, which lowers the steel's hardness and makes it easier to machine or shape further.",
  },
  {
    id: 'ih-019',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt: 'Normalizing is carried out by heating steel up into the austenite (the form iron takes when very hot) phase and then cooling it in which way?',
    choices: [
      'In still air outside the furnace',
      'Very slowly inside a closed furnace',
      'Instantly, in an ice-water bath',
      'It is held at the austenite temperature indefinitely without ever being cooled',
    ],
    correctIndex: 0,
    rationale:
      'Normalizing means heating steel into the austenite phase and then letting it cool in still air outside the furnace, which is faster than furnace cooling but much gentler than quenching (rapid cooling) in a liquid.',
  },
  {
    id: 'ih-020',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt: 'Compared with annealing (heating steel, then cooling it very slowly), normalizing generally leaves steel stronger and with a finer internal structure. What is the reason for this?',
    choices: [
      'Because normalizing always ends up as pure martensite (the very hard, brittle structure from rapid cooling) while annealing never does',
      'Because normalizing uses a higher final carbon content than annealing',
      'Because air cooling happens faster than furnace cooling, so the resulting pearlite (a layered mix of soft iron and hard iron carbide) forms with thinner, more closely spaced layers',
      'Because normalizing never involves reaching the austenite (the form iron takes when very hot) phase at all',
    ],
    correctIndex: 2,
    rationale:
      "Since still air pulls heat away faster than a closed furnace does, the pearlite that forms during normalizing has thinner, more closely packed layers than annealed pearlite, and that finer layering is what gives normalized steel its extra strength and hardness.",
  },
  {
    id: 'ih-021',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt: 'Quenching (hardening) means heating steel into the austenite (the form iron takes when very hot) phase and then cooling it in which way?',
    choices: [
      'Slowly, inside a closed furnace',
      'Rapidly, typically by plunging it into water or oil',
      'Slowly, in still air',
      'Not cooling it at all, letting it stay hot indefinitely',
    ],
    correctIndex: 1,
    rationale:
      'Quenching, also called hardening, means heating steel into the austenite phase and then cooling it very rapidly, usually by dropping it into water or oil, so that martensite (the very hard, brittle structure from rapid cooling) forms instead of the softer phases produced by slower cooling.',
  },
  {
    id: 'ih-022',
    topic: 'ironCarbonHeat',
    type: 'tf',
    prompt: 'Quenching steel generally leaves it softer and more bendable (more ductile) than annealing (heating steel, then cooling it very slowly) the same steel would.',
    correctAnswer: false,
    rationale:
      "This is false: it is the other way around. Quenching's rapid cooling produces hard martensite instead of the soft phases seen in annealed steel, so quenched steel ends up much harder (and more brittle) than annealed steel, not softer or more bendable.",
  },
  {
    id: 'ih-023',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt: 'Tempering is carried out on steel that has already been hardened by quenching (fast cooling in water or oil). What does the tempering step actually involve?',
    choices: [
      "Reheating the quenched steel to a temperature below its critical (transformation) temperature, then cooling it again",
      'Reheating the steel above the austenite temperature a second time',
      'Quenching the steel again in an even colder bath',
      'Leaving the steel completely untouched after quenching',
    ],
    correctIndex: 0,
    rationale:
      'Tempering reheats already-quenched steel to a temperature below the point where austenite (the form iron takes when very hot) would form again, holds it there briefly, and then cools it, which adjusts the hardened structure without undoing the hardening entirely.',
  },
  {
    id: 'ih-024',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt: 'What trade-off does tempering (a gentle reheat after quenching) a quenched (rapidly cooled) steel produce?',
    choices: [
      'It makes the steel harder and more brittle than it was right after quenching',
      'It converts any remaining austenite (the form iron takes when very hot) back into liquid steel',
      "It has no measurable effect on the steel's properties",
      'It gives up some hardness in exchange for greater toughness (better resistance to cracking) and reduced brittleness',
    ],
    correctIndex: 3,
    rationale:
      'Tempering trades away a portion of the extreme hardness gained from quenching in exchange for toughness, meaning the steel becomes better able to absorb shocks and resist cracking, which is usually a worthwhile swap for practical use.',
  },
  {
    id: 'ih-025',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt: 'Case hardening (surface hardening) is designed to give a finished part which combination of properties?',
    choices: [
      'A soft outer layer wrapped around an extremely hard, brittle core',
      'A hard, wear-resistant outer layer (the case) sitting over a softer, tougher inner core',
      'Identical hardness all the way from the surface to the center',
      'A part that turns liquid at the surface',
    ],
    correctIndex: 1,
    rationale:
      'Case hardening deliberately creates two different zones in one part: a hard, wear-resistant outer layer called the case, and a softer, tougher core underneath that can absorb shocks without cracking.',
  },
  {
    id: 'ih-026',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt: 'Carburizing, one method of case hardening, works by doing what to a low-carbon steel part?',
    choices: [
      'Removing all of the carbon from the entire part',
      'Melting the whole part down and recasting it',
      'Adding extra carbon into the surface layer only, so the surface becomes high-carbon while the interior stays low-carbon',
      'Coating the part in pure cementite (hard, brittle iron carbide) with no heating step involved',
    ],
    correctIndex: 2,
    rationale:
      'Carburizing pushes extra carbon into just the outer surface of a low-carbon steel part, so after heat treatment the surface (now high in carbon) hardens well, while the low-carbon interior stays soft and tough.',
  },
  {
    id: 'ih-027',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt:
      'A large steel gear needs a hardened surface, but heating the whole part in a furnace would be slow and impractical. Which surface-hardening approach heats only a thin outer layer directly, using a torch or an induction coil, before it is rapidly quenched?',
    choices: [
      'Flame or induction hardening, which rapidly heats only a thin surface layer and leaves the core largely unaffected',
      'Full annealing (heating steel, then cooling it very slowly) of the entire gear',
      'Slow furnace cooling of the entire gear',
      'Tempering (a gentle reheat after quenching) the gear without ever reheating it into the austenite (the form iron takes when very hot) phase',
    ],
    correctIndex: 0,
    rationale:
      'Flame hardening and induction hardening both heat only a thin outer layer of a part directly, using a torch flame or an electrically induced current, and then rapidly quench that layer, leaving the core close to its original condition; this suits large parts like gears where heating the whole piece in a furnace would be impractical.',
  },
  {
    id: 'ih-028',
    topic: 'ironCarbonHeat',
    type: 'tf',
    prompt: 'Case hardening leaves a part with a soft outer surface sitting over a hard, brittle core.',
    correctAnswer: false,
    rationale:
      'This is false: it is the reverse. Case hardening actually produces a hard, wear-resistant outer surface (the case) over a softer, tougher core, not a soft surface over a hard core.',
  },
  {
    id: 'ih-029',
    topic: 'ironCarbonHeat',
    type: 'mcq',
    prompt:
      'As the cooling rate applied to austenite (the form iron takes when very hot) increases, moving from slow furnace cooling toward rapid water quenching, what generally happens to the resulting structure and hardness?',
    choices: [
      'The structure and hardness stay exactly the same no matter how fast the steel is cooled',
      'The structure shifts from coarse pearlite toward finer pearlite and eventually toward hard, brittle martensite, and hardness rises along with it',
      'Faster cooling always produces a softer structure than slow cooling does',
      'Faster cooling prevents austenite from ever forming in the first place',
    ],
    correctIndex: 1,
    rationale:
      'Cooling rate directly controls what austenite turns into: slow cooling gives coarse, soft pearlite, moderately fast cooling gives finer pearlite, and very fast cooling (quenching) gives hard, brittle martensite, so hardness climbs as the cooling rate climbs.',
  },
  {
    id: 'ih-030',
    topic: 'ironCarbonHeat',
    type: 'tf',
    prompt: 'Rapidly quenching (fast cooling in water or oil) austenite (the form iron takes when very hot) tends to produce a softer structure than slowly cooling the same steel through annealing (heating then very slow cooling) would.',
    correctAnswer: false,
    rationale:
      'This is false: it is the reverse. Slow cooling gives carbon atoms time to diffuse (spread out) and form the soft ferrite-and-cementite (hard, brittle iron carbide) layers of pearlite, while rapid quenching traps the carbon in place and forms hard, brittle martensite, so quenching produces the harder structure, not the softer one.',
  },
];
