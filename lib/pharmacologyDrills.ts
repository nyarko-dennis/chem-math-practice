import { PharmTopic } from './pharmacologyQuestions';

export interface RubricPoint {
  id: string;
  label: string;
  detail: string;
  marks: number;
}

export type PharmDrillKind =
  | 'defineTerms'           // Define pharmacology terms
  | 'compareConcepts'       // Compare/contrast two pharmacologic concepts
  | 'mechanismOfAction'     // Explain MoA of a drug or drug class
  | 'adverseEffects'        // Outline adverse effects with rationale
  | 'patientCounselling'    // Write patient-counselling points
  | 'caseManagement'        // Manage a clinical scenario / overdose
  | 'fiveRights'            // Apply the Five Rights / safe administration
  | 'drugCalc';             // Drug dosage / IV calculation

export const PHARM_DRILL_LABELS: Record<PharmDrillKind, string> = {
  defineTerms: 'Define key pharmacology terms',
  compareConcepts: 'Compare / contrast pharmacologic concepts',
  mechanismOfAction: 'Explain mechanism of action (MoA)',
  adverseEffects: 'Outline adverse effects & mechanisms',
  patientCounselling: 'Patient counselling / discharge teaching',
  caseManagement: 'Clinical case management (e.g., overdose)',
  fiveRights: 'Apply the Five Rights of medication administration',
  drugCalc: 'Drug dosage / IV calculation',
};

export interface PharmDrill {
  id: string;
  topic: PharmTopic;
  drillKind: PharmDrillKind;
  type: 'drill';
  prompt: string;
  marks: number;
  rubric: RubricPoint[];
  modelAnswer: string;
  referenceSections: string[];
}

export const pharmacologyDrills: PharmDrill[] = [
  // ---------- DEFINE TERMS ----------
  {
    id: 'drl-001',
    topic: 'principles',
    drillKind: 'defineTerms',
    type: 'drill',
    prompt:
      'Define the following pharmacology terms in your own words and give ONE example for each:\n' +
      '(a) Drug\n(b) Medicine\n(c) Pharmacokinetics\n(d) Pharmacodynamics\n(e) Therapeutic index',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Drug — defined correctly with example',
        detail:
          'Any chemical that affects living processes (xenobiotic). Examples: aspirin, nicotine, alcohol, insulin.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Medicine — defined correctly with example',
        detail:
          'A chemical preparation containing one or more drugs in proper dosage form for safe administration to produce a therapeutic effect. Example: paracetamol 500 mg tablet.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Pharmacokinetics — defined with ADME mention',
        detail:
          'What the body does to the drug. The four processes are Absorption, Distribution, Metabolism, Excretion (ADME). Example: oral nitroglycerin undergoing extensive first-pass metabolism.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Pharmacodynamics — defined with example',
        detail:
          'What the drug does to the body — effects on target receptors/enzymes and resulting physiological response. Example: morphine binding to μ-opioid receptors to produce analgesia.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Therapeutic index — defined with example',
        detail:
          'TI = TD50 / ED50 (ratio of toxic to effective dose in 50% of population). Narrow-TI drugs (e.g., digoxin, warfarin, theophylline, lithium) need plasma-level monitoring.',
        marks: 2,
      },
    ],
    modelAnswer:
      '(a) Drug: any chemical that affects living processes (e.g., aspirin, nicotine).\n' +
      '(b) Medicine: a chemical preparation containing one or more drugs in a proper dosage form used in treatment, prevention, or diagnosis (e.g., paracetamol 500 mg tablet). All medicines are drugs but not all drugs are medicines.\n' +
      '(c) Pharmacokinetics: what the body does to the drug — the four ADME processes (Absorption, Distribution, Metabolism, Excretion). Example: sublingual nitroglycerin bypasses first-pass metabolism, giving fast onset.\n' +
      '(d) Pharmacodynamics: what the drug does to the body — the molecular interaction with receptors, enzymes or ion channels and the resulting response. Example: morphine activating μ-opioid receptors → analgesia, respiratory depression.\n' +
      '(e) Therapeutic Index (TI): the ratio TD50 / ED50. A drug with a narrow TI (digoxin, warfarin, theophylline, lithium) has a small margin between effective and toxic doses and needs careful monitoring.',
    referenceSections: ['Principles of Pharmacology', 'Basic Definitions'],
  },

  {
    id: 'drl-002',
    topic: 'pharmacokinetics',
    drillKind: 'defineTerms',
    type: 'drill',
    prompt:
      'Define the following pharmacokinetic terms and explain their clinical importance:\n' +
      '(a) Bioavailability (F)\n(b) Volume of distribution (Vd)\n(c) Half-life (t½)\n(d) First-pass metabolism\n(e) Ion trapping',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Bioavailability',
        detail:
          'Fraction (and rate) of an administered dose that reaches systemic circulation in active form. IV = 100%; oral usually <100% due to incomplete absorption and first-pass metabolism. Used to determine dose adjustment between routes.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Volume of distribution',
        detail:
          'Apparent volume into which a drug distributes to give the observed plasma concentration (Vd = dose / plasma conc.). Large Vd → extensive tissue binding (lipid-soluble drugs); small Vd → confined to plasma. Guides loading-dose calculation.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Half-life',
        detail:
          'Time for plasma concentration to fall to half its value. Determines dosing interval and time to steady state (~4–5 half-lives). Short t½ → frequent dosing; long t½ → risk of accumulation.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'First-pass metabolism',
        detail:
          'Hepatic (and gut-wall) metabolism of an orally absorbed drug BEFORE it reaches systemic circulation. Reduces bioavailability of drugs like nitroglycerin, propranolol, morphine — alternative routes (SL, IV, transdermal, rectal) bypass it.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Ion trapping',
        detail:
          'In a compartment of differing pH, the ionised (charged) fraction of a weak acid/base cannot cross membranes and accumulates. Used clinically: alkalinise urine with bicarbonate in aspirin overdose to trap salicylate in urine and speed excretion.',
        marks: 2,
      },
    ],
    modelAnswer:
      '(a) Bioavailability (F): fraction of an administered dose reaching systemic circulation in active form. IV F = 1. Oral F is reduced by incomplete absorption and first-pass metabolism. Used to convert between routes.\n' +
      '(b) Volume of distribution (Vd): apparent volume needed to contain the total amount of drug at the observed plasma concentration. Large Vd suggests extensive tissue/protein binding; small Vd suggests confinement to plasma. Used to calculate loading doses.\n' +
      '(c) Half-life (t½): time for plasma concentration to halve. Steady state reached in ~4–5 t½; t½ guides dosing interval.\n' +
      '(d) First-pass metabolism: hepatic and intestinal metabolism of orally absorbed drug before systemic exposure. Drugs with extensive first-pass (e.g., nitroglycerin, propranolol, morphine) are given by alternative routes for higher bioavailability.\n' +
      '(e) Ion trapping: pH-dependent partitioning where the ionised form of a weak acid or base cannot cross membranes and is "trapped". Practical use: alkalinising urine with sodium bicarbonate to enhance salicylate elimination in aspirin overdose.',
    referenceSections: ['Pharmacokinetics', 'Ion Trapping', 'Bioavailability'],
  },

  // ---------- COMPARE / CONTRAST ----------
  {
    id: 'drl-003',
    topic: 'pharmacodynamics',
    drillKind: 'compareConcepts',
    type: 'drill',
    prompt:
      'In a clear table OR labelled paragraphs, compare and contrast:\n' +
      '(a) Agonist vs Antagonist\n(b) Competitive vs Noncompetitive antagonist\n(c) Potency vs Efficacy',
    marks: 9,
    rubric: [
      {
        id: 'r1',
        label: 'Agonist vs Antagonist',
        detail:
          'Agonist: binds receptor AND has intrinsic activity → response. Antagonist: binds receptor with NO intrinsic activity → blocks agonist. Mention partial agonist as a half-way case.',
        marks: 3,
      },
      {
        id: 'r2',
        label: 'Competitive vs Noncompetitive antagonist',
        detail:
          'Competitive (reversible) — binds same site, can be overcome by raising agonist dose, shifts dose-response curve RIGHT, no change in maximal response. Noncompetitive (irreversible / allosteric) — cannot be overcome by more agonist, REDUCES maximal response.',
        marks: 3,
      },
      {
        id: 'r3',
        label: 'Potency vs Efficacy',
        detail:
          'Potency: dose required to produce a given effect (lower ED50 = more potent — affects LOCATION of curve on x-axis). Efficacy: maximum response a drug can produce (ceiling — affects HEIGHT of curve). High potency does not mean high efficacy.',
        marks: 3,
      },
    ],
    modelAnswer:
      '(a) Agonist vs Antagonist:\n  • Agonist binds the receptor and activates it (has affinity AND intrinsic activity). E.g., adrenaline at β1.\n  • Antagonist binds the receptor but produces no response (affinity, no intrinsic activity). It blocks endogenous or exogenous agonists. E.g., propranolol at β1.\n  • A partial agonist binds and activates the receptor but with submaximal effect even at full occupancy.\n\n(b) Competitive vs Noncompetitive antagonist:\n  • Competitive: binds the same (active) site as the agonist. Effect is reversible/surmountable — raising the agonist dose restores maximal response. Shifts the dose-response curve rightward with no change in Emax.\n  • Noncompetitive: binds an allosteric site OR forms a covalent / irreversible bond. Not overcome by raising agonist dose; reduces the maximal response (Emax falls).\n\n(c) Potency vs Efficacy:\n  • Potency = the dose needed for a given response (a function of affinity). A potent drug works at lower doses (lower ED50).\n  • Efficacy = the maximum effect achievable by a drug (a function of intrinsic activity). A high-efficacy drug can produce a full response if dose is adequate.\n  • Clinical relevance: morphine and codeine are both μ-agonists, but morphine has higher efficacy; furosemide is more efficacious than hydrochlorothiazide in heart failure.',
    referenceSections: ['Pharmacodynamics', 'Drug-Receptor Interactions'],
  },

  {
    id: 'drl-004',
    topic: 'pharmacokinetics',
    drillKind: 'compareConcepts',
    type: 'drill',
    prompt:
      'Compare the four processes of pharmacokinetics (A-D-M-E) by completing each of the following:\n' +
      '• What does the process involve?\n• Major organs/sites involved.\n• ONE clinical implication.',
    marks: 8,
    rubric: [
      {
        id: 'r1',
        label: 'Absorption',
        detail:
          'Movement of drug from site of administration into circulation. Sites depend on route (GIT for oral, alveoli for inhaled, skin for transdermal). Clinical: food may delay absorption (e.g., captopril); first-pass effect reduces oral bioavailability.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Distribution',
        detail:
          'Movement of drug from blood to tissues; influenced by blood flow, lipid solubility, protein binding, tissue mass. Clinical: hypoalbuminaemia raises free fraction of highly bound drugs (warfarin, phenytoin) → toxicity risk.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Metabolism',
        detail:
          'Biotransformation to more water-soluble metabolites for excretion (Phase I: oxidation/reduction/hydrolysis by CYP450; Phase II: conjugation). Primary site: liver. Clinical: enzyme inducers (rifampicin) or inhibitors (cimetidine) cause major interactions.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Excretion',
        detail:
          'Removal of drug/metabolites from body; mainly renal (glomerular filtration, tubular secretion). Other routes: bile, lung, sweat, breast milk. Clinical: dose-reduce renally cleared drugs (gentamicin, digoxin) in CKD.',
        marks: 2,
      },
    ],
    modelAnswer:
      'Absorption — movement of drug from site of administration into the bloodstream. Major sites: small intestine (oral), alveoli (inhaled), skin (transdermal). Clinical implication: extensive first-pass metabolism of an oral drug lowers bioavailability; switching to IV or sublingual gives larger systemic exposure (e.g., nitroglycerin).\n\n' +
      'Distribution — drug movement from plasma into tissues. Determined by regional blood flow, lipid solubility, plasma-protein binding and tissue binding. Clinical implication: a patient with hypoalbuminaemia has a larger free fraction of highly bound drugs (warfarin, phenytoin), risking toxicity at usual total doses.\n\n' +
      'Metabolism (biotransformation) — chemical alteration of the drug, mainly in the liver, via Phase I (oxidation/reduction/hydrolysis, often CYP-mediated) and Phase II (conjugation with glucuronic acid, sulfate, glutathione). Clinical implication: drug interactions — rifampicin induces CYP3A4 and shortens the action of contraceptive pills; cimetidine inhibits CYP enzymes and raises warfarin levels.\n\n' +
      'Excretion — removal of unchanged drug or metabolites, principally via the kidneys (filtration + tubular secretion). Minor routes: bile, faeces, lung, breast milk, sweat. Clinical implication: dose adjustment for renally cleared drugs (e.g., gentamicin, digoxin) in renal impairment to avoid toxicity.',
    referenceSections: ['ADME', 'Drug Absorption', 'Drug Excretion'],
  },

  // ---------- MECHANISM OF ACTION ----------
  {
    id: 'drl-005',
    topic: 'antihypertensives',
    drillKind: 'mechanismOfAction',
    type: 'drill',
    prompt:
      'Explain how the renin-angiotensin-aldosterone system (RAAS) regulates blood pressure, then describe HOW the following antihypertensives interrupt the system: (a) ACE inhibitors (e.g., lisinopril); (b) Angiotensin receptor blockers (e.g., losartan); (c) Aldosterone antagonists (e.g., spironolactone).',
    marks: 9,
    rubric: [
      {
        id: 'r1',
        label: 'RAAS overview',
        detail:
          'Drop in renal perfusion → renin from juxtaglomerular cells → angiotensinogen (liver) cleaved to Ang I → ACE (lung endothelium) converts Ang I → Ang II → potent vasoconstriction + aldosterone release (Na/H2O retention) → ↑BP.',
        marks: 3,
      },
      {
        id: 'r2',
        label: 'ACE inhibitors',
        detail:
          'Block ACE → less Ang II → vasodilation, ↓aldosterone (↓Na/H2O retention). Also reduce bradykinin breakdown → vasodilation but also dry cough/angioedema. Useful in HTN, HF, diabetic nephropathy. Avoid in pregnancy and bilateral renal artery stenosis.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'ARBs',
        detail:
          'Block AT1 receptor → similar BP-lowering and end-organ benefits to ACE-I, without affecting bradykinin (less cough). Same pregnancy and renovascular contraindications.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Aldosterone antagonists',
        detail:
          'Competitively block mineralocorticoid receptor in collecting tubule → ↓Na/H2O reabsorption, K+ sparing. Used in resistant HTN, HF, hyperaldosteronism. Risk: hyperkalaemia (especially with ACE-I/ARB).',
        marks: 2,
      },
    ],
    modelAnswer:
      'The RAAS is a hormonal cascade that defends blood pressure and circulating volume. When renal perfusion falls (or sympathetic tone rises), juxtaglomerular cells release RENIN, which cleaves liver-derived angiotensinogen to angiotensin I. ANGIOTENSIN-CONVERTING ENZYME (ACE) on pulmonary endothelium then converts Ang I to angiotensin II — the body’s most potent circulating vasoconstrictor. Ang II raises BP directly by vasoconstriction (AT1 receptors on vascular smooth muscle) and indirectly by stimulating aldosterone release from the adrenal cortex, causing renal Na+/H2O retention.\n\n' +
      '(a) ACE inhibitors (e.g., lisinopril, captopril, enalapril) block ACE → less Ang II → vasodilation, reduced aldosterone, less Na/H2O retention. They also reduce the breakdown of bradykinin (a vasodilator), which explains both extra BP benefit and the typical dry cough and angioedema. They are first-line in hypertension with diabetes/CKD, heart failure with reduced EF, and after MI. Avoid in pregnancy and bilateral renal artery stenosis.\n\n' +
      '(b) ARBs (e.g., losartan, valsartan) competitively block the AT1 receptor downstream of ACE. They give equivalent BP and end-organ benefit without raising bradykinin, so cough and angioedema are much less common. Pregnancy and renovascular contraindications still apply.\n\n' +
      '(c) Aldosterone antagonists (e.g., spironolactone, eplerenone) competitively block mineralocorticoid receptors in the collecting tubule, reducing Na+/H2O reabsorption and sparing K+. Used in resistant hypertension, heart failure (mortality benefit) and primary hyperaldosteronism. Major risk: hyperkalaemia, especially when combined with ACE-I/ARB or in renal impairment.',
    referenceSections: ['Antihypertensives', 'RAAS'],
  },

  {
    id: 'drl-006',
    topic: 'opioids',
    drillKind: 'mechanismOfAction',
    type: 'drill',
    prompt:
      'Describe the mechanism of action of morphine. In your answer mention (a) the principal receptor type and intracellular signalling, (b) sites of action, and (c) the major therapeutic and adverse effects that follow from this mechanism.',
    marks: 8,
    rubric: [
      {
        id: 'r1',
        label: 'Receptor and signalling',
        detail:
          'Mu (μ) opioid receptors (also kappa and delta to lesser extent). Gi/Go coupled → ↓adenylate cyclase → ↓cAMP, increased K+ efflux (hyperpolarisation) and decreased Ca2+ entry → reduced neurotransmitter release.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Sites of action',
        detail:
          'Central: spinal cord dorsal horn, PAG, thalamus, limbic system, brainstem respiratory centre. Peripheral: GI tract, bladder, biliary tree. Acts at both pre- and post-synaptic sites.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Therapeutic effects',
        detail:
          'Analgesia (raised threshold + altered emotional response), anxiolysis/euphoria, anti-tussive (codeine), reduced preload in acute LV failure (venodilation), suppression of severe diarrhoea (loperamide structurally related).',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Adverse effects',
        detail:
          'Respiratory depression (dose-limiting), miosis (Edinger-Westphal stimulation), constipation, urinary retention, nausea/vomiting, histamine release (pruritus, hypotension), tolerance, physical dependence and withdrawal.',
        marks: 2,
      },
    ],
    modelAnswer:
      'Morphine acts principally at MU (μ) opioid receptors (with secondary kappa/delta activity). These are G-protein–coupled (Gi/Go) receptors found pre- and post-synaptically on pain-transmitting neurons. Activation → inhibition of adenylate cyclase (↓cAMP), increased K+ efflux causing hyperpolarisation, and reduced Ca2+ entry at nerve terminals. The net effect is suppressed release of nociceptive neurotransmitters (substance P, glutamate, CGRP) and reduced post-synaptic excitability.\n\n' +
      'Sites of action include the spinal cord dorsal horn (substantia gelatinosa — interrupts ascending pain), periaqueductal grey and rostral ventromedial medulla (activates descending inhibition), thalamus, limbic system (alters the emotional reaction to pain), and the medullary respiratory and cough centres. Peripherally, μ receptors in the GI tract, biliary tree and bladder also contribute to effects.\n\n' +
      'Therapeutic effects: profound analgesia for severe acute and chronic pain, anxiolysis/euphoria, antitussive action (codeine), reduction in preload and dyspnoea in acute pulmonary oedema (venodilation), and antidiarrhoeal effect of loperamide (a peripherally restricted μ-agonist).\n\n' +
      'Adverse effects flow directly from the receptor distribution: respiratory depression (dose-limiting), miosis (parasympathetic outflow via Edinger-Westphal), constipation (gut μ-receptors), urinary retention, nausea/vomiting (CTZ stimulation), histamine release (pruritus, hypotension), tolerance and physical dependence with characteristic withdrawal (yawning, lacrimation, GI cramps, agitation) on abrupt cessation. Naloxone is the specific competitive antidote.',
    referenceSections: ['Opioid Analgesics', 'Morphine', 'Naloxone'],
  },

  {
    id: 'drl-007',
    topic: 'nsaids',
    drillKind: 'mechanismOfAction',
    type: 'drill',
    prompt:
      'Explain the mechanism of action of aspirin and other NSAIDs. In your answer, contrast COX-1 and COX-2, and explain WHY: (i) aspirin gives long-lasting anti-platelet effect; (ii) COX-2 selective drugs (coxibs) cause fewer GI ulcers but may increase thrombotic risk.',
    marks: 8,
    rubric: [
      {
        id: 'r1',
        label: 'Basic mechanism',
        detail:
          'NSAIDs inhibit cyclo-oxygenase (COX), preventing conversion of arachidonic acid to prostaglandins, prostacyclin (PGI2) and thromboxane (TXA2). Reduced PGs → ↓inflammation, ↓pain (peripheral sensitisation), ↓fever (hypothalamic set-point), ↓platelet aggregation (TXA2).',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'COX-1 vs COX-2',
        detail:
          'COX-1 (constitutive, "housekeeping") protects gastric mucosa, supports renal blood flow, promotes platelet aggregation. COX-2 (mainly inducible at inflammation sites) mediates inflammation, fever, pain — also constitutive in kidney/endothelium for PGI2.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Aspirin and platelets',
        detail:
          'Aspirin IRREVERSIBLY acetylates platelet COX-1. Platelets are anucleate so cannot resynthesise COX → effect persists for the platelet lifespan (7–10 days). Must stop ~7 days before elective surgery.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Coxib GI safety / CV risk',
        detail:
          'Coxibs spare gastric COX-1 → fewer ulcers. BUT in endothelium they reduce PGI2 (vasodilator, anti-platelet) while leaving platelet TXA2 intact → pro-thrombotic shift, increased MI/stroke risk especially with high doses or long duration.',
        marks: 2,
      },
    ],
    modelAnswer:
      'NSAIDs inhibit cyclo-oxygenase (COX), the enzyme that converts arachidonic acid to prostaglandins (PGE2, PGI2) and thromboxane (TXA2). By reducing these mediators NSAIDs produce analgesia (less peripheral sensitisation by PGE2), antipyresis (lowering the hypothalamic temperature set-point), anti-inflammatory effects, and inhibition of platelet aggregation (less TXA2).\n\n' +
      'Two COX isoforms exist. COX-1 is constitutive ("housekeeping") and produces PGs that protect gastric mucosa, support renal blood flow via afferent arteriolar dilatation, and trigger platelet aggregation through TXA2. COX-2 is largely inducible at sites of tissue injury and mediates inflammation, pain and fever (it is also constitutively expressed in kidney, brain and vascular endothelium where it generates the vasodilator/anti-platelet PGI2).\n\n' +
      '(i) Aspirin is unique because it covalently ACETYLATES Ser529 of platelet COX-1, producing IRREVERSIBLE inhibition. Platelets are anucleate and cannot synthesise new COX, so the anti-platelet effect persists for the life of the platelet (7–10 days). This explains both its cardiovascular protective dose (75–100 mg/day) and the requirement to stop aspirin ~7 days before elective surgery.\n\n' +
      '(ii) Coxibs (celecoxib, etoricoxib) selectively inhibit COX-2 → fewer gastric ulcers because gastric COX-1 and the protective PGE2 are spared. However, in the vascular endothelium COX-2 makes PGI2 (vasodilator, anti-platelet). Inhibiting endothelial COX-2 while leaving platelet COX-1 intact shifts the haemostatic balance toward thrombosis — increasing the risk of MI and stroke, especially with high doses, long duration or pre-existing CV disease. Choose the lowest effective dose for the shortest duration; avoid in patients with established cardiovascular disease.',
    referenceSections: ['NSAIDs', 'COX-1/COX-2'],
  },

  {
    id: 'drl-008',
    topic: 'respiratory',
    drillKind: 'mechanismOfAction',
    type: 'drill',
    prompt:
      'A 24-year-old has moderate persistent asthma. Outline the mechanism of action of (a) salbutamol, (b) ipratropium, (c) an inhaled corticosteroid (e.g., beclomethasone) and (d) montelukast. Explain WHICH belongs to "reliever" vs "controller" therapy.',
    marks: 8,
    rubric: [
      {
        id: 'r1',
        label: 'Salbutamol',
        detail:
          'Selective short-acting β2 agonist → Gs → ↑cAMP → relaxation of bronchial smooth muscle. RELIEVER (fast onset, short duration). Adverse: tremor, tachycardia, hypokalaemia at high dose.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Ipratropium',
        detail:
          'Short-acting muscarinic antagonist (M3 in airways). Blocks vagal cholinergic bronchoconstriction. Useful in COPD and as add-on in acute severe asthma. Adverse: dry mouth, urinary retention.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Inhaled corticosteroid',
        detail:
          'Bind cytoplasmic glucocorticoid receptors → translocate to nucleus → suppress inflammatory gene transcription (cytokines, COX-2), upregulate β2 receptors. CONTROLLER — slow onset (days–weeks). Mouth rinse to prevent oral candidiasis; risk of HPA suppression with chronic high dose.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Montelukast',
        detail:
          'CysLT1 receptor antagonist → blocks leukotriene-mediated bronchoconstriction, mucus secretion and inflammation. CONTROLLER — useful in aspirin-sensitive or exercise-induced asthma. Watch neuropsychiatric side effects.',
        marks: 2,
      },
    ],
    modelAnswer:
      '(a) Salbutamol is a selective short-acting β2-AGONIST (SABA). β2 receptors couple via Gs → activation of adenylate cyclase → rise in intracellular cAMP → relaxation of bronchial smooth muscle within minutes. It is a RELIEVER/rescue medication for acute symptoms. Adverse effects include tremor, tachycardia/palpitations and hypokalaemia at high systemic dose.\n\n' +
      '(b) Ipratropium is a short-acting muscarinic ANTAGONIST that blocks airway M3 receptors, removing vagally driven bronchoconstriction. Useful as add-on in acute severe asthma and as a mainstay bronchodilator in COPD (long-acting equivalent: tiotropium, once daily). Adverse effects are mainly anticholinergic: dry mouth, urinary retention, blurred vision.\n\n' +
      '(c) Beclomethasone (or budesonide, fluticasone) is an inhaled CORTICOSTEROID. It enters the cell, binds cytoplasmic glucocorticoid receptors and the complex translocates to the nucleus where it suppresses transcription of pro-inflammatory genes (IL-4, IL-5, COX-2) and upregulates β2 receptors. The result is a sustained reduction in airway inflammation and hyper-responsiveness. ICS is the cornerstone CONTROLLER therapy; effects appear over days to weeks. Patients must rinse the mouth after each dose to prevent oral candidiasis; prolonged high-dose use can suppress the HPA axis and reduce bone density.\n\n' +
      '(d) Montelukast is a competitive antagonist of the CysLT1 leukotriene receptor. It blocks leukotriene-mediated bronchoconstriction, mucosal oedema, mucus secretion and eosinophil recruitment. It is a CONTROLLER — particularly useful in exercise-induced and aspirin-sensitive asthma and in children. Important warning: neuropsychiatric adverse effects (mood change, sleep disturbance, nightmares).\n\n' +
      'Summary: Reliever = salbutamol (± ipratropium acutely). Controllers = ICS (mainstay) + LABA or montelukast as add-ons.',
    referenceSections: ['Respiratory Pharmacology', 'Asthma & COPD'],
  },

  // ---------- ADVERSE EFFECTS ----------
  {
    id: 'drl-009',
    topic: 'antianginal',
    drillKind: 'adverseEffects',
    type: 'drill',
    prompt:
      'A patient has been on sublingual nitroglycerin and a long-acting nitrate. List FIVE common adverse effects of nitrates, explain the underlying mechanism for each, and give ONE clinical management point for each.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Headache',
        detail:
          'Cerebral vasodilation from NO → throbbing headache. Manage: warn patient; usually tolerates with continued therapy; paracetamol for relief.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Orthostatic hypotension',
        detail:
          'Venodilation → ↓preload → ↓CO on standing. Manage: take dose seated, rise slowly, avoid alcohol; sit/lie if dizzy.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Reflex tachycardia',
        detail:
          'Baroreceptor reflex to BP drop activates sympathetic outflow. Manage: combine with β-blocker or non-DHP CCB if problematic.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Tolerance',
        detail:
          'Continuous exposure → loss of vasodilator response (oxidative injury to mitochondrial aldehyde dehydrogenase). Manage: provide ≥8 hour daily nitrate-free interval.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Severe hypotension with PDE5 inhibitors',
        detail:
          'Sildenafil/tadalafil potentiate cGMP → life-threatening BP drop. Manage: contraindicated within 24 h of PDE5 inhibitor (48 h for tadalafil).',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. HEADACHE — caused by nitric-oxide–mediated dilation of cerebral arteries; throbbing, frontal. Management: warn the patient that it usually resolves within a few days of regular use; paracetamol can be given; reduce dose if intolerable.\n\n' +
      '2. ORTHOSTATIC (POSTURAL) HYPOTENSION — pronounced venodilation reduces venous return and cardiac output when the patient stands. Management: instruct the patient to take sublingual nitrate seated, rise slowly, avoid alcohol, and sit or lie down if dizziness occurs.\n\n' +
      '3. REFLEX TACHYCARDIA — the abrupt drop in BP triggers a baroreceptor reflex that increases sympathetic outflow to the heart. Management: combining nitrate with a β-blocker (or a non-dihydropyridine CCB) blunts this reflex and provides complementary anti-anginal effect.\n\n' +
      '4. TOLERANCE — continuous nitrate exposure rapidly attenuates the vasodilator response, possibly due to oxidative injury to mitochondrial aldehyde dehydrogenase needed to release NO from nitrates. Management: schedule dosing to allow a daily nitrate-free interval of ≥8 hours (typically overnight); use short-acting nitrate or other antianginal during that gap if pain breaks through.\n\n' +
      '5. SEVERE HYPOTENSION WITH PDE5 INHIBITORS — sildenafil and tadalafil inhibit PDE5 and thus prolong cGMP-mediated vasodilation already produced by nitrates, risking life-threatening hypotension. Management: nitrates are contraindicated within 24 hours of sildenafil/vardenafil and 48 hours of tadalafil; document the exposure carefully before giving emergency nitrates.',
    referenceSections: ['Anti-Anginal Drugs', 'Organic Nitrates'],
  },

  {
    id: 'drl-010',
    topic: 'diuretics',
    drillKind: 'adverseEffects',
    type: 'drill',
    prompt:
      'A patient is started on furosemide for heart failure. Outline the major adverse effects you would monitor for in the FIRST WEEK of therapy, the mechanism behind each, and your nursing/monitoring response.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Hypokalaemia',
        detail:
          'Increased Na+ delivery to distal tubule → aldosterone-mediated K+ wasting. Monitor serum K+; replace; consider K-sparing diuretic; watch for digoxin toxicity.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Hypovolaemia / hypotension',
        detail:
          'Excess diuresis reduces preload and BP. Daily weights, BP/pulse (lying & standing), monitor urine output, adjust dose.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Hyponatraemia / metabolic alkalosis',
        detail:
          'Na+ loss > water loss; H+ loss; contraction alkalosis. Check Na+, HCO3-, restrict free water if needed.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Ototoxicity',
        detail:
          'High-dose IV / rapid infusion or coexisting aminoglycoside use → reversible deafness/tinnitus. Avoid rapid IV push; dilute and infuse slowly.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Hyperuricaemia / metabolic effects',
        detail:
          'Competes with urate at proximal tubule → ↑uric acid; can precipitate gout; also hyperglycaemia. Counsel; treat gout if symptomatic.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. HYPOKALAEMIA — furosemide increases distal Na+ delivery, driving aldosterone-mediated K+ secretion. Monitor U&Es at baseline and within a few days, give oral K+ supplements or add a K-sparing diuretic (e.g., spironolactone) if K+ falls below ~3.5 mmol/L. Hypokalaemia is dangerous in patients also on digoxin (precipitates toxicity).\n\n' +
      '2. HYPOVOLAEMIA AND HYPOTENSION — over-diuresis lowers preload and BP. Take daily weights, monitor lying/standing BP and pulse, urine output and fluid balance. Adjust dose down if BP drops or urine output is excessive; teach the patient to recognise dizziness on standing.\n\n' +
      '3. HYPONATRAEMIA AND METABOLIC ALKALOSIS — Na+ loss may exceed water loss; concurrent loss of H+ and Cl- in the distal nephron, plus volume contraction, causes a "contraction alkalosis". Check serum Na+ and HCO3-, restrict free water if hyponatraemic, and avoid combination with thiazides without caution.\n\n' +
      '4. OTOTOXICITY (tinnitus, reversible sensorineural deafness) — risk increases with high-dose IV bolus, rapid infusion, severe renal impairment, or co-administration with aminoglycosides. Dilute IV doses, infuse over at least 15–20 minutes for large doses, and avoid concurrent aminoglycosides where possible.\n\n' +
      '5. METABOLIC ABNORMALITIES — hyperuricaemia (can precipitate gout), hyperglycaemia and dyslipidaemia. Counsel patients with gout to report joint pain; check fasting glucose periodically; treat established gout with appropriate uric-acid lowering therapy.\n\n' +
      'Additional safety points: never give an IV push too rapidly; warn male patients about the rare risk of urinary retention with rapid diuresis in BPH; review concomitant nephrotoxic drugs (NSAIDs, aminoglycosides, ACE-I) to limit AKI risk.',
    referenceSections: ['Diuretics', 'Loop Diuretics', 'Furosemide'],
  },

  // ---------- PATIENT COUNSELLING ----------
  {
    id: 'drl-011',
    topic: 'principles',
    drillKind: 'patientCounselling',
    type: 'drill',
    prompt:
      'A patient newly started on warfarin needs discharge counselling. Write 6–8 structured counselling points covering: indication, dose timing, monitoring, dietary advice, drug interactions, bleeding precautions, and when to seek help.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Indication and how the drug works (brief)',
        detail:
          'Warfarin prevents new clots by reducing vitamin-K–dependent clotting factors (II, VII, IX, X) — does not dissolve existing clots.',
        marks: 1,
      },
      {
        id: 'r2',
        label: 'Dose timing and consistency',
        detail:
          'Take ONCE daily at the same time (usually evening so dose can be adjusted after morning INR). Do NOT double up on missed doses.',
        marks: 1,
      },
      {
        id: 'r3',
        label: 'INR monitoring',
        detail:
          'Regular INR blood tests — typically every few days initially, then weekly/monthly when stable. Target INR usually 2–3 (higher for some indications).',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Diet — vitamin K',
        detail:
          'Keep vitamin K (green leafy vegetables — kontomire/spinach, kale, broccoli) CONSISTENT, not avoided. Sudden increase can lower INR; sudden decrease can raise INR.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Drug & herbal interactions',
        detail:
          'Avoid OTC NSAIDs/aspirin and herbal products without checking. Antibiotics, antifungals, amiodarone potentiate warfarin; rifampicin, phenytoin reduce its effect.',
        marks: 1,
      },
      {
        id: 'r6',
        label: 'Bleeding precautions',
        detail:
          'Use soft toothbrush, electric razor; avoid contact sports; carry warning card/MedicAlert; inform dentists/other doctors before procedures.',
        marks: 2,
      },
      {
        id: 'r7',
        label: 'When to seek help',
        detail:
          'Unusual bleeding/bruising, pink/red/dark urine, black tarry stools, severe headache, fall, blood in vomit, planned pregnancy.',
        marks: 1,
      },
    ],
    modelAnswer:
      '1. PURPOSE: Warfarin prevents new blood clots from forming by reducing vitamin-K–dependent clotting factors (II, VII, IX, X). It does not dissolve clots that are already there.\n\n' +
      '2. DOSE TIMING: Take warfarin ONCE a day, at the SAME time every day (usually in the evening, so any dose change after the morning INR can be made the same day). If you miss a dose, take it as soon as you remember on the SAME day; never double up the next day. Keep a dose diary.\n\n' +
      '3. MONITORING: Warfarin works in a narrow window. The INR blood test will be checked frequently at the start (every few days), then weekly, then about every 4 weeks once stable. Target INR is usually 2.0–3.0 (higher for mechanical valves).\n\n' +
      '4. DIET: Vitamin K reverses warfarin. You do NOT have to avoid leafy greens (kontomire, spinach, kale, broccoli), but eat them in CONSISTENT amounts week to week. Sudden big increases will lower your INR; suddenly stopping them will raise it.\n\n' +
      '5. INTERACTIONS: Do NOT start any new medicine, herbal product, or pain reliever without checking — especially aspirin, ibuprofen and other NSAIDs (bleeding risk), antibiotics (amoxicillin, ciprofloxacin, metronidazole), antifungals, amiodarone (raise INR), and rifampicin or phenytoin (lower INR). Alcohol should be limited.\n\n' +
      '6. BLEEDING PRECAUTIONS: Use a soft toothbrush, electric razor, and gloves for gardening. Avoid contact sports. Always tell your dentist, surgeon and pharmacist that you are on warfarin BEFORE any procedure. Carry a warning card.\n\n' +
      '7. WHEN TO SEEK URGENT HELP: any unusual bruising, prolonged bleeding from cuts, bleeding gums, nosebleeds, pink/red or dark urine, black tarry stools, blood in vomit, severe headache, a fall (especially on the head), or if you become pregnant or plan to.',
    referenceSections: ['Anticoagulants', 'Patient Education'],
  },

  {
    id: 'drl-012',
    topic: 'respiratory',
    drillKind: 'patientCounselling',
    type: 'drill',
    prompt:
      'A teenager is newly prescribed an inhaled corticosteroid (beclomethasone) and a SABA (salbutamol) for moderate asthma. Write a brief counselling script (8–10 bullet points) covering: roles of each inhaler, technique, when to use each, rinsing, monitoring, side effects, and when to seek emergency help.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Role distinction — reliever vs controller',
        detail:
          'Salbutamol = RELIEVER (use when wheezing/breathless). Beclomethasone = CONTROLLER (every day even when well, prevents attacks).',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Inhaler technique',
        detail:
          'Shake → exhale fully → seal lips → slow deep breath while pressing canister → hold breath 10 s → exhale slowly. Use spacer if available.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Wait between puffs',
        detail:
          'If two puffs prescribed, wait ~1 minute between puffs for better distribution.',
        marks: 1,
      },
      {
        id: 'r4',
        label: 'Rinse mouth after ICS',
        detail:
          'Rinse mouth and gargle with water (spit it out) after each beclomethasone dose to prevent oral thrush (candidiasis) and hoarseness.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Take ICS daily even when asymptomatic',
        detail:
          'Effect builds over days–weeks; benefits depend on regular use. Don’t stop because you "feel fine".',
        marks: 1,
      },
      {
        id: 'r6',
        label: 'SABA side effects and overuse',
        detail:
          'Salbutamol may cause tremor and palpitations. Needing it MORE than 2–3 times a week (apart from before exercise) means asthma is poorly controlled — see your nurse/doctor.',
        marks: 1,
      },
      {
        id: 'r7',
        label: 'Emergency / seek help',
        detail:
          'Severe breathlessness, inability to speak full sentences, lips blueness, no improvement after 10 puffs of salbutamol via spacer → urgent help. Carry the reliever at all times.',
        marks: 1,
      },
    ],
    modelAnswer:
      '• Two inhalers, two different jobs. Your BROWN/ORANGE inhaler (beclomethasone) is the CONTROLLER — you must take it every day, morning and evening, even on days you feel well, because it slowly reduces the swelling in your airways and prevents attacks.\n' +
      '• Your BLUE inhaler (salbutamol) is the RELIEVER — only use it when you actually feel wheezy or short of breath, or 15 minutes before exercise if you need to.\n' +
      '• Technique: shake the inhaler, breathe out fully, seal your lips around the mouthpiece, start a slow deep breath in as you press the canister, then hold your breath for about 10 seconds before breathing out slowly. Use a spacer if you have one.\n' +
      '• If you have been told to take two puffs, wait about one minute between puffs.\n' +
      '• ALWAYS rinse your mouth with water and spit it out after using the beclomethasone — this prevents oral thrush and a hoarse voice.\n' +
      '• Do not stop the brown inhaler if you feel well. It takes days to weeks for the steroid to work, and stopping it lets the inflammation come back.\n' +
      '• Salbutamol can give you a tremor or fast heartbeat for a few minutes — this is expected. If you need the blue inhaler more than 2–3 times a week (other than before exercise), it means your asthma is not well controlled and you should come back to see us.\n' +
      '• Always carry your blue inhaler with you.\n' +
      '• Seek URGENT help if: you cannot speak in full sentences, your lips look blue, your reliever does not help after 10 puffs (one puff at a time through a spacer), or your symptoms are getting worse.',
    referenceSections: ['Respiratory Pharmacology', 'Inhaler Technique'],
  },

  // ---------- CASE MANAGEMENT ----------
  {
    id: 'drl-013',
    topic: 'opioids',
    drillKind: 'caseManagement',
    type: 'drill',
    prompt:
      'A 27-year-old man is brought to A&E unconscious. RR 6/min, SpO2 84%, pinpoint pupils, BP 90/55. Empty syringes found nearby. Outline your IMMEDIATE pharmacological and supportive management, including drug doses and ongoing monitoring.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'ABC and oxygen',
        detail:
          'Open airway (head tilt/chin lift), give high-flow O2 via non-rebreather, bag-mask ventilate if RR remains low or apnoeic. Place on cardiac monitor + SpO2.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Naloxone administration',
        detail:
          'Naloxone 0.4 mg IV (or 0.04–0.1 mg titrated if known dependence to avoid acute withdrawal). Repeat every 2–3 min up to 10 mg total if no response. May give IM/intranasal if no IV access.',
        marks: 3,
      },
      {
        id: 'r3',
        label: 'Reassess and prepare for repeat / infusion',
        detail:
          'Aim for adequate RR (≥12) and oxygenation, not full alertness (avoid precipitating withdrawal). Many opioids outlast naloxone — set up naloxone infusion or repeat boluses.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'IV access, fluids, glucose check',
        detail:
          'Establish IV access, give normal saline if hypotensive, check capillary blood glucose (rule out hypoglycaemia), do ECG.',
        marks: 1,
      },
      {
        id: 'r5',
        label: 'Investigations and disposition',
        detail:
          'ABG, U&E, paracetamol level (co-ingestion), urine drug screen. Admit to monitored bed for at least 4–6 h after last naloxone dose. Refer to mental-health/addiction services before discharge.',
        marks: 2,
      },
    ],
    modelAnswer:
      'IMMEDIATE (A–B–C):\n' +
      '• Open the airway (head tilt/chin lift; jaw thrust if trauma suspected), apply high-flow oxygen via non-rebreather mask. If RR remains <8 or apnoeic, support ventilation with bag-valve-mask.\n' +
      '• Attach pulse oximetry, cardiac monitor and obtain IV access.\n\n' +
      'SPECIFIC ANTIDOTE:\n' +
      '• Give NALOXONE 0.4 mg IV (lower dose 0.04–0.1 mg titrated if known opioid dependence, to avoid acute withdrawal). Repeat every 2–3 minutes, doubling the dose if no response, up to a total of about 10 mg. If no IV access, give 0.4 mg IM or 2 mg intranasal.\n' +
      '• Target: improved respiratory rate (~12/min) and oxygenation — do NOT aim for full alertness, which provokes severe withdrawal.\n\n' +
      'ONGOING MONITORING:\n' +
      '• Because naloxone’s half-life (~30–90 min) is shorter than most opioids, plan for either repeated boluses OR a naloxone infusion (commonly two-thirds of the responding bolus dose per hour) and observe for at least 4–6 hours after the last dose. Monitor RR, SpO2, conscious level and pupils every 5–10 minutes initially.\n\n' +
      'SUPPORTIVE / DIAGNOSTIC:\n' +
      '• If hypotensive: titrated 0.9% saline boluses. Capillary blood glucose to exclude hypoglycaemia (give 50 mL of 50% dextrose IV if low).\n' +
      '• 12-lead ECG, ABG, U&E, FBC, paracetamol and salicylate levels (rule out co-ingestion), urine drug screen, blood culture if febrile.\n' +
      '• Look for and treat complications: aspiration pneumonia, rhabdomyolysis, non-cardiogenic pulmonary oedema (sometimes precipitated by naloxone reversal).\n\n' +
      'DISPOSITION & SAFEGUARDING:\n' +
      '• Admit to a monitored bed; do NOT discharge from A&E within the duration of the longest plausible opioid. Refer for mental-health assessment, opioid substitution therapy and harm-reduction (naloxone take-home kit, sterile equipment) before discharge.',
    referenceSections: ['Opioid Antagonists', 'Naloxone'],
  },

  {
    id: 'drl-014',
    topic: 'antihypertensives',
    drillKind: 'caseManagement',
    type: 'drill',
    prompt:
      'A 62-year-old man has hypertension (BP 168/96), type-2 diabetes and microalbuminuria. He has no other co-morbidities and is not on any current medication. Outline a stepwise pharmacological management plan including FIRST-LINE drug class (with rationale), monitoring, common adverse effects and lifestyle advice.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Choice of first-line agent — ACE-I or ARB',
        detail:
          'ACE-I (e.g., lisinopril 10 mg OD) or ARB (e.g., losartan 50 mg OD) — first-line because of renoprotective effect in diabetic nephropathy with microalbuminuria.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Add-on therapy if BP > target',
        detail:
          'Step up: add CCB (amlodipine 5–10 mg) or thiazide-like diuretic (indapamide / bendroflumethiazide). Avoid β-blocker first-line unless other indication (e.g., post-MI, angina).',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Baseline & monitoring',
        detail:
          'Baseline U&Es, eGFR, K+, urine ACR, fasting glucose/HbA1c, lipid panel, ECG. Re-check U&Es and K+ within 1–2 weeks of starting/changing ACE-I/ARB. Home BP diary; review every 2–4 weeks until controlled.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Common adverse effects + counselling',
        detail:
          'ACE-I: dry cough, hyperkalaemia, dizziness, angioedema (rare). Amlodipine: ankle oedema, headache. Counsel about postural hypotension; report swelling of face/tongue immediately.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Lifestyle advice',
        detail:
          'Reduce dietary salt (<5 g/day), limit alcohol, lose weight if BMI high, regular aerobic exercise 30 min ×5/week, stop smoking, DASH-style diet, diabetes self-monitoring, treat dyslipidaemia.',
        marks: 2,
      },
    ],
    modelAnswer:
      'FIRST-LINE DRUG CHOICE: This patient has hypertension PLUS type-2 diabetes with microalbuminuria, so the priority agent is an ACE INHIBITOR (e.g., lisinopril 10 mg once daily) or an ARB if cough develops (e.g., losartan 50 mg once daily). These classes lower BP and provide additional renoprotection by reducing intraglomerular pressure and slowing progression of diabetic nephropathy.\n\n' +
      'STEP-UP THERAPY: If BP remains above target (typically <130/80 in diabetes with proteinuria), add a calcium channel blocker (amlodipine 5–10 mg OD) or a thiazide-like diuretic (indapamide 1.5 mg or bendroflumethiazide 2.5 mg OD). The third step combines ACE-I/ARB + CCB + thiazide-like diuretic. β-blockers are not first-line unless another indication (post-MI, ischaemic heart disease, atrial fibrillation rate control).\n\n' +
      'BASELINE INVESTIGATIONS: U&Es, eGFR, K+, urine albumin/creatinine ratio, fasting glucose / HbA1c, lipid profile, ECG, baseline weight and BMI. Check funduscopy for hypertensive retinopathy.\n\n' +
      'MONITORING: Recheck U&Es and K+ within 1–2 weeks of starting or up-titrating ACE-I/ARB (significant rise in creatinine or hyperkalaemia warrants review). Home BP diary; clinic review every 2–4 weeks until BP is at target, then 3–6 monthly. Annual urine ACR and renal function.\n\n' +
      'COMMON ADVERSE EFFECTS to counsel about:\n' +
      '• ACE-I: dry cough, hyperkalaemia, dizziness/postural hypotension, angioedema (rare but report swelling of face/lips/tongue immediately and stop the drug).\n' +
      '• ARB: similar but no cough.\n' +
      '• Amlodipine: ankle oedema, headache, flushing.\n' +
      '• Thiazides: hypokalaemia, hyperuricaemia, hyperglycaemia.\n\n' +
      'LIFESTYLE / NON-PHARMACOLOGICAL: Reduce dietary salt (<5 g/day), eat a DASH-style diet rich in fruits and vegetables, lose weight to BMI <25, limit alcohol (≤2 units/day), undertake aerobic exercise 30 minutes most days, stop smoking. Manage diabetes (lifestyle + metformin first-line), and treat dyslipidaemia with a statin given his cardiovascular risk.',
    referenceSections: ['Antihypertensives', 'Treatment Strategies', 'Ghana STG'],
  },

  // ---------- FIVE RIGHTS ----------
  {
    id: 'drl-015',
    topic: 'principles',
    drillKind: 'fiveRights',
    type: 'drill',
    prompt:
      'List the Five Rights of medication administration. For each Right, explain (a) what the nurse must verify and (b) ONE example of a potential consequence if violated.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Right patient',
        detail:
          'Verify identity with at least TWO identifiers (name + ID/DOB). Violation: giving cytotoxic chemo to the wrong patient.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Right drug',
        detail:
          'Match label to MAR/prescription three times; check for allergies and look-alike/sound-alike (LASA) errors. Violation: dispensing hydralazine instead of hydroxyzine.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Right dose',
        detail:
          'Calculate carefully, double-check high-alert meds (insulin, heparin, opioids, paediatric doses). Violation: tenfold paediatric morphine overdose.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Right route',
        detail:
          'Confirm prescribed route matches the formulation. Violation: giving vincristine intrathecally (fatal) instead of IV.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Right time',
        detail:
          'Administer within the appropriate time window (±30 min for most), consider food/drug interactions and dosing intervals. Violation: erratic timing of antibiotic doses → sub-therapeutic levels.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. RIGHT PATIENT — Verify identity using TWO identifiers (e.g., full name and hospital number / date of birth) and check the ID band before giving any medication. Consequence of violation: administering a controlled drug or chemotherapy to the wrong patient.\n\n' +
      '2. RIGHT DRUG — Read the medication label three times (when taking from the trolley/cabinet, when preparing, and at the bedside) and compare against the prescription/MAR. Always check for allergies and look-alike/sound-alike errors (e.g., hydralazine vs hydroxyzine, methotrexate weekly vs daily). Consequence: anaphylaxis from giving penicillin to a known-allergic patient.\n\n' +
      '3. RIGHT DOSE — Calculate the dose, double-check high-alert drugs with a second nurse (insulin, heparin, opioids, paediatric and oncology doses), and use weight-based formulas where appropriate. Consequence: ten-fold overdose of paediatric morphine causing apnoea.\n\n' +
      '4. RIGHT ROUTE — Confirm the prescribed route matches the formulation and the patient’s ability to take it. Some routes have life-threatening consequences if confused (e.g., vincristine given intrathecally instead of IV is fatal). Consequence: giving an IM-only preparation IV producing severe local toxicity.\n\n' +
      '5. RIGHT TIME — Administer within the appropriate window (commonly ±30 minutes), maintain the correct interval to keep therapeutic levels (e.g., antibiotics, anti-epileptics), and consider food–drug interactions (e.g., captopril before food, levodopa avoiding high-protein meals). Consequence: erratic antibiotic timing leads to sub-therapeutic levels and antimicrobial resistance.\n\n' +
      'Many institutions now teach extra "Rights" — right documentation, right reason, right response and right to refuse — to strengthen safety further.',
    referenceSections: ['Role of the Nurse/Midwife', 'Five Rights'],
  },

  // ---------- DRUG CALCULATION ----------
  {
    id: 'drl-016',
    topic: 'ghanaContext',
    drillKind: 'drugCalc',
    type: 'drill',
    prompt:
      'Work through the following clinical drug calculations and SHOW your working:\n' +
      '(a) Order: amoxicillin 500 mg PO. Stock: 250 mg tablets. How many tablets?\n' +
      '(b) Order: 1 L of 0.9% NaCl IV over 8 hours. Tubing drop factor 15 gtts/mL. Calculate gtts/min.\n' +
      '(c) Order: gentamicin 80 mg IM. Stock: 40 mg/mL. Volume to draw?\n' +
      '(d) Child weighs 12 kg. Order: paracetamol 15 mg/kg PO. Stock: 120 mg/5 mL. Dose volume?\n' +
      '(e) Order: heparin 25 000 units in 500 mL NaCl, infuse at 1000 units/hour. mL/hour?',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: '(a) 2 tablets',
        detail:
          'Dose required / Dose on hand = 500 / 250 = 2 tablets.',
        marks: 2,
      },
      {
        id: 'r2',
        label: '(b) ≈31 gtts/min',
        detail:
          'gtts/min = (volume × drop factor) / time (min) = (1000 × 15) / 480 = 31.25 → 31 gtts/min.',
        marks: 2,
      },
      {
        id: 'r3',
        label: '(c) 2 mL',
        detail:
          'Volume = dose / concentration = 80 / 40 = 2 mL.',
        marks: 2,
      },
      {
        id: 'r4',
        label: '(d) 7.5 mL',
        detail:
          'Dose = 12 × 15 = 180 mg. Volume = (180 / 120) × 5 = 7.5 mL.',
        marks: 2,
      },
      {
        id: 'r5',
        label: '(e) 20 mL/hour',
        detail:
          'Concentration = 25 000 units / 500 mL = 50 units/mL. Rate = 1000 / 50 = 20 mL/hour.',
        marks: 2,
      },
    ],
    modelAnswer:
      '(a) Tablets needed = Ordered dose / Strength per tablet = 500 mg / 250 mg = **2 tablets**.\n\n' +
      '(b) Drops per minute (gtts/min) = (Total volume in mL × Drop factor in gtts/mL) / Time in minutes\n' +
      '   = (1000 × 15) / (8 × 60)\n' +
      '   = 15 000 / 480\n' +
      '   ≈ 31.25 → **31 gtts/min**.\n\n' +
      '(c) Volume to draw = Ordered dose / Stock concentration = 80 mg / 40 mg per mL = **2 mL** IM.\n\n' +
      '(d) Weight-based dose = 12 kg × 15 mg/kg = 180 mg.\n' +
      '   Volume = (Dose / Stock dose) × Stock volume = (180 / 120) × 5 = **7.5 mL** of the 120 mg/5 mL syrup.\n\n' +
      '(e) Infusion concentration = 25 000 units / 500 mL = 50 units/mL.\n' +
      '   Pump rate = Desired units per hour / Concentration = 1000 / 50 = **20 mL/hour**.\n\n' +
      'Always have a second nurse independently double-check high-alert calculations (insulin, heparin, paediatric doses).',
    referenceSections: ['Drug Calculation', 'IV Flow Rates'],
  },
  // ---------- ANTIMICROBIAL PHARMACOLOGY ----------
  {
    id: 'drl-017',
    topic: 'ghanaContext',
    drillKind: 'compareConcepts',
    type: 'drill',
    prompt:
      'For the following antibiotic classes/drugs, explain (a) the mechanism of action, (b) ONE major clinical indication, and (c) ONE critical patient counselling point:\n' +
      '1. Penicillins (e.g., Amoxicillin)\n' +
      '2. Aminoglycosides (e.g., Gentamicin)\n' +
      '3. Metronidazole',
    marks: 9,
    rubric: [
      {
        id: 'r1',
        label: 'Penicillins — MoA, indication, and counselling',
        detail:
          'MoA: Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins (PBPs) and preventing peptidoglycan cross-linking. Indication: Respiratory tract infections, skin infections, syphilis. Counselling: Finish the entire prescribed course even if feeling better; report any rash or breathing issues immediately.',
        marks: 3,
      },
      {
        id: 'r2',
        label: 'Aminoglycosides — MoA, indication, and counselling/monitoring',
        detail:
          'MoA: Binds irreversibly to the 30S ribosomal subunit, causing mRNA misreading and inhibiting protein synthesis. Indication: Severe Gram-negative systemic infections (sepsis, complicated UTIs). Counselling/Monitoring: Needs serum level monitoring (TDM); monitor for hearing changes (ototoxicity) and urine output (nephrotoxicity).',
        marks: 3,
      },
      {
        id: 'r3',
        label: 'Metronidazole — MoA, indication, and counselling',
        detail:
          'MoA: Undergoes intracellular reduction to form toxic free radicals that disrupt helical DNA structure and cause strand breakage. Indication: Anaerobic bacterial infections (intra-abdominal sepsis, bacterial vaginosis) or protozoal infections (amoebiasis, giardiasis). Counselling: Strictly avoid alcohol during treatment and for 48 hours after to prevent a disulfiram-like reaction (severe vomiting, flushing, tachycardia).',
        marks: 3,
      },
    ],
    modelAnswer:
      '1. PENICILLINS (e.g., Amoxicillin)\n' +
      '   • Mechanism of Action: Bactericidal. They inhibit bacterial cell wall synthesis by binding to Penicillin-Binding Proteins (PBPs), which blocks the transpeptidation enzyme responsible for cross-linking peptidoglycan chains. This weakens the cell wall, causing osmotic lysis.\n' +
      '   • Clinical Indication: Community-acquired pneumonia, otitis media, tonsillitis, or skin and soft tissue infections.\n' +
      '   • Patient Counselling: Take the medication at evenly spaced intervals and finish the entire prescribed course to prevent resistance. Report signs of hypersensitivity (rash, hives, wheezing) immediately.\n\n' +
      '2. AMINOGLYCOSIDES (e.g., Gentamicin)\n' +
      '   • Mechanism of Action: Bactericidal. They cross the bacterial cell membrane and bind irreversibly to the 30S ribosomal subunit. This causes misreading of the genetic code on mRNA, leading to the synthesis of nonfunctional proteins and disruption of the cell membrane.\n' +
      '   • Clinical Indication: Severe Gram-negative aerobic bacillary infections, such as septicaemia, complicated urinary tract infections, or endocarditis (in combination with cell-wall inhibitors).\n' +
      '   • Patient Counselling/Monitoring: Monitor renal function (serum creatinine, urine output) and report any ringing in the ears (tinnitus), hearing loss, or dizziness/vertigo. Inform the patient that blood samples will be drawn to check drug levels (Therapeutic Drug Monitoring).\n\n' +
      '3. METRONIDAZOLE\n' +
      '   • Mechanism of Action: Bactericidal. It is a prodrug that is selectively taken up by anaerobic bacteria and protozoa. Its nitro group is reduced by microbial proteins (like ferredoxin) to form highly reactive nitro radicals that damage microbial DNA, leading to strand breakage and cell death.\n' +
      '   • Clinical Indication: Anaerobic infections (e.g., pelvic inflammatory disease, dental abscesses, pseudomembranous colitis) and protozoal infections (e.g., amoebiasis, giardiasis, trichomoniasis).\n' +
      '   • Patient Counselling: Strictly avoid any alcohol intake (including alcohol-containing mouthwashes/cough syrups) during therapy and for at least 48 hours after completion. Combining metronidazole and alcohol causes a disulfiram-like reaction (headache, severe nausea, vomiting, abdominal cramps, flushing, and palpitations). Take with food to minimize GI distress.',
    referenceSections: ['Antimicrobial Drugs', 'Antibiotic Safety & Counselling'],
  },

  // ---------- ENDOCRINE PHARMACOLOGY ----------
  {
    id: 'drl-018',
    topic: 'principles',
    drillKind: 'caseManagement',
    type: 'drill',
    prompt:
      '(a) Compare rapid-acting insulin (e.g., Insulin Lispro) and long-acting insulin (e.g., Insulin Glargine) in terms of onset, peak, and duration of action.\n' +
      '(b) Outline the clinical signs of insulin-induced hypoglycemic shock and detail the step-by-step nursing management for a conscious vs. unconscious patient in a ward setting.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Comparison of Rapid-acting vs Long-acting Insulin',
        detail:
          'Rapid-acting: Onset ≈ 15 mins, Peak ≈ 1–2 hours, Duration ≈ 3–5 hours. Long-acting: Onset ≈ 1–2 hours, Peak is flat/no peak, Duration ≈ 24 hours. Understand clinical timing difference.',
        marks: 4,
      },
      {
        id: 'r2',
        label: 'Clinical signs of hypoglycemic shock',
        detail:
          'Identify adrenergic signs (sweating, tremors, tachycardia, palpitations, anxiety) and neuroglycopenic signs (confusion, slurred speech, headache, visual changes, seizures, coma).',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Nursing management of conscious hypoglycemic patient',
        detail:
          'Apply the Rule of 15: Administer 15–20g of fast-acting glucose orally (e.g., 150 mL fruit juice, 3–4 glucose tablets, 3 teaspoons of sugar in water). Recheck blood glucose in 15 mins. Repeat if glucose <4 mmol/L. Follow with a snack containing complex carbohydrates once stable.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Nursing management of unconscious hypoglycemic patient',
        detail:
          'Do NOT give anything by mouth (aspiration risk). Administer IV Dextrose (e.g., 20–50 mL of 50% dextrose or 100 mL of 10% dextrose) through a patent IV line, OR give 1 mg Glucagon IM/SC. Recheck blood glucose, monitor consciousness and airway, and establish etiology.',
        marks: 2,
      },
    ],
    modelAnswer:
      '(a) INSULIN COMPARISON:\n' +
      '   • Rapid-Acting Insulin (e.g., Insulin Lispro, Aspart):\n' +
      '     - Onset of action: 10 to 20 minutes (must be given immediately before or after meals).\n' +
      '     - Peak effect: 1 to 2 hours.\n' +
      '     - Duration of action: 3 to 5 hours.\n' +
      '   • Long-Acting Insulin (e.g., Insulin Glargine, Detemir):\n' +
      '     - Onset of action: 1 to 2 hours.\n' +
      '     - Peak effect: None (provides a flat, stable basal level).\n' +
      '     - Duration of action: 24 hours (usually administered once daily at bedtime).\n\n' +
      '(b) CLINICAL SIGNS & MANAGEMENT OF HYPOGLYCEMIC SHOCK (Glucose <3.9 mmol/L / <70 mg/dL):\n' +
      '   • Clinical Signs:\n' +
      '     - Adrenergic/Autonomic (early): Diaphoresis (sweating), tremors, tachycardia, palpitations, nervousness/anxiety, hunger.\n' +
      '     - Neuroglycopenic (late/severe): Confusion, irritability, slurred speech, visual disturbances, headache, dizziness, coordinate difficulty, seizures, loss of consciousness, and coma.\n' +
      '   • Nursing Management for a CONSCIOUS Patient:\n' +
      '     1. Confirm hypoglycemia using a bedside glucometer if immediately available (do not delay treatment if unavailable and patient has clear symptoms).\n' +
      '     2. Administer 15 to 20 grams of rapid-acting simple carbohydrate orally (e.g., 150 mL of fruit juice or regular soda, 3–4 glucose tablets, or 3 teaspoons of sugar dissolved in water).\n' +
      '     3. Wait 15 minutes and retest blood glucose (Rule of 15).\n' +
      '     4. If blood glucose remains <4.0 mmol/L, repeat the oral carbohydrate and recheck in 15 minutes.\n' +
      '     5. Once blood glucose normalizes, give a small meal or snack containing complex carbohydrates and protein (e.g., bread, crackers, or milk) to maintain glucose levels until the next regular meal.\n' +
      '   • Nursing Management for an UNCONSCIOUS Patient:\n' +
      '     1. Maintain airway, place the patient in the recovery position, and ensure safety.\n' +
      '     2. Strictly avoid giving anything by mouth to prevent aspiration.\n' +
      '     3. Establish secure IV access and administer 20 to 50 mL of 50% Dextrose (D50) IV push slowly (or 100 mL of 10% Dextrose IV) over 2 to 3 minutes. Flush the line to prevent local venous irritation.\n' +
      '     4. If IV access is unavailable, administer 1 mg of Glucagon intramuscularly (IM) or subcutaneously (SC).\n' +
      '     5. Recheck blood glucose in 15 minutes, monitor vital signs and level of consciousness. Once awake and safe to swallow, offer oral carbohydrates.',
    referenceSections: ['Endocrine Drugs', 'Insulin Administration & Complications'],
  },

  // ---------- UTEROTONIC PHARMACOLOGY ----------
  {
    id: 'drl-019',
    topic: 'ghanaContext',
    drillKind: 'mechanismOfAction',
    type: 'drill',
    prompt:
      'Uterotonics are essential in obstetrics for the prevention and management of Postpartum Hemorrhage (PPH). For Oxytocin, Ergometrine, and Misoprostol:\n' +
      '(a) State the mechanism of action.\n' +
      '(b) Identify ONE key contraindication for each drug.\n' +
      '(c) Explain the appropriate storage conditions for Oxytocin and Ergometrine in a Ghanaian healthcare facility.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Oxytocin — MoA and contraindication',
        detail:
          'MoA: Binds to G-protein coupled oxytocin receptors on uterine smooth muscle, activating phospholipase C and increasing intracellular calcium to trigger rhythmic uterine contractions. Contraindication: Mechanical obstruction to delivery (e.g., cephalopelvic disproportion), fetal distress, placenta praevia.',
        marks: 3,
      },
      {
        id: 'r2',
        label: 'Ergometrine — MoA and contraindication',
        detail:
          'MoA: Acts directly on uterine smooth muscle by binding to alpha-adrenergic, serotonergic, and dopaminergic receptors, causing sustained, tetanic (tonic) contractions. Contraindication: Hypertension (pregnancy-induced or essential), pre-eclampsia, eclampsia, cardiovascular disease.',
        marks: 3,
      },
      {
        id: 'r3',
        label: 'Misoprostol — MoA and contraindication',
        detail:
          'MoA: Synthetic prostaglandin E1 (PGE1) analogue that binds to prostaglandin receptors in the myometrium, stimulating calcium release and causing uterine contractions. Contraindication: Known hypersensitivity to prostaglandins; should not be used for PPH prevention before the delivery of the fetus.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Uterotonic Storage & Cold Chain in Ghana',
        detail:
          'Oxytocin and Ergometrine are highly heat-sensitive and must be stored in a refrigerator at 2°C to 8°C to maintain potency. Exposure to tropical ambient temperatures in Ghana degrades them rapidly. Misoprostol is heat-stable and can be stored at room temperature.',
        marks: 2,
      },
    ],
    modelAnswer:
      '(a) MECHANISMS OF ACTION:\n' +
      '   • Oxytocin: It binds to specific G-protein coupled oxytocin receptors located on myometrial smooth muscle cells. This activation stimulates phospholipase C, releasing calcium from the sarcoplasmic reticulum and opening membrane calcium channels. The increase in intracellular calcium promotes actin-myosin cross-bridging, causing rhythmic, wave-like uterine contractions that mimic natural labor.\n' +
      '   • Ergometrine: It is an ergot alkaloid that directly stimulates myometrial smooth muscle. It acts as a partial agonist on alpha-adrenergic, serotonergic (5-HT), and dopaminergic receptors. This triggers a sustained, tonic (tetanic) contraction of the uterus with little relaxation, which compresses uterine blood vessels at the placental site to stop bleeding.\n' +
      '   • Misoprostol: It is a synthetic prostaglandin E1 (PGE1) analogue. It binds to prostanoid EP2 and EP4 receptors on myometrial smooth muscle cells, increasing intracellular calcium levels and causing strong uterine contractions. It also promotes cervical ripening.\n\n' +
      '(b) CONTRAINDICATIONS:\n' +
      '   • Oxytocin: Mechanical obstruction to delivery (cephalopelvic disproportion), fetal distress/compromise (before delivery), placenta praevia, hypertonic uterine patterns, and severe pre-eclampsia.\n' +
      '   • Ergometrine: Severe hypertension, pre-eclampsia, eclampsia, and peripheral vascular disease. (It causes generalized vasoconstriction and can trigger hypertensive crisis or stroke).\n' +
      '   • Misoprostol: Known hypersensitivity to prostaglandins, active labor with a viable fetus (unless carefully dosed for induction under close monitoring due to uterine rupture risk).\n\n' +
      '(c) STORAGE CONDITIONS IN GHANA:\n' +
      '   • Oxytocin and Ergometrine are extremely heat-sensitive and unstable at room temperature. In tropical climates like Ghana, they must be stored in a reliable cold chain refrigerator between **2°C and 8°C**.\n' +
      '   • Exposure to ambient temperatures (25°C to 30°C or higher) rapidly degrades these proteins/compounds, rendering them inactive and leading to preventable maternal deaths from PPH. Protect ergometrine from light.\n' +
      '   • Misoprostol, being a synthetic prostaglandin tablet, is stable at ambient room temperature (under 30°C) and does not require refrigeration. This makes it a vital alternative in rural Ghanaian health posts or CHPS compounds where electricity/refrigeration is unreliable.',
    referenceSections: ['Uterotonics in Obstetric Practice', 'Postpartum Hemorrhage Management'],
  },
];

// ---------- helpers ----------
export function getDrillCountByKind(): Record<PharmDrillKind, number> {
  const counts = {} as Record<PharmDrillKind, number>;
  (Object.keys(PHARM_DRILL_LABELS) as PharmDrillKind[]).forEach((k) => (counts[k] = 0));
  pharmacologyDrills.forEach((d) => {
    counts[d.drillKind] = (counts[d.drillKind] ?? 0) + 1;
  });
  return counts;
}

export function getDrillsByKinds(kinds: PharmDrillKind[], n: number): PharmDrill[] {
  const pool = pharmacologyDrills.filter((d) => kinds.includes(d.drillKind));
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(n, shuffled.length));
}
