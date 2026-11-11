import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { LearningHubClient } from '@/components/learning/LearningHubClient';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';
import { LESSONS } from '@/lib/learning/lessons';

export const metadata: Metadata = {
  title: 'Learn Morse Code: 10-Lesson Course',
  description:
    'Learn International Morse Code with our free, interactive 10-lesson course. Master dots, dashes, alphabet letters, numbers, timing, and audio rhythm step by step.',
  alternates: {
    canonical: '/learn',
  },
  openGraph: {
    title: 'Learn Morse Code: 10-Lesson Course',
    description:
      'A free 10-lesson interactive curriculum teaching Morse code fundamentals, timing rules, alphabet letters, numbers, punctuation, and auditory rhythm.',
    url: getAbsoluteUrl('/learn'),
    siteName: 'Morse Code Platform',
    type: 'website',
  },
};

interface FAQItem {
  question: string;
  answer: string;
}

const LEARN_FAQS: readonly FAQItem[] = [
  {
    question: 'How long does it take to learn Morse code?',
    answer:
      'Most beginners can understand the core rules and complete all 10 lessons in approximately 40 minutes of focused study. Achieving conversational auditory copying speed (10 to 15 Words Per Minute) typically requires 15 to 20 minutes of daily micro-practice over three to four weeks using interactive drills.',
  },
  {
    question: 'What is the best way to memorize Morse code without getting confused?',
    answer:
      'The most effective method is learning characters by their sound rhythm (dits and dahs) rather than counting visual dots and dashes on paper. Pairing symmetrical opposites (such as A [.-] and N [-.] or D [-..] and U [..-]) and mastering the single-element foundations (E and T) creates durable mental connections that transfer directly to audio listening.',
  },
  {
    question: 'Should I learn Morse code visually with a chart or by listening to audio?',
    answer:
      'You should prioritize auditory learning from day one. While visual charts are helpful for quick lookups, counting dots and dashes visually creates a mental translation bottleneck that collapses at speeds above 5 WPM. Listening to the musical rhythm of each letter trains your brain to recognize whole sound patterns automatically.',
  },
  {
    question: 'Why do all Morse code numbers have five elements?',
    answer:
      'Every digit from 0 to 9 in International Morse Code is standardized to exactly five elements to prevent confusion with 1-to-4-element alphabet letters. Digits follow a symmetrical progression: numbers 1 through 5 add leading dots (.---- to .....), while numbers 6 through 9 and 0 add leading dashes (-.... to -----).',
  },
  {
    question: 'How does this course track my learning progress without an account?',
    answer:
      'Your completed lessons and quiz scores are stored entirely in your web browser memory using localStorage. No login, password, or email is ever required, and your learning data is never transmitted to an external server or third-party tracking system.',
  },
  {
    question: 'What should I do after completing the 10 beginner lessons?',
    answer:
      'After finishing the 10 lessons, move to our Interactive Practice Drills to build instant reflex speed with flashcards and audio tone recognition. You can also evaluate your retention with our 10-question Quizzes or experiment with full sentences in the Morse Code Translator.',
  },
];

interface DigitProgressionRow {
  digit: string;
  morse: string;
  rhythm: string;
  rule: string;
}

const DIGIT_PROGRESSION_ROWS: readonly DigitProgressionRow[] = [
  { digit: '1', morse: '.----', rhythm: 'di-DAH-DAH-DAH-DAH', rule: '1 dot + 4 dashes' },
  { digit: '2', morse: '..---', rhythm: 'di-di-DAH-DAH-DAH', rule: '2 dots + 3 dashes' },
  { digit: '3', morse: '...--', rhythm: 'di-di-di-DAH-DAH', rule: '3 dots + 2 dashes' },
  { digit: '4', morse: '....-', rhythm: 'di-di-di-di-DAH', rule: '4 dots + 1 dash' },
  { digit: '5', morse: '.....', rhythm: 'di-di-di-di-dit', rule: '5 dots (0 dashes)' },
  { digit: '6', morse: '-....', rhythm: 'DAH-di-di-di-dit', rule: '1 dash + 4 dots (Mirror of 1)' },
  { digit: '7', morse: '--...', rhythm: 'DAH-DAH-di-di-dit', rule: '2 dashes + 3 dots (Mirror of 2)' },
  { digit: '8', morse: '---..', rhythm: 'DAH-DAH-DAH-di-dit', rule: '3 dashes + 2 dots (Mirror of 3)' },
  { digit: '9', morse: '----.', rhythm: 'DAH-DAH-DAH-DAH-dit', rule: '4 dashes + 1 dot (Mirror of 4)' },
  { digit: '0', morse: '-----', rhythm: 'DAH-DAH-DAH-DAH-DAH', rule: '5 dashes (0 dots — Mirror of 5)' },
];

const learnHubSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'International Morse Code Beginner Course',
    description:
      'A structured 10-lesson interactive curriculum teaching Morse code fundamentals, timing rules, alphabet letters, numbers, punctuation, and listening skills.',
    provider: {
      '@type': 'Organization',
      name: 'Morse Code Platform',
      sameAs: getAbsoluteUrl('/'),
    },
    educationalLevel: 'Beginner',
    isAccessibleForFree: true,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'PT40M',
    },
    itemListElement: LESSONS.map((lesson) => ({
      '@type': 'ListItem',
      position: lesson.order,
      name: lesson.title,
      url: getAbsoluteUrl(`/learn/${lesson.slug}`),
    })),
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
        name: 'Learn',
        item: getAbsoluteUrl('/learn'),
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: LEARN_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  },
];

export default function LearnHubPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={learnHubSchemas} />
      <Header />

      {/* Atmospheric Background Glow & Engineering Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px] overflow-hidden"
      >
        <div className="bg-grid mask-fade absolute inset-0 opacity-60" />
        <div className="absolute -top-28 left-1/2 h-[450px] w-[60rem] -translate-x-1/2 rounded-full bg-teal-500/12 blur-3xl dark:bg-teal-400/10" />
        <div className="absolute top-28 left-1/4 h-60 w-60 rounded-full bg-amber-400/10 blur-3xl dark:bg-amber-400/8" />
      </div>

      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* =========================================================================
            HERO SECTION: Compact Title, Breadcrumb & Telemetry Pill
            ========================================================================= */}
        <section className="mb-8 text-center sm:mb-10">
          {/* Centered Breadcrumb Navigation Pill */}
          <div className="flex justify-center">
            <nav aria-label="Breadcrumb">
              <ol className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-4 py-1 text-xs text-slate-500 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
                <li>
                  <Link href="/" className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-slate-300 dark:text-slate-600">/</li>
                <li className="font-semibold text-slate-900 dark:text-slate-100" aria-current="page">
                  Learn Morse Code
                </li>
              </ol>
            </nav>
          </div>

          {/* Centered Telemetry & Standards Badge */}
          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-teal-50/70 px-3.5 py-1 text-xs font-semibold text-teal-800 shadow-2xs backdrop-blur-xs dark:border-teal-800/60 dark:bg-teal-950/40 dark:text-teal-300">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
              Recommendation ITU-R M.1677-1 Standard &bull; 10 Interactive Lessons &bull; Browser-Local Storage
            </div>
          </div>

          {/* Primary H1 Heading */}
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-slate-100">
            Learn International Morse Code:{' '}
            <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent dark:from-teal-300 dark:via-teal-400 dark:to-emerald-400">
              Step-by-Step Curriculum
            </span>
          </h1>

          {/* Lead Descriptive Paragraph */}
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Welcome to our free, comprehensive guide to learning Morse code. Our structured curriculum breaks telegraphy down into 10 interactive lessons covering single-element foundations, binary branching trees, symmetrical numbers, and real-time sentence decoding.
          </p>

          {/* Quick Value Pillars */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 text-left">
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-100 font-bold text-xs dark:bg-teal-950">1</span>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Zero Experience Needed</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Start from core dot/dash proportions and build rhythm step-by-step.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-100 font-bold text-xs dark:bg-teal-950">2</span>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Interactive CW Audio</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Train auditory reflexes with calibrated dits and dahs at standard speeds.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-100 font-bold text-xs dark:bg-teal-950">3</span>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Browser-Local Storage</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Your progress is saved locally on your device with zero tracking or account needed.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 1: 10-LESSON CURRICULUM WORKBENCH
            ========================================================================= */}
        <div className="mb-10 sm:mb-14">
          <LearningHubClient />
        </div>

        {/* =========================================================================
            SECTION 2: 4 PROVEN RULES FOR LEARNING MORSE CODE (Card Grid)
            ========================================================================= */}
        <section id="methodology" aria-label="Learning Methodology and Cognitive Rules" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                4 Proven Rules for Learning Morse Code Effectively
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Traditional methods of memorizing Morse code from printed charts often cause frustration because they teach the code visually. Experienced telegraphers rely on sound rhythms and cognitive patterns:
            </p>

            <div className="grid gap-4 grid-cols-1">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Rule 1.</span>Learn by Sound, Not Sight (Dits &amp; Dahs)
                </strong>
                Never count visual dots and dashes on paper. At real speeds (10–20 WPM), characters arrive in fractions of a second. Think of <strong>A</strong> as the musical rhythm <code className="font-mono font-bold text-teal-800 dark:text-teal-300">di-DAH</code>, <strong>B</strong> as <code className="font-mono font-bold text-teal-800 dark:text-teal-300">DAH-di-di-dit</code>, and <strong>S</strong> as <code className="font-mono font-bold text-teal-800 dark:text-teal-300">di-di-dit</code>.
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Rule 2.</span>Master Binary Opposites &amp; Symmetries
                </strong>
                Learn characters in auditory mirror pairs rather than A to Z. Your brain naturally retains symmetrical contrasts: <strong>A</strong> (.-) &harr; <strong>N</strong> (-.), <strong>D</strong> (-..) &harr; <strong>U</strong> (..-), <strong>B</strong> (-...) &harr; <strong>V</strong> (...-), and <strong>K</strong> (-.-) &harr; <strong>R</strong> (.-.).
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Rule 3.</span>Respect the PARIS Timing Standard
                </strong>
                International Morse Code follows strict mathematical ratios (Recommendation ITU-R M.1677-1): a dash is exactly 3 times a dot (3T), intra-character spaces are 1T, inter-letter spaces are 3T, and word spaces are 7T (represented by <code className="font-mono font-bold"> / </code>).
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Rule 4.</span>Daily Micro-Practice Over Cramming
                </strong>
                Telegraphy is a motor-sensory reflex similar to learning an instrument. Spending 15 to 20 minutes daily builds subconscious neural reflexes far faster than one marathon session per week.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: BINARY TREE & FOUNDATIONS (Matching Image Structure)
            ========================================================================= */}
        <section id="foundations" aria-label="Foundational Patterns and Binary Progression" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                The E &amp; T Binary Progression: Build Words in Minutes
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Samuel Morse and Alfred Vail assigned the shortest codes to the most frequent letters: <strong>E</strong> (<code className="font-mono font-bold">.</code>) and <strong>T</strong> (<code className="font-mono font-bold">-</code>). From these two root nodes, every other character branches symmetrically:
            </p>

            {/* ASCII Binary Tree Visual */}
            <div className="mb-6 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/40">
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-2 text-xs font-mono text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <span>Branching Auditory Tree</span>
                <span>1 &rarr; 2 &rarr; 3 Elements</span>
              </div>
              <pre className="mt-3 overflow-x-auto text-center font-mono text-xs sm:text-sm leading-relaxed text-teal-800 dark:text-teal-300">
{`                  [ROOT]
                 /      \\
            (.) E        (-) T
           /     \\      /     \\
       (..) I   (.-) A (.-) N (--) M
       /    \\
   (...) S (..-) U`}
              </pre>
            </div>

            {/* 3 Level Cards - 1 Box per Line */}
            <div className="grid gap-4 grid-cols-1">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Level 1.</span>1-Element Roots: E and T
                </strong>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  <strong>E</strong> (<code className="font-mono font-bold text-teal-700 dark:text-teal-300">.</code> / dit) and <strong>T</strong> (<code className="font-mono font-bold text-teal-700 dark:text-teal-300">-</code> / DAH). The fundamental bedrock of International Morse Code.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Level 2.</span>2-Element Branches: I, M, A, and N
                </strong>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  <strong>I</strong> (<code className="font-mono font-bold">..</code>), <strong>M</strong> (<code className="font-mono font-bold">--</code>), <strong>A</strong> (<code className="font-mono font-bold">.-</code>), and <strong>N</strong> (<code className="font-mono font-bold">-.</code>). Symmetrical pairs that branch directly from root nodes.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="mb-1 block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Level 3.</span>3-Element Leaves: S, O, D, and U
                </strong>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  <strong>S</strong> (<code className="font-mono font-bold">...</code>), <strong>O</strong> (<code className="font-mono font-bold">---</code>), <strong>D</strong> (<code className="font-mono font-bold">-..</code>), and <strong>U</strong> (<code className="font-mono font-bold">..-</code>). Mirror rhythms forming the basis of everyday phrases and the SOS distress prosign.
                </p>
              </div>
            </div>

            {/* Real Words Callout */}
            <div className="mt-5 rounded-xl border border-teal-200 bg-teal-50/70 p-4 dark:border-teal-900/60 dark:bg-teal-950/40">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-900 dark:text-teal-200">
                Form Words Instantly With Just 8 Letters:
              </span>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5 text-center font-mono text-xs">
                <div className="rounded-lg border border-teal-200 bg-white p-2 dark:border-teal-900 dark:bg-slate-900">
                  <span className="font-bold text-slate-900 dark:text-slate-100">SEE</span>
                  <div className="text-teal-700 dark:text-teal-300">... . .</div>
                </div>
                <div className="rounded-lg border border-teal-200 bg-white p-2 dark:border-teal-900 dark:bg-slate-900">
                  <span className="font-bold text-slate-900 dark:text-slate-100">TEA</span>
                  <div className="text-teal-700 dark:text-teal-300">- . .-</div>
                </div>
                <div className="rounded-lg border border-teal-200 bg-white p-2 dark:border-teal-900 dark:bg-slate-900">
                  <span className="font-bold text-slate-900 dark:text-slate-100">TIE</span>
                  <div className="text-teal-700 dark:text-teal-300">- .. .</div>
                </div>
                <div className="rounded-lg border border-teal-200 bg-white p-2 dark:border-teal-900 dark:bg-slate-900">
                  <span className="font-bold text-slate-900 dark:text-slate-100">MEAT</span>
                  <div className="text-teal-700 dark:text-teal-300">-- . .- -</div>
                </div>
                <div className="col-span-2 sm:col-span-1 rounded-lg border border-teal-200 bg-white p-2 dark:border-teal-900 dark:bg-slate-900">
                  <span className="font-bold text-slate-900 dark:text-slate-100">SOME</span>
                  <div className="text-teal-700 dark:text-teal-300">... --- -- .</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: NUMBERS & PUNCTUATION RULES (Matching Image Structure)
            ========================================================================= */}
        <section id="numbers-punctuation" aria-label="Numbers and Punctuation Conventions" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Symmetrical Numbers &amp; Essential Punctuation Rules
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Every digit from 0 to 9 in International Morse Code contains exactly five elements, building up symmetrically with leading dots (1–5) and leading dashes (6–0):
            </p>

            {/* Mobile-Responsive Digits Display */}
            <div className="mb-6 overflow-x-auto rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/40">
              <table className="w-full text-left text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <thead className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-100">
                  <tr>
                    <th className="py-2.5 pr-4">Digit</th>
                    <th className="py-2.5 pr-4">Morse Code</th>
                    <th className="py-2.5 pr-6">Rhythm</th>
                    <th className="py-2.5">Pattern Rule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono dark:divide-slate-800/80">
                  {DIGIT_PROGRESSION_ROWS.map((row) => (
                    <tr key={row.digit} className="table-row-hover">
                      <td className="py-2.5 pr-4 font-bold text-slate-900 dark:text-slate-100">{row.digit}</td>
                      <td className="py-2.5 pr-4 font-bold tracking-widest text-teal-800 dark:text-teal-300">{row.morse}</td>
                      <td className="py-2.5 pr-6 font-sans text-xs text-slate-600 dark:text-slate-400">{row.rhythm}</td>
                      <td className="py-2.5 font-sans text-xs text-slate-500 dark:text-slate-400">{row.rule}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Punctuation 4 Cards */}
            <div className="grid gap-4 grid-cols-1">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">01.</span>Period / Full Stop (.)
                  </strong>
                  <code className="rounded bg-teal-100 px-2.5 py-0.5 font-mono text-xs font-bold text-teal-900 dark:bg-teal-950 dark:text-teal-300">.-.-.-</code>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  di-DAH-di-DAH-di-DAH (Three repeating A pairs: A-A-A).
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">02.</span>Comma (,)
                  </strong>
                  <code className="rounded bg-teal-100 px-2.5 py-0.5 font-mono text-xs font-bold text-teal-900 dark:bg-teal-950 dark:text-teal-300">--..--</code>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  DAH-DAH-di-di-DAH-DAH (Two dashes, two dots, two dashes).
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">03.</span>Question Mark (?)
                  </strong>
                  <code className="rounded bg-teal-100 px-2.5 py-0.5 font-mono text-xs font-bold text-teal-900 dark:bg-teal-950 dark:text-teal-300">..--..</code>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  di-di-DAH-DAH-di-dit (The exact symmetrical inverse of comma).
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">04.</span>Email At-Sign (@)
                  </strong>
                  <code className="rounded bg-teal-100 px-2.5 py-0.5 font-mono text-xs font-bold text-teal-900 dark:bg-teal-950 dark:text-teal-300">.--.-.</code>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  di-DAH-DAH-di-DAH-dit (Standardized by ITU in 2004 for email addresses).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: PLATFORM LEARNING TOOLS & ECOSYSTEM (Card Grid)
            ========================================================================= */}
        <section id="next-steps" aria-label="Platform Learning Tools and Ecosystem" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Put Your Knowledge Into Practice Across Our Platform
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Learning the rules of Morse code is only the first step. True proficiency comes from active translation, auditory copying, and speed recall. Explore our free suite:
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/"
                className="group flex flex-col justify-between rounded-xl border border-slate-200/80 bg-slate-50 p-5 transition-all hover:border-teal-400 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-teal-500 dark:hover:bg-slate-800"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-teal-800 dark:text-teal-300">TRANSLATOR</span>
                    <span className="text-xs font-bold text-teal-700 group-hover:translate-x-0.5 transition-transform dark:text-teal-400">&rarr;</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">Morse Translator</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">Convert full sentences between English and Morse in real time with audio and optical beacon.</p>
                </div>
                <div className="mt-4 border-t border-slate-200/60 pt-2 text-xs font-semibold text-teal-700 dark:text-teal-400">Open Studio &rarr;</div>
              </Link>

              <Link
                href="/reference"
                className="group flex flex-col justify-between rounded-xl border border-slate-200/80 bg-slate-50 p-5 transition-all hover:border-teal-400 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-teal-500 dark:hover:bg-slate-800"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-teal-800 dark:text-teal-300">CHART</span>
                    <span className="text-xs font-bold text-teal-700 group-hover:translate-x-0.5 transition-transform dark:text-teal-400">&rarr;</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">Alphabet Chart</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">Inspect all 54 standard characters (A–Z, 0–9, 18 punctuation marks) with one-click audio.</p>
                </div>
                <div className="mt-4 border-t border-slate-200/60 pt-2 text-xs font-semibold text-teal-700 dark:text-teal-400">View Chart &rarr;</div>
              </Link>

              <Link
                href="/practice"
                className="group flex flex-col justify-between rounded-xl border border-slate-200/80 bg-slate-50 p-5 transition-all hover:border-teal-400 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-teal-500 dark:hover:bg-slate-800"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-teal-800 dark:text-teal-300">DRILLS</span>
                    <span className="text-xs font-bold text-teal-700 group-hover:translate-x-0.5 transition-transform dark:text-teal-400">&rarr;</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">Practice Drills</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">Build recognition reflexes across flashcard decks, character recall, and weak character focus.</p>
                </div>
                <div className="mt-4 border-t border-slate-200/60 pt-2 text-xs font-semibold text-teal-700 dark:text-teal-400">Start Drills &rarr;</div>
              </Link>

              <Link
                href="/quiz"
                className="group flex flex-col justify-between rounded-xl border border-slate-200/80 bg-slate-50 p-5 transition-all hover:border-teal-400 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-teal-500 dark:hover:bg-slate-800"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-teal-800 dark:text-teal-300">EVALUATE</span>
                    <span className="text-xs font-bold text-teal-700 group-hover:translate-x-0.5 transition-transform dark:text-teal-400">&rarr;</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">Knowledge Quiz</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">Evaluate decoding mastery with 10-question multiple-choice quizzes saved locally in your browser.</p>
                </div>
                <div className="mt-4 border-t border-slate-200/60 pt-2 text-xs font-semibold text-teal-700 dark:text-teal-400">Take Quiz &rarr;</div>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: FREQUENTLY ASKED QUESTIONS (Animated Chevron Accordions)
            ========================================================================= */}
        <section id="faq" aria-label="Frequently Asked Questions About Learning Morse Code" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Frequently Asked Questions About Learning Morse Code
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Clear, practical answers about learning timelines, memory strategies, visual versus auditory techniques, and browser storage:
            </p>

            <div className="space-y-4">
              {LEARN_FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="accordion-card group rounded-xl border border-slate-200/80 bg-slate-50 p-5 shadow-2xs transition-all dark:border-slate-800 dark:bg-slate-800/60"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900 dark:text-slate-100">
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <span className="chevron-icon flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-400 transition-transform group-open:rotate-180 dark:border-slate-700 dark:text-slate-400">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="mt-3.5 border-t border-slate-200/70 pt-3 text-xs leading-relaxed text-slate-600 sm:text-sm dark:border-slate-700/70 dark:text-slate-400">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: FINAL CALL TO ACTION (Tactile Action Triggers)
            ========================================================================= */}
        <section id="cta" aria-label="Begin Training Call to Action" className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-teal-200/90 bg-gradient-to-br from-teal-50/80 via-white to-amber-50/40 p-6 sm:p-10 md:p-12 text-center dark:border-teal-900/60 dark:from-teal-950/40 dark:via-slate-900 dark:to-slate-900">
          <div aria-hidden="true" className="bg-grid mask-fade pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-300/80 bg-white px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 shadow-2xs dark:border-teal-800 dark:bg-slate-900 dark:text-teal-300">
              CW Telegraphy &bull; Begin Training
            </span>
            <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl dark:text-slate-100">
              Ready to Master Morse Code? Start Lesson 1 Today
            </h2>
            <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
              Complete our 10 structured lessons, build auditory recognition speed, and unlock a universal, battery-independent method of telecommunication.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/learn/what-is-morse-code"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-800 sm:text-sm dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400"
              >
                Start Lesson 1: Foundations &rarr;
              </Link>
              <Link
                href="/reference"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Inspect Alphabet Chart &rarr;
              </Link>
              <Link
                href="/practice"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Try Practice Drills &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
