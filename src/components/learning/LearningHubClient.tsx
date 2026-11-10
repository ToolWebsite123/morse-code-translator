'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { LESSONS } from '@/lib/learning/lessons';
import {
  getLearningProgress,
  resetLearningProgress,
  INITIAL_LEARNING_PROGRESS,
} from '@/lib/storage/progress';
import type { LearningProgress } from '@/types/learning';

function subscribe(callback: () => void) {
  window.addEventListener('morse-progress-change', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('morse-progress-change', callback);
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot(): LearningProgress {
  return getLearningProgress();
}

function getServerSnapshot(): LearningProgress {
  return INITIAL_LEARNING_PROGRESS;
}

export function LearningHubClient() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const completedCount = progress.completedLessons.length;
  const totalLessons = LESSONS.length;
  const percentage = Math.round((completedCount / totalLessons) * 100);

  const handleResetProgress = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all your learning progress? This will clear completed lessons and quiz scores from your browser.'
      )
    ) {
      resetLearningProgress();
    }
  };

  return (
    <div className="w-full">
      {/* Progress & Quick Action Summary Banner */}
      <div className="mb-8 rounded-xl border border-teal-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-bold text-teal-800 dark:bg-teal-900/50 dark:text-teal-300">
                Your Progress
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Saved locally on your device
              </span>
            </div>
            <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">
              {completedCount === totalLessons
                ? 'All Lessons Completed! 🎉'
                : `${completedCount} of ${totalLessons} Lessons Finished (${percentage}%)`}
            </h2>
            <div className="mt-3 h-2.5 w-full max-w-md overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-full bg-teal-600 transition-all duration-300 dark:bg-teal-400"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Quick Hub Links */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/practice"
              className="touch-target inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-2xs transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:text-sm"
            >
              Practice Drills &rarr;
            </Link>
            <Link
              href="/quiz"
              className="touch-target inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 sm:text-sm"
            >
              Take Quiz &rarr;
            </Link>
            {completedCount > 0 && (
              <button
                type="button"
                onClick={handleResetProgress}
                className="touch-target text-xs font-semibold text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400"
                title="Reset local learning progress"
              >
                Reset Progress
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Structured 10-Lesson Curriculum Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {LESSONS.map((lesson) => {
          const isCompleted = progress.completedLessons.includes(lesson.slug);

          return (
            <Link
              key={lesson.slug}
              href={`/learn/${lesson.slug}`}
              className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-teal-600 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-500"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-teal-800 dark:text-teal-400">
                    Lesson {lesson.order}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 dark:text-slate-400">
                      ~{lesson.estimatedMinutes} min
                    </span>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        ✓ Done
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        Start
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="mt-2 text-base font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-400">
                  {lesson.title}
                </h3>
                <p className="mt-1 text-xs text-slate-600 line-clamp-2 dark:text-slate-400">
                  {lesson.subtitle}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">
                  Goal: {lesson.objective}
                </span>
                <span className="font-bold text-teal-700 group-hover:translate-x-1 transition-transform dark:text-teal-400">
                  &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

