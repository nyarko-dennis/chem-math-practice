import type { MaterialsQuestion } from './materialsTypes.ts';

export const atomicCrystalQuestions: MaterialsQuestion[] = [
  {
    id: 'at-001',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt: 'An atom is built from three kinds of particles. Where does the module place the protons and neutrons?',
    choices: [
      'In the nucleus, the dense cluster at the center of the atom',
      'Spread evenly through the orbitals, the same regions where electrons move',
      'Only on the outer surface of the atom',
      'Protons and neutrons do not exist inside real atoms',
    ],
    correctIndex: 0,
    rationale:
      'The module places protons and neutrons together in the nucleus (the dense center of the atom), while the electrons move around that center in regions called orbitals.',
  },
  {
    id: 'at-002',
    topic: 'atomicCrystal',
    type: 'tf',
    prompt: 'An atom that has the same number of protons as electrons carries no overall electrical charge.',
    correctAnswer: true,
    rationale:
      'The module explains that when an atom has equal numbers of positive protons and negative electrons, the two charges cancel out, leaving the atom neutral overall (a charge of zero).',
  },
  {
    id: 'at-003',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt: 'A standard first-year chemistry fact (used alongside the module) defines the "atomic number" of an element as which count?',
    choices: [
      'The number of neutrons in one atom of the element',
      'The number of protons in one atom of the element',
      'The total mass of one mole of the element',
      'The number of electron shells the atom has',
    ],
    correctIndex: 1,
    rationale:
      'The atomic number is simply a count of protons in the nucleus of an atom; this fixed count is what makes each element chemically distinct from every other element.',
  },
  {
    id: 'at-004',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt:
      'A standard chemistry fact used alongside the module: an atom has 12 protons and 12 neutrons. Its atomic mass (rounded to a whole number) is closest to which value?',
    choices: ['12', '36', '24', '6'],
    correctIndex: 2,
    rationale:
      'Atomic mass is approximately the protons plus the neutrons added together (electrons weigh so little they barely count), so 12 protons plus 12 neutrons gives about 24.',
  },
  {
    id: 'at-005',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt: 'Why does the module treat atomic bonding as important background before discussing material properties?',
    choices: [
      'Because bonding has no real effect on how a material behaves',
      'Because the type of bond holding atoms together strongly shapes properties such as strength, conductivity, and how the material deforms',
      'Because bonding only matters for gases, not solids',
      'Because every material has an identical bond type regardless of composition',
    ],
    correctIndex: 1,
    rationale:
      'The module treats bonding as foundational because how atoms are held together (ionic, covalent, metallic, or weaker secondary bonds) directly shapes everyday properties like strength, conductivity, and how easily a material bends or breaks.',
  },
  {
    id: 'at-006',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt:
      'A sodium atom and a chlorine atom are brought together to form ordinary table salt. Based on the module\'s description of ionic bonding, what happens to each atom\'s outer shell of electrons?',
    choices: [
      'Sodium gives up its one spare outer electron and chlorine accepts it, so sodium becomes a positive ion and chlorine becomes a negative ion that attract each other',
      'The two atoms simply share one pair of electrons equally between them',
      'Both atoms release all their electrons into one cloud that surrounds every atom in the salt crystal',
      'No electrons move between the atoms at all; they are held together only by their nuclei touching',
    ],
    correctIndex: 0,
    rationale:
      'The module walks through table salt as the classic ionic example: sodium has one extra outer electron it gives away, and chlorine, needing just one more electron to fill its outer shell, accepts it, leaving a positive sodium ion and a negative chlorine ion that pull together by electrostatic attraction.',
  },
  {
    id: 'at-007',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt:
      'Table salt (an ionic solid) is commonly hard and brittle, and it does not conduct electricity well as a solid. Which reasoning best fits how the module describes ionic bonding?',
    choices: [
      'Ionic solids have almost no attraction between their ions, so they fall apart easily',
      'Ionic solids share electrons freely like metals, which is why they conduct electricity',
      'The ions are locked into fixed positions by strong electrostatic pull in every direction, so the solid resists scratching but shatters instead of bending, and no electrons are free to flow through it',
      'Ionic bonds are the weakest of all bond types, so ionic solids melt at very low temperatures',
    ],
    correctIndex: 2,
    rationale:
      'This is a standard follow-on fact about ionic solids: the strong pull between fixed positive and negative ions makes the solid hard, but because the ions cannot shift position without breaking that attraction, the solid cracks rather than bends, and since electrons stay tied to specific ions instead of roaming freely, the solid does not conduct electricity well.',
  },
  {
    id: 'at-008',
    topic: 'atomicCrystal',
    type: 'tf',
    prompt: 'An ionic bond only attracts one fixed neighboring ion along a single direction, the same way a covalent bond does.',
    correctAnswer: false,
    rationale:
      "This is false: the module describes the ionic bond as non-directional (it pulls from any direction, not fixed toward one neighbor), which is the opposite of a covalent bond's directional character (locked toward one fixed partner atom). Mixing the two up would wrongly suggest an ionic solid like table salt bonds toward only one neighboring ion, instead of attracting any oppositely charged ion nearby.",
  },
  {
    id: 'at-009',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt: 'How does the module describe a covalent bond, using diamond and gas molecules like oxygen as its examples?',
    choices: [
      'One atom fully transfers an electron to another atom, exactly like sodium and chlorine',
      'Many atoms contribute electrons to one loose, shared pool spread over the whole solid',
      'Atoms attract each other with no electrons involved at all',
      'A pair of atoms shares a pair of electrons between them so each atom effectively completes its outer shell',
    ],
    correctIndex: 3,
    rationale:
      'A covalent bond, per the module, forms when a pair of atoms shares a pair of electrons so each atom effectively completes its outer shell; the module points to diamond, and to the O-O and N-N bonds in oxygen and nitrogen gas, as examples of this shared pair.',
  },
  {
    id: 'at-010',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt: 'Diamond, one of the module\'s named covalent examples, is exceptionally hard. What explains this using the module\'s description of covalent bonds?',
    choices: [
      'Diamond\'s atoms are held by a loose, easily reshaped cloud of shared electrons',
      'Diamond\'s atoms are locked together by very strong, fixed-direction (directional) covalent bonds, so the atomic framework strongly resists being pulled apart',
      'Diamond\'s atoms are only weakly attracted through leftover electric charges',
      'Diamond has no true bonds between its atoms, just tightly packed particles',
    ],
    correctIndex: 1,
    rationale:
      'The module describes covalent bonds as very strong and directional (the atoms stay fixed relative to each other), and it names diamond as an example; that rigid, strongly bonded framework is why diamond is so hard to scratch or break.',
  },
  {
    id: 'at-011',
    topic: 'atomicCrystal',
    type: 'tf',
    prompt: 'Covalent bonds are described as directional, meaning the bonded atoms tend to stay fixed in position relative to one another.',
    correctAnswer: true,
    rationale:
      'The module explicitly calls covalent bonds directional because the shared electron pair locks the two atoms into a fairly fixed relative position, unlike the free-flowing attraction in a metallic bond.',
  },
  {
    id: 'at-012',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt: 'How does the module describe the bonding arrangement inside a typical metal?',
    choices: [
      'Metal atoms transfer electrons to one another one pair at a time, just like an ionic bond',
      'Metal atoms release their outer electrons into a shared, loosely held pool that surrounds all the resulting positive metal ions',
      'Metal atoms share exactly one electron pair with a single neighboring atom, just like a covalent bond',
      'Metal atoms have no electrons available for bonding at all',
    ],
    correctIndex: 1,
    rationale:
      'In a metallic bond, the module explains, every metal atom gives up its outer electrons into a shared pool (sometimes called an electron cloud) surrounding the positively charged metal ions left behind; the mutual pull between the ions and this shared pool is what holds the metal together.',
  },
  {
    id: 'at-013',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt: 'The module lists good electrical and thermal conductivity as typical metal traits. Why does metallic bonding produce this?',
    choices: [
      'Because metal atoms have no electrons at all, so nothing blocks the flow of current',
      'Because metallic bonds are directional, forcing electrons along one fixed path',
      'Because the shared pool of electrons is free to drift among the positive ions rather than staying tied to one atom, letting charge and heat move easily through the metal',
      'Because metals are held together only by weak secondary bonds',
    ],
    correctIndex: 2,
    rationale:
      'The module ties conductivity directly to the shared electron pool: because those electrons are not stuck to any single atom, they can drift through the whole piece of metal, carrying electrical charge and heat energy easily.',
  },
  {
    id: 'at-014',
    topic: 'atomicCrystal',
    type: 'tf',
    prompt:
      'In a metal, the pool of shared electrons stays fixed between one specific neighboring pair of atoms, much like the shared electron pair in a covalent bond.',
    correctAnswer: false,
    rationale:
      "This is false: the module describes the metallic bond's electron pool (sometimes called an electron cloud) as free to drift among all the positive metal ions, not tied to any one pair, unlike a covalent bond's fixed, shared electron pair. Treating the metallic pool as fixed would wrongly predict that metals are rigid like covalently bonded solids, when the free-flowing pool is exactly what lets the positive ions slide past each other so the metal bends or stretches (ductile and malleable mean easily drawn out or shaped) without the bonding breaking down.",
  },
  {
    id: 'at-015',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt:
      'The module ranks secondary bonds (van der Waals and hydrogen bonds) as much weaker than primary bonds. What everyday consequence follows for simple molecular solids held together mainly by these weak bonds?',
    choices: [
      'They tend to melt at low temperatures, since only a small amount of heat energy is needed to pull the molecules apart from one another',
      'They tend to be harder than diamond',
      'They cannot exist as solids at any temperature',
      'They conduct electricity better than metals',
    ],
    correctIndex: 0,
    rationale:
      'Since the module ranks secondary bonds as much weaker than primary bonds and notes they often give way first, it takes comparatively little heat energy to overcome them and let the molecules slide apart, which is why solids held together mainly by secondary bonds tend to melt at low temperatures.',
  },
  {
    id: 'at-016',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt: 'The module lists van der Waals bonds as one of the two secondary (weak) bond types alongside hydrogen bonds. In general chemistry terms, what causes this weak attraction?',
    choices: [
      'A full transfer of an electron from one atom to a neighboring one',
      'A permanent, fully shared pair of electrons locked between two atoms',
      'A dense shared pool of electrons surrounding many positive ions at once',
      'Small, temporary shifts in electron distribution that create brief, weak charge imbalances pulling neighboring molecules together',
    ],
    correctIndex: 3,
    rationale:
      'Van der Waals bonds are named in the module as a secondary bond type; general chemistry explains them as arising from brief, uneven shifts of electrons that create small, temporary charge imbalances, giving a weak pull between neighboring molecules.',
  },
  {
    id: 'at-017',
    topic: 'atomicCrystal',
    type: 'tf',
    prompt:
      'In a water molecule, the shared electrons spend more time near the hydrogen atoms, leaving the oxygen atom with a small positive charge.',
    correctAnswer: false,
    rationale:
      "This is false: the module explains that in a water molecule the shared (covalently held) electrons actually linger more around the oxygen atom, leaving oxygen slightly negative and the hydrogen atoms slightly positive - the reverse of this claim. Getting the charges backward would flip which end of the molecule weakly attracts a neighboring molecule, breaking the module's explanation of hydrogen bonding.",
  },
  {
    id: 'at-018',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt: 'How does the module define a crystal and a crystalline structure?',
    choices: [
      'A solid made of atoms, ions, or molecules arranged in a pattern that repeats regularly in three dimensions',
      'Any solid at all, regardless of how its particles are arranged',
      'A material that only exists in liquid form',
      'A pattern that repeats in only one direction, never in three dimensions',
    ],
    correctIndex: 0,
    rationale:
      'The module defines a crystal as a solid whose atoms, ions, or molecules sit in a pattern that repeats itself in all three dimensions, and it calls this regular three-dimensional arrangement the crystalline structure.',
  },
  {
    id: 'at-019',
    topic: 'atomicCrystal',
    type: 'tf',
    prompt: 'An amorphous solid, such as ordinary glass, has the same long-range repeating atomic pattern that defines a crystal.',
    correctAnswer: false,
    rationale:
      'This is false: this is a standard materials-science fact used alongside the module. A crystal is defined by its atoms repeating in a regular pattern across all three dimensions (a space lattice), while an amorphous solid such as glass has its atoms arranged randomly, with no such long-range repeating order; that missing repeating pattern is exactly what makes a solid amorphous rather than crystalline.',
  },
  {
    id: 'at-020',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt: 'How does the module define a unit cell and the space lattice it builds?',
    choices: [
      'The unit cell is the full-size chunk of metal you would hold in your hand',
      'A space lattice is a flat, two-dimensional drawing with no depth or repetition',
      'The unit cell is the single smallest repeating building block of a crystal, and repeating it in a three-dimensional array of identical points (the space lattice) generates the entire crystal',
      'The unit cell is a single free-floating atom with no connection to any repeating pattern',
    ],
    correctIndex: 2,
    rationale:
      'The module describes the unit cell as the basic structural building block of a crystal, and the space lattice as a three-dimensional array of points (lattice points), each with identical surroundings; repeating the unit cell across this lattice builds up the whole crystal.',
  },
  {
    id: 'at-021',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt: 'For the body-centered cubic (BCC) unit cell, what does the module give as the atom count per cell and the coordination number?',
    choices: [
      '4 atoms per cell, coordination number 12',
      '6 atoms per cell, coordination number 12',
      '1 atom per cell, coordination number 6',
      '2 atoms per cell, coordination number 8',
    ],
    correctIndex: 3,
    rationale:
      'The module works out that a BCC cell has one whole atom in the center plus eight corner atoms that each only count as one-eighth (since they are shared with neighboring cells), giving a net of 2 atoms per cell, and it states the coordination number (nearest-neighbor count) as 8.',
  },
  {
    id: 'at-022',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt: 'Which set of metals does the module list as having the BCC structure?',
    choices: [
      'Aluminium, copper, and nickel',
      'Zinc, magnesium, and titanium',
      'Alpha-iron, chromium, and tungsten',
      'Gold, lead, and silver',
    ],
    correctIndex: 2,
    rationale:
      'Among the metals the module lists for the BCC structure are alpha-iron (the room-temperature form of iron), chromium, and tungsten, along with several others such as sodium and vanadium.',
  },
  {
    id: 'at-023',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt: 'For the face-centered cubic (FCC) unit cell, what does the module give as the atom count per cell and the coordination number?',
    choices: [
      '2 atoms per cell, coordination number 8',
      '6 atoms per cell, coordination number 12',
      '8 atoms per cell, coordination number 6',
      '4 atoms per cell, coordination number 12',
    ],
    correctIndex: 3,
    rationale:
      'The module counts 8 corner atoms contributing one-eighth each (equal to 1 atom) plus 6 face atoms contributing one-half each (equal to 3 atoms), giving 4 atoms per FCC cell, and states its coordination number (how many immediate neighbours each atom touches) as 12.',
  },
  {
    id: 'at-024',
    topic: 'atomicCrystal',
    type: 'tf',
    prompt: 'The module lists aluminium, copper, and nickel as metals with the FCC structure.',
    correctAnswer: true,
    rationale:
      'The module names aluminium, copper, and nickel (along with gold, lead, platinum, silver, and iridium) as metals that crystallize in the FCC structure.',
  },
  {
    id: 'at-025',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt: 'The module notes FCC metals pack their atoms more tightly than BCC metals (a higher packing factor, the fraction of the space actually filled by atoms). Which everyday consequence follows from this?',
    choices: [
      'FCC metals such as copper and nickel tend to be more easily bent and drawn into shape (more ductile) than typical BCC metals',
      'FCC metals cannot be shaped at all',
      'Tighter packing has no effect on how easily the planes of atoms can slip past each other',
      'FCC metals are always weaker than gases',
    ],
    correctIndex: 0,
    rationale:
      'This follows from the module\'s own comparison for BCC, where atoms cannot slide past each other as easily, making the metal harder and less workable: because FCC metals pack more closely and offer more directions along which atom planes can slip, metals like copper and nickel are generally easier to bend and draw out (more ductile) than typical BCC metals.',
  },
  {
    id: 'at-026',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt: 'For the hexagonal close-packed (HCP) unit cell, what does the module give as the atom count per cell and the coordination number?',
    choices: [
      '2 atoms per cell, coordination number 8',
      '4 atoms per cell, coordination number 8',
      '6 atoms per cell, coordination number 12',
      '12 atoms per cell, coordination number 6',
    ],
    correctIndex: 2,
    rationale:
      'The module adds up 1/6-share corner atoms, 1/2-share hexagon-center atoms on the top and bottom layers, and 3 whole atoms in the middle layer to reach 6 atoms per HCP cell, and it states the coordination number (how many immediate neighbours each atom touches) as 12, the same as FCC.',
  },
  {
    id: 'at-027',
    topic: 'atomicCrystal',
    type: 'tf',
    prompt: 'The module lists zinc, magnesium, and titanium as common examples of metals with the HCP structure.',
    correctAnswer: true,
    rationale:
      'The module names zinc, magnesium, and titanium (along with beryllium, cadmium, and zirconium) as elemental metals that commonly form the HCP structure.',
  },
  {
    id: 'at-028',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt:
      'HCP metals share the same coordination number (how many immediate neighbours each atom touches) and packing factor (the fraction of the space actually filled by atoms) as FCC metals, yet HCP metals such as zinc and magnesium are generally more brittle (crack more easily) than FCC metals such as copper. What is the standard reason for this?',
    choices: [
      'HCP metals actually pack less tightly than BCC metals',
      'HCP metals contain no metallic bonds at all',
      'The coordination number of HCP is lower than that of BCC',
      'HCP structures allow far fewer directions along which atom planes can slip past each other during bending, so the metal cracks instead of deforming smoothly',
    ],
    correctIndex: 3,
    rationale:
      'This is a standard materials-science fact used alongside the module: even though HCP and FCC pack atoms equally tightly, HCP offers far fewer easy slip directions for atom planes to glide along, so HCP metals tend to crack (are more brittle) rather than bend smoothly the way many FCC metals do.',
  },
  {
    id: 'at-029',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt: 'Iron is described elsewhere in the module as allotropic. What does the module say happens to iron\'s crystal structure as it is heated from room temperature?',
    choices: [
      'It stays FCC at every temperature up to melting',
      'It starts out BCC at room temperature, changes to FCC on heating past about 908 degrees C, then changes back to a BCC form at a still higher temperature',
      'It starts out FCC at room temperature and never changes',
      'It has no defined crystal structure at any temperature',
    ],
    correctIndex: 1,
    rationale:
      'Allotropic means an element can exist in more than one crystal structure; the module explains iron is BCC at ordinary room temperature, switches to FCC (also called gamma-iron or austenite) once heated past roughly 908 degrees C, and then switches back to a BCC form at a still higher temperature before it melts.',
  },
  {
    id: 'at-030',
    topic: 'atomicCrystal',
    type: 'mcq',
    prompt: 'Why does the module\'s point about iron changing crystal structure with temperature matter for heat treatment of steel?',
    choices: [
      'It does not matter, because heat treatment has nothing to do with crystal structure',
      'Because iron never changes its structure no matter how it is heated',
      'Because only the color of the metal changes with temperature, not its internal structure',
      'Because heating steel into iron\'s FCC form and then cooling it back lets engineers control how the internal structure forms, which is the basis for hardening and strengthening steel by heat treatment',
    ],
    correctIndex: 3,
    rationale:
      'Because iron switches to its FCC form when heated and back to a BCC-based form on cooling, heat treatment processes deliberately heat steel into that FCC range and then cool it in controlled ways, using this structural switch to set the final hardness and strength of the steel.',
  },
];
