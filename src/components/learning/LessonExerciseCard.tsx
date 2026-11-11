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
    <div className="table-box-glow rounded-2xl border border-teal-200/90 bg-teal-50/50 p-6 shadow-xs backdrop-blur-md dark:border-teal-900/60 dark:bg-teal-950/20 sm:p-7">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-700 text-xs font-bold text-white shadow-2xs dark:bg-teal-600">
          ?
        </span>
        <div>
          <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Comprehension Check &bull; Quick Quiz
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Select the correct answer to mark this lesson as completed
          </p>
        </div>
      </div>

      <p className="mt-3.5 text-base font-bold text-slate-900 dark:text-slate-100">
        {exercise.question}
      </p>

      {exercise.prompt && (
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
          {exercise.prompt}
        </p>
      )}

      {/* Options Buttons */}
      {exercise.options && exercise.options.length > 0 && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {exercise.options.map((option) => {
            const isThisSelected = selectedAnswer === option;
            const isThisCorrect = option.trim().toLowerCase() === exercise.expectedAnswer.trim().toLowerCase();

            let optionStyle =
              'border-slate-200 bg-white text-slate-800 hover:border-teal-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-teal-500';

            if (isSubmitted) {
              if (isThisSelected && isThisCorrect) {
                optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold dark:border-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-200';
              } else if (isThisSelected && !isThisCorrect) {
                optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-bold dark:border-rose-700 dark:bg-rose-950/60 dark:text-rose-200';
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
                className={`btn-tactile touch-target flex items-center justify-between rounded-xl border p-3.5 text-left text-xs font-semibold shadow-2xs transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus sm:text-sm ${optionStyle}`}
              >
                <span>{option}</span>
                {isSubmitted && isThisSelected && (
                  <span className="font-extrabold text-base">{isThisCorrect ? '✓' : '✗'}</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Hint toggle if requested */}
      {exercise.hint && !isCorrect && (
        <div className="mt-3.5">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="btn-tactile inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:underline dark:text-teal-400"
          >
            <span>💡</span>
            <span>{showHint ? 'Hide Hint' : 'Need a hint?'}</span>
          </button>
          {showHint && (
            <p className="mt-1.5 rounded-lg border border-teal-200/60 bg-teal-50/60 p-2.5 text-xs text-slate-700 italic dark:border-teal-900/40 dark:bg-teal-950/30 dark:text-slate-300">
              Hint: {exercise.hint}
            </p>
          )}
        </div>
      )}

      {/* Result & Explanation Feedback Banner */}
      {isSubmitted && (
        <div
          role="status"
          className={`mt-5 rounded-xl border p-4 text-xs ${
            isCorrect
              ? 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200'
              : 'border-rose-300 bg-rose-50 text-rose-950 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-200'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-bold text-sm">
                {isCorrect ? '🎉 Correct! Lesson marked as completed.' : '❌ Not quite right. Review the explanation and try again!'}
              </p>
              <p className="mt-1.5 leading-relaxed text-xs">
                {exercise.explanation}
              </p>
            </div>
            {!isCorrect && (
              <button
                type="button"
                onClick={handleReset}
                className="btn-tactile shrink-0 rounded-lg border border-rose-300 bg-white px-3 py-1.5 text-xs font-bold text-rose-800 shadow-2xs hover:bg-rose-100 dark:border-rose-700 dark:bg-slate-900 dark:text-rose-300"
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

