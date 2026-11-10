import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';

export const metadata: Metadata = {
  title: 'Privacy Policy — 100% Client-Side & Account-Free',
  description:
    'Our transparent privacy policy. Learn how our browser-local architecture ensures your translations and learning progress are never sent to external servers.',
  alternates: {
    canonical: '/privacy',
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
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={privacySchemas} />
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
              Privacy Policy
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <section className="mb-8">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/40 dark:text-teal-300">
            Privacy-First Architecture
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            Effective Date: November 2026 &bull; Version 1.0
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            This platform was intentionally engineered with a privacy-by-design architecture.
            We do not collect, monetize, log, or sell your personal data.
          </p>
        </section>

        {/* Policy Body */}
        <div className="space-y-6">
          {/* Section 1: Translation Data */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              1. Translation &amp; Message Content
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <p>
                <strong>Your messages never leave your device.</strong>
              </p>
              <p>
                All text encoding, Morse decoding, character normalization, and acoustic Web Audio tone generation occur 100% client-side within your browser&apos;s memory. We do not maintain an application backend, database, or API server to process your translations.
              </p>
              <p>
                When you click &ldquo;Translate&rdquo; or play an audio sequence, zero bytes of your text are sent over the network to us or any third party.
              </p>
            </div>
          </section>

          {/* Section 2: Local Storage Usage */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              2. Browser Storage (localStorage)
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <p>
                To provide a seamless learning experience without requiring you to create an account or sign in, this website uses your browser&apos;s built-in <code className="font-mono font-bold text-xs">localStorage</code> mechanism for the following keys only:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>
                  <code className="font-mono font-bold">morse_theme</code>: Stores your visual display preference (<code className="font-mono">&apos;light&apos;</code> or <code className="font-mono">&apos;dark&apos;</code>) so your chosen theme is preserved when returning.
                </li>
                <li>
                  <code className="font-mono font-bold">morse_learning_progress_v1</code>: Stores completed lesson IDs, quiz scores, and practice attempt counters. This allows you to track your learning journey over multiple sessions.
                </li>
              </ul>
              <p>
                <strong>How to Delete Local Progress:</strong> You can reset all saved learning data at any time by clicking the &ldquo;Reset Progress&rdquo; button on the Learning Hub page, or by clearing your browser&apos;s site data in settings.
              </p>
            </div>
          </section>

          {/* Section 3: Cookies & Tracking */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              3. Cookies, Analytics &amp; Advertising
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <p>
                We maintain a strict anti-tracking policy:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li><strong>No Tracking Cookies</strong>: We do not set profiling, session tracking, or cross-site tracking cookies.</li>
                <li><strong>No Third-Party Analytics</strong>: We do not load Google Analytics, Meta Pixels, Mixpanel, Hotjar, or similar telemetry trackers.</li>
                <li><strong>No Advertisements</strong>: This website is completely ad-free. No advertising networks run code on your device.</li>
              </ul>
            </div>
          </section>

          {/* Section 4: Hosting & Infrastructure */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              4. Hosting &amp; Technical Server Logs
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <p>
                This website is hosted on modern Content Delivery Network (CDN) edge infrastructure. Like all web servers, the hosting provider automatically receives standard HTTP request headers (such as your IP address, browser user-agent, and requested asset path) to deliver HTML, CSS, and JavaScript files to your browser and defend against automated denial-of-service (DDoS) attacks.
              </p>
              <p>
                These standard edge logs are used exclusively for security and infrastructure reliability.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
          <Link
            href="/"
            className="touch-target inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 sm:text-sm"
          >
            &larr; Back to Translator
          </Link>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/about" className="text-teal-700 hover:underline dark:text-teal-400">
              About Us &rarr;
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

