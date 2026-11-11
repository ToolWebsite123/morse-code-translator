import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { PracticeClient } from '@/components/learning/PracticeClient';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';

export const metadata: Metadata = {
  title: 'Morse Code Practice & Speed Trainer',
  description:
    'Practice Morse code with free interactive speed drills. Train letter recall, listen to audio tones, type dots & dashes, and target your weak characters.',
  alternates: {
    canonical: '/practice',
  },
  openGraph: {
    title: 'Morse Code Practice & Speed Trainer',
    description:
      'Practice Morse code with free interactive speed drills. Train letter recall, listen to audio tones, type dots & dashes, and target your weak characters.',
    url: getAbsoluteUrl('/practice'),
    siteName: 'Morse Code Platform',
    type: 'website',
  },
};

interface FAQItem {
  question: string;
  answer: string;
}

const PRACTICE_FAQS: readonly FAQItem[] = [
  {
    question: 'How often should I practice Morse code to improve my speed?',
    answer:
      "If you're building a practice routine, you can start with a short 15–20 minute session and adjust the duration to your comfort and schedule. Regular exposure helps reinforce character sound patterns in memory over time.",
  },
  {
    question: 'Which practice mode is best for a complete beginner?',
    answer:
      'Beginners usually make the steadiest progress starting in Morse to Text mode with the category filtered to Letters. This mode allows you to see the dot and dash pattern, click the tone preview button to hear its rhythm, and type the matching English letter. Once you achieve consistent recognition on individual letters, transition to Text to Morse to test recall from memory, and then to Audio to Text for ear training.',
  },
  {
    question: 'How does the Weak Focus filter identify difficult characters?',
    answer:
      'The platform records each practice attempt locally in your web browser. When you attempt a character more than once and your cumulative accuracy falls below 70%, the system flags it as a weak character. Selecting the Weak Focus filter creates a targeted drill queue featuring your qualified weak characters (up to 12 items) so you can focus repetition where it is needed most.',
  },
  {
    question: 'Can I practice Morse code on my phone without typing issues?',
    answer:
      'Yes. When practicing Text to Morse on mobile devices, the interface displays dedicated on-screen touch buttons for Dot (•), Dash (—), and Space. These buttons utilize a minimum 44px touch target utility to ensure accessible, comfortable tapping without switching mobile keyboard layouts.',
  },
  {
    question: 'Does the practice tool save my drill scores if I close the browser?',
    answer:
      'Practice statistics are saved locally in your browser using localStorage with zero account registration required. However, clearing your browser data, using incognito or private browsing mode, or switching to another device will reset these records. Additionally, the active session scoreboard resets whenever you switch categories, change practice directions, or start a new round.',
  },
  {
    question: 'What is the difference between Practice mode and Quiz mode?',
    answer:
      'Practice mode is an untimed, repeatable training environment with instant answer evaluation, explanations, audio tone previews, and adaptive weak-character filtering. Quiz mode (/quiz) is a standardized 10-question evaluation designed to test your retention under assessment conditions, providing a final percentage score and saving your historical test records.',
  },
];

interface PracticeCategoryRow {
  name: string;
  count: string;
  scope: string;
  recommendedUse: string;
}

const CATEGORY_ROWS: readonly PracticeCategoryRow[] = [
  {
    name: 'All',
    count: '54 Characters',
    scope: 'Complete International Morse Code catalog (26 letters, 10 digits, 18 punctuation marks).',
    recommendedUse: 'Comprehensive mixed practice across the entire character set.',
  },
  {
    name: 'Letters',
    count: '26 Characters',
    scope: 'Latin alphabet letters A through Z (1 to 4 elements per character).',
    recommendedUse: 'Primary foundation for beginners building core alphabet recognition.',
  },
  {
    name: 'Numbers',
    count: '10 Characters',
    scope: 'Digits 0 through 9 (all standardized 5-element rhythmic sequences).',
    recommendedUse: 'Focused drills for callsigns, timestamps, and numerical data.',
  },
  {
    name: 'Punctuation',
    count: '18 Characters',
    scope: 'Standard symbols (Period, Comma, Question Mark, Slash, Equals, etc.).',
    recommendedUse: 'Advanced drills for message formatting and official communication.',
  },
  {
    name: 'Weak Focus',
    count: 'Dynamic (up to 12)',
    scope: 'Symbols where your browser record shows attempts > 1 and accuracy < 70%.',
    recommendedUse: 'Targeted review of characters where errors occur most often.',
  },
];

const practiceSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Interactive Morse Code Practice & Speed Trainer',
    url: getAbsoluteUrl('/practice'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5 Web Audio API.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Morse to Text visual and audio recognition drills',
      'Text to Morse encoding drills with on-screen dot and dash touch buttons',
      'Audio to Text listening practice with calibrated 15 WPM acoustic tones',
      'Category filters for letters, numbers, and punctuation',
      'Accuracy-based weak character focus based on local error history',
      'Client-side processing with local storage persistence',
    ],
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
        name: 'Practice',
        item: getAbsoluteUrl('/practice'),
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PRACTICE_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  },
];

export default function PracticePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={practiceSchemas} />
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

      <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-4 pt-2 pb-12 sm:px-6 sm:pt-3 sm:pb-16 lg:px-8">
        {/* =========================================================================
            HERO SECTION: Compact, Impactful, Above The Fold (Home Page Design)
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
              54 Characters
            </span>
            <span className="hidden text-teal-300 sm:inline dark:text-teal-700">&bull;</span>
            <span className="hidden text-teal-700 sm:inline dark:text-teal-300 font-medium">Browser-Local Storage</span>
          </div>

          {/* Primary H1 Heading */}
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-[44px] sm:leading-tight dark:text-white">
            Interactive{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-300 dark:via-emerald-300 dark:to-teal-200">
              Morse Code Practice
            </span>{' '}
            &amp; Speed Trainer
          </h1>

          {/* Descriptive Subtitle */}
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Practice International Morse Code online with interactive flashcard drills. Train character recall, listen to calibrated 15 WPM audio tones, and master weak characters with automatic client-side error tracking.
          </p>
        </section>

        {/* =========================================================================
            SECTION 1: INTERACTIVE DRILL STATION WORKBENCH
            ========================================================================= */}
        <section id="drill-station" aria-label="Interactive Morse Code Practice Drills" className="mb-10 sm:mb-14 scroll-mt-20">
          <PracticeClient />

          {/* 3 Core Value Pillars Directly Below the Workbench */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="studio-card relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-4 text-center backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/95">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-teal-500" />
              <span className="font-mono text-xs font-bold text-teal-800 dark:text-teal-400">
                Instant Answer Evaluation
              </span>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Receive immediate feedback and canonical character explanations after every drill attempt.
              </p>
            </div>
            <div className="studio-card relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-4 text-center backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/95">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-emerald-500" />
              <span className="font-mono text-xs font-bold text-emerald-800 dark:text-emerald-400">
                Calibrated Audio Playback
              </span>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Listen to 15 WPM / 600 Hz acoustic tones to train your auditory memory.
              </p>
            </div>
            <div className="studio-card relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-4 text-center backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/95">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-amber-500" />
              <span className="font-mono text-xs font-bold text-amber-800 dark:text-amber-400">
                Accuracy-Based Error Focus
              </span>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Automatically targets characters where your historical accuracy is below 70%, helping you focus on difficult symbols.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: THREE WAYS TO PRACTICE MORSE CODE (Card Grid)
            ========================================================================= */}
        <section id="modes" aria-label="Three Ways to Practice Morse Code" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Three Ways to Practice Morse Code
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Developing Morse code proficiency involves training both receptive recognition (reading and listening) and expressive encoding (transmitting). Our <strong>morse code trainer</strong> provides three distinct operational directions, each targeting a specific skill:
            </p>

            <div className="grid grid-cols-1 gap-4">
              {/* Mode 1: Morse to Text */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">01.</span>Visual &amp; Auditory Recognition
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    Morse &rarr; Text
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Decode visual dot-dash sequences into English characters. Click &ldquo;Play Tone&rdquo; to hear the 15 WPM acoustic rhythm and reinforce Latin symbol associations.
                </p>
              </div>

              {/* Mode 2: Text to Morse */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">02.</span>Active Recall &amp; Signal Encoding
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    Text &rarr; Morse
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Convert letters and digits into dots and dashes from memory using keyboard inputs (<code className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-xs font-semibold dark:bg-slate-800">.</code> and <code className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-xs font-semibold dark:bg-slate-800">-</code>) or mobile touch buttons.
                </p>
              </div>

              {/* Mode 3: Audio to Text */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">03.</span>Ear Training &amp; Acoustic Copying
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    Audio &rarr; Text
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Train real-world telegraphy by sound alone with visual signals concealed. Click &ldquo;Play Tone&rdquo; to hear the 15 WPM / 600 Hz sequence, then identify the character.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: TARGETED PRACTICE & ACCURACY-BASED WEAK FOCUS
            ========================================================================= */}
        <section id="weak-focus" aria-label="Reviewing Frequently Confused Characters & Accuracy-Based Weak Focus" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Reviewing Frequently Confused Characters &amp; Accuracy-Based Weak Focus
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              When learning Morse code, students frequently master simple characters like <strong>E</strong> (<code className="font-mono font-semibold">.</code>) and <strong>T</strong> (<code className="font-mono font-semibold">-</code>), but experience recurring difficulties with mirror-image pairs or longer punctuation symbols. Our <strong>morse practice</strong> workbench includes an automated client-side error tracking engine designed to identify and isolate these difficult characters:
            </p>

            <div className="grid grid-cols-1 gap-6">
              {/* Box 1: How Weak Focus Works */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 sm:p-6 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3.5 dark:border-slate-700/80">
                  <h3 className="text-base font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    How Accuracy-Based Weak Focus Works
                  </h3>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    &lt; 70% Threshold
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Whenever you submit an answer in any practice direction, the platform evaluates your response and updates your character record in browser <code className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-xs font-bold text-teal-800 dark:border-slate-700 dark:bg-slate-900 dark:text-teal-300">localStorage</code> (<code className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-xs font-bold text-teal-800 dark:border-slate-700 dark:bg-slate-900 dark:text-teal-300">morse_learning_progress_v1</code>).
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200/80 bg-white/80 p-3.5 dark:border-slate-700/80 dark:bg-slate-900/60">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-teal-800 font-mono text-xs font-bold text-white dark:bg-teal-400 dark:text-slate-950">1</span>
                      <strong className="font-bold text-slate-900 dark:text-slate-100">Rule 1: Min Exposure</strong>
                    </div>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      Must be attempted at least twice (<code className="rounded bg-slate-200/80 px-1 py-0.5 font-mono text-xs font-semibold dark:bg-slate-800">attempts &gt; 1</code>) to prevent accidental typos from flagging it.
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200/80 bg-white/80 p-3.5 dark:border-slate-700/80 dark:bg-slate-900/60">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-teal-800 font-mono text-xs font-bold text-white dark:bg-teal-400 dark:text-slate-950">2</span>
                      <strong className="font-bold text-slate-900 dark:text-slate-100">Rule 2: Accuracy Limit</strong>
                    </div>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      Cumulative accuracy must be strictly below 70% (<code className="rounded bg-slate-200/80 px-1 py-0.5 font-mono text-xs font-semibold dark:bg-slate-800">correct / attempts &lt; 0.70</code>).
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 border-t border-slate-200/80 pt-3.5 text-sm leading-relaxed text-slate-600 dark:border-slate-700/80 dark:text-slate-300">
                  <p className="font-bold text-slate-900 dark:text-slate-100">
                    When you select the Weak Focus category pill:
                  </p>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <li className="rounded-lg border border-slate-200/60 bg-white/60 p-2.5 text-xs sm:text-sm dark:border-slate-700/60 dark:bg-slate-900/40">
                      <strong className="text-slate-900 dark:text-slate-100">Targeted Repetition:</strong> Selects up to 12 qualified weak characters.
                    </li>
                    <li className="rounded-lg border border-slate-200/60 bg-white/60 p-2.5 text-xs sm:text-sm dark:border-slate-700/60 dark:bg-slate-900/40">
                      <strong className="text-slate-900 dark:text-slate-100">Exact Queue:</strong> If under 12 symbols qualify, practice exactly those.
                    </li>
                    <li className="rounded-lg border border-slate-200/60 bg-white/60 p-2.5 text-xs sm:text-sm dark:border-slate-700/60 dark:bg-slate-900/40">
                      <strong className="text-slate-900 dark:text-slate-100">Quick Reset:</strong> Reset back to All symbols in one click anytime.
                    </li>
                  </ul>
                </div>

                <div className="mt-4 rounded-lg border border-teal-200/90 bg-teal-50/70 p-3 text-xs sm:text-sm leading-relaxed text-teal-950 dark:border-teal-800/60 dark:bg-teal-950/40 dark:text-teal-200">
                  <strong>Browser-Local Storage:</strong> Practice records remain saved locally on your device. No personal data is transmitted to an external server.
                </div>
              </div>

              {/* Box 2: Frequently Confused Characters */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 sm:p-6 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="border-b border-slate-200/80 pb-3.5 dark:border-slate-700/80">
                  <h3 className="text-base font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    Frequently Confused Characters &amp; Symmetrical Pairs
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                    Certain characters cause higher error rates among students. Targeted drills help address these common patterns:
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Pair 1: Symmetrical Inverses */}
                  <div className="rounded-lg border border-slate-200/80 bg-white/80 p-4 dark:border-slate-700/80 dark:bg-slate-900/60">
                    <strong className="block font-bold text-slate-900 dark:text-slate-100">
                      Symmetrical Inverses (Mirror Pairs)
                    </strong>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Inverted dot and dash sequences often cause hesitation:
                    </p>
                    <ul className="mt-2.5 space-y-1.5 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <li className="flex justify-between border-b border-slate-100 pb-1 dark:border-slate-800">
                        <span>D (-..)</span>
                        <span className="text-teal-700 dark:text-teal-400">&harr;</span>
                        <span>U (..-)</span>
                      </li>
                      <li className="flex justify-between border-b border-slate-100 pb-1 dark:border-slate-800">
                        <span>B (-...)</span>
                        <span className="text-teal-700 dark:text-teal-400">&harr;</span>
                        <span>V (...-)</span>
                      </li>
                      <li className="flex justify-between border-b border-slate-100 pb-1 dark:border-slate-800">
                        <span>G (--.)</span>
                        <span className="text-teal-700 dark:text-teal-400">&harr;</span>
                        <span>W (.--)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>K (-.-)</span>
                        <span className="text-teal-700 dark:text-teal-400">&harr;</span>
                        <span>R (.-.)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Pair 2: Suffix Clashes */}
                  <div className="rounded-lg border border-slate-200/80 bg-white/80 p-4 dark:border-slate-700/80 dark:bg-slate-900/60">
                    <strong className="block font-bold text-slate-900 dark:text-slate-100">
                      Suffix Clashes (Single Extensions)
                    </strong>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Missing the final element changes identity entirely:
                    </p>
                    <ul className="mt-2.5 space-y-1.5 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <li className="border-b border-slate-100 pb-1 dark:border-slate-800">
                        <span>S (...) &rarr; H (....) &rarr; 5 (.....)</span>
                      </li>
                      <li className="border-b border-slate-100 pb-1 dark:border-slate-800">
                        <span>B (-...) &rarr; 6 (-....)</span>
                      </li>
                      <li>
                        <span>M (--) &rarr; O (---)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Pair 3: Punctuation Sequences */}
                  <div className="rounded-lg border border-slate-200/80 bg-white/80 p-4 dark:border-slate-700/80 dark:bg-slate-900/60">
                    <strong className="block font-bold text-slate-900 dark:text-slate-100">
                      Punctuation Sequences
                    </strong>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      5- or 6-element rhythm recognition:
                    </p>
                    <ul className="mt-2.5 space-y-1.5 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <li className="flex justify-between border-b border-slate-100 pb-1 dark:border-slate-800">
                        <span>Question Mark</span>
                        <span className="text-teal-800 dark:text-teal-300">..--..</span>
                      </li>
                      <li className="flex justify-between border-b border-slate-100 pb-1 dark:border-slate-800">
                        <span>Period / Full Stop</span>
                        <span className="text-teal-800 dark:text-teal-300">.-.-.-</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Comma</span>
                        <span className="text-teal-800 dark:text-teal-300">--..--</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: PRACTICE CATEGORIES & DRILL QUEUE FLOW (Dual-View Mobile Responsive)
            ========================================================================= */}
        <section id="categories" aria-label="Practice Categories & Question Flow" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Practice Categories &amp; Question Flow
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Structured practice benefits from balancing broad exposure with focused repetition. The practice workbench organizes International Morse Code into distinct character subsets:
            </p>

            {/* Desktop Table View (Hidden on mobile) */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <table className="w-full border-collapse text-left text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/95 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
                    <th scope="col" className="px-5 py-3.5">Category Pill</th>
                    <th scope="col" className="px-5 py-3.5">Character Pool</th>
                    <th scope="col" className="px-5 py-3.5">Scope &amp; Included Symbols</th>
                    <th scope="col" className="px-5 py-3.5">Recommended Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {CATEGORY_ROWS.map((row) => (
                    <tr key={row.name} className="table-row-hover group">
                      <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-slate-100">
                        <span className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs font-bold text-slate-800 transition-colors group-hover:border-teal-400 group-hover:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:group-hover:border-teal-400">
                          {row.name}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs font-bold text-teal-800 dark:text-teal-300">
                        {row.count}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-600 dark:text-slate-400">
                        {row.scope}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-600 dark:text-slate-400">
                        {row.recommendedUse}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Touch-Friendly Card Grid (Visible on mobile, no horizontal clipping) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:hidden">
              {CATEGORY_ROWS.map((row) => (
                <div key={row.name} className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-mono text-xs font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {row.name}
                    </span>
                    <span className="font-mono text-xs font-bold text-teal-800 dark:text-teal-300">
                      {row.count}
                    </span>
                  </div>
                  <p className="mt-2.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                    {row.scope}
                  </p>
                  <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <strong className="text-slate-800 dark:text-slate-200">Recommended:</strong> {row.recommendedUse}
                  </p>
                </div>
              ))}
            </div>

            {/* Drill Mechanics Breakdown */}
            <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-950/40">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                Drill Queue Sizing &amp; Scoreboard Mechanics
              </h3>
              <ul className="mt-4 space-y-3 text-xs leading-relaxed text-slate-600 sm:text-[13px] dark:text-slate-400">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300" aria-hidden="true">&bull;</span>
                  <span>
                    <strong className="text-slate-900 dark:text-slate-100">Queue Sizing:</strong> For standard categories (<strong>All</strong>, <strong>Letters</strong>, <strong>Numbers</strong>, <strong>Punctuation</strong>), each drill round selects up to 12 randomly shuffled characters. For <strong>Weak Focus</strong>, the queue contains all qualified weak characters up to a maximum of 12.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300" aria-hidden="true">&bull;</span>
                  <span>
                    <strong className="text-slate-900 dark:text-slate-100">Live Session Scoreboard:</strong> As you progress through a set, the header tracks your progress (<code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-800">Drill X of [queueLength]</code>) and displays your live session accuracy (<code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-800">Score: X / Y (Z%)</code>).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300" aria-hidden="true">&bull;</span>
                  <span>
                    <strong className="text-slate-900 dark:text-slate-100">Session vs. Cumulative Persistence:</strong> The session scoreboard resets whenever you switch categories, change practice directions, or click &ldquo;Restart New Session&rdquo;. However, your cumulative per-character error statistics remain saved in your browser&apos;s local memory.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: PRACTICAL TIPS FOR IMPROVING RECOGNITION & SPEED (Card Grid)
            ========================================================================= */}
        <section id="tips" aria-label="Practical Tips for Improving Morse Code Recognition & Speed" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Practical Tips for Improving Morse Code Recognition &amp; Speed
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Developing speed in Morse code requires building direct acoustic associations. The following practical suggestions can assist your training:
            </p>

            <div className="grid grid-cols-1 gap-4">
              {/* Tip 1 */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Tip 01.</span>Hear Rhythm Rather Than Counting Elements
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    Acoustic Cadence
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Counting individual dots and dashes creates a mental bottleneck. Focus on recognizing each character by its overall sound phrase (e.g. <strong>C</strong> as <code className="font-mono text-teal-800 dark:text-teal-300 font-bold">dah-di-dah-dit</code>) to build instant acoustic reflexes.
                </p>
              </div>

              {/* Tip 2 */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Tip 02.</span>Maintain Short, Consistent Practice Sessions
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    Daily Consistency
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Short, focused 15–20 minute sessions build subconscious reflex paths and muscle memory far faster than irregular, prolonged cramming marathons.
                </p>
              </div>

              {/* Tip 3 */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Tip 03.</span>Master Standard PARIS Timing Principles
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    Timing Physics
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Calibrated via ITU-R M.1677-1 standard word PARIS: at 15 WPM, 1 dot is 80ms, a dash is 3 dots (240ms), and character spacing is 3 dots.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: MORSE CODE TYPING & ENCODING STRATEGIES: KEYBOARD & MOBILE
            ========================================================================= */}
        <section id="typing-strategies" aria-label="Morse Code Typing & Encoding Strategies: Keyboard & Mobile" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Morse Code Typing &amp; Encoding Strategies: Keyboard &amp; Mobile
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Entering Morse code accurately into an online tool can present ergonomic challenges, especially on mobile devices. Our interface includes features to streamline input on both desktop and mobile platforms:
            </p>

            <div className="grid grid-cols-1 gap-4">
              {/* Strategy 1: Desktop Keyboard */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Strategy 01.</span>Desktop Keyboard Controls &amp; Form Flow
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    Desktop Input
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Type period (<code className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-xs font-semibold dark:bg-slate-800">.</code>) for dots and hyphen (<code className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-xs font-semibold dark:bg-slate-800">-</code>) for dashes. Press <strong>Enter</strong> to evaluate instantly and <strong>Enter</strong> again to load the next character without touching your mouse.
                </p>
              </div>

              {/* Strategy 2: Mobile Pads */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Strategy 02.</span>Mobile On-Screen Dot &amp; Dash Touch Pads
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    Mobile Touch Pads
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  In Text &rarr; Morse mode on touchscreens, dedicated on-screen buttons for <strong>Dot (&bull;)</strong>, <strong>Dash (&mdash;)</strong>, and <strong>Space</strong> provide minimum 44px tap targets that eliminate keyboard switching and typos.
                </p>
              </div>

              {/* Strategy 3: Input Normalization */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">Strategy 03.</span>Client-Side Input Normalization &amp; Auto-Sanitizing
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    Auto-Sanitizing
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Automatically converts Unicode dashes (&ndash;, &mdash;, &minus;) into ASCII hyphens (<code className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-xs font-semibold dark:bg-slate-800">-</code>) and bullets (&bull;, &#8228;) into periods (<code className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-xs font-semibold dark:bg-slate-800">.</code>), trimming extra spaces seamlessly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: EXPLORE THE COMPLETE MORSE CODE LEARNING ECOSYSTEM
            ========================================================================= */}
        <section id="ecosystem" aria-label="Explore the Complete Morse Code Learning Ecosystem" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Explore the Complete Morse Code Learning Ecosystem
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Practice drills are part of a broader set of tools designed for Morse code study and conversion. Our platform provides interconnected resources to support different learning tasks:
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/"
                className="studio-card group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 sm:p-5 backdrop-blur-xs transition-all hover:border-teal-500 hover:bg-white hover:shadow-xs dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-teal-400 dark:hover:bg-slate-900"
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-teal-500" />
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400">
                    Translator Studio
                  </span>
                  <h3 className="mt-1.5 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-300">
                    Morse Code Translator &rarr;
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    Translate full sentences with audio synthesis (5–30 WPM), pitch controls, visual light flasher, and WAV downloads.
                  </p>
                </div>
                <div className="mt-3.5 flex items-center gap-1 font-mono text-[11px] font-bold text-teal-700 dark:text-teal-300">
                  <span>Open Translator</span>
                  <span>&rarr;</span>
                </div>
              </Link>

              <Link
                href="/reference"
                className="studio-card group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 sm:p-5 backdrop-blur-xs transition-all hover:border-emerald-500 hover:bg-white hover:shadow-xs dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-emerald-400 dark:hover:bg-slate-900"
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-emerald-500" />
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                    Reference Chart
                  </span>
                  <h3 className="mt-1.5 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-300">
                    Alphabet &amp; Chart &rarr;
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    Directory for all 54 standard characters (letters, numbers, punctuation) with search filtering and individual audio tone previews.
                  </p>
                </div>
                <div className="mt-3.5 flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                  <span>View Full Chart</span>
                  <span>&rarr;</span>
                </div>
              </Link>

              <Link
                href="/learn"
                className="studio-card group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 sm:p-5 backdrop-blur-xs transition-all hover:border-amber-500 hover:bg-white hover:shadow-xs dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-amber-400 dark:hover:bg-slate-900"
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-amber-500" />
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                    Beginner Course
                  </span>
                  <h3 className="mt-1.5 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-300">
                    10-Lesson Course &rarr;
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    Step-by-step curriculum teaching timing fundamentals, single-element roots, and symmetrical pairs with interactive exercises.
                  </p>
                </div>
                <div className="mt-3.5 flex items-center gap-1 font-mono text-[11px] font-bold text-amber-700 dark:text-amber-300">
                  <span>Start Course</span>
                  <span>&rarr;</span>
                </div>
              </Link>

              <Link
                href="/quiz"
                className="studio-card group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 sm:p-5 backdrop-blur-xs transition-all hover:border-rose-500 hover:bg-white hover:shadow-xs dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-rose-400 dark:hover:bg-slate-900"
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-rose-500" />
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400">
                    Evaluative Quizzes
                  </span>
                  <h3 className="mt-1.5 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-300">
                    Morse Code Quizzes &rarr;
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    Standardized 10-question scored assessments with detailed rationale explanations and browser-local score history.
                  </p>
                </div>
                <div className="mt-3.5 flex items-center gap-1 font-mono text-[11px] font-bold text-rose-700 dark:text-rose-300">
                  <span>Take a Quiz</span>
                  <span>&rarr;</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: FREQUENTLY ASKED QUESTIONS ABOUT MORSE CODE PRACTICE
            ========================================================================= */}
        <section id="faq" aria-label="Frequently Asked Questions About Morse Code Practice" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Frequently Asked Questions About Morse Code Practice
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Answers to common operational questions regarding practice modes, weak character tracking, mobile input, and progress saving:
            </p>

            <div className="space-y-3">
              {PRACTICE_FAQS.map((faq, index) => (
                <details
                  key={index}
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
            SECTION 9: FINAL CALL TO ACTION (Tactile Action Banner)
            ========================================================================= */}
        <section
          id="cta"
          aria-label="Ready to Sharpen Your Morse Code Reflexes?"
          className="scroll-mt-20 rounded-3xl border border-teal-200/80 bg-gradient-to-br from-teal-50/90 via-white to-teal-50/40 p-8 text-center shadow-lg shadow-teal-900/5 sm:p-12 dark:border-teal-900/60 dark:from-slate-900 dark:via-[#0B1220] dark:to-teal-950/30"
        >
          <div className="mx-auto max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              Interactive Drills &bull; Ready to Train
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              Ready to Sharpen Your Morse Code Reflexes?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              Morse code proficiency is built through consistent, focused practice. Open the interactive drill station, test your character memory across letters, numbers, and punctuation, and review difficult symbols with instant feedback.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#drill-station"
                className="btn-tactile touch-target inline-flex items-center rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500"
              >
                Jump to Drill Station &uarr;
              </a>
              <Link
                href="/learn"
                className="btn-tactile touch-target inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Explore 10-Lesson Beginner Course &rarr;
              </Link>
              <Link
                href="/reference"
                className="btn-tactile touch-target inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Look Up Alphabet Reference Chart &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
