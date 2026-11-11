'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import type { QuizQuestion, QuizUserAnswer, LearningProgress } from '@/types/learning';
import { generateQuiz, evaluateQuizSubmission } from '@/lib/learning/quizzes';
import { recordQuizResult, getLearningProgress, INITIAL_LEARNING_PROGRESS } from '@/lib/storage/progress';
import { AudioPreviewButton } from './AudioPreviewButton';

function subscribeQuiz(callback: () => void) {
  window.addEventListener('morse-progress-change', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('morse-progress-change', callback);
    window.removeEventListener('storage', callback);
  };
}

function getQuizSnapshot(): LearningProgress {
  return getLearningProgress();
}

function getServerQuizSnapshot(): LearningProgress {
  return INITIAL_LEARNING_PROGRESS;
}

export function QuizClient() {
  const [phase, setPhase] = useState<'intro' | 'active' | 'result'>('intro');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<{
    score: number;
    total: number;
    percentage: number;
    reviewList: QuizUserAnswer[];
  } | null>(null);

  const progress = useSyncExternalStore(subscribeQuiz, getQuizSnapshot, getServerQuizSnapshot);
  const history = progress.quizHistory || [];

  const handleStartQuiz = () => {
    const newQuestions = generateQuiz(10);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setUserAnswers({});
    setResults(null);
    setPhase('active');
  };

  const currentQuestion = questions[currentIndex];

  const handleSelectAnswer = (ans: string) => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: ans,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    const evalResult = evaluateQuizSubmission(questions, userAnswers);
    setResults(evalResult);
    recordQuizResult(evalResult.score, evalResult.total);
    setPhase('result');
  };

  // INTRO PHASE
  if (phase === 'intro') {
    return (
      <div className="w-full rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-800 dark:bg-teal-900/50 dark:text-teal-300">
              Comprehensive Evaluation
            </span>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Ready to Test Your Knowledge?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              This 10-question quiz evaluates timing rules, letter and number recognition, punctuation, and auditory identification.
              Take your time; there are no countdown timers or penalties.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleStartQuiz}
              className="touch-target inline-flex items-center justify-center rounded-lg bg-teal-700 px-6 py-3.5 text-sm font-bold text-white shadow-xs transition-colors hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500"
            >
              Start 10-Question Quiz &rarr;
            </button>
            <Link
              href="/practice"
              className="touch-target text-center text-xs font-semibold text-slate-600 hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-400"
            >
              Want to practice first? Go to Drills
            </Link>
          </div>
        </div>

        {/* Previous Quiz History */}
        {history.length > 0 && (
          <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Your Recent Quiz Attempts (Stored Locally)
            </h3>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {history.slice(0, 6).map((attempt, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs dark:border-slate-700 dark:bg-slate-800/60"
                >
                  <span className="text-slate-600 dark:text-slate-400">
                    {new Date(attempt.date).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <span className="font-mono font-bold text-teal-800 dark:text-teal-400">
                    {attempt.score}/{attempt.total} ({attempt.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ACTIVE QUIZ PHASE
  if (phase === 'active' && currentQuestion) {
    const answeredCount = Object.keys(userAnswers).length;
    const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
    const currentAnswer = userAnswers[currentQuestion.id] || '';

    return (
      <div className="w-full rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        {/* Progress & Header */}
        <div className="mb-6 flex items-center justify-between text-xs">
          <span className="font-mono font-bold text-teal-800 dark:text-teal-400">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-slate-500 dark:text-slate-400">
            {answeredCount} of {questions.length} answered
          </span>
        </div>

        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-teal-600 transition-all duration-300 dark:bg-teal-400"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Prompt */}
        <div className="my-6">
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-slate-100">
            {currentQuestion.prompt}
          </h2>

          {currentQuestion.audioMorse && (
            <div className="mt-4 flex items-center gap-3">
              <AudioPreviewButton morse={currentQuestion.audioMorse} label="Listen to Signal" />
              <span className="text-xs text-slate-500 italic dark:text-slate-400">
                Click to play audio clue
              </span>
            </div>
          )}
        </div>

        {/* Question Options or Typed Answer */}
        {currentQuestion.options && currentQuestion.options.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {currentQuestion.options.map((opt) => {
              const isSelected = currentAnswer === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelectAnswer(opt)}
                  className={`touch-target flex items-center justify-between rounded-lg border p-3.5 text-left text-xs font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus sm:text-sm ${
                    isSelected
                      ? 'border-teal-700 bg-teal-50 text-teal-900 shadow-2xs dark:border-teal-500 dark:bg-teal-950/60 dark:text-teal-200'
                      : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{opt}</span>
                  <span
                    className={`h-4 w-4 rounded-full border ${
                      isSelected
                        ? 'border-teal-700 bg-teal-700 dark:border-teal-400 dark:bg-teal-400'
                        : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        ) : (
          <div className="max-w-md">
            <input
              type="text"
              value={currentAnswer}
              onChange={(e) => handleSelectAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full rounded-lg border border-slate-300 bg-slate-50/70 p-3.5 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:border-teal-700 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-teal-400 dark:focus:bg-slate-900"
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="touch-target inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            &larr; Previous
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="touch-target inline-flex items-center rounded-lg bg-teal-700 px-5 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 sm:text-sm"
            >
              Next &rarr;
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitQuiz}
              className="touch-target inline-flex items-center rounded-lg bg-emerald-700 px-6 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 sm:text-sm"
            >
              Submit Quiz &amp; View Results
            </button>
          )}
        </div>
      </div>
    );
  }

  // RESULTS PHASE
  if (phase === 'result' && results) {
    return (
      <div className="w-full">
        {/* Score Banner */}
        <div className="mb-6 rounded-xl border border-teal-200 bg-white p-6 shadow-xs text-center dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Quiz Completed
          </span>
          <h2 className="mt-2 text-4xl font-extrabold text-slate-900 sm:text-5xl dark:text-slate-100">
            {results.score} / {results.total}
          </h2>
          <p className="mt-1 font-mono text-lg font-bold text-teal-800 dark:text-teal-400">
            {results.percentage}% Score
          </p>
          <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Your results have been saved to your browser&apos;s local progress.
            Review the detailed question explanations below to reinforce any tricky concepts.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleStartQuiz}
              className="touch-target inline-flex items-center rounded-lg bg-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 sm:text-sm"
            >
              Retake Another Quiz
            </button>
            <Link
              href="/practice"
              className="touch-target inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:text-sm"
            >
              Practice Drills &rarr;
            </Link>
            <Link
              href="/learn"
              className="touch-target inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:text-sm"
            >
              Back to Lessons
            </Link>
          </div>
        </div>

        {/* Answer Review List */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Question-by-Question Review
          </h3>

          {results.reviewList.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-xl border p-5 shadow-xs ${
                item.isCorrect
                  ? 'border-emerald-200 bg-white dark:border-emerald-900/60 dark:bg-slate-900'
                  : 'border-rose-200 bg-white dark:border-rose-900/60 dark:bg-slate-900'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                    Question {idx + 1}
                  </span>
                  <p className="mt-1 text-sm font-bold text-slate-900 dark:text-slate-100">
                    {item.prompt}
                  </p>
                </div>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    item.isCorrect
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                  }`}
                >
                  {item.isCorrect ? '✓' : '✗'}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-4 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Your Answer: </span>
                  <strong className={item.isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}>
                    {item.userAnswer}
                  </strong>
                </div>
                {!item.isCorrect && (
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Expected: </span>
                    <strong className="text-slate-900 dark:text-slate-100">
                      {item.correctAnswer}
                    </strong>
                  </div>
                )}
              </div>

              <p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-400">
                {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
