import type { MaterialsDrill } from './materialsTypes.ts';

export { MATERIALS_DRILL_LABELS } from './materialsTypes.ts';
export type { MaterialsDrill, MaterialsDrillKind, RubricPoint } from './materialsTypes.ts';

export const materialsDrills: MaterialsDrill[] = [
  // ---------------------------------------------------------------------
  // introClassification
  // ---------------------------------------------------------------------
  {
    id: 'mdr-001',
    topic: 'introClassification',
    drillKind: 'defineTerms',
    type: 'drill',
    prompt:
      'Name and briefly define the SIX classes of engineering materials used in this course. ' +
      'For each class, give one defining feature and one everyday example.',
    marks: 6,
    rubric: [
      { id: 'r1', label: 'Metals', detail: 'Atoms sit in a regular, repeating (crystalline) pattern; good conductors of heat and electricity; ductile (can be bent or stretched without snapping). Example: steel, copper.', marks: 1 },
      { id: 'r2', label: 'Polymers', detail: 'Built from long chains of carbon-based molecules; light and usually a poor conductor. Example: a plastic bottle.', marks: 1 },
      { id: 'r3', label: 'Ceramics', detail: 'A combination of metal and non-metal atoms locked into a rigid arrangement; hard and heat resistant but brittle (cracks rather than bends). Example: a fired-clay brick or window glass.', marks: 1 },
      { id: 'r4', label: 'Composites', detail: 'Two or more of the other classes combined so the mixture has properties neither ingredient has alone. Example: fibreglass.', marks: 1 },
      { id: 'r5', label: 'Electronic materials', detail: 'Chosen and engineered to control how electric current moves through them. Example: a silicon computer chip.', marks: 1 },
      { id: 'r6', label: 'Smart materials', detail: 'Sense a change in their surroundings and respond to it on their own. Example: a shape-memory alloy wire.', marks: 1 },
    ],
    modelAnswer:
      'This course groups engineering materials into six classes. Metals have atoms lined up in a regular, repeating pattern (a crystalline structure); this lets electrons move freely, so metals conduct heat and electricity well, and it also lets layers of atoms slide past one another, so metals are ductile - they bend or stretch rather than snap. Steel and copper are everyday metals.\n\n' +
      'Polymers are built from long chains of carbon-based molecules. Because these chains are loosely packed and lightweight, polymers tend to be light and poor conductors of heat and electricity. A plastic bottle is a polymer.\n\n' +
      'Ceramics mix metal and non-metal atoms in a tightly bonded arrangement. This makes them hard and able to survive high temperatures, but brittle - meaning they crack or shatter instead of bending under stress. A fired-clay brick or a pane of window glass are ceramics.\n\n' +
      'Composites combine two or more of the classes above - often a fibre inside a resin - so the finished material has a mix of properties that neither ingredient could give on its own, such as high strength with low weight. Fibreglass, glass fibres set inside a polymer, is a common example.\n\n' +
      'Electronic materials are chosen specifically for how precisely they can control the flow of electric current, ranging from letting it through easily to blocking it almost completely. A silicon computer chip is built from electronic materials.\n\n' +
      'Smart materials can sense a change around them, such as a change in temperature, pressure, or a magnetic field, and respond to it automatically without any outside control system. A shape-memory alloy wire, which straightens back out once warmed, is a smart material.',
  },
  {
    id: 'mdr-002',
    topic: 'introClassification',
    drillKind: 'classify',
    type: 'drill',
    prompt:
      'Classify each everyday object below into one of the six material classes (metals, polymers, ceramics, composites, ' +
      'electronic materials, smart materials), and justify each choice with one property:\n' +
      '(a) a copper electrical cable\n(b) a glazed ceramic coffee mug\n(c) a fibreglass canoe hull\n' +
      '(d) an eyeglass frame that straightens itself out after being bent, once warmed by body heat',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Cable classified', detail: 'Metal, because copper is an excellent conductor of electricity and is also ductile enough to be drawn into wire.', marks: 2 },
      { id: 'r2', label: 'Mug classified', detail: 'Ceramic, because fired clay is hard, heat resistant, and holds its shape, but would crack (brittle) if dropped.', marks: 2 },
      { id: 'r3', label: 'Canoe hull classified', detail: 'Composite, because embedding glass fibres in a polymer resin gives a hull that is both strong and light, a combination neither material offers alone.', marks: 2 },
      { id: 'r4', label: 'Eyeglass frame classified', detail: 'Smart material, because the frame senses a rise in temperature and responds by returning to its trained shape without any outside control.', marks: 2 },
    ],
    modelAnswer:
      'The copper electrical cable belongs to the metal class. Copper atoms are arranged in a crystalline pattern with electrons that move freely between them, which is exactly what lets the cable carry current efficiently; copper is also ductile, meaning it can be drawn out into long wire without snapping.\n\n' +
      'The glazed coffee mug belongs to the ceramic class. It is made of fired clay, a mixture of metal and non-metal atoms bonded into a rigid structure, which is why it survives boiling-hot liquid and holds its shape indefinitely, yet it is brittle - a hard knock on a tile floor will crack it rather than dent it.\n\n' +
      'The fibreglass canoe hull is a composite. It is built from thin glass fibres, which are strong but on their own would be too stiff and fragile to hold a shape, set inside a polymer resin, which on its own would be too weak. Combined, the fibres carry the load while the resin holds them together, giving a hull that is both light and tough - a property neither ingredient has by itself.\n\n' +
      'The eyeglass frame is a smart material, most likely a shape-memory alloy such as nitinol (a nickel-titanium alloy). It is bent out of shape like an ordinary metal frame, but once it warms past a set transition temperature (from being worn against the skin), it senses that temperature change and straightens itself back to its original trained shape automatically, with no lever, spring, or outside switch needed - the defining behavior of a smart material rather than a plain metal.',
  },
  {
    id: 'mdr-003',
    topic: 'introClassification',
    drillKind: 'compare',
    type: 'drill',
    prompt:
      'Compare METALS, CERAMICS, and POLYMERS under these headings:\n' +
      '(a) how their atoms or molecules are typically arranged\n(b) electrical conductivity\n(c) typical strength/brittleness behavior',
    marks: 9,
    rubric: [
      { id: 'r1', label: 'Metal arrangement', detail: 'Atoms sit in a regular, repeating crystal lattice.', marks: 1 },
      { id: 'r2', label: 'Metal conductivity', detail: 'Excellent conductor; loosely held electrons drift freely through the lattice.', marks: 1 },
      { id: 'r3', label: 'Metal strength behavior', detail: 'Tough and ductile - bends or stretches noticeably before it finally breaks.', marks: 1 },
      { id: 'r4', label: 'Ceramic arrangement', detail: 'Crystalline (except glasses), with metal and non-metal atoms locked tightly together.', marks: 1 },
      { id: 'r5', label: 'Ceramic conductivity', detail: 'Poor conductor; electrons are held tightly in the bonds rather than free to move.', marks: 1 },
      { id: 'r6', label: 'Ceramic strength behavior', detail: 'Hard but brittle - shatters with little or no warning once its limit is passed.', marks: 1 },
      { id: 'r7', label: 'Polymer arrangement', detail: 'Long, tangled carbon-based chains, only partly ordered rather than in a strict repeating lattice.', marks: 1 },
      { id: 'r8', label: 'Polymer conductivity', detail: 'Poor conductor; commonly used as electrical insulation for this reason.', marks: 1 },
      { id: 'r9', label: 'Polymer strength behavior', detail: 'Flexible with moderate strength, and softens well before metals or ceramics would fail.', marks: 1 },
    ],
    modelAnswer:
      'Metals have their atoms arranged in a regular, repeating crystal lattice. That neat packing leaves outer electrons loosely held, so they drift freely through the whole piece, giving metals excellent electrical and heat conductivity. The same loose, non-directional bonding lets layers of atoms slide past each other under load, so metals are typically tough and ductile - they bend and stretch noticeably rather than snapping without warning.\n\n' +
      'Ceramics are also crystalline (glass, a ceramic, is an exception), but they are built from metal and non-metal atoms bonded tightly together in fixed positions. Because those electrons are locked into the bonds rather than free to wander, ceramics conduct electricity poorly. The same rigid, immovable bonding that gives ceramics their hardness also means they cannot bend to relieve stress, so they are brittle - they crack or shatter suddenly instead of deforming first.\n\n' +
      'Polymers are made of long, tangled chains of carbon-based molecules that are only partly ordered - some regions are crystalline and others are a disordered tangle, unlike the strict repeating pattern in metals or ceramics. Their electrons stay bound within each chain rather than moving freely between chains, so polymers are poor electrical conductors, which is exactly why they are used to insulate electrical wires. Mechanically, the loosely tangled chains can uncoil and slide somewhat, so polymers are flexible with only moderate strength, and they soften at temperatures far lower than a metal or ceramic would need to fail.\n\n' +
      'Put together, the three classes trade off in a clear pattern: metals give the best balance of conductivity and toughness, ceramics trade conductivity and flexibility for hardness and heat resistance, and polymers trade strength for lightness, flexibility, and electrical insulation.',
  },

  // ---------------------------------------------------------------------
  // atomicCrystal
  // ---------------------------------------------------------------------
  {
    id: 'mdr-004',
    topic: 'atomicCrystal',
    drillKind: 'defineTerms',
    type: 'drill',
    prompt:
      'Define IONIC, COVALENT, METALLIC, and VAN DER WAALS bonding. For each, briefly explain what holds the atoms or molecules together.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Ionic bond', detail: 'One atom gives up an electron and another takes it, creating a positive ion and a negative ion that attract each other electrostatically. Example: table salt (NaCl).', marks: 2 },
      { id: 'r2', label: 'Covalent bond', detail: 'Two atoms share a pair of electrons between them to complete their outer shells, forming a strong, fixed-direction bond. Example: diamond.', marks: 2 },
      { id: 'r3', label: 'Metallic bond', detail: 'Positively charged metal ions sit in a lattice surrounded by a shared "sea" of electrons that belong to no single atom, free to move throughout the metal.', marks: 2 },
      { id: 'r4', label: 'Van der Waals bond', detail: 'A weak attraction between molecules caused by brief, uneven charge shifts, with no electrons actually transferred or shared - far weaker than the other three bond types.', marks: 2 },
    ],
    modelAnswer:
      'An ionic bond forms when one atom gives up an electron completely and a neighbouring atom takes it in. This creates two charged particles, called ions - one positive (having lost an electron) and one negative (having gained one) - which then attract each other simply because opposite charges pull together. Table salt, sodium chloride, is held together this way.\n\n' +
      'A covalent bond forms when two atoms each contribute one electron to a shared pair sitting between them, so both atoms effectively complete their outer electron shell at the same time. Because the shared electrons sit in a fixed spot between two specific atoms, covalent bonds point in a definite direction and are very strong. Diamond, where every carbon atom is covalently bonded to four neighbours, is an example.\n\n' +
      'A metallic bond is different again: the atoms give up their outer electrons not to one specific neighbour but to the whole structure at once, so positively charged metal ions sit fixed in a lattice while a shared "sea" of electrons moves freely around and between them, belonging to no single ion. This freely moving electron sea is what lets metals conduct electricity and heat so well, and it also lets the metal ions slide past one another without breaking the bond, which is why metals can be bent or drawn into wire.\n\n' +
      'A van der Waals bond is the weakest of the four. It comes from brief, uneven shifts of charge inside atoms or molecules that momentarily create a small positive side and a small negative side, pulling neighbouring molecules together slightly. No electrons are ever actually transferred or shared, which is why this attraction is far weaker than ionic, covalent, or metallic bonding, and easily overcome by heat or force.',
  },
  {
    id: 'mdr-005',
    topic: 'atomicCrystal',
    drillKind: 'compare',
    type: 'drill',
    prompt:
      'Compare the BODY-CENTERED CUBIC (BCC) and FACE-CENTERED CUBIC (FCC) crystal structures under:\n' +
      '(a) number of atoms per unit cell\n(b) coordination number (nearest-neighbour count)\n' +
      '(c) packing density\n(d) typical mechanical behavior, with one example metal each',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'BCC atoms per cell + example', detail: '2 atoms per unit cell (one shared corner set plus one whole center atom); example: alpha-iron or chromium.', marks: 1 },
      { id: 'r2', label: 'FCC atoms per cell + example', detail: '4 atoms per unit cell (shared corner atoms plus shared face-center atoms); example: aluminium, copper, or nickel.', marks: 1 },
      { id: 'r3', label: 'BCC coordination number', detail: '8 nearest neighbours around each atom.', marks: 1 },
      { id: 'r4', label: 'FCC coordination number', detail: '12 nearest neighbours around each atom.', marks: 1 },
      { id: 'r5', label: 'Packing density comparison', detail: 'FCC packs its atoms more tightly (a higher packing factor - the fraction of space actually filled by atoms) than BCC does.', marks: 2 },
      { id: 'r6', label: 'BCC mechanical behavior', detail: 'Generally harder and less easily deformed, because the looser packing gives atoms fewer easy directions to slide past each other.', marks: 1 },
      { id: 'r7', label: 'FCC mechanical behavior', detail: 'Generally more ductile, because the tighter packing offers more directions along which atom layers can slip past one another.', marks: 1 },
    ],
    modelAnswer:
      'A body-centered cubic (BCC) unit cell has one whole atom sitting in the middle of the cube plus eight corner atoms, each shared between eight neighbouring cells and so only counting as one-eighth apiece - adding up to 2 atoms per cell overall. Alpha-iron (the room-temperature form of iron) and chromium are examples of BCC metals. A face-centered cubic (FCC) unit cell instead has an atom centered on each of the six faces, each shared between two cells, plus the same fractional corner atoms, adding up to 4 atoms per cell. Aluminium, copper, and nickel are FCC metals.\n\n' +
      'Counting how many atoms directly touch a given atom (the coordination number) gives 8 for BCC and 12 for FCC. That higher number for FCC comes from its atoms nesting closer together, which also gives FCC a higher packing factor - the fraction of the unit cell\'s volume actually filled by atoms - than the looser BCC arrangement.\n\n' +
      'That difference in packing carries through to how the two structures behave under load. In BCC metals, the atoms are not packed quite closely enough to slide past each other easily in many directions, so BCC metals such as chromium tend to be harder and less easily bent. In FCC metals, the tighter, more evenly spaced packing offers more directions along which whole planes of atoms can slip over one another when the metal is stressed, which is why FCC metals such as copper and nickel are usually more ductile and easier to draw or bend into shape than typical BCC metals.',
  },
  {
    id: 'mdr-006',
    topic: 'atomicCrystal',
    drillKind: 'explainProcess',
    type: 'drill',
    prompt:
      'Explain, step by step, how the metallic bond model accounts for (a) why metals conduct electricity and heat so well, and ' +
      '(b) why metals can be bent or drawn into shape (ductility) without breaking.',
    marks: 7,
    rubric: [
      { id: 'r1', label: 'Describe the metallic bond', detail: 'Positive metal ion cores sit fixed in a lattice, surrounded by a shared "sea" of loosely held valence electrons that belong to the structure as a whole rather than to any one ion.', marks: 2 },
      { id: 'r2', label: 'Explain conductivity', detail: 'Those free electrons drift through the whole lattice under an applied voltage or temperature difference, carrying electric charge and heat energy readily from one place to another.', marks: 2 },
      { id: 'r3', label: 'Explain ductility', detail: 'Because the bond is non-directional (it does not tie any one electron to any one fixed spot), rows of positive ions can slide past one another under stress without breaking the bond that holds the structure together.', marks: 2 },
      { id: 'r4', label: 'Link the two properties', detail: 'Both conductivity and ductility ultimately come from the same feature of the metallic bond: electrons shared freely across the whole structure rather than locked between two specific atoms.', marks: 1 },
    ],
    modelAnswer:
      'The metallic bond pictures a metal as a regular lattice of positively charged metal ions - atoms that have given up their loosely held outer electrons - sitting in fixed positions, surrounded by a shared "sea" of those electrons that no longer belong to any single ion. Unlike a covalent bond, where a pair of electrons is pinned between two particular atoms, this electron sea belongs to the whole piece of metal at once.\n\n' +
      'Because those electrons are not tied down, they move readily whenever a voltage is applied across the metal, carrying electric charge from one end to the other; the same free movement lets them pick up and pass along heat energy quickly as well, which is why metals are excellent conductors of both electricity and heat.\n\n' +
      'Ductility follows from a different consequence of the same setup. Since the bond holding the lattice together is not pointed in any fixed direction between specific atoms, whole rows of positive ions can slide over one another when the metal is bent, stretched, or hammered, with the surrounding electron sea simply flowing along and continuing to hold everything together afterward. A covalent or ionic solid cannot do this: sliding its atoms would break specific, fixed bonds and shatter the material, which is exactly why ceramics (mostly ionic or covalent) are brittle while metals bend.\n\n' +
      'So both properties trace back to one underlying feature of the metallic bond: electrons shared freely across the entire structure, rather than locked between any two particular atoms. That freedom lets the electrons carry current and heat, and it lets the ion lattice deform instead of cracking.',
  },

  // ---------------------------------------------------------------------
  // solidificationDefects
  // ---------------------------------------------------------------------
  {
    id: 'mdr-007',
    topic: 'solidificationDefects',
    drillKind: 'explainProcess',
    type: 'drill',
    prompt:
      'Explain, in order, the stages by which a pure molten metal solidifies into a solid crystalline structure, naming the ' +
      'two nucleation mechanisms involved.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Nucleation stage overview', detail: 'Once the melt cools below its freezing point, tiny stable clusters of atoms called nuclei begin forming inside the liquid.', marks: 2 },
      { id: 'r2', label: 'Homogeneous nucleation', detail: 'Nuclei form spontaneously throughout the liquid using only the metal\'s own atoms bonding together, and this needs the melt to be cooled well below its normal freezing point first.', marks: 1 },
      { id: 'r3', label: 'Heterogeneous nucleation', detail: 'Nuclei form more easily on an existing surface, such as a mold wall or a floating impurity particle, and needs much less cooling below the freezing point to get started.', marks: 1 },
      { id: 'r4', label: 'Growth stage', detail: 'Once nuclei are stable, surrounding liquid atoms attach onto them, and each nucleus grows outward into an individual crystal (a grain).', marks: 2 },
      { id: 'r5', label: 'Completion of solidification', detail: 'Neighbouring grains keep growing until they run into each other, at which point growth stops and the whole liquid has become one solid piece made of many separate grains meeting at grain boundaries.', marks: 2 },
    ],
    modelAnswer:
      'Solidification begins once the molten metal cools below its freezing point. At that point, tiny clusters of atoms start to bond together inside the liquid and form stable nuclei - the very first specks of solid structure.\n\n' +
      'These nuclei can appear in two different ways. Homogeneous nucleation happens when the metal\'s own atoms bond together spontaneously anywhere inside the liquid, with no outside help; because this is the harder of the two ways to get a stable nucleus started, it only happens once the melt has been cooled a fair amount below its normal freezing point. Heterogeneous nucleation happens instead on an existing surface already present in the liquid, such as the inner wall of a mold or a floating solid impurity particle; that surface gives the new nucleus something to cling to right away, so heterogeneous nucleation needs much less cooling below the freezing point before it gets going, and it is the more common route in real castings.\n\n' +
      'Once a nucleus is stable, the next stage is growth: atoms still moving around in the surrounding liquid attach themselves onto the nucleus one by one, and the nucleus steadily grows outward in every direction, becoming an individual crystal known as a grain.\n\n' +
      'Finally, many separate grains are growing at once throughout the melt, each starting from its own nucleus and often pointing in a slightly different crystal direction. As they expand, neighbouring grains eventually meet each other and can grow no further at that point. Once every last drop of liquid has been consumed this way, the whole casting has become fully solid, made up of many individual grains packed together, with grain boundaries marking the irregular surfaces where growth from different directions finally collided.',
  },
  {
    id: 'mdr-008',
    topic: 'solidificationDefects',
    drillKind: 'defineTerms',
    type: 'drill',
    prompt:
      'Define VACANCY, SELF-INTERSTITIAL ATOM, SUBSTITUTIONAL IMPURITY ATOM, and DISLOCATION as crystal defects, noting ' +
      'whether each is a point defect or a line defect.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Vacancy', detail: 'Point defect - an empty lattice site where an atom is simply missing.', marks: 2 },
      { id: 'r2', label: 'Self-interstitial atom', detail: 'Point defect - an extra atom of the host material squeezed into a small gap between the normal lattice positions, distorting the surrounding atoms.', marks: 2 },
      { id: 'r3', label: 'Substitutional impurity atom', detail: 'Point defect - a foreign atom that sits directly in place of a host atom on a regular lattice site, rather than in a gap.', marks: 2 },
      { id: 'r4', label: 'Dislocation', detail: 'Line (linear) defect - a whole row of atoms out of their normal position, whose movement through the lattice lets planes of atoms slip past one another under stress.', marks: 2 },
    ],
    modelAnswer:
      'A vacancy is a point defect: it is simply a lattice site where an atom should be sitting but is missing, leaving a tiny empty gap surrounded by otherwise normal atoms. It is called a point defect because it affects only that one spot in the crystal.\n\n' +
      'A self-interstitial atom is also a point defect. Here, an extra atom of the same material as the surrounding lattice has crowded its way into one of the small open spaces between regular lattice positions, rather than sitting on a proper site of its own. Because this squeezed-in atom does not really fit, it pushes its neighbours slightly out of place, distorting the lattice around that single point.\n\n' +
      'A substitutional impurity atom is another point defect, but of a different kind: instead of squeezing into a gap, a foreign atom (one different from the host material) takes the place of a host atom directly on a normal lattice site. The surrounding lattice may still distort a little if the foreign atom is a different size, but the defect is still centred on that one substituted position.\n\n' +
      'A dislocation, by contrast, is a line (linear) defect rather than a point defect, because it stretches through the crystal along a row of atoms rather than sitting at a single spot. A dislocation is a line along which the atoms are out of their normal, orderly positions. What makes dislocations especially important is that they can move through the lattice: when a dislocation shifts, it lets one plane of atoms slip past the plane next to it one small step at a time, which is the underlying mechanism behind a metal bending or stretching permanently (plastic deformation) instead of simply staying rigid or shattering.',
  },
  {
    id: 'mdr-009',
    topic: 'solidificationDefects',
    drillKind: 'compare',
    type: 'drill',
    prompt:
      'Compare SUBSTITUTIONAL and INTERSTITIAL solid solutions under:\n' +
      '(a) where the solute atom sits\n(b) the size condition needed for it to form\n(c) one example alloy of each',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Substitutional location', detail: 'The solute atom takes the place of a solvent atom directly on a regular lattice site.', marks: 2 },
      { id: 'r2', label: 'Substitutional size condition', detail: 'Forms most readily when the solute and solvent atoms are fairly close in size, so one can stand in for the other without badly distorting the lattice.', marks: 1 },
      { id: 'r3', label: 'Substitutional example', detail: 'Sterling silver (silver with copper) or brass (copper with zinc).', marks: 1 },
      { id: 'r4', label: 'Interstitial location', detail: 'The solute atom squeezes into the small open spaces between the solvent\'s regular lattice atoms, without displacing any of them.', marks: 2 },
      { id: 'r5', label: 'Interstitial size condition', detail: 'Forms only when the solute atom is much smaller than the solvent atom, small enough to fit into those tight gaps.', marks: 1 },
      { id: 'r6', label: 'Interstitial example', detail: 'Carbon dissolved in iron, as found in steel.', marks: 1 },
    ],
    modelAnswer:
      'In a substitutional solid solution, the solute atom (the one being dissolved) actually takes the place of a solvent atom (the host metal doing the dissolving), sitting directly on one of the solvent\'s regular lattice positions rather than squeezing in anywhere extra. For this kind of swap to work well, the solute and solvent atoms need to be fairly close to one another in size; if they are too different, the lattice around the substituted atom distorts badly and the solid solution becomes unstable. Sterling silver, in which some copper atoms take the place of silver atoms, and brass, in which zinc atoms take the place of copper atoms, are both examples of substitutional solid solutions.\n\n' +
      'In an interstitial solid solution, the solute atom does not replace anything; instead it squeezes into one of the small open spaces (interstices) that naturally exist between the solvent\'s regularly positioned atoms, leaving every original solvent atom exactly where it was. This only works if the solute atom is much smaller than the solvent atom, small enough to actually fit into those tight gaps without forcing the lattice too far out of shape. The classic example is carbon dissolved in iron, which is exactly what makes steel: the much smaller carbon atoms tuck into the gaps of the iron lattice rather than replacing iron atoms outright.\n\n' +
      'The key difference, then, is simply where the solute atom ends up: standing in for a solvent atom on its own site (substitutional), or hiding in the gaps between solvent atoms (interstitial) - and that in turn is decided almost entirely by how the solute atom\'s size compares with the solvent atom\'s size.',
  },

  // ---------------------------------------------------------------------
  // mechanicalTesting
  // ---------------------------------------------------------------------
  {
    id: 'mdr-010',
    topic: 'mechanicalTesting',
    drillKind: 'defineTerms',
    type: 'drill',
    prompt: 'Define HARDNESS, TOUGHNESS, DUCTILITY, and CREEP as mechanical properties of a material.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Hardness', detail: 'A surface\'s resistance to being permanently dented, scratched, or penetrated.', marks: 2 },
      { id: 'r2', label: 'Toughness', detail: 'The amount of energy a material can soak up before it finally fractures, combining both strength and the ability to deform.', marks: 2 },
      { id: 'r3', label: 'Ductility', detail: 'The ability of a material to be stretched, bent, or drawn out into a thin wire without cracking or breaking.', marks: 2 },
      { id: 'r4', label: 'Creep', detail: 'Slow, ongoing, permanent stretching that builds up in a material held under a constant load at high temperature over a long period of time.', marks: 2 },
    ],
    modelAnswer:
      'Hardness is the resistance a material\'s surface offers against being permanently dented, scratched, or pressed into by something harder. A hard material shrugs off scratches and indentations that a softer one would carry away.\n\n' +
      'Toughness is a measure of how much energy a material can absorb before it finally cracks apart. It is really a combination of two things: how strong the material is (how much stress it can carry) and how much it can deform (stretch or bend) along the way, so a tough material neither snaps immediately under a sudden shock nor gives way at the first sign of stress - it takes a substantial amount of energy to finally break it.\n\n' +
      'Ductility describes how far a material can be stretched, bent, or twisted permanently before it cracks or snaps. A highly ductile material, such as copper, can be drawn out into a long thin wire without breaking, while a material with low ductility will crack after only a small amount of bending.\n\n' +
      'Creep is different from the other three because time and temperature both matter here. It is the slow, continuing, permanent stretching that builds up in a material when it is held under a steady load at high temperature for a long stretch of time - the load itself never changes, but the material keeps very gradually elongating anyway, which matters a great deal for parts such as turbine blades that sit under constant stress at high operating temperatures for years.',
  },
  {
    id: 'mdr-011',
    topic: 'mechanicalTesting',
    drillKind: 'compare',
    type: 'drill',
    prompt:
      'Compare the BRINELL and ROCKWELL hardness tests under:\n' +
      '(a) what is pressed into the surface\n(b) what is actually measured to get the hardness number\n(c) one advantage of each',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Brinell indenter', detail: 'A hard steel or carbide ball pressed into the surface under a known load.', marks: 1 },
      { id: 'r2', label: 'Brinell measurement', detail: 'The hardness number comes from dividing the load by the surface area of the round dent left behind, so the dent\'s diameter has to be measured afterward.', marks: 1 },
      { id: 'r3', label: 'Brinell advantage', detail: 'The large ball and dent give a good average reading even on a coarse or non-uniform surface.', marks: 1 },
      { id: 'r4', label: 'Rockwell indenter', detail: 'Either a pointed diamond cone or a small hardened-steel ball, pressed in under two loads applied one after the other.', marks: 1 },
      { id: 'r5', label: 'Rockwell measurement', detail: 'The hardness number is read directly from the difference in indentation depth between the two loads, with no separate measurement of the dent needed.', marks: 1 },
      { id: 'r6', label: 'Rockwell advantage', detail: 'Much faster for routine testing, since the number can be read straight off the machine without extra calculation.', marks: 2 },
      { id: 'r7', label: 'Overall comparison', detail: 'Rockwell suits quick, repeated shop testing, while Brinell suits rougher or less uniform surfaces where an averaged reading matters more.', marks: 1 },
    ],
    modelAnswer:
      'The Brinell test presses a hard steel or tungsten-carbide ball into the surface under a known, fixed load. Once the ball is removed, the diameter of the round dent it leaves behind is measured under a microscope, and the hardness number (the Brinell hardness number) is worked out by dividing the applied load by the actual surface area of that dent - so getting the final number always requires this extra measuring step. Because the ball and the resulting dent are fairly large, the Brinell test averages out small local variations in the material, which makes it well suited to coarse, cast, or otherwise non-uniform surfaces.\n\n' +
      'The Rockwell test instead uses either a pointed diamond cone or a small hardened-steel ball, and applies two loads one after another: a light "preliminary" load first, followed by a heavier "major" load. The hardness number is read directly from how much deeper the indenter sank between the two loads - there is no dent to measure with a microscope afterward, so the number can simply be read straight off the testing machine\'s dial or display. This makes the Rockwell test much quicker to carry out, which is exactly why it is the preferred choice for routine, repeated testing in a production shop.\n\n' +
      'Overall, the two tests trade speed for averaging: Rockwell is faster and needs no extra measurement step, so it suits quick day-to-day quality checks, while Brinell leaves a larger dent that better represents rough or non-uniform material, so it suits castings and coarse-grained metals where a single small indentation might not be representative.',
  },
  {
    id: 'mdr-012',
    topic: 'mechanicalTesting',
    drillKind: 'explainProcess',
    type: 'drill',
    prompt:
      'Explain how a tensile test is carried out and describe FOUR things the resulting stress-strain curve reveals about the material.',
    marks: 9,
    rubric: [
      { id: 'r1', label: 'Test setup', detail: 'A shaped sample is gripped at both ends and stretched at a controlled rate while the applied load and the resulting elongation are continuously recorded.', marks: 2 },
      { id: 'r2', label: 'Elastic region reading', detail: 'The initial straight-line part of the curve is the elastic region, fully recoverable once the load is removed; its slope gives the modulus of elasticity (stiffness).', marks: 2 },
      { id: 'r3', label: 'Yield point reading', detail: 'The point where the curve bends away from that straight line marks the yield strength, beyond which any further stretching becomes permanent (plastic) rather than recoverable.', marks: 2 },
      { id: 'r4', label: 'Tensile strength reading', detail: 'The highest point reached on the curve is the tensile strength, the greatest stress the sample carries before it begins to visibly thin down (neck) at one spot.', marks: 2 },
      { id: 'r5', label: 'Fracture / ductility reading', detail: 'The curve ends where the sample finally snaps, and the total stretch reached by that point shows how ductile the material is.', marks: 1 },
    ],
    modelAnswer:
      'A tensile test is carried out by shaping a sample into a standard bar with a narrower gauge section in the middle, then gripping both ends in a testing machine that pulls the two ends apart at a steady, controlled rate. Throughout the test, the machine continuously records the load being applied and how far the sample has stretched, and these readings are plotted against each other to build the stress-strain curve.\n\n' +
      'The first thing that curve reveals is the elastic region: the early part of the curve rises as a straight line, and any stretching in this region is fully recoverable - the sample springs back to its original length if the load is removed before this point. The steepness of that straight line is the modulus of elasticity, also called stiffness, which tells you how strongly the material resists stretching for a given load.\n\n' +
      'The second thing it reveals is the yield point: at some load, the curve stops following that straight line and starts to bend over. This marks the yield strength, the stress beyond which the sample no longer fully springs back - any further stretching becomes permanent, or plastic, deformation.\n\n' +
      'The third thing it reveals is the tensile strength: as loading continues, the curve rises to a peak before finally starting to fall. That peak is the tensile strength, the greatest stress the sample manages to carry, and it usually corresponds to the point where the sample begins to visibly thin down at one spot (necking) rather than stretching evenly along its whole length.\n\n' +
      'Fourth, the curve ends abruptly at the point where the sample actually snaps in two, and the total amount of stretch the curve reached by that final point is a direct measure of the material\'s ductility - a long curve before fracture means a very ductile material, while a short one that ends soon after the elastic region means a brittle one.',
  },

  // ---------------------------------------------------------------------
  // ironCarbonHeat
  // ---------------------------------------------------------------------
  {
    id: 'mdr-013',
    topic: 'ironCarbonHeat',
    drillKind: 'compare',
    type: 'drill',
    prompt:
      'Compare ANNEALING and QUENCHING of a medium-carbon steel under these headings:\n' +
      '(a) how each is carried out\n(b) the structure it produces\n(c) the resulting properties\n(d) one typical use of each',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Annealing method', detail: 'Heat above the critical temperature, then cool very slowly (usually in the switched-off furnace).', marks: 1 },
      { id: 'r2', label: 'Quenching method', detail: 'Heat above the critical temperature, then cool very fast by plunging into water or oil.', marks: 1 },
      { id: 'r3', label: 'Annealing structure', detail: 'Soft, coarse pearlite (layered mixture) - the slow cool gives atoms time to arrange.', marks: 1.5 },
      { id: 'r4', label: 'Quenching structure', detail: 'Martensite - a distorted, stressed structure because trapped carbon had no time to escape.', marks: 1.5 },
      { id: 'r5', label: 'Annealed properties', detail: 'Soft, ductile (bends without breaking), easy to machine; internal stresses relieved.', marks: 1 },
      { id: 'r6', label: 'Quenched properties', detail: 'Very hard and wear-resistant but brittle (snaps rather than bends).', marks: 1 },
      { id: 'r7', label: 'One use of each', detail: 'Annealing: softening steel before machining/forming. Quenching: hardening tools, springs, gears (usually followed by tempering).', marks: 1 },
    ],
    modelAnswer:
      'Annealing means heating the steel until its structure changes to austenite (the form iron takes when very hot), then letting it cool very slowly, usually inside the furnace. The slow cooling gives the atoms time to settle into soft, coarse pearlite - a layered mixture of soft iron and hard iron carbide. The result is steel that is soft, ductile (it bends and stretches without breaking) and easy to machine, with its internal stresses relieved. It is used to soften steel before machining or forming.\n\n' +
      'Quenching heats the steel the same way but then cools it very fast by plunging it into water or oil. The carbon atoms are trapped because they have no time to move, producing martensite - a strained, distorted structure. This makes the steel very hard and wear-resistant but brittle (it snaps rather than bends). It is used to harden cutting tools, springs and gears, and is almost always followed by tempering (a gentle reheat) to trade a little hardness for toughness.',
  },
  {
    id: 'mdr-014',
    topic: 'ironCarbonHeat',
    drillKind: 'defineTerms',
    type: 'drill',
    prompt: 'Define FERRITE, AUSTENITE, CEMENTITE, and PEARLITE as phases or structures found in iron-carbon alloys.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Ferrite', detail: 'Soft, low-carbon form of iron with a body-centered cubic (BCC) arrangement, stable at room temperature and able to dissolve only a tiny amount of carbon.', marks: 2 },
      { id: 'r2', label: 'Austenite', detail: 'Higher-temperature form of iron with a face-centered cubic (FCC) arrangement, able to dissolve far more carbon than ferrite, and does not exist below roughly 723 degrees Celsius.', marks: 2 },
      { id: 'r3', label: 'Cementite', detail: 'Iron carbide, a hard and brittle compound of iron and carbon with a fixed chemical makeup.', marks: 2 },
      { id: 'r4', label: 'Pearlite', detail: 'A layered (lamellar) mixture of alternating bands of ferrite and cementite, formed when austenite cools slowly through the eutectoid transformation.', marks: 2 },
    ],
    modelAnswer:
      'Ferrite is the soft, mostly-pure form of iron that is stable at room temperature. Its atoms sit in a body-centered cubic (BCC) arrangement - a cube of atoms with one extra atom in the middle - which leaves very little room between atoms, so ferrite can only dissolve an extremely small amount of carbon before it can hold no more.\n\n' +
      'Austenite is the form iron takes once heated hot enough that its atoms rearrange into a face-centered cubic (FCC) structure - a cube with an extra atom centered on each face. This roomier arrangement leaves far more space between atoms, letting austenite dissolve much more carbon than ferrite can manage. Austenite is strictly a high-temperature phase: it does not exist at all once the steel cools below roughly 723 degrees Celsius.\n\n' +
      'Cementite is iron carbide, a chemical compound of iron and carbon that always keeps the same fixed proportions of the two elements no matter how it formed. It is extremely hard, but also brittle - it cracks rather than bends under stress - and its presence is largely what gives steel its hardness.\n\n' +
      'Pearlite is not a single phase at all but a layered mixture of the two: as austenite cools slowly through its transformation temperature, it splits apart into alternating thin bands of soft ferrite and hard cementite, packed together like the layers of a sandwich. This banded structure gives pearlite a balance of properties in between the very soft ferrite and the very hard, brittle cementite that make it up.',
  },
  {
    id: 'mdr-015',
    topic: 'ironCarbonHeat',
    drillKind: 'explainProcess',
    type: 'drill',
    prompt:
      'Explain what tempering is, how it is carried out, and why it always follows (never precedes) quenching/hardening.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Why tempering is needed', detail: 'Quenching produces hard martensite that is also full of internal stress and very brittle, so it is usually too fragile to put straight into service.', marks: 2 },
      { id: 'r2', label: 'What tempering is', detail: 'Reheating the already-quenched steel to a temperature below its lower critical point, holding it there for a set time, then cooling it, usually in still air.', marks: 2 },
      { id: 'r3', label: 'What it does structurally', detail: 'The reheat lets some of the trapped stress and carbon in the martensite settle down, giving up a little hardness in exchange for noticeably better toughness and ductility.', marks: 2 },
      { id: 'r4', label: 'Why the order is fixed', detail: 'There is no strained, brittle martensite to relieve until quenching has already created it, so tempering only makes sense as a step carried out after hardening, never before.', marks: 2 },
    ],
    modelAnswer:
      'Tempering exists because of a problem that quenching itself creates. Quenching hardens steel by cooling it so fast that carbon atoms get trapped inside the iron lattice, forming martensite (the very hard, brittle structure formed when steel is cooled too fast for the carbon to escape), an extremely hard structure that also carries a great deal of internal stress. In this freshly quenched state the steel is usually too brittle to be put straight into use - it would crack rather than absorb a sudden knock.\n\n' +
      'Tempering fixes this by reheating the already-hardened steel to a temperature that stays below its lower critical point (the temperature below which the steel\'s structure no longer transforms, about 723 C) - well below the temperature originally used for hardening - holding it there for a set length of time, and then letting it cool, usually just in still air rather than by any special quenching. Because the reheat stays below the critical point, no new austenite forms and the basic hardened structure is not undone, only adjusted.\n\n' +
      'During that hold, some of the carbon trapped in the strained martensite is able to settle into a slightly less stressed arrangement, and much of the built-up internal stress relaxes. This trade-off costs the steel a small amount of its extreme hardness, but in exchange it gains a real, worthwhile improvement in toughness and ductility, making the part far less likely to crack in service.\n\n' +
      'This is also exactly why tempering can only ever follow quenching and never come before it: tempering\'s whole purpose is to relieve the internal stress and brittleness that martensite carries, and that stressed martensite structure does not exist at all until quenching has already created it. Annealed steel, which was never hardened in the first place, simply has nothing for tempering to relieve.',
  },

  // ---------------------------------------------------------------------
  // steelProduction
  // ---------------------------------------------------------------------
  {
    id: 'mdr-016',
    topic: 'steelProduction',
    drillKind: 'explainProcess',
    type: 'drill',
    prompt:
      'Explain, step by step, how a blast furnace converts iron ore into pig iron, including the role of coke, hot air, and limestone.',
    marks: 9,
    rubric: [
      { id: 'r1', label: 'Charging the furnace', detail: 'Iron ore, coke, and limestone are loaded together in layers into the top of the tall furnace stack.', marks: 1 },
      { id: 'r2', label: 'Coke burns', detail: 'A blast of hot air forced in near the bottom burns the coke, releasing heat and producing carbon monoxide gas.', marks: 2 },
      { id: 'r3', label: 'Reduction of the ore', detail: 'The carbon monoxide gas rises up through the charge and reacts with the iron oxide in the ore, stripping away its oxygen and leaving behind molten iron.', marks: 2 },
      { id: 'r4', label: 'Role of limestone', detail: 'The limestone breaks down and combines with the ore\'s earthy, non-metallic impurities to form a melted slag, which is less dense than the iron and floats above it.', marks: 2 },
      { id: 'r5', label: 'Tapping the products', detail: 'The molten iron (pig iron) and the floating slag settle into separate layers at the bottom of the furnace and are drawn off separately.', marks: 2 },
    ],
    modelAnswer:
      'A blast furnace starts with its charge: iron ore, coke (a carbon-rich fuel made from coal), and limestone are all loaded in together, layer upon layer, into the top of the tall furnace stack.\n\n' +
      'Near the bottom of the furnace, a blast of hot air is forced in, and this burns the coke. Burning the coke releases a large amount of heat, which is what keeps the whole furnace hot enough to work, and it also produces carbon monoxide gas as a by-product.\n\n' +
      'That carbon monoxide gas rises up through the layers of charge above it, and on the way it reacts chemically with the iron oxide making up the ore. This reaction pulls the oxygen away from the iron oxide, leaving behind metallic iron, which melts in the heat of the furnace and trickles downward.\n\n' +
      'Meanwhile, the limestone in the charge breaks down under the heat and combines with the earthy, non-metallic impurities that came in with the ore (mainly silica-based material), forming a melted waste product called slag. Slag is noticeably less dense than molten iron, so as both liquids collect at the bottom of the furnace, the slag floats on top of the iron rather than mixing with it.\n\n' +
      'Because the two liquids settle into separate layers, they can be drawn off (tapped) from the bottom of the furnace one at a time: the molten iron, called pig iron once it is drawn off, is tapped from lower down, while the floating slag is tapped from a slightly higher opening. The pig iron produced this way still carries a fair amount of carbon and other impurities, and is either poured directly into cast-iron shapes or sent on to a steelmaking furnace to have its carbon content reduced further.',
  },
  {
    id: 'mdr-017',
    topic: 'steelProduction',
    drillKind: 'compare',
    type: 'drill',
    prompt:
      'Compare the BASIC OXYGEN FURNACE (BOF) and ELECTRIC ARC FURNACE (EAF) steelmaking routes under:\n' +
      '(a) main starting material charged in\n(b) main energy source\n(c) typical batch/cycle style',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'BOF charge', detail: 'Mostly molten pig iron fed straight from the blast furnace, topped up with some steel scrap.', marks: 2 },
      { id: 'r2', label: 'BOF energy source', detail: 'High-speed blown oxygen gas, whose own reaction with the carbon and other impurities in the melt supplies most of the needed heat, without relying on an outside power source.', marks: 1 },
      { id: 'r3', label: 'EAF charge', detail: 'Mainly recycled steel scrap rather than freshly made pig iron.', marks: 2 },
      { id: 'r4', label: 'EAF energy source', detail: 'Electricity, arced between large electrodes and the metal charge, supplies the heat needed to melt it.', marks: 1 },
      { id: 'r5', label: 'Cycle style comparison', detail: 'Both processes run in batches; a BOF batch is typically quick since the oxidation reaction is largely self-sustaining, while an EAF batch (its "tap-to-tap" cycle) depends more on how fast the scrap charge can be melted electrically.', marks: 2 },
    ],
    modelAnswer:
      'The basic oxygen furnace (BOF) is charged mainly with molten pig iron delivered straight from the blast furnace while it is still hot, with only a modest amount of steel scrap added alongside it. High-purity oxygen gas is then blown into this melt at very high speed, and it reacts with the carbon and other impurities still present, and that reaction itself gives off enough heat to keep the whole process running - the BOF needs no separate outside power source to supply heat.\n\n' +
      'The electric arc furnace (EAF) works from a very different starting point: its charge is mainly recycled steel scrap rather than freshly produced pig iron, which makes it well suited to reusing steel that has already served its first purpose. Since there is no equivalent self-heating oxidation reaction driving an EAF, the furnace instead relies on electricity, struck as an arc between large carbon electrodes and the metal charge below them, to supply the heat needed to melt the scrap down.\n\n' +
      'Both furnaces produce steel in batches rather than continuously, but their cycles differ in character. A BOF batch tends to be relatively fast because the oxidation reaction with the blown oxygen is largely self-sustaining once it gets going, so relatively little outside time is needed just to generate heat. An EAF batch, often called its tap-to-tap cycle, instead depends heavily on how quickly the scrap charge can actually be melted down electrically, so its overall cycle time is shaped more by melting speed and furnace power than by any chemical reaction doing the work on its own.',
  },
  {
    id: 'mdr-018',
    topic: 'steelProduction',
    drillKind: 'defineTerms',
    type: 'drill',
    prompt: 'Define PIG IRON, SLAG, and FLUX as used in iron and steel production.',
    marks: 6,
    rubric: [
      { id: 'r1', label: 'Pig iron', detail: 'The impure, high-carbon iron (around 4% carbon, plus other impurities) that comes directly out of the blast furnace.', marks: 2 },
      { id: 'r2', label: 'Slag', detail: 'The floating waste layer formed when the furnace\'s earthy impurities combine with the added limestone, separated off from the molten metal.', marks: 2 },
      { id: 'r3', label: 'Flux', detail: 'A material, such as limestone, deliberately added to the furnace charge to combine chemically with unwanted impurities so they can be carried off in the slag.', marks: 2 },
    ],
    modelAnswer:
      'Pig iron is the impure iron that comes directly out of the blast furnace, before any further refining. It typically carries around 4% carbon along with other leftover impurities such as manganese, phosphorus, sulphur, and silicon, and it is either cast directly into shapes or sent on to a steelmaking furnace to have its carbon and impurity levels brought down further.\n\n' +
      'Slag is the waste layer that separates out on top of the molten iron inside the furnace. It forms when the earthy, non-metallic impurities carried in with the ore combine chemically with added limestone, and because this combined material is less dense than the iron, it floats above it and can be drawn off separately rather than mixing into the finished metal.\n\n' +
      'A flux is the material, most commonly limestone, that is deliberately added to the furnace charge specifically to react with those unwanted impurities. Without a flux, the impurities in the ore would have nothing to combine with and carry away, so the flux is what actually makes it possible to separate the impurities out as slag rather than leaving them stuck in the iron.',
  },

  // ---------------------------------------------------------------------
  // ferrousSteels
  // ---------------------------------------------------------------------
  {
    id: 'mdr-019',
    topic: 'ferrousSteels',
    drillKind: 'classify',
    type: 'drill',
    prompt:
      'For each steel code below, state the steel type and its approximate carbon content:\n' +
      '(a) AISI/SAE 1020\n(b) AISI/SAE 1060\n(c) AISI/SAE 4340\n(d) AISI 304',
    marks: 8,
    rubric: [
      { id: 'r1', label: '1020 classified', detail: 'Plain carbon steel (leading 1, no major secondary alloy) with about 0.20% carbon - a low-carbon grade.', marks: 2 },
      { id: 'r2', label: '1060 classified', detail: 'Plain carbon steel with about 0.60% carbon - a high-carbon grade.', marks: 2 },
      { id: 'r3', label: '4340 classified', detail: 'A molybdenum-family alloy steel (leading 4), alloyed with nickel-chromium-molybdenum, with about 0.40% carbon.', marks: 2 },
      { id: 'r4', label: '304 classified', detail: 'Austenitic stainless steel, roughly 18% chromium and 8% nickel, chosen for its corrosion resistance.', marks: 2 },
    ],
    modelAnswer:
      'AISI/SAE 1020 is a plain carbon steel. The leading digit, 1, marks the plain carbon family, and the following 0 shows that no major secondary alloying element was deliberately added; reading the final two digits, "20," as hundredths of a percent gives about 0.20% carbon, which places it in the low-carbon range - a soft, easily formed and welded grade.\n\n' +
      'AISI/SAE 1060 is also a plain carbon steel, following the same reading rules, but its final two digits, "60," give about 0.60% carbon, putting it well into the high-carbon range - noticeably harder and stronger than 1020, but with less ability to bend without cracking.\n\n' +
      'AISI/SAE 4340 belongs to a different family altogether: the leading digit 4 marks it as part of the molybdenum-alloy group, and in this particular grade molybdenum is combined with nickel and chromium as well, giving a nickel-chromium-molybdenum alloy steel prized for high strength together with good toughness. Its final two digits, "40," still give the carbon content in the usual way, about 0.40%.\n\n' +
      'AISI 304 sits in yet another category: the stainless steels, which are named differently from the plain carbon and alloy steel codes above. It is an austenitic stainless steel (named for its high-temperature-style crystal structure being retained down to room temperature) containing roughly 18% chromium and 8% nickel. That chromium content is what builds the thin, self-repairing protective layer responsible for its strong corrosion resistance, which is the whole reason this grade is chosen over an ordinary plain carbon steel.',
  },
  {
    id: 'mdr-020',
    topic: 'ferrousSteels',
    drillKind: 'selectMaterial',
    type: 'drill',
    prompt:
      'For each application below, select the most suitable steel class and justify your choice with one property:\n' +
      '(a) an automobile body panel\n(b) a metal-cutting tool bit\n(c) a coil spring',
    marks: 9,
    rubric: [
      { id: 'r1', label: 'Car body panel selection', detail: 'A low-carbon (mild) or high-strength low-alloy (HSLA) steel.', marks: 1 },
      { id: 'r2', label: 'Car body panel justification', detail: 'The panel must be pressed into a curved shape and welded without cracking, so a soft, ductile, easily formable low-carbon or HSLA grade is needed.', marks: 2 },
      { id: 'r3', label: 'Cutting tool selection', detail: 'A high-carbon steel or alloyed tool steel.', marks: 1 },
      { id: 'r4', label: 'Cutting tool justification', detail: 'The bit must hold a sharp edge and resist wear, so a hard, wear-resistant high-carbon or tool-steel grade is chosen, accepting reduced ductility in exchange.', marks: 2 },
      { id: 'r5', label: 'Coil spring selection', detail: 'A medium- or high-carbon (or alloy) steel, quenched and tempered.', marks: 1 },
      { id: 'r6', label: 'Coil spring justification', detail: 'The spring must flex repeatedly and spring back rather than staying bent, so it needs high yield strength and good elastic resilience, gained from hardening and tempering a medium-to-high carbon steel.', marks: 2 },
    ],
    modelAnswer:
      'For an automobile body panel, a low-carbon (mild) steel, or a high-strength low-alloy (HSLA) steel where extra strength for weight saving is wanted, is the right choice. Body panels have to be pressed and stretched into curved shapes on a production line and then welded together, so the steel needs to be soft and ductile (able to bend and stretch without cracking) rather than hard; a high-carbon steel would simply split during forming or crack along the weld.\n\n' +
      'For a metal-cutting tool bit, a high-carbon steel, or an alloyed tool steel where even greater wear resistance is needed, is the better fit. A cutting edge has to stay sharp and resist wearing down as it repeatedly cuts through other metal, which calls for high hardness. That hardness is accepted even though it comes at the cost of ductility - a tool bit is not expected to bend, only to hold its edge, so the usual trade-off against toughness is acceptable here.\n\n' +
      'For a coil spring, a medium- or high-carbon steel (or an alloy steel), quenched and then tempered, is the standard choice. A spring has to compress or stretch thousands of times over its life and spring back to its original shape every time rather than staying permanently bent, which calls for high yield strength (so it resists taking a permanent set) combined with good elastic resilience (the ability to absorb and give back energy). Quenching first hardens the steel, and the follow-up tempering trades away a little of that hardness for the toughness needed so the spring does not simply crack under repeated flexing.',
  },
  {
    id: 'mdr-021',
    topic: 'ferrousSteels',
    drillKind: 'compare',
    type: 'drill',
    prompt:
      'Compare GREY CAST IRON and WHITE CAST IRON under:\n' +
      '(a) how the carbon is held in the structure\n(b) resulting hardness/brittleness\n(c) one typical application of each',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Grey CI carbon form', detail: 'Carbon separates out of the structure as flakes of graphite mixed through the iron.', marks: 2 },
      { id: 'r2', label: 'Grey CI properties', detail: 'Relatively soft, easy to machine, and good at damping vibration, but weaker when pulled in tension.', marks: 1 },
      { id: 'r3', label: 'Grey CI application', detail: 'Machine-tool bases or engine blocks, where vibration damping and easy machining matter most.', marks: 1 },
      { id: 'r4', label: 'White CI carbon form', detail: 'Almost all the carbon stays chemically combined as hard cementite (iron carbide), which forms because rapid or controlled cooling stops graphite from separating out.', marks: 2 },
      { id: 'r5', label: 'White CI properties', detail: 'Very hard and highly resistant to wear, but brittle.', marks: 1 },
      { id: 'r6', label: 'White CI application', detail: 'Parts needing extreme abrasion resistance, such as crusher liners or grinding equipment.', marks: 1 },
    ],
    modelAnswer:
      'In grey cast iron, most of the carbon in the alloy separates out of the iron matrix as tiny flakes of graphite, scattered through the structure rather than staying chemically bound to the iron. Those soft graphite flakes act almost like built-in cushions, so grey cast iron is relatively soft, easy to machine (the flakes also help break up the machining chips), and very good at damping vibration - though the flakes also act as small internal weak points, so the material is comparatively weak when pulled in tension. This combination of easy machining and strong vibration damping is exactly why grey cast iron is the standard choice for machine-tool bases and engine blocks.\n\n' +
      'In white cast iron, almost none of the carbon separates out as graphite; instead it stays locked up chemically as cementite (iron carbide), a very hard compound. This happens because the iron is cooled rapidly, or otherwise carefully controlled during solidification, in a way that does not give the carbon time or opportunity to break out as graphite flakes. The result is a structure that is very hard and highly resistant to abrasive wear, but brittle - it offers little tensile strength and can crack suddenly under an impact. Because of this, white cast iron is chosen for parts that mainly need to survive heavy abrasion, such as liners for rock crushers or grinding mill components, where its brittleness is an acceptable trade-off for extreme wear resistance.\n\n' +
      'The underlying difference between the two, then, comes down to whether the carbon separates out as soft graphite (grey) or stays locked up as hard cementite (white), and that single difference in structure is what drives every other contrast between them - hardness, machinability, and the applications each one suits.',
  },

  // ---------------------------------------------------------------------
  // corrosionAdvanced
  // ---------------------------------------------------------------------
  {
    id: 'mdr-022',
    topic: 'corrosionAdvanced',
    drillKind: 'explainProcess',
    type: 'drill',
    prompt:
      'Explain the basic process by which iron rusts, then describe TWO practical ways to prevent or slow it down.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Ingredients needed', detail: 'Rusting needs both oxygen from the air and moisture (water) touching the iron surface at the same time.', marks: 2 },
      { id: 'r2', label: 'The reaction itself', detail: 'Iron atoms give up electrons to oxygen dissolved in the surface moisture, and the resulting reaction is electrochemical, with tiny local regions on the surface acting as the giving and receiving sites.', marks: 2 },
      { id: 'r3', label: 'Prevention 1 - barrier/coating', detail: 'Applying a coating such as paint or grease physically blocks oxygen and moisture from reaching the metal surface underneath.', marks: 2 },
      { id: 'r4', label: 'Prevention 2 - sacrificial protection', detail: 'Coating with, or attaching, a more reactive metal (such as zinc, as in galvanizing) so that metal corrodes first and protects the iron or steel beneath it.', marks: 2 },
    ],
    modelAnswer:
      'Iron rusts only when two things are both present at the metal surface at the same time: oxygen from the surrounding air, and moisture (water), even just a thin damp film. Take either one away - keep the iron completely dry, or keep it away from air entirely - and rusting essentially stops, which is why bone-dry iron in a sealed, air-free container does not rust at anything like its normal rate.\n\n' +
      'The reaction itself is electrochemical rather than a simple, direct burning-type reaction. Iron atoms at the surface give up electrons, which pass through the metal and are picked up elsewhere by oxygen that has dissolved into the surface moisture. Slightly different regions of the same metal surface end up acting as the "giving" site and the "receiving" site, so the whole thing behaves like a tiny built-in battery scattered across the surface, and the product left behind is iron oxide - rust.\n\n' +
      'One practical way to slow this down is to apply a barrier coating, such as paint or a layer of grease, over the metal surface. This does not change the metal chemically at all; it simply keeps the oxygen and moisture in the air from ever actually touching the iron underneath, so as long as the coating stays intact and unbroken, the reaction has no way to get started.\n\n' +
      'A second practical method is sacrificial protection, most commonly seen as galvanizing. Here the iron or steel is coated with a more reactive metal, typically zinc. Because zinc is more willing to give up its electrons than iron is, if the coating is ever scratched and both metals are exposed to moisture together, the zinc corrodes away first and takes the damage, protecting the iron underneath for as long as any zinc remains.',
  },
  {
    id: 'mdr-023',
    topic: 'corrosionAdvanced',
    drillKind: 'selectMaterial',
    type: 'drill',
    prompt:
      'A small bracket must be bolted to the hull of a ship, permanently exposed to seawater spray. Select a suitable material ' +
      'for this bracket and justify your choice, including one drawback you would have to accept.',
    marks: 7,
    rubric: [
      { id: 'r1', label: 'Material selected', detail: 'Stainless steel (or another corrosion-resistant alloy) rather than plain carbon steel.', marks: 2 },
      { id: 'r2', label: 'Justification - protective layer', detail: 'Stainless steel\'s chromium content reacts with oxygen to build a thin, self-repairing protective oxide layer on the surface that plain carbon steel cannot form.', marks: 2 },
      { id: 'r3', label: 'Justification - fits the environment', detail: 'That protective layer resists the constant combination of salt, oxygen, and moisture that would otherwise rapidly rust an unprotected plain steel bracket.', marks: 2 },
      { id: 'r4', label: 'Drawback accepted', detail: 'Stainless steel costs noticeably more than plain carbon steel, and can still suffer localized attack (such as pitting) if salt gets trapped in a tight crevice for long enough.', marks: 1 },
    ],
    modelAnswer:
      'Stainless steel is the right choice of material for this bracket, rather than a plain carbon steel. Ordinary plain carbon steel bolted to a ship\'s hull would be constantly wetted by seawater spray, giving it exactly the combination of oxygen and moisture that drives rapid rusting, made worse here by the salt in seawater, which speeds up the electrochemical corrosion reaction even further.\n\n' +
      'Stainless steel resists this because of its chromium content. The chromium in the alloy reacts with oxygen in the air to form an extremely thin, tightly bonded oxide layer on the surface, and crucially this layer is self-repairing: if it is ever scratched or scuffed, exposing bare metal underneath, the chromium there simply reacts again and rebuilds the protective layer on its own. Plain carbon steel has no equivalent chromium content, so it has no way to build this kind of protective film, which is exactly why it would rust so much faster in the same spray-exposed spot.\n\n' +
      'This makes stainless steel well matched to the environment described: constant exposure to salty spray is one of the harshest everyday corrosion conditions a bracket can face, and the self-repairing oxide layer is specifically what stands up to that ongoing combination of salt, oxygen, and moisture.\n\n' +
      'The trade-off to accept is cost and one remaining weak point: stainless steel is noticeably more expensive than plain carbon steel, and it is not completely immune to corrosion. If salt water and debris become trapped in a tight gap, such as under a washer or in a narrow crevice at the joint, a small local form of attack called pitting can still eat into the surface there even though the wider exposed area stays protected. Careful design of the joint to avoid trapping moisture would be needed alongside the material choice.',
  },
  {
    id: 'mdr-024',
    topic: 'corrosionAdvanced',
    drillKind: 'defineTerms',
    type: 'drill',
    prompt:
      'Define SHAPE-MEMORY ALLOY, PIEZOELECTRIC MATERIAL, and MAGNETOSTRICTIVE MATERIAL as types of smart material, noting ' +
      'the trigger and the response for each.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Shape-memory alloy', detail: 'Trigger: heating past a set transition temperature. Response: the alloy returns on its own to an earlier, trained shape. Example: a nitinol wire or stent.', marks: 3 },
      { id: 'r2', label: 'Piezoelectric material', detail: 'Trigger: mechanical squeezing or pressure. Response: generates a small electric voltage across the material, and the effect also runs in reverse (applying a voltage causes a tiny shape change).', marks: 3 },
      { id: 'r3', label: 'Magnetostrictive material', detail: 'Trigger: an applied magnetic field. Response: the material\'s length changes by a small, measurable amount.', marks: 2 },
    ],
    modelAnswer:
      'A shape-memory alloy is a smart material whose trigger is heat: once the alloy is warmed past a particular transition temperature, it responds by returning on its own to an earlier shape it was originally "trained" into, even if it had since been bent or compressed into something quite different. A nitinol (nickel-titanium) wire or a compressed nitinol stent, which springs back open once it warms to body temperature inside a blood vessel, works this way.\n\n' +
      'A piezoelectric material has a mechanical trigger instead: squeezing or otherwise applying pressure to certain crystals or ceramics causes them to respond by generating a small electric voltage across the material, with no battery or outside power source needed to produce that voltage. Usefully, this behavior also runs in reverse - applying a voltage to the same material causes it to change shape by a tiny amount - which is why piezoelectric materials show up in both pressure sensors (using the forward effect) and tiny precision actuators (using the reverse effect).\n\n' +
      'A magnetostrictive material responds instead to a magnetic trigger: whenever it is placed inside a magnetic field, or that field is switched on or off, the material responds by changing its own length by a small but measurable amount. This length change can be put to practical use, for example driving a small, precise position sensor whenever the surrounding magnetic field shifts.\n\n' +
      'Across all three, the pattern that defines a smart material holds: each one senses a particular kind of change in its environment - heat, mechanical pressure, or a magnetic field - and responds to that change automatically, without needing any separate control system to tell it what to do.',
  },
];
