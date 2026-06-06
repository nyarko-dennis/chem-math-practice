import { SurgeryTopic } from './surgeryQuestions';

export interface RubricPoint {
  id: string;
  label: string;
  detail: string;
  marks: number;
}

export type SurgeryDrillKind =
  | 'defineTerms'
  | 'clinicalFeatures'
  | 'investigations'
  | 'medicalSurgicalMgmt'
  | 'preopNursing'
  | 'postopNursing'
  | 'emergencyMgmt'
  | 'patientEducation'
  | 'compareConditions';

export const SURGERY_DRILL_LABELS: Record<SurgeryDrillKind, string> = {
  defineTerms: 'Define key surgical terms',
  clinicalFeatures: 'Clinical features (signs & symptoms)',
  investigations: 'Investigations & why each is done',
  medicalSurgicalMgmt: 'Medical & surgical management',
  preopNursing: 'Pre-operative nursing care',
  postopNursing: 'Post-operative nursing care',
  emergencyMgmt: 'Emergency management',
  patientEducation: 'Patient education / discharge teaching',
  compareConditions: 'Compare / contrast two conditions',
};

export interface SurgeryDrill {
  id: string;
  topic: SurgeryTopic;
  drillKind: SurgeryDrillKind;
  type: 'drill';
  prompt: string;
  marks: number;
  rubric: RubricPoint[];
  modelAnswer: string;
  referenceSections: string[];
}

export const surgeryDrills: SurgeryDrill[] = [
  // ============================================================
  // DEFINE TERMS
  // ============================================================
  {
    id: 'sdr-001',
    topic: 'esophagogastric',
    drillKind: 'defineTerms',
    type: 'drill',
    prompt:
      'Define each of the following oesophageal/gastric conditions in your OWN plain words, and give ONE classic symptom of each:\n' +
      '(a) Achalasia\n(b) Oesophageal varices\n(c) Peptic ulcer disease\n(d) Gastric cancer',
    marks: 8,
    rubric: [
      {
        id: 'r1',
        label: 'Achalasia — defined + one symptom',
        detail:
          'A swallowing problem where the muscular ring at the bottom of the food pipe (the lower oesophageal sphincter, or LES) fails to relax, and the food pipe loses its squeezing wave. Classic symptom: progressive difficulty swallowing both solids AND liquids, often with regurgitation of undigested food.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Oesophageal varices — defined + one symptom',
        detail:
          'Swollen, thin-walled veins under the lining of the lower food pipe. They form because pressure backs up in the portal vein (the vein that drains the gut into the liver) — usually from cirrhosis (scarred liver). Classic symptom: sudden vomiting of large amounts of bright-red blood (haematemesis).',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Peptic ulcer disease — defined + one symptom',
        detail:
          'A sore in the lining of the stomach or upper small intestine (duodenum), caused by acid + pepsin damage. Most are from H. pylori bacteria or NSAID painkillers. Classic symptom: burning epigastric pain that is RELIEVED by food in duodenal ulcers, or WORSE with food in gastric ulcers.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Gastric cancer — defined + one symptom',
        detail:
          'A cancer that grows from the gland cells of the stomach lining (adenocarcinoma). Often grows silently. Classic symptom: weight loss with persistent indigestion, early fullness, and sometimes a hard lump felt above the left collar bone (Virchow\'s node).',
        marks: 2,
      },
    ],
    modelAnswer:
      '(a) Achalasia: a "stuck-door" disorder of the food pipe. The ring of muscle at the bottom (LES) refuses to relax, and the food pipe stops squeezing properly. Food piles up above the closed door, so the patient struggles to swallow BOTH solids and liquids — often regurgitating undigested food at night.\n\n' +
      '(b) Oesophageal varices: ballooned veins at the lower end of the food pipe, caused by high pressure in the portal vein (usually from a scarred cirrhotic liver). The thin walls can burst, leading to sudden vomiting of bright-red blood and shock.\n\n' +
      '(c) Peptic ulcer disease: open sores in the stomach or upper small intestine where acid has eaten through the protective lining. Mostly caused by H. pylori bacteria or NSAIDs. Pain is burning and central — duodenal ulcer pain eases with food; gastric ulcer pain worsens with food.\n\n' +
      '(d) Gastric cancer: cancer of the stomach (usually adenocarcinoma). It often grows silently for a long time. Late signs include weight loss, ongoing indigestion, early fullness with small meals, vomiting, and hard lymph nodes (Virchow\'s, Sister Mary Joseph nodule at the umbilicus).',
    referenceSections: ['Oesophagus & Stomach'],
  },
  {
    id: 'sdr-002',
    topic: 'cardiothoracic',
    drillKind: 'defineTerms',
    type: 'drill',
    prompt:
      'Define each of these chest emergencies in plain language and state the one-line management priority for each:\n' +
      '(a) Tension pneumothorax\n(b) Flail chest\n(c) Massive haemothorax\n(d) Cardiac tamponade (one-line definition only)',
    marks: 8,
    rubric: [
      {
        id: 'r1',
        label: 'Tension pneumothorax — plain definition + management',
        detail:
          'Air keeps entering the space between the lung and chest wall with each breath but cannot escape — like a one-way valve. The trapped air builds pressure, collapses the lung, pushes the heart sideways, and blocks blood return. Management: immediate needle decompression in the 2nd intercostal space (between the ribs), then a chest tube.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Flail chest — plain definition + management',
        detail:
          'At least 3 next-door ribs are each broken in 2 places, so a "free" piece of chest wall moves the wrong way (inward) when the patient breathes in. Management: oxygen, strong pain control so the patient can breathe deeply; mechanical ventilation if breathing fails.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Massive haemothorax — plain definition + management',
        detail:
          'More than 1.5 litres of blood collected in the space around the lung (the pleural space), OR ongoing bleeding of more than 200 mL/hour. The lung is squeezed and the patient is in shock. Management: two big IV lines, blood transfusion, chest tube, and prepare for emergency thoracotomy if bleeding continues.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Cardiac tamponade — plain one-line definition',
        detail:
          'Blood or fluid fills the sac around the heart (the pericardium), pressing on the heart so it cannot fill or pump properly. Classic signs are low BP, soft heart sounds, distended neck veins (Beck\'s triad). Needs emergency drainage (pericardiocentesis).',
        marks: 2,
      },
    ],
    modelAnswer:
      '(a) Tension pneumothorax: air gets trapped in the space between the lung and the chest wall with each breath. The lung collapses, the heart and great vessels are pushed to the opposite side, and blood cannot return to the heart. Priority: do NOT wait for X-ray — needle decompression in the 2nd intercostal space midclavicular line, then chest tube.\n\n' +
      '(b) Flail chest: three or more next-door ribs each broken in two places leave a free segment of chest wall. That segment moves INWARDS when the patient breathes in (paradoxical movement). Underlying lung bruise often makes hypoxia worse. Priority: oxygen, good pain control (allow deep breathing/coughing), mechanical ventilation if needed.\n\n' +
      '(c) Massive haemothorax: over 1500 mL of blood in the pleural space (around the lung) or ongoing >200 mL/hour bleeding. Causes shock AND breathing failure. Priority: two large IV lines, crossmatched blood, chest tube, surgical exploration if bleeding does not stop.\n\n' +
      '(d) Cardiac tamponade: blood or fluid fills the sac (pericardium) around the heart and stops it from filling. Beck\'s triad: low BP + muffled heart sounds + distended neck veins. Priority: urgent pericardiocentesis (drain the fluid).',
    referenceSections: ['Thoracic Emergencies'],
  },
  {
    id: 'sdr-003',
    topic: 'urologyAndrology',
    drillKind: 'defineTerms',
    type: 'drill',
    prompt:
      'Define each scrotal condition in plain words AND state whether each is a surgical emergency:\n' +
      '(a) Testicular torsion\n(b) Hydrocele\n(c) Varicocele\n(d) Cryptorchidism',
    marks: 8,
    rubric: [
      {
        id: 'r1',
        label: 'Testicular torsion — definition + emergency status',
        detail:
          'Twisting of the spermatic cord (the bundle carrying blood vessels to the testis), cutting off the testis\'s blood supply. EMERGENCY — every hour matters; after ~6 hours, the testis usually dies.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Hydrocele — definition + emergency status',
        detail:
          'Painless collection of fluid around the testis, inside the thin protective sac (the tunica vaginalis). NOT an emergency. Diagnose by transillumination (light shines through fluid). Treated electively with hydrocelectomy if symptomatic.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Varicocele — definition + emergency status',
        detail:
          'Dilated bag-of-worms veins that drain the testis, usually on the left side. NOT an emergency. Can affect fertility because pooled blood warms the testis. Treated electively (varicocelectomy or embolisation) if it causes symptoms or infertility.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Cryptorchidism — definition + emergency status',
        detail:
          'Failure of one or both testes to drop down into the scrotum during fetal life. NOT an emergency, but should be fixed (orchidopexy) before 1–2 years old to protect fertility and allow easy future exam for cancer.',
        marks: 2,
      },
    ],
    modelAnswer:
      '(a) Testicular torsion — the bundle of blood vessels going to the testis twists, like a kinked garden hose, and the testis loses its blood supply. SURGICAL EMERGENCY: go to theatre immediately; after about 6 hours the testis usually cannot be saved. Both testes are fixed (orchidopexy) at surgery.\n\n' +
      '(b) Hydrocele — a soft, painless scrotal swelling caused by clear fluid building up around the testis inside its protective sac. NOT an emergency. A torch shone on the scrotum lights it up (positive transillumination). Surgery (hydrocelectomy) is offered for size/discomfort.\n\n' +
      '(c) Varicocele — abnormally dilated veins draining the testis, classically described as a "bag of worms" in the scrotum, almost always on the left. NOT an emergency, but can hurt fertility because the pooled blood warms the testis. Treated electively with varicocelectomy or embolisation.\n\n' +
      '(d) Cryptorchidism — an "undescended testis" that has not made its journey from the abdomen down into the scrotum before birth. NOT an emergency, but needs orchidopexy by 1–2 years old to protect future sperm production and reduce cancer risk.',
    referenceSections: ['Urology & Andrology'],
  },

  // ============================================================
  // CLINICAL FEATURES
  // ============================================================
  {
    id: 'sdr-004',
    topic: 'bowel',
    drillKind: 'clinicalFeatures',
    type: 'drill',
    prompt:
      'A 28-year-old man presents with abdominal pain for 18 hours. Outline the typical clinical features of acute appendicitis you would expect, in the order they appear.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Early pain location and quality',
        detail:
          'Early pain is vague, dull, and central — felt around the belly button (umbilicus) because the appendix shares nerve roots with the small intestine before its lining is inflamed.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Anorexia, nausea, vomiting',
        detail:
          'Loss of appetite is almost universal (a useful sign). Nausea and one or two episodes of vomiting follow, usually AFTER the pain begins.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Pain shift to right iliac fossa (RIF)',
        detail:
          'After a few hours, the inflamed appendix irritates the abdominal wall lining (parietal peritoneum). Pain then SHIFTS to the right lower quadrant (around McBurney\'s point — two-thirds of the way from the navel to the right anterior iliac spine).',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Low-grade fever and tachycardia',
        detail:
          'Mild fever (37.5–38.5 °C) and a slightly raised heart rate suggest inflammation. High fever (>39 °C) raises concern for perforation.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Signs on examination',
        detail:
          'Tenderness and guarding at McBurney\'s point; rebound tenderness (pain when the examiner releases pressure quickly) — a sign of peritoneal irritation; Rovsing\'s sign (pressing on the LEFT lower abdomen causes pain on the RIGHT). Rigid "board-like" abdomen suggests perforation.',
        marks: 2,
      },
    ],
    modelAnswer:
      'Early stage (first few hours): vague, dull, central abdominal pain felt AROUND THE BELLY BUTTON. This is "visceral" pain — the inflamed appendix sends signals through nerves it shares with the small bowel.\n\n' +
      'Loss of appetite (anorexia) is almost always present, often the very first symptom. Nausea and one or two episodes of vomiting follow.\n\n' +
      'Over the next few hours, the pain SHIFTS to the right lower abdomen (right iliac fossa). This is because the swollen appendix is now irritating the lining of the abdominal wall (parietal peritoneum), which has very precise nerve supply. The point of maximum tenderness is McBurney\'s point — two-thirds of the way from the umbilicus to the right hip bone.\n\n' +
      'Examination shows guarding (muscle tightening when touched), rebound tenderness (sharp pain when the examiner releases pressure quickly), and Rovsing\'s sign (pressing the left lower abdomen causes pain on the right). Low-grade fever (37.5–38.5 °C) and mild tachycardia are common.\n\n' +
      'Late warning signs: a rigid, board-like abdomen, high fever, severe generalised pain, and signs of shock — these suggest perforation and peritonitis, and call for urgent surgery and broad-spectrum antibiotics.',
    referenceSections: ['Bowel & Anorectal'],
  },
  {
    id: 'sdr-005',
    topic: 'esophagogastric',
    drillKind: 'clinicalFeatures',
    type: 'drill',
    prompt:
      'A 55-year-old woman with known liver cirrhosis (a scarred, hardened liver) is rushed in vomiting bright-red blood. Outline (a) the symptoms and signs you expect, (b) why these features occur, and (c) why she is at high risk.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Symptoms of variceal bleed',
        detail:
          'Sudden large-volume vomiting of bright-red blood (haematemesis); black tarry stools (melaena) within hours; dizziness; collapse.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Signs of shock',
        detail:
          'Cold, pale, sweaty skin; fast weak pulse (>100); low BP (<90 systolic); reduced urine output; anxious or drowsy.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Signs of underlying liver disease',
        detail:
          'Yellow skin and eyes (jaundice); swollen abdomen with fluid (ascites); spider-shaped tiny vessels on the upper body (spider naevi); red palms; easy bruising.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Why these features occur',
        detail:
          'A scarred liver blocks blood flow from the gut → pressure rises in the portal vein → blood is forced into smaller bypass veins, including those at the lower end of the food pipe. These veins balloon out and become thin-walled (varices) and can burst.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Why she is at high risk',
        detail:
          'Cirrhosis causes both the varices AND reduced clotting (the liver makes fewer clotting proteins; low platelets from spleen sequestration). So she bleeds heavily AND clots poorly — mortality of first variceal bleed is 20–30%.',
        marks: 2,
      },
    ],
    modelAnswer:
      '(a) Symptoms and signs: sudden vomiting of large amounts of BRIGHT-RED blood (haematemesis). Within hours she will pass black, sticky, foul-smelling stools (melaena) as digested blood passes through the gut. She feels weak and dizzy, may collapse. Signs of shock include cold pale clammy skin, fast weak pulse (often >120), low blood pressure, low urine output, and progressive confusion. Background signs of liver disease are usually obvious: yellow eyes and skin (jaundice), a swollen abdomen full of fluid (ascites), tiny spider-shaped blood vessels on the chest (spider naevi), and palms that look red.\n\n' +
      '(b) Why these features occur: the cirrhotic liver is hard and scarred. Blood cannot flow through it normally, so pressure rises in the portal vein (the vein that drains the gut into the liver). To bypass the block, blood is forced into small "side" veins, including those in the lining of the lower food pipe. These veins balloon out and become thin-walled "varices". They are easy to tear and can bleed catastrophically.\n\n' +
      '(c) Why she is at high risk: cirrhosis hits her TWICE. It creates the varices that bleed, AND it stops her from clotting properly — the damaged liver makes fewer clotting proteins, and the enlarged spleen "traps" platelets. So she loses blood fast and the body cannot plug the leak. The risk of dying from a first variceal bleed is around 20–30%.',
    referenceSections: ['Oesophagus & Stomach'],
  },
  {
    id: 'sdr-006',
    topic: 'hepatobiliaryPancreas',
    drillKind: 'clinicalFeatures',
    type: 'drill',
    prompt:
      'A 45-year-old woman with right upper quadrant pain after fatty meals develops yellow eyes and clay-coloured stools. Outline the typical features of obstructive jaundice and explain in plain language why each occurs.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Yellow skin and eyes (jaundice)',
        detail:
          'When bile cannot drain into the gut, the processed (conjugated) yellow pigment (bilirubin) backs up into the bloodstream. It stains the skin and the white of the eyes yellow.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Dark urine',
        detail:
          'Because conjugated bilirubin is water-soluble, the kidneys filter the excess into the urine, making it dark (tea- or cola-coloured).',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Pale / clay-coloured stools',
        detail:
          'Stool gets its brown colour from bile pigments. Without bile reaching the gut, the stool is pale, putty-grey or clay-coloured.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Itching (pruritus)',
        detail:
          'Bile salts cannot exit through the gut, so they spill into the skin and irritate nerve endings. The patient develops generalised itching.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Bleeding tendency / steatorrhoea',
        detail:
          'Without bile, fat is poorly digested → fatty, foul-smelling, floating stools (steatorrhoea). Fat-soluble vitamin K cannot be absorbed → liver makes fewer clotting factors → easy bruising, raised INR.',
        marks: 2,
      },
    ],
    modelAnswer:
      'Obstructive jaundice happens when something physical is blocking the bile from flowing out of the liver into the gut. The classic features and the simple reason for each are:\n\n' +
      '• Yellow skin and eyes (jaundice): the blockage forces the processed yellow pigment (conjugated bilirubin) back into the blood. It stains the skin and the whites of the eyes yellow.\n\n' +
      '• Dark urine: because conjugated bilirubin dissolves in water, the kidneys filter the excess out into the urine. The urine looks tea- or cola-coloured.\n\n' +
      '• Pale, clay-coloured stools: bile pigments normally turn stool brown. With the blockage, almost no pigment reaches the gut, so the stool is pale and putty-grey.\n\n' +
      '• Severe itching all over (pruritus): bile salts that should leave through the gut spill back into the skin instead, and irritate nerve endings.\n\n' +
      '• Fatty, foul-smelling stools (steatorrhoea): bile is needed to digest fat. Without it, fat passes undigested, making the stool oily and floating.\n\n' +
      '• Easy bruising: vitamin K is fat-soluble. Without bile, it cannot be absorbed, so the liver cannot make some clotting factors (II, VII, IX, X). The patient bleeds and bruises more easily. Before surgery, IV vitamin K is given.\n\n' +
      '• Right upper quadrant pain that comes on after fatty meals (in stone-related cases) — fatty food triggers gallbladder contraction against the blocking stone. Painless progressive jaundice in an older patient should make us suspect pancreatic head cancer.',
    referenceSections: ['Liver, Biliary & Pancreas'],
  },
  {
    id: 'sdr-007',
    topic: 'breastGynae',
    drillKind: 'clinicalFeatures',
    type: 'drill',
    prompt:
      'List five (5) breast-examination findings that suggest cancer rather than a benign lump, and briefly explain why each occurs.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Hard, irregular, fixed lump',
        detail:
          'Cancer cells are denser and disorganised, and the tumour invades surrounding fat and supporting tissue. A benign lump (e.g. fibroadenoma) is smooth, mobile and rubbery.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Skin dimpling / peau d\'orange',
        detail:
          'Tumour pulls on the ligaments that anchor skin to deeper tissue (Cooper\'s ligaments) → skin pulls inward (dimpling). When dermal lymphatics are blocked, skin becomes thick and pitted like an orange peel.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Nipple retraction or blood-stained nipple discharge',
        detail:
          'Cancer pulls the underlying milk ducts inward, causing the nipple to be drawn in. Bloody discharge from one nipple raises concern for ductal cancer.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Axillary lymphadenopathy on the same side',
        detail:
          'Breast cancer spreads first to the lymph nodes in the armpit. They feel hard, often matted (stuck together) and non-tender.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Breast asymmetry or ulceration in advanced disease',
        detail:
          'Large tumours change the breast shape. Late-stage tumours can ulcerate through the skin.',
        marks: 2,
      },
    ],
    modelAnswer:
      'Five worrying features and the reason each one happens:\n\n' +
      '1. A HARD, IRREGULAR, FIXED LUMP. Cancer cells are densely packed and badly organised, and the growth invades the surrounding fat and supporting tissue, so the lump sticks to deeper structures. A benign lump (e.g. fibroadenoma) is usually smooth, well-defined, rubbery, and slides easily under the fingers.\n\n' +
      '2. SKIN DIMPLING or PEAU D\'ORANGE. The breast skin is tethered to deeper tissue by small ligaments (Cooper\'s ligaments). When a tumour grows, it pulls on these ligaments → the skin is pulled inward = dimpling. When cancer blocks the small lymph channels in the skin, fluid backs up between hair follicles, and the skin looks thickened and pitted like the peel of an orange.\n\n' +
      '3. NIPPLE RETRACTION or BLOOD-STAINED NIPPLE DISCHARGE. A growth behind the nipple shortens the milk ducts and pulls the nipple inward. Blood-stained discharge — especially from a single duct on one side — raises concern for ductal cancer.\n\n' +
      '4. HARD AXILLARY LYMPH NODES on the same side. The breast drains its lymph first into the armpit (axillary) nodes. Cancer cells travel there early. Affected nodes feel hard, often matted together, and are usually painless.\n\n' +
      '5. CHANGE IN BREAST SHAPE or ULCERATION. The affected breast may look smaller, raised, or distorted as a tumour grows or pulls tissue inward. In advanced disease the cancer breaks through the skin (ulceration).',
    referenceSections: ['Breast & Gynaecology'],
  },

  // ============================================================
  // INVESTIGATIONS
  // ============================================================
  {
    id: 'sdr-008',
    topic: 'urologyAndrology',
    drillKind: 'investigations',
    type: 'drill',
    prompt:
      'A 62-year-old man complains of weak urinary stream, frequency, hesitancy and night-time waking to urinate. Outline (with reasons) the investigations you would request.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Digital rectal examination (DRE)',
        detail:
          'A gloved finger feels the back of the prostate through the rectum. BPH feels smoothly enlarged and rubbery; cancer feels hard, irregular, and nodular. A baseline that costs nothing.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Urinalysis + urine culture',
        detail:
          'Rule out urinary infection (which can mimic BPH symptoms or coexist), and check for blood (haematuria, which would prompt cancer work-up).',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Serum PSA (prostate-specific antigen)',
        detail:
          'A blood test that measures a protein made by prostate cells. Raised in BPH, prostatitis or cancer. Useful but not specific — interpret with DRE and biopsy.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Ultrasound (with post-void residual)',
        detail:
          'A bladder scan measures how much urine is LEFT in the bladder after voiding. A large residual (>100–150 mL) supports significant obstruction. Renal ultrasound checks for back-pressure (hydronephrosis).',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Other (cystoscopy, urea/creatinine)',
        detail:
          'Urea and creatinine check kidney function — chronic obstruction can damage the kidneys. Cystoscopy lets the surgeon look inside the bladder/urethra and is used if surgery (e.g. TURP) is planned.',
        marks: 2,
      },
    ],
    modelAnswer:
      'Investigations and why each is done:\n\n' +
      '1. DIGITAL RECTAL EXAMINATION (DRE) — the doctor wears a glove and feels the prostate through the rectum. BPH usually feels smoothly enlarged, soft, and rubbery. Cancer feels hard, irregular and nodular. Quick, cheap and informative.\n\n' +
      '2. URINALYSIS + URINE CULTURE — checks for infection (which can cause similar symptoms or coexist), microscopic blood (which would mean cancer must be excluded), and protein/glucose.\n\n' +
      '3. SERUM PSA (PROSTATE-SPECIFIC ANTIGEN) — a blood test for a protein made by prostate cells. PSA rises in BPH, infection (prostatitis), AND in cancer. It is not specific on its own; rising values over time are more worrying than a single result.\n\n' +
      '4. BLADDER ULTRASOUND with POST-VOID RESIDUAL — after the patient urinates, a probe on the lower abdomen measures the urine LEFT BEHIND. More than 100–150 mL suggests significant outflow blockage. A renal ultrasound checks the kidneys for back-pressure swelling (hydronephrosis).\n\n' +
      '5. SERUM UREA AND CREATININE — checks kidney function. Long-standing obstruction can quietly damage the kidneys.\n\n' +
      '6. UROFLOWMETRY — measures the speed of urine flow (Q-max). A low maximum flow rate (<10 mL/s) supports obstruction.\n\n' +
      '7. CYSTOSCOPY — a thin camera passed up the urethra to look inside the bladder and around the prostate. Used when symptoms are severe, blood is present, or surgery (TURP) is being planned.',
    referenceSections: ['Urology & Andrology'],
  },
  {
    id: 'sdr-009',
    topic: 'hepatobiliaryPancreas',
    drillKind: 'investigations',
    type: 'drill',
    prompt:
      'A 45-year-old man arrives in the emergency room with severe upper-abdominal pain that bores through to his back. You suspect acute pancreatitis. List (with reasons) the investigations you would order in the first 24 hours.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Serum lipase (preferred) / amylase',
        detail:
          'Confirms inflammation of the pancreas. Lipase rises within hours, stays up for several days, and is more specific to the pancreas than amylase. A level more than 3× normal is diagnostic.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Full blood count, U&Es, calcium, glucose, LFTs, CRP',
        detail:
          'Raised WBC = inflammation. Urea/creatinine and electrolytes guide fluid replacement. Low calcium suggests severe disease (fat necrosis "soaks up" calcium). LFTs may show a biliary cause. CRP > 150 at 48 h suggests severe disease.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Arterial blood gas (ABG)',
        detail:
          'Shows hypoxia (severe pancreatitis can cause ARDS), acidosis from poor tissue perfusion, and helps assess severity.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Abdominal ultrasound',
        detail:
          'Looks for gallstones (a common cause), thickened gallbladder wall, and dilated bile ducts. Easy, cheap, no radiation.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Contrast-enhanced CT (timing matters)',
        detail:
          'Confirms diagnosis when unclear, and at 48–72 hours assesses severity and detects necrosis or fluid collections. Not needed on day 1 in mild cases.',
        marks: 2,
      },
    ],
    modelAnswer:
      'Confirm the diagnosis:\n• SERUM LIPASE (preferred) and/or AMYLASE. Lipase is more specific to the pancreas, rises within hours, and stays high for days. A level more than 3 times the upper normal limit, plus the right pain, confirms acute pancreatitis.\n\n' +
      'Assess severity and find a cause:\n• FULL BLOOD COUNT — high white cells confirm inflammation.\n• UREA, ELECTROLYTES & CREATININE — guide IV fluid replacement and detect early acute kidney injury.\n• LIVER FUNCTION TESTS — a raised ALT or bilirubin points to gallstone pancreatitis.\n• CALCIUM — drops in severe disease because fat necrosis (dead, leaked fat in the abdomen) binds calcium ("soap formation").\n• GLUCOSE — pancreatic damage may impair insulin release.\n• CRP — a value above 150 mg/L at 48 hours predicts severe disease.\n• TRIGLYCERIDES — very high values can cause pancreatitis.\n• ABG (arterial blood gas) — shows hypoxia (pancreatitis can cause acute lung injury/ARDS) and acidosis.\n\n' +
      'Imaging:\n• ABDOMINAL ULTRASOUND — first-line look for gallstones, gallbladder wall thickening, and dilated bile ducts.\n• CHEST X-RAY — looks for pleural effusion (left-sided is classic) and signs of lung injury.\n• CONTRAST-ENHANCED CT ABDOMEN — best done at 48–72 hours to assess severity, detect necrosis and fluid collections. Not needed for mild cases on day 1.\n• MRCP — non-invasive view of bile/pancreatic ducts if obstruction suspected.\n• ERCP — both diagnostic and therapeutic; used when there are stones blocking the common bile duct.\n\n' +
      'A scoring system (e.g. Modified Glasgow, APACHE-II, BISAP) combines these results to predict severity and guide level of care.',
    referenceSections: ['Liver, Biliary & Pancreas'],
  },
  {
    id: 'sdr-010',
    topic: 'breastGynae',
    drillKind: 'investigations',
    type: 'drill',
    prompt:
      'A 19-year-old woman with sudden right-sided pelvic pain has a positive pregnancy test. Outline the investigations that will help you diagnose ectopic pregnancy.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Urine pregnancy test',
        detail:
          'Quick bedside test. A positive result simply confirms pregnancy somewhere; it does not tell you where.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Serum quantitative beta-hCG (and serial values)',
        detail:
          'Beta-hCG is the pregnancy hormone. A normal early intrauterine pregnancy usually DOUBLES every 48 hours; a slow rise or plateau suggests ectopic or a failing pregnancy.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Transvaginal ultrasound',
        detail:
          'A probe placed in the vagina gives close, clear views. Looks for an intrauterine gestational sac (with yolk sac/fetal pole), or signs of ectopic — an adnexal mass, free fluid in the pouch of Douglas, or absent intrauterine sac despite high hCG.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Full blood count + group and save (crossmatch if shocked)',
        detail:
          'Check for anaemia from internal bleeding and prepare blood in case emergency surgery and transfusion are needed.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Laparoscopy — diagnostic gold standard',
        detail:
          'When the diagnosis is unclear, or to TREAT a confirmed ectopic, the surgeon places a camera into the abdomen and can see the ectopic directly and remove or treat it.',
        marks: 2,
      },
    ],
    modelAnswer:
      'In any woman of reproductive age with abdominal pain, the first questions are: could she be pregnant, and is she stable? Investigations focus on confirming pregnancy, locating it, and assessing for internal bleeding.\n\n' +
      '1. URINE PREGNANCY TEST — quick and cheap. Tells you she IS pregnant, but not where.\n\n' +
      '2. SERUM QUANTITATIVE BETA-hCG (the pregnancy hormone). In a healthy pregnancy inside the uterus, this value usually DOUBLES every 48 hours. A slow rise or plateau is a red flag for an ectopic pregnancy or a failing pregnancy. There is also a "discriminatory zone" (around 1500–2000 IU/L); above that, a normal intrauterine pregnancy should be visible on transvaginal ultrasound.\n\n' +
      '3. TRANSVAGINAL ULTRASOUND. A probe placed in the vagina gives close, sharp pictures of the uterus and ovaries. You look for: a gestational sac inside the uterus (with a yolk sac or fetal pole) — that excludes most ectopics; OR an adnexal mass next to the ovary (sometimes you see a "tubal ring" or a fetus outside the uterus); AND free fluid in the pelvic pouch (the "pouch of Douglas") — suggesting internal bleeding.\n\n' +
      '4. FULL BLOOD COUNT — looks for anaemia from internal bleeding.\n\n' +
      '5. GROUP & SAVE (and crossmatch if she is shocked) — preparing for possible blood transfusion if she is bleeding.\n\n' +
      '6. CULDOCENTESIS — a needle through the back wall of the vagina to look for non-clotting blood in the pouch of Douglas. Rarely used today because ultrasound is so widely available.\n\n' +
      '7. LAPAROSCOPY — the diagnostic GOLD STANDARD when the picture is unclear. A small camera is placed into the abdomen and the ectopic is seen directly and treated.\n\n' +
      'Throughout: monitor vital signs continuously and have IV access ready, because rupture can happen suddenly.',
    referenceSections: ['Breast & Gynaecology'],
  },

  // ============================================================
  // MEDICAL & SURGICAL MANAGEMENT
  // ============================================================
  {
    id: 'sdr-011',
    topic: 'cardiothoracic',
    drillKind: 'medicalSurgicalMgmt',
    type: 'drill',
    prompt:
      'A 70-year-old man is found to have a 6 cm abdominal aortic aneurysm (AAA). Outline the medical and surgical management options.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Indication for repair',
        detail:
          'Elective repair is offered when the aneurysm is ≥5.5 cm, growing rapidly (>1 cm/year), or symptomatic. Rupture is a surgical emergency.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Medical / risk-factor control',
        detail:
          'Stop smoking, control BP (target ~130/80), statin and aspirin for cardiovascular risk reduction, treat diabetes, manage cholesterol. These do NOT shrink the aneurysm but reduce overall vascular events and slow growth.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Open surgical repair',
        detail:
          'Through a long midline abdominal cut, the surgeon clamps the aorta above and below the aneurysm, opens it, and sews a synthetic tube (graft) in its place. More invasive but durable.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Endovascular aneurysm repair (EVAR)',
        detail:
          'A covered metal stent-graft is threaded up through the femoral artery and deployed inside the aneurysm to seal it from blood flow. Less invasive, shorter stay, but needs lifelong surveillance for "endoleaks" (blood still entering the sac).',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Ruptured AAA — emergency',
        detail:
          'A ruptured AAA needs immediate surgery (open or emergency EVAR). Mortality is very high. Two large IVs, group and crossmatch large volumes of blood, accept "permissive hypotension" (do not over-resuscitate until clamp on) and rush to theatre.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. DECIDE WHETHER TO REPAIR. A 6 cm AAA is well above the 5.5 cm threshold for repair. Elective repair is also offered when the aneurysm grows by more than 1 cm per year or causes symptoms (e.g. back pain). Smaller AAAs (3.0–5.4 cm) are usually watched with regular ultrasound.\n\n' +
      '2. MEDICAL / RISK-FACTOR CONTROL alongside (and after) any surgery:\n   • Stop smoking — the single most important step.\n   • Lower blood pressure (target ~130/80 mmHg). Less stress on the wall, slower growth.\n   • Statin to lower cholesterol and stabilise plaques.\n   • Aspirin for cardiovascular protection.\n   • Manage diabetes and cholesterol.\n   These steps do not shrink the aneurysm but reduce strokes, heart attacks and slow further enlargement.\n\n' +
      '3. SURGICAL OPTIONS:\n   (a) OPEN SURGICAL REPAIR — the abdomen is opened. The surgeon clamps the aorta above and below the aneurysm, opens the swollen segment, and sews in a synthetic tube (a graft) to replace it. More invasive, longer hospital stay (5–10 days), but durable.\n   (b) ENDOVASCULAR ANEURYSM REPAIR (EVAR) — a covered metal stent-graft is threaded up through the femoral artery in the groin under X-ray guidance, and deployed inside the aneurysm sac to seal it off. Smaller scars, less pain, much shorter hospital stay (often 2–3 days). The downside is the need for lifelong CT/duplex surveillance to watch for "endoleaks" (blood still entering the sac).\n\n' +
      '4. RUPTURED AAA — true surgical emergency. Mortality is very high. Two large-bore IVs, group and crossmatch large volumes of blood, accept "permissive hypotension" (keep BP around 90 mmHg systolic — over-resuscitation can dislodge the clot at the rupture and worsen bleeding), and rush to theatre for open repair or emergency EVAR.\n\n' +
      '5. NURSING / FOLLOW-UP — postoperative monitoring of peripheral pulses, urine output, signs of graft thrombosis, wound infection, and bowel function (ileus is common after open repair).',
    referenceSections: ['Cardiothoracic'],
  },
  {
    id: 'sdr-012',
    topic: 'breastGynae',
    drillKind: 'medicalSurgicalMgmt',
    type: 'drill',
    prompt:
      'Outline the medical and surgical management options for a 32-year-old woman with symptomatic uterine fibroids who still wants to have children.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Conservative (watchful waiting) + lifestyle',
        detail:
          'For mild symptoms, regular review and lifestyle measures (weight optimisation, iron-rich diet, treat anaemia). Many fibroids shrink after menopause anyway.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Medical options',
        detail:
          'Tranexamic acid and NSAIDs reduce heavy bleeding and pain. Combined oral contraceptives or progesterone-only options thin the lining and reduce bleeding. GnRH agonists (e.g. leuprolide) temporarily shrink fibroids by lowering oestrogen — used short-term, often pre-op, because of menopause-like side effects.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Minimally invasive — UAE / MRgFUS',
        detail:
          'Uterine artery embolisation (UAE): a radiologist threads a catheter and injects particles to block the blood supply to the fibroids, which then shrink. May affect future fertility, so the decision needs careful counselling. MRI-guided focused ultrasound (MRgFUS) heats and destroys fibroids non-invasively.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Myomectomy — fertility-preserving surgery',
        detail:
          'Removes fibroids while keeping the uterus. Can be hysteroscopic (through the vagina/cervix for submucosal fibroids), laparoscopic (key-hole) or open. Recurrence is possible. Future pregnancies may need caesarean section depending on incision.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Hysterectomy — definitive but ends fertility',
        detail:
          'Removal of the uterus. Most definitive but ends future pregnancies — not the right first-line choice for a 32-year-old who wants children. Reserved for severe symptoms after other options have failed and family is completed.',
        marks: 2,
      },
    ],
    modelAnswer:
      'Treatment depends on how bad the symptoms are, the size and position of the fibroids, and — very importantly — the woman\'s wish for future pregnancies.\n\n' +
      '1. CONSERVATIVE ("WATCH AND WAIT") — for mild symptoms. Regular review by ultrasound, treat any anaemia with iron, ensure healthy weight (less body fat means less oestrogen production). Many fibroids shrink after menopause.\n\n' +
      '2. MEDICAL OPTIONS:\n   • Tranexamic acid (during periods) reduces heavy menstrual bleeding by helping blood clot.\n   • NSAIDs (e.g. ibuprofen, mefenamic acid) reduce pain and bleeding.\n   • Combined oral contraceptive pills or progesterone-only options thin the lining of the womb and reduce bleeding.\n   • GnRH AGONISTS (e.g. leuprolide) temporarily switch off oestrogen production from the ovaries. Fibroids shrink by 30–60% in a few months. Useful short-term BEFORE surgery to make the operation easier, but not for long-term use because of menopause-like side effects (hot flushes, bone loss).\n\n' +
      '3. MINIMALLY INVASIVE OPTIONS:\n   • UTERINE ARTERY EMBOLISATION (UAE): a radiologist threads a thin tube up through the femoral artery in the groin and injects tiny particles to block the blood supply to the fibroids. Without blood, the fibroids shrink. May affect future fertility, so careful counselling is essential.\n   • MRI-GUIDED FOCUSED ULTRASOUND (MRgFUS): heat from focused sound waves destroys fibroid tissue without cutting the skin. Not yet widely available.\n\n' +
      '4. MYOMECTOMY — fertility-preserving surgery. Removes the fibroids and stitches the uterus back together, KEEPING the womb. Options: hysteroscopic (through the vagina/cervix — good for submucosal fibroids); laparoscopic (key-hole through small abdominal cuts); or open abdominal. This is the best surgical choice for a 32-year-old who wants children. Fibroids can recur. Future pregnancies may need caesarean section depending on the surgical scar.\n\n' +
      '5. HYSTERECTOMY — removes the womb entirely. The most definitive treatment, but it ends future pregnancies. It is therefore NOT the first-line option for our young patient. Reserved for women whose family is complete and who have very severe symptoms despite other treatments. In her age group, keeping the ovaries is preferred to avoid early menopause.',
    referenceSections: ['Breast & Gynaecology'],
  },
  {
    id: 'sdr-013',
    topic: 'esophagogastric',
    drillKind: 'medicalSurgicalMgmt',
    type: 'drill',
    prompt:
      'A patient is diagnosed with H. pylori-positive duodenal ulcer. Explain the medical management you would recommend and outline when surgery would still be needed.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Eradication therapy (triple therapy)',
        detail:
          'Standard 14-day "triple therapy": a proton pump inhibitor (PPI, e.g. omeprazole) PLUS two antibiotics (commonly clarithromycin + amoxicillin; metronidazole instead of amoxicillin if penicillin-allergic). Quadruple therapy if resistance is a concern.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Acid suppression and ulcer healing',
        detail:
          'PPI continued for 4–8 weeks heals the ulcer. H2 blockers (e.g. ranitidine) are second-line. Antacids relieve pain temporarily.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Lifestyle changes',
        detail:
          'Stop smoking, alcohol, NSAIDs; reduce caffeine; eat smaller more frequent meals; reduce stress. These remove ongoing irritants and let the ulcer heal.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Confirm eradication',
        detail:
          'Urea breath test or stool antigen test AT LEAST 4 weeks after stopping antibiotics and 2 weeks off PPI. Antibody (serology) is unreliable for cure check (stays positive long after).',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Indications for surgery',
        detail:
          'Failure of medical therapy / recurrent ulcer despite eradication; PERFORATION (free air under the diaphragm, peritonitis) → emergency Graham omental patch; uncontrolled BLEEDING after endoscopic therapy; GASTRIC OUTLET OBSTRUCTION from scarring; suspicion of cancer (non-healing gastric ulcer with abnormal biopsy).',
        marks: 2,
      },
    ],
    modelAnswer:
      'Medical management:\n\n' +
      '1. ERADICATE H. PYLORI. Standard 14-day "triple therapy": a proton pump inhibitor (PPI, e.g. omeprazole 20 mg twice daily) PLUS two antibiotics (commonly clarithromycin 500 mg twice daily and amoxicillin 1 g twice daily). For penicillin-allergic patients, metronidazole replaces amoxicillin. In areas of high clarithromycin resistance or after a failed first attempt, "quadruple therapy" uses a PPI + bismuth + tetracycline + metronidazole.\n\n' +
      '2. CONTINUE ACID SUPPRESSION. The PPI is usually continued for 4–8 weeks total to allow the ulcer crater to heal. H2 receptor blockers (ranitidine, famotidine) are second-line. Antacids relieve pain temporarily.\n\n' +
      '3. LIFESTYLE CHANGES. Stop smoking (impairs healing). Stop or reduce alcohol. Avoid NSAIDs — switch to paracetamol where possible. Reduce caffeine. Smaller, regular meals. Reduce stress where realistic.\n\n' +
      '4. CONFIRM CURE. A urea breath test OR stool antigen test at least 4 weeks after finishing antibiotics and 2 weeks off PPI. (Blood antibody tests cannot tell whether the infection is gone, so they are not used for cure checks.)\n\n' +
      'When surgery is still needed:\n\n' +
      '• PERFORATION (a hole through the wall of the stomach or duodenum) — sudden, severe generalised abdominal pain with board-like rigidity. Erect chest X-ray shows free air under the diaphragm. EMERGENCY: resuscitate, IV antibiotics, then surgery — Graham omental patch repair (a piece of the fatty apron is sewn over the hole).\n\n' +
      '• UNCONTROLLED BLEEDING — when endoscopic therapy (injection, clipping, thermal coagulation) fails to stop the bleeding. Surgical options include over-sewing the bleeding vessel and partial gastrectomy.\n\n' +
      '• GASTRIC OUTLET OBSTRUCTION — repeated cycles of ulcer healing leave scar that narrows the pyloric channel. Pyloroplasty or gastrectomy may be needed.\n\n' +
      '• REFRACTORY DISEASE — repeated ulcers despite confirmed eradication and good compliance. Consider gastrinoma (Zollinger-Ellison) and rare causes.\n\n' +
      '• SUSPECTED CANCER — any non-healing GASTRIC ulcer needs re-biopsy. If cancer is found, gastrectomy is required.',
    referenceSections: ['Oesophagus & Stomach'],
  },
  {
    id: 'sdr-014',
    topic: 'pediatricBariatric',
    drillKind: 'medicalSurgicalMgmt',
    type: 'drill',
    prompt:
      'A 3-week-old male infant has projectile vomiting after every feed and is dehydrated. Describe the management of infantile hypertrophic pyloric stenosis from admission to discharge.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Stabilisation BEFORE surgery',
        detail:
          'This is NOT a surgical emergency. First correct dehydration and the hypochloraemic, hypokalaemic metabolic alkalosis with IV fluids (e.g. 0.45–0.9% saline with KCl added once urine output is established). Surgery on an alkalotic baby risks post-op apnoea.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'NPO + NG decompression',
        detail:
          'Keep baby nil by mouth. Insert a nasogastric tube to decompress the stomach and reduce vomiting/aspiration risk. Strict input-output monitoring.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Ramstedt pyloromyotomy',
        detail:
          'Definitive operation. The thickened pyloric muscle is split longitudinally (myotomy) WITHOUT cutting the mucosa. The mucosa pouts up between the cut muscle edges and the obstruction is relieved.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Postoperative feeding and monitoring',
        detail:
          'Feeds can usually start within 4–6 hours of surgery, given in small amounts and gradually increased. Some vomiting in the first 24–48 hours is normal because of gastric oedema. Monitor wound, vital signs, hydration.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Parent education at discharge',
        detail:
          'Feed slowly, burp regularly, expect occasional vomiting in the first 1–2 days. Watch for fever, wound redness/discharge, persistent vomiting. Follow-up appointment. Recurrence is very rare.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. STABILISE FIRST — this is a urgent medical problem but NOT an immediate surgical emergency. The baby is dehydrated and has a "hypochloraemic, hypokalaemic metabolic alkalosis" (low chloride, low potassium, alkaline blood) from losing stomach acid in the vomit. Operating on this state is dangerous because alkalosis can cause post-op apnoea (the baby may stop breathing). Therefore:\n   • Keep the baby NIL BY MOUTH.\n   • Insert a nasogastric tube to decompress the stomach.\n   • Establish IV access. Give initial fluid bolus if shocked, then maintenance + replacement fluids (e.g. 0.45–0.9% sodium chloride with 5% dextrose; add potassium chloride once the baby is passing urine).\n   • Strict input/output charting, daily weights, electrolyte monitoring until corrected.\n\n' +
      '2. RAMSTEDT PYLOROMYOTOMY — the definitive operation, performed once electrolytes and hydration are corrected. The surgeon makes a small cut over the thickened pylorus muscle and SPLITS the muscle fibres longitudinally without cutting through the inner lining (mucosa). The mucosa pouts up between the cut edges and the channel is now wide enough for milk to pass. Can be done open (small right upper quadrant incision) or laparoscopically.\n\n' +
      '3. POSTOPERATIVE CARE:\n   • Monitor vital signs, oxygen saturation, glucose, wound, IV site.\n   • Resume feeding within 4–6 hours of surgery — small, slow feeds, gradually increasing to full feeds.\n   • Expect some vomiting in the first 24–48 hours because of stomach lining oedema; it should settle.\n   • Position the baby upright after feeds.\n   • Pain control: paracetamol; the operation is well tolerated.\n\n' +
      '4. PARENT EDUCATION AT DISCHARGE:\n   • Feed slowly, burp regularly.\n   • A little vomiting in the first 1–2 days at home is normal; persistent forceful vomiting needs review.\n   • Watch the wound for redness, discharge, swelling.\n   • Watch for fever, lethargy, poor feeding.\n   • Recurrence is rare; long-term outcome is excellent.\n   • Follow-up clinic appointment at 2 weeks.',
    referenceSections: ['Paediatric & Bariatric'],
  },

  // ============================================================
  // PRE-OPERATIVE NURSING
  // ============================================================
  {
    id: 'sdr-015',
    topic: 'bowel',
    drillKind: 'preopNursing',
    type: 'drill',
    prompt:
      'A 65-year-old man is admitted for elective right hemicolectomy for caecal cancer. Outline the pre-operative nursing care, in plain language.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Assessment and baseline',
        detail:
          'Take a focused history (bowel habit changes, weight loss, blood). Examine for anaemia, masses, ascites. Baseline vital signs, weight/height, nutritional status, ECG. Check anxiety level and what the patient understands about the surgery.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Investigations and consent',
        detail:
          'Confirm pre-op bloods are done (FBC, U&Es, LFTs, glucose, group & save, crossmatch 2 units). ECG, chest X-ray as needed. CEA baseline. Confirm informed consent is signed and patient understands risks, benefits, alternatives.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Bowel preparation and nutrition',
        detail:
          'Follow surgeon\'s plan: clear fluids 24 hours before; oral bowel-cleansing solution (e.g. PEG) the day before; consider oral antibiotics. Treat anaemia and optimise nutrition (high-protein supplements). Stop solid food after midnight (NPO from agreed time).',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Stoma marking and education',
        detail:
          'If there is a chance a stoma will be created, the stoma nurse marks the site on the abdomen pre-op (avoiding waistline, scars, skin folds). Begin stoma education early — reduces post-op shock and improves adjustment.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Final pre-op safety checks',
        detail:
          'Remove jewellery, dentures (with documentation), nail varnish. Give compression stockings and prophylactic LMWH per protocol. Empty bladder. Mark surgical site. Pre-op antibiotics 60 minutes before incision. Operating list check, identity band, allergy band.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. ASSESSMENT AND BASELINE\n   • Focused history: bowel habit changes, blood in stool, weight loss, family history of bowel cancer.\n   • Physical exam: look for pallor (anaemia from slow bleeding), abdominal mass, ascites, jaundice.\n   • Baseline vital signs, height, weight, BMI.\n   • Nutritional screening — chronic illness often means under-nutrition.\n   • Assess anxiety and what the patient understands about the surgery and possible stoma.\n\n' +
      '2. INVESTIGATIONS AND CONSENT\n   • Confirm bloods: full blood count, urea & electrolytes, liver function, glucose, coagulation, group & save (often crossmatch 2 units of blood).\n   • Baseline CEA (a cancer marker, useful for later follow-up).\n   • ECG and chest X-ray, especially in older patients or those with comorbidities.\n   • Confirm WRITTEN informed consent. Make sure the patient understands the operation, the chance of needing a stoma, risks (bleeding, infection, leak, blood clots), and the post-op course.\n\n' +
      '3. BOWEL PREPARATION AND NUTRITION\n   • Follow the surgeon\'s plan: usually clear fluids only 24 hours before, oral bowel-cleansing solution (e.g. PEG) the day before, sometimes oral antibiotics.\n   • Strict input/output charting during bowel prep — patients can become dehydrated.\n   • Treat anaemia (oral iron, occasionally pre-op IV iron or transfusion).\n   • Encourage high-protein nutrition supplements pre-op.\n   • NPO (nothing by mouth) from midnight or as per anaesthetic protocol.\n\n' +
      '4. STOMA MARKING AND EDUCATION (if relevant)\n   • The stoma nurse marks the abdomen pre-op, avoiding the waistline, scars, the umbilicus and skin creases — so the bag can sit flat.\n   • Begin teaching about the stoma BEFORE surgery — bag changes, skin care, diet, body-image concerns. Pre-op preparation reduces post-op anxiety.\n\n' +
      '5. SAFETY CHECKS BEFORE THEATRE\n   • Remove jewellery, dentures (document), contact lenses, nail varnish, hairpins.\n   • Apply anti-embolism (TED) stockings; give prophylactic low molecular weight heparin per protocol.\n   • Empty bladder just before theatre.\n   • Surgical site marked by the surgeon.\n   • Prophylactic IV antibiotics 60 minutes before incision.\n   • Pre-op checklist: identity band, allergy band, consent, fasting status, surgical list confirmed.\n\n' +
      '6. EMOTIONAL SUPPORT — answer questions, reassure, involve family if patient agrees, refer to chaplaincy or support groups if helpful.',
    referenceSections: ['Bowel & Anorectal'],
  },
  {
    id: 'sdr-016',
    topic: 'cardiothoracic',
    drillKind: 'preopNursing',
    type: 'drill',
    prompt:
      'A 60-year-old man is scheduled for elective lobectomy for early-stage non-small cell lung cancer. Outline the focused pre-operative nursing care, with reasons.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Smoking cessation and respiratory optimisation',
        detail:
          'Stop smoking as far in advance as possible (ideally ≥4 weeks). Even 24–48 hours helps. Counselling, nicotine replacement. Treat any chest infection. Pre-op pulmonary function tests guide planning.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Breathing exercises and incentive spirometry',
        detail:
          'Teach deep breathing, effective coughing, and incentive spirometry BEFORE surgery so the patient can do them well after. Reduces atelectasis and pneumonia.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Nutrition, anaemia, and comorbidities',
        detail:
          'Optimise nutrition (cancer patients are often under-nourished). Treat anaemia. Control diabetes, BP and heart disease. Cardiac assessment if needed.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Psychological support and education',
        detail:
          'Explain the procedure, recovery, chest drain, post-op pain management. Address fears about cancer, surgery and changes in life. Involve family.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Routine pre-op safety checks',
        detail:
          'Consent confirmed, ID/allergy bands, baseline observations including SpO₂, ECG, chest X-ray, full blood count, U&Es, coagulation, group & save. TED stockings and DVT prophylaxis. Pre-op antibiotics. Empty bladder; remove jewellery, dentures, polish.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. SMOKING CESSATION AND RESPIRATORY OPTIMISATION\n   • Stop smoking — the single biggest pre-op improvement. Ideally 4+ weeks beforehand, but even 24–48 hours reduces carboxyhaemoglobin and improves oxygenation. Offer nicotine replacement and counselling.\n   • Treat any chest infection with antibiotics and physiotherapy before theatre.\n   • Review pulmonary function tests (spirometry) — a low predicted post-op FEV1 means higher risk.\n\n' +
      '2. BREATHING EXERCISES AND INCENTIVE SPIROMETRY\n   • Teach deep breathing, controlled "huff" coughing, and incentive spirometry BEFORE surgery. The patient must be confident with these for the immediate post-op period, when pain and shallow breathing predispose to atelectasis (collapse of small airways) and pneumonia.\n   • Encourage mobility and chest physiotherapy.\n\n' +
      '3. NUTRITION, ANAEMIA AND COMORBIDITIES\n   • Cancer patients often lose weight and are under-nourished. Pre-op supplements and dietitian referral.\n   • Treat anaemia (oral iron, sometimes pre-op iron infusion or transfusion).\n   • Optimise diabetes (HbA1c control reduces wound infection). Control hypertension. Cardiac assessment if known heart disease — coronary disease and lung cancer often coexist due to shared risk factors.\n\n' +
      '4. PSYCHOLOGICAL SUPPORT AND EDUCATION\n   • Explain the operation simply: which part of the lung will be removed, how long surgery takes, what the recovery looks like, the chest drain and its purpose, pain management plans.\n   • Reassure that one whole lung can still keep the body well oxygenated, but that effort is needed to re-expand the remaining lung.\n   • Address cancer-related fears. Offer family discussion, social work, and palliative-care referral if appropriate.\n\n' +
      '5. ROUTINE PRE-OP SAFETY CHECKS\n   • Written informed consent.\n   • ID band, allergy band.\n   • Baseline observations including oxygen saturation; ECG; chest X-ray; FBC, U&E, LFTs, coagulation, group & save (or crossmatch).\n   • Anti-embolism stockings; prophylactic low molecular weight heparin per protocol (lung cancer + surgery = high VTE risk).\n   • NPO from midnight (or per anaesthetic plan).\n   • Pre-op antibiotics 60 minutes before incision.\n   • Empty bladder before theatre; remove jewellery, dentures (document), contact lenses, nail polish.\n   • Surgical site (correct side of chest) marked by the surgeon.\n   • Final pre-op WHO Surgical Safety Checklist.',
    referenceSections: ['Cardiothoracic'],
  },
  {
    id: 'sdr-017',
    topic: 'breastGynae',
    drillKind: 'preopNursing',
    type: 'drill',
    prompt:
      'Outline the pre-operative nursing care for a 50-year-old woman scheduled for modified radical mastectomy, paying special attention to her psychological needs.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Body image and emotional support',
        detail:
          'Spend time with the patient. Allow her to express fears about disfigurement, loss of femininity, partner reaction. Refer to a breast care nurse. Discuss reconstruction options (immediate vs delayed). Offer peer support groups.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Education on procedure and recovery',
        detail:
          'Explain the operation in plain language: removal of breast tissue and armpit (axillary) lymph nodes. Show the position of the wound and where drains will be. Explain that arm exercises will start soon after surgery. Discuss pain management plan.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Standard pre-op assessment and investigations',
        detail:
          'Vital signs baseline. Bloods: FBC, U&Es, LFTs, coagulation, group & save. ECG and chest X-ray as appropriate. Confirm staging (CT, bone scan if indicated). Verify consent for mastectomy ± axillary clearance ± reconstruction.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Lymphoedema prevention teaching (start pre-op)',
        detail:
          'Teach the patient to avoid BP cuffs, IV cannulae, and blood draws on the operated arm. No tight clothing, jewellery, or heavy lifting on that side. These habits start pre-op for lifelong use.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Routine safety checks',
        detail:
          'NPO from midnight. Remove jewellery, dentures, polish, contact lenses. TED stockings + DVT prophylaxis. Empty bladder. Surgical site marked. Pre-op antibiotics. ID/allergy bands. Anti-anxiety as prescribed.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. BODY IMAGE AND EMOTIONAL SUPPORT (often the most important step)\n   • Sit with the patient. Listen. Allow her to talk about her fears — losing a breast, what her partner and children will think, returning to work, feeling "less of a woman".\n   • Refer to the BREAST CARE NURSE — a specialised role with skills in counselling, prostheses, and reconstruction discussion.\n   • Discuss reconstruction options: immediate (during the same operation) or delayed (months later). Explain what each involves.\n   • Offer the chance to speak to a peer support group / former patient.\n   • Involve her partner/family if she wishes.\n\n' +
      '2. EDUCATION ON THE PROCEDURE AND RECOVERY\n   • Explain in simple language: "We will remove your breast tissue and the lymph nodes from your armpit, where breast cancer cells often spread first. You will have a drain in for a few days to collect fluid."\n   • Show where the scar will be and how drains work.\n   • Describe post-op pain management, that early arm exercises will be started by the physiotherapist, and the expected length of stay.\n\n' +
      '3. STANDARD PRE-OP ASSESSMENT AND INVESTIGATIONS\n   • Baseline observations and weight.\n   • Bloods: full blood count, urea and electrolytes, liver function tests, clotting, group & save.\n   • ECG and chest X-ray as appropriate.\n   • Confirm staging investigations (CT, bone scan) have been done.\n   • Verify written informed consent — for the mastectomy, axillary surgery, and any reconstruction.\n\n' +
      '4. PRE-OPERATIVE LYMPHOEDEMA PREVENTION TEACHING\n   • Start the lifelong habits BEFORE surgery:\n     – No blood pressure cuff or blood draws on the operated arm.\n     – No IV cannulation on that arm.\n     – No tight clothing, watches or jewellery on that side.\n     – Avoid heavy lifting and protect the skin from cuts, burns and insect bites.\n   • Teach gentle arm exercises that physio will progress post-op.\n\n' +
      '5. ROUTINE SAFETY CHECKS\n   • NPO from midnight (or per anaesthetic protocol).\n   • Remove jewellery, dentures (document), contact lenses, nail polish.\n   • Anti-embolism stockings and prophylactic LMWH per protocol.\n   • Empty bladder before theatre.\n   • Surgical site marked by the surgeon on the correct breast.\n   • Pre-op antibiotic prophylaxis.\n   • ID band, allergy band.\n   • Pre-op anxiolytic if prescribed.\n   • Final WHO Surgical Safety Checklist before incision.',
    referenceSections: ['Breast & Gynaecology'],
  },
  {
    id: 'sdr-018',
    topic: 'urologyAndrology',
    drillKind: 'preopNursing',
    type: 'drill',
    prompt:
      'A 70-year-old man with severe BPH is scheduled for TURP. Outline the pre-operative nursing care in plain language.',
    marks: 8,
    rubric: [
      {
        id: 'r1',
        label: 'Assessment of urinary symptoms and continence',
        detail:
          'Record symptom severity (IPSS score), pattern of voiding, episodes of retention, current catheter status if any. Baseline weight, vital signs, and check for signs of dehydration or kidney impairment.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Pre-op investigations',
        detail:
          'FBC (anaemia), U&Es and creatinine (kidney function), coagulation, group & save (TURP can bleed significantly), MSU (treat any infection pre-op), ECG, chest X-ray, baseline PSA documented.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Patient education on the procedure',
        detail:
          'Explain that a scope is passed up the urethra (no abdominal cut), pieces of prostate are removed, and a 3-way catheter will be in place after surgery with continuous bladder irrigation. Discuss possible retrograde ejaculation and erectile changes.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Final pre-op safety checks',
        detail:
          'NPO from midnight, TED stockings and LMWH, treat constipation, pre-op antibiotics, empty bladder, remove jewellery and dentures, confirm consent and ID, mark site if needed, baseline vitals immediately before theatre.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. ASSESSMENT OF URINARY SYMPTOMS AND CONTINENCE\n   • Record symptoms in detail (frequency, weak stream, hesitancy, urgency, night-time waking). The IPSS (International Prostate Symptom Score) helps quantify severity.\n   • Document any episodes of acute urinary retention and any indwelling catheter.\n   • Baseline weight, vital signs, signs of dehydration.\n   • Check for back-pressure on the kidneys (palpable bladder, recent rise in creatinine).\n\n' +
      '2. PRE-OPERATIVE INVESTIGATIONS\n   • Full blood count — TURP can bleed significantly, and chronic illness can cause anaemia.\n   • Urea, electrolytes and creatinine — confirms kidney function.\n   • Coagulation profile.\n   • Group and save (sometimes crossmatch 1–2 units).\n   • Mid-stream urine — treat any urinary infection BEFORE surgery to prevent sepsis.\n   • ECG and chest X-ray as appropriate.\n   • Document baseline PSA.\n\n' +
      '3. PATIENT EDUCATION ON THE PROCEDURE\n   • Explain in simple terms: "The surgeon passes a thin scope up the urinary passage. There is no cut on the tummy. Pieces of the inner prostate that are blocking the flow are shaved away. After surgery you will have a special wide catheter with a constant rinse going through to keep the bladder clear of clots."\n   • Explain expected post-op pink urine, and that bright red blood or clots should be reported.\n   • Discuss possible long-term changes: RETROGRADE EJACULATION (semen passes backward into the bladder, harmless but ends fertility), and possible changes in erections.\n   • Reassure that the procedure does NOT remove the whole prostate and does not treat prostate cancer.\n\n' +
      '4. FINAL SAFETY CHECKS\n   • NPO from midnight.\n   • Anti-embolism stockings; LMWH per protocol; encourage early mobilisation pre-op.\n   • Treat constipation (straining can dislodge catheter / clots post-op).\n   • Pre-op prophylactic antibiotics.\n   • Empty bladder, remove jewellery and dentures (document), remove polish.\n   • Confirm written consent (covering bleeding, infection, retrograde ejaculation, erectile changes, possible need for repeat surgery).\n   • ID and allergy bands.\n   • Surgical Safety Checklist before theatre.',
    referenceSections: ['Urology & Andrology'],
  },

  // ============================================================
  // POST-OPERATIVE NURSING
  // ============================================================
  {
    id: 'sdr-019',
    topic: 'cardiothoracic',
    drillKind: 'postopNursing',
    type: 'drill',
    prompt:
      'A patient has returned to the ward after a right lobectomy and has a chest drain in place. Outline the focused post-operative nursing care.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Respiratory monitoring and support',
        detail:
          'Continuous SpO₂; respiratory rate and effort; auscultate breath sounds; encourage deep breathing, coughing, and incentive spirometry; humidified oxygen as needed; sit up (semi-Fowler\'s) to help lung expansion; chest physiotherapy.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Chest drain care',
        detail:
          'Keep the bottle BELOW chest level. Tubing free of kinks, never clamped (unless ordered). Watch for tidaling (normal swing of fluid with breathing), air leak (continuous bubbling = leak or disconnection), and DRAINAGE colour/volume/consistency (record hourly initially). Maintain aseptic dressing at the insertion site.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Pain control',
        detail:
          'Effective analgesia is essential so the patient can breathe and cough. Multimodal: regular paracetamol, NSAIDs if not contraindicated, IV/PCA opioid, ± epidural / paravertebral / intercostal nerve block. Reassess pain at intervals.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Vital signs, fluid balance, wound, and VTE prevention',
        detail:
          'Hourly vital signs initially. Fluid input/output charting; signs of bleeding (rising drain output, tachycardia, falling BP). Wound check. Early mobilisation, TED stockings, prophylactic LMWH.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Watch for complications',
        detail:
          'Pneumothorax / large air leak; bleeding (>200 mL/h via drain); pneumonia; atelectasis; arrhythmias (especially atrial fibrillation post-lobectomy); subcutaneous emphysema (crackly air under the skin).',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. RESPIRATORY MONITORING AND SUPPORT\n   • Continuous oxygen saturation, respiratory rate, depth, and effort.\n   • Auscultate breath sounds in both lungs.\n   • Sit the patient up (semi-Fowler\'s, around 30–45°) — this lets the diaphragm drop and helps the remaining lung re-expand.\n   • Encourage DEEP BREATHING and INCENTIVE SPIROMETRY every 1–2 hours while awake, plus effective "huff" coughing.\n   • Humidified oxygen as needed to keep SpO₂ adequate.\n   • Chest physiotherapy on the ward.\n\n' +
      '2. CHEST DRAIN CARE — protect it like a life-line.\n   • Keep the drainage bottle BELOW the level of the patient\'s chest at all times to prevent fluid being sucked back into the chest.\n   • Tubing must NOT kink and must NOT be clamped unless specifically ordered (e.g. when changing the bottle).\n   • Check for TIDALING (the fluid swings up and down with breathing) — this means the system is working.\n   • Check for AIR LEAKS — continuous bubbling in the water-seal chamber means either a leak from the lung or a loose connection. Tighten connections; report persistent leaks.\n   • Record DRAINAGE volume, colour, and consistency every hour initially:\n     – Serous (straw) = normal recovery.\n     – Bloody = post-op or ongoing bleeding.\n     – Cloudy/pus = infection.\n   • Sudden drainage > 200 mL/hour, or > 100 mL/hour for 3 hours, suggests active bleeding — call the surgeon.\n   • Maintain aseptic dressing at insertion site. Watch for redness, discharge, subcutaneous emphysema (a "crackly" feeling under the skin from leaking air).\n\n' +
      '3. PAIN CONTROL — the foundation of recovery.\n   • If pain is poorly controlled, the patient cannot breathe deeply or cough → atelectasis and pneumonia.\n   • Multimodal: regular paracetamol; NSAIDs if not contraindicated; IV opioid (often as a PCA — patient-controlled analgesia); regional techniques (epidural, paravertebral catheter, intercostal nerve block).\n   • Re-assess pain scores at intervals; adjust as needed.\n\n' +
      '4. VITAL SIGNS, FLUID BALANCE, WOUND, AND VTE PREVENTION\n   • Vital signs every 15 min in immediate recovery, then hourly.\n   • Strict input/output charting; watch urine output (≥0.5 mL/kg/h).\n   • Bleeding: rising drain output, tachycardia, falling BP, falling Hb.\n   • Wound: redness, swelling, discharge.\n   • Early mobilisation, TED stockings, prophylactic LMWH (reduce DVT/PE).\n\n' +
      '5. WATCH FOR COMPLICATIONS\n   • LARGE AIR LEAK / RESIDUAL PNEUMOTHORAX — persistent bubbling, failure of lung to fully re-expand on X-ray.\n   • BLEEDING — drainage too red, too much, or both.\n   • PNEUMONIA — fever, productive cough, hypoxia.\n   • ATELECTASIS — drop in saturation, crackles, dull bases.\n   • ATRIAL FIBRILLATION — irregular pulse; common after lung surgery; control rate and address electrolytes.\n   • SUBCUTANEOUS EMPHYSEMA — air leaking into skin tissues; mark the extent and watch progression.\n\n' +
      'Removal of the chest drain: when drainage is minimal (<50–150 mL/day per protocol), there is no air leak, the lung is fully expanded on chest X-ray, and the patient is clinically stable.',
    referenceSections: ['Cardiothoracic'],
  },
  {
    id: 'sdr-020',
    topic: 'urologyAndrology',
    drillKind: 'postopNursing',
    type: 'drill',
    prompt:
      'A patient has just returned to the ward following TURP with a 3-way urinary catheter and continuous bladder irrigation (CBI). Outline the focused post-operative nursing care.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Manage CBI and catheter patency',
        detail:
          'Adjust the irrigation drip rate to keep the urine pale pink (faster if dark red, slower if pale). Ensure tubing is not kinked. Note input vs output: true urine output = total drainage − irrigation in. Watch for clots blocking the catheter.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Monitor for haemorrhage and shock',
        detail:
          'Bright-red drainage with clots = active bleeding. Vital signs every 15 min initially, then hourly. Tachycardia, falling BP, falling haemoglobin = haemorrhage — call surgeon. Have additional saline irrigation and crossmatched blood available.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Recognise TUR syndrome',
        detail:
          'Excess absorption of hypotonic irrigation fluid (glycine in older techniques) → DILUTIONAL HYPONATRAEMIA → confusion, seizures, bradycardia, hypertension, pulmonary oedema. Less common with modern bipolar/normal-saline TURP, but must be considered.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Pain, comfort, bowel/bladder education',
        detail:
          'Bladder spasms are common — antimuscarinic (oxybutynin) may help. Pain relief (paracetamol, NSAID, opioid as needed). Treat constipation (straining can re-start bleeding). Reassure that pink urine is normal initially.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'VTE prevention, mobilisation, discharge teaching',
        detail:
          'TED stockings, LMWH, early ambulation. Encourage 2–3 L fluid daily once allowed. Teach: avoid heavy lifting and constipation for 4–6 weeks, expect intermittent mild bleeding for 2–3 weeks, report fever or heavy bleeding. Catheter trial of void before discharge.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. MANAGE CONTINUOUS BLADDER IRRIGATION (CBI) AND CATHETER PATENCY\n   • A 3-way catheter has three channels: one to inflate the balloon, one to run irrigation fluid IN, and one to drain it OUT.\n   • Adjust the irrigation drip rate based on the URINE COLOUR: speed up if dark red/with clots, slow down if pale pink/clear.\n   • Goal: urine remains light pink, no clots.\n   • Check tubing — no kinks, no compression. The bag must be below the level of the bladder.\n   • Calculate TRUE urine output = (total drained) − (irrigation infused).\n   • If the catheter blocks (no drainage, the patient feels bladder pain, lower abdomen distends): perform a manual bladder washout with saline as per protocol, or call the surgical team.\n\n' +
      '2. MONITOR FOR HAEMORRHAGE AND SHOCK\n   • Vital signs every 15 min for the first 1–2 hours, then hourly.\n   • Watch for: bright-red drainage that does not clear with faster irrigation, blood clots, tachycardia, falling blood pressure, low urine output, falling haemoglobin.\n   • Have crossmatched blood available. Notify surgeon early.\n\n' +
      '3. RECOGNISE TUR SYNDROME ("transurethral resection syndrome")\n   • Older glycine irrigation can be absorbed in large amounts through opened venous sinuses in the prostate bed, diluting the blood salts (sodium drops).\n   • Signs: confusion, restlessness, headache, nausea, slow pulse, high BP, pulmonary oedema, seizures.\n   • Less common with modern bipolar resection using normal saline, but still possible — must be recognised early.\n   • Management: stop irrigation, give furosemide and hypertonic saline cautiously (under specialist guidance), supportive care.\n\n' +
      '4. PAIN, COMFORT, BOWEL/BLADDER EDUCATION\n   • Bladder spasms (sudden cramps as the bladder squeezes against the catheter) are common. Anti-muscarinic drugs (oxybutynin), warm reassurance, and ensuring the catheter is patent help.\n   • Pain control: paracetamol, NSAIDs (if no contraindication), opioids as needed.\n   • Stool softeners to prevent constipation — straining can re-start bleeding.\n   • Reassure patient that pink-tinged urine for the first 24–48 hours is expected.\n\n' +
      '5. VTE PREVENTION, MOBILISATION, AND DISCHARGE TEACHING\n   • TED stockings + LMWH per protocol.\n   • Early sitting up and walking as soon as it is safe.\n   • Encourage 2–3 L of fluids daily once allowed orally — flushes the bladder.\n   • Before discharge, the catheter is removed and a TRIAL OF VOID is performed: monitor the first urinations for volume and ease.\n   • Discharge teaching:\n     – Avoid heavy lifting, straining, prolonged sitting, and constipation for 4–6 weeks.\n     – Expect intermittent mild pink urine for up to 2–3 weeks.\n     – Report bright-red blood with clots, fever, severe pain, or inability to pass urine.\n     – Drink plenty of water.\n     – Some men experience retrograde ejaculation long-term — harmless but reduces fertility.\n     – Erectile changes are possible; offer urology follow-up.',
    referenceSections: ['Urology & Andrology'],
  },
  {
    id: 'sdr-021',
    topic: 'bowel',
    drillKind: 'postopNursing',
    type: 'drill',
    prompt:
      'A patient has just returned to the ward after sigmoid colectomy with end colostomy formation. Outline the focused post-operative nursing care, including stoma care.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Routine post-op observation',
        detail:
          'Vital signs (15-minute intervals initially), oxygen, IV fluids, urine output via catheter, wound inspection, pain control, anti-emetic, NG tube if present, VTE prevention.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Assess the stoma',
        detail:
          'Pink/red and moist = healthy. Dusky/dark/purple = ischaemia → call surgeon. Note size, height above skin (should protrude slightly), and surrounding skin. Record any output.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Watch for early complications',
        detail:
          'Anastomotic leak (rising heart rate, fever, abdominal pain, bilious or cloudy drain output) — most dangerous in the first 5–7 days. Bleeding from stoma, paralytic ileus, wound infection, urinary retention, DVT/PE.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Begin stoma education',
        detail:
          'Involve the stoma nurse early. Teach bag changing, skin protection (barrier creams), how to empty the bag, what consistency of stool to expect from a colostomy (formed), and how diet, fluids and certain foods affect output.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Emotional support, mobilisation, and discharge planning',
        detail:
          'Body-image distress is common — listen, reassure, refer to support groups. Encourage early mobilisation and chest physio. Plan discharge with community stoma nurse, repeat scripts, follow-up appointment, and self-care confidence.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. ROUTINE POST-OP OBSERVATION\n   • Vital signs every 15 min initially, then hourly. Keep oxygen on as ordered.\n   • IV fluids until oral intake resumes.\n   • Urinary catheter to track output (aim ≥0.5 mL/kg/h).\n   • NG tube if present — record colour and volume.\n   • Pain control: regular paracetamol + opioid (often via PCA) ± epidural ± NSAID.\n   • Anti-emetic as needed.\n   • TED stockings + LMWH for VTE prevention.\n   • Inspect main abdominal wound; note any drains and their output.\n\n' +
      '2. ASSESS THE STOMA\n   • A healthy stoma is PINK/RED and MOIST, like the inside of the mouth.\n   • Dusky, dark, purple or black = the stoma is losing its blood supply (ischaemia) → call the surgeon urgently.\n   • Pale = poor circulation; consider haemoglobin and perfusion.\n   • Note size, height above the skin (a small "spout" helps the bag stick), and the appearance of the surrounding skin.\n   • Record the first output: from a colostomy expect gas first, then loose stool that becomes more formed over days.\n\n' +
      '3. WATCH FOR EARLY COMPLICATIONS\n   • ANASTOMOTIC LEAK — the most feared early complication. Signs: rising heart rate (often the EARLIEST sign), fever, increasing abdominal pain, falling BP, cloudy or bilious drain fluid, peritonism. Most likely days 3–7 post-op. Inform surgical team early.\n   • BLEEDING from stoma or wound.\n   • PARALYTIC ILEUS — abdomen quietly distends, no bowel sounds, no flatus or stool. Manage with NPO, NG decompression, IV fluids, correct electrolytes.\n   • WOUND INFECTION.\n   • URINARY RETENTION after catheter removal.\n   • DVT/PE — calf swelling, pleuritic chest pain, sudden breathlessness.\n\n' +
      '4. BEGIN STOMA EDUCATION (involve the STOMA NURSE early)\n   • Show patient and family the bag and equipment.\n   • Teach bag changing step by step: clean skin, dry well, measure stoma size, apply protective wafer that fits snugly, attach the bag.\n   • Skin care: avoid leakage onto skin (causes dermatitis); use barrier creams and pastes; treat any skin breakdown promptly.\n   • Emptying the bag: when one-third full to prevent the seal from breaking.\n   • Diet teaching: introduce foods slowly; chew well; drink plenty; warn that some foods cause smell or gas (cabbage, beans, eggs, onions); some thicken or loosen stool.\n   • Encourage daily routine and confidence with the equipment before discharge.\n\n' +
      '5. EMOTIONAL SUPPORT, MOBILISATION, AND DISCHARGE PLANNING\n   • Acknowledge the loss and body-image concerns; allow tears, fears and questions.\n   • Refer to local stoma support groups; offer a peer visit if available.\n   • Involve partner/family if patient agrees.\n   • Encourage early sitting up and walking the day after surgery.\n   • Chest physio and incentive spirometry to prevent pneumonia.\n   • Discharge planning: community stoma nurse referral; supply of bags/wafers; community district nurse if needed; follow-up appointment; medication scripts; sick note; gentle activity guidance (no heavy lifting for 4–6 weeks); driving advice; phone number for problems.',
    referenceSections: ['Bowel & Anorectal'],
  },
  {
    id: 'sdr-022',
    topic: 'breastGynae',
    drillKind: 'postopNursing',
    type: 'drill',
    prompt:
      'Outline the focused post-operative nursing care for a patient who has undergone modified radical mastectomy, with attention to drain and arm care.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Vital signs, wound, and drain monitoring',
        detail:
          'Routine post-op observations. Inspect wound dressing for bleeding or haematoma. Manage Jackson-Pratt / Redivac drain: maintain suction, record volume and colour, secure to prevent traction.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Pain management and positioning',
        detail:
          'Position with the operated arm slightly elevated on pillows to reduce swelling. Regular analgesia. Reassure about phantom sensations or numbness near the wound.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Early arm exercises and lymphoedema prevention',
        detail:
          'Start gentle arm exercises with physiotherapist guidance within 24–48 hours. Lifelong precautions: no BP, IV or blood draw on operated side; no tight clothing; protect from cuts, burns, insect bites; report swelling early.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Watch for complications',
        detail:
          'Bleeding/haematoma; seroma (fluid collection under skin flaps); wound infection; lymphoedema; brachial plexopathy; psychological distress.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Emotional support and discharge planning',
        detail:
          'Allow expression of grief over the breast. Show patient how the wound is healing when she is ready. Discuss bras, prostheses, reconstruction options. Refer to breast cancer nurse, counsellor, support groups. Plan follow-up for staging, chemo/radio/hormonal therapy.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. VITAL SIGNS, WOUND, AND DRAIN MONITORING\n   • Routine post-op observations (BP, pulse, RR, SpO₂, temperature) every 15 min initially, then hourly.\n   • Inspect the dressing regularly for bleeding or a growing haematoma under the skin flaps.\n   • Manage the Jackson-Pratt / Redivac SUCTION DRAIN:\n     – Keep the bulb compressed for active suction.\n     – Record drainage volume and colour each shift.\n     – Secure the drain to the gown so it does not pull.\n     – The drain is removed when daily output falls (e.g. <30 mL/day for 2 days) per protocol.\n\n' +
      '2. PAIN MANAGEMENT AND POSITIONING\n   • Position the operated arm slightly ELEVATED on a pillow — this drops swelling and helps lymph drainage.\n   • Multimodal analgesia: paracetamol + NSAID (if allowed) + opioid as needed.\n   • Warn the patient about post-mastectomy sensory changes: numbness, tingling, "pulling" near the wound, occasional shooting pains. These usually settle over weeks.\n\n' +
      '3. EARLY ARM EXERCISES AND LYMPHOEDEMA PREVENTION\n   • Within 24–48 hours, the physiotherapist starts GENTLE active range-of-motion exercises (e.g. hand squeezing, elbow flexion). Movement is progressed over days to wall-walking, comb-the-hair exercises etc.\n   • Lifelong precautions for the operated side:\n     – NO blood pressure cuff, IV cannula, or blood draws on that arm.\n     – No tight watch, ring, jewellery or sleeve.\n     – Avoid carrying heavy bags.\n     – Protect from cuts, burns, sunburn, insect bites.\n     – Use insect repellent and gloves for gardening.\n     – Report any new swelling, redness, or warmth promptly — early lymphoedema is easier to control.\n\n' +
      '4. WATCH FOR COMPLICATIONS\n   • BLEEDING / HAEMATOMA — increasing pain, swelling under skin flaps, drop in haemoglobin.\n   • SEROMA — clear fluid collecting under the skin flaps after drain removal. Aspirated in clinic.\n   • WOUND INFECTION — redness, warmth, pus, fever.\n   • LYMPHOEDEMA — swelling, heaviness, tightness in the arm.\n   • SHOULDER STIFFNESS — common; physio prevents it.\n   • Rare: BRACHIAL PLEXOPATHY (arm weakness/numbness) from nerve injury or stretching.\n   • PSYCHOLOGICAL DISTRESS — anxiety, depression, body-image issues.\n\n' +
      '5. EMOTIONAL SUPPORT AND DISCHARGE PLANNING\n   • Be present. Let her cry, express anger, or be quiet.\n   • Show the wound only when she is ready; offer a mirror.\n   • Discuss bras, soft and silicone prostheses, swim/sports options, and longer-term reconstruction options.\n   • Refer to the BREAST CARE NURSE, counsellor, and peer support groups.\n   • Involve partner/family if she wishes.\n   • Plan follow-up: pathology review, oncology referral for chemotherapy / radiotherapy / hormonal therapy as indicated.\n   • Discharge advice: wound care, drain care if still in, arm exercises, lifelong arm precautions, when to seek urgent help (fever, heavy bleeding, shortness of breath, calf swelling).',
    referenceSections: ['Breast & Gynaecology'],
  },

  // ============================================================
  // EMERGENCY MANAGEMENT
  // ============================================================
  {
    id: 'sdr-023',
    topic: 'thoracicEmergency',
    drillKind: 'emergencyMgmt',
    type: 'drill',
    prompt:
      'A young man involved in a road traffic accident arrives in A&E with severe breathlessness, low BP, tachycardia, distended neck veins, no breath sounds on the right, and tracheal deviation to the left. Outline your immediate management.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Recognise tension pneumothorax CLINICALLY — do NOT delay for X-ray',
        detail:
          'The combination of severe respiratory distress, shock, distended neck veins, absent breath sounds and tracheal deviation is tension pneumothorax until proven otherwise. Treat first, image later.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Immediate needle decompression',
        detail:
          'Large-bore needle (14G) in the 2nd intercostal space, midclavicular line (or 5th ICS midaxillary in newer guidance). Listen/feel for a rush of air. Symptoms should improve rapidly.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Chest tube (tube thoracostomy)',
        detail:
          'Definitive treatment. Insert in the 5th intercostal space, midaxillary line, on the affected side. Connect to underwater seal drainage.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'High-flow oxygen, IV access, monitoring',
        detail:
          'Apply high-flow oxygen via non-rebreather mask. Two large-bore IVs. Continuous SpO₂, BP, ECG. Group and save / crossmatch. Treat associated injuries (ATLS approach).',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Reassess and image AFTER stabilisation',
        detail:
          'Chest X-ray confirms lung re-expansion and tube position. Watch for ongoing air leak, bleeding, and the possibility of OTHER injuries (cardiac contusion, abdominal trauma, head injury).',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. RECOGNISE AT THE BEDSIDE — tension pneumothorax is a CLINICAL diagnosis. Do NOT wait for chest X-ray. The picture is unmistakable: severe shortness of breath, tachycardia, low BP, distended neck veins, no breath sounds on the affected side, hyperresonance on percussion, and (late) tracheal deviation AWAY from the affected side. Each breath the patient takes makes it worse.\n\n' +
      '2. IMMEDIATE NEEDLE DECOMPRESSION\n   • Take a large-bore IV cannula (14G or 16G).\n   • Insert it in the SECOND intercostal space, MIDCLAVICULAR LINE on the affected side (some guidelines now recommend the 5th ICS midaxillary line in adults because of thicker anterior chest wall).\n   • Aim just over the top of the lower rib (vessels and nerves run UNDER the rib).\n   • A rush of air confirms tension. Symptoms improve immediately.\n   • Leave the cannula open to air until a chest tube is in.\n\n' +
      '3. CHEST TUBE (TUBE THORACOSTOMY) — the DEFINITIVE treatment.\n   • 5th intercostal space, midaxillary line, on the affected side.\n   • Connect to an underwater seal drainage system.\n   • Keep the drainage bottle below chest level.\n   • Watch for tidaling (good) and ongoing air leak (bubbling).\n\n' +
      '4. SIMULTANEOUSLY: ABC RESUSCITATION\n   • A — Airway: secure with C-spine protection.\n   • B — Breathing: HIGH-FLOW OXYGEN by non-rebreather mask.\n   • C — Circulation: two LARGE-BORE IV lines. Crystalloid bolus. Group and save / crossmatch blood.\n   • Continuous monitoring: SpO₂, BP, ECG.\n   • D — Disability: Glasgow Coma Scale, pupil response, blood glucose.\n   • E — Exposure: full body check for other injuries; keep warm.\n   • Follow ATLS principles. Look for other life-threats (cardiac tamponade, massive haemothorax, open pneumothorax, flail chest).\n\n' +
      '5. REASSESS AND IMAGE AFTER STABILISATION\n   • Chest X-ray: confirms lung re-expansion and chest tube position.\n   • FAST ultrasound: looks for blood in the abdomen and pericardium.\n   • Pelvic X-ray, CT trauma series as indicated.\n   • Treat any associated injuries (head, abdomen, pelvis, limbs).\n   • Admit to high-dependency or intensive care.\n   • Communicate clearly with the trauma team and document precisely.',
    referenceSections: ['Thoracic Emergencies'],
  },
  {
    id: 'sdr-024',
    topic: 'breastGynae',
    drillKind: 'emergencyMgmt',
    type: 'drill',
    prompt:
      'A 25-year-old woman with a positive pregnancy test collapses with severe lower abdominal pain, faintness, and shoulder-tip pain. BP is 80/50, pulse 130. Outline your emergency management of suspected ruptured ectopic pregnancy.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Recognise the surgical emergency',
        detail:
          'Pregnant + shock + abdominal pain + shoulder-tip pain = ruptured ectopic until proven otherwise. Time is life.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'ABC and rapid resuscitation',
        detail:
          'High-flow oxygen, two large-bore IV cannulae, take bloods (FBC, U&Es, group & CROSSMATCH 2–4 units, beta-hCG, coagulation), start IV crystalloid bolus, prepare for blood transfusion.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Continuous monitoring + urinary catheter',
        detail:
          'Continuous BP, pulse, oxygen saturation, ECG. Insert urinary catheter to track urine output (a sensitive marker of perfusion). Strict fluid balance.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Emergency surgery',
        detail:
          'Inform obstetric/gynaecology and anaesthetic teams. Prepare for emergency laparotomy (or laparoscopy if stable). Most often salpingectomy (removal of the bleeding tube). Anti-D immunoglobulin if Rh-negative.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Communication, psychological support, and after-care',
        detail:
          'Explain briefly what is happening to the patient and family. After surgery: bereavement support (loss of pregnancy), family planning counselling, post-op observation, and counselling on future risk of ectopic.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. RECOGNISE THE EMERGENCY at the door. The triad of pregnancy + shock + abdominal pain (often with shoulder-tip pain from diaphragm irritation by intra-abdominal blood) is ruptured ectopic until proven otherwise. Every minute matters.\n\n' +
      '2. ABC AND RAPID RESUSCITATION (run in parallel — do not wait for any one step):\n   • AIRWAY: protect; check responsiveness.\n   • BREATHING: HIGH-FLOW OXYGEN via non-rebreather mask. Continuous SpO₂.\n   • CIRCULATION:\n     – Two LARGE-BORE IV cannulae (16G).\n     – Take bloods AT THE SAME TIME as you cannulate: full blood count, urea and electrolytes, coagulation, group AND CROSSMATCH 2–4 units, beta-hCG (quantitative), and lactate if available.\n     – Start IV crystalloid (warmed normal saline / Hartmann\'s) bolus. Reassess BP and pulse.\n     – Prepare for blood transfusion; use uncrossmatched O-negative if she is in extremis and crossmatched blood is not yet available.\n   • Aim for a permissive systolic BP of around 80–90 mmHg until bleeding is controlled.\n\n' +
      '3. CONTINUOUS MONITORING\n   • Continuous BP, pulse, SpO₂, ECG.\n   • Insert URINARY CATHETER to track urine output (≥0.5 mL/kg/h is the goal — falling output means worsening shock).\n   • Strict fluid balance chart.\n   • Keep her WARM (hypothermia worsens clotting).\n\n' +
      '4. EMERGENCY SURGERY\n   • Call the obstetric/gynaecology team AND anaesthesia AT ONCE.\n   • The ward should already have notified theatre.\n   • Bedside transabdominal ultrasound or FAST may show free fluid in the pelvis/abdomen, confirming intra-abdominal bleeding — but do NOT delay theatre for elaborate imaging in an unstable patient.\n   • DEFINITIVE TREATMENT: emergency LAPAROTOMY (or laparoscopy if she is stable). Usually a SALPINGECTOMY (the bleeding tube is removed). Sometimes salpingostomy is possible if the other tube has already been lost.\n   • Anti-D immunoglobulin if she is Rh-negative.\n\n' +
      '5. COMMUNICATION AND PSYCHOLOGICAL SUPPORT\n   • Briefly explain the situation to her and her family in plain words. They are frightened.\n   • Document time of arrival, observations, interventions, surgical team involvement, and the consent process (capacity-based; in a life-threatening emergency, life-saving treatment proceeds even without formal written consent).\n   • AFTER SURGERY:\n     – Post-op monitoring (Hb, vital signs, urine output, wound).\n     – Bereavement support for the loss of pregnancy.\n     – Counsel about the risk of future ectopic pregnancy (≈10–15%) and the need to present early in any future pregnancy for ultrasound.\n     – Discuss family planning; review modifiable risk factors (smoking, untreated pelvic infections).',
    referenceSections: ['Breast & Gynaecology'],
  },
  {
    id: 'sdr-025',
    topic: 'urologyAndrology',
    drillKind: 'emergencyMgmt',
    type: 'drill',
    prompt:
      'A 15-year-old boy is brought to A&E with sudden severe scrotal pain that started 2 hours ago, vomiting, and a swollen high-riding right testis. Outline your management of suspected testicular torsion.',
    marks: 8,
    rubric: [
      {
        id: 'r1',
        label: 'Recognise the surgical emergency — TIME IS TESTIS',
        detail:
          'Sudden onset, severe pain, swollen tender high-riding testis with absent cremasteric reflex = torsion until proven otherwise. Surgery within 6 hours offers the best chance of saving the testis.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Resuscitation and analgesia',
        detail:
          'NPO, IV access, IV analgesia (e.g. morphine), anti-emetic, baseline bloods, urine sample. Do not delay for prolonged imaging.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Surgical exploration',
        detail:
          'Definitive management is immediate scrotal exploration with detorsion. If viable, both testes are fixed in the scrotum (orchidopexy) because the underlying anatomical predisposition usually mirrors both sides. If non-viable (black, no return of colour after detorsion), orchidectomy is performed.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Communication, consent, and post-op care',
        detail:
          'Explain to the teen and parents what is happening and what may need to be done (including the possibility of testis loss). Obtain consent. Post-op: scrotal support, analgesia, watch for haematoma and infection, sensitivity to body-image and fertility concerns, follow-up.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. RECOGNISE — TIME IS TESTIS\n   • Sudden severe scrotal pain in an adolescent + swollen, tender, high-riding testis + absent cremasteric reflex on that side = torsion until proven otherwise.\n   • Within 6 hours of complete twisting, the chance of saving the testis is good (~90%). It falls rapidly afterwards.\n   • Doppler ultrasound CAN help (reduced/absent flow) but must NOT delay surgery if the clinical picture is classic.\n\n' +
      '2. RAPID RESUSCITATION AND COMFORT\n   • NPO (he will need anaesthesia).\n   • IV access; baseline bloods (FBC, U&Es, group & save) and a urine sample (to look for UTI as an alternative diagnosis).\n   • Strong analgesia (e.g. IV morphine 0.1 mg/kg titrated, paracetamol). Add an anti-emetic.\n   • Consider attempted MANUAL DETORSION ("open the book" — twist the testis OUTWARD and laterally) only if surgery will be delayed and clinician is trained. This is a temporising measure, not definitive.\n\n' +
      '3. EMERGENCY SURGICAL EXPLORATION (DEFINITIVE)\n   • Call urology and theatre at once.\n   • Inform anaesthesia.\n   • At surgery: scrotal incision, find the cord, untwist (detort) the testis.\n   • Wrap in warm saline-soaked gauze for a few minutes and watch for colour return.\n   • If VIABLE: ORCHIDOPEXY of BOTH testes (suturing each to the scrotal wall) — because the predisposing anatomy (bell-clapper deformity) is usually present on both sides.\n   • If NOT viable (black, no colour return): ORCHIDECTOMY (removal). Still fix the OTHER testis to protect it.\n\n' +
      '4. COMMUNICATION, CONSENT AND POST-OP CARE\n   • Explain clearly to the patient (in age-appropriate language) and his parents: what torsion is, why time matters, what surgery involves, and the possibility that the testis may not be salvageable.\n   • Obtain WRITTEN consent (or assent + parental consent for a minor).\n   • Postoperatively:\n     – Pain control, scrotal support, ice packs for swelling.\n     – Wound care, watch for haematoma or infection.\n     – Encourage gentle activity; avoid heavy sport for several weeks.\n     – Address body-image and fertility concerns — one testis can produce enough hormones and sperm for normal function, but a sperm bank discussion may be appropriate.\n     – Outpatient urology follow-up.',
    referenceSections: ['Urology & Andrology'],
  },
  {
    id: 'sdr-026',
    topic: 'cardiothoracic',
    drillKind: 'emergencyMgmt',
    type: 'drill',
    prompt:
      'A 65-year-old man with sudden severe "tearing" chest pain radiating to the back is found to have unequal arm BPs and a widened mediastinum on chest X-ray. Outline your immediate management of suspected Stanford Type A aortic dissection.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Recognise and call for help',
        detail:
          'Tearing chest pain to back + unequal arm pulses/BP + widened mediastinum on CXR = aortic dissection. Type A is a surgical emergency. Mortality rises 1–2% per hour untreated.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'ABC, oxygen, and large-bore IVs',
        detail:
          'Sit patient comfortably. High-flow oxygen. Continuous monitoring (BP both arms, ECG, SpO₂). Two large-bore IV lines. Take bloods (FBC, U&Es, troponin, coagulation, group & crossmatch).',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Strict BP and heart-rate control',
        detail:
          'Goal: systolic BP 100–120 mmHg, heart rate ~60 bpm. FIRST drug: IV beta-blocker (e.g. labetalol or esmolol) to reduce both BP and the shear force (dP/dt). Add vasodilator (e.g. nitroprusside) if BP remains high after beta-blockade.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Pain control and definitive imaging',
        detail:
          'IV opioid (morphine) to control pain (pain raises BP). Urgent CT angiography (or transoesophageal echo if too unstable) to confirm diagnosis and classify (Type A vs B).',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Definitive surgery (Type A) and ICU',
        detail:
          'Type A: emergency cardiothoracic surgery to replace the ascending aorta with a synthetic graft. Type B: usually medical management with strict BP control (unless complicated). Transfer to cardiothoracic centre and ICU.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. RECOGNISE AND CALL FOR HELP IMMEDIATELY\n   • Sudden severe "tearing" or "ripping" chest pain that migrates to the back, in someone with hypertension, especially with unequal arm BPs and a widened mediastinum on CXR = aortic dissection until proven otherwise.\n   • TYPE A (involving the ascending aorta) is a true SURGICAL EMERGENCY. Mortality rises by 1–2% PER HOUR if untreated.\n   • Call cardiothoracic surgery, anaesthesia, and ICU early.\n\n' +
      '2. ABC, OXYGEN AND IV ACCESS\n   • Sit the patient comfortably; keep calm.\n   • High-flow OXYGEN.\n   • Continuous monitoring: BP in BOTH arms (compare), pulse, ECG, SpO₂.\n   • Two LARGE-BORE IV cannulae.\n   • Take bloods: FBC, U&Es, troponin (to assess for cardiac involvement / MI mimic), coagulation, glucose, GROUP AND CROSSMATCH at least 4 units.\n\n' +
      '3. STRICT BP AND HEART-RATE CONTROL\n   • Goals: systolic BP 100–120 mmHg, heart rate around 60 bpm.\n   • FIRST give an IV BETA-BLOCKER such as labetalol or esmolol. This reduces BOTH the blood pressure AND the shear stress on the wall (dP/dt — how fast the pressure rises with each heartbeat). Lowering BP without controlling pulse simply increases shear force.\n   • If BP remains high after adequate beta-blockade, add an IV vasodilator (e.g. nitroprusside, GTN).\n   • Reassess every few minutes.\n\n' +
      '4. PAIN CONTROL AND DEFINITIVE IMAGING\n   • IV opioid (morphine 2–4 mg, titrate). Pain raises BP, so good analgesia helps BP control.\n   • Anti-emetic if needed.\n   • DEFINITIVE IMAGING: urgent CT ANGIOGRAPHY of the chest, abdomen and pelvis confirms the dissection, shows entry tear and extent, and classifies it. Transoesophageal echocardiography (TOE) is an alternative when CT is not feasible or the patient is too unstable. ECG and bedside echo can help exclude STEMI and tamponade.\n\n' +
      '5. DEFINITIVE TREATMENT\n   • TYPE A — involves the ASCENDING aorta. EMERGENCY OPEN HEART SURGERY (graft replacement of the ascending aorta ± aortic valve and arch). Survival without surgery is poor; with surgery it improves dramatically.\n   • TYPE B — involves only the DESCENDING aorta. Usually managed MEDICALLY with strict BP control and serial imaging. Endovascular stent grafting is used when complicated by organ ischaemia, rapid expansion, or persistent pain.\n   • Transfer to a CARDIOTHORACIC SURGICAL CENTRE and ICU as soon as feasible. Maintain BP control during transfer.\n\n' +
      '6. NURSING ROLE THROUGHOUT\n   • Communicate clearly and reassure the frightened patient and family.\n   • Strict BP recording and prompt action on rising values.\n   • Document interventions, drug doses, BP trends.\n   • Anticipate complications: cardiac tamponade (sudden BP drop with distended neck veins), stroke, organ ischaemia (low urine output, abdominal pain), limb ischaemia.',
    referenceSections: ['Cardiothoracic'],
  },

  // ============================================================
  // PATIENT EDUCATION / DISCHARGE TEACHING
  // ============================================================
  {
    id: 'sdr-027',
    topic: 'bowel',
    drillKind: 'patientEducation',
    type: 'drill',
    prompt:
      'A 58-year-old woman is being discharged 7 days after right hemicolectomy with primary anastomosis (no stoma). Outline the discharge teaching she needs.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Wound care and activity',
        detail:
          'Keep wound clean and dry; shower (not bath) after 48 hours; report redness, swelling, discharge, or fever. Avoid heavy lifting (>5 kg) and strenuous exercise for 6 weeks. Gradually return to normal activities; walking is encouraged from day one.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Diet and bowel changes',
        detail:
          'Start with small frequent meals; gradually return to normal diet over weeks; stay well hydrated; expect changes in bowel habit (loose stool, increased frequency) initially; high fibre once tolerated; avoid laxatives without advice.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Pain control and medication',
        detail:
          'Paracetamol regularly; reduce opioid use to avoid constipation; finish any prescribed antibiotics; resume regular medications as advised; review anticoagulation and continued LMWH (often given for 28 days after major abdominal cancer surgery).',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Warning signs — when to seek urgent help',
        detail:
          'Fever, severe abdominal pain, persistent vomiting, abdominal distension, no bowel motions/wind for 24+ hours, wound redness or discharge, calf swelling, sudden shortness of breath (DVT/PE).',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Follow-up and ongoing oncology plan',
        detail:
          'Outpatient appointment with surgeon at 2–4 weeks. Histology review and oncology referral for adjuvant chemotherapy decision (depends on stage and node status). Plan ongoing surveillance with CEA, CT scans, and colonoscopy. Psychosocial support — bowel-cancer support groups.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. WOUND CARE AND ACTIVITY\n   • Keep the wound clean and dry. Showering is allowed after 48 hours; avoid baths/pools until the wound is fully healed.\n   • Report any redness, increasing pain, swelling, discharge, or opening of the wound.\n   • Walking is good from day one — start short walks, build up gradually.\n   • AVOID HEAVY LIFTING (>5 kg) and strenuous exercise for 6 WEEKS to protect the abdominal wall closure.\n   • Driving usually OK at 4–6 weeks once you can do an emergency stop pain-free; check insurance terms.\n\n' +
      '2. DIET AND BOWEL CHANGES\n   • Eat small, frequent, easy-to-digest meals. Build up gradually.\n   • Drink plenty of water (about 2 L/day).\n   • Bowel habit often changes for the first few weeks — loose stool or increased frequency is common. This usually settles.\n   • Add fibre slowly once you are tolerating regular meals.\n   • Avoid laxatives without medical advice.\n\n' +
      '3. PAIN CONTROL AND MEDICATIONS\n   • Take paracetamol regularly; this is the backbone of pain relief.\n   • Reduce opioids (e.g. tramadol, codeine) as pain improves — they cause constipation.\n   • Complete any prescribed antibiotic course.\n   • Resume your usual medications as advised.\n   • You may continue daily injections (LMWH) at home for ~28 days after major bowel cancer surgery to prevent blood clots — teach injection technique or arrange community nurse visits.\n\n' +
      '4. WARNING SIGNS — WHEN TO SEEK URGENT HELP\n   • Fever (>38 °C).\n   • Severe or worsening abdominal pain.\n   • Persistent vomiting.\n   • Abdomen becoming swollen and tense.\n   • Not passing wind or stool for 24 hours or more.\n   • Wound redness, swelling, foul discharge, or opening.\n   • Sudden swollen, painful calf (possible DVT).\n   • Sudden shortness of breath or chest pain (possible pulmonary embolism).\n   • Give the patient a phone number for the surgical ward.\n\n' +
      '5. FOLLOW-UP AND ONGOING CANCER PLAN\n   • Outpatient surgical review at 2–4 weeks to check wound and discuss histology.\n   • Oncology referral to decide on adjuvant CHEMOTHERAPY (especially for stage III or high-risk stage II disease).\n   • Long-term surveillance: regular CEA blood tests, surveillance colonoscopy (typically at 1 year), and CT scans per local protocol.\n   • Lifestyle: smoking cessation, healthy weight, regular activity — improves both survival and quality of life.\n   • Psychological and family support: refer to colorectal cancer support groups, counselling, and social services as needed.\n   • Encourage attendance for national bowel cancer screening for first-degree relatives.',
    referenceSections: ['Bowel & Anorectal'],
  },
  {
    id: 'sdr-028',
    topic: 'pediatricBariatric',
    drillKind: 'patientEducation',
    type: 'drill',
    prompt:
      'A 35-year-old woman is being discharged 5 days after Roux-en-Y gastric bypass. Outline the discharge teaching she needs.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Staged diet progression',
        detail:
          'Clear liquids → full liquids → pureed → soft → small frequent solid meals over 6–8 weeks. Eat slowly, chew thoroughly, small portions (initially the new pouch holds only 30–60 mL).',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Eating and drinking habits',
        detail:
          'Stop eating when full; avoid drinking with meals (drink 30 min before or after); limit fluids to small sips. Avoid carbonated and sugary drinks. Limit caffeine and alcohol.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Lifelong supplements',
        detail:
          'Daily multivitamin, vitamin B12 (oral or injection), iron, calcium, vitamin D. Regular blood tests for nutritional deficiencies. Continue for life.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Recognise complications',
        detail:
          'Anastomotic leak: tachycardia, fever, severe abdominal pain, shoulder pain — seek emergency care. Dumping syndrome: sweating, palpitations, dizziness, diarrhoea after sugary meals — manage by avoiding refined sugar. Hypoglycaemia, nutritional deficiencies, weight regain — report to clinic.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Lifestyle, follow-up, and emotional support',
        detail:
          'Daily activity (walking, building to 30+ min/day); avoid heavy lifting for 6 weeks; lifelong specialist follow-up; bariatric support group / dietitian / psychologist. Discuss pregnancy timing (wait 12–18 months) and the need for adjusted contraception.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. STAGED DIET PROGRESSION (over 6–8 weeks)\n   • Week 1: CLEAR LIQUIDS only (water, broth, sugar-free clear fluids).\n   • Week 2: FULL LIQUIDS (skimmed milk, protein shakes, blended soups).\n   • Weeks 3–4: PUREED foods (cottage cheese, mashed soft vegetables, blended chicken).\n   • Weeks 5–6: SOFT foods (eggs, soft fish, soft cooked vegetables).\n   • Beyond week 6: SMALL FREQUENT solid meals.\n   • The new stomach pouch holds only 30–60 mL initially — eat tiny amounts.\n\n' +
      '2. EATING AND DRINKING HABITS\n   • Eat slowly, chew thoroughly until food is liquid in your mouth before swallowing.\n   • Stop the moment you feel full — over-eating causes pain and vomiting.\n   • Do NOT drink with meals: drink fluids 30 minutes BEFORE or AFTER meals, in SMALL SIPS. Drinking with meals washes food through too fast and triggers dumping.\n   • Avoid fizzy drinks (stretch the pouch), sugary drinks (cause dumping), and large amounts of caffeine or alcohol.\n   • High protein at every meal (60–80 g/day target).\n\n' +
      '3. LIFELONG NUTRITIONAL SUPPLEMENTS\n   • Daily multivitamin.\n   • Vitamin B12 (sublingual or injection — the bypassed part of the gut is where B12 is absorbed).\n   • Iron (especially in menstruating women).\n   • Calcium + vitamin D for bone health.\n   • Regular blood tests for full blood count, iron, ferritin, B12, folate, calcium, vitamin D, parathyroid hormone, and protein levels.\n   • These supplements are FOR LIFE.\n\n' +
      '4. RECOGNISE COMPLICATIONS\n   • ANASTOMOTIC LEAK (most dangerous early): tachycardia (often the FIRST sign), fever, increasing abdominal/shoulder pain. Go to A&E.\n   • DUMPING SYNDROME: within 30 min of eating sugary food — sweating, fast heart, dizziness, diarrhoea. Caused by sugar racing into the small bowel. Manage by avoiding refined sugar, eating slowly, small meals, separating fluids and solids.\n   • LATE HYPOGLYCAEMIA: shaky, sweaty 1–3 hours after a meal. Eat low-glycaemic carbs paired with protein.\n   • NUTRITIONAL DEFICIENCIES: tiredness, hair loss, neuropathy, anaemia.\n   • WEIGHT REGAIN: contact the clinic early.\n   • INTERNAL HERNIA: episodes of cramping abdominal pain — return for review.\n\n' +
      '5. LIFESTYLE, FOLLOW-UP AND EMOTIONAL SUPPORT\n   • Daily activity: start with walking, build to 30+ minutes per day. Avoid heavy lifting for 6 weeks.\n   • Lifelong follow-up in the bariatric clinic (3, 6, 12 months in year 1, then yearly).\n   • Dietitian, psychologist, and support group.\n   • Pregnancy: wait 12–18 months after surgery before becoming pregnant — the body is in rapid weight loss and can affect the baby. Bariatric surgery can change how oral contraceptives are absorbed — consider non-oral methods.\n   • Some drugs (extended-release tablets, NSAIDs) may need to be changed.\n   • Emotional changes are common — many patients struggle with body-image change and food relationships. Seek help early.',
    referenceSections: ['Paediatric & Bariatric'],
  },

  // ============================================================
  // COMPARE CONDITIONS
  // ============================================================
  {
    id: 'sdr-029',
    topic: 'bowel',
    drillKind: 'compareConditions',
    type: 'drill',
    prompt:
      'Compare and contrast DIRECT and INDIRECT inguinal hernias under the following headings: anatomy/pathway, congenital vs acquired, age and sex pattern, risk of strangulation, and how each is repaired.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Anatomy / pathway',
        detail:
          'INDIRECT: passes through the deep inguinal ring (a natural opening), travels down the inguinal canal, can descend INTO the scrotum. DIRECT: bulges straight forward through a weak spot in the posterior wall (Hesselbach\'s triangle), medial to the inferior epigastric vessels; usually does not reach the scrotum.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Congenital vs acquired',
        detail:
          'INDIRECT: usually congenital — a persistently open processus vaginalis (a tube of peritoneum the testis followed down). DIRECT: acquired — weakening of the abdominal wall over time.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Age and sex pattern',
        detail:
          'INDIRECT: any age, more common in young men; the commonest hernia overall and the commonest in children. DIRECT: older men with weak abdominal walls (chronic cough, straining, obesity).',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Risk of strangulation',
        detail:
          'INDIRECT: higher risk because the narrow deep ring can trap bowel. DIRECT: lower risk because the defect is wide and contents reduce easily, though still possible.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Repair',
        detail:
          'Both repaired by mesh (tension-free) techniques — Lichtenstein open repair or laparoscopic mesh repair. Indirect repair includes high ligation of the sac at the deep ring. Direct repair strengthens the posterior wall.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. ANATOMY / PATHWAY\n   • INDIRECT — the hernia enters the abdominal wall through a NATURAL opening called the deep (internal) inguinal ring. It then travels along the inguinal canal (the same tube the testis used during fetal life) and can descend into the scrotum.\n   • DIRECT — the hernia bulges STRAIGHT FORWARD through a weak area in the posterior wall of the canal (Hesselbach\'s triangle, MEDIAL to the inferior epigastric vessels). It usually does NOT reach the scrotum.\n\n' +
      '2. CONGENITAL vs ACQUIRED\n   • INDIRECT — usually CONGENITAL. The "processus vaginalis" is a tube of peritoneum that follows the testis as it descends. If it fails to close after birth, bowel can slip down through it later.\n   • DIRECT — ACQUIRED. The abdominal wall weakens over time from chronic cough, heavy lifting, straining at stool (constipation/BPH), pregnancy, obesity, and ageing.\n\n' +
      '3. AGE AND SEX PATTERN\n   • INDIRECT — any age, but very common in young men. It is the commonest hernia overall and the commonest hernia in children.\n   • DIRECT — older men, especially those with chronic conditions that raise abdominal pressure.\n\n' +
      '4. RISK OF STRANGULATION\n   • INDIRECT — HIGHER risk. The narrow deep ring can trap bowel and cut off blood supply.\n   • DIRECT — lower risk. The defect is wide and the contents usually reduce easily. Strangulation can still occur, just less commonly.\n\n' +
      '5. REPAIR\n   • Both are repaired with TENSION-FREE mesh techniques — most commonly:\n     – LICHTENSTEIN repair (open): a synthetic mesh is placed and stitched over the weakened area.\n     – Laparoscopic (TEP or TAPP) mesh repair.\n   • Indirect repair: the sac is dissected to the deep ring and ligated high, then mesh placed.\n   • Direct repair: the bulging fat/peritoneum is pushed back; mesh covers and strengthens the posterior wall.\n   • Femoral hernias are repaired electively even if asymptomatic because of their high strangulation risk.\n   • Post-op advice for both: avoid heavy lifting for 4–6 weeks, treat any chronic cough/constipation/BPH that contributed.',
    referenceSections: ['Bowel & Anorectal'],
  },
  {
    id: 'sdr-030',
    topic: 'cardiothoracic',
    drillKind: 'compareConditions',
    type: 'drill',
    prompt:
      'Compare TENSION PNEUMOTHORAX and MASSIVE HAEMOTHORAX under: definition, mechanism, classic chest findings, key X-ray finding, and immediate management.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Definition and mechanism',
        detail:
          'Pneumothorax: air trapped in the pleural space under increasing pressure (one-way valve). Haemothorax: blood (>1500 mL or >200 mL/h) collected in the pleural space, usually from chest vessel injury.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Trachea and venous return',
        detail:
          'Pneumothorax: trachea DEVIATED AWAY (late sign), distended neck veins, impaired venous return → shock. Haemothorax: trachea usually central or mildly deviated, neck veins FLAT (hypovolaemic), shock from blood loss + lung compression.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'Percussion and breath sounds',
        detail:
          'Pneumothorax: HYPERRESONANT (drum-like) to percussion, absent breath sounds. Haemothorax: DULL (stony-dull) to percussion, decreased/absent breath sounds.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'Key chest X-ray finding (if obtained)',
        detail:
          'Pneumothorax: dark (air) field with no lung markings, lung edge visible, possible mediastinal shift. Haemothorax: white-out / opacification with blunting of the costophrenic angle on upright film.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Immediate management',
        detail:
          'Pneumothorax: clinical diagnosis — IMMEDIATE NEEDLE DECOMPRESSION then chest tube. Haemothorax: two large-bore IVs, crossmatched blood, chest tube, emergency thoracotomy if bleeding > 1500 mL initially or > 200 mL/h ongoing.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. DEFINITION AND MECHANISM\n   • TENSION PNEUMOTHORAX — air enters the pleural space (the gap between the lung and chest wall) on inspiration but cannot escape on expiration, acting like a one-way valve. Pressure rises with each breath, the lung collapses, and the heart and great vessels are pushed sideways.\n   • MASSIVE HAEMOTHORAX — blood (>1500 mL initial OR >200 mL/h ongoing) collects in the pleural space, usually from injury to an intercostal artery, internal mammary artery, or great vessel. Blood compresses the lung AND causes shock through blood loss.\n\n' +
      '2. TRACHEA AND VENOUS RETURN\n   • TENSION PNEUMOTHORAX: high intrathoracic pressure pushes the trachea AWAY from the affected side (a late sign); neck veins DISTENDED because blood cannot return to the heart; classic OBSTRUCTIVE shock.\n   • MASSIVE HAEMOTHORAX: the trachea may be midline or only mildly deviated; neck veins are usually FLAT because the patient is hypovolaemic (losing blood); HYPOVOLAEMIC shock.\n\n' +
      '3. PERCUSSION AND BREATH SOUNDS\n   • TENSION PNEUMOTHORAX: chest is HYPERRESONANT (like a drum) on the affected side; breath sounds ABSENT.\n   • MASSIVE HAEMOTHORAX: STONY DULL on percussion (because fluid muffles sound); breath sounds reduced or absent.\n\n' +
      '4. KEY CHEST X-RAY (ONLY IF DIAGNOSIS UNCERTAIN AND PATIENT STABLE)\n   • TENSION PNEUMOTHORAX (do NOT delay treatment for X-ray): dark (air) area with NO lung markings; visible lung edge; possible mediastinal shift; depressed diaphragm.\n   • MASSIVE HAEMOTHORAX: WHITE OUT (opacification) of the affected hemithorax; blunting of the costophrenic angle on upright film.\n\n' +
      '5. IMMEDIATE MANAGEMENT\n   • TENSION PNEUMOTHORAX — clinical diagnosis. IMMEDIATE NEEDLE DECOMPRESSION (large-bore needle in 2nd intercostal space midclavicular line, or 5th ICS midaxillary) → followed by a CHEST TUBE in the 5th ICS midaxillary line. High-flow oxygen, monitoring.\n   • MASSIVE HAEMOTHORAX — ABC; two LARGE-BORE IV lines; group and CROSSMATCH blood (start uncrossmatched O-negative if in extremis); insert a CHEST TUBE; if initial drainage exceeds 1500 mL or ongoing loss > 200 mL/h for several hours, prepare for EMERGENCY THORACOTOMY to find and control the bleeding vessel.\n   • Both: high-flow O₂, continuous monitoring, full trauma assessment (ATLS), keep the patient warm, and identify other injuries.',
    referenceSections: ['Thoracic Emergencies'],
  },
  {
    id: 'sdr-031',
    topic: 'urologyAndrology',
    drillKind: 'compareConditions',
    type: 'drill',
    prompt:
      'Compare BPH and PROSTATE CANCER under: nature, typical age, classic prostate feel on rectal exam, PSA pattern, symptoms, and definitive treatment.',
    marks: 10,
    rubric: [
      {
        id: 'r1',
        label: 'Nature',
        detail:
          'BPH: BENIGN enlargement of the inner (transition) zone of the prostate. PROSTATE CANCER: MALIGNANT growth, usually adenocarcinoma, mostly arising from the peripheral zone.',
        marks: 2,
      },
      {
        id: 'r2',
        label: 'Typical age and risk factors',
        detail:
          'BPH: very common in men >50; risk rises with age. Prostate cancer: age >50, African ancestry, family history (BRCA), high-fat diet — risk also rises with age.',
        marks: 2,
      },
      {
        id: 'r3',
        label: 'DRE feel of the prostate',
        detail:
          'BPH: smoothly enlarged, rubbery, symmetrical. Cancer: HARD, irregular, NODULAR, sometimes craggy and asymmetric.',
        marks: 2,
      },
      {
        id: 'r4',
        label: 'PSA pattern',
        detail:
          'BPH: PSA can be mildly raised. Prostate cancer: PSA can be significantly raised; trend over time (rising PSA) and PSA density help discriminate, but biopsy is needed to confirm.',
        marks: 2,
      },
      {
        id: 'r5',
        label: 'Symptoms and definitive treatment',
        detail:
          'BPH: outflow obstruction symptoms (weak stream, hesitancy, dribbling, nocturia). Treated with lifestyle, alpha-blockers, 5-alpha-reductase inhibitors, or TURP. Prostate cancer: often asymptomatic early; symptoms appear with advanced or metastatic disease (bone pain). Treated with surveillance, surgery (radical prostatectomy), radiotherapy, hormonal therapy ± chemotherapy depending on stage and risk.',
        marks: 2,
      },
    ],
    modelAnswer:
      '1. NATURE\n   • BPH (benign prostatic hyperplasia) — BENIGN, non-cancerous growth of the prostate. Begins in the central (transition) zone surrounding the urethra, so it directly squeezes the urine pipe.\n   • PROSTATE CANCER — MALIGNANT growth (almost always adenocarcinoma) that usually starts in the peripheral zone — the outer part of the prostate — so symptoms may not appear until late.\n\n' +
      '2. TYPICAL AGE AND RISK FACTORS\n   • BPH — very common in men over 50. Most men have some BPH by 70.\n   • Prostate cancer — usually >50 years old. Risk factors: African ancestry (much higher risk), family history (including BRCA mutations), high-fat diet, smoking. Both conditions can coexist.\n\n' +
      '3. DIGITAL RECTAL EXAMINATION (DRE) FINDINGS\n   • BPH — prostate feels SMOOTHLY ENLARGED, rubbery, and symmetric. The median sulcus (the central groove) is usually still palpable but may be flattened.\n   • Prostate cancer — prostate feels HARD, IRREGULAR, NODULAR, sometimes CRAGGY, often asymmetric. The median sulcus may be lost.\n\n' +
      '4. PSA PATTERN\n   • PSA (prostate-specific antigen) is a protein made by both normal and cancerous prostate cells.\n   • BPH — PSA may be mildly raised; level often correlates with prostate volume.\n   • Prostate cancer — PSA may be significantly raised. A rising trend is more worrying than a single value. PSA density (PSA per cc of prostate) helps distinguish BPH from cancer.\n   • Definitive distinction needs a PROSTATE BIOPSY (often template or MRI-targeted), guided by MRI when available.\n\n' +
      '5. SYMPTOMS AND DEFINITIVE TREATMENT\n   • BPH — LOWER URINARY TRACT SYMPTOMS: obstructive (slow stream, hesitancy, straining, dribbling, incomplete emptying) and irritative (frequency, urgency, nocturia). Treatments:\n     – Lifestyle (limit evening fluids, caffeine, alcohol).\n     – Alpha-blockers (e.g. tamsulosin) — relax prostate smooth muscle.\n     – 5-alpha-reductase inhibitors (e.g. finasteride) — shrink the prostate over months.\n     – Surgery: TURP (gold standard), laser prostatectomy, open prostatectomy for very large glands.\n   • Prostate cancer — often ASYMPTOMATIC EARLY. Late/metastatic disease may cause urinary obstruction, haematuria, BONE PAIN, weight loss. Treatments depend on stage and risk:\n     – Active surveillance for low-risk localised disease.\n     – RADICAL PROSTATECTOMY (open, laparoscopic, robotic).\n     – External beam RADIOTHERAPY or brachytherapy.\n     – Hormone therapy (LHRH agonists/antagonists, anti-androgens) for advanced disease.\n     – Chemotherapy / novel hormonal agents in castrate-resistant disease.\n   • Side effects to discuss: erectile dysfunction, urinary incontinence, hot flushes, bone loss.',
    referenceSections: ['Urology & Andrology'],
  },
];

// ---------- helpers ----------
export function getDrillCountByKind(): Record<SurgeryDrillKind, number> {
  const counts = {} as Record<SurgeryDrillKind, number>;
  (Object.keys(SURGERY_DRILL_LABELS) as SurgeryDrillKind[]).forEach((k) => (counts[k] = 0));
  surgeryDrills.forEach((d) => {
    counts[d.drillKind] = (counts[d.drillKind] ?? 0) + 1;
  });
  return counts;
}

export function getDrillsByKinds(kinds: SurgeryDrillKind[], n: number): SurgeryDrill[] {
  const pool = surgeryDrills.filter((d) => kinds.includes(d.drillKind));
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(n, shuffled.length));
}
