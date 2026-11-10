import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) — Morse Code Platform',
  description:
    'Answers to common questions about International Morse Code translation, audio playback, timing rules, spacing conventions, and browser privacy.',
  alternates: {
    canonical: '/faq',
  },
};

const FAQ_ITEMS = [
  {
    q: 'How do I translate text to Morse code and Morse code back to text?',
    a: 'Use the Mode selector at the top of the translator. In "Text → Morse" mode, type letters, numbers, or punctuation to get Morse code. In "Morse → Text" mode, type dots (.) and dashes (-) separated by spaces for letters and a forward slash (/) for words. Translation happens in real-time as you type.',
  },
  {
    q: 'What is International Morse Code (ITU-R M.1677-1)?',
    a: 'International Morse Code is the standardized telecommunication system defined by Recommendation ITU-R M.1677-1. It consists of the 26 Latin letters (A–Z), 10 Arabic numbers (0–9), and 18 standard punctuation symbols. It is used worldwide for maritime signaling and amateur (HAM) radio.',
  },
  {
    q: 'Why is the forward slash (/) used between words?',
    a: 'In Morse audio transmission, words are separated by a 7-unit pause. In written Morse code, letters within a word are separated by one space (3 units). To clearly distinguish word boundaries from letter spaces, modern digital translators use a forward slash (/) surrounded by spaces.',
  },
  {
    q: 'What happens if I type an unsupported character (like an emoji or accented letter)?',
    a: 'Our engine never silently discards your characters. If an unsupported symbol is detected, the translator highlights its exact 1-based position in a non-blocking warning banner, while continuing to safely encode all surrounding valid characters.',
  },
  {
    q: 'How does the audio tone generator work, and what do WPM and Pitch mean?',
    a: 'Audio playback uses your browser\'s native Web Audio API to synthesize clean sine wave tones without audio files. WPM (Words Per Minute) controls the speed based on the international PARIS 50-unit standard (15 WPM = 80ms dot). Pitch (Hz) controls the tone frequency (default 600 Hz, adjustable from 400 to 800 Hz).',
  },
  {
    q: 'Why does Morse audio playback require a click or user gesture?',
    a: 'Modern web browsers enforce an Autoplay Security Policy that prevents websites from making sound before the user interacts with the page. Clicking "Play Morse" or "Listen" unlocks the browser audio context safely.',
  },
  {
    q: 'Does this website send my translations to an external server?',
    a: 'No. 100% of encoding, decoding, audio synthesis, and progress tracking run locally in your web browser. Zero bytes of your text are transmitted, stored, or analyzed on any external server.',
  },
  {
    q: 'Does the screen flash feature control my phone\'s physical camera flashlight?',
    a: 'No. The flash is strictly an on-screen visual simulation rendered on your display screen. Standard web browsers cannot access or control a device\'s physical camera LED hardware.',
  },
  {
    q: 'How does learning progress tracking work without creating an account?',
    a: 'Your completed lessons, practice statistics, and quiz scores are stored entirely on your device using your browser\'s localStorage. No email, password, signup, or cloud sync is required.',
  },
  {
    q: 'How do I reset my locally saved learning progress?',
    a: 'You can click the "Reset Progress" button on the Learning Hub (/learn) page, or clear your browser\'s site data in browser settings. This removes all stored scores and lesson completion badges.',
  },
];

const faqSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
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
        name: 'FAQ',
        item: getAbsoluteUrl('/faq'),
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={faqSchemas} />
      <Header />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <li>
              <Link href="/" className="hover:text-teal-700 dark:hover:text-teal-400">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-slate-900 dark:text-slate-100" aria-current="page">
              FAQ
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <section className="mb-8">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/40 dark:text-teal-300">
            Frequently Asked Questions
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            Clear, honest answers about International Morse Code, audio tone synthesis, timing conventions, and platform privacy.
          </p>
        </section>

        {/* FAQ Accordion / Cards List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <h2 className="text-base font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                {item.q}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Footer Links */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
          <Link
            href="/"
            className="touch-target inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 sm:text-sm"
          >
            &larr; Return to Translator
          </Link>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/reference" className="text-teal-700 hover:underline dark:text-teal-400">
              Alphabet Chart &rarr;
            </Link>
            <Link href="/learn" className="text-teal-700 hover:underline dark:text-teal-400">
              Learning Hub &rarr;
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

