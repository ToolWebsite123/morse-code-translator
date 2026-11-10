'use client';

import { useState, useEffect, useRef } from 'react';
import type { PracticeDirection, PracticeQuestion } from '@/types/learning';
import { generatePracticeQueue, evaluatePracticeAnswer } from '@/lib/learning/practice';
import { getLearningProgress, recordPracticeAttempt } from '@/lib/storage/progress';
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

  const inputRef = useRef<HTMLInputElement>(null);

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
    <div className="w-full">
      {/* Controls Bar: Direction & Category Selectors */}
      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        {/* Direction Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Direction:</span>
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => handleDirectionChange('morse-to-text')}
              className={`touch-target rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                direction === 'morse-to-text'
                  ? 'bg-white text-teal-800 shadow-2xs dark:bg-slate-900 dark:text-teal-300'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Morse &rarr; Text
            </button>
            <button
              type="button"
              onClick={() => handleDirectionChange('text-to-morse')}
              className={`touch-target rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                direction === 'text-to-morse'
                  ? 'bg-white text-teal-800 shadow-2xs dark:bg-slate-900 dark:text-teal-300'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Text &rarr; Morse
            </button>
            <button
              type="button"
              onClick={() => handleDirectionChange('audio-to-text')}
              className={`touch-target rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                direction === 'audio-to-text'
                  ? 'bg-white text-teal-800 shadow-2xs dark:bg-slate-900 dark:text-teal-300'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Audio &rarr; Text
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              { key: 'all', label: 'All' },
              { key: 'letter', label: 'Letters' },
              { key: 'number', label: 'Numbers' },
              { key: 'punctuation', label: 'Punctuation' },
              { key: 'weak', label: 'Weak Focus' },
            ] as const
          ).map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => handleCategoryChange(cat.key)}
              className={`touch-target rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                category === cat.key
                  ? 'bg-teal-700 text-white shadow-xs dark:bg-teal-600'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Flashcard Drill Card */}
      {currentQuestion ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          {/* Card Header & Session Stats */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
              Drill {currentIndex + 1} of {queue.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Score: <strong className="text-teal-800 dark:text-teal-300">{score.correct}</strong> / {score.total}
              </span>
              {score.total > 0 && (
                <span className="text-xs text-slate-500">
                  ({Math.round((score.correct / score.total) * 100)}%)
                </span>
              )}
            </div>
          </div>

          {/* Prompt Display */}
          <div className="my-8 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">
              {direction === 'text-to-morse'
                ? 'Convert this character to Morse code'
                : direction === 'audio-to-text'
                ? 'Listen and identify the character'
                : 'Identify this Morse sequence'}
            </span>

            <div className="mt-4 flex items-center justify-center gap-4">
              <span className={`text-4xl font-extrabold text-slate-900 sm:text-5xl dark:text-slate-100 ${
                direction === 'morse-to-text' ? 'font-mono tracking-widest text-teal-800 dark:text-teal-400' : ''
              }`}>
                {currentQuestion.displayPrompt}
              </span>

              {currentQuestion.audioMorse && (
                <AudioPreviewButton morse={currentQuestion.audioMorse} label="Play Tone" />
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
                  className="w-full rounded-lg border border-slate-300 bg-slate-50/70 p-3.5 text-center text-lg font-bold text-slate-900 placeholder-slate-400 focus:border-teal-700 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-teal-400 dark:focus:bg-slate-900"
                  aria-label="Your answer input"
                />
              </div>

              {/* Virtual On-Screen Dot & Dash Buttons for Mobile Morse Input */}
              {direction === 'text-to-morse' && !isSubmitted && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => appendSymbol('.')}
                    className="touch-target flex-1 rounded-lg border border-slate-300 bg-slate-100 py-2 font-mono text-xl font-extrabold text-slate-800 shadow-2xs hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    title="Insert dot"
                  >
                    &bull; (Dot)
                  </button>
                  <button
                    type="button"
                    onClick={() => appendSymbol('-')}
                    className="touch-target flex-1 rounded-lg border border-slate-300 bg-slate-100 py-2 font-mono text-xl font-extrabold text-slate-800 shadow-2xs hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    title="Insert dash"
                  >
                    &mdash; (Dash)
                  </button>
                  <button
                    type="button"
                    onClick={() => appendSymbol(' ')}
                    className="touch-target rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
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
                  className="touch-target mt-2 w-full rounded-lg bg-teal-700 py-3 text-sm font-bold text-white shadow-xs transition-colors hover:bg-teal-800 disabled:opacity-50 dark:bg-teal-600 dark:hover:bg-teal-500"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  autoFocus
                  className="touch-target mt-2 w-full rounded-lg bg-teal-700 py-3 text-sm font-bold text-white shadow-xs transition-colors hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500"
                >
                  {currentIndex < queue.length - 1 ? 'Next Drill &rarr;' : 'Restart New Session &rarr;'}
                </button>
              )}
            </div>
          </form>

          {/* Feedback & Explanation Banner */}
          {isSubmitted && lastEvaluation && (
            <div
              role="status"
              className={`mx-auto mt-6 max-w-md rounded-lg border p-4 text-xs ${
                lastEvaluation.isCorrect
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200'
                  : 'border-rose-300 bg-rose-50 text-rose-950 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-base font-bold">
                  {lastEvaluation.isCorrect ? '✓' : '✗'}
                </span>
                <div>
                  <p className="font-bold text-sm">
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
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <p className="text-slate-600 dark:text-slate-400">
            No characters available for this filter.
          </p>
          <button
            type="button"
            onClick={() => setCategory('all')}
            className="touch-target mt-3 inline-flex items-center rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white"
          >
            Reset Filter to All
          </button>
        </div>
      )}
    </div>
  );
}
