import type { Metadata } from 'next';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Translator } from '@/components/translator/Translator';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Morse Code Translator & Audio Player — International ITU-R Standard',
  description:
    'Translate plain text to International Morse Code and decode Morse code back to text in real-time. Features acoustic tone playback, speed/pitch controls, and zero server logging.',
  alternates: {
    canonical: '/',
  },
};

const homeSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Morse Code Translator & Audio Player',
    url: getAbsoluteUrl('/'),
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5 Audio for tone playback.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Text to Morse code conversion',
      'Morse code to text decoding',
      'Web Audio tone synthesis with adjustable WPM and pitch',
      'Synchronized visual signal simulation',
      'Client-side execution with zero server logging',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the standard timing ratio between dots and dashes in Morse code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A dash duration equals exactly three dots. The space between elements of the same letter is equal to one dot duration.',
        },
      },
      {
        '@type': 'Question',
        name: 'How are letters and words spaced in International Morse Code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Letters within a word are separated by a 3-unit space. Words are separated by a forward slash (/) surrounded by spaces, representing a 7-unit pause.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my translation text uploaded or stored on an external server?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. All conversions, audio tone synthesis, and progress tracking run 100% locally in your browser. Your text is never uploaded, logged, or analyzed.',
        },
      },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={homeSchemas} />
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Hero & Value Proposition */}
        <section className="mb-8 text-center sm:text-left">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/40 dark:text-teal-300">
            <span className="h-2 w-2 rounded-full bg-teal-600 dark:bg-teal-400 animate-pulse" />
            International Morse Code Utility
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Morse Code Translator &amp; Learning Platform
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            Translate plain text to International Morse Code and Morse code back to text instantly.
            Private, fast, and 100% browser-local — no accounts, logins, or server storage.
          </p>
        </section>

        {/* Core Interactive Translator */}
        <Translator />

        {/* Educational Quick Reference & FAQ Section */}
        <section className="mt-14 border-t border-slate-200 pt-10 dark:border-slate-800">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
                How International Morse Code Works
              </h2>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
                Essential timing conventions and rules used by radio operators worldwide.
              </p>
            </div>
            <Link
              href="/reference"
              className="touch-target inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800 hover:underline dark:text-teal-400 sm:text-sm"
            >
              View Full Alphabet Chart &rarr;
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Dots and Dashes */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-teal-200 bg-teal-50 text-teal-800 font-mono font-bold dark:border-teal-800 dark:bg-teal-950/60 dark:text-teal-300">
                .-
              </div>
              <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Dots &amp; Dashes Timing</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                A dash (<code className="font-bold text-slate-900 dark:text-slate-200">-</code>) duration equals exactly three dots (<code className="font-bold text-slate-900 dark:text-slate-200">.</code>).
                The space between elements of the same letter is equal to one dot duration.
              </p>
            </div>

            {/* Card 2: Spacing Rules */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-teal-200 bg-teal-50 text-teal-800 font-mono font-bold dark:border-teal-800 dark:bg-teal-950/60 dark:text-teal-300">
                /
              </div>
              <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Word &amp; Letter Spacing</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Letters within a word are separated by one space (3 dot units). Words are separated by a forward slash (<code className="font-bold text-slate-900 dark:text-slate-200">/</code>) surrounded by spaces (7 dot units).
              </p>
            </div>

            {/* Card 3: Privacy & Local Execution */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 font-bold dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">100% Privacy by Design</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                All conversions run client-side on your device. Your messages are never uploaded, logged, or analyzed by an external server.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
