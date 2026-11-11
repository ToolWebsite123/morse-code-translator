# Reference Page (`/reference`) — Verified Keyword Research & Intent Audit

**Target URL:** `/reference`  
**Audit Date:** November 10, 2026  
**Data Sources Verified:**
- `docs/seo/Master-Keyword-Database.csv` (1,000 deduplicated keywords from verified `morsecode.world` US SEMrush organic export)
- `docs/seo/Keyword-Clustering.csv` & `docs/seo/Keyword-to-URL-Mapping.csv`
- `docs/seo/SEMrush-Data-Audit.md`, `docs/seo/Competitor-Content-Gap.md`, `docs/seo/Content-Roadmap.md`, `docs/seo/Keyword-Opportunity-Priority.md`
- Raw SEMrush export cross-check (`media_1794306545778_6fb5bb20.csv` — 0 metric discrepancies across all 138 extracted rows)

---

## 1. Executive Summary & Data Verification Audit

### 1.1 Overview of Extracted Dataset
To build an evidence-backed SEO strategy for `/reference` without inventing or extrapolating data, we audited all 1,000 rows in `docs/seo/Master-Keyword-Database.csv` for every query related to the Morse code alphabet, charts, letters, numbers, punctuation, symbols, International Morse Code standards, and single-character reference lookups.

- **Total Candidate Keywords Extracted:** **138 keywords** (**106,420** combined monthly US search volume)
- **Strictly Relevant to `/reference` (Primary + Secondary + Groups A–F):** **108 keywords** (**97,650** monthly search volume)
- **Weak / Excluded from `/reference` (Groups W1–W6):** **30 keywords** (**8,770** monthly search volume — excluded due to active translator tool intent, telegraph key hardware intent, NATO phonetic alphabet mismatch, non-English query, or standalone printable sheet intent)

### 1.2 Mandatory Verification of Prompt & Roadmap Seed Terms
Per strict data integrity rules, **no search volume or Keyword Difficulty (KD) score has been invented or estimated**. Below is the exact verification status of every seed phrase requested in the Phase 2 prompt and earlier roadmap documents against `docs/seo/Master-Keyword-Database.csv`:

| Seed Phrase / Topic | Present in `Master-Keyword-Database.csv`? | Verified Volume | Verified KD | Closest Verified Queries in Dataset (with Volume & KD) |
|---|---|---:|---:|---|
| `morse code alphabet` | **YES (Exact Match)** | 40,500 | 62 | `alphabet in morse code` (880, KD 30) |
| `morse code chart` | **YES (Exact Match)** | 9,900 | 16 | `morse code chart'` (390, KD 14), `more code chart` (210, KD 25) |
| `morse code letters` | **NO (Exact string absent)** | — | — | `letters morse code` (1,000, KD 48), `letters in morse code` (880, KD 52), `morse code letter` (480, KD 54), `morse code letter chart` (210, KD 47) |
| `morse code numbers` | **NO (Exact string absent)** | — | — | `number morse code` (1,300, KD 30), `numbers in morse code` (1,000, KD 23), `morse code number` (1,000, KD 53), `morse code with numbers` (720, KD 22), `morse code for numbers` (320, KD 21), `morese code numbers` (70, KD n/a) |
| `morse code punctuation` | **YES (Exact Match)** | 320 | 16 | `question mark morse code` (260, KD 23), `question mark in morse code` (260, KD 20), `period in morse code` (90, KD 34), `is there punctuation in morse code` (40, KD 25) |
| `morse code symbols` | **YES (Exact Match)** | 390 | 28 | `morse code symbol` (260, KD 22) |
| `international morse code` | **YES (Exact Match)** | 1,600 | 53 | `code morse international` (880, KD 52), `morse code international` (210, KD 37) |
| `international morse code chart` | **YES (Exact Match)** | 260 | 41 | `morse code chart alphabet` (260, KD 34), `alphabet morse code chart` (170, KD 24) |
| `morse code table` | **YES (Exact Match)** | 480 | 30 | `morse code list` (260, KD 34), `list of morse code` (210, KD 34), `morse codes list` (170, KD 38), `morse code guide` (390, KD 44) |
| `morse code reference` | **NO (Exact string absent)** | — | — | Use as natural descriptive UX copy; do not assign search volume |
| `morse alphabet` | **NO (Exact string absent)** | — | — | `morse code alphabet` (40,500, KD 62), `alphabet in morse code` (880, KD 30) |
| `morse code alphabet chart` | **NO (Exact string absent)** | — | — | `morse code chart alphabet` (260, KD 34), `alphabet morse code chart` (170, KD 24) |
| `morse code cheat sheet` | **YES (Exact Match)** | 390 | 22 | Mapped to proposed `/morse-code-sheet` in roadmap; weak/secondary for `/reference` until print CSS/sheet is built |
| `morse code sheet` / `morse code printable` / `morse code alphabet pdf` / `printable morse code chart` | **NO (Exact strings absent)** | — | — | Earlier roadmap documents listed these as target themes without verified CSV rows. Exclude PDF/printable claims from `/reference` because PDF download and `@media print` CSS are not implemented |

---

## 2. Cluster Summary Table

| Group ID | Cluster Name | Keyword Count | Total Monthly Volume | Relevance to `/reference` | Primary Strategic Role on `/reference` |
|---|---|---:|---:|---|---|
| **P** | **Primary Target (`morse code alphabet`)** | 1 | 40,500 | **High** | Page Title, H1, Lead Paragraph, H2 (A–Z Section), Schema |
| **S** | **Secondary Target (`morse code chart`)** | 1 | 9,900 | **High** | Page Title, H1, Interactive Chart Header, How-to H2 |
| **A** | **Alphabet & Letter Variants** | 18 | 8,020 | **High** | H2 (`A–Z Morse Code Alphabet`), H3 subheadings, Body, FAQ |
| **B** | **Chart / Table / List / Guide Variants** | 9 | 2,440 | **High** | H2 (`How to Read & Use the Chart`), Table captions, Meta Description |
| **C** | **International Morse Code Standards** | 3 | 2,690 | **High** | H1 modifier, H2 (`International Morse Code`), ITU explanation, FAQ |
| **D** | **Numbers (0–9) Reference** | 7 | 4,520 | **High / Medium*** | Dedicated H2 (`Morse Code Numbers 0–9`) + 10-digit pattern table |
| **E** | **Punctuation & Symbols Reference** | 7 | 1,620 | **High** | Dedicated H2 (`Morse Code Punctuation & Symbols`) + 18-symbol table + FAQ |
| **F** | **Single-Character Lookups (Long Tail)** | 62 | 27,960 | **Medium (Long-Tail)** | Captured organically by the 54-row HTML reference tables & search filter |
| **Subtotal** | **All Relevant `/reference` Keywords (P+S+A–F)** | **108** | **97,650** | **High / Medium** | **Core target universe for `/reference`** |
| **W1** | Translator-Modified Alphabet/Number Queries | 16 | 3,620 | **Exclude (Belongs to `/`)** | Active conversion tool intent — served by Homepage `/` |
| **W2** | Telegraph-Key Hardware Queries | 4 | 2,920 | **Exclude** | Hardware/keyer topic (`morse code key`, `straight key morse`) |
| **W3** | NATO Phonetic Alphabet Queries | 5 | 900 | **Exclude** | Feature not implemented on `/reference` |
| **W4** | Non-English Query (`morse code tabelle`) | 1 | 480 | **Exclude** | German-language query |
| **W5** | Printable Cheat Sheet (`morse code cheat sheet`) | 1 | 390 | **Weak** | Mapped to future `/morse-code-sheet`; no print CSS on `/reference` yet |
| **W6** | Navigational / Specific Word Queries | 3 | 460 | **Exclude** | Competitor subpath or specific word translation (`HOPE`) |
| **Subtotal** | **Weak / Excluded Keywords (W1–W6)** | **30** | **8,770** | **Weak / Exclude** | **Excluded from `/reference` targeting** |
| **TOTAL** | **All Audited Candidate Keywords** | **138** | **106,420** | — | — |

*\*Note on Group D (Numbers 0–9): Until a dedicated `/morse-code-numbers` guide is approved and created in a future phase, `/reference` is the only existing indexable page containing the complete 0–9 digit mapping and therefore serves as the primary canonical home for number chart lookups.*

---

## 3. Complete Verified Keyword Inventory — Relevant to `/reference` (108 Keywords)

### 3.1 Primary & Secondary Focus Keywords (2 Keywords | 50,400 Volume)

| Keyword | Search Volume | KD | Search Intent (SEMrush) | Current Mapping (`Keyword-to-URL-Mapping.csv`) | Competitor Rank (`morsecode.world`) | Competitor Ranking URL | Relevance to `/reference` | Recommended Usage |
|---|---:|---:|---|---|---:|---|---|---|
| `morse code alphabet` | 40,500 | 62 | Informational | `/reference` | #7 | `/international/morse2.html` | **High** | Title, H1, Intro Paragraph, H2 (A–Z Section), Schema |
| `morse code chart` | 9,900 | 16 | Informational | `/reference` | #1 | `/international/morse2.html` | **High** | Title, H1, Intro Paragraph, H2 (How to Read Chart), Table Caption |

### 3.2 Group A — Alphabet & Letter Variants (18 Keywords | 8,020 Volume)

| Keyword | Search Volume | KD | Search Intent (SEMrush) | Current Mapping | Competitor Rank | Competitor Ranking URL | Relevance to `/reference` | Recommended Usage |
|---|---:|---:|---|---|---:|---|---|---|
| `letter a morse code` | 1,600 | 34 | Informational | `/` *(Re-map to `/reference`)* | #1 | `/international/translator.html` | **High** | A–Z Table Row `A`, How-to Example |
| `letters morse code` | 1,000 | 48 | Informational | `/reference` | #3 | `/international/translator.html` | **High** | H2 (`Letters A–Z`), Intro Body |
| `letters in morse code` | 880 | 52 | Informational | `/reference` | #2 | `/international/translator.html` | **High** | H2 / Intro Body, FAQ |
| `alphabet in morse code` | 880 | 30 | Informational | `/reference` | #2 | `/international/translator.html` | **High** | Intro Body, A–Z Section Lead |
| `morse code letter l` | 590 | 54 | Informational | `/` *(Re-map to `/reference`)* | #1 | `/international/translator.html` | **Medium** | A–Z Table Row `L` (`.-..`) |
| `morse code letter r` | 480 | 28 | Informational | `/` *(Re-map to `/reference`)* | #1 | `/international/translator.html` | **Medium** | A–Z Table Row `R` (`.-.`) |
| `morse code letter` | 480 | 54 | Informational | `/` *(Re-map to `/reference`)* | #4 | `/international/translator.html` | **High** | Category Filter Tab (`Letters`), Body |
| `letter a in morse code` | 390 | 43 | Informational | `/` *(Re-map to `/reference`)* | #4 | `/international/morse2.html` | **High** | A–Z Table Row `A`, Body Example |
| `letter i in morse code` | 320 | 27 | Informational | `/` *(Re-map to `/reference`)* | #1 | `/international/translator.html` | **Medium** | A–Z Table Row `I` (`..`) |
| `morse code chart alphabet` | 260 | 34 | Informational | `/reference` | #3 | `/international/morse2.html` | **High** | Meta Description, A–Z Table Intro |
| `morse code alphabet and numbers` | 260 | 33 | Informational | `/morse-code-numbers` *(Also `/reference`)* | #5 | `/international/morse2.html` | **High** | Lead Paragraph, Meta Description |
| `morse code letter chart` | 210 | 47 | Informational | `/reference` | #4 | `/international/morse2.html` | **High** | H2 / H3 A–Z Section |
| `alphabet morse code chart` | 170 | 24 | Informational | `/reference` | #3 | `/international/morse2.html` | **High** | Body Copy |
| `morse code to letters` | 140 | 38 | Informational | `/reference` | #1 | `/international/translator.html` | **Medium** | How to Read Chart Section + Link to `/` |
| `what letter is in morse code` | 110 | 49 | Informational | `/` *(Shared with `/reference`)* | #1 | `/international/translator.html` | **Medium** | Search Filter Instructions, FAQ |
| `letter morse code` | 90 | 33 | Informational | `/` *(Re-map to `/reference`)* | #1 | `/international/translator.html` | **Medium** | A–Z Table Header |
| `morse code for letter r` | 90 | 15 | Informational | `/reference` | #2 | `/international/morse2.html` | **Medium** | A–Z Table Row `R` (`.-.`) |
| `morse code to alphabet` | 70 | 37 | Informational | `/reference` | #1 | `/international/translator.html` | **Medium** | How to Read Chart Section |

### 3.3 Group B — Chart, Table, List & Guide Variants (9 Keywords | 2,440 Volume)

| Keyword | Search Volume | KD | Search Intent (SEMrush) | Current Mapping | Competitor Rank | Competitor Ranking URL | Relevance to `/reference` | Recommended Usage |
|---|---:|---:|---|---|---:|---|---|---|
| `morse code table` | 480 | 30 | Informational | `/reference` | #3 | `/international/morse2.html` | **High** | H2 / H3, Intro Body, Table Caption |
| `morse code guide` | 390 | 44 | Informational | `/reference` | #3 | `/international/morse2.html` | **High** | H2 (`How to Read & Use This Guide`), Body |
| `morse code chart'` | 390 | 14 | Informational | `/reference` | #5 | `/international/morse2.html` | **High** | Captured via `morse code chart` |
| `international morse code chart` | 260 | 41 | Informational | `/reference` | #1 | `/international/morse2.html` | **High** | H1 / H2, Meta Description, Intro |
| `morse code list` | 260 | 34 | Informational | `/` *(Re-map to `/reference`)* | #2 | `/international/morse2.html` | **High** | Intro Body, Complete 54-Character Section |
| `list of morse code` | 210 | 34 | Informational | `/` *(Re-map to `/reference`)* | #2 | `/international/morse2.html` | **High** | Body Copy |
| `more code chart` | 210 | 25 | Informational | `/reference` | #3 | `/international/morse2.html` | **Medium** | Misspelling captured naturally by `morse code chart` |
| `morse codes list` | 170 | 38 | Informational | `/` *(Re-map to `/reference`)* | #1 | `/international/morse2.html` | **High** | Body Copy |
| `morse code chart h o p e` | 70 | n/a | Informational | `/reference` | #1 | `/international/translator.html` | **Low / Medium** | Word-building example in How-to Section |

### 3.4 Group C — International Morse Code Standards (3 Keywords | 2,690 Volume)

| Keyword | Search Volume | KD | Search Intent (SEMrush) | Current Mapping | Competitor Rank | Competitor Ranking URL | Relevance to `/reference` | Recommended Usage |
|---|---:|---:|---|---|---:|---|---|---|
| `international morse code` | 1,600 | 53 | Informational | `/` *(Re-map primary informational to `/reference`)* | #1 | `/international/morse2.html` | **High** | H1, H2 (`International Morse Code Alphabet`), FAQ |
| `code morse international` | 880 | 52 | Informational | `/` *(Re-map to `/reference`)* | #1 | `/international/morse2.html` | **Medium** | Captured semantically by `International Morse Code` |
| `morse code international` | 210 | 37 | Informational | `/` *(Re-map to `/reference`)* | #1 | `/international/morse2.html` | **High** | Body Copy, ITU Standard Explanation |

### 3.5 Group D — Numbers (0–9) Reference (7 Keywords | 4,520 Volume)

| Keyword | Search Volume | KD | Search Intent (SEMrush) | Current Mapping | Competitor Rank | Competitor Ranking URL | Relevance to `/reference` | Recommended Usage |
|---|---:|---:|---|---|---:|---|---|---|
| `number morse code` | 1,300 | 30 | Informational | `/morse-code-numbers` *(Currently served by `/reference`)* | #1 | `/international/translator.html` | **High** | H2 (`Morse Code Numbers 0–9`), Table |
| `numbers in morse code` | 1,000 | 23 | Informational | `/morse-code-numbers` *(Currently served by `/reference`)* | #1 | `/international/translator.html` | **High** | H2 / Lead Paragraph of Numbers Section, FAQ |
| `morse code number` | 1,000 | 53 | Informational | `/morse-code-numbers` *(Currently served by `/reference`)* | #1 | `/international/translator.html` | **High** | Numbers Section Body, Table Header |
| `morse code with numbers` | 720 | 22 | Informational | `/morse-code-numbers` *(Currently served by `/reference`)* | #1 | `/international/translator.html` | **High** | Intro Paragraph, Numbers Section |
| `morse code for numbers` | 320 | 21 | Informational | `/morse-code-numbers` *(Currently served by `/reference`)* | #1 | `/international/translator.html` | **High** | Numbers Section Body |
| `morse code to numbers` | 110 | 33 | Informational | `/morse-code-numbers` *(Currently served by `/reference`)* | #1 | `/international/translator.html` | **Medium** | Numbers 5-Element Pattern Explanation |
| `morese code numbers` | 70 | n/a | Informational | `/morse-code-numbers` | #1 | `/international/translator.html` | **Low** | Misspelling captured naturally |

### 3.6 Group E — Punctuation & Symbols Reference (7 Keywords | 1,620 Volume)

| Keyword | Search Volume | KD | Search Intent (SEMrush) | Current Mapping | Competitor Rank | Competitor Ranking URL | Relevance to `/reference` | Recommended Usage |
|---|---:|---:|---|---|---:|---|---|---|
| `morse code symbols` | 390 | 28 | Informational | `/reference` | #1 | `/international/morse2.html` | **High** | Title, H2 (`Morse Code Punctuation & Symbols`), Meta Description |
| `morse code punctuation` | 320 | 16 | Informational | `/` *(Re-map to `/reference`)* | #1 | `/` | **High** | H2 (`Morse Code Punctuation & Symbols`), Intro, FAQ |
| `question mark morse code` | 260 | 23 | Informational | `/` *(Re-map to `/reference`)* | #2 | `/international/morse.html` | **High** | Punctuation Table Row `?` (`..--..`), Body Callout |
| `question mark in morse code` | 260 | 20 | Informational | `/` *(Re-map to `/reference`)* | #2 | `/international/morse.html` | **High** | Punctuation Table Row `?` (`..--..`), FAQ |
| `morse code symbol` | 260 | 22 | Informational | `/` *(Re-map to `/reference`)* | #5 | `/international/morse2.html` | **High** | Punctuation & Symbols Table Header |
| `period in morse code` | 90 | 34 | Informational | `/` *(Re-map to `/reference`)* | #1 | `/international/morse.html` | **High** | Punctuation Table Row `.` (`.-.-.-`), Body Callout |
| `is there punctuation in morse code` | 40 | 25 | Informational | `/` *(Re-map to `/reference`)* | #1 | `/international/morse.html` | **High** | Direct FAQ Question & Answer |

### 3.7 Group F — Single-Character Lookups (Long-Tail) (62 Keywords | 27,960 Volume)

All 62 queries below represent users looking up the Morse code sequence for a specific letter or digit (e.g., `"l in morse code"`, `"j in morse code"`). By rendering an indexable, semantic HTML table containing every character, its exact dot-dash code, its phonetic rhythm (`dit`/`dah`), and its element count, `/reference` naturally captures this 27,960-volume long-tail cluster.

| Keyword | Search Volume | KD | Search Intent | Current Mapping | Competitor Rank | Competitor Ranking URL | Relevance | Recommended Usage |
|---|---:|---:|---|---|---:|---|---|---|
| `a in morse code` | 1,300 | 40 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `A` (`.-`) |
| `morse code t` | 1,300 | 49 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `T` (`-`) |
| `l in morse code` | 1,300 | 7 | I | `/` | #1 | `/` | Medium | A–Z Table Row `L` (`.-..`) |
| `t in morse code` | 1,000 | 10 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `T` (`-`) |
| `m in morse code` | 1,000 | 55 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `M` (`--`) |
| `j in morse code` | 1,000 | 17 | I | `/` | #4 | `/international/translator.html` | Medium | A–Z Table Row `J` (`.---`) |
| `c in morse code` | 880 | 30 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `C` (`-.-.`) |
| `e in morse code` | 880 | 12 | I | `/` | #7 | `/international/morse.html` | Medium | A–Z Table Row `E` (`.`) |
| `k in morse code` | 880 | 24 | I | `/` | #7 | `/international/morse.html` | Medium | A–Z Table Row `K` (`-.-`) |
| `n in morse code` | 720 | 26 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `N` (`-.`) |
| `morse code for m` | 720 | 4 | I | `/reference` | #1 | `/international/translator.html` | Medium | A–Z Table Row `M` (`--`) |
| `g in morse code` | 720 | 40 | I | `/` | #2 | `/international/translator.html` | Medium | A–Z Table Row `G` (`--.`) |
| `i in morse code` | 590 | 27 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `I` (`..`) |
| `y in morse code` | 590 | 9 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `Y` (`-.--`) |
| `w in morse code` | 590 | 56 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `W` (`.--`) |
| `o in morse code` | 590 | 24 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `O` (`---`) |
| `morse code n` | 590 | 49 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `N` (`-.`) |
| `morse code g` | 590 | 39 | I | `/` | #4 | `/international/translator.html` | Medium | A–Z Table Row `G` (`--.`) |
| `r in morse code` | 590 | 32 | I | `/` | #4 | `/international/morse2.html` | Medium | A–Z Table Row `R` (`.-.`) |
| `b in morse code` | 590 | 30 | I | `/` | #7 | `/international/morse.html` | Medium | A–Z Table Row `B` (`-...`) |
| `morse code for l` | 480 | 42 | I | `/reference` | #1 | `/international/translator.html` | Medium | A–Z Table Row `L` (`.-..`) |
| `i morse code` | 480 | 54 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `I` (`..`) |
| `morse code r` | 480 | 29 | I | `/` | #2 | `/international/translator.html` | Medium | A–Z Table Row `R` (`.-.`) |
| `n morse code` | 480 | 21 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `N` (`-.`) |
| `l morse code` | 480 | 53 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `L` (`.-..`) |
| `a morse code` | 480 | 39 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `A` (`.-`) |
| `morse code c` | 480 | 43 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `C` (`-.-.`) |
| `p in morse code` | 480 | 11 | I | `/` | #1 | `/alphabet.html` | Medium | A–Z Table Row `P` (`.--.`) |
| `morse code for i` | 390 | 28 | C + I | `/reference` | #1 | `/international/translator.html` | Medium | A–Z Table Row `I` (`..`) |
| `u in morse code` | 390 | 32 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `U` (`..-`) |
| `f in morse code` | 390 | 36 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `F` (`..-.`) |
| `morse code w` | 390 | 37 | I | `/` | #1 | `/international/timing/` | Medium | A–Z Table Row `W` (`.--`) |
| `morse code p` | 390 | 45 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `P` (`.--.`) |
| `morse code for o` | 390 | 24 | I | `/reference` | #1 | `/international/translator.html` | Medium | A–Z Table Row `O` (`---`) |
| `morse code h` | 390 | 49 | I | `/` | #5 | `/international/morse2.html` | Medium | A–Z Table Row `H` (`....`) |
| `morse code for c` | 320 | 20 | I | `/reference` | #1 | `/international/translator.html` | Medium | A–Z Table Row `C` (`-.-.`) |
| `morse code for n` | 320 | 3 | I | `/reference` | #1 | `/international/translator.html` | Medium | A–Z Table Row `N` (`-.`) |
| `w morse code` | 320 | 38 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `W` (`.--`) |
| `morse code y` | 320 | 28 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `Y` (`-.--`) |
| `x in morse code` | 320 | 6 | I | `/` | #1 | `/international/morse.html` | Medium | A–Z Table Row `X` (`-..-`) |
| `z morse code` | 260 | 57 | I | `/` | #1 | `/international/morse.html` | Medium | A–Z Table Row `Z` (`--..`) |
| `c morse code` | 260 | 37 | I | `/` | #1 | `/` | Medium | A–Z Table Row `C` (`-.-.`) |
| `morse code for a` | 210 | 34 | I | `/reference` | #1 | `/international/translator.html` | Medium | A–Z Table Row `A` (`.-`) |
| `morse code m` | 210 | 31 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `M` (`--`) |
| `t morse code` | 210 | 40 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `T` (`-`) |
| `morse code e` | 210 | 48 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `E` (`.`) |
| `morse code for j` | 210 | 15 | I | `/reference` | #1 | `/international/translator.html` | Medium | A–Z Table Row `J` (`.---`) |
| `morse code l` | 170 | 47 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `L` (`.-..`) |
| `morse code for f` | 170 | 47 | I | `/reference` | #1 | `/international/translator.html` | Medium | A–Z Table Row `F` (`..-.`) |
| `r morse code` | 170 | 28 | I | `/` | #2 | `/international/translator.html` | Medium | A–Z Table Row `R` (`.-.`) |
| `morse code s` | 140 | 41 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `S` (`...`) |
| `f in morse` | 140 | 20 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `F` (`..-.`) |
| `m morse code` | 140 | 53 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `M` (`--`) |
| `1 in morse code` | 110 | 32 | I | `/` | #1 | `/international/translator.html` | Medium | Numbers Table Row `1` (`.----`) |
| `morse code for z` | 110 | 32 | I | `/reference` | #1 | `/international/morse2.html` | Medium | A–Z Table Row `Z` (`--..`) |
| `u morse code` | 110 | 69 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `U` (`..-`) |
| `1 morse code` | 110 | n/a | I | `/` | #1 | `/international/translator.html` | Medium | Numbers Table Row `1` (`.----`) |
| `7 in morse code` | 90 | 26 | C + I | `/` | #1 | `/international/translator.html` | Medium | Numbers Table Row `7` (`--...`) |
| `m in morse` | 90 | 17 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `M` (`--`) |
| `g in morse` | 90 | 14 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `G` (`--.`) |
| `morse code i` | 90 | 38 | I | `/` | #1 | `/international/translator.html` | Medium | A–Z Table Row `I` (`..`) |
| `morse code for t` | 70 | 34 | I | `/reference` | #1 | `/international/translator.html` | Medium | A–Z Table Row `T` (`-`) |

---

## 4. Weak & Excluded Keywords Inventory (30 Keywords | 8,770 Volume)

To prevent keyword stuffing, intent dilution, and homepage cannibalization, the following 30 keywords from the initial extraction are classified as **Weak** or **Exclude** for `/reference`:

### 4.1 Group W1 — Translator-Modified Queries (16 Keywords | 3,620 Volume) — **Exclude (Belongs to `/`)**
Users searching with the modifier `translator`, `translate`, or `converter` want an interactive text box to convert full strings, not a static lookup table. Note that in the initial `Keyword-to-URL-Mapping.csv`, several `alphabet translator` queries were auto-mapped to `/reference` simply because they contained the substring `"alphabet"`. They must remain targeted by Homepage `/` (or future dedicated tool landers) and excluded from `/reference` headings.

| Keyword | Search Volume | KD | Search Intent | Current Mapping | Competitor Rank | Competitor Ranking URL | Classification | Reason / Correct Owner |
|---|---:|---:|---|---|---:|---|---|---|
| `numbers in morse code translator` | 590 | 16 | I | `/morse-code-numbers` | #1 | `/international/translator.html` | **Exclude** | Active translator tool intent (`/` or `/morse-code-numbers`) |
| `morse code translator numbers` | 590 | 15 | I | `/morse-code-numbers` | #1 | `/international/translator.html` | **Exclude** | Active translator tool intent (`/`) |
| `morse alphabet translator` | 480 | 23 | I | `/reference` *(Misclassified)* | #1 | `/international/translator.html` | **Exclude** | Translator intent — re-assign to `/` |
| `morse code number translator` | 480 | 27 | I | `/morse-code-numbers` | #1 | `/international/translator.html` | **Exclude** | Active translator tool intent (`/`) |
| `alphabet translator morse code` | 260 | 31 | I | `/reference` *(Misclassified)* | #1 | `/international/translator.html` | **Exclude** | Translator intent — re-assign to `/` |
| `number morse code translator` | 210 | 18 | I | `/morse-code-numbers` | #1 | `/international/translator.html` | **Exclude** | Active translator tool intent (`/`) |
| `morse code translator number` | 170 | 25 | I | `/morse-code-numbers` | #1 | `/international/translator.html` | **Exclude** | Active translator tool intent (`/`) |
| `morse code alphabet translator` | 140 | 48 | I | `/reference` *(Misclassified)* | #1 | `/international/translator.html` | **Exclude** | Translator intent — re-assign to `/` |
| `alphabet to morse code translator` | 140 | 20 | I | `/reference` *(Misclassified)* | #1 | `/international/translator.html` | **Exclude** | Translator intent — re-assign to `/` |
| `mors alphabet translate` | 140 | 21 | I | `/reference` *(Misclassified)* | #1 | `/international/translator.html` | **Exclude** | Translator intent — re-assign to `/` |
| `alphabet morse code translator` | 110 | 24 | I | `/reference` *(Misclassified)* | #1 | `/international/translator.html` | **Exclude** | Translator intent — re-assign to `/` |
| `morse code numbers translator` | 90 | 36 | C | `/morse-code-numbers` | #1 | `/international/translator.html` | **Exclude** | Active translator tool intent (`/`) |
| `international morse code sos distress signal` | 90 | 35 | I | `/morse-code-sos` | #1 | `/SOS.html` | **Exclude** | Dedicated SOS topic (`/morse-code-sos`) |
| `letter to morse code converter` | 50 | 16 | C | `/` | #1 | `/international/translator.html` | **Exclude** | Active converter tool intent (`/`) |
| `morse code letters translator` | 40 | 48 | I | `/reference` *(Misclassified)* | #1 | `/international/translator.html` | **Exclude** | Translator intent — re-assign to `/` |
| `numbers morse code translator` | 40 | 27 | I | `/morse-code-numbers` | #1 | `/international/translator.html` | **Exclude** | Active translator tool intent (`/`) |

### 4.2 Group W2 — Telegraph-Key Hardware Queries (4 Keywords | 2,920 Volume) — **Exclude**
In the initial automated clustering, queries containing `"key"` were grouped under `/reference` (treating "key" as a legend/answer key). However, SEMrush ranking URLs (`/international/trainer/keyer.html` and `/keys.html`) confirm these users are searching for physical telegraph keys (straight keys, iambic paddles) or an electronic keyer simulator.

| Keyword | Search Volume | KD | Search Intent | Current Mapping | Competitor Rank | Competitor Ranking URL | Classification | Reason |
|---|---:|---:|---|---|---:|---|---|---|
| `morse code key` | 1,900 | 38 | C + I | `/reference` *(Misclassified)* | #12 | `/international/trainer/keyer.html` | **Exclude** | Hardware / electronic keyer intent |
| `morse key` | 590 | 32 | I | `/reference` *(Misclassified)* | #6 | `/international/trainer/keyer.html` | **Exclude** | Hardware / electronic keyer intent |
| `straight key morse` | 260 | 25 | I | `/reference` *(Misclassified)* | #5 | `/keys.html` | **Exclude** | Physical straight key hardware topic |
| `morse code telegraph key` | 170 | 29 | I | `/history-of-morse-code` | #1 | `/international/trainer/keyer.html` | **Exclude** | Telegraph hardware / history topic |

### 4.3 Group W3 — NATO Phonetic Alphabet Queries (5 Keywords | 900 Volume) — **Exclude**
`morsecode.world` ranks on a separate page (`/alphabet.html`) that pairs Alfa, Bravo, Charlie with Morse code. Because our `CANONICAL_REFERENCE_LIST` in [`mapping.ts`](file:///d:/Project/Morse%20Code%20Translator%20Website/src/lib/morse/mapping.ts) does not include NATO phonetic words (`Alfa`, `Bravo`, etc.) and adding unapproved features is out of scope, we must not target phonetic alphabet queries on `/reference`.

| Keyword | Search Volume | KD | Search Intent | Current Mapping | Competitor Rank | Competitor Ranking URL | Classification | Reason |
|---|---:|---:|---|---|---:|---|---|---|
| `morse code phonetic alphabet` | 210 | 24 | I | `/reference` | #1 | `/alphabet.html` | **Exclude** | NATO phonetic words not in `/reference` UI |
| `phonetic alphabet and morse code` | 210 | 31 | I | `/reference` | #1 | `/alphabet.html` | **Exclude** | NATO phonetic words not in `/reference` UI |
| `phonetic alphabet with morse code` | 170 | 18 | I | `/reference` | #1 | `/alphabet.html` | **Exclude** | NATO phonetic words not in `/reference` UI |
| `morse code and phonetic alphabet` | 170 | 28 | I | `/reference` | #1 | `/alphabet.html` | **Exclude** | NATO phonetic words not in `/reference` UI |
| `phonetic alphabet morse code` | 140 | 29 | I | `/reference` | #1 | `/alphabet.html` | **Exclude** | NATO phonetic words not in `/reference` UI |

### 4.4 Groups W4, W5, W6 — Non-English, Printable Sheet & Specific Word Queries (5 Keywords | 1,330 Volume)

| Keyword | Search Volume | KD | Search Intent | Current Mapping | Competitor Rank | Competitor Ranking URL | Classification | Reason |
|---|---:|---:|---|---|---:|---|---|---|
| `morse code tabelle` | 480 | 46 | I | `/` | #1 | `/international/translator.html` | **Exclude (W4)** | German language query ("table") |
| `morse code cheat sheet` | 390 | 22 | I | `/morse-code-sheet` | #9 | `/international/morse2.html` | **Weak (W5)** | Mapped to future `/morse-code-sheet`; `/reference` lacks `@media print` CSS or PDF download |
| `international morse` | 210 | 35 | N | `/` | #1 | `/international/` | **Weak (W6)** | Broad navigational query |
| `letters to morse code` | 140 | 29 | C | `/reference` | #1 | `/international/translator.html` | **Weak (W6)** | Conversion phrasing better served by `/` |
| `international morse code hope .... --- .--. .` | 110 | 11 | I | `/` | #2 | `/international/translator.html` | **Exclude (W6)** | Specific word translation query |

---

## 5. Summary of Mapping Corrections Identified

Comparing the actual SEMrush competitor ranking URLs (`/international/morse2.html` and `/international/morse.html` vs `/international/translator.html`) against our earlier automated `Keyword-to-URL-Mapping.csv` reveals two critical corrections applied in this Phase 2 strategy:

1. **Reclaimed for `/reference` (Previously misassigned to `/`):**
   - `international morse code` (1,600 vol, KD 53) — Competitor ranks #1 with `/international/morse2.html` (their reference chart page), not their translator.
   - `morse code punctuation` (320 vol, KD 16), `question mark morse code` (260 vol, KD 23), `question mark in morse code` (260 vol, KD 20), `morse code symbol` (260 vol, KD 22), `period in morse code` (90 vol, KD 34), `is there punctuation in morse code` (40 vol, KD 25).
   - `morse code list` (260 vol, KD 34), `list of morse code` (210 vol, KD 34), `morse codes list` (170 vol, KD 38).
2. **Removed from `/reference` (Previously misassigned to `/reference`):**
   - All 7 `*alphabet*translator*` queries (1,310 combined vol) -> Re-assigned to Homepage `/`.
   - All 3 `*key*` hardware queries (`morse code key`, `morse key`, `straight key morse` — 2,750 combined vol) -> Excluded from `/reference`.
   - All 5 `*phonetic alphabet*` queries (900 combined vol) -> Excluded from `/reference`.

