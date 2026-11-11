# Homepage SEO Content Draft — Version 2 (Fact-Checked & Revised)

- **Target URL:** `/` (Homepage)
- **Primary Search Intent:** Immediate Utility / Translation (`morse code translator`)
- **Primary Keyword:** `morse code translator` (Monthly Volume: 246,000 | KD: 40)
- **Secondary Keywords (Integrated Naturally):**
  - `morse code` (Vol: 550,000 | KD: 51)
  - `morse code generator` (Vol: 12,100 | KD: 3)
  - `morse code decoder` (Vol: 9,900 | KD: 20)
  - `morse code converter` (Vol: 8,100 | KD: 42)
  - `text to morse code` (Vol: 4,400 | KD: 38)
  - `morse code to english` (Vol: 4,400 | KD: 36)
  - `translator code morse` (Vol: 18,100 | KD: 40)
  - `morse code translator online` (Vol: 6,600 | KD: 34)
- **Audit Reference:** [`docs/seo/content-drafts/homepage-content-audit.md`](file:///d:/Project/Morse%20Code%20Translator%20Website/docs/seo/content-drafts/homepage-content-audit.md)
- **Status:** Pending Final User Review & Approval

---

## 1. On-Page Metadata & Structured Data

### SEO Metadata
- **SEO Title:** `Morse Code Translator — Free Text & Audio Converter` (53 characters)
- **Meta Description:** `Translate English text to International Morse Code and decode Morse code to text instantly. Listen with adjustable speed and pitch controls — free and browser-local.` (159 characters)
- **Canonical URL:** `https://morsecodetranslator.org/`
- **Primary H1:** `Free International Morse Code Translator & Audio Converter`

### Supported JSON-LD Schema
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
      "Direction switching while preserving active input",
      "Real-time diagnostic warnings for unsupported characters and malformed Morse groups",
      "Web Audio API tone playback with configurable speed (5–30 WPM) and pitch (400–800 Hz)",
      "On-screen visual light signal beacon with reduced-motion support",
      "100% browser-local execution with zero server logging and zero third-party tracking"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I translate English text to Morse code?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Select the 'Text to Morse' mode, then type or paste your message into the input box. The tool converts each character into standard International Morse code in real time."
        }
      },
      {
        "@type": "Question",
        "name": "How do I decode Morse code back to English text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Select the 'Morse to Text' mode or click 'Switch Direction'. Enter dots (.) and dashes (-), using a space between letters and a forward slash (/) between words. The English translation appears immediately."
        }
      },
      {
        "@type": "Question",
        "name": "What separator is used between words in Morse code?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In written Morse code, letters are separated by a space (representing 3 dot units), and separate words are demarcated by a forward slash surrounded by spaces ( / ), representing a standard 7-dot silent pause."
        }
      },
      {
        "@type": "Question",
        "name": "What speed and audio frequency does the player use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The audio player supports transmission speeds from 5 to 30 WPM (default 15 WPM) and tone frequencies from 400 to 800 Hz (default 600 Hz), calibrated to the international PARIS standard."
        }
      },
      {
        "@type": "Question",
        "name": "Is my text private and secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. All translations and audio synthesis run 100% locally in your browser memory. Your text is never transmitted over the internet, stored on a database, or analyzed by third-party tracking scripts."
        }
      }
    ]
  }
]
```

---

## 2. Revised Homepage Content Body

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

*(Renders `src/components/translator/Translator.tsx` directly below the hero)*

```html
<section aria-label="Morse Code Translator Application">
  <!-- Interactive Translator Component -->
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
    <!-- Card 1: Alphabet & Reference Chart -->
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

    <!-- Card 2: 10-Lesson Beginner Course -->
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
        Follow a step-by-step curriculum covering telegraphy history, foundational letters, digits, and timing rhythms.
      </p>
    </a>

    <!-- Card 3: Interactive Practice Drills -->
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

    <!-- Card 4: Knowledge Quizzes -->
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
        Test your decoding accuracy with multiple-choice evaluations and instant performance feedback.
      </p>
    </a>
  </div>
</section>
```

---

### How to Use the Morse Code Translator

```markdown
## How to Use the Morse Code Translator

Our **morse code translator online** provides instant, bidirectional conversion between English text and International Morse Code. Whether you are generating a message or decoding an unknown sequence, follow these three steps:

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
   - Use the **WAV** button to download a studio-grade uncompressed audio file directly to your device.
```

---

### Bidirectional Conversion Mechanics

```markdown
## Bidirectional Translation: Text-to-Morse & Morse-to-English

Understanding the formatting conventions used by our **morse code generator** and **morse code decoder** ensures seamless communication and error-free copy:

### Converting Text to Morse Code
- **Case Neutrality:** Morse code does not differentiate between uppercase and lowercase letters. Typing "Morse", "morse", or "MORSE" yields the identical sequence: `-- --- .-. ... .`.
- **Character Separation:** Each letter is separated by a single space (equivalent to 3 dot units in audio timing).
- **Word Boundaries:** Words are separated by a forward slash surrounded by spaces (` / `), representing the standard 7-dot silent pause.
- **Punctuation Support:** The encoder supports 18 standard punctuation symbols, including periods (`.-.-.-`), commas (`--..--`), question marks (`..--..`), and hyphens (`-....-`).

### Decoding Morse Code to English
- **Accepted Dot and Dash Variants:** The decoder accepts standard periods (`.`), hyphens (`-`), typographic dashes, and bullet points.
- **Mandatory Spacing:** Because letters vary in length from 1 to 5 elements, spaces between letters are required. For example, entering `... --- ...` correctly decodes to **SOS**, whereas contiguous entry without spaces triggers an unrecognized group alert.
- **Unrecognized Token Replacement:** If an unknown combination is submitted (e.g., `-------`), the engine safely inserts `[?]` into the output and provides an explanatory notice without crashing.
```

---

### Audio Playback, Tone Synthesis & ITU Timing

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
- **Farnsworth Spacing Mode:** For ear training, Farnsworth timing keeps individual letters at your chosen speed while lengthening pauses between words, helping your brain recognize the rhythm of whole characters.
- **WAV Audio Export:** Save your transmission as an uncompressed 16-bit PCM WAV audio file locally on your device for offline practice, ringtones, or educational demonstrations.
```

---

### International Character Directory & Learning Hubs

```markdown
## International Morse Code Alphabet & Learning Resources

International Morse Code standardizes representations for 26 Latin letters, 10 Arabic digits, and 18 punctuation marks. Below are the most frequently used characters:

| Character | Morse Code | Sound Rhythm | Character | Morse Code | Sound Rhythm |
|---|---|---|---|---|---|
| **E** | `.` | dit | **T** | `-` | DAH |
| **A** | `.-` | di-DAH | **N** | `-.` | DAH-dit |
| **I** | `..` | di-dit | **M** | `--` | DAH-DAH |
| **S** | `...` | di-di-dit | **O** | `---` | DAH-DAH-DAH |
| **SOS** | `... --- ...` | di-di-dit DAH-DAH-DAH di-di-dit | **0** | `-----` | 5 Dahs |

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

### What is the emergency signal for SOS in Morse code?
The international distress signal **SOS** is written in Morse code as `... --- ...`. When keyed by radio operators, it is transmitted as an unbroken procedural signal (prosign) without internal letter spacing, creating a distinctive rhythm designed to cut through interference. In our text translator, entering `... --- ...` decodes cleanly to SOS.

### What is the forward slash (/) used for in Morse code?
Because spaces separate individual letters within a word, a forward slash surrounded by spaces (` / `) is the standard notation used to indicate the boundary between separate words. In audio playback, this represents a 7-dot duration pause. Literal slashes within English text are encoded as `-..-.`.

### Does this tool send my translation text to an external server?
No. All translation logic, audio synthesis, and progress tracking run 100% locally in your device's web browser using client-side JavaScript. Your text is never transmitted across the network, stored on a remote server, or tracked by third-party analytics.

### Can I practice Morse code on mobile devices?
Yes. The translator interface and learning modules are fully responsive, featuring touch targets that meet accessibility standards (minimum 44×44 pixels) for smooth operation on smartphones and tablets.
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

