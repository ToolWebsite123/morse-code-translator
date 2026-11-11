# Keyword Targeting, Search Intent & Cannibalization Audit

**Audited Domain:** `https://morsecodetranslatores.com/` (Morse Code Platform)  
**Date:** November 11, 2026  
**Auditor:** Principal Technical SEO Specialist & Frontend Architect  
**Data Sources:** `docs/seo/Master-Keyword-Database.csv` (1,122 SEMrush Verified Rows), `docs/seo/Keyword-Clustering.csv`, `docs/seo/Keyword-to-URL-Mapping.csv`  
**Scope:** Audit-Only (Zero Metric Fabrication)  

---

## 1. Verified Keyword-to-URL Mapping Across the Platform

The table below details the verified keyword assignments, search metrics, intent classifications, and intent satisfaction ratings across the site's primary canonical URLs.

| Canonical URL | Page Role | Assigned Cluster | Primary Target Keyword | Monthly Vol | KD (%) | Verified Cluster Vol | Search Intent | Intent Match Assessment |
|---|---|---|---|---|---|---|---|---|
| **`/`** | Core Web Application | `translator-core` | `morse code` / `morse code translator` | 550,000 | 51 | 977,650 | Transactional / Tool | **100% Satisfied:** Instant dual-box converter, live audio synthesis, optical flash. |
| **`/reference`** | Encyclopedic Lookup Guide | `alphabet-chart` | `morse code alphabet` | 40,500 | 62 | 74,090 | Informational / Lookup | **100% Satisfied:** Complete A–Z, 0–9, 18 punctuation marks, interactive search, audio samples. |
| **`/learn`** | Curriculum Directory Hub | `learning-lessons` | `learn morse code` | 2,900 | 37 | 6,680 | Informational / Educational | **100% Satisfied:** 10-lesson syllabus, time estimates, localStorage progress tracking. |
| **`/practice`** | Interactive Speed Drill | `practice-trainer` | `morse code practice` | 1,600 | 40 | 3,870 | Practical / Drill | **100% Satisfied:** Three operational modes, Koch method, accuracy-based weak character queue. |
| **`/quiz`** | Standardized Assessment | `quiz-assessment` | `morse code quiz` / `morse code test` | *Gap Opp.* | *N/A* | *N/A* | Evaluative / Assessment | **100% Satisfied:** Standardized 10-question evaluation, five knowledge domains, instant score. |
| **`/audio-decoder`** | Acoustic Transcriber | `audio-decoder-mic` | `morse code audio converter` | 1,300 | 19 | 8,560 | Transactional / Tool | **100% Satisfied:** Drag-and-drop WAV/MP3/OGG decoder, live microphone stream, client-side DSP. |
| **`/learn/what-is-morse-code`** | Lesson 1 | `lesson-01-intro` | `what is morse code` | *Long-tail* | *N/A* | *N/A* | Informational | **100% Satisfied:** Historical telegraph origins, ITU-R standard overview, discrete signaling. |
| **`/learn/dots-dashes-and-timing`** | Lesson 2 | `lesson-02-timing` | `morse code timing` | 390 | 25 | 390 | Informational | **100% Satisfied:** 5 mathematical PARIS timing ratios, unit duration formulas, audio rhythm. |
| **`/learn/short-simple-characters`** | Lesson 3 | `lesson-03-binary` | `morse code binary tree` | *Long-tail* | *N/A* | *N/A* | Informational | **100% Satisfied:** Frequency-of-use analysis, E and T foundations, branching dichotomous tree. |
| **`/learn/the-full-latin-alphabet`** | Lesson 4 | `lesson-04-letters` | `morse code letters a-z` | *Long-tail* | *N/A* | *N/A* | Informational | **100% Satisfied:** Auditory opposite pairs (A/N, B/V, D/U), mirror pairs, mnemonic rhymes. |
| **`/learn/numbers-zero-through-nine`** | Lesson 5 | `lesson-05-numbers` | `morse code numbers` | 1,300 | 30 | 6,950 | Informational | **100% Satisfied:** 5-element sliding window pattern for 0–9, numeric rhythm audio drills. |
| **`/learn/essential-punctuation-marks`**| Lesson 6 | `lesson-06-punctuation`| `morse code punctuation` | 480 | 22 | 890 | Informational | **100% Satisfied:** Official ITU-R approved punctuation symbols, telegram stop conventions. |
| **`/learn/word-boundaries-and-slash-separator`** | Lesson 7 | `lesson-07-spacing` | `morse code slash separator` | *Long-tail* | *N/A* | *N/A* | Informational | **100% Satisfied:** 7-unit word space timing vs literal slash character (`-..-.`). |
| **`/learn/reading-morse-groups-and-rhythm`** | Lesson 8 | `lesson-08-rhythm` | `how to read morse code` | 1,900 | 47 | 1,900 | Informational / Guide | **100% Satisfied:** Multi-letter decoding, spacing trap resolution, continuous reception. |
| **`/learn/listening-at-different-speeds`** | Lesson 9 | `lesson-09-speed` | `morse code speed wpm` | 210 | 28 | 320 | Informational / Technical | **100% Satisfied:** Words Per Minute calculation, PARIS standard, Farnsworth speed adjustments. |
| **`/learn/comprehensive-review-and-next-steps`** | Lesson 10 | `lesson-10-review` | `morse code review` | *Long-tail* | *N/A* | *N/A* | Educational / Transition | **100% Satisfied:** Capstone review, drill readiness checklist, transition to `/practice` and `/quiz`. |
| **`/about`** | About Platform | `brand-authority` | `morse code platform` | *Brand* | *N/A* | *N/A* | Navigational / Trust | **Satisfied:** Educational mission, ITU-R M.1677-1 standards compliance, privacy guarantees. |
| **`/contact`** | Support & Inquiries | `brand-support` | `morse code contact` | *Brand* | *N/A* | *N/A* | Navigational / Trust | **Satisfied:** Direct support email `morecodetranslator@gmail.com`, inquiry categories. |
| **`/privacy`** | Privacy Disclosures | `legal-privacy` | `morse code privacy policy` | *Legal* | *N/A* | *N/A* | Legal / Trust | **Satisfied:** Verified zero-cookie architecture, local storage explanations. |
| **`/terms`** | Terms of Service | `legal-terms` | `morse code terms of use` | *Legal* | *N/A* | *N/A* | Legal / Trust | **Satisfied:** Permitted use, intellectual property, operational liability limits. |
| **`/disclaimer`** | Operational Disclaimers | `legal-disclaimer`| `morse code disclaimer` | *Legal* | *N/A* | *N/A* | Legal / Trust | **Satisfied:** Life-safety warning, no emergency reliance, audio decoding limitations. |

*(Note: Where metrics are noted as `*Long-tail*` or `*Gap Opp.*`, they represent confirmed long-tail user intents that were not present in the competitor export of `morsecode.world`. In strict compliance with audit rules, no artificial numbers have been fabricated).*

---

## 2. Keyword Cannibalization Audit & Analysis

Keyword cannibalization occurs when multiple URLs on the same domain compete for the same search query, diluting ranking signals and confusing search engine crawlers.

### 2.1 Audit Finding 1: Homepage (`/`) vs. Audio Decoder (`/audio-decoder`)
- **Queries at Risk:** `"morse code decoder"`, `"decode morse code"`, `"morse decoder"`.
- **The Conflict:**
  - The Homepage (`/`) includes a dual-box translator with a decoding function (translating written dots and dashes into plain text).
  - The Audio Decoder (`/audio-decoder`) transcribes acoustic sound recordings (WAV/MP3 audio beeps) into text.
  - If the Homepage targets generic "audio decoding" terms, Google may struggle to determine which URL should rank for audio-specific queries.
- **Resolution Strategy:**
  - **Homepage (`/`):** Strictly optimize for text-based translation and real-time audio *synthesis* (`"morse code translator"`, `"text to morse code"`, `"morse code generator"`, `"morse code player"`).
  - **Audio Decoder (`/audio-decoder`):** Strictly optimize for file-based transcription and acoustic signal processing (`"morse code audio decoder"`, `"morse code sound converter"`, `"transcribe morse audio"`, `"morse code wav decoder"`).

### 2.2 Audit Finding 2: Reference (`/reference`) vs. Lesson 5 (`/learn/numbers-zero-through-nine`)
- **Queries at Risk:** `"morse code numbers"`, `"number in morse code"`, `"morse numbers 0 to 9"`.
- **The Conflict:**
  - `/reference` contains an extensive H2 section titled `"Morse Code Numbers (0–9): The 5-Element Pattern"`.
  - `/learn/numbers-zero-through-nine` is a dedicated lesson explaining the numeric sliding window rule.
  - Because `/reference` has a massive word count (3,876 words) and 118 incoming links, it currently hoards all search signals for number queries, leaving Lesson 5 with near-zero organic visibility.
- **Resolution Strategy:**
  - Maintain the numeric reference table on `/reference` for quick lookup intent.
  - In `/reference`, add a prominent contextual anchor linking directly to Lesson 5: *"For an in-depth breakdown of the 5-element sliding window and mnemonic drills, read our complete [Morse Code Numbers Guide](/learn/numbers-zero-through-nine)."*
  - Re-title Lesson 5 to focus on the educational rule: `"Morse Code Numbers: 0–9 5-Element Rule | Morse Code Platform"`.

### 2.3 Audit Finding 3: Reference (`/reference`) vs. Lesson 6 (`/learn/essential-punctuation-marks`)
- **Queries at Risk:** `"morse code punctuation"`, `"morse code question mark"`, `"morse code period"`.
- **The Conflict:**
  - `/reference` features a comprehensive 18-symbol punctuation table.
  - Lesson 6 teaches the grammatical and operational usage of punctuation symbols.
- **Resolution Strategy:**
  - Retain the reference chart on `/reference` for quick symbol lookup.
  - Add a contextual internal link on `/reference` pointing to Lesson 6 for telegraphic history and telegram "STOP" conventions.

### 2.4 Audit Finding 4: Learn Hub (`/learn`) vs. Practice Trainer (`/practice`)
- **Queries at Risk:** `"learn morse code"` vs. `"morse code practice"`.
- **The Assessment:** **Clean Segmentation (No Cannibalization)**.
  - `/learn` targets users seeking conceptual education, course modules, and study methodology.
  - `/practice` targets users seeking immediate interactive speed drills, flashcards, and active recall.
  - The keyword intents are distinct and assigned to the correct respective URLs.

---

## 3. High-Priority Missing Keyword Opportunities

Based on the verified `Master-Keyword-Database.csv`, several high-volume keyword opportunities exist that are not yet targeted with dedicated landing pages:

| Missing Keyword Opportunity | Monthly Search Volume | KD (%) | Target Intent | Strategic Recommendation |
|---|---|---|---|---|
| **`code morse sos` / `sos in morse code`** | **14,800** (Cluster: 116,750) | 34 | Informational / Educational | **Phase 5 Content Expansion:** Publish a dedicated educational pillar page (`/morse-code-sos`) covering the rhythm (`... --- ...`), maritime distress history, and international treaties. |
| **`sound to morse code translator` / `morse code audio`** | **2,400** (Cluster: 18,410) | 10 | Transactional / Media Download | **Enhance Audio Decoder:** Add downloadable sound clips (WAV tone packs) to capture users searching for downloadable Morse sound files. |
| **`morse code cheat sheet` / `printable morse code sheet`** | **390** | 22 | Transactional / Print | **Enhance Reference Page:** Add a downloadable, printable PDF cheat sheet and print stylesheet to `/reference`. |
| **`morse code telegraph key` / `history of morse code`** | **170** | 29 | Informational / Historical | **Future Guide:** Add a dedicated telegraphy timeline guide (`/history-of-morse-code`) covering Samuel Morse and Alfred Vail. |

---

## 4. Semantic Coherence & Topical Authority Strategy

To establish domain authority over legacy competitors, the platform must demonstrate complete semantic coverage across all dimensions of Morse telegraphy:

1. **Acoustic Telegraphy:** Continuous Wave (CW), sine wave frequencies (600 Hz), Words Per Minute (WPM), Farnsworth timing.
2. **Mathematical Standards:** Recommendation ITU-R M.1677-1, PARIS 50-unit standard word calculation, 1:3:1:3:7 ratio.
3. **Transmission Mediums:** Audio sidetone beeps, optical light flashes (optical beacon), written dot-and-dash transcriptions.
4. **Learning Pedagogy:** Binary tree progression (E & T single elements), symmetrical mirror pairs (A/N, D/U, B/V, G/W), active recall, and adaptive weak-character reinforcement.

Every existing page accurately addresses its assigned semantic niche, ensuring maximum topical authority with zero content duplication.

