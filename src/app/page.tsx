import type { Metadata } from 'next';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Translator } from '@/components/translator/Translator';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Morse Code Translator & Decoder — Audio Tone Player',
  description:
    'Translate text to Morse code and decode Morse code to text. Play audio tones with custom speed (WPM) & pitch, flash visual signals, and learn online.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Morse Code Translator & Decoder — Audio Tone Player',
    description:
      'Translate text to Morse code and decode Morse code to text. Play audio tones with custom speed (WPM) & pitch, flash visual signals, and learn online.',
    url: getAbsoluteUrl('/'),
    type: 'website',
  },
};

const homeSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Morse Code Translator & Audio Player',
    url: getAbsoluteUrl('/'),
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All modern web browsers',
    browserRequirements: 'Requires JavaScript. Requires HTML5 Web Audio API for tone playback.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Instant bidirectional text-to-Morse and Morse-to-text translation',
      'Direction switching while preserving active input string',
      'Real-time diagnostic alerts for unsupported characters and malformed Morse groups',
      'Web Audio API tone playback with configurable speed (5–30 WPM) and pitch (400–800 Hz)',
      'On-screen visual light signal beacon with reduced-motion support',
      'Browser-local translation in memory with local storage progress tracking and zero third-party tracking',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between a Morse code translator, generator, and decoder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'These terms describe related aspects of the same utility: a generator encodes plain text into Morse code dots and dashes, a decoder translates dots and dashes back into readable text, and a translator performs both operations bidirectionally. This platform combines all three functions.',
        },
      },
      {
        '@type': 'Question',
        name: 'How are letters and words separated in Morse code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Letters within a word are separated by a single space (representing 3 dot units in audio timing). Separate words are demarcated by a forward slash surrounded by spaces ( / ), representing a standard 7-dot silent pause.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the emergency signal for SOS in Morse code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The international distress signal SOS is written in Morse code as ... --- ... (three dots, three dashes, three dots). When transmitted by telegraphers, it is sent as an unbroken procedural signal (prosign) without internal letter pauses.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does this translator send my text to an external server?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Translation text is processed in your browser memory and is never transmitted over the network. Learning progress is stored locally on your device using localStorage, with zero third-party analytics or tracking.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use this Morse code translator on mobile devices?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The interface is fully responsive, featuring touch targets that meet accessibility standards (minimum 44x44 pixels) for smooth operation on smartphones and tablets.',
        },
      },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={homeSchemas} />
      <Header />

      {/* Atmospheric Background Glow & Engineering Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[780px] overflow-hidden"
      >
        <div className="bg-grid mask-fade absolute inset-0 opacity-60" />
        <div className="absolute -top-32 left-1/2 h-[500px] w-[64rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-teal-500/15 via-emerald-500/10 to-transparent blur-3xl dark:from-teal-400/15 dark:via-emerald-400/8 dark:to-transparent" />
        <div className="absolute top-40 left-1/4 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl dark:bg-teal-400/8" />
        <div className="absolute top-20 right-1/4 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl dark:bg-amber-400/8" />
      </div>

      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 pt-2 pb-16 sm:px-6 sm:pt-3 sm:pb-20 lg:px-8">
        {/* =========================================================================
            HERO SECTION: Compact, Impactful, Above The Fold
            ========================================================================= */}
        <section className="mx-auto mb-4 max-w-4xl text-center sm:mb-6">
          {/* Centered Telemetry Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/90 bg-teal-50/90 px-3.5 py-1 text-xs font-semibold text-teal-900 shadow-2xs backdrop-blur-xs transition-colors hover:border-teal-400 dark:border-teal-800/80 dark:bg-teal-950/70 dark:text-teal-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-600 dark:bg-teal-400" />
            </span>
            <span>Recommendation ITU-R M.1677-1 Standard</span>
            <span className="text-teal-300 dark:text-teal-700">&bull;</span>
            <span className="font-mono text-[11px] font-bold tracking-widest text-teal-800 dark:text-teal-200">
              ••• ——— •••
            </span>
            <span className="hidden text-teal-300 sm:inline dark:text-teal-700">&bull;</span>
            <span className="hidden text-teal-700 sm:inline dark:text-teal-300 font-medium">Browser-Local Execution</span>
          </div>

          {/* Primary H1 Heading */}
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-[44px] sm:leading-tight dark:text-white">
            Free International{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-300 dark:via-emerald-300 dark:to-teal-200">
              Morse Code Translator
            </span>{' '}
            &amp; Audio Converter
          </h1>

          {/* Descriptive Subtitle */}
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Translate English text to International Morse Code and decode Morse signals back to text in real time.
            Listen with adjustable speed (5–30 WPM), tone pitch (400–800 Hz), and visual light beacon — free and browser-local.
          </p>
        </section>

        {/* =========================================================================
            TRANSLATOR CONSOLE WORKBENCH (Immediately Visible Above The Fold)
            ========================================================================= */}
        <div className="rounded-3xl">
          <Translator />
        </div>

        {/* =========================================================================
            SECTION 1: HOW TO USE THE MORSE CODE TRANSLATOR (Matching Image Structure)
            ========================================================================= */}
        <section aria-label="How to use the Morse code translator" className="mt-12 sm:mt-16 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                How to Use the Morse Code Translator
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Our <strong>morse code translator online</strong> provides instant, bidirectional conversion between English text and International Morse Code with real-time audio playback:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 dark:text-slate-100">1. Select Direction &amp; Enter Text</strong>
                Type English sentences to generate dots and dashes instantly, or enter Morse code (<code className="font-mono font-bold">.</code> and <code className="font-mono font-bold">-</code>) with spaces between letters to decode back to readable English.
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 dark:text-slate-100">2. Real-Time In-Browser Translation</strong>
                Translation occurs locally in your device memory as you type. There are no server round-trips, network lag, or third-party data tracking.
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 dark:text-slate-100">3. Live Diagnostics &amp; Error Tokens</strong>
                Unsupported symbols trigger an amber warning highlighting the character position, while malformed Morse sequences are safely tokenized with a non-blocking <code className="font-mono font-bold">[?]</code> symbol.
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 dark:text-slate-100">4. Listen, Copy, Loop &amp; Export WAV</strong>
                Click <strong>Play Morse</strong> to listen at 5–30 WPM with an interactive optical beacon, copy your translation with one click, or export uncompressed 16-bit PCM WAV audio.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: WHO USES MORSE CODE & THIS TOOL (Exact Image Mirror)
            ========================================================================= */}
        <section aria-label="Who uses Morse code and this tool" className="mt-8 sm:mt-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Who Uses Morse Code &amp; This Tool?
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              People use Morse code for different reasons. Some want a reliable emergency communication skill, some need continuous wave (CW) proficiency for amateur radio licensing, and some simply want to explore historical telecommunications and secret ciphers.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 dark:text-slate-100">Amateur Radio (Ham) Operators</strong>
                CW enthusiasts who want to practice sending and receiving rhythm, copy callsigns at high WPM speeds, and prepare for HF band amateur radio contests.
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 dark:text-slate-100">Aviation &amp; Maritime Specialists</strong>
                Pilots, navigators, and marine radio crews who identify navigational radio beacons (NDBs/VORs) and maintain non-verbal emergency signaling readiness.
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 dark:text-slate-100">STEM Students &amp; Educators</strong>
                Teachers and curious learners studying electromagnetism, binary communication principles, telecommunication history, and acoustic PARIS timing physics.
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 dark:text-slate-100">Puzzle Creators &amp; Mystery Gamers</strong>
                Escape room designers, geocachers, and mystery ARG creators who encode clues, secret ciphers, and hidden audio signals into their games.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: CONVERSION RULES & SYNTAX (Matching Image Structure)
            ========================================================================= */}
        <section aria-label="Bidirectional Morse Code Conversion Rules" className="mt-8 sm:mt-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Text-to-Morse &amp; Morse-to-English Conversion Rules
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Standardized formatting rules prevent transmission errors and ensure seamless communication across all telegraphic modes:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 dark:text-slate-100">Case Neutrality &amp; Full Catalog</strong>
                International Morse Code does not distinguish uppercase from lowercase. &ldquo;Morse&rdquo; and &ldquo;MORSE&rdquo; yield the exact same dot-dash sequence. The engine supports all 26 Latin letters, 10 Arabic digits, and 18 standard punctuation symbols.
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 dark:text-slate-100">Character &amp; Word Delimiters</strong>
                Letters within a word are separated by a single space (representing 3 dot units). Separate words are demarcated by a forward slash surrounded by spaces (<code className="font-mono font-bold"> / </code>), representing a standard 7-dot silent pause.
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 dark:text-slate-100">Accepted Dot &amp; Dash Formats</strong>
                The decoder flexibly recognizes standard periods (<code className="font-mono font-bold">.</code>), hyphens (<code className="font-mono font-bold">-</code>), en-dashes, em-dashes, and bullet points without breaking your input stream.
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 dark:text-slate-100">Error Handling &amp; Direction Switching</strong>
                Invalid Morse sequences are safely marked with an amber <code className="font-mono font-bold">[?]</code> token. You can switch translation direction at any time with one click without losing your active text.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: AUDIO PLAYBACK & TIMING STANDARDS (Matching Image Structure)
            ========================================================================= */}
        <section aria-label="Audio Playback and ITU-R Timing Standards" className="mt-8 sm:mt-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Audio Playback, Tone Controls &amp; Timing Standards
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Morse code is fundamentally an auditory language. Our tone generator synthesizes clean sine waves locally in your web browser calibrated to the international standard word <strong>PARIS</strong> (50 total units of time, where <code className="font-mono font-bold">T = 1200 / WPM</code> ms):
            </p>

            {/* Desktop Timing Table (Hidden on mobile) */}
            <div className="hidden md:block mb-6 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/40">
              <div className="overflow-x-auto p-4 sm:p-5">
                <table className="w-full text-left text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  <thead className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-100">
                    <tr>
                      <th className="py-2.5 pr-4">Timing Element</th>
                      <th className="py-2.5 pr-4">Duration</th>
                      <th className="hidden py-2.5 pr-6 sm:table-cell">Proportional Ratio</th>
                      <th className="py-2.5">Telegraphic Function</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium dark:divide-slate-800/80">
                    <tr className="table-row-hover">
                      <td className="py-3 pr-4 font-bold text-slate-900 dark:text-slate-100">Dot (Dit)</td>
                      <td className="py-3 pr-4"><span className="inline-flex rounded-md bg-teal-100 px-2 py-0.5 font-mono text-xs font-bold text-teal-900 dark:bg-teal-950 dark:text-teal-300">1T</span></td>
                      <td className="hidden py-3 pr-6 sm:table-cell font-mono text-xs text-slate-500">80 ms (at 15 WPM)</td>
                      <td className="py-3 text-xs sm:text-sm">Base unit of continuous wave duration.</td>
                    </tr>
                    <tr className="table-row-hover">
                      <td className="py-3 pr-4 font-bold text-slate-900 dark:text-slate-100">Dash (Dah)</td>
                      <td className="py-3 pr-4"><span className="inline-flex rounded-md bg-teal-100 px-2 py-0.5 font-mono text-xs font-bold text-teal-900 dark:bg-teal-950 dark:text-teal-300">3T</span></td>
                      <td className="hidden py-3 pr-6 sm:table-cell font-mono text-xs text-slate-500">240 ms (at 15 WPM)</td>
                      <td className="py-3 text-xs sm:text-sm">Exactly three times the duration of a dot.</td>
                    </tr>
                    <tr className="table-row-hover">
                      <td className="py-3 pr-4 font-bold text-slate-900 dark:text-slate-100">Intra-Character Gap</td>
                      <td className="py-3 pr-4"><span className="inline-flex rounded-md bg-amber-100 px-2 py-0.5 font-mono text-xs font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-300">1T</span></td>
                      <td className="hidden py-3 pr-6 sm:table-cell font-mono text-xs text-slate-500">80 ms silence</td>
                      <td className="py-3 text-xs sm:text-sm">Silent pause between dots/dashes within a letter.</td>
                    </tr>
                    <tr className="table-row-hover">
                      <td className="py-3 pr-4 font-bold text-slate-900 dark:text-slate-100">Inter-Letter Gap</td>
                      <td className="py-3 pr-4"><span className="inline-flex rounded-md bg-amber-100 px-2 py-0.5 font-mono text-xs font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-300">3T</span></td>
                      <td className="hidden py-3 pr-6 sm:table-cell font-mono text-xs text-slate-500">240 ms silence</td>
                      <td className="py-3 text-xs sm:text-sm">Silent pause between letters within a word.</td>
                    </tr>
                    <tr className="table-row-hover">
                      <td className="py-3 pr-4 font-bold text-slate-900 dark:text-slate-100">Inter-Word Gap</td>
                      <td className="py-3 pr-4"><span className="inline-flex rounded-md bg-amber-100 px-2 py-0.5 font-mono text-xs font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-300">7T</span></td>
                      <td className="hidden py-3 pr-6 sm:table-cell font-mono text-xs text-slate-500">560 ms silence</td>
                      <td className="py-3 text-xs sm:text-sm">Silent pause between distinct words (<code className="font-mono font-bold">/</code>).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile View: 0 Horizontal Scroll Timing Cards */}
            <div className="md:hidden mb-6 space-y-2.5">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">Dot (Dit)</span>
                  <span className="rounded-md bg-teal-100 px-2 py-0.5 font-mono text-xs font-bold text-teal-900 dark:bg-teal-950 dark:text-teal-300">1T (80 ms)</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Base unit of continuous wave duration.</p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">Dash (Dah)</span>
                  <span className="rounded-md bg-teal-100 px-2 py-0.5 font-mono text-xs font-bold text-teal-900 dark:bg-teal-950 dark:text-teal-300">3T (240 ms)</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Exactly three times the duration of a dot.</p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">Intra-Character Gap</span>
                  <span className="rounded-md bg-amber-100 px-2 py-0.5 font-mono text-xs font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-300">1T (80 ms)</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Silent pause between dots/dashes within a letter.</p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">Inter-Letter Gap</span>
                  <span className="rounded-md bg-amber-100 px-2 py-0.5 font-mono text-xs font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-300">3T (240 ms)</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Silent pause between letters within a word.</p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">Inter-Word Gap</span>
                  <span className="rounded-md bg-amber-100 px-2 py-0.5 font-mono text-xs font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-300">7T (560 ms)</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Silent pause between distinct words (<code className="font-mono font-bold">/</code>).</p>
              </div>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 dark:text-slate-100">5–30 WPM Speed</strong>
                Adjust playback speed with the WPM slider. Beginners can start at 5–10 WPM, while experienced operators can practice up to 30 WPM.
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 dark:text-slate-100">400–800 Hz Pitch</strong>
                Customize tone frequency in 50 Hz steps. Default 600 Hz mirrors standard transceiver sidetone audio.
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 dark:text-slate-100">Optical Light Sync</strong>
                On-screen amber optical beacon pulses in real time with the audio tone, automatically respecting reduced-motion accessibility settings.
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 dark:text-slate-100">WAV Audio Export</strong>
                Generate and download uncompressed 16-bit PCM WAV audio clips directly to your device for offline listening and practice drills.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: ALPHABET & SIGNALS QUICK DIRECTORY (Matching Image Structure)
            ========================================================================= */}
        <section aria-label="International Morse Code Alphabet and SOS Signal" className="mt-8 sm:mt-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                International Morse Code Alphabet &amp; Common Signals
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              International Morse Code standardizes 54 characters across 26 Latin letters, 10 Arabic digits, and 18 punctuation symbols. Key foundational symbols and rhythm patterns:
            </p>

            {/* Desktop Table View (Hidden on mobile to eliminate horizontal scrolling) */}
            <div className="hidden md:block mb-6 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/40">
              <table className="w-full text-left text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <thead className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-100">
                  <tr>
                    <th className="py-2.5 pr-4">Letter</th>
                    <th className="py-2.5 pr-4">Morse Code</th>
                    <th className="py-2.5 pr-6">Rhythm</th>
                    <th className="py-2.5 pr-4">Letter</th>
                    <th className="py-2.5 pr-4">Morse Code</th>
                    <th className="py-2.5">Rhythm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono dark:divide-slate-800/80">
                  <tr className="table-row-hover">
                    <td className="py-3 pr-4 text-base font-extrabold text-slate-900 dark:text-slate-100">E</td>
                    <td className="py-3 pr-4"><span className="inline-flex rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-sm font-bold tracking-widest text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">.</span></td>
                    <td className="py-3 pr-6 font-sans text-xs text-slate-600 dark:text-slate-400">dit</td>
                    <td className="py-3 pr-4 text-base font-extrabold text-slate-900 dark:text-slate-100">T</td>
                    <td className="py-3 pr-4"><span className="inline-flex rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-sm font-bold tracking-widest text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">-</span></td>
                    <td className="py-3 font-sans text-xs text-slate-600 dark:text-slate-400">DAH</td>
                  </tr>
                  <tr className="table-row-hover">
                    <td className="py-3 pr-4 text-base font-extrabold text-slate-900 dark:text-slate-100">A</td>
                    <td className="py-3 pr-4"><span className="inline-flex rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-sm font-bold tracking-widest text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">.-</span></td>
                    <td className="py-3 pr-6 font-sans text-xs text-slate-600 dark:text-slate-400">di-DAH</td>
                    <td className="py-3 pr-4 text-base font-extrabold text-slate-900 dark:text-slate-100">N</td>
                    <td className="py-3 pr-4"><span className="inline-flex rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-sm font-bold tracking-widest text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">-.</span></td>
                    <td className="py-3 font-sans text-xs text-slate-600 dark:text-slate-400">DAH-dit</td>
                  </tr>
                  <tr className="table-row-hover">
                    <td className="py-3 pr-4 text-base font-extrabold text-slate-900 dark:text-slate-100">I</td>
                    <td className="py-3 pr-4"><span className="inline-flex rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-sm font-bold tracking-widest text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">..</span></td>
                    <td className="py-3 pr-6 font-sans text-xs text-slate-600 dark:text-slate-400">di-dit</td>
                    <td className="py-3 pr-4 text-base font-extrabold text-slate-900 dark:text-slate-100">M</td>
                    <td className="py-3 pr-4"><span className="inline-flex rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-sm font-bold tracking-widest text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">--</span></td>
                    <td className="py-3 font-sans text-xs text-slate-600 dark:text-slate-400">DAH-DAH</td>
                  </tr>
                  <tr className="table-row-hover">
                    <td className="py-3 pr-4 text-base font-extrabold text-slate-900 dark:text-slate-100">S</td>
                    <td className="py-3 pr-4"><span className="inline-flex rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-sm font-bold tracking-widest text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">...</span></td>
                    <td className="py-3 pr-6 font-sans text-xs text-slate-600 dark:text-slate-400">di-di-dit</td>
                    <td className="py-3 pr-4 text-base font-extrabold text-slate-900 dark:text-slate-100">O</td>
                    <td className="py-3 pr-4"><span className="inline-flex rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-sm font-bold tracking-widest text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">---</span></td>
                    <td className="py-3 font-sans text-xs text-slate-600 dark:text-slate-400">DAH-DAH-DAH</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile View: 0 Horizontal Scroll, Clean Structured Tables */}
            <div className="md:hidden mb-6 space-y-3.5">
              {/* Dot-Rooted Group */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-3.5 dark:border-slate-800 dark:bg-slate-950/40">
                <div className="mb-2 flex items-center justify-between border-b border-slate-200/70 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <span>Dot-Rooted Elements</span>
                  <span className="font-mono text-[10px] text-teal-800 dark:text-teal-400">E · A · I · S</span>
                </div>
                <table className="w-full text-left text-xs text-slate-600 dark:text-slate-400">
                  <thead className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-100">
                    <tr>
                      <th className="py-2 pr-2">Letter</th>
                      <th className="py-2 pr-2">Morse Code</th>
                      <th className="py-2 text-right">Rhythm</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono dark:divide-slate-800/80">
                    <tr className="table-row-hover">
                      <td className="py-2.5 pr-2 text-base font-extrabold text-slate-900 dark:text-slate-100">E</td>
                      <td className="py-2.5 pr-2"><span className="inline-flex rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-sm font-bold tracking-widest text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">.</span></td>
                      <td className="py-2.5 font-sans text-xs text-right text-slate-600 dark:text-slate-400">dit</td>
                    </tr>
                    <tr className="table-row-hover">
                      <td className="py-2.5 pr-2 text-base font-extrabold text-slate-900 dark:text-slate-100">A</td>
                      <td className="py-2.5 pr-2"><span className="inline-flex rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-sm font-bold tracking-widest text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">.-</span></td>
                      <td className="py-2.5 font-sans text-xs text-right text-slate-600 dark:text-slate-400">di-DAH</td>
                    </tr>
                    <tr className="table-row-hover">
                      <td className="py-2.5 pr-2 text-base font-extrabold text-slate-900 dark:text-slate-100">I</td>
                      <td className="py-2.5 pr-2"><span className="inline-flex rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-sm font-bold tracking-widest text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">..</span></td>
                      <td className="py-2.5 font-sans text-xs text-right text-slate-600 dark:text-slate-400">di-dit</td>
                    </tr>
                    <tr className="table-row-hover">
                      <td className="py-2.5 pr-2 text-base font-extrabold text-slate-900 dark:text-slate-100">S</td>
                      <td className="py-2.5 pr-2"><span className="inline-flex rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-sm font-bold tracking-widest text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">...</span></td>
                      <td className="py-2.5 font-sans text-xs text-right text-slate-600 dark:text-slate-400">di-di-dit</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Dash-Rooted Group */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-3.5 dark:border-slate-800 dark:bg-slate-950/40">
                <div className="mb-2 flex items-center justify-between border-b border-slate-200/70 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <span>Dash-Rooted Elements</span>
                  <span className="font-mono text-[10px] text-teal-800 dark:text-teal-400">T · N · M · O</span>
                </div>
                <table className="w-full text-left text-xs text-slate-600 dark:text-slate-400">
                  <thead className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-100">
                    <tr>
                      <th className="py-2 pr-2">Letter</th>
                      <th className="py-2 pr-2">Morse Code</th>
                      <th className="py-2 text-right">Rhythm</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono dark:divide-slate-800/80">
                    <tr className="table-row-hover">
                      <td className="py-2.5 pr-2 text-base font-extrabold text-slate-900 dark:text-slate-100">T</td>
                      <td className="py-2.5 pr-2"><span className="inline-flex rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-sm font-bold tracking-widest text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">-</span></td>
                      <td className="py-2.5 font-sans text-xs text-right text-slate-600 dark:text-slate-400">DAH</td>
                    </tr>
                    <tr className="table-row-hover">
                      <td className="py-2.5 pr-2 text-base font-extrabold text-slate-900 dark:text-slate-100">N</td>
                      <td className="py-2.5 pr-2"><span className="inline-flex rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-sm font-bold tracking-widest text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">-.</span></td>
                      <td className="py-2.5 font-sans text-xs text-right text-slate-600 dark:text-slate-400">DAH-dit</td>
                    </tr>
                    <tr className="table-row-hover">
                      <td className="py-2.5 pr-2 text-base font-extrabold text-slate-900 dark:text-slate-100">M</td>
                      <td className="py-2.5 pr-2"><span className="inline-flex rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-sm font-bold tracking-widest text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">--</span></td>
                      <td className="py-2.5 font-sans text-xs text-right text-slate-600 dark:text-slate-400">DAH-DAH</td>
                    </tr>
                    <tr className="table-row-hover">
                      <td className="py-2.5 pr-2 text-base font-extrabold text-slate-900 dark:text-slate-100">O</td>
                      <td className="py-2.5 pr-2"><span className="inline-flex rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-sm font-bold tracking-widest text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">---</span></td>
                      <td className="py-2.5 font-sans text-xs text-right text-slate-600 dark:text-slate-400">DAH-DAH-DAH</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* SOS Emergency Callout */}
            <div className="flex flex-col gap-3 rounded-xl border border-amber-300/80 bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-950 sm:flex-row sm:items-center sm:justify-between dark:border-amber-800/70 dark:bg-amber-950/35 dark:text-amber-200">
              <div>
                <strong>SOS Emergency Prosign:</strong> The universal distress signal <strong>SOS</strong> (<code className="font-mono font-bold">... --- ...</code>) is sent as an unbroken procedural signal without pauses between letters.
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="rounded-lg border border-amber-300 bg-white px-3 py-1 font-mono text-xs font-bold tracking-widest text-amber-900 shadow-2xs dark:border-amber-700 dark:bg-slate-900 dark:text-amber-300">
                  ••• ——— •••
                </span>
                <Link
                  href="/reference"
                  className="rounded-lg bg-teal-700 px-3 py-1.5 font-sans text-xs font-bold text-white hover:bg-teal-800 dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400"
                >
                  Full Chart &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: EXPLORE MORSE CODE TOOLS (Matching Image Structure)
            ========================================================================= */}
        <section aria-label="Morse Code Learning and Reference Tools" className="mt-8 sm:mt-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Explore Morse Code Tools &amp; Learning Hubs
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Deepen your telegraphy skills with our complete 54-character reference table, 10-lesson curriculum, interactive speed drills, and audio file decoder:
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/reference"
                className="group flex flex-col justify-between rounded-xl border border-slate-200/80 bg-slate-50 p-5 transition-all hover:border-teal-400 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-teal-500 dark:hover:bg-slate-800"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-teal-800 dark:text-teal-300">A &rarr; .-</span>
                    <span className="text-xs font-bold text-teal-700 group-hover:translate-x-0.5 transition-transform dark:text-teal-400">View &rarr;</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">Alphabet &amp; Chart</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">Complete 54-character reference table of letters A–Z, digits 0–9, and punctuation with audio.</p>
                </div>
                <div className="mt-4 border-t border-slate-200/60 pt-2 font-mono text-[11px] text-slate-500 dark:border-slate-700/60 dark:text-slate-400">54 Characters &bull; Audio Tones</div>
              </Link>

              <Link
                href="/learn"
                className="group flex flex-col justify-between rounded-xl border border-slate-200/80 bg-slate-50 p-5 transition-all hover:border-teal-400 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-teal-500 dark:hover:bg-slate-800"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-teal-800 dark:text-teal-300">10 LESSONS</span>
                    <span className="text-xs font-bold text-teal-700 group-hover:translate-x-0.5 transition-transform dark:text-teal-400">Start &rarr;</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">Learn Morse Code</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">Structured curriculum covering telegraphy foundations, single-element letters, and timing.</p>
                </div>
                <div className="mt-4 border-t border-slate-200/60 pt-2 font-mono text-[11px] text-slate-500 dark:border-slate-700/60 dark:text-slate-400">Foundations &rarr; Words</div>
              </Link>

              <Link
                href="/practice"
                className="group flex flex-col justify-between rounded-xl border border-slate-200/80 bg-slate-50 p-5 transition-all hover:border-teal-400 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-teal-500 dark:hover:bg-slate-800"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-teal-800 dark:text-teal-300">DRILLS</span>
                    <span className="text-xs font-bold text-teal-700 group-hover:translate-x-0.5 transition-transform dark:text-teal-400">Train &rarr;</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">Practice Drills</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">Build symbol recall speed with flashcards, audio drills, and accuracy-based weak focus.</p>
                </div>
                <div className="mt-4 border-t border-slate-200/60 pt-2 font-mono text-[11px] text-slate-500 dark:border-slate-700/60 dark:text-slate-400">Flashcards &bull; Audio Drills</div>
              </Link>

              <Link
                href="/audio-decoder"
                className="group flex flex-col justify-between rounded-xl border border-slate-200/80 bg-slate-50 p-5 transition-all hover:border-teal-400 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-teal-500 dark:hover:bg-slate-800"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-teal-800 dark:text-teal-300">DECODER</span>
                    <span className="text-xs font-bold text-teal-700 group-hover:translate-x-0.5 transition-transform dark:text-teal-400">Decode &rarr;</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">Audio Decoder</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">Upload WAV, MP3, or OGG audio to automatically transcribe Morse tones into readable text.</p>
                </div>
                <div className="mt-4 border-t border-slate-200/60 pt-2 font-mono text-[11px] text-slate-500 dark:border-slate-700/60 dark:text-slate-400">WAV / MP3 &bull; Browser-Local</div>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: FREQUENTLY ASKED QUESTIONS (Matching Image Structure)
            ========================================================================= */}
        <section aria-label="Frequently Asked Questions" className="mt-8 sm:mt-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Clear answers to common questions about Morse code translation, spacing rules, and browser privacy:
            </p>

            <div className="space-y-4">
              <details className="accordion-card group rounded-xl border border-slate-200/80 bg-slate-50 p-5 shadow-2xs transition-all dark:border-slate-800 dark:bg-slate-800/60">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900 dark:text-slate-100">
                  <span className="text-sm sm:text-base">What is the difference between a Morse code translator, generator, and decoder?</span>
                  <span className="chevron-icon flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-400 transition-transform group-open:rotate-180 dark:border-slate-700 dark:text-slate-400">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3.5 border-t border-slate-200/70 pt-3 text-xs leading-relaxed text-slate-600 sm:text-sm dark:border-slate-700/70 dark:text-slate-400">
                  These terms describe related aspects of the same utility: a generator encodes plain text into Morse code dots and dashes, a decoder translates dots and dashes back into readable text, and a translator performs both operations bidirectionally. This platform combines all three functions.
                </div>
              </details>

              <details className="accordion-card group rounded-xl border border-slate-200/80 bg-slate-50 p-5 shadow-2xs transition-all dark:border-slate-800 dark:bg-slate-800/60">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900 dark:text-slate-100">
                  <span className="text-sm sm:text-base">How are letters and words separated in Morse code?</span>
                  <span className="chevron-icon flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-400 transition-transform group-open:rotate-180 dark:border-slate-700 dark:text-slate-400">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3.5 border-t border-slate-200/70 pt-3 text-xs leading-relaxed text-slate-600 sm:text-sm dark:border-slate-700/70 dark:text-slate-400">
                  Letters within a word are separated by a single space (representing 3 dot units in audio timing). Separate words are demarcated by a forward slash surrounded by spaces ( / ), representing a standard 7-dot silent pause.
                </div>
              </details>

              <details className="accordion-card group rounded-xl border border-slate-200/80 bg-slate-50 p-5 shadow-2xs transition-all dark:border-slate-800 dark:bg-slate-800/60">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900 dark:text-slate-100">
                  <span className="text-sm sm:text-base">What is the emergency signal for SOS in Morse code?</span>
                  <span className="chevron-icon flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-400 transition-transform group-open:rotate-180 dark:border-slate-700 dark:text-slate-400">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3.5 border-t border-slate-200/70 pt-3 text-xs leading-relaxed text-slate-600 sm:text-sm dark:border-slate-700/70 dark:text-slate-400">
                  The international distress signal SOS is written in Morse code as ... --- ... (three dots, three dashes, three dots). When transmitted by telegraphers, it is sent as an unbroken procedural signal (prosign) without internal letter pauses.
                </div>
              </details>

              <details className="accordion-card group rounded-xl border border-slate-200/80 bg-slate-50 p-5 shadow-2xs transition-all dark:border-slate-800 dark:bg-slate-800/60">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900 dark:text-slate-100">
                  <span className="text-sm sm:text-base">Does this translator send my text to an external server?</span>
                  <span className="chevron-icon flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-400 transition-transform group-open:rotate-180 dark:border-slate-700 dark:text-slate-400">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3.5 border-t border-slate-200/70 pt-3 text-xs leading-relaxed text-slate-600 sm:text-sm dark:border-slate-700/70 dark:text-slate-400">
                  No. Translation text is processed in your browser memory and is never transmitted over the network. Learning progress is stored locally on your device using localStorage, with zero third-party analytics or tracking.
                </div>
              </details>

              <details className="accordion-card group rounded-xl border border-slate-200/80 bg-slate-50 p-5 shadow-2xs transition-all dark:border-slate-800 dark:bg-slate-800/60">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900 dark:text-slate-100">
                  <span className="text-sm sm:text-base">Can I use this Morse code translator on mobile devices?</span>
                  <span className="chevron-icon flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-400 transition-transform group-open:rotate-180 dark:border-slate-700 dark:text-slate-400">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3.5 border-t border-slate-200/70 pt-3 text-xs leading-relaxed text-slate-600 sm:text-sm dark:border-slate-700/70 dark:text-slate-400">
                  Yes. The interface is fully responsive, featuring touch targets that meet accessibility standards (minimum 44x44 pixels) for smooth operation on smartphones and tablets.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: FINAL CALL TO ACTION (Tactile & Purposeful)
            ========================================================================= */}
        <section aria-label="Ready to Learn and Master Morse Code" className="relative mt-8 sm:mt-12 overflow-hidden rounded-2xl sm:rounded-3xl border border-teal-200/90 bg-gradient-to-br from-teal-50/80 via-white to-amber-50/40 p-6 sm:p-10 md:p-12 text-center dark:border-teal-900/60 dark:from-teal-950/40 dark:via-slate-900 dark:to-slate-900">
          <div aria-hidden="true" className="bg-grid mask-fade pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-300/80 bg-white px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 shadow-2xs dark:border-teal-800 dark:bg-slate-900 dark:text-teal-300">
              CW Telegraphy &bull; Start Learning
            </span>
            <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl dark:text-slate-100">
              Ready to Learn and Master Morse Code?
            </h2>
            <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
              Whether you need to translate a single phrase or want to build real telegraphy skills,
              our free learning curriculum and practice tools are ready when you are.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/learn"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-800 sm:text-sm dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400"
              >
                Start 10-Lesson Course
              </Link>
              <Link
                href="/reference"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                View Alphabet Chart
              </Link>
              <Link
                href="/practice"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Try Practice Drills
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
