'use client';

import { useState } from 'react';
import type { LessonExercise } from '@/types/learning';
import { markLessonCompleted } from '@/lib/storage/progress';

interface LessonExerciseCardProps {
  lessonSlug: string;
  exercise: LessonExercise;
  onCompleted?: () => void;
}

export function LessonExerciseCard({ lessonSlug, exercise, onCompleted }: LessonExerciseCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const isCorrect = selectedAnswer?.trim().toLowerCase() === exercise.expectedAnswer.trim().toLowerCase();

  const handleSelectOption = (option: string) => {
    setSelectedAnswer(option);
    setIsSubmitted(true);

    if (option.trim().toLowerCase() === exercise.expectedAnswer.trim().toLowerCase()) {
      markLessonCompleted(lessonSlug);
      if (onCompleted) onCompleted();
    }
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
  };

  return (
    <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-5 shadow-xs dark:border-teal-900/60 dark:bg-teal-950/20">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white dark:bg-teal-600">
          ?
        </span>
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Comprehension Check
        </h3>
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
        {exercise.question}
      </p>

      {exercise.prompt && (
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
          {exercise.prompt}
        </p>
      )}

      {/* Options Buttons */}
      {exercise.options && exercise.options.length > 0 && (
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {exercise.options.map((option) => {
            const isThisSelected = selectedAnswer === option;
            const isThisCorrect = option.trim().toLowerCase() === exercise.expectedAnswer.trim().toLowerCase();

            let optionStyle =
              'border-slate-300 bg-white text-slate-800 hover:border-teal-600 hover:bg-teal-50/50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-teal-500';

            if (isSubmitted) {
              if (isThisSelected && isThisCorrect) {
                optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold dark:border-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-200';
              } else if (isThisSelected && !isThisCorrect) {
                optionStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-bold dark:border-rose-700 dark:bg-rose-950/60 dark:text-rose-200';
              } else if (isThisCorrect) {
                optionStyle = 'border-emerald-500 bg-emerald-50/60 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300';
              }
            }

            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelectOption(option)}
                disabled={isSubmitted && isCorrect}
                className={`touch-target flex items-center justify-between rounded-lg border p-3 text-left text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus sm:text-sm ${optionStyle}`}
              >
                <span>{option}</span>
                {isSubmitted && isThisSelected && (
                  <span>{isThisCorrect ? '✓' : '✗'}</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Hint toggle if requested */}
      {exercise.hint && !isCorrect && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-xs font-semibold text-teal-700 hover:underline dark:text-teal-400"
          >
            {showHint ? 'Hide hint' : 'Need a hint?'}
          </button>
          {showHint && (
            <p className="mt-1 text-xs text-slate-600 italic dark:text-slate-400">
              Hint: {exercise.hint}
            </p>
          )}
        </div>
      )}

      {/* Result & Explanation Feedback Banner */}
      {isSubmitted && (
        <div
          role="status"
          className={`mt-4 rounded-lg border p-3.5 text-xs ${
            isCorrect
              ? 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200'
              : 'border-rose-300 bg-rose-50 text-rose-950 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-bold text-sm">
                {isCorrect ? '✓ Correct! Lesson Completed.' : '✗ Not quite. Try again!'}
              </p>
              <p className="mt-1 leading-relaxed">
                {exercise.explanation}
              </p>
            </div>
            {!isCorrect && (
              <button
                type="button"
                onClick={handleReset}
                className="shrink-0 rounded-md border border-rose-300 bg-white px-2.5 py-1 text-xs font-bold text-rose-800 hover:bg-rose-100 dark:border-rose-700 dark:bg-slate-900 dark:text-rose-300"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

