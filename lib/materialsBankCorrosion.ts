import type { MaterialsQuestion } from './materialsTypes.ts';

export const corrosionAdvancedQuestions: MaterialsQuestion[] = [
  {
    id: 'ca-001',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'In everyday engineering terms, what is corrosion?',
    choices: [
      'A metal being damaged or eaten away by a chemical or electrical reaction with its surroundings',
      'A metal wearing away purely from rubbing against another solid surface',
      'A metal cracking only because it was loaded far past its yield point',
      'A metal losing its shine simply from being kept in the dark',
    ],
    correctIndex: 0,
    rationale:
      'Corrosion is a metal getting attacked and gradually destroyed by a chemical reaction, or an electrical (electrochemical) reaction, with the air, water, or chemicals around it, not by rubbing or by mechanical overload.',
  },
  {
    id: 'ca-002',
    topic: 'corrosionAdvanced',
    type: 'tf',
    prompt: 'Iron left in bone-dry air with no moisture at all will still rust at its normal rate.',
    correctAnswer: false,
    rationale:
      'Rusting needs both oxygen (from the air) and water (moisture) touching the iron at the same time; take away the water and the reaction slows to almost nothing, so completely dry iron does not rust at its usual rate.',
  },
  {
    id: 'ca-003',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'Corrosion is often described as an "electrochemical" process built around an anode and a cathode. What roles do those two play?',
    choices: [
      'The anode is protected while the cathode gives up metal and corrodes away',
      'The anode is the region that gives up electrons and dissolves away (it corrodes), while the cathode is the region that receives those electrons and stays protected',
      'Both regions always corrode at exactly the same rate, so the labels carry no real meaning',
      'Neither region reacts chemically; only the surrounding liquid changes color',
    ],
    correctIndex: 1,
    rationale:
      'In a corrosion cell, the anode loses tiny charged particles called electrons and dissolves away, while the cathode is the partner that receives those electrons and is left protected, which is the opposite of what many people first guess.',
  },
  {
    id: 'ca-004',
    topic: 'corrosionAdvanced',
    type: 'tf',
    prompt: 'In a basic corrosion cell, the cathode is the region of metal that actually dissolves away.',
    correctAnswer: false,
    rationale:
      'It is the anode, not the cathode, that dissolves away in a corrosion cell; the cathode is the protected partner that simply receives the electrons (tiny charged particles) given up at the anode.',
  },
  {
    id: 'ca-005',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'A steel bolt and a copper fitting are joined together and left outdoors in the rain, with steel being the more reactive of the two metals. What is likely to happen, and why?',
    choices: [
      'The copper fitting corrodes rapidly while the steel bolt stays untouched, because copper is always the anode',
      'Nothing happens to either part, because rainwater cannot carry an electric current',
      'The steel bolt corrodes faster than it would alone, acting as the anode, while the copper is relatively protected, because two different metals in contact through a conducting liquid (an electrolyte) form a galvanic cell',
      'The two metals slowly fuse together into one new alloy',
    ],
    correctIndex: 2,
    rationale:
      'Galvanic corrosion needs two different metals touching electrically plus a conducting liquid (an electrolyte, like rainwater) bridging them; the more reactive metal, here the steel, plays the anode and corrodes faster, while the less reactive copper is comparatively shielded.',
  },
  {
    id: 'ca-006',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'Which of these best describes "uniform" (general) corrosion?',
    choices: [
      'A single deep hole appearing suddenly in the middle of an otherwise shiny steel plate',
      'Damage that appears only in the narrow gap trapped under a rubber gasket',
      'A crack that opens up only at the exact spot where the plate was bent',
      'A thin, fairly even layer of rust spreading across the whole surface of an unprotected steel sheet left outside',
    ],
    correctIndex: 3,
    rationale:
      'Uniform corrosion attacks the whole exposed surface at roughly the same rate, leaving an even coating of rust, unlike pitting or crevice attack, which concentrate damage in one small spot.',
  },
  {
    id: 'ca-007',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'A steel tank looks almost fine from the outside, but inspection finds a handful of small, deep holes scattered across its surface, some hidden under crusty debris. What type of corrosion is this, and why is it risky?',
    choices: [
      'Pitting corrosion, which is risky because the holes can hide under debris while quietly boring through the metal wall until it suddenly leaks or fails',
      'Uniform corrosion, which is risky because it spreads evenly and is impossible to miss',
      'Simple mechanical wear, which only matters if the tank is dropped',
      'Fatigue cracking caused purely by repeated hot and cold cycles',
    ],
    correctIndex: 0,
    rationale:
      'Pitting corrosion eats small, deep holes into an otherwise mostly intact surface, and it is dangerous because loose corrosion debris can hide a pit while it keeps digging deeper, leading to a surprise leak rather than a visible, spreading problem.',
  },
  {
    id: 'ca-008',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'Bolted steel plates are found badly corroded specifically in the narrow gap trapped underneath the bolt heads and washers, where stagnant moisture sits. What is this type of attack called?',
    choices: [
      'Uniform corrosion, spread evenly over the whole plate',
      'Crevice corrosion, where trapped, stagnant liquid in a tight gap runs low on oxygen and becomes more aggressive',
      'Erosion caused by fast-flowing fluid rubbing the surface',
      'Ordinary fatigue failure from repeated bending',
    ],
    correctIndex: 1,
    rationale:
      'Crevice corrosion happens inside narrow gaps, such as under washers, gaskets, or bolt heads, where trapped, still liquid runs low on oxygen and turns more aggressive, attacking that hidden spot faster than the open surface nearby.',
  },
  {
    id: 'ca-009',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'A metal bracket is held under a steady pulling (tensile) load while sitting in a specific chemical that this particular metal is sensitive to, and fine cracks slowly grow through it over time. Which corrosion type best fits this description?',
    choices: [
      'Galvanic corrosion between two pieces of the same identical metal',
      'Uniform corrosion caused by plain rusting with no mechanical cause',
      'Stress corrosion cracking, where a steady pulling force and a sensitive corrosive chemical act together to drive cracks through the part',
      'Ordinary wear from two surfaces sliding against each other',
    ],
    correctIndex: 2,
    rationale:
      'Stress corrosion cracking happens when a steady pulling (tensile) force and a corrosive chemical that a particular metal is sensitive to act together, driving thin cracks through the part that neither cause alone would produce.',
  },
  {
    id: 'ca-010',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'A steel guardrail is kept from rusting by regularly repainting it. What is the basic idea behind why paint works as corrosion protection?',
    choices: [
      'Paint makes the steel chemically inert forever, so a scratch can never cause rust again',
      'Paint works only by keeping the surface colder than the surrounding air',
      'Paint reacts with the steel to permanently turn it into a different, corrosion-proof metal',
      'Paint forms a barrier layer that keeps oxygen and moisture from directly reaching the metal surface',
    ],
    correctIndex: 3,
    rationale:
      'A paint or coating simply blocks the path between the metal and the oxygen and moisture in the air, so as long as the coating stays unbroken, the corrosion reaction underneath cannot easily get started.',
  },
  {
    id: 'ca-011',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'Steel roofing sheets are often "galvanised" before being installed. What does galvanising actually do to the steel?',
    choices: [
      'It coats the steel with a layer of zinc, which blocks moisture from the steel and, being more reactive, corrodes first if the coating is scratched',
      'It removes carbon from the steel to make it perfectly soft',
      'It heats the steel until its internal structure turns into cast iron',
      'It coats the steel in a layer of pure gold purely for a shiny look',
    ],
    correctIndex: 0,
    rationale:
      'Galvanising covers steel with a layer of zinc; the zinc physically blocks moisture from reaching the steel and, being the more reactive metal, corrodes first if the coating is ever scratched, taking the damage instead of the steel underneath.',
  },
  {
    id: 'ca-012',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'A ship\'s steel hull has blocks of a more reactive metal, such as zinc, bolted onto it below the waterline. What is this technique called, and how does it protect the hull?',
    choices: [
      'Anodic protection, where the zinc blocks act as the cathode and stay untouched',
      'A sacrificial anode system, where the more reactive zinc corrodes away in place of the steel hull, which becomes the protected cathode',
      'Galvanising, where the zinc chemically dissolves into the steel to form a new alloy',
      'Passivation, where the zinc forms a clear film that spreads over the whole hull instantly',
    ],
    correctIndex: 1,
    rationale:
      'Bolting on blocks of a more reactive metal sets up a sacrificial anode system, where the zinc gives up electrons and wastes away instead of the steel hull, which becomes the protected cathode and stays intact.',
  },
  {
    id: 'ca-013',
    topic: 'corrosionAdvanced',
    type: 'tf',
    prompt: 'A sacrificial anode is chosen to be a metal that corrodes more easily than the structure it is protecting.',
    correctAnswer: true,
    rationale:
      'A sacrificial anode has to be more reactive (it corrodes more easily) than the metal it is bolted onto, so it wastes away first and takes the corrosion damage instead of the protected structure.',
  },
  {
    id: 'ca-014',
    topic: 'corrosionAdvanced',
    type: 'tf',
    prompt: 'Stainless steel resists rusting mainly because it contains no iron at all.',
    correctAnswer: false,
    rationale:
      'Stainless steel is still mostly iron; it resists rusting because it is alloyed (mixed) with enough chromium to build a thin, tough, invisible protective oxide layer on the surface, not because the iron has been removed.',
  },
  {
    id: 'ca-015',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'An engineer designing a steel water tank welds the seams instead of using rivets or bolts, and slopes the base so it drains completely. What corrosion-prevention idea does this reflect?',
    choices: [
      'Applying cathodic protection using an outside electrical current',
      'Alloying the base metal with chromium to build a passive oxide layer',
      'A design choice that avoids trapped gaps and standing moisture, cutting down on crevice corrosion and pooling',
      'Coating the tank with a sacrificial layer of zinc',
    ],
    correctIndex: 2,
    rationale:
      'Welding instead of bolting removes the tight gaps where crevice corrosion likes to start, and sloping the base for full drainage stops water from sitting still, both of which are design choices rather than coatings or electrical methods.',
  },
  {
    id: 'ca-016',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'Aluminium is actually a chemically reactive metal, yet outdoor aluminium window frames rarely show visible corrosion for years. Why?',
    choices: [
      'Aluminium simply does not react with oxygen under any conditions',
      'Aluminium only corrodes when fully submerged underwater, never in open air',
      'Aluminium frames are always coated in a thick layer of paint by law',
      'Aluminium reacts with oxygen almost immediately, forming a very thin, tightly clinging oxide layer that seals off the metal underneath and rebuilds itself if scratched',
    ],
    correctIndex: 3,
    rationale:
      'Aluminium reacts with oxygen almost instantly, but the thin oxide skin this reaction produces sticks tightly to the surface, blocks further attack, and quietly rebuilds itself if scratched, which is why the metal looks corrosion-free despite being reactive underneath.',
  },
  {
    id: 'ca-017',
    topic: 'corrosionAdvanced',
    type: 'tf',
    prompt: 'The thin oxide layer that protects aluminium from corrosion can rebuild itself if it is lightly scratched.',
    correctAnswer: true,
    rationale:
      'Because aluminium reacts with oxygen almost instantly, a fresh scratch exposes bare metal underneath that reacts again right away and reseals itself, which is why this protective layer is described as self-healing.',
  },
  {
    id: 'ca-018',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'A surfboard blank is built from thin glass strands set inside a hardened resin. In composite-material terms, what roles do the glass strands and the resin each play?',
    choices: [
      'The glass strands are the reinforcement, carrying most of the load, while the resin is the matrix, holding the strands together and spreading load between them',
      'The glass strands act as the matrix and the resin acts as the reinforcement',
      'Both parts are purely decorative and add nothing to strength',
      'The resin alone carries all the load, and the glass strands add nothing structural',
    ],
    correctIndex: 0,
    rationale:
      'In a composite material, the reinforcement (here, the glass fibres) is the strong part that carries most of the load, while the matrix (the resin) is the binding material that holds the fibres in position and shares load between them.',
  },
  {
    id: 'ca-019',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'Which of these correctly matches a composite material with the type of reinforcement it uses?',
    choices: [
      'Plain steel: continuous fibres set inside a ceramic matrix',
      'Concrete: hard stone or gravel particles set inside a cement-paste matrix',
      'Pure copper wire: stacked layers bonded inside a polymer matrix',
      'Plain window glass: particles set inside a metal matrix',
    ],
    correctIndex: 1,
    rationale:
      'Concrete is a classic particle-reinforced composite: hard stone or gravel particles (the aggregate) sit embedded in a cement-paste matrix that binds them together, unlike the other pairings listed, which do not describe real composite types.',
  },
  {
    id: 'ca-020',
    topic: 'corrosionAdvanced',
    type: 'tf',
    prompt: 'Plywood, built from thin glued layers of wood, is an example of a composite material.',
    correctAnswer: true,
    rationale:
      'Plywood stacks separate wood layers, rotating the grain direction between them, and bonds them with adhesive into one panel, which fits the basic idea of a composite: two or more distinct materials working together as one part, in this case called a laminate.',
  },
  {
    id: 'ca-021',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'In a fibre-reinforced composite, such as the carbon fibre used in a bicycle frame, what does the surrounding matrix mainly contribute that the fibres alone cannot?',
    choices: [
      'It supplies almost all of the pulling (tensile) strength, making the fibres pointless',
      'It makes the finished part heavier without adding any useful property',
      'It holds the fibres in place, spreads load evenly between them, and shields them from damage, adding toughness and overall shape rather than raw fibre strength',
      'It removes the need for any fibres once the part has cured',
    ],
    correctIndex: 2,
    rationale:
      'The fibres supply most of the raw strength, while the surrounding matrix binds them together, shares the load evenly between them, and shields them from knocks and moisture, contributing toughness and shape rather than strength on its own.',
  },
  {
    id: 'ca-022',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'Why are fibre-reinforced composites such as carbon fibre popular in aircraft parts and in high-end sports gear such as bike frames and tennis rackets?',
    choices: [
      'They are heavier than metal but corrode perfectly evenly',
      'They cannot be shaped into curved or complex forms',
      'They are always the cheapest possible material to manufacture in bulk',
      'They offer a high strength-to-weight ratio, meaning they carry a lot of strength for very little weight, which suits parts that must stay strong yet light',
    ],
    correctIndex: 3,
    rationale:
      'A high strength-to-weight ratio means the material gives a lot of strength for very little weight, which is exactly what aircraft designers and sports-gear makers want: parts strong enough to do the job without adding unnecessary mass.',
  },
  {
    id: 'ca-023',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'A protective coating is engineered so that when a tiny crack starts to open up inside it, tiny embedded capsules burst and release a bonding agent that seals the crack shut, with nobody stepping in to patch it by hand. Which smart-material behavior does this describe, as distinct from shape-memory, piezoelectric, or magnetostrictive behavior?',
    choices: [
      'Self-healing behavior: a material built to seal up its own internal cracks or damage on its own, stretching out its working life without any outside repair',
      'Shape-memory behavior, where the coating snaps back toward an earlier shape once it is warmed up',
      'Piezoelectric behavior, where squeezing the coating produces a small voltage across it',
      'Magnetostrictive behavior, where the coating changes length only when placed in a magnetic field',
    ],
    correctIndex: 0,
    rationale:
      'A self-healing material is designed so a tiny crack forming inside it sets off its own repair, here a bonding agent bursting out of embedded capsules to seal the damage shut, extending the part\'s working life with no outside repair; that is different from snapping back to a remembered shape, generating a voltage under pressure, or changing length in a magnetic field.',
  },
  {
    id: 'ca-024',
    topic: 'corrosionAdvanced',
    type: 'tf',
    prompt: 'A shape-memory alloy stays permanently bent once it has been deformed, with no way to recover its original shape.',
    correctAnswer: false,
    rationale:
      'The whole point of a shape-memory alloy is that heating it after it has been bent triggers it to snap back toward its original shape, so it does not stay permanently deformed the way an ordinary metal would.',
  },
  {
    id: 'ca-025',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'A piezoelectric material is squeezed and, without any battery attached, a small voltage appears across it. What property does this demonstrate?',
    choices: [
      'Magnetostriction: the material only responds to magnetic fields, never to pressure',
      'Piezoelectric behavior: certain crystals or ceramics generate a voltage when squeezed or pressed, and can also change shape slightly when a voltage is applied to them',
      'Thermochromic behavior: the material only changes color with temperature',
      'Ordinary electrical conduction, no different from a plain copper wire',
    ],
    correctIndex: 1,
    rationale:
      'Piezoelectric materials turn pressure into a small voltage, and the effect also runs in reverse: applying a voltage makes the same material expand or contract slightly, which is why they are used in both pressure sensors and tiny actuators.',
  },
  {
    id: 'ca-026',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'A metal rod sits inside a coil, and every time the coil\'s magnetic field switches on or off, the rod quietly changes length by a tiny amount, a shift used to drive a small position sensor. Which smart-material behavior does this describe, as distinct from piezoelectric, photochromic/thermochromic, or self-healing behavior?',
    choices: [
      'Piezoelectric behavior, where a voltage appears only when the material is squeezed under mechanical pressure',
      'Self-healing behavior, where the material seals its own internal cracks without outside repair',
      'Magnetostrictive behavior: certain metals change shape or length slightly when placed in a magnetic field, an effect harnessed to build magnetic-field sensors and compact actuators',
      'Photochromic or thermochromic behavior, where the material shifts its color or tint with changing light or temperature',
    ],
    correctIndex: 2,
    rationale:
      'Magnetostrictive materials respond to a magnetic field rather than to pressure, light, temperature, or internal damage: they change shape or length by a small amount whenever the surrounding magnetic field changes, which is exactly the kind of repeatable motion used to build magnetic sensors and compact actuators.',
  },
  {
    id: 'ca-027',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'A pair of sunglasses lenses is seen to darken noticeably in bright outdoor sunlight and fade back to clear indoors, with no battery, wiring, or magnet anywhere in the lens. Which smart-material behavior best explains this, as distinct from magnetostrictive or self-healing behavior?',
    choices: [
      'Magnetostrictive behavior, where the lens changes shape only in response to a magnetic field',
      'Self-healing behavior, where the lens seals small internal cracks on its own',
      'Galvanising, where a thin layer of zinc is applied to guard against corrosion',
      'Photochromic behavior, where the tint automatically shifts with the amount of light falling on the material (a thermochromic material shows the same kind of automatic color shift, but driven by temperature instead of light)',
    ],
    correctIndex: 3,
    rationale:
      'Photochromic materials automatically darken or lighten as the light falling on them changes, and thermochromic materials shift color the same way but in response to temperature instead; neither behavior needs a magnet, an internal crack to seal, or a zinc coating, which is what rules out the other three choices here.',
  },
  {
    id: 'ca-028',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'A compressed nickel-titanium mesh is guided into a blood vessel, then warms up to body temperature and springs open to hold the vessel wide. Which application of smart materials does this describe?',
    choices: [
      'A self-expanding biomedical stent that relies on the shape-memory behavior of a nickel-titanium alloy',
      'A magnetostrictive sensor used to monitor blood pressure',
      'A thermochromic dye used purely to color the mesh',
      'A piezoelectric actuator that only works when squeezed from outside the body',
    ],
    correctIndex: 0,
    rationale:
      'This is a classic use of a shape-memory alloy in medicine: a compressed nickel-titanium mesh is threaded into place, and body heat triggers it to expand into a stent that props a blood vessel open.',
  },
  {
    id: 'ca-029',
    topic: 'corrosionAdvanced',
    type: 'tf',
    prompt: 'A metamaterial gets its unusual mechanical or optical properties mainly from its engineered internal structure rather than from its chemical composition.',
    correctAnswer: true,
    rationale:
      'A metamaterial is defined by its engineered internal structure, a specific pattern or arrangement built into the material, rather than by its chemistry, which is why materials with ordinary chemical makeups can show unusual properties once structured this way.',
  },
  {
    id: 'ca-030',
    topic: 'corrosionAdvanced',
    type: 'mcq',
    prompt: 'Nanomaterials, advanced composites, and metamaterials are often grouped together as "advanced" or "engineered" materials. What sets this group apart from traditional materials such as plain cast iron or ordinary glass?',
    choices: [
      'They are defined mainly by being extracted from rarer natural ores than traditional materials',
      'Their unusual properties come largely from deliberately engineering their structure at a very fine scale (down to the level of individual atoms or molecules), rather than from simply picking a different chemical composition',
      'They can only be produced using techniques that existed before the 20th century',
      'They always cost less to manufacture than traditional materials',
    ],
    correctIndex: 1,
    rationale:
      'Advanced and engineered materials, including nanomaterials and metamaterials, get their standout properties by carefully building their internal structure at an extremely fine (nanoscale) level, rather than relying only on which chemical elements are present, which is what sets them apart from traditionally extracted and refined materials.',
  },
];
