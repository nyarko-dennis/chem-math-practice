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
          'A drug is any chemical (a man-made or natural substance) that changes how the body works. Examples: aspirin (pain reliever), nicotine (in tobacco), alcohol, insulin (the blood-sugar hormone).',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Medicine — defined correctly with example',
        detail:
          'A medicine is a drug that has been packaged in a safe, ready-to-take form (tablet, syrup, injection) and given to treat illness. Example: paracetamol 500 mg tablet (a pain and fever reliever).',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Pharmacokinetics — defined with ADME mention',
        detail:
          'Pharmacokinetics means "what the body does to the drug". It covers the four steps a drug goes through, abbreviated as ADME: Absorption (getting into the bloodstream), Distribution (spreading round the body), Metabolism (being broken down, mainly by the liver) and Excretion (leaving the body, mainly in urine). Example: when nitroglycerin is swallowed, the liver destroys most of it before it can reach the heart (this is called first-pass metabolism).',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Pharmacodynamics — defined with example',
        detail:
          'Pharmacodynamics means "what the drug does to the body". It explains how the drug attaches to its target (a receptor — a special docking site on a cell) and what effect this produces. Example: morphine attaches to opioid receptors (its docking sites in the brain and spinal cord) and reduces pain.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Therapeutic index — defined with example',
        detail:
          'The therapeutic index (TI) is a safety score for a drug: TI = TD50 ÷ ED50 (the dose that becomes toxic in half of patients divided by the dose that works in half of patients). A drug with a narrow (small) TI has only a tiny gap between the helpful dose and the harmful dose, so blood levels must be checked often. Examples: digoxin (a heart drug), warfarin (a blood thinner), theophylline (an asthma drug), lithium (a mood stabiliser).',
        marks: 2,
      },
    ],
    modelAnswer:
      '(a) Drug: any chemical that changes how the body works. Examples include aspirin (a pain reliever), nicotine (the addictive chemical in tobacco) and alcohol.\n' +
      '(b) Medicine: a drug packaged in a ready-to-use form (tablet, syrup, injection, cream) and used to prevent, diagnose or treat illness. Example: a paracetamol 500 mg tablet. All medicines contain at least one drug, but not all drugs are medicines (e.g., recreational alcohol is a drug but not a medicine).\n' +
      '(c) Pharmacokinetics: "what the body does to the drug". Four steps, abbreviated ADME — Absorption (the drug gets into the blood), Distribution (the drug spreads round the body), Metabolism (the drug is broken down, mainly by the liver) and Excretion (the drug or its breakdown products leave the body, mainly in urine). Example: nitroglycerin placed UNDER the tongue is absorbed straight into the blood and skips the liver, so it works within minutes.\n' +
      '(d) Pharmacodynamics: "what the drug does to the body". It is the actual attaching of the drug to its target — usually a receptor (a docking site on the cell) — and the effect that follows. Example: morphine attaches to opioid receptors in the brain and spinal cord, which reduces pain but also slows breathing.\n' +
      '(e) Therapeutic Index (TI): a safety score for a drug. TI = TD50 ÷ ED50 (toxic dose in half of patients divided by the helpful dose in half of patients). A drug with a narrow TI has only a small safety gap, so blood levels must be checked carefully. Narrow-TI drugs include digoxin (a heart drug), warfarin (a blood thinner), theophylline (an asthma drug) and lithium (a mood stabiliser).',
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
          'Bioavailability (F) is the fraction of a dose that actually reaches the bloodstream in a working form. A drug given by injection straight into a vein (IV) has F = 100% (all of it gets in). A swallowed tablet usually has less, because some is not absorbed and some is broken down by the liver on first pass. F tells us how to convert a dose from one route (IV) to another (oral).',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Volume of distribution',
        detail:
          'Volume of distribution (Vd) is the imaginary volume of fluid the drug would need to spread into to give the blood level we measure. Vd = dose ÷ blood concentration. A LARGE Vd means the drug hides in tissues and fat (so it leaves the blood fast); a SMALL Vd means the drug stays in the blood. Vd is used to work out a loading dose (the big first dose).',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Half-life',
        detail:
          'Half-life (t½) is how long it takes for the blood level of a drug to fall to HALF. After about 4 to 5 half-lives, repeated dosing reaches a steady level in the blood (steady state). Short t½ = give the drug more often; long t½ = drug can build up and cause toxicity.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'First-pass metabolism',
        detail:
          'First-pass metabolism means a swallowed drug is heavily broken down by the gut wall and the liver BEFORE it ever reaches the rest of the body. This wastes most of the dose. Drugs hit hard by first-pass (nitroglycerin, propranolol, morphine) are given by other routes (under the tongue, into a vein, through the skin, or by the rectum) to skip the liver.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Ion trapping',
        detail:
          'Ion trapping: drugs that are weak acids or weak bases switch between a charged (ionised) form and an uncharged form depending on the pH (acidity) of the fluid they sit in. The CHARGED form cannot cross cell membranes and gets stuck. Clinical use: in aspirin overdose, give sodium bicarbonate to make the urine alkaline. This converts aspirin in the urine to its charged form, traps it there, and washes it out faster.',
        marks: 2,
      },
    ],
    modelAnswer:
      '(a) Bioavailability (F): the fraction of a dose that actually reaches the bloodstream in working form. A drug given straight into a vein has F = 100%. A swallowed tablet usually has less, because some of it is not absorbed from the gut and some is destroyed by the liver during "first pass". F lets us adjust the dose when switching from one route to another.\n' +
      '(b) Volume of distribution (Vd): the imaginary volume of fluid the drug would need to spread into to give the blood level we actually measure (Vd = total drug in body ÷ blood concentration). A LARGE Vd means the drug hides in fat and other tissues; a SMALL Vd means it stays in the blood. Vd is used to calculate the loading dose — the big first dose given to fill up that imaginary volume.\n' +
      '(c) Half-life (t½): the time it takes for the blood level of the drug to fall to HALF. After about 4–5 half-lives, repeat dosing settles at a constant ("steady state") level. Short t½ → dose more often; long t½ → risk of build-up.\n' +
      '(d) First-pass metabolism: when a drug is swallowed, it travels from the gut to the liver before reaching the rest of the body. The liver can destroy most of it on this first journey. Drugs badly affected by first-pass (nitroglycerin, propranolol, morphine) are given by other routes — under the tongue, into a vein, through the skin or by the rectum — to bypass the liver.\n' +
      '(e) Ion trapping: weak-acid or weak-base drugs flip between a charged and an uncharged form depending on the acidity (pH) of the fluid they are in. The CHARGED form cannot cross cell membranes, so it gets "trapped". Practical use: in aspirin overdose, give sodium bicarbonate into a vein to make the urine alkaline — this converts the aspirin in the urine into its charged form, traps it there, and washes it out faster.',
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
          'An agonist is a drug that attaches to a receptor (docking site on a cell) AND switches it on — like a key that fits a lock AND turns it. An antagonist attaches to the same lock but does NOT turn it; it just blocks the real key. A partial agonist is a half-strength key — it turns the lock only partway, even when every lock is filled.',
        marks: 3,
      },
      {
        id: 'r2',
        label: 'Competitive vs Noncompetitive antagonist',
        detail:
          'A competitive (reversible) antagonist sits at the SAME spot as the agonist. Adding more agonist can push it off, so you can still get a full effect — the dose-response curve shifts to the RIGHT (need more drug to get the same effect). A noncompetitive (irreversible or allosteric) antagonist sticks at a different spot or sticks permanently. No amount of extra agonist can overcome it, so the MAXIMUM possible effect drops.',
        marks: 3,
      },
      {
        id: 'r3',
        label: 'Potency vs Efficacy',
        detail:
          'Potency = how much drug you need to get a given effect. A potent drug works at small doses (low ED50). It tells you the LOCATION of the curve on the dose axis. Efficacy = how strong the maximum possible effect is (ceiling). It tells you the HEIGHT of the curve. A drug can be very potent but produce only a weak maximum effect, or vice-versa.',
        marks: 3,
      },
    ],
    modelAnswer:
      '(a) Agonist vs Antagonist:\n  • An AGONIST attaches to a receptor (a docking site on the cell) and switches it on — think of a key that both fits and turns the lock. Example: adrenaline turns on β1 receptors and speeds up the heart.\n  • An ANTAGONIST attaches to the same lock but does NOT turn it. It blocks the real key. Example: propranolol blocks β1 and slows the heart.\n  • A PARTIAL AGONIST is a half-strength key — even when every receptor is filled, it only produces a partial effect.\n\n(b) Competitive vs Noncompetitive antagonist:\n  • COMPETITIVE: sits at the same docking spot as the agonist. You can outmuscle it by giving more of the natural agonist. The dose-response curve shifts to the RIGHT (need a bigger dose to get the same effect), but the maximum effect is unchanged.\n  • NONCOMPETITIVE: sits at a different spot OR sticks permanently (covalent bond). No amount of extra agonist gets a full response, so the MAXIMUM possible effect drops.\n\n(c) Potency vs Efficacy:\n  • POTENCY = the dose needed to get a given effect. A potent drug works at a small dose (low ED50). It tells you WHERE on the dose axis the curve sits.\n  • EFFICACY = the biggest effect a drug can ever produce (its ceiling). It tells you HOW HIGH the curve goes.\n  • Clinical example: morphine and codeine both fit the same opioid lock, but morphine has higher efficacy — it can reach a much stronger pain-relief ceiling. Furosemide is more efficacious (much stronger ceiling) than hydrochlorothiazide for getting rid of fluid in heart failure.',
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
          'Absorption = the drug gets from where it was given (gut, lung, skin) INTO the bloodstream. Sites depend on the route — small intestine for swallowed pills, alveoli (tiny air sacs in the lungs) for inhalers, skin for patches. Clinical point: food can slow absorption (e.g., captopril, a blood-pressure pill); also, the liver can destroy a swallowed drug before it reaches the rest of the body (first-pass effect).',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Distribution',
        detail:
          'Distribution = the drug moves from blood OUT into the tissues. Depends on how much blood flows to the tissue, how fat-loving the drug is, and how much it sticks to blood proteins (mainly albumin). Clinical point: in a patient with low blood albumin (e.g., liver disease, malnutrition), a bigger share of a tightly bound drug (warfarin, phenytoin) is free in the blood — risk of toxic levels at normal doses.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Metabolism',
        detail:
          'Metabolism = the body changes the drug, mostly in the LIVER, to make it more water-soluble so it can be passed out in urine. Two main phases: Phase I (oxidation/reduction/hydrolysis, done by CYP450 enzymes) and Phase II (conjugation — sticking a small chemical onto the drug). Clinical point: rifampicin SPEEDS UP liver enzymes (drugs leave faster, may not work — e.g., the pill); cimetidine SLOWS them DOWN (drugs build up — e.g., warfarin levels rise).',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Excretion',
        detail:
          'Excretion = the drug or its breakdown products leave the body. Mainly through the KIDNEYS (filtered out of blood in urine). Smaller routes: bile (into stool), lungs (breathing), sweat and breast milk. Clinical point: in kidney failure (CKD — chronic kidney disease), the dose of kidney-cleared drugs (gentamicin, digoxin) must be reduced to avoid build-up and toxicity.',
        marks: 2,
      },
    ],
    modelAnswer:
      'ABSORPTION — the drug gets from where you gave it (gut, lung, skin) INTO the bloodstream. Main sites: the small intestine (for swallowed pills), the tiny air sacs in the lungs (alveoli, for inhaled drugs) and the skin (for patches). Clinical point: a drug that gets destroyed by the liver before it can reach the rest of the body (heavy first-pass metabolism) has a small effect when swallowed. Giving it under the tongue or into a vein instead skips the liver — that is why nitroglycerin is given under the tongue.\n\n' +
      'DISTRIBUTION — the drug moves out of the blood and INTO the tissues. The pace depends on how much blood flows to that tissue, how fat-loving the drug is, and how tightly it sticks to blood proteins (mainly albumin). Clinical point: if a patient has low blood albumin (from liver disease or malnutrition), more of a highly bound drug (warfarin or phenytoin) floats free in the blood — usual doses can cause toxic levels.\n\n' +
      'METABOLISM (also called "biotransformation") — the body chemically changes the drug, mostly in the liver, so it becomes water-soluble and can be flushed out. Phase I (oxidation, reduction or hydrolysis, done by CYP450 enzymes) usually adds or exposes a small chemical group. Phase II (conjugation) sticks on a bigger group (glucuronic acid, sulfate or glutathione). Clinical point: drug-drug interactions — rifampicin (a TB drug) speeds up the CYP3A4 enzyme and makes the contraceptive pill stop working; cimetidine (an ulcer drug) slows the enzymes down and raises warfarin levels (bleeding risk).\n\n' +
      'EXCRETION — the drug, or what is left of it, LEAVES the body. Mainly through the kidneys (filtered into urine, with extra "pumping out" by tubule cells). Smaller routes: bile into stool, lungs (breathing), sweat, breast milk. Clinical point: in a patient with weak kidneys (chronic kidney disease), drugs cleared by the kidney (gentamicin, an antibiotic; digoxin, a heart drug) build up and become toxic at normal doses — so the dose is reduced or the dosing interval lengthened.',
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
          'RAAS = Renin-Angiotensin-Aldosterone System — the body\'s main hormone chain for defending blood pressure. When blood flow to the kidney falls, special pressure-sensing cells in the kidney (juxtaglomerular cells) release renin (a hormone). Renin chops a liver protein (angiotensinogen) into angiotensin I. An enzyme on the lining of lung blood vessels — ACE (Angiotensin-Converting Enzyme) — then converts angiotensin I into angiotensin II. Angiotensin II is the body\'s strongest natural blood-vessel tightener and also tells the adrenal glands (small glands on top of the kidneys) to release aldosterone (a salt-holding hormone), which makes the kidney hold on to sodium and water. Net result: BP goes up.',
        marks: 3,
      },
      {
        id: 'r2',
        label: 'ACE inhibitors',
        detail:
          'ACE inhibitors (e.g., lisinopril, captopril, enalapril) block the ACE enzyme, so less angiotensin II is made. Blood vessels relax (BP falls), and less aldosterone means less salt and water are kept — extra BP drop. ACE also normally breaks down bradykinin (a vessel-widening, cough-triggering substance); blocking ACE lets bradykinin build up, which adds to BP lowering but also causes the classic DRY COUGH and (rarely) ANGIOEDEMA (sudden lip/throat swelling). Useful in HTN (high BP), heart failure and kidney damage from diabetes. AVOID in pregnancy (harms the baby) and in patients with narrowing of both kidney arteries (bilateral renal artery stenosis).',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'ARBs',
        detail:
          'ARBs (Angiotensin Receptor Blockers, e.g., losartan) block the AT1 receptor — the "docking site" angiotensin II normally uses. The BP-lowering and kidney-protecting effects are similar to ACE inhibitors, but they do NOT affect bradykinin, so cough is much less common. Same warnings apply (avoid in pregnancy and in narrowing of both kidney arteries).',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Aldosterone antagonists',
        detail:
          'Aldosterone antagonists (e.g., spironolactone, eplerenone) block the mineralocorticoid receptor (the aldosterone "lock") in the kidney\'s collecting tubule. The kidney lets out more sodium and water and HOLDS ON to potassium (K+). Used in: stubborn high blood pressure that won\'t come down with other drugs (resistant HTN), heart failure, and high-aldosterone disease (hyperaldosteronism). Main risk: high blood potassium (hyperkalaemia) — worse when combined with an ACE inhibitor or ARB.',
        marks: 2,
      },
    ],
    modelAnswer:
      'The renin-angiotensin-aldosterone system (RAAS) is a hormone chain that defends your blood pressure (BP) and body fluid. When kidney blood flow falls (or the sympathetic "fight or flight" nerves fire), special pressure-sensing cells in the kidney (juxtaglomerular cells) release RENIN, a hormone. Renin chops a protein made by the liver (angiotensinogen) into angiotensin I. An enzyme on the inside lining of lung blood vessels — ACE (Angiotensin-Converting Enzyme) — then converts angiotensin I into angiotensin II. Angiotensin II is the body\'s strongest natural blood-vessel tightener — it raises BP directly by squeezing blood vessels (via AT1 receptors, its "docking sites" on the vessel muscle) and indirectly by ordering the adrenal glands (small glands on top of the kidneys) to release aldosterone (a salt-holding hormone), which makes the kidney keep sodium and water.\n\n' +
      '(a) ACE INHIBITORS (e.g., lisinopril, captopril, enalapril) block the ACE enzyme. Less angiotensin II is made, so blood vessels relax and less aldosterone is released (kidneys lose more sodium and water). They also stop the breakdown of bradykinin (a vessel-widening substance), which helps lower BP but also causes the well-known DRY COUGH and, rarely, ANGIOEDEMA (sudden swelling of lips, tongue or throat — can block the airway). These drugs are first-choice for high BP with diabetes or kidney damage, for heart failure, and after a heart attack. AVOID in pregnancy (they harm the baby) and in narrowing of both kidney arteries (bilateral renal artery stenosis).\n\n' +
      '(b) ARBs (Angiotensin Receptor Blockers, e.g., losartan, valsartan) plug the AT1 docking site itself. The BP and kidney-protection effects are similar to ACE inhibitors, but they do NOT change bradykinin, so cough and angioedema are much less common. The pregnancy and renal-artery warnings still apply.\n\n' +
      '(c) ALDOSTERONE ANTAGONISTS (e.g., spironolactone, eplerenone) block the mineralocorticoid receptor (aldosterone\'s docking site) in the kidney\'s collecting tubule. The kidney loses more sodium and water and keeps potassium (these are "potassium-sparing"). Used in stubborn high BP (resistant HTN), heart failure (proven to save lives), and in over-secretion of aldosterone (hyperaldosteronism). Big risk: high blood potassium (hyperkalaemia), especially when combined with an ACE inhibitor or ARB, or in kidney impairment — check potassium levels regularly.',
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
          'Morphine attaches mainly to the MU (μ) opioid receptor — a docking site on pain-carrying nerve cells (also smaller effects at kappa and delta receptors). The receptor is linked to an internal switch protein called G-protein (Gi/Go). When morphine docks: the cell makes less cAMP (a "go" signal); more potassium leaks OUT of the cell (so the nerve becomes harder to fire); and less calcium gets IN (so the nerve releases less of its pain-signalling chemicals). End result: the pain message is dimmed.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Sites of action',
        detail:
          'Inside the central nervous system: the back of the spinal cord (dorsal horn — first relay for pain), the periaqueductal grey and brainstem (which switch on the brain\'s own pain-blocking system), the thalamus, the limbic system (feelings about pain) and the brainstem breathing centre. Outside the brain: gut, bladder and bile ducts also carry μ receptors.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Therapeutic effects',
        detail:
          'Strong pain relief (analgesia), calming and a sense of well-being, cough suppression (codeine), less load on the failing heart (venodilation in acute LV failure relieves "back-up" of fluid in the lungs), and stopping of severe diarrhoea (loperamide is a related compound that stays in the gut).',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Adverse effects',
        detail:
          'Slow breathing/respiratory depression (the dose-limiting and most dangerous effect), pinpoint pupils (miosis — from stimulation of the Edinger-Westphal nucleus, which controls the pupil-narrowing nerves), constipation, urine retention, nausea/vomiting (the brain\'s vomiting trigger zone is sensitive to opioids), histamine release (itching, low BP, flushing), tolerance (need higher doses for the same effect), and physical dependence with withdrawal symptoms if stopped suddenly.',
        marks: 2,
      },
    ],
    modelAnswer:
      'Morphine works mainly at MU (μ) opioid receptors — docking sites found on pain-carrying nerve cells (it also touches kappa and delta receptors a little). These receptors are linked to an internal switch protein called G-protein (Gi/Go). When morphine docks, three things happen inside the nerve: (1) it makes less cAMP (a "go" signal); (2) potassium leaks OUT of the cell, making the nerve harder to fire; (3) less calcium gets IN, so the nerve releases less of its pain-signalling chemicals (substance P, glutamate, CGRP). The net effect is that the pain message is dimmed BOTH where it is being sent (pre-synaptic) and where it is being received (post-synaptic).\n\n' +
      'Sites of action: in the spinal cord (the back portion — dorsal horn — which is the first place pain signals are passed on); the periaqueductal grey and brainstem (these switch on the body\'s own pain-blocking pathway); the thalamus (the brain\'s sensory relay); the limbic system (the part of the brain dealing with emotion — so morphine also changes how the pain FEELS); and the medulla, which controls breathing and coughing. Outside the brain, μ receptors in the gut, bladder and bile ducts produce the side effects below.\n\n' +
      'Therapeutic effects: strong pain relief for severe acute and chronic pain; calming and a feeling of well-being; cough suppression (codeine); relief of breathlessness in sudden heart failure with fluid in the lungs (by widening veins and reducing the "back-up" of fluid); and treatment of severe diarrhoea (loperamide is a related compound that stays in the gut).\n\n' +
      'Adverse effects line up exactly with where the receptors sit: slow breathing (respiratory depression) — the most dangerous side effect; pinpoint pupils (miosis, from stimulation of the pupil-narrowing nerves); constipation (gut μ receptors); urine retention; nausea and vomiting (the brain\'s vomiting trigger zone is sensitive to opioids); histamine release (itching, flushing, low BP); tolerance (need higher doses for the same effect over time); and physical dependence with withdrawal (yawning, runny eyes, gut cramps, agitation) if stopped suddenly. NALOXONE — a drug that knocks morphine off its receptor — is the specific antidote.',
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
          'NSAIDs (Non-Steroidal Anti-Inflammatory Drugs) block an enzyme called cyclo-oxygenase (COX). COX normally turns a fatty acid (arachidonic acid) into local signal molecules: prostaglandins (PGs — cause swelling, pain and fever), prostacyclin (PGI2 — widens vessels, stops platelets sticking) and thromboxane (TXA2 — makes platelets stick and clot). With less PG, you get less inflammation, less pain (nerves are less sensitive), less fever (the brain\'s thermostat is reset) and less clotting (less TXA2).',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'COX-1 vs COX-2',
        detail:
          'COX-1 is the "always-on, housekeeping" enzyme. It protects the stomach lining, keeps blood flowing into the kidney by widening the small artery that feeds it (the afferent arteriole), and helps platelets stick together (via TXA2). COX-2 is mainly switched on at injury sites and drives swelling, pain and fever — but it is also always present in the kidney and in the lining of blood vessels (endothelium), where it makes PGI2 (a vessel-widener that stops platelets sticking).',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Aspirin and platelets',
        detail:
          'Aspirin is unique: it PERMANENTLY blocks COX-1 in platelets by sticking a small chemical group (an acetyl group) onto the enzyme — like jamming a lock with glue. Platelets have NO nucleus (the cell\'s "instruction manual"), so they cannot make new COX. The blocked platelet stays blocked for its whole life (7–10 days). That is why low-dose aspirin protects against heart attacks long after the dose, and why aspirin must be stopped ~7 days before elective surgery.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Coxib GI safety / CV risk',
        detail:
          'COX-2 selective drugs (coxibs — e.g., celecoxib) leave stomach COX-1 alone, so they cause fewer ulcers. BUT in the lining of blood vessels they block COX-2, which normally makes PGI2 (the platelet-quietening, vessel-widening substance). Platelet TXA2 (made by COX-1) is left untouched. The balance tips towards CLOTTING — higher risk of heart attack and stroke, especially with high doses, long use, or in patients with existing heart disease.',
        marks: 2,
      },
    ],
    modelAnswer:
      'NSAIDs (Non-Steroidal Anti-Inflammatory Drugs) block an enzyme called cyclo-oxygenase (COX). COX normally turns a fatty acid (arachidonic acid) into local signal molecules — prostaglandins (PGs), prostacyclin (PGI2) and thromboxane (TXA2). With fewer of these, you get less pain (nerves are less sensitive to injury), less fever (the brain\'s thermostat in the hypothalamus is reset down), less inflammation, and less clotting (less TXA2 means platelets stick less).\n\n' +
      'There are TWO versions of COX. COX-1 is "always on, housekeeping": it protects the stomach lining, keeps blood flowing into the kidney by widening the small artery that feeds the kidney filter (the afferent arteriole), and helps platelets stick together (via TXA2). COX-2 is mainly SWITCHED ON at sites of injury and drives swelling, pain and fever — but is also always present in the kidney and in the inner lining of blood vessels (the endothelium), where it makes PGI2 (a vessel-widener that stops platelets sticking).\n\n' +
      '(i) Aspirin is unique. It PERMANENTLY blocks platelet COX-1 by sticking a small chemical group (an acetyl group) onto the enzyme — like jamming a lock with glue. Platelets have NO nucleus (no "instruction manual" inside), so they cannot make fresh COX. The blocked platelet stays blocked for its entire life (7–10 days). That is why a tiny daily dose (75–100 mg) protects against heart attack and stroke, and why aspirin must be stopped about a week before planned surgery to allow new platelets to take over.\n\n' +
      '(ii) Coxibs (selective COX-2 blockers — celecoxib, etoricoxib) cause fewer stomach ulcers because they leave the protective stomach COX-1 alone. BUT in the inner lining of blood vessels, they block COX-2 — which normally makes PGI2 (the platelet-calming, vessel-widening substance). Platelet COX-1 (which makes the clotting signal TXA2) is left intact. The balance tips towards clotting, so coxibs raise the risk of heart attack and stroke, especially at high doses, with long-term use, or in patients with existing heart disease. Rule of thumb: use the lowest effective dose for the shortest time, and avoid them in patients with known heart disease.',
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
          'Salbutamol is a short-acting beta-2 agonist (SABA — a drug that switches on β2 receptors). The β2 receptor sits on the muscle around the airways. Switching it on activates an internal "go" signal (raises cAMP), which RELAXES the airway muscle and OPENS the breathing tubes within minutes. It is a RELIEVER (rescue puffer — fast on, short duration). Side effects: shaky hands (tremor), fast heart (tachycardia), and low blood potassium at high doses.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Ipratropium',
        detail:
          'Ipratropium is a short-acting muscarinic antagonist (it blocks acetylcholine, the chemical the vagus nerve uses to TIGHTEN the airways via M3 receptors). By blocking that signal, the airways open. Useful in COPD (Chronic Obstructive Pulmonary Disease — smoker\'s lung) and as an extra reliever in severe asthma attacks. Side effects (from blocking the "rest and digest" signal): dry mouth, urine retention.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Inhaled corticosteroid',
        detail:
          'Inhaled corticosteroids (ICS — man-made copies of cortisol, the body\'s anti-inflammation hormone) attach to a receptor inside the cell, then travel to the cell\'s "control room" (the nucleus) and switch OFF the genes that make inflammation chemicals (such as IL-4, IL-5 and COX-2) and switch ON the gene for β2 receptors. They calm the swollen, twitchy airways over days to weeks. ICS is a CONTROLLER — taken every day, even when well. Rinse the mouth after use to prevent oral thrush (a yeast infection in the mouth). At high doses long term, can dampen the body\'s own cortisol production (HPA axis suppression).',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Montelukast',
        detail:
          'Montelukast blocks the docking site (CysLT1 receptor) for leukotrienes (powerful inflammation chemicals in the airway). Result: less airway tightening, less mucus, less swelling. It is a CONTROLLER — particularly useful in asthma triggered by exercise or aspirin. Warning: mood changes, sleep disturbance and bad dreams (neuropsychiatric side effects).',
        marks: 2,
      },
    ],
    modelAnswer:
      '(a) Salbutamol is a short-acting beta-2 agonist (SABA). It switches on β2 receptors — docking sites on the muscle around the airways — which sends an internal "go" signal (raises cAMP) that relaxes the airway muscle. The breathing tubes OPEN within a few minutes. Salbutamol is the RELIEVER (rescue puffer). Common side effects: shaky hands, fast heartbeat, and at high doses a fall in blood potassium.\n\n' +
      '(b) Ipratropium is a short-acting muscarinic antagonist. The vagus nerve normally TIGHTENS airways using the chemical acetylcholine, which attaches to M3 receptors on the airway muscle. Ipratropium blocks the M3 docking site, so the tightening signal is switched off and airways open. It is a key bronchodilator in COPD (Chronic Obstructive Pulmonary Disease — long-term smoker\'s lung) and is added to salbutamol in severe asthma attacks. The long-acting version is tiotropium (once a day). Side effects: dry mouth, blurred vision, urine retention.\n\n' +
      '(c) Beclomethasone (or budesonide, fluticasone) is an inhaled corticosteroid (ICS — a man-made copy of cortisol, the body\'s anti-inflammation hormone). It enters the airway cell, attaches to a receptor inside, and the pair travels to the cell\'s "control room" (the nucleus) where it switches OFF the genes that make inflammation chemicals (IL-4, IL-5, COX-2) and switches ON the gene that makes β2 receptors. The result is a gradual, steady fall in airway inflammation and twitchiness. ICS is the cornerstone CONTROLLER — it takes days to weeks to work. Patients MUST rinse the mouth after each puff to prevent oral thrush (a mouth yeast infection); long-term high doses can dampen the body\'s own cortisol production and weaken bones.\n\n' +
      '(d) Montelukast blocks the docking site (CysLT1 receptor) used by leukotrienes — powerful inflammation chemicals that tighten airways, swell the lining and pump out mucus. By blocking that docking site, the airway stays calm. Montelukast is a CONTROLLER — especially useful in asthma triggered by exercise or by aspirin, and in children. Important warning: mood changes, sleep disturbance and nightmares can occur.\n\n' +
      'Summary: RELIEVER = salbutamol (plus ipratropium acutely). CONTROLLERS = inhaled corticosteroid (the cornerstone) + a long-acting β2 agonist or montelukast as add-ons.',
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
          'Nitrates release nitric oxide (NO — a chemical that widens blood vessels). When the vessels in the brain widen, the patient feels a throbbing headache. Manage: warn the patient (it usually fades after a few days of regular use); paracetamol helps.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Orthostatic hypotension',
        detail:
          'Nitrates widen the veins (venodilation), so less blood returns to the heart (preload drops). When the patient stands up, the heart cannot pump out enough blood — they feel dizzy or faint. Manage: take the dose while seated, rise slowly, avoid alcohol; sit or lie down if dizzy.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Reflex tachycardia',
        detail:
          'When BP drops, the body\'s pressure-sensors (baroreceptors) tell the sympathetic ("fight or flight") nerves to speed the heart up to push BP back up. Result: fast heartbeat. Manage: pair the nitrate with a β-blocker or a non-DHP CCB (a heart-slowing calcium channel blocker like diltiazem or verapamil) — they blunt the reflex AND treat angina too.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Tolerance',
        detail:
          'When nitrates are taken non-stop, the body stops responding (tolerance) — possibly because the mitochondria (the cells\' power stations) wear out the enzyme that releases NO from the nitrate. Manage: give a daily nitrate-free gap of at least 8 hours (usually overnight) so the body resets.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Severe hypotension with PDE5 inhibitors',
        detail:
          'Sildenafil and tadalafil (PDE5 inhibitors — used for erectile dysfunction) prolong the vessel-widening signal (cGMP). On top of a nitrate this can drop BP dangerously low. Manage: do NOT give a nitrate within 24 hours of sildenafil/vardenafil (48 hours for tadalafil); always ask the patient first.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. HEADACHE — nitrates release nitric oxide (NO — a chemical that widens blood vessels). The vessels in the brain widen, causing a throbbing, front-of-head headache. Management: tell the patient it usually settles within a few days of regular use; paracetamol can help; lower the dose if intolerable.\n\n' +
      '2. ORTHOSTATIC (POSTURAL) HYPOTENSION — nitrates widen the VEINS (venodilation), so less blood returns to the heart and cardiac output falls. When the patient stands up, BP drops and they feel dizzy or faint. Management: take sublingual ("under the tongue") nitrate while seated, rise slowly, avoid alcohol, sit or lie down if dizzy.\n\n' +
      '3. REFLEX TACHYCARDIA — the sudden BP drop is detected by pressure sensors (baroreceptors), which signal the sympathetic ("fight or flight") nerves to speed up the heart and push BP back up. Result: a faster heartbeat. Management: combine the nitrate with a β-blocker, or with a heart-slowing calcium channel blocker (non-dihydropyridine CCB — diltiazem or verapamil). They blunt the reflex AND treat angina.\n\n' +
      '4. TOLERANCE — with continuous nitrate exposure, the body stops responding. This is likely because the mitochondria (the cells\' power stations) wear out an enzyme (aldehyde dehydrogenase) needed to release NO from the nitrate. Management: build a daily NITRATE-FREE GAP of at least 8 hours (usually overnight) so the body resets; if pain breaks through that gap, use a short-acting nitrate or another anti-anginal drug.\n\n' +
      '5. SEVERE HYPOTENSION WITH PDE5 INHIBITORS — sildenafil and tadalafil block an enzyme (PDE5) that normally breaks down cGMP, the vessel-widening signal that nitrates use. Combining the two prolongs the signal massively and BP can drop to dangerous levels. Management: nitrates are CONTRAINDICATED within 24 hours of sildenafil/vardenafil and 48 hours of tadalafil; always ask before giving emergency nitrates.',
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
          'Hypokalaemia = low blood potassium. Furosemide flushes lots of sodium past the distal kidney tubule. The kidney swaps that sodium for potassium (under the salt-holding hormone aldosterone), so potassium is lost in urine. Monitor blood potassium, give oral potassium or add a potassium-sparing drug (e.g., spironolactone); low potassium is dangerous in patients also on digoxin (it can trigger digoxin toxicity).',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Hypovolaemia / hypotension',
        detail:
          'Too much fluid loss empties the tank — BP drops and there is less blood returning to the heart (low preload). Check daily weights, lying/standing BP and pulse, urine output and overall fluid balance; reduce the dose if the patient is over-dried.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Hyponatraemia / metabolic alkalosis',
        detail:
          'Hyponatraemia = low blood sodium (sodium loss exceeds water loss). Metabolic alkalosis = blood becomes too alkaline because the kidney also loses hydrogen ions (H+); volume contraction makes it worse. Check sodium and bicarbonate; restrict free water if sodium is low.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Ototoxicity',
        detail:
          'Ototoxicity = damage to the inner ear (causes ringing in the ears or temporary deafness). Risk goes up with high IV doses pushed quickly, or with other ear-damaging drugs (e.g., gentamicin). Manage: do NOT push IV doses fast — dilute and infuse over 15–20 minutes; avoid combining with aminoglycoside antibiotics when possible.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Hyperuricaemia / metabolic effects',
        detail:
          'Hyperuricaemia = high blood uric acid (can trigger gout — painful, swollen joint, classically the big toe). Furosemide competes with uric acid for the same kidney "exit" pump, so uric acid is held back. Can also raise blood sugar. Counsel the patient; treat gout if it flares.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. LOW BLOOD POTASSIUM (hypokalaemia) — furosemide dumps lots of sodium into the late part of the kidney tubule. To keep the body in balance, the kidney (under the salt-holding hormone aldosterone) swaps that sodium for potassium, which is then lost in urine. Check U&Es (urea and electrolytes) at the start and again within a few days; give oral potassium or add a potassium-sparing drug (e.g., spironolactone) if potassium falls below ~3.5 mmol/L. Low potassium is particularly dangerous in patients on digoxin (a heart drug) — it can trigger digoxin toxicity.\n\n' +
      '2. LOW FLUID VOLUME / LOW BP (hypovolaemia, hypotension) — too much diuresis empties the tank. Less blood returns to the heart, BP falls, and the patient feels dizzy on standing. Check daily weights, lying/standing BP and pulse, urine output and fluid balance chart; cut the dose if BP drops or urine output is excessive; teach the patient to recognise dizziness on standing.\n\n' +
      '3. LOW BLOOD SODIUM AND ALKALINE BLOOD (hyponatraemia, metabolic alkalosis) — sodium loss can outpace water loss; the kidney also loses hydrogen ions and chloride, and the volume contraction itself raises bicarbonate ("contraction alkalosis"). Check sodium and bicarbonate; restrict free water if sodium is low; be cautious about combining with a thiazide diuretic.\n\n' +
      '4. INNER-EAR DAMAGE (OTOTOXICITY — tinnitus, reversible deafness) — risk rises with high IV doses pushed quickly, severe kidney failure, or combination with ear-damaging antibiotics (aminoglycosides like gentamicin). Dilute IV doses; for large doses infuse over at least 15–20 minutes; avoid pairing with aminoglycosides where possible.\n\n' +
      '5. METABOLIC SIDE EFFECTS — high uric acid (can flare up GOUT — sudden hot, painful joint, classically the big toe), high blood sugar and altered cholesterol. Counsel patients with gout to report joint pain; check fasting glucose periodically; treat established gout with appropriate medicines.\n\n' +
      'Other safety points: never push IV furosemide quickly; warn older men with an enlarged prostate (BPH) about urinary retention as the bladder suddenly fills; review other kidney-stressing drugs (NSAIDs, gentamicin, ACE inhibitors) to lower the risk of sudden kidney injury (AKI).',
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
          'Warfarin is a blood thinner. It blocks the body\'s use of vitamin K (a vitamin needed to make clotting factors II, VII, IX and X — the proteins that form clots). With fewer clotting factors, the blood is thinner and new clots are less likely. It does NOT dissolve clots that are already there.',
        marks: 1,
      },
      {
        id: 'r2',
        label: 'Dose timing and consistency',
        detail:
          'Take warfarin ONCE a day at the SAME time (usually in the evening, so the dose can be adjusted the same day after the morning blood test). NEVER double up if you forget a dose — take it as soon as you remember on the same day, then carry on as normal.',
        marks: 1,
      },
      {
        id: 'r3',
        label: 'INR monitoring',
        detail:
          'INR (International Normalised Ratio) is a blood test that measures how thin the blood is. It is checked often at the start (every few days), then weekly, then monthly when stable. The target INR is usually 2.0–3.0 (higher for some heart-valve patients).',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Diet — vitamin K',
        detail:
          'Vitamin K (found in green leafy vegetables — kontomire, spinach, kale, broccoli) cancels out warfarin. You do NOT have to avoid these foods, but eat the SAME amount week to week. A sudden big plate of greens will drop the INR; suddenly stopping them will raise it.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Drug & herbal interactions',
        detail:
          'Do NOT start any new medicine, herbal product or pain reliever without checking with the pharmacist. Drugs that RAISE warfarin (bleeding risk): aspirin and other NSAIDs (ibuprofen, diclofenac), many antibiotics, antifungals, amiodarone (a heart-rhythm drug). Drugs that LOWER warfarin (clot risk): rifampicin (a TB drug), phenytoin (a fits drug).',
        marks: 1,
      },
      {
        id: 'r6',
        label: 'Bleeding precautions',
        detail:
          'Use a soft toothbrush and an electric razor. Avoid contact sports. Carry a warning card (or MedicAlert) at all times. Tell every dentist, doctor, surgeon and pharmacist that you are on warfarin BEFORE any procedure.',
        marks: 2,
      },
      {
        id: 'r7',
        label: 'When to seek help',
        detail:
          'Seek URGENT help for: unusual bruising or bleeding, blood in urine (pink or red), black tarry stools, blood in vomit, a bad headache, a head injury or fall, or if pregnancy is planned (warfarin harms the baby).',
        marks: 1,
      },
    ],
    modelAnswer:
      '1. PURPOSE: Warfarin is a blood thinner. It blocks the body\'s use of vitamin K (a vitamin needed to make four clotting proteins — factors II, VII, IX and X). With fewer of these proteins, the blood is thinner and new clots are less likely. Warfarin does NOT dissolve clots that are already there.\n\n' +
      '2. DOSE TIMING: Take warfarin ONCE a day, at the SAME time every day (usually in the evening, so any change after the morning blood test can take effect the same day). If you forget a dose, take it as soon as you remember on the same day; NEVER double up the next day. Keep a dose diary.\n\n' +
      '3. MONITORING: Warfarin works in a narrow window. The INR (International Normalised Ratio — a blood test that measures how thin the blood is) is checked every few days at the start, then weekly, then about every 4 weeks once stable. Target INR is usually 2.0–3.0 (higher for mechanical heart valves).\n\n' +
      '4. DIET: Vitamin K (in green leafy vegetables — kontomire, spinach, kale, broccoli) cancels out warfarin. You do NOT have to avoid these foods, but eat them in CONSISTENT amounts week to week. Big sudden plates of greens will drop the INR; suddenly stopping them will raise it.\n\n' +
      '5. INTERACTIONS: Do NOT start any new medicine, herbal product or pain reliever without checking — especially aspirin and other anti-inflammatory painkillers (NSAIDs — ibuprofen, diclofenac), antibiotics (amoxicillin, ciprofloxacin, metronidazole), antifungals and amiodarone (a heart-rhythm drug) — these RAISE warfarin and the bleeding risk. Rifampicin (a TB drug) and phenytoin (a fits drug) LOWER warfarin (clot risk). Limit alcohol.\n\n' +
      '6. BLEEDING PRECAUTIONS: Use a soft toothbrush and an electric razor. Wear gloves for gardening. Avoid contact sports. ALWAYS tell your dentist, surgeon and pharmacist that you are on warfarin BEFORE any procedure. Carry a warning card at all times.\n\n' +
      '7. WHEN TO GET URGENT HELP: any unusual bruising; bleeding that won\'t stop from cuts; bleeding gums or nose; pink, red or dark urine; black tarry stools; blood in vomit; a bad headache; a fall (especially on the head); or if you become pregnant or plan to (warfarin can harm the baby).',
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
          'Salbutamol is the RELIEVER (rescue puffer — only use when you actually feel wheezy or short of breath). Beclomethasone is the CONTROLLER (a daily preventer that calms the airways even when you feel fine).',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Inhaler technique',
        detail:
          'Shake the inhaler, breathe OUT fully, seal your lips around the mouthpiece, then breathe IN slowly and deeply as you press the canister. Hold your breath for 10 seconds and breathe out slowly. A SPACER (a plastic chamber attached to the inhaler) makes the drug reach the lungs better — use one if available.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Wait between puffs',
        detail:
          'If two puffs are prescribed, wait about 1 minute between puffs so the second puff spreads properly.',
        marks: 1,
      },
      {
        id: 'r4',
        label: 'Rinse mouth after ICS',
        detail:
          'After each beclomethasone (steroid) puff, rinse your mouth with water and SPIT IT OUT (or brush teeth) to prevent oral thrush (a yeast infection in the mouth that causes white patches and a sore tongue) and a hoarse voice.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Take ICS daily even when asymptomatic',
        detail:
          'The steroid inhaler works slowly — it takes DAYS to WEEKS to calm the airways. Take it every day even when you feel fine; do NOT stop because you "feel better".',
        marks: 1,
      },
      {
        id: 'r6',
        label: 'SABA side effects and overuse',
        detail:
          'Salbutamol can cause a few minutes of shaky hands and a fast heartbeat — this is harmless. WARNING: if you need the blue inhaler more than 2–3 times a week (apart from before exercise), your asthma is NOT under control — come back to be reviewed.',
        marks: 1,
      },
      {
        id: 'r7',
        label: 'Emergency / seek help',
        detail:
          'Get urgent help for: severe breathlessness, inability to speak in full sentences, blue lips, OR if the salbutamol doesn\'t help after 10 puffs (one at a time through a spacer). Always carry the reliever inhaler with you.',
        marks: 1,
      },
    ],
    modelAnswer:
      '• Two inhalers, two different jobs. Your BROWN/ORANGE inhaler (beclomethasone) is the CONTROLLER. It is a low-dose steroid (a calming, anti-inflammation medicine) that you must take every day, morning and evening, even on days you feel well — because it slowly settles the swelling inside the airways and stops attacks before they start.\n' +
      '• Your BLUE inhaler (salbutamol) is the RELIEVER. Only use it when you actually feel wheezy or short of breath, or 15 minutes before exercise if exercise makes you wheeze.\n' +
      '• Technique: shake the inhaler, breathe OUT fully, seal your lips around the mouthpiece, then breathe IN slowly and deeply as you press the canister. Hold your breath for about 10 seconds before breathing out slowly. A SPACER (a plastic chamber that you press the inhaler into) helps the drug get deep into the lungs — use one if you have it.\n' +
      '• If you have been told to take two puffs, wait about one minute between puffs.\n' +
      '• ALWAYS rinse your mouth with water and SPIT IT OUT after using the beclomethasone — this prevents oral thrush (a yeast infection that causes white patches in the mouth) and a hoarse voice.\n' +
      '• Do NOT stop the brown inhaler when you feel well. The steroid works slowly (days to weeks) and stopping it lets the inflammation creep back.\n' +
      '• Salbutamol can give you shaky hands and a fast heartbeat for a few minutes after a puff — this is expected and harmless. WARNING: if you need the blue inhaler MORE than 2–3 times a week (apart from before exercise), your asthma is NOT under control — come back to see us.\n' +
      '• Always carry the blue inhaler with you.\n' +
      '• Get URGENT help if: you cannot speak in full sentences, your lips look blue, your reliever does not help after 10 puffs (one at a time through a spacer), or your symptoms are getting worse.',
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
          'Start with ABC (Airway, Breathing, Circulation). Open the airway (head tilt/chin lift), give high-flow oxygen through a non-rebreather mask, and bag-and-mask ventilate if the patient is barely breathing or has stopped. Put the patient on a heart monitor and pulse oximeter (the finger probe that measures oxygen).',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Naloxone administration',
        detail:
          'Naloxone is the specific antidote — it kicks opioids off the μ receptor. Give 0.4 mg into a vein (IV). If the patient is a known dependent user, use small steps (0.04–0.1 mg) so you don\'t throw them into sudden withdrawal. Repeat every 2–3 minutes up to about 10 mg total. If no IV access, give it into a muscle (IM) or up the nose (intranasal).',
        marks: 3,
      },
      {
        id: 'r3',
        label: 'Reassess and prepare for repeat / infusion',
        detail:
          'Aim for an adequate breathing rate (≥12/min) and good oxygen — NOT full wide-awake alertness (which provokes severe withdrawal). Most opioids LAST LONGER than naloxone, so the patient can fall back asleep — set up a naloxone drip or repeat doses.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'IV access, fluids, glucose check',
        detail:
          'Set up an IV line; give normal saline if BP is low; check a finger-prick blood sugar (low sugar can also cause coma); do an ECG (heart tracing).',
        marks: 1,
      },
      {
        id: 'r5',
        label: 'Investigations and disposition',
        detail:
          'Send blood for ABG (arterial blood gas — shows how well the lungs and breathing are working), U&E (kidney function and salts), and a paracetamol level (people often take it together). Send urine for a drug screen. Keep the patient on a monitored ward for at least 4–6 hours after the LAST naloxone dose. Refer to mental health and drug-addiction services BEFORE discharge.',
        marks: 2,
      },
    ],
    modelAnswer:
      'IMMEDIATE (A–B–C): Airway, Breathing, Circulation.\n' +
      '• Open the airway (head tilt/chin lift, or jaw thrust if a neck injury is possible). Give high-flow oxygen through a non-rebreather mask. If the patient is barely breathing (<8/min) or has stopped, use a bag-valve-mask to push air in.\n' +
      '• Attach the pulse oximeter (finger probe that measures blood oxygen), a heart monitor, and put in an IV line.\n\n' +
      'SPECIFIC ANTIDOTE:\n' +
      '• Give NALOXONE 0.4 mg IV (lower steps of 0.04–0.1 mg if the patient is known to be opioid-dependent, to avoid sudden severe withdrawal). Repeat every 2–3 minutes, doubling the dose if there is no response, up to about 10 mg total. If you cannot get an IV in, give 0.4 mg into a muscle (IM) or 2 mg up the nose (intranasal).\n' +
      '• AIM: breathing rate of about 12/min with good oxygen — do NOT push for full wide-awake alertness, which throws the patient into severe withdrawal (vomiting, agitation, fits).\n\n' +
      'ONGOING MONITORING:\n' +
      '• Naloxone wears off (its half-life is 30–90 min) FASTER than most opioids, so the patient can slide back into coma. Plan either repeat boluses OR a naloxone drip (commonly two-thirds of the dose that revived them, every hour). Keep watching breathing rate, oxygen level, level of consciousness and pupils every 5–10 minutes at first.\n\n' +
      'SUPPORTIVE / DIAGNOSTIC:\n' +
      '• If BP is low, give measured 0.9% saline (salt water) into the vein. Check finger-prick blood sugar (low sugar can also cause coma — treat with 50 mL of 50% dextrose IV if low).\n' +
      '• 12-lead ECG (a heart tracing), ABG (arterial blood gas — shows lung and breathing function), U&E (kidney and salts), full blood count, paracetamol and salicylate (aspirin) levels (in case the patient took several things), and a urine drug screen.\n' +
      '• Watch for complications: aspiration pneumonia (lung infection from inhaled vomit), rhabdomyolysis (muscle break-down — can damage the kidney), and non-cardiogenic pulmonary oedema (fluid in the lungs that can appear after naloxone reversal).\n\n' +
      'DISPOSITION & SAFEGUARDING:\n' +
      '• Admit to a monitored bed. Do NOT discharge while the original opioid could still be active. Refer for mental health assessment, drug substitution therapy and harm reduction (take-home naloxone kit, clean equipment) before discharge.',
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
          'Start with an ACE inhibitor (e.g., lisinopril 10 mg once daily) or, if the cough is troublesome, an ARB (Angiotensin Receptor Blocker, e.g., losartan 50 mg once daily). These are first choice because the patient also has type-2 diabetes with microalbuminuria (tiny leak of protein in urine — the earliest sign of kidney damage from diabetes); ACE-I/ARB lower the pressure inside the kidney filter and protect it from further damage.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Add-on therapy if BP > target',
        detail:
          'If BP is still above target, ADD a calcium channel blocker (amlodipine 5–10 mg) or a thiazide-like diuretic (indapamide or bendroflumethiazide). β-blockers are not first-choice in simple high BP unless there is another reason to use them (recent heart attack, angina or rapid atrial fibrillation).',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Baseline & monitoring',
        detail:
          'Before starting: blood tests for kidney function (U&Es and eGFR — Estimated Glomerular Filtration Rate), potassium (K+), urine albumin-to-creatinine ratio (ACR — checks protein leak), HbA1c (3-month average blood sugar), fasting glucose, lipid panel, and a 12-lead ECG. Recheck kidney function and potassium 1–2 weeks after starting or increasing the ACE-I/ARB. Use a home BP diary; review every 2–4 weeks until BP is controlled.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Common adverse effects + counselling',
        detail:
          'ACE inhibitor: dry cough, high potassium (hyperkalaemia), dizziness, and rarely angioedema (sudden swelling of lips/tongue — STOP the drug at once and get emergency help). Amlodipine: ankle swelling, headache, flushing. Warn about dizziness on standing.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Lifestyle advice',
        detail:
          'Reduce dietary salt (under 5 g/day — about a teaspoon); limit alcohol; lose weight if BMI is high; 30 minutes of brisk aerobic exercise on most days; stop smoking; follow a DASH-style diet (lots of fruit, vegetables, low-fat dairy and whole grains); self-monitor blood sugar; treat high cholesterol.',
        marks: 2,
      },
    ],
    modelAnswer:
      'FIRST-LINE DRUG CHOICE: This patient has high blood pressure (HTN) PLUS type-2 diabetes with microalbuminuria (a tiny leak of protein in the urine — the EARLIEST sign of kidney damage from diabetes). The first-choice drug is an ACE INHIBITOR (e.g., lisinopril 10 mg once a day). If a dry cough develops, switch to an ARB (Angiotensin Receptor Blocker, e.g., losartan 50 mg once a day). These drugs lower BP AND lower the pressure inside the kidney filter, slowing further kidney damage.\n\n' +
      'STEP-UP THERAPY: If BP is still above target (usually <130/80 in diabetes with protein leak), ADD a calcium channel blocker (amlodipine 5–10 mg once a day) or a thiazide-like diuretic (indapamide 1.5 mg or bendroflumethiazide 2.5 mg once a day). Step three combines all three. β-blockers are NOT first-line for high BP unless there is another reason (after a heart attack, angina or atrial fibrillation needing rate control).\n\n' +
      'BASELINE INVESTIGATIONS: U&Es (urea and electrolytes — kidney function and salts), eGFR (Estimated Glomerular Filtration Rate — kidney filter rate), potassium (K+), urine albumin-to-creatinine ratio (ACR — measures protein leak), HbA1c (3-month average blood sugar), fasting glucose, lipid panel (cholesterol), 12-lead ECG, baseline weight and BMI (Body Mass Index). Check the back of the eye (funduscopy) for damage from high BP.\n\n' +
      'MONITORING: Recheck U&Es and potassium 1–2 weeks after starting or increasing the ACE-I/ARB (a big jump in creatinine or in potassium means stop and review). Use a home BP diary; clinic review every 2–4 weeks until BP is at target, then every 3–6 months. Once a year recheck urine protein and kidney function.\n\n' +
      'COMMON ADVERSE EFFECTS to counsel about:\n' +
      '• ACE-I: dry cough; high blood potassium (hyperkalaemia); dizziness and low BP on standing; ANGIOEDEMA (rare but serious — sudden swelling of face, lips or tongue — STOP the drug and get emergency help).\n' +
      '• ARB: similar but rarely cough.\n' +
      '• Amlodipine: ankle swelling, headache, facial flushing.\n' +
      '• Thiazides: low potassium, high uric acid (can trigger gout), high blood sugar.\n\n' +
      'LIFESTYLE / NON-DRUG STEPS: Cut dietary salt (under 5 g/day — about a teaspoon); follow a DASH-style diet (lots of fruit, vegetables, low-fat dairy and whole grains); lose weight to a BMI under 25; limit alcohol (no more than ~2 units/day); do 30 minutes of brisk aerobic exercise on most days; stop smoking. Manage diabetes (lifestyle plus metformin first-line) and treat the high cholesterol with a statin, given his overall heart-attack and stroke risk.',
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
          'Confirm the patient\'s identity using at least TWO checks (e.g., full name AND hospital number, or full name AND date of birth) and check the ID band. Worst-case violation: giving cancer chemotherapy meant for one patient to another patient.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Right drug',
        detail:
          'Read the label THREE times (when picking it up, when preparing it, and at the bedside) and match it to the prescription/MAR (Medication Administration Record — the official chart of what is to be given). Check for allergies and for look-alike/sound-alike drugs (LASA — drugs whose names look or sound similar). Worst-case violation: dispensing hydralazine (a BP drug) instead of hydroxyzine (an antihistamine).',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Right dose',
        detail:
          'Calculate the dose carefully. For "high-alert" drugs (insulin, heparin, opioids, paediatric and chemotherapy doses) a second nurse should independently double-check. Worst-case violation: a ten-times morphine overdose in a child causing the child to stop breathing.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Right route',
        detail:
          'Confirm that the prescribed ROUTE (where the drug goes in — by mouth, into a vein, into muscle, etc.) matches the formulation (the form it comes in). Worst-case violation: giving vincristine (a chemo drug) INTRATHECALLY (into the spinal fluid) instead of IV — almost always fatal.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Right time',
        detail:
          'Give the drug within the right time window (usually ±30 minutes) and at the right gap between doses, and respect food–drug rules (e.g., captopril before food, levodopa away from high-protein meals). Worst-case violation: late or irregular antibiotic doses → drug level falls too low → bug survives and bacterial RESISTANCE develops.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. RIGHT PATIENT — Confirm identity with TWO checks (e.g., full name AND hospital number, or full name AND date of birth) and look at the ID band before giving any medicine. Worst-case violation: giving a controlled drug or cancer chemotherapy to the wrong patient.\n\n' +
      '2. RIGHT DRUG — Read the medication label THREE times (when picking it from the trolley/cabinet, when preparing the dose, and at the bedside) and compare it with the prescription / MAR (Medication Administration Record — the official chart of what is to be given). Always check for allergies and for LOOK-ALIKE / SOUND-ALIKE drugs (LASA — e.g., hydralazine vs hydroxyzine; methotrexate WEEKLY vs DAILY). Worst-case: giving penicillin to a known penicillin-allergic patient → anaphylaxis (a life-threatening severe allergic reaction).\n\n' +
      '3. RIGHT DOSE — Calculate the dose, and for "high-alert" drugs (insulin, heparin, opioids, paediatric and chemotherapy doses) have a second nurse independently double-check it. Use weight-based formulas where appropriate. Worst-case: a ten-times morphine overdose in a child causing the child to stop breathing (apnoea).\n\n' +
      '4. RIGHT ROUTE — Confirm the prescribed ROUTE (where the drug goes in — by mouth, into a vein, into muscle, under the skin, etc.) matches the formulation and the patient\'s ability to take it. Some route mistakes are deadly: vincristine (a cancer drug) given into the spinal fluid (INTRATHECALLY) instead of into a vein is almost always fatal.\n\n' +
      '5. RIGHT TIME — Give the drug within the correct time window (usually ±30 minutes), keep the correct gap between doses (so blood levels stay in the therapeutic range — important for antibiotics and anti-epileptics), and consider food–drug rules (e.g., captopril before food; levodopa away from high-protein meals). Worst-case: erratic timing of antibiotics → blood levels dip below the killing dose → bug survives → ANTIMICROBIAL RESISTANCE develops.\n\n' +
      'Many hospitals now teach extra "Rights" — right documentation, right reason, right response and right to refuse — to strengthen safety further.',
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
          'Tablets = dose ordered ÷ dose per tablet = 500 mg ÷ 250 mg = 2 tablets.',
        marks: 2,
      },
      {
        id: 'r2',
        label: '(b) ≈31 gtts/min',
        detail:
          'Drops per minute (gtts/min — "gtts" is the medical short-form for drops) = (volume in mL × drop factor in gtts/mL) ÷ time in minutes = (1000 × 15) ÷ (8 × 60) = 15 000 ÷ 480 ≈ 31 gtts/min.',
        marks: 2,
      },
      {
        id: 'r3',
        label: '(c) 2 mL',
        detail:
          'Volume to draw = dose ÷ stock concentration = 80 mg ÷ 40 mg per mL = 2 mL.',
        marks: 2,
      },
      {
        id: 'r4',
        label: '(d) 7.5 mL',
        detail:
          'Dose for the child = weight × dose per kg = 12 × 15 = 180 mg. Volume = (180 ÷ 120) × 5 = 7.5 mL of the 120 mg/5 mL syrup.',
        marks: 2,
      },
      {
        id: 'r5',
        label: '(e) 20 mL/hour',
        detail:
          'Concentration in the bag = 25 000 units ÷ 500 mL = 50 units per mL. Pump rate = 1000 units per hour ÷ 50 units per mL = 20 mL/hour.',
        marks: 2,
      },
    ],
    modelAnswer:
      '(a) Tablets needed = ordered dose ÷ strength per tablet = 500 mg ÷ 250 mg = **2 tablets**.\n\n' +
      '(b) Drops per minute (gtts/min — "gtts" is the medical short-form for drops):\n' +
      '   gtts/min = (volume in mL × drop factor in gtts/mL) ÷ time in minutes\n' +
      '   = (1000 × 15) ÷ (8 × 60)\n' +
      '   = 15 000 ÷ 480\n' +
      '   ≈ 31.25 → **31 gtts/min**.\n\n' +
      '(c) Volume to draw up into the syringe = ordered dose ÷ stock concentration\n' +
      '   = 80 mg ÷ 40 mg per mL\n' +
      '   = **2 mL** to be given into a muscle (IM).\n\n' +
      '(d) Weight-based dose: 12 kg × 15 mg/kg = 180 mg.\n' +
      '   Volume of syrup = (dose ÷ stock dose) × stock volume = (180 ÷ 120) × 5 = **7.5 mL** of the 120 mg/5 mL syrup.\n\n' +
      '(e) Concentration of the heparin drip = 25 000 units ÷ 500 mL = 50 units per mL.\n' +
      '   Pump rate = units wanted per hour ÷ concentration = 1000 ÷ 50 = **20 mL/hour**.\n\n' +
      'Always have a SECOND nurse independently double-check high-alert calculations (insulin, heparin, paediatric doses).',
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
          'Mechanism: Penicillins stop bacteria from building their cell wall. They stick to bacterial proteins called PBPs (Penicillin-Binding Proteins — the enzymes that stitch the cell wall together), so the wall cannot cross-link and the bug bursts. Indication: chest infections (pneumonia), skin and soft-tissue infections, syphilis. Counselling: finish the WHOLE course even if you feel better, and report a rash, swelling or wheeze immediately (signs of an allergic reaction).',
        marks: 3,
      },
      {
        id: 'r2',
        label: 'Aminoglycosides — MoA, indication, and counselling/monitoring',
        detail:
          'Mechanism: Aminoglycosides stick PERMANENTLY to the bacterial 30S ribosome (the bug\'s protein-making factory), so the bug makes faulty proteins and dies. Indication: severe infections caused by Gram-negative bacteria (a class of bugs with a thin, hard-to-penetrate wall) — sepsis ("blood poisoning"), complicated urinary tract infections. Counselling/monitoring: blood levels must be checked (TDM — Therapeutic Drug Monitoring); watch for hearing changes or ringing in the ears (ototoxicity — damage to the inner ear), and reduced urine output (nephrotoxicity — kidney damage).',
        marks: 3,
      },
      {
        id: 'r3',
        label: 'Metronidazole — MoA, indication, and counselling',
        detail:
          'Mechanism: Metronidazole is a "prodrug" (inactive when given). Inside an anaerobic bug (one that lives without oxygen) or a parasite, it is turned into reactive chemicals that shred the bug\'s DNA (its instruction manual), killing it. Indication: infections caused by oxygen-avoiding bacteria (intra-abdominal sepsis, bacterial vaginosis) or by single-celled parasites (amoebiasis, giardiasis). Counselling: STRICTLY avoid alcohol during and for 48 hours after — combining the two causes a "disulfiram-like" reaction (severe vomiting, flushing, fast heartbeat).',
        marks: 3,
      },
    ],
    modelAnswer:
      '1. PENICILLINS (e.g., Amoxicillin)\n' +
      '   • Mechanism of action: penicillins KILL bacteria (bactericidal). They stop the bug from finishing its cell wall by sticking to bacterial proteins called PBPs (Penicillin-Binding Proteins — the enzymes that stitch the wall together). With no proper wall, water rushes in and the bug bursts.\n' +
      '   • Clinical use: community-acquired pneumonia (chest infection), middle-ear infections (otitis media), tonsillitis, skin and soft-tissue infections.\n' +
      '   • Counselling: take doses evenly spaced through the day and FINISH THE WHOLE COURSE, even if you feel better, to avoid resistance. Report rash, hives, lip swelling or wheezing at once — these are signs of an allergic reaction.\n\n' +
      '2. AMINOGLYCOSIDES (e.g., Gentamicin)\n' +
      '   • Mechanism of action: bactericidal. They cross the bug\'s membrane and stick PERMANENTLY to the 30S ribosome (the bug\'s protein-making factory), so the bug builds faulty, useless proteins.\n' +
      '   • Clinical use: severe infections caused by Gram-negative bacteria (a group of bugs with a thin, hard-to-penetrate wall) — blood poisoning (septicaemia), complicated urinary infections, and (with another antibiotic) bacterial infection of the heart valves (endocarditis).\n' +
      '   • Counselling/monitoring: blood will be drawn to check drug levels (Therapeutic Drug Monitoring — TDM). Tell the nurse if you notice ringing in the ears (tinnitus), hearing loss or dizziness (signs of inner-ear damage — ototoxicity). Urine output and blood creatinine are checked because the kidney can be damaged (nephrotoxicity).\n\n' +
      '3. METRONIDAZOLE\n' +
      '   • Mechanism of action: bactericidal. Metronidazole is a "prodrug" — inactive when given. Inside bugs that live WITHOUT oxygen (anaerobic bacteria) and single-celled parasites (protozoa), the drug is switched on into reactive chemicals that shred the bug\'s DNA (its instruction manual), killing it.\n' +
      '   • Clinical use: infections by oxygen-avoiding bacteria (e.g., pelvic inflammatory disease, dental abscesses, the antibiotic-associated diarrhoea called pseudomembranous colitis) and parasite infections (amoebiasis, giardiasis, trichomoniasis).\n' +
      '   • Counselling: STRICTLY no alcohol — not even in mouthwash or cough syrup — during the course and for 48 hours after. Combining metronidazole with alcohol causes a "disulfiram-like" reaction: headache, severe vomiting, abdominal cramps, flushing and a pounding heart. Take with food to reduce stomach upset.',
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
          'Rapid-acting (e.g., lispro): starts working in ~15 minutes, strongest at 1–2 hours, lasts 3–5 hours. Long-acting (e.g., glargine): starts in 1–2 hours, has NO peak (it gives a steady "background" level), lasts about 24 hours. Rapid-acting covers MEALS; long-acting covers between meals and overnight.',
        marks: 4,
      },
      {
        id: 'r2',
        label: 'Clinical signs of hypoglycemic shock',
        detail:
          'EARLY (adrenergic — from sympathetic "fight or flight" nerves switching on): sweating, shaking, fast heartbeat, palpitations, anxiety, hunger. LATE (neuroglycopenic — from the brain running out of sugar): confusion, slurred speech, headache, blurred vision, fits, loss of consciousness, coma.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Nursing management of conscious hypoglycemic patient',
        detail:
          'Use the "Rule of 15": give 15–20 g of fast-acting sugar by mouth (about 150 mL of fruit juice, 3–4 glucose tablets, or 3 teaspoons of sugar dissolved in water). Recheck the blood sugar in 15 minutes. Repeat if it is still below 4 mmol/L. Once stable, follow with a slower-release snack containing complex carbohydrates (e.g., bread, crackers) to stop a rebound.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Nursing management of unconscious hypoglycemic patient',
        detail:
          'Do NOT put anything in the mouth (risk of inhaling it into the lungs — aspiration). Give IV DEXTROSE (sugar into a vein — e.g., 20–50 mL of 50% dextrose or 100 mL of 10% dextrose) through a working IV line, OR give 1 mg of GLUCAGON (a hormone that releases stored sugar from the liver) into a muscle or under the skin. Recheck blood sugar; monitor consciousness and breathing; then find out why the hypo happened.',
        marks: 2,
      },
    ],
    modelAnswer:
      '(a) INSULIN COMPARISON:\n' +
      '   • Rapid-Acting Insulin (e.g., Insulin Lispro, Aspart):\n' +
      '     - Onset (starts working): 10–20 minutes (give it just before or just after meals).\n' +
      '     - Peak (strongest point): 1–2 hours.\n' +
      '     - Duration (how long it lasts): 3–5 hours.\n' +
      '   • Long-Acting Insulin (e.g., Insulin Glargine, Detemir):\n' +
      '     - Onset: 1–2 hours.\n' +
      '     - Peak: NO peak — gives a flat, steady "background" level.\n' +
      '     - Duration: about 24 hours (usually given once daily at bedtime).\n' +
      '   In short: rapid-acting covers MEALS; long-acting covers between meals and overnight.\n\n' +
      '(b) LOW BLOOD SUGAR (hypoglycaemia — blood sugar under 3.9 mmol/L or 70 mg/dL):\n' +
      '   • Clinical signs:\n' +
      '     - EARLY (adrenergic — caused by the sympathetic "fight or flight" nerves switching on): sweating, shakiness, fast heartbeat, palpitations, anxiety, hunger.\n' +
      '     - LATE (neuroglycopenic — caused by the brain running out of sugar): confusion, irritability, slurred speech, blurred vision, headache, dizziness, poor coordination, fits, loss of consciousness, coma.\n' +
      '   • Nursing management for a CONSCIOUS patient (Rule of 15):\n' +
      '     1. Confirm low blood sugar with a glucometer (finger-prick sugar machine) if one is at hand — but do NOT delay treatment in an obvious hypo.\n' +
      '     2. Give 15–20 g of fast-acting sugar BY MOUTH — about 150 mL of fruit juice or regular soft drink, 3–4 glucose tablets, or 3 teaspoons of sugar dissolved in water.\n' +
      '     3. Wait 15 minutes and retest blood sugar.\n' +
      '     4. If blood sugar is still under 4.0 mmol/L, repeat the sugar and recheck in another 15 minutes.\n' +
      '     5. Once blood sugar is normal, follow up with a slower-release snack (bread, crackers, milk) to stop a rebound.\n' +
      '   • Nursing management for an UNCONSCIOUS patient:\n' +
      '     1. Protect the airway; place the patient in the recovery position; keep them safe.\n' +
      '     2. Do NOT put anything in the mouth (risk of inhaling it into the lungs — aspiration).\n' +
      '     3. Open an IV line and give 20–50 mL of 50% DEXTROSE (sugar solution) IV slowly (or 100 mL of 10% dextrose IV) over 2–3 minutes; flush the line afterwards (the sugar irritates the vein).\n' +
      '     4. If no IV access, give 1 mg of GLUCAGON (a hormone that releases stored sugar from the liver) into a muscle (IM) or under the skin (SC).\n' +
      '     5. Recheck blood sugar in 15 minutes; monitor vital signs and consciousness. Once awake and able to swallow safely, give sugar by mouth and then a snack.',
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
          'Mechanism: Oxytocin attaches to oxytocin receptors (docking sites) on the muscle of the womb (myometrium). This sets off an internal signal that releases calcium inside the muscle cells, making the womb contract in rhythmic waves (like normal labour). Contraindication: anything that physically blocks delivery (e.g., cephalopelvic disproportion — baby\'s head too big for the mother\'s pelvis), distress in the baby, placenta praevia (placenta covering the cervix).',
        marks: 3,
      },
      {
        id: 'r2',
        label: 'Ergometrine — MoA and contraindication',
        detail:
          'Mechanism: Ergometrine acts directly on the muscle of the womb by partly activating several receptor types (alpha-adrenergic, serotonin and dopamine receptors). This produces a SUSTAINED tight squeeze (tonic contraction), which clamps blood vessels at the placenta site and stops bleeding. Contraindication: high blood pressure (existing or pregnancy-induced), pre-eclampsia (high BP with protein in urine during pregnancy), eclampsia (pre-eclampsia plus fits), and heart disease — because ergometrine also tightens vessels in the rest of the body and can trigger a hypertensive crisis.',
        marks: 3,
      },
      {
        id: 'r3',
        label: 'Misoprostol — MoA and contraindication',
        detail:
          'Mechanism: Misoprostol is a man-made tablet form of prostaglandin E1 (PGE1 — a natural womb-stimulating signal molecule). It attaches to prostaglandin receptors on the womb muscle, raises calcium inside, and triggers strong contractions. It also softens the cervix. Contraindication: allergy to prostaglandins; should NOT be used to PREVENT bleeding BEFORE the baby has been delivered.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Uterotonic Storage & Cold Chain in Ghana',
        detail:
          'Oxytocin and ergometrine are PROTEINS/ALKALOIDS that break down quickly in heat. They must be kept in a fridge at 2–8 °C ("cold chain" — the unbroken chain of refrigeration from factory to patient). Hot Ghanaian room temperature destroys them within weeks. Misoprostol is a stable TABLET that can sit at room temperature.',
        marks: 2,
      },
    ],
    modelAnswer:
      '(a) MECHANISMS OF ACTION:\n' +
      '   • Oxytocin: attaches to oxytocin receptors (docking sites) on the muscle of the womb (the myometrium). This sets off an internal signal (via phospholipase C) that releases calcium inside the muscle cells. The rise in calcium makes the muscle fibres pull on each other (actin–myosin cross-bridging), producing rhythmic, wave-like womb contractions just like normal labour.\n' +
      '   • Ergometrine: an ergot alkaloid (a chemical from a fungus that grows on rye) that acts directly on the womb muscle by part-switching several receptor types (alpha-adrenergic, serotonin and dopamine). The result is a sustained, tight squeeze (tonic contraction) with very little relaxation. That sustained squeeze clamps blood vessels at the placenta site and stops bleeding.\n' +
      '   • Misoprostol: a man-made tablet form of prostaglandin E1 (PGE1 — a natural womb-stimulating signal molecule). It attaches to prostaglandin receptors on the womb muscle, raises internal calcium, and produces strong womb contractions. It also softens (ripens) the cervix.\n\n' +
      '(b) KEY CONTRAINDICATIONS:\n' +
      '   • Oxytocin: anything that physically blocks delivery (e.g., baby\'s head too big for the mother\'s pelvis — cephalopelvic disproportion), distress in the baby before delivery, placenta praevia (placenta covering the cervix), and severe pre-eclampsia (severe high BP with protein in urine during pregnancy).\n' +
      '   • Ergometrine: severe high BP, pre-eclampsia, eclampsia (pre-eclampsia plus fits) and disease of the peripheral arteries. Ergometrine ALSO tightens vessels in the rest of the body, so in these patients it can trigger a hypertensive crisis or even a stroke.\n' +
      '   • Misoprostol: allergy to prostaglandins; active labour with a live baby (must be very carefully dosed for labour induction — high doses risk tearing the womb).\n\n' +
      '(c) STORAGE IN GHANA:\n' +
      '   • Oxytocin and ergometrine are very HEAT-SENSITIVE and unstable at room temperature. In tropical Ghana they must be stored on the "cold chain" — an unbroken chain of refrigeration from factory to patient — between **2 °C and 8 °C** in a working fridge.\n' +
      '   • At ordinary Ghanaian room temperature (25–30 °C or higher) they lose strength within weeks and become useless — a hidden cause of preventable deaths from heavy bleeding after childbirth (postpartum haemorrhage — PPH). Ergometrine must also be protected from light.\n' +
      '   • Misoprostol is a stable TABLET and can sit at room temperature (under 30 °C) without refrigeration. This makes it the lifesaving alternative for rural health posts and CHPS compounds (Community-based Health Planning and Services centres) where electricity and fridges are unreliable.',
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
