import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';

export const metadata: Metadata = {
  title: 'About Our Mission & Standards',
  description:
    'Learn about Morse Code Translator: open educational utility adhering to Recommendation ITU-R M.1677-1 with zero tracking and browser-local audio tools.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Our Mission & Standards',
    description:
      'Learn about Morse Code Translator: open educational utility adhering to Recommendation ITU-R M.1677-1 with zero tracking and browser-local audio tools.',
    url: getAbsoluteUrl('/about'),
    siteName: 'Morse Code Translator',
    type: 'website',
  },
};

const aboutSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Morse Code Translator',
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
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={aboutSchemas} />
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

      <main id="main-content" className="mx-auto w-full max-w-4xl flex-1 px-4 pt-3 pb-12 sm:px-6 sm:pt-4 sm:pb-16 lg:px-8">
        {/* Centered Breadcrumb Pill */}
        <nav aria-label="Breadcrumb" className="mb-2.5 flex justify-center">
          <ol className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3.5 py-1 text-xs text-slate-500 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
            <li>
              <Link href="/" className="transition-colors hover:text-teal-700 dark:hover:text-teal-400">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</li>
            <li className="font-semibold text-slate-900 dark:text-slate-100" aria-current="page">
              About
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <section className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/90 bg-teal-50/90 px-3.5 py-1 text-xs font-semibold text-teal-900 shadow-2xs backdrop-blur-xs transition-colors hover:border-teal-400 dark:border-teal-800/80 dark:bg-teal-950/70 dark:text-teal-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-600 dark:bg-teal-400" />
            </span>
            <span>Platform Mission &amp; Standards</span>
            <span className="text-teal-300 dark:text-teal-700">&bull;</span>
            <span className="font-mono text-[11px] font-bold tracking-widest text-teal-800 dark:text-teal-200">
              ITU-R M.1677-1
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-[44px] sm:leading-tight dark:text-white">
            About{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-300 dark:via-emerald-300 dark:to-teal-200">
              Morse Code Translator
            </span>
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            An open, accessible, and privacy-preserving educational platform built for students, radio hobbyists, and educators worldwide.
          </p>
        </section>

        {/* Content Cards */}
        <div className="space-y-6">
          {/* Section 1: Purpose & Vision */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Our Educational Mission
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Morse code was the world&apos;s first digital telecommunication language. Invented nearly two centuries ago, it allowed messages to cross continents and oceans through simple short and long electrical pulses.
            </p>
            <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
              <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                Free, Barrier-Free Telegraphy Education
              </strong>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Our mission is to provide an instantly usable, mathematically sound, and completely free platform where anyone can encode, decode, hear, and master Morse code without barriers. We believe educational tools should be accessible without accounts, subscriptions, paywalls, or intrusive tracking.
              </p>
            </div>
          </section>

          {/* Section 2: Standards Adherence */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Standard Compliance (ITU-R M.1677-1)
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              This platform adheres strictly to <strong>Recommendation ITU-R M.1677-1</strong>, the official International Morse Code standard recognized by the International Telecommunication Union (ITU). Our single canonical translation engine powers all tools across the platform:
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">01.</span>26 Basic Latin Letters (A–Z)
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Deterministic case-insensitive translation ensuring uppercase and lowercase characters yield exact canonical dot-dash sequences.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">02.</span>10 Arabic Numerals (0–9)
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Structured 5-element numerical symmetry preventing ambiguity and ensuring high-noise error resistance.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">03.</span>18 Official Punctuation Marks
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Full punctuation catalog including period, comma, question mark, slash, and the 2004 ITU email at-sign (@).
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <span className="font-mono text-teal-800 dark:text-teal-300 mr-2">04.</span>PARIS 50-Unit Audio Timing
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Universal calibration standard word PARIS (50 units of time) where unit dot duration T equals 1200 / WPM ms.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Privacy & Local-First Philosophy */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Privacy by Architecture
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              We do not operate an application backend, user database, or telemetry tracking network. Character conversion, text normalization, and audio synthesis happen entirely inside your web browser using client-side JavaScript and the Web Audio API:
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  Zero Network Transmission
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Your translated messages never touch external servers, are not logged remotely, and are processed locally in temporary device memory.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  Browser-Local Storage Only
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Learning progress, drill stats, and quiz scores remain stored exclusively on your device via localStorage. You can clear them anytime in one click.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Clear Limitations & Non-Claims */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                Scope &amp; Technical Limitations
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              To maintain transparency and adhere to our product principles:
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  On-Screen Visual Simulation Only
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  The visual signal beacon is simulated entirely on your display screen. Standard web browsers cannot control a device&apos;s physical camera LED hardware.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  International Latin Alphabet Scope
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  This platform strictly supports International Morse Code (Latin set). Non-Latin systems (such as Cyrillic, Arabic, Hebrew, or Japanese Wabun Morse) are not currently supported.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  Deterministic Translation Rules
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  We use strict deterministic mapping rules rather than generative algorithms, ensuring predictable, reliable, and reproducible conversions.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Pre-Footer Action Banner */}
        <section aria-label="Put Your Morse Knowledge Into Action" className="mt-12 scroll-mt-20 rounded-3xl border border-teal-200/80 bg-gradient-to-br from-teal-50/90 via-white to-teal-50/40 p-8 text-center shadow-lg shadow-teal-900/5 sm:p-12 dark:border-teal-900/60 dark:from-slate-900 dark:via-[#0B1220] dark:to-teal-950/30">
          <div className="mx-auto max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              Free &bull; Open &bull; Private
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              Ready to Explore the Platform?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              Start converting sentences in real time, explore our comprehensive reference chart, or begin the interactive 10-lesson beginner course.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-teal-800 sm:text-sm dark:bg-teal-400 dark:text-slate-950 dark:hover:bg-teal-300"
              >
                Open Morse Translator &rarr;
              </Link>
              <Link
                href="/morse-code-alphabet"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Alphabet Chart &rarr;
              </Link>
              <Link
                href="/learn-morse-code"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                10-Lesson Course &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
