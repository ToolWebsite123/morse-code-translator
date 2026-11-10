# Morse Code Translator & Learning Platform — Product Requirements Document

**File:** `PRD.md`  
**Status:** Planning draft — approval required before implementation  
**Version:** 1.0  
**Last updated:** 19 October 2026  
**Product type:** Free public utility and learning website; not a SaaS  
**Primary implementation agent:** Google Antigravity Pro  
**Decision labels:** **Decided** = explicitly supplied by the owner;
**Proposed** = recommendation for review; **Needs Approval** =
unresolved and must not be silently decided by an implementation agent.

> **Implementation guardrail:** This document authorizes planning and
> review only. It does not authorize project setup, dependency
> installation, file creation inside the application, coding,
> deployment, or paid-service registration. The owner must explicitly
> approve the next implementation step before any of those actions
> begin.

## Decision summary

| Area                   | Current decision                                                                                      |
|------------------------|-------------------------------------------------------------------------------------------------------|
| Framework              | **Decided:** Next.js + React + TypeScript                                                             |
| Styling                | **Decided:** Tailwind CSS                                                                             |
| Morse standard         | **Decided:** International Morse Code                                                                 |
| Word separator         | **Decided:** `/`                                                                                      |
| Unsupported characters | **Decided:** Show a clear warning; never silently drop them                                           |
| Direction switch       | **Decided:** Reinterpret the current input under the newly selected direction                         |
| Audio in MVP           | **Decided:** Yes; default 15 WPM, 600 Hz; speed range 5–30 WPM                                        |
| Themes                 | **Decided:** Light and dark                                                                           |
| Processing             | **Decided:** Browser-local wherever possible                                                          |
| MVP backend            | **Decided:** No backend, database, accounts, AI, or microphone decoder                                |
| Release 2              | **Decided:** Lessons, quizzes, and account-free local progress                                        |
| Release 3              | **Decided:** Audio-file, microphone, and image decoders                                               |
| Release 4              | **Decided:** PWA/offline, embed widget, multilingual UI                                               |
| Later evaluation       | **Decided:** Public API and AI-assisted decoding only after demand is demonstrated                    |
| Hosting                | **Needs Approval:** Vercel is proposed, not selected                                                  |
| Analytics              | **Needs Approval:** Not selected; no analytics must be added by default                               |
| Progress storage       | **Decided:** No-account local storage using localStorage and/or IndexedDB when relevant               |
| Flash behavior         | **Decided:** On-screen flash simulation only; a web page cannot control a phone’s physical flashlight |
| Non-Latin scripts      | **Decided:** Later, each alphabet defined separately; do not claim universal support                  |

------------------------------------------------------------------------

# Part 1 — Sections 1–8

## 1. Project overview and vision

### 1.1 Product summary

Build a free, fast, reliable, mobile-friendly website that translates
ordinary text to International Morse Code and Morse Code back to text.
Users can copy results, inspect a character reference, and listen to or
visually follow Morse playback without creating an account.

The site will later grow into a learning platform with lessons,
practice, quizzes, and local progress tracking. Audio-file, microphone,
and image decoding are later releases and must not delay the dependable
core translator.

### 1.2 Vision and value proposition

**Proposed value proposition:** “Translate Morse code instantly, hear
it, see it, and learn it — free, without creating an account.”

The product should feel like a dependable utility first and a learning
resource second. A visitor should be able to arrive from a search
result, enter text, get a correct result, and copy or play it with
minimal friction.

### 1.3 Product principles

1.  **Correctness before feature count.** One canonical Morse engine
    must power the translator, reference chart, playback, lessons, and
    tests.
2.  **No silent data loss.** Unsupported characters and malformed Morse
    must be surfaced clearly.
3.  **Immediate usefulness.** The core translator must not require
    registration, onboarding, or a tutorial.
4.  **Local-first privacy.** Translation text is processed in the
    browser whenever practical and must not be sent to a server.
5.  **Accessible by default.** Keyboard, screen-reader, reduced-motion,
    focus, and contrast needs are considered during design—not added at
    the end.
6.  **Mobile-first.** The main tool must work on narrow screens and
    touch devices.
7.  **Progressive scope.** MVP first; each later release is gated by
    tested quality and explicit approval.
8.  **Evidence-based SEO.** Do not invent search volumes, ranking
    promises, competitor performance data, or content pages without a
    useful purpose.
9.  **No misleading capability claims.** The site must distinguish
    on-screen flash from physical flashlight control and International
    Morse from other alphabets or systems.
10. **Simple operations.** Avoid accounts, databases, paid APIs,
    analytics scripts, and complex infrastructure unless a specific
    approved feature requires them.

### 1.4 Competitor audit synthesis

The prior desk review identified useful patterns; its scores were
provisional estimates, not laboratory measurements.

| Reference                | Learning for this project                                                                                  |
|--------------------------|------------------------------------------------------------------------------------------------------------|
| Morse Code World         | Strong training depth; use as a benchmark for a later structured learning journey                          |
| Morse-CodeTranslator.com | Broad documented utility features; prioritize dependable core behavior before matching breadth             |
| MorseCodeApp             | Useful multi-input and local-first UX inspiration                                                          |
| Morse Encoder            | Content and language breadth; learn from information architecture without publishing thin duplicates       |
| Morse Code Master        | Structured learning ecosystem inspiration for Release 2                                                    |
| Ice Fractal              | Simplicity inspiration; prior review did not verify every feature                                          |
| Coddy                    | Not a Morse competitor; use only as a benchmark for learning flow, onboarding, and progressive instruction |

**Product opportunity:** combine an immediately usable translator,
transparent error handling, accurate audio, a searchable reference,
privacy-conscious behavior, and a clear path into learning—without
copying competitor branding or claiming features that have not been
built.

### 1.5 Success definition

The product is successful when: - Encoding and decoding pass the
approved mapping and edge-case test suite. - Users can complete core
translation and copy/playback workflows without an account. -
Unsupported input is visible and actionable. - The main pages work with
keyboard and screen readers and meet the approved contrast target. -
Production builds and end-to-end smoke tests pass. - SEO metadata,
canonical URLs, sitemap, robots rules, and internal links are correct. -
The site is deployed only after hosting and launch decisions are
approved.

Quantitative adoption targets are **Needs Approval**; do not invent
them.

## 2. Goals, non-goals, target audience, and user problems

### 2.1 Goals

- Provide bidirectional text/Morse conversion for the explicitly
  supported International Morse character set.
- Support clear letter and word boundaries, including `/` as the word
  separator.
- Make unsupported characters, malformed Morse groups, and ambiguous
  input visible.
- Provide audio playback with configurable speed (5–30 WPM) and tone
  (default 600 Hz).
- Provide a visual dot/dash playback mode and on-screen flash
  simulation, subject to accessibility controls.
- Publish a trustworthy reference chart that uses the same mapping
  source as the engine.
- Provide responsive light/dark themes.
- Establish technical SEO and a useful content architecture.
- Meet an agreed accessibility target, recommended WCAG 2.2 AA.
- Keep MVP processing in the browser and avoid accounts, databases,
  tracking, and backend services.
- Make later learning features possible without forcing their
  infrastructure into MVP.

### 2.2 Non-goals

MVP does **not** include: - User accounts, login, authentication, cloud
profiles, or social sign-in. - A database or application backend. -
Payments, subscriptions, premium plans, ads, or monetization flows. -
AI-based translation or decoding. - Microphone input or real-time audio
decoding. - Audio-file or image decoding. - Physical phone flashlight
control. - Guaranteed universal language/alphabet support. - Public API,
third-party integrations, or an embed widget. - Mandatory analytics or
tracking. - PWA/offline installation or multilingual UI. - A full
learning management system, certificates, leaderboards, or public user
profiles.

### 2.3 Target audiences

1.  **Quick-use visitors:** want to encode or decode a short message
    immediately.
2.  **Students and beginners:** need a simple chart and plain-language
    explanations.
3.  **Hobbyists and radio enthusiasts:** need reliable character
    mappings and adjustable playback.
4.  **Teachers and parents:** need a straightforward tool and reference
    for demonstrations.
5.  **Search visitors:** arrive for a specific query, guide, symbol, or
    question and need a useful answer.
6.  **Later learners:** want lessons, targeted practice, quizzes, and
    progress saved on their own device.

### 2.4 User problems and intended responses

| User problem                        | Product response                                                 |
|-------------------------------------|------------------------------------------------------------------|
| Unsure how to convert text          | Obvious two-way translator and clear direction label             |
| Cannot tell where letters/words end | Defined spacing rules and `/` word separator                     |
| Unsupported symbols disappear       | Explicit warning and preservation/reporting of unsupported input |
| Wants to hear timing                | Audio controls with speed and frequency settings                 |
| Wants to follow the signal visually | Dot/dash timeline and optional on-screen flash                   |
| Needs a reliable lookup             | Reference chart linked to the canonical mapping                  |
| Learns over multiple sessions       | Release 2 local progress without an account                      |
| Worried about privacy               | Clear statement that MVP translations stay in the browser        |
| Uses a phone or keyboard navigation | Responsive layout and accessible controls                        |
| Searches for a specialized guide    | Helpful, non-duplicative content pages with internal links       |

## 3. Product scope: MVP, Phase 2, and future features

Release labels are binding scope boundaries. A feature must not be
pulled into an earlier release just because an agent finds it
convenient.

### 3.1 MVP / Release 1

**Required:** - Home page with immediate access to the translator. -
Dedicated translator page or clearly defined translator section. - Text
→ Morse and Morse → text modes. - Direction switch reinterprets current
input; it does not automatically convert the previous output into the
new input. - International Morse mappings for the approved Latin
letters, digits, and punctuation set. - Slash `/` as the visible word
separator in Morse output. - Clear unsupported-character warnings; no
silent dropping. - Explicit malformed-Morse handling. - Copy output,
clear input, and a reset/default action. - Audio playback using Web
Audio API or another browser-native approach; no uploaded audio input. -
Default audio 15 WPM and 600 Hz; speed slider or equivalent range 5–30
WPM. - Visual playback of dots/dashes and optional on-screen flash
simulation. - Light and dark themes. - Reference chart. - About,
Privacy, FAQ, and a contact approach only after the public contact
method is approved. - Responsive layout, keyboard support, accessible
labels, reduced-motion support. - SEO fundamentals, testing,
privacy/security review, production deployment readiness.

**MVP acceptance gate:** no release until conversion correctness, error
handling, keyboard use, audio behavior, and production smoke tests pass.

### 3.2 Release 2 — Learning

- Beginner lesson sequence and individual lesson pages.
- Practice mode with answer feedback.
- Quiz mode with a defined question bank and scoring rules.
- Local progress using localStorage and/or IndexedDB.
- Optional weak-character practice based on local results.
- Resume/continue behavior stored only on the current device.
- Clear reset/delete progress action and explanation that clearing
  browser data may erase progress.

No account, cloud sync, or backend is introduced for these features.

### 3.3 Release 3 — Decoders and richer audio

- Audio-file decoder.
- Microphone decoder.
- Image decoder.
- More advanced playback/export options, potentially including WAV
  export.
- Farnsworth timing controls if approved and tested.
- File validation, limits, privacy copy, performance limits, and a
  documented accuracy evaluation set are mandatory before shipping any
  decoder.

These features must be scoped individually. They are not automatically
approved by their release label.

### 3.4 Release 4 — Ecosystem

- PWA/offline behavior.
- Embed widget.
- Multilingual UI.
- Optional share links only if privacy and URL-length behavior are
  explicitly specified.
- Offline cache strategy, language completeness, and embedding security
  need separate acceptance criteria.

### 3.5 After Release 4: evaluate only

- Public API.
- AI-assisted decoding.
- Cloud sync or accounts.
- Additional alphabet systems and language-specific Morse variants.

Evaluate only after demonstrated demand, a written use case,
accuracy/security review, maintenance estimate, and owner approval. No
promise that these will be built.

## 4. Complete feature list with descriptions and priorities

Priority labels: **P0** = release-blocking; **P1** = important for MVP;
**P2** = planned later; **P3** = evaluate only. “Proposed” items remain
recommendations until approved.

| ID    | Feature                       | Priority / release | Requirement summary                                                        |
|-------|-------------------------------|--------------------|----------------------------------------------------------------------------|
| F-001 | Bidirectional translator      | P0 / MVP           | Encode and decode through one canonical engine                             |
| F-002 | International Morse mapping   | P0 / MVP           | Explicitly supported mapping table; tests cover every entry                |
| F-003 | Word separator                | P0 / MVP           | `/` separates words in Morse output                                        |
| F-004 | Unsupported-character warning | P0 / MVP           | Show which characters are unsupported; never silently omit                 |
| F-005 | Malformed Morse warning       | P0 / MVP           | Identify invalid groups and preserve enough context to correct them        |
| F-006 | Direction switch              | P0 / MVP           | Reinterpret current input according to selected direction                  |
| F-007 | Copy output                   | P0 / MVP           | Copy only the visible output; show success/failure status accessibly       |
| F-008 | Clear/reset                   | P1 / MVP           | Clear input/output or restore defaults without hidden side effects         |
| F-009 | Audio playback                | P0 / MVP           | Play valid encoded Morse; default 15 WPM, 600 Hz, speed 5–30 WPM           |
| F-010 | Playback controls             | P1 / MVP           | Play/pause/stop; prevent overlapping playback                              |
| F-011 | Visual dot/dash playback      | P1 / MVP           | Show current symbol and timing progression                                 |
| F-012 | On-screen flash               | P1 / MVP           | Visual simulation only, no physical flashlight claims                      |
| F-013 | Speed control                 | P0 / MVP           | 5–30 WPM; default 15; labels and actual timing agree                       |
| F-014 | Tone control                  | P1 / MVP           | Default 600 Hz; range is **Needs Approval**                                |
| F-015 | Light/dark theme              | P1 / MVP           | Toggle, sensible system preference behavior, persistent preference         |
| F-016 | Reference chart               | P0 / MVP           | Table of supported characters and Morse sequences                          |
| F-017 | Home page                     | P1 / MVP           | Value proposition, tool entry point, key links                             |
| F-018 | Privacy page                  | P1 / MVP           | Accurate account of browser-local processing and storage                   |
| F-019 | FAQ                           | P1 / MVP           | Answer real product questions; no fabricated claims                        |
| F-020 | About page                    | P1 / MVP           | Explain purpose, supported standard, and limitations                       |
| F-021 | Contact route                 | P1 / MVP           | Publish only after contact method approved                                 |
| F-022 | SEO technical foundations     | P0 / MVP           | Metadata, canonical URLs, sitemap, robots, structured data where valid     |
| F-023 | Accessibility                 | P0 / MVP           | Keyboard, semantics, focus, contrast, reduced motion, status announcements |
| F-024 | Test suite                    | P0 / MVP           | Mapping, edge-case, UI, accessibility, and production checks               |
| F-025 | Lessons                       | P2 / Release 2     | Short progressive lessons and examples                                     |
| F-026 | Practice                      | P2 / Release 2     | Repeated drills and immediate feedback                                     |
| F-027 | Quizzes                       | P2 / Release 2     | Defined question types, scoring, retry flow                                |
| F-028 | Local progress                | P2 / Release 2     | Save on device; no account or server                                       |
| F-029 | Weak-character practice       | P2 / Release 2     | Practice characters with lower local accuracy                              |
| F-030 | Audio-file decoder            | P2 / Release 3     | Decode supported audio formats after evaluation                            |
| F-031 | Microphone decoder            | P2 / Release 3     | Real-time input with permission and stop controls                          |
| F-032 | Image decoder                 | P2 / Release 3     | Interpret supported image patterns only after accuracy validation          |
| F-033 | WAV export / advanced timing  | P2 / Release 3     | Optional export and Farnsworth timing after separate approval              |
| F-034 | PWA/offline                   | P2 / Release 4     | Installable/cached experience with stale-content rules                     |
| F-035 | Embed widget                  | P2 / Release 4     | Secure, documented embed interface                                         |
| F-036 | Multilingual UI               | P2 / Release 4     | Complete localized interface and metadata                                  |
| F-037 | Public API                    | P3 / Evaluate      | Only after demand and abuse/cost review                                    |
| F-038 | AI-assisted decoding          | P3 / Evaluate      | Only after benchmark, privacy review, and demand validation                |
| F-039 | Additional alphabets          | P3 / Evaluate      | Each alphabet/system defined and tested separately                         |
| F-040 | Analytics                     | Needs Approval     | No analytics provider or event tracking selected                           |

## 5. Full sitemap and proposed URL structure

URLs are **Proposed** and must be reviewed before content creation. Keep
URLs stable after launch; use redirects if a URL must change. Do not
publish empty pages just to populate the sitemap.

| URL                    | Page                              | Release               | Indexing guidance                                                               |
|------------------------|-----------------------------------|-----------------------|---------------------------------------------------------------------------------|
| `/`                    | Home + prominent translator entry | MVP                   | Index                                                                           |
| `/translator/`         | Dedicated translator              | MVP                   | Index if it has distinct useful content; otherwise canonicalize/merge with home |
| `/reference/`          | International Morse chart         | MVP                   | Index                                                                           |
| `/about/`              | About the tool and its limits     | MVP                   | Index                                                                           |
| `/privacy/`            | Privacy policy                    | MVP                   | Index                                                                           |
| `/faq/`                | FAQ                               | MVP                   | Index if answers are genuinely useful                                           |
| `/contact/`            | Contact                           | MVP, pending method   | Publish only after contact method approval                                      |
| `/learn/`              | Learning hub                      | Release 2             | Publish when real lessons exist                                                 |
| `/learn/[slug]/`       | Individual lesson                 | Release 2             | Each page must be complete and distinct                                         |
| `/practice/`           | Practice tool                     | Release 2             | Index only if useful content supports the page                                  |
| `/quiz/`               | Quiz tool                         | Release 2             | Index only if page has stable, helpful content                                  |
| `/guides/`             | Guides hub                        | MVP or staged content | Publish when there are enough useful guides                                     |
| `/guides/[slug]/`      | Individual guide                  | MVP or later          | Unique intent, no thin template pages                                           |
| `/audio-decoder/`      | Audio-file decoder                | Release 3             | Publish only when implemented and tested                                        |
| `/microphone-decoder/` | Live microphone decoder           | Release 3             | Publish only when implemented and tested                                        |
| `/image-translator/`   | Image decoder                     | Release 3             | Publish only when implemented and tested                                        |
| `/embed/`              | Embed documentation               | Release 4             | Publish only when embed exists                                                  |
| `/offline/`            | Optional offline help             | Release 4             | Only if it adds value                                                           |
| `/sitemap.xml`         | XML sitemap                       | MVP                   | Generated from indexable canonical pages                                        |
| `/robots.txt`          | Crawler rules                     | MVP                   | Never accidentally block the production site                                    |

**Routing rules** - Do not create multiple pages targeting the same
intent without a clear user benefit. - Do not create programmatic SEO
pages from every character/word combination merely because generation is
possible. - Unbuilt future features must not be presented as available;
do not link users to broken or placeholder tools. - Dynamic route
segments are implementation details; every published slug needs a
content owner, purpose, canonical URL, title, and review status. - The
final domain and canonical host are **Needs Approval**.

## 6. Detailed requirements for every page

### 6.1 Home `/`

**Purpose:** immediately communicate the value and let visitors start
translating.

Required: - Clear heading and one-sentence explanation. - Prominent
text/Morse translator entry point, either embedded or a clear link to
`/translator/`. - Visible language/standard note: International Morse
Code. - Clear primary actions: translate, copy, play, reference. - Short
explanation of privacy: translation runs in the browser for MVP, subject
to actual implementation verification. - Links to Reference, FAQ, About,
Privacy, and approved Contact. - Responsive layout and light/dark
theme. - No fake testimonials, invented usage numbers, or unsupported
“most accurate” claims.

Acceptance: - First-time visitor can identify the tool and start input
without registration. - Main actions are keyboard accessible. - No
future-release feature is represented as live.

### 6.2 Translator `/translator/`

**Purpose:** complete translation workflow.

Required: - Explicit mode selector: Text → Morse and Morse → Text. -
Input area, output area, clear labels, and accessible status region. -
Direction switch follows the fixed reinterpretation rule: current input
remains the same string, but is reprocessed using the newly selected
mode. Do not move the previous output into input. - Copy output; clear
input; reset according to documented behavior. - Visible
unsupported-character or malformed-Morse warnings tied to the relevant
input. - Audio controls for valid Morse output and visual playback. -
Speed selector/range 5–30 WPM, default 15 WPM. - Tone defaults to 600
Hz; control range is not yet decided. - Show the word-separator
convention (`/`) near the tool or reference link. - Do not send
translation contents to any server or analytics event. - Empty input
produces empty output and no misleading error. - Long input must not
freeze the page; input limits and performance behavior are **Needs
Approval**.

Acceptance: - Every supported mapping is correct in both directions. -
Warnings do not silently change the submitted text. - Copy failure is
reported; unsupported clipboard API must not crash the page. - Audio can
be stopped and cannot overlap with itself.

### 6.3 Reference `/reference/`

Required: - Table for supported A–Z, 0–9, and approved punctuation. -
Each row has a character, Morse sequence, and accessible label. -
Optional search/filter is **Proposed**. - Optional click-to-play is
**Proposed** and must use the same playback engine. - Explain that the
page documents International Morse for the listed characters, not every
writing system. - Explain the `/` word separator convention. - Prosigns
must be separated from ordinary character entries and clearly labeled as
convention-dependent.

Acceptance: - Chart data comes from the same canonical mapping source
used by the translator. - Every listed character has a passing mapping
test. - Table is navigable by keyboard and understandable to screen
readers.

### 6.4 About `/about/`

Required: - Explain the tool’s purpose and supported International Morse
scope. - Explain browser-local processing only if verified in the
shipped implementation. - Clearly state that physical flashlight
control, AI decoding, and microphone decoding are not MVP features. - Do
not invent team credentials, founding story, or accuracy certifications.

### 6.5 Privacy `/privacy/`

Required: - Describe what the site processes locally and what, if
anything, is transmitted to hosting infrastructure. - State that MVP
translation text is not intentionally sent to an application backend. -
Explain local storage used for theme/preferences; Release 2 progress
storage must be documented when added. - Describe any hosting logs,
cookies, third-party scripts, analytics, or contact submissions
accurately after those choices are made. - Do not promise “zero data
collection” until hosting and production behavior have been verified. -
Include effective date and a contact method once approved.

### 6.6 FAQ `/faq/`

Cover at minimum: - How to translate text to Morse and back. - What
International Morse means. - Why `/` is used. - What happens to
unsupported characters. - How to hear Morse. - What WPM and tone
frequency mean. - Why audio may require a user gesture. - Whether
translations leave the browser. - Why non-Latin alphabets may not
work. - Whether the page controls a phone’s physical flashlight. - How
local progress works when Release 2 ships.

Answers must match actual behavior; update FAQ alongside product
changes. FAQ structured data is optional and must follow current
search-engine eligibility rules.

### 6.7 Contact `/contact/`

**Needs Approval:** choose public email, form, or another contact
method. A project email has been provided in earlier planning context,
but publishing it publicly is not automatically approved.

Until approved: - Do not expose a guessed or invented address. - Do not
create a form that implies a backend exists. - Do not publish a dead
contact page. A minimal temporary page is only allowed if the owner
approves its wording and purpose.

If a form is later approved, define spam protection, storage, delivery,
retention, and privacy disclosures before implementation.

### 6.8 Learning hub `/learn/` — Release 2

- Introduce a clear beginner path.
- List only lessons that exist and have been reviewed.
- Show estimated lesson time only if it is a reasonable, reviewed
  estimate.
- Explain whether progress is stored locally.
- No account prompts, leaderboards, or cloud sync.

### 6.9 Lesson `/learn/[slug]/` — Release 2

- One learning objective per lesson.
- Plain-language explanation, examples, and short practice activity.
- Correct answer feedback with an explanation.
- Previous/next lesson navigation based on an approved sequence.
- Accessible text equivalents for audio and visual signals.
- Local completion state only after progress storage is implemented.

### 6.10 Practice `/practice/` — Release 2

- User selects or is given a practice direction (text-to-Morse
  recognition or Morse-to-text recognition).
- Prompt, answer input, submit/check, feedback, and next item.
- Define acceptable answer normalization before scoring.
- Avoid penalizing harmless case differences when the exercise is
  case-insensitive.
- No score upload or account requirement.

### 6.11 Quiz `/quiz/` — Release 2

- Show instructions, question, answer choices/input, result, and retry.
- Define question selection, scoring, passing thresholds, and retry
  behavior before build.
- Avoid claiming that a score certifies proficiency.
- Save results locally only after the local-progress model is approved.

### 6.12 Guides hub and guide pages `/guides/`, `/guides/[slug]/`

- Publish only pages that answer a distinct user need.
- Each guide requires a target intent, accurate content, examples,
  title/meta description, internal links, author/reviewer policy, and
  fact check.
- Programmatic SEO templates must generate genuinely different useful
  answers; no mass-produced near-duplicate pages.
- Do not publish unverified keyword-volume estimates or ranking
  guarantees.
- Guides about alternate alphabets must be labeled accurately and remain
  out of scope until the relevant mapping is defined and tested.

### 6.13 Audio decoder `/audio-decoder/` — Release 3

Not part of MVP. Before release, define supported formats, file
size/duration limits, decoding algorithm, browser support, accuracy
evaluation, progress/error UI, and privacy behavior. Prefer local
processing where feasible. Do not claim reliable decoding until
benchmarked.

### 6.14 Microphone decoder `/microphone-decoder/` — Release 3

Not part of MVP. Must request microphone permission only after user
action, show recording/listening status, provide a visible stop control,
handle denial/device errors, and stop media tracks when finished or
leaving the feature. Explain local processing and do not record or
upload audio without explicit design and approval.

### 6.15 Image translator `/image-translator/` — Release 3

Not part of MVP. Define accepted image formats and size limits, safe
parsing, orientation/contrast handling, privacy, supported visual
patterns, confidence/error behavior, and a representative accuracy
benchmark. Do not promise general image understanding.

### 6.16 Embed `/embed/` — Release 4

Not part of MVP. Define supported integration, origin/security policy,
sizing, accessibility, attribution (if any), versioning, and how the
embed avoids collecting user-entered text. A sandboxed iframe is a
**Proposed** option, not a final architecture decision.

### 6.17 Error and not-found pages

- Provide a useful 404 page with links to Home and Translator.
- Do not expose stack traces, environment values, or internal paths.
- Unexpected errors should be understandable and recoverable; keep raw
  user input out of logs.

## 7. User journeys and workflows

### Journey 1 — Quick text to Morse

1.  Visitor opens Home or Translator.
2.  Text → Morse is selected.
3.  Visitor enters supported text.
4.  Output updates according to the documented input behavior.
5.  Visitor copies the result.
6.  A visible and screen-reader-readable status confirms copy success or
    explains failure.

**Pass condition:** supported characters encode correctly; no account or
server request is required.

### Journey 2 — Decode Morse to text

1.  Visitor selects Morse → Text.
2.  Visitor enters Morse groups separated by spaces and words separated
    by `/`.
3.  The engine parses each group.
4.  Valid groups decode; invalid groups produce a warning and a defined
    placeholder/error representation.
5.  Visitor can correct the input and copy the valid output.

**Pass condition:** invalid groups are never silently removed.

### Journey 3 — Switch direction

1.  Visitor enters text in the current input.
2.  Visitor switches direction.
3.  The exact current input string remains in the input.
4.  The engine reinterprets it using the new direction.
5.  Any invalidity is shown as a warning.

**Pass condition:** the prior output is not silently moved into the
input.

### Journey 4 — Hear a Morse message

1.  Visitor enters text in Text → Morse mode.
2.  Visitor presses Play.
3.  Browser audio starts after the user gesture.
4.  Visitor may pause/stop and adjust WPM within 5–30.
5.  The playback cursor/highlight follows the signal.
6.  End of playback returns controls to a stable stopped state.

**Pass condition:** no overlapping playback; audio timing follows the
canonical Morse sequence.

### Journey 5 — Adjust pitch

1.  Visitor opens audio settings.
2.  Current frequency is shown; initial value is 600 Hz.
3.  Visitor chooses a supported frequency.
4.  Next playback uses the selected frequency.
5.  Invalid values cannot be submitted.

**Pass condition:** frequency control bounds and step size match the
approved specification. The range itself is **Needs Approval**.

### Journey 6 — Use visual playback

1.  Visitor enables visual playback or on-screen flash simulation.
2.  Visitor starts playback.
3.  Dots and dashes are represented with distinguishable durations.
4.  On-screen flash is a visual effect only.
5.  Visitor can stop playback; reduced-motion preferences are respected.

**Pass condition:** the UI never claims to activate a device flashlight;
no essential information is conveyed only by flashing.

### Journey 7 — Find a character in the reference

1.  Visitor opens Reference.
2.  Visitor locates a character in the chart.
3.  Visitor reads its Morse representation.
4.  If click-to-play is implemented, the visitor can trigger playback.
5.  Visitor returns to Translator.

**Pass condition:** chart and translator mappings cannot drift apart.

### Journey 8 — Change theme

1.  Visitor toggles light/dark theme or the initial theme follows the
    operating-system preference.
2.  Theme changes without losing translation input.
3.  The preference persists locally if persistence is implemented.
4.  Focus and text contrast remain visible.

**Pass condition:** no refresh or theme switch clears user input.

### Journey 9 — Learn and resume (Release 2)

1.  Visitor opens Learn.
2.  Visitor completes a lesson and its practice.
3.  Completion is stored on the device.
4.  Visitor returns later on the same browser/device.
5.  The site shows saved progress.
6.  Visitor can reset progress.

**Pass condition:** no account is created and no progress is sent to a
server.

### Journey 10 — Take a quiz (Release 2)

1.  Visitor opens Quiz and sees instructions.
2.  Visitor answers each question.
3.  The system applies documented normalization and scoring rules.
4.  Results and review are shown.
5.  Retry is available.
6.  Progress is saved locally only if the user-facing behavior is
    approved.

**Pass condition:** same answers produce consistent scoring across runs.

### Journey 11 — Use an unsupported character

1.  Visitor enters text containing one or more unsupported characters.
2.  Supported characters are processed according to the documented rule.
3.  The interface identifies each unsupported character or location.
4.  The user can edit the input.
5.  No unsupported character is silently dropped without warning.

**Pass condition:** warning is visible, specific, and accessible.

### Journey 12 — Use a future decoder (Release 3)

1.  Visitor opens a decoder page only after release.
2.  Visitor reviews supported formats, limits, and privacy explanation.
3.  Visitor selects a file or grants microphone permission after a clear
    action.
4.  The tool validates input and shows progress/errors.
5.  Result includes uncertainty where appropriate.
6.  Temporary data is discarded according to the approved retention
    behavior.

**Pass condition:** no upload or processing claim is made unless it
matches the actual implementation and privacy disclosure.

## 8. Functional requirements with IDs and acceptance criteria

Requirement IDs are stable references for implementation tasks and
tests. Every P0 requirement must pass before MVP release.

| ID     | Requirement                             | Acceptance criteria                                                                                                             |
|--------|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| FR-001 | Encode supported text                   | Every supported character maps to the approved International Morse sequence; automated tests cover the complete table           |
| FR-002 | Decode valid Morse                      | Every approved code decodes to its expected character                                                                           |
| FR-003 | Normalize input                         | Case handling, whitespace, Unicode normalization, and punctuation behavior follow the explicit rules in Section 15              |
| FR-004 | Separate letters and words              | Morse letters use the specified delimiter; `/` separates words; repeated/leading/trailing separators follow documented behavior |
| FR-005 | Report unsupported text                 | Each unsupported character is reported; it is never silently discarded                                                          |
| FR-006 | Report invalid Morse                    | Invalid or unknown groups trigger a warning and a defined output representation                                                 |
| FR-007 | Preserve user input on direction switch | Switching modes leaves input text unchanged and reprocesses it under the new mode                                               |
| FR-008 | Empty-input behavior                    | Empty/whitespace-only input shows empty output and no false error                                                               |
| FR-009 | Copy output                             | Copy action writes exactly the visible output when browser permission allows; success/failure status is accessible              |
| FR-010 | Clear/reset                             | Clear empties input and output; reset behavior is defined and does not erase local progress accidentally                        |
| FR-011 | Audio playback                          | Valid Morse can be played after user interaction; stop ends scheduled audio                                                     |
| FR-012 | WPM setting                             | UI accepts 5–30 WPM inclusive; default is 15; the generated timing matches the selected value within test tolerance             |
| FR-013 | Tone frequency                          | Default tone is 600 Hz; range and increment remain blocked pending owner approval                                               |
| FR-014 | Playback exclusivity                    | Starting a new playback stops/clears any previous scheduled playback                                                            |
| FR-015 | Visual timing                           | Visual dot/dash durations match audio timing rules; no visual-only meaning is omitted from accessible text                      |
| FR-016 | On-screen flash                         | Visual simulation only; no physical flashlight claim; reduced-motion and user-stop controls exist                               |
| FR-017 | Theme                                   | Light and dark modes exist; changing theme preserves input and maintains approved contrast                                      |
| FR-018 | Reference consistency                   | Reference chart is generated from the same mapping source as conversion logic                                                   |
| FR-019 | Local-first MVP                         | Translation input/output are not sent to an application backend or analytics system                                             |
| FR-020 | SEO metadata                            | Each indexable page has unique title, description, canonical URL, and correct robots behavior                                   |
| FR-021 | Sitemap and robots                      | Sitemap includes only canonical indexable pages; robots rules do not block needed assets or the entire production site          |
| FR-022 | Accessibility                           | Core flows pass keyboard-only tests, automated checks, and manual screen-reader/focus review                                    |
| FR-023 | Responsive layout                       | Core tool works at narrow mobile, tablet, and desktop widths without horizontal page overflow                                   |
| FR-024 | Error handling                          | Clipboard, audio, storage, and browser capability failures have recoverable user-facing messages                                |
| FR-025 | Local progress (R2)                     | Progress persists on the same browser/device, can be reset, and is never uploaded                                               |
| FR-026 | Lesson feedback (R2)                    | Each exercise has deterministic correct/incorrect feedback and a useful explanation                                             |
| FR-027 | Quiz scoring (R2)                       | Scoring and answer normalization are specified and unit-tested                                                                  |
| FR-028 | Decoder file validation (R3)            | Unsupported type/size/duration is rejected before processing; error explains allowed inputs                                     |
| FR-029 | Microphone lifecycle (R3)               | Permission is user-initiated; recording visibly stops and media tracks are released                                             |
| FR-030 | Image decoder validation (R3)           | Supported image types and limits are enforced; output limitations and uncertainty are shown                                     |
| FR-031 | Privacy documentation                   | Published statements match verified code, hosting, storage, and integrations                                                    |
| FR-032 | Production build                        | Clean install/build and automated test commands pass in the approved environment                                                |
| FR-033 | No false claims                         | UI/content never advertises unbuilt features, universal alphabet support, or physical flashlight control                        |
| FR-034 | No account/backend creep                | MVP contains no auth, database, billing, or backend unless a separately approved requirement changes scope                      |
| FR-035 | Release gate                            | Deployment is blocked until owner approves hosting, contact method, unresolved settings, and release checklist                  |

**Global acceptance rule:** when a requirement conflicts with a decided
owner constraint, preserve the owner constraint and flag the conflict.
Do not quietly reinterpret the requirement. A test failure is not
“fixed” by weakening expected behavior without approval.

------------------------------------------------------------------------

# Part 2 — Sections 9–16

## 9. UI/UX requirements and design system

### 9.1 Visual direction

**Decided direction:** teal and amber. The exact tokens below are
**Proposed** and require contrast verification before being treated as
final.

Design goals: - Calm, clear utility interface rather than a busy
dashboard. - The translator is the main visual focus. - Use strong
labels, generous spacing, and clear distinction between input, output,
warnings, and playback state. - Avoid decorative motion that distracts
from Morse timing. - Use icons only with visible/accessible labels where
meaning is not universally obvious. - Use consistent component styles
across Home, Translator, Reference, and later lessons.

### 9.2 Proposed color tokens

| Token      | Light theme | Dark theme | Intended use                                                 |
|------------|-------------|------------|--------------------------------------------------------------|
| Primary    | `#0F766E`   | `#2DD4BF`  | Primary action/links                                         |
| Accent     | `#F59E0B`   | `#FBBF24`  | Secondary highlight, not small text on white unless verified |
| Background | `#F8FAFC`   | `#0B1220`  | Page background                                              |
| Surface    | `#FFFFFF`   | `#111827`  | Cards, input areas                                           |
| Text       | `#0F172A`   | `#F1F5F9`  | Main text                                                    |
| Muted text | `#475569`   | `#CBD5E1`  | Secondary text                                               |
| Border     | `#CBD5E1`   | `#334155`  | Borders/dividers                                             |
| Error      | `#B91C1C`   | `#FCA5A5`  | Errors; pair with icon/text                                  |
| Success    | `#166534`   | `#86EFAC`  | Success status; pair with text/icon                          |
| Focus ring | `#0F766E`   | `#FBBF24`  | Keyboard focus; exact combination to verify                  |

### 9.3 Contrast check

Contrast must be calculated using WCAG relative luminance rules, not
judged by eye. WCAG AA targets: - Normal text: at least **4.5:1**. -
Large text: at least **3:1**. - Essential UI boundaries and graphical
objects: at least **3:1** against adjacent colors where required.

The following are **approximate planning checks**, not a substitute for
a final automated and manual audit:

| Pair                                                     | Approx. contrast | Planning result                                                                           |
|----------------------------------------------------------|-----------------:|-------------------------------------------------------------------------------------------|
| Light text `#0F172A` on white `#FFFFFF`                  |           17.9:1 | Pass                                                                                      |
| Light muted `#475569` on white `#FFFFFF`                 |            7.6:1 | Pass                                                                                      |
| White on primary teal `#0F766E`                          |            5.5:1 | Pass for normal text                                                                      |
| Light primary teal `#0F766E` on white                    |            5.5:1 | Pass                                                                                      |
| Accent amber `#F59E0B` on white                          |      about 2.1:1 | **Fail for normal text**; use as fill/highlight with dark text or verify another pairing  |
| Dark text `#0F172A` on accent `#FBBF24`                  |       about 11:1 | Pass                                                                                      |
| Dark text `#F1F5F9` on dark background `#0B1220`         |       about 16:1 | Pass                                                                                      |
| Dark text `#F1F5F9` on surface `#111827`                 |       about 16:1 | Pass                                                                                      |
| Dark primary teal `#2DD4BF` on dark background `#0B1220` |    high contrast | Verify exact ratio in final token checker                                                 |
| Dark border `#334155` against surface `#111827`          | likely below 3:1 | Do not rely on it alone for essential control boundaries; verify and strengthen if needed |

**Release gate:** run a contrast checker against every actual
text/background and control/background pairing, including hover,
disabled, warning, and focus states. Adjust only the proposed tokens as
needed; do not sacrifice contrast to preserve a color. Document the
final tested palette in the implementation.

### 9.4 Typography and spacing

**Proposed:** - Use a readable system font stack initially; avoid
downloading a font unless there is a clear benefit. - Use a consistent
spacing scale based on 4 px increments. - Body text should remain
comfortably readable; default 16 px is recommended. - Code/Morse output
should use a legible monospace font with adequate letter spacing. - Line
length for long-form guides should be controlled for readability. -
Avoid using color as the only distinction between valid, invalid, and
selected states.

### 9.5 Components and interaction patterns

Required shared components: - Site header/navigation and footer. - Theme
toggle. - Text input and output panels. - Mode selector/direction
switch. - Copy button with status message. - Clear/reset action. -
Warning/error/success status components. - Audio player controls and
settings. - Visual Morse playback component. - Reference table. -
Reusable page title/description layout.

**Proposed:** use shared components and design tokens rather than
duplicating page-specific controls. Buttons must show hover, focus,
active, disabled, and loading states where applicable.

### 9.6 Interaction rules

- No automatic audio playback on page load.
- Audio starts only after explicit user interaction.
- A Play action changes to a clear playing state; Stop always remains
  available during playback.
- Warnings are specific and placed near the affected field, with a
  summary if several exist.
- Do not clear input on copy, mode switch, or theme switch.
- Use confirmation only for destructive actions such as clearing saved
  progress—not for every routine interaction.
- Avoid auto-scrolling that moves focus unexpectedly.
- Respect reduced-motion preference and provide a non-flashing
  alternative.

## 10. Responsive design and accessibility

### 10.1 Responsive behavior

**Proposed breakpoints:** use Tailwind defaults unless the design review
identifies a real need for custom breakpoints. Test at minimum: -
320–360 px narrow mobile. - 390–430 px common mobile. - 768 px tablet. -
1024 px small desktop. - 1280 px and wider desktop.

Requirements: - On narrow screens, input/output panels stack
vertically. - Buttons remain tappable without horizontal overflow. -
Controls wrap or stack without hiding labels. - Reference table remains
usable; horizontal scrolling is allowed inside the table container if
necessary, but not across the whole page. - Long Morse strings wrap
safely and do not break the viewport. - Theme toggle and navigation
remain usable with touch and keyboard. - Test zoom up to 200% and reflow
where applicable.

### 10.2 Accessibility target

**Proposed target:** WCAG 2.2 AA for core flows.

Requirements: - Semantic headings in logical order. - Native buttons,
inputs, labels, tables, and links where suitable. - Every input has a
programmatic label; placeholder text is not the only label. - Keyboard
access to all functions with visible focus. - No keyboard traps. -
Screen-reader announcements for copy result, conversion warnings,
playback state, and validation messages without excessively announcing
every keystroke. - Focus is not lost when results update. - Color is not
the sole way to convey status. - Text/background and control contrast
meet approved thresholds. - Audio has text/visual equivalents; no
essential instruction is audio-only. - Respect
`prefers-reduced-motion`. - No rapid flashing that may trigger
photosensitive reactions; visual flash must be controllable and must not
be required to use the tool. - Do not autoplay audio or surprise users
with sound. - Touch targets should be comfortably sized; **Proposed:**
aim for 44 × 44 CSS pixels when practical. - Errors explain how to
correct the input. - The chart uses proper table headers and accessible
reading order.

### 10.3 Accessibility test plan

- Keyboard-only pass for all core workflows.
- Automated checks with an accessibility scanner.
- Manual screen-reader review of translator labels, warnings, copy
  status, and playback.
- Contrast checks for all states.
- Reduced-motion test.
- Zoom/reflow and mobile touch test.
- Verify visual playback communicates state without relying on color
  alone.

## 11. Recommended technology stack and architecture, with reasons

The framework and styling are **Decided**. Specific supporting libraries
are **Proposed** and should be selected only when necessary.

| Layer              | Recommendation                                                                     | Status / reason                                                                   |
|--------------------|------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| Framework          | Next.js with App Router                                                            | Decided; supports React pages, routing, metadata, and static/mostly static output |
| UI                 | React                                                                              | Decided                                                                           |
| Language           | TypeScript                                                                         | Decided; catches many mapping and state mistakes before runtime                   |
| Styling            | Tailwind CSS                                                                       | Decided                                                                           |
| Morse engine       | Small pure TypeScript module                                                       | Proposed; testable without UI or server                                           |
| Audio              | Browser Web Audio API                                                              | Proposed; avoids a paid audio service and keeps playback local                    |
| State              | React state for transient UI                                                       | Proposed; sufficient for MVP                                                      |
| Theme/preferences  | localStorage or framework-supported theme approach                                 | Proposed; do not introduce unnecessary dependencies                               |
| Release 2 progress | localStorage for small settings; IndexedDB if structured progress grows            | Decided storage must remain local; exact choice is Proposed                       |
| Tests              | Vitest or equivalent for unit tests; Playwright or equivalent for end-to-end tests | Proposed; select minimal maintained tooling                                       |
| Accessibility      | Automated scanner plus manual review                                               | Proposed                                                                          |
| Package manager    | npm unless owner/environment prefers another                                       | Needs Approval before setup                                                       |
| Hosting            | Vercel                                                                             | Proposed only; not selected                                                       |
| Analytics          | None until approved                                                                | Needs Approval                                                                    |
| Content            | Markdown/MDX or simple structured content                                          | Proposed; select based on maintainability and build constraints                   |
| Database           | None for MVP and Release 2                                                         | Decided                                                                           |
| API/backend        | None for MVP and Release 2                                                         | Decided                                                                           |
| Authentication     | None                                                                               | Decided                                                                           |
| AI provider        | None                                                                               | Decided for MVP                                                                   |

### 11.1 Architecture

MVP data flow:

`User input → UI state → pure Morse engine → output + warnings → copy/audio/visual playback`

- The pure Morse engine owns normalization, encoding, decoding, and
  validation rules.
- The reference chart reads the same canonical mapping source.
- Audio and visual playback consume the same parsed representation and
  timing configuration.
- The UI must not contain duplicate character mappings.
- Browser preferences are separate from translation logic.
- No translation text is posted to a server.
- Public pages should be statically rendered where practical;
  interactive behavior runs client-side.
- Avoid making the entire site client-rendered if only the translator
  requires interactivity.

### 11.2 Proposed project structure

Exact folders are **Proposed**, not created:

- `src/app/` — routes, layouts, metadata, error and not-found pages.
- `src/components/` — shared UI components.
- `src/features/translator/` — translator interface and state.
- `src/features/audio/` — playback controls and visual playback.
- `src/lib/morse/` — mapping, encoder, decoder, normalization,
  validation, timing.
- `src/lib/storage/` — theme and future local progress helpers.
- `src/content/` — reviewed lesson and guide content.
- `src/lib/seo/` — reusable metadata helpers if needed.
- `tests/` — unit, integration, and end-to-end tests.

Do not create all folders pre-emptively. Create only the structure
needed for the approved task.

## 12. Frontend and backend requirements, with a table of which features truly need a backend

### 12.1 Frontend requirements

- Run encoding/decoding locally.
- Validate and warn on unsupported input.
- Manage mode, input, output, theme, audio settings, and playback state.
- Handle browser capability failures gracefully.
- Keep user-entered content out of URLs, logs, analytics, and external
  services.
- Provide accessible loading, error, success, and playback states.
- Persist only approved preferences and later local progress.
- Clean up audio nodes/timers and future media tracks to avoid leaks.

### 12.2 Backend requirement matrix

| Feature                        | Backend required?                                                                     | Reason / decision                                                             |
|--------------------------------|---------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| Text ↔ Morse conversion        | No                                                                                    | Pure deterministic browser logic                                              |
| Reference chart                | No                                                                                    | Static content from canonical mapping                                         |
| Audio playback                 | No                                                                                    | Browser Web Audio API                                                         |
| Visual playback / screen flash | No                                                                                    | Browser UI only                                                               |
| Theme preference               | No                                                                                    | Local preference                                                              |
| Lessons and quizzes            | No                                                                                    | Content and scoring can run locally                                           |
| Local learning progress        | No                                                                                    | localStorage/IndexedDB                                                        |
| Audio-file decoder             | Not inherently                                                                        | Prefer local processing if feasible; evaluate browser limits in Release 3     |
| Microphone decoder             | Not inherently                                                                        | Browser permission and local signal processing may suffice                    |
| Image decoder                  | Not inherently                                                                        | Browser-side processing may be possible; benchmark performance/accuracy first |
| PWA/offline                    | No backend inherently                                                                 | Static assets/cache strategy; hosting still required                          |
| Embed widget                   | No application backend inherently                                                     | Depends on approved embed architecture                                        |
| Public API                     | Yes, if hosted API is offered                                                         | Needs endpoint, rate limiting, abuse protection, monitoring, and versioning   |
| AI-assisted decoding           | Usually external service or server-side component                                     | Not approved; requires privacy, cost, safety, and accuracy review             |
| Contact form                   | Usually needs delivery/storage service                                                | Contact method is not approved; do not build yet                              |
| Analytics                      | No backend owned by this site necessarily, but third-party tracking may transmit data | Provider and event policy need approval                                       |
| Accounts/cloud sync            | Yes                                                                                   | Explicitly excluded from current plan                                         |
| Payments                       | Yes                                                                                   | Explicitly excluded                                                           |

**Rule:** do not add a backend merely because Next.js supports server
routes. Every server endpoint must have a documented requirement, data
flow, privacy rationale, and owner approval.

## 13. Data models and database requirements, if needed

### 13.1 MVP

No database. No server-side user records. No account table. No payment
model.

The core mapping is application data, not user data. It should have one
canonical representation and tests.

### 13.2 Local preferences

**Proposed local preference fields:** - `theme`: `light`, `dark`, or
`system` if system preference behavior is approved. - `audioWpm`:
integer from 5 to 30; default 15. - `audioFrequencyHz`: default 600;
allowed range pending approval. - Optional visual playback preferences
only if needed.

Invalid or stale preference values must fall back safely to defaults. Do
not store translation text persistently by default.

### 13.3 Release 2 local progress

**Proposed conceptual model; not a database schema:** - `schemaVersion`:
number for migration. - `lessonProgress`: lesson identifier, completion
state, last-updated timestamp. - `quizAttempts`: quiz identifier, score,
total, attempt timestamp, optionally per-question results if approved. -
`characterStats`: character identifier, correct count, attempt count,
last-practiced timestamp. - `settings`: local practice preferences.

Requirements: - Store on the user’s device only. - Provide a
reset/delete control. - Version the stored format and handle
malformed/corrupt data gracefully. - Never place personal or sensitive
data in progress storage. - Explain that browser storage may be cleared
by the user/browser and does not sync between devices. - Decide exact
retention and whether detailed answer history is needed before Release
2.

### 13.4 Release 3 temporary data

File, image, and audio data should remain in memory or temporary browser
objects where practical and be released when finished. If any server
processing is later proposed, it requires a separate
privacy/data-retention review and explicit approval.

## 14. API and third-party integration requirements, if needed

### 14.1 MVP

No public API, external AI, analytics provider, authentication service,
database, or third-party translation service.

Potential browser-native capabilities: - Web Audio API for playback. -
Clipboard API for copy, with fallback/error handling. - localStorage for
theme/preferences. - Browser media APIs only in Release 3 microphone
work.

### 14.2 Dependency policy

- Prefer browser-native APIs and a small dependency set.
- Before adding a dependency, document the feature it provides,
  bundle/runtime cost, maintenance status, license, security posture,
  and whether native functionality is sufficient.
- Pin and audit dependencies through the selected package manager.
- Do not install a library solely because an AI agent habitually uses
  it.
- Avoid remote scripts and fonts unless approved and justified.
- Keep any third-party requests out of the translation flow.

### 14.3 Later public API

Only evaluate after proven demand. Before approval, define: - Use cases
and allowed consumers. - Endpoint and versioning. - Request/response
schema and error codes. - Rate limits, abuse controls, monitoring, and
cost limits. - Availability expectations and maintenance ownership. -
Whether text is logged (default should be no content logging). - Terms,
privacy, and documentation.

### 14.4 Later AI-assisted decoding

Not approved for any current release. Before reconsideration, define a
representative benchmark, expected accuracy, failure behavior, data
handling, vendor costs, user disclosure, and a no-AI fallback. AI output
must be presented as uncertain where appropriate and never silently
treated as authoritative.

## 15. Morse translation, audio playback, and audio-decoding requirements

This is the canonical behavior specification. If implementation behavior
is unclear, stop and ask rather than inventing a rule.

### 15.1 Supported standard and mapping

**Decided:** International Morse Code. Initial scope is uppercase Latin
A–Z, digits 0–9, and the punctuation set below. Input letters are
case-insensitive and decoded text is uppercase unless the owner later
approves case-preserving behavior. This is a proposal for output
normalization and must be confirmed before implementation.

### 15.2 Canonical International Morse table

The following table is the proposed MVP mapping set. It should be
checked against a reliable standard reference and locked in tests before
implementation. Do not add characters without updating this table,
reference page, and tests together.

| Character | Morse   | Character | Morse   |
|-----------|---------|-----------|---------|
| A         | `.-`    | N         | `-.`    |
| B         | `-...`  | O         | `---`   |
| C         | `-.-.`  | P         | `.--.`  |
| D         | `-..`   | Q         | `--.-`  |
| E         | `.`     | R         | `.-.`   |
| F         | `..-.`  | S         | `...`   |
| G         | `--.`   | T         | `-`     |
| H         | `....`  | U         | `..-`   |
| I         | `..`    | V         | `...-`  |
| J         | `.---`  | W         | `.--`   |
| K         | `-.-`   | X         | `-..-`  |
| L         | `.-..`  | Y         | `-.--`  |
| M         | `--`    | Z         | `--..`  |
| 0         | `-----` | 5         | `.....` |
| 1         | `.----` | 6         | `-....` |
| 2         | `..---` | 7         | `--...` |
| 3         | `...--` | 8         | `---..` |
| 4         | `....-` | 9         | `----.` |

| Punctuation | Morse     | Punctuation                      | Morse    |
|-------------|-----------|----------------------------------|----------|
| `.`         | `.-.-.-`  | `,`                              | `--..--` |
| `?`         | `..--..`  | `'`                              | `.----.` |
| `!`         | `-.-.--`  | `/` as a literal slash character | `-..-.`  |
| `(`         | `-.--.`   | `)`                              | `-.--.-` |
| `&`         | `.-...`   | `:`                              | `---...` |
| `;`         | `-.-.-.`  | `=`                              | `-...-`  |
| `+`         | `.-.-.`   | `-` hyphen                       | `-....-` |
| `_`         | `..--.-`  | `"`                              | `.-..-.` |
| `$`         | `...-..-` | `@`                              | `.--.-.` |

**Important distinction:** `/` is both a valid Morse code for the
literal slash character (`-..-.`) and the selected separator between
words in Morse output. In encoded output, a standalone `/` token means a
word boundary; a literal slash from source text is represented by its
Morse code. Decoding behavior must therefore treat the separator token
as a boundary, not as the literal slash character. If a user needs to
encode a slash character, encode its Morse pattern; do not emit a bare
separator token for that character.

**Needs Approval:** confirm this punctuation set, output casing, and how
unsupported Unicode whitespace/typographic punctuation should be
handled. The code mappings above are the intended standard values but
must be validated before release.

### 15.3 Prosigns

Prosigns are conventional sequences of Morse elements used as
operational signals, often sent without the normal gap between
constituent letters. They are not ordinary alphabet characters, and
their representation varies by context.

Examples commonly encountered include: - `AR` (end of message) commonly
written as `.-.-.` - `SK` (end of contact/work) commonly written as
`...-.-` - `SOS` is the distress signal `...---...` and is commonly sent
as one continuous sequence.

**Requirements:** - Do not silently treat every sequence of letters as a
prosign. - Keep prosigns separate from the ordinary character table. -
If a prosign feature is added, define whether input is entered as a
named token, continuous Morse, or both. - Label conventions and caveats
on the reference page. - **Needs Approval:** whether any prosigns are
supported in MVP. Proposed default: show them as reference-only, not
special parser tokens, until separately approved.

### 15.4 Encoding rules

**Proposed precise behavior:** 1. Normalize input to Unicode NFC. 2.
Convert supported Latin letters to uppercase for lookup. 3. Preserve
supported digits and approved punctuation. 4. Separate Morse codes for
letters/characters with one ASCII space. 5. Separate source words with
`/` (space, slash, space). 6. Collapse consecutive ordinary spaces
between source words into one word boundary. 7. Ignore leading/trailing
ordinary spaces without creating empty words. 8. For unsupported
characters, preserve their identity in the input and show a warning
listing the character and position. Do not invent a code or silently
remove it. 9. Output behavior for mixed supported/unsupported text must
be decided before coding: **Proposed** to encode supported characters
and place a visible warning beside the output; do not insert an
undocumented placeholder token into the Morse string. 10. Tabs, line
breaks, non-breaking spaces, emoji, combining marks, accented Latin
letters, and control characters need explicit normalization rules.
**Proposed:** ordinary Unicode whitespace is treated as a word boundary;
accented letters and emoji are unsupported unless a specific mapping is
approved.

### 15.5 Decoding rules

**Proposed precise behavior:** 1. Dot is `.` and dash is `-`. A
user-facing option to accept Unicode dash variants is **Proposed**, but
must normalize them explicitly and never change unrelated characters. 2.
Morse character groups are separated by one or more whitespace
characters. 3. `/` separates words; optional surrounding spaces are
accepted. 4. Repeated `/`, leading `/`, and trailing `/` should not
create repeated empty words; show a formatting warning if they occur. 5.
A group containing characters other than `.` and `-` is invalid unless
it is the standalone word separator `/`. 6. A syntactically valid
dot/dash group not present in the mapping is invalid/unknown. 7. Invalid
groups must not disappear. **Proposed output:** use a visible
replacement marker such as `[?]` for the corresponding unknown group and
show the original group in a warning list. The exact marker is **Needs
Approval**. 8. An empty input produces empty output. 9. Do not
automatically guess a missing letter separator; continuous strings may
be ambiguous. 10. Decoded alphabetic output is uppercase unless the
owner approves another display rule.

### 15.6 At least 25 input/output examples

These examples define the intended behavior, subject to the open
normalization and error-marker approvals above.

|  \# | Direction    | Input                                         | Expected output / behavior                                                                                     |
|----:|--------------|-----------------------------------------------|----------------------------------------------------------------------------------------------------------------|
|   1 | Text → Morse | `E`                                           | `.`                                                                                                            |
|   2 | Text → Morse | `SOS`                                         | `... --- ...`                                                                                                  |
|   3 | Text → Morse | `HELLO`                                       | `.... . .-.. .-.. ---`                                                                                         |
|   4 | Text → Morse | `HELLO WORLD`                                 | `.... . .-.. .-.. --- / .-- --- .-. .-.. -..`                                                                  |
|   5 | Text → Morse | `hello world`                                 | Same as uppercase `HELLO WORLD`                                                                                |
|   6 | Text → Morse | `A B`                                         | `.- / -...`                                                                                                    |
|   7 | Text → Morse | `123`                                         | `.---- ..--- ...--`                                                                                            |
|   8 | Text → Morse | `2026`                                        | `..--- ----- ..--- -....`                                                                                      |
|   9 | Text → Morse | `.`                                           | `.-.-.-`                                                                                                       |
|  10 | Text → Morse | `?`                                           | `..--..`                                                                                                       |
|  11 | Text → Morse | `,`                                           | `--..--`                                                                                                       |
|  12 | Text → Morse | `SOS!`                                        | `... --- ... -.-.--`                                                                                           |
|  13 | Text → Morse | `A  B`                                        | Proposed: `.- / -...` (multiple spaces collapse)                                                               |
|  14 | Text → Morse | `A`                                           | Proposed: `.-` (outer spaces ignored)                                                                          |
|  15 | Text → Morse | `A🙂B`                                        | Encode supported A and B only if mixed-input policy is approved; show warning for `🙂`; never silently drop it |
|  16 | Text → Morse | `é`                                           | Warning: unsupported under initial Latin A–Z scope unless a specific mapping is approved                       |
|  17 | Morse → Text | `.... . .-.. .-.. ---`                        | `HELLO`                                                                                                        |
|  18 | Morse → Text | `.... . .-.. .-.. --- / .-- --- .-. .-.. -..` | `HELLO WORLD`                                                                                                  |
|  19 | Morse → Text | `... --- ...`                                 | `SOS`                                                                                                          |
|  20 | Morse → Text | `.---- ..--- ...--`                           | `123`                                                                                                          |
|  21 | Morse → Text | `.- / -...`                                   | `A B`                                                                                                          |
|  22 | Morse → Text | `.-.-.- ..--..`                               | `.?`                                                                                                           |
|  23 | Morse → Text | `...---...`                                   | **Proposed:** unknown group warning unless continuous SOS recognition is separately approved                   |
|  24 | Morse → Text | `.... .`                                      | `HE`                                                                                                           |
|  25 | Morse → Text | `....   .`                                    | Proposed: `HE` (repeated whitespace is a group separator)                                                      |
|  26 | Morse → Text | `.... / .`                                    | `H E`                                                                                                          |
|  27 | Morse → Text | `.... x .`                                    | Warning for invalid group `x`; proposed output `H[?]E`                                                         |
|  28 | Morse → Text | `..--..`                                      | `?`                                                                                                            |
|  29 | Morse → Text | `/`                                           | Proposed: empty word-boundary formatting warning; no decoded letter                                            |
|  30 | Either       | empty string                                  | Empty output, no error                                                                                         |
|  31 | Either       | spaces only                                   | Empty output; no false error                                                                                   |
|  32 | Text → Morse | `A/B`                                         | Proposed: `.- -..-. -...`; literal slash is encoded as a character, not treated as source word spacing         |
|  33 | Text → Morse | `WAIT...`                                     | `.-- .- .. - .-.-.- .-.-.- .-.-.-` if each period is encoded independently                                     |
|  34 | Morse → Text | `-.-.--`                                      | `!`                                                                                                            |
|  35 | Morse → Text | `.-.-.`                                       | `+` under the character table; do not automatically interpret as a prosign without a separate prosign mode     |

### 15.7 WPM and timing

**MVP decision:** default speed 15 WPM; allowed range 5–30 WPM.

In standard Morse timing, the reference word `PARIS` plus a following
space is conventionally used as a 50-unit timing pattern. A dot is 1
unit; a dash is 3 units; the gap between elements within one character
is 1 unit; the gap between characters is 3 units; the gap between words
is 7 units.

For standard timing:

- Dot duration in milliseconds: `T = 1200 / WPM`
- Dash duration: `3T`
- Gap between dot/dash elements within a character: `T`
- Gap between characters: `3T`
- Gap between words: `7T`

Examples: - 5 WPM: dot = 240 ms; dash = 720 ms. - 15 WPM: dot = 80 ms;
dash = 240 ms. - 30 WPM: dot = 40 ms; dash = 120 ms.

Timing must be implemented from one timing function and tested; do not
use arbitrary delays that cause audio and visual playback to drift.

### 15.8 Farnsworth timing

Farnsworth timing keeps character elements at a faster character speed
while lengthening gaps so the overall effective speed is slower. It is
**not MVP**; proposed for Release 3.

If implemented: - `characterWpm` determines dot/dash and intra-character
timing. - `effectiveWpm` determines total average message speed and must
be no greater than `characterWpm`. - Let `T = 1200 / characterWpm`
milliseconds. - Under the standard PARIS timing model, the 50-unit
pattern has 31 units of marks/intra-character timing and 19 units of
inter-character/word spacing. - Desired PARIS duration at effective
speed is `60000 / effectiveWpm` milliseconds. - Proposed spacing unit
`S` is calculated so `31T + 19S = 60000 / effectiveWpm`, hence
`S = (60000 / effectiveWpm - 31T) / 19`. - Verify the formula against
the chosen Morse timing standard and test known timing fixtures before
implementation. Never allow negative spacing; reject invalid speed
combinations. - Define how the 19 spacing units are distributed across
character and word gaps before shipping; the simple formula alone does
not settle all distribution details.

### 15.9 Audio playback behavior

- Use browser-native Web Audio API where practical.
- Default frequency: 600 Hz.
- Frequency range and step: **Needs Approval**.
- Default WPM: 15; allowed 5–30.
- User must press Play; never autoplay.
- Stop must cancel scheduled audio and release/close resources when
  appropriate.
- Pause/resume behavior is **Proposed**; if precise resume is not
  implemented, expose Stop and Restart rather than a misleading Pause
  button.
- Handle browser audio context restrictions with a helpful instruction.
- Audio output should be a clean tone with no external service.
- Do not play unsupported/invalid groups as if they were valid.
- The playback cursor/highlight should use the same schedule as audio.
- Avoid a new timer per symbol if a single scheduled timeline can be
  used; clean up timers and nodes on stop/unmount.

### 15.10 Visual playback and screen flash

- A dot is visually active for one dot unit; a dash for three.
- Element gaps, character gaps, and word gaps follow the same timing
  model as audio.
- The screen flash is only a visual page effect. It cannot control a
  device’s physical flashlight.
- Flashing must be user-enabled, stoppable, and disabled by default
  unless the owner explicitly approves another safe default.
- Do not use rapid high-contrast flashes; provide a non-flashing visual
  indicator and respect reduced-motion preferences.
- Keep accessible textual playback state available.

### 15.11 Audio-file, microphone, and image decoding (Release 3)

Not specified for MVP. Before any decoder is built, approve: - Input
formats, maximum file size and duration, sample rate limits, and browser
support. - Processing method and whether any bytes leave the device. -
Algorithm, thresholds, uncertainty handling, and confidence display. -
Accuracy test corpus representing quiet/loud signals, noise, varied
speeds, gaps, and signal distortions. - False-positive/false-negative
measures and a minimum release threshold. - Permission denial, corrupt
file, unsupported type, timeout, and memory exhaustion behavior. - User
controls to cancel/stop and clear temporary data.

Never advertise “accurate decoding” until results are measured and
reviewed.

## 16. Learning lessons, quizzes, practice, and progress tracking

All features in this section are Release 2 unless stated otherwise. The
learning scope does not change the no-account decision.

### 16.1 Learning design principles

- Teach from simple patterns to more complex ones.
- Separate visual recognition, sound recognition, and recall where
  useful.
- Explain the answer, not just mark it right/wrong.
- Keep practice sessions short and repeatable.
- Use the canonical mapping and timing engine.
- Avoid claims that the user has mastered Morse based on a single quiz.

### 16.2 Proposed lesson sequence

The sequence below is **Proposed** and must be reviewed before lesson
content is produced.

1.  What Morse Code is and what this tool supports.
2.  Dots, dashes, and spacing.
3.  Short/simple characters and how to read patterns.
4.  Full A–Z reference.
5.  Numbers.
6.  Common punctuation and limitations.
7.  Word boundaries and slash separator.
8.  Reading Morse groups.
9.  Listening to Morse at different speeds.
10. Mixed-message practice and review.

The exact character teaching order should be based on a deliberate
pedagogy, not alphabetic order alone if a better evidence-based sequence
is chosen.

### 16.3 Practice requirements

- Practice direction: identify character from Morse, or produce Morse
  from a character/text prompt.
- Prompt, answer input, Check/Submit, feedback, explanation, and Next.
- Input normalization rules must be consistent with the core engine.
- Track per-character attempts/correct answers only if this is approved
  as necessary for weak-character practice.
- Avoid time pressure by default; a timed mode is **Proposed optional**
  and requires accessibility review.
- Let the user restart or change direction without losing unrelated
  saved progress.

### 16.4 Quiz requirements

Before implementation, define: - Question types (multiple choice, typed
answer, audio recognition, or visual recognition). - Number of questions
per quiz. - How questions are selected and randomized. - Correct-answer
normalization. - Score formula and rounding. - Passing threshold, if
any. - Retry and review behavior. - Whether an attempt is saved and
which fields are retained.

**Proposed default:** no pass/fail label; show correct/total and review
answers. Exact quiz length and question types are **Needs Approval**.

### 16.5 Local progress and privacy

- No account or cloud sync.
- Use localStorage for simple completion/preferences; use IndexedDB if
  data volume or structure justifies it.
- Store a schema version so future updates can migrate or reset data
  safely.
- Explain that progress is device/browser-specific and can be lost if
  browser storage is cleared.
- Provide a visible “Reset learning progress” action with confirmation.
- Do not store raw personal messages entered into the translator as
  learning progress.
- Do not transmit answer history to analytics or a server.
- If browser storage is unavailable, lessons/practice should still work
  for the current session with a non-blocking notice.

### 16.6 Release 2 acceptance criteria

- A learner can complete the lesson sequence without registering.
- Every lesson has at least one example and one comprehension/practice
  interaction.
- Quiz scoring is deterministic and covered by tests.
- Progress survives refresh and a browser restart on the same device
  when storage remains available.
- Reset removes the relevant progress.
- Corrupt/stale local data does not crash the learning area.
- No progress is uploaded.
- Keyboard and screen-reader users can complete all lessons and practice
  workflows.

------------------------------------------------------------------------

# Part 3 — Sections 17–24

## 17. SEO, technical SEO, and content strategy

### 17.1 SEO goal

Build a useful authority resource around Morse Code translation and
learning by serving distinct user intents with accurate tools and
content. SEO is a discovery channel, not a promise of ranking.

The prior project work included competitor review, autocomplete-driven
topic exploration, roughly 100 gathered pages/keywords, and programmatic
SEO ideation. The exact keyword dataset is not reproduced in this
document; use the owner’s source sheet/file when available. Do not
invent search volume, keyword difficulty, traffic, or competitor
metrics.

### 17.2 Search intent groups

**Proposed topic clusters:** - Core utility: Morse code translator, text
to Morse, Morse to text. - Reference: Morse alphabet, numbers,
punctuation, character chart. - Learning: how to learn Morse,
dots/dashes, listening practice. - Use cases: SOS, decoding examples,
common questions. - Audio: Morse sound, WPM, timing, pitch. -
Troubleshooting: invalid Morse, spacing, unsupported characters. - Later
tools: audio/image/microphone decoder only after those features exist.

These are topic groupings, not verified keyword volumes. Validate
against the project’s collected keyword list and current search results
before prioritizing.

### 17.3 On-page requirements

Every indexable page must have: - One clear primary purpose and user
intent. - Unique, descriptive title and meta description. - One
meaningful main heading and logical subheadings. - A canonical URL. -
Useful internal links to related pages. - Accurate examples and
terminology. - No keyword stuffing or repetitive filler. - A visible way
back to the tool or reference where relevant. - Updated content when
product behavior changes.

### 17.4 Technical SEO

- Server-render or statically render indexable text where practical.
- Use clean, stable URLs and consistent trailing-slash policy.
- Generate `sitemap.xml` from published canonical pages only.
- Configure `robots.txt` without accidentally blocking the site or
  needed resources.
- Provide canonical tags and correct index/noindex directives.
- Avoid duplicate indexable copies of Home and Translator; decide
  whether they are distinct enough to coexist.
- Add structured data only when content qualifies and markup matches
  visible content. **Proposed:** `WebSite`, `Organization` only if an
  actual organization identity is defined, and `BreadcrumbList` where
  useful. Do not invent ratings/reviews or use unsupported schema.
- Provide meaningful Open Graph metadata for sharing, if social sharing
  is in scope.
- Handle 404s and redirects cleanly.
- Use Search Console after the domain/hosting is approved and site is
  live.
- Analytics is not a prerequisite for SEO.

### 17.5 Programmatic SEO guardrails

Programmatic SEO means creating pages from structured data/templates. It
is not permission to mass-publish near-identical pages.

Before generating a template: 1. Confirm the query set represents
distinct user needs. 2. Define the unique useful answer each page will
provide. 3. Ensure data and examples are accurate. 4. Add internal links
that genuinely help users. 5. Review a sample batch manually before
publishing the full set. 6. Noindex or do not publish pages with
insufficient unique value. 7. Avoid auto-generated translations for
unsupported alphabets. 8. Track indexation and quality, not only page
count.

### 17.6 Content quality and editorial process

Each guide/lesson should include: - Target intent and reader level. -
Accurate explanation and examples. - Verified Morse mapping and
notation. - Reviewer/check date. - Related links. - A statement of
limitations where relevant. - Unique title and description. - No
fabricated author credentials or first-hand testing claims.

### 17.7 Performance as an SEO quality factor

Measure production Core Web Vitals rather than claiming scores in
advance. Targets for planning: - LCP (Largest Contentful Paint): ≤ 2.5
seconds. - INP (Interaction to Next Paint): ≤ 200 milliseconds. - CLS
(Cumulative Layout Shift): ≤ 0.1.

These are targets, not current measurements. Test on realistic mobile
hardware/network conditions after deployment.

## 18. Performance, security, privacy, and error handling

### 18.1 Performance requirements

- Keep the core Morse engine small and synchronous enough for ordinary
  messages.
- Avoid loading large media or decoder libraries on MVP routes.
- Lazy-load only genuinely non-critical or future feature code.
- Prevent typing from causing expensive full-page rerenders.
- Establish and test a maximum input length before release (**Needs
  Approval**).
- Avoid unnecessary animation and third-party scripts.
- Clean up audio nodes, scheduled events, timers, object URLs, and
  future media tracks.
- Measure production build size and Web Vitals after implementation; do
  not claim performance results before measurement.

### 18.2 Security requirements

- Use safe React rendering; never interpret user input as HTML.
- Do not use `dangerouslySetInnerHTML` for translation or decoded
  content.
- Validate all user-controlled values, including audio settings and
  future file inputs.
- Keep dependencies minimal, maintained, license-compatible, and
  audited.
- Do not put secrets in client bundles or public environment variables.
- Configure appropriate security headers at the approved hosting layer;
  exact policy is implementation-dependent.
- Avoid unnecessary external scripts and remote resources.
- For future file decoders, enforce size/type/duration limits, handle
  malformed input, and avoid unsafe parsing.
- For future microphone features, request permission only after a user
  action and stop tracks reliably.
- Never treat decoded user content as trusted instructions or executable
  markup.

### 18.3 Privacy requirements

- MVP translation runs in the browser and must not be sent to an
  application backend.
- Do not log user input/output.
- Do not send translation text in analytics events.
- Store only approved preferences locally.
- No account, database, cloud sync, or payments.
- Privacy page must match actual hosting, storage, cookies, scripts, and
  contact method.
- Do not promise that hosting produces no logs; distinguish application
  behavior from hosting-provider operational logs.
- Later decoders must clearly state whether processing is local or
  remote before users supply media.
- Contact form or third-party analytics must not be added without
  approval and a data-flow/privacy review.

### 18.4 Error handling

| Situation                         | Expected behavior                                                                                                |
|-----------------------------------|------------------------------------------------------------------------------------------------------------------|
| Unsupported text character        | Identify it; never silently drop it                                                                              |
| Invalid Morse group               | Show group and warning; preserve a visible marker or error representation                                        |
| Empty input                       | Empty output; no error                                                                                           |
| Clipboard denied/unavailable      | Keep output intact and tell user to select/copy manually                                                         |
| Audio unavailable/restricted      | Explain how to enable audio; do not crash                                                                        |
| Invalid stored theme/progress     | Fall back to default; preserve app usability                                                                     |
| Storage unavailable               | Continue without persistence and show a non-blocking notice when relevant                                        |
| Unexpected client error           | Show recoverable message; do not reveal internals                                                                |
| Future file type/size unsupported | Reject before expensive processing and explain allowed input                                                     |
| Microphone denied/device absent   | Show permission/device guidance and a stop/reset state                                                           |
| Network unavailable               | MVP core translation should still work after page load; later offline behavior is not guaranteed until Release 4 |

## 19. Analytics and post-launch growth

### 19.1 Analytics decision

**Needs Approval:** analytics provider and whether any analytics will be
used have not been selected. Do not install analytics or tracking by
default.

A no-analytics MVP is fully acceptable. SEO can be managed with Search
Console after launch, which is distinct from adding broad behavioral
tracking.

### 19.2 If analytics is later approved

Define before implementation: - Exact provider and data transmitted. -
Whether consent is required in relevant jurisdictions. - Retention,
access, deletion, and privacy disclosure. - Event names and business
purpose. - No message content, Morse input/output, clipboard content,
audio data, or personal content in events. - Whether cookies or
persistent identifiers are used. - How the tool remains usable if
analytics is blocked.

**Proposed minimal event concepts, only if approved:** translator mode
selected, copy action succeeded/failed (without payload), audio play
started/stopped, reference page visited, lesson completed, quiz
completed. Do not track typed content or detailed answer text.

### 19.3 Post-launch growth loop

1.  Verify indexing and technical health.
2.  Collect real user feedback through the approved contact route.
3.  Review Search Console query/page data if enabled.
4.  Fix correctness, accessibility, and usability issues before adding
    features.
5.  Compare actual user needs with the content plan.
6.  Publish helpful guides based on validated intent and quality review.
7.  Evaluate Release 2 only after MVP is stable.
8.  Evaluate advanced decoders against measured accuracy and
    demonstrated demand.

Do not use fabricated user counts, testimonials, conversion rates, or
traffic forecasts.

## 20. Testing and quality assurance

### 20.1 Test layers

**Unit tests** - Every character mapping. - Encoder/decoder round trips
for supported strings. - Case normalization and Unicode handling. -
Spaces, punctuation, leading/trailing whitespace, and repeated
separators. - Unsupported characters and invalid Morse groups. - WPM
timing math and bounds. - Farnsworth formula only when that feature is
implemented. - Quiz scoring and progress migration in Release 2.

**Integration tests** - UI to engine data flow. - Direction switch
reinterprets current input. - Warning rendering and correction
behavior. - Copy output and error fallback. - Audio control state and
stop cleanup. - Theme persistence. - Local progress save/reset (Release
2).

**End-to-end tests** - Text → Morse → copy. - Morse → text. -
Unsupported character warning. - Invalid Morse warning. - Direction
switch. - Audio play/stop and WPM control. - Theme switch without losing
input. - Reference page mapping. - Mobile layout. - Release-specific
learning/decoder journeys when those releases exist.

**Accessibility tests** - Keyboard-only core flows. - Automated
accessibility scan. - Manual screen-reader check. - Contrast in all
states. - Reduced motion and flash safety. - Zoom/reflow.

**Security/privacy checks** - No unsafe HTML rendering. - No translation
text in network requests or logs. - No unapproved third-party
requests. - Dependency audit. - Future file decoder validation and
microphone lifecycle tests.

**Performance checks** - Production build and bundle analysis. -
Realistic mobile tests. - Core Web Vitals after deployment. - Long-input
responsiveness against approved limit.

### 20.2 Canonical test fixtures

- Use all examples in Section 15 as fixtures.
- Add one test for each mapping-table entry.
- Add round-trip tests only for inputs that are unambiguous under the
  separator rules.
- Keep expected outputs explicit; do not generate expected outputs from
  the same function being tested.
- Review fixture changes whenever the mapping or normalization policy
  changes.

### 20.3 Release blocking conditions

Do not ship if: - Any supported mapping test fails. - Unsupported
characters are silently discarded. - Direction switching violates the
reinterpretation rule. - Audio can become stuck or overlap. - Keyboard
users cannot complete a core task. - Critical contrast failures
remain. - Privacy copy contradicts actual network behavior. - Production
build or smoke tests fail. - Hosting, public contact method, or other
release-blocking approvals remain unresolved.

## 21. Deployment and production launch requirements

### 21.1 Hosting decision

**Needs Approval:** Vercel is proposed, not finalized. Do not create a
hosting account, connect a repository, or deploy before explicit
approval.

### 21.2 Pre-deployment checklist

- Owner approves hosting provider, domain, canonical host, and
  environment.
- Repository and version-control workflow are agreed.
- Environment variables are documented; no secret values are committed.
- Clean dependency install and production build succeed.
- Unit, integration, end-to-end, and accessibility checks pass.
- SEO metadata, canonical URLs, sitemap, and robots behavior are
  reviewed.
- Privacy and contact pages match real behavior.
- Error and not-found pages are usable.
- Responsive checks cover mobile, tablet, and desktop.
- Security headers and HTTPS are configured at the hosting layer.
- No test/debug pages or placeholder links remain.
- No future feature is advertised as available.
- Owner explicitly approves the public launch.

### 21.3 Post-deployment smoke tests

- Home and Translator load over HTTPS.
- Text → Morse and Morse → text examples work.
- Unsupported and invalid inputs show warnings.
- Copy and audio work in supported browsers.
- Theme switch works.
- Reference page matches engine.
- Mobile layout and keyboard navigation work.
- Sitemap and robots are accessible and correct.
- Canonical URLs and metadata are correct.
- No unexpected requests send translation content to a server.
- Monitoring/analytics are not added unless approved.
- Rollback/redeploy process is documented.

### 21.4 Hosting and operations

- Use the simplest deployment compatible with the approved architecture.
- Document build and deploy commands after the toolchain is approved.
- Keep a release checkpoint/commit for each major milestone.
- Record known issues and rollback steps.
- Do not claim uptime or availability guarantees unless a real service
  commitment exists.

## 22. Development phases and task dependencies (backlog with IDs)

**No task below authorizes implementation by itself.** The owner
approves each next stage. Work must be inspected before proceeding.

### 22.1 Phase roadmap

| Phase                     | Goal                                               | Depends on                                        | Exit gate                                          |
|---------------------------|----------------------------------------------------|---------------------------------------------------|----------------------------------------------------|
| P0 — Product spec         | Resolve behaviors and approvals                    | This PRD                                          | Owner approves PRD and open decisions              |
| P1 — UX/design            | Page wireframes, responsive states, tested palette | P0                                                | Owner approves core layout and contrast            |
| P2 — Project setup        | Create app and test tooling                        | P0 + setup authorization                          | Clean install/build; no extra dependencies         |
| P3 — Morse engine         | Canonical map, encoder/decoder, warnings, tests    | P0 + mapping approval                             | All mapping and edge tests pass                    |
| P4 — MVP UI               | Home, translator, reference, theme                 | P2 + P3                                           | Core workflows pass review                         |
| P5 — Audio/visual         | WPM, tone, stop, timeline, screen simulation       | P3 + audio decisions                              | Timing and lifecycle tests pass                    |
| P6 — Content/SEO          | About, privacy, FAQ, guides, metadata              | Page and contact decisions                        | Content/technical SEO reviewed                     |
| P7 — QA/hardening         | Accessibility, security, performance, regression   | P4–P6                                             | Release checklist passes                           |
| P8 — Deployment           | Hosting/domain/build/production verification       | P7 + launch approval                              | Owner approves public launch                       |
| P9 — Release 2 learning   | Lessons/practice/quizzes/local progress            | Stable MVP + R2 approval                          | Learning acceptance tests pass                     |
| P10 — Release 3 decoders  | File/mic/image and advanced audio                  | R2 or explicit sequencing decision + decoder spec | Accuracy, privacy, and safety gates pass           |
| P11 — Release 4 ecosystem | PWA, embed, multilingual UI                        | Relevant prior architecture reviews               | Offline/embed/localization tests pass              |
| P12 — Later evaluation    | API/AI/extra alphabets                             | Evidence of demand and separate approval          | Business, privacy, security, and accuracy decision |

### 22.2 Backlog

| Task ID | Task                                            | Priority | Dependency                             | Definition of done                                 |
|---------|-------------------------------------------------|----------|----------------------------------------|----------------------------------------------------|
| PRD-001 | Review and approve PRD                          | P0       | None                                   | Open decisions resolved or explicitly deferred     |
| UX-001  | Define core page wireframes                     | P0       | PRD-001                                | Home, Translator, Reference states reviewed        |
| UX-002  | Verify color contrast and interaction states    | P0       | UX-001                                 | Tested token table and focus/error states approved |
| SET-001 | Confirm package manager and repository workflow | P0       | PRD-001                                | Owner approval recorded                            |
| SET-002 | Initialize Next.js/TypeScript/Tailwind project  | P0       | SET-001 + explicit setup approval      | Clean build; only necessary dependencies           |
| MOR-001 | Approve supported character/punctuation set     | P0       | PRD-001                                | Canonical mapping table approved                   |
| MOR-002 | Implement mapping module                        | P0       | MOR-001 + SET-002                      | Every entry tested                                 |
| MOR-003 | Implement encoder                               | P0       | MOR-002                                | Encoding and whitespace tests pass                 |
| MOR-004 | Implement decoder and invalid-group handling    | P0       | MOR-002 + error marker approval        | Valid/invalid group tests pass                     |
| MOR-005 | Implement normalization                         | P0       | PRD-001                                | Unicode/space rules tested                         |
| UI-001  | Build translator interface                      | P0       | MOR-003–005                            | All primary workflows work                         |
| UI-002  | Implement copy, clear, reset                    | P1       | UI-001                                 | Correct state behavior and accessible status       |
| UI-003  | Implement light/dark theme                      | P1       | UX-002                                 | Theme preserves input and meets contrast           |
| AUD-001 | Approve tone range and playback controls        | P0       | PRD-001                                | Frequency range/step and pause behavior decided    |
| AUD-002 | Implement audio timing and playback             | P0       | MOR-002 + AUD-001                      | WPM fixtures pass; stop cleans up                  |
| AUD-003 | Implement visual playback/on-screen flash       | P1       | AUD-002                                | Safe, accessible, synchronized behavior            |
| REF-001 | Build reference page from canonical map         | P0       | MOR-002                                | Chart matches engine                               |
| SEO-001 | Approve URLs/canonical strategy                 | P1       | PRD-001                                | Home/Translator duplication resolved               |
| SEO-002 | Implement metadata, sitemap, robots             | P0       | SEO-001                                | Production URL checks pass                         |
| CNT-001 | Approve public contact method                   | P1       | PRD-001                                | Method and privacy implications decided            |
| CNT-002 | Write/review About, Privacy, FAQ                | P1       | Actual implementation decisions        | Content matches product behavior                   |
| QA-001  | Add unit/integration/e2e tests                  | P0       | Engine/UI tasks                        | Critical suite passes                              |
| QA-002  | Accessibility review                            | P0       | Core UI                                | No release-blocking issues                         |
| QA-003  | Security/privacy/performance review             | P0       | MVP implementation                     | Checklist documented and pass/fail recorded        |
| DEP-001 | Approve hosting/domain                          | P0       | QA-003                                 | Owner approval recorded                            |
| DEP-002 | Deploy release candidate                        | P0       | DEP-001 + explicit deployment approval | Production smoke tests pass                        |
| DEP-003 | Approve public launch                           | P0       | DEP-002                                | Owner explicitly approves                          |
| LRN-001 | Approve lesson curriculum and quiz rules        | P2       | Stable MVP                             | Scope and scoring rules signed off                 |
| LRN-002 | Implement lessons/practice/quizzes              | P2       | LRN-001                                | Learning tests pass                                |
| LRN-003 | Implement local progress/reset                  | P2       | LRN-001                                | Persistence/privacy tests pass                     |
| DEC-001 | Define audio-file decoder specification         | P2       | Demand review                          | Formats, limits, algorithm, benchmark approved     |
| DEC-002 | Define microphone decoder specification         | P2       | Demand review                          | Permission, lifecycle, accuracy, privacy approved  |
| DEC-003 | Define image decoder specification              | P2       | Demand review                          | Formats, limits, benchmark approved                |
| ECO-001 | Evaluate PWA/offline architecture               | P2       | MVP stable                             | Cache and update behavior approved                 |
| ECO-002 | Define embed security and interface             | P2       | MVP stable                             | Embed spec and security model approved             |
| ECO-003 | Define localization strategy                    | P2       | MVP stable                             | Languages, translation review, metadata approved   |
| FUT-001 | Evaluate public API                             | P3       | Proven demand                          | Written cost/abuse/security case                   |
| FUT-002 | Evaluate AI-assisted decoding                   | P3       | Benchmark + demand                     | Privacy/cost/accuracy approval                     |
| FUT-003 | Evaluate additional alphabets                   | P3       | Defined target audience                | Each alphabet has separate mapping/spec            |

### 22.3 Antigravity working protocol

For each approved task: 1. Read `PRD.md` and the relevant requirement
IDs. 2. State the planned changes and files/dependencies before acting.
3. Do only the approved task; do not start later phases. 4. Report
changed files, commands run, tests, results, and known limitations. 5.
Stop and request review before moving to the next task. 6. Do not
install new dependencies, create unrelated files, alter scope, or deploy
without authorization. 7. If requirements conflict or remain ambiguous,
ask the owner rather than guessing.

## 23. Definition of Done for each major phase

### 23.1 PRD/specification done

- All 24 sections exist.
- Decisions and recommendations are clearly labeled.
- No conflict silently overrides an owner decision.
- Open questions are listed.
- Owner approves the behavior rules before implementation.

### 23.2 Design done

- Core flows are represented at mobile and desktop widths.
- Empty, warning, error, playing, stopped, and disabled states are
  designed.
- Color contrast is measured and documented.
- Keyboard focus and reduced-motion behavior are considered.
- Owner reviews the translator and reference experience.

### 23.3 Setup done

- Exact toolchain and package manager are approved.
- Project builds from a clean install.
- No unnecessary dependencies or backend/database/auth scaffolding
  exists.
- Repository/checkpoint workflow is documented.
- No product features are implemented beyond the authorized setup task.

### 23.4 Morse engine done

- Every approved mapping has a test.
- Encoding and decoding fixtures pass.
- Normalization, word boundaries, invalid groups, and unsupported
  characters follow approved rules.
- No silent loss of unsupported input.
- Reference chart consumes the canonical mapping.
- Tests do not derive expected values from the same function under test.

### 23.5 MVP UI/audio done

- Core translator journeys pass.
- Direction switch preserves and reinterprets current input.
- Copy, clear/reset, warnings, theme, audio, and visual playback behave
  as specified.
- Audio uses approved WPM/frequency controls and can always stop.
- No overlapping playback or uncleaned resources.
- No account/backend/database is introduced.

### 23.6 SEO/content done

- Each indexable page has unique metadata and a canonical URL.
- Sitemap contains only published canonical pages.
- Robots behavior is verified.
- No placeholder links or thin duplicate pages remain.
- Public privacy and contact content reflects actual decisions and
  behavior.

### 23.7 QA done

- Unit, integration, and end-to-end tests pass.
- Keyboard and screen-reader checks pass for core flows.
- Contrast, responsive, reduced-motion, security, and privacy checks are
  documented.
- Production build succeeds.
- Known limitations are visible and not misrepresented as completed
  functionality.

### 23.8 Deployment done

- Hosting/domain are approved.
- Production environment is configured without exposing secrets.
- HTTPS, redirects, metadata, sitemap, and robots are verified.
- Production smoke tests pass.
- Rollback/checkpoint exists.
- Owner explicitly approves launch.

### 23.9 Release 2 done

- Lessons, practice, quizzes, scoring, and progress meet their approved
  specs.
- Local persistence works on the same device and can be reset.
- No account or progress upload exists.
- Accessibility and corrupt-storage tests pass.

### 23.10 Release 3 done

- Decoder input limits and supported formats are explicit.
- Accuracy is measured against an approved benchmark.
- Privacy and temporary-data handling are verified.
- Permission/error/cancel flows are tested.
- Marketing claims match measured capability.

### 23.11 Release 4 done

- Offline/cache behavior is tested, including updates and stale content.
- Embed behavior is tested for sizing, security, and privacy.
- Each UI language is complete and reviewed.
- SEO metadata and accessibility work across supported languages.

## 24. Risks, assumptions, unresolved questions, and decisions requiring my approval

### 24.1 Key risks and mitigations

| Risk                                       | Impact                                | Mitigation                                                                  |
|--------------------------------------------|---------------------------------------|-----------------------------------------------------------------------------|
| Incorrect Morse mapping                    | Core tool loses trust                 | Canonical table, independent reference check, explicit tests                |
| Ambiguous separator/invalid-input behavior | Inconsistent encoding and decoding    | Approve rules before coding; test edge cases                                |
| Feature creep                              | MVP delays and unnecessary complexity | Release gates and task-by-task approval                                     |
| Contrast failure from palette              | Accessibility issue                   | Automated contrast checks and manual review                                 |
| Audio timing drift                         | Playback teaches incorrect rhythm     | One timing model shared by audio and visual playback                        |
| Unsafe flash effect                        | Accessibility/safety concern          | User-controlled on-screen effect, no rapid flashing, reduced-motion support |
| False privacy claims                       | Loss of trust/legal exposure          | Verify network behavior and hosting logs before writing policy              |
| Thin programmatic SEO pages                | Low-value content and indexing risk   | Require distinct intent and manual sample review                            |
| Decoder accuracy below expectations        | Misleading output                     | Benchmark before release; display uncertainty                               |
| Local progress loss                        | User frustration                      | Explain device-only storage; provide reset and robust migration             |
| Hosting not selected                       | Deployment blocked                    | Keep Vercel proposed; require approval                                      |
| Contact method unresolved                  | Incomplete public support route       | Do not publish invented contact details                                     |
| Analytics ambiguity                        | Unwanted tracking                     | Add none until approved                                                     |
| Agent invents behavior/dependencies        | Scope/security risk                   | Antigravity protocol and explicit approval gates                            |

### 24.2 Assumptions

- The website is free to use and does not require accounts.
- MVP conversion, chart, and audio can run in the browser.
- The initial standard is International Morse for the approved Latin
  character set.
- The owner prefers a practical staged build and will inspect each
  milestone.
- No existing application code, website, or dependencies are present.
- The project’s existing keyword research is available separately and
  should be consulted before content prioritization.
- Vercel is a candidate hosting platform only, not a finalized choice.
- The exact domain and public contact method are unknown.
- Analytics is not selected and must not be silently installed.

### 24.3 Needs Approval — complete list

The following decisions remain open. Items marked “blocking” must be
resolved before the dependent feature is implemented or launched.

1.  **PRD approval and task-by-task workflow** — approve this document
    before setup or coding. **Blocking for all implementation.**
2.  **Package manager and repository workflow** — Proposed default is
    npm; confirm before project setup. **Blocking for setup.**
3.  **Domain and canonical host** — final domain, preferred host
    variant, and redirect policy. **Blocking for production
    SEO/deployment.**
4.  **Hosting provider** — Vercel is proposed only. **Blocking for
    deployment.**
5.  **Analytics** — choose none or a specific provider and policy.
    Default remains no analytics. **Blocking before adding any
    analytics.**
6.  **Public contact method** — email, form, or other route; earlier
    provided email must not be published without approval. **Blocking
    before publishing Contact.**
7.  **Supported punctuation set** — approve the Section 15 table or
    revise it. **Blocking for mapping lock.**
8.  **Output casing** — proposed uppercase decoded output; confirm.
    **Blocking for final engine fixtures.**
9.  **Unicode normalization and whitespace** — confirm NFC,
    tabs/newlines, non-breaking spaces, accented letters, emoji, and
    control-character handling. **Blocking for normalization
    implementation.**
10. **Mixed supported/unsupported text behavior** — proposed to encode
    supported characters while clearly warning about unsupported ones;
    decide whether to return partial output or block conversion.
    **Blocking for encoder behavior.**
11. **Invalid Morse representation** — proposed `[?]` marker plus
    warning; confirm exact output behavior. **Blocking for decoder
    implementation.**
12. **Repeated/leading/trailing `/` behavior** — proposed to avoid empty
    words and show a formatting warning; confirm. **Blocking for decoder
    fixtures.**
13. **Whether continuous `...---...` is recognized as SOS** — proposed
    to treat it as unknown unless a separate continuous-signal/prosign
    rule is approved. **Blocking for this edge case.**
14. **Prosign support** — proposed reference-only, not special parser
    tokens, in MVP. **Blocking only if prosign behavior is added.**
15. **Audio frequency range and increment** — default 600 Hz is decided;
    allowed range/step are not. **Blocking for tone control.**
16. **Pause/resume behavior** — implement precise pause/resume or only
    Stop/Restart. **Blocking for final audio controls.**
17. **Maximum translator input length** — choose a practical limit and
    expected behavior for very long input. **Blocking before
    release/performance testing.**
18. **Home versus `/translator/` distinction** — decide whether both
    pages are needed/indexable or one should canonicalize/redirect to
    avoid duplication. **Blocking for final SEO routing.**
19. **Exact reference chart behavior** — whether search/filter and
    click-to-play are MVP requirements or later enhancements. **Needs
    decision before UI scope lock.**
20. **Theme initialization** — confirm system-following default versus a
    fixed default; persistent user preference is recommended. **Blocking
    for final theme behavior.**
21. **Release 2 lesson curriculum** — approve sequence and teaching
    order. **Blocking for Release 2.**
22. **Release 2 quiz rules** — question types, quiz length, scoring,
    retry, and retained attempt details. **Blocking for Release 2.**
23. **Release 2 progress data** — decide whether to store detailed
    answer history or only aggregate stats; default should be minimal.
    **Blocking for progress schema.**
24. **Release 3 decoder scope** — formats, limits, algorithms, accuracy
    thresholds, and local-vs-remote processing for audio, microphone,
    and images. **Blocking for Release 3.**
25. **Release 3 advanced audio** — approve WAV export and Farnsworth
    timing separately; neither is MVP. **Blocking only for those
    features.**
26. **Release 4 PWA/offline behavior** — offline routes, cache expiry,
    and update strategy. **Blocking for Release 4.**
27. **Release 4 embed security and interface** — iframe/origin policy,
    sizing, attribution, and privacy. **Blocking for embed.**
28. **Release 4 languages** — which UI languages, translation/review
    process, and localized URL strategy. **Blocking for multilingual
    UI.**
29. **Public API and AI decoding** — no approval now; reconsider only
    with demonstrated demand and a separate technical/privacy/business
    review. **Blocking for any such work.**
30. **Additional non-Latin alphabets** — define each standard
    independently and validate mapping; no universal-support claim.
    **Blocking for each added alphabet.**
31. **Final color tokens** — teal/amber direction is decided; exact
    proposed HEX tokens require contrast verification and may need
    accessible adjustments. **Blocking for design sign-off.**
32. **Structured data selection** — use only types justified by actual
    content/identity; do not invent organization details. **Blocking
    before adding schema markup.**
33. **Privacy/legal review requirements** — confirm applicable
    jurisdiction and whether additional legal review is needed before
    launch. **Blocking for final public privacy wording.**
34. **Launch approval** — owner must explicitly authorize public
    deployment after the release checklist. **Blocking for public
    launch.**

### 24.4 Final consistency audit

This PRD has been checked against the supplied decisions: - Next.js +
React + TypeScript + Tailwind are preserved. - International Morse and
`/` word separator are preserved. - Unsupported characters always
trigger a clear warning and are never silently dropped. - Direction
switching reinterprets the current input. - MVP audio defaults to 15 WPM
and 600 Hz, with speed range 5–30 WPM. - Light and dark themes are
included. - MVP is browser-local wherever possible and has no backend,
database, accounts, AI, or microphone decoder. - Lessons, quizzes, and
local progress are Release 2. - Audio-file, microphone, and image
decoders are Release 3. - PWA/offline, embed, and multilingual UI are
Release 4. - Public API and AI-assisted decoding remain evaluation-only
after proven demand. - Vercel remains proposed, not final; analytics
remains unselected. - Progress is account-free and local. - Flash is
on-screen only; the site does not control a physical flashlight. -
Non-Latin alphabets are future scope and must be specified separately. -
No application code or implementation has been started by this document.

**Final instruction to the implementation agent:** Do not fill
unresolved decisions with guesses. Read the relevant section and
requirement IDs, report ambiguity, and wait for the owner’s decision. Do
not set up, install, code, or deploy until the owner explicitly approves
that next step.
