# Level 100 EEE - course source-extract status

Tracks source material extracted into `docs/<course>/source-extracts/` to feed
future question-bank generation. Authoritative course/topic list:
`electrical-engineering/Level100_EEE_Second_Semester_Courses_and_Topics.pdf`.

| Course | Status | Source extract | Coverage |
|--------|--------|----------------|----------|
| Applied Electricity | shipped (merged to main) | `docs/appliedElectricity/` | full |
| Engineering Materials | shipped | `docs/materials/` | full |
| Calculus | shipped | (generators + banks) | full |
| Renewable Energy | extracted | `renewable-energy-deck.txt` (~8k words) | good; missing storage/smart-grid/efficiency/economics |
| French | extracted | 3 unit decks (P1-P3) | good for shopping/restaurant/plans units |
| Environmental Studies | extracted | `intro-environmental-studies.txt` (37 slides) | good intro; **not on official syllabus - confirm** |
| Leadership and Development | thin | 2 short student pieces | narrow; missing most of syllabus |
| African Studies | **no source** | README gap note only | none |
| Ethics of Hard Work | **no source** | README gap note only | none |

## Notes / decisions needed

1. **Syllabus mismatch.** The official PDF lists **Ethics of Hard Work** as the
   8th non-STEM course. A previous memory said "Environmental Studies". A source
   PDF exists only for Environmental Studies, not Ethics of Hard Work. Confirm
   which is the real course before building.
2. **Copyrighted textbooks not extracted** (Renewable Energy textbook, per the
   materials-course precedent). Only student-provided decks/notes are used.
3. **Legacy `.ppt`** (Renewable Energy) was extracted via raw PowerPoint text
   atoms because no `soffice`/`catppt`/`libreoffice` is installed. Order is
   approximate. Installing LibreOffice would give a cleaner re-extract.
4. **Gaps** (African Studies, Ethics of Hard Work, most of Leadership) need
   either more source from the student or general-knowledge authoring against
   the syllabus topic lists.
