import { PalliativeTopic } from './palliativeQuestions';

export interface RubricPoint {
  id: string;
  label: string;
  detail: string;
  marks: number;
}

export interface CaseQuestion {
  id: string;
  topic: PalliativeTopic;
  type: 'case';
  prompt: string;
  marks: number;
  frameworks?: string[];
  rubric: RubricPoint[];
  referenceFiles: string[];
}

export const palliativeCases: CaseQuestion[] = [
  // ============================================================
  // ASSIGNMENT — Design a district palliative service (15)
  // ============================================================
  {
    id: 'case-00',
    topic: 'hospiceModels',
    type: 'case',
    marks: 15,
    frameworks: ['Models of Palliative Care'],
    prompt:
      'As a newly trained palliative care provider, you have been transferred to a district and you notice there was no organised service for persons with life-threatening illness. Assess the situation and recommend the model of care that would be appropriate.',
    rubric: [
      {
        id: 'r1',
        label: 'Conduct a situation assessment',
        marks: 3,
        detail:
          'Gather data on population/demography, disease burden (cancer, HIV/AIDS, advanced heart/lung/kidney/liver disease, neurological disease), existing resources (district hospital, CHPS compounds, community health workers, essential drugs including oral morphine), referral pathways, cultural and faith context, and current gaps in care.',
      },
      {
        id: 'r2',
        label: 'Recommend home-based care as primary model',
        marks: 3,
        detail:
          'Home-based care is the most common, resource-light model. Matches patient preference (most prefer to die at home), culturally appropriate in many Ghanaian contexts. Health worker teaches the caregiver to manage the patient at home (e.g., oral opioids on the clock, WHO ladder).',
      },
      {
        id: 'r3',
        label: 'Add complementary models',
        marks: 2,
        detail:
          'Hospital-based team going round wards; outreach services to communities on scheduled dates (especially rural); outpatient care for those well enough to travel.',
      },
      {
        id: 'r4',
        label: 'Multidisciplinary team composition',
        marks: 2,
        detail:
          'Nurses (lead), district medical officer, social worker, chaplain or religious leaders, community health workers/volunteers, family caregivers. Palliative care is not nurse-only.',
      },
      {
        id: 'r5',
        label: 'Train existing health workers',
        marks: 2,
        detail:
          'All healthcare providers can practice basic palliative care. Train existing nurses, doctors, pharmacists, CHWs in communication (BREAK NEWS), symptom management (especially pain — WHO ladder), bereavement support.',
      },
      {
        id: 'r6',
        label: 'Scope of services',
        marks: 3,
        detail:
          'Pain control (WHO ladder), symptom management beyond pain (dyspnea, nausea, anorexia, oral care), holistic assessment across all five dimensions of total pain, family and bereavement support, culturally appropriate care, simple referral pathway to tertiary centre for complex cases.',
      },
    ],
    referenceFiles: [
      '03-goals-and-scope.md',
      '05-models-of-palliative-care.md',
      '13-pain-management-who-ladder.md',
    ],
  },

  // ============================================================
  // CASE 1 — Educating a family on morphine (30)
  // ============================================================
  {
    id: 'case-01',
    topic: 'painManagement',
    type: 'case',
    marks: 30,
    frameworks: ['Total Pain', 'WHO Analgesic Ladder'],
    prompt:
      "Dr. Lee has prescribed oral morphine for a patient with severe cancer pain, but the patient's family is hesitant due to fears of addiction. Using the concept of 'total pain' and the WHO analgesic ladder, explain how you would educate the family about pain management in palliative care. Address their concerns about addiction and discuss the importance of adequate pain control.",
    rubric: [
      {
        id: 'r1',
        label: 'Acknowledge the family concern empathically',
        marks: 2,
        detail:
          'Validate that addiction fear is one of the most persistent misconceptions in palliative opioid use. Sit at their level, use plain language, reassure them their concern shows love.',
      },
      {
        id: 'r2',
        label: "Introduce Total Pain (Saunders) — five dimensions",
        marks: 5,
        detail:
          'Pain in advanced cancer is never just physical. Saunders described five overlapping dimensions: physical (tumour, bone mets), psychological (anxiety, depression, fear), social (isolation, finances, being a burden), cultural (language, beliefs, lifestyle disruption), spiritual (meaning, guilt, "what is there to live for?"). Each amplifies the others.',
      },
      {
        id: 'r3',
        label: 'Explain the WHO Analgesic Ladder',
        marks: 5,
        detail:
          'Step 1 — non-opioids (paracetamol, aspirin, ibuprofen). Step 2 — weak opioid (codeine, tramadol). Step 3 — strong opioid (morphine), replacing the weak opioid but still alongside the non-opioid. Severe cancer pain requires Step 3.',
      },
      {
        id: 'r4',
        label: 'Apply the four key principles',
        marks: 3,
        detail:
          'By the mouth (oral preferred), by the clock (fixed intervals so pain never builds up), by the individual (titrated to patient), by the ladder (escalate systematically).',
      },
      {
        id: 'r5',
        label: 'Address the addiction fear directly',
        marks: 5,
        detail:
          'When prescribed and monitored, addiction is extremely rare. Goal is to relieve suffering, not induce dependency. Distinguish physical dependence/tolerance (normal physiological adaptation) from addiction (compulsive use despite harm). Morphine has no upper dose limit. Pain relief usually allows patient to be more themselves, not less.',
      },
      {
        id: 'r6',
        label: 'Consequences of unrelieved pain',
        marks: 4,
        detail:
          'Unrelieved pain causes depression, hopelessness, loss of appetite and sleep, anxiety, giving up hope, rejecting treatment, withdrawing from family. Withholding morphine to "protect" actually harms the patient and shortens meaningful time.',
      },
      {
        id: 'r7',
        label: 'Safety and breakthrough pain',
        marks: 3,
        detail:
          'Team monitors for side effects: constipation common but treatable (laxatives); nausea usually settles. Respiratory depression rare at therapeutic doses — withhold if respirations ≤12/min. Breakthrough pain managed with a rescue dose (≈ half the regular dose) without disrupting schedule.',
      },
      {
        id: 'r8',
        label: 'Family partnership',
        marks: 3,
        detail:
          'Encourage family to support the schedule (take morphine even when not in pain, to prevent pain returning). Empower them to report concerns. Reassure: "We are always here to help if new problems arise."',
      },
    ],
    referenceFiles: [
      '09-concept-of-pain-total-pain.md',
      '13-pain-management-who-ladder.md',
      '02-misconceptions.md',
    ],
  },

  // ============================================================
  // CASE 2 — Inadequate pain at WHO Step 3 (20)
  // ============================================================
  {
    id: 'case-02',
    topic: 'painManagement',
    type: 'case',
    marks: 20,
    frameworks: ['WHO Analgesic Ladder', 'Adjuvant Analgesics', 'Total Pain'],
    prompt:
      "Sarah, a palliative care nurse, is caring for a patient whose pain is not well-controlled despite being on Step 3 of the WHO analgesic ladder. Analyse potential reasons for inadequate pain control in this scenario. What adjuvant medications or non-pharmacological interventions might Sarah consider to improve pain management?",
    rubric: [
      {
        id: 'r1',
        label: 'Reassess the pain comprehensively',
        marks: 3,
        detail:
          'Use PQRST or OLDCART. Patient self-report remains the most reliable indicator. Look for change in mechanism (neuropathic component? new lesion?). Assess all five dimensions of total pain — psychological, social, spiritual distress may be amplifying physical pain.',
      },
      {
        id: 'r2',
        label: 'Potential reasons for inadequate control',
        marks: 5,
        detail:
          'Dose too low (morphine has no upper limit). Wrong analgesic for the mechanism (neuropathic component needs adjuvant). Missing breakthrough doses. Tolerance. Non-physical dimensions untreated. Compliance issues. New pathology / disease progression.',
      },
      {
        id: 'r3',
        label: 'Adjuvant medications',
        marks: 5,
        detail:
          'TCAs (amitriptyline) or anticonvulsants (gabapentin, valproate, carbamazepine, phenytoin) for neuropathic pain. Corticosteroids (dexamethasone, prednisolone) for swelling/inflammation. Benzodiazepines (diazepam, lorazepam) for skeletal muscle spasm. Anticholinergics (hyoscine butylbromide) for smooth muscle spasm. Adjuvants can be added at any step.',
      },
      {
        id: 'r4',
        label: 'Non-pharmacological interventions',
        marks: 4,
        detail:
          'Massage, heat/cold applications, music therapy, diversionary therapy, therapeutic touch, hypnosis, gentle exercise, emotional support, positioning (Fowler\'s). These modulate pain perception by directing attention away from sensory/affective components.',
      },
      {
        id: 'r5',
        label: 'Address Total Pain holistically',
        marks: 3,
        detail:
          'Psychological — counselling, TCAs/SNRIs (dual benefit). Social — social worker for family conflict, finances, isolation. Spiritual — chaplaincy if open to it. Cultural — respect beliefs and rituals.',
      },
    ],
    referenceFiles: [
      '13-pain-management-who-ladder.md',
      '14-adjuvants-and-breakthrough-pain.md',
      '10-types-of-pain.md',
      '12-pain-assessment.md',
    ],
  },

  // ============================================================
  // CASE 3 — Worden's tasks before & after death (20)
  // ============================================================
  {
    id: 'case-03',
    topic: 'grief',
    type: 'case',
    marks: 20,
    frameworks: ["Worden's Tasks of Mourning", 'BREAK NEWS'],
    prompt:
      "John, a hospice nurse, is caring for a patient in the final stages of life. The patient's family is struggling to cope with the impending loss. Using Worden's 'tasks of mourning' framework, describe how John can support the family through each task, both before and after the patient's death. Provide specific examples of interventions or conversations John might have with the family.",
    rubric: [
      {
        id: 'r1',
        label: "Introduce Worden's framework",
        marks: 2,
        detail:
          'Four tasks: accept the loss; experience the pain; adjust to a new environment; reinvest energy in new life. It is a fluctuating, non-linear process. Support begins before death (anticipatory grief) and continues afterwards.',
      },
      {
        id: 'r2',
        label: 'Task 1 — Accept the reality of the loss (before & after)',
        marks: 4,
        detail:
          'Before: honest, gentle conversations about prognosis using BREAK NEWS. Help the family confront finality without removing all hope ("We cannot cure this, but we can help her be comfortable"). After: encourage seeing/spending time with the body if culturally appropriate; support participation in funeral and memorial rituals; use clear language ("died").',
      },
      {
        id: 'r3',
        label: 'Task 2 — Experience the pain of grief (before & after)',
        marks: 5,
        detail:
          'Before (anticipatory grief): safe space to express feelings, sit, lean forward, eye contact, allow silence. Normalize emotions. Empathize: "This must be very difficult to watch." Do not stop tears. After: validate the full range of grief — affective, physical, cognitive, behavioural. Reassure upsurges on significant days are normal. Watch for dysfunctional grief (>6 months denial, severe physical symptoms, suicidality).',
      },
      {
        id: 'r4',
        label: 'Task 3 — Adjust to a new environment (before & after)',
        marks: 4,
        detail:
          'Before: help family anticipate practical changes (finances, household, decisions previously made by patient). Identify support networks early. After: this task often begins months later. Support new skill development (managing home, parenting solo). Connect with community resources, support groups, financial counselling. Respite for primary caregivers.',
      },
      {
        id: 'r5',
        label: 'Task 4 — Reinvest energy from the deceased (before & after)',
        marks: 3,
        detail:
          'Before: foundation laid by helping family say goodbye well — unfinished business, expressing love, granting "permission" to die (waiting-for-permission phenomenon). After: encourage gradual re-engagement; reassure new relationships/interests do not betray the deceased; support memorial activities (advocacy, charity). Grief does not end — pain becomes "less intense and more manageable."',
      },
      {
        id: 'r6',
        label: 'General support principles',
        marks: 2,
        detail:
          'Listen non-judgmentally. Reach out by visiting. Reassure they did everything possible. Educate about normal grief. Respect cultural and religious rituals.',
      },
    ],
    referenceFiles: [
      '20-bereavement-grief-mourning.md',
      '18-care-for-the-dying-patient.md',
      '19-communication.md',
    ],
  },

  // ============================================================
  // CASE 4 — Mrs Mariama Abu (30)
  // ============================================================
  {
    id: 'case-04',
    topic: 'dying',
    type: 'case',
    marks: 30,
    frameworks: ['Total Pain', 'WHO Ladder', 'BREAK NEWS', 'Cultural Competence'],
    prompt:
      "Mrs. Mariama Abu, a 35-year-old trader, was admitted with severe pain, swelling of the right breast, and difficulty sleeping. The left breast had already been removed. She also complained of difficulty breathing and loss of appetite. Further assessment revealed terminal cancer with metastasis to the bones. While interacting with Baba Abu (husband), you realised he was aware of Mrs. Abu's prognosis although Mrs. Abu seemed unaware of her condition. Baba Abu believes it is better if she is not informed. How will you care for Mrs. Abu at the end of life?",
    rubric: [
      {
        id: 'r1',
        label: 'Comprehensive holistic assessment',
        marks: 3,
        detail:
          'Approach with a total-pain framework. Physical: bone-mets pain, dyspnea, anorexia, insomnia, mastectomy disfigurement. Psychological: fear, anxiety, body image distress. Social: 35yo with dependents, financial worries as a trader, relationship dynamics. Cultural: Ghanaian context, widowhood, gender norms in disclosure. Spiritual: meaning-making, suffering, faith. Frequent unintrusive observations.',
      },
      {
        id: 'r2',
        label: 'Pain management — bone metastasis',
        marks: 4,
        detail:
          'WHO Step 3: oral morphine starting 2.5–5 mg every 4 hours, titrate up (no dose limit). By the clock; rescue dose ≈ half regular for breakthrough. Combine with non-opioid (caution NSAIDs cardiovascular risk). Adjuvants: corticosteroids (dexamethasone) for peri-tumour inflammation; consider radiotherapy referral; TCAs/anticonvulsants if neuropathic component. Non-pharmacological: massage, heat/cold, music, positioning. Monitor RR (withhold ≤12).',
      },
      {
        id: 'r3',
        label: 'Manage dyspnea and other physical symptoms',
        marks: 3,
        detail:
          'Dyspnea: Fowler\'s position, gentle suctioning, oxygen if needed, sedative if anxiety from breathlessness severe. Anorexia: small frequent meals, antiemetics 1 hour before, do not insist. Insomnia: cluster care, dim lights, music, control pain. Oral care: ice chips, petroleum jelly for lips (avoid glycerin). Skin: reposition every 2 hours.',
      },
      {
        id: 'r4',
        label: 'Ethical conflict around disclosure',
        marks: 5,
        detail:
          'Conflict between autonomy (right to know) and family wishes. Apply autonomy, veracity (truth-telling), beneficence, cultural sensitivity. Studies show patients usually want to know and cope better when they do. Mrs Abu may already sense something is wrong. Lying destroys trust; truth allows decisions about children, business, spiritual matters.',
      },
      {
        id: 'r5',
        label: 'Counsel Baba Abu',
        marks: 3,
        detail:
          'Acknowledge his concern as love and protection. Counsel gently on benefits of truth: maintains trust, reduces isolation, allows decisions about children\'s future, business, spiritual matters, sharing remaining time. Reassure: she will not be told without him present; team will deliver news gently at her pace. Use BREAK NEWS.',
      },
      {
        id: 'r6',
        label: 'Apply BREAK NEWS when disclosing',
        marks: 3,
        detail:
          'Be prepared (quiet space, no interruptions). Relatives present (husband). Expectations ("What have the doctors told you?"). Assess what is appropriate today. Knowledge sharing — slow, gentle, plain language, warning shot. Never "nothing we can do" — pair with what you CAN do (pain control, support). Empathize, allow tears. Way forward — care plan and follow-up time. Stop and reflect afterwards.',
      },
      {
        id: 'r7',
        label: 'Psychosocial and spiritual care',
        marks: 3,
        detail:
          'Address anxieties about children\'s future — social worker; explore family/community arrangements; help her articulate wishes. Address financial worries. Counsel on fears of pain, loneliness, dying. Spiritual care — explore faith, involve clergy if she wishes. Allow life review.',
      },
      {
        id: 'r8',
        label: 'Cultural sensitivity',
        marks: 2,
        detail:
          'Respect Ghanaian customs around dying and bereavement. Use culturally appropriate language. Support performance of cultural rituals. Be aware of widowhood rites that may follow her death; prepare to support Baba Abu. Engage local clergy and community elders if helpful.',
      },
      {
        id: 'r9',
        label: 'Family preparation for dying',
        marks: 2,
        detail:
          'Private space for family conversation. Prepare for physical changes of dying (mottling, Cheyne-Stokes, death rattle, detachment). Recognize "waiting for permission" phenomenon — reassure this is not abandonment.',
      },
      {
        id: 'r10',
        label: 'Continuity and bereavement',
        marks: 2,
        detail:
          'Coordinate with interdisciplinary team. Document a clear care plan; handover well. Plan bereavement follow-up for the family — palliative care does not end at death.',
      },
    ],
    referenceFiles: [
      '18-care-for-the-dying-patient.md',
      '19-communication.md',
      '07-ethics-of-care.md',
      '13-pain-management-who-ladder.md',
      '22-cultural-competence.md',
      '09-concept-of-pain-total-pain.md',
    ],
  },

  // ============================================================
  // CASE 5 — Counselling family on misconceptions (15)
  // ============================================================
  {
    id: 'case-05',
    topic: 'foundations',
    type: 'case',
    marks: 15,
    frameworks: ['Misconceptions of Palliative Care'],
    prompt:
      'Mr. Owusu\'s 67-year-old mother has advanced lung cancer. The doctor has recommended palliative care. Mr. Owusu refuses, saying "Palliative care means giving up — it means you have stopped fighting for her, and the morphine will make her an addict." Counsel Mr. Owusu on the meaning, scope, and benefits of palliative care.',
    rubric: [
      {
        id: 'r1',
        label: 'Acknowledge the concern empathically',
        marks: 2,
        detail:
          'Validate his love. His resistance is rooted in care, not ignorance. Sit at his level, plain language, reassure his concerns will be addressed.',
      },
      {
        id: 'r2',
        label: 'Define palliative care correctly',
        marks: 3,
        detail:
          'WHO (2005): active holistic care of patients whose disease is not responsive to curative treatment. Not abandonment — intensive, proactive care. Begins at diagnosis. Can coexist with curative treatment. Addresses physical, psychological, social, cultural, spiritual needs of patient and family.',
      },
      {
        id: 'r3',
        label: 'Correct each misconception',
        marks: 4,
        detail:
          '"Giving up hope" → focuses on comfort, dignity, quality of life; can run alongside curative therapy. "Addiction" → extremely rare when monitored; goal is relief not dependency; morphine is WHO-recommended. "Only for the dying" → for anyone with a life-limiting illness (cancer, heart failure, COPD, kidney/liver failure, HIV, neurological disease).',
      },
      {
        id: 'r4',
        label: 'Describe what care will actually do',
        marks: 4,
        detail:
          'Pain and symptom control (pain, breathlessness, nausea, sleep, anorexia). Emotional support — counselling. Practical help — finances, transport, forms. Spiritual care — chaplaincy. Family support including bereavement follow-up.',
      },
      {
        id: 'r5',
        label: 'Reassure on safety and team involvement',
        marks: 2,
        detail:
          'Team — nurses, doctor, social worker, chaplain, pharmacist — will monitor side effects (respiratory rate, constipation), adjust regimen, involve family in every decision.',
      },
    ],
    referenceFiles: [
      '01-introduction-and-definition.md',
      '02-misconceptions.md',
      '08-what-palliative-care-includes.md',
    ],
  },

  // ============================================================
  // CASE 6 — Choosing a model of care (15)
  // ============================================================
  {
    id: 'case-06',
    topic: 'hospiceModels',
    type: 'case',
    marks: 15,
    frameworks: ['Hospice vs Palliative', 'Models of Care'],
    prompt:
      'Mrs. Asantewaa, 58, has end-stage ovarian cancer. After two lines of chemotherapy she has declined further curative treatment. Her prognosis is approximately 4 months. She lives in a small town 2 hours from the regional hospital and wants to remain with her family. Recommend an appropriate model of care, justifying your choice. Explain the distinction between hospice and palliative care in her context.',
    rubric: [
      {
        id: 'r1',
        label: 'Distinguish hospice from palliative care',
        marks: 3,
        detail:
          'Palliative care can be received alongside curative treatments. Hospice care is provided once the patient forgoes curative treatment, prognosis typically ≤6 months. Mrs Asantewaa qualifies for hospice-level care. Hospice is not a place but a concept of care — home, inpatient, long-term care.',
      },
      {
        id: 'r2',
        label: 'Recommend home-based hospice care',
        marks: 4,
        detail:
          'Most common model of palliative/hospice delivery. Patient explicitly wishes to stay with family. Consistent with cultural preference and prognosis. Home is 2 hours from hospital — daily visits there are not realistic. Team teaches family caregivers to administer oral morphine on the clock and by the ladder.',
      },
      {
        id: 'r3',
        label: 'Add complementary models',
        marks: 3,
        detail:
          'Outreach services — palliative team visits community on scheduled dates for review and resupply. Hospital-based support for inpatient stays if symptoms uncontrollable at home, or for procedures (e.g., paracentesis). Day care occasionally for respite or social contact.',
      },
      {
        id: 'r4',
        label: 'Team and scope',
        marks: 3,
        detail:
          'Team: nurses (lead), district medical officer, social worker, chaplain/local religious figure, family caregivers, community volunteers. Scope: pain control via WHO ladder, symptom management, psychosocial and spiritual care, bereavement follow-up.',
      },
      {
        id: 'r5',
        label: 'Emphasise quality over quantity',
        marks: 2,
        detail:
          'Hospice care emphasises quality of life rather than quantity — helping her live as fully and comfortably as possible until death.',
      },
    ],
    referenceFiles: [
      '04-hospice-care.md',
      '05-models-of-palliative-care.md',
    ],
  },

  // ============================================================
  // CASE 7 — Autonomy vs family wishes (20)
  // ============================================================
  {
    id: 'case-07',
    topic: 'ethics',
    type: 'case',
    marks: 20,
    frameworks: ['Ethical Principles', 'BREAK NEWS'],
    prompt:
      'Mr. Tetteh, 72, is a competent patient with end-stage heart failure. He has clearly stated to the team that he does not want a feeding tube if he can no longer swallow. His adult children are insisting that the team insert one because "we cannot watch him starve." How do you resolve this ethical dilemma? Apply the principles of palliative care ethics.',
    rubric: [
      {
        id: 'r1',
        label: 'Identify the conflict',
        marks: 2,
        detail:
          'Conflict between patient\'s expressed wishes (refuses feeding tube) and family wishes (demand intervention). Must navigate while honouring core ethical principles.',
      },
      {
        id: 'r2',
        label: 'Apply Autonomy',
        marks: 4,
        detail:
          'Patient\'s right to make decisions about own care, including refusing treatment. Mr Tetteh is competent — his decision must be respected. Even patients near death retain the right to consent/refuse. The family does not override the competent patient.',
      },
      {
        id: 'r3',
        label: 'Apply Beneficence and Nonmaleficence',
        marks: 4,
        detail:
          'Beneficence: act in patient\'s best interest — for a dying patient, comfort over prolongation. Nonmaleficence: do no harm. Forcing a feeding tube violates bodily autonomy, can cause aspiration pneumonia, agitation, infection, does not reverse the disease. Anorexia at end of life is physiological, not hunger.',
      },
      {
        id: 'r4',
        label: 'Apply Veracity (truth-telling)',
        marks: 2,
        detail:
          'Be honest with the family about what a feeding tube will and will not do. Explain that GI function slows naturally at end of life; forcing feeding can cause distention, nausea, aspiration.',
      },
      {
        id: 'r5',
        label: 'Counsel the family compassionately',
        marks: 4,
        detail:
          'Acknowledge their fear — watching a parent stop eating feels like causing death. Use BREAK NEWS principles. Frame patient\'s wishes as dignity, not abandonment. Reassure the team will keep him comfortable — mouth care (ice chips, petroleum jelly), gentle hygiene, presence. Family meetings; chaplaincy if appropriate.',
      },
      {
        id: 'r6',
        label: 'Document and team approach',
        marks: 2,
        detail:
          'Document Mr Tetteh\'s wishes clearly. Communicate across the multidisciplinary team. Provide bereavement follow-up — the family will need support after his death.',
      },
      {
        id: 'r7',
        label: 'Respect "presence is everything"',
        marks: 2,
        detail:
          'The intervention the family really wants is not the tube — it is not to feel helpless. Help them sit with him, hold his hand, play music, and say what they need to say.',
      },
    ],
    referenceFiles: [
      '07-ethics-of-care.md',
      '18-care-for-the-dying-patient.md',
      '19-communication.md',
    ],
  },

  // ============================================================
  // CASE 8 — Truth-telling with a child (15)
  // ============================================================
  {
    id: 'case-08',
    topic: 'ethics',
    type: 'case',
    marks: 15,
    frameworks: ['Ethical Principles', 'Communication with Children'],
    prompt:
      'Kwame, 10, has end-stage leukaemia. During a quiet moment he asks you: "Nurse, am I going to die?" His parents have told the team they do not want him to be told the truth — "He is too young." How do you respond? Apply ethical and communication principles.',
    rubric: [
      {
        id: 'r1',
        label: 'Recognise that children know more than adults assume',
        marks: 3,
        detail:
          'Children understand far more than we realise — they sense anxiety, overhear conversations, see disease in other children. Hearing the truth can be a relief — it may not be as bad as their secret fears. Principle: "We will not give information to the child without parent permission, but we will not lie."',
      },
      {
        id: 'r2',
        label: 'Reflect the question back',
        marks: 3,
        detail:
          'Do not answer immediately. "I wonder what made you ask that question?" "Have you talked to Mummy or Daddy about it?" "Tell me what you think first, then I will tell you what I think." This honours parents\' position AND his right not to be deceived.',
      },
      {
        id: 'r3',
        label: 'Negotiate with the parents',
        marks: 3,
        detail:
          'Counsel gently — studies show families cope better with openness than secrecy. Explain children sense truth — withholding leads to isolation and silent fear. Reassure any disclosure will be age-appropriate, gradual, led by them. State your limit: "I will not lie. If he asks me directly, I will redirect to you."',
      },
      {
        id: 'r4',
        label: 'Apply ethical principles',
        marks: 3,
        detail:
          'Veracity — never lie, lying destroys trust. Autonomy — children are people with opinions and choices when supported. Beneficence — telling the truth often relieves fear and allows preparation. Nonmaleficence — forcing too much at once can harm; reflection prevents this.',
      },
      {
        id: 'r5',
        label: 'Use child-appropriate communication',
        marks: 3,
        detail:
          'Get down to his level. Direct eye contact may feel threatening — talk while playing or drawing. Be respectful and polite — address him directly. Avoid medical jargon. Allow questions; allow him to say "I don\'t want to talk now."',
      },
    ],
    referenceFiles: [
      '07-ethics-of-care.md',
      '19-communication.md',
      '21-palliative-care-in-children.md',
    ],
  },

  // ============================================================
  // CASE 9 — Total Pain applied to HIV+ widow (20)
  // ============================================================
  {
    id: 'case-09',
    topic: 'painConcept',
    type: 'case',
    marks: 20,
    frameworks: ['Total Pain (Saunders)'],
    prompt:
      'Akosua, 32, is a widow with three young children. Her husband died of AIDS-related illness six months ago. She has just been diagnosed with advanced cervical cancer. She has severe pelvic pain, a foul-smelling vaginal discharge, and difficulty sleeping. She has no income and her neighbours have begun avoiding her, saying "the family is cursed." She tells you, "God has abandoned me. What is there left to live for?" Apply Saunders\' concept of "Total Pain" to assess and plan her care.',
    rubric: [
      {
        id: 'r1',
        label: 'Introduce the concept of total pain',
        marks: 2,
        detail:
          'Saunders described pain as five overlapping dimensions: physical, psychological, social, cultural, spiritual. Each amplifies the others. Treating only physical pain leaves her suffering.',
      },
      {
        id: 'r2',
        label: 'Physical pain',
        marks: 4,
        detail:
          'Source: pelvic pain from tumour invasion; possible nerve involvement. WHO Step 3 opioid — oral morphine, titrated. Adjuvants — anticonvulsant or TCA if neuropathic. Wound care — gentle hygiene, deodorising dressings. Treat any infection. Sleep promotion — control pain first; cluster care; quiet environment.',
      },
      {
        id: 'r3',
        label: 'Psychological pain',
        marks: 4,
        detail:
          'Likely fear, depression, hopelessness, anger. Counselling — let her express feelings without judgement; active listening. Antidepressant if depression significant — TCAs dual purpose (mood + neuropathic). Support groups if available.',
      },
      {
        id: 'r4',
        label: 'Social pain',
        marks: 4,
        detail:
          'Stigma and discrimination — neighbours avoid her, cultural blame ("cursed"). Practical deprivation — no income, three dependents. Social worker referral for financial assistance, food, school fees. Connect with HIV/cancer support groups. Help plan children\'s future — extended family or community where possible.',
      },
      {
        id: 'r5',
        label: 'Cultural pain',
        marks: 3,
        detail:
          'Community\'s "cursed" belief reflects cultural stigma. Approach with cultural humility — do not dismiss. Engage local respected figures (elders, chaplains) to reduce stigma. Use appropriate language and terminology. Support her in maintaining cultural practices that bring meaning.',
      },
      {
        id: 'r6',
        label: 'Spiritual pain',
        marks: 3,
        detail:
          '"God has abandoned me" — classic spiritual distress. Chaplaincy / spiritual care referral if she wishes. Listen without imposing your beliefs. Help her explore meaning — her children, her husband, the work she has done. Pray with her if she requests; never impose.',
      },
    ],
    referenceFiles: [
      '09-concept-of-pain-total-pain.md',
      '13-pain-management-who-ladder.md',
      '22-cultural-competence.md',
    ],
  },

  // ============================================================
  // CASE 10 — Non-verbal patient pain assessment (15)
  // ============================================================
  {
    id: 'case-10',
    topic: 'painAssessment',
    type: 'case',
    marks: 15,
    frameworks: ['Pain Assessment Principles', 'Proxy / Behavioural Assessment'],
    prompt:
      'Mr. Mensah, 78, is in his final days. He has advanced dementia and cannot self-report. His daughter believes he is in pain — he grimaces and pulls his legs up when repositioned. The ward team says "his vital signs are normal, he is fine." Describe how you would assess his pain and respond to the team\'s dismissal.',
    rubric: [
      {
        id: 'r1',
        label: 'Reject the false reassurance',
        marks: 3,
        detail:
          'Vital signs (HR, BP) are not reliable indicators of pain — core principle. Absence of tachycardia ≠ absence of pain. Pain can exist even when no physical sign is found. Include family in assessment when self-report is unavailable; do not dismiss the daughter.',
      },
      {
        id: 'r2',
        label: 'Use proxy / behavioural assessment',
        marks: 4,
        detail:
          'Facial expression — grimacing, frowning, clenched jaw. Vocalizations — moaning, groaning, crying out. Body movements — guarding, pulling legs up, restlessness, rigidity. Changes in interactions — withdrawal, aggression. Changes in activity — sleep disturbance, refusing care. Mental status changes — increased confusion, delirium. Mr Mensah\'s grimacing and leg-pulling are strong signs.',
      },
      {
        id: 'r3',
        label: 'Use a validated proxy tool',
        marks: 2,
        detail:
          'Use a behavioural pain scale appropriate to the population (face-based or behavioural observation). Document findings consistently across shifts so changes can be tracked.',
      },
      {
        id: 'r4',
        label: 'Trial of analgesia',
        marks: 3,
        detail:
          'If pain is suspected and assessment supports it, a trial of analgesia is appropriate diagnostic + therapeutic step. Start with paracetamol regularly (Step 1). Escalate per WHO ladder if signs persist. Reassess after each dose for behavioural change.',
      },
      {
        id: 'r5',
        label: 'Family and team education',
        marks: 3,
        detail:
          'Acknowledge the daughter\'s observation as valuable clinical information. Educate team: physiological signs are not reliable; self-report is the gold standard; in its absence, behaviour is. Document assessment, plan, response for consistent team approach.',
      },
    ],
    referenceFiles: [
      '12-pain-assessment.md',
      '13-pain-management-who-ladder.md',
    ],
  },

  // ============================================================
  // CASE 11 — Frequent breakthrough pain (20)
  // ============================================================
  {
    id: 'case-11',
    topic: 'painManagement',
    type: 'case',
    marks: 20,
    frameworks: ['WHO Ladder', 'Breakthrough Pain', 'Adjuvants'],
    prompt:
      'Mr. Boateng has bone metastases from prostate cancer. He is on oral morphine 20 mg every 4 hours with paracetamol. He is having 3 to 4 episodes of severe breakthrough pain per day, particularly when he moves. His rescue dose is currently 5 mg. Analyse his pain regimen and propose adjustments.',
    rubric: [
      {
        id: 'r1',
        label: 'Reassess the pain',
        marks: 3,
        detail:
          'Use PQRST or OLDCART. Bone metastases produce deep, aching pain — often incident pain triggered by movement. Look for neuropathic component (burning, shooting) suggesting nerve compression. Confirm no new pathology (fracture, new lesion).',
      },
      {
        id: 'r2',
        label: 'Identify the inadequate rescue dose',
        marks: 3,
        detail:
          'Standard rescue dose is HALF of the regular scheduled dose. Mr Boateng\'s regular dose is 20 mg → rescue should be ~10 mg, not 5 mg. Increase rescue to 10 mg.',
      },
      {
        id: 'r3',
        label: 'Increase the baseline dose',
        marks: 3,
        detail:
          'Frequent breakthrough (3–4/day) signals baseline analgesia is inadequate. Morphine has no upper dose limit — titrate up. Reasonable step: increase scheduled dose to 30 mg every 4 hours; reassess in 24 hours. Move up the ladder if pain not 90% controlled after 24 hours.',
      },
      {
        id: 'r4',
        label: 'Add a bone-pain adjuvant',
        marks: 4,
        detail:
          'Bone-mets pain has an inflammatory component opioids alone do not fully address. Corticosteroid (dexamethasone) reduces peri-tumour inflammation. NSAID — ibuprofen or diclofenac (caution: cardiovascular risk; avoid post-heart-surgery). Refer to oncology for palliative radiotherapy if available (single-fraction effective for localized mets). Consider bisphosphonates.',
      },
      {
        id: 'r5',
        label: 'Address incident pain specifically',
        marks: 3,
        detail:
          'Pre-emptive rescue dose 30 minutes before activities known to provoke pain (morning bath, physiotherapy). Gentle handling, assistive devices. Position changes every 2 hours with adequate analgesia.',
      },
      {
        id: 'r6',
        label: 'Non-pharmacological measures',
        marks: 2,
        detail:
          'Massage of unaffected areas, heat or cold as tolerated. Music therapy, distraction, therapeutic touch. Emotional support — fear of pain on movement itself causes anxiety, amplifying pain.',
      },
      {
        id: 'r7',
        label: 'Monitor for opioid side effects',
        marks: 2,
        detail:
          'Respiratory rate — withhold morphine if ≤12/min. Constipation — prophylactic laxatives (almost universal). Nausea — antiemetics, usually self-limits. Sedation — monitor; usually wanes after a few days.',
      },
    ],
    referenceFiles: [
      '13-pain-management-who-ladder.md',
      '14-adjuvants-and-breakthrough-pain.md',
      '10-types-of-pain.md',
    ],
  },

  // ============================================================
  // CASE 12 — Preparing family for the dying process (20)
  // ============================================================
  {
    id: 'case-12',
    topic: 'dying',
    type: 'case',
    marks: 20,
    frameworks: ['Physical Manifestations at End of Life', 'Family Coping'],
    prompt:
      'Mrs. Adjei\'s adult children have gathered at her bedside in her final hours. They ask: "What will happen now? How will we know? What should we do?" Describe how you would prepare and support them through the dying process.',
    rubric: [
      {
        id: 'r1',
        label: 'Frame dying as a process, not a moment',
        marks: 2,
        detail:
          'Reassure that dying is a natural process — the body shuts down in stages. Most of what they will see is expected and not painful for the patient. Their presence matters more than any intervention.',
      },
      {
        id: 'r2',
        label: 'Sensory changes',
        marks: 2,
        detail:
          'Hearing is usually the last sense to disappear — encourage them to keep speaking gently to her, say goodbye, tell her they love her, even when she seems unresponsive. Sight blurs; eyelids may remain half-open; blink reflex disappears.',
      },
      {
        id: 'r3',
        label: 'Breathing changes',
        marks: 3,
        detail:
          'Cheyne–Stokes respiration — alternating apnea and deep, rapid breathing. Looks dramatic but is normal. "Death rattle" — noisy gurgling from secretions she cannot clear; distressing to hear but not painful for her. Terminal gasping — irregular slowing breaths. She is not "drowning" or "choking" — these are reflex changes.',
      },
      {
        id: 'r4',
        label: 'Cardiovascular and skin changes',
        marks: 2,
        detail:
          'Mottling on hands, feet, knees. Cold, clammy skin. Cyanosis of nose and nail beds. Pulse weakens and becomes irregular. Skin may appear "waxlike" very near death.',
      },
      {
        id: 'r5',
        label: 'Musculoskeletal and GI changes',
        marks: 2,
        detail:
          'Jaw sags, swallowing becomes difficult, gag reflex is lost. Incontinence of bowel/bladder may occur — provide pads, dignity, hygiene. A bowel movement may occur at or near time of death.',
      },
      {
        id: 'r6',
        label: 'Psychological and behavioural changes',
        marks: 3,
        detail:
          'Withdrawal and decreased socialization — not rejection. Restlessness or peacefulness. Unusual communication — she may reach out, point, call deceased loved ones\' names (nearing-death awareness). Treat as meaningful, not confused. "Waiting for permission" — death often comes shortly after family signals readiness to let her go.',
      },
      {
        id: 'r7',
        label: 'What the family can DO',
        marks: 3,
        detail:
          'Stay present. Sit close, hold her hand, speak softly. Play favourite music. Tell her what she has meant to them. Take turns to rest. Allow tears — normal and helpful. Involve clergy for prayer or rituals if wished.',
      },
      {
        id: 'r8',
        label: 'What the nurse will do',
        marks: 2,
        detail:
          'Frequent unobtrusive checks. Reposition every 2 hours, oral care with petroleum jelly and ice chips. Pain medication around the clock with respiratory rate monitoring. Cluster care; dim lights at night.',
      },
      {
        id: 'r9',
        label: 'Bereavement preparation',
        marks: 1,
        detail:
          'Remind them the team will be there AFTER her death as well — bereavement support and practical assistance.',
      },
    ],
    referenceFiles: [
      '16-physical-manifestations-end-of-life.md',
      '17-psychosocial-manifestations-end-of-life.md',
      '18-care-for-the-dying-patient.md',
    ],
  },

  // ============================================================
  // CASE 13 — Sudden terminal restlessness (20)
  // ============================================================
  {
    id: 'case-13',
    topic: 'dying',
    type: 'case',
    marks: 20,
    frameworks: ['Terminal Agitation Workup', 'Care of Dying Patient'],
    prompt:
      'Mr. Quaye has been peaceful on the palliative pathway for two days. Suddenly he becomes restless and agitated, pulling at his sheets and trying to climb out of bed. His respirations are noisy and shallow. The family are distressed. How do you assess and manage this situation?',
    rubric: [
      {
        id: 'r1',
        label: 'Recognise terminal restlessness',
        marks: 3,
        detail:
          'Restlessness, agitation, pulling at sheets are specific psychosocial manifestations of approaching death. But it can also be caused by reversible factors — screen first, do not assume.',
      },
      {
        id: 'r2',
        label: 'Rapid systematic assessment for reversible causes',
        marks: 5,
        detail:
          'Pain — undertreated pain often presents as agitation in those who cannot articulate. Urinary retention — palpate, catheterise. Faecal impaction — examine, treat with gentle enema. Dyspnea / hypoxia — air hunger; consider oxygen. Opioid myoclonus and confusion in patients on large doses. Medication review for newly added drugs causing delirium. Full bladder, full bowel, unmet need for repositioning.',
      },
      {
        id: 'r3',
        label: 'Address reversible causes first',
        marks: 3,
        detail:
          'Pain — give breakthrough dose; titrate up if needed. Urinary retention — catheterise. Bowel impaction — manage. Position — Fowler\'s for breathing. Reposition to relieve pressure.',
      },
      {
        id: 'r4',
        label: 'Manage noisy "death rattle"',
        marks: 2,
        detail:
          'Reposition — turn to side for secretions to drain. Gentle suction if accumulated at back of throat (do not deep-suction). Anticholinergic (hyoscine butylbromide) may be prescribed to reduce secretions. Reassure family the sound is not painful for the patient.',
      },
      {
        id: 'r5',
        label: 'Pharmacological management of irreversible agitation',
        marks: 3,
        detail:
          'If reversible causes addressed and restlessness persists: physician may prescribe mild tranquilizers to reduce fear/anxiety which can exacerbate distress. A sedative may relieve anxiety from feeling of suffocation in pulmonary edema. Goal: block distress without further suppressing consciousness or breathing.',
      },
      {
        id: 'r6',
        label: 'Continue holistic care',
        marks: 2,
        detail:
          'Pain control around the clock. Oral care, lip lubrication (petroleum jelly, not glycerin). Cluster activities, dim lights, reduce noise. Maintain skin integrity — reposition every 2 hours.',
      },
      {
        id: 'r7',
        label: 'Support the family',
        marks: 2,
        detail:
          'Explain in simple language; name what they are seeing. Reassure: "This is part of the dying process. He is not suffering as much as it looks. Our medicines will keep him comfortable." Encourage gentle presence — touch, soft voice, soothing music. Allow them to step out; not abandonment. Prepare them that this may signal death is near.',
      },
    ],
    referenceFiles: [
      '17-psychosocial-manifestations-end-of-life.md',
      '18-care-for-the-dying-patient.md',
      '13-pain-management-who-ladder.md',
    ],
  },

  // ============================================================
  // CASE 14 — Patient asks "Am I dying?" (20)
  // ============================================================
  {
    id: 'case-14',
    topic: 'communication',
    type: 'case',
    marks: 20,
    frameworks: ['BREAK NEWS'],
    prompt:
      'Ms. Yeboah, 45, has advanced pancreatic cancer. During a routine assessment she takes your hand and asks quietly: "Nurse, am I dying?" Her husband, sitting beside her, looks alarmed and shakes his head at you. Walk through how you would respond, applying the BREAK NEWS framework.',
    rubric: [
      {
        id: 'r1',
        label: 'Pause and create the space',
        marks: 2,
        detail:
          'Do not respond reflexively. Sit at her level, make eye contact, take her hand if culturally appropriate. "That is a really important question. Let\'s talk about it properly." Politely signal to husband that the conversation will be honest and respectful.',
      },
      {
        id: 'r2',
        label: 'B — Be prepared',
        marks: 2,
        detail:
          'Ensure you have the latest information about her condition. Have enough time — do not start when you only have a few minutes. Prevent interruptions — close the door, silence the phone, hand off other tasks.',
      },
      {
        id: 'r3',
        label: 'R — Relatives present',
        marks: 2,
        detail:
          'Husband is already with her — helpful. Briefly check: "Would you like your husband to stay for this conversation?" — honouring her autonomy. If yes, his presence supports her.',
      },
      {
        id: 'r4',
        label: 'E — Expectations',
        marks: 3,
        detail:
          'Find out what she knows and is expecting. "What have the doctors told you about your illness so far?" "How do you think things are going?" "What made you ask that question today?" What has been said and what has been heard are not always the same.',
      },
      {
        id: 'r5',
        label: 'A — Assess what is appropriate',
        marks: 2,
        detail:
          '"Would you like me to tell you what I think is happening?" Respect her response. If she is not ready, that is okay — revisit next time. Do not force information.',
      },
      {
        id: 'r6',
        label: 'K — Knowledge sharing slowly and gently',
        marks: 3,
        detail:
          'Warning shot: "What I have to share is quite serious." Plain language, avoid jargon. Pause; allow her to absorb. Example: "The cancer has progressed despite the treatments we\'ve tried. We are not able to cure it. The time we have with you is becoming shorter."',
      },
      {
        id: 'r7',
        label: 'N — Never "nothing we can do"',
        marks: 2,
        detail:
          'Always pair what you cannot do with what you can. "We cannot cure the cancer, but we have medicine that will control your pain." "We are always here to help if new problems come up." "We will keep you comfortable and support your family."',
      },
      {
        id: 'r8',
        label: 'E — Empathize',
        marks: 2,
        detail:
          'Allow tears. Do not rush to stop them — crying is a normal, helpful reaction. "This must be very difficult to hear." Sit with her — silence is okay. Touch her hand if appropriate.',
      },
      {
        id: 'r9',
        label: 'W — Way forward',
        marks: 2,
        detail:
          '"Let\'s talk about what happens next." Outline the immediate care plan — pain control, symptom management, family support. Fix a time to meet again. Reassure: "We will not give up on you."',
      },
    ],
    referenceFiles: [
      '19-communication.md',
      '07-ethics-of-care.md',
    ],
  },

  // ============================================================
  // CASE 15 — Family wants you to withhold the diagnosis (15)
  // ============================================================
  {
    id: 'case-15',
    topic: 'communication',
    type: 'case',
    marks: 15,
    frameworks: ['Truth-telling', 'BREAK NEWS'],
    prompt:
      'Mr. Asare\'s adult children pull you aside before you enter their father\'s room. They say: "Please do not tell him he has cancer. He is an old man, he will lose hope, and it will kill him faster. Just say it is an infection." Counsel the family without breaking ethical principles.',
    rubric: [
      {
        id: 'r1',
        label: 'Acknowledge their love and concern',
        marks: 2,
        detail:
          'Their request comes from love. Do not dismiss it. Sit with them, listen. "You clearly love your father and want to protect him. Let\'s talk about this together."',
      },
      {
        id: 'r2',
        label: 'Explain why truth-telling matters',
        marks: 4,
        detail:
          'Maintains trust — lying destroys the relationship. Reduces uncertainty — people cope better with truth than uncertainty. Prevents unrealistic hope — patients waste time and money looking for cures. Allows preparation — wills, debts, mending relationships, spiritual issues, funeral planning. Studies show patients usually want to know.',
      },
      {
        id: 'r3',
        label: 'Address the "it will kill him" fear',
        marks: 3,
        detail:
          'Opposite is often true — kept in the dark, patients sense something wrong, suffer in silence, lose trust. Most patients already suspect — confirming reality is often a relief, not a shock. False reassurance ("Don\'t worry") leaves him alone with doubts.',
      },
      {
        id: 'r4',
        label: 'Offer the family a path forward',
        marks: 3,
        detail:
          'Reassure you will not blurt out the diagnosis at the door. Use BREAK NEWS — at his pace, with their support, warning shots, never "nothing we can do." Invite them to be present. They can choose how much to say first; more later.',
      },
      {
        id: 'r5',
        label: 'State your limit clearly',
        marks: 2,
        detail:
          '"I will not lie to your father. If he asks me directly whether he has cancer, I will not deny it. But I will not force information on him either." Honours both professional ethics (veracity, autonomy) and their concern.',
      },
      {
        id: 'r6',
        label: 'Recognise cultural context',
        marks: 1,
        detail:
          'In many cultures, family-mediated disclosure is the norm. Respect that — but never lie. Goal: honour both truth and culture.',
      },
    ],
    referenceFiles: [
      '19-communication.md',
      '07-ethics-of-care.md',
      '22-cultural-competence.md',
    ],
  },

  // ============================================================
  // CASE 16 — Sudden death bereavement support (20)
  // ============================================================
  {
    id: 'case-16',
    topic: 'grief',
    type: 'case',
    marks: 20,
    frameworks: ["Worden's Tasks", 'Grief Support'],
    prompt:
      'Mrs. Boateng\'s 17-year-old son was killed in a road traffic accident yesterday. She is in the family room, alternating between silence and sobbing. She says: "This is not real. He was supposed to take his exams next week." Describe how you would support her, applying Worden\'s tasks of mourning and grief support principles.',
    rubric: [
      {
        id: 'r1',
        label: 'Recognise the nature of sudden grief',
        marks: 2,
        detail:
          'Sudden, traumatic loss often produces more intense and prolonged grief than expected death. No anticipatory grief, no chance to say goodbye. Be especially patient and present.',
      },
      {
        id: 'r2',
        label: 'Reach out with presence',
        marks: 2,
        detail:
          'Approach gently. Sit at her level. Do not force conversation. Express sympathy simply: "I am so sorry for your loss." Allow silence — your presence is enough.',
      },
      {
        id: 'r3',
        label: 'Task 1 — Accept the reality of the loss',
        marks: 3,
        detail:
          'Her "this is not real" reflects shock and disbelief — normal early manifestations. Help gently confront reality through clear language ("died," "was killed") — avoid confusing euphemisms. Support participation in traditional rituals — viewing the body, funeral, memorial — these help confront finality.',
      },
      {
        id: 'r4',
        label: 'Task 2 — Experience the pain of grief',
        marks: 4,
        detail:
          'Allow expression of affective symptoms — sadness, anger, guilt ("if only I had…"), shock, numbness. Recognise physical manifestations — chest tightness, breathlessness, fatigue, dry mouth. Recognise cognitive — disbelief, preoccupation, even hallucinations of her son. Do not stop her crying. Empathize: "This must be unbearable."',
      },
      {
        id: 'r5',
        label: 'Task 3 — Adjust to a new environment',
        marks: 3,
        detail:
          'Not for today — Task 3 typically begins months later. Help her think about immediate practical needs — who is with her, who is collecting other children, who is making funeral arrangements. In coming weeks/months, help develop new daily routines. Connect with community resources and support groups.',
      },
      {
        id: 'r6',
        label: 'Task 4 — Reinvest energy',
        marks: 2,
        detail:
          'Far too early to address directly today. Long term: support meaningful activities — possibly memorial activities (charity, advocacy) — that honour her son. Reassure this does not mean forgetting him.',
      },
      {
        id: 'r7',
        label: 'Reassure she is not to blame',
        marks: 2,
        detail:
          'Sudden death often produces intense guilt — "I should have driven him myself." Reassure she did everything possible and is not responsible.',
      },
      {
        id: 'r8',
        label: 'Educate about normal grief',
        marks: 1,
        detail:
          'Tell her what she is feeling is normal. Upsurges on birthdays, anniversaries, and unexpected reminders are normal. Manifestations vary widely.',
      },
      {
        id: 'r9',
        label: 'Watch for dysfunctional grief',
        marks: 1,
        detail:
          'Over time monitor for denial >6 months, severe physiological symptoms (choking, trembling), suicidal thoughts, self-neglect. If these emerge, refer for specialist mental-health support.',
      },
    ],
    referenceFiles: [
      '20-bereavement-grief-mourning.md',
      '19-communication.md',
    ],
  },

  // ============================================================
  // CASE 17 — Dysfunctional (prolonged) grief (15)
  // ============================================================
  {
    id: 'case-17',
    topic: 'grief',
    type: 'case',
    marks: 15,
    frameworks: ['Prolonged Grief Disorder', "Worden's Tasks"],
    prompt:
      'Nine months after her husband\'s death, Mrs. Owusu has stopped eating regularly, refuses to speak about him, keeps his clothes laid out, and tells you, "He will come back. I know he will." Her daughter says she has lost weight and barely leaves the house. Identify the type of grief and describe your nursing actions.',
    rubric: [
      {
        id: 'r1',
        label: 'Identify the diagnosis',
        marks: 3,
        detail:
          'Prolonged grief disorder (formerly "complicated grief"): denial of the loss longer than 6 months ("He will come back"); self-neglect (not eating, weight loss, withdrawal); inability to move forward (clothes laid out as if he is returning); recurrent intrusive thoughts; severe distress.',
      },
      {
        id: 'r2',
        label: 'Distinguish from normal grief',
        marks: 3,
        detail:
          'Normal grief is dynamic — sad emotions ebb and flow, bereaved gradually accepts reality and resumes function. Mrs Owusu is "stuck" — Worden\'s Task 1 not accomplished, blocking other tasks. Manifestations beyond normal: severe physiological symptoms, withdrawal, inability to acknowledge the death. Watch for suicidal thoughts — requires immediate action.',
      },
      {
        id: 'r3',
        label: 'Reach out and listen',
        marks: 2,
        detail:
          'Visit her or invite her in. Express sympathy and concern: "I have been thinking about you. How are you really doing?" Listen non-judgmentally. Do not contradict her belief — meet her where she is.',
      },
      {
        id: 'r4',
        label: 'Gently address the loss',
        marks: 3,
        detail:
          'Over time and with rapport, help her gently acknowledge the death — clear words, supporting through funeral pictures or rituals. Re-engage traditional rituals if not completed (memorial services, anniversaries) — these help confront finality. Encourage her to share memories — not to forget, but to integrate.',
      },
      {
        id: 'r5',
        label: 'Refer for specialist support',
        marks: 2,
        detail:
          'Mental-health referral for counselling or psychotherapy. If suicidal thoughts emerge, refer urgently. Consider involving family members and community/religious support.',
      },
      {
        id: 'r6',
        label: 'Address physical and social neglect',
        marks: 2,
        detail:
          'Address eating and weight loss — small frequent meals, family-supported routine. Re-establish daily structure — short walks, simple activities. Involve social worker for practical issues (finances, isolation).',
      },
    ],
    referenceFiles: [
      '20-bereavement-grief-mourning.md',
    ],
  },

  // ============================================================
  // CASE 18 — Paediatric palliative care (20)
  // ============================================================
  {
    id: 'case-18',
    topic: 'special',
    type: 'case',
    marks: 20,
    frameworks: ['Paediatric Pain Assessment', 'WHO Ladder', 'Communication with Children'],
    prompt:
      'Kojo, 7, has end-stage leukaemia. He is in pain but reluctant to say so. His mother is at his bedside, distressed and trying to feed him snacks he refuses. The team is reluctant to start morphine in a child. Describe how you would assess and manage Kojo\'s pain holistically.',
    rubric: [
      {
        id: 'r1',
        label: 'Core principle: children are not small adults',
        marks: 2,
        detail:
          'Children have their own needs, opinions, capabilities. They often understand more than adults realise. Honest communication and child-centred care are the foundation.',
      },
      {
        id: 'r2',
        label: 'Pain assessment in children',
        marks: 4,
        detail:
          'Observation — watch while you talk to mother, or while he plays. Signs of pain in children: crying, distressed face, not wanting to move/eat, poor concentration, irritability, sleep difficulty, increased breathing/heart rate. Self-report tools: Wong-Baker FACES scale (from age 3) or pointing to faces. Number of fingers for older children. Listen to the child, listen to the carer, observe with your eyes.',
      },
      {
        id: 'r3',
        label: 'Pain management — same WHO principles',
        marks: 4,
        detail:
          'By the mouth, by the clock, by the ladder, by the individual. AVOID ASPIRIN — risk of Reye\'s syndrome. Paracetamol, ibuprofen, diclofenac are safe and helpful. AVOID INTRAMUSCULAR injections — particularly distressing. Rectal route useful for some drugs. Opioids (including morphine) CAN be used in children when needed in weight-based doses with monitoring. Refusing morphine to a child in severe pain is harmful.',
      },
      {
        id: 'r4',
        label: 'Non-pharmacological measures',
        marks: 4,
        detail:
          'Show family there is never "nothing they can do". Make him feel secure — do not leave alone if afraid. Keep in familiar surroundings — home or familiar toys/food in hospital. Touch — cuddling, carrying, gentle massage. Play — distraction is good medicine. Music and stories. Make him feel valued.',
      },
      {
        id: 'r5',
        label: 'Communicate with Kojo directly',
        marks: 3,
        detail:
          'Address him directly, not just his mother. Get down to his level. Avoid direct eye contact if threatening — talk while playing or drawing. Age-appropriate language. Make sure he knows it is okay to ask questions and to say what he feels. Never lie.',
      },
      {
        id: 'r6',
        label: 'Support the mother',
        marks: 3,
        detail:
          'Acknowledge her distress. Recognise never force-feeding is correct — a snack will often help, but never force. Teach her non-drug comfort measures. Counsel on truth-telling — hearing the truth, age-appropriately, can be a relief for children. Prepare her for the dying process.',
      },
    ],
    referenceFiles: [
      '21-palliative-care-in-children.md',
      '13-pain-management-who-ladder.md',
      '12-pain-assessment.md',
    ],
  },

  // ============================================================
  // CASE 19 — Culturally appropriate care (20)
  // ============================================================
  {
    id: 'case-19',
    topic: 'special',
    type: 'case',
    marks: 20,
    frameworks: ['Cultural Competence', 'Culture Care Theory (Leininger)'],
    prompt:
      'A traditional family in a rural Ghanaian community refuses to allow their dying matriarch, Nana Ama, to receive morphine. They say painkillers will "interfere with the ancestors\' calling her home." They want only herbal preparations from the local healer. The team is frustrated. Describe how you would provide culturally appropriate palliative care.',
    rubric: [
      {
        id: 'r1',
        label: 'Cultural awareness — examine your own bias',
        marks: 2,
        detail:
          'Acknowledge your own beliefs and how they shape your reaction. Avoid ethnocentric and stereotyped attitudes — research shows these cause real practice deficits. The family\'s beliefs are valid within their cultural framework, not "wrong."',
      },
      {
        id: 'r2',
        label: 'Cultural knowledge',
        marks: 3,
        detail:
          'Learn about the community\'s beliefs about death, dying, ancestors, traditional medicine. Patients and families are the best source — ask, listen. Do not assume; acculturation varies. Read about predominant cultural groups; use cultural pocket guides.',
      },
      {
        id: 'r3',
        label: 'Cultural skill — perform a cultural assessment',
        marks: 4,
        detail:
          'Explore: lifestyle, values, norms, expressions. Taboos, myths, misconceptions about morphine and pain. Folk and traditional healing systems. Patterns of health and illness. Language preferences. Structure of service — who decides; who provides care. Patient\'s OWN views — does Nana Ama want morphine? Her autonomy matters.',
      },
      {
        id: 'r4',
        label: 'Engage respectfully with the family',
        marks: 3,
        detail:
          'Do not impose the WHO ladder on a family who fears it. Approach the traditional healer with respect — propose collaboration, not replacement. Acknowledge herbal preparations have meaning. Reframe morphine: "This medicine does not interfere with her spirit — it only takes away her pain so she can be at peace with her family."',
      },
      {
        id: 'r5',
        label: 'Support cultural rituals',
        marks: 2,
        detail:
          'Support the family to perform and complete cultural rituals — presence with the dying, blessings, ancestral prayers. Provide privacy. Engage local elders, chaplains, or respected community figures who communicate within the family\'s framework.',
      },
      {
        id: 'r6',
        label: 'Negotiate a culturally appropriate care plan',
        marks: 3,
        detail:
          'Offer, do not impose. Find common ground — can paracetamol be acceptable? Can morphine be reframed as "comfort medicine"? Continue to offer other domains: oral care, positioning, gentle hygiene, music, spiritual presence. Be present and supportive even if some interventions declined.',
      },
      {
        id: 'r7',
        label: 'Accept your own limitations',
        marks: 2,
        detail:
          'Not every family will accept everything. Your role is compassionate, culturally sensitive care within the family\'s framework — not to override their values. Document wishes; continue offering support; revisit gently as trust grows.',
      },
      {
        id: 'r8',
        label: 'Use appropriate language',
        marks: 1,
        detail:
          'Use the family\'s language and terminology. Avoid medical jargon. Use interpreters well if needed.',
      },
    ],
    referenceFiles: [
      '22-cultural-competence.md',
      '07-ethics-of-care.md',
    ],
  },

  // ============================================================
  // CASE 20 — Caregiver stress (15)
  // ============================================================
  {
    id: 'case-20',
    topic: 'special',
    type: 'case',
    marks: 15,
    frameworks: ['Stress Management for Nurses'],
    prompt:
      'You are a charge nurse on a palliative care unit. One of your colleagues, Esi, has been working extra shifts. You notice she is irritable, has lost weight, and snapped at a family yesterday — uncharacteristic of her. She tells you, "I just can\'t sleep. Every patient I\'ve lost this month is in my head." How do you recognise and address her stress, applying caregiver stress management principles?',
    rubric: [
      {
        id: 'r1',
        label: 'Recognise the signs of caregiver stress',
        marks: 4,
        detail:
          'Physical: sleep problems, fatigue, weight change, possibly increased HR, headaches, muscle tension. Psychosocial: irritability, snapping at families, confusion/forgetfulness, possible withdrawal, anxiety. Pattern fits Selye\'s definition — non-specific response to demand for change that has become overwhelming.',
      },
      {
        id: 'r2',
        label: 'Approach with empathy',
        marks: 2,
        detail:
          'Approach privately, without judgement. "I have noticed you\'ve been working very hard and seem worn out. How are you, really?" Listen — do not lecture.',
      },
      {
        id: 'r3',
        label: 'Apply self-care strategies',
        marks: 4,
        detail:
          'Develop a self-care philosophy. Get to know yourself — clarify values, notice reactions and stressors. Avoid self-criticism — cognitive restructuring, self-compassion, mindfulness, positive affirmations. Set time aside daily to plan. Develop social support. Communicate non-aggressively. Nutrition, exercise, sleep. Relax — deep breathing, progressive relaxation, visualisation. Manage time. Spiritually become aware. Cultivate humour. Avoid addictive substances.',
      },
      {
        id: 'r4',
        label: 'Address workload',
        marks: 2,
        detail:
          'Review her shift load with the unit manager — reduce extra shifts if possible. Encourage taking time off and using leave. Consider rotation through less acute areas.',
      },
      {
        id: 'r5',
        label: 'Build team resilience',
        marks: 2,
        detail:
          'The challenge of caring for people with different needs is stressful — this is normal. Combining family life and work is hard; shift work strains health. "Let\'s take time off to make our work more enjoyable." Regular team debriefs, especially after deaths. Recognise contributions of all team members.',
      },
      {
        id: 'r6',
        label: 'Refer if needed',
        marks: 1,
        detail:
          'If symptoms persist or worsen — sleeplessness, depression, suicidal ideation — refer for professional mental-health support. Burnout is a clinical condition.',
      },
    ],
    referenceFiles: [
      '23-caregiver-stress-management.md',
    ],
  },
];

export function getCasesByTopics(
  topics: PalliativeTopic[],
  count: number,
): CaseQuestion[] {
  const pool = palliativeCases.filter((c) => topics.includes(c.topic));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getCaseCountByTopic(): Record<PalliativeTopic, number> {
  const counts: Record<string, number> = {};
  palliativeCases.forEach((c) => {
    counts[c.topic] = (counts[c.topic] || 0) + 1;
  });
  return counts as Record<PalliativeTopic, number>;
}
