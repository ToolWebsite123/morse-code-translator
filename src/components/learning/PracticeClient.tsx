'use client';

import { useState, useEffect, useRef } from 'react';
import type { PracticeDirection, PracticeQuestion, PracticeStreak } from '@/types/learning';
import { generatePracticeQueue, evaluatePracticeAnswer } from '@/lib/learning/practice';
import { getLearningProgress, recordPracticeAttempt, getPracticeStreak } from '@/lib/storage/progress';
import { AudioPreviewButton } from './AudioPreviewButton';

function createQueue(
  direction: PracticeDirection,
  category: 'all' | 'letter' | 'number' | 'punctuation' | 'weak',
  shuffle: boolean = true
): PracticeQuestion[] {
  const progress = getLearningProgress();
  const weakList = Object.entries(progress.practiceStats.weakCharacters)
    .filter(([, stats]) => stats.attempts > 1 && stats.correct / stats.attempts < 0.7)
    .map(([char]) => char);

  return generatePracticeQueue(
    {
      direction,
      category,
      weakCharacters: weakList,
    },
    12,
    shuffle
  );
}

export function PracticeClient() {
  const [direction, setDirection] = useState<PracticeDirection>('morse-to-text');
  const [category, setCategory] = useState<'all' | 'letter' | 'number' | 'punctuation' | 'weak'>('all');
  const [queue, setQueue] = useState<PracticeQuestion[]>(() => createQueue('morse-to-text', 'all', false));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastEvaluation, setLastEvaluation] = useState<{ isCorrect: boolean; normalizedUser: string; normalizedExpected: string } | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState<PracticeStreak>({ current: 0, longest: 0, lastDate: '' });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setStreak(getPracticeStreak());
    });
  }, []);

  const resetSessionWith = (
    newDirection: PracticeDirection,
    newCategory: 'all' | 'letter' | 'number' | 'punctuation' | 'weak'
  ) => {
    const newQueue = createQueue(newDirection, newCategory);
    setQueue(newQueue);
    setCurrentIndex(0);
    setUserAnswer('');
    setIsSubmitted(false);
    setLastEvaluation(null);
    setScore({ correct: 0, total: 0 });
  };

  const handleDirectionChange = (newDir: PracticeDirection) => {
    setDirection(newDir);
    resetSessionWith(newDir, category);
  };

  const handleCategoryChange = (newCat: 'all' | 'letter' | 'number' | 'punctuation' | 'weak') => {
    setCategory(newCat);
    resetSessionWith(direction, newCat);
  };

  useEffect(() => {
    if (!isSubmitted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, isSubmitted]);

  const currentQuestion = queue[currentIndex];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentQuestion || isSubmitted || !userAnswer.trim()) return;

    const evalResult = evaluatePracticeAnswer(userAnswer, currentQuestion.expectedAnswer, direction);
    setLastEvaluation(evalResult);
    setIsSubmitted(true);

    // Update session score
    setScore((prev) => ({
      correct: prev.correct + (evalResult.isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    // Record in local progress
    const charToTrack = direction === 'text-to-morse' ? currentQuestion.prompt : currentQuestion.expectedAnswer;
    recordPracticeAttempt(charToTrack, evalResult.isCorrect);
    setStreak(getPracticeStreak());
  };

  const handleNext = () => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer('');
      setIsSubmitted(false);
      setLastEvaluation(null);
    } else {
      // Re-shuffle a fresh queue when finished
      const progress = getLearningProgress();
      const weakList = Object.entries(progress.practiceStats.weakCharacters)
        .filter(([, stats]) => stats.attempts > 1 && stats.correct / stats.attempts < 0.7)
        .map(([char]) => char);

      const freshQueue = generatePracticeQueue({ direction, category, weakCharacters: weakList }, 12);
      setQueue(freshQueue);
      setCurrentIndex(0);
      setUserAnswer('');
      setIsSubmitted(false);
      setLastEvaluation(null);
    }
  };

  const appendSymbol = (symbol: string) => {
    setUserAnswer((prev) => prev + symbol);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="studio-workbench overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
      {/* Top Accent Gradient Bar */}
      <div
        aria-hidden="true"
        className="h-1 w-full bg-gradient-to-r from-teal-600 via-teal-500 to-amber-500 dark:from-teal-400 dark:via-teal-300 dark:to-amber-400"
      />

      {/* Unified Command & Filter Deck */}
      <div className="border-b border-slate-200/90 bg-slate-50/80 p-3.5 sm:p-5 dark:border-slate-800 dark:bg-slate-950/70">
        {/* Row 1: Direction Mode Switcher & Session Telemetry */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Direction Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Mode:
            </span>
            <div
              role="group"
              aria-label="Practice training direction"
              className="inline-flex flex-wrap sm:flex-nowrap rounded-xl border border-slate-300/80 bg-white p-1 shadow-2xs dark:border-slate-700 dark:bg-slate-900"
            >
              <button
                type="button"
                onClick={() => handleDirectionChange('morse-to-text')}
                aria-pressed={direction === 'morse-to-text'}
                className={`btn-tactile touch-target inline-flex items-center gap-1 sm:gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus sm:text-sm ${
                  direction === 'morse-to-text'
                    ? 'bg-teal-700 text-white shadow-xs dark:bg-teal-400 dark:text-slate-950'
                    : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100'
                }`}
              >
                <span>Morse</span>
                <span aria-hidden="true" className="font-mono text-xs opacity-75">&rarr;</span>
                <span>Text</span>
              </button>
              <button
                type="button"
                onClick={() => handleDirectionChange('text-to-morse')}
                aria-pressed={direction === 'text-to-morse'}
                className={`btn-tactile touch-target inline-flex items-center gap-1 sm:gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus sm:text-sm ${
                  direction === 'text-to-morse'
                    ? 'bg-teal-700 text-white shadow-xs dark:bg-teal-400 dark:text-slate-950'
                    : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100'
                }`}
              >
                <span>Text</span>
                <span aria-hidden="true" className="font-mono text-xs opacity-75">&rarr;</span>
                <span>Morse</span>
              </button>
              <button
                type="button"
                onClick={() => handleDirectionChange('audio-to-text')}
                aria-pressed={direction === 'audio-to-text'}
                className={`btn-tactile touch-target inline-flex items-center gap-1 sm:gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus sm:text-sm ${
                  direction === 'audio-to-text'
                    ? 'bg-teal-700 text-white shadow-xs dark:bg-teal-400 dark:text-slate-950'
                    : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <span>Audio</span>
                <span aria-hidden="true" className="font-mono text-xs opacity-75">&rarr;</span>
                <span>Text</span>
              </button>
            </div>
          </div>

          {/* Live Session Telemetry Readout */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900 shadow-2xs dark:border-amber-900/60 dark:bg-amber-950/60 dark:text-amber-300"
              title="Daily Practice Habit Streak (Stored locally on your device)"
            >
              <span aria-hidden="true">🔥</span>
              <span>{streak.current > 0 ? `${streak.current}d Streak` : 'Daily Streak'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-xs font-semibold text-slate-700 shadow-2xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              Drill {currentIndex + 1} / {queue.length}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 dark:border-teal-800/80 dark:bg-teal-950/70 dark:text-teal-300">
              Score: {score.correct} / {score.total}
              {score.total > 0 && (
                <span className="font-mono text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                  ({Math.round((score.correct / score.total) * 100)}%)
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Row 2: Category Filter Selector & Reset Action */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 pt-3 dark:border-slate-800/70">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Pool:
            </span>
            <div
              role="tablist"
              aria-label="Character categories"
              className="inline-flex flex-wrap items-center rounded-xl border border-slate-300/80 bg-white p-1 shadow-2xs dark:border-slate-700 dark:bg-slate-900"
            >
              {(
                [
                  { key: 'all', label: 'All (54)' },
                  { key: 'letter', label: 'Letters (A–Z)' },
                  { key: 'number', label: 'Numbers (0–9)' },
                  { key: 'punctuation', label: 'Punctuation' },
                  { key: 'weak', label: 'Weak Focus' },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  role="tab"
                  aria-selected={category === cat.key}
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`btn-tactile touch-target inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                    category === cat.key
                      ? 'bg-teal-700 text-white shadow-xs dark:bg-teal-400 dark:text-slate-950'
                      : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100'
                  }`}
                >
                  {cat.key === 'weak' && (
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        category === 'weak' ? 'bg-amber-300' : 'bg-amber-500'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Shuffle / New Queue Action */}
          <button
            type="button"
            onClick={() => resetSessionWith(direction, category)}
            className="btn-tactile touch-target inline-flex items-center gap-1.5 rounded-xl border border-slate-300/80 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition-all hover:border-teal-600 hover:bg-slate-50 hover:text-teal-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-teal-400 dark:hover:text-teal-200"
            title="Start a fresh practice queue"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 text-teal-700 dark:text-teal-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>New Set</span>
          </button>
        </div>
      </div>

      {/* Main Flashcard Drill Stage */}
      {currentQuestion ? (
        <div className="p-4 sm:p-6 md:p-8">
          {/* Mode Guidance & Prompt Stage */}
          <div className="mx-auto max-w-lg text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200/90 bg-teal-50 px-3.5 py-1 text-xs font-bold text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-400" aria-hidden="true" />
              {direction === 'text-to-morse'
                ? 'Convert this character to Morse code'
                : direction === 'audio-to-text'
                ? 'Listen and identify the character'
                : 'Identify this Morse sequence'}
            </span>

            {/* Elevated Prompt Showcase */}
            <div className="my-6 flex items-center justify-center gap-4">
              <div className="inline-flex min-h-[110px] min-w-[160px] items-center justify-center rounded-2xl border border-slate-200/90 bg-slate-50/80 px-8 py-5 shadow-xs dark:border-slate-800 dark:bg-slate-950/80">
                <span
                  className={`text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100 ${
                    direction === 'morse-to-text' ? 'font-mono tracking-widest text-teal-700 dark:text-teal-300' : ''
                  }`}
                >
                  {currentQuestion.displayPrompt}
                </span>
              </div>

              {currentQuestion.audioMorse && (
                <div className="flex flex-col items-center gap-1.5">
                  <AudioPreviewButton morse={currentQuestion.audioMorse} label="Play Tone" />
                  <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">15 WPM CW</span>
                </div>
              )}
            </div>
          </div>

          {/* Answer Input Form */}
          <form onSubmit={handleSubmit} className="mx-auto max-w-md">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={isSubmitted}
                  placeholder={
                    direction === 'text-to-morse'
                      ? 'Type dots (.) and dashes (-)...'
                      : 'Type the character (e.g. S)...'
                  }
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50/70 p-4 text-center text-xl font-bold text-slate-900 placeholder-slate-400 transition-all focus:border-teal-700 focus:bg-white focus:outline-hidden focus:ring-4 focus:ring-teal-700/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-teal-400 dark:focus:bg-slate-900 dark:focus:ring-teal-400/15"
                  aria-label="Your answer input"
                />
              </div>

              {/* Virtual On-Screen Dot & Dash Buttons for Mobile Morse Input */}
              {direction === 'text-to-morse' && !isSubmitted && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => appendSymbol('.')}
                    className="btn-tactile touch-target flex-1 rounded-xl border border-slate-300 bg-white py-2.5 font-mono text-xl font-extrabold text-slate-800 shadow-2xs hover:border-teal-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:bg-slate-700"
                    title="Insert dot"
                  >
                    &bull; (Dot)
                  </button>
                  <button
                    type="button"
                    onClick={() => appendSymbol('-')}
                    className="btn-tactile touch-target flex-1 rounded-xl border border-slate-300 bg-white py-2.5 font-mono text-xl font-extrabold text-slate-800 shadow-2xs hover:border-teal-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:bg-slate-700"
                    title="Insert dash"
                  >
                    &mdash; (Dash)
                  </button>
                  <button
                    type="button"
                    onClick={() => appendSymbol(' ')}
                    className="btn-tactile touch-target rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-2xs hover:border-teal-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:bg-slate-700"
                    title="Insert space"
                  >
                    Space
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              {!isSubmitted ? (
                <button
                  type="submit"
                  disabled={!userAnswer.trim()}
                  className="btn-tactile touch-target mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 to-teal-800 py-3 text-sm font-bold text-white shadow-sm transition-all hover:from-teal-800 hover:to-teal-900 disabled:opacity-50 dark:from-teal-400 dark:to-teal-500 dark:text-slate-950 dark:hover:from-teal-300 dark:hover:to-teal-400"
                >
                  <span>Check Answer</span>
                  <span className="hidden text-xs opacity-70 sm:inline">&larr; Enter &crarr;</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  autoFocus
                  className="btn-tactile touch-target mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 to-teal-800 py-3 text-sm font-bold text-white shadow-sm transition-all hover:from-teal-800 hover:to-teal-900 dark:from-teal-400 dark:to-teal-500 dark:text-slate-950 dark:hover:from-teal-300 dark:hover:to-teal-400"
                >
                  <span>{currentIndex < queue.length - 1 ? 'Next Drill' : 'Restart New Session'}</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
              )}
            </div>
          </form>

          {/* Feedback & Explanation Banner */}
          {isSubmitted && lastEvaluation && (
            <div
              role="status"
              className={`mx-auto mt-6 max-w-md rounded-2xl border p-4.5 text-xs transition-all ${
                lastEvaluation.isCorrect
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200'
                  : 'border-rose-300 bg-rose-50 text-rose-950 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-bold text-sm text-white ${
                  lastEvaluation.isCorrect ? 'bg-emerald-600' : 'bg-rose-600'
                }`}>
                  {lastEvaluation.isCorrect ? '✓' : '✗'}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold">
                    {lastEvaluation.isCorrect ? 'Spot on! Correct answer.' : `Incorrect. Expected: ${currentQuestion.expectedAnswer}`}
                  </p>
                  <p className="mt-1 leading-relaxed text-slate-700 dark:text-slate-300">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-10 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            No Qualified Weak Characters Found
          </h3>
          <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            You currently have no characters with &gt;1 attempt and &lt;70% accuracy. Practice other categories to build your local error history!
          </p>
          <button
            type="button"
            onClick={() => setCategory('all')}
            className="btn-tactile touch-target mt-4 inline-flex items-center rounded-xl bg-teal-700 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-teal-800 dark:bg-teal-400 dark:text-slate-950 dark:hover:bg-teal-300"
          >
            Reset Filter to All (54)
          </button>
        </div>
      )}
    </div>
  );
}
