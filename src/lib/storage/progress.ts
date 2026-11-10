/**
 * Local Storage Learning Progress Engine
 *
 * Implements account-free, privacy-preserving progress tracking as defined in
 * PRD Section 3.2, 16.5, and FR-025.
 *
 * Guaranteed:
 * 1. Safe SSR execution (checks typeof window)
 * 2. In-memory fallback if localStorage is disabled/blocked
 * 3. Schema versioning (v1) with automatic migration/resilience
 * 4. Zero network transmission
 */

import type { LearningProgress, QuizResultRecord } from '@/types/learning';

export const PROGRESS_STORAGE_KEY = 'morse_learning_progress_v1';
export const CURRENT_SCHEMA_VERSION = 1;

export const INITIAL_LEARNING_PROGRESS: Readonly<LearningProgress> = {
  version: CURRENT_SCHEMA_VERSION,
  completedLessons: [],
  quizHistory: [],
  practiceStats: {
    totalAttempts: 0,
    correctAttempts: 0,
    weakCharacters: {},
  },
  lastActiveDate: '',
};

// In-memory fallback state for private-browsing or restricted iframe sessions
let inMemoryProgress: LearningProgress = { ...INITIAL_LEARNING_PROGRESS };

// Snapshot cache to guarantee referential stability for useSyncExternalStore
let cachedSerialized: string | null = null;
let cachedProgress: LearningProgress = { ...INITIAL_LEARNING_PROGRESS };

/**
 * Checks if localStorage is available and writable
 */
function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = '__morse_storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates and sanitizes a raw parsed object against LearningProgress v1 schema
 */
function sanitizeProgress(raw: unknown): LearningProgress {
  if (!raw || typeof raw !== 'object') {
    return { ...INITIAL_LEARNING_PROGRESS };
  }

  const obj = raw as Partial<LearningProgress>;

  const completedLessons = Array.isArray(obj.completedLessons)
    ? obj.completedLessons.filter((item): item is string => typeof item === 'string')
    : [];

  const quizHistory = Array.isArray(obj.quizHistory)
    ? obj.quizHistory.filter(
        (item): item is QuizResultRecord =>
          Boolean(item) &&
          typeof item === 'object' &&
          typeof item.score === 'number' &&
          typeof item.total === 'number'
      )
    : [];

  const practiceStats =
    obj.practiceStats && typeof obj.practiceStats === 'object'
      ? {
          totalAttempts: typeof obj.practiceStats.totalAttempts === 'number' ? obj.practiceStats.totalAttempts : 0,
          correctAttempts: typeof obj.practiceStats.correctAttempts === 'number' ? obj.practiceStats.correctAttempts : 0,
          weakCharacters:
            obj.practiceStats.weakCharacters && typeof obj.practiceStats.weakCharacters === 'object'
              ? (obj.practiceStats.weakCharacters as Record<string, { attempts: number; correct: number }>)
              : {},
        }
      : { totalAttempts: 0, correctAttempts: 0, weakCharacters: {} };

  return {
    version: CURRENT_SCHEMA_VERSION,
    completedLessons,
    quizHistory,
    practiceStats,
    lastActiveDate: typeof obj.lastActiveDate === 'string' ? obj.lastActiveDate : '',
  };
}

/**
 * Retrieves the current user learning progress (referentially stable for React useSyncExternalStore)
 */
export function getLearningProgress(): LearningProgress {
  if (!isStorageAvailable()) {
    return inMemoryProgress;
  }

  try {
    const serialized = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!serialized) {
      if (cachedSerialized === null) {
        return cachedProgress;
      }
      cachedSerialized = null;
      cachedProgress = { ...INITIAL_LEARNING_PROGRESS };
      return cachedProgress;
    }

    if (serialized === cachedSerialized) {
      return cachedProgress;
    }

    cachedSerialized = serialized;
    cachedProgress = sanitizeProgress(JSON.parse(serialized));
    return cachedProgress;
  } catch {
    // If JSON parsing fails due to corrupted local data, fall back gracefully
    return cachedProgress;
  }
}

/**
 * Persists the updated learning progress
 */
export function saveLearningProgress(progress: LearningProgress): boolean {
  const sanitized = sanitizeProgress(progress);
  sanitized.lastActiveDate = new Date().toISOString();

  if (!isStorageAvailable()) {
    inMemoryProgress = sanitized;
    return true;
  }

  try {
    const serialized = JSON.stringify(sanitized);
    cachedSerialized = serialized;
    cachedProgress = sanitized;
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, serialized);
    // Dispatch a window event so all tabs/components sync instantly
    window.dispatchEvent(new Event('morse-progress-change'));
    return true;
  } catch {
    // Storage quota or policy restriction fallback
    inMemoryProgress = sanitized;
    return false;
  }
}

/**
 * Marks an individual lesson as completed
 */
export function markLessonCompleted(slug: string): LearningProgress {
  const current = getLearningProgress();
  if (!current.completedLessons.includes(slug)) {
    const updated: LearningProgress = {
      ...current,
      completedLessons: [...current.completedLessons, slug],
    };
    saveLearningProgress(updated);
    return updated;
  }
  return current;
}

/**
 * Records a completed quiz result into history (stores last 20 attempts)
 */
export function recordQuizResult(score: number, total: number): LearningProgress {
  const current = getLearningProgress();
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const newRecord: QuizResultRecord = {
    id: `quiz-${Date.now()}`,
    date: new Date().toISOString(),
    score,
    total,
    percentage,
  };

  const updatedHistory = [newRecord, ...current.quizHistory].slice(0, 20);

  const updated: LearningProgress = {
    ...current,
    quizHistory: updatedHistory,
  };
  saveLearningProgress(updated);
  return updated;
}

/**
 * Records a practice drill attempt and tracks weak characters
 */
export function recordPracticeAttempt(character: string, isCorrect: boolean): LearningProgress {
  const current = getLearningProgress();
  const charKey = character.toUpperCase();

  const prevCharStats = current.practiceStats.weakCharacters[charKey] || {
    attempts: 0,
    correct: 0,
  };

  const updatedCharStats = {
    attempts: prevCharStats.attempts + 1,
    correct: prevCharStats.correct + (isCorrect ? 1 : 0),
  };

  const updated: LearningProgress = {
    ...current,
    practiceStats: {
      totalAttempts: current.practiceStats.totalAttempts + 1,
      correctAttempts: current.practiceStats.correctAttempts + (isCorrect ? 1 : 0),
      weakCharacters: {
        ...current.practiceStats.weakCharacters,
        [charKey]: updatedCharStats,
      },
    },
  };
  saveLearningProgress(updated);
  return updated;
}

/**
 * Resets all learning progress (requires explicit user confirmation in UI)
 */
export function resetLearningProgress(): void {
  inMemoryProgress = { ...INITIAL_LEARNING_PROGRESS };
  cachedSerialized = null;
  cachedProgress = { ...INITIAL_LEARNING_PROGRESS };
  if (isStorageAvailable()) {
    try {
      window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
      window.dispatchEvent(new Event('morse-progress-change'));
    } catch {
      // Ignored
    }
  }
}

