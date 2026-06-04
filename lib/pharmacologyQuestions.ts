export type PharmTopic =
  | 'principles'
  | 'pharmacokinetics'
  | 'pharmacodynamics'
  | 'routes'
  | 'autonomic'
  | 'adrenergic'
  | 'antihypertensives'
  | 'antianginal'
  | 'nsaids'
  | 'opioids'
  | 'respiratory'
  | 'diuretics'
  | 'ghanaContext'
  | 'pastPaper';

export const PHARM_TOPIC_LABELS: Record<PharmTopic, string> = {
  principles: 'Principles, Definitions, Sources & Nomenclature',
  pharmacokinetics: 'Pharmacokinetics (ADME, Bioavailability, Vd)',
  pharmacodynamics: 'Pharmacodynamics (Receptors, Agonists/Antagonists)',
  routes: 'Routes of Administration',
  autonomic: 'Autonomic Nervous System & Cholinergic Pharmacology',
  adrenergic: 'Adrenergic Pharmacology (α/β receptors)',
  antihypertensives: 'Antihypertensives (RAAS, CCB, β/α blockers, etc.)',
  antianginal: 'Anti-anginal Drugs (Nitrates, β-blockers, CCB)',
  nsaids: 'NSAIDs & Non-opioid Analgesics',
  opioids: 'Opioid Analgesics & Antagonists',
  respiratory: 'Respiratory Pharmacology (Asthma & COPD)',
  diuretics: 'Diuretics (CA-I, Thiazides, Loop, K-sparing)',
  ghanaContext: 'Ghana Context (STG, EML, NMC scenarios)',
  pastPaper: 'Past Paper — Adu-Gyamfi (antibiotics, obstetrics, GI, diuretics, opioids)',
};

export interface MCQuestion {
  id: string;
  topic: PharmTopic;
  type: 'mcq';
  prompt: string;
  choices: string[];
  correctIndex: number;
  rationale: string;
}

export interface TFQuestion {
  id: string;
  topic: PharmTopic;
  type: 'tf';
  prompt: string;
  correctAnswer: boolean;
  rationale: string;
}

export type PharmQuestion = MCQuestion | TFQuestion;

export const pharmacologyQuestions: PharmQuestion[] = [
  // ============================================================
  // PRINCIPLES / DEFINITIONS / SOURCES / NOMENCLATURE
  // ============================================================
  {
    id: 'prn-001',
    topic: 'principles',
    type: 'mcq',
    prompt: 'Pharmacology is best defined as:',
    choices: [
      'The study of the interaction of substances (drugs), other than foods, with living systems',
      'The study of bacteria and antibiotics only',
      'The branch of chemistry concerned with synthesis of new molecules',
      'The science of disease diagnosis',
    ],
    correctIndex: 0,
    rationale: 'Pharmacology = pharmacon (drugs) + logos (study). It is the study of the interaction of substances (other than food) with living systems, including physical/chemical properties, biochemical/physiologic effects, and ADME.',
  },
  {
    id: 'prn-002',
    topic: 'principles',
    type: 'mcq',
    prompt: 'Which statement best distinguishes a drug from a medicine?',
    choices: [
      'All medicines are drugs, but not all drugs are medicines',
      'All drugs are medicines, and all medicines are drugs',
      'A drug must always be a tablet while a medicine is liquid',
      'Drugs are only synthetic; medicines are only natural',
    ],
    correctIndex: 0,
    rationale: 'A drug is any chemical that affects living processes; a medicine is a drug formulated in a proper dosage form for safe administration to produce a therapeutic effect. Hence all medicines are drugs, but not all drugs (e.g., poisons) are medicines.',
  },
  {
    id: 'prn-003',
    topic: 'principles',
    type: 'mcq',
    prompt: 'Insulin produced by inserting human insulin genes into bacteria is best classified as a drug from which source?',
    choices: [
      'Genetically engineered (recombinant DNA technology)',
      'Mineral',
      'Synthetic',
      'Plant',
    ],
    correctIndex: 0,
    rationale: 'Recombinant DNA technology (e.g., human insulin produced by engineered bacteria) classifies the product as a genetically engineered drug.',
  },
  {
    id: 'prn-004',
    topic: 'principles',
    type: 'mcq',
    prompt: 'Co-amoxiclav (Augmentin), in which clavulanic acid (synthetic) is combined with amoxycillin (partly natural), is an example of:',
    choices: [
      'A semi-synthetic drug',
      'A purely natural drug',
      'A purely synthetic drug',
      'A mineral drug',
    ],
    correctIndex: 0,
    rationale: 'Semi-synthetic drugs are obtained by chemical modification or combination of natural and synthetic compounds. Co-amoxiclav fits this definition.',
  },
  {
    id: 'prn-005',
    topic: 'principles',
    type: 'tf',
    prompt: 'A contra-indication is a factor that prevents the use of a medication or treatment, such as a known allergy.',
    correctAnswer: true,
    rationale: 'Contra-indications (e.g., allergies, pregnancy, organ failure) are specific factors that make a particular drug or treatment inadvisable.',
  },
  {
    id: 'prn-006',
    topic: 'principles',
    type: 'mcq',
    prompt: 'A drug that produces the desired therapeutic effect but also causes mild drowsiness. How should the nurse classify the drowsiness?',
    choices: ['Side effect', 'Indication', 'Contraindication', 'Toxic effect'],
    correctIndex: 0,
    rationale: 'Side (adverse) effects are harmful/undesired responses that occur in addition to the desired therapeutic effects at usual doses; toxic effects occur at higher (toxic) levels.',
  },
  {
    id: 'prn-007',
    topic: 'principles',
    type: 'mcq',
    prompt: 'A prescriber orders a medication to which the patient is documented as allergic. If the nurse administers it, which of the Five Rights is most clearly violated?',
    choices: ['Right drug', 'Right time', 'Right route', 'Right dose'],
    correctIndex: 0,
    rationale: 'Giving an allergen-containing medication to a documented-allergic patient violates the Right Drug — the safest match between the prescribed/given drug and the patient.',
  },
  {
    id: 'prn-008',
    topic: 'principles',
    type: 'mcq',
    prompt: 'A drug generally has three names. The one chosen by the manufacturer and registered as proprietary is the:',
    choices: ['Brand (trade) name', 'Chemical name', 'Generic name', 'Official name'],
    correctIndex: 0,
    rationale: 'Brand names (e.g., Valium®) are proprietary names chosen by the manufacturer; generic names are non-proprietary (e.g., diazepam); chemical names describe molecular structure.',
  },
  {
    id: 'prn-009',
    topic: 'principles',
    type: 'tf',
    prompt: 'Therapeutics is the medical use of drugs to diagnose, prevent, and treat illness or pregnancy.',
    correctAnswer: true,
    rationale: 'Therapeutics is the branch of medicine concerned with the practical use of drugs for diagnosis, prophylaxis, and treatment.',
  },
  {
    id: 'prn-010',
    topic: 'principles',
    type: 'mcq',
    prompt: 'The "onset" of a drug refers to:',
    choices: [
      'The time it takes for the drug to elicit a therapeutic response',
      'The peak plasma concentration',
      'The duration of the drug action',
      'The time it takes for the drug to be excreted',
    ],
    correctIndex: 0,
    rationale: 'Onset = time from administration to therapeutic response; peak = highest plasma concentration; duration = how long action lasts.',
  },
  {
    id: 'prn-011',
    topic: 'principles',
    type: 'mcq',
    prompt: 'Which is NOT one of the three primary uses of drugs?',
    choices: [
      'Cosmetic enhancement for aesthetic appearance',
      'Therapeutic',
      'Prophylaxis',
      'Diagnosis',
    ],
    correctIndex: 0,
    rationale: 'The three primary uses are therapeutic, prophylactic, and diagnostic. Cosmetic use is not a defined principal use of drugs in pharmacology.',
  },
  {
    id: 'prn-012',
    topic: 'principles',
    type: 'tf',
    prompt: 'Morphine and reserpine are examples of drugs obtained from animal sources.',
    correctAnswer: false,
    rationale: 'Both morphine and reserpine are plant-derived alkaloids (Papaver somniferum and Rauwolfia serpentina, respectively). Insulin and heparin are examples of animal-sourced drugs.',
  },

  // ============================================================
  // PHARMACOKINETICS — ADME, Bioavailability, Vd, Ion trapping
  // ============================================================
  {
    id: 'pk-001',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'Pharmacokinetics is best summarised as:',
    choices: [
      'What the body does to the drug (ADME)',
      'What the drug does to the body',
      'The biochemical mechanism of receptor binding',
      'Only the elimination phase of drug handling',
    ],
    correctIndex: 0,
    rationale: 'Pharmacokinetics describes drug movement through the body: Absorption, Distribution, Metabolism, Excretion (ADME). Pharmacodynamics is what the drug does to the body.',
  },
  {
    id: 'pk-002',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A nurse explains why sublingual nitroglycerin acts faster than the same drug given orally. Which is the best explanation?',
    choices: [
      'Sublingual administration bypasses first-pass hepatic metabolism',
      'The sublingual route has greater protein binding',
      'It is absorbed in the small intestine more rapidly',
      'It is metabolised by salivary amylase to an active form',
    ],
    correctIndex: 0,
    rationale: 'Sublingual absorption drains into the superior vena cava, bypassing the portal circulation and first-pass hepatic metabolism, giving faster onset and higher bioavailability.',
  },
  {
    id: 'pk-003',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'Bioavailability (F) refers to:',
    choices: [
      'The fraction of an administered dose that reaches the systemic circulation in its active form',
      'The total amount of drug excreted unchanged',
      'The amount bound to plasma proteins',
      'The total tissue concentration',
    ],
    correctIndex: 0,
    rationale: 'Bioavailability is the fraction (and rate) of a dose reaching systemic circulation unchanged. IV drugs have F = 1 (100%); oral drugs typically have F < 1 due to incomplete absorption and first-pass metabolism.',
  },
  {
    id: 'pk-004',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A drug with a very large apparent volume of distribution (Vd) is most likely:',
    choices: [
      'Highly lipid soluble and concentrated in tissues',
      'Confined to the plasma compartment',
      'Highly bound to plasma albumin only',
      'Excreted unchanged in the urine',
    ],
    correctIndex: 0,
    rationale: 'Large Vd indicates extensive tissue distribution (e.g., lipophilic drugs that bind to tissue components). Drugs confined to plasma have small Vd (~3 L in adults).',
  },
  {
    id: 'pk-005',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'Most drugs cross plasma membranes primarily by:',
    choices: [
      'Passive diffusion of the un-ionised, lipid-soluble form',
      'Active transport against concentration gradients',
      'Pinocytosis',
      'Filtration through aqueous pores only',
    ],
    correctIndex: 0,
    rationale: 'The dominant mechanism is passive diffusion of the un-ionised, lipid-soluble fraction down its concentration gradient. Ionised forms diffuse poorly across lipid membranes.',
  },
  {
    id: 'pk-006',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A weakly acidic drug (e.g., aspirin) overdose. Alkalinising the urine with sodium bicarbonate will speed elimination because:',
    choices: [
      'Ion trapping: more ionised drug in alkaline urine cannot be reabsorbed',
      'Bicarbonate increases glomerular filtration directly',
      'Bicarbonate denatures aspirin in the tubule',
      'It increases protein binding in plasma',
    ],
    correctIndex: 0,
    rationale: 'In alkaline urine a weak acid is largely ionised (charged) and cannot back-diffuse across tubular membranes; it is trapped and excreted — the principle of ion trapping.',
  },
  {
    id: 'pk-007',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'Phase I biotransformation reactions typically:',
    choices: [
      'Introduce or expose a functional group via oxidation, reduction, or hydrolysis',
      'Conjugate the drug with glucuronic acid to increase water solubility',
      'Only occur in the kidney',
      'Are catalysed exclusively by acetyltransferases',
    ],
    correctIndex: 0,
    rationale: 'Phase I = oxidation/reduction/hydrolysis (often CYP450-mediated), introducing/exposing a polar group. Phase II = conjugation (glucuronidation, sulfation, acetylation) that further increases water solubility for excretion.',
  },
  {
    id: 'pk-008',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'Which is the most important organ for drug metabolism?',
    choices: ['Liver', 'Kidney', 'Lungs', 'Spleen'],
    correctIndex: 0,
    rationale: 'The liver, via the cytochrome P450 (CYP) system, is the principal site of drug biotransformation; the kidney is the principal site of excretion.',
  },
  {
    id: 'pk-009',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A patient takes an oral drug with extensive first-pass metabolism. The clinician changes to the same drug given intravenously and reduces the dose substantially. Why?',
    choices: [
      'IV bypasses first-pass metabolism, so bioavailability is 100% — much less drug is required',
      'IV administration requires higher doses than oral',
      'IV drugs are always more potent than oral drugs',
      'First-pass effect occurs only with IV drugs',
    ],
    correctIndex: 0,
    rationale: 'When first-pass is bypassed, the fraction reaching systemic circulation rises sharply; dose must be reduced to avoid toxicity.',
  },
  {
    id: 'pk-010',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A drug has a half-life of 6 hours. After approximately how long will steady-state plasma concentration be reached with regular dosing?',
    choices: [
      '24–30 hours (about 4–5 half-lives)',
      '6 hours (one half-life)',
      '60 hours (about 10 half-lives)',
      'Steady state is reached immediately',
    ],
    correctIndex: 0,
    rationale: 'Steady-state is reached after ~4–5 half-lives of regular dosing, regardless of the actual half-life.',
  },
  {
    id: 'pk-011',
    topic: 'pharmacokinetics',
    type: 'tf',
    prompt: 'Drugs that are highly protein-bound have a smaller free (active) fraction in plasma.',
    correctAnswer: true,
    rationale: 'Only the unbound (free) fraction is pharmacologically active and able to diffuse to the site of action; high protein binding reduces this free fraction.',
  },
  {
    id: 'pk-012',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A patient with severe hypoalbuminaemia is started on a highly protein-bound drug at the standard dose. What is the most likely concern?',
    choices: [
      'Increased free drug concentration with risk of toxicity',
      'Reduced free fraction and treatment failure',
      'Faster renal clearance',
      'Lower volume of distribution',
    ],
    correctIndex: 0,
    rationale: 'When albumin is low, fewer binding sites are available; the free (active) drug fraction rises, increasing the risk of toxicity at normal total doses.',
  },
  {
    id: 'pk-013',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A drug is administered orally and only a small fraction reaches systemic circulation. The most likely explanation is:',
    choices: [
      'High first-pass metabolism and/or poor absorption',
      'IV administration was used',
      'Increased Vd',
      'Renal excretion is faster than usual',
    ],
    correctIndex: 0,
    rationale: 'Low oral bioavailability is most commonly due to extensive first-pass hepatic metabolism, poor absorption, or both.',
  },
  {
    id: 'pk-014',
    topic: 'pharmacokinetics',
    type: 'tf',
    prompt: 'Renal excretion of a drug typically increases with severe chronic kidney disease.',
    correctAnswer: false,
    rationale: 'CKD reduces GFR and tubular function, lowering renal clearance. Dose reduction is often required for renally-cleared drugs.',
  },

  // ============================================================
  // PHARMACODYNAMICS
  // ============================================================
  {
    id: 'pd-001',
    topic: 'pharmacodynamics',
    type: 'mcq',
    prompt: 'A 60-year-old woman takes diclofenac for osteoarthritis. The drug reduces inflammation by inhibiting cyclo-oxygenase. Which pharmacodynamic target type is acted upon?',
    choices: ['Enzyme', 'Ion channel', 'Carrier protein', 'Structural lipid'],
    correctIndex: 0,
    rationale: 'Cyclo-oxygenase (COX-1 and COX-2) is an enzyme that produces prostaglandins. NSAIDs inhibit this enzyme.',
  },
  {
    id: 'pd-002',
    topic: 'pharmacodynamics',
    type: 'mcq',
    prompt: 'A drug binds tightly to receptors but produces little or no physiological response. This profile best describes:',
    choices: [
      'High affinity with low intrinsic activity (low efficacy)',
      'A full agonist',
      'High efficacy with low affinity',
      'An inverse agonist',
    ],
    correctIndex: 0,
    rationale: 'Affinity = how strongly a drug binds. Efficacy / intrinsic activity = how well bound drug activates the receptor. A high-affinity, low-efficacy drug binds well but does little (and can block agonists, i.e. behaves antagonistically).',
  },
  {
    id: 'pd-003',
    topic: 'pharmacodynamics',
    type: 'mcq',
    prompt: 'A bronchodilator activates β2 receptors but, even at maximal dose, cannot produce the full bronchodilation seen with a reference agonist. This drug is best classified as:',
    choices: ['Partial agonist', 'Competitive antagonist', 'Noncompetitive antagonist', 'Inverse agonist'],
    correctIndex: 0,
    rationale: 'A partial agonist binds and activates the receptor, but its maximal effect is below that of a full agonist regardless of dose.',
  },
  {
    id: 'pd-004',
    topic: 'pharmacodynamics',
    type: 'mcq',
    prompt: 'Increasing the dose of an agonist completely reverses the blockade of a particular antagonist. The antagonist is therefore:',
    choices: ['Competitive (surmountable)', 'Noncompetitive (insurmountable)', 'An inverse agonist', 'A partial agonist'],
    correctIndex: 0,
    rationale: 'Competitive (reversible) antagonists can be overcome by sufficient agonist. Noncompetitive antagonists bind elsewhere or covalently and cannot be overcome by raising agonist dose.',
  },
  {
    id: 'pd-005',
    topic: 'pharmacodynamics',
    type: 'mcq',
    prompt: 'Potency vs. efficacy: a drug requires very small doses to produce its effect compared with another similar drug. This describes:',
    choices: ['High potency', 'High efficacy', 'High toxicity', 'High volume of distribution'],
    correctIndex: 0,
    rationale: 'Potency relates to the dose required for a given effect (lower ED50 = more potent). Efficacy is the maximum effect achievable.',
  },
  {
    id: 'pd-006',
    topic: 'pharmacodynamics',
    type: 'tf',
    prompt: 'A drug with low potency but high efficacy can still produce the maximum desired effect — it simply requires a larger dose.',
    correctAnswer: true,
    rationale: 'Efficacy is the ceiling of the response. A larger dose of a low-potency, high-efficacy drug can still reach maximal effect.',
  },
  {
    id: 'pd-007',
    topic: 'pharmacodynamics',
    type: 'mcq',
    prompt: 'A nurse notes that a patient now requires a higher dose of the same opioid for the same analgesic effect after several weeks of therapy. This is best described as:',
    choices: ['Tolerance', 'Idiosyncrasy', 'Synergism', 'Allergy'],
    correctIndex: 0,
    rationale: 'Tolerance is a reduced response to a drug after repeated administration, requiring escalating doses to achieve the same effect.',
  },
  {
    id: 'pd-008',
    topic: 'pharmacodynamics',
    type: 'mcq',
    prompt: 'Omeprazole reduces gastric acid by which pharmacodynamic action?',
    choices: [
      'Irreversible inhibition of the H+/K+-ATPase enzyme pump in parietal cells',
      'Competitive antagonism of H2 receptors',
      'Blockade of muscarinic M3 receptors',
      'Activation of prostaglandin EP3 receptors',
    ],
    correctIndex: 0,
    rationale: 'Proton-pump inhibitors covalently inhibit the parietal cell H+/K+-ATPase, blocking the final common pathway of acid secretion.',
  },
  {
    id: 'pd-009',
    topic: 'pharmacodynamics',
    type: 'mcq',
    prompt: 'A patient taking an H2 receptor antagonist reports reduced gastric acid secretion. Which receptor was blocked?',
    choices: ['H2', 'H1', 'Beta', 'Nicotinic'],
    correctIndex: 0,
    rationale: 'Cimetidine, ranitidine, famotidine and similar drugs are H2-receptor antagonists; H1 antagonists treat allergy.',
  },
  {
    id: 'pd-010',
    topic: 'pharmacodynamics',
    type: 'mcq',
    prompt: 'A drug acts by binding to and activating Gs-coupled β2 adrenoceptors in airway smooth muscle. The most likely intracellular second messenger increase is:',
    choices: ['cAMP via adenylate cyclase', 'IP3 / DAG via phospholipase C', 'cGMP via guanylate cyclase', 'Calcium influx via voltage-gated channels'],
    correctIndex: 0,
    rationale: 'β2-adrenoceptors couple to Gs, which activates adenylate cyclase to raise intracellular cAMP — this relaxes airway smooth muscle.',
  },
  {
    id: 'pd-011',
    topic: 'pharmacodynamics',
    type: 'tf',
    prompt: 'A pure antagonist has affinity for the receptor but zero intrinsic activity.',
    correctAnswer: true,
    rationale: 'Antagonists bind the receptor (affinity) but produce no activating signal (zero intrinsic activity); they block agonists from binding/activating the receptor.',
  },
  {
    id: 'pd-012',
    topic: 'pharmacodynamics',
    type: 'mcq',
    prompt: 'Therapeutic index (TI) is calculated as:',
    choices: [
      'TD50 / ED50 (the ratio of toxic to effective dose in 50% of the population)',
      'ED50 × duration',
      'Half-life × dose',
      'Vd / clearance',
    ],
    correctIndex: 0,
    rationale: 'A wider TI indicates a safer drug. A narrow TI drug (e.g., digoxin, warfarin, theophylline, lithium) requires careful monitoring.',
  },

  // ============================================================
  // ROUTES OF ADMINISTRATION
  // ============================================================
  {
    id: 'rt-001',
    topic: 'routes',
    type: 'mcq',
    prompt: 'Which route gives 100% bioavailability and the most rapid onset?',
    choices: ['Intravenous (IV)', 'Oral (PO)', 'Subcutaneous (SC)', 'Rectal (PR)'],
    correctIndex: 0,
    rationale: 'IV administration places the drug directly into systemic circulation, giving immediate effect and F = 100%.',
  },
  {
    id: 'rt-002',
    topic: 'routes',
    type: 'mcq',
    prompt: 'A child needs a vaccine skin test using 0.1 mL. Which route is most appropriate?',
    choices: ['Intradermal', 'Intramuscular', 'Subcutaneous', 'Intravenous'],
    correctIndex: 0,
    rationale: 'Intradermal injection of small volumes (~0.1 mL) is used for diagnostic skin tests (e.g., Mantoux/TST) because of the immune-rich superficial layer.',
  },
  {
    id: 'rt-003',
    topic: 'routes',
    type: 'mcq',
    prompt: 'A patient applies a transdermal nicotine patch. What is the primary purpose of this dosage form?',
    choices: [
      'Prolonged, steady systemic effect over many hours',
      'Local skin effect only',
      'Immediate high peak level',
      'Drug destruction in subcutaneous fat',
    ],
    correctIndex: 0,
    rationale: 'Transdermal patches give controlled, sustained systemic delivery, bypassing first-pass metabolism.',
  },
  {
    id: 'rt-004',
    topic: 'routes',
    type: 'mcq',
    prompt: 'Rectal administration is particularly useful in which scenario?',
    choices: [
      'Unconscious or vomiting patient where oral route is not possible',
      'When 100% bioavailability is required',
      'When the drug is too lipid soluble for the GI tract',
      'When immediate peak levels are essential',
    ],
    correctIndex: 0,
    rationale: 'Rectal route bypasses upper GI motility issues and partially avoids first-pass metabolism — useful for vomiting, unconscious, or pre-referral situations (e.g., rectal artesunate in suspected severe malaria).',
  },
  {
    id: 'rt-005',
    topic: 'routes',
    type: 'mcq',
    prompt: 'Inhaled bronchodilators are effective because:',
    choices: [
      'They deliver drug directly to the large surface area of the lungs with rapid local action',
      'Lungs metabolise drugs very slowly',
      'The lungs have small absorptive surface',
      'Inhalation requires no patient cooperation',
    ],
    correctIndex: 0,
    rationale: 'Inhalation deposits drug on the bronchial mucosa for rapid local action with low systemic dose; the lung has a very large surface area.',
  },
  {
    id: 'rt-006',
    topic: 'routes',
    type: 'tf',
    prompt: 'Subcutaneous and intramuscular injections both bypass first-pass hepatic metabolism.',
    correctAnswer: true,
    rationale: 'Both deliver drug into tissue, from which it is absorbed into systemic venous circulation — bypassing the portal vein and first-pass metabolism.',
  },
  {
    id: 'rt-007',
    topic: 'routes',
    type: 'mcq',
    prompt: 'A nurse explains why eye drops are preferred over oral tablets for a localised conjunctival infection. The best reason is:',
    choices: [
      'Topical drops deliver drug directly to the site of action with low systemic exposure',
      'Oral tablets cannot reach the eye',
      'Eye drops have 100% bioavailability',
      'Tablets are inactive systemically',
    ],
    correctIndex: 0,
    rationale: 'Topical ocular dosing gives high local concentration with minimal systemic exposure and side effects.',
  },
  {
    id: 'rt-008',
    topic: 'routes',
    type: 'mcq',
    prompt: 'Which oral dosage form is designed to give uniform absorption and prolonged action with less frequent dosing?',
    choices: ['Sustained-release tablet', 'Effervescent tablet', 'Chewable tablet', 'Oral suspension'],
    correctIndex: 0,
    rationale: 'Sustained- (or modified-) release formulations release drug gradually, giving steadier plasma levels and reducing dose frequency.',
  },

  // ============================================================
  // AUTONOMIC NERVOUS SYSTEM / CHOLINERGIC
  // ============================================================
  {
    id: 'ans-001',
    topic: 'autonomic',
    type: 'mcq',
    prompt: 'A trauma patient presents pale, sweaty, tachycardic, with dilated pupils. Which autonomic division is dominantly active?',
    choices: ['Sympathetic', 'Parasympathetic', 'Enteric', 'Somatic'],
    correctIndex: 0,
    rationale: 'These are classic "fight-or-flight" signs of sympathetic activation: mydriasis, tachycardia, sweating, pallor (vasoconstriction).',
  },
  {
    id: 'ans-002',
    topic: 'autonomic',
    type: 'mcq',
    prompt: 'Which response indicates parasympathetic dominance?',
    choices: ['Increased GI motility', 'Pupillary dilation', 'Tachycardia', 'Vasoconstriction'],
    correctIndex: 0,
    rationale: 'Parasympathetic ("rest and digest"): miosis, bradycardia, increased salivation/GI motility, bronchoconstriction.',
  },
  {
    id: 'ans-003',
    topic: 'autonomic',
    type: 'mcq',
    prompt: 'Acetylcholine acts on nicotinic receptors at which site?',
    choices: [
      'All autonomic ganglia (sympathetic and parasympathetic) and the neuromuscular junction',
      'Only at parasympathetic post-ganglionic synapses',
      'Only at adrenergic terminals',
      'Only at the adrenal cortex',
    ],
    correctIndex: 0,
    rationale: 'Nicotinic receptors are at autonomic ganglia (NN) and the neuromuscular junction (NM); muscarinic receptors are at parasympathetic effector organs.',
  },
  {
    id: 'ans-004',
    topic: 'autonomic',
    type: 'mcq',
    prompt: 'A drug stimulates muscarinic receptors on effector organs. The result mimics which division?',
    choices: ['Parasympathetic', 'Sympathetic', 'Somatic', 'Enteric only'],
    correctIndex: 0,
    rationale: 'Muscarinic stimulation reproduces parasympathetic effects (miosis, bradycardia, bronchoconstriction, ↑secretions, ↑GI motility, urinary urgency).',
  },
  {
    id: 'ans-005',
    topic: 'autonomic',
    type: 'mcq',
    prompt: 'Atropine acts predominantly by:',
    choices: [
      'Competitive blockade of muscarinic acetylcholine receptors',
      'Blockade of nicotinic NM receptors at the NMJ',
      'Inhibition of acetylcholinesterase',
      'Stimulation of α1 receptors',
    ],
    correctIndex: 0,
    rationale: 'Atropine is a competitive muscarinic antagonist; used for bradycardia, organophosphate poisoning, premedication to dry secretions.',
  },
  {
    id: 'ans-006',
    topic: 'autonomic',
    type: 'mcq',
    prompt: 'A farmer with organophosphate poisoning presents with miosis, salivation, lacrimation, urination, defecation, GI cramps, and bronchorrhoea (SLUDGE/DUMBELS). The pathophysiology is:',
    choices: [
      'Inhibition of acetylcholinesterase → excess ACh at muscarinic and nicotinic receptors',
      'Blockade of muscarinic receptors',
      'Reduced sympathetic outflow only',
      'Direct β2 receptor stimulation',
    ],
    correctIndex: 0,
    rationale: 'Organophosphates inhibit acetylcholinesterase, allowing ACh to accumulate. Treatment: atropine (muscarinic blockade) and pralidoxime (regenerate AChE if given early).',
  },
  {
    id: 'ans-007',
    topic: 'autonomic',
    type: 'tf',
    prompt: 'Sympathetic preganglionic neurons are short and release acetylcholine onto nicotinic receptors at the ganglion.',
    correctAnswer: true,
    rationale: 'In both autonomic divisions the preganglionic neuron releases ACh at the ganglion onto nicotinic (NN) receptors. Sympathetic post-ganglionics are long and release noradrenaline; parasympathetic post-ganglionics are short and release ACh on muscarinic receptors.',
  },
  {
    id: 'ans-008',
    topic: 'autonomic',
    type: 'mcq',
    prompt: 'A drug that blocks nicotinic receptors at autonomic ganglia (a ganglion blocker) would most likely cause:',
    choices: [
      'Loss of both sympathetic and parasympathetic outflow',
      'Pure sympathetic stimulation',
      'Pure parasympathetic stimulation',
      'Direct β-receptor activation',
    ],
    correctIndex: 0,
    rationale: 'Ganglion blockers (e.g., trimethaphan) inhibit transmission in BOTH autonomic divisions; effects depend on which tone normally predominates at the target organ.',
  },
  {
    id: 'ans-009',
    topic: 'autonomic',
    type: 'mcq',
    prompt: 'Neostigmine is used postoperatively to reverse non-depolarising neuromuscular blockade. Its mechanism is:',
    choices: [
      'Inhibition of acetylcholinesterase, increasing ACh at the NMJ',
      'Blockade of nicotinic receptors',
      'Direct β1 stimulation',
      'Activation of muscarinic M3 receptors',
    ],
    correctIndex: 0,
    rationale: 'Neostigmine (and pyridostigmine, used in myasthenia gravis) is a reversible cholinesterase inhibitor that raises synaptic ACh.',
  },

  // ============================================================
  // ADRENERGIC PHARMACOLOGY
  // ============================================================
  {
    id: 'adr-001',
    topic: 'adrenergic',
    type: 'mcq',
    prompt: 'Phenylephrine raises blood pressure primarily by stimulating which receptor?',
    choices: ['α1', 'α2', 'β1', 'β2'],
    correctIndex: 0,
    rationale: 'α1 stimulation contracts vascular smooth muscle → vasoconstriction → ↑peripheral resistance → ↑BP. Phenylephrine is a selective α1 agonist.',
  },
  {
    id: 'adr-002',
    topic: 'adrenergic',
    type: 'mcq',
    prompt: 'A patient with hypertension and benign prostatic hyperplasia is started on doxazosin. The dual benefit is explained by:',
    choices: [
      'α1 blockade in vascular and prostate smooth muscle → ↓BP and improved urinary flow',
      'β1 blockade reducing heart rate',
      'α2 stimulation reducing sympathetic outflow',
      'Direct ACE inhibition',
    ],
    correctIndex: 0,
    rationale: 'α1 antagonists (prazosin, doxazosin, tamsulosin) relax vascular and prostatic smooth muscle; useful in coexisting hypertension and BPH.',
  },
  {
    id: 'adr-003',
    topic: 'adrenergic',
    type: 'mcq',
    prompt: 'An elderly man collapses shortly after the first dose of prazosin. The most likely mechanism is:',
    choices: [
      'First-dose orthostatic hypotension due to α1 blockade',
      'Acute sodium retention',
      'Reflex vasoconstriction',
      'Direct β2 stimulation',
    ],
    correctIndex: 0,
    rationale: 'α1 blockers can cause marked orthostatic hypotension after the first dose; start low, give at bedtime, warn about positional changes.',
  },
  {
    id: 'adr-004',
    topic: 'adrenergic',
    type: 'mcq',
    prompt: 'Salbutamol relieves acute bronchospasm by stimulating which receptor and producing what intracellular change?',
    choices: [
      'β2 receptors → ↑cAMP → relaxation of bronchial smooth muscle',
      'β1 receptors → ↑heart rate',
      'α1 receptors → vasoconstriction',
      'Muscarinic receptors → bronchodilation',
    ],
    correctIndex: 0,
    rationale: 'β2 agonists raise intracellular cAMP via adenylate cyclase, relaxing airway smooth muscle — first-line for acute asthma.',
  },
  {
    id: 'adr-005',
    topic: 'adrenergic',
    type: 'mcq',
    prompt: 'A patient with asthma is mistakenly prescribed propranolol and develops acute wheezing. The mechanism is:',
    choices: [
      'Non-selective β blockade including β2 receptors in bronchial smooth muscle',
      'β1 blockade only',
      'α1 blockade causing bronchoconstriction',
      'Muscarinic stimulation',
    ],
    correctIndex: 0,
    rationale: 'Propranolol is non-selective and blocks bronchial β2 receptors, precipitating bronchospasm in asthmatics. Use cardioselective β1 blockers (e.g., metoprolol, atenolol) cautiously if essential.',
  },
  {
    id: 'adr-006',
    topic: 'adrenergic',
    type: 'mcq',
    prompt: 'A patient with cardiogenic shock receives dobutamine. The therapeutic benefit comes from:',
    choices: [
      'β1 stimulation increasing myocardial contractility',
      'α1 stimulation causing vasoconstriction',
      'β2 blockade reducing afterload',
      'Muscarinic stimulation increasing heart rate',
    ],
    correctIndex: 0,
    rationale: 'Dobutamine is a selective β1 agonist with mild β2 activity; used as a positive inotrope in cardiogenic shock or decompensated heart failure.',
  },
  {
    id: 'adr-007',
    topic: 'adrenergic',
    type: 'mcq',
    prompt: 'Clonidine lowers blood pressure mainly by:',
    choices: [
      'Stimulating central α2 receptors → reduced sympathetic outflow',
      'Blocking α1 receptors',
      'Stimulating β1 receptors',
      'Blocking muscarinic receptors',
    ],
    correctIndex: 0,
    rationale: 'Clonidine and α-methyldopa are central α2 agonists. Abrupt withdrawal can cause rebound hypertensive crisis.',
  },
  {
    id: 'adr-008',
    topic: 'adrenergic',
    type: 'mcq',
    prompt: 'Labetalol lowers BP and heart rate via:',
    choices: [
      'Combined α1 and non-selective β blockade',
      'Pure α1 blockade only',
      'Pure β2 blockade only',
      'Calcium channel blockade',
    ],
    correctIndex: 0,
    rationale: 'Labetalol (and carvedilol) block both α1 and β receptors; useful in hypertensive emergencies and pregnancy-related hypertension.',
  },
  {
    id: 'adr-009',
    topic: 'adrenergic',
    type: 'mcq',
    prompt: 'A patient with pheochromocytoma is prepared for surgery. Which drug is given FIRST to control BP?',
    choices: [
      'α-blockade (e.g., phenoxybenzamine) before any β-blockade',
      'β-blockade (e.g., propranolol) first',
      'A calcium channel blocker only',
      'A loop diuretic only',
    ],
    correctIndex: 0,
    rationale: 'Unopposed α stimulation after β-blockade can cause hypertensive crisis. Always give α-blockers first, then add β-blockade if needed.',
  },
  {
    id: 'adr-010',
    topic: 'adrenergic',
    type: 'mcq',
    prompt: 'A high dose of salbutamol causes tremor, tachycardia and palpitations because:',
    choices: [
      'At high doses β2 selectivity is lost and β1 cardiac receptors are stimulated',
      'It blocks β1 receptors',
      'It activates muscarinic receptors',
      'It causes α1-mediated vasoconstriction',
    ],
    correctIndex: 0,
    rationale: 'β2 selectivity is dose-dependent; at high systemic doses cardiac β1 receptors are also stimulated, producing tachycardia/tremor.',
  },
  {
    id: 'adr-011',
    topic: 'adrenergic',
    type: 'tf',
    prompt: 'α2 receptor activation on presynaptic adrenergic nerve terminals decreases noradrenaline release (negative feedback).',
    correctAnswer: true,
    rationale: 'Presynaptic α2 autoreceptors inhibit further noradrenaline release — this underlies the antihypertensive action of central α2 agonists like clonidine.',
  },
  {
    id: 'adr-012',
    topic: 'adrenergic',
    type: 'mcq',
    prompt: 'Timolol eye drops lower intra-ocular pressure in glaucoma by:',
    choices: [
      'β-blockade reducing aqueous humour production by the ciliary body',
      'α1 stimulation contracting the iris dilator',
      'Muscarinic blockade dilating the pupil',
      'Increasing scleral outflow only',
    ],
    correctIndex: 0,
    rationale: 'Topical β-blockers reduce aqueous formation. Caution in asthma — systemic absorption can precipitate bronchospasm.',
  },

  // ============================================================
  // ANTIHYPERTENSIVES
  // ============================================================
  {
    id: 'ah-001',
    topic: 'antihypertensives',
    type: 'mcq',
    prompt: 'Blood pressure is the product of:',
    choices: [
      'Cardiac output × total peripheral resistance',
      'Stroke volume × respiratory rate',
      'Heart rate × tidal volume',
      'Plasma osmolality × renal flow',
    ],
    correctIndex: 0,
    rationale: 'BP = CO × TPR. Antihypertensives lower one or both: cardiac output and/or peripheral resistance.',
  },
  {
    id: 'ah-002',
    topic: 'antihypertensives',
    type: 'mcq',
    prompt: 'Angiotensin II is best described as:',
    choices: [
      'The body’s most potent circulating vasoconstrictor; also stimulates aldosterone release',
      'A vasodilator released by the kidney',
      'A breakdown product of bradykinin',
      'A natriuretic peptide from atrial cells',
    ],
    correctIndex: 0,
    rationale: 'Ang II contracts vascular smooth muscle and stimulates aldosterone (Na+/H2O retention), raising blood pressure.',
  },
  {
    id: 'ah-003',
    topic: 'antihypertensives',
    type: 'mcq',
    prompt: 'Captopril lowers BP by:',
    choices: [
      'Inhibiting ACE → ↓Angiotensin II and ↑bradykinin → vasodilation',
      'Blocking AT1 receptors directly',
      'Inhibiting renin release',
      'Blocking calcium channels',
    ],
    correctIndex: 0,
    rationale: 'ACE inhibitors block angiotensin I → II conversion (and inhibit bradykinin breakdown — hence the dry cough side effect).',
  },
  {
    id: 'ah-004',
    topic: 'antihypertensives',
    type: 'mcq',
    prompt: 'A patient on lisinopril develops persistent dry cough. He is switched to losartan. Why is cough less likely with losartan?',
    choices: [
      'ARBs block AT1 receptors without affecting bradykinin metabolism',
      'ARBs increase bradykinin metabolism',
      'ARBs are more potent vasoconstrictors',
      'ARBs inhibit prostaglandin synthesis',
    ],
    correctIndex: 0,
    rationale: 'ACE-inhibitor cough is attributed to bradykinin accumulation. ARBs (losartan, valsartan) act downstream at AT1 receptors and do not raise bradykinin.',
  },
  {
    id: 'ah-005',
    topic: 'antihypertensives',
    type: 'mcq',
    prompt: 'A patient on an ACE inhibitor is started on potassium supplements and spironolactone. Which serious electrolyte complication is most likely?',
    choices: ['Hyperkalaemia', 'Hypokalaemia', 'Hypocalcaemia', 'Hypernatraemia'],
    correctIndex: 0,
    rationale: 'ACE-I + K+-sparing diuretic + K+ supplement is a classic high-risk combination for hyperkalaemia. Monitor K+ and renal function closely.',
  },
  {
    id: 'ah-006',
    topic: 'antihypertensives',
    type: 'mcq',
    prompt: 'A pregnant woman is taking losartan when pregnancy is confirmed. What is the most important pharmacologic concern?',
    choices: [
      'ARBs (and ACE inhibitors) are teratogenic/fetotoxic — discontinue and switch',
      'Increased uterine contractility',
      'Maternal hypoglycaemia',
      'Fetal tachycardia',
    ],
    correctIndex: 0,
    rationale: 'ACE inhibitors and ARBs are contraindicated in pregnancy — they cause oligohydramnios, renal failure, skull hypoplasia and fetal death, especially in the 2nd/3rd trimester.',
  },
  {
    id: 'ah-007',
    topic: 'antihypertensives',
    type: 'mcq',
    prompt: 'A patient with bilateral renal artery stenosis is started on enalapril and develops acute kidney injury. Why?',
    choices: [
      'ACE-I dilate the efferent arteriole — in RAS the kidney depends on Ang-II–mediated efferent constriction to maintain GFR',
      'ACE-I constrict afferent arterioles directly',
      'ACE-I cause direct tubular necrosis',
      'ACE-I increase renal perfusion pressure',
    ],
    correctIndex: 0,
    rationale: 'In bilateral RAS, GFR is sustained by Ang-II constricting the efferent arteriole. ACE-I/ARBs remove this, dropping GFR — they are contraindicated in bilateral RAS.',
  },
  {
    id: 'ah-008',
    topic: 'antihypertensives',
    type: 'mcq',
    prompt: 'A hypertensive patient with second-degree AV block is mistakenly prescribed verapamil and develops worsening bradycardia. Why?',
    choices: [
      'Non-dihydropyridine CCBs (verapamil, diltiazem) depress AV nodal conduction',
      'Verapamil increases SA node automaticity',
      'Verapamil increases ventricular contractility',
      'Verapamil blocks β receptors directly',
    ],
    correctIndex: 0,
    rationale: 'Verapamil and diltiazem slow AV conduction — contraindicated in 2°/3° AV block and decompensated HF. Dihydropyridines (amlodipine, nifedipine) act mainly on vascular smooth muscle.',
  },
  {
    id: 'ah-009',
    topic: 'antihypertensives',
    type: 'mcq',
    prompt: 'A patient on clonidine stops it abruptly and presents with severe rebound hypertension and agitation. The mechanism is:',
    choices: [
      'Sudden loss of central α2 inhibition → surge in sympathetic outflow',
      'Acute aldosterone suppression',
      'Excess bradykinin',
      'Parasympathetic dominance',
    ],
    correctIndex: 0,
    rationale: 'Clonidine should be tapered. Abrupt withdrawal precipitates rebound hypertension that may exceed pre-treatment levels.',
  },
  {
    id: 'ah-010',
    topic: 'antihypertensives',
    type: 'mcq',
    prompt: 'Hydralazine lowers BP primarily by:',
    choices: [
      'Direct arteriolar smooth-muscle relaxation',
      'Blocking the renin-angiotensin system',
      'Stimulating central α2 receptors',
      'Increasing parasympathetic tone',
    ],
    correctIndex: 0,
    rationale: 'Hydralazine directly dilates arterioles. Reflex tachycardia and fluid retention often require co-administration of a β-blocker and diuretic.',
  },
  {
    id: 'ah-011',
    topic: 'antihypertensives',
    type: 'mcq',
    prompt: 'Sodium nitroprusside in a hypertensive emergency works by:',
    choices: [
      'Balanced arteriolar AND venous dilation via nitric oxide release',
      'Selective venous dilation only',
      'β-blockade',
      'Aldosterone receptor antagonism',
    ],
    correctIndex: 0,
    rationale: 'Nitroprusside releases NO causing balanced vasodilation; risk of cyanide toxicity with prolonged or high-dose infusion.',
  },
  {
    id: 'ah-012',
    topic: 'antihypertensives',
    type: 'tf',
    prompt: 'A diabetic patient on a non-selective β-blocker may have masked sympathetic warning signs of hypoglycaemia such as tachycardia and tremor.',
    correctAnswer: true,
    rationale: 'β-blockade dampens adrenergic warning symptoms; sweating (cholinergic) is preserved. Patient education is critical.',
  },

  // ============================================================
  // ANTI-ANGINAL DRUGS
  // ============================================================
  {
    id: 'aa-001',
    topic: 'antianginal',
    type: 'mcq',
    prompt: 'Angina pectoris occurs because of:',
    choices: [
      'Imbalance between myocardial oxygen demand and supply',
      'Direct ischaemia of the lungs',
      'Excessive parasympathetic activity',
      'Pulmonary hypertension',
    ],
    correctIndex: 0,
    rationale: 'Anginal pain is precipitated when myocardial oxygen demand exceeds supply (typically due to atherosclerotic coronary artery disease).',
  },
  {
    id: 'aa-002',
    topic: 'antianginal',
    type: 'mcq',
    prompt: 'Nitroglycerin relieves the pain of stable (exertional) angina primarily by:',
    choices: [
      'Venodilation → ↓preload → ↓ventricular wall tension → ↓oxygen demand',
      'Constriction of coronary arteries',
      'Increasing heart rate and contractility',
      'Blocking β1 receptors in the heart',
    ],
    correctIndex: 0,
    rationale: 'In stable angina, nitrates work mainly by reducing preload (venous return), which lowers ventricular wall tension and oxygen demand.',
  },
  {
    id: 'aa-003',
    topic: 'antianginal',
    type: 'mcq',
    prompt: 'The cellular mechanism of nitrate vasodilation involves:',
    choices: [
      'Conversion to nitric oxide → activation of guanylate cyclase → ↑cGMP → smooth muscle relaxation',
      'Direct β-receptor blockade',
      'Calcium channel blockade in the SA node',
      'COX-2 inhibition',
    ],
    correctIndex: 0,
    rationale: 'Organic nitrates are bioconverted to NO, which raises cGMP and relaxes vascular smooth muscle (both venous and, at higher doses, arterial).',
  },
  {
    id: 'aa-004',
    topic: 'antianginal',
    type: 'mcq',
    prompt: 'A patient on continuous nitrate therapy reports loss of effect. What is the most likely cause?',
    choices: [
      'Pharmacodynamic tolerance — manage with a daily nitrate-free interval (≥8 hours)',
      'Poor absorption',
      'Excess renal excretion',
      'Drug-drug receptor antagonism',
    ],
    correctIndex: 0,
    rationale: 'Nitrate tolerance develops rapidly with continuous exposure. A daily 8–12 hour nitrate-free interval restores responsiveness.',
  },
  {
    id: 'aa-005',
    topic: 'antianginal',
    type: 'mcq',
    prompt: 'Why are sublingual nitrates contraindicated in a patient who has taken sildenafil within the past 24 hours?',
    choices: [
      'Combined cGMP elevation can cause life-threatening hypotension',
      'Sildenafil inhibits nitrate absorption',
      'Sildenafil destroys nitric oxide in plasma',
      'The combination increases platelet aggregation',
    ],
    correctIndex: 0,
    rationale: 'PDE5 inhibitors (sildenafil/tadalafil) potentiate cGMP-mediated vasodilation from nitrates → severe hypotension; co-administration is contraindicated.',
  },
  {
    id: 'aa-006',
    topic: 'antianginal',
    type: 'mcq',
    prompt: 'Beta-blockers reduce anginal frequency primarily by:',
    choices: [
      'Decreasing heart rate and contractility → ↓myocardial O2 demand',
      'Dilating coronary arteries directly',
      'Increasing oxygen delivery to ischaemic myocardium',
      'Reducing platelet aggregation',
    ],
    correctIndex: 0,
    rationale: 'β-blockers lower oxygen demand via reduced HR, contractility, and afterload. They are first-line for stable angina but NOT effective in vasospastic (variant) angina.',
  },
  {
    id: 'aa-007',
    topic: 'antianginal',
    type: 'mcq',
    prompt: 'Variant (Prinzmetal) angina is best treated with:',
    choices: [
      'Calcium channel blockers and/or nitrates (vasodilators to relieve coronary spasm)',
      'β-blockers alone',
      'High-dose aspirin only',
      'ACE inhibitors first-line',
    ],
    correctIndex: 0,
    rationale: 'Variant angina is due to coronary artery spasm; vasodilators (CCBs, nitrates) are the mainstay. β-blockers may worsen spasm.',
  },
  {
    id: 'aa-008',
    topic: 'antianginal',
    type: 'tf',
    prompt: 'Myocardial perfusion takes place primarily during ventricular systole.',
    correctAnswer: false,
    rationale: 'Coronary perfusion occurs predominantly during diastole; during systole intramyocardial vessels are compressed.',
  },

  // ============================================================
  // NSAIDs & NON-OPIOID ANALGESICS
  // ============================================================
  {
    id: 'ns-001',
    topic: 'nsaids',
    type: 'mcq',
    prompt: 'Cyclo-oxygenase-1 (COX-1) is best described as:',
    choices: [
      'Constitutive "housekeeping" enzyme that protects gastric mucosa, supports renal blood flow, and promotes platelet aggregation',
      'Inducible enzyme expressed only at sites of inflammation',
      'Enzyme expressed only in the colon',
      'Enzyme that produces leukotrienes',
    ],
    correctIndex: 0,
    rationale: 'COX-1 is the "good COX" — its inhibition produces most NSAID adverse effects (GI ulceration, bleeding, renal impairment).',
  },
  {
    id: 'ns-002',
    topic: 'nsaids',
    type: 'mcq',
    prompt: 'Selective COX-2 inhibitors (coxibs) carry which key risk that nonselective NSAIDs counterbalance via COX-1 effects?',
    choices: [
      'Increased thrombotic risk (MI, stroke) due to unopposed TXA2 from preserved platelet COX-1',
      'Reye syndrome',
      'Severe haemolytic anaemia',
      'Profound bradycardia',
    ],
    correctIndex: 0,
    rationale: 'Coxibs spare COX-1, leaving platelet TXA2 generation intact while reducing endothelial prostacyclin (PGI2) — shifting the balance toward thrombosis.',
  },
  {
    id: 'ns-003',
    topic: 'nsaids',
    type: 'mcq',
    prompt: 'A child with viral fever is mistakenly given aspirin and develops vomiting and confusion. The serious risk is:',
    choices: [
      'Reye syndrome — aspirin is contraindicated in children with viral illness',
      'COX-2-related thrombosis',
      'Severe haemolysis',
      'Direct nephrotoxicity',
    ],
    correctIndex: 0,
    rationale: 'Salicylates in children with viral infections (influenza, varicella) can precipitate Reye syndrome (encephalopathy + fatty liver). Use paracetamol instead.',
  },
  {
    id: 'ns-004',
    topic: 'nsaids',
    type: 'mcq',
    prompt: 'A patient with chronic NSAID use develops oedema and worsened hypertension. The mechanism is:',
    choices: [
      'Reduced renal prostaglandin synthesis → sodium and water retention',
      'Increased renin release',
      'Direct β-receptor stimulation',
      'Bradykinin accumulation',
    ],
    correctIndex: 0,
    rationale: 'PG-mediated renal vasodilation/natriuresis is lost with NSAID use, causing Na/water retention, hypertension and possible AKI — especially with diuretics, ACE-I or ARBs ("triple whammy").',
  },
  {
    id: 'ns-005',
    topic: 'nsaids',
    type: 'mcq',
    prompt: 'An adult with platelet dysfunction and a fever needs an analgesic. Which is safest?',
    choices: ['Paracetamol (acetaminophen)', 'Aspirin', 'Ibuprofen', 'Diclofenac'],
    correctIndex: 0,
    rationale: 'Paracetamol gives analgesia and antipyresis without significant anti-platelet effect or gastric irritation.',
  },
  {
    id: 'ns-006',
    topic: 'nsaids',
    type: 'mcq',
    prompt: 'A patient overdoses on paracetamol; arrives 6 hours post-ingestion, asymptomatic. The priority intervention is:',
    choices: [
      'Administer N-acetylcysteine according to nomogram-guided protocol',
      'Wait for symptoms to appear',
      'Activated charcoal only',
      'Give vitamin K',
    ],
    correctIndex: 0,
    rationale: 'Paracetamol hepatotoxicity is due to NAPQI; N-acetylcysteine replenishes glutathione and is most effective when given early (best <8 hours).',
  },
  {
    id: 'ns-007',
    topic: 'nsaids',
    type: 'mcq',
    prompt: 'Aspirin permanently inhibits platelet COX-1 because:',
    choices: [
      'It acetylates the enzyme irreversibly; platelets cannot synthesise new COX (anucleate)',
      'It blocks calcium channels in platelets',
      'It binds reversibly to ADP receptors',
      'It is metabolised to a glucuronide that traps platelets',
    ],
    correctIndex: 0,
    rationale: 'Irreversible acetylation of platelet COX-1 means restored function depends on new platelet production (~7–10 days). This is why aspirin must be stopped before elective surgery.',
  },
  {
    id: 'ns-008',
    topic: 'nsaids',
    type: 'mcq',
    prompt: 'NSAID use after 30 weeks of pregnancy is most strongly associated with:',
    choices: [
      'Premature closure of the fetal ductus arteriosus',
      'Neural tube defects',
      'Fetal hypoglycaemia',
      'Maternal hypothyroidism',
    ],
    correctIndex: 0,
    rationale: 'PG-E2 keeps the ductus arteriosus patent in utero; NSAIDs in late pregnancy risk premature ductal closure and oligohydramnios.',
  },
  {
    id: 'ns-009',
    topic: 'nsaids',
    type: 'mcq',
    prompt: 'A patient with peptic ulcer disease requires long-term anti-inflammatory therapy. Which regimen best balances efficacy and gastric safety?',
    choices: [
      'A COX-2 selective coxib OR an NSAID combined with a PPI/misoprostol',
      'High-dose aspirin alone',
      'Ibuprofen alone at maximum dose',
      'Naproxen alone with no GI protection',
    ],
    correctIndex: 0,
    rationale: 'Strategies for high-GI-risk patients: coxib alone, or nonselective NSAID + PPI (or misoprostol), to minimise gastric injury from COX-1 inhibition.',
  },
  {
    id: 'ns-010',
    topic: 'nsaids',
    type: 'tf',
    prompt: 'Neuropathic pain typically responds poorly to NSAIDs because it is not driven primarily by prostaglandin-mediated inflammation.',
    correctAnswer: true,
    rationale: 'Neuropathic pain (e.g., diabetic neuropathy, post-herpetic neuralgia) responds better to anti-convulsants (gabapentin, pregabalin) or certain antidepressants.',
  },

  // ============================================================
  // OPIOID ANALGESICS & ANTAGONISTS
  // ============================================================
  {
    id: 'op-001',
    topic: 'opioids',
    type: 'mcq',
    prompt: 'A patient develops respiratory rate 6/min, pinpoint pupils and hypotension after IV morphine. The most appropriate immediate intervention is:',
    choices: [
      'IV naloxone (titrate to respiratory rate, supporting airway)',
      'IV flumazenil',
      'IV fluids only',
      'IV diazepam',
    ],
    correctIndex: 0,
    rationale: 'Naloxone is the specific competitive opioid antagonist; flumazenil reverses benzodiazepines, not opioids.',
  },
  {
    id: 'op-002',
    topic: 'opioids',
    type: 'mcq',
    prompt: 'A patient reversed with naloxone becomes somnolent again ~45 minutes later. Why?',
    choices: [
      'Naloxone has a shorter half-life than most opioids; repeat doses or an infusion may be needed',
      'Naloxone is converted into an opioid metabolite',
      'Naloxone causes delayed respiratory depression',
      'Tolerance to naloxone develops within minutes',
    ],
    correctIndex: 0,
    rationale: 'Naloxone’s duration (~30–90 min) is shorter than many opioids — patients need continued observation and possible re-dosing or infusion.',
  },
  {
    id: 'op-003',
    topic: 'opioids',
    type: 'mcq',
    prompt: 'Morphine produces analgesia, euphoria and respiratory depression mainly via which receptor?',
    choices: ['μ (mu) opioid receptor', 'κ (kappa) only', 'δ (delta) only', 'γ-aminobutyric acid (GABA)'],
    correctIndex: 0,
    rationale: 'μ-receptor activation mediates morphine’s main therapeutic and adverse effects, including respiratory depression and dependence.',
  },
  {
    id: 'op-004',
    topic: 'opioids',
    type: 'mcq',
    prompt: 'A patient with CYP2D6 deficiency reports no pain relief from codeine. The reason is:',
    choices: [
      'Codeine is a pro-drug requiring CYP2D6 to convert it to morphine',
      'Codeine is destroyed by CYP3A4 in such patients',
      'Codeine cannot bind opioid receptors',
      'Codeine is rapidly excreted unchanged',
    ],
    correctIndex: 0,
    rationale: 'Poor CYP2D6 metabolisers cannot convert codeine → morphine and get little analgesia; ultra-rapid metabolisers may suffer toxicity. Codeine should be avoided in nursing mothers if possible.',
  },
  {
    id: 'op-005',
    topic: 'opioids',
    type: 'mcq',
    prompt: 'A patient on chronic morphine is abruptly stopped and develops yawning, lacrimation, agitation, GI cramping and muscle aches. This is best described as:',
    choices: [
      'Physical dependence with withdrawal syndrome',
      'Drug allergy',
      'Acute tolerance',
      'Idiosyncratic reaction',
    ],
    correctIndex: 0,
    rationale: 'Physical dependence is a physiologic adaptation; abrupt cessation precipitates a stereotyped withdrawal syndrome (distinct from addiction, which is a behavioural disorder).',
  },
  {
    id: 'op-006',
    topic: 'opioids',
    type: 'mcq',
    prompt: 'A patient receiving repeated doses of pethidine (meperidine) develops tremors and seizures. The likely mechanism is:',
    choices: [
      'Accumulation of the neurotoxic metabolite normeperidine (norpethidine)',
      'Excess kappa-receptor activation',
      'Idiopathic allergic reaction',
      'Direct GABA-A inhibition by pethidine',
    ],
    correctIndex: 0,
    rationale: 'Norpethidine has CNS-excitatory effects and accumulates with repeated dosing or renal impairment — limits pethidine to short-term use.',
  },
  {
    id: 'op-007',
    topic: 'opioids',
    type: 'mcq',
    prompt: 'A postoperative patient on morphine reports severe constipation. The mechanism is:',
    choices: [
      'μ-receptor activation in the GI tract suppresses propulsive peristalsis',
      'Direct toxicity to enterocytes',
      'Histamine release in the gut wall',
      'Inhibition of the gastric H+/K+-ATPase',
    ],
    correctIndex: 0,
    rationale: 'Opioid-induced constipation is predictable; prophylactic stimulant laxatives ± stool softeners should be prescribed with regular opioids.',
  },
  {
    id: 'op-008',
    topic: 'opioids',
    type: 'mcq',
    prompt: 'Morphine relieves dyspnoea in acute pulmonary oedema mainly because of:',
    choices: [
      'Venodilation → ↓preload, plus anxiolysis and reduced respiratory work',
      'Direct bronchodilation',
      'Increased cardiac contractility',
      'Increased renal perfusion',
    ],
    correctIndex: 0,
    rationale: 'Morphine reduces preload via venodilation and lessens the sympathetic surge — used judiciously in acute LV failure.',
  },
  {
    id: 'op-009',
    topic: 'opioids',
    type: 'mcq',
    prompt: 'A neonate is born to a mother who received IV opioids during labour and shows respiratory depression. The appropriate antidote is:',
    choices: ['Naloxone (with airway support and oxygen)', 'Flumazenil', 'Diazepam', 'Atropine'],
    correctIndex: 0,
    rationale: 'Naloxone reverses opioid-induced neonatal respiratory depression — but should be avoided in neonates of opioid-dependent mothers (precipitates severe withdrawal).',
  },
  {
    id: 'op-010',
    topic: 'opioids',
    type: 'tf',
    prompt: 'Methadone is used in opioid-substitution therapy because its long half-life avoids peaks and troughs and reduces euphoria.',
    correctAnswer: true,
    rationale: 'Methadone is a long-acting μ-agonist; once-daily dosing prevents withdrawal and reduces drug-seeking. Risk: QT prolongation.',
  },
  {
    id: 'op-011',
    topic: 'opioids',
    type: 'mcq',
    prompt: 'A patient given morphine develops urinary retention. The mechanism is:',
    choices: [
      'Increased tone in the bladder sphincter and detrusor relaxation',
      'Direct nephrotoxicity',
      'Increased urine production',
      'Bladder muscle paralysis',
    ],
    correctIndex: 0,
    rationale: 'Opioids increase sphincter tone and reduce the urge to void — common after spinal or epidural opioids.',
  },
  {
    id: 'op-012',
    topic: 'opioids',
    type: 'mcq',
    prompt: 'A patient with severe head injury is given morphine and worsens neurologically. The reason is:',
    choices: [
      'Hypoventilation → CO2 retention → cerebral vasodilation → ↑intracranial pressure',
      'Direct cerebral toxin',
      'Increased CSF production',
      'Hypertensive crisis',
    ],
    correctIndex: 0,
    rationale: 'Opioid respiratory depression raises PaCO2; cerebral vessels dilate, worsening ICP. Opioids must be used very cautiously in head injury.',
  },

  // ============================================================
  // RESPIRATORY PHARMACOLOGY
  // ============================================================
  {
    id: 'rsp-001',
    topic: 'respiratory',
    type: 'mcq',
    prompt: 'Salbutamol (a short-acting β2 agonist) is preferred over salmeterol for an acute asthma attack because:',
    choices: [
      'It has rapid onset suitable for rescue therapy; salmeterol is for maintenance only',
      'It is more potent',
      'It has a longer duration of action',
      'It is given orally only',
    ],
    correctIndex: 0,
    rationale: 'SABAs (salbutamol/albuterol) act within minutes for rescue. LABAs (salmeterol/formoterol) have slower onset and must be used with an inhaled corticosteroid in asthma.',
  },
  {
    id: 'rsp-002',
    topic: 'respiratory',
    type: 'mcq',
    prompt: 'A COPD patient with BPH is started on an inhaled bronchodilator and develops urinary retention and dry mouth. The most likely culprit is:',
    choices: ['Tiotropium (long-acting muscarinic antagonist)', 'Salbutamol', 'Theophylline', 'Beclomethasone'],
    correctIndex: 0,
    rationale: 'Anticholinergic adverse effects (dry mouth, urinary retention, blurred vision) reflect systemic absorption of muscarinic antagonists like ipratropium/tiotropium.',
  },
  {
    id: 'rsp-003',
    topic: 'respiratory',
    type: 'mcq',
    prompt: 'A patient on theophylline presents with tremor, vomiting, palpitations and ECG ectopy. Plasma level is 32 mcg/mL (therapeutic 10–20). The explanation is:',
    choices: [
      'Narrow therapeutic index with dose-related toxicity',
      'Allergic hypersensitivity',
      'Inadequate β2 stimulation',
      'Renal failure increasing protein binding',
    ],
    correctIndex: 0,
    rationale: 'Theophylline has a narrow TI; toxicity causes GI upset, CNS excitation, arrhythmias. Plasma monitoring is essential, especially with smokers, hepatic disease, or interacting drugs.',
  },
  {
    id: 'rsp-004',
    topic: 'respiratory',
    type: 'mcq',
    prompt: 'A patient using an inhaled corticosteroid develops oral candidiasis. The best preventive instruction is:',
    choices: [
      'Rinse the mouth (and gargle) with water after each inhalation',
      'Take the dose only when symptomatic',
      'Increase inhaler propellant force',
      'Stop the medication permanently',
    ],
    correctIndex: 0,
    rationale: 'Rinsing reduces oropharyngeal steroid deposition that allows Candida overgrowth and hoarseness.',
  },
  {
    id: 'rsp-005',
    topic: 'respiratory',
    type: 'mcq',
    prompt: 'A patient asks why a daily inhaled corticosteroid is needed even when asymptomatic. The best answer is:',
    choices: [
      'They suppress chronic airway inflammation and prevent future attacks',
      'They provide immediate bronchodilation when needed',
      'They permanently cure asthma',
      'They prevent infection of the airways',
    ],
    correctIndex: 0,
    rationale: 'Inhaled steroids alter gene expression to reduce airway inflammation. Their benefits appear over days–weeks; they are not rescue medications.',
  },
  {
    id: 'rsp-006',
    topic: 'respiratory',
    type: 'mcq',
    prompt: 'Omalizumab is reserved for patients with confirmed elevated IgE and allergen sensitivity because:',
    choices: [
      'It is a monoclonal anti-IgE antibody and only works in IgE-mediated allergic asthma',
      'It directly blocks histamine receptors',
      'It stimulates mast-cell degranulation',
      'It selectively dilates large airways',
    ],
    correctIndex: 0,
    rationale: 'Omalizumab binds free IgE, preventing mast-cell/basophil sensitisation; benefit limited to allergic IgE-driven disease.',
  },
  {
    id: 'rsp-007',
    topic: 'respiratory',
    type: 'mcq',
    prompt: 'Cromolyn (sodium cromoglicate) cannot relieve an asthma attack because:',
    choices: [
      'It prevents mast-cell degranulation prophylactically but does not reverse established bronchospasm',
      'It is poorly absorbed',
      'It destroys mast cells permanently',
      'It causes bronchoconstriction at high doses',
    ],
    correctIndex: 0,
    rationale: 'Cromolyn stabilises mast cells — useful for exercise-induced or allergic prophylaxis (e.g., 15 min before exercise) but ineffective in acute attacks.',
  },
  {
    id: 'rsp-008',
    topic: 'respiratory',
    type: 'mcq',
    prompt: 'A patient on long-term oral glucocorticoids is abruptly stopped and develops fatigue, hypotension and weakness 2 days later. The mechanism is:',
    choices: [
      'HPA-axis suppression with adrenal insufficiency',
      'Acute allergic reaction',
      'β-receptor desensitisation',
      'Bronchospasm rebound',
    ],
    correctIndex: 0,
    rationale: 'Chronic steroids suppress the hypothalamic-pituitary-adrenal axis. Always taper to allow recovery.',
  },
  {
    id: 'rsp-009',
    topic: 'respiratory',
    type: 'mcq',
    prompt: 'Montelukast acts by:',
    choices: [
      'Blocking the cysteinyl leukotriene receptor (CysLT1)',
      'Inhibiting the 5-lipoxygenase enzyme',
      'Blocking H1 receptors',
      'Activating β2 receptors',
    ],
    correctIndex: 0,
    rationale: 'Montelukast and zafirlukast are CysLT1 antagonists; zileuton inhibits 5-lipoxygenase. Watch for mood/neuropsychiatric adverse effects with montelukast.',
  },
  {
    id: 'rsp-010',
    topic: 'respiratory',
    type: 'tf',
    prompt: 'Tiotropium is preferred over ipratropium in maintenance COPD therapy because of its much longer duration of action allowing once-daily dosing.',
    correctAnswer: true,
    rationale: 'Tiotropium is a long-acting muscarinic antagonist with high M3 selectivity, giving sustained bronchodilation with single daily dosing.',
  },

  // ============================================================
  // DIURETICS
  // ============================================================
  {
    id: 'di-001',
    topic: 'diuretics',
    type: 'mcq',
    prompt: 'Furosemide acts at which nephron site and mechanism?',
    choices: [
      'Thick ascending limb of Loop of Henle — inhibits Na+/K+/2Cl- cotransporter',
      'Distal convoluted tubule — Na+/Cl- cotransporter',
      'Collecting duct — aldosterone receptor',
      'Proximal tubule — carbonic anhydrase',
    ],
    correctIndex: 0,
    rationale: 'Loop diuretics block the NKCC2 transporter in the thick ascending limb, producing the most potent diuresis.',
  },
  {
    id: 'di-002',
    topic: 'diuretics',
    type: 'mcq',
    prompt: 'A patient on IV furosemide should be monitored most closely for which electrolyte abnormality?',
    choices: ['Hypokalaemia', 'Hyperkalaemia', 'Hyperphosphataemia', 'Hypernatraemia'],
    correctIndex: 0,
    rationale: 'Loop diuretics cause potassium loss (via increased distal delivery of Na+ and aldosterone activity), risking hypokalaemia and arrhythmias — particularly with digoxin.',
  },
  {
    id: 'di-003',
    topic: 'diuretics',
    type: 'mcq',
    prompt: 'Hydrochlorothiazide / bendroflumethiazide act at:',
    choices: [
      'Distal convoluted tubule — inhibit Na+/Cl- cotransporter',
      'Loop of Henle — block Na+/K+/2Cl-',
      'Collecting duct — block ENaC',
      'Proximal tubule — block carbonic anhydrase',
    ],
    correctIndex: 0,
    rationale: 'Thiazides inhibit the DCT NCC transporter. They cause hypokalaemia, hyponatraemia, hyperuricaemia, hyperglycaemia and hypercalcaemia.',
  },
  {
    id: 'di-004',
    topic: 'diuretics',
    type: 'mcq',
    prompt: 'Spironolactone is best classified as:',
    choices: [
      'A potassium-sparing diuretic that competitively antagonises aldosterone at mineralocorticoid receptors',
      'A loop diuretic',
      'An osmotic diuretic',
      'A carbonic anhydrase inhibitor',
    ],
    correctIndex: 0,
    rationale: 'Spironolactone (and eplerenone) blocks aldosterone — used in heart failure, resistant hypertension, primary hyperaldosteronism, and cirrhosis-related ascites.',
  },
  {
    id: 'di-005',
    topic: 'diuretics',
    type: 'mcq',
    prompt: 'Acetazolamide is rarely used for diuresis itself but is therapeutic in:',
    choices: [
      'Glaucoma, acute mountain sickness, and certain forms of epilepsy',
      'Decompensated heart failure first-line',
      'Hypertensive emergency',
      'Diabetic nephropathy',
    ],
    correctIndex: 0,
    rationale: 'CA-inhibitors reduce aqueous humour production (glaucoma), cause metabolic acidosis that aids acclimatisation (AMS), and have some anti-convulsant action.',
  },
  {
    id: 'di-006',
    topic: 'diuretics',
    type: 'mcq',
    prompt: 'Mannitol is best described as:',
    choices: [
      'An osmotic diuretic that increases tubular fluid osmolality; used in ↑ICP and ↑IOP',
      'A loop diuretic acting on NKCC2',
      'An aldosterone antagonist',
      'A thiazide-like diuretic',
    ],
    correctIndex: 0,
    rationale: 'Mannitol is filtered but not reabsorbed; it draws water into the tubule. Useful in cerebral oedema and acute glaucoma, but contraindicated in anuria or pulmonary oedema.',
  },
  {
    id: 'di-007',
    topic: 'diuretics',
    type: 'tf',
    prompt: 'Amiloride and triamterene cause diuresis by blocking sodium channels (ENaC) in the collecting tubule.',
    correctAnswer: true,
    rationale: 'Both are K+-sparing diuretics that act directly on ENaC (independent of aldosterone), reducing Na+ reabsorption and limiting K+ loss.',
  },
  {
    id: 'di-008',
    topic: 'diuretics',
    type: 'mcq',
    prompt: 'Why are thiazide diuretics often combined with a potassium-sparing diuretic?',
    choices: [
      'To counter the potassium-wasting effect and reduce risk of hypokalaemia',
      'To increase sodium retention',
      'To increase calcium excretion',
      'To shorten duration of action',
    ],
    correctIndex: 0,
    rationale: 'Combinations such as HCTZ + amiloride or HCTZ + triamterene help maintain potassium balance and remain effective antihypertensives.',
  },

  // ============================================================
  // GHANA CONTEXT (Ghana STG/EML and NMC-style scenarios)
  // ============================================================
  {
    id: 'gh-001',
    topic: 'ghanaContext',
    type: 'mcq',
    prompt: 'According to the Ghana Standard Treatment Guidelines, the recommended first-line therapy for uncomplicated Plasmodium falciparum malaria in adults is:',
    choices: [
      'An artemisinin-based combination therapy (ACT) — artemether-lumefantrine or artesunate-amodiaquine',
      'Chloroquine monotherapy',
      'Quinine oral monotherapy for 3 days',
      'Doxycycline alone',
    ],
    correctIndex: 0,
    rationale: 'Ghana STG: ACTs (AL or AS-AQ) are first-line for uncomplicated malaria; dihydroartemisinin-piperaquine is an alternative. Chloroquine is no longer effective due to resistance.',
  },
  {
    id: 'gh-002',
    topic: 'ghanaContext',
    type: 'mcq',
    prompt: 'A child living far from a health facility presents in a community clinic with suspected severe malaria but referral will be delayed. Per Ghana STG, what is the appropriate pre-referral treatment?',
    choices: [
      'Rectal artesunate while organising urgent referral',
      'Oral artemether-lumefantrine and wait at home',
      'IV quinine in the community',
      'Oral chloroquine',
    ],
    correctIndex: 0,
    rationale: 'Rectal artesunate is recommended pre-referral for suspected severe malaria when parenteral treatment cannot be given immediately. Refer urgently.',
  },
  {
    id: 'gh-003',
    topic: 'ghanaContext',
    type: 'mcq',
    prompt: 'A nurse is preparing to administer digoxin (Lanoxin) 0.25 mg PO. The patient’s apical pulse is 56 bpm. The appropriate action is:',
    choices: [
      'Withhold the dose and notify the prescriber',
      'Administer the dose as prescribed',
      'Halve the dose and administer',
      'Administer with food to prevent toxicity',
    ],
    correctIndex: 0,
    rationale: 'Standard rule: hold digoxin if apical pulse <60 bpm in adults (<70 in children, <90 in infants) and report. Digoxin slows AV conduction and can cause severe bradycardia.',
  },
  {
    id: 'gh-004',
    topic: 'ghanaContext',
    type: 'mcq',
    prompt: 'Which is a sign of digoxin toxicity?',
    choices: [
      'Nausea, vomiting, anorexia and visual disturbances (yellow-green halos)',
      'Polyuria with weight gain',
      'Hyperglycaemia and tachycardia',
      'Hyperthermia and rash',
    ],
    correctIndex: 0,
    rationale: 'Classic digoxin toxicity: GI upset, visual disturbances (xanthopsia), arrhythmias. Hypokalaemia (from diuretics) potentiates toxicity.',
  },
  {
    id: 'gh-005',
    topic: 'ghanaContext',
    type: 'mcq',
    prompt: 'Discharge teaching for a patient newly started on warfarin should include avoiding LARGE, INCONSISTENT amounts of which foods?',
    choices: [
      'Green leafy vegetables (spinach, kale, broccoli) — high in vitamin K',
      'Citrus fruits',
      'Carbohydrate-rich foods',
      'Foods high in calcium',
    ],
    correctIndex: 0,
    rationale: 'Vitamin K reverses warfarin’s anticoagulant effect. Patients can eat vegetables, but the intake should be consistent week-to-week.',
  },
  {
    id: 'gh-006',
    topic: 'ghanaContext',
    type: 'mcq',
    prompt: 'The most appropriate laboratory test to monitor unfractionated heparin therapy is:',
    choices: ['Activated partial thromboplastin time (aPTT)', 'INR / prothrombin time', 'Bleeding time only', 'Serum potassium'],
    correctIndex: 0,
    rationale: 'aPTT monitors heparin (target ~1.5–2.5×). INR is used for warfarin. LMWHs are monitored by anti-Xa levels when needed.',
  },
  {
    id: 'gh-007',
    topic: 'ghanaContext',
    type: 'mcq',
    prompt: 'For a postoperative patient on IV morphine, which assessment is the priority?',
    choices: ['Respiratory rate and depth', 'Bowel sounds', 'Pupillary size only', 'Capillary refill'],
    correctIndex: 0,
    rationale: 'Respiratory depression is the most life-threatening adverse effect of opioids; trend RR and SpO2 and have naloxone available.',
  },
  {
    id: 'gh-008',
    topic: 'ghanaContext',
    type: 'mcq',
    prompt: 'A nurse must infuse 1000 mL of 0.9% NaCl over 8 hours using tubing with a drop factor of 15 gtts/mL. The correct flow rate is approximately:',
    choices: ['31 gtts/min', '21 gtts/min', '60 gtts/min', '125 gtts/min'],
    correctIndex: 0,
    rationale: 'gtts/min = (volume × drop factor) / (time in minutes) = (1000 × 15) / 480 ≈ 31 gtts/min.',
  },
  {
    id: 'gh-009',
    topic: 'ghanaContext',
    type: 'mcq',
    prompt: 'A patient is ordered amoxicillin 500 mg PO; stock tablets are 250 mg. The nurse should give:',
    choices: ['2 tablets', '0.5 tablet', '1 tablet', '4 tablets'],
    correctIndex: 0,
    rationale: 'Dose needed / Dose on hand = 500 / 250 = 2 tablets.',
  },
  {
    id: 'gh-010',
    topic: 'ghanaContext',
    type: 'mcq',
    prompt: 'Among privately insured hypertensive Ghanaians, the most widely used single calcium channel blocker is:',
    choices: ['Amlodipine', 'Verapamil', 'Diltiazem', 'Felodipine'],
    correctIndex: 0,
    rationale: 'Amlodipine, nifedipine, losartan, lisinopril and bendroflumethiazide account for the majority of antihypertensive use in Ghana; amlodipine leads the CCB class.',
  },
  {
    id: 'gh-011',
    topic: 'ghanaContext',
    type: 'mcq',
    prompt: 'A patient is prescribed acetaminophen (paracetamol) for fever. The nurse should teach that this medication works mainly by:',
    choices: [
      'Acting on the hypothalamus to reduce the temperature set-point (central antipyretic action)',
      'Killing the causative bacteria directly',
      'Blocking peripheral COX-2 to a high degree',
      'Inhibiting platelet COX irreversibly',
    ],
    correctIndex: 0,
    rationale: 'Paracetamol acts centrally (presumed central COX inhibition) to reset the hypothalamic thermostat. It has little peripheral anti-inflammatory effect and minimal anti-platelet action.',
  },
  {
    id: 'gh-012',
    topic: 'ghanaContext',
    type: 'tf',
    prompt: 'In Ghana, ACE inhibitors and ARBs (such as lisinopril and losartan) are among the most commonly prescribed antihypertensive classes.',
    correctAnswer: true,
    rationale: 'ARBs, CCBs and ACE inhibitors dominate antihypertensive prescribing in Ghana; lisinopril and losartan are particularly common.',
  },
  // ============================================================
  // TEXTBOOK TRANSCRIPTION QUESTIONS (INTRODUCTION)
  // ============================================================
  {
    id: 'txt-prn-001',
    topic: 'routes',
    type: 'mcq',
    prompt: 'A 28-year-old pregnant woman is admitted with severe vomiting. The physician prescribes an oral antiemetic. The nurse notes she has been vomiting continuously for 6 hours. What is the most appropriate nursing action?',
    choices: [
      'Administer drug as prescribed',
      'Request change to parenteral route',
      'Give with food',
      'Crush and give sublingually'
    ],
    correctIndex: 1,
    rationale: 'Oral administration is ineffective in patients who are actively vomiting. A parenteral route (IV or IM) is required to ensure absorption.'
  },
  {
    id: 'txt-prn-002',
    topic: 'routes',
    type: 'mcq',
    prompt: 'A patient receiving IV antibiotics develops sudden shortness of breath immediately after injection. Which pharmacokinetic principle explains the rapid onset of symptoms?',
    choices: [
      'First-pass metabolism',
      'Rapid bioavailability',
      'Drug metabolism',
      'Drug excretion'
    ],
    correctIndex: 1,
    rationale: 'Intravenous injection places the drug directly into systemic circulation, giving it 100% bioavailability immediately and bypassing the absorption phase.'
  },
  {
    id: 'txt-prn-003',
    topic: 'routes',
    type: 'mcq',
    prompt: 'A nurse explains to a student why sublingual nitroglycerin works faster than oral tablets. Which statement best explains this?',
    choices: [
      'It has higher protein binding',
      'It bypasses first-pass metabolism',
      'It is absorbed in the stomach',
      'It is metabolized in the intestine'
    ],
    correctIndex: 1,
    rationale: 'The sublingual route allows the drug to diffuse directly into oral capillary blood, bypassing portal circulation and initial liver (first-pass) metabolism.'
  },
  {
    id: 'txt-prn-004',
    topic: 'principles',
    type: 'mcq',
    prompt: 'A drug produces desired therapeutic effect but also causes drowsiness. How should the nurse classify drowsiness?',
    choices: [
      'Indication',
      'Contraindication',
      'Side effect',
      'Toxic effect'
    ],
    correctIndex: 2,
    rationale: 'Drowsiness is an unintended but predictable, generally non-harmful effect occurring in addition to the therapeutic effect, making it a side effect.'
  },
  {
    id: 'txt-prn-005',
    topic: 'principles',
    type: 'mcq',
    prompt: 'A prescriber orders a medication that the patient is allergic to. Which of the Five Rights is violated if given?',
    choices: [
      'Right time',
      'Right route',
      'Right patient',
      'Right drug'
    ],
    correctIndex: 3,
    rationale: 'Administering a drug to which the patient has a documented allergy violates the "Right drug" right because that drug is not appropriate for that patient.'
  },
  {
    id: 'txt-prn-006',
    topic: 'principles',
    type: 'mcq',
    prompt: "A nurse prepares to administer a medication but discovers the patient's ID band is missing. Which action aligns with pharmacologic safety principles?",
    choices: [
      'Give drug anyway',
      'Ask another nurse',
      'Withhold until identification confirmed',
      'Check room number only'
    ],
    correctIndex: 2,
    rationale: 'Before administering any medication, positive patient identification must be established. The nurse must withhold the drug until identity is confirmed and the band replaced.'
  },
  {
    id: 'txt-prn-007',
    topic: 'routes',
    type: 'mcq',
    prompt: 'A medication intended for local eye infection is given as drops rather than tablets. Why?',
    choices: [
      'Oral route acts faster',
      'Topical route targets site directly',
      'Eye cannot absorb drugs',
      'Tablets are inactive'
    ],
    correctIndex: 1,
    rationale: 'Topical eye drops target the site of infection directly, maximizing local drug levels while minimizing systemic absorption and side effects.'
  },
  {
    id: 'txt-prn-008',
    topic: 'principles',
    type: 'mcq',
    prompt: 'A drug is modified chemically from a natural plant compound to increase potency. How is this drug classified?',
    choices: [
      'Synthetic',
      'Semi-synthetic',
      'Natural',
      'Mineral'
    ],
    correctIndex: 1,
    rationale: 'Semi-synthetic drugs are prepared by chemically modifying a natural compound (extracted from plants or microbes) to improve its therapeutic profile.'
  },
  {
    id: 'txt-prn-009',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A patient receives a drug that requires liver activation before it works. Which organ is most responsible for this pharmacokinetic process?',
    choices: [
      'Kidney',
      'Liver',
      'Heart',
      'Lung'
    ],
    correctIndex: 1,
    rationale: 'The liver is the principal site of drug metabolism (biotransformation), which includes the activation of inactive prodrugs.'
  },
  {
    id: 'txt-prn-010',
    topic: 'principles',
    type: 'mcq',
    prompt: 'A nurse administers insulin produced through recombinant DNA technology. This drug is obtained from which source?',
    choices: [
      'Mineral',
      'Synthetic',
      'Genetically engineered',
      'Plant'
    ],
    correctIndex: 2,
    rationale: 'Insulin produced using recombinant DNA technology (by inserting human genes into bacteria or yeast genomes) is classified as genetically engineered.'
  },
  {
    id: 'txt-prn-011',
    topic: 'principles',
    type: 'mcq',
    prompt: "A patient asks why two tablets with different brand names contain the same medication. What is the nurse's best response?",
    choices: [
      'They contain different active ingredients',
      'Brand names are assigned by WHO',
      'Generic names are universal',
      'Chemical names are easier'
    ],
    correctIndex: 2,
    rationale: 'The generic name of a drug is universal and remains constant regardless of the manufacturer, though different manufacturers sell it under unique brand names.'
  },
  {
    id: 'txt-prn-012',
    topic: 'routes',
    type: 'mcq',
    prompt: 'A patient receiving IM injection asks why it is given in muscle. What is the best explanation?',
    choices: [
      'Muscles prevent metabolism',
      'Muscles absorb drugs faster than veins',
      'Muscles allow moderate volume absorption',
      'Muscles destroy drugs'
    ],
    correctIndex: 2,
    rationale: 'Intramuscular sites can accommodate moderate drug volumes (typically 3-5 mL in adults) and can handle poorly soluble or oily suspensions.'
  },
  {
    id: 'txt-prn-013',
    topic: 'pharmacodynamics',
    type: 'mcq',
    prompt: 'A nurse is teaching about pharmacodynamics. Which statement indicates understanding?',
    choices: [
      'It is what the body does to the drug',
      'It is drug movement in body',
      'It is drug effect on body',
      'It is drug excretion rate'
    ],
    correctIndex: 2,
    rationale: 'Pharmacodynamics is defined as the study of what drugs do to the body (effects, mechanisms, and response relationships).'
  },
  {
    id: 'txt-prn-014',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A patient on oral therapy has reduced drug effect due to liver metabolism before reaching circulation. This is known as?',
    choices: [
      'Bioaccumulation',
      'First-pass effect',
      'Half-life',
      'Distribution'
    ],
    correctIndex: 1,
    rationale: 'The first-pass effect is the rapid hepatic inactivation of oral drugs absorbed from the GIT before they can reach the systemic circulation.'
  },
  {
    id: 'txt-prn-015',
    topic: 'routes',
    type: 'mcq',
    prompt: 'A rectal suppository is prescribed for an unconscious patient. What is the main advantage of this route?',
    choices: [
      'Complete metabolism',
      'Faster than IV',
      'Less first-pass metabolism',
      'No absorption'
    ],
    correctIndex: 2,
    rationale: 'Rectal absorption bypasses about 50% of hepatic portal blood flow, resulting in less first-pass liver metabolism compared to the oral route.'
  },
  {
    id: 'txt-prn-016',
    topic: 'principles',
    type: 'mcq',
    prompt: 'A nurse questions a dosage that seems unusually high. What principle supports this action?',
    choices: [
      'Nurses cannot question orders',
      'Pharmacokinetics knowledge improves safety',
      'Only pharmacists check doses',
      'Patients decide dosage'
    ],
    correctIndex: 1,
    rationale: 'Nurses must apply knowledge of pharmacokinetics to drug therapy to advocate for patient safety and challenge inappropriate orders.'
  },
  {
    id: 'txt-prn-017',
    topic: 'routes',
    type: 'mcq',
    prompt: 'A patient applies a nicotine patch. What is the primary purpose of this dosage form?',
    choices: [
      'Local effect only',
      'Immediate peak level',
      'Prolonged systemic effect',
      'Destroy drug'
    ],
    correctIndex: 2,
    rationale: 'Transdermal patches release a steady, controlled amount of drug that crosses the skin into systemic circulation for prolonged systemic effects.'
  },
  {
    id: 'txt-prn-018',
    topic: 'pharmacodynamics',
    type: 'mcq',
    prompt: 'A medication produces no effect in one patient but strong effect in another. Which concept explains this?',
    choices: [
      'Pharmacodynamics variability',
      'Drug stability',
      'Chemical naming',
      'Drug packaging'
    ],
    correctIndex: 0,
    rationale: 'Patients respond differently to medications due to biological variation and pharmacodynamic variability in receptor density, affinity, or signal transduction.'
  },
  {
    id: 'txt-prn-019',
    topic: 'routes',
    type: 'mcq',
    prompt: 'A child requires a vaccination skin test using 0.1 mL. Which route should be used?',
    choices: [
      'Intramuscular',
      'Intradermal',
      'Intravenous',
      'Subcutaneous'
    ],
    correctIndex: 1,
    rationale: 'Intradermal injection is used for tiny volumes (e.g., 0.1 mL) and is standard for diagnostic skin testing and certain vaccinations.'
  },
  {
    id: 'txt-prn-020',
    topic: 'routes',
    type: 'mcq',
    prompt: 'A topical eye medication is prescribed for a patient. What is the primary purpose of this route?',
    choices: [
      'Systemic absorption',
      'Liver metabolism',
      'Local action',
      'Kidney excretion'
    ],
    correctIndex: 2,
    rationale: 'Topical administration (drops/ointment) to the eye is designed to provide local therapeutic action directly to ocular tissues.'
  },
  {
    id: 'txt-prn-021',
    topic: 'routes',
    type: 'mcq',
    prompt: 'A patient receives inhaled bronchodilator therapy. Which characteristic makes this route effective?',
    choices: [
      'Small surface area',
      'Slow absorption',
      'Large surface area of lungs',
      'Requires digestion'
    ],
    correctIndex: 2,
    rationale: 'Lungs provide a massive vascular surface area for rapid absorption of gaseous or aerosolized medications.'
  },
  {
    id: 'txt-prn-022',
    topic: 'principles',
    type: 'mcq',
    prompt: 'A nurse explains that all medicines are drugs but not all drugs are medicines. Which example best supports this?',
    choices: [
      'Antibiotic capsule',
      'Insulin injection',
      'Poisonous substance',
      'Vitamin tablet'
    ],
    correctIndex: 2,
    rationale: 'Poisons are drugs because they alter biological function, but they are not medicines because they have no therapeutic, diagnostic, or prophylactic formulation.'
  },
  {
    id: 'txt-prn-023',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A drug has low serum concentration after oral administration. Which factor is most likely responsible?',
    choices: [
      'Increased absorption',
      'First-pass metabolism',
      'IV route',
      'Transdermal route'
    ],
    correctIndex: 1,
    rationale: 'Substantial metabolism in the gut wall or liver before reaching systemic circulation (first-pass effect) lowers active drug concentration.'
  },
  {
    id: 'txt-prn-024',
    topic: 'routes',
    type: 'mcq',
    prompt: 'A patient asks why IV drugs act faster than oral drugs. What is best response?',
    choices: [
      'IV drugs bypass absorption phase',
      'Oral drugs are stronger',
      'IV drugs are weaker',
      'Oral drugs bypass liver'
    ],
    correctIndex: 0,
    rationale: 'Intravenous injection places the drug directly into the bloodstream, bypassing the absorption phase and accelerating the onset of action.'
  },
  {
    id: 'txt-prn-025',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A medication is described as having a short half-life. What does the nurse expect?',
    choices: [
      'Prolonged action',
      'Rapid elimination',
      'Increased toxicity',
      'No metabolism'
    ],
    correctIndex: 1,
    rationale: 'A short half-life indicates that the drug is cleared from the blood rapidly, requiring more frequent dosing to maintain therapeutic levels.'
  },
  {
    id: 'txt-prn-026',
    topic: 'pharmacodynamics',
    type: 'mcq',
    prompt: "A drug's intensity of response is directly related to which factor?",
    choices: [
      'Patient height',
      'Drug concentration at site',
      'Tablet color',
      'Manufacturer'
    ],
    correctIndex: 1,
    rationale: 'The magnitude of a drug\'s pharmacological effect is determined by its concentration at its active site/receptors.'
  },
  {
    id: 'txt-prn-027',
    topic: 'routes',
    type: 'mcq',
    prompt: 'A patient is prescribed sustained-release tablets. What is the main advantage?',
    choices: [
      'Rapid peak levels',
      'Short duration',
      'Uniform absorption over time',
      'Immediate metabolism'
    ],
    correctIndex: 2,
    rationale: 'Sustained-release forms release the active drug slowly and continuously, promoting uniform absorption over 8 hours or longer.'
  },
  {
    id: 'txt-prn-028',
    topic: 'principles',
    type: 'mcq',
    prompt: 'A nurse is assessing for adverse drug reactions. Which observation is most important?',
    choices: [
      'Hair color',
      'Blood pressure change',
      'Shoe size',
      'Favorite food'
    ],
    correctIndex: 1,
    rationale: 'Monitoring physiological parameters like blood pressure is vital for identifying adverse drug reactions.'
  },
  {
    id: 'txt-prn-029',
    topic: 'principles',
    type: 'mcq',
    prompt: 'A medication is contraindicated in pregnancy. What does this mean?',
    choices: [
      'It is recommended',
      'It is safe',
      'It should not be used',
      'It is first-line'
    ],
    correctIndex: 2,
    rationale: 'A contraindication is a factor or condition (like pregnancy) that makes the administration of a drug highly unsafe.'
  },
  {
    id: 'txt-prn-030',
    topic: 'principles',
    type: 'mcq',
    prompt: 'A nurse prepares to administer medication and verifies drug, dose, route, time, and patient. What professional principle is being applied?',
    choices: [
      'Pharmacodynamics',
      'Five Rights of medication',
      'Drug formulation',
      'Drug absorption'
    ],
    correctIndex: 1,
    rationale: 'Verifying the drug, dose, route, time, and patient represents the classic Five Rights of medication administration safety.'
  },
  // ============================================================
  // TEXTBOOK TRANSCRIPTION QUESTIONS (PHARMACOKINETICS)
  // ============================================================
  {
    id: 'txt-pk-001',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A pregnant woman with epilepsy reports increased seizures despite taking her oral antiepileptic regularly. She is in her second trimester and has persistent constipation. What is the most likely pharmacokinetic explanation?',
    choices: [
      'Increased hepatic metabolism',
      'Reduced intestinal motility delaying absorption',
      'Increased renal clearance',
      'Reduced protein binding'
    ],
    correctIndex: 1,
    rationale: 'Progesterone causes smooth muscle relaxation during pregnancy, reducing intestinal motility and causing constipation. This alters transit time and can delay or reduce oral drug absorption.'
  },
  {
    id: 'txt-pk-002',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A patient takes iron tablets together with antacids. Two weeks later, hemoglobin remains low. Why?',
    choices: [
      'Increased hepatic metabolism',
      'Reduced intestinal blood flow',
      'Impaired absorption due to increased gastric pH',
      'Drug destruction in plasma'
    ],
    correctIndex: 2,
    rationale: 'Iron absorption requires an acidic environment to remain soluble (ferrous form). Antacids elevate gastric pH, causing chemical interactions that impair absorption.'
  },
  {
    id: 'txt-pk-003',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A trauma patient receives morphine IM and is immediately taken for physiotherapy exercises. He becomes overly sedated. Which mechanism explains this?',
    choices: [
      'Decreased metabolism',
      'Increased distribution',
      'Increased absorption due to increased blood flow',
      'Increased renal excretion'
    ],
    correctIndex: 2,
    rationale: 'Physical exercise increases local skeletal muscle blood flow, rapidly speeding up the absorption of drugs injected intramuscularly into the muscle.'
  },
  {
    id: 'txt-pk-004',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A patient with severe diarrhea reports reduced effect of oral antibiotics. Why?',
    choices: [
      'Increased hepatic clearance',
      'Decreased contact time for absorption',
      'Increased protein binding',
      'Increased lipid solubility'
    ],
    correctIndex: 1,
    rationale: 'Rapid gastrointestinal transit in patients with diarrhea decreases the time during which the drug is in contact with the absorptive mucosa.'
  },
  {
    id: 'txt-pk-005',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A drug is formulated as extended-release. Compared with immediate-release, it will most likely:',
    choices: [
      'Produce rapid peak plasma levels',
      'Shorten duration of action',
      'Slow dissolution and absorption',
      'Increase protein binding'
    ],
    correctIndex: 2,
    rationale: 'Extended-release formulations are structured to release the drug slowly, leading to slow dissolution and prolonged absorption.'
  },
  {
    id: 'txt-pk-006',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A drug cannot cross cell membranes despite high plasma concentration. It is large and polar. Which transport is required?',
    choices: [
      'Passive diffusion',
      'Lipid diffusion',
      'Carrier-mediated transport',
      'Osmosis'
    ],
    correctIndex: 2,
    rationale: 'Large, polar (hydrophilic) molecules cannot diffuse through the lipophilic cell membrane. They require carrier-mediated transport proteins.'
  },
  {
    id: 'txt-pk-007',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A drug moves from high concentration to low concentration through a carrier protein without energy. This is:',
    choices: [
      'Primary active transport',
      'Facilitated diffusion',
      'Secondary transport',
      'Vesicular transport'
    ],
    correctIndex: 1,
    rationale: 'Facilitated diffusion is a passive process that allows molecules to cross membranes down their concentration gradient using specific transporter proteins.'
  },
  {
    id: 'txt-pk-008',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A new drug is designed to bypass membrane carriers. What property must it possess?',
    choices: [
      'Water solubility',
      'Lipid solubility',
      'Protein binding',
      'Ionization'
    ],
    correctIndex: 1,
    rationale: 'Highly lipid-soluble (lipophilic) drugs can easily dissolve in and diffuse directly through the cell membrane bilayer.'
  },
  {
    id: 'txt-pk-009',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A medication is rapidly expelled from brain capillary cells back into blood. Which protein is responsible?',
    choices: [
      'Albumin',
      'Cytochrome P450',
      'P-glycoprotein',
      'Transferrin'
    ],
    correctIndex: 2,
    rationale: 'P-glycoprotein is a transmembrane efflux pump that exports foreign chemicals and drugs out of endothelial cells and back into the circulation.'
  },
  {
    id: 'txt-pk-010',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A patient overdoses on aspirin. Which intervention enhances elimination?',
    choices: [
      'Acidifying urine',
      'Alkalinizing urine',
      'Restricting fluids',
      'Giving antacids orally'
    ],
    correctIndex: 1,
    rationale: 'Aspirin is a weak acid. Alkalinizing the urine (raising pH) causes aspirin to ionize (lose protons), trapping it in the tubules (ion trapping) and preventing reabsorption.'
  },
  {
    id: 'txt-pk-011',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A weak base accumulates in gastric juice. Why?',
    choices: [
      'It becomes non-ionized',
      'It becomes ionized in acidic environment',
      'It binds proteins',
      'It undergoes metabolism'
    ],
    correctIndex: 1,
    rationale: 'In the acidic environment of the stomach (low pH), a weak base becomes protonated and highly ionized, preventing its reabsorption (ion trapping).'
  },
  {
    id: 'txt-pk-012',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A nurse notes that a drug is better absorbed in alkaline environments. The drug is most likely:',
    choices: [
      'Strong acid',
      'Weak acid',
      'Weak base',
      'Neutral compound'
    ],
    correctIndex: 2,
    rationale: 'Weak bases are non-ionized (and therefore lipid-soluble) in alkaline solutions, which promotes passive diffusion across cell membranes.'
  },
  {
    id: 'txt-pk-013',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A patient with severe burns receives a highly protein-bound drug and develops toxicity at standard dose. Why?',
    choices: [
      'Increased metabolism',
      'Increased excretion',
      'Reduced protein binding increases free drug',
      'Reduced lipid solubility'
    ],
    correctIndex: 2,
    rationale: 'Burns cause severe protein loss, leading to hypoalbuminemia. Reduced albumin means less bound drug and a larger active, free drug fraction, leading to toxicity.'
  },
  {
    id: 'txt-pk-014',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'Which patient will experience the fastest onset of drug action after IV injection?',
    choices: [
      'Patient with shock',
      'Patient with low cardiac output',
      'Patient with high tissue perfusion',
      'Patient with edema'
    ],
    correctIndex: 2,
    rationale: 'Tissues that receive high blood flow (e.g. brain, liver, kidneys) will reach drug equilibration first and experience the fastest onset.'
  },
  {
    id: 'txt-pk-015',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A drug has a very high volume of distribution. Which statement is true?',
    choices: [
      'Drug stays mainly in plasma',
      'Drug is highly water soluble',
      'Drug distributes extensively into tissues',
      'Drug is rapidly excreted'
    ],
    correctIndex: 2,
    rationale: 'A high volume of distribution (Vd) indicates that the drug leaves the vascular compartment and distributes extensively into tissue stores.'
  },
  {
    id: 'txt-pk-016',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'An obese patient requires higher dose of a lipid-soluble anesthetic. Why?',
    choices: [
      'Increased metabolism',
      'Increased fat storage of drug',
      'Reduced absorption',
      'Increased protein binding'
    ],
    correctIndex: 1,
    rationale: 'Highly lipophilic drugs partition extensively into fat. Adipose tissue acts as a sink, requiring more drug to achieve therapeutic free levels in the brain.'
  },
  {
    id: 'txt-pk-017',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A neonate receives aspirin and develops jaundice. Mechanism?',
    choices: [
      'Enzyme inhibition',
      'Displacement of bilirubin from albumin',
      'Increased metabolism',
      'Increased renal excretion'
    ],
    correctIndex: 1,
    rationale: 'Aspirin and sulfonamides displace bilirubin from albumin binding sites. Free bilirubin crosses the blood-brain barrier in neonates, causing kernicterus.'
  },
  {
    id: 'txt-pk-018',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A drug binds extensively to plasma proteins. What is the immediate effect?',
    choices: [
      'Increased pharmacologic action',
      'Increased toxicity',
      'Reduced free drug concentration',
      'Faster elimination'
    ],
    correctIndex: 2,
    rationale: 'Only free (unbound) drug molecules can cross capillary membranes to bind receptors, undergo metabolism, or be excreted.'
  },
  {
    id: 'txt-pk-019',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A patient suddenly loses large amounts of weight. Previously stored lipophilic drugs re-enter circulation. This phenomenon is called:',
    choices: [
      'Redistribution',
      'Bioavailability',
      'Biotransformation',
      'Filtration'
    ],
    correctIndex: 0,
    rationale: 'Mobilization of fat stores during rapid weight loss releases accumulated fat-soluble drugs back into the systemic circulation.'
  },
  {
    id: 'txt-pk-020',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A patient taking carbamazepine becomes pregnant while on oral contraceptives. Why might contraception fail?',
    choices: [
      'Carbamazepine inhibits estrogen metabolism',
      'Carbamazepine induces liver enzymes',
      'Carbamazepine blocks estrogen receptors',
      'Carbamazepine reduces absorption'
    ],
    correctIndex: 1,
    rationale: 'Carbamazepine is a hepatic enzyme inducer. It increases the expression of CYP3A4, leading to accelerated metabolism and failure of oral contraceptives.'
  },
  {
    id: 'txt-pk-021',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'Chronic alcohol use causes drugs to be metabolized faster primarily due to:',
    choices: [
      'Enzyme inhibition',
      'Enzyme induction',
      'Increased absorption',
      'Increased protein binding'
    ],
    correctIndex: 1,
    rationale: 'Chronic alcohol ingestion induces hepatic microsomal enzymes (especially CYP2E1), causing drugs to be cleared more rapidly.'
  },
  {
    id: 'txt-pk-022',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A drug is inactive until metabolized in the liver. It is classified as:',
    choices: [
      'Antagonist',
      'Partial agonist',
      'Prodrug',
      'Inhibitor'
    ],
    correctIndex: 2,
    rationale: 'A prodrug is an inactive compound that requires biological transformation (metabolism) in the body to release the active drug.'
  },
  {
    id: 'txt-pk-023',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: "Codeine's analgesic effect depends mainly on:",
    choices: [
      'Renal excretion',
      'Conversion to morphine',
      'Plasma binding',
      'First-pass elimination'
    ],
    correctIndex: 1,
    rationale: 'Codeine is a prodrug that must be converted to morphine via the liver enzyme CYP2D6 to produce its analgesic effects.'
  },
  {
    id: 'txt-pk-024',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A patient taking cimetidine receives meperidine and develops respiratory depression. Cause?',
    choices: [
      'Enhanced renal clearance',
      'Enzyme inhibition causing drug accumulation',
      'Increased distribution',
      'Reduced absorption'
    ],
    correctIndex: 1,
    rationale: 'Cimetidine is a CYP450 enzyme inhibitor that blocks the metabolism of meperidine, leading to meperidine accumulation and respiratory depression.'
  },
  {
    id: 'txt-pk-025',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'Phase I metabolism mainly involves:',
    choices: [
      'Conjugation',
      'Oxidation and reduction reactions',
      'Protein binding',
      'Excretion'
    ],
    correctIndex: 1,
    rationale: 'Phase I reactions (oxidation, reduction, hydrolysis) introduce or expose polar functional groups on the drug molecule.'
  },
  {
    id: 'txt-pk-026',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'Phase II metabolism primarily results in:',
    choices: [
      'Increased lipid solubility',
      'Reduced polarity',
      'Increased water solubility',
      'Reduced elimination'
    ],
    correctIndex: 2,
    rationale: 'Phase II reactions involve conjugation (e.g. glucuronidation), attaching large polar molecules to increase water solubility for excretion.'
  },
  {
    id: 'txt-pk-027',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A drug becomes more toxic after metabolism. Why?',
    choices: [
      'Metabolite is pharmacologically inactive',
      'Metabolite is more reactive/toxic',
      'Protein binding increases',
      'Absorption decreases'
    ],
    correctIndex: 1,
    rationale: 'Lethal synthesis or bioactivation occurs when liver enzymes convert a relatively safe drug (like paracetamol) into a highly reactive, toxic metabolite.'
  },
  {
    id: 'txt-pk-028',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A patient with renal failure receives a normal dose of lithium. Toxicity develops because:',
    choices: [
      'Increased metabolism',
      'Reduced GFR decreases clearance',
      'Increased absorption',
      'Increased Vd'
    ],
    correctIndex: 1,
    rationale: 'Lithium is excreted entirely unchanged by glomerular filtration (GFR). Renal failure prevents filtration, causing drug accumulation and toxicity.'
  },
  {
    id: 'txt-pk-029',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'Which drug will be eliminated fastest via kidneys?',
    choices: [
      'Highly lipid soluble drug',
      'Highly protein-bound drug',
      'Water-soluble drug',
      'Fat-stored drug'
    ],
    correctIndex: 2,
    rationale: 'Highly polar, water-soluble drugs are filtered by the glomerulus and cannot diffuse back across renal tubular membranes, accelerating clearance.'
  },
  {
    id: 'txt-pk-030',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A drug is cleared completely in one kidney passage. Which process dominates?',
    choices: [
      'Reabsorption',
      'Filtration',
      'Active tubular secretion',
      'Redistribution'
    ],
    correctIndex: 2,
    rationale: 'Active tubular secretion pumps drugs from the blood into the renal tubule, and can clear drugs from blood completely in a single pass.'
  },
  {
    id: 'txt-pk-031',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'Which route represents a minor drug excretion pathway?',
    choices: [
      'Urine',
      'Bile',
      'Sweat',
      'Kidneys'
    ],
    correctIndex: 2,
    rationale: 'Sweat, tears, and saliva contain only traces of drugs and represent minor elimination routes compared to kidneys (urine) and liver (bile).'
  },
  {
    id: 'txt-pk-032',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A drug with long half-life requires:',
    choices: [
      'Frequent dosing',
      'Large loading dose only',
      'Longer dosing intervals',
      'Continuous infusion'
    ],
    correctIndex: 2,
    rationale: 'Drugs with long half-lives persist in the body for long periods, meaning they require longer dosing intervals to prevent accumulation.'
  },
  {
    id: 'txt-pk-033',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'Which factor increases drug half-life?',
    choices: [
      'Increased clearance',
      'Decreased Vd',
      'Increased Vd',
      'Increased metabolism'
    ],
    correctIndex: 2,
    rationale: 'Half-life is directly proportional to volume of distribution (Vd) and inversely proportional to clearance. Thus, higher Vd increases half-life.'
  },
  {
    id: 'txt-pk-034',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A drug reaches steady state slowly. Why?',
    choices: [
      'High clearance',
      'Short half-life',
      'Long half-life',
      'Low absorption'
    ],
    correctIndex: 2,
    rationale: 'It takes 4 to 5 half-lives to reach steady-state. Therefore, a drug with a long half-life takes longer to reach steady state.'
  },
  {
    id: 'txt-pk-035',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A patient misses several doses of a drug with short half-life. What happens?',
    choices: [
      'Drug accumulates',
      'Plasma levels drop quickly',
      'Distribution increases',
      'Protein binding increases'
    ],
    correctIndex: 1,
    rationale: 'A short half-life means the drug is eliminated rapidly; missing doses causes blood levels to fall below therapeutic range very quickly.'
  },
  {
    id: 'txt-pk-036',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A malnourished patient develops exaggerated response to standard drug doses. Which factor explains this best?',
    choices: [
      'Increased hepatic metabolism',
      'Reduced plasma proteins',
      'Increased renal clearance',
      'Reduced tissue perfusion'
    ],
    correctIndex: 1,
    rationale: 'Malnutrition decreases plasma albumin levels. Highly bound drugs have fewer sites to bind, causing an increase in free active drug concentration.'
  },
  {
    id: 'txt-pk-037',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A drug cannot reach brain tissue despite high plasma levels. Most likely reason?',
    choices: [
      'Low lipid solubility',
      'High Vd',
      'Low protein binding',
      'High absorption'
    ],
    correctIndex: 0,
    rationale: 'The blood-brain barrier prevents large or hydrophilic molecules from entering the brain. Low lipid solubility prevents them from crossing capillary walls.'
  },
  {
    id: 'txt-pk-038',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A patient taking rifampicin requires higher dose of another medication. Why?',
    choices: [
      'Rifampicin inhibits metabolism',
      'Rifampicin induces metabolic enzymes',
      'Rifampicin blocks receptors',
      'Rifampicin reduces absorption'
    ],
    correctIndex: 1,
    rationale: 'Rifampicin induces Cytochrome P450 enzymes (specifically CYP3A4), accelerating the metabolism and clearing of co-administered drugs.'
  },
  {
    id: 'txt-pk-039',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A lipid-soluble drug accumulates in fat. When discontinued, effects persist for days. This is due to:',
    choices: [
      'Increased renal clearance',
      'Slow release from fat stores',
      'Rapid metabolism',
      'Increased protein binding'
    ],
    correctIndex: 1,
    rationale: 'Fat tissue is poorly perfused, acting as a drug reservoir. Once administration stops, the drug is slowly released back into blood over days.'
  },
  {
    id: 'txt-pk-040',
    topic: 'pharmacokinetics',
    type: 'mcq',
    prompt: 'A drug shows reduced effect when taken with food because nutrients compete for absorption sites. This primarily affects:',
    choices: [
      'Distribution',
      'Excretion',
      'Absorption',
      'Metabolism'
    ],
    correctIndex: 2,
    rationale: 'Food presence in the gut can delay gastric emptying and interfere chemically or physically with drug absorption.'
  },
  // ============================================================
  // TEXTBOOK TRANSCRIPTION QUESTIONS (DIURETICS)
  // ============================================================
  {
    id: 'txt-diu-001',
    topic: 'diuretics',
    type: 'mcq',
    prompt: 'A 70-year-old man with essential hypertension is started on a thiazide diuretic. Two weeks later, laboratory findings reveal serum K+ 2.9 mmol/L, uric acid elevation, and mild hyperglycemia. Which mechanism best explains this combination of findings?',
    choices: [
      'Direct inhibition of aldosterone receptors in the collecting duct',
      'Increased sodium delivery to distal nephron leading to potassium wasting and metabolic alterations',
      'Blockade of Na-K-2Cl transporter in thick ascending limb',
      'Increased bicarbonate excretion in proximal tubule'
    ],
    correctIndex: 1,
    rationale: 'Thiazides inhibit Na-Cl cotransport in the distal convoluted tubule. This increases Na+ delivery downstream to the collecting duct, stimulating Na+ reabsorption and reciprocal K+ and H+ excretion. They also impair insulin release and cause hyperuricemia.'
  },
  {
    id: 'txt-diu-002',
    topic: 'diuretics',
    type: 'mcq',
    prompt: 'A patient with acute pulmonary edema secondary to left ventricular failure is given IV Furosemide. Which transporter is directly inhibited to produce rapid natriuresis?',
    choices: [
      'Na-Cl cotransporter in distal convoluted tubule',
      'Na-K-2Cl cotransporter in thick ascending limb',
      'Carbonic anhydrase in the proximal tubule',
      'Epithelial sodium channels (ENaC) in the collecting duct'
    ],
    correctIndex: 1,
    rationale: 'Furosemide is a loop diuretic that blocks the Na-K-2Cl cotransporter in the thick ascending limb of Henle\'s loop, preventing sodium reabsorption and promoting rapid diuresis.'
  },

  // ============================================================
  // PAST PAPER — Adu-Gyamfi pharmacology test
  // (antibiotics, obstetric pharmacology, GI, diuretics, opioids)
  // ============================================================

  // ---- Opioids / Analgesics (Q26-39) ----
  {
    id: 'pp-026',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A patient takes morphine (OxyContin) 40 mg PO twice daily for chronic pain. Which intervention should be added to the plan of care to minimise the gastrointestinal adverse effects?',
    choices: [
      'Take an antacid with each dose',
      'Eat foods high in lactobacilli',
      'Take the medication on an empty stomach',
      'Increase fluid and fibre in the diet',
    ],
    correctIndex: 3,
    rationale: 'Opioid-induced constipation is predictable and persistent; fluids, dietary fibre and prophylactic laxatives are first-line. Tolerance does NOT develop to constipation.',
  },
  {
    id: 'pp-027',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Which agent is most likely to cause serious respiratory depression as a potential adverse reaction?',
    choices: ['Morphine (Duramorph)', 'Pentazocine (Talwin)', 'Hydrocodone (Lortab)', 'Nalmefene (Revex)'],
    correctIndex: 0,
    rationale: 'Pure μ-agonists like morphine carry the highest respiratory-depression risk. Pentazocine is a mixed/partial agonist with a ceiling; nalmefene is an antagonist.',
  },
  {
    id: 'pp-028',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Which statement is most helpful in guiding clinical practice when managing postoperative pain with opioids?',
    choices: [
      'At least 30% of the population is prone to drug addiction and abuse',
      'The development of opioid dependence is rare when opioids are used for acute pain',
      'Morphine is a common drug of abuse in the general population',
      'PRN dosing provides the most consistent pain relief without risk of addiction',
    ],
    correctIndex: 1,
    rationale: 'Short-term opioid use for acute pain rarely produces clinical addiction. Under-treatment of pain — not appropriate use — is the more common error.',
  },
  {
    id: 'pp-029',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A midwife gives naloxone (Narcan) to a postoperative patient with opioid-induced respiratory sedation. Which undesirable effect should the nurse anticipate?',
    choices: ['Drowsiness', 'Tics and tremors', 'Increased pain', 'Nausea and vomiting'],
    correctIndex: 3,
    rationale: 'Naloxone reverses opioid analgesia and may also precipitate nausea/vomiting and acute withdrawal-like symptoms — be ready to manage these.',
  },
  {
    id: 'pp-030',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A client reports pain in the lower extremities for the past eight months. The midwife recognises this pain as:',
    choices: ['Moderate', 'Severe', 'Acute', 'Chronic'],
    correctIndex: 3,
    rationale: 'Pain persisting beyond ~3–6 months (or beyond expected healing time) is classified as chronic.',
  },
  {
    id: 'pp-031',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A midwife administers morphine sulfate 4 mg IV for severe pain. Which assessment requires IMMEDIATE intervention?',
    choices: ['Blood pressure 110/70', 'The client is drowsy', 'Pain is unrelieved in 15 minutes', 'Respiratory rate 10/minute'],
    correctIndex: 3,
    rationale: 'Respiratory depression is the most dangerous opioid effect. RR < 12 in an adult after IV morphine demands immediate action (stimulate, oxygen, prepare naloxone).',
  },
  {
    id: 'pp-032',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Nursing intervention for a client receiving opioid analgesics over an extended period should include:',
    choices: [
      'Referring the client to a drug treatment centre',
      'Encouraging increased fluids and fibre in the diet',
      'Monitoring for GI bleeding',
      'Teaching the client to take her own blood pressure',
    ],
    correctIndex: 1,
    rationale: 'Constipation is universal with chronic opioids; preventive fluids, fibre and laxatives are essential.',
  },
  {
    id: 'pp-033',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Which is the clinical use of ergot alkaloids (e.g., ergometrine)?',
    choices: ['Induction of birth (labour)', 'Postpartum bleeding', 'Both', 'Neither'],
    correctIndex: 2,
    rationale: 'Ergot alkaloids cause sustained uterine contraction — used for induction of labour and for treating/preventing postpartum haemorrhage.',
  },
  {
    id: 'pp-034',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'The effect of oxytocin on the uterus is to:',
    choices: ['Increase Ca²⁺ influx', 'Increase K⁺ influx', 'Decrease Ca²⁺ influx', 'Decrease Na⁺ influx'],
    correctIndex: 0,
    rationale: 'Oxytocin binds Gq-coupled OT receptors → IP3/DAG → ↑intracellular Ca²⁺ → uterine smooth-muscle contraction.',
  },
  {
    id: 'pp-035',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Naloxone is given to a client with severe respiratory depression from suspected drug overdose. After 20 minutes the client remains unresponsive. The most likely explanation is:',
    choices: [
      'The client did not use an opioid drug',
      'The dose of naloxone was inadequate',
      'The client is resistant to this drug',
      'The drug overdose is irreversible',
    ],
    correctIndex: 1,
    rationale: 'If there is no response to a standard naloxone dose, the dose may be too low (titrate up). Persistent non-response suggests an alternative diagnosis.',
  },
  {
    id: 'pp-036',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'When oxytocin is given for labour augmentation, the rate of infusion should be gradually but steadily increased until:',
    choices: [
      'Delivery occurs',
      'Baseline uterine tone increases to 20 mm Hg or higher',
      'Regular contractions, 5 minutes apart, become established',
      'A contraction pattern that resembles normal labour is established',
    ],
    correctIndex: 3,
    rationale: 'Oxytocin is titrated to a normal-pattern contractions (3–5 in 10 min, 40–60 s each). Over-dosing risks uterine hyperstimulation and rupture.',
  },
  {
    id: 'pp-037',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Induction of labour is usually appropriate in ALL of the following situations EXCEPT when:',
    choices: [
      'The fetus died 6 weeks earlier',
      'Chorioamnionitis is present',
      'The fetus is post-term',
      'There is a face presentation',
    ],
    correctIndex: 3,
    rationale: 'Face presentation (especially mento-posterior) contra-indicates vaginal induction — Caesarean is preferred. Fetal demise, chorioamnionitis and post-term pregnancy are accepted indications.',
  },
  {
    id: 'pp-038',
    topic: 'pastPaper',
    type: 'tf',
    prompt: 'Augmentation of labour differs from induction because, with augmentation, true labour has ALREADY been established.',
    correctAnswer: true,
    rationale: 'Induction = starting labour de novo; augmentation = strengthening labour already underway.',
  },
  {
    id: 'pp-039',
    topic: 'pastPaper',
    type: 'tf',
    prompt: 'The full effects of a given dose of oxytocin are seen within 5 minutes of administering that dose.',
    correctAnswer: false,
    rationale: 'IV oxytocin reaches steady-state in ~20–30 minutes; titration should be in 30-minute increments, not minute-by-minute.',
  },

  // ---- Obstetric / Oxytocics / Diuretics + Lithium (Q40-45) ----
  {
    id: 'pp-040',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Possible complications of oxytocin infusion include ALL of the following EXCEPT:',
    choices: ['Maternal hypertension', 'Uterine rupture', 'Fetal compromise', 'Water intoxication'],
    correctIndex: 0,
    rationale: 'Oxytocin can cause uterine hyperstimulation/rupture, fetal distress and water intoxication (ADH-like effect). Hypotension (not hypertension) is typical at high doses.',
  },
  {
    id: 'pp-041',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A 16-year-old pregnant girl presents with severe vaginal bleeding; the fetus is dead. She admits a friend gave her a suppository to induce abortion. Which drug was she most likely given?',
    choices: ['Dinoprost', 'Dinoprostone', 'Carboprost', 'Oxytocin'],
    correctIndex: 1,
    rationale: 'Dinoprostone (PGE2) suppositories/gel are widely used (and misused) to induce labour or abortion via cervical ripening and uterotonic effect.',
  },
  {
    id: 'pp-042',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A 36-year-old multiparous woman with multiple previous Caesarean sections is induced. After intra-amniotic injection she develops abdominal pain and dies of hypovolaemic shock. Which drug was likely used?',
    choices: ['Carboprost', 'Dinoprostone', 'Oxytocin', 'Ergometrine'],
    correctIndex: 3,
    rationale: 'In a uterus with multiple prior C-section scars, potent uterotonic agents such as ergometrine can precipitate uterine rupture and catastrophic haemorrhage — strongly contraindicated.',
  },
  {
    id: 'pp-043',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'The drug of choice for controlling postpartum haemorrhage (per this examiner key) is:',
    choices: ['Oxytocin', 'Methylergometrine', 'Dihydroergotamine', 'Prostaglandin E2'],
    correctIndex: 1,
    rationale: 'Examiner key: methylergometrine. WHO/most guidelines list oxytocin as first-line, with ergometrine/misoprostol/carboprost as second-line.',
  },
  {
    id: 'pp-044',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A thiazide diuretic increases urine output by:',
    choices: [
      'Inhibiting the Na⁺/K⁺/Cl⁻ cotransporter in the distal convoluted tubule',
      'Inhibiting the Na⁺/Cl⁻ cotransporter in the distal convoluted tubule',
      'Inhibiting water reabsorption in the distal convoluted tubule',
      'Inhibiting the Na⁺/K⁺ transporter in the distal convoluted tubule',
    ],
    correctIndex: 1,
    rationale: 'Thiazides block the NCC (Na⁺/Cl⁻ cotransporter) in the early DCT. Loop diuretics block the NKCC2 in the thick ascending limb.',
  },
  {
    id: 'pp-045',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A patient on hydrochlorothiazide develops hypokalaemia. Which co-prescribed medication should the nurse hold and notify the physician?',
    choices: ['Dilantin (phenytoin)', 'Digoxin', 'Warfarin', 'Lithium'],
    correctIndex: 3,
    rationale: 'Thiazides reduce renal lithium clearance, risking lithium toxicity. They also potentiate digoxin toxicity through hypokalaemia — but lithium is the most direct interaction to halt.',
  },

  // ---- Diuretics (Q46-58) ----
  {
    id: 'pp-046',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A 55-year-old man with hypertension, type-1 diabetes and gout is started on a thiazide diuretic. Which lab finding is most concerning?',
    choices: [
      'Potassium 5.2 mEq/L (within normal range)',
      'Calcium 9 mg/dL (within normal range)',
      'Blood glucose 300 mg/dL (above normal)',
      'Uric acid 15 mg/dL (above normal)',
    ],
    correctIndex: 2,
    rationale: 'Thiazides cause hyperglycaemia (worsens diabetes) and hyperuricaemia (worsens gout). Both warrant reporting — at 300 mg/dL the glucose is the most acute.',
  },
  {
    id: 'pp-046b',
    topic: 'pastPaper',
    type: 'tf',
    prompt: 'A uric acid level above the normal range in a patient with gout newly started on a thiazide diuretic should be reported to the physician.',
    correctAnswer: true,
    rationale: 'Thiazides reduce renal urate excretion. Rising uric acid can precipitate a gout flare and must be communicated.',
  },
  {
    id: 'pp-047',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Which patient is most likely to benefit from a thiazide diuretic?',
    choices: [
      'A patient with recurrent calcium renal calculi',
      'A patient with a history of hypocalcaemia',
      'A patient with heart failure and frequent gout attacks',
      'A patient with diabetes and uncontrolled hyperglycaemia',
    ],
    correctIndex: 0,
    rationale: 'Thiazides DECREASE urinary calcium excretion, helping prevent calcium-stone formation. Inappropriate in gout (raise uric acid) and uncontrolled diabetes (raise glucose).',
  },
  {
    id: 'pp-048',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A patient with type-1 diabetes is started on a thiazide for hypertension. Which statement indicates a MISUNDERSTANDING and needs re-teaching?',
    choices: [
      'I must monitor my blood glucose closely while taking this medication',
      'This medication can cause sudden and severe DROPS in my blood glucose',
      'I will try my best to eat a diet that includes foods rich in potassium',
      'I will report to my physician if I experience excessive thirst or fatigue',
    ],
    correctIndex: 1,
    rationale: 'Thiazides RAISE blood glucose. The patient confuses hypo- with hyperglycaemia and needs correction.',
  },
  {
    id: 'pp-049',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A loop diuretic causes diuresis by mainly affecting which structure of the nephron?',
    choices: [
      'Distal convoluted tubule',
      'Descending limb of the Loop of Henle',
      'Proximal convoluted tubule',
      'Ascending limb of the Loop of Henle',
    ],
    correctIndex: 3,
    rationale: 'Loop diuretics (furosemide, bumetanide, torsemide) block the NKCC2 transporter on the thick ASCENDING limb of the Loop of Henle.',
  },
  {
    id: 'pp-050',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Loop diuretics are effective at inhibiting sodium reabsorption within the nephron because they inhibit:',
    choices: [
      'The sodium-chloride transporter',
      'The effects of aldosterone in the distal convoluted tubule',
      'The sodium-potassium-chloride cotransporter',
      'Transport of bicarbonate in the proximal convoluted tubule',
    ],
    correctIndex: 2,
    rationale: 'Loop diuretics inhibit the Na⁺/K⁺/2Cl⁻ cotransporter (NKCC2) — the mechanism behind their potent natriuresis.',
  },
  {
    id: 'pp-051',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A patient is started on spironolactone (Aldactone) AND furosemide (Lasix). Which is the best teaching point?',
    choices: [
      'Using two drugs increases blood osmolality and decreases GFR',
      'The combination promotes diuresis but decreases the risk of low potassium',
      'The lowest dose of two diuretics is more effective than a large dose of one',
      'This combination maintains water balance and protects against electrolyte imbalance',
    ],
    correctIndex: 1,
    rationale: 'Furosemide wastes K⁺; spironolactone spares K⁺. Combining them gives effective diuresis with reduced risk of hypokalaemia.',
  },
  {
    id: 'pp-052',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Why might a clinician prescribe furosemide 40 mg PO BD for a patient with a history of renal insufficiency?',
    choices: [
      'Furosemide is effective in treating patients with hypoaldosteronism',
      'Furosemide helps the kidney reabsorb sodium and water',
      'Furosemide has an antagonist effect that prevents respiratory alkalosis',
      'Furosemide is effective in treating patients with impaired kidney function',
    ],
    correctIndex: 3,
    rationale: 'Unlike thiazides, loop diuretics retain efficacy at low GFR and are the diuretic of choice in CKD.',
  },
  {
    id: 'pp-053',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'The nurse would QUESTION the use of mannitol (Osmitrol) for which patient condition?',
    choices: [
      'Increased intra-ocular pressure',
      'Oliguria from acute renal failure',
      'Cerebral oedema from head trauma',
      'Anuria related to end-stage kidney disease',
    ],
    correctIndex: 3,
    rationale: 'Mannitol requires functioning kidneys for excretion. In anuria/ESRD it accumulates and can precipitate pulmonary oedema and hyper-osmolar states.',
  },
  {
    id: 'pp-054',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A patient on spironolactone (Aldactone) asks about adding potassium supplements. The nurse’s best response is:',
    choices: [
      'I will call your provider and discuss your concern',
      'I would recommend that you take two multivitamins every day',
      'This diuretic is potassium-sparing, so there is no need for extra potassium',
      'You will need potassium supplements for the medication to be effective',
    ],
    correctIndex: 2,
    rationale: 'Spironolactone is K⁺-sparing. Adding potassium risks dangerous hyperkalaemia, especially with concurrent ACE-I/ARB or CKD.',
  },
  {
    id: 'pp-055',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'For a patient diagnosed with primary hyperaldosteronism, the nurse would expect which diuretic to be prescribed?',
    choices: ['Furosemide (Lasix)', 'Acetazolamide (Diamox)', 'Spironolactone (Aldactone)', 'Hydrochlorothiazide (HydroDIURIL)'],
    correctIndex: 2,
    rationale: 'Spironolactone (an aldosterone receptor antagonist) directly opposes the excess mineralocorticoid action.',
  },
  {
    id: 'pp-056',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Select the drug used to SUPPRESS labour (tocolysis):',
    choices: ['Atropine', 'Ritodrine (β2 agonist)', 'Prostaglandin E2', 'Progesterone'],
    correctIndex: 1,
    rationale: 'β2-agonists (ritodrine, terbutaline), atosiban and nifedipine are tocolytics. PGE2 and oxytocin INDUCE labour.',
  },
  {
    id: 'pp-057',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Use of ritodrine to arrest premature labour can cause the following complications EXCEPT:',
    choices: ['Tachycardia', 'Fall in blood pressure', 'Hypoglycaemia', 'Pulmonary oedema'],
    correctIndex: 2,
    rationale: 'β2-agonists cause HYPERglycaemia (not hypo-) via hepatic glycogenolysis. Tachycardia, hypotension and pulmonary oedema are recognised adverse effects.',
  },
  {
    id: 'pp-058',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'An opioid acting ONLY at which receptor will cause peripheral analgesia, little spinal analgesia, no respiratory depression and no euphoria?',
    choices: ['Delta', 'Kappa', 'Mu', 'Sigma'],
    correctIndex: 1,
    rationale: 'Kappa-selective agonists (e.g., nalbuphine, butorphanol) give analgesia with little respiratory depression; they tend to cause dysphoria rather than euphoria.',
  },

  // ---- Antibiotics — basics (Q59-72) ----
  {
    id: 'pp-059',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Analgesia from opioids mainly comes from which receptor?',
    choices: ['Delta', 'Kappa', 'Mu', 'Muscarinic'],
    correctIndex: 2,
    rationale: 'μ (mu) receptor activation produces the dominant supraspinal and spinal analgesia of opioids — along with respiratory depression and euphoria.',
  },
  {
    id: 'pp-060',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Which route of administration is appropriate and convenient for HOME administration of an antimicrobial to treat a SYSTEMIC infection?',
    choices: ['Oral', 'Intravenous', 'Topical', 'Parenteral'],
    correctIndex: 0,
    rationale: 'For routine systemic infections at home the oral route is most convenient. IV/parenteral need clinical supervision; topical is local-only.',
  },
  {
    id: 'pp-061',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Which antibiotic / mechanism combination is correct?',
    choices: [
      'Penicillin: inhibition of cell wall synthesis',
      'Cephalosporin: inhibition of protein synthesis',
      'Aminoglycoside: inhibition of cell wall synthesis',
      'Fluoroquinolone: inhibition of cell wall synthesis',
    ],
    correctIndex: 0,
    rationale: 'Penicillins and cephalosporins inhibit cell-wall synthesis. Aminoglycosides inhibit the 30S ribosome (protein synthesis). Fluoroquinolones inhibit DNA gyrase/topoisomerase IV.',
  },
  {
    id: 'pp-062',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'What is a common feature of the β-lactam antibiotics (penicillins, cephalosporins, carbapenems, monobactams)?',
    choices: [
      'They all bind penicillin-binding protein 1 and inhibit transpeptidase activity',
      'They all have a β-lactam ring as part of their biological interaction',
      'None can penetrate to the central nervous system',
      'All the above',
    ],
    correctIndex: 1,
    rationale: 'The defining feature is the β-lactam ring. The ring binds penicillin-binding proteins and disrupts cross-linking of the peptidoglycan cell wall.',
  },
  {
    id: 'pp-063',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Amoxicillin is similar to ampicillin in different respects EXCEPT in:',
    choices: ['Antibacterial spectrum', 'Penicillinase resistance', 'Hypersensitivity reaction', 'Oral absorption'],
    correctIndex: 3,
    rationale: 'Amoxicillin and ampicillin share spectrum, lack of β-lactamase resistance and cross-allergenicity. Amoxicillin has BETTER oral absorption (~90% vs ~40%).',
  },
  {
    id: 'pp-064',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A 26-year-old male returns from holiday with three days of dysuria and a purulent urethral discharge — diagnosed with gonorrhoea. Appropriate treatment is:',
    choices: ['Ceftriaxone IM', 'Streptomycin', 'Gentamicin', 'Vancomycin IV'],
    correctIndex: 0,
    rationale: 'Ceftriaxone IM (often plus azithromycin) is the standard for uncomplicated Neisseria gonorrhoeae infection.',
  },
  {
    id: 'pp-065',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Red-man syndrome is a toxicity associated with which antibiotic?',
    choices: ['Gentamicin', 'Daptomycin', 'Erythromycin', 'Vancomycin'],
    correctIndex: 3,
    rationale: 'Red-man syndrome is a non-allergic histamine-release reaction from rapid IV vancomycin infusion — slow infusion (>60 min) and antihistamine pre-treatment help.',
  },
  {
    id: 'pp-066',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'With continuous use of antibiotics, antibiotic resistance develops because:',
    choices: [
      'Bacteria produce fewer mutations',
      'The immune system enhances its ability to fight infection',
      'Mutant bacteria are surviving antibiotic exposure',
      'Fewer new antibiotics have been produced',
    ],
    correctIndex: 2,
    rationale: 'Selective pressure favours survival and proliferation of resistant mutants. Hence the emphasis on rational antibiotic stewardship.',
  },
  {
    id: 'pp-067',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A child with otitis media is ordered amoxicillin. The mother says the child is allergic to penicillin. The HIGHEST priority nursing action is:',
    choices: [
      'Notify the healthcare provider that the client is allergic to penicillin',
      'Encourage the client to take the dose under close monitoring',
      'Administer half of the amoxicillin dose under supervision',
      'Report the amoxicillin order to the supervisor',
    ],
    correctIndex: 0,
    rationale: 'Amoxicillin IS a penicillin. Documented penicillin allergy means HOLD the dose and notify the prescriber — never give a half-dose to "test".',
  },
  {
    id: 'pp-068',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Most β-lactam antibiotics are excreted through the kidneys. The nurse should monitor:',
    choices: [
      'Blood urea nitrogen and serum creatinine',
      'Creatinine phosphokinase and alkaline phosphatase',
      'White blood cell count and red blood cell count',
      'Haemoglobin and haematocrit',
    ],
    correctIndex: 0,
    rationale: 'BUN and creatinine track renal function and guide dose adjustment for renally excreted β-lactams.',
  },
  {
    id: 'pp-069',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A patient is starting a cephalosporin. The nurse should monitor for which side effects as a HIGHEST priority?',
    choices: [
      'Nausea, vomiting and diarrhoea',
      'Photophobia and phototoxicity',
      'Pain with urination and blood in the urine',
      'High fevers and sweating',
    ],
    correctIndex: 0,
    rationale: 'GI upset and diarrhoea (including C. difficile colitis) are the most common adverse effects of cephalosporins.',
  },
  {
    id: 'pp-070',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A client reports penicillin allergy. The order is for cephalexin (Keflex). The correct nursing action is:',
    choices: [
      'Administer as ordered with additional fluids',
      'Administer the medication and observe carefully for allergic reaction',
      'Call the physician to change the order because of the allergy history',
      'Administer another antibiotic after consulting the pharmacist',
    ],
    correctIndex: 2,
    rationale: 'Cross-allergenicity between penicillins and cephalosporins is ~1–10%. Clarify with the prescriber rather than risk anaphylaxis.',
  },
  {
    id: 'pp-071',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'An antimicrobial that has SELECTIVE TOXICITY has which characteristic?',
    choices: [
      'Ability to transfer DNA coding',
      'Ability to suppress bacterial resistance',
      'Ability to avoid injuring host cells',
      'Ability to act against a specific microbe',
    ],
    correctIndex: 2,
    rationale: 'Selective toxicity = harms the microbe but spares host cells (e.g., β-lactams target bacterial peptidoglycan, which humans lack).',
  },
  {
    id: 'pp-072',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Before administering IV penicillin, the nurse should:',
    choices: [
      'Flush the IV site with normal saline',
      'Assess the patient for allergies',
      'Review the patient’s intake and output record',
      'Determine the latest creatinine clearance result',
    ],
    correctIndex: 1,
    rationale: 'Allergy screening is essential because IV penicillin can precipitate anaphylaxis within minutes.',
  },

  // ---- Cephalosporins, Aminoglycosides, Fluoroquinolones (Q80-91) ----
  {
    id: 'pp-080',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A patient says he was treated with an aminoglycoside but cannot recall the name. Which medication is NOT an aminoglycoside?',
    choices: ['Amikacin', 'Erythromycin', 'Streptomycin', 'Neomycin'],
    correctIndex: 1,
    rationale: 'Erythromycin is a macrolide. Aminoglycosides include gentamicin, tobramycin, amikacin, neomycin, streptomycin (mnemonic: "Mean GNATS canNOT kill anaerobes").',
  },
  {
    id: 'pp-081',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Which statement about aminoglycosides is INCORRECT and requires re-education?',
    choices: [
      'Aminoglycosides can be used for infections of skin, bone, eyes, ears, abdomen and pelvis',
      'These antibiotics are given orally because they are absorbed well in the GI tract',
      'Aminoglycosides target gram-negative bacteria such as Klebsiella and Pseudomonas',
      'They are bactericidal',
    ],
    correctIndex: 1,
    rationale: 'Aminoglycosides are POORLY absorbed orally (use IV/IM for systemic infection). Oral neomycin is used only for gut decontamination because it stays in the bowel.',
  },
  {
    id: 'pp-082',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Your patient is prescribed cefazolin. Which verbalised allergy requires you to hold the medication and contact the prescriber?',
    choices: ['Gentamicin', 'Erythromycin', 'Penicillin', 'Ciprofloxacin'],
    correctIndex: 2,
    rationale: 'Cephalosporins share a β-lactam ring with penicillins and may cross-react. Hold and consult the prescriber for a documented penicillin allergy.',
  },
  {
    id: 'pp-083',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Which cephalosporin is a fifth-generation agent able to treat MRSA?',
    choices: ['Cefazolin', 'Cefaclor', 'Cephalexin', 'Ceftaroline'],
    correctIndex: 3,
    rationale: 'Ceftaroline is the 5th-generation cephalosporin with anti-MRSA activity (binds altered PBP2a).',
  },
  {
    id: 'pp-084',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A patient is prescribed IV ceftriaxone. The nurse knows this medication should NEVER be administered with:',
    choices: ['Grapefruit juice', 'Calcium solutions', 'Saline solutions', 'Foods containing tyramine'],
    correctIndex: 1,
    rationale: 'Ceftriaxone forms a fatal precipitate with calcium-containing IV solutions (especially in neonates) — incompatible in the same line.',
  },
  {
    id: 'pp-085',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Which second-generation cephalosporin targets gram-negative ANAEROBES such as Bacteroides fragilis?',
    choices: ['Cefaclor', 'Cefuroxime', 'Cefoxitin', 'Cefotetan'],
    correctIndex: 2,
    rationale: 'Cefoxitin and cefotetan are the 2nd-generation cephamycins with B. fragilis activity. Cefoxitin is most commonly cited; the test key accepts cefotetan as well.',
  },
  {
    id: 'pp-086',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A patient on cefotetan returns from dinner with vomiting, nausea, flushing, sweating and headache. The MOST important question for the nurse to ask is:',
    choices: [
      'Have you recently taken a phosphodiesterase inhibitor?',
      'Have you recently received a live vaccine?',
      'When was the last time you ingested alcohol?',
      'Do you have a penicillin allergy?',
    ],
    correctIndex: 2,
    rationale: 'Cefotetan (and cefoperazone, metronidazole) cause a disulfiram-like reaction with alcohol — flushing, vomiting, headache, tachycardia. Counsel patients to avoid alcohol.',
  },
  {
    id: 'pp-087',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Which statement accurately describes how cephalosporins kill bacteria?',
    choices: [
      'Cephalosporins inhibit bacterial cell-wall synthesis',
      'Cephalosporins inhibit bacterial DNA replication',
      'Cephalosporins have a β-lactam ring that binds penicillin-binding proteins to inhibit cell-wall cross-linking',
      'Cephalosporins inhibit bacterial protein synthesis at the 50S ribosome',
    ],
    correctIndex: 2,
    rationale: 'The β-lactam ring binds PBPs, blocking peptidoglycan cross-linking → bacterial lysis. Statement A is also true at a higher level; C is the most precise mechanism.',
  },
  {
    id: 'pp-088',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'A patient on cephalexin develops fever 102.2°F, frequent watery stools and abdominal cramps; C. difficile colitis is suspected. Which CBC finding would support this diagnosis?',
    choices: [
      'Low platelet count',
      'Elevated red blood cell count',
      'Low haemoglobin',
      'Elevated white blood cell count',
    ],
    correctIndex: 3,
    rationale: 'Pseudomembranous colitis (C. diff) typically produces a markedly elevated WBC count, often with left shift.',
  },
  {
    id: 'pp-089',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Which is a gram-positive infection that fluoroquinolones can treat?',
    choices: ['Pseudomonas aeruginosa', 'Salmonella', 'Neisseria gonorrhoeae', 'Streptococcus pneumoniae'],
    correctIndex: 3,
    rationale: 'Newer respiratory fluoroquinolones (levofloxacin, moxifloxacin) have enhanced gram-positive coverage including S. pneumoniae.',
  },
  {
    id: 'pp-090',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Which medication is a fluoroquinolone?',
    choices: ['Streptomycin', 'Azithromycin', 'Moxifloxacin', 'Fidaxomicin'],
    correctIndex: 2,
    rationale: 'Fluoroquinolones end in "-floxacin" (ciprofloxacin, levofloxacin, moxifloxacin). Streptomycin = aminoglycoside; azithromycin = macrolide; fidaxomicin = macrocyclic for C. diff.',
  },
  {
    id: 'pp-091',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'Fluoroquinolones mainly target the enzyme ____________ in gram-negative bacteria.',
    choices: ['Helicase', 'DNA gyrase', 'Topoisomerase IV', 'DNA polymerase'],
    correctIndex: 1,
    rationale: 'In gram-negative bacteria the primary target is DNA gyrase (topoisomerase II); in gram-positives the primary target is topoisomerase IV.',
  },

  // ---- "BECAUSE" (Assertion-Reason) items ----
  // Answer key: A = both true; B = 1st T / 2nd F; C = 1st F / 2nd T; D = both false.
  {
    id: 'pp-tf-01',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: Magnesium-containing antacids are NOT effective in healing peptic ulcers. BECAUSE STATEMENT 2: Antacids containing magnesium salts cause diarrhoea.\nSelect: A (both true), B (1st T / 2nd F), C (1st F / 2nd T), D (both false).',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 2,
    rationale: 'Mg-containing antacids ARE effective in PUD (statement 1 is false). Mg salts DO cause osmotic diarrhoea (statement 2 is true). Answer C.',
  },
  {
    id: 'pp-tf-02',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: Histamine acts on H1 receptors on parietal cells to stimulate acid secretion. BECAUSE STATEMENT 2: H1 receptors can be blocked by ranitidine.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 3,
    rationale: 'Histamine stimulates acid secretion via H2 (not H1) receptors. Ranitidine is an H2 blocker (not H1). Both false → D.',
  },
  {
    id: 'pp-tf-03',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: PGE2 promotes cervical ripening. BECAUSE STATEMENT 2: PGE2 inactivates collagenase, the enzyme that breaks down the collagen network of the cervix.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 1,
    rationale: 'PGE2 does ripen the cervix (S1 true), but it ACTIVATES collagenase (matrix metalloproteinases) — it does NOT inactivate them (S2 false). Answer B.',
  },
  {
    id: 'pp-tf-04',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: PGE2 has a powerful oxytocic effect ONLY during term. BECAUSE STATEMENT 2: PGE2 can be used independently for induction of abortion.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 2,
    rationale: 'PGE2 has uterotonic action throughout pregnancy, not only at term (S1 false). It IS used independently for abortion induction (S2 true). Answer C.',
  },
  {
    id: 'pp-tf-05',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: Dinoprostone can be used to PROLONG the duration of labour. BECAUSE STATEMENT 2: Dinoprostone usage allows an increase in oxytocin dosage.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 3,
    rationale: 'Dinoprostone INDUCES / ripens for labour (S1 false). Its use generally REDUCES the oxytocin dose required (S2 false). Answer D.',
  },
  {
    id: 'pp-tf-06',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: Analgesics are drugs that relieve pain. BECAUSE STATEMENT 2: Analgesics relieve pain by causing loss of consciousness.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 1,
    rationale: 'Analgesics relieve pain WITHOUT loss of consciousness (that is anaesthesia). S1 true, S2 false. Answer B.',
  },
  {
    id: 'pp-tf-07',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: "Opioid" applies to any substance — endogenous or synthetic — that produces morphine-like effects. BECAUSE STATEMENT 2: Opioids act by BLOCKING opioid receptors in the brain.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 1,
    rationale: 'The term "opioid" applies broadly (S1 true), but opioids ACTIVATE (agonise) opioid receptors — they do not block them (S2 false). Answer B.',
  },
  {
    id: 'pp-tf-08',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: Aδ fibres carry pain information slowly to the brain. BECAUSE STATEMENT 2: Aδ fibres are unmyelinated.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 3,
    rationale: 'Aδ fibres are thinly MYELINATED and conduct sharp, FAST pain. C fibres are unmyelinated and slow. Both statements false → D.',
  },
  {
    id: 'pp-tf-09',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: Morphine can be used to treat diarrhoea. BECAUSE STATEMENT 2: Morphine INCREASES smooth-muscle motility in the gut.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 1,
    rationale: 'Morphine (and loperamide) treat diarrhoea by SLOWING peristalsis (S1 true, S2 false). Answer B.',
  },
  {
    id: 'pp-tf-10',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: Morphine-like drugs INCREASE blood pressure by blunting the baroreceptor reflex and constricting peripheral vessels. BECAUSE STATEMENT 2: Morphine-like drugs induce histamine release, which causes peripheral vasoconstriction.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 3,
    rationale: 'Morphine LOWERS blood pressure (via venodilation and histamine-mediated vasodilation). Histamine causes vasoDILATION, not constriction. Both false → D.',
  },
  {
    id: 'pp-tf-11',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: PGF2α analogues are used to induce labour at term. BECAUSE STATEMENT 2: PGF2α causes contraction of uterine smooth muscle in pregnant women.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 0,
    rationale: 'Both statements are true — PGF2α (carboprost) is a uterotonic used in induction and PPH. Answer A.',
  },
  {
    id: 'pp-tf-12',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: ALL antibiotics work only by inhibiting biosynthesis of bacterial cell wall. BECAUSE STATEMENT 2: Antibiotics are only designed to stop the growth of bacteria.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 3,
    rationale: 'Antibiotics use many different mechanisms (protein synthesis, DNA, folate metabolism, membrane disruption). Many are bactericidal (kill), not merely bacteriostatic. Both false → D.',
  },
  {
    id: 'pp-tf-13',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: Terbutaline can be used in the management of pre-mature labour. BECAUSE STATEMENT 2: Terbutaline is a β2 ANTAGONIST that causes uterine contractions.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 1,
    rationale: 'Terbutaline is used as a tocolytic (S1 true), but it is a β2 AGONIST that RELAXES uterine smooth muscle (S2 false). Answer B.',
  },
  {
    id: 'pp-tf-14',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: Tocolytics decrease uterine contractility/motility. BECAUSE STATEMENT 2: Tocolytics are used to augment labour.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 1,
    rationale: 'Tocolytics DECREASE uterine activity (S1 true) — they DELAY rather than augment labour (S2 false). Answer B.',
  },
  {
    id: 'pp-tf-15',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: Cimetidine can potentiate the effects of other drugs by inhibiting cytochrome P450 enzymes. BECAUSE STATEMENT 2: Cimetidine reduces gastric acid secretion by MORE than 90%.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 1,
    rationale: 'Cimetidine is a well-known CYP inhibitor (S1 true). But it reduces acid secretion by ~70% — the ">90%" figure is more typical of PPIs (S2 false). Answer B.',
  },
  {
    id: 'pp-tf-16',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: Omeprazole is a pro-drug. BECAUSE STATEMENT 2: Omeprazole is a REVERSIBLE proton pump inhibitor.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 1,
    rationale: 'Omeprazole is a pro-drug activated in acidic parietal-cell canaliculi (S1 true), but it binds the H+/K+-ATPase IRREVERSIBLY (S2 false). Answer B.',
  },
  {
    id: 'pp-tf-17',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: Misoprostol causes constipation. BECAUSE STATEMENT 2: Misoprostol is a prostaglandin INHIBITOR.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 3,
    rationale: 'Misoprostol causes DIARRHOEA (not constipation), and it IS a prostaglandin (PGE1) ANALOGUE, not an inhibitor. Both false → D.',
  },
  {
    id: 'pp-tf-18',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: Metoclopramide increases the rate of gastric emptying. BECAUSE STATEMENT 2: Metoclopramide has an anti-emetic property.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 0,
    rationale: 'Both statements are true. Metoclopramide is a prokinetic AND an anti-emetic via central D2 antagonism. Answer A.',
  },
  {
    id: 'pp-tf-19',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: Omeprazole inhibits the cytochrome P450 system in the liver. BECAUSE STATEMENT 2: Omeprazole is a proton pump ENHANCER.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 1,
    rationale: 'Omeprazole is a CYP2C19/3A4 inhibitor (S1 true), but it is a proton pump INHIBITOR, NOT enhancer (S2 false). Answer B.',
  },
  {
    id: 'pp-tf-20',
    topic: 'pastPaper',
    type: 'mcq',
    prompt: 'STATEMENT 1: Tocolytics can be used in the case of intra-uterine death of foetus. BECAUSE STATEMENT 2: Tocolytics decrease uterine contractility/motility.',
    choices: ['A — Both true', 'B — 1st true, 2nd false', 'C — 1st false, 2nd true', 'D — Both false'],
    correctIndex: 2,
    rationale: 'Intra-uterine fetal death is an INDICATION FOR INDUCTION, not tocolysis (S1 false). Tocolytics do reduce uterine contractility (S2 true). Answer C.',
  },
];

// ---------- helpers ----------
export function getQuestionCountByTopic(): Record<PharmTopic, number> {
  const counts = {} as Record<PharmTopic, number>;
  (Object.keys(PHARM_TOPIC_LABELS) as PharmTopic[]).forEach((t) => (counts[t] = 0));
  pharmacologyQuestions.forEach((q) => {
    counts[q.topic] = (counts[q.topic] ?? 0) + 1;
  });
  return counts;
}

export function getQuestionsByTopics(topics: PharmTopic[], n: number): PharmQuestion[] {
  const pool = pharmacologyQuestions.filter((q) => topics.includes(q.topic));
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(n, shuffled.length));
}
