# Phase 2 — Quiz Page (`/quiz`) Content Outline & Structural Blueprint

**Target Route:** `/quiz`  
**Page Type:** Standardized Morse Code Knowledge Quiz & Assessment Tool  
**Auditor:** Content Architect & Technical SEO Strategist  
**Date:** November 10, 2026  
**Status:** **Approved for Production**  

---

## 1. Document Architecture & Heading Tree

```markdown
# Interactive Morse Code Quiz & Knowledge Assessment (H1)
  ├── Step 01: Take the Morse Code Knowledge Assessment (H2 - #quiz-station)
  │     └── [Embedded <QuizClient /> Tool]
  ├── Step 02: Understanding the Standardized 10-Question Test Format (H2 - #format)
  │     ├── Why 10 Questions? The Pedagogical Balance (H3)
  │     ├── Randomized Question Pool Mechanics (H3)
  │     └── Untimed Testing Environment (H3)
  ├── Step 03: The Five Knowledge Domains Evaluated in Every Quiz (H2 - #domains)
  │     ├── 1. Timing & Spacing Ratios (H3)
  │     ├── 2. Alphabet & Mirror Pairs (H3)
  │     ├── 3. Numeric Symmetry (0 to 9) (H3)
  │     ├── 4. Punctuation & Syntax Boundaries (H3)
  │     └── 5. Auditory Signal Recognition (H3)
  ├── Step 04: Scoring Criteria, Review Explanations & Performance Bands (H2 - #scoring)
  │     ├── Normalized Client-Side Answer Evaluation (H3)
  │     ├── Performance Bands & Score Interpretation (H3)
  │     └── Post-Quiz Educational Review (H3)
  ├── Step 05: How to Prepare and Improve Your Morse Code Assessment Score (H2 - #prep)
  │     ├── 1. Study the 54 Characters with the Reference Chart (H3)
  │     ├── 2. Work Through the 10-Lesson Beginner Curriculum (H3)
  │     └── 3. Target Tricky Characters with Speed Drills (H3)
  ├── Step 06: Local Storage Persistence & Data Privacy (H2 - #persistence)
  │     ├── Browser-Local Attempt History (H3)
  │     └── Cache Reset and Device Boundaries (H3)
  ├── Step 07: Explore the Complete Morse Code Learning Ecosystem (H2 - #ecosystem)
  │     ├── Core Translator (H3)
  │     ├── Alphabet & Reference Chart (H3)
  │     ├── Interactive Beginner Course (H3)
  │     └── Practice Drills & Speed Trainer (H3)
  ├── Step 08: Frequently Asked Questions About the Morse Code Quiz (H2 - #faq)
  │     └── [6 Accessible Accordions with 100% Verbatim Parity to Schema]
  └── Step 09: Ready to Test Your Morse Code Knowledge? (H2 - #cta)
```

---

## 2. Heading-by-Heading Content Specifications

### Title Tag & Metadata
- **Base Title:** `Morse Code Quiz & Knowledge Test` (33 characters)
- **Rendered `<title>`:** `Morse Code Quiz & Knowledge Test | Morse Code Platform` (55 characters — optimal SERP window).
- **Meta Description:** `Test your Morse code knowledge with our free 10-question standardized quiz. Evaluate letters, timing, numbers, punctuation, and audio recognition online.` (158 characters).
- **Canonical URL:** `/quiz` (relative path resolved dynamically via `metadataBase`).

### H1: Interactive Morse Code Quiz & Knowledge Assessment
- **Breadcrumbs:** `Home` (`/`) &rarr; `Quiz` (`/quiz`).
- **Telemetry Badges:** `Standardized Assessment • 10 Questions • Balanced Domains • Zero Account Required`.
- **Value Pillars:**
  1. *Balanced Domain Coverage* (5 telegraphy knowledge categories).
  2. *Instant Rationale Explanations* (detailed answers after submission).
  3. *Local Progress Tracking* (browser-local localStorage attempt records).
- **Quick Jump Bar:** Links to `#quiz-station`, `#format`, `#domains`, `#scoring`, `#prep`, `#persistence`, `#ecosystem`, `#faq`.

### H2: Take the Morse Code Knowledge Assessment (`#quiz-station`)
- Directly embeds `<QuizClient />` with zero clutter.
- Allows immediate testing with questions generated via `generateQuiz(10)`.

### H2: Understanding the Standardized 10-Question Test Format (`#format`)
- Explains the pedagogical design of the test:
  - 10 questions provides a complete cross-section of skills in ~5–7 minutes without user fatigue.
  - Randomized sampling from the 21-question bank ensures every attempt tests fresh combinations.
  - Untimed test format allows learners to think through timing math and sound rhythms without countdown anxiety.

### H2: The Five Knowledge Domains Evaluated in Every Quiz (`#domains`)
- Detailed breakdown of each tested category:
  1. *Timing & Spacing Ratios:* ITU-R Recommendation M.1677-1 standard: dot = 1 unit, dash = 3 units, intra-character space = 1 unit, letter space = 3 units, word space = 7 units, PARIS 50-unit calibration word.
  2. *Alphabet & Symmetrical Pairs:* Most frequent characters (E = `.`, T = `-`), inverse pairs (A = `.-` vs N = `-.`, D = `-..` vs U = `..-`, K = `-.-` vs R = `.-.`), and distress prosign SOS (`... --- ...`).
  3. *Numeric Symmetry:* The strict 5-element rule where 0 to 5 build dots from dashes, and 6 to 9 build dashes from dots.
  4. *Punctuation & Syntax Boundaries:* Period (`.-.-.-`), question mark (`..--..`), comma (`--..--`), and the critical literal slash `-..-.` to avoid confusion with the word boundary `/`.
  5. *Auditory Signal Recognition:* Web Audio API tone synthesis at 15 WPM evaluating acoustic identification without visual text aids.

### H2: Scoring Criteria, Review Explanations & Performance Bands (`#scoring`)
- Details how user inputs are evaluated:
  - Client-side normalization: Unicode NFC, case-insensitive uppercase, trimming whitespace.
  - Performance Bands Table:
    - `90% – 100% (9–10 Correct)`: **Mastery** — Exceptional telegraphy comprehension.
    - `70% – 89% (7–8 Correct)`: **Proficient** — Solid foundation ready for on-air CW or higher speed drills.
    - `50% – 69% (5–6 Correct)`: **Developing** — Good basics, recommended to review timing or numbers in `/learn`.
    - `Below 50% (0–4 Correct)`: **Novice** — Early learning stage, recommended to visit `/reference` and complete Lesson 1–5.
  - Review Section: Highlights that each submitted test provides immediate correct answers and detailed pedagogical explanations.

### H2: How to Prepare and Improve Your Morse Code Assessment Score (`#prep`)
- Practical study paths linking to internal resources:
  - Reference Chart (`/reference`): Learn the 54 international characters and listen to individual symbol previews.
  - Structured Curriculum (`/learn`): Follow the 10-lesson step-by-step path from dot-dash fundamentals to Morse history.
  - Active Drills (`/practice`): Use the Weak Focus filter to drill characters where personal accuracy is below 70%.

### H2: Local Storage Persistence & Data Privacy (`#persistence`)
- Factual storage disclosures:
  > *"Quiz scores and learning statistics are saved locally in your browser using localStorage with zero account registration required."*
  - Explains that the intro screen displays recent quiz attempt scores (`quizHistory`).
  - Explains that clearing browser cookies/site data, browsing in incognito mode, or switching devices resets stored history.

### H2: Explore the Complete Morse Code Learning Ecosystem (`#ecosystem`)
- 4-Card Bento Grid linking to `/`, `/reference`, `/learn`, and `/practice`.

### H2: Frequently Asked Questions About the Morse Code Quiz (`#faq`)
- 6 accessible `<details>` / `<summary>` accordions with 100% exact parity to `FAQPage` schema:
  1. *How many questions are in each Morse code quiz?*
  2. *Are the quiz questions timed?*
  3. *How is my final quiz percentage calculated?*
  4. *Does the quiz test Morse sound recognition as well as written code?*
  5. *Are my quiz scores saved if I close or refresh my browser?*
  6. *How does the Quiz differ from Practice Drills?*

### H2: Ready to Test Your Morse Code Knowledge? (`#cta`)
- High-contrast action triggers linking to `#quiz-station`, `/practice`, and `/learn`.

