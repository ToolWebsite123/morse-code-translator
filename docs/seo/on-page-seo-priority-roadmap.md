# On-Page SEO Priority Roadmap & Action Plan

**Audited Domain:** `https://morsecodetranslatores.com/` (Morse Code Platform)  
**Date:** November 11, 2026  
**Auditor:** Principal Technical SEO Specialist & Frontend Architect  
**Status:** Audit Completed — Strategic Roadmap Awaiting User Authorization  
**Strict Implementation Policy:** Audit-Only (Zero Code Modifications Made in This Audit)  

---

## 1. Executive Roadmap Matrix

The roadmap organizes all identified on-page SEO issues, opportunities, and architecture enhancements into five logical phases, ranked by impact, technical complexity, and urgency.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 ON-PAGE SEO ROADMAP                                    │
├───────────────────┬───────────────────┬───────────────────┬───────────────────┬────────┤
│      PHASE 1      │      PHASE 2      │      PHASE 3      │      PHASE 4      │PHASE 5 │
│Critical Technical │Homepage & Major   │Learning & Lesson  │Trust Signals &    │Internal│
│& Social Indexing  │Tool Optimization  │Page Optimization  │Supporting Pages   │Linking │
└───────────────────┴───────────────────┴───────────────────┴───────────────────┴────────┘
```

### Impact vs. Effort Prioritization Matrix

| Phase | Task Description | Expected Organic Impact | Technical Effort | Priority Level |
|---|---|---|---|---|
| **Phase 1** | Implement dedicated OpenGraph (`og:image`) & Twitter sharing cards (1200x630px). | **High** (Boosts social CTR & brand authority) | Low | **Critical** |
| **Phase 1** | Fix truncated title tags on Lessons 3, 7, and 10 (reducing length to $<60$ chars). | **High** (Prevents SERP truncation & keyword clipping) | Low | **Critical** |
| **Phase 1** | Trim excessively long meta description on `/audio-decoder` (180 chars $\rightarrow$ 157 chars). | **Medium** (Restores clean mobile SERP snippets) | Low | **Critical** |
| **Phase 2** | Add `BreadcrumbList` JSON-LD schema to `/reference` for sitewide schema parity. | **Medium** (Structured data consistency in SERP) | Low | **High** |
| **Phase 2** | Tighten homepage meta description from 165 to 155 characters. | **Low** (Pixel-perfect SERP display) | Low | **Medium** |
| **Phase 3** | Optimize all 10 lesson titles to remove leading numbers and prioritize target keywords. | **High** (Lifts long-tail ranking signals) | Low | **High** |
| **Phase 3** | Expand under-length meta descriptions on Lessons 5 and 8 ($<135$ chars $\rightarrow$ 150 chars). | **Medium** (Improves organic search snippet CTR) | Low | **High** |
| **Phase 3** | Enrich individual lesson content with "Common Mistakes" and "Next Step Drills" sections. | **High** (Prevents thin content & increases dwell time) | Medium | **High** |
| **Phase 4** | Restrict global `WebSite` schema to root homepage (`/`) and refine inner page schemas. | **Low** (Cleans structured data according to Google specs) | Low | **Low** |
| **Phase 4** | Refine About and Contact page meta descriptions with clear brand value props. | **Low** (Trust & branding polish) | Low | **Low** |
| **Phase 5** | Execute the 16-point contextual internal linking plan (resolving near-orphan status). | **Critical** (Circulates link equity to Lessons 2–10) | Medium | **Critical** |
| **Phase 5** | Add future dedicated pillar guide for SOS in Morse Code (`/morse-code-sos`). | **High** (Captures 116K monthly search cluster) | High | **Future** |

---

## 2. Phase-by-Phase Detailed Action Plan

### Phase 1: Critical Technical & Indexing Issues

1. **Deploy OpenGraph Social Preview Assets (`og:image`):**
   - **Issue:** Currently, sharing `https://morsecodetranslatores.com/` on Discord, Twitter/X, Facebook, or WhatsApp produces an empty link without a preview image.
   - **Action:** Design and add an optimized 1200x630px branding card (`public/og-image.png`). Configure `openGraph.images` and `twitter.images` in `src/app/layout.tsx`.
2. **Resolve Lesson Title Tag Truncations:**
   - **Lesson 3:** Change from *"3. The Single-Element Foundations (E & T) and Binary Tree | Morse Code Platform"* (79 chars) to:  
     `Morse Code Binary Tree: Letters E & T | Morse Code Platform` (58 chars).
   - **Lesson 7:** Change from *"7. Word Boundaries & The Slash Separator Convention | Morse Code Platform"* (73 chars) to:  
     `Morse Code Word Spacing & Slash Separator | Morse Code` (53 chars).
   - **Lesson 10:** Change from *"10. Comprehensive Review & Transition to Drills | Morse Code Platform"* (69 chars) to:  
     `Morse Code Course Review & Practice Drills | Morse Code Platform` (63 chars).
3. **Trim Audio Decoder Meta Description:**
   - **Issue:** 180 characters causes trailing truncation on mobile search results.
   - **Action:** Update `src/app/audio-decoder/page.tsx` description to:  
     *"Free browser-local Morse code audio decoder. Upload WAV, MP3, or OGG files to transcribe acoustic beeps into English text instantly with zero server uploads."* (157 chars).

---

### Phase 2: Homepage & Major Tool Page Optimization

1. **Structured Data Parity on Reference Hub (`/reference`):**
   - **Issue:** `/reference` is missing `BreadcrumbList` JSON-LD schema, unlike all other core hubs.
   - **Action:** Add `BreadcrumbList` schema linking `Home` $\rightarrow$ `Reference Chart`.
2. **Homepage Snippet Polish (`/`):**
   - **Action:** Tighten description to 155 characters:  
     *"Translate English text to International Morse Code and decode Morse code instantly. Play audio tones with custom speed and pitch — free and browser-local."*
3. **Audio Decoder Title Enhancement (`/audio-decoder`):**
   - **Action:** Update title to highlight supported file types:  
     `Morse Code Audio Decoder — Upload & Transcribe WAV & MP3` (59 chars).

---

### Phase 3: Learning & Educational Pages

1. **Lesson Title Optimization (Keyword-First Positioning):**
   - Reposition lesson numbers to the end or eliminate them from the title tag to allow primary keywords to occupy the initial 30 characters:
     - Lesson 1: `What Is Morse Code & How It Works | Morse Code Platform` (55 chars)
     - Lesson 2: `Morse Code Timing: Dots, Dashes & Rules | Morse Code Platform` (58 chars)
     - Lesson 4: `Complete Morse Code Alphabet (A to Z) | Morse Code Platform` (57 chars)
     - Lesson 5: `Morse Code Numbers: 0–9 5-Element Rule | Morse Code Platform` (58 chars)
     - Lesson 8: `Reading Morse Code Groups & Audio Rhythm | Morse Code Platform` (61 chars)
     - Lesson 9: `Morse Code Audio Recognition & Speed (WPM) | Morse Code` (53 chars)
2. **Expand Under-Length Lesson Meta Descriptions:**
   - **Lesson 5 (`/learn/numbers-zero-through-nine`):** Expand from 130 to 148 chars:  
     *"Master Morse code numbers 0 through 9 using the predictable 5-element sliding window rule. Learn digit mnemonics and test your recall with audio."*
   - **Lesson 8 (`/learn/reading-morse-groups-and-rhythm`):** Expand from 121 to 148 chars:  
     *"Learn how to decode continuous Morse code letter groups without confusion. Master acoustic rhythm, character spacing pauses, and word boundaries."*
3. **Topical Enrichment on Individual Lesson Pages:**
   - Add two standard subheadings to all 10 lesson templates:
     - `Common Beginner Mistakes & Spacing Traps` (H2)
     - `Recommended Practice Drills & Exercises` (H2, linking to `/practice`)
   - Increases body content from ~350 words to ~600 words, elevating depth and search ranking resilience.

---

### Phase 4: Supporting Pages & Trust Signals

1. **Schema Hygiene (Avoid Redundant Global `WebSite` Markup):**
   - Restrict the primary `WebSite` JSON-LD schema declaration to `src/app/page.tsx` (the root domain), while inner pages declare their specific entity types (`Course`, `SoftwareApplication`, `AboutPage`, `ContactPage`, `WebPage`).
2. **Trust & E-E-A-T Transparency:**
   - Preserve and maintain verified citations to Recommendation ITU-R M.1677-1.
   - Ensure support email `morecodetranslator@gmail.com` remains easily discoverable in the site footer and contact interfaces.

---

### Phase 5: Internal Linking & Content Expansion

1. **Execute 16-Point Contextual Internal Linking Plan:**
   - Connect `/reference` to Lesson 5 (Numbers) and Lesson 6 (Punctuation).
   - Connect `/practice` to Lesson 2 (Timing) and Lesson 9 (Speed/WPM).
   - Connect `/quiz` to specific lesson study guides in its "How to Prepare" section.
   - Connect Lesson 10 to `/quiz` and `/practice` as capstone CTAs.
   - **Expected Outcome:** Eliminates the near-orphan status of Lessons 2–10, increasing their incoming links from 3 to 10+ and dramatically improving crawl depth.
2. **Future Content Expansion (Release 2.5 & 3 Roadmap):**
   - **SOS Authority Guide (`/morse-code-sos`):** Target the 116,750 monthly search cluster around `code morse sos`.
   - **Printable PDF Cheat Sheet (`/morse-code-sheet`):** Target teachers, students, and scout troops seeking offline printable Morse reference cards.
   - **Audio Tone Pack & WAV Exporter (`/morse-code-audio`):** Target users seeking downloadable Morse audio clips.

---

## 3. Implementation Safeguards & Quality Control

To guarantee zero regression during future authorized implementation:

1. **Zero Runtime Side Effects:** Any metadata or internal link update must preserve the static export model (`output: 'export'`) for Cloudflare Pages.
2. **Strict Verification Steps:**
   - Run `npx tsc --noEmit` to ensure 100% type safety.
   - Run `npm test` to verify that all 125 Vitest tests pass without regression.
   - Run `python scripts/verify_faq_parity.py` to maintain 100% Schema-to-HTML FAQ parity.
   - Run `npm run build` to confirm all 25 static routes pre-render cleanly to `out/`.
3. **No Unapproved Changes:** No code edits, metadata alterations, or content changes shall be applied without explicit user review and authorization.

