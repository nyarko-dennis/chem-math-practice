import type { MaterialsQuestion } from './materialsTypes.ts';

export const ferrousSteelsQuestions: MaterialsQuestion[] = [
  {
    id: 'fs-001',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'What separates a "ferrous" metal from a "non-ferrous" one?',
    choices: [
      'A ferrous metal is always a liquid at room temperature',
      'A ferrous metal cannot be melted and recast',
      'A ferrous metal has iron as its main ingredient; a non-ferrous metal does not',
      'A ferrous metal is any metal mined instead of manufactured',
    ],
    correctIndex: 2,
    rationale:
      'Ferrous simply refers to iron: a ferrous metal or alloy is built mainly from iron, while a non-ferrous one (aluminum, copper, and so on) has little or no iron in it.',
  },
  {
    id: 'fs-002',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'Cast iron sits in a noticeably higher carbon band than steel. What practical consequence does that extra carbon have for how each material is used?',
    choices: [
      'The extra carbon makes cast iron more flexible than steel, which is why cast iron is chosen for springs',
      'The extra carbon lets cast iron melt and pour into molds more easily, but leaves the solid part brittle, while lower-carbon steel stays tough enough to be forged, rolled, and bent without cracking',
      'The extra carbon makes cast iron rust-proof, while steel always corrodes quickly',
      'The extra carbon makes cast iron much lighter than steel, which is why it suits aircraft parts',
    ],
    correctIndex: 1,
    rationale:
      "The higher carbon band lowers cast iron's melting behavior, so it flows well into molds - but once solid, much of that carbon sits as hard, brittle constituents, so cast parts crack rather than bend. Steel's lower carbon leaves it tough (able to take a knock without shattering) and workable, so it can be shaped by forging (hammering or pressing, usually while hot) and rolling instead of only casting.",
  },
  {
    id: 'fs-003',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'A part is described as being made from low-carbon (mild) steel and is destined for car body panels and sheet metal stampings. Roughly what carbon share and behavior would you expect?',
    choices: [
      'Around 0.9-1.3% carbon, giving a very hard, wear-resistant metal',
      'Around 3-4% carbon, giving a metal that is only suitable for casting into molds',
      'Around 0.05-0.25% carbon, giving a soft, easily formed (ductile) metal',
      'Essentially zero carbon, giving a metal that cannot be bent at all',
    ],
    correctIndex: 2,
    rationale:
      'Mild steel keeps carbon quite low, roughly under a quarter of a percent, which leaves it soft and easy to bend or press into shapes such as car body panels rather than especially strong.',
  },
  {
    id: 'fs-004',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'Medium-carbon steel is the usual choice for axles, gears, and crankshafts. What carbon range and property balance make it suited to this job?',
    choices: [
      'Roughly 0.01-0.05% carbon, making it too soft to hold a load-bearing shape',
      'Roughly 1.5-2% carbon, making it as brittle as glass',
      'Roughly 0.3-0.6% carbon, giving a workable balance of strength and machinability once heat treated',
      'Roughly 2.5-4% carbon, meaning it is really a cast iron rather than a steel',
    ],
    correctIndex: 2,
    rationale:
      'A middle carbon range lets the steel be hardened somewhat by heat treatment while still being machinable, which is exactly the mix of strength and workability that gears and axles need.',
  },
  {
    id: 'fs-005',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'A cutting tool needs to hold a sharp edge and resist wear, so it is made from high-carbon steel. What trade-off comes with pushing the carbon content up that high?',
    choices: [
      'Nothing changes; carbon content has no effect on hardness or ductility',
      'The steel becomes harder and more wear-resistant, but also more brittle and less able to bend without cracking',
      'The steel becomes softer but gains unlimited ductility',
      'The steel loses the ability to be heat treated at all',
    ],
    correctIndex: 1,
    rationale:
      'Pushing carbon content toward the high end raises hardness and wear resistance, which is great for a cutting edge, but the same steel gives up ductility (the ability to bend without snapping) and becomes brittle.',
  },
  {
    id: 'fs-006',
    topic: 'ferrousSteels',
    type: 'tf',
    prompt: 'Raising the carbon percentage of a plain carbon steel generally makes it harder.',
    correctAnswer: true,
    rationale:
      'True. Higher carbon raises hardness and wear resistance, but the trade-off is lower ductility (the ability to stretch or bend without breaking).',
  },
  {
    id: 'fs-007',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'The AISI/SAE numbering scheme labels steels with a four-digit code. What does each part of that code generally stand for?',
    choices: [
      'All four digits together just give the year the steel grade was registered',
      'The first digit shows the steel family or main alloying element, and the final two digits give the carbon share in hundredths of a percent',
      'The first two digits give the melting point in degrees Celsius',
      'The digits are a random batch number with no technical meaning',
    ],
    correctIndex: 1,
    rationale:
      'In the four-digit code, the first digit points to the steel type or its main added element, the second digit refines that further, and the last two digits report how much carbon is present, measured in hundredths of a percent.',
  },
  {
    id: 'fs-008',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'A supplier ships bar stock stamped "SAE 1045." Decoding the four digits, what steel is this?',
    choices: [
      'A chromium tool steel with 4.5% carbon',
      'A plain carbon steel containing about 0.45% carbon',
      'A stainless steel with 10% chromium and 4.5% nickel',
      'A nickel alloy steel with no carbon at all',
    ],
    correctIndex: 1,
    rationale:
      'The leading "1" marks it as a plain carbon grade, and the trailing "45" is read as hundredths of a percent, so SAE 1045 is a plain carbon steel holding about 0.45% carbon.',
  },
  {
    id: 'fs-009',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'A batch of bolts is stamped with a code beginning "10," such as 1020 or 1060. What does that leading pair of digits tell a technician about the steel family?',
    choices: [
      'It is a stainless steel with 10% chromium',
      'It is a tool steel hardened in water',
      'It is a plain carbon steel, since the code starts with 1 for steel type and 0 for no major secondary alloying addition',
      'It is a cast iron rather than a wrought steel',
    ],
    correctIndex: 2,
    rationale:
      'A leading 1 flags the plain carbon family, and a following 0 means no significant secondary alloying element was deliberately added, so any "10xx" code names a plain carbon steel, with the last two digits giving its carbon share.',
  },
  {
    id: 'fs-010',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'A shaft is specified as grade "4140." Based on the digit-coding pattern, what kind of alloy steel does the leading "41" point to?',
    choices: [
      'A silicon-manganese steel used mainly for springs',
      'A chromium-molybdenum alloy steel, prized for combined strength and toughness',
      'A pure nickel steel with no chromium or molybdenum',
      'A stainless steel from the 400 series',
    ],
    correctIndex: 1,
    rationale:
      'Grades beginning with "41" belong to the chromium-molybdenum family of alloy steels, where those two added elements work together to boost strength and toughness beyond what plain carbon steel offers; the final two digits still give the carbon share.',
  },
  {
    id: 'fs-011',
    topic: 'ferrousSteels',
    type: 'tf',
    prompt: 'SAE 4340 is a nickel-chromium-molybdenum alloy steel.',
    correctAnswer: true,
    rationale:
      'True. That blend of nickel, chromium, and molybdenum gives 4340 high strength along with good toughness, which is why it is picked for demanding parts such as aircraft and vehicle components.',
  },
  {
    id: 'fs-012',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'Adding chromium to a steel mainly improves which pair of properties?',
    choices: [
      'Only the ability of the steel to conduct electricity',
      'Melting point alone, with no effect on hardness',
      'Hardenability and resistance to corrosion (rusting and chemical attack)',
      'Magnetism, while leaving hardness and corrosion resistance unchanged',
    ],
    correctIndex: 2,
    rationale:
      'Chromium is added mainly because it helps the steel harden more effectively and, at higher amounts, forms a protective layer that resists rusting and corrosion.',
  },
  {
    id: 'fs-013',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'Nickel is a common alloying addition to steel chiefly because it boosts which property?',
    choices: [
      'Electrical resistance, with no change in mechanical behavior',
      'Melting point, making the steel unweldable',
      'Toughness, meaning the steel absorbs impact energy without cracking',
      'Only color, giving the steel a bright shine with no functional benefit',
    ],
    correctIndex: 2,
    rationale:
      'Nickel is prized in alloy steels mainly for raising toughness, the ability of the material to soak up an impact without shattering, and it also lends a hand with corrosion resistance when paired with other elements.',
  },
  {
    id: 'fs-014',
    topic: 'ferrousSteels',
    type: 'tf',
    prompt: "Manganese's main contribution to steel is boosting its resistance to rust and chemical corrosion.",
    correctAnswer: false,
    rationale:
      'This is false: that corrosion-fighting role belongs mainly to chromium. Manganese instead raises strength and hardenability (how deep below the surface a steel can be hardened) and helps tie up sulfur impurities that would otherwise weaken the steel.',
  },
  {
    id: 'fs-015',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'Molybdenum is added to certain steels mainly to improve performance under which condition?',
    choices: [
      'Sub-zero cold, with no benefit when the part gets hot',
      'Underwater use only, due to added buoyancy',
      'Purely decorative finishing, with no strength effect',
      'Elevated temperatures, where it helps the steel keep its strength and hardenability (how deep below the surface a steel can be hardened)',
    ],
    correctIndex: 3,
    rationale:
      'Molybdenum is valued because it helps a steel hold onto its strength and hardenability (how deep below the surface a steel can be hardened) even when working temperatures climb, which matters for parts that run hot.',
  },
  {
    id: 'fs-016',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'Adding a small amount of vanadium to a steel mainly has which effect on its internal grain structure?',
    choices: [
      'It removes grain structure entirely, turning the steel amorphous (without any regular internal pattern)',
      'It has no measurable effect on grain size',
      'It only affects the color of the fracture surface',
      'It refines the grain structure, keeping the individual crystal grains small',
    ],
    correctIndex: 3,
    rationale:
      'Vanadium forms hard carbide particles that pin down grain boundaries, keeping the grains (the individual crystal regions inside the metal) small, which in turn raises strength and toughness together.',
  },
  {
    id: 'fs-017',
    topic: 'ferrousSteels',
    type: 'tf',
    prompt: 'Tungsten additions help a steel keep its hardness even when the steel gets hot during use.',
    correctAnswer: true,
    rationale:
      'This is true: tungsten forms very stable carbide particles that resist softening as temperature rises, which is why tungsten-bearing steels are picked for tools that run hot, such as high-speed cutting tools.',
  },
  {
    id: 'fs-018',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'What roughly is the minimum chromium content needed for a steel to count as "stainless," and why does that threshold matter?',
    choices: [
      'About 1% chromium, which is enough to stop all rusting under any condition',
      '50% chromium, since anything less leaves the steel fully magnetic',
      'Chromium content is irrelevant; stainless behavior comes only from the nickel content',
      'About 10.5-12% chromium, enough to build a thin, self-repairing protective oxide layer on the surface',
    ],
    correctIndex: 3,
    rationale:
      'Once chromium reaches roughly 10.5-12%, it reacts with oxygen to build a thin, tightly bonded oxide film on the surface that shields the iron underneath and heals itself if scratched, which is what gives stainless steel its stain resistance.',
  },
  {
    id: 'fs-019',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'Kitchen sinks and food-processing equipment are commonly made from "18-8" stainless steel. What does that "18-8" shorthand describe?',
    choices: [
      'A martensitic grade hardened by quenching (rapid cooling) in oil',
      'A cast iron with 18% carbon and 8% silicon',
      'A ferritic grade with 18% chromium and no nickel at all',
      'An austenitic grade with roughly 18% chromium and 8% nickel',
    ],
    correctIndex: 3,
    rationale:
      'The "18-8" label is shorthand for the chromium and nickel percentages in a common austenitic stainless grade, and that chromium-nickel combination gives it strong corrosion resistance and good formability.',
  },
  {
    id: 'fs-020',
    topic: 'ferrousSteels',
    type: 'tf',
    prompt: 'A typical ferritic stainless steel relies on a substantial nickel addition, alongside chromium, to reach its corrosion resistance.',
    correctAnswer: false,
    rationale:
      'This is false: ferritic stainless steels get their corrosion resistance from chromium alone, without a deliberate nickel addition, which is exactly what separates them from nickel-bearing austenitic grades.',
  },
  {
    id: 'fs-021',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'Knife blades are often made from martensitic stainless steel. What treatment gives this family its hardness, and what trade-off comes with it?',
    choices: [
      'It cannot be hardened by any heat treatment, only by cold working',
      'It is softened permanently by any exposure to heat',
      'It gains hardness purely from its chromium content, with no heat treatment involved',
      'It is hardened by quenching (rapid cooling) and tempering, but ends up more brittle and harder to weld than other stainless families',
    ],
    correctIndex: 3,
    rationale:
      'Martensitic stainless steel carries enough carbon to respond to quenching (fast cooling) followed by tempering (a gentle reheat after quenching to trade a little hardness for toughness), which is how it reaches a hard, sharp-holding edge, though that same structure leaves it more brittle and harder to weld than other stainless types.',
  },
  {
    id: 'fs-022',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'Tool and die steels are a specialized family used for cutting tools, punches, and dies. What property combination are they primarily selected for?',
    choices: [
      'Maximum ductility, so the tool bends easily under load',
      'Low cost above every other consideration',
      'High electrical conductivity, since the tools are used in wiring',
      'High hardness and wear resistance, so the tool keeps its shape and edge under repeated use',
    ],
    correctIndex: 3,
    rationale:
      'Tool and die steels exist to survive repeated cutting, punching, or forming without wearing down or losing their shape, so hardness and wear resistance are the properties engineers select for first.',
  },
  {
    id: 'fs-023',
    topic: 'ferrousSteels',
    type: 'tf',
    prompt: 'Tool steels are chosen mainly for their high ductility rather than their hardness.',
    correctAnswer: false,
    rationale:
      'This is false: it is hardness, wear resistance, and (for hot-work grades) the ability to keep that hardness at elevated temperature that make a steel useful as a tool steel, not ductility.',
  },
  {
    id: 'fs-024',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'A machinist needs a cast iron that is easy to machine, has good vibration-damping, and will be used for an engine cylinder block. Which type of cast iron fits, and why?',
    choices: [
      'Grey cast iron, because carbon separates out as graphite flakes that cushion vibration and make cutting easier',
      'White cast iron, because its very hard structure machines faster than any other cast iron',
      'Wrought iron, because it contains no carbon at all',
      'Nodular cast iron, because its spherical graphite makes it as brittle as glass',
    ],
    correctIndex: 0,
    rationale:
      'In grey cast iron the carbon separates out as flat graphite flakes rather than staying combined with iron; those flakes act like tiny cushions that damp vibration and also break up chips during cutting, which is why grey iron machines so easily.',
  },
  {
    id: 'fs-025',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'A cast part needs an extremely hard, abrasion-resistant surface for a rock crusher liner, and some brittleness is acceptable. Which cast iron type and underlying structure fits best?',
    choices: [
      'White cast iron, where the carbon stays locked up as hard, brittle iron carbide instead of separating out as graphite',
      'Grey cast iron, where soft graphite flakes give the best possible wear resistance',
      'Malleable cast iron, because it is softer than any steel',
      'Wrought iron, because its fibrous structure resists abrasion best of all',
    ],
    correctIndex: 0,
    rationale:
      'White cast iron forms when the carbon stays locked up as hard iron carbide rather than breaking out as graphite, and that carbide-rich structure gives excellent wear resistance at the cost of being brittle, which suits a crusher liner that just needs to survive abrasion.',
  },
  {
    id: 'fs-026',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'Malleable cast iron does not start out malleable at all. How is it actually produced?',
    choices: [
      'A white cast-iron casting is heat treated afterward, breaking its hard carbide down into softer, more workable graphite clusters',
      'It is poured directly from molten grey cast iron with no further processing',
      'It is produced by rolling a plain carbon steel bar at room temperature',
      'It is simply a grey cast iron that has been re-melted and quickly cooled',
    ],
    correctIndex: 0,
    rationale:
      'The process starts with a white cast-iron casting, whose carbon is locked up as hard carbide, and a follow-up heat treatment breaks that carbide down into rounded clusters of graphite, leaving a tougher, more workable part.',
  },
  {
    id: 'fs-027',
    topic: 'ferrousSteels',
    type: 'tf',
    prompt: 'Ductile (nodular) cast iron holds its graphite as rounded spherical particles rather than flakes.',
    correctAnswer: true,
    rationale:
      'True. Rounded graphite spheres leave fewer built-in crack starters than sharp-edged flakes, which is why nodular cast iron can bend and absorb impact better than grey cast iron.',
  },
  {
    id: 'fs-028',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'An automotive engineer needs a cast part for a crankshaft that must handle repeated stress cycles somewhat like steel does, while still being cast into shape cheaply. Which cast iron is the standard pick?',
    choices: [
      'Nodular (ductile) cast iron, since its rounded graphite gives it steel-like strength and toughness while still being castable',
      'White cast iron, since its brittleness is ideal for parts under repeated stress',
      'Wrought iron, since it has the highest carbon content of any ferrous material',
      'Any grade at all, since cast iron type makes no difference to fatigue performance',
    ],
    correctIndex: 0,
    rationale:
      'Nodular cast iron combines the easy casting of ordinary cast iron with strength, toughness, and fatigue resistance that gets close to steel, which is exactly the mix a crankshaft needs.',
  },
  {
    id: 'fs-029',
    topic: 'ferrousSteels',
    type: 'tf',
    prompt: 'Historically, wrought iron generally contained more carbon than a typical modern plain carbon steel.',
    correctAnswer: false,
    rationale:
      'This is false: wrought iron was worked to be nearly free of carbon, with strands of glassy slag (waste material left over from ironmaking) trapped through it giving a fibrous texture, so it actually held less carbon than plain carbon steel, not more.',
  },
  {
    id: 'fs-030',
    topic: 'ferrousSteels',
    type: 'mcq',
    prompt: 'A design calls for a fastener that will sit in a humid, mildly corrosive environment but does not need extreme hardness. Reading the grade options below, which one best matches "adequate corrosion resistance without needing a hardening heat treatment"?',
    choices: [
      'An 18-8 austenitic stainless steel, since it resists corrosion well and is hardened only by cold working, not by quenching',
      'A plain carbon 1020 steel, since low carbon steel never rusts',
      'A 4340 alloy steel, chosen purely because it contains molybdenum',
      'A white cast iron, chosen for its ductility in damp conditions',
    ],
    correctIndex: 0,
    rationale:
      'An 18-8 austenitic stainless grade resists corrosion thanks to its chromium and nickel content, and unlike the martensitic stainless family it firms up through cold working rather than needing quenching and tempering (a gentle reheat after quenching to trade a little hardness for toughness), matching a fastener that needs corrosion resistance but not extreme hardness.',
  },
];
