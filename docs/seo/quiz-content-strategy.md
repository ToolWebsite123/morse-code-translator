# Phase 2 — Quiz Page (`/quiz`) Content Strategy & Architectural Blueprint

**Target Route:** `/quiz`  
**Page Title Target:** `Morse Code Quiz & Knowledge Test` (Rendered: `Morse Code Quiz & Knowledge Test | Morse Code Platform` — 55 chars)  
**Meta Description Target:** `Test your Morse code knowledge with our free 10-question standardized quiz. Evaluate letters, timing, numbers, punctuation, and audio recognition online.` (158 chars)  
**Auditor:** Senior Content Architect & Technical SEO Strategist  
**Date:** November 10, 2026  
**Status:** **Approved for Drafting**  

---

## 1. Page Purpose & Content Vision

The `/quiz` route serves as the **capstone evaluation tool** in our Morse code educational ecosystem. While `/learn` provides instruction and `/practice` provides untimed speed drills, `/quiz` provides an objective, standardized 10-question evaluation that tests holistic telegraphy comprehension.

### Core Value Pillars
1. **Multi-Domain Assessment:** Evaluates timing rules, character recall, numeric symmetry, punctuation syntax, and real acoustic signal recognition in one balanced test.
2. **Instant Detailed Explanations:** Every question provides an educational rationale upon submission, turning mistakes into learning moments.
3. **Account-Free Local History:** Recent test scores are saved automatically in the user's browser using `localStorage`, allowing students to measure progress over time without accounts.

---

## 2. On-Page Structure & Step-by-Step Sections

The page will follow the proven step-by-step educational architecture used across the platform:

```
[Breadcrumbs: Home / Quiz]
       │
[Hero Header: Telemetry Badges, H1, Lead Copy, Value Pillars, Quick Jump Bar]
       │
[Step 01: Interactive Quiz Station (#quiz-station)] ──> Embeds <QuizClient />
       │
[Step 02: Standardized 10-Question Test Format (#format)]
       │
[Step 03: The Five Knowledge Domains Tested (#domains)]
       │
[Step 04: Scoring Criteria & Diagnostic Feedback (#scoring)]
       │
[Step 05: How to Prepare for Higher Quiz Scores (#prep)]
       │
[Step 06: Data Persistence & Local Storage Architecture (#persistence)]
       │
[Step 07: Complete Morse Code Learning Ecosystem (#ecosystem)]
       │
[Step 08: Frequently Asked Questions About the Quiz (#faq)]
       │
[Step 09: Ready to Take Your Next Test? (#cta)]
```

---

## 3. Detailed Section-by-Section Plan

### Section 0: Breadcrumbs & Hero Header
- **Breadcrumbs:** `Home` (`/`) &rarr; `Quiz` (`/quiz`).
- **Telemetry Badges:** `Standardized Assessment • 10 Questions • Balanced Domains • Zero Account Required`.
- **H1:** `Interactive Morse Code Quiz & Knowledge Assessment`.
- **Lead Text:** Explaining the role of standardized evaluation in telegraphy training.
- **Value Pillars (3 Cards):**
  1. *Balanced Domain Coverage:* 10 questions drawn across timing, letters, numbers, punctuation, and audio.
  2. *Instant Rationale Review:* In-depth explanations for every question following test completion.
  3. *Local Progress Tracking:* Historical attempt tracking saved directly in the browser via `localStorage`.
- **Quick Jump Bar:** Anchor links to `#quiz-station`, `#format`, `#domains`, `#scoring`, `#prep`, `#persistence`, `#ecosystem`, `#faq`.

### Step 01: Interactive Quiz Station (`#quiz-station`)
- **Heading (H2):** `Take the Morse Code Knowledge Assessment`.
- **Component Embed:** `<QuizClient />` rendered at the top of the content stream so users can immediately take or retake the test.

### Step 02: Standardized 10-Question Test Format (`#format`)
- **Heading (H2):** `Understanding the Standardized 10-Question Test Format`.
- **Subheadings (H3):**
  - `Why 10 Questions? The Pedagogical Balance` (explains why 10 questions provides reliable diagnostic feedback without cognitive exhaustion).
  - `Randomized Question Pool Mechanics` (explains Fisher-Yates shuffle sampling across the 21 vetted question bank).
  - `Untimed Testing Environment` (focus on accuracy and deep comprehension rather than speed pressure).

### Step 03: The Five Knowledge Domains Tested (`#domains`)
- **Heading (H2):** `The Five Knowledge Domains Evaluated in Every Quiz`.
- **Content:** Responsive table and cards detailing the 5 domains:
  1. *Timing & Spacing Ratios:* ITU-R M.1677-1 standard rules (1:3 dot-to-dash ratio, 1-unit intra-character pause, 3-unit letter pause, 7-unit word pause, PARIS 50-unit WPM calibration).
  2. *Alphabet & Mirror Pairs:* High-frequency letters (E, T), symmetrical pairs (A/N, D/U), and emergency signals (SOS).
  3. *Numeric Symmetry:* The universal 5-element rule governing 0 through 9.
  4. *Punctuation & Syntax Boundaries:* Period (`.-.-.-`), question mark (`..--..`), comma (`--..--`), and literal slash (`-..-., avoiding confusion with the word space separator /`).
  5. *Auditory Signal Recognition:* Pure 15 WPM Web Audio tone identification for real ear training.

### Step 04: Scoring Criteria & Diagnostic Feedback (`#scoring`)
- **Heading (H2):** `Scoring Criteria, Review Explanations & Performance Bands`.
- **Subheadings (H3):**
  - `Normalized Client-Side Evaluation` (explains case insensitivity, whitespace trimming, and Unicode NFC normalization).
  - `Performance Bands & Score Interpretation` (table: 90–100% Mastery, 70–89% Proficient, 50–69% Developing, Below 50% Novice).
  - `Post-Quiz Educational Review` (explains why reviewing question explanations reinforces memory retention).

### Step 05: How to Prepare for Higher Quiz Scores (`#prep`)
- **Heading (H2):** `How to Prepare and Improve Your Morse Code Assessment Score`.
- **Subheadings (H3):**
  - `1. Master the 54 Symbols with the Reference Chart` (link to `/reference`).
  - `2. Follow the Structured 10-Lesson Course` (link to `/learn`).
  - `3. Drill Tricky Characters with Speed Drills` (link to `/practice`).

### Step 06: Data Persistence & Local Storage Architecture (`#persistence`)
- **Heading (H2):** `Local Storage Persistence & Data Privacy`.
- **Content:** Clear technical explanation:
  > *"Quiz scores and learning statistics are saved locally in your browser using localStorage with zero account registration required."*
  - Discloses that clearing browser data, using incognito mode, or switching devices resets test history.
  - Links to `/privacy` for full architecture details.

### Step 07: Complete Morse Code Learning Ecosystem (`#ecosystem`)
- **Heading (H2):** `Explore the Complete Morse Code Learning Ecosystem`.
- **4-Card Bento Grid:**
  - `/` &rarr; Morse Code Translator (Convert text & Morse, listen to audio, export WAV).
  - `/reference` &rarr; Morse Code Alphabet & Chart (Complete 54-symbol table with audio).
  - `/learn` &rarr; Beginner Course (10 structured lessons from fundamentals to fluency).
  - `/practice` &rarr; Practice Drills & Trainer (Active recall drills, audio copying, weak-focus filter).

### Step 08: Frequently Asked Questions About the Quiz (`#faq`)
- **Heading (H2):** `Frequently Asked Questions About the Morse Code Quiz`.
- 6 accessible `<details>` / `<summary>` accordions with **100% verbatim parity** to `FAQPage` schema.

### Step 09: Ready to Take Your Next Test? (`#cta`)
- **Heading (H2):** `Ready to Test Your Morse Code Knowledge?`.
- Action buttons linking to `#quiz-station`, `/practice`, and `/learn`.

---

## 4. Technical SEO & Schema Markup Specification

1. **`WebApplication` Schema:**
   - Name: `Morse Code Quiz & Knowledge Assessment`
   - Application Category: `EducationalApplication`
   - Operating System: `All`
   - Price: `$0`
   - Features: Standardized 10-question evaluation, randomized question generation, 5 knowledge domains, Web Audio tone recognition, instant question review explanations, browser-local progress tracking.
2. **`BreadcrumbList` Schema:**
   - Step 1: `Home` (`/`)
   - Step 2: `Quiz` (`/quiz`)
3. **`FAQPage` Schema:**
   - 6 high-intent questions matching visible accordion content verbatim.

