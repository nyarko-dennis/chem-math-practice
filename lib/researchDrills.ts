import { ResearchTopic } from './researchQuestions';

export interface RubricPoint {
  id: string;
  label: string;
  detail: string;
  marks: number;
}

export type DrillKind =
  | 'topicToObjective'         // Given a topic, write the main objective
  | 'mainToSpecific'           // Given a main objective, write specific objectives
  | 'so2rq'                    // Convert specific objectives to research questions
  | 'rq2so'                    // Convert research questions to specific objectives
  | 'themes'                   // Convert research questions into LR themes/headings
  | 'themeToLR'                // Write an LR paragraph for a given theme
  | 'significance'             // Write significance of the study
  | 'retroVsPro'               // Differentiate retrospective vs prospective (advantages/disadvantages)
  | 'instrumentChoice'         // Choose & justify instrument for a retro vs pro study
  | 'ivdv'                     // Identify IV and DV (and mediating/moderating where relevant)
  | 'topicComponents'          // Break a research title into its components
  | 'problemTree'              // Construct a problem tree (causes / problem / effects)
  | 'conceptualFramework'      // Write a conceptual framework narrative for a topic
  | 'eligibility'              // Write inclusion and exclusion criteria for a topic
  | 'methodsVsMethodology'     // Differentiate research methods from methodology
  | 'samplingProcedure'        // Write the sampling procedure for a given study
  | 'ethicsWriting'            // Write the ethical considerations section for a study
  | 'validityReliabilityWriting' // Describe how to ensure validity & reliability of the tool
  | 'studyAreaWriting'         // Describe the study area / site / setting for a study
  | 'trustworthiness'          // Establish trustworthiness for a qualitative study
  | 'operationalDefinitions';  // Write operational definitions for key terms in a topic

export interface ResearchDrill {
  id: string;
  topic: ResearchTopic;
  drillKind: DrillKind;
  type: 'drill';
  prompt: string;
  marks: number;
  rubric: RubricPoint[];
  modelAnswer: string;             // shown after reveal
  referenceSections: string[];     // pointer text shown in the UI
}

// ============================================================
// 20 IV/DV TOPICS — grounded in the examples in research.md.
// Each is one drill (drillKind = 'ivdv').
// ============================================================

interface IVDVSeed {
  topic: string;
  iv: string;
  dv: string;
  mediating?: string;
  moderating?: string;
  control?: string;
  source: string; // section reference
}

const IVDV_SEEDS: IVDVSeed[] = [
  {
    topic: 'The Effect of Health Education on Hand Hygiene Practices among Nursing Students.',
    iv: 'Health education intervention (e.g., workshop vs. no workshop)',
    dv: 'Hand hygiene practice levels',
    source: 'Identify the dependent & independent variables',
  },
  {
    topic: 'Influence of Personal Protective Equipment Availability on Compliance with Infection Control Protocols among Nurses in Accra Hospitals.',
    iv: 'Availability of PPE (good vs. poor)',
    dv: 'Compliance with infection control protocols',
    source: 'Identify the dependent & independent variables',
  },
  {
    topic: 'Impact of Workload on Adherence to Aseptic Techniques among Midwives in Rural Health Centres.',
    iv: 'Workload (number of patients per midwife per shift)',
    dv: 'Adherence to aseptic techniques',
    source: 'Identify the dependent & independent variables',
  },
  {
    topic: 'Nurses’ Knowledge on Nosocomial Infection Preventive Measures and Its Associated Factors in Ghana: A Cross-Sectional Study.',
    iv: 'Age and attendance at in-service training/workshops',
    dv: 'Level of knowledge on nosocomial infection preventive measures',
    source: 'Identify the dependent & independent variables',
  },
  {
    topic: 'Nurses’ Knowledge, Attitude, and Practice in Nutrition Management of Hospitalised Adults: A Mixed-Methods Study.',
    iv: 'Level of education, years of employment, nursing rank, specialty',
    dv: 'KAP scores in nutrition management',
    source: 'Identify the dependent & independent variables',
  },
  {
    topic: 'Nurses’ Experiences in Neonatal Sepsis Prevention and Management: Selected Hospitals in a Metropolitan Area, Ghana.',
    iv: 'Hospital setting, access to sepsis-prevention training, availability of resources',
    dv: 'Experiences or performance in neonatal sepsis prevention and management',
    source: 'Identify the dependent & independent variables',
  },
  {
    topic: 'Prevalence and Determinants of Hypertension Control among Patients Attending Public Hospitals in Accra, Ghana.',
    iv: 'Socio-demographic factors (age, sex, education, income), medication adherence, health-system factors (clinic attendance frequency, waiting times, cost)',
    dv: 'Hypertension control among adult patients',
    source: 'Quantitative Topics — Topic 1',
  },
  {
    topic: 'Effect of Health Education Intervention on Malaria Prevention Practices among School-Aged Children in the Northern Region of Ghana: A Quasi-Experimental Study.',
    iv: 'Health education intervention (structured vs. no intervention)',
    dv: 'Malaria prevention practices among school-aged children',
    moderating: 'Socio-economic status (household income, parental education)',
    source: 'Quantitative Topics — Topic 2',
  },
  {
    topic: 'The Impact of Nurse Workload on the Quality of Patient Care in Public Hospitals.',
    iv: 'Nurse workload (patients assigned per nurse / hours worked per shift)',
    dv: 'Quality of patient care (satisfaction, recovery outcomes, error rates)',
    mediating: 'Job stress',
    moderating: 'Level of experience',
    control: 'Shift type and hospital unit',
    source: 'Conceptual Framework — Types of Variables',
  },
  {
    topic: 'The Impact of Work-Related Stress on the Quality of Patient Care among Nurses in Public Hospitals.',
    iv: 'Work-related stress (workload, shift patterns, staffing shortages, emotional strain)',
    dv: 'Quality of patient care (patient safety, timeliness, adherence to standards)',
    mediating: 'Job satisfaction and coping mechanisms',
    source: 'Conceptual Framework Cont’d — Job Demand–Control Model',
  },
  {
    topic: 'Assessing the Relationship Between Nurses’ Knowledge and Practice of Infection Prevention and Control (IPC) Measures in a Tertiary Hospital.',
    iv: 'Nurses’ knowledge of IPC (hand hygiene, PPE use, waste management)',
    dv: 'Practice of IPC measures',
    mediating: 'Attitudes toward IPC guidelines',
    source: 'Conceptual Framework — KAP Model',
  },
  {
    topic: 'Assessing the Impact of Evidence-Based Practice Training on Nursing Students’ Knowledge and Skills at Korle-Bu Teaching Hospital.',
    iv: 'Training on evidence-based practice',
    dv: 'Level of EBP knowledge or skill among nursing students',
    mediating: 'Motivation or access to learning materials',
    moderating: 'Years of work experience or educational level',
    control: 'Age, gender, or clinical department',
    source: 'Types of Variables in Research',
  },
  {
    topic: 'Factors Influencing Adherence to Antenatal Care (ANC) Visits among Pregnant Women in Urban Health Facilities.',
    iv: 'Predisposing factors (age, education, marital status, cultural beliefs), enabling factors (income, insurance, distance, partner support), need factors (perceived health, complications)',
    dv: 'Adherence to ANC visits (number of visits completed per WHO recommendation)',
    mediating: 'Attitude toward ANC (perceived importance, satisfaction with services)',
    source: 'Conceptual Framework Cont’d — Andersen’s Behavioral Model',
  },
  {
    topic: 'Exploring the Experiences of Family Caregivers of Patients with Chronic Illness in Urban Communities.',
    iv: 'Caregiving experience (emotional, physical, financial challenges)',
    dv: 'Caregiver’s psychological well-being (stress, resilience, quality of life)',
    mediating: 'Coping mechanisms (problem-focused, emotion-focused)',
    source: 'Conceptual Framework Cont’d — Lazarus & Folkman',
  },
  {
    topic: 'Effects of Stress on Academic Motivation and Academic Achievement of Students in Nursing Education at Nursing and Midwifery Training College, Korle-Bu.',
    iv: 'Perceived stress levels',
    dv: 'Academic motivation and academic achievement (GPA / exam scores)',
    source: 'Why Research is Considered a Scientific Process — Korle-Bu example',
  },
  {
    topic: 'Knowledge, Attitude and Practice toward Value-Based Care among Chinese Nurses: A Cross-Sectional Study.',
    iv: 'Demographic / professional factors associated with practice (training, experience, ward)',
    dv: 'Practice behaviours of nurses in value-based care',
    mediating: 'Attitudes toward value-based care',
    source: 'Understanding and Formulating Specific Objectives — KAP value-based care',
  },
  {
    topic: 'Knowledge of Hand Hygiene and Evaluation of Hand-Washing Technique among Nurses at a University Teaching Hospital.',
    iv: 'Nurses’ knowledge of hand hygiene and demographic/work-background factors',
    dv: 'Hand-washing technique performance',
    source: 'Understanding and Formulating Specific Objectives — hand hygiene',
  },
  {
    topic: 'Nurses’ Hand Hygiene Beliefs and Practices: A Cross-Sectional Study.',
    iv: 'Hand hygiene belief scores',
    dv: 'Self-reported hand hygiene practice scores',
    source: 'Understanding and Formulating Specific Objectives — beliefs vs practices',
  },
  {
    topic: 'ICU Nurses’ Knowledge, Attitude, Practice and Perceived Barriers on Pain Management of Critically Ill Patients.',
    iv: 'Knowledge and attitudes about pain management; perceived barriers',
    dv: 'Pain-management practices of ICU nurses',
    source: 'Understanding and Formulating Specific Objectives — ICU pain KAP',
  },
  {
    topic: 'Knowledge, Attitude, and Practice of Hepatitis B Infection Prevention among Nursing Students in the Upper West Region of Ghana.',
    iv: 'Demographic factors (gender, marital status, parental education)',
    dv: 'Practice of Hepatitis B preventive measures',
    mediating: 'Attitude toward Hepatitis B prevention',
    source: 'Significance of the Study — Hepatitis B KAP',
  },
];

function buildIVDVDrill(seed: IVDVSeed, idx: number): ResearchDrill {
  const rubric: RubricPoint[] = [
    {
      id: 'r1',
      label: 'Correctly identifies the Independent Variable(s)',
      marks: 2,
      detail: `IV: ${seed.iv}.`,
    },
    {
      id: 'r2',
      label: 'Correctly identifies the Dependent Variable',
      marks: 2,
      detail: `DV: ${seed.dv}.`,
    },
  ];
  let marks = 4;
  if (seed.mediating) {
    rubric.push({
      id: 'r3',
      label: 'Identifies a Mediating Variable (explains HOW/WHY IV influences DV)',
      marks: 1,
      detail: `Mediating: ${seed.mediating}.`,
    });
    marks += 1;
  }
  if (seed.moderating) {
    rubric.push({
      id: 'r4',
      label: 'Identifies a Moderating Variable (changes the strength/direction of the IV → DV link)',
      marks: 1,
      detail: `Moderating: ${seed.moderating}.`,
    });
    marks += 1;
  }
  if (seed.control) {
    rubric.push({
      id: 'r5',
      label: 'Identifies a Control Variable kept constant',
      marks: 1,
      detail: `Control: ${seed.control}.`,
    });
    marks += 1;
  }

  const modelLines = [
    `Topic: ${seed.topic}`,
    ``,
    `Independent Variable (IV): ${seed.iv}.`,
    `Dependent Variable (DV): ${seed.dv}.`,
  ];
  if (seed.mediating) modelLines.push(`Mediating Variable: ${seed.mediating}.`);
  if (seed.moderating) modelLines.push(`Moderating Variable: ${seed.moderating}.`);
  if (seed.control) modelLines.push(`Control Variable: ${seed.control}.`);

  return {
    id: `ivdv-${(idx + 1).toString().padStart(2, '0')}`,
    topic: 'chapter1',
    drillKind: 'ivdv',
    type: 'drill',
    prompt: `Identify the Independent Variable(s) and Dependent Variable in the following topic. Where applicable, also state any mediating, moderating, or control variables.\n\nTopic: “${seed.topic}”`,
    marks,
    rubric,
    modelAnswer: modelLines.join('\n'),
    referenceSections: [seed.source],
  };
}

const IVDV_DRILLS: ResearchDrill[] = IVDV_SEEDS.map(buildIVDVDrill);

// ============================================================
// OBJECTIVE / RESEARCH-QUESTION / THEME / SIGNIFICANCE drills
// ============================================================

const OTHER_DRILLS: ResearchDrill[] = [
  // ---------- TOPIC → MAIN OBJECTIVE ----------
  {
    id: 'obj-01',
    topic: 'chapter1',
    drillKind: 'topicToObjective',
    type: 'drill',
    prompt:
      'Write the MAIN OBJECTIVE for the following research topic:\n\n“Prevalence and Determinants of Hypertension Control among Patients Attending Public Hospitals in Accra, Ghana.”',
    marks: 4,
    rubric: [
      {
        id: 'r1',
        label: 'Single sentence that captures the broad purpose',
        marks: 1,
        detail: 'The main objective should be ONE clear sentence stating the broad purpose of the study, linked to the problem statement.',
      },
      {
        id: 'r2',
        label: 'Uses an appropriate action verb (assess / determine / evaluate / examine)',
        marks: 1,
        detail: 'For quantitative studies use verbs such as: to assess, to measure, to determine, to identify, to compare, to examine, to evaluate, to test, to analyze.',
      },
      {
        id: 'r3',
        label: 'Mirrors the topic’s main subject (prevalence AND determinants of hypertension control)',
        marks: 1,
        detail: 'The main objective must reflect both components of the title — prevalence and determinants of hypertension control.',
      },
      {
        id: 'r4',
        label: 'Names the population/setting (patients attending public hospitals in Accra, Ghana)',
        marks: 1,
        detail: 'A good main objective specifies the population and setting so it is SMART (Specific) and aligned to the title.',
      },
    ],
    modelAnswer:
      'The main objective of the study is to assess the prevalence and determinants of hypertension control among patients attending public hospitals in Accra, Ghana.',
    referenceSections: ['Quantitative Topics — Topic 1; How to Write Study Objectives'],
  },
  {
    id: 'obj-02',
    topic: 'chapter1',
    drillKind: 'topicToObjective',
    type: 'drill',
    prompt:
      'Write the MAIN OBJECTIVE for the following topic:\n\n“Effect of Health Education Intervention on Malaria Prevention Practices among School-Aged Children in the Northern Region of Ghana: A Quasi-Experimental Study.”',
    marks: 4,
    rubric: [
      { id: 'r1', label: 'One clear sentence capturing the broad purpose', marks: 1, detail: 'Main objective = one-sentence statement of broad purpose, tied to the problem statement.' },
      { id: 'r2', label: 'Uses an appropriate action verb (assess / evaluate / examine)', marks: 1, detail: 'Quantitative action verbs: to assess, to evaluate, to determine.' },
      { id: 'r3', label: 'Captures the IV (health education) and DV (malaria prevention practices)', marks: 1, detail: 'Must reflect both the intervention (IV) and the outcome (DV).' },
      { id: 'r4', label: 'States the population and setting', marks: 1, detail: 'Population/setting = school-aged children in the Northern Region of Ghana.' },
    ],
    modelAnswer:
      'The main objective of the study is to assess the effect of Health Education Intervention on malaria prevention practices among school-aged children in the Northern Region of Ghana.',
    referenceSections: ['Quantitative Topics — Topic 2'],
  },
  {
    id: 'obj-03',
    topic: 'chapter1',
    drillKind: 'topicToObjective',
    type: 'drill',
    prompt:
      'Write the MAIN OBJECTIVE for the following topic:\n\n“Exploring Barriers and Facilitators to Exclusive Breastfeeding among First-Time Mothers in Tamale, Ghana.”',
    marks: 4,
    rubric: [
      { id: 'r1', label: 'One clear sentence capturing the broad purpose', marks: 1, detail: 'Main objective = one-sentence statement of broad purpose.' },
      { id: 'r2', label: 'Uses a QUALITATIVE action verb (explore / understand / describe)', marks: 1, detail: 'Qualitative verbs: to explore, to understand, to describe, to interpret, to investigate.' },
      { id: 'r3', label: 'Mirrors the topic (barriers AND facilitators to exclusive breastfeeding)', marks: 1, detail: 'Must reflect both barriers and facilitators per the topic.' },
      { id: 'r4', label: 'States the population and setting (first-time mothers in Tamale, Ghana)', marks: 1, detail: 'Population/setting clarifies who and where.' },
    ],
    modelAnswer:
      'The main objective of the study is to explore the barriers and facilitators to exclusive breastfeeding among first-time mothers in Tamale, Ghana.',
    referenceSections: ['Qualitative Topics — first-time mothers'],
  },

  // ---------- MAIN OBJECTIVE → SPECIFIC OBJECTIVES ----------
  {
    id: 'spec-01',
    topic: 'chapter1',
    drillKind: 'mainToSpecific',
    type: 'drill',
    prompt:
      'A study has the following main objective:\n\n“To assess the knowledge, attitude, and practice of nurses on infection prevention.”\n\nWrite THREE specific objectives that operationalise this main objective.',
    marks: 6,
    rubric: [
      { id: 'r1', label: 'Specific objective on KNOWLEDGE', marks: 2, detail: 'e.g., “To assess nurses’ knowledge on infection prevention.”' },
      { id: 'r2', label: 'Specific objective on ATTITUDE', marks: 2, detail: 'e.g., “To examine nurses’ attitudes toward infection prevention.”' },
      { id: 'r3', label: 'Specific objective on PRACTICE', marks: 2, detail: 'e.g., “To evaluate nurses’ practices regarding infection prevention.”' },
    ],
    modelAnswer:
      '1. To assess nurses’ knowledge on infection prevention.\n2. To examine nurses’ attitudes toward infection prevention.\n3. To evaluate nurses’ practices regarding infection prevention.',
    referenceSections: ['Understanding and Formulating Specific Objectives'],
  },
  {
    id: 'spec-02',
    topic: 'chapter1',
    drillKind: 'mainToSpecific',
    type: 'drill',
    prompt:
      'Main objective:\n“To assess the knowledge, attitude, and practice of midwives on the use of partograph.”\n\nWrite THREE specific objectives that flow logically (knowledge → attitude → practice).',
    marks: 6,
    rubric: [
      { id: 'r1', label: 'Knowledge-level objective using a quantitative action verb', marks: 2, detail: '“To determine the knowledge level of midwives regarding partograph use.”' },
      { id: 'r2', label: 'Attitude-focused objective', marks: 2, detail: '“To explore the attitudes of midwives toward the use of partograph in labour monitoring.”' },
      { id: 'r3', label: 'Practice-focused objective tied to delivery context', marks: 2, detail: '“To assess the practices of midwives in completing and utilising partographs during delivery.”' },
    ],
    modelAnswer:
      '1. To determine the knowledge level of midwives regarding partograph use.\n2. To explore the attitudes of midwives toward the use of partograph in labour monitoring.\n3. To assess the practices of midwives in completing and utilising partographs during delivery.',
    referenceSections: ['Understanding and Formulating Specific Objectives — partograph example'],
  },

  // ---------- SPECIFIC OBJECTIVES → RESEARCH QUESTIONS ----------
  {
    id: 'so2rq-01',
    topic: 'chapter1',
    drillKind: 'so2rq',
    type: 'drill',
    prompt:
      'Convert the following specific objectives into RESEARCH QUESTIONS:\n\n1. To assess nurses’ knowledge on infection prevention.\n2. To examine nurses’ attitudes toward infection prevention.\n3. To evaluate nurses’ practices regarding infection prevention.',
    marks: 6,
    rubric: [
      { id: 'r1', label: 'Knowledge research question matches the SO', marks: 2, detail: 'e.g., “What is the level of nurses’ knowledge on infection prevention?”' },
      { id: 'r2', label: 'Attitude research question matches the SO', marks: 2, detail: 'e.g., “What are the attitudes of nurses toward infection prevention?”' },
      { id: 'r3', label: 'Practice research question matches the SO', marks: 2, detail: 'e.g., “What are the practices of nurses regarding infection prevention?”' },
    ],
    modelAnswer:
      '1. What is the level of nurses’ knowledge on infection prevention?\n2. What are the attitudes of nurses toward infection prevention?\n3. What are the practices of nurses regarding infection prevention?',
    referenceSections: ['Research Questions — derived from specific objectives'],
  },
  {
    id: 'so2rq-02',
    topic: 'chapter1',
    drillKind: 'so2rq',
    type: 'drill',
    prompt:
      'Convert these specific objectives into RESEARCH QUESTIONS:\n\n1. To determine the prevalence of controlled hypertension among adult patients receiving treatment in public hospitals in Accra.\n2. To assess the association between socio-demographic factors (age, sex, education, income) and hypertension control.\n3. To examine the relationship between medication adherence and hypertension control.',
    marks: 6,
    rubric: [
      { id: 'r1', label: 'Prevalence research question', marks: 2, detail: '“What is the prevalence of controlled hypertension among adult patients receiving treatment in public hospitals in Accra?”' },
      { id: 'r2', label: 'Socio-demographic association research question', marks: 2, detail: '“What is the association between socio-demographic factors (age, sex, education, income) and hypertension control?”' },
      { id: 'r3', label: 'Medication adherence research question', marks: 2, detail: '“What is the relationship between medication adherence and hypertension control?”' },
    ],
    modelAnswer:
      '1. What is the prevalence of controlled hypertension among adult patients receiving treatment in public hospitals in Accra?\n2. What is the association between socio-demographic factors (age, sex, education, income) and hypertension control?\n3. What is the relationship between medication adherence and hypertension control?',
    referenceSections: ['Quantitative Topics — Topic 1 specific objectives'],
  },

  // ---------- RESEARCH QUESTIONS → SPECIFIC OBJECTIVES ----------
  {
    id: 'rq2so-01',
    topic: 'chapter1',
    drillKind: 'rq2so',
    type: 'drill',
    prompt:
      'Convert the following research questions into SPECIFIC OBJECTIVES:\n\n1. What challenges do health workers face in using telemedicine?\n2. How do health workers perceive the effectiveness of telemedicine services?\n3. What factors facilitate successful use of telemedicine in rural clinics?',
    marks: 6,
    rubric: [
      { id: 'r1', label: 'Specific objective on challenges (uses qualitative verb)', marks: 2, detail: '“To explore challenges faced by health workers in telemedicine implementation (e.g., connectivity, training, patient acceptability).”' },
      { id: 'r2', label: 'Specific objective on perceptions/experiences', marks: 2, detail: '“To describe health workers’ experiences and perceptions of using telemedicine in rural clinics.”' },
      { id: 'r3', label: 'Specific objective on facilitators', marks: 2, detail: '“To identify factors that facilitate successful use of telemedicine from the perspective of healthcare providers.”' },
    ],
    modelAnswer:
      '1. To explore challenges faced by health workers in telemedicine implementation (e.g., connectivity, training, patient acceptability).\n2. To describe health workers’ experiences and perceptions of using telemedicine in rural clinics.\n3. To identify factors that facilitate successful use of telemedicine from the perspective of healthcare providers.',
    referenceSections: ['Qualitative Topics — telemedicine in Volta Region'],
  },
  {
    id: 'rq2so-02',
    topic: 'chapter1',
    drillKind: 'rq2so',
    type: 'drill',
    prompt:
      'Convert these research questions into SPECIFIC OBJECTIVES:\n\n1. What is the level of ICU nurses’ knowledge of pain management for critically ill patients?\n2. What attitudes do ICU nurses hold toward pain assessment and management?\n3. What pain-management practices do ICU nurses use, and what barriers do they perceive?',
    marks: 6,
    rubric: [
      { id: 'r1', label: 'SO on ICU nurses’ knowledge', marks: 2, detail: '“To assess ICU nurses’ knowledge of pain management for critically ill patients.”' },
      { id: 'r2', label: 'SO on ICU nurses’ attitudes', marks: 2, detail: '“To evaluate ICU nurses’ attitudes toward pain assessment and management in critical care.”' },
      { id: 'r3', label: 'SO on practices and perceived barriers', marks: 2, detail: '“To determine the pain-management practices of ICU nurses, and identify perceived barriers to effective pain control.”' },
    ],
    modelAnswer:
      '1. To assess ICU nurses’ knowledge of pain management for critically ill patients.\n2. To evaluate ICU nurses’ attitudes toward pain assessment and management in critical care.\n3. To determine the pain-management practices of ICU nurses, and identify perceived barriers to effective pain control.',
    referenceSections: ['Understanding and Formulating Specific Objectives — ICU pain KAP'],
  },

  // ---------- RESEARCH QUESTIONS → LITERATURE REVIEW THEMES ----------
  {
    id: 'theme-01',
    topic: 'chapter1',
    drillKind: 'themes',
    type: 'drill',
    prompt:
      'A study on infection prevention has the following research questions:\n\n1. What is the level of nurses’ knowledge on infection prevention?\n2. What are the attitudes of nurses toward infection prevention?\n3. What practices do nurses use regarding infection prevention?\n4. What factors are associated with nurses’ IPC compliance?\n\nDerive FOUR themes/headings for the literature review and briefly explain what each section would cover.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Theme 1: Knowledge of infection prevention among nurses', marks: 2, detail: 'Linked to RQ1; reviews previous studies measuring nurses’ IPC knowledge globally and in Ghana, and gaps identified.' },
      { id: 'r2', label: 'Theme 2: Attitudes of nurses toward infection prevention', marks: 2, detail: 'Linked to RQ2; reviews scales, contexts, and findings on nurses’ IPC attitudes.' },
      { id: 'r3', label: 'Theme 3: Infection prevention practices of nurses', marks: 2, detail: 'Linked to RQ3; reviews observational and self-report studies on IPC practice, hand hygiene compliance, PPE use.' },
      { id: 'r4', label: 'Theme 4: Factors/determinants associated with IPC compliance', marks: 2, detail: 'Linked to RQ4; reviews individual factors (training, experience) and system factors (workload, PPE availability).' },
    ],
    modelAnswer:
      'Theme 1: Knowledge of infection prevention among nurses.\nTheme 2: Attitudes of nurses toward infection prevention.\nTheme 3: Infection prevention practices of nurses.\nTheme 4: Determinants/factors associated with IPC compliance.\n\nEach theme is linked to a specific research question, moves from broad to specific, compares and contrasts studies, and highlights the gap your study will fill.',
    referenceSections: ['Forming Themes in a Literature Review'],
  },
  {
    id: 'theme-02',
    topic: 'chapter1',
    drillKind: 'themes',
    type: 'drill',
    prompt:
      'A study on antenatal care adherence has these research questions:\n\n1. What predisposing factors (age, education, beliefs) are associated with ANC visits?\n2. What enabling factors (income, distance, insurance) influence ANC visits?\n3. What need factors (perceived health, complications) influence ANC visits?\n4. How do attitudes toward ANC mediate the relationship between these factors and adherence?\n\nDerive FOUR themes for the literature review.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Theme on predisposing factors and ANC use', marks: 2, detail: 'Reviews how socio-demographic predisposing factors shape ANC utilisation; aligns with RQ1.' },
      { id: 'r2', label: 'Theme on enabling factors and ANC use', marks: 2, detail: 'Reviews income, distance, partner support, insurance — aligns with RQ2.' },
      { id: 'r3', label: 'Theme on need factors and ANC use', marks: 2, detail: 'Reviews how perceived health and complications drive use; aligns with RQ3.' },
      { id: 'r4', label: 'Theme on attitudes/perceptions as a mediator', marks: 2, detail: 'Reviews attitude/perception scales and mediation evidence; aligns with RQ4.' },
    ],
    modelAnswer:
      'Theme 1: Predisposing factors and ANC adherence.\nTheme 2: Enabling factors and ANC adherence.\nTheme 3: Need factors and ANC adherence.\nTheme 4: Attitudes toward ANC as a mediator of adherence.\n\nThemes are grounded in Andersen’s Behavioral Model of Health Service Use, move from broad determinants to mediating pathways, and end with the gap your study fills.',
    referenceSections: ['Conceptual Framework Cont’d — Andersen’s Model; Forming Themes in a Literature Review'],
  },

  // ---------- SIGNIFICANCE OF THE STUDY ----------
  {
    id: 'sig-01',
    topic: 'chapter1',
    drillKind: 'significance',
    type: 'drill',
    prompt:
      'Write the SIGNIFICANCE OF THE STUDY for the following topic:\n\n“Nurses’ Knowledge on Nosocomial Infection Preventive Measures and Its Associated Factors in Ghana.”',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'States the public-health importance/context (NIs threaten patient safety)', marks: 2, detail: 'Open with the importance of the problem and why the study matters — NIs threaten patient safety and quality of care.' },
      { id: 'r2', label: 'Benefit to nurses (improvement in infection-control practices)', marks: 2, detail: 'Findings highlight areas for improvement in infection-control practices, enhancing patient care.' },
      { id: 'r3', label: 'Benefit to institutions / Ghana Health Service (policy & training)', marks: 2, detail: 'Healthcare institutions and the Ghana Health Service can strengthen policies and training programmes.' },
      { id: 'r4', label: 'Benefit to future research / evidence base', marks: 2, detail: 'Provides future researchers with insights into evidence-based interventions to reduce hospital-acquired infections.' },
    ],
    modelAnswer:
      'Nosocomial infections (NIs) pose a serious threat to patient safety and healthcare quality in Ghanaian hospitals. This study assesses nurses’ knowledge of preventive measures and the factors influencing their understanding. The findings will benefit nurses by highlighting areas for improvement in infection-control practices, ultimately enhancing patient care. Healthcare institutions, including hospitals and the Ghana Health Service, can use the results to strengthen policies and training programmes. Additionally, the study provides future researchers with insights for infection prevention, contributing to evidence-based practice and the development of interventions to reduce hospital-acquired infections.',
    referenceSections: ['Significance of the Study — Nurses’ KAP on Nosocomial Infections'],
  },
  {
    id: 'sig-02',
    topic: 'chapter1',
    drillKind: 'significance',
    type: 'drill',
    prompt:
      'Write the SIGNIFICANCE OF THE STUDY for the topic:\n\n“Utilization of the Nursing Process for Patient Care in Ghana: A Case Study of Nurses at Tamale Teaching Hospital.”',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Anchors the study in the broader importance of effective nursing care', marks: 2, detail: 'Effective nursing care is the cornerstone of quality healthcare; gaps in practice limit its potential.' },
      { id: 'r2', label: 'Benefit to patients (improved outcomes, personalised treatment)', marks: 2, detail: 'Patients stand to gain improved care outcomes and a more personalised approach to treatment.' },
      { id: 'r3', label: 'Benefit to nurses (clinical skills, decision-making, professional standards)', marks: 2, detail: 'Nurses and midwives can strengthen clinical skills, decision-making, and adherence to professional standards.' },
      { id: 'r4', label: 'Benefit to institutions/policymakers and future researchers', marks: 2, detail: 'Hospitals, Nursing and Midwifery Council, Ghana Health Service, and Ministry of Health can use findings to guide policy, training, and resource allocation; provides a foundation for future researchers.' },
    ],
    modelAnswer:
      'Effective nursing care is the cornerstone of quality healthcare, yet its full potential is often limited by gaps in practice. This study highlights the importance of proper utilisation of the nursing process, emphasising its benefits to patients, nurses, healthcare institutions, and the broader health system. Patients stand to gain improved care outcomes and a more personalised approach to treatment. Nurses and midwives can strengthen their clinical skills, decision-making, and adherence to professional standards. Hospitals and healthcare authorities, including the Nursing and Midwifery Council, Ghana Health Service, and Ministry of Health, can use the findings to guide policy, training, and resource allocation. Furthermore, this study provides future researchers with insights and a foundation for exploring strategies to enhance nursing practice and healthcare quality across Ghana.',
    referenceSections: ['Significance of the Study — Tamale Teaching Hospital'],
  },
  {
    id: 'sig-03',
    topic: 'chapter1',
    drillKind: 'significance',
    type: 'drill',
    prompt:
      'Write the SIGNIFICANCE OF THE STUDY for:\n\n“Knowledge, Attitude, and Practice of Hepatitis B Infection Prevention Among Nursing Students in the Upper West Region of Ghana.”',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Public-health context (Hepatitis B burden; students at heightened risk)', marks: 2, detail: 'Hepatitis B is a significant public-health concern in Ghana; nursing students are at heightened risk through exposure to blood/body fluids.' },
      { id: 'r2', label: 'Direct benefit to nursing students’ awareness/adherence', marks: 2, detail: 'Enhances nursing students’ awareness and adherence to Hepatitis B prevention measures, reducing transmission risks.' },
      { id: 'r3', label: 'Benefit to educators / policymakers (curriculum, interventions)', marks: 2, detail: 'Provides valuable insights for educators and policymakers to develop targeted interventions and curricula that address identified gaps.' },
      { id: 'r4', label: 'Foundation for future research / policy evaluation', marks: 2, detail: 'Offers a foundation for future researchers to explore effective strategies and evaluate policy impact on prevention practices.' },
    ],
    modelAnswer:
      'Hepatitis B remains a significant public-health concern in Ghana, with nursing students being at heightened risk due to their exposure to blood and body fluids. The study assesses the knowledge, attitude, and practice (KAP) of Hepatitis B infection prevention among nursing students in the Upper West Region and identifies factors such as gender, marital status, and parental education associated with better preventive practices. This research is crucial for enhancing nursing students’ awareness and adherence to Hepatitis B prevention measures, thereby reducing transmission risks. It provides valuable insights for educators and policymakers to develop targeted interventions and curricula that address identified gaps. Additionally, the study offers a foundation for future researchers to explore effective strategies and evaluate the impact of implemented policies on infection-prevention practices among nursing students.',
    referenceSections: ['Significance of the Study — Hepatitis B KAP'],
  },

  // ---------- RETROSPECTIVE vs PROSPECTIVE ----------
  {
    id: 'retro-01',
    topic: 'designs',
    drillKind: 'retroVsPro',
    type: 'drill',
    prompt:
      'Differentiate between a RETROSPECTIVE and a PROSPECTIVE study. In your answer:\n\n1. Define each design.\n2. State at least TWO advantages and TWO disadvantages of each.\n3. Give ONE example of each (a nursing or public-health study).',
    marks: 12,
    rubric: [
      { id: 'r1', label: 'Defines retrospective correctly', marks: 1, detail: 'Retrospective research looks back at past data or events to identify causes or relationships, using existing records, registries, or patient histories.' },
      { id: 'r2', label: 'Defines prospective correctly', marks: 1, detail: 'Prospective research follows participants into the future to observe outcomes as they occur, helping establish temporal relationships.' },
      { id: 'r3', label: 'Two ADVANTAGES of retrospective', marks: 2, detail: 'Quicker and cheaper than prospective; useful for rare outcomes; data already exist; helpful where prospective follow-up is impractical.' },
      { id: 'r4', label: 'Two DISADVANTAGES of retrospective', marks: 2, detail: 'Depends on quality/completeness of existing records; prone to recall and selection bias; cannot control exposure measurement; harder to establish temporality.' },
      { id: 'r5', label: 'Two ADVANTAGES of prospective', marks: 2, detail: 'Clear temporal sequence between exposure and outcome; better control of data quality and standardisation; reduced recall bias; supports causal inference.' },
      { id: 'r6', label: 'Two DISADVANTAGES of prospective', marks: 2, detail: 'Time-consuming and expensive; risk of loss to follow-up; not efficient for rare outcomes; large sample often required.' },
      { id: 'r7', label: 'Concrete example of each design', marks: 2, detail: 'Retrospective: reviewing hospital records to identify factors associated with maternal deaths in the past five years. Prospective: following a group of pregnant women from their first ANC visit until delivery to assess factors influencing birth outcomes.' },
    ],
    modelAnswer:
      'Retrospective study — looks back at past data or events to identify causes or relationships; commonly uses medical records, registries, or patient histories.\nExample: reviewing hospital records to determine factors associated with maternal deaths in the past five years.\n\nProspective study — follows participants forward in time to observe outcomes as they occur, helping establish a temporal relationship between exposure and outcome.\nExample: following a group of pregnant women from their first antenatal visit until delivery to assess factors influencing birth outcomes.\n\nAdvantages of retrospective: quicker and cheaper, data already exist, useful for rare outcomes.\nDisadvantages of retrospective: depends on quality/completeness of records, prone to recall and selection bias, harder to establish temporality.\nAdvantages of prospective: clearer temporal sequence, better data quality control, less recall bias, supports causal inference.\nDisadvantages of prospective: time-consuming and expensive, risk of loss to follow-up, large sample often needed.',
    referenceSections: ['Time Dimension in Research — Retrospective & Prospective; Hierarchy of Scientific Evidence'],
  },

  // ---------- INSTRUMENT CHOICE FOR RETRO vs PRO ----------
  {
    id: 'inst-01',
    topic: 'instruments',
    drillKind: 'instrumentChoice',
    type: 'drill',
    prompt:
      'A team plans to study patient outcomes after surgery using two parallel projects:\n\nProject A — a RETROSPECTIVE study of patients operated on between 2018 and 2023 at one tertiary hospital.\nProject B — a PROSPECTIVE study of pregnant women attending antenatal clinic, to assess knowledge, attitudes, and practices on nutrition during the next 6 months.\n\nFor EACH project, state the most appropriate data collection tool, describe its structure, and justify the choice.',
    marks: 10,
    rubric: [
      { id: 'r1', label: 'Project A — tool: data extraction form / checklist', marks: 2, detail: 'Retrospective studies use a data extraction form (or checklist) designed to systematically retrieve relevant information from secondary sources (hospital records, registers).' },
      { id: 'r2', label: 'Project A — structure of the form', marks: 2, detail: 'Form is structured around the specific objectives/variables (patient demographics, diagnosis, treatment type, outcomes). Items are coded for consistency and easier data entry and analysis.' },
      { id: 'r3', label: 'Project A — justification (only verifiable, available data)', marks: 1, detail: 'Justified because only available and verifiable data from existing records can be collected, maintaining validity and reliability.' },
      { id: 'r4', label: 'Project B — tool: structured questionnaire', marks: 2, detail: 'Prospective KAP studies typically use a structured questionnaire (or interview guide/observation checklist depending on the design).' },
      { id: 'r5', label: 'Project B — structure (sections aligned with objectives)', marks: 2, detail: 'Organised into Section A (demographics) and Sections B–D mapped to specific objectives (knowledge, attitudes, practices). Pre-tested before full data collection.' },
      { id: 'r6', label: 'Project B — ethics mentioned during data collection', marks: 1, detail: 'Ethical considerations such as informed consent and confidentiality are strictly observed during data collection.' },
    ],
    modelAnswer:
      'Project A (retrospective): A data extraction form (checklist) is the appropriate tool. It is designed around the study’s specific objectives and variables — patient demographics, diagnosis, treatment type, and outcomes — with items coded for consistency and easier entry and analysis. It draws on hospital records between 2018 and 2023, and only available and verifiable data are collected to maintain validity and reliability.\n\nProject B (prospective): A structured questionnaire is the appropriate tool (an interview guide or observation checklist could also fit depending on the design). It is developed in alignment with the specific objectives and pre-tested before data collection. Typical sections: Section A — demographic information; Section B — knowledge; Section C — attitudes; Section D — practices and factors influencing nutrition during pregnancy. Ethical considerations such as informed consent and confidentiality are strictly observed during data collection.',
    referenceSections: [
      'Designing Data Collection Tools for Retrospective and Prospective Studies (1 & 2)',
      'Structure and Alignment of Data Collection Tools',
    ],
  },

  // ---------- COMBINED RETRO-PRO INSTRUMENT (short) ----------
  {
    id: 'inst-02',
    topic: 'instruments',
    drillKind: 'instrumentChoice',
    type: 'drill',
    prompt:
      'Explain how the structure of a data collection tool aligns with the study’s specific objectives, using the typical 4-section example (Section A through D). Then state TWO design considerations that improve the quality of a structured questionnaire.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Explains alignment principle (each section maps to an objective)', marks: 2, detail: 'A good data collection tool aligns directly with the specific objectives; each section or question addresses a specific objective or research question.' },
      { id: 'r2', label: 'Section A — Demographic data', marks: 1, detail: 'Section A captures demographics (age, sex, marital status, education, profession).' },
      { id: 'r3', label: 'Sections B–D mapped to core objectives (knowledge, attitudes/practices, factors)', marks: 2, detail: 'Section B — Knowledge; Section C — Attitudes or practices; Section D — Factors influencing the phenomenon.' },
      { id: 'r4', label: 'Design consideration 1 — clarity, brevity, neutrality; avoid leading or double-barreled items', marks: 1, detail: 'Ensure clarity, brevity, and neutrality of wording; avoid leading, ambiguous, or double-barreled questions.' },
      { id: 'r5', label: 'Design consideration 2 — logical order; pilot/pre-test the instrument', marks: 1, detail: 'Arrange questions logically (demographics first) and pilot test to assess validity, reliability, and flow.' },
      { id: 'r6', label: 'Mentions standardised/validated tools when relevant', marks: 1, detail: 'Where appropriate, adopt or adapt standardised tools (e.g., Perceived Stress Scale) to enhance validity and comparability.' },
    ],
    modelAnswer:
      'A good data collection tool aligns directly with the specific objectives of the study; each section/question addresses a specific objective. Typical structure: Section A — Demographic data; Section B — Knowledge on the topic; Section C — Attitudes or practices; Section D — Factors influencing the phenomenon.\n\nDesign considerations: (1) ensure clarity, brevity, and neutrality of wording; avoid leading, ambiguous, or double-barreled items; (2) arrange questions logically beginning with demographics, then sections aligned to the specific objectives; and pilot-test the instrument before full-scale data collection to assess validity, reliability, and flow. Where appropriate, adopt or adapt standardised/validated tools (e.g., Perceived Stress Scale) to enhance validity and comparability.',
    referenceSections: ['Structure and Alignment of Data Collection Tools; Designing Data Collection Tools for Quantitative Studies'],
  },

  // ============================================================
  // COMPONENTS OF A RESEARCH TOPIC
  // ============================================================
  {
    id: 'tc-01',
    topic: 'chapter1',
    drillKind: 'topicComponents',
    type: 'drill',
    prompt:
      'Break the following research title into its components (Main subject/variable(s), Population/respondents, Setting/location, Scope/focus/perspective, and Timeframe if present):\n\n“Knowledge, Attitude and Practices of Malaria Preventive Measures Among Mothers with Children Under Five Years in a Rural Setting of Ghana.”',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Main subject/variable correctly identified', marks: 2, detail: 'Main subject/variable: Knowledge, Attitude and Practices of Malaria Preventive Measures.' },
      { id: 'r2', label: 'Population/respondents identified', marks: 2, detail: 'Population/respondents: Mothers with children under five years.' },
      { id: 'r3', label: 'Setting/location identified', marks: 2, detail: 'Setting/location: A rural setting of Ghana.' },
      { id: 'r4', label: 'Scope/focus identified (behavioural/informational perspective on preventive measures)', marks: 1, detail: 'Scope/focus: Practices and preventive measures — includes knowledge and attitudes (behavioural and informational perspective).' },
      { id: 'r5', label: 'Notes timeframe is optional and not specified here', marks: 1, detail: 'Timeframe: Not specified in this title. Timeframe is optional and often included when relevant.' },
    ],
    modelAnswer:
      'Main subject / variable: Knowledge, Attitude and Practices of Malaria Preventive Measures.\nPopulation / respondents: Mothers with Children Under Five Years.\nSetting / location: A Rural Setting of Ghana.\nScope / focus / perspective: Practices and preventive measures (includes knowledge & attitudes — behavioural and informational perspective).\nTimeframe: Not specified (optional; included only when relevant).',
    referenceSections: ['Parts of a Typical Research Topic/Title (Table Format)'],
  },
  {
    id: 'tc-02',
    topic: 'chapter1',
    drillKind: 'topicComponents',
    type: 'drill',
    prompt:
      'Break this title into its components:\n\n“Determinants of early antenatal care visits among women of reproductive age in Ghana: evidence from the recent Maternal Health Survey.”',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Main subject/variable', marks: 2, detail: 'Main subject/variable: Early antenatal care visits.' },
      { id: 'r2', label: 'Population/respondents', marks: 2, detail: 'Population/respondents: Women of reproductive age.' },
      { id: 'r3', label: 'Setting/location', marks: 2, detail: 'Setting/location: Ghana (nationwide).' },
      { id: 'r4', label: 'Scope/focus', marks: 1, detail: 'Scope/focus: Determinants; evidence from the recent Maternal Health Survey.' },
      { id: 'r5', label: 'Timeframe (recent MHS / based on the survey year)', marks: 1, detail: 'Timeframe: Recent Maternal Health Survey (based on the survey year, e.g., 2017 MHS data).' },
    ],
    modelAnswer:
      'Main subject / variable: Early antenatal care visits.\nPopulation / respondents: Women of reproductive age.\nSetting / location: Ghana (nationwide).\nScope / focus: Determinants — evidence from the recent Maternal Health Survey.\nTimeframe: Recent Maternal Health Survey (e.g., 2017 MHS data).',
    referenceSections: ['Examples of Recent Research Topics/Titles — Example 1'],
  },
  {
    id: 'tc-03',
    topic: 'chapter1',
    drillKind: 'topicComponents',
    type: 'drill',
    prompt:
      'Break this title into its components:\n\n“Postnatal experiences of teenage mothers in selected communities in Central Region, Ghana: a phenomenological study.”',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Main subject/variable', marks: 2, detail: 'Main subject/variable: Postnatal experiences.' },
      { id: 'r2', label: 'Population/respondents', marks: 2, detail: 'Population/respondents: Teenage mothers.' },
      { id: 'r3', label: 'Setting/location', marks: 2, detail: 'Setting/location: Selected communities, Central Region, Ghana.' },
      { id: 'r4', label: 'Scope/focus (phenomenological/qualitative perspective)', marks: 1, detail: 'Scope/focus: A phenomenological (qualitative) study.' },
      { id: 'r5', label: 'Notes timeframe is not specified', marks: 1, detail: 'Timeframe: Not specified (timeframe is optional).' },
    ],
    modelAnswer:
      'Main subject / variable: Postnatal experiences.\nPopulation / respondents: Teenage mothers.\nSetting / location: Selected communities, Central Region, Ghana.\nScope / focus: A phenomenological (qualitative) study.\nTimeframe: Not specified.',
    referenceSections: ['Examples of Recent Research Topics/Titles — Example 2'],
  },

  // ============================================================
  // PROBLEM TREE
  // ============================================================
  {
    id: 'pt-01',
    topic: 'chapter1',
    drillKind: 'problemTree',
    type: 'drill',
    prompt:
      'Construct a problem tree for the following core problem:\n\n“Poor medication adherence among hypertensive patients on treatment in public hospitals in Ghana.”\n\nList:\n• THREE causes (roots)\n• ONE clear core problem (trunk)\n• THREE effects/consequences (branches)',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Roots — at least three plausible CAUSES', marks: 3, detail: 'Causes (roots) might include: limited knowledge about hypertension and medication; long clinic waiting times; high cost of medications; cultural/spiritual beliefs about chronic illness; side effects of medication; poor patient–provider communication.' },
      { id: 'r2', label: 'Trunk — clearly states the core problem', marks: 1, detail: 'Trunk = the core problem: Poor medication adherence among hypertensive patients on treatment.' },
      { id: 'r3', label: 'Branches — at least three EFFECTS/CONSEQUENCES', marks: 3, detail: 'Effects (branches) might include: uncontrolled blood pressure; higher risk of stroke and other complications; increased hospital admissions and healthcare costs; reduced quality of life; higher mortality.' },
      { id: 'r4', label: 'Explains how the problem tree justifies the study', marks: 1, detail: 'A problem tree helps identify the research problem by showing its causes and effects, clarifying the issue, focusing the study, and justifying why it needs research.' },
    ],
    modelAnswer:
      'Roots (causes):\n• Limited patient knowledge about hypertension and the need for lifelong therapy.\n• Long clinic waiting times and barriers to refill access.\n• High cost of antihypertensive medications and limited insurance coverage.\n\nTrunk (core problem):\n• Poor medication adherence among hypertensive patients on treatment in public hospitals in Ghana.\n\nBranches (effects/consequences):\n• Uncontrolled blood pressure.\n• Higher risk of stroke, heart failure, and other complications.\n• Increased hospital admissions and healthcare costs; reduced quality of life.\n\nA problem tree clarifies what the study should focus on and justifies why research is needed.',
    referenceSections: ['Problem Tree in Research'],
  },
  {
    id: 'pt-02',
    topic: 'chapter1',
    drillKind: 'problemTree',
    type: 'drill',
    prompt:
      'Construct a problem tree for the following core problem:\n\n“Low compliance with hand hygiene among nurses in busy medical wards.”\n\nList:\n• THREE causes (roots)\n• ONE core problem (trunk)\n• THREE effects (branches)',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Roots — three plausible causes', marks: 3, detail: 'Causes (roots) might include: inadequate hand hygiene training; heavy workload and short staffing; limited availability of soap/alcohol rub/PPE; inconsistent leadership monitoring; cultural attitudes/normalisation of skipping steps.' },
      { id: 'r2', label: 'Trunk — clearly states the core problem', marks: 1, detail: 'Core problem: Low compliance with hand hygiene among nurses in busy medical wards.' },
      { id: 'r3', label: 'Branches — three plausible effects', marks: 3, detail: 'Effects (branches) might include: increased hospital-acquired infections; prolonged length of stay; increased antibiotic use and resistance; rising healthcare costs; preventable mortality.' },
      { id: 'r4', label: 'Notes how the tree focuses the study and justifies research', marks: 1, detail: 'A problem tree shows cause-and-effect, focuses the study on root causes, and justifies why intervention/research is needed.' },
    ],
    modelAnswer:
      'Roots (causes):\n• Inadequate hand hygiene training and refresher courses.\n• Heavy workload, short staffing, and shift pressures.\n• Limited availability of soap/alcohol-based hand rub at the point of care.\n\nTrunk (core problem):\n• Low compliance with hand hygiene among nurses in busy medical wards.\n\nBranches (effects/consequences):\n• Increased hospital-acquired infections.\n• Prolonged length of stay and higher antibiotic use.\n• Rising healthcare costs and preventable mortality.',
    referenceSections: ['Problem Tree in Research'],
  },

  // ============================================================
  // CONCEPTUAL FRAMEWORK NARRATIVE
  // ============================================================
  {
    id: 'cf-01',
    topic: 'chapter1',
    drillKind: 'conceptualFramework',
    type: 'drill',
    prompt:
      'Write a CONCEPTUAL FRAMEWORK narrative (a short paragraph plus a labelled IV/MV/DV list) for the following topic:\n\n“The Impact of Work-Related Stress on the Quality of Patient Care Among Nurses in Public Hospitals.”',
    marks: 10,
    rubric: [
      { id: 'r1', label: 'Anchors the framework in a relevant theory/model', marks: 2, detail: 'Use the Job Demand–Control Model: high job demands and low control contribute to stress and affect job performance.' },
      { id: 'r2', label: 'IV: work-related stress with indicators', marks: 2, detail: 'IV = Work-related stress (workload, shift patterns, staffing shortages, emotional strain).' },
      { id: 'r3', label: 'Mediating variable: job satisfaction and coping mechanisms', marks: 2, detail: 'MV = Job satisfaction and coping mechanisms (peer support, supervision quality, personal resilience).' },
      { id: 'r4', label: 'DV: quality of patient care with measurable indicators', marks: 2, detail: 'DV = Quality of patient care (patient safety, timeliness, adherence to nursing standards).' },
      { id: 'r5', label: 'Narrates the hypothesised relationship/pathway', marks: 1, detail: 'The framework proposes that increased stress reduces job satisfaction/coping, which in turn diminishes quality of care — supporting the need for institutional support and stress-management interventions.' },
      { id: 'r6', label: 'Mentions visual representation (boxes/arrows from IV → MV → DV)', marks: 1, detail: 'Visualise as: Work-related stress (IV) → Job satisfaction & coping (MV) → Quality of patient care (DV), with arrows showing the hypothesised pathway.' },
    ],
    modelAnswer:
      'The conceptual framework for this study is grounded in the Job Demand–Control Model, which suggests that high job demands combined with limited control over work situations contribute significantly to occupational stress and its adverse outcomes.\n\nIndependent Variable (IV): Work-related stress — measured through workload, shift patterns, staffing shortages, and emotional strain.\nMediating Variable (MV): Job satisfaction and coping mechanisms — reflecting peer support, supervision quality, and personal resilience.\nDependent Variable (DV): Quality of patient care — measured through patient safety, timeliness of care, and adherence to nursing standards.\n\nThe framework proposes that increased work-related stress leads to lower job satisfaction and reduced coping capacity, which subsequently diminishes the quality of nursing care. This underscores the importance of institutional support and stress-management interventions in improving patient outcomes.\n\nVisually: Work-related stress (IV) → Job satisfaction & coping (MV) → Quality of patient care (DV).',
    referenceSections: ['Conceptual Framework Cont’d — Job Demand–Control Model'],
  },
  {
    id: 'cf-02',
    topic: 'chapter1',
    drillKind: 'conceptualFramework',
    type: 'drill',
    prompt:
      'Write a CONCEPTUAL FRAMEWORK narrative for the following topic:\n\n“Factors Influencing Adherence to Antenatal Care (ANC) Visits Among Pregnant Women in Urban Health Facilities.”',
    marks: 10,
    rubric: [
      { id: 'r1', label: 'Anchors in Andersen’s Behavioral Model of Health Service Use', marks: 2, detail: 'Andersen’s model: healthcare utilisation is influenced by predisposing, enabling, and need factors.' },
      { id: 'r2', label: 'IVs grouped into predisposing / enabling / need factors', marks: 3, detail: 'IVs: Predisposing (age, education, marital status, cultural beliefs); Enabling (income, insurance, distance, partner support); Need (perceived health, complications).' },
      { id: 'r3', label: 'Mediating variable: attitude toward ANC', marks: 1, detail: 'MV: Attitude toward ANC (perceived importance and satisfaction with services).' },
      { id: 'r4', label: 'DV: adherence to ANC visits (measurable)', marks: 2, detail: 'DV: Adherence to ANC visits — measured by the number of visits completed per WHO recommendation.' },
      { id: 'r5', label: 'Narrates the pathway from IVs through MV to DV', marks: 1, detail: 'Predisposing/enabling/need factors influence attitude toward ANC, which in turn determines adherence and shapes maternal health outcomes.' },
      { id: 'r6', label: 'Mentions visual representation', marks: 1, detail: 'Visualise as: Predisposing + Enabling + Need factors (IVs) → Attitude (MV) → ANC adherence (DV).' },
    ],
    modelAnswer:
      'The conceptual framework for this study is adapted from Andersen’s Behavioral Model of Health Service Use, which explains that healthcare utilisation is influenced by individual, social, and systemic factors.\n\nIndependent Variables (IVs):\n• Predisposing factors: maternal age, education, marital status, cultural beliefs.\n• Enabling factors: income, health insurance, distance to facility, partner support.\n• Need factors: perceived health status, pregnancy complications.\nMediating Variable (MV): Attitude toward ANC (perceived importance of and satisfaction with services).\nDependent Variable (DV): Adherence to ANC visits — measured by the number of visits completed per WHO recommendation.\n\nThe framework posits that predisposing, enabling, and need factors influence women’s attitudes toward ANC, which in turn determine their level of adherence, thereby shaping maternal health outcomes.\n\nVisually: Predisposing + Enabling + Need (IVs) → Attitude (MV) → ANC adherence (DV).',
    referenceSections: ['Conceptual Framework Cont’d — Andersen’s Behavioral Model'],
  },

  // ============================================================
  // INCLUSION & EXCLUSION CRITERIA — WRITING DRILLS
  // ============================================================
  {
    id: 'eli-01',
    topic: 'eligibility',
    drillKind: 'eligibility',
    type: 'drill',
    prompt:
      'For the following study, write THREE inclusion criteria and THREE exclusion criteria. Make each one a clear, specific statement.\n\nStudy: “Knowledge, Attitude and Practice of Hypertension Self-Management Among Adults Attending Outpatient Clinics in Accra.”',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Three INCLUSION criteria — clear and specific', marks: 3, detail: 'Examples: adults aged 18–60 years; clinical diagnosis of hypertension confirmed by clinician; receiving treatment at the OPD for at least 3 months; able to give informed consent in English/Twi.' },
      { id: 'r2', label: 'Three EXCLUSION criteria — driven by safety, measurement, or confounding', marks: 3, detail: 'Examples: pregnant women (hypertension of pregnancy is a different condition); patients with significant cognitive impairment or psychiatric illness preventing valid responses; newly diagnosed (< 3 months) so self-management practice not yet established; non-residents of the study district.' },
      { id: 'r3', label: 'Notes that exclusion is NOT just the inverse of inclusion', marks: 1, detail: 'Important: exclusion criteria are not simply the direct opposite of inclusion criteria; they often arise from safety, measurement, or confounding issues.' },
      { id: 'r4', label: 'Notes the criteria support internal and external validity', marks: 1, detail: 'Well-written criteria help ensure internal validity (reducing confounding) and external validity (defining who findings apply to).' },
    ],
    modelAnswer:
      'Inclusion criteria:\n• Adults aged 18–60 years.\n• Diagnosed with hypertension by a clinician and receiving treatment at the OPD for at least 3 months.\n• Able to provide informed consent in English or Twi.\n\nExclusion criteria:\n• Pregnant women (hypertensive disorders of pregnancy are managed differently and would confound results).\n• Patients with significant cognitive impairment or psychiatric illness that prevents valid self-report.\n• Patients newly diagnosed (<3 months) whose self-management practice is not yet established.\n\nNote: exclusion criteria are not simply the inverse of inclusion criteria — they arise from safety, measurement, or confounding concerns. Together, the criteria help ensure internal validity (reducing confounding) and external validity (defining who findings apply to).',
    referenceSections: ['Inclusion & Exclusion Criteria'],
  },
  {
    id: 'eli-02',
    topic: 'eligibility',
    drillKind: 'eligibility',
    type: 'drill',
    prompt:
      'Write THREE inclusion and THREE exclusion criteria for:\n\n“Experiences of Intensive Care Unit Nurses in End-of-Life Care at Ho Teaching Hospital, Ghana: A Qualitative Study.”',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Three INCLUSION criteria suited to a qualitative ICU study', marks: 3, detail: 'Examples: registered nurses currently working in the ICU at Ho Teaching Hospital; at least 6 months of ICU experience; have provided care to at least one patient at end of life in the last 6 months; provide informed consent.' },
      { id: 'r2', label: 'Three EXCLUSION criteria with safety/measurement/confounding rationale', marks: 3, detail: 'Examples: student/trainee nurses still under direct supervision (limited experience); ICU nurses currently on extended leave (unavailable); recently bereaved nurses where participation could cause psychological harm (non-maleficence).' },
      { id: 'r3', label: 'Notes documentation before recruitment', marks: 1, detail: 'Inclusion/exclusion criteria should be documented before recruitment and reported in the Methods so that readers/journals/ethics committees see who was excluded and why.' },
      { id: 'r4', label: 'Notes that criteria define who findings apply to', marks: 1, detail: 'They define the target population for the findings and support transferability of qualitative findings.' },
    ],
    modelAnswer:
      'Inclusion criteria:\n• Registered nurses currently working in the ICU at Ho Teaching Hospital.\n• At least 6 months of ICU experience.\n• Have provided care to at least one patient at end of life in the past 6 months and consent to participate.\n\nExclusion criteria:\n• Student/trainee nurses still under direct supervision (limited independent experience).\n• ICU nurses currently on extended leave (not available during data collection).\n• Recently bereaved nurses for whom participation could cause psychological harm (non-maleficence).\n\nNote: criteria must be documented before recruitment and reported in the Methods section so that readers and ethics committees can see who was excluded and why.',
    referenceSections: ['Inclusion & Exclusion Criteria'],
  },

  // ============================================================
  // RESEARCH METHODS vs RESEARCH METHODOLOGY
  // ============================================================
  {
    id: 'mvm-01',
    topic: 'chapter1',
    drillKind: 'methodsVsMethodology',
    type: 'drill',
    prompt:
      'Differentiate between RESEARCH METHODS and RESEARCH METHODOLOGY. In your answer:\n• Define each term.\n• Give TWO examples of each.\n• State the key question each term answers (the “how” vs the “why/what”).',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Correct definition of research METHODS', marks: 2, detail: 'Research methods = the specific tools, techniques, and procedures used to collect and analyse data — the practical aspect of doing research.' },
      { id: 'r2', label: 'Correct definition of research METHODOLOGY', marks: 2, detail: 'Research methodology = the overall strategy, principles, and rationale guiding the entire research process; explains why certain methods are chosen and how they fit the objectives.' },
      { id: 'r3', label: 'Two examples of methods', marks: 1, detail: 'Examples of methods: surveys, interviews, experiments, case studies, focus groups, observations, questionnaires, statistical tests.' },
      { id: 'r4', label: 'Two examples of methodology elements', marks: 1, detail: 'Examples of methodology elements: philosophical assumptions (positivism, interpretivism, pragmatism), research design (qualitative/quantitative/mixed), sampling framework, ethical considerations, data analysis approach.' },
      { id: 'r5', label: 'States that methods answer “how” and methodology answers “why and what”', marks: 2, detail: 'Methods answer: “How is the research carried out?” Methodology answers: “Why and in what way is the research carried out?”' },
    ],
    modelAnswer:
      'Research Methods refer to the specific tools, techniques, and procedures used to collect and analyse data — the practical aspect of doing research. Examples include surveys, interviews, experiments, case studies, focus groups, observations, questionnaires, and statistical tests. Methods answer: “How is the research carried out?”\n\nResearch Methodology refers to the overall strategy, principles, and rationale guiding the entire research process. It explains why certain methods are chosen and how they fit the research objectives. It includes philosophical assumptions (positivism, interpretivism, pragmatism), research design (qualitative, quantitative, mixed), sampling framework, ethical considerations, and the data analysis approach. Methodology answers: “Why and in what way is the research carried out?”\n\nKey difference — Methods = the tools/techniques (the HOW); Methodology = the strategy/rationale (the WHY and WHAT).',
    referenceSections: ['Difference Between Research Methods and Research Methodology'],
  },

  // ============================================================
  // THEME → LITERATURE REVIEW PARAGRAPH
  // ============================================================
  {
    id: 'tl-01',
    topic: 'chapter1',
    drillKind: 'themeToLR',
    type: 'drill',
    prompt:
      'A study on infection prevention has identified the following LR theme:\n\n“Theme: Knowledge of infection prevention among nurses.”\n\nWrite ONE literature-review paragraph (about 6–10 sentences) under this theme. Your paragraph should: review at least one previous study, compare/contrast findings, identify a gap, and connect to the present study.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Reviews at least one specific previous study (author + year + finding)', marks: 2, detail: 'A good LR cites and summarises previous work (e.g., Salu et al., 2023 on nurses’ nosocomial infection knowledge in Ghana) rather than only making general claims.' },
      { id: 'r2', label: 'Critically compares/contrasts findings rather than just summarising', marks: 2, detail: 'Discuss strengths/weaknesses; compare findings across contexts (e.g., Ghana vs. Nigeria); note consistency or contradiction.' },
      { id: 'r3', label: 'Identifies a gap relevant to the present study', marks: 2, detail: 'Highlight what is missing (e.g., few studies on knowledge among nurses in this specific region; limited use of validated tools) — the gap your study fills.' },
      { id: 'r4', label: 'Connects to the present study and its objective', marks: 1, detail: 'Conclude the paragraph by linking the reviewed evidence to your study’s objective (assessing nurses’ IPC knowledge in this setting).' },
      { id: 'r5', label: 'Follows good LR structure (logical flow, current sources, synthesis)', marks: 1, detail: 'A good LR is comprehensive, critical, well-organised, balanced, synthesised, and uses current sources.' },
    ],
    modelAnswer:
      'Theme: Knowledge of infection prevention among nurses\n\nNurses’ knowledge of infection prevention and control (IPC) is widely recognised as a critical determinant of patient safety. Salu et al. (2023), in a cross-sectional study of nurses in Ghana, reported moderate overall IPC knowledge, with notable gaps around standard precautions and the safe disposal of sharps. Similar findings have been reported in other West African contexts, where nurses showed adequate theoretical knowledge but inconsistent translation into practice. By contrast, studies in tertiary hospitals in higher-resource settings have generally documented stronger knowledge scores, often linked to regular in-service training and supportive supervision. Together, these studies suggest that knowledge of IPC is influenced both by individual factors (experience, training) and by institutional context (workload, leadership). However, few studies focus specifically on nurses in the proposed study setting, and most rely on self-reported knowledge measures rather than validated tools. This study therefore seeks to assess nurses’ IPC knowledge in the chosen setting using a structured, validated questionnaire, addressing this gap and informing targeted training interventions.',
    referenceSections: ['Forming Themes in a Literature Review; Characteristics of a Good Literature Review; How to Write a Literature Review'],
  },
  {
    id: 'tl-02',
    topic: 'chapter1',
    drillKind: 'themeToLR',
    type: 'drill',
    prompt:
      'A study on antenatal care adherence has identified the following theme:\n\n“Theme: Enabling factors and ANC adherence.”\n\nWrite ONE literature-review paragraph under this theme. Review at least one previous study, compare findings, identify a gap, and connect to the present study.',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Defines enabling factors and reviews at least one prior study', marks: 2, detail: 'Enabling factors include income, health insurance, distance to facility, partner support. Cite a prior study with findings.' },
      { id: 'r2', label: 'Critically compares findings across contexts', marks: 2, detail: 'Compare findings (e.g., urban vs. rural; insured vs. uninsured) and note consistency or contradiction.' },
      { id: 'r3', label: 'Identifies a clear gap related to enabling factors', marks: 2, detail: 'Highlight a missing area (e.g., limited evidence on partner support in urban Ghanaian facilities; few mediation analyses).' },
      { id: 'r4', label: 'Connects to the present study’s objective', marks: 1, detail: 'Link the literature to the study’s objective on enabling factors and ANC adherence.' },
      { id: 'r5', label: 'Demonstrates synthesis (not just summary)', marks: 1, detail: 'Show patterns/relationships across studies and why the present study is needed.' },
    ],
    modelAnswer:
      'Theme: Enabling factors and ANC adherence\n\nAndersen’s Behavioral Model identifies enabling factors — including household income, health insurance coverage, distance to facility, and partner support — as central to healthcare utilisation. Several studies in sub-Saharan Africa report that women with health insurance and shorter travel distances complete more ANC visits than uninsured or remote-living women, consistent with the model’s predictions. By contrast, evidence on partner support has been mixed: some studies show partner involvement strongly predicting adherence, while others report only a modest effect in urban contexts where transport and out-of-pocket cost are smaller barriers. Most existing studies focus on rural settings, and few have examined enabling factors specifically among women in urban Ghanaian health facilities. Moreover, few studies disentangle the indirect pathway through which enabling factors shape attitudes and, in turn, adherence. The present study therefore examines how enabling factors influence ANC adherence in an urban Ghanaian context and tests whether attitude toward ANC mediates this relationship, addressing this gap and informing service-level interventions.',
    referenceSections: ['Conceptual Framework Cont’d — Andersen’s Behavioral Model; Forming Themes in a Literature Review'],
  },

  // ============================================================
  // SIGNIFICANCE — additional drill
  // ============================================================
  {
    id: 'sig-04',
    topic: 'chapter1',
    drillKind: 'significance',
    type: 'drill',
    prompt:
      'Write the SIGNIFICANCE OF THE STUDY for the topic:\n\n“Prevalence and Determinants of Hypertension Control among Patients Attending Public Hospitals in Accra, Ghana.”',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Public-health context (HTN burden in Ghana; uncontrolled HTN drives complications)', marks: 2, detail: 'Open with the importance of the problem — hypertension is a leading non-communicable disease in Ghana and uncontrolled blood pressure increases the risk of stroke, heart disease, and premature death.' },
      { id: 'r2', label: 'Benefit to patients and clinicians (better outcomes; tailored counselling)', marks: 2, detail: 'Findings will help clinicians identify modifiable determinants of control and counsel patients on adherence, lifestyle, and clinic-attendance practices.' },
      { id: 'r3', label: 'Benefit to hospitals / Ministry of Health / Ghana Health Service (policy, training, resource allocation)', marks: 2, detail: 'Public hospitals, the Ghana Health Service, and the Ministry of Health can use the results to strengthen NCD-clinic protocols, training, and resource allocation (medications, BP equipment, counselling staff).' },
      { id: 'r4', label: 'Foundation for future research / evidence base', marks: 2, detail: 'Provides future researchers with baseline data on prevalence and determinants of control in Accra and a foundation for interventional studies to improve adherence and outcomes.' },
    ],
    modelAnswer:
      'Hypertension is a leading non-communicable disease in Ghana, and uncontrolled blood pressure significantly increases the risk of stroke, heart disease, and premature death. This study assesses the prevalence of controlled hypertension among adult patients in public hospitals in Accra and identifies the socio-demographic, behavioural (medication adherence), and health-system determinants associated with control. The findings will benefit patients and clinicians by identifying modifiable factors that can guide tailored counselling on adherence, lifestyle, and clinic-attendance practices. Public hospitals, the Ghana Health Service, and the Ministry of Health can use the results to strengthen NCD-clinic protocols, staff training, and resource allocation — including medications, BP-measurement equipment, and counselling staff. Additionally, the study provides future researchers with baseline data on prevalence and determinants of hypertension control in Accra, and a foundation for interventional studies aimed at improving adherence and long-term outcomes.',
    referenceSections: ['Quantitative Topics — Topic 1; Significance of the Study (recipe)'],
  },

  // ============================================================
  // SAMPLING PROCEDURE — writing drills
  // ============================================================
  {
    id: 'samp-01',
    topic: 'sampling',
    drillKind: 'samplingProcedure',
    type: 'drill',
    prompt:
      'Write the SAMPLING PROCEDURE section for the following study. Your answer should name the sampling technique, justify it, describe the sampling frame, state the sample-size determination method, and explain how participants will be recruited.\n\nStudy: “Nurses’ Knowledge on Nosocomial Infection Preventive Measures and Its Associated Factors in selected hospitals in the Ashanti Region, Ghana.”',
    marks: 10,
    rubric: [
      { id: 'r1', label: 'Names a probability sampling technique and justifies it', marks: 2, detail: 'A simple random sampling technique is appropriate because a complete list of nurses (staff register) is available and every nurse should have an equal chance of selection. (Stratified sampling by ward could also be justified if proportional representation across wards is needed.)' },
      { id: 'r2', label: 'Describes the sampling frame using the funnel (Population → Setting → Sampling frame → Sample)', marks: 2, detail: 'The sampling frame is the complete list of registered nurses currently working at the selected hospitals. Population → Setting (the selected hospitals) → Sampling frame (nurses on the duty register meeting the inclusion criteria) → Sample (those actually selected).' },
      { id: 'r3', label: 'States the sample-size determination method (Cochran or Yamane) with parameters', marks: 2, detail: 'Sample size estimated using Cochran’s formula n = Z²·p·(1−p)/d² with Z = 1.96, p taken from a previous similar study (e.g., Salu et al., 2023), and d = 0.05. Alternatively, if the nurse population at the selected hospitals is known and finite, Yamane’s formula n = N / (1 + N·e²) with e = 0.05 can be used.' },
      { id: 'r4', label: 'Describes recruitment from the sampling frame', marks: 2, detail: 'Eligible nurses on the duty register are listed and assigned random numbers; those drawn are approached on the wards, the study purpose is explained, and informed consent is obtained before questionnaire administration.' },
      { id: 'r5', label: 'Mentions inclusion/exclusion criteria applied at the sampling frame', marks: 1, detail: 'Inclusion: registered nurses currently providing direct patient care at the selected hospitals; able to consent. Exclusion: student/trainee nurses; nurses on extended leave during data collection.' },
      { id: 'r6', label: 'Acknowledges the trade-off / limitation of the chosen technique', marks: 1, detail: 'Simple random sampling reduces selection bias and supports generalisability but requires a complete and up-to-date duty register and can be costly/time-consuming to operationalise.' },
    ],
    modelAnswer:
      'A simple random sampling technique was used to select nurses for this study, because a complete duty register of nurses at the selected hospitals was available and every eligible nurse should have an equal chance of selection. (Stratified sampling by ward could also be justified if proportional ward representation is required.)\n\nThe sampling procedure followed the funnel: Population (all nurses in the Ashanti Region) → Setting (the selected hospitals) → Sampling frame (the list of registered nurses currently providing direct patient care at those hospitals who meet the inclusion criteria) → Sample (those actually drawn). Inclusion criteria included: registered nurses currently providing direct patient care and able to consent. Student/trainee nurses and those on extended leave during data collection were excluded.\n\nThe sample size was estimated using Cochran’s formula, n = Z²·p·(1−p)/d², with Z = 1.96 (95% confidence), p taken from a comparable previous study (e.g., Salu et al., 2023 on nurses’ IPC knowledge in Ghana), and d = 0.05. Where the eligible nurse population is known and finite, Yamane’s formula, n = N / (1 + N·e²) with e = 0.05, may be used instead.\n\nEligible nurses on the duty register were assigned random numbers, and those drawn were approached on the wards. The study purpose was explained, and written informed consent was obtained before the structured questionnaire was administered. Simple random sampling reduces selection bias and supports generalisability, although it requires a complete and up-to-date register and can be operationally demanding.',
    referenceSections: ['Sampling Procedure; Sampling Procedure Cont’d — Sampling Frame; Yamane’s / Cochran’s formulas; Sample: Data Collection Procedure'],
  },
  {
    id: 'samp-02',
    topic: 'sampling',
    drillKind: 'samplingProcedure',
    type: 'drill',
    prompt:
      'Write the SAMPLING PROCEDURE for the following QUALITATIVE study. Name the sampling technique, justify it, describe how the sample size is determined, and explain how participants will be recruited.\n\nStudy: “Experiences of Intensive Care Unit Nurses in End-of-Life Care at Ho Teaching Hospital, Ghana: A Qualitative Study.”',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Names purposive sampling (and justifies it for qualitative work)', marks: 2, detail: 'Purposive sampling is appropriate because participants are intentionally selected for their ability to provide rich, relevant information about end-of-life care in the ICU.' },
      { id: 'r2', label: 'States sample size is determined by DATA SATURATION (not statistical formula)', marks: 2, detail: 'Sample size in qualitative research is determined conceptually through data saturation — the point at which no new information, themes, or insights emerge from additional interviews.' },
      { id: 'r3', label: 'Gives an expected approximate sample size with rationale', marks: 1, detail: 'Approximately 10–15 ICU nurses are expected, consistent with focused phenomenological/case studies which often saturate with 6–15 participants.' },
      { id: 'r4', label: 'Inclusion criteria support information richness', marks: 1, detail: 'ICU nurses with ≥6 months experience who have provided end-of-life care in the past 6 months — these participants can speak meaningfully to the phenomenon.' },
      { id: 'r5', label: 'Describes recruitment and ethics', marks: 1, detail: 'Eligible nurses are approached through the ICU nurse manager, the study purpose explained, and written informed consent obtained before interview. Confidentiality and anonymity are maintained throughout.' },
      { id: 'r6', label: 'Snowball sampling acknowledged as an option for hard-to-reach perspectives', marks: 1, detail: 'Snowball sampling may complement purposive sampling if specific perspectives (e.g., nurses from particular shifts) are hard to reach.' },
    ],
    modelAnswer:
      'A purposive sampling technique will be used because participants are intentionally selected for their ability to provide rich, relevant information about end-of-life care in the ICU. Inclusion criteria — registered ICU nurses at Ho Teaching Hospital with at least 6 months of ICU experience who have provided end-of-life care to at least one patient in the past 6 months — support information richness.\n\nThe sample size will be determined conceptually through data saturation, the point at which no new information, themes, or insights emerge from additional interviews. Approximately 10–15 nurses are expected, consistent with focused phenomenological/case studies which often saturate with 6–15 participants. Snowball sampling may complement purposive sampling if specific perspectives (e.g., night-shift nurses) are hard to reach.\n\nEligible nurses will be approached through the ICU nurse manager. The study purpose, benefits, risks, and rights will be explained. Written informed consent will be obtained before the in-depth interview, and confidentiality and anonymity will be maintained throughout the study.',
    referenceSections: ['Sampling Procedure Cont’d (Non-Probability Methods); Data Saturation; Sample Size Determination in Qualitative Research'],
  },

  // ============================================================
  // ETHICS — writing drill
  // ============================================================
  {
    id: 'eth-w-01',
    topic: 'ethics',
    drillKind: 'ethicsWriting',
    type: 'drill',
    prompt:
      'Write the ETHICAL CONSIDERATIONS section for the following study. Address every step in the ethics process — introductory letter, ethical approval, informed consent, confidentiality and anonymity — and name the underlying principles (autonomy, beneficence, non-maleficence, justice).\n\nStudy: “Assessment of Compliance with Hand Hygiene Practices Among Nurses at Korle-Bu Teaching Hospital, Accra.”',
    marks: 12,
    rubric: [
      { id: 'r1', label: 'Step 1 — Introductory letter from department/institution', marks: 1, detail: 'An introductory letter was obtained from the Department of Nursing (university) and submitted to the hospital administration for permission.' },
      { id: 'r2', label: 'Step 2 — Ethical approval (IRB / facility ethics committee)', marks: 2, detail: 'Because this is a facility-based study, the proposal was submitted to the Institutional Review Board (IRB) or hospital ethics committee for ethical clearance before data collection began.' },
      { id: 'r3', label: 'Step 3 — Informed consent: purpose, benefits, risks, rights; voluntariness and right to withdraw', marks: 2, detail: 'Participants received a clear explanation of the purpose, benefits, risks, and their rights. Participation was voluntary; they could withdraw at any time. Written informed consent (or verbal where literacy was a concern) was obtained.' },
      { id: 'r4', label: 'Step 4 — Confidentiality and anonymity (with secure storage)', marks: 2, detail: 'Personal identifiers were removed; questionnaires were coded; electronic data were password-protected and hard copies locked in a cabinet accessible only to the researcher.' },
      { id: 'r5', label: 'Names the underlying principles — autonomy and voluntariness', marks: 1, detail: 'Autonomy: participants freely chose to take part without coercion (voluntariness).' },
      { id: 'r6', label: 'Names beneficence and non-maleficence', marks: 2, detail: 'Beneficence: the study aims to improve hand-hygiene practice and patient safety. Non-maleficence: no foreseeable physical, psychological, or social harm; observation conducted discreetly to avoid embarrassment.' },
      { id: 'r7', label: 'Names justice and honest reporting', marks: 1, detail: 'Justice: fair selection across wards/shifts. Data will be reported honestly without fabrication or manipulation.' },
      { id: 'r8', label: 'Mentions data handling/retention timelines', marks: 1, detail: 'Data will be retained for a defined period (e.g., five years) per institutional policy and then safely destroyed.' },
    ],
    modelAnswer:
      'All ethical standards and protocols will be strictly observed throughout this study.\n\nStep 1 — Introductory letter: An introductory letter from the Department of Nursing will be submitted to the hospital administration to obtain permission to conduct the study.\n\nStep 2 — Ethical approval: As this is a facility-based study, the proposal will be submitted to the Institutional Review Board (IRB) or hospital ethics committee for ethical clearance before data collection begins.\n\nStep 3 — Informed consent: The purpose, benefits, risks, and rights of participants will be clearly explained. Participation is entirely voluntary, and participants are free to withdraw at any time without consequence (autonomy and voluntariness). Written informed consent (or verbal consent where literacy is a concern) will be obtained before any data are collected.\n\nStep 4 — Confidentiality and anonymity: Personal identifiers will be removed; questionnaires will be coded. Electronic data (Excel/SPSS) will be password-protected and stored on a secured device; hard copies of questionnaires and consent forms will be locked in a cabinet accessible only to the researcher. Data will be retained for a defined period (e.g., five years) per institutional policy and then safely destroyed.\n\nUnderlying principles: Beneficence is addressed by aiming to improve hand-hygiene practice and patient safety. Non-maleficence is addressed by ensuring observations are conducted discreetly to avoid embarrassment, with no foreseeable physical, psychological, or social harm. Justice is addressed through fair selection across wards and shifts. Throughout, data will be reported honestly without fabrication or manipulation.',
    referenceSections: ['Ethical Considerations in Research Methodology; Sample: Data Collection Procedure; Ethical Considerations in Different Research Designs'],
  },
  {
    id: 'eth-w-02',
    topic: 'ethics',
    drillKind: 'ethicsWriting',
    type: 'drill',
    prompt:
      'Write the ETHICAL CONSIDERATIONS section for a COMMUNITY-BASED study. Address community entry, ethical approval, informed consent, confidentiality, and the underlying principles.\n\nStudy: “Knowledge, Attitude and Practices of Malaria Preventive Measures Among Mothers with Children Under Five Years in a Rural District of Northern Ghana.”',
    marks: 10,
    rubric: [
      { id: 'r1', label: 'Introductory letter and COMMUNITY ENTRY through local/community leaders', marks: 2, detail: 'For community-based studies, permission is obtained from local or community authorities/leaders before entry; an introductory letter from the department/institution is also submitted.' },
      { id: 'r2', label: 'Ethical approval from IRB or community authority', marks: 1, detail: 'Ethical clearance is sought from the IRB; community-level approval is also obtained.' },
      { id: 'r3', label: 'Informed consent (with literacy/language considerations)', marks: 2, detail: 'Participants receive a clear explanation in a language they understand (Twi/Dagbani/etc.). Written or verbal consent (depending on literacy) is obtained, and participation is voluntary with right to withdraw.' },
      { id: 'r4', label: 'Confidentiality and anonymity with secure storage', marks: 2, detail: 'Identifiers removed; data stored securely (password-protected files; locked cabinet for hard copies).' },
      { id: 'r5', label: 'Names the principles (autonomy, beneficence, non-maleficence, justice)', marks: 2, detail: 'Autonomy via voluntary consent; beneficence via improving malaria prevention; non-maleficence via avoiding social harm or stigma; justice via fair selection across households.' },
      { id: 'r6', label: 'Respects cultural values', marks: 1, detail: 'Cultural values are respected; data collection times and procedures align with community norms.' },
    ],
    modelAnswer:
      'For this community-based study, the following ethical considerations will be observed.\n\nCommunity entry: An introductory letter from the Department of Nursing will be submitted to the District Health Directorate, and permission will be obtained from local and community leaders (chief, assemblyman, opinion leaders) before entering households.\n\nEthical approval: Ethical clearance will be sought from the Institutional Review Board prior to data collection.\n\nInformed consent: The purpose, benefits, risks, and rights of participants will be explained in a language they understand (e.g., Twi or Dagbani). Written or verbal consent will be obtained depending on literacy. Participation is voluntary and mothers are free to withdraw at any time without consequence.\n\nConfidentiality and anonymity: Personal identifiers will be removed; questionnaires will be coded. Electronic data will be password-protected and stored on a secured device; hard copies will be locked in a cabinet accessible only to the researcher.\n\nUnderlying principles: Autonomy is upheld through voluntary participation. Beneficence is reflected in the study’s aim to inform malaria prevention practices. Non-maleficence is upheld by avoiding social harm or stigma — no household will be singled out in reports. Justice is reflected in fair selection across households in the community. Cultural values will be respected, and data collection times will align with community norms.',
    referenceSections: ['Ethical Considerations in Research Methodology — community-based; Key Ethical Terms; Ethical Considerations in Different Research Designs'],
  },

  // ============================================================
  // VALIDITY & RELIABILITY — writing drill
  // ============================================================
  {
    id: 'vr-w-01',
    topic: 'validityReliability',
    drillKind: 'validityReliabilityWriting',
    type: 'drill',
    prompt:
      'Describe how you would ensure both the VALIDITY and RELIABILITY of the data collection instrument for the following study. Address the relevant TYPES of validity and reliability and the practical steps you would take.\n\nStudy: “Nurses’ Knowledge, Attitude, and Practice of Infection Prevention and Control at a Teaching Hospital in Ghana.”',
    marks: 12,
    rubric: [
      { id: 'r1', label: 'Content validity — literature review + alignment + expert review', marks: 2, detail: 'Conduct an extensive literature review; align items directly with the study objectives and conceptual framework (KAP model); seek expert review from supervisors/subject specialists to confirm coverage.' },
      { id: 'r2', label: 'Construct validity — instrument reflects the theoretical concept', marks: 1, detail: 'Ensure each section measures the construct it claims to measure (knowledge items measure IPC knowledge; attitude items measure IPC attitudes, not generic professional attitudes).' },
      { id: 'r3', label: 'Criterion validity — compare with a validated tool', marks: 1, detail: 'Where possible, compare results with an existing validated tool (e.g., previously validated IPC knowledge scale).' },
      { id: 'r4', label: 'Pilot test (pre-test) and refine items', marks: 2, detail: 'Pilot test with a small group of nurses NOT in the main study to identify unclear, ambiguous, or irrelevant items, then revise.' },
      { id: 'r5', label: 'Test-retest reliability', marks: 1, detail: 'Administer the instrument to the same nurses at two different times during the pilot; check for consistent responses.' },
      { id: 'r6', label: 'Inter-rater reliability', marks: 1, detail: 'For any observational checklist (e.g., hand-hygiene compliance), two nurses independently observe the same event and compare scores.' },
      { id: 'r7', label: 'Internal consistency reliability — Cronbach’s alpha ≥ 0.7', marks: 2, detail: 'Compute Cronbach’s alpha on the knowledge, attitude, and practice subscales; target ≥ 0.7 (revise items if below).' },
      { id: 'r8', label: 'Standardised wording + research-assistant training + clear standardised administration', marks: 1, detail: 'Use clear, unambiguous, standardised questions and train research assistants to administer the instrument uniformly.' },
      { id: 'r9', label: 'Mentions that good design strengthens both internal validity AND external validity', marks: 1, detail: 'Aligning items to objectives, using a representative sample, and clearly defining the population improve internal validity (reducing bias) AND external validity (generalisability).' },
    ],
    modelAnswer:
      'Validity will be ensured at multiple levels. Content validity will be supported by an extensive literature review and by aligning each item with the specific objectives and the KAP conceptual framework; supervisors and subject specialists will review the draft instrument to confirm coverage. Construct validity will be addressed by ensuring each section measures the construct it claims to measure — knowledge items measure IPC knowledge, attitude items measure IPC attitudes (not generic professional attitudes), and practice items measure observable IPC behaviours. Criterion validity will be supported where possible by comparing results against an existing validated IPC knowledge scale.\n\nThe instrument will then be pilot tested with a small group of nurses who are not in the main study, to identify unclear, ambiguous, or irrelevant items; items will be revised based on pilot feedback.\n\nReliability will be addressed using complementary strategies. Test–retest reliability will be assessed by administering the instrument to the same nurses at two different times during the pilot and checking consistency. Inter-rater reliability will be assessed for any observational checklist (e.g., hand-hygiene compliance) by having two nurses independently observe the same event and comparing scores. Internal consistency reliability will be assessed using Cronbach’s alpha on the knowledge, attitude, and practice subscales, with a target of ≥ 0.7; items will be revised if alpha is below the threshold.\n\nFinally, clear, unambiguous, and standardised questions will be used, and research assistants will be trained to ensure uniform administration. Together, these steps strengthen both internal validity (reducing bias) and external validity (supporting generalisability of findings).',
    referenceSections: ['Validity and Reliability of Data Collection Instruments; How to Achieve Validity; How to Achieve Reliability'],
  },

  // ============================================================
  // STUDY AREA / SITE / SETTING — writing drill
  // ============================================================
  {
    id: 'sa-w-01',
    topic: 'studyArea',
    drillKind: 'studyAreaWriting',
    type: 'drill',
    prompt:
      'Write the STUDY AREA, STUDY SITE, and STUDY SETTING for the following FACILITY-BASED study:\n\n“Patient Waiting Time and Satisfaction at the Orthopaedic Clinic of Korle-Bu Teaching Hospital, Accra, Ghana.”',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Study area — broader geographic/administrative region with context', marks: 2, detail: 'The study area is the Greater Accra Region of Ghana — a heavily populated, urban region that serves as a major referral catchment for the country.' },
      { id: 'r2', label: 'Study site — specific location within the area (clinic/unit)', marks: 2, detail: 'The study site is the Orthopaedic Clinic at Korle-Bu Teaching Hospital, the country’s main tertiary referral hospital in Accra.' },
      { id: 'r3', label: 'Study setting — environment and context (facility-based)', marks: 2, detail: 'The study setting is a busy tertiary outpatient department where patients are managed by consultants, residents, and nurses, with structured registration, triage, and consultation workflows.' },
      { id: 'r4', label: 'Describes departments/units, services, and staff relevant to the study', marks: 1, detail: 'Departments/units: orthopaedic OPD, X-ray, physiotherapy. Services include consultations, fracture management, follow-up care. Staff include consultants, registrars, nurses, records officers.' },
      { id: 'r5', label: 'Notes time-frame and links setting to internal validity', marks: 1, detail: 'Data will be collected over a defined period (e.g., April–June 2025). The setting allows control, consistency, and reduced variability — supporting internal validity.' },
    ],
    modelAnswer:
      'Study area: The study area is the Greater Accra Region of Ghana — a heavily populated, urban region that serves as a major referral catchment for orthopaedic care in the country.\n\nStudy site: The study site is the Orthopaedic Clinic at Korle-Bu Teaching Hospital, the country’s main tertiary referral hospital in Accra. Korle-Bu manages a high volume of orthopaedic conditions referred from across Ghana.\n\nStudy setting: The setting is a busy tertiary outpatient department, with structured registration, triage, and consultation workflows. Departments relevant to the study include the orthopaedic OPD, X-ray, and physiotherapy. Services include consultations, fracture management, and follow-up care, delivered by consultants, registrars, nurses, and records officers.\n\nData will be collected over a defined period (e.g., April–June 2025). The setting supports internal validity by maintaining control, consistency, and minimising procedural variability across participants.',
    referenceSections: ['Study Area, Study Site & Study Setting; Study Area, Study Site & Study Setting Cont’d — facility-based'],
  },
  {
    id: 'sa-w-02',
    topic: 'studyArea',
    drillKind: 'studyAreaWriting',
    type: 'drill',
    prompt:
      'Write the STUDY AREA, STUDY SITE, and STUDY SETTING for a COMMUNITY-BASED study:\n\n“Knowledge, Attitude and Practices of Malaria Preventive Measures Among Mothers with Children Under Five in selected communities of the Kassena-Nankana District, Upper East Region, Ghana.”',
    marks: 8,
    rubric: [
      { id: 'r1', label: 'Study area — broader region with demographic/contextual background', marks: 2, detail: 'Study area: Kassena-Nankana District of the Upper East Region — a predominantly rural district with a high burden of malaria; describe population size, climate, and key socio-economic context.' },
      { id: 'r2', label: 'Mentions occupations and way of life', marks: 1, detail: 'Residents are predominantly subsistence farmers; women are often the primary caregivers for children under five.' },
      { id: 'r3', label: 'Mentions schools, hospitals, markets, or landmarks', marks: 1, detail: 'The district has primary and junior high schools, a district hospital, several CHPS compounds, and weekly markets that serve as community focal points.' },
      { id: 'r4', label: 'Study site — selected communities (specific locations) within the area', marks: 2, detail: 'Study site: selected communities (e.g., Navrongo, Paga, Kologo) within the district from which households with children under five will be drawn.' },
      { id: 'r5', label: 'Study setting — environmental/social context (community-based)', marks: 1, detail: 'Setting: rural, primarily farming community; data collection is at household level during dry-season afternoons to align with community norms.' },
      { id: 'r6', label: 'Notes time-frame and supports external validity', marks: 1, detail: 'Data will be collected over a defined window (e.g., October–December 2025). A well-defined area supports external validity and generalisability of findings.' },
    ],
    modelAnswer:
      'Study area: The study area is the Kassena-Nankana District in the Upper East Region of Ghana — a predominantly rural district with a documented high burden of malaria. The population is largely engaged in subsistence farming, with women as the primary caregivers for children under five. The district hosts primary and junior high schools, a district hospital, several CHPS compounds, and weekly markets that serve as key community focal points.\n\nStudy site: The study sites are selected communities within the district (e.g., Navrongo, Paga, Kologo) from which households with children under five will be drawn.\n\nStudy setting: The setting is a rural, primarily farming community context. Data collection will occur at household level, during dry-season afternoons, to align with community norms and respect cultural values. Data will be collected over a defined window (e.g., October–December 2025).\n\nA clearly defined study area supports the external validity (generalisability) of the findings to similar rural districts in northern Ghana.',
    referenceSections: ['Study Area, Study Site & Study Setting (community-based description elements)'],
  },

  // ============================================================
  // TRUSTWORTHINESS (qualitative) — writing drill
  // ============================================================
  {
    id: 'trust-01',
    topic: 'validityReliability',
    drillKind: 'trustworthiness',
    type: 'drill',
    prompt:
      'For the following QUALITATIVE study, describe how you would establish TRUSTWORTHINESS, addressing each of Lincoln and Guba’s (1985) four criteria — credibility, transferability, dependability, and confirmability — and naming concrete strategies under each.\n\nStudy: “Lived Experiences of Family Caregivers of Patients with Chronic Illness in Urban Communities in Accra.”',
    marks: 12,
    rubric: [
      { id: 'r1', label: 'Defines trustworthiness as the qualitative equivalent of validity & reliability', marks: 1, detail: 'In qualitative research, validity and reliability are understood as trustworthiness — making findings credible, dependable, confirmable, and transferable.' },
      { id: 'r2', label: 'Credibility — triangulation', marks: 1, detail: 'Use multiple data sources (interviews, observations, document review) or multiple investigators to cross-check findings.' },
      { id: 'r3', label: 'Credibility — member checking', marks: 1, detail: 'Return transcripts and interpretations to caregivers for confirmation that their views were accurately captured.' },
      { id: 'r4', label: 'Credibility — prolonged engagement / peer debriefing', marks: 1, detail: 'Prolonged engagement with participants and peer debriefing with colleagues/experts to identify potential bias.' },
      { id: 'r5', label: 'Transferability — thick description (corresponds to external validity)', marks: 2, detail: 'Provide rich, thick description of participants, settings, and contexts so readers can decide whether findings are applicable to other settings.' },
      { id: 'r6', label: 'Dependability — audit trail (corresponds to reliability)', marks: 2, detail: 'Maintain a detailed audit trail of every step — data collection, coding decisions, analytical procedures — so the process can be followed and audited.' },
      { id: 'r7', label: 'Dependability — code-recode strategy / inter-coder agreement', marks: 1, detail: 'Code the same data twice at different times and compare; or have multiple coders independently code and resolve differences.' },
      { id: 'r8', label: 'Confirmability — reflexive journaling', marks: 2, detail: 'Maintain a reflexive journal documenting the researcher’s assumptions, decisions, and potential bias, ensuring findings are shaped by participants rather than the researcher.' },
      { id: 'r9', label: 'Confirmability — support findings with verbatim quotes', marks: 1, detail: 'Use participants’ verbatim quotes to support findings and ground interpretations in the data.' },
    ],
    modelAnswer:
      'In qualitative research, validity and reliability are understood as trustworthiness. For this study, trustworthiness will be established using Lincoln and Guba’s (1985) four criteria.\n\nCredibility (≈ internal validity) will be enhanced through triangulation — combining in-depth interviews, observations, and document review (e.g., reflective journals) to cross-check findings. Member checking will involve returning transcripts and interpretations to caregivers for verification. Prolonged engagement and peer debriefing with colleagues/experts will further reduce researcher bias.\n\nTransferability (≈ external validity) will be supported by providing rich, thick description of participants, their caregiving contexts, and the urban Accra setting, so that readers can judge whether the findings apply to other contexts.\n\nDependability (≈ reliability) will be supported by maintaining a detailed audit trail of every step — data collection, coding decisions, and analytical procedures. A code-recode strategy and, where feasible, inter-coder agreement (multiple coders comparing and resolving differences) will further support consistency.\n\nConfirmability (≈ objectivity) will be supported by maintaining a reflexive journal that documents the researcher’s assumptions, decisions, and potential bias. Findings will be grounded in participants’ verbatim quotes and interpreted in reference to the published literature and theoretical frameworks (e.g., Lazarus & Folkman’s Stress and Coping Theory).',
    referenceSections: ['Validity and Reliability in Qualitative Research; Reliability in Qualitative Research; Trustworthiness in Qualitative Research'],
  },

  // ============================================================
  // OPERATIONAL DEFINITIONS — writing drill
  // ============================================================
  {
    id: 'op-01',
    topic: 'chapter1',
    drillKind: 'operationalDefinitions',
    type: 'drill',
    prompt:
      'Write OPERATIONAL DEFINITIONS for the key terms in the following topic. Each definition should explain how the term is understood AND how it will be measured in the study.\n\nTopic: “Knowledge, Attitude, and Practice of Infection Prevention and Control Among Nursing Students in the Greater Accra Region, Ghana.”',
    marks: 10,
    rubric: [
      { id: 'r1', label: 'Defines KNOWLEDGE conceptually AND states how it is measured', marks: 2, detail: 'Knowledge: the level of understanding nursing students have regarding infection prevention practices (hand hygiene, PPE use, safe disposal of sharps). Measured using a structured questionnaire.' },
      { id: 'r2', label: 'Defines ATTITUDE conceptually AND states how it is measured', marks: 2, detail: 'Attitude: the beliefs, feelings, and perceptions of nursing students toward infection prevention. Measured using a Likert-scale survey (e.g., Strongly Agree → Strongly Disagree) to determine positivity or negativity toward adherence.' },
      { id: 'r3', label: 'Defines PRACTICE conceptually AND states how it is measured', marks: 2, detail: 'Practice: the actual behaviours and adherence of nursing students to infection prevention protocols. Measured through observation or self-reported checklists.' },
      { id: 'r4', label: 'Defines INFECTION PREVENTION conceptually AND clarifies scope', marks: 2, detail: 'Infection prevention: the strategies implemented to minimise the spread of infections in healthcare settings, including hand hygiene, proper use of personal protective equipment, and safe disposal of sharps.' },
      { id: 'r5', label: 'States the purpose/role of operational definitions', marks: 1, detail: 'Operational definitions ensure consistency, clarity, and accuracy — allowing readers and researchers to interpret the study variables in the same way.' },
      { id: 'r6', label: 'Notes that operational definitions make abstract concepts measurable', marks: 1, detail: 'They make abstract concepts measurable, ensuring data are collected, analysed, and interpreted consistently.' },
    ],
    modelAnswer:
      'Knowledge: the level of understanding nursing students have regarding infection prevention practices, including hand hygiene, the use of personal protective equipment, and the safe disposal of sharps. It will be measured using a structured questionnaire.\n\nAttitude: the beliefs, feelings, and perceptions of nursing students toward infection prevention. It will be assessed using a Likert-scale survey (Strongly Agree → Strongly Disagree) to determine positivity or negativity toward adherence.\n\nPractice: the actual behaviours and adherence of nursing students to infection prevention protocols. It will be measured through observation or self-reported checklists.\n\nInfection Prevention: the strategies implemented to minimise the spread of infections in healthcare settings, including hand hygiene, the proper use of personal protective equipment, and the safe disposal of sharps.\n\nOperational definitions make these abstract concepts measurable, ensuring consistency, clarity, and accuracy so that the study variables are collected, analysed, and interpreted the same way across participants and observers.',
    referenceSections: ['Operational Definition of Terms; Examples — KAP IPC nursing students Greater Accra'],
  },
  {
    id: 'op-02',
    topic: 'chapter1',
    drillKind: 'operationalDefinitions',
    type: 'drill',
    prompt:
      'Write OPERATIONAL DEFINITIONS for the key terms in the following topic. Each definition should be conceptual + measurable.\n\nTopic: “Effect of Work-Related Stress on Quality of Patient Care Among Nurses in Public Hospitals.”',
    marks: 10,
    rubric: [
      { id: 'r1', label: 'Defines WORK-RELATED STRESS conceptually + measurably', marks: 2, detail: 'Work-related stress: the physical, emotional, and psychological strain nurses experience due to job demands (workload, shift patterns, staffing shortages, emotional strain). Measured using a validated instrument such as the Perceived Stress Scale (PSS-10).' },
      { id: 'r2', label: 'Defines QUALITY OF PATIENT CARE conceptually + measurably', marks: 2, detail: 'Quality of patient care: the extent to which nursing care meets professional standards. Measured using patient safety indicators, timeliness of care, patient satisfaction scores, and adherence to nursing standards.' },
      { id: 'r3', label: 'Defines JOB SATISFACTION (mediator) conceptually + measurably', marks: 2, detail: 'Job satisfaction: nurses’ overall positive emotional response to their job. Measured using a validated job-satisfaction scale.' },
      { id: 'r4', label: 'Defines COPING MECHANISMS (mediator) conceptually + measurably', marks: 2, detail: 'Coping mechanisms: problem-focused and emotion-focused strategies nurses use to manage stress. Measured via the Brief COPE inventory or similar.' },
      { id: 'r5', label: 'Notes purpose/role of operational definitions', marks: 1, detail: 'Operational definitions ensure consistency, clarity, and accuracy in measurement across participants and observers.' },
      { id: 'r6', label: 'Notes that they make abstract concepts measurable and interpretable consistently', marks: 1, detail: 'They make abstract constructs measurable so that data interpretation is reproducible.' },
    ],
    modelAnswer:
      'Work-related stress: the physical, emotional, and psychological strain nurses experience due to job demands such as workload, shift patterns, staffing shortages, and emotional strain. It will be measured using a validated instrument such as the Perceived Stress Scale (PSS-10).\n\nQuality of patient care: the extent to which nursing care meets professional standards. It will be measured using patient safety indicators, timeliness of care, patient satisfaction scores, and adherence to nursing standards.\n\nJob satisfaction (mediating variable): nurses’ overall positive emotional response to their job, measured using a validated job-satisfaction scale.\n\nCoping mechanisms (mediating variable): the problem-focused and emotion-focused strategies nurses use to manage stress, measured via the Brief COPE inventory or a similar validated tool.\n\nOperational definitions make these abstract constructs measurable and ensure consistency, clarity, and accuracy across participants and observers, so that data are collected, analysed, and interpreted the same way.',
    referenceSections: ['Operational Definition of Terms; Conceptual Framework Cont’d — Job Demand–Control Model'],
  },
];

export const researchDrills: ResearchDrill[] = [...IVDV_DRILLS, ...OTHER_DRILLS];

export function getDrillsByKinds(kinds: DrillKind[], count: number): ResearchDrill[] {
  const pool = researchDrills.filter((d) => kinds.includes(d.drillKind));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getDrillCountByKind(): Record<DrillKind, number> {
  const counts: Partial<Record<DrillKind, number>> = {};
  researchDrills.forEach((d) => {
    counts[d.drillKind] = (counts[d.drillKind] || 0) + 1;
  });
  return counts as Record<DrillKind, number>;
}

export const DRILL_KIND_LABELS: Record<DrillKind, string> = {
  topicToObjective: 'Topic → Main objective',
  mainToSpecific: 'Main objective → Specific objectives',
  so2rq: 'Specific objectives → Research questions',
  rq2so: 'Research questions → Specific objectives',
  themes: 'Research questions → LR themes',
  themeToLR: 'Theme → Literature review paragraph',
  significance: 'Write the significance of the study',
  retroVsPro: 'Differentiate retrospective vs prospective',
  instrumentChoice: 'Choose & justify a data collection instrument',
  ivdv: 'Identify Independent / Dependent variables',
  topicComponents: 'Break a research title into its components',
  problemTree: 'Construct a problem tree',
  conceptualFramework: 'Write a conceptual framework narrative',
  eligibility: 'Write inclusion & exclusion criteria',
  methodsVsMethodology: 'Differentiate research methods vs methodology',
  samplingProcedure: 'Write the sampling procedure for a study',
  ethicsWriting: 'Write the ethical considerations section',
  validityReliabilityWriting: 'Ensure validity & reliability of the tool',
  studyAreaWriting: 'Describe the study area / site / setting',
  trustworthiness: 'Establish trustworthiness (qualitative)',
  operationalDefinitions: 'Write operational definitions of key terms',
};
