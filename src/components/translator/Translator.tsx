'use client';

import { useState, useId, useEffect } from 'react';
import Link from 'next/link';
import type { TranslationDirection, TranslationResult } from '@/types';
import { encodeTextToMorse, decodeMorseToText, MAX_INPUT_LENGTH, calculateMorseTiming } from '@/lib/morse';
import { AudioPlayer } from '@/features/audio/AudioPlayer';

export function Translator() {
  const [direction, setDirection] = useState<TranslationDirection>('text-to-morse');
  const [input, setInput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  const inputId = useId();
  const outputId = useId();

  // Read URL query params on client mount (safe for static prerendering / cacheComponents)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const textParam = params.get('text');
      const morseParam = params.get('morse');

      if (textParam) {
        queueMicrotask(() => {
          setDirection('text-to-morse');
          setInput(textParam.slice(0, MAX_INPUT_LENGTH));
        });
      } else if (morseParam) {
        queueMicrotask(() => {
          setDirection('morse-to-text');
          setInput(morseParam.slice(0, MAX_INPUT_LENGTH));
        });
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  // Pure deterministic evaluation using our pure Morse engine
  const result: TranslationResult =
    direction === 'text-to-morse'
      ? encodeTextToMorse(input, MAX_INPUT_LENGTH)
      : decodeMorseToText(input, MAX_INPUT_LENGTH);

  const activeMorseForPlayback = direction === 'text-to-morse' ? result.output : input;

  // Calculate live telemetry statistics
  const morseString = direction === 'text-to-morse' ? result.output : input;
  const dotCount = (morseString.match(/\./g) || []).length;
  const dashCount = (morseString.match(/-/g) || []).length;
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  
  // Estimate transmission duration in seconds at standard 15 WPM (80ms dot, 240ms dash)
  const defaultTiming = calculateMorseTiming(15);
  const estimatedSeconds = ((dotCount * defaultTiming.dotDurationMs + dashCount * defaultTiming.dashDurationMs) / 1000).toFixed(1);

  /**
   * Direction Switch Rule (PRD FR-007):
   * Leaves current input string unchanged and re-evaluates it under the new mode.
   * Does NOT copy previous output into input.
   */
  const handleToggleDirection = () => {
    setDirection((prev) => (prev === 'text-to-morse' ? 'morse-to-text' : 'text-to-morse'));
    setCopied(false);
    setShared(false);
    setCopyError(null);
  };

  const handleClear = () => {
    setInput('');
    setCopied(false);
    setShared(false);
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

  const handleShare = async () => {
    if (!input.trim()) return;

    const currentUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
    const shareParamKey = direction === 'text-to-morse' ? 'text' : 'morse';
    const shareUrl = `${currentUrl}?${shareParamKey}=${encodeURIComponent(input.slice(0, 500))}`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Morse Code Translation',
          text: direction === 'text-to-morse'
            ? `"${input}" in Morse code: ${result.output}`
            : `Morse code translation: ${result.output}`,
          url: shareUrl,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2500);
        return;
      } catch {
        // User cancelled share or share failed; fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } catch {
      setCopyError('Unable to copy share link automatically.');
      setTimeout(() => setCopyError(null), 4000);
    }
  };

  const loadSample = (sample: string) => {
    setInput(sample);
    setCopied(false);
    setShared(false);
  };

  return (
    <section className="w-full" aria-label="Morse Code Translator">
      <h2 className="sr-only">Interactive Translator Tool</h2>

      {/* Main Studio Console Container */}
      <div className="studio-workbench overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
        {/* Subtle accent bar at the top */}
        <div
          aria-hidden="true"
          className="h-1 w-full bg-gradient-to-r from-teal-600 via-teal-500 to-amber-500 dark:from-teal-400 dark:via-teal-300 dark:to-amber-400"
        />

        {/* Top Command Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/90 bg-slate-50/90 px-4 py-3 sm:px-6 dark:border-slate-800 dark:bg-slate-950/80">
          <div className="flex flex-wrap items-center gap-3">
            <span className="hidden text-xs font-bold uppercase tracking-wider text-slate-500 sm:inline-block dark:text-slate-400">
              Direction:
            </span>
            <div
              role="group"
              aria-label="Translation mode"
              className="inline-flex rounded-xl border border-slate-300/80 bg-white p-1 shadow-2xs dark:border-slate-700 dark:bg-slate-900"
            >
              <button
                type="button"
                onClick={() => {
                  setDirection('text-to-morse');
                  setCopied(false);
                  setShared(false);
                }}
                aria-pressed={direction === 'text-to-morse'}
                className={`btn-tactile touch-target inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus sm:text-sm ${
                  direction === 'text-to-morse'
                    ? 'bg-teal-700 text-white shadow-xs dark:bg-teal-400 dark:text-slate-950'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                }`}
              >
                <span>Text</span>
                <span aria-hidden="true" className="font-mono text-xs opacity-75">&rarr;</span>
                <span>Morse</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDirection('morse-to-text');
                  setCopied(false);
                  setShared(false);
                }}
                aria-pressed={direction === 'morse-to-text'}
                className={`btn-tactile touch-target inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus sm:text-sm ${
                  direction === 'morse-to-text'
                    ? 'bg-teal-700 text-white shadow-xs dark:bg-teal-400 dark:text-slate-950'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                }`}
              >
                <span>Morse</span>
                <span aria-hidden="true" className="font-mono text-xs opacity-75">&rarr;</span>
                <span>Text</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="hidden items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 md:inline-flex dark:border-teal-900/60 dark:bg-teal-950/60 dark:text-teal-300">
              <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" aria-hidden="true" />
              Browser-Local Engine
            </span>

            {/* Switch Direction Action Button */}
            <button
              type="button"
              onClick={handleToggleDirection}
              className="btn-tactile touch-target inline-flex items-center gap-1.5 sm:gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-2xs transition-all hover:border-teal-600 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus sm:px-4 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-teal-400 dark:hover:bg-slate-700"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
              <span className="hidden min-[400px]:inline">Switch Direction</span>
              <span className="min-[400px]:hidden">Switch</span>
            </button>
          </div>
        </div>

        {/* Dual Split-Pane Studio Layout */}
        <div className="grid grid-cols-1 divide-y divide-slate-200 lg:grid-cols-2 lg:divide-x lg:divide-y-0 dark:divide-slate-800">
          {/* LEFT: INPUT PANEL */}
          <div className="flex flex-col bg-white p-4 sm:p-6 dark:bg-slate-900">
            {/* Header: Fixed h-9 for Exact Pixel-Level Symmetry */}
            <div className="mb-3 flex h-9 items-center justify-between gap-2">
              <label
                htmlFor={inputId}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-2.5 w-2.5 rounded-full bg-teal-600 dark:bg-teal-400"
                />
                {direction === 'text-to-morse' ? (
                  <>
                    <span className="hidden sm:inline">Plain Text Input</span>
                    <span className="sm:hidden">Text Input</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Morse Code Input</span>
                    <span className="sm:hidden">Morse Input</span>
                  </>
                )}
              </label>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="inline-flex h-7 items-center rounded-lg border border-slate-200 bg-slate-50 px-2 font-mono text-[11px] font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300">
                  {input.length.toLocaleString()} / {MAX_INPUT_LENGTH.toLocaleString()}
                </span>
                {input.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="btn-tactile touch-target inline-flex h-7 items-center rounded-lg border border-red-200/80 bg-red-50/60 px-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Input Box: Fixed h-[210px] Identical to Output Box */}
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
              placeholder={
                direction === 'text-to-morse'
                  ? 'Type plain text here (e.g. SOS, HELLO WORLD)...'
                  : 'Enter dots (.) and dashes (-). Use space between letters, and / between words (e.g. ... --- ...)...'
              }
              className={`h-[210px] w-full resize-none rounded-2xl border border-slate-300/90 bg-slate-50/70 p-4 text-base leading-relaxed text-slate-900 placeholder-slate-400 transition-all overflow-y-auto focus:border-teal-700 focus:bg-white focus:outline-hidden focus:ring-4 focus:ring-teal-700/10 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-teal-400 dark:focus:bg-slate-950 dark:focus:ring-teal-400/15 ${
                direction === 'morse-to-text' ? 'font-mono tracking-wider' : 'font-sans'
              }`}
              aria-describedby={result.hasWarnings ? 'translator-warnings' : undefined}
            />

            {/* Quick sample chips footer: Mirroring Right Footer Geometry */}
            <div className="mt-3 flex min-h-[32px] flex-wrap items-center justify-between gap-2 border-t border-slate-200/80 pt-2.5 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Quick Samples:</span>
                {direction === 'text-to-morse' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => loadSample('SOS')}
                      className="btn-tactile rounded-lg border border-slate-300/80 bg-white px-2.5 py-1 font-mono text-xs font-bold text-slate-800 shadow-2xs transition-all hover:border-teal-500 hover:text-teal-700 hover:shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:text-teal-300"
                    >
                      SOS
                    </button>
                    <button
                      type="button"
                      onClick={() => loadSample('HELLO WORLD')}
                      className="btn-tactile rounded-lg border border-slate-300/80 bg-white px-2.5 py-1 font-mono text-xs font-bold text-slate-800 shadow-2xs transition-all hover:border-teal-500 hover:text-teal-700 hover:shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:text-teal-300"
                    >
                      HELLO WORLD
                    </button>
                    <button
                      type="button"
                      onClick={() => loadSample('CQ DE MORSE')}
                      className="btn-tactile rounded-lg border border-slate-300/80 bg-white px-2.5 py-1 font-mono text-xs font-bold text-slate-800 shadow-2xs transition-all hover:border-teal-500 hover:text-teal-700 hover:shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:text-teal-300"
                      title="Standard amateur radio calling phrase"
                    >
                      CQ DE MORSE
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => loadSample('... --- ...')}
                      className="btn-tactile rounded-lg border border-slate-300/80 bg-white px-2.5 py-1 font-mono text-xs font-bold text-slate-800 shadow-2xs transition-all hover:border-teal-500 hover:text-teal-700 hover:shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:text-teal-300"
                    >
                      ... --- ...
                    </button>
                    <button
                      type="button"
                      onClick={() => loadSample('.... . .-.. .-.. --- / .-- --- .-. .-.. -..')}
                      className="btn-tactile rounded-lg border border-slate-300/80 bg-white px-2.5 py-1 font-mono text-xs font-bold text-slate-800 shadow-2xs transition-all hover:border-teal-500 hover:text-teal-700 hover:shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:text-teal-300"
                    >
                      HELLO WORLD (Morse)
                    </button>
                  </>
                )}
              </div>
              <span className="hidden text-[11px] text-slate-500 sm:inline dark:text-slate-400">
                <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold dark:border-slate-700 dark:bg-slate-800">
                  Esc
                </kbd>{' '}
                to clear
              </span>
            </div>
          </div>

          {/* RIGHT: OUTPUT PANEL */}
          <div className="flex flex-col bg-slate-50/70 p-4 sm:p-6 dark:bg-slate-900/60">
            {/* Header: Fixed h-9 for Exact Pixel-Level Symmetry */}
            <div className="mb-3 flex h-9 items-center justify-between gap-2">
              <label
                htmlFor={outputId}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-500 dark:bg-amber-400"
                />
                {direction === 'text-to-morse' ? (
                  <>
                    <span className="hidden sm:inline">International Morse Output</span>
                    <span className="sm:hidden">Morse Output</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Plain Text Output</span>
                    <span className="sm:hidden">Text Output</span>
                  </>
                )}
              </label>

              {/* Action Buttons: Share & Copy */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Share Button (Web Share API + Link Fallback) */}
                <button
                  type="button"
                  onClick={handleShare}
                  disabled={!input.trim()}
                  className={`btn-tactile inline-flex h-7 items-center gap-1.5 rounded-lg px-2.5 sm:px-3 text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus ${
                    shared
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : input.trim()
                      ? 'border border-slate-300 bg-white text-slate-800 shadow-2xs hover:border-teal-600 hover:text-teal-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:text-teal-300'
                      : 'cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-500'
                  }`}
                  title="Share this translation via link or social apps"
                >
                  {shared ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      <span>Share</span>
                    </>
                  )}
                </button>

                {/* Copy Output Button */}
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!result.output}
                  className={`btn-tactile inline-flex h-7 items-center gap-1.5 rounded-lg px-2.5 sm:px-3.5 text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus ${
                    copied
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : result.output
                      ? 'bg-teal-700 text-white shadow-xs hover:bg-teal-800 active:scale-[0.98] dark:bg-teal-400 dark:text-slate-950 dark:hover:bg-teal-300'
                      : 'cursor-not-allowed border border-slate-300 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-500'
                  }`}
                >
                  {copied ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span className="hidden sm:inline">Copy Output</span>
                      <span className="sm:hidden">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Output Box: Fixed h-[210px] Identical to Input Box */}
            <div
              id={outputId}
              className={`h-[210px] w-full overflow-y-auto rounded-2xl border border-slate-300/90 bg-white p-4 leading-relaxed text-slate-900 select-all shadow-2xs dark:border-slate-700/90 dark:bg-slate-950/80 dark:text-slate-100 ${
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

            {/* Screen-reader live region */}
            <div aria-live="polite" className="sr-only">
              {copied && 'Output successfully copied to clipboard.'}
              {shared && 'Shareable link copied to clipboard.'}
              {copyError && copyError}
            </div>

            {/* Error notice if clipboard fails */}
            {copyError && (
              <p className="mt-2 text-xs font-semibold text-red-600 dark:text-red-400">{copyError}</p>
            )}

            {/* Live Morse Statistics / Telemetry Strip: Mirroring Left Footer Geometry */}
            <div className="mt-3 flex min-h-[32px] flex-wrap items-center justify-between gap-2 border-t border-slate-200/80 pt-2.5 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
                <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400" />
                  {dotCount} dots
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                  <span className="h-1.5 w-3 rounded-full bg-teal-600 dark:bg-teal-400" />
                  {dashCount} dashes
                </span>
                <span className="text-slate-500">
                  {wordCount} {wordCount === 1 ? 'word' : 'words'}
                </span>
                {input.trim().length > 0 && (
                  <span className="rounded bg-teal-50 px-1.5 py-0.5 font-bold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                    ~{estimatedSeconds}s audio @ 15 WPM
                  </span>
                )}
              </div>
              <span className="font-semibold text-slate-500 dark:text-slate-400">Zero Analytics / Private</span>
            </div>
          </div>
        </div>

        {/* Integrated Audio Dock with Loop & Playback Controls */}
        <AudioPlayer morse={activeMorseForPlayback} />
      </div>

      {/* Diagnostics / Warning Alerts */}
      {result.hasWarnings && (
        <div
          id="translator-warnings"
          role="status"
          className="mt-5 rounded-2xl border border-amber-300 bg-amber-50 p-4.5 shadow-sm dark:border-amber-800/80 dark:bg-amber-950/40"
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
                Notice: {result.warnings.length}{' '}
                {result.warnings.length === 1 ? 'item requires attention' : 'items require attention'}
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

      {/* Contextual Quick Tool Links */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2.5 rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3 text-xs text-slate-600 backdrop-blur-xs shadow-2xs dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
        <span className="font-semibold text-slate-900 dark:text-slate-100">Popular Guides &amp; Tools:</span>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Link
            href="/morse-code-sos"
            className="font-medium text-rose-700 transition-colors hover:text-rose-900 hover:underline dark:text-rose-400 dark:hover:text-rose-300"
          >
            SOS Beacon &rarr;
          </Link>
          <span className="text-slate-300 dark:text-slate-700">&bull;</span>
          <Link
            href="/morse-code-sheet"
            className="font-medium text-teal-700 transition-colors hover:text-teal-900 hover:underline dark:text-teal-400 dark:hover:text-teal-300"
          >
            Printable Sheet &rarr;
          </Link>
          <span className="text-slate-300 dark:text-slate-700">&bull;</span>
          <Link
            href="/morse-code-audio-decoder"
            className="font-medium text-teal-700 transition-colors hover:text-teal-900 hover:underline dark:text-teal-400 dark:hover:text-teal-300"
          >
            Audio Decoder &rarr;
          </Link>
          <span className="text-slate-300 dark:text-slate-700">&bull;</span>
          <Link
            href="/morse-code-practice"
            className="font-medium text-teal-700 transition-colors hover:text-teal-900 hover:underline dark:text-teal-400 dark:hover:text-teal-300"
          >
            Speed Drills &rarr;
          </Link>
          <span className="text-slate-300 dark:text-slate-700">&bull;</span>
          <Link
            href="/morse-code-alphabet"
            className="font-medium text-teal-700 transition-colors hover:text-teal-900 hover:underline dark:text-teal-400 dark:hover:text-teal-300"
          >
            Alphabet Chart &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
