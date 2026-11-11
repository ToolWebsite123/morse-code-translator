'use client';

import { useState } from 'react';

interface CopyEmailButtonProps {
  email: string;
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback: select text if possible or do nothing
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Email address copied' : `Copy ${email} to clipboard`}
      className="btn-tactile touch-target inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:border-teal-500 hover:bg-slate-50 hover:text-teal-900 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:bg-slate-700 dark:hover:text-teal-300"
    >
      {copied ? (
        <>
          <svg className="h-4 w-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-emerald-700 dark:text-emerald-300">Copied to Clipboard!</span>
        </>
      ) : (
        <>
          <svg className="h-4 w-4 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy Email Address</span>
        </>
      )}
    </button>
  );
}

