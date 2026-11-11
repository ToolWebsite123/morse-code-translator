# Site-Wide Internal Linking Audit & Information Architecture Plan

**Audited Domain:** `https://morsecodetranslatores.com/` (Morse Code Platform)  
**Audit Date:** November 11, 2026  
**Auditor:** Principal Technical SEO Specialist & Frontend Architect  
**Scope:** Complete Static Crawl & Link Graph Analysis (Audit-Only)  

---

## 1. Internal Link Graph & Topology Overview

A complete link extraction of all 21 pre-rendered HTML files (`out/*.html`) was performed to analyze link equity distribution, crawling pathways, anchor text patterns, and internal page rank circulation.

### Global Internal Link Distribution Summary

| Canonical URL | Page Type | Outgoing Links | Incoming Links | Unique Sources Linking | Link Equity Status |
|---|---|---|---|---|---|
| **`/`** | Homepage / Translator | 47 | **198** | 21 | **Primary Authority Hub (Highest Equity)** |
| **`/reference`** | Alphabet Chart Hub | 154 | **118** | 21 | **High Authority Hub** |
| **`/learn`** | Curriculum Directory Hub | 59 | **138** | 21 | **High Authority Hub** |
| **`/practice`** | Interactive Speed Trainer | 45 | **119** | 21 | **High Authority Hub** |
| **`/quiz`** | Standardized Knowledge Quiz | 50 | **110** | 21 | **High Authority Hub** |
| **`/audio-decoder`** | Acoustic File Decoder | 47 | **107** | 21 | **High Authority Hub** |
| **`/about`** | About Platform & Standards | 43 | 22 | 21 | Standard Supporting Page |
| **`/contact`** | Contact & Feedback | 43 | 23 | 21 | Standard Supporting Page |
| **`/privacy`** | Privacy Disclosures | 44 | 25 | 21 | Standard Legal Page |
| **`/terms`** | Terms of Use | 48 | 22 | 21 | Standard Legal Page |
| **`/disclaimer`** | Operational Disclaimer | 44 | 24 | 21 | Standard Legal Page |
| **`/learn/what-is-morse-code`** | Lesson 1 | 44 | 24 | 21 | Linked from Curriculum & Nav Featured |
| **`/learn/dots-dashes-and-timing`** | Lesson 2 | 44 | **3** | **3** | **Critical Defect: Near-Orphan Page** |
| **`/learn/short-simple-characters`** | Lesson 3 | 44 | **3** | **3** | **Critical Defect: Near-Orphan Page** |
| **`/learn/the-full-latin-alphabet`** | Lesson 4 | 44 | **3** | **3** | **Critical Defect: Near-Orphan Page** |
| **`/learn/numbers-zero-through-nine`** | Lesson 5 | 44 | **3** | **3** | **Critical Defect: Near-Orphan Page** |
| **`/learn/essential-punctuation-marks`** | Lesson 6 | 44 | **3** | **3** | **Critical Defect: Near-Orphan Page** |
| **`/learn/word-boundaries-and-slash-separator`** | Lesson 7 | 44 | **3** | **3** | **Critical Defect: Near-Orphan Page** |
| **`/learn/reading-morse-groups-and-rhythm`** | Lesson 8 | 44 | **3** | **3** | **Critical Defect: Near-Orphan Page** |
| **`/learn/listening-at-different-speeds`** | Lesson 9 | 44 | **3** | **3** | **Critical Defect: Near-Orphan Page** |
| **`/learn/comprehensive-review-and-next-steps`** | Lesson 10 | 44 | **2** | **2** | **Critical Defect: Near-Orphan Page** |

---

## 2. Key Internal Linking Findings & Architecture Defects

### 2.1 The "Near-Orphan" Status of Lessons 2 Through 10
- **The Issue:** While Lesson 1 (`/learn/what-is-morse-code`) receives 24 incoming links, **Lessons 2 through 10 receive only 2 to 3 incoming links each** across the entire website.
- **Root Cause:**
  - Lessons 2 through 9 are linked strictly from:
    1. The `/learn` course directory grid.
    2. The previous lesson's "Next Lesson" button.
    3. The next lesson's "Previous Lesson" button.
  - Lesson 10 is linked from only **2 unique sources** (`/learn` and Lesson 9).
  - Crucially, high-authority tool hubs (`/reference`, `/practice`, `/quiz`, `/audio-decoder`, `/`) contain **zero contextual links to individual lesson URLs**.
- **SEO Impact:** Search engine web crawlers evaluate page importance by incoming internal link count. Because Lessons 2–10 receive so few links, Google perceives them as low-priority utility pages, hindering their organic ranking potential for targeted queries like *"morse code numbers"*, *"morse code timing ratios"*, or *"morse code punctuation"*.

### 2.2 Disconnected Hub-and-Spoke Topology
- **The Hub:** `/reference` is a massive informational authority with 154 outgoing links (most of which are intra-page anchor links or navigation links).
- **The Gap:** The `/reference` page has detailed sections for Numbers and Punctuation, but does not link to Lesson 5 (`/learn/numbers-zero-through-nine`) or Lesson 6 (`/learn/essential-punctuation-marks`).
- **The Practice Disconnect:** The `/practice` speed trainer features an interactive Farnsworth timing mode and weak-character focus, but contains no direct link to Lesson 2 (`/learn/dots-dashes-and-timing`) or Lesson 9 (`/learn/listening-at-different-speeds`).
- **The Quiz Preparation Disconnect:** The `/quiz` page features a dedicated section on "How to Prepare for the Assessment", but links only to the generic `/learn` hub rather than pointing students to specific lessons for domain weaknesses.

### 2.3 Broken Links & Redirect Evaluation
- **Broken Internal Links:** **0 broken links found** across all 21 pre-rendered static HTML files. Every internal `href` resolves to an existing static route.
- **Redirect Links:**
  - `/translator` and `/faq` are handled via HTTP 301 redirects in `public/_redirects`.
  - Sitewide internal links correctly reference canonical targets (`/` and `/#faq`) rather than linking through the redirect URLs.

### 2.4 Anchor Text Distribution
- **Sitewide Navigation Anchors:** Header and footer links use clear, descriptive brand anchors: `"Translator"`, `"Reference"`, `"Learn"`, `"Practice"`, `"Quiz"`, `"Decoder"`.
- **Pagination Anchors in Lessons:** Bottom pagination controls currently use generic labels like `"Previous Lesson"` and `"Next Lesson"`. While visually acceptable, search engines benefit significantly when pagination anchors include the specific topic of the adjacent lesson (e.g., `"Next: 3. Binary Tree Foundations"`).

---

## 3. Recommended Strategic Internal Linking Plan

To resolve the near-orphan status of the individual lesson pages and establish a high-performance hub-and-spoke link architecture, the following contextual links are recommended:

| # | Source URL | Destination URL | Recommended Exact Anchor Text | Strategic SEO Reason | Priority |
|---|---|---|---|---|---|
| 1 | `https://morsecodetranslatores.com/reference` | `/learn/numbers-zero-through-nine` | `complete Morse code numbers guide` | Passes link equity from Reference Number section to Lesson 5. | **High** |
| 2 | `https://morsecodetranslatores.com/reference` | `/learn/essential-punctuation-marks` | `step-by-step punctuation lesson` | Passes link equity from Reference Punctuation section to Lesson 6. | **High** |
| 3 | `https://morsecodetranslatores.com/reference` | `/learn/the-full-latin-alphabet` | `A–Z memorization lesson` | Connects reference alphabet tables to Lesson 4 study strategies. | **High** |
| 4 | `https://morsecodetranslatores.com/practice` | `/learn/dots-dashes-and-timing` | `PARIS mathematical timing standard` | Links practice speed configuration section to Lesson 2 timing rules. | **High** |
| 5 | `https://morsecodetranslatores.com/practice` | `/learn/listening-at-different-speeds` | `auditory recognition guide` | Connects audio practice drill card to Lesson 9 ear-training principles. | **High** |
| 6 | `https://morsecodetranslatores.com/practice` | `/learn/short-simple-characters` | `single-element foundation characters` | Guides learners struggling with E/T in practice to Lesson 3 binary foundations. | **Medium** |
| 7 | `https://morsecodetranslatores.com/quiz` | `/learn/dots-dashes-and-timing` | `Lesson 2: Standard Timing & PARIS Ratios` | Provides targeted study link in Quiz "How to Prepare" domain breakdown. | **High** |
| 8 | `https://morsecodetranslatores.com/quiz` | `/learn/numbers-zero-through-nine` | `Lesson 5: Numeric 5-Element Pattern` | Provides targeted study link for quiz-takers failing number questions. | **High** |
| 9 | `https://morsecodetranslatores.com/quiz` | `/learn/essential-punctuation-marks` | `Lesson 6: Official Punctuation & Separators` | Contextual study link for quiz-takers reviewing punctuation questions. | **High** |
| 10 | `https://morsecodetranslatores.com/audio-decoder` | `/learn/listening-at-different-speeds` | `auditory speed and WPM guide` | Links audio decoder tone detection section to Lesson 9 rhythm training. | **Medium** |
| 11 | `https://morsecodetranslatores.com/audio-decoder` | `/` | `bidirectional text-to-Morse translator` | Guides users needing to encode text rather than transcribe audio files. | **Medium** |
| 12 | `https://morsecodetranslatores.com/learn/dots-dashes-and-timing` | `/practice` | `interactive timing speed drills` | Funnels educated learners directly into practical drills upon finishing Lesson 2. | **High** |
| 13 | `https://morsecodetranslatores.com/learn/the-full-latin-alphabet` | `/reference` | `complete Morse code alphabet chart` | Connects Lesson 4 alphabet memorization to full encyclopedic lookup. | **High** |
| 14 | `https://morsecodetranslatores.com/learn/comprehensive-review-and-next-steps` | `/quiz` | `10-question standardized Morse code quiz` | Primary conversion CTA at the end of the 10-lesson curriculum. | **High** |
| 15 | `https://morsecodetranslatores.com/learn/comprehensive-review-and-next-steps` | `/practice` | `accuracy-based weak-character trainer` | Secondary practice CTA at the conclusion of Lesson 10. | **High** |
| 16 | Sitewide (`src/components/common/Footer.tsx`) | `/learn/what-is-morse-code` | `Beginner Morse Code Guide` | Strengthens footer navigational links to the introductory lesson. | **Medium** |

---

## 4. Hub-and-Spoke Link Architecture Blueprint

```
                      ┌───────────────────────────────────────┐
                      │            Homepage (/)               │
                      │  (Primary Domain Authority Anchor)    │
                      └──────────────────┬────────────────────┘
                                         │
        ┌───────────────────┬────────────┴────────────┬───────────────────┐
        ▼                   ▼                         ▼                   ▼
┌───────────────┐   ┌───────────────┐         ┌───────────────┐   ┌───────────────┐
│  /reference   │   │     /learn    │         │   /practice   │   │     /quiz     │
│ Alphabet Chart│   │Curriculum Hub │         │ Speed Trainer │   │Assessment Test│
└───────┬───────┘   └───────┬───────┘         └───────┬───────┘   └───────┬───────┘
        │                   │                         │                   │
        │ Contextual Links  │ Hub-and-Spoke           │ Drill Links       │ Prep Links
        │ to Lessons 4, 5, 6│ to All 10 Lessons       │ to Lessons 2 & 9  │ to Lessons 2, 5, 6
        └───────────────┐   │   ┌─────────────────────┘                   │
                        ▼   ▼   ▼                                         ▼
            ┌─────────────────────────────────────────────────────────────────┐
            │                     10 Canonical Lessons                        │
            │  /learn/what-is-morse-code  ◄──►  /learn/dots-dashes-and-timing │
            │  /learn/short-simple-char   ◄──►  /learn/the-full-latin-alphabet│
            │  /learn/numbers-0-to-9      ◄──►  /learn/essential-punctuation │
            │  /learn/word-boundaries     ◄──►  /learn/reading-morse-groups   │
            │  /learn/listening-speeds    ◄──►  /learn/comprehensive-review   │
            └─────────────────────────────────────────────────────────────────┘
                                          │
                                          │ Final Capstone Links
                                          ▼
                         ┌─────────────────────────────────┐
                         │   /practice   &   /quiz         │
                         │  (Active Recall & Certification)│
                         └─────────────────────────────────┘
```

By implementing this interconnected topology, page authority will flow seamlessly from high-traffic tool hubs into the educational lessons, lifting the entire platform's organic footprint while dramatically improving learner navigation.

