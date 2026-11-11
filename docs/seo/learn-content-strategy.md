# Learn Morse Code (`/learn`) — Content Strategy & Architecture Specification

**Document Version:** 2.0 (Audited & Codebase-Verified)  
**Target Route:** `/learn`  
**Page Type:** Educational Curriculum Hub & Beginner Course  
**Status:** Approved for Implementation  
**Primary Target Keyword:** `learn morse code` (Vol: 2,900 | KD: 37)  
**Secondary Keywords:** `morse code learning resources` (1,600), `learning morse code` (1,300), `learn morse` (880), `how to read morse code` (390), `how to do morse code` (260), `how to write morse code` (210), `how to speak morse code` (170)  

---

## 1. Executive Summary & Page Positioning

The `/learn` page serves as our platform's **educational pillar and structured curriculum hub**. While the Homepage (`/`) satisfies the immediate need to translate text, and the Reference Page (`/reference`) serves as an encyclopedic lookup chart, `/learn` provides the pedagogical roadmap for visitors who want to master International Morse Code from zero.

### Strategic Goals:
1. **Target Educational & Instructional Intent:** Capture the 6,680 monthly searches across `learn morse code`, `learning morse code`, and related learning queries.
2. **Guide Users Through Our 10-Lesson Course:** Present the existing live curriculum in a structured, step-by-step sequence with clear goals, estimated completion times (totaling 40 minutes of conceptual reading and exercise workload), and progress tracking.
3. **Establish Multi-Sensory Telegraphy Best Practices:** Teach Morse code using the Frequency Foundation & Symmetrical Auditory Opposites approach, focusing on acoustic rhythm (`dit` and `dah`) and debunking the trap of visual dot-counting. (Clarify that conversational auditory speed requires 3–4 weeks of daily micro-practice).
4. **Drive Internal Circulation:** Funnel educated learners into interactive speed drills (`/practice`), evaluative assessments (`/quiz`), character lookups (`/reference`), and full translation testing (`/`).
5. **Preserve Privacy & Account-Free Convenience:** Emphasize that all learning progress is stored locally in device memory via `localStorage` with zero account requirements and zero analytics tracking.

---

## 2. Information Architecture & Heading Structure (H1–H3)

To ensure high semantic clarity for search engine crawlers and a cohesive learning experience for visitors, the page is organized into an 8-step logical sequence:

```
H1: Learn International Morse Code: Step-by-Step Curriculum
├── Hero Overview & Standards Pill Strip
├── STEP 01 (H2): Interactive Learning Hub & Local Progress Tracking
│   └── Progress Bar, Completed Badge Counter & Quick Hub Navigation
├── STEP 02 (H2): The 10-Lesson Beginner Morse Code Curriculum
│   ├── H3: Module 1: Telecommunication Foundations & Signal Timing (Lessons 1–2)
│   ├── H3: Module 2: Binary Tree Foundations & Alphabet Memorization (Lessons 3–4)
│   ├── H3: Module 3: Numbers, Punctuation & Word Boundaries (Lessons 5–7)
│   └── H3: Module 4: Auditory Rhythm, Speed (WPM) & Mastery Review (Lessons 8–10)
├── STEP 03 (H2): Modern Methodology: 4 Rules for Learning Morse Code Effectively
│   ├── H3: 1. Learn by Sound, Not Sight (Dits, Dahs & Acoustic Rhythm)
│   ├── H3: 2. Group Characters by Binary Opposites & Symmetries
│   ├── H3: 3. Respect the 5 Mathematical Timing Ratios (PARIS Standard)
│   └── H3: 4. Daily Micro-Practice Over Marathon Cramming
├── STEP 04 (H2): Foundational Character Patterns: The E & T Binary Progression
│   └── Symmetrical Dot/Dash Pairs & Branching Tree Breakdown
├── STEP 05 (H2): Mastering Numbers & Punctuation: Predictable Symmetrical Rules
│   ├── H3: The 5-Element Sliding Window for Digits (0–9)
│   └── H3: Essential Grammatical & Operational Punctuation Symbols
├── STEP 06 (H2): Transitioning from Lessons to Interactive Practice & Testing
│   └── 4-Card Bento Grid Linking /practice, /quiz, /reference, /
├── STEP 07 (H2): Frequently Asked Questions About Learning Morse Code
│   └── 6 Interactive Accordions (Verbatim Schema Parity)
└── STEP 08 (H2): Ready to Start Your Morse Code Journey?
    └── Final Conversion Call to Action Banner
```

---

## 3. Section-by-Section Content & Keyword Mapping

### Hero Section: Compact Title & Value Proposition
- **Target Keywords:** `learn morse code`, `free 10-lesson interactive course`, `International Morse Code`
- **Component:** Centered Breadcrumb Pill (`Home / Learn`), ITU-R M.1677-1 Standard Telemetry Badge, H1, Subtitle, and Quick Jump Navigation Bar.
- **Copy Directives:** Crisp, inspiring, zero-fluff introduction explaining that Morse is a learnable skill requiring ~40 minutes across 10 digestible lessons.

### Step 01: Interactive Learning Hub & Local Progress Tracking (`#progress`)
- **Target Keywords:** `learning morse code`, `morse code learning resources`, `browser-local progress`
- **Component:** Live `LearningHubClient` progress card showing completed lessons count (e.g. `0 of 10 Lessons Finished (0%)`), dynamic progress bar, reset controls, and quick action buttons (`Practice Drills →`, `Take Quiz →`).
- **Copy Directives:** Reassure learners that progress is saved automatically on their device without passwords, accounts, or tracking cookies.

### Step 02: The 10-Lesson Beginner Morse Code Curriculum (`#curriculum`)
- **Target Keywords:** `morse code lessons`, `step-by-step curriculum`, `beginner course`
- **Component:** 10-card curriculum grid with Lesson number, title, subtitle, estimated completion time (~3–5 min), completion badge (`✓ Done` or `Start`), and objective goal.
- **Curriculum Outline:**
  1. *Lesson 1: What Morse Code Is & How It Works* (Telecommunication origins, discrete signals)
  2. *Lesson 2: Dots, Dashes & Standard Timing* (PARIS 5-ratio timing system, dot unit duration)
  3. *Lesson 3: The Single-Element Foundations (E & T) and Binary Tree* (E, T, I, M, S, O)
  4. *Lesson 4: The Complete A–Z Alphabet* (Opposite pairs, sound mnemonics)
  5. *Lesson 5: Numbers (0 to 9) and the 5-Element Rule* (Symmetrical sliding scale)
  6. *Lesson 6: Official Punctuation & Separators* (18 ITU symbols, period, comma, question mark)
  7. *Lesson 7: Word Boundaries & The Slash Separator Convention* (Literal slash vs. word space)
  8. *Lesson 8: Reading Groups & Overcoming Group Confusion* (Character spacing traps)
  9. *Lesson 9: Auditory Recognition & Speed (WPM)* (Tone frequency, WPM calibration)
  10. *Lesson 10: Comprehensive Review & Transition to Drills* (Full message decoding)

### Step 03: Modern Methodology: 4 Rules for Learning Morse Code (`#methodology`)
- **Target Keywords:** `how to learn morse code`, `how to read morse code`, `audio rhythm ear training`, `avoid dot counting`
- **Component:** 4 interactive cards with hover effects (`.card-interactive`) detailing proven pedagogical techniques:
  1. *Rule 1: Learn by Sound, Not Sight* (Explain why visual dot charts create a mental bottleneck; teach `di-dah` rhythm).
  2. *Rule 2: Group by Binary Opposites* (Pairing A `.-` with N `-.`, D `-..` with U `..-`, etc.).
  3. *Rule 3: Respect the 5 Timing Ratios* (Dot 1T, Dash 3T, Intra-character 1T, Inter-character 3T, Word space 7T).
  4. *Rule 4: Daily Micro-Practice* (10–15 minutes daily creates permanent motor-sensory neural pathways).

### Step 04: Foundational Patterns: The E & T Binary Progression (`#foundations`)
- **Target Keywords:** `learn morse`, `morse code foundations`, `easy morse code`
- **Component:** Visual binary tree explanation and interactive card demonstrating how 1 element (E/T) branches into 2 elements (I/M), 3 elements (S/O), and full words (`SEE`, `TEA`, `SOME`).

### Step 05: Mastering Numbers & Punctuation: Symmetrical Rules (`#numbers-punctuation`)
- **Target Keywords:** `morse code numbers`, `morse code punctuation`, `symmetrical morse patterns`
- **Component:** Concise breakdown of the 5-element number progression (1–5 leading dots, 6–0 leading dashes) and the key operational symbols (`.`, `,`, `?`, `/`, `@`).

### Step 06: Platform Learning Tools & Next Steps (`#next-steps`)
- **Target Keywords:** `morse code training`, `morse code practice`, `morse code quizzes`
- **Component:** 4-card interactive Bento Grid:
  - Card 1: *Morse Code Translator & Studio* (`/`) — Test sentences and listen to synthesized audio.
  - Card 2: *Alphabet & Reference Chart* (`/reference`) — Encyclopedic 54-character reference.
  - Card 3: *Interactive Practice Drills* (`/practice`) — Speed flashcards and recall drills.
  - Card 4: *Evaluative Quizzes* (`/quiz`) — 10-question graded assessments.

### Step 07: Frequently Asked Questions (`#faq`)
- **Target Keywords:** `learn morse code FAQ`, `how long does it take to learn morse code`, `is morse code hard to learn`
- **Component:** 6 accessible accordion elements (`<details>` / `<summary>`) matching 100% verbatim with `FAQPage` JSON-LD schema.

### Step 08: Final Conversion Call to Action (`#cta`)
- **Component:** Glowing gradient CTA banner with tactile action buttons: *"Start Lesson 1: Foundations"*, *"Explore Alphabet Chart"*, *"Try Practice Drills"*.

---

## 4. Metadata & Technical SEO Specifications

### 4.1 On-Page Meta Tags
- **Title Tag:** `Learn Morse Code — Free 10-Lesson Interactive Beginner Course` (60 characters)
  - *Rationale:* Hits primary keyword `learn morse code` upfront, specifies `10-Lesson Interactive Beginner Course`, clean and authoritative.
- **Meta Description:** `Learn International Morse Code with our free, interactive 10-lesson course. Master dots, dashes, alphabet letters, numbers, timing, and audio rhythm step by step.` (159 characters)
  - *Rationale:* Contains primary keyword, secondary terms, value proposition, and actionable call to click.
- **Canonical URL:** `https://morsecodetranslatores.com/learn` (dynamically generated via `siteConfig.ts`).
- **OpenGraph Tags:**
  - `og:title`: `Learn Morse Code — Free 10-Lesson Interactive Beginner Course`
  - `og:description`: `A free 10-lesson interactive curriculum teaching Morse code fundamentals, timing rules, alphabet letters, numbers, punctuation, and auditory rhythm.`
  - `og:url`: `getAbsoluteUrl('/learn')`
  - `og:type`: `website`

---

## 5. Structured Data (JSON-LD) Specifications

The `/learn` page will declare three rich schema graphs:

### 5.1 Schema 1: `Course` & `CourseInstance`
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "International Morse Code Beginner Course",
  "description": "A structured 10-lesson interactive curriculum teaching Morse code fundamentals, timing rules, alphabet letters, numbers, punctuation, and listening skills.",
  "provider": {
    "@type": "Organization",
    "name": "Morse Code Platform",
    "sameAs": "https://morsecodetranslatores.com/"
  },
  "educationalLevel": "Beginner",
  "isAccessibleForFree": true,
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "Online",
    "courseWorkload": "PT40M"
  },
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "1. What Morse Code Is & How It Works",
      "url": "https://morsecodetranslatores.com/learn/what-is-morse-code"
    }
    // ... all 10 lessons mapped dynamically
  ]
}
```

### 5.2 Schema 2: `BreadcrumbList`
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://morsecodetranslatores.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Learn",
      "item": "https://morsecodetranslatores.com/learn"
    }
  ]
}
```

### 5.3 Schema 3: `FAQPage`
Maintains 100% exact verbatim parity with the 6 visible FAQ accordion questions and answers.

---

## 6. Internal Linking Blueprint

### Outbound Contextual Links from `/learn`:
1. **To `/` (Core Translator):** Linked in Methodology and Lesson 7/10 sections: *"Test full phrases and hear synthesized audio in our [Morse Code Translator](/)."*
2. **To `/reference` (Alphabet Chart):** Linked in Module 2 and Punctuation sections: *"Inspect the full 54-symbol table in our [Morse Code Alphabet & Reference Chart](/reference)."*
3. **To `/practice` (Speed Drills):** Linked in Progress Banner, Module 4, and Bento Grid: *"Reinforce your letter recognition with [Interactive Practice Drills](/practice)."*
4. **To `/quiz` (Assessments):** Linked in Progress Banner, Review section, and Bento Grid: *"Evaluate your decoding retention with our [Morse Code Quizzes](/quiz)."*
5. **To `/learn/[slug]` (Individual Lessons):** Every lesson in the curriculum links directly to its standalone interactive lesson page.

### Anchor Text Hygiene:
- Always use descriptive, intent-matching anchors (`interactive Morse code course`, `Morse Code Translator`, `Alphabet Reference Chart`, `Practice Drills`).
- Never use generic anchors like `click here` or `read more`.

---

## 7. Privacy & Storage Guardrails

In strict adherence to project principles:
- **Client-Side Progress Only:** All completion state is read and written using `window.localStorage` under the key `morse_learning_progress_v1`.
- **Zero Server Logging:** No progress data, completed lesson slugs, quiz scores, or practice attempts are ever sent to an external server or third-party analytics script.
- **Safe Fallback:** If localStorage is restricted (private browsing / strict iframe), an in-memory session store ensures the page functions seamlessly without crashing.
- **Accurate Privacy Claims:** Avoid sweeping claims like "military-grade zero server logs" — clearly state that text is processed in browser memory and progress is stored locally in `localStorage`.

