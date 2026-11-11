import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Disclosures',
  description:
    'Our transparent privacy policy. Learn how our browser-local architecture ensures your translations and learning progress are never sent to external servers.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy & Data Disclosures',
    description:
      'Our transparent privacy policy. Learn how our browser-local architecture ensures your translations and learning progress are never sent to external servers.',
    url: getAbsoluteUrl('/privacy'),
    siteName: 'Morse Code Platform',
    type: 'website',
  },
};

const privacySchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    url: getAbsoluteUrl('/privacy'),
    description: 'Privacy policy and data retention disclosures for the Morse Code Platform.',
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
        name: 'Privacy Policy',
        item: getAbsoluteUrl('/privacy'),
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={privacySchemas} />
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
              Privacy Policy
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
            <span>Privacy-First Architecture</span>
            <span className="text-teal-300 dark:text-teal-700">&bull;</span>
            <span className="font-mono text-[11px] font-bold tracking-widest text-teal-800 dark:text-teal-200">
              Zero Tracking
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-[44px] sm:leading-tight dark:text-white">
            Privacy{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-300 dark:via-emerald-300 dark:to-teal-200">
              Policy
            </span>
          </h1>
          <p className="mt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            Effective Date: November 2026 &bull; Version 1.0
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            This platform was intentionally engineered with a privacy-by-design architecture.
            We do not collect, monetize, log, or sell your personal data.
          </p>
        </section>

        {/* Policy Body */}
        <div className="space-y-6">
          {/* Section 1: Translation Data */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                1. Translation &amp; Message Content
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              Your messages never leave your device. All text encoding, Morse decoding, character normalization, and acoustic Web Audio tone generation occur entirely client-side within your browser&apos;s memory:
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  Zero Network Transmission
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  We do not maintain an application backend, database, or API server to process your translations. When you click &ldquo;Translate&rdquo; or play an audio sequence, zero bytes of your text are sent over the network to us or any third party.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Local Storage Usage */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                2. Browser Storage (localStorage)
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              To provide a seamless learning experience without requiring you to create an account or sign in, this website uses your browser&apos;s built-in <code className="font-mono font-bold text-xs">localStorage</code> mechanism for the following keys only:
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <code className="font-mono text-teal-800 dark:text-teal-300">morse_theme</code>
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Stores your visual display preference (<code className="rounded bg-slate-200/80 px-1 py-0.5 font-mono text-xs dark:bg-slate-800">&apos;light&apos;</code> or <code className="rounded bg-slate-200/80 px-1 py-0.5 font-mono text-xs dark:bg-slate-800">&apos;dark&apos;</code>) so your chosen theme is preserved when returning.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  <code className="font-mono text-teal-800 dark:text-teal-300">morse_learning_progress_v1</code>
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Stores completed lesson IDs, quiz scores, and practice attempt counters. This allows you to track your learning journey over multiple sessions. You can reset all saved learning data at any time by clicking the &ldquo;Reset Progress&rdquo; button on the Learning Hub page.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Cookies & Tracking */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                3. Cookies, Analytics &amp; Advertising
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              We maintain a strict anti-tracking policy across all tools:
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  No Tracking Cookies or Commercial Pixels
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  We do not set profiling, session tracking, or cross-site tracking cookies. We do not load Google Analytics, Meta Pixels, Mixpanel, Hotjar, or third-party telemetry trackers. This website is completely ad-free.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Hosting & Infrastructure */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                4. Hosting &amp; Technical Server Logs
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              This website is hosted on modern Content Delivery Network (CDN) edge infrastructure:
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <strong className="block font-bold text-slate-900 sm:text-lg dark:text-slate-100">
                  Infrastructure Logs Exclusively for Security
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                  Like all web servers, the hosting provider automatically receives standard HTTP request headers (IP address, user-agent) to deliver HTML, CSS, and JavaScript files to your browser and defend against automated denial-of-service (DDoS) attacks.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Contact Information */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:rounded-3xl sm:p-8 md:p-10 dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mb-4 flex items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs sm:h-12 sm:w-12 dark:bg-teal-600 dark:text-slate-950">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl lg:text-3xl dark:text-slate-100">
                5. Contact Information
              </h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg dark:text-slate-300">
              If you have any questions or concerns regarding our privacy architecture, please reach out to us:
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 sm:text-base dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                <ul className="space-y-1.5">
                  <li>
                    <strong>Official Email:</strong>{' '}
                    <a href="mailto:morecodetranslator@gmail.com" className="font-mono text-teal-700 underline dark:text-teal-400">
                      morecodetranslator@gmail.com
                    </a>
                  </li>
                  <li>
                    <strong>Official Website:</strong>{' '}
                    <a href="https://morsecodetranslatores.com/" className="font-mono text-teal-700 underline dark:text-teal-400">
                      https://morsecodetranslatores.com/
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Pre-Footer Action Banner */}
        <section aria-label="Put Your Morse Knowledge Into Action" className="mt-12 scroll-mt-20 rounded-3xl border border-teal-200/80 bg-gradient-to-br from-teal-50/90 via-white to-teal-50/40 p-8 text-center shadow-lg shadow-teal-900/5 sm:p-12 dark:border-teal-900/60 dark:from-slate-900 dark:via-[#0B1220] dark:to-teal-950/30">
          <div className="mx-auto max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              Your Privacy Protected
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              Translate with Total Peace of Mind
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              Use our International Morse Code tools freely, knowing that your messages and practice scores stay strictly on your device.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-teal-800 sm:text-sm dark:bg-teal-400 dark:text-slate-950 dark:hover:bg-teal-300"
              >
                Open Morse Translator &rarr;
              </Link>
              <Link
                href="/about"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                About Platform &rarr;
              </Link>
              <Link
                href="/reference"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Reference Chart &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
