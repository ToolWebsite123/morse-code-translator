import { describe, it, expect } from 'vitest';
import {
  LESSONS,
  getAllLessons,
  getLessonBySlug,
  getAdjacentLessons,
} from '@/lib/learning/lessons';
import {
  normalizePracticeAnswer,
  evaluatePracticeAnswer,
  generatePracticeQueue,
} from '@/lib/learning/practice';
import {
  QUIZ_QUESTION_BANK,
  generateQuiz,
  evaluateQuizSubmission,
  normalizeQuizAnswer,
} from '@/lib/learning/quizzes';

describe('Release 2: Lesson Curriculum (PRD Section 16.2 & 6.9)', () => {
  it('contains exactly 10 structured progressive lessons', () => {
    const all = getAllLessons();
    expect(all).toHaveLength(10);
    expect(all.map((l) => l.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('guarantees unique slugs and valid metadata for all lessons', () => {
    const slugs = new Set<string>();
    for (const lesson of LESSONS) {
      expect(slugs.has(lesson.slug)).toBe(false);
      slugs.add(lesson.slug);

      expect(lesson.title.trim().length).toBeGreaterThan(5);
      expect(lesson.objective.trim().length).toBeGreaterThan(10);
      expect(lesson.sections.length).toBeGreaterThan(0);
      expect(lesson.examples.length).toBeGreaterThan(0);
      expect(lesson.exercise.question.trim().length).toBeGreaterThan(5);
      expect(lesson.exercise.expectedAnswer.trim().length).toBeGreaterThan(0);
    }
  });

  it('retrieves individual lesson by slug', () => {
    const lesson = getLessonBySlug('what-is-morse-code');
    expect(lesson).toBeDefined();
    expect(lesson?.order).toBe(1);

    const nonExistent = getLessonBySlug('non-existent-lesson');
    expect(nonExistent).toBeUndefined();
  });

  it('correctly calculates previous and next adjacent lessons', () => {
    const first = getAdjacentLessons('what-is-morse-code');
    expect(first.prev).toBeUndefined();
    expect(first.next?.order).toBe(2);

    const middle = getAdjacentLessons('dots-dashes-and-timing');
    expect(middle.prev?.order).toBe(1);
    expect(middle.next?.order).toBe(3);

    const last = getAdjacentLessons('comprehensive-review-and-next-steps');
    expect(last.prev?.order).toBe(9);
    expect(last.next).toBeUndefined();
  });
});

describe('Release 2: Practice Drills Engine (PRD Section 16.3 & FR-026)', () => {
  it('normalizes Morse answers with unicode dash/dot variants', () => {
    // Unicode en-dash, em-dash, bullets
    const rawMorse = '•••   ———   •••';
    const normalized = normalizePracticeAnswer(rawMorse, 'text-to-morse');
    expect(normalized).toBe('... --- ...');
  });

  it('normalizes text answers to uppercase and trimmed', () => {
    const rawText = '  hello world  ';
    const normalized = normalizePracticeAnswer(rawText, 'morse-to-text');
    expect(normalized).toBe('HELLO WORLD');
  });

  it('evaluates answers correctly regardless of case or excess whitespace', () => {
    const result1 = evaluatePracticeAnswer('  s  ', 'S', 'morse-to-text');
    expect(result1.isCorrect).toBe(true);

    const result2 = evaluatePracticeAnswer('...   ---   ...', '... --- ...', 'text-to-morse');
    expect(result2.isCorrect).toBe(true);

    const result3 = evaluatePracticeAnswer('A', 'B', 'morse-to-text');
    expect(result3.isCorrect).toBe(false);
  });

  it('generates randomized practice queues filtered by category', () => {
    const numbersQueue = generatePracticeQueue({ direction: 'morse-to-text', category: 'number' }, 5);
    expect(numbersQueue).toHaveLength(5);
    for (const q of numbersQueue) {
      expect(q.category).toBe('number');
    }

    const lettersQueue = generatePracticeQueue({ direction: 'text-to-morse', category: 'letter' }, 8);
    expect(lettersQueue).toHaveLength(8);
    for (const q of lettersQueue) {
      expect(q.category).toBe('letter');
    }
  });

  it('supports weak-character focused practice queue generation', () => {
    const weakQueue = generatePracticeQueue(
      {
        direction: 'morse-to-text',
        category: 'weak',
        weakCharacters: ['Q', 'Z', 'X'],
      },
      3
    );
    expect(weakQueue.length).toBeLessThanOrEqual(3);
    for (const q of weakQueue) {
      expect(['Q', 'Z', 'X']).toContain(q.expectedAnswer);
    }
  });
});

describe('Release 2: Quiz Engine & Scoring Rules (PRD Section 16.4, Journey 10 & FR-027)', () => {
  it('contains comprehensive questions across all core categories', () => {
    expect(QUIZ_QUESTION_BANK.length).toBeGreaterThanOrEqual(20);

    const categories = new Set(QUIZ_QUESTION_BANK.map((q) => q.category));
    expect(categories.has('timing')).toBe(true);
    expect(categories.has('letters')).toBe(true);
    expect(categories.has('numbers')).toBe(true);
    expect(categories.has('punctuation')).toBe(true);
  });

  it('generates a 10-question randomized quiz', () => {
    const quiz = generateQuiz(10);
    expect(quiz).toHaveLength(10);

    const ids = new Set(quiz.map((q) => q.id));
    expect(ids.size).toBe(10); // No duplicates
  });

  it('evaluates quiz submissions deterministically with accurate percentage scoring', () => {
    const sampleQuestions = QUIZ_QUESTION_BANK.slice(0, 5);

    // Answer 4 correctly, 1 incorrectly
    const answers: Record<string, string> = {
      [sampleQuestions[0].id]: sampleQuestions[0].correctAnswer,
      [sampleQuestions[1].id]: sampleQuestions[1].correctAnswer.toLowerCase(), // Case-insensitive test
      [sampleQuestions[2].id]: sampleQuestions[2].correctAnswer,
      [sampleQuestions[3].id]: sampleQuestions[3].correctAnswer,
      [sampleQuestions[4].id]: 'WRONG_ANSWER_VALUE',
    };

    const evaluation = evaluateQuizSubmission(sampleQuestions, answers);
    expect(evaluation.score).toBe(4);
    expect(evaluation.total).toBe(5);
    expect(evaluation.percentage).toBe(80);
    expect(evaluation.reviewList).toHaveLength(5);

    expect(evaluation.reviewList[0].isCorrect).toBe(true);
    expect(evaluation.reviewList[1].isCorrect).toBe(true);
    expect(evaluation.reviewList[4].isCorrect).toBe(false);
  });

  it('normalizes quiz answers properly', () => {
    expect(normalizeQuizAnswer('  sos  ')).toBe('SOS');
    expect(normalizeQuizAnswer('3 dots')).toBe('3 DOTS');
  });
});
