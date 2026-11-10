'use client';

import { useState, useId } from 'react';
import type { TranslationDirection, TranslationResult } from '@/types';
import { encodeTextToMorse, decodeMorseToText, MAX_INPUT_LENGTH } from '@/lib/morse';
import { AudioPlayer } from '@/features/audio/AudioPlayer';

export function Translator() {
  const [direction, setDirection] = useState<TranslationDirection>('text-to-morse');
  const [input, setInput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  const inputId = useId();
  const outputId = useId();

  // Pure deterministic evaluation using our pure Morse engine
  const result: TranslationResult =
    direction === 'text-to-morse'
      ? encodeTextToMorse(input, MAX_INPUT_LENGTH)
      : decodeMorseToText(input, MAX_INPUT_LENGTH);

  const activeMorseForPlayback = direction === 'text-to-morse' ? result.output : input;

  /**
   * Direction Switch Rule (PRD FR-007):
   * Leaves current input string unchanged and re-evaluates it under the new mode.
   * Does NOT copy previous output into input.
   */
  const handleToggleDirection = () => {
    setDirection((prev) => (prev === 'text-to-morse' ? 'morse-to-text' : 'text-to-morse'));
    setCopied(false);
    setCopyError(null);
  };

  const handleClear = () => {
    setInput('');
    setCopied(false);
    setCopyError(null);
  };

  const handleCopy = async () => {
    if (!result.output) return;

    try {
      await navigator.clipboard.writeText(result.output);
      setCopied(true);
      setCopyError(null);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError('Unable to access clipboard automatically. Please select and copy manually.');
      setTimeout(() => setCopyError(null), 4000);
    }
  };

  const loadSample = (sample: string) => {
    setInput(sample);
    setCopied(false);
  };

  return (
    <section className="w-full" aria-label="Morse Code Translator">
      <h2 className="sr-only">Interactive Translator Tool</h2>
      {/* Mode Selector & Controls Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Mode:</span>
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => {
                setDirection('text-to-morse');
                setCopied(false);
              }}
              className={`touch-target rounded-md px-3.5 py-1.5 text-xs font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus sm:text-sm ${
                direction === 'text-to-morse'
                  ? 'border border-slate-200/80 bg-white text-teal-800 shadow-xs font-bold dark:border-slate-700 dark:bg-slate-900 dark:text-teal-300'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Text &rarr; Morse
            </button>
            <button
              type="button"
              onClick={() => {
                setDirection('morse-to-text');
                setCopied(false);
              }}
              className={`touch-target rounded-md px-3.5 py-1.5 text-xs font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus sm:text-sm ${
                direction === 'morse-to-text'
                  ? 'border border-slate-200/80 bg-white text-teal-800 shadow-xs font-bold dark:border-slate-700 dark:bg-slate-900 dark:text-teal-300'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Morse &rarr; Text
            </button>
          </div>
        </div>

        {/* Direction Switch Action Button */}
        <button
          type="button"
          onClick={handleToggleDirection}
          className="touch-target inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:text-sm shadow-2xs"
          title="Switch direction while preserving current input"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-teal-700 dark:text-teal-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          Switch Direction
        </button>
      </div>

      {/* Main Translation Grid (Side-by-side on desktop, stacked on mobile) */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* INPUT PANEL */}
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between">
            <label htmlFor={inputId} className="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-100">
              {direction === 'text-to-morse' ? 'Plain Text Input' : 'Morse Code Input'}
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                {input.length.toLocaleString()} / {MAX_INPUT_LENGTH.toLocaleString()}
              </span>
              {input.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="touch-target text-xs font-semibold text-slate-600 hover:text-red-700 dark:text-slate-400 dark:hover:text-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <textarea
            id={inputId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape' && input.length > 0) {
                e.preventDefault();
                handleClear();
              }
            }}
            rows={7}
            placeholder={
              direction === 'text-to-morse'
                ? 'Type plain text here (e.g. SOS, HELLO WORLD)...'
                : 'Enter dots (.) and dashes (-). Use space between letters, and / between words (e.g. ... --- ...)...'
            }
            className={`w-full flex-1 resize-y rounded-lg border border-slate-300 bg-slate-50/60 p-3.5 text-slate-900 placeholder-slate-400 focus:border-teal-700 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-teal-400 dark:focus:bg-slate-900 ${
              direction === 'morse-to-text' ? 'font-mono tracking-wider' : 'font-sans'
            }`}
            aria-describedby={result.hasWarnings ? 'translator-warnings' : undefined}
          />

          {/* Quick sample chips for beginners */}
          <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-300">Quick Examples:</span>
            {direction === 'text-to-morse' ? (
              <>
                <button
                  type="button"
                  onClick={() => loadSample('SOS')}
                  className="rounded border border-slate-200 bg-slate-100 px-2.5 py-1 font-mono font-semibold text-slate-800 transition-colors hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  SOS
                </button>
                <button
                  type="button"
                  onClick={() => loadSample('HELLO WORLD')}
                  className="rounded border border-slate-200 bg-slate-100 px-2.5 py-1 font-mono font-semibold text-slate-800 transition-colors hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  HELLO WORLD
                </button>
                <button
                  type="button"
                  onClick={() => loadSample('A/B')}
                  className="rounded border border-slate-200 bg-slate-100 px-2.5 py-1 font-mono font-semibold text-slate-800 transition-colors hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  title="Test literal slash"
                >
                  A/B
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => loadSample('... --- ...')}
                  className="rounded border border-slate-200 bg-slate-100 px-2.5 py-1 font-mono font-semibold text-slate-800 transition-colors hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  ... --- ...
                </button>
                <button
                  type="button"
                  onClick={() => loadSample('.... . .-.. .-.. --- / .-- --- .-. .-.. -..')}
                  className="rounded border border-slate-200 bg-slate-100 px-2.5 py-1 font-mono font-semibold text-slate-800 transition-colors hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  HELLO WORLD (Morse)
                </button>
              </>
            )}
          </div>
        </div>

        {/* OUTPUT PANEL */}
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between">
            <label htmlFor={outputId} className="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-100">
              {direction === 'text-to-morse' ? 'International Morse Output' : 'Plain Text Output'}
            </label>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopy}
              disabled={!result.output}
              className={`touch-target inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus ${
                copied
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : result.output
                  ? 'bg-teal-700 text-white shadow-xs hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500'
                  : 'cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-600'
              }`}
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Output
                </>
              )}
            </button>
          </div>

          <div
            id={outputId}
            className={`w-full flex-1 overflow-auto rounded-lg border border-slate-300 bg-slate-50/60 p-3.5 leading-relaxed text-slate-900 select-all dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 min-h-[160px] ${
              direction === 'text-to-morse' ? 'font-mono text-base tracking-widest' : 'font-sans text-base'
            }`}
            tabIndex={0}
            role="region"
            aria-label="Translation output area"
          >
            {result.output ? (
              result.output
            ) : (
              <span className="text-slate-400 select-none dark:text-slate-500">
                Translation will appear here in real-time...
              </span>
            )}
          </div>

          {/* Accessible Screen-reader status announcement */}
          <div aria-live="polite" className="sr-only">
            {copied && 'Output successfully copied to clipboard.'}
            {copyError && copyError}
          </div>

          {/* Fallback error notice if clipboard fails */}
          {copyError && (
            <p className="mt-2 text-xs font-semibold text-red-600 dark:text-red-400">{copyError}</p>
          )}

          {/* Legend helper */}
          <div className="mt-3 flex items-center justify-between pt-2 text-xs text-slate-600 dark:text-slate-400">
            {direction === 'text-to-morse' ? (
              <span>
                Word separator: <code className="rounded border border-slate-200 bg-slate-100 px-1 py-0.5 font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">/</code>
              </span>
            ) : (
              <span>Letters: spaces &bull; Words: /</span>
            )}
            <span className="font-semibold text-emerald-800 dark:text-emerald-400">100% Client-Side</span>
          </div>
        </div>
      </div>

      {/* Audio Playback & Visual Timing Component */}
      <AudioPlayer morse={activeMorseForPlayback} />

      {/* Warnings & Diagnostics Panel (PRD F-004 & F-005) - Crisp, accessible amber styling */}
      {result.hasWarnings && (
        <div
          id="translator-warnings"
          role="status"
          className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4.5 shadow-xs dark:border-amber-800/80 dark:bg-amber-950/40"
        >
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-amber-950 dark:text-amber-200">
                Notice: {result.warnings.length} {result.warnings.length === 1 ? 'item requires attention' : 'items require attention'}
              </h3>
              <ul className="mt-2 space-y-1 text-xs font-medium text-amber-900 dark:text-amber-300">
                {result.warnings.map((warning) => (
                  <li key={warning.id} className="flex items-center gap-1.5">
                    &bull; {warning.message}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-amber-800 dark:text-amber-400">
                Supported characters include uppercase Latin letters (A–Z), digits (0–9), and 18 standard punctuation symbols.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
