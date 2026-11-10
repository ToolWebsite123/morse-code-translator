import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';

export const metadata: Metadata = {
  title: 'About Our Platform & Standards',
  description:
    'Learn about the Morse Code Translator & Learning Platform. Built for students, radio hobbyists, and educators adhering strictly to Recommendation ITU-R M.1677-1.',
  alternates: {
    canonical: '/about',
  },
};

const aboutSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Morse Code Platform',
    url: getAbsoluteUrl('/about'),
    description:
      'Purpose, international standards compliance, and architectural principles of the Morse Code Translator & Learning Platform.',
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
        name: 'About',
        item: getAbsoluteUrl('/about'),
      },
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={aboutSchemas} />
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
              About
            </li>
          </ol>
        </nav>

        {/* Header */}
        <section className="mb-8">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/40 dark:text-teal-300">
            Platform Mission &amp; Standards
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            About Morse Code Platform
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            An open, accessible, and privacy-preserving utility built for students, radio hobbyists, and educators worldwide.
          </p>
        </section>

        {/* Content Cards */}
        <div className="space-y-6">
          {/* Section 1: Purpose & Vision */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Our Educational Mission
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <p>
                Morse code was the world&apos;s first digital telecommunication language. Invented nearly two centuries ago, it allowed messages to cross continents and oceans through simple short and long electrical pulses.
              </p>
              <p>
                Our mission is to provide an instantly usable, mathematically sound, and completely free platform where anyone can encode, decode, hear, and master Morse code without barriers. We believe educational tools should be accessible without logins, subscriptions, paywalls, or intrusive advertisements.
              </p>
            </div>
          </section>

          {/* Section 2: Standards Adherence */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Standard Compliance (ITU-R M.1677-1)
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <p>
                This platform adheres strictly to <strong>Recommendation ITU-R M.1677-1</strong>, the official International Morse Code standard recognized by the International Telecommunication Union (ITU).
              </p>
              <p>
                Our single canonical translation engine powers the translator, reference chart, audio synthesizer, and interactive lessons. It explicitly supports:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li><strong>26 Latin Letters</strong>: A through Z (case-insensitive)</li>
                <li><strong>10 Arabic Numerals</strong>: 0 through 9 (structured 5-element symmetry)</li>
                <li><strong>18 Standard Punctuation Marks</strong>: Period, comma, question mark, apostrophe, slash, parentheses, ampersand, colon, semicolon, equals, plus, hyphen, underscore, quotation mark, dollar sign, and at-sign.</li>
                <li><strong>PARIS 50-Unit Timing</strong>: Universal calibration standard for words-per-minute (WPM) calculation.</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Privacy & Local-First Philosophy */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Privacy by Architecture
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <p>
                We do not operate an application backend, user database, or telemetry tracking network. When you type a message into our translator, 100% of the character conversion, text normalization, and audio synthesis happens directly inside your web browser using client-side JavaScript and the Web Audio API.
              </p>
              <p>
                Your messages never touch our servers, are never logged, and cannot be intercepted by third parties through this website.
              </p>
            </div>
          </section>

          {/* Section 4: Clear Limitations & Non-Claims */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Scope &amp; Technical Limitations
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <p>
                To maintain transparency and adhere to our product principles:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li><strong>On-Screen Visual Simulation Only</strong>: The visual signal beacon is simulated entirely on your display screen. Web browsers cannot control a smartphone or computer&apos;s physical camera LED hardware.</li>
                <li><strong>Latin Alphabet Scope</strong>: This platform strictly supports International Morse Code (Latin set). Non-Latin systems (such as Cyrillic, Arabic, Hebrew, or Japanese Wabun Morse) are not currently supported.</li>
                <li><strong>Deterministic Translation</strong>: We use strict deterministic mapping rules rather than generative AI algorithms, ensuring 100% predictable and reproducible conversion.</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Quick Links */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
          <Link
            href="/"
            className="touch-target inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 sm:text-sm"
          >
            &larr; Try the Translator
          </Link>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/privacy" className="text-teal-700 hover:underline dark:text-teal-400">
              Privacy Policy &rarr;
            </Link>
            <Link href="/faq" className="text-teal-700 hover:underline dark:text-teal-400">
              Read FAQs &rarr;
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

