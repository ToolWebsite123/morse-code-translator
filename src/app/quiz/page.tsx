import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { QuizClient } from '@/components/learning/QuizClient';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';

export const metadata: Metadata = {
  title: 'Morse Code Quiz & Knowledge Test',
  description:
    'Test your Morse code knowledge with our free 10-question standardized quiz. Evaluate letters, timing, numbers, punctuation, and audio recognition online.',
  alternates: {
    canonical: '/quiz',
  },
  openGraph: {
    title: 'Morse Code Quiz & Knowledge Test',
    description:
      'Test your Morse code knowledge with our free 10-question standardized quiz. Evaluate letters, timing, numbers, punctuation, and audio recognition online.',
    url: getAbsoluteUrl('/quiz'),
    siteName: 'Morse Code Platform',
    type: 'website',
  },
};

interface FAQItem {
  question: string;
  answer: string;
}

const QUIZ_FAQS: readonly FAQItem[] = [
  {
    question: 'How many questions are in each Morse code quiz?',
    answer:
      'Each quiz contains exactly 10 questions. The questions are randomly selected from our 22-question bank using an algorithmic Fisher-Yates shuffle to ensure a balanced mix of timing rules, letters, numbers, punctuation, and audio tone recognition.',
  },
  {
    question: 'Are the quiz questions timed?',
    answer:
      'No. The quiz is completely untimed. You can take as much time as you need to calculate timing units, analyze dot-dash patterns, or listen to audio tone sequences without countdown stress.',
  },
  {
    question: 'How is my final quiz percentage calculated?',
    answer:
      'Your final percentage is calculated directly as the number of correct answers divided by the total number of questions (10), multiplied by 100. A score of 8 out of 10 results in an 80% score.',
  },
  {
    question: 'Does the quiz test Morse sound recognition as well as written code?',
    answer:
      'Yes. Selected questions include an interactive audio button that plays an authentic Morse code tone sequence synthesized via the Web Audio API at 15 WPM. You must listen to the acoustic rhythm and identify the matching character.',
  },
  {
    question: 'Are my quiz scores saved if I close or refresh my browser?',
    answer:
      'Quiz scores are saved locally in your browser using localStorage with zero account registration required. Your recent attempts are displayed on the quiz start screen. However, clearing your browser cache, browsing in private or incognito mode, or switching devices will reset this stored history.',
  },
  {
    question: 'What is the difference between Quiz mode and Practice mode?',
    answer:
      'Quiz mode is a standardized 10-question evaluation designed to test your knowledge across multiple categories with a final score and review list. Practice mode (/practice) is an open-ended training environment where you can drill specific categories or weak characters with instant answer feedback after every single question.',
  },
];

interface DomainRow {
  domain: string;
  questionType: string;
  concepts: string;
  application: string;
}

const DOMAIN_ROWS: readonly DomainRow[] = [
  {
    domain: '1. Timing & Spacing Standards',
    questionType: 'Multiple Choice',
    concepts: 'Dot-to-dash ratio (1:3), letter pauses (3 units), word pauses (7 units), PARIS 50-unit WPM calibration',
    application: 'International ITU-R M.1677-1 compliance and rhythm understanding',
  },
  {
    domain: '2. Latin Alphabet & Mirror Pairs',
    questionType: 'Multiple Choice & Typed',
    concepts: 'High-frequency letters (E, T), inverse pairs (A/N, D/U, K/R), emergency distress signals (SOS)',
    application: 'Visual decoding and active memory recall',
  },
  {
    domain: '3. Arabic Numerals (0–9)',
    questionType: 'Multiple Choice & Typed',
    concepts: 'Universal 5-element rule, counting sequences, boundary numbers (0, 5, 7)',
    application: 'Number transmission accuracy for telemetry and call signs',
  },
  {
    domain: '4. Punctuation & Syntax Boundaries',
    questionType: 'Multiple Choice & Typed',
    concepts: 'Period (.-.-.-), question mark (..--..), comma (--..--), literal slash (-..-.)',
    application: 'Sentence structure and distinguishing literal slashes from word pauses',
  },
  {
    domain: '5. Auditory Ear Training',
    questionType: 'Multiple Choice + Audio',
    concepts: '15 WPM Web Audio API tone sequences (.-, ..., .----)',
    application: 'Acoustic sound recognition without visual dot-dash crutches',
  },
];

interface PerformanceBandRow {
  range: string;
  band: string;
  assessment: string;
}

const PERFORMANCE_BANDS: readonly PerformanceBandRow[] = [
  {
    range: '90% – 100% (9–10 Correct)',
    band: 'Mastery',
    assessment:
      'Outstanding telegraphy comprehension. You have mastered fundamental timing, punctuation, and character recognition. You are ready for high-speed acoustic drills on the Practice page.',
  },
  {
    range: '70% – 89% (7–8 Correct)',
    band: 'Proficient',
    assessment:
      'Strong operational foundation. You have solid character recall with occasional timing or punctuation slip-ups. Review missed question explanations and retake the quiz.',
  },
  {
    range: '50% – 69% (5–6 Correct)',
    band: 'Developing',
    assessment:
      'Basic knowledge present. You recognize common letters but may struggle with punctuation codes, numeric sequences, or timing math. Review lessons on the Learn page.',
  },
  {
    range: 'Below 50% (0–4 Correct)',
    band: 'Novice',
    assessment:
      'Early learning stage. Consult the Reference Chart to familiarize yourself with the 54 standard characters, then complete Lessons 1 through 4.',
  },
];

const quizSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Interactive Morse Code Knowledge Quiz',
    url: getAbsoluteUrl('/quiz'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5 Web Audio API.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      '10-question standardized diagnostic assessment',
      'Balanced question pool across timing, alphabet, numbers, and punctuation',
      'Auditory tone recognition questions calibrated at 15 WPM',
      'Client-side answer normalization with instant educational review',
      'Performance band scoring with recommended progression paths',
      'Browser-local score history persistence with zero registration',
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
        name: 'Quiz',
        item: getAbsoluteUrl('/quiz'),
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: QUIZ_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  },
];

export default function QuizPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={quizSchemas} />
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
        {/* =========================================================================
            HERO SECTION: HOME-PAGE STYLE, IMMERSIVE & DIRECT ACCESS TO WORKBENCH
            ========================================================================= */}
        <section className="mx-auto mb-8 max-w-4xl text-center sm:mb-12">
          {/* Centered Telemetry Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/90 bg-teal-50/90 px-3.5 py-1 text-xs font-semibold text-teal-900 shadow-2xs backdrop-blur-xs transition-transform hover:scale-102 dark:border-teal-800/80 dark:bg-teal-950/70 dark:text-teal-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Standardized Assessment</span>
            <span className="text-teal-300 dark:text-teal-700">&bull;</span>
            <span className="font-mono text-[11px] font-bold text-teal-800 dark:text-teal-200">10 Questions</span>
            <span className="hidden text-teal-300 sm:inline dark:text-teal-700">&bull;</span>
            <span className="hidden text-teal-700 sm:inline dark:text-teal-300 font-medium">Browser-Local Storage</span>
          </div>

          {/* Centered Main Title (H1) */}
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-[44px] sm:leading-tight dark:text-white">
            Morse Code{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-300 dark:via-emerald-300 dark:to-teal-200">
              Knowledge Quiz
            </span>{' '}
            &amp; Assessment
          </h1>

          {/* Concise Subtitle */}
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Evaluate your International Morse Code comprehension across timing fundamentals, character recall, numeric sequences, and sound recognition with instant score explanations.
          </p>
        </section>

        {/* =========================================================================
            SECTION 1: INTERACTIVE QUIZ WORKBENCH
            ========================================================================= */}
        <section id="quiz-station" aria-label="Interactive Morse Code Quiz Assessment" className="mb-10 sm:mb-14 scroll-mt-20">
          <QuizClient />

          {/* 3 Core Value Pillars Directly Below the Workbench */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="studio-card relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-4 text-center backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/95">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-teal-500" />
              <span className="font-mono text-xs font-bold text-teal-800 dark:text-teal-400">
                Balanced Multi-Domain Questions
              </span>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Every quiz draws 10 questions covering timing rules, letters, numbers, punctuation, and audio signals.
              </p>
            </div>
            <div className="studio-card relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-4 text-center backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/95">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-emerald-500" />
              <span className="font-mono text-xs font-bold text-emerald-800 dark:text-emerald-400">
                Instant Educational Review
              </span>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                View detailed rationale explanations for every question to reinforce timing rules and mnemonics.
              </p>
            </div>
            <div className="studio-card relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-4 text-center backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/95">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-amber-500" />
              <span className="font-mono text-xs font-bold text-amber-800 dark:text-amber-400">
                Account-Free Local History
              </span>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Recent quiz attempts and scores persist locally in your browser using localStorage so you can track progress.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: TEST FORMAT
            ========================================================================= */}
        <section id="format" aria-label="Understanding the Standardized 10-Question Test Format" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Understanding the Standardized 10-Question Test Format
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Unlike open-ended practice drills that focus on continuous repetition, the Morse Code Quiz provides a formal,
              diagnostic evaluation of your telegraphy knowledge:
            </p>

            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">01.</span>Why 10 Questions?
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    Pedagogical Balance
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  A 10-question format offers a comprehensive cross-section of Morse code principles in approximately 5 to 7 minutes without causing cognitive fatigue.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">02.</span>Randomized Fisher-Yates Pool
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    Adaptive Pool
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Each quiz session draws 10 questions at random from our vetted 22-question bank, ensuring that every test attempt presents a fresh combination of challenges.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">03.</span>Untimed Testing Environment
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    Zero Countdown
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  There are no countdown timers or speed penalties. You can take as much time as needed to analyze dot-dash counts or calculate PARIS timing ratios.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: FIVE KNOWLEDGE DOMAINS (Dual-View Mobile Responsive)
            ========================================================================= */}
        <section id="domains" aria-label="The Five Knowledge Domains Evaluated in Every Quiz" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                The Five Knowledge Domains Evaluated in Every Quiz
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              To achieve true Morse code proficiency, a student must understand both theoretical transmission timing and practical signal identification. Every test evaluates questions drawn from five core domains:
            </p>

            {/* Desktop Table View (Hidden on mobile) */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <table className="w-full border-collapse text-left text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/95 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
                    <th scope="col" className="px-5 py-3.5 sm:w-1/4">Knowledge Domain</th>
                    <th scope="col" className="px-5 py-3.5 sm:w-1/6">Question Type</th>
                    <th scope="col" className="px-5 py-3.5 sm:w-1/3">Core Concepts Covered</th>
                    <th scope="col" className="px-5 py-3.5">Practical Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {DOMAIN_ROWS.map((row, idx) => (
                    <tr key={idx} className="table-row-hover group">
                      <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-slate-100">
                        {row.domain}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs font-bold text-teal-800 dark:text-teal-300">
                        {row.questionType}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {row.concepts}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-600 dark:text-slate-400">
                        {row.application}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Touch-Friendly Card Grid (Visible on mobile, 0 horizontal clipping) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:hidden">
              {DOMAIN_ROWS.map((row, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                      {row.domain}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-teal-800 dark:text-teal-300">
                      {row.questionType}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong className="text-slate-800 dark:text-slate-200">Concepts:</strong> {row.concepts}
                  </p>
                  <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <strong className="text-slate-800 dark:text-slate-200">Application:</strong> {row.application}
                  </p>
                </div>
              ))}
            </div>

            {/* Domain Narrative Explanations */}
            <div className="mt-6 grid grid-cols-1 gap-4">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">01.</span>Timing &amp; Spacing Standards
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Tests fundamental ITU-R M.1677-1 timing ratios: dash equals 3 dots, element pause is 1 unit, letter pause is 3 units, and word pause is 7 units, as well as the 50-unit PARIS standard.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">02.</span>Latin Alphabet &amp; Mirror Pairs
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Tests single-element characters (E, T), inverse symmetrical pairs (A/N, D/U, K/R), and famous emergency signals like SOS (<code className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:bg-slate-800 dark:text-teal-300">... --- ...</code>).
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">03.</span>Arabic Numerals (0–9)
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  All Arabic numerals follow the predictable 5-element rule. Digits 1–5 add dots progressively (<code className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:bg-slate-800 dark:text-teal-300">.----</code> to <code className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:bg-slate-800 dark:text-teal-300">.....</code>) and digits 6–0 add dashes (<code className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:bg-slate-800 dark:text-teal-300">-....</code> to <code className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:bg-slate-800 dark:text-teal-300">-----</code>).
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">04.</span>Punctuation &amp; Auditory Training
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Evaluates period (<code className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:bg-slate-800 dark:text-teal-300">.-.-.-</code>), comma (<code className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:bg-slate-800 dark:text-teal-300">--..--</code>), literal slash (<code className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:bg-slate-800 dark:text-teal-300">-..-.</code>), plus interactive 15 WPM Web Audio tone questions to test your acoustic ear.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: SCORING CRITERIA & PERFORMANCE BANDS (Dual-View Mobile Responsive)
            ========================================================================= */}
        <section id="scoring" aria-label="Scoring Criteria, Review Explanations & Performance Bands" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Scoring Criteria, Review Explanations &amp; Performance Bands
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Upon submitting your quiz, the client-side engine evaluates your answers and presents a comprehensive performance summary:
            </p>

            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">01.</span>Normalized Client-Side Answer Evaluation
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Typed answers undergo trimming, case conversion, and Unicode NFC normalization to prevent penalties for spacing variations.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">02.</span>Post-Quiz Educational Review
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  The results screen renders an itemized question-by-question review with submitted answers, correct targets, and mnemonic explanations.
                </p>
              </div>
            </div>

            {/* Desktop Table View (Hidden on mobile) */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <table className="w-full border-collapse text-left text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/95 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
                    <th scope="col" className="px-5 py-3.5 sm:w-1/4">Score Range</th>
                    <th scope="col" className="px-5 py-3.5 sm:w-1/6">Performance Band</th>
                    <th scope="col" className="px-5 py-3.5">Assessment &amp; Recommended Next Step</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {PERFORMANCE_BANDS.map((band, idx) => (
                    <tr key={idx} className="table-row-hover group">
                      <td className="px-5 py-3.5 font-mono font-bold text-slate-900 dark:text-slate-100">
                        {band.range}
                      </td>
                      <td className="px-5 py-3.5 font-bold text-teal-800 dark:text-teal-300">
                        <span className="inline-flex items-center rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">
                          {band.band}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {band.assessment}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Touch-Friendly Card Grid (Visible on mobile, 0 horizontal clipping) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:hidden">
              {PERFORMANCE_BANDS.map((band, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
                      {band.range}
                    </span>
                    <span className="inline-flex items-center rounded-lg border border-teal-200 bg-teal-50 px-2 py-0.5 text-xs font-bold text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">
                      {band.band}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {band.assessment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: HOW TO PREPARE
            ========================================================================= */}
        <section id="prep" aria-label="How to Prepare and Improve Your Morse Code Assessment Score" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                How to Prepare and Improve Your Morse Code Assessment Score
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              If you want to achieve a higher score or prepare before taking your first quiz, utilize our interconnected learning ecosystem:
            </p>

            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">01.</span>Study the Reference Chart
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    Lookup &amp; Audio
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Visit the <Link href="/reference" className="font-semibold text-teal-800 underline dark:text-teal-400">Morse Alphabet Reference Chart</Link> to inspect all 26 letters, 10 digits, and 18 punctuation marks with instant tone previews.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">02.</span>Complete the 10 Lessons
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    Curriculum
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Navigate to the <Link href="/learn" className="font-semibold text-teal-800 underline dark:text-teal-400">Learn Morse Code Hub</Link> to complete structured lessons covering timing principles, opposites, numbers, and prosigns.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                    <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">03.</span>Drill Weak Characters
                  </strong>
                  <span className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300">
                    Drills
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Open <Link href="/practice" className="font-semibold text-teal-800 underline dark:text-teal-400">Morse Code Practice</Link> and utilize the Weak Focus filter to drill characters where errors occur most often.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: LOCAL STORAGE PERSISTENCE & DATA PRIVACY
            ========================================================================= */}
        <section id="persistence" aria-label="Local Storage Persistence & Data Privacy" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Local Storage Persistence &amp; Data Privacy
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              We believe educational tools should respect your personal privacy. Practice statistics and recent quiz scores are saved locally in your browser using localStorage with zero account registration required.
            </p>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-950/40">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Browser-Local Attempt History
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-700 sm:text-sm dark:text-slate-300">
                Under the key <code className="font-mono font-bold text-teal-800 dark:text-teal-300">morse_learning_progress_v1</code>, your recent quiz scores, dates, and percentages are recorded directly on your device.
              </p>

              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                <strong className="text-slate-900 dark:text-slate-100">Important Note on Browser Cache &amp; Storage:</strong>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>Clearing your browser cache or site data will remove your saved quiz records.</li>
                  <li>Quiz history does not synchronize across different devices or separate browser profiles.</li>
                  <li>Using Private or Incognito browsing modes prevents long-term history persistence after the session is closed.</li>
                </ul>
                <p className="mt-2.5">
                  For additional technical disclosures, read our complete{' '}
                  <Link href="/privacy" className="font-semibold text-teal-800 underline dark:text-teal-400">
                    Privacy Policy
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: COMPLETE MORSE CODE LEARNING ECOSYSTEM
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
              Expand your telegraphy training with our full suite of free, browser-local Morse code utilities:
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/"
                className="studio-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-5.5 backdrop-blur-xs transition-all hover:border-teal-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-teal-400"
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-teal-500 transition-all group-hover:h-1.5" />
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400">Tool</span>
                  <h3 className="mt-1.5 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-300">
                    Morse Code Translator &rarr;
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    Instant bidirectional text and Morse translation with interactive audio playback, WPM and pitch controls, and WAV file export.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 font-mono text-[11px] font-bold text-teal-700 dark:text-teal-300">
                  <span>Open Tool</span>
                  <span>&rarr;</span>
                </div>
              </Link>

              <Link
                href="/reference"
                className="studio-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-5.5 backdrop-blur-xs transition-all hover:border-teal-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-teal-400"
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-emerald-500 transition-all group-hover:h-1.5" />
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">Lookup</span>
                  <h3 className="mt-1.5 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-300">
                    Alphabet &amp; Chart &rarr;
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    Complete 54-symbol reference table with phonetic mnemonics, audio tone previews, and instant character search.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                  <span>View Chart</span>
                  <span>&rarr;</span>
                </div>
              </Link>

              <Link
                href="/learn"
                className="studio-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-5.5 backdrop-blur-xs transition-all hover:border-teal-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-teal-400"
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-amber-500 transition-all group-hover:h-1.5" />
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">Curriculum</span>
                  <h3 className="mt-1.5 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-300">
                    10-Lesson Course &rarr;
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    Step-by-step beginner curriculum covering timing rules, dot-dash mechanics, and guided interactive exercises.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 font-mono text-[11px] font-bold text-amber-700 dark:text-amber-300">
                  <span>Start Course</span>
                  <span>&rarr;</span>
                </div>
              </Link>

              <Link
                href="/practice"
                className="studio-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-5.5 backdrop-blur-xs transition-all hover:border-teal-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-teal-400"
              >
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-rose-500 transition-all group-hover:h-1.5" />
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400">Training</span>
                  <h3 className="mt-1.5 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-300">
                    Practice Drills &rarr;
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    Untimed speed drills featuring three practice directions, on-screen touch buttons, and accuracy-based weak focus.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 font-mono text-[11px] font-bold text-rose-700 dark:text-rose-300">
                  <span>Try Drills</span>
                  <span>&rarr;</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: FAQS
            ========================================================================= */}
        <section id="faq" aria-label="Frequently Asked Questions About the Morse Code Quiz" className="mb-8 sm:mb-12 scroll-mt-20">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Frequently Asked Questions About the Morse Code Quiz
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Find answers to common questions about our 10-question standardized quiz format, scoring, and progress tracking:
            </p>

            <div className="space-y-3">
              {QUIZ_FAQS.map((faq, index) => (
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
            SECTION 9: FINAL CALL TO ACTION
            ========================================================================= */}
        <section id="cta" aria-label="Ready to Test Your Morse Code Knowledge?" className="scroll-mt-20 rounded-3xl border border-teal-200/80 bg-gradient-to-br from-teal-50/90 via-white to-teal-50/40 p-8 text-center shadow-lg shadow-teal-900/5 sm:p-12 dark:border-teal-900/60 dark:from-slate-900 dark:via-[#0B1220] dark:to-teal-950/30">
          <div className="mx-auto max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              Standardized Assessment
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-slate-100">
              Ready to Test Your Morse Code Knowledge?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-slate-700 sm:text-sm dark:text-slate-300">
              Evaluate your telegraphy comprehension, identify weak spots, and benchmark your progress today. Zero registration required.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#quiz-station"
                className="btn-tactile touch-target inline-flex items-center rounded-xl bg-teal-700 px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 sm:text-sm"
              >
                Take the 10-Question Quiz &rarr;
              </a>
              <Link
                href="/practice"
                className="btn-tactile touch-target inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:text-sm"
              >
                Practice Speed Drills
              </Link>
              <Link
                href="/learn"
                className="btn-tactile touch-target inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:text-sm"
              >
                Review 10-Lesson Course
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
