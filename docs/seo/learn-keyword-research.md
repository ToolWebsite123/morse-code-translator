# Learn Morse Code (`/learn`) — Keyword Research & Search Intent Audit

**Document Version:** 1.0  
**Target Route:** `/learn`  
**Page Type:** Educational Curriculum Hub & Course Directory  
**Status:** Approved for Content Production  
**Primary Source:** `docs/seo/Master-Keyword-Database.csv` (1,122 Deduplicated Organic Research Keywords from SEMrush export of `morsecode.world`)  

---

## 1. Data Source & Research Integrity

All metrics in this document originate strictly from the verified, deduplicated organic research database compiled in Phase 1 (`docs/seo/Master-Keyword-Database.csv`). In strict compliance with project principles:
- **Zero invented metrics:** Search volumes, keyword difficulty (KD) percentages, competitor positions, and cost-per-click values reflect verified SEMrush data only.
- **Zero fabricated competitor claims:** Competitor rankings and page paths represent confirmed URLs on `morsecode.world`.
- **Single Source of Truth:** Figures reconcile exactly with `docs/seo/SEMrush-Data-Audit.md` and `docs/seo/Keyword-Clustering.csv`.

---

## 2. Cluster Overview: `learning-lessons`

The `learning-lessons` cluster represents users seeking structured education, pedagogical guidance, and step-by-step instructions to learn International Morse Code.

| Metric | Cluster Value | Context / Benchmark |
|---|---|---|
| **Total Cluster Monthly Volume** | **6,680 searches/mo** | Dedicated learning intent |
| **Primary Target Keyword** | `learn morse code` | 2,900 searches/mo, KD 37 |
| **Average Keyword Difficulty** | **37.5%** | Moderate competition; highly rankable with comprehensive content |
| **Primary Competitor URL** | `https://morsecode.world/` | Competitor serves learning queries on root domain or scattered pages |
| **Competitor Ranking Range** | Positions 3 to 10 | Competitor holds weak page 1 rankings due to unorganized learning content |
| **Our Assigned Target URL** | `/learn` | Dedicated 10-lesson curriculum hub with local progress tracking |

---

## 3. Verified Keywords for `/learn`

The following keyword phrases from the Master Database explicitly target structured learning, beginner education, and Morse code study:

### 3.1 Primary & Secondary Target Keywords

| Keyword Phrase | Monthly Volume | KD (%) | Search Intent | Competitor Position | Competitor URL | Recommended Role on `/learn` |
|---|---|---|---|---|---|---|
| **learn morse code** | 2,900 | 37 | Educational / Informational | 9 | `morsecode.world/` | **Primary Target:** H1, Title Tag, Meta Description, Hero |
| **morse code learning resources** | 1,600 | 39 | Educational / Informational | 3 / 6 | `morsecode.world/international/trainer/` & `morsecode.world/` | **Secondary Target:** H2, Curriculum Grid Intro, Resource Section |
| **learning morse code** | 1,300 | 36 | Educational / Informational | 10 | `morsecode.world/` | **Secondary Target:** H2, Methodology & Study Guidelines |
| **learn morse** | 880 | 38 | Educational / Informational | 7 | `morsecode.world/` | **Supporting Target:** Body Copy, H3 Subheadings, CTA |

**Total Verified Cluster Volume for `/learn`:** **6,680 searches/month**.

---

### 3.2 High-Relevance Supporting Educational Queries (Broad Learning Intent)

The database includes educational and procedural queries that map naturally to `/learn` as supporting explanatory topics:

| Supporting Keyword | Volume | KD (%) | Search Intent | Current Mapping in Database | Strategic Use on `/learn` |
|---|---|---|---|---|---|
| **how to read morse code** | 1,900 | 47 | Informational | `general-morse` (`/`) | Section 4: Audio rhythm vs. dot counting |
| **how to do morse code** | 1,000 | 44 | Informational | `general-morse` (`/`) | Section 1: Beginner orientation & overview |
| **how to write morse code** | 720 | 35 | Informational | `general-morse` (`/`) | Lesson 2 & 7: Spacing & formatting rules |
| **how to write in morse code** | 590 | 4 | Informational | `general-morse` (`/`) | Low KD quick-win: Inter-character spacing guidelines |
| **how to speak morse code** | 480 | 46 | Informational | `general-morse` (`/`) | Section 4: Acoustic pronunciation (`dit` and `dah`) |
| **morse code how to write** | 480 | 55 | Informational | `general-morse` (`/`) | Formatting & transcription guidelines |
| **how to talk in morse code** | 390 | 41 | Informational | `general-morse` (`/`) | Vocalization & rhythm techniques |
| **how to do the morse code** | 390 | 41 | Informational | `general-morse` (`/`) | Course introduction & beginner foundations |
| **easy morse code** | 320 | 50 | Informational | `general-morse` (`/`) | Lesson 3: E, T, I, M, S, O foundation |
| **how to read the morse code** | 260 | 23 | Informational | `general-morse` (`/`) | Audio decoding methodology |
| **how do you read morse code** | 260 | 34 | Informational | `general-morse` (`/`) | FAQ & curriculum overview |
| **how to decipher morse code** | 170 | 4 | Informational | `general-morse` (`/`) | Contextual link to `/` translator & decoding tips |
| **read morse** | 1,300 | 45 | Informational | `general-morse` (`/`) | Audio reading overview |

---

## 4. Cannibalization Defense & Keyword Boundaries

To prevent search engine confusion and internal competition, strictly enforce the following keyword boundaries:

```
┌────────────────────────────────────────────────────────────────────────┐
│  Target URL: /learn                                                    │
│  Primary Keywords: learn morse code, learning morse code, learn morse  │
│  Intent: Educational, Curriculum, Course, Study Guide, Methodology    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ MUST NOT TARGET:
          ┌─────────────────────────┼─────────────────────────┐
          ▼                         ▼                         ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│ Target URL: /    │      │ Target URL:      │      │ Target URL:      │
│                  │      │ /reference       │      │ /practice        │
│ Core Keywords:   │      │ Core Keywords:   │      │ Core Keywords:   │
│ morse code       │      │ morse code       │      │ morse code       │
│ translator,      │      │ alphabet, morse  │      │ practice, morse  │
│ morse code       │      │ code chart,      │      │ code trainer,    │
│ generator,       │      │ morse code       │      │ morse code key,  │
│ converter        │      │ letters          │      │ speed drills     │
└──────────────────┘      └──────────────────┘      └──────────────────┘
```

### 4.1 Strict Exclusion Matrix

1. **Do NOT Target Translator / Converter Intent on `/learn`:**
   - Queries like `morse code translator` (246,000 vol), `morse code generator` (12,100 vol), and `morse code converter` (8,100 vol) belong exclusively to `/`.
   - On `/learn`, the translator is referenced strictly as an interactive utility tool to test phrases learned in lessons.
2. **Do NOT Target Alphabet / Chart Lookup Intent on `/learn`:**
   - Queries like `morse code alphabet` (40,500 vol), `morse code chart` (9,900 vol), and `morse code letters` (2,400 vol) belong exclusively to `/reference`.
   - `/learn` links to `/reference` for quick character reference, but does not present itself as a lookup directory.
3. **Do NOT Target Drill / Practice Game Intent on `/learn`:**
   - Queries like `morse code practice` (1,600 vol), `morse code trainer` (1,300 vol), and `morse code key` (1,900 vol) belong to `/practice`.
   - `/learn` serves as the instructional foundation; `/practice` serves as the speed-building drill arena.
4. **Do NOT Target Emergency / SOS Historical Queries on `/learn`:**
   - Queries like `code morse sos` (14,800 vol) and `sos in morse code` (9,900 vol) belong to `/morse-code-sos`.

---

## 5. Search Intent Analysis

Search intent for `learn morse code` and `learning morse code` is **Informational & Educational**. Users searching these terms have clear cognitive motivations and expectations:

### 5.1 User Personas & Pain Points

1. **The Complete Beginner (Zero Prior Knowledge):**
   - *Question:* "Where do I start? How hard is it to learn Morse code? How long does it take?"
   - *Pain Point:* Overwhelmed by looking at a giant 54-character table. Trying to memorize 26 letters alphabetically leads to fast burnout.
   - *Our Solution:* A clear 10-lesson roadmap starting with single-element letters (E and T) and building progressively.
2. **The Amateur Radio (HAM) Aspirant:**
   - *Question:* "How do I pass the CW (continuous wave) exam or get on the air at 15–20 WPM?"
   - *Pain Point:* Visual counting of dots and dashes makes high-speed listening impossible.
   - *Our Solution:* Emphasizing auditory rhythm (`dit` and `dah`), the PARIS timing standard, and transition to audio drills.
3. **The Survivalist / Emergency Preparedness Learner:**
   - *Question:* "How do I signal SOS, numbers, and basic distress words using sound or light?"
   - *Pain Point:* Forgetting spacing rules and punctuation conventions in high-stress situations.
   - *Our Solution:* Dedicated coverage of word boundaries (slash separator `/`), number symmetry, and emergency prosigns.
4. **The Hobbyist / Puzzle Enthusiast:**
   - *Question:* "How do I encode secret messages or read Morse in games and escape rooms?"
   - *Pain Point:* Lack of immediate interactive validation.
   - *Our Solution:* Interactive lesson exercises, audio playback previews, and local progress tracking with zero sign-up friction.

---

## 6. Competitor Gap Analysis (`morsecode.world` vs. Our Platform)

Analysis of `morsecode.world`'s organic rankings reveals major content and UX weaknesses:

| Evaluation Dimension | Competitor (`morsecode.world`) | Our Platform (`/learn`) | Competitive Advantage |
|---|---|---|---|
| **Curriculum Structure** | Fragmented across `/international/trainer/`, `/trainer/generator.html`, `/trainer/keyer.html`, and raw tools without a unified linear course. | Unified 10-Lesson progressive curriculum with explicit completion sequence (Lesson 1 to 10). | Clear pedagogical roadmap prevents learner confusion. |
| **Progress Persistence** | Requires cookies / session state; lacks a clean visual progress dashboard. | Modern browser-local `localStorage` progress engine with real-time percentage bar, completed checkmarks, and reset controls. | Zero account friction, 100% private, survives page refreshes. |
| **Mobile & Touch UX** | Desktop-oriented retro UI with small text and non-accessible buttons. | 2026 responsive design system, $\ge 44\times 44\text{px}$ touch targets, WCAG AA contrast, and dark mode. | Seamless mobile learning on phones and tablets. |
| **Audio Integration** | Audio tools exist but are separated from instructional text. | Audio playback previews integrated directly into lessons at standard WPM speeds (HTML5 Web Audio API). | Multi-sensory learning: see, hear, and test immediately. |
| **Ecosystem Flow** | Broken or confusing internal links between translator, reference, and trainer. | Cohesive ecosystem: `/learn` directly feeds into `/practice` (drills) and `/quiz` (assessments). | Higher user engagement and session duration. |

---

## 7. Recommended Target Page Specifications

- **Page URL:** `https://morse-code-translator.org/learn` (dynamic canonical via `siteConfig.ts`)
- **Target Primary Keyword:** `learn morse code` (2,900 vol, KD 37)
- **Target Secondary Keywords:** `morse code learning resources` (1,600 vol), `learning morse code` (1,300 vol), `learn morse` (880 vol)
- **Primary H1:** `Learn International Morse Code: Step-by-Step Curriculum`
- **Recommended Title Tag:** `Learn Morse Code — Free 10-Lesson Interactive Beginner Course` (60 chars)
- **Recommended Meta Description:** `Learn International Morse Code with our free, interactive 10-lesson course. Master dots, dashes, alphabet letters, numbers, timing, and audio rhythm step by step.` (159 chars)
- **Structured Data:** `Course` schema (linking all 10 lessons), `BreadcrumbList` schema, and `FAQPage` schema.

