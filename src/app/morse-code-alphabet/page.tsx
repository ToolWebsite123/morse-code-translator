import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { ReferenceChart } from '@/components/reference/ReferenceChart';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';
import { LETTER_MAPPINGS, PUNCTUATION_MAPPINGS } from '@/lib/morse/mapping';

export const metadata: Metadata = {
  title: 'Morse Code Alphabet Chart & Letters',
  description:
    'Complete International Morse Code alphabet chart for all 26 A–Z letters, 0–9 numbers, and 18 punctuation symbols. Search characters and listen to audio.',
  alternates: {
    canonical: '/morse-code-alphabet',
  },
  openGraph: {
    title: 'Morse Code Alphabet Chart & Letters',
    description:
      'Complete International Morse Code alphabet chart for all 26 A–Z letters, 0–9 numbers, and 18 punctuation symbols. Search characters and listen to audio.',
    url: getAbsoluteUrl('/morse-code-alphabet'),
    type: 'article',
  },
};

interface AlphabetRow {
  letter: string;
  rhythm: string;
  elements: number;
  summary: string;
}

const ALPHABET_REFERENCE_ROWS: readonly AlphabetRow[] = [
  { letter: 'A', rhythm: 'di-dah', elements: 2, summary: '1 dot, 1 dash' },
  { letter: 'B', rhythm: 'dah-di-di-dit', elements: 4, summary: '1 dash, 3 dots' },
  { letter: 'C', rhythm: 'dah-di-dah-dit', elements: 4, summary: 'Alternating dash-dot-dash-dot' },
  { letter: 'D', rhythm: 'dah-di-dit', elements: 3, summary: '1 dash, 2 dots' },
  { letter: 'E', rhythm: 'dit', elements: 1, summary: 'Single dot (shortest letter)' },
  { letter: 'F', rhythm: 'di-di-dah-dit', elements: 4, summary: '2 dots, 1 dash, 1 dot' },
  { letter: 'G', rhythm: 'dah-dah-dit', elements: 3, summary: '2 dashes, 1 dot' },
  { letter: 'H', rhythm: 'di-di-di-dit', elements: 4, summary: '4 dots' },
  { letter: 'I', rhythm: 'di-dit', elements: 2, summary: '2 dots' },
  { letter: 'J', rhythm: 'di-dah-dah-dah', elements: 4, summary: '1 dot, 3 dashes' },
  { letter: 'K', rhythm: 'dah-di-dah', elements: 3, summary: 'Dash, dot, dash' },
  { letter: 'L', rhythm: 'di-dah-di-dit', elements: 4, summary: 'Dot, dash, 2 dots' },
  { letter: 'M', rhythm: 'dah-dah', elements: 2, summary: '2 dashes' },
  { letter: 'N', rhythm: 'dah-dit', elements: 2, summary: '1 dash, 1 dot' },
  { letter: 'O', rhythm: 'dah-dah-dah', elements: 3, summary: '3 dashes' },
  { letter: 'P', rhythm: 'di-dah-dah-dit', elements: 4, summary: 'Dot, 2 dashes, dot' },
  { letter: 'Q', rhythm: 'dah-dah-di-dah', elements: 4, summary: '2 dashes, dot, dash' },
  { letter: 'R', rhythm: 'di-dah-dit', elements: 3, summary: 'Dot, dash, dot' },
  { letter: 'S', rhythm: 'di-di-dit', elements: 3, summary: '3 dots' },
  { letter: 'T', rhythm: 'dah', elements: 1, summary: 'Single dash' },
  { letter: 'U', rhythm: 'di-di-dah', elements: 3, summary: '2 dots, 1 dash' },
  { letter: 'V', rhythm: 'di-di-di-dah', elements: 4, summary: '3 dots, 1 dash' },
  { letter: 'W', rhythm: 'di-dah-dah', elements: 3, summary: '1 dot, 2 dashes' },
  { letter: 'X', rhythm: 'dah-di-di-dah', elements: 4, summary: 'Dash, 2 dots, dash' },
  { letter: 'Y', rhythm: 'dah-di-dah-dah', elements: 4, summary: 'Dash, dot, 2 dashes' },
  { letter: 'Z', rhythm: 'dah-dah-di-dit', elements: 4, summary: '2 dashes, 2 dots' },
];


interface PunctuationRow {
  symbol: string;
  name: string;
  rhythm: string;
  elements: number;
  note: string;
}

const PUNCTUATION_REFERENCE_ROWS: readonly PunctuationRow[] = [
  { symbol: '.', name: 'Period / Full Stop', rhythm: 'di-dah-di-dah-di-dah', elements: 6, note: 'Three repeating A (.-) pairs (A-A-A)' },
  { symbol: ',', name: 'Comma', rhythm: 'dah-dah-di-di-dah-dah', elements: 6, note: 'Two dashes, two dots, two dashes' },
  { symbol: '?', name: 'Question Mark', rhythm: 'di-di-dah-dah-di-dit', elements: 6, note: 'Exact inverse of the comma (--..--)' },
  { symbol: "'", name: 'Apostrophe', rhythm: 'di-dah-dah-dah-dah-dit', elements: 6, note: 'Four dashes framed by single dots' },
  { symbol: '!', name: 'Exclamation Mark', rhythm: 'dah-di-dah-di-dah-dah', elements: 6, note: 'K (-.-) followed by .--' },
  { symbol: '/', name: 'Slash (Literal)', rhythm: 'dah-di-di-dah-dit', elements: 5, note: 'Transmits a literal / character (e.g., 1/2 or fractions)' },
  { symbol: '(', name: 'Open Parenthesis', rhythm: 'dah-di-dah-dah-dit', elements: 5, note: 'Opens a parenthetical phrase (KN pattern)' },
  { symbol: ')', name: 'Close Parenthesis', rhythm: 'dah-di-dah-dah-di-dah', elements: 6, note: 'Closes a parenthetical phrase' },
  { symbol: '&', name: 'Ampersand', rhythm: 'di-dah-di-di-dit', elements: 5, note: 'Dot, dash, three dots (AS wait pattern)' },
  { symbol: ':', name: 'Colon', rhythm: 'dah-dah-dah-di-di-dit', elements: 6, note: 'Three dashes (O) + three dots (S)' },
  { symbol: ';', name: 'Semicolon', rhythm: 'dah-di-dah-di-dah-dit', elements: 6, note: 'Three repeating N (-.) pairs (N-N-N)' },
  { symbol: '=', name: 'Equals Sign', rhythm: 'dah-di-di-di-dah', elements: 5, note: 'Three dots framed by single dashes (BT separator)' },
  { symbol: '+', name: 'Plus Sign', rhythm: 'di-dah-di-dah-dit', elements: 5, note: 'Alternating dot-dash-dot-dash-dot (AR pattern)' },
  { symbol: '-', name: 'Hyphen / Minus', rhythm: 'dah-di-di-di-di-dah', elements: 6, note: 'Four dots framed by single dashes' },
  { symbol: '_', name: 'Underscore', rhythm: 'di-di-dah-dah-di-dah', elements: 6, note: 'Question mark start (..--) ending with .-' },
  { symbol: '"', name: 'Quotation Mark', rhythm: 'di-dah-di-di-dah-dit', elements: 6, note: 'Two R (.-.) patterns side by side (.-. + .-.)' },
  { symbol: '$', name: 'Dollar Sign', rhythm: 'di-di-di-dah-di-di-dah', elements: 7, note: 'Longest symbol in the chart (7 elements: ... + -..-)' },
  { symbol: '@', name: 'At Sign', rhythm: 'di-dah-dah-di-dah-dit', elements: 6, note: 'Added to ITU-R M.1677-1 in 2004 for email addresses (A + C merged)' },
];

const REFERENCE_FAQS = [
  {
    question: 'How many characters are in the International Morse Code chart on this page?',
    answer:
      'Our International Morse Code reference chart includes 54 characters: all 26 basic Latin letters (A through Z), all 10 Arabic numerals (0 through 9), and 18 official punctuation and symbol characters (., ,, ?, \', !, /, (, ), &, :, ;, =, +, -, _, ", $, and @).',
  },
  {
    question: 'What are the easiest Morse code letters to memorize first?',
    answer:
      'If you are memorizing the visual chart, the shortest letters are E (.) and T (-), followed by the two-element letters I (..), M (--), A (.-), and N (-.), and the three-element symmetrical letters S (...) and O (---). You can practice these foundational characters step by step in our 10-lesson beginner course.',
  },
  {
    question: 'Why do all Morse code numbers have five elements?',
    answer:
      'Every digit from 0 to 9 in International Morse Code uses exactly five elements to create a predictable, error-resistant pattern that cannot be confused with 1-to-4-element letters. Digits 1 through 5 begin with one to five dots followed by dashes (.---- to .....), while digits 6 through 9 and 0 begin with one to five dashes followed by dots (-.... to -----).',
  },
  {
    question: 'Is there punctuation in Morse code, and what are the most common symbols?',
    answer:
      'Yes, International Morse Code includes 5-to-7-element sequences for punctuation and special symbols. The most frequently used punctuation marks are the period or full stop (., encoded as .-.-.-), the comma (,, encoded as --..--), the question mark (?, encoded as ..--..), the literal forward slash (/, encoded as -..-.), and the @ sign (.--.-.), which was added by the ITU in 2004 for email addresses.',
  },
  {
    question: 'How can I look up what letter a Morse code sequence stands for?',
    answer:
      'You can type periods (.) and hyphens (-) directly into the search bar at the top of this reference chart to filter characters by their Morse code sequence. To decode multiple characters, full words, or complete sentences at once, paste your dot-dash string into the Morse Code Translator on the homepage.',
  },
  {
    question: 'How do I hear how a Morse code letter or symbol sounds?',
    answer:
      'Click the Play button directly next to any character in the reference table at the top of this page to hear its audio sound immediately (click Stop to pause). You can also copy the sequence into the Morse Code Translator on the homepage to customize speed (5–30 WPM) and tone pitch (400–800 Hz).',
  },
] as const;

const referenceSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${getAbsoluteUrl('/morse-code-alphabet')}#webpage`,
    url: getAbsoluteUrl('/morse-code-alphabet'),
    name: 'Morse Code Alphabet & Chart: A–Z Letters, Numbers & Symbols',
    description:
      'Complete International Morse Code alphabet chart for all 26 A–Z letters, 0–9 numbers, and 18 punctuation symbols with sound audio previews.',
    isPartOf: {
      '@type': 'WebSite',
      url: getAbsoluteUrl('/'),
      name: 'Morse Code Translator',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: getAbsoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Morse Code Alphabet',
        item: getAbsoluteUrl('/morse-code-alphabet'),
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: REFERENCE_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  },
];

export default function ReferencePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={referenceSchemas} />
      <Header />

      {/* Atmospheric Background Glow & Engineering Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] overflow-hidden"
      >
        <div className="bg-grid mask-fade absolute inset-0 opacity-60" />
        <div className="absolute -top-24 left-1/2 h-96 w-[56rem] -translate-x-1/2 rounded-full bg-teal-500/12 blur-3xl dark:bg-teal-400/10" />
        <div className="absolute top-28 left-1/3 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl dark:bg-amber-400/8" />
      </div>

      <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-4 pt-3 pb-12 sm:px-6 sm:pt-4 sm:pb-16 lg:px-8">
        {/* Centered Breadcrumb Navigation Pill */}
        <nav aria-label="Breadcrumb" className="mb-4 flex justify-center">
          <ol className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3.5 py-1 text-xs text-slate-500 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
            <li>
              <Link href="/" className="transition-colors hover:text-teal-700 dark:hover:text-teal-400">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</li>
            <li className="font-semibold text-slate-900 dark:text-slate-100" aria-current="page">
              Morse Code Alphabet
            </li>
          </ol>
        </nav>

        {/* =========================================================================
            HERO SECTION: HOME-PAGE STYLE, IMMERSIVE & DIRECT ACCESS TO WORKBENCH
            ========================================================================= */}
        <section className="mx-auto mb-8 max-w-4xl text-center sm:mb-12">
          {/* Centered Standard & Telemetry Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/90 bg-teal-50/90 px-3.5 py-1 text-xs font-semibold text-teal-900 shadow-2xs backdrop-blur-xs transition-transform hover:scale-102 dark:border-teal-800/80 dark:bg-teal-950/70 dark:text-teal-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Recommendation ITU-R M.1677-1 Standard</span>
            <span className="text-teal-300 dark:text-teal-700">&bull;</span>
            <span className="font-mono text-[11px] font-bold tracking-widest text-teal-800 dark:text-teal-200">
              54 Characters
            </span>
            <span className="hidden text-teal-300 sm:inline dark:text-teal-700">&bull;</span>
            <span className="hidden text-emerald-700 sm:inline dark:text-emerald-300 font-medium">Individual Audio Previews</span>
          </div>

          {/* Centered Main Title (H1) */}
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-[44px] sm:leading-tight dark:text-white">
            International{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-300 dark:via-emerald-300 dark:to-teal-200">
              Morse Code Alphabet
            </span>{' '}
            &amp; Reference Chart
          </h1>

          {/* Centered Descriptive Subtitle */}
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Look up official International Morse Code representations for all 54 standard characters — 26 letters (A–Z), 10 digits (0–9), and 18 punctuation symbols. Search by character or dot-dash sequence, and listen with instant audio previews.
          </p>
        </section>

        {/* =========================================================================
            SECTION 1: INTERACTIVE SEARCH & AUDIO REFERENCE CHART (Primary Utility)
            ========================================================================= */}
        <section id="chart" aria-label="Interactive Morse Code Search and Filter Chart" className="mb-10 sm:mb-14 scroll-mt-20">
          <ReferenceChart />
        </section>

        {/* =========================================================================
            SECTION 2: A–Z MORSE CODE ALPHABET (Elevated Container + Dual-View)
            ========================================================================= */}
        <section id="alphabet" aria-label="A to Z Morse Code Alphabet" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                A–Z Morse Code Alphabet: Complete Letter Chart
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              The <strong>International Morse Code alphabet</strong> encodes the 26 basic Latin letters (
              <strong>A through Z</strong>) using combinations of short signals (<strong>dots</strong>, written as <code className="font-mono font-semibold">.</code>) and long signals (
              <strong>dashes</strong>, written as <code className="font-mono font-semibold">-</code>
              ). Every letter consists of <strong>1 to 4 elements</strong>, with no letter exceeding four signals.
            </p>

            {/* Signal Length by Frequency Breakdown Cards */}
            <div className="mb-6 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-950/40">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                Signal Length Optimization by Frequency (E, T, A, I, N, M)
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
                Signal lengths correspond to natural English letter frequency so operators transmit common words at maximum speed:
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="card-interactive group relative overflow-hidden rounded-xl border border-slate-200/90 bg-white p-4 hover:border-teal-400 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-teal-500">
                  <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-teal-500 transition-all group-hover:h-1.5" />
                  <div className="font-mono text-xs font-bold text-teal-700 dark:text-teal-400">
                    1-Element Letters (2)
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    Most frequent: <strong>E</strong> (<code className="font-mono font-bold text-teal-900 dark:text-teal-200">.</code>) and <strong>T</strong> (<code className="font-mono font-bold text-teal-900 dark:text-teal-200">-</code>).
                  </p>
                </div>
                <div className="card-interactive group relative overflow-hidden rounded-xl border border-slate-200/90 bg-white p-4 hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-emerald-500">
                  <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-emerald-500 transition-all group-hover:h-1.5" />
                  <div className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    2-Element Letters (4)
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    Common: <strong>A</strong> (<code className="font-mono font-bold text-teal-900 dark:text-teal-200">.-</code>), <strong>I</strong> (<code className="font-mono font-bold text-teal-900 dark:text-teal-200">..</code>), <strong>M</strong> (<code className="font-mono font-bold text-teal-900 dark:text-teal-200">--</code>), and <strong>N</strong> (<code className="font-mono font-bold text-teal-900 dark:text-teal-200">-.</code>).
                  </p>
                </div>
                <div className="card-interactive group relative overflow-hidden rounded-xl border border-slate-200/90 bg-white p-4 hover:border-amber-400 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-amber-500">
                  <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-amber-500 transition-all group-hover:h-1.5" />
                  <div className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400">
                    3-Element Letters (8)
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    Mid-frequency: <strong>D</strong>, <strong>G</strong>, <strong>K</strong>, <strong>O</strong>, <strong>R</strong>, <strong>S</strong>, <strong>U</strong>, and <strong>W</strong>.
                  </p>
                </div>
                <div className="card-interactive group relative overflow-hidden rounded-xl border border-slate-200/90 bg-white p-4 hover:border-rose-400 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-rose-500">
                  <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-rose-500 transition-all group-hover:h-1.5" />
                  <div className="font-mono text-xs font-bold text-rose-700 dark:text-rose-400">
                    4-Element Letters (12)
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    Less frequent: <strong>B</strong>, <strong>C</strong>, <strong>F</strong>, <strong>H</strong>, <strong>J</strong>, <strong>L</strong>, <strong>P</strong>, <strong>Q</strong>, <strong>V</strong>, <strong>X</strong>, <strong>Y</strong>, and <strong>Z</strong>.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-amber-200/90 bg-amber-50/70 px-4 py-3 text-xs leading-relaxed text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
                <strong>Pronunciation Tip:</strong> Experienced radio operators read Morse code aloud by its acoustic
                rhythm using <strong>&ldquo;dit&rdquo;</strong> for a dot and <strong>&ldquo;dah&rdquo;</strong> for a
                dash. When a dot appears before the final element of a character, it is spoken as <strong>&ldquo;di&rdquo;</strong> (e.g. <strong>A</strong> <code className="font-mono font-bold">.-</code> is <strong>di-dah</strong>).
              </div>
            </div>

            {/* Desktop Table View (Hidden on mobile) */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <table className="w-full border-collapse text-left text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/95 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
                    <th scope="col" className="px-5 py-3.5">Letter</th>
                    <th scope="col" className="px-5 py-3.5">Morse Code</th>
                    <th scope="col" className="px-5 py-3.5">Spoken Rhythm (dit / dah)</th>
                    <th scope="col" className="px-5 py-3.5">Elements</th>
                    <th scope="col" className="px-5 py-3.5">Structure Summary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {ALPHABET_REFERENCE_ROWS.map((row) => {
                    const code = LETTER_MAPPINGS[row.letter];
                    return (
                      <tr key={row.letter} className="table-row-hover group">
                        <td className="px-5 py-3 font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 font-mono text-sm font-extrabold text-slate-900 shadow-2xs transition-colors group-hover:border-teal-400 group-hover:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:group-hover:border-teal-400">
                            {row.letter}
                          </span>
                        </td>
                        <td className="px-5 py-3 font-mono text-base font-extrabold tracking-[0.2em] text-teal-800 dark:text-teal-300">
                          {code}
                        </td>
                        <td className="px-5 py-3">
                          <span className="inline-flex items-center rounded-lg border border-amber-200/80 bg-amber-50/90 px-2.5 py-1 font-mono text-xs font-semibold text-amber-900 dark:border-amber-800/60 dark:bg-amber-950/50 dark:text-amber-300">
                            {row.rhythm}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            {row.elements}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-xs text-slate-600 dark:text-slate-400">
                          {row.summary}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Touch-Friendly Card Grid (Visible on mobile, 0 horizontal clipping) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:hidden">
              {ALPHABET_REFERENCE_ROWS.map((row) => {
                const code = LETTER_MAPPINGS[row.letter];
                return (
                  <div key={row.letter} className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white font-mono text-sm font-extrabold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                        {row.letter}
                      </span>
                      <span className="font-mono text-base font-extrabold tracking-[0.15em] text-teal-800 dark:text-teal-300">
                        {code}
                      </span>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="inline-flex items-center rounded-md border border-amber-200/80 bg-amber-50/90 px-2 py-0.5 font-mono text-xs font-semibold text-amber-900 dark:border-amber-800/60 dark:bg-amber-950/50 dark:text-amber-300">
                        {row.rhythm}
                      </span>
                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                        {row.elements} {row.elements === 1 ? 'element' : 'elements'}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">
                      {row.summary}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: MORSE CODE NUMBERS (0–9 The 5-Element Symmetrical System)
            ========================================================================= */}
        <section id="numbers" aria-label="Morse Code Numbers 0 through 9" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Morse Code Numbers (0–9): The 5-Element Rule
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Unlike the Latin alphabet where character lengths vary from 1 to 4 elements,{' '}
              <strong>every single number in Morse code consists of exactly 5 elements</strong>. Digits follow a strict symmetrical sliding-window progression: numbers 1 through 5 accumulate leading dots (<code className="font-mono text-teal-800 dark:text-teal-300">.----</code> to <code className="font-mono text-teal-800 dark:text-teal-300">.....</code>), while numbers 6 through 0 accumulate leading dashes (<code className="font-mono text-amber-800 dark:text-amber-300">-....</code> to <code className="font-mono text-amber-800 dark:text-amber-300">-----</code>).
            </p>

            <div className="rounded-2xl border border-teal-200/80 bg-teal-50/50 p-6 dark:border-teal-900/40 dark:bg-teal-950/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    Need the Complete Numbers Reference &amp; Audio Drills?
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Explore our standalone guide featuring interactive tone audio playback, full sliding-window breakdowns, and amateur radio &ldquo;cut numbers&rdquo; (5NN, 1NN).
                  </p>
                </div>
                <Link
                  href="/morse-code-numbers"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-800 px-5 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-teal-700 dark:bg-teal-600 dark:text-slate-950 dark:hover:bg-teal-500"
                >
                  <span>Open Numbers Guide</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: MORSE CODE PUNCTUATION & SYMBOLS (18 Official ITU Characters)
            ========================================================================= */}
        <section id="punctuation" aria-label="Morse Code Punctuation and Symbols" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Morse Code Punctuation &amp; Symbols Guide
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              International Morse Code includes official sequences for <strong>18 punctuation symbols</strong> across
              sentence grammar, mathematical notation, and commercial characters:
            </p>

            {/* Desktop Table View (Hidden on mobile) */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <table className="w-full border-collapse text-left text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/95 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
                    <th scope="col" className="px-5 py-3.5">Symbol</th>
                    <th scope="col" className="px-5 py-3.5">Character Name</th>
                    <th scope="col" className="px-5 py-3.5">Morse Code</th>
                    <th scope="col" className="px-5 py-3.5">Spoken Rhythm (dit / dah)</th>
                    <th scope="col" className="px-5 py-3.5">Elements</th>
                    <th scope="col" className="px-5 py-3.5">Category / Usage Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {PUNCTUATION_REFERENCE_ROWS.map((row) => {
                    const code = PUNCTUATION_MAPPINGS[row.symbol];
                    return (
                      <tr key={row.symbol} className="table-row-hover group">
                        <td className="px-5 py-3 font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-teal-200 bg-teal-50/90 font-mono text-sm font-extrabold text-teal-900 shadow-2xs transition-colors group-hover:border-teal-400 group-hover:bg-white dark:border-teal-800/80 dark:bg-teal-950/80 dark:text-teal-300 dark:group-hover:border-teal-400">
                            {row.symbol}
                          </span>
                        </td>
                        <td className="px-5 py-3 font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                          {row.name}
                        </td>
                        <td className="px-5 py-3 font-mono text-base font-extrabold tracking-[0.2em] text-teal-800 dark:text-teal-300">
                          {code}
                        </td>
                        <td className="px-5 py-3">
                          <span className="inline-flex items-center rounded-lg border border-amber-200/80 bg-amber-50/90 px-2.5 py-1 font-mono text-xs font-semibold text-amber-900 dark:border-amber-800/60 dark:bg-amber-950/50 dark:text-amber-300">
                            {row.rhythm}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            {row.elements}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-xs text-slate-600 dark:text-slate-400">
                          {row.note}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Touch-Friendly Card Grid (Visible on mobile, 0 horizontal clipping) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:hidden">
              {PUNCTUATION_REFERENCE_ROWS.map((row) => {
                const code = PUNCTUATION_MAPPINGS[row.symbol];
                return (
                  <div key={row.symbol} className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-teal-200 bg-teal-50 font-mono text-sm font-extrabold text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">
                        {row.symbol}
                      </span>
                      <span className="font-mono text-base font-extrabold tracking-[0.15em] text-teal-800 dark:text-teal-300">
                        {code}
                      </span>
                    </div>
                    <div className="mt-2 text-xs font-bold text-slate-900 dark:text-slate-100">
                      {row.name}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="inline-flex items-center rounded-md border border-amber-200/80 bg-amber-50/90 px-2 py-0.5 font-mono text-xs font-semibold text-amber-900 dark:border-amber-800/60 dark:bg-amber-950/50 dark:text-amber-300">
                        {row.rhythm}
                      </span>
                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                        {row.elements} elements
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">
                      {row.note}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: HOW TO READ & USE THE MORSE CODE CHART (Operational Guidelines)
            ========================================================================= */}
        <section id="how-to-read" aria-label="How to read the Morse code chart" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                How to Read &amp; Use the Morse Code Chart
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Whether you are looking up a single letter or decoding a written Morse string, follow these three practical guidelines:
            </p>

            <div className="grid grid-cols-1 gap-4">
              {/* Guide 1 */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Guide 01.</span>Read by Sound Rhythm (dit / dah)
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    ITU-R Timing
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Morse code is calibrated to the ITU-R M.1677-1 standard: a dot is 1 unit (1T), a dash is exactly 3 units (3T), character spacing is 3 units, and word spacing is 7 units (written as <code className="font-mono font-bold text-teal-700 dark:text-teal-400"> / </code>).
                </p>
              </div>

              {/* Guide 2 */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Guide 02.</span>Character &amp; Reverse Code Lookup
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    Bidirectional Search
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Use the live search bar at the top of the chart in both directions: type any letter or punctuation name to view its code, or type dots (<code className="font-mono font-bold">.</code>) and dashes (<code className="font-mono font-bold">-</code>) directly to filter matching symbols instantly.
                </p>
              </div>

              {/* Guide 3 */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Guide 03.</span>Listen, Copy, Share &amp; Translate
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    Audio &amp; Studio
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Click <strong>Play</strong> next to any row to hear its tone at your chosen WPM speed, click <strong>Share</strong> to send a direct link to any character, or click <strong>Open in Studio</strong> to jump to the Translator with that letter pre-filled.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: PLATFORM LEARNING TOOLS & NEXT STEPS (Bento Grid)
            ========================================================================= */}
        <section id="next-steps" aria-label="Platform Tools and Next Steps" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Continue Your Morse Code Journey: Translate, Learn &amp; Practice
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Move from static character lookup to active sentence conversion, guided beginner lessons, and speed recall drills:
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Card 1: Translator Studio */}
              <Link
                href="/"
                className="studio-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-5.5 backdrop-blur-xs transition-all hover:border-teal-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-teal-400"
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-teal-500 transition-all group-hover:h-1.5" />
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400">
                    Studio
                  </span>
                  <h3 className="mt-1.5 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-300">
                    Morse Code Translator &rarr;
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    Convert full English sentences into Morse code in real time with tone speed (5–30 WPM), pitch controls, and visual light beacon.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 font-mono text-[11px] font-bold text-teal-700 dark:text-teal-300">
                  <span>Open Studio</span>
                  <span>&rarr;</span>
                </div>
              </Link>

              {/* Card 2: 10-Lesson Beginner Course */}
              <Link
                href="/learn-morse-code"
                className="studio-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-5.5 backdrop-blur-xs transition-all hover:border-teal-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-teal-400"
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-amber-500 transition-all group-hover:h-1.5" />
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                    Curriculum
                  </span>
                  <h3 className="mt-1.5 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-300">
                    10-Lesson Course &rarr;
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    Step-by-step telegraphy course from E and T foundations to 5-element numbers, common phrases, and rhythm training.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 font-mono text-[11px] font-bold text-amber-700 dark:text-amber-300">
                  <span>Start Course</span>
                  <span>&rarr;</span>
                </div>
              </Link>

              {/* Card 3: Interactive Practice Drills */}
              <Link
                href="/morse-code-practice"
                className="studio-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-5.5 backdrop-blur-xs transition-all hover:border-teal-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-teal-400"
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-teal-500 transition-all group-hover:h-1.5" />
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400">
                    Drills
                  </span>
                  <h3 className="mt-1.5 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-300">
                    Practice Drills &rarr;
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    Sharpen character recognition and copying speed across flashcards, text-to-morse, and audio drills with streak tracking.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 font-mono text-[11px] font-bold text-teal-700 dark:text-teal-300">
                  <span>Practice Drills</span>
                  <span>&rarr;</span>
                </div>
              </Link>

              {/* Card 4: Knowledge Quizzes */}
              <Link
                href="/morse-code-quiz"
                className="studio-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-5.5 backdrop-blur-xs transition-all hover:border-teal-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-teal-400"
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-rose-500 transition-all group-hover:h-1.5" />
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400">
                    Evaluate
                  </span>
                  <h3 className="mt-1.5 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-300">
                    Knowledge Quizzes &rarr;
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    Evaluate your decoding accuracy across A–Z letters, digits, and punctuation with 10-question standardized tests.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 font-mono text-[11px] font-bold text-rose-700 dark:text-rose-300">
                  <span>Take a Quiz</span>
                  <span>&rarr;</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: FREQUENTLY ASKED QUESTIONS (FAQ with Smooth Accordions)
            ========================================================================= */}
        <section id="faq" aria-label="Reference Frequently Asked Questions" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Frequently Asked Questions About the Morse Code Alphabet
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Clear answers to the most common questions about character counts, memorization order, number patterns, and audio previews:
            </p>

            <div className="space-y-3">
              {REFERENCE_FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-slate-200 bg-white p-4 transition-all open:border-teal-500/50 open:shadow-xs sm:p-5 dark:border-slate-800 dark:bg-slate-900 dark:open:border-teal-400/40"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-left text-sm font-bold text-slate-900 select-none sm:text-base dark:text-slate-100">
                    <span className="pr-4">{faq.question}</span>
                    <span className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-transform duration-200 group-open:rotate-180 group-open:bg-teal-50 group-open:text-teal-700 dark:bg-slate-800 dark:text-slate-400 dark:group-open:bg-teal-950 dark:group-open:text-teal-300">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3.5 border-t border-slate-100 pt-3.5 text-xs leading-relaxed text-slate-600 sm:text-sm dark:border-slate-800 dark:text-slate-400">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: FINAL CALL TO ACTION (Tactile Action Triggers)
            ========================================================================= */}
        <section aria-label="Put Your Morse Knowledge Into Action" className="scroll-mt-20 rounded-3xl border border-teal-200/80 bg-gradient-to-br from-teal-50/90 via-white to-teal-50/40 p-8 text-center shadow-lg shadow-teal-900/5 sm:p-12 dark:border-teal-900/60 dark:from-slate-900 dark:via-[#0B1220] dark:to-teal-950/30">
          <div className="mx-auto max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              Put Knowledge Into Practice
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              Ready to Put Your Morse Knowledge Into Action?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              Now that you have the complete 54-character reference at your fingertips, start converting sentences, practicing recognition drills, or taking graded evaluations.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-teal-800 sm:text-sm dark:bg-teal-400 dark:text-slate-950 dark:hover:bg-teal-300"
              >
                Translate Sentences in Studio
              </Link>
              <Link
                href="/learn-morse-code"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Start 10-Lesson Course
              </Link>
              <Link
                href="/morse-code-practice"
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
