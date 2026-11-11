# Phase 2 — Quiz Page (`/quiz`) Keyword Research & Intent Analysis

**Target URL:** `/quiz`  
**Page Type:** Free Standardized Morse Code Knowledge Quiz & Assessment Tool  
**Auditor:** Senior Technical SEO Strategist & Keyword Research Specialist  
**Date:** November 10, 2026  
**Status:** **Completed & Verified**  

---

## 1. Executive Summary & Forensic Data Source Audit

In accordance with Section 8 of the PRD and project data-integrity rules, this keyword research was conducted using:
1. `docs/seo/Master-Keyword-Database.csv` (1,122 deduplicated SEMrush keywords from `morsecode.world`).
2. `docs/seo/SEMrush-Data-Audit.md` (Forensic integrity audit of uploaded SEMrush exports).
3. The live codebase implementation of the standardized quiz engine in `src/lib/learning/quizzes.ts` and `src/components/learning/QuizClient.tsx`.

### Competitor Data Integrity Disclosure
- **Competitor Analyzed:** `morsecode.world` (the sole competitor for which verified SEMrush organic research CSV exports were provided).
- **Competitor URL Analysis:** Inspection of all 21 ranking URLs on `morsecode.world` confirms that **no dedicated quiz or assessment URL exists** on `morsecode.world`. Their training section consists solely of `trainer.html`, `keyer.html`, and `generator.html`.
- **Competitor Gap:** Because `morsecode.world` lacks a standardized assessment tool, core test terms like *"morse code quiz"* and *"morse code test online"* are not present in their ranking export. 
- **Rule Adherence:** No artificial search volumes or keyword difficulties have been fabricated. Where exact metrics are absent from the provided competitor export, they are marked explicitly as **[Not in morsecode.world export]**.

---

## 2. Keyword Inventory & Categorization

| Keyword Phrase | Search Intent | Verified Vol | Verified KD | Data Source Status | Assignment & Role |
|---|---|---|---|---|---|
| **morse code quiz** | Commercial / Educational Evaluation | *N/A* | *N/A* | Competitor Gap Opportunity | **Primary Keyword** |
| **morse code test** | Educational Evaluation | *N/A* | *N/A* | Competitor Gap Opportunity | **Secondary Keyword** |
| **test to morse** | Practical Testing / Translation | **90** | **39** | `Master-Keyword-Database.csv` (Row 1118) | **Secondary Keyword** (Cross-Intent) |
| **morse code knowledge test** | Educational Evaluation | *N/A* | *N/A* | Competitor Gap Opportunity | Supporting Long-Tail |
| **test your morse code** | Informational / Interactive | *N/A* | *N/A* | Competitor Gap Opportunity | Supporting Long-Tail |
| **morse code multiple choice test** | Direct Practical | *N/A* | *N/A* | Feature Parity / High Intent | Supporting Long-Tail |
| **morse code audio quiz** | Acoustic Identification | *N/A* | *N/A* | Feature Parity / High Intent | Supporting Long-Tail |
| **morse code timing test** | Theoretical / Standards | *N/A* | *N/A* | Feature Parity / High Intent | Supporting Long-Tail |

---

## 3. Search Intent Mapping

Searchers looking for Morse Code testing utilities fall into three distinct user personas:

### Persona A: The Course Graduate (Post-Learning Validation)
- **Goal:** Verify knowledge after studying the alphabet or completing beginner lessons (`/learn`).
- **Needs:** A structured exam format that gives an objective score, highlights mistakes, and explains the correct answers.
- **Intent Type:** Evaluative / Educational.

### Persona B: The Self-Taught Radio/CW Enthusiast
- **Goal:** Check readiness before taking amateur radio (HAM) license tests or practicing on-air CW.
- **Needs:** Questions covering timing conventions (PARIS standard, ITU-R M.1677-1), dot/dash ratios, spacing pauses, and audio sound recognition.
- **Intent Type:** Evaluative / Technical Standard.

### Persona C: The Quick Trivia / Casual Explorer
- **Goal:** Test general knowledge of famous Morse signals (such as SOS or historic telegraphy facts).
- **Needs:** Zero onboarding, instant question flow, multiple choice, and immediate score calculation.
- **Intent Type:** Interactive / Casual Utility.

---

## 4. Keyword Cannibalization Defense Matrix

To maintain strict topical boundaries across our 5 primary educational URLs, search intent is demarcated as follows:

| URL Route | Target Intent | Primary Keywords | Boundaries & Scope |
|---|---|---|---|
| `/` | **Tool Utility** (Immediate bidirectional translation) | `morse code`, `morse code translator`, `text to morse` | Focused strictly on input/output conversion, live audio synthesis, and WAV export. No scored testing. |
| `/reference` | **Information Lookup** (Character chart & symbols) | `morse code alphabet`, `morse code chart`, `morse letters` | Focused on complete 54-symbol table, search filter, and individual symbol audio previews. No quizzes. |
| `/learn` | **Curriculum Instruction** (Step-by-step beginner course) | `learn morse code`, `morse code lessons`, `how to learn morse code` | 10 pedagogical lessons from basics to speed development. No formal graded exam. |
| `/practice` | **Drill & Speed Training** (Open-ended active recall) | `morse code practice`, `morse code trainer`, `morse practice` | Untimed flashcard-style repetition, 3 directions (Morse&rarr;Text, Text&rarr;Morse, Audio&rarr;Text), weak-character focus. |
| `/quiz` | **Standardized Assessment** (Scored 10-question evaluation) | `morse code quiz`, `morse code test`, `test your morse code` | **Strictly 10-question evaluation**, balanced mix of timing, letters, digits, punctuation, and audio recognition. Formal percentage score and detailed review explanations. |

---

## 5. Existing Quiz Engine Technical Capabilities

Inspection of `src/lib/learning/quizzes.ts` and `src/components/learning/QuizClient.tsx` reveals the exact feature set:

1. **Question Bank Architecture:**
   - 21 vetted questions spanning 4 core domains:
     - *Timing & Standards:* Dot-to-dash ratio (1:3), letter pause (3 units), word pause (7 units), PARIS 50-unit WPM calibration.
     - *Letters:* Common characters (E, T, I, P, K), mirror opposites (A/N), distress signal (SOS).
     - *Numbers:* 5-element rule, boundary digits (0, 5, 7).
     - *Punctuation & Syntax:* Question mark (`..--..`), period (`.-.-.-`), literal slash (`-..-.`), comma (`--..--`).
     - *Acoustic Recognition:* Real Web Audio API tone synthesis for auditory ear training.
2. **Assessment Format:**
   - Randomized 10-question selection per attempt using Fisher-Yates shuffle.
   - Mixture of 4-option multiple choice buttons and normalized typed input.
3. **Scoring & Post-Test Review:**
   - Client-side evaluation comparing normalized user input (`normalizeQuizAnswer`).
   - Final score display: `Score / 10` and `Percentage %`.
   - Comprehensive question-by-question review showing prompt, user answer, expected answer, pass/fail status, and detailed pedagogical explanation.
4. **Data Persistence:**
   - Quiz history saved locally in `localStorage` under `morse_learning_progress_v1` (`recordQuizResult`).
   - Recent quiz attempts table displayed on intro screen (date, score, percentage).
   - Zero login, zero account, zero server telemetry.

---

## 6. Strategic Recommendations for Quiz Page Content

1. **Title Tag Strategy:**
   - Target rendered length: 50–60 characters.
   - Base title: `Morse Code Quiz & Knowledge Test` (33 chars).
   - With layout template (` | Morse Code Platform`, 22 chars), complete rendered `<title>` will be **55 characters** (ideal SERP length).
2. **Single Semantic H1:**
   - `Interactive Morse Code Quiz & Knowledge Assessment`.
3. **Educational Content Sections:**
   - Embed `<QuizClient />` prominently at Step 01 so visitors can immediately take the quiz.
   - Section on Quiz Format & 10-Question Structure.
   - Section on Scoring Criteria & Knowledge Domains (Timing, Letters, Numbers, Punctuation, Sound).
   - Section on Preparation Strategies (Linking to `/learn`, `/reference`, and `/practice`).
   - Section on Browser-Local Progress (localStorage disclosures).
   - Frequently Asked Questions with verbatim `FAQPage` JSON-LD schema.
   - Complete ecosystem cross-links.

