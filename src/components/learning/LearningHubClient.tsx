'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { LESSONS } from '@/lib/learning/lessons';
import {
  getLearningProgress,
  resetLearningProgress,
  INITIAL_LEARNING_PROGRESS,
} from '@/lib/storage/progress';
import type { LearningProgress } from '@/types/learning';

type TrackFilter = 'all' | 'mod1' | 'mod2' | 'mod3' | 'mod4';

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
  const [activeTab, setActiveTab] = useState<TrackFilter>('all');
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

  const filteredLessons = LESSONS.filter((lesson) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'mod1') return lesson.order >= 1 && lesson.order <= 2;
    if (activeTab === 'mod2') return lesson.order >= 3 && lesson.order <= 4;
    if (activeTab === 'mod3') return lesson.order >= 5 && lesson.order <= 7;
    if (activeTab === 'mod4') return lesson.order >= 8 && lesson.order <= 10;
    return true;
  });

  return (
    <div className="w-full space-y-14">
      {/* =========================================================================
          STEP 01: REAL-TIME LOCAL PROGRESS STATION
          ========================================================================= */}
      <section id="progress" aria-label="Real-Time Local Progress" className="w-full">
        <div className="studio-workbench relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-6 shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1 font-mono text-[11px] font-bold text-teal-800 dark:bg-teal-950/60 dark:text-teal-300">
                  <span className="h-2 w-2 rounded-full bg-teal-600 dark:bg-teal-400 animate-pulse" />
                  Step 01 &bull; Real-Time Local Progress
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
                  🔒 Browser-Local &bull; Zero Server Storage
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
                Track Your Morse Code Learning Journey
              </h2>

              <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                Our learning platform is built on a <strong className="font-semibold text-slate-900 dark:text-slate-100">local-first, privacy-preserving architecture</strong>. As you complete lessons and pass exercises, your progress is automatically saved to your web browser using <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs text-teal-800 dark:bg-slate-800 dark:text-teal-300">localStorage</code>. You can refresh the page, close your browser, or return tomorrow without losing your place.
              </p>

              {/* Progress Summary Readout */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="font-mono text-lg font-bold text-teal-800 dark:text-teal-300 sm:text-xl">
                  {completedCount === totalLessons
                    ? 'All 10 Lessons Mastered! 🏆'
                    : `${completedCount} of ${totalLessons} Lessons Finished (${percentage}%)`}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  ({totalLessons - completedCount} remaining)
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-900 shadow-2xs dark:border-amber-900/60 dark:bg-amber-950/60 dark:text-amber-300">
                  <span aria-hidden="true">🔥</span>
                  <span>{progress.streak && progress.streak.current > 0 ? `${progress.streak.current}d Streak` : 'Daily Streak'}</span>
                </span>
              </div>

              {/* Glowing Segmented Progress Bar */}
              <div className="mt-3">
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 p-0.5 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400 transition-all duration-500 shadow-sm"
                    style={{ width: `${Math.max(percentage, 4)}%` }}
                  />
                </div>
                <div className="mt-1.5 flex justify-between font-mono text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  <span>0% Start</span>
                  <span>25% Basics</span>
                  <span>50% Alphabet</span>
                  <span>75% Numbers</span>
                  <span>100% Master</span>
                </div>
              </div>
            </div>

            {/* Quick Hub Action Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:flex-col lg:items-end w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full sm:w-auto">
                <Link
                  href="/morse-code-practice"
                  className="btn-tactile touch-target inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-2xs transition-colors hover:border-teal-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:bg-slate-700 sm:text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-600 dark:text-teal-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  Practice Drills &rarr;
                </Link>
                <Link
                  href="/morse-code-quiz"
                  className="btn-tactile touch-target inline-flex items-center justify-center gap-1.5 rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 sm:text-sm"
                >
                  Take Quiz &rarr;
                </Link>
              </div>

              {completedCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetProgress}
                  className="btn-tactile touch-target text-xs font-semibold text-slate-500 transition-colors hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 text-center sm:text-right"
                  title="Reset local learning progress"
                >
                  Reset Progress
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STEP 02: THE 10-LESSON BEGINNER CURRICULUM
          ========================================================================= */}
      <section id="curriculum" aria-label="10-Lesson Beginner Morse Code Curriculum" className="w-full">
        <div className="mb-6 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-300">
              Step 02 &bull; Structured Curriculum
            </span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
            The 10-Lesson Beginner Morse Code Curriculum
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            To prevent cognitive overload, our course groups the 54 International Morse Code characters into four logical modules. Each lesson takes approximately <strong className="font-semibold text-slate-900 dark:text-slate-100">3 to 5 minutes</strong> to complete and includes clear explanations, audio playback examples, and an interactive knowledge-check exercise:
          </p>
        </div>

        {/* 4-Module Structure Overview Bento Grid */}
        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="studio-card rounded-xl border border-slate-200/90 bg-white/95 p-4 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-teal-50 px-2 py-0.5 font-mono text-[11px] font-extrabold text-teal-800 dark:bg-teal-950/80 dark:text-teal-300">
                MODULE 1
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Lessons 1–2</span>
            </div>
            <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100">
              Foundations &amp; Timing Physics
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Master telecommunication origins, discrete signals, and PARIS mathematical ratios.
            </p>
          </div>

          <div className="studio-card rounded-xl border border-slate-200/90 bg-white/95 p-4 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-teal-50 px-2 py-0.5 font-mono text-[11px] font-extrabold text-teal-800 dark:bg-teal-950/80 dark:text-teal-300">
                MODULE 2
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Lessons 3–4</span>
            </div>
            <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100">
              Alphabet &amp; Auditory Symmetries
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Learn single-element foundations (E &amp; T) and all 26 Latin alphabet letters.
            </p>
          </div>

          <div className="studio-card rounded-xl border border-slate-200/90 bg-white/95 p-4 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-teal-50 px-2 py-0.5 font-mono text-[11px] font-extrabold text-teal-800 dark:bg-teal-950/80 dark:text-teal-300">
                MODULE 3
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Lessons 5–7</span>
            </div>
            <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100">
              Numbers, Punctuation &amp; Boundaries
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              The 5-element sliding window, 18 ITU symbols, and word spacing (/) conventions.
            </p>
          </div>

          <div className="studio-card rounded-xl border border-slate-200/90 bg-white/95 p-4 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-teal-50 px-2 py-0.5 font-mono text-[11px] font-extrabold text-teal-800 dark:bg-teal-950/80 dark:text-teal-300">
                MODULE 4
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Lessons 8–10</span>
            </div>
            <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-100">
              Rhythm, Speed &amp; Practical Mastery
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Overcoming spacing confusion, WPM calibration, and full sentence decoding.
            </p>
          </div>
        </div>

        {/* Module / Track Filter Tabs */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`btn-tactile rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all sm:text-sm ${
                activeTab === 'all'
                  ? 'bg-teal-700 text-white shadow-xs dark:bg-teal-600'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              All Lessons ({totalLessons})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mod1')}
              className={`btn-tactile rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all sm:text-sm ${
                activeTab === 'mod1'
                  ? 'bg-teal-700 text-white shadow-xs dark:bg-teal-600'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              Module 1: Foundations (2)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mod2')}
              className={`btn-tactile rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all sm:text-sm ${
                activeTab === 'mod2'
                  ? 'bg-teal-700 text-white shadow-xs dark:bg-teal-600'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              Module 2: Alphabet (2)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mod3')}
              className={`btn-tactile rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all sm:text-sm ${
                activeTab === 'mod3'
                  ? 'bg-teal-700 text-white shadow-xs dark:bg-teal-600'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              Module 3: Numbers &amp; Symbols (3)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mod4')}
              className={`btn-tactile rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all sm:text-sm ${
                activeTab === 'mod4'
                  ? 'bg-teal-700 text-white shadow-xs dark:bg-teal-600'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              Module 4: Rhythm &amp; Speed (3)
            </button>
          </div>

          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Showing {filteredLessons.length} of {totalLessons} Lessons
          </span>
        </div>

        {/* Structured 10-Lesson Curriculum Grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {filteredLessons.map((lesson) => {
            const isCompleted = progress.completedLessons.includes(lesson.slug);

            return (
              <Link
                key={lesson.slug}
                href={`/learn/${lesson.slug}`}
                className="studio-card group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-xs backdrop-blur-xs transition-all hover:border-teal-500/60 dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-teal-400/50 sm:p-6"
              >
                <div>
                  {/* Header Metadata Row */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-teal-50 px-2.5 py-1 font-mono text-xs font-extrabold text-teal-800 dark:bg-teal-950/70 dark:text-teal-300">
                        Lesson {String(lesson.order).padStart(2, '0')}
                      </span>
                      <span className="rounded-md border border-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-600 uppercase tracking-wide dark:border-slate-700 dark:text-slate-400">
                        {lesson.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        ~{lesson.estimatedMinutes} min
                      </span>
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Done
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                          Start
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="mt-3.5 text-lg font-bold text-slate-900 group-hover:text-teal-700 dark:text-slate-100 dark:group-hover:text-teal-300 transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed dark:text-slate-400">
                    {lesson.subtitle}
                  </p>

                  {/* Objective Callout Box */}
                  <div className="mt-3.5 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 text-xs text-slate-700 dark:border-slate-800/80 dark:bg-slate-800/50 dark:text-slate-300">
                    <span className="font-bold text-teal-800 dark:text-teal-400">Goal:</span> {lesson.objective}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold dark:border-slate-800">
                  <span className="text-teal-800 dark:text-teal-300">
                    {isCompleted ? 'Review Exercises' : 'Start Lesson'}
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-teal-700 transition-transform group-hover:translate-x-1 dark:text-teal-400">
                    <span>Enter Lesson</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
