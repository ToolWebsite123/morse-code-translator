import { describe, it, expect, beforeEach } from 'vitest';
import {
  getLearningProgress,
  markLessonCompleted,
  recordQuizResult,
  recordPracticeAttempt,
  resetLearningProgress,
  PROGRESS_STORAGE_KEY,
} from '@/lib/storage/progress';

describe('Release 2: Learning Progress Storage Engine (PRD Section 16.5 & FR-025)', () => {
  beforeEach(() => {
    resetLearningProgress();
  });

  it('initializes with default safe v1 schema when storage is empty', () => {
    const progress = getLearningProgress();
    expect(progress.version).toBe(1);
    expect(progress.completedLessons).toEqual([]);
    expect(progress.quizHistory).toEqual([]);
    expect(progress.practiceStats.totalAttempts).toBe(0);
    expect(progress.practiceStats.correctAttempts).toBe(0);
  });

  it('marks lessons completed and prevents duplicate entries', () => {
    markLessonCompleted('lesson-01-fundamentals');
    markLessonCompleted('lesson-01-fundamentals'); // Duplicate
    markLessonCompleted('lesson-02-dots-dashes');

    const progress = getLearningProgress();
    expect(progress.completedLessons).toHaveLength(2);
    expect(progress.completedLessons).toEqual(['lesson-01-fundamentals', 'lesson-02-dots-dashes']);
  });

  it('records quiz results and calculates accurate percentages', () => {
    recordQuizResult(8, 10);
    recordQuizResult(10, 10);

    const progress = getLearningProgress();
    expect(progress.quizHistory).toHaveLength(2);
    expect(progress.quizHistory[0].score).toBe(10);
    expect(progress.quizHistory[0].percentage).toBe(100);
    expect(progress.quizHistory[1].score).toBe(8);
    expect(progress.quizHistory[1].percentage).toBe(80);
  });

  it('records practice attempts and tracks weak character statistics', () => {
    recordPracticeAttempt('S', true);
    recordPracticeAttempt('S', true);
    recordPracticeAttempt('O', false);

    const progress = getLearningProgress();
    expect(progress.practiceStats.totalAttempts).toBe(3);
    expect(progress.practiceStats.correctAttempts).toBe(2);

    expect(progress.practiceStats.weakCharacters['S']).toEqual({ attempts: 2, correct: 2 });
    expect(progress.practiceStats.weakCharacters['O']).toEqual({ attempts: 1, correct: 0 });
  });

  it('safely handles corrupted JSON in localStorage without throwing', () => {
    // If window.localStorage is present, test corrupt injection
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, '{invalid-json-data:???}');
      const progress = getLearningProgress();
      expect(progress.version).toBe(1);
      expect(progress.completedLessons).toEqual([]);
    }
  });

  it('resets learning progress completely', () => {
    markLessonCompleted('lesson-01-fundamentals');
    recordQuizResult(9, 10);
    recordPracticeAttempt('A', true);

    resetLearningProgress();

    const progress = getLearningProgress();
    expect(progress.completedLessons).toHaveLength(0);
    expect(progress.quizHistory).toHaveLength(0);
    expect(progress.practiceStats.totalAttempts).toBe(0);
  });
});
