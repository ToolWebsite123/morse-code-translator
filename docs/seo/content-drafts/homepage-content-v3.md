# Homepage SEO Content Draft — Version 3 (Final Approved Specification)

- **Target URL:** `/` (Homepage)
- **Primary Search Intent:** Immediate Utility / Translation (`morse code translator`)
- **Primary Keyword:** `morse code translator` (Monthly Volume: 246,000 | KD: 40)
- **Secondary Keywords (Naturally Integrated):**
  - `morse code` (Vol: 550,000 | KD: 51)
  - `morse code generator` (Vol: 12,100 | KD: 3)
  - `morse code decoder` (Vol: 9,900 | KD: 20)
  - `morse code converter` (Vol: 8,100 | KD: 42)
  - `text to morse code` (Vol: 4,400 | KD: 38)
  - `morse code to english` (Vol: 4,400 | KD: 36)
  - `translator code morse` (Vol: 18,100 | KD: 40)
  - `morse code translator online` (Vol: 6,600 | KD: 34)
- **Status:** Final Audit Passed (Ready for Implementation upon User Approval)
- **Audit Reference:** [`docs/seo/content-drafts/homepage-content-audit.md`](file:///d:/Project/Morse%20Code%20Translator%20Website/docs/seo/content-drafts/homepage-content-audit.md)

---

## 1. On-Page Metadata & Structured Data

### SEO Metadata
- **SEO Title:** `Morse Code Translator — Free Text & Audio Converter` (53 characters)
- **Meta Description:** `Translate English text to International Morse Code and decode Morse code to text instantly. Listen with adjustable speed and pitch controls — free and browser-local.` (159 characters)
- **Canonical URL:** `https://morsecodetranslator.org/`
- **Primary H1:** `Free International Morse Code Translator & Audio Converter`

### Supported JSON-LD Schema (100% Text Parity with Visible Content)
```json
[
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Morse Code Translator & Audio Player",
    "url": "https://morsecodetranslator.org/",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All modern web browsers",
    "browserRequirements": "Requires JavaScript. Requires HTML5 Web Audio API for tone playback.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Instant bidirectional text-to-Morse and Morse-to-text translation",
      "Direction switching while preserving active input string",
      "Real-time diagnostic alerts for unsupported characters and malformed Morse groups",
      "Web Audio API tone playback with configurable speed (5–30 WPM) and pitch (400–800 Hz)",
      "On-screen visual light signal beacon with reduced-motion support",
      "Browser-local translation in memory with local storage progress tracking and zero third-party tracking"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between a Morse code translator, generator, and decoder?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "These terms describe related aspects of the same utility: a generator encodes plain text into Morse code dots and dashes, a decoder translates dots and dashes back into readable text, and a translator performs both operations bidirectionally. This platform combines all three functions."
        }
      },
      {
        "@type": "Question",
        "name": "How are letters and words separated in Morse code?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Letters within a word are separated by a single space (representing 3 dot units in audio timing). Separate words are demarcated by a forward slash surrounded by spaces ( / ), representing a standard 7-dot silent pause."
        }
      },
      {
        "@type": "Question",
        "name": "What is the emergency signal for SOS in Morse code?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The international distress signal SOS is written in Morse code as ... --- ... (three dots, three dashes, three dots). When transmitted by telegraphers, it is sent as an unbroken procedural signal (prosign) without internal letter pauses."
        }
      },
      {
        "@type": "Question",
        "name": "Does this translator send my text to an external server?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Translation text is processed in your browser memory and is never transmitted over the network. Learning progress is stored locally on your device using localStorage, with zero third-party analytics or tracking."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this Morse code translator on mobile devices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The interface is fully responsive, featuring touch targets that meet accessibility standards (minimum 44x44 pixels) for smooth operation on smartphones and tablets."
        }
      }
    ]
  }
]
```

---

## 2. Homepage Content Body

### Hero Section (Above-the-Fold)

```html
<!-- Standards Badge -->
<div class="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/40 dark:text-teal-300">
  <span class="h-2 w-2 rounded-full bg-teal-600 dark:bg-teal-400" />
  Recommendation ITU-R M.1677-1 Standard
</div>

<!-- Primary H1 -->
<h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
  Free International Morse Code Translator &amp; Audio Converter
</h1>

<!-- Supporting Value Proposition -->
<p class="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
  Translate English text to International Morse Code and decode Morse code back to plain text in real time.
  Listen to synthesized audio beeps at your preferred speed (5–30 WPM), adjust tone pitch (400–800 Hz), 
  and follow on-screen visual light signals. Free, private, and runs entirely in your web browser with zero account required.
</p>
```

---

### Interactive Translator Application Container

*(Renders `src/components/translator/Translator.tsx` immediately below the hero)*

```html
<section aria-label="Morse Code Translator Application">
  <!-- Interactive Translator Component rendered here -->
  <!-- Features: Mode Toggle, Switch Direction, 10,000-char Input, Instant Output, Copy Output, Clear, Audio Player with WPM/Pitch Sliders, Visual Beacon, Warning Alerts -->
</section>
```

---

### Platform Feature Navigation Grid (Verified Live Routes Only)

```html
<section aria-label="Morse Code Learning and Reference Tools" class="mt-12">
  <h2 class="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
    Explore Morse Code Tools &amp; Learning Hubs
  </h2>
  
  <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <!-- Card 1: Alphabet & Reference Chart (Live MVP) -->
    <a href="/reference" class="group rounded-xl border border-sky-200/80 bg-white p-4 shadow-xs transition hover:border-sky-400 hover:shadow-sm dark:border-sky-900/40 dark:bg-slate-900/90">
      <div class="flex items-center justify-between">
        <span class="inline-flex rounded-lg bg-sky-50 p-2 font-mono text-xs font-bold text-sky-700 dark:bg-sky-950/60 dark:text-sky-400">
          A &rarr; .-
        </span>
        <span class="text-xs font-semibold text-sky-600 group-hover:translate-x-0.5 transition-transform dark:text-sky-400">
          Explore &rarr;
        </span>
      </div>
      <h3 class="mt-3 text-sm font-bold text-slate-900 dark:text-slate-100">Alphabet &amp; Chart</h3>
      <p class="mt-1 text-xs text-slate-600 dark:text-slate-400">
        Browse the complete 54-character reference table of letters A–Z, numbers 0–9, and punctuation with audio previews.
      </p>
    </a>

    <!-- Card 2: 10-Lesson Beginner Course (Live Release 2) -->
    <a href="/learn" class="group rounded-xl border border-amber-200/80 bg-white p-4 shadow-xs transition hover:border-amber-400 hover:shadow-sm dark:border-amber-900/40 dark:bg-slate-900/90">
      <div class="flex items-center justify-between">
        <span class="inline-flex rounded-lg bg-amber-50 p-2 text-xs font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
          10 LESSONS
        </span>
        <span class="text-xs font-semibold text-amber-600 group-hover:translate-x-0.5 transition-transform dark:text-amber-400">
          Explore &rarr;
        </span>
      </div>
      <h3 class="mt-3 text-sm font-bold text-slate-900 dark:text-slate-100">Learn Morse Code</h3>
      <p class="mt-1 text-xs text-slate-600 dark:text-slate-400">
        Follow a step-by-step curriculum covering telegraphy foundations, single-element letters, digit rules, and timing.
      </p>
    </a>

    <!-- Card 3: Interactive Practice Drills (Live Release 2) -->
    <a href="/practice" class="group rounded-xl border border-teal-200/80 bg-white p-4 shadow-xs transition hover:border-teal-400 hover:shadow-sm dark:border-teal-900/40 dark:bg-slate-900/90">
      <div class="flex items-center justify-between">
        <span class="inline-flex rounded-lg bg-teal-50 p-2 text-xs font-bold text-teal-700 dark:bg-teal-950/60 dark:text-teal-400">
          DRILLS
        </span>
        <span class="text-xs font-semibold text-teal-600 group-hover:translate-x-0.5 transition-transform dark:text-teal-400">
          Explore &rarr;
        </span>
      </div>
      <h3 class="mt-3 text-sm font-bold text-slate-900 dark:text-slate-100">Practice Drills</h3>
      <p class="mt-1 text-xs text-slate-600 dark:text-slate-400">
        Build symbol recognition and speed with interactive visual flashcards and timed character exercises.
      </p>
    </a>

    <!-- Card 4: Knowledge Quizzes (Live Release 2) -->
    <a href="/quiz" class="group rounded-xl border border-rose-200/80 bg-white p-4 shadow-xs transition hover:border-rose-400 hover:shadow-sm dark:border-rose-900/40 dark:bg-slate-900/90">
      <div class="flex items-center justify-between">
        <span class="inline-flex rounded-lg bg-rose-50 p-2 text-xs font-bold text-rose-700 dark:bg-rose-950/60 dark:text-rose-400">
          EVALUATE
        </span>
        <span class="text-xs font-semibold text-rose-600 group-hover:translate-x-0.5 transition-transform dark:text-rose-400">
          Explore &rarr;
        </span>
      </div>
      <h3 class="mt-3 text-sm font-bold text-slate-900 dark:text-slate-100">Morse Code Quizzes</h3>
      <p class="mt-1 text-xs text-slate-600 dark:text-slate-400">
        Test your decoding accuracy with 10-question multiple-choice evaluations and instant scoring feedback.
      </p>
    </a>
  </div>
</section>
```

---

### How to Use the Morse Code Translator

```markdown
## How to Use the Morse Code Translator

Our **morse code translator online** provides instant, bidirectional conversion between English text and International Morse Code. Whether you are generating a message or decoding an unknown sequence, follow these three simple steps:

1. **Select Direction and Enter Your Message:**
   - **Text to Morse:** Type standard English sentences into the input panel. The tool translates letters, digits, and punctuation into dots and dashes as you type.
   - **Morse to Text:** Select the mode toggle or click **Switch Direction**. Enter dots (`.`) and dashes (`-`). Use a single space between letters and a forward slash (`/`) between words.
2. **Review Real-Time Output & Diagnostic Notices:**
   - Your translation updates instantly in the output panel.
   - If an entered character is outside the standard 54-symbol set, an amber notice flags its exact 1-based character position.
   - If a Morse sequence is unrecognized, the decoder replaces that token with `[?]` so you can pinpoint the error immediately.
3. **Listen, Copy, or Download:**
   - Click **Copy Output** to place the result onto your clipboard.
   - Click **Play** to listen to the audio transmission at your selected WPM speed and tone frequency.
   - Use the **WAV** button to download an uncompressed audio file directly to your device for offline playback.
```

---

### Bidirectional Conversion Mechanics

```markdown
## Bidirectional Translation: Text-to-Morse & Morse-to-English

Understanding the formatting conventions used by our **morse code generator** and **morse code decoder** ensures accurate copy and prevents transmission errors:

### Converting Text to Morse Code
- **Case Neutrality:** International Morse Code does not differentiate between uppercase and lowercase letters. Typing "Morse", "morse", or "MORSE" yields the identical sequence: `-- --- .-. ... .`.
- **Character Separation:** Each letter is separated by a single space (equivalent to 3 dot units in audio timing).
- **Word Boundaries:** Words are separated by a forward slash surrounded by spaces (` / `), representing the standard 7-dot silent pause.
- **Punctuation Support:** The encoder supports 18 standard punctuation symbols, including periods (`.-.-.-`), commas (`--..--`), question marks (`..--..`), and hyphens (`-....-`).

### Decoding Morse Code to English
- **Accepted Dot and Dash Variants:** The decoder accepts standard periods (`.`), hyphens (`-`), typographic dashes, and bullet points.
- **Mandatory Spacing:** Because letters vary in length from 1 to 5 elements, spaces between letters are required. For example, entering `... --- ...` correctly decodes to **SOS**, whereas contiguous entry without spaces triggers an unrecognized group alert.
- **Unrecognized Token Replacement:** If an unknown combination is submitted (e.g., `-------`), the engine safely inserts `[?]` into the output and provides an explanatory notice without crashing.
```

---

### Audio Playback, Tone Controls, and ITU Timing Standards

```markdown
## Audio Playback, Tone Controls, and Timing Standards

Morse code was designed primarily as an auditory signal system. Our player uses the HTML5 Web Audio API to synthesize clean sine-wave tones locally in your browser.

### The ITU-R M.1677-1 Standard Timing Ratio
Timing is calibrated to the standard international reference word **PARIS** (50 total units of time). The base unit duration $T$ is calculated directly from transmission speed:

$$T = \frac{1200}{\text{WPM}} \quad (\text{milliseconds})$$

At the standard speed of 15 WPM, one dot duration is exactly 80 milliseconds.

| Element | Duration | Description |
|---|---|---|
| **Dot (Dit)** | **$1T$** | Base unit of time. At 15 WPM, this equals 80 ms. |
| **Dash (Dah)** | **$3T$** | Exactly three times the duration of a dot (240 ms at 15 WPM). |
| **Intra-Character Gap** | **$1T$** | The silence between dots and dashes within the same letter. |
| **Inter-Letter Gap** | **$3T$** | The silence between consecutive letters within a word. |
| **Inter-Word Gap** | **$7T$** | The silence between separate words (represented by `/`). |

### Customizing Playback Controls
- **Adjustable Speed (5 to 30 WPM):** Set the playback rate with the WPM slider. Beginners can start at 5 to 10 WPM, while experienced operators can practice up to 30 WPM.
- **Adjustable Tone Pitch (400 Hz to 800 Hz):** Customize the tone frequency in 50 Hz increments. The default **600 Hz** represents the standard transceiver sidetone used by radio telegraphers.
- **Accessible Visual Beacon:** An on-screen amber light indicator pulses in sync with the audio. If your operating system has "prefers-reduced-motion" enabled, the flasher automatically stays disabled to ensure accessibility.
- **Advanced Audio Tools:** For deeper practice, enable **Farnsworth Spacing** to maintain high character speeds while lengthening inter-word pauses, or click **Export WAV** to save an uncompressed 16-bit PCM audio file to your device.
```

---

### International Character Directory & Learning Resources

```markdown
## International Morse Code Alphabet & Learning Resources

International Morse Code standardizes representations for 26 Latin letters, 10 Arabic digits, and 18 punctuation marks. Below are some of the most foundational characters:

| Character | Morse Code | Sound Rhythm | Character | Morse Code | Sound Rhythm |
|---|---|---|---|---|---|
| **E** | `.` | dit | **T** | `-` | DAH |
| **A** | `.-` | di-DAH | **N** | `-.` | DAH-dit |
| **I** | `..` | di-dit | **M** | `--` | DAH-DAH |
| **S** | `...` | di-di-dit | **O** | `---` | DAH-DAH-DAH |
| **R** | `.-.` | di-DAH-dit | **K** | `-.-` | DAH-di-DAH |

> **SOS Emergency Prosign Note:** The universal distress signal **SOS** (`... --- ...`) is formed from letters S, O, and S. When keyed over radio, it is transmitted as an unbroken procedural signal without pauses between letters.

### Explore Our Full Reference & Learning Hubs
- **[Morse Code Alphabet & Reference Chart](/reference):** Inspect the complete, searchable 54-character directory with individual audio sound buttons for every letter, number, and punctuation mark.
- **[Learn Morse Code Curriculum](/learn):** Step through our structured 10-lesson beginner curriculum covering foundations, digit rules, and auditory memory.
- **[Interactive Practice Drills](/practice):** Practice symbol recognition with interactive flashcard drills.
- **[Morse Code Quizzes](/quiz):** Test your knowledge and track your scores locally on your device.
```

---

### Frequently Asked Questions (FAQ)

```markdown
## Frequently Asked Questions

### What is the difference between a Morse code translator, generator, and decoder?
These terms describe related aspects of the same utility:
- A **Morse code generator** encodes readable plain text into Morse code dots and dashes.
- A **Morse code decoder** translates dots, dashes, and spacing back into readable text.
- A **Morse code translator** performs both operations bidirectionally. Our application combines these tools in one unified interface.

### How are letters and words separated in Morse code?
In written Morse code:
- Letters within a word are separated by a single space (representing 3 dot units in audio timing).
- Separate words are demarcated by a forward slash surrounded by spaces (` / `), representing a standard 7-dot silent pause.
Literal slashes within English text are encoded as `-..-.`.

### What is the emergency signal for SOS in Morse code?
The international distress signal **SOS** is written in Morse code as `... --- ...` (three dots, three dashes, three dots). When transmitted by telegraphers, it is sent as an unbroken procedural signal (prosign) without internal letter pauses, creating a distinctive rhythm designed to cut through interference. In our text translator, entering `... --- ...` decodes cleanly to SOS.

### Does this translator send my text to an external server?
No. Translation text is processed in your browser memory and is never transmitted over the network. Learning progress is stored locally on your device using localStorage, with zero third-party analytics or tracking.

### Can I use this Morse code translator on mobile devices?
Yes. The interface is fully responsive, featuring touch targets that meet accessibility standards (minimum 44×44 pixels) for smooth operation on smartphones and tablets.
```

---

### Contextual Next Steps

```html
<section class="mt-14 rounded-2xl border border-teal-200 bg-teal-50/50 p-6 text-center dark:border-teal-900/60 dark:bg-teal-950/20 sm:p-8">
  <h2 class="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
    Ready to Learn and Master Morse Code?
  </h2>
  <p class="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
    Whether you need to translate a single phrase or want to build real telegraphy skills, 
    our free learning curriculum and practice tools are ready when you are.
  </p>
  <div class="mt-5 flex flex-wrap items-center justify-center gap-3">
    <a href="/learn" class="inline-flex items-center rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 sm:text-sm">
      Start 10-Lesson Course
    </a>
    <a href="/reference" class="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-xs transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:text-sm">
      View Alphabet Chart
    </a>
    <a href="/practice" class="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-xs transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:text-sm">
      Try Practice Drills
    </a>
  </div>
</section>
```

