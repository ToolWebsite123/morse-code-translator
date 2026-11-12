import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAbsoluteUrl } from '@/lib/seo/siteConfig';
import { CopyEmailButton } from '@/components/contact/CopyEmailButton';

const OFFICIAL_EMAIL = 'morecodetranslator@gmail.com';

export const metadata: Metadata = {
  title: 'Contact Us & Support Helpdesk',
  description:
    'Contact the Morse Code Translator team for support, feature suggestions, bug reports, and educational inquiries. Direct email assistance available.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us & Support Helpdesk',
    description:
      'Contact the Morse Code Translator team for support, feature suggestions, bug reports, and educational inquiries. Direct email assistance available.',
    url: getAbsoluteUrl('/contact'),
    siteName: 'Morse Code Translator',
    type: 'website',
  },
};

const contactSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Morse Code Translator',
    url: getAbsoluteUrl('/contact'),
    description:
      'Official contact channels and communication guidelines for Morse Code Translator users, educators, and hobbyists.',
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
        name: 'Contact',
        item: getAbsoluteUrl('/contact'),
      },
    ],
  },
];

const CONTACT_REASONS = [
  {
    id: 'feedback',
    title: 'Feedback & User Experience',
    description:
      'Share your thoughts on our translator interface, audio tone player, or flashcard practice drills. Your feedback helps us refine the platform.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
  },
  {
    id: 'bugs',
    title: 'Bug Reports & Technical Glitches',
    description:
      'Encountered unexpected behavior with Web Audio playback, light signal animations, or audio file decoding? Send us device details so we can investigate.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    id: 'features',
    title: 'Feature & Tool Suggestions',
    description:
      'Have ideas for new learning lessons, custom WPM presets, Farnsworth timing controls, or audio visualization features? We welcome community suggestions.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 'corrections',
    title: 'Content & Standard Corrections',
    description:
      'Spotted a typographical error, missing ITU-R M.1677-1 reference nuance, or historical discrepancy? Let us know and we will promptly review the copy.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    id: 'education',
    title: 'Educational & Classroom Inquiries',
    description:
      'Educators, scout leaders, and amateur radio clubs using this free resource in teaching are welcome to reach out for guidance on curriculum structure.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 'general',
    title: 'General Questions',
    description:
      'Have any other questions about International Morse Code conventions, telegraphy history, or our zero-tracking architecture? Send us a message.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-slate-50 dark:bg-[#0B1220]">
      <JsonLd data={contactSchemas} />
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
              Contact Us
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <section className="mb-8 text-center sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/90 bg-teal-50/90 px-3.5 py-1 text-xs font-semibold text-teal-900 shadow-2xs backdrop-blur-xs transition-colors hover:border-teal-400 dark:border-teal-800/80 dark:bg-teal-950/70 dark:text-teal-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Direct Support</span>
            <span className="text-teal-300 dark:text-teal-700">&bull;</span>
            <span className="font-mono text-[11px] font-bold tracking-widest text-teal-800 dark:text-teal-200">
              Response within 24–48 Hours
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-[44px] sm:leading-tight dark:text-white">
            Contact{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-300 dark:via-emerald-300 dark:to-teal-200">
              Morse Code Translator
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            We welcome inquiries from telegraphy students, educators, radio hobbyists, and developers. Reach out directly via email for questions, suggestions, or technical feedback.
          </p>
        </section>

        {/* Primary Contact Action Card */}
        <section aria-label="Official Email Address" className="mb-10 sm:mb-14">
          <div className="overflow-hidden rounded-3xl border border-teal-200/90 bg-gradient-to-br from-teal-50/80 via-white to-emerald-50/40 p-6 shadow-sm backdrop-blur-xs sm:p-10 dark:border-teal-900/60 dark:from-slate-900 dark:via-[#0B1220] dark:to-teal-950/40">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-800 text-white shadow-md sm:h-16 sm:w-16 dark:bg-teal-500 dark:text-slate-950">
                <svg className="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <span className="mt-4 font-mono text-xs font-bold uppercase tracking-widest text-teal-800 dark:text-teal-400">
                Official Support Channel
              </span>

              <h2 className="mt-2 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl md:text-3xl dark:text-slate-100">
                Direct Email Communication
              </h2>

              <p className="mt-2 max-w-lg text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                Because this platform maintains a zero-tracking, serverless architecture without user accounts or stored profiles, all communication is handled directly through our verified email address:
              </p>

              {/* Prominent Email Address Badge */}
              <div className="my-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-slate-300/80 bg-white px-5 py-3 shadow-inner sm:px-6 dark:border-slate-700 dark:bg-slate-950">
                <span className="font-mono text-base font-bold text-slate-900 sm:text-lg md:text-xl dark:text-teal-300">
                  {OFFICIAL_EMAIL}
                </span>
              </div>

              {/* Action Buttons: Mailto Link & Copy Button */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${OFFICIAL_EMAIL}`}
                  className="btn-tactile touch-target inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-teal-800 sm:text-sm dark:bg-teal-400 dark:text-slate-950 dark:hover:bg-teal-300"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Open Email Client</span>
                </a>
                <CopyEmailButton email={OFFICIAL_EMAIL} />
              </div>

              {/* Trust & Transparency Note */}
              <p className="mt-5 text-[11px] text-slate-500 sm:text-xs dark:text-slate-400">
                &bull; Zero marketing lists &bull; No automated chatbots &bull; Direct human response within 24–48 hours
              </p>
            </div>
          </div>
        </section>

        {/* Reasons to Contact Us Grid */}
        <section aria-label="Reasons to contact our team" className="mb-12">
          <div className="mb-6 text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400">
              How Can We Help You?
            </span>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
              Reasons to Reach Out
            </h2>
            <p className="mx-auto mt-1 max-w-xl text-xs text-slate-600 sm:text-sm dark:text-slate-400">
              Whether you are troubleshooting an audio bug or suggesting a new curriculum topic, we are always eager to hear from our community.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {CONTACT_REASONS.map((reason) => (
              <div
                key={reason.id}
                className="studio-card rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-xs transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900/95"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-400">
                  {reason.icon}
                </div>
                <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-slate-100">
                  {reason.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Helpful Tips When Contacting */}
        <section aria-label="Tips for submitting helpful inquiries" className="mb-12">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
            <h2 className="text-base font-bold text-slate-900 sm:text-lg dark:text-slate-100">
              Tips for Faster Inquiries
            </h2>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
              To help us answer your message as quickly and accurately as possible, consider including:
            </p>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-700 sm:text-sm dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 font-mono text-[10px] font-bold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                  1
                </span>
                <span>
                  <strong>For bug reports:</strong> Your browser name and version (e.g., Chrome, Safari, Firefox), device type (Desktop, iOS, Android), and steps to reproduce the issue.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 font-mono text-[10px] font-bold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                  2
                </span>
                <span>
                  <strong>For audio decoder issues:</strong> Audio file format (.wav or .mp3), recording sample rate, and approximate Morse transmission WPM speed.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 font-mono text-[10px] font-bold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                  3
                </span>
                <span>
                  <strong>For curriculum questions:</strong> The lesson number or specific character sequence in question.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Pre-Footer Action Banner */}
        <section aria-label="Explore other platform resources" className="rounded-3xl border border-teal-200/80 bg-gradient-to-br from-teal-50/90 via-white to-teal-50/40 p-8 text-center shadow-lg shadow-teal-900/5 sm:p-10 dark:border-teal-900/60 dark:from-slate-900 dark:via-[#0B1220] dark:to-teal-950/30">
          <div className="mx-auto max-w-xl">
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              Ready to Practice?
            </span>
            <h2 className="mt-3 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
              Explore Our Free Morse Code Utilities
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
              All tools run 100% in your browser with zero registration or tracking.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-teal-800 sm:text-sm dark:bg-teal-400 dark:text-slate-950 dark:hover:bg-teal-300"
              >
                Morse Translator &rarr;
              </Link>
              <Link
                href="/learn-morse-code"
                className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                10-Lesson Course &rarr;
              </Link>
              <Link
                href="/morse-code-alphabet"
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

