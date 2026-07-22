import type { MaterialsQuestion } from './materialsTypes.ts';

export const mechanicalTestingQuestions: MaterialsQuestion[] = [
  {
    id: 'mt-001',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt:
      "When an engineer talks about the 'stress' inside a metal bar under a pulling load, what calculation are they actually describing?",
    choices: [
      "The pulling force divided by the bar's cross-sectional area (the flat slice you would see if you cut straight across it)",
      "The bar's stretch divided by its original length",
      'The pulling force divided by how long the test takes to run',
      "The bar's weight divided by its volume",
    ],
    correctIndex: 0,
    rationale:
      'Stress is the pulling (or pushing) force spread out over the cross-sectional area it acts on, so it is worked out as force divided by area, not by time, length, or weight.',
  },
  {
    id: 'mt-002',
    topic: 'mechanicalTesting',
    type: 'tf',
    prompt: 'Strain is normally expressed in pascals, the very same unit used to report stress.',
    correctAnswer: false,
    rationale:
      'Strain compares a change in length to the original length (length divided by length), so the length units cancel out and strain ends up as a plain, unit-free ratio. Pascals are the unit used for stress (force spread over area), not for strain.',
  },
  {
    id: 'mt-003',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt:
      'A metal wire is stretched slightly and then the load is removed. It springs back to its exact original length. What kind of shape change (deformation) did it undergo?',
    choices: [
      'Plastic deformation, since the shape change stayed permanently',
      'Elastic deformation, since the shape change disappeared once the load was removed',
      'Creep, since the change built up slowly over a long time under a constant load',
      'Fatigue, since the change came from many repeated loading cycles',
    ],
    correctIndex: 1,
    rationale:
      'Elastic deformation is the kind of shape change that fully reverses once the load causing it is taken away, which is exactly what happened when the wire sprang back to its original length.',
  },
  {
    id: 'mt-004',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt: "What does the 'yield point' on a stress-strain graph mark?",
    choices: [
      "The point where the test machine's grips first touch the sample",
      'The stress level at which the material finally snaps into two pieces',
      'The stress level at which the material starts to deform permanently (plastically) instead of springing back',
      'The temperature at which the material starts to melt',
    ],
    correctIndex: 2,
    rationale:
      'Below the yield point, stretching is elastic (fully reversible); once stress climbs past this point, the material begins to deform plastically, meaning some of that stretch becomes permanent even after the load is removed.',
  },
  {
    id: 'mt-005',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt:
      'On a stress-strain graph, the straight-line portion before the material starts to deform permanently has a certain slope. What does that slope represent?',
    choices: [
      "The material's melting point",
      'The maximum load the sample can carry before it snaps',
      'The percentage the sample stretches overall before it finally breaks',
      "The material's Young's modulus (a stiffness number) - how strongly it resists stretching elastically",
    ],
    correctIndex: 3,
    rationale:
      "Young's modulus, also called the modulus of elasticity, is read off as the slope of the straight-line (elastic) part of the stress-strain graph, and it tells you how stiff the material is - how much stress it takes to produce a given small stretch.",
  },
  {
    id: 'mt-006',
    topic: 'mechanicalTesting',
    type: 'tf',
    prompt:
      'Once a metal test bar has been stretched past its yield point and the load is then removed, it will always spring back completely to its original length.',
    correctAnswer: false,
    rationale:
      'Passing the yield point pushes the material into plastic (permanent) deformation, so some of the stretch remains behind even after the load is taken off. Only stretch that stayed within the earlier elastic (fully recoverable) range disappears completely on unloading.',
  },
  {
    id: 'mt-007',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt:
      'A standard tensile test pulls a sample steadily until it breaks while recording the load and the stretch. Which group of properties does this test typically report?',
    choices: [
      'Yield strength, ultimate (maximum) strength, and percent elongation (how much longer the sample got before breaking)',
      'Surface hardness number and scratch resistance',
      "Electrical resistance and the sample's melting temperature",
      'Density and how much the sample expands when heated',
    ],
    correctIndex: 0,
    rationale:
      'A tensile test loads a sample in a controlled way and turns the load-versus-stretch data into a stress-strain curve, from which the yield strength, the ultimate (maximum) strength, and the percent elongation at break are all read off.',
  },
  {
    id: 'mt-008',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt:
      'On a typical engineering stress-strain curve, what is happening in the region before the yield point is reached?',
    choices: [
      'The sample has already snapped into two separate pieces',
      'The line is straight, and the sample would spring back fully if the load were removed at this stage',
      'The sample is undergoing slow creep under a constant load',
      'The load stays fixed while the sample keeps stretching forever',
    ],
    correctIndex: 1,
    rationale:
      'The stretch of the curve before the yield point is the elastic region: the line runs straight, and any stretch produced there is fully recoverable if the load is taken off before that point is passed.',
  },
  {
    id: 'mt-009',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt:
      'Past the highest point on the stress-strain curve (the ultimate strength), many ductile metals show the curve dipping while the sample keeps stretching until it finally breaks. What is physically happening at this stage?',
    choices: [
      'The sample is cooling down and becoming harder',
      'The sample has sprung back fully to its original shape',
      'The sample is thinning down sharply at one spot (necking) just before it finally breaks',
      'The testing machine has stopped applying any load at all',
    ],
    correctIndex: 2,
    rationale:
      'After the ultimate strength is reached, deformation concentrates into one narrow spot, called necking, where the cross-section thins rapidly; the recorded stress dips even though the true stress at that thinning spot keeps climbing until fracture.',
  },
  {
    id: 'mt-010',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt: 'Which property lets a metal be drawn out into a long, thin wire without cracking?',
    choices: [
      'Hardness - resistance to being scratched or dented',
      'Density - how much mass is packed into a given volume',
      'Conductivity - how easily electric current passes through the material',
      'Ductility - the ability to stretch or bend a lot before finally breaking',
    ],
    correctIndex: 3,
    rationale:
      'Ductility describes how much a material can be permanently stretched or bent before it cracks, and this is exactly the property that lets a metal be pulled through a die into a long, thin wire.',
  },
  {
    id: 'mt-011',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt: 'A brittle material is best described as one that...',
    choices: [
      'Snaps or shatters with little or no warning bend beforehand',
      'Bends and stretches a great deal before it finally gives way',
      'Can be hammered into thin sheets without cracking',
      'Recovers its original shape completely once any load is removed',
    ],
    correctIndex: 0,
    rationale:
      'Brittleness is the opposite of stretchiness (ductility): a brittle material fails suddenly, breaking or shattering with barely any bending or warning beforehand, unlike a ductile material that stretches noticeably first.',
  },
  {
    id: 'mt-012',
    topic: 'mechanicalTesting',
    type: 'tf',
    prompt:
      'Malleability specifically describes how well a material can be hammered or rolled into thin sheets, which is a slightly different idea from being drawn into wire.',
    correctAnswer: true,
    rationale:
      'Ductility is about stretching a material into wire under a pulling force, while malleability is about pressing or hammering it (compressive forces) into flat sheets, so the two words describe two different reshaping behaviors even though both mean the material can be deformed without cracking.',
  },
  {
    id: 'mt-013',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt:
      'A glass rod bends almost imperceptibly and then shatters suddenly when overloaded, with no drawn-out warning stage beforehand. Which property does this behavior illustrate?',
    choices: ['High ductility', 'Brittleness', 'High malleability', 'High resilience'],
    correctIndex: 1,
    rationale:
      'Shattering suddenly with almost no bending beforehand is the hallmark of a brittle material, which fails with little or no warning, unlike a ductile or malleable material that visibly deforms first.',
  },
  {
    id: 'mt-014',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt: "'Toughness' in materials testing refers to which idea?",
    choices: [
      'How resistant a surface is to being scratched or dented',
      'The stress level at which permanent bending first begins',
      'The total amount of energy a material can soak up before it finally fractures',
      'How quickly a heated sample cools back down',
    ],
    correctIndex: 2,
    rationale:
      'Toughness is a measure of how much energy a material can absorb, right up to the point it fractures; graphically, it is the whole area underneath the stress-strain curve up to that breaking point.',
  },
  {
    id: 'mt-015',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt: "'Hardness' in materials testing refers to which idea?",
    choices: [
      'How much energy a material can absorb before it breaks',
      'How far a material stretches before it finally snaps',
      'How well a material conducts heat',
      "A material's resistance to having its surface dented or scratched by something harder",
    ],
    correctIndex: 3,
    rationale:
      "Hardness is specifically about the surface: it is a material's resistance to being permanently dented or scratched when something harder presses into or drags across it.",
  },
  {
    id: 'mt-016',
    topic: 'mechanicalTesting',
    type: 'tf',
    prompt: 'A material can be very hard yet still be low in toughness.',
    correctAnswer: true,
    rationale:
      'Hardness only measures resistance to surface denting or scratching, while toughness measures how much energy the material soaks up before it cracks. A hard material such as glass or a ceramic can resist scratches well yet still shatter after absorbing very little energy, so the two properties do not have to move together.',
  },
  {
    id: 'mt-017',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt: 'The Brinell hardness test presses which kind of indenter (pressing tool) into the sample surface?',
    choices: [
      'A hard steel or carbide ball (sphere) pressed in under a set load',
      'A pointed diamond pyramid pressed into the surface',
      'A rounded diamond cone pressed into the surface',
      'A flat, blunt steel wedge dragged across the surface',
    ],
    correctIndex: 0,
    rationale:
      'The Brinell test forces a hard ball indenter into the surface under a known load and then measures the diameter of the resulting dent; the load divided by the dent\'s surface area gives the Brinell hardness number (BHN).',
  },
  {
    id: 'mt-018',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt: 'The Rockwell hardness test is popular for quick, everyday checks mainly because it...',
    choices: [
      'Requires melting a sample of the material first',
      'Gives a direct-reading hardness number from how deep the indenter sinks under a small (minor) load followed by a larger (major) load, with no separate measuring step afterward',
      'Only works on liquids, never on solid metal parts',
      "Measures the sample's electrical resistance instead of any dent",
    ],
    correctIndex: 1,
    rationale:
      'The Rockwell test applies a light minor load to seat the indenter, then a heavier major load, and reads hardness straight off the depth the indenter travels, skipping the extra step of measuring the dent afterward that methods like Brinell require.',
  },
  {
    id: 'mt-019',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt:
      'A lab needs to check the hardness of a very hard, thin ceramic coating, with only a tiny test area available. Which hardness test, with its diamond-pyramid indenter, best suits this small, hard sample?',
    choices: [
      'Brinell, because its large ball indenter leaves a bigger dent',
      'The Mohs scratch scale, because it needs no calibrated testing machine',
      'Vickers, because its small diamond-pyramid indenter leaves a fine, precisely measurable dent suited to hard or thin samples',
      'Charpy impact testing, because it directly reports a hardness number',
    ],
    correctIndex: 2,
    rationale:
      "The Vickers test uses a small diamond-pyramid indenter that leaves a tiny, precisely measurable dent, which makes it well suited to very hard materials and to small or thin samples where a larger ball indenter wouldn't fit or would damage the part.",
  },
  {
    id: 'mt-020',
    topic: 'mechanicalTesting',
    type: 'tf',
    prompt:
      'Like the Brinell hardness test, the Rockwell hardness test requires the operator to measure the width of the leftover dent under a microscope afterward.',
    correctAnswer: false,
    rationale:
      'The Rockwell test skips that extra measuring step: it reads a hardness number directly from how deep the indenter sinks under a minor load followed by a major load. Brinell hardness, by contrast, is only found afterward by measuring the diameter of the dent it leaves.',
  },
  {
    id: 'mt-021',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt: "'Fatigue' failure in a metal part happens when...",
    choices: [
      'The part is loaded once, briefly, past its yield point',
      'The part is heated until it melts',
      'The part sits completely unloaded for a long period of time',
      'The part is exposed to repeated (cyclic) loading and cracks even though each individual load stays below the yield strength',
    ],
    correctIndex: 3,
    rationale:
      'Fatigue is failure caused by many repeated loading cycles, not by one big overload; a part can develop a crack from fatigue even when every single cycle applies a stress well under the yield strength (the stress that would cause permanent bending on its own).',
  },
  {
    id: 'mt-022',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt:
      'Which of these is the classic example of a part failing from fatigue rather than from a single overload?',
    choices: [
      'A rotating shaft or an aircraft part that cracks after many repeated stress cycles, each one well under its yield strength',
      'A steel beam that bends permanently the first time an unusually heavy truck crosses it',
      'A metal rod that melts when placed directly into a furnace',
      'A wire that stretches slowly for years under one constant load while sitting at high temperature',
    ],
    correctIndex: 0,
    rationale:
      'Rotating shafts and aircraft components are classic fatigue examples because they experience the same stress cycle over and over, millions of times, and can crack from that repetition even though no single cycle ever comes close to the yield strength.',
  },
  {
    id: 'mt-023',
    topic: 'mechanicalTesting',
    type: 'tf',
    prompt:
      "Some materials show a 'fatigue limit,' a stress level below which the material can withstand an essentially unlimited number of load cycles without cracking.",
    correctAnswer: true,
    rationale:
      'For many metals, especially steels, there is a stress level below which repeated cycling does not lead to a fatigue crack no matter how many cycles are applied; engineers call this stress level the fatigue limit and try to keep working stresses below it.',
  },
  {
    id: 'mt-024',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt:
      'Turbine blades inside a jet engine sit at high temperature while carrying a steady mechanical load for long stretches of time. Which failure mechanism are they most classically used to illustrate?',
    choices: [
      'Fatigue, caused by one single sharp overload',
      'Creep - a slow, permanent stretching that builds up over time under that constant load and heat',
      'Elastic deformation that fully disappears the moment the engine is switched off',
      'Brittle fracture caused by a small scratch on the surface',
    ],
    correctIndex: 1,
    rationale:
      'Creep is the slow, permanent stretching a material undergoes when a constant load is combined with sustained high temperature over a long time, and turbine blades experience exactly that pairing while a jet engine runs, so they are a textbook creep example.',
  },
  {
    id: 'mt-025',
    topic: 'mechanicalTesting',
    type: 'tf',
    prompt:
      'Creep-type permanent deformation mainly shows up in materials kept at low or room temperature under a constant load.',
    correctAnswer: false,
    rationale:
      'Creep specifically needs both a constant load and a high operating temperature sustained over a long time; at low or room temperature, that same constant load generally does not produce this slow, ongoing stretching.',
  },
  {
    id: 'mt-026',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt: "As a material's operating temperature rises, what generally happens to its strength?",
    choices: [
      'Strength always increases steadily with temperature for every material',
      'Strength stays exactly the same no matter the temperature',
      'Strength generally falls as the operating temperature climbs higher',
      'Strength becomes impossible to measure once a material is heated at all',
    ],
    correctIndex: 2,
    rationale:
      'As a rule of thumb, raising the temperature a material operates at tends to lower its strength, which is why materials meant for hot service need to be chosen with that drop in mind.',
  },
  {
    id: 'mt-027',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt:
      'When comparing typical polymers (plastics) and ceramics for high-temperature service, which statement best fits their general behavior?',
    choices: [
      'Polymers are the preferred choice for the hottest engine parts',
      'Ceramics soften and lose their strength earlier than most polymers do',
      'Neither material family is affected at all by a rise in temperature',
      'Polymers perform well mainly at low temperatures, while some ceramics keep good properties even at high temperatures',
    ],
    correctIndex: 3,
    rationale:
      'Polymers generally suit only lower-temperature applications, while certain ceramics (along with some special alloys and composites) retain useful properties even at high temperatures, making them better suited to hot service.',
  },
  {
    id: 'mt-028',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt:
      "How do 'elasticity' and 'stiffness' differ as descriptions of a material's elastic (fully recoverable) behavior?",
    choices: [
      'Elasticity describes whether the deformation can be recovered at all, while stiffness (the slope of the elastic part of the graph) describes how strongly the material resists stretching',
      'They are simply two different names for the exact same number',
      'Elasticity only applies to liquids, and stiffness only applies to solids',
      'Stiffness measures the energy absorbed at fracture, which is the same thing as elasticity',
    ],
    correctIndex: 0,
    rationale:
      'Elasticity is about whether a deformation reverses once the load is removed, while stiffness is a measure of how much stress it takes to produce a given amount of that elastic stretch, read from the slope of the straight-line part of the stress-strain graph. A material can be elastic yet not very stiff, or elastic and very stiff.',
  },
  {
    id: 'mt-029',
    topic: 'mechanicalTesting',
    type: 'tf',
    prompt:
      "Resilience describes a material's ability to soak up energy in its elastic (fully recoverable) range and then give that energy back when the load is removed.",
    correctAnswer: true,
    rationale:
      'Resilience is about the springy, recoverable part of loading: the material absorbs energy while it stretches elastically and releases that same energy once unloaded. This is different from toughness, which covers energy absorbed all the way to fracture, including the permanent stretching beyond yield.',
  },
  {
    id: 'mt-030',
    topic: 'mechanicalTesting',
    type: 'mcq',
    prompt:
      'Impact tests such as the Charpy or Izod test, which strike a notched sample with a swinging hammer, are mainly used to measure which property?',
    choices: [
      'Surface hardness under slow, steady pressure',
      "Toughness - the energy the sample absorbs during a sudden, high-speed fracture",
      "The sample's electrical resistivity",
      "The sample's melting temperature",
    ],
    correctIndex: 1,
    rationale:
      'Charpy and Izod impact tests swing a heavy hammer into a notched sample and measure how much energy the sample absorbs before it snaps, which is exactly what toughness means, but captured under a sudden, high-speed impact rather than a slow, steady pull.',
  },
];
