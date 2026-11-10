'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error locally to browser console for debugging
    console.error('Unhandled platform error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center dark:bg-[#0B1220]">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-xs max-w-lg dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-slate-100">
          Something went wrong
        </h2>

        <p className="mt-2 text-xs text-slate-600 leading-relaxed dark:text-slate-400">
          An unexpected client error occurred. Your translation engine and browser storage remain intact.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="touch-target rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="touch-target inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

