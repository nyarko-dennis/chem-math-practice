import type { MaterialsQuestion } from './materialsTypes.ts';

export const solidificationDefectsQuestions: MaterialsQuestion[] = [
  {
    id: 'sd-001',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "When a molten (liquid) metal solidifies (turns solid) as it cools, in what order do the three stages normally happen?",
    choices: [
      'Nuclei (tiny seed crystals) form first, then those seed crystals grow into crystals, and grains with grain boundaries (the dividing zones between grains) form last where the growing crystals meet',
      'Grain boundaries (the dividing zones between grains) form first, then nuclei (tiny seed crystals) appear, then crystals grow',
      'Crystals grow first, and only afterward do nuclei (tiny seed crystals) appear inside them',
      'All three stages happen at exactly the same instant everywhere in the metal',
    ],
    correctIndex: 0,
    rationale:
      "Solidification (liquid metal turning solid as it cools) starts with nucleation: tiny stable seed crystals, called nuclei, form in the cooling liquid. Each of those nuclei then grows into a full crystal, called a grain. Where two neighboring grains (crystals) meet, a grain boundary (the dividing zone between two grains) forms.",
  },
  {
    id: 'sd-002',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "As a metal finishes solidifying (turning from liquid to solid) in a mold, several crystals are growing outward from different seed points at once. What forms exactly where two of these growing crystals meet?",
    choices: [
      'A new pocket of liquid that never solidifies',
      'A grain boundary: a thin, disordered zone where the atoms belong partly to each neighboring grain (crystal)',
      'A single, perfectly aligned crystal with no dividing zone at all',
      'A gap containing no atoms at all',
    ],
    correctIndex: 1,
    rationale:
      "Each growing crystal is called a grain. When two grains growing in different orientations (directions) run into each other, the atoms at the meeting point cannot line up perfectly with either grain, so a grain boundary (a thin, disordered dividing zone between two grains) forms there.",
  },
  {
    id: 'sd-003',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "In homogeneous nucleation (the forming of the first tiny seed crystals inside a pure liquid metal, with no outside help), where do the atoms that build a seed crystal come from?",
    choices: [
      'From the mold wall the liquid metal touches',
      'From solid impurity particles floating in the liquid metal',
      "From the liquid metal itself - its own slow-moving atoms randomly bond together as it cools",
      'From a scratch or rough spot on the container surface',
    ],
    correctIndex: 2,
    rationale:
      "Homogeneous nucleation (seed crystals forming with no outside surface to help) happens when slow-moving atoms of the pure melt (liquid metal) itself bond together into clusters. Because there is no surface to assist the process, this route needs the liquid to be cooled well below its normal freezing point first, a state called undercooling.",
  },
  {
    id: 'sd-004',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "Real industrial castings (metal parts formed by pouring liquid metal into a mold) almost always solidify by heterogeneous nucleation rather than homogeneous nucleation. Why?",
    choices: [
      'Because industrial melts never contain any impurities',
      'Because heterogeneous nucleation only happens inside a vacuum',
      'Because mold walls chemically dissolve the liquid metal on contact',
      "Because mold walls and floating impurity particles give the first seed crystals (nuclei) a surface to form on, which needs far less undercooling (cooling below the normal freezing point) than starting from nothing",
    ],
    correctIndex: 3,
    rationale:
      "Heterogeneous nucleation (seed crystals, or nuclei, forming with outside help) lets atoms latch onto an existing surface, such as a mold wall or an impurity particle, which lowers the energy needed to form a stable nucleus (seed crystal). Since mold walls and impurities are almost always present in castings, castings rarely need the large undercooling (cooling well below the freezing point) that homogeneous nucleation requires.",
  },
  {
    id: 'sd-005',
    topic: 'solidificationDefects',
    type: 'tf',
    prompt:
      'Homogeneous nucleation (seed crystals forming from a pure melt with no outside surface to help) generally needs more undercooling (cooling below the normal freezing point) than heterogeneous nucleation (seed crystals forming with the help of a mold wall or impurity particle).',
    correctAnswer: true,
    rationale:
      "Without a surface to nucleate (start a seed crystal) on, homogeneous nucleation relies purely on random atom clustering, which only becomes reliable once the liquid is cooled well below its freezing point, a state called undercooling. Heterogeneous nucleation gets a head start from an existing surface, so it can begin with much less undercooling.",
  },
  {
    id: 'sd-006',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "In a casting (a part formed by pouring liquid metal into a mold), what is a dendrite?",
    choices: [
      'A branching, tree-like crystal that grows out into the cooling liquid metal during solidification (the liquid-to-solid change)',
      'A flat, perfectly smooth crystal face',
      'A crack that forms only after the metal has fully cooled',
      'A type of grain boundary (dividing zone between grains) found only in ceramics',
    ],
    correctIndex: 0,
    rationale:
      "As a growing crystal pushes out into the surrounding liquid metal, it tends to send out branches in preferred directions, producing a tree-like, branching shape called a dendrite. Dendrites are a common feature of the solidified structure found inside castings.",
  },
  {
    id: 'sd-007',
    topic: 'solidificationDefects',
    type: 'tf',
    prompt:
      'Dendrites (branching, tree-like crystals seen in castings) grow as smooth, uniform spheres that expand equally in every direction.',
    correctAnswer: false,
    rationale:
      "Dendrites are branching and tree-like, not sphere-shaped. A dendrite grows faster along certain preferred directions than others, and that uneven growth is exactly what produces its tree-like branches instead of a smooth, uniform ball shape.",
  },
  {
    id: 'sd-008',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "Compared with a coarse-grained metal (one made up of large grains, meaning large individual crystals), a fine-grained metal (one made up of small grains) of the same composition is generally:",
    choices: [
      'Weaker and more brittle, because small grains leave fewer paths for slip (the sliding motion that lets a metal bend)',
      "Stronger and tougher, because it has more grain boundaries (the dividing zones between grains) per unit volume, and these boundaries block the movement of dislocations (line-shaped defects that carry plastic, or permanent, deformation)",
      'Identical in strength, since grain size has no effect on mechanical properties',
      'Only different in appearance, with no change to any mechanical property',
    ],
    correctIndex: 1,
    rationale:
      "A grain is an individual crystal within the metal, and a grain boundary is the disordered dividing zone where two grains meet. More grain boundaries per unit volume means more obstacles for dislocations (line-shaped defects that carry plastic, or permanent, deformation) to cross, so fine-grained metals typically end up stronger and tougher than coarse-grained ones.",
  },
  {
    id: 'sd-009',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "A sand casting (metal poured into a sand mold) cools very slowly. Why does this slow cooling tend to produce coarse grains (large individual crystals) rather than fine grains (small individual crystals)?",
    choices: [
      'Slow cooling makes many more nuclei (seed crystals) form than fast cooling does',
      'Slow cooling prevents any nucleation (seed crystal formation) from happening at all',
      "Slow cooling causes fewer stable seed crystals (nuclei) to form, so each one has more time to grow larger before it runs into a neighboring grain",
      'Slow cooling has no effect on the number or size of grains that form',
    ],
    correctIndex: 2,
    rationale:
      "When cooling is slow, fewer nuclei (tiny seed crystals) get started, and the ones that do form have a long time to grow before meeting a neighboring grain (crystal). Fewer, larger grains is exactly what a coarse-grain structure means.",
  },
  {
    id: 'sd-010',
    topic: 'solidificationDefects',
    type: 'tf',
    prompt:
      'A rapidly cooled casting generally ends up with finer grains (smaller individual crystals) than the same metal cooled slowly.',
    correctAnswer: true,
    rationale:
      "Fast cooling encourages many seed crystals (nuclei) to start forming at once, and each one has little time to grow before bumping into a neighboring grain (crystal), leaving a fine-grained, or small-crystal, structure. Slow cooling does the opposite: fewer nuclei form, so the resulting grains are fewer and larger.",
  },
  {
    id: 'sd-011',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt: 'What is a solid solution in metals?',
    choices: [
      'Two metals melted together that separate back into distinct layers once solid',
      'A liquid metal that has not yet solidified',
      'A metal coated with a thin layer of paint',
      "A solute (the substance present in the smaller amount) dissolved uniformly within the crystal lattice (the repeating atomic arrangement) of a solvent metal (the substance present in the larger amount), forming a single solid structure",
    ],
    correctIndex: 3,
    rationale:
      "In a solid solution, atoms of one metal, the solute (the substance present in the smaller amount), are mixed uniformly into the crystal lattice (the repeating pattern of atom positions) of another metal, the solvent (the substance present in the larger amount). The result behaves as one single solid structure rather than separating into layers.",
  },
  {
    id: 'sd-012',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "Copper and nickel dissolve completely in each other in any proportion, forming a substitutional solid solution. What does 'substitutional' mean here?",
    choices: [
      "The solute atoms (whichever metal, copper or nickel, is present in the smaller amount) take the place of solvent atoms directly on the solvent's normal lattice sites (atom positions in the crystal structure)",
      'The solute atoms squeeze into small gaps between the solvent atoms instead of taking a lattice site (atom position in the crystal structure)',
      'The solute atoms float freely between grains (crystals) without joining any lattice (repeating atomic arrangement)',
      'The solute atoms only bond to the outer surface of the solvent metal',
    ],
    correctIndex: 0,
    rationale:
      "In a substitutional solid solution, a solute atom (the dissolved metal atom) is close enough in size to sit directly on a lattice site (a normal atom position in the crystal) that would otherwise hold a solvent atom, essentially substituting for it. Copper and nickel atoms are similar enough in size and share the same crystal structure, so they substitute for each other freely.",
  },
  {
    id: 'sd-013',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "Carbon dissolves in iron to form an interstitial solid solution. What makes this solution 'interstitial' rather than substitutional?",
    choices: [
      'The carbon atoms replace iron atoms one-for-one on the iron lattice sites (atom positions in the crystal structure)',
      "The small carbon atoms fit into the interstices - the tiny open gaps between the larger iron atoms - rather than replacing iron atoms on their lattice sites (atom positions in the crystal structure)",
      'The carbon atoms form a separate liquid layer on top of the solid iron',
      'The carbon atoms are exactly the same size as the iron atoms',
    ],
    correctIndex: 1,
    rationale:
      "Interstitial solid solutions form when the solute atom (carbon, here) is much smaller than the solvent atom (iron) and can squeeze into the small gaps, called interstices, between solvent atoms instead of taking over a lattice site (a normal atom position in the crystal).",
  },
  {
    id: 'sd-014',
    topic: 'solidificationDefects',
    type: 'tf',
    prompt:
      'In an interstitial solid solution, the solute atoms sit in the small gaps between solvent atoms rather than replacing solvent atoms on their lattice sites.',
    correctAnswer: true,
    rationale:
      "That is the defining feature of an interstitial solid solution: the solute atom (the dissolved, usually much smaller, atom) is small enough to occupy a gap, called an interstice, between solvent atoms instead of substituting for one of them on a lattice site (a normal atom position in the crystal).",
  },
  {
    id: 'sd-015',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "According to the atomic-size guideline used to predict substitutional solid solubility (how completely one metal can dissolve into another by substitution), extensive solid solubility is expected only when the atomic radii (sizes) of solute and solvent differ by roughly:",
    choices: [
      'More than 50 percent',
      'Exactly 100 percent',
      'Less than about 15 percent',
      'It does not matter how different the atomic sizes are',
    ],
    correctIndex: 2,
    rationale:
      "If the solute atom's radius differs from the solvent atom's radius by less than about 15 percent, the lattice (the repeating atomic pattern) can accommodate the substitution without excessive strain, allowing extensive solid solubility (a high degree of one metal dissolving into another). Beyond that size difference, solubility becomes limited.",
  },
  {
    id: 'sd-016',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "For two metals to be completely soluble in each other as a substitutional solid solution across all proportions, which condition must be met, according to the crystal-structure guideline?",
    choices: [
      'The two metals must have completely different crystal structures',
      'One of the two metals must be a liquid at room temperature',
      'Both metals must have the exact same melting point',
      'Both metals must have the same type of crystal structure (for example, both face-centered cubic, meaning atoms arranged at the corners and face centers of a cube)',
    ],
    correctIndex: 3,
    rationale:
      "Complete substitutional solid solubility, meaning one metal can dissolve fully into another by swapping lattice positions, generally requires both metals to share the same crystal structure, the repeating three-dimensional pattern their atoms are arranged in, such as both being face-centered cubic (atoms at the corners and face centers of a cube).",
  },
  {
    id: 'sd-017',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "Between aluminum and nickel, solid solubility runs one way far better than the other: nickel can take in roughly 5 percent aluminum, while aluminum accepts only about 0.04 percent nickel in return. Which guideline explains why the two directions are so lopsided?",
    choices: [
      "The valence guideline: since nickel has the lower valence (fewer typical bonds) of the pair, it acts as the more generous solvent, absorbing more aluminum than aluminum can absorb of it",
      'The atomic-size guideline alone, since nickel and aluminum atoms are identical in size',
      'The crystal-structure guideline, since nickel and aluminum never share a crystal structure',
      'Random chance, since solid solubility cannot be predicted or explained',
    ],
    correctIndex: 0,
    rationale:
      "Valence measures an atom's typical combining power - roughly how many bonds it forms. As a rule of thumb, a solvent with lower valence dissolves a higher-valence solute more readily than the reverse holds true. Because nickel's valence sits below aluminum's, it can host a much larger share of aluminum atoms than aluminum can host of nickel.",
  },
  {
    id: 'sd-018',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "Diffusion (the gradual movement of atoms through a solid) can happen by the vacancy mechanism. How does this mechanism work?",
    choices: [
      'Atoms pass straight through the solid metal as if it were a liquid',
      "An atom jumps sideways into a neighboring vacancy - an empty lattice site (atom position) where an atom is missing - leaving its own former spot empty in turn",
      'An entire row of atoms breaks free from the metal all at once',
      'Atoms only move once the metal has been melted first',
    ],
    correctIndex: 1,
    rationale:
      "A vacancy is an empty lattice site, meaning a normal atom position with no atom currently in it. This occurs naturally, especially at high temperature. In the vacancy mechanism, a neighboring atom hops into that empty site, effectively moving the vacancy, and over many such jumps, moving atoms through the solid.",
  },
  {
    id: 'sd-019',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "Carburizing (a case-hardening process that adds carbon to the surface of low-carbon steel) works by heating the steel in a carbon-rich atmosphere so that carbon atoms diffuse, or gradually move, into the surface. Which diffusion mechanism lets the small carbon atoms move through the iron lattice (the repeating atomic arrangement of the iron), and why does a hotter furnace help?",
    choices: [
      'Carbon atoms move only by first melting the entire steel part',
      'Carbon atoms move only when the steel is cooled to below freezing',
      "Carbon atoms move by the interstitial mechanism, hopping between the small gaps (interstices) between iron atoms; a higher temperature gives atoms more thermal (heat) energy, so this hopping happens faster",
      'Carbon atoms cannot move through solid iron under any conditions',
    ],
    correctIndex: 2,
    rationale:
      "Because carbon atoms are much smaller than iron atoms, they diffuse, meaning gradually move, by the interstitial mechanism: hopping from one interstitial gap (small open space between lattice atoms) to the next, rather than needing an empty lattice site. Diffusion speeds up sharply as temperature rises, which is why carburizing furnaces run hot - it drives carbon into the steel's hardened surface layer, called the case, faster.",
  },
  {
    id: 'sd-020',
    topic: 'solidificationDefects',
    type: 'tf',
    prompt: 'Diffusion of atoms through a solid metal happens faster at low temperatures than at high temperatures.',
    correctAnswer: false,
    rationale:
      "Diffusion is the gradual movement of atoms through a solid, and it depends on atoms having enough thermal (heat) energy to jump between lattice sites (atom positions) or interstitial gaps (small spaces between lattice atoms). Higher temperature gives atoms more of this thermal energy, so diffusion speeds up, not slows down, as temperature rises.",
  },
  {
    id: 'sd-021',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "In terms of crystal defects (imperfections in the regular atomic arrangement of a solid), what is a vacancy?",
    choices: [
      'An extra atom crowded into a gap between normal lattice atoms',
      'A foreign atom of a different element sitting in place of a host atom',
      'A boundary between two grains (crystals) of different orientation',
      'An empty lattice site: a normal atom position in the crystal that currently has no atom occupying it',
    ],
    correctIndex: 3,
    rationale:
      "A vacancy is a point defect, meaning a defect confined to a single atom position, where an atom is missing from a lattice site (a normal atom position in the crystal). Vacancies become more common at higher temperatures and are what makes vacancy-mechanism diffusion (atoms moving through a solid via empty lattice sites) possible.",
  },
  {
    id: 'sd-022',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt: 'A self-interstitial atom is a point defect (a defect confined to a single atom position) in which:',
    choices: [
      "An atom of the host metal itself has crowded into a small interstitial gap between its normal neighbors, badly straining the surrounding lattice (repeating atomic arrangement)",
      'A foreign atom neatly replaces a host atom on a lattice site (atom position in the crystal)',
      'A whole plane of atoms is missing from the crystal',
      'Two grains (crystals) meet at an angle',
    ],
    correctIndex: 0,
    rationale:
      "A self-interstitial atom is an extra atom of the same element as the surrounding lattice (repeating atomic arrangement), squeezed into an interstitial gap, a small space between normal lattice positions, rather than sitting on its own proper site. Because this atom does not really fit, it heavily strains the tightly packed lattice, so self-interstitial atoms are rare in metals.",
  },
  {
    id: 'sd-023',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "A foreign atom can only slot neatly onto a host lattice site if it is close in size to the atom it replaces - within about 15 percent, as a rule of thumb. Copper and zinc satisfy that rule (radii of roughly 0.128 nm and 0.133 nm), which is exactly why brass can form with zinc occupying copper positions on the copper lattice (the repeating atomic arrangement of copper). What kind of point defect (a defect confined to a single atom position) does this describe?",
    choices: [
      'A vacancy: an empty lattice site with no atom in it',
      'A substitutional impurity atom, since a foreign atom of similar size has replaced a host atom on its lattice site (atom position in the crystal)',
      'A self-interstitial atom: an atom of the host metal squeezed into a gap between its own neighbors',
      'A grain boundary: the dividing zone between two grains (crystals)',
    ],
    correctIndex: 1,
    rationale:
      "A substitutional impurity atom is a foreign atom that takes over a lattice site (a normal atom position) that would otherwise hold a host atom. This size-matching requirement is exactly what lets zinc, at about 0.133 nm, swap in for copper, at about 0.128 nm, in brass without badly straining the surrounding lattice.",
  },
  {
    id: 'sd-024',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "An edge dislocation, a type of line defect (a defect that runs along a line of atoms rather than being confined to one point), can be pictured as:",
    choices: [
      'A single missing atom at one lattice site (atom position in the crystal)',
      'A flat boundary separating two mirror-image crystal regions',
      "An extra half-plane of atoms inserted partway into an otherwise regular crystal, with the dislocation line running along the edge of that half-plane",
      'A foreign atom substituting for a host atom on a lattice site',
    ],
    correctIndex: 2,
    rationale:
      "Picture a perfect crystal with atoms arranged in neat planes. An edge dislocation is what you get when one of those planes does not run the full length of the crystal but stops partway through, like an extra half-plane wedged in. The dislocation line runs along the edge of that incomplete plane, and it is this line defect that lets the crystal deform, or change shape, under lower stress than a perfect crystal would need.",
  },
  {
    id: 'sd-025',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "A screw dislocation, a type of line defect caused by shear stress (a sideways-pushing force), differs from an edge dislocation mainly in that:",
    choices: [
      'It only occurs in liquids, never in solids',
      'It involves a missing row of atoms rather than a shift in atom position',
      'It cannot move under any applied stress',
      "The dislocation line itself runs parallel to (in the same direction as) the displacement of atoms, whereas an edge dislocation's line runs perpendicular to that displacement",
    ],
    correctIndex: 3,
    rationale:
      "In an edge dislocation, the line defect sits at a right angle to the direction atoms shift under stress. A screw dislocation flips that geometry: its line runs in the same direction as the atom displacement instead of crosswise to it. Both types still let a crystal slip, meaning atoms shift bond by bond, at much lower stress than breaking every bond across a plane at once.",
  },
  {
    id: 'sd-026',
    topic: 'solidificationDefects',
    type: 'tf',
    prompt:
      'A dislocation, a line defect that lets a crystal deform under stress, lets a metal deform by breaking every atomic bond across an entire slip plane (the plane atoms slide along) all at the same instant.',
    correctAnswer: false,
    rationale:
      "This is the opposite of how a dislocation (line defect) actually works, and it is exactly why dislocations give metals a deformation shortcut. Only a small number of bonds near the dislocation line break and reform at any moment as it moves, plane by plane, which needs far less force than shattering every bond across the slip plane simultaneously.",
  },
  {
    id: 'sd-027',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "A twin boundary is a planar defect (a defect spread across a flat internal surface, rather than at a point or along a line). What distinguishes it from an ordinary grain boundary (the dividing zone between two grains)?",
    choices: [
      "The crystal regions on either side of a twin boundary are mirror images of each other across that boundary plane, whereas an ordinary grain boundary just separates crystals (grains) of unrelated, random orientation",
      'Twin boundaries only exist in liquids, never in solid metals',
      'Twin boundaries are a type of point defect (a defect confined to a single atom position), not a planar one',
      'Twin boundaries always contain a missing row of atoms',
    ],
    correctIndex: 0,
    rationale:
      "Both are planar defects, meaning defects spread over a flat internal surface, but at a twin boundary the atomic arrangement on one side is a mirror image of the arrangement on the other side, joined at a single shared plane. An ordinary grain boundary just separates two grains, or crystals, whose orientations do not have this special mirror relationship.",
  },
  {
    id: 'sd-028',
    topic: 'solidificationDefects',
    type: 'tf',
    prompt: 'A twin boundary is a planar defect where the crystal regions on either side are mirror images of each other.',
    correctAnswer: true,
    rationale:
      "This mirror-image relationship across a single shared plane is exactly what defines a twin boundary, a type of planar defect (a defect spread over a flat internal surface), setting it apart from an ordinary grain boundary, where the two sides just have different, unrelated orientations.",
  },
  {
    id: 'sd-029',
    topic: 'solidificationDefects',
    type: 'mcq',
    prompt:
      "Metals are often strengthened on purpose by adding fine grains (small crystals), alloying atoms, or heavy cold working (deforming the metal while it is cold). What do all of these strengthening approaches have in common?",
    choices: [
      'They all melt the metal and let it resolidify into a new shape',
      "They all introduce obstacles - such as grain boundaries, foreign solute atoms, or tangles of other dislocations - that block or pin dislocations (line defects that carry plastic, or permanent, deformation), raising the stress needed for the dislocations to move and produce slip",
      'They all remove every defect from the crystal, leaving it perfect',
      "They all work by lowering the metal's melting point",
    ],
    correctIndex: 1,
    rationale:
      "Plastic deformation, meaning permanent shape change, happens when dislocations, line defects that carry this deformation, move through the crystal. Strengthening methods work by scattering obstacles, such as grain boundaries, foreign solute atoms, or other dislocations, in the dislocations' path, pinning them in place and forcing more stress to be applied before the metal can deform further.",
  },
  {
    id: 'sd-030',
    topic: 'solidificationDefects',
    type: 'tf',
    prompt:
      'Blocking the movement of dislocations (line defects that carry permanent deformation) inside a metal makes that metal easier to bend permanently.',
    correctAnswer: false,
    rationale:
      "This is backwards: dislocations, line defects that carry permanent deformation, are what let a metal deform, or change shape, permanently under relatively low stress by moving through the crystal. Blocking or pinning their movement with grain boundaries, foreign solute atoms, or other dislocations forces more stress to be applied before the metal can bend, which is exactly how strengthening and work hardening make a metal harder to permanently deform.",
  },
];
