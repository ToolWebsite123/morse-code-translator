import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'Page Not Found (404)',
  description: 'The requested page could not be found. Return to the Morse code translator, reference chart, or learning hub.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B1220]">
      <Header />

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <div className="inline-flex items-center justify-center rounded-xl border border-teal-200 bg-teal-50 px-4 py-2 font-mono text-sm font-bold text-teal-800 dark:border-teal-900/60 dark:bg-teal-950/40 dark:text-teal-300">
          ... --- ... (404 Error)
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          Page Not Found
        </h1>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
          We couldn&apos;t find the signal you were looking for. The link may be broken, or the page may have been moved.
        </p>

        {/* Helpful Recovery Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="touch-target inline-flex items-center rounded-lg bg-teal-700 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 sm:text-sm"
          >
            Go to Translator &rarr;
          </Link>
          <Link
            href="/learn"
            className="touch-target inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:text-sm"
          >
            Learning Hub
          </Link>
          <Link
            href="/reference"
            className="touch-target inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:text-sm"
          >
            Alphabet Chart
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

