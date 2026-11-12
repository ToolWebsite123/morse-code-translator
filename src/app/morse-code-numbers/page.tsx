import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { AudioPreviewButton } from '@/components/learning/AudioPreviewButton';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';

export const metadata: Metadata = {
  title: 'Morse Code Numbers 0–9 & Audio',
  description:
    'Learn Morse code digits 0–9 with audio tones, the 5-element sliding window pattern, and ham radio cut numbers (5NN, 1NN). Free interactive chart.',
  alternates: {
    canonical: '/morse-code-numbers',
  },
  openGraph: {
    title: 'Morse Code Numbers 0–9 & Audio',
    description:
      'Learn Morse code digits 0–9 with audio tones, the 5-element sliding window pattern, and ham radio cut numbers (5NN, 1NN). Free interactive chart.',
    url: getAbsoluteUrl('/morse-code-numbers'),
    siteName: 'Morse Code Translator',
    type: 'article',
  },
};

const NUMBERS_DATA = [
  { digit: '1', morse: '.----', dits: 1, dahs: 4, mnemonic: '1 dot starts, followed by 4 dashes' },
  { digit: '2', morse: '..---', dits: 2, dahs: 3, mnemonic: '2 dots, followed by 3 dashes' },
  { digit: '3', morse: '...--', dits: 3, dahs: 2, mnemonic: '3 dots, followed by 2 dashes' },
  { digit: '4', morse: '....-', dits: 4, dahs: 1, mnemonic: '4 dots, followed by 1 dash' },
  { digit: '5', morse: '.....', dits: 5, dahs: 0, mnemonic: '5 dots (all short elements)' },
  { digit: '6', morse: '-....', dits: 4, dahs: 1, mnemonic: '1 dash starts, followed by 4 dots' },
  { digit: '7', morse: '--...', dits: 3, dahs: 2, mnemonic: '2 dashes, followed by 3 dots' },
  { digit: '8', morse: '---..', dits: 2, dahs: 3, mnemonic: '3 dashes, followed by 2 dots' },
  { digit: '9', morse: '----.', dits: 1, dahs: 4, mnemonic: '4 dashes, followed by 1 dot' },
  { digit: '0', morse: '-----', dits: 0, dahs: 5, mnemonic: '5 dashes (all long elements)' },
];

const CUT_NUMBERS = [
  { digit: '0', standard: '-----', cut: 'T', cutMorse: '-', saving: '80% faster' },
  { digit: '1', standard: '.----', cut: 'A', cutMorse: '.-', saving: '60% faster' },
  { digit: '2', standard: '..---', cut: 'U', cutMorse: '..-', saving: '40% faster' },
  { digit: '3', standard: '...--', cut: 'V', cutMorse: '...-', saving: '20% faster' },
  { digit: '5', standard: '.....', cut: 'E', cutMorse: '.', saving: '80% faster' },
  { digit: '7', standard: '--...', cut: 'G', cutMorse: '--.', saving: '20% faster' },
  { digit: '8', standard: '---..', cut: 'D', cutMorse: '-..', saving: '40% faster' },
  { digit: '9', standard: '----.', cut: 'N', cutMorse: '-.', saving: '60% faster' },
];

const NUMBER_FAQS = [
  {
    question: 'How do numbers work in International Morse Code?',
    answer:
      'Unlike letters which range from 1 to 4 elements, every numeric digit (0 through 9) in International Morse Code is composed of exactly 5 elements. Numbers 1 to 5 begin with dots and end with dashes; numbers 6 to 0 begin with dashes and end with dots.',
  },
  {
    question: 'What is the fastest way to memorize Morse code numbers?',
    answer:
      'Use the 5-finger sliding window technique: The number of leading dots directly equals the digit for 1 through 5 (e.g. 3 is 3 dots + 2 dashes). For digits 6 through 9, subtract 5 to get the number of leading dashes (e.g. 7 - 5 = 2 dashes, followed by 3 dots). 0 is 5 solid dashes.',
  },
  {
    question: 'What are "cut numbers" in amateur radio CW?',
    answer:
      'Cut numbers are single-letter abbreviations used by radio operators during CW contests to accelerate transmission. For example, 0 is transmitted as T (-), and 9 is transmitted as N (-.). A standard RST signal report of 599 is frequently sent as 5NN, cutting transmission duration in half.',
  },
  {
    question: 'Why are numbers in Morse code longer than letters?',
    answer:
      'Samuel Morse and Alfred Vail analyzed printer typesetting cases to assign the shortest codes to the most frequent English letters (such as E which is 1 dot, and T which is 1 dash). Because numbers are less frequent than vowels and consonants in natural language, they were assigned standardized 5-element codes to prevent transcription errors in financial and telegram data.',
  },
];

export default function MorseCodeNumbersPage() {
  const numberSchemas = [
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
          name: 'Morse Code Numbers',
          item: getAbsoluteUrl('/morse-code-numbers'),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Morse Code Numbers 0–9: Audio, Sliding Window Rule & Cut Numbers',
      description:
        'Technical guide to International Morse Code numbers 0 to 9, detailing the 5-element symmetrical progression, audio examples, and ham radio cut numbers.',
      mainEntityOfPage: getAbsoluteUrl('/morse-code-numbers'),
      author: {
        '@type': 'Organization',
        name: 'Morse Code Translator',
        url: getAbsoluteUrl('/'),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: NUMBER_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <JsonLd data={numberSchemas} />
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-hidden">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/" className="transition-colors hover:text-teal-800 dark:hover:text-teal-300">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">&bull;</li>
              <li className="font-semibold text-slate-800 dark:text-slate-200" aria-current="page">
                Morse Code Numbers 0–9
              </li>
            </ol>
          </nav>

          {/* Hero Banner */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-xs font-bold text-teal-800 shadow-2xs dark:border-teal-900/60 dark:bg-teal-950/60 dark:text-teal-300">
              <span>ITU-R M.1677-1 Numeric Standard &bull; Symmetrical 5-Element Window</span>
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Morse Code{' '}
              <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-300 dark:via-emerald-300 dark:to-teal-200">
                Numbers 0 to 9
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-300">
              Unlike alphabet letters, every single number in International Morse Code is exactly <strong>5 elements long</strong>. Listen to audio tones, discover the sliding window logic, and learn radio cut numbers.
            </p>
          </div>

          {/* Symmetrical Sliding Window Diagram */}
          <section className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs sm:p-6 md:p-8 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              The 5-Element Sliding Window Pattern
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Notice how the dots increment one-by-one from 1 to 5, and then dashes take over from 6 to 0. This mathematical progression makes Morse code digits the easiest part of the code to memorize:
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
              {NUMBERS_DATA.map((item) => (
                <div
                  key={item.digit}
                  className="flex flex-col items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-center transition-all hover:border-teal-400 dark:border-slate-800 dark:bg-slate-950/80"
                >
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    {item.digit}
                  </span>
                  <span className="my-2 font-mono text-lg font-black tracking-widest text-teal-800 dark:text-teal-300">
                    {item.morse}
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {item.dits} {item.dits === 1 ? 'dit' : 'dits'}, {item.dahs} {item.dahs === 1 ? 'dah' : 'dahs'}
                  </p>
                  <div className="mt-3">
                    <AudioPreviewButton morse={item.morse} label={`Play ${item.digit}`} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Amateur Radio Cut Numbers Table */}
          <section className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs sm:p-6 md:p-8 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
                  Amateur Radio &ldquo;Cut Numbers&rdquo; (Contest CW)
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  In high-speed telegraphy contests, sending 5-element numbers wastes precious seconds. Operators substitute abbreviated single-element characters:
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 font-mono text-xs font-bold text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/60 dark:text-amber-300">
                ⚡ Time-Saving Shorthand
              </span>
            </div>

            <p className="mt-4 text-xs font-medium text-slate-500 sm:hidden">
              &larr; Swipe table horizontally to view all columns &rarr;
            </p>

            <div className="mt-2 overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800">
              <table className="w-full text-left text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/90 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                    <th className="py-3 px-4">Digit</th>
                    <th className="py-3 px-4">Standard Morse</th>
                    <th className="py-3 px-4">Cut Abbreviation</th>
                    <th className="py-3 px-4">Cut Morse Pattern</th>
                    <th className="py-3 px-4">Efficiency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {CUT_NUMBERS.map((cut) => (
                    <tr key={cut.digit} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">{cut.digit}</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-600 dark:text-slate-300">{cut.standard}</td>
                      <td className="py-3 px-4 font-mono font-bold text-amber-700 dark:text-amber-400">{cut.cut}</td>
                      <td className="py-3 px-4 font-mono font-bold text-teal-700 dark:text-teal-300">{cut.cutMorse}</td>
                      <td className="py-3 px-4 text-xs font-medium text-emerald-700 dark:text-emerald-400">{cut.saving}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
              <strong>Classic CW Example:</strong> A signal report of <code className="font-mono font-bold">599</code> is transmitted as <code className="font-mono font-bold">5NN</code> (<span className="font-mono">..... -. -.</span> instead of <span className="font-mono">..... ----. ----.</span>), reducing 15 elements down to 9 elements!
            </div>
          </section>

          {/* FAQs */}
          <section className="mt-10 rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6 md:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              Frequently Asked Questions About Morse Code Numbers
            </h2>
            <div className="mt-6 space-y-4">
              {NUMBER_FAQS.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/70 dark:hover:border-slate-700"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900 dark:text-slate-100">
                    <span>{faq.question}</span>
                    <span className="ml-2 font-mono text-teal-700 transition-transform group-open:rotate-180 dark:text-teal-400">
                      &darr;
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Interactive Drill CTA */}
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-teal-200 bg-teal-50/70 p-4 sm:p-6 dark:border-teal-900/60 dark:bg-teal-950/40">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Ready to practice numbers against the clock?
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Filter our speed trainer specifically to numbers 0–9 for rapid drill recognition.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
              <Link
                href="/morse-code-practice"
                className="btn-tactile touch-target inline-flex items-center justify-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500"
              >
                Practice Number Drills &rarr;
              </Link>
              <Link
                href="/learn/numbers-zero-through-nine"
                className="btn-tactile touch-target inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                Lesson 5: Numbers Guide &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
