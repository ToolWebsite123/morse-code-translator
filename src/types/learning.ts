/**
 * Release 2 Learning & Quiz Platform Type Definitions
 *
 * Adheres strictly to PRD Section 3.2, 6.8-6.11, and 16.2-16.5.
 */

export interface LessonExample {
  text: string;
  morse: string;
  explanation: string;
}

export interface LessonExercise {
  question: string;
  prompt: string;
  expectedAnswer: string;
  type: 'text-to-morse' | 'morse-to-text';
  options?: string[]; // If multiple choice
  hint?: string;
  explanation: string;
}

export interface Lesson {
  id: string;
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  objective: string;
  category: 'fundamentals' | 'letters' | 'numbers' | 'punctuation' | 'timing';
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
  examples: LessonExample[];
  exercise: LessonExercise;
}

export type PracticeDirection = 'morse-to-text' | 'text-to-morse' | 'audio-to-text';

export interface PracticeQuestion {
  id: string;
  prompt: string;
  displayPrompt: string;
  expectedAnswer: string;
  direction: PracticeDirection;
  audioMorse?: string;
  category: 'letter' | 'number' | 'punctuation';
  explanation: string;
}

export type QuizQuestionType = 'multiple-choice' | 'typed-answer' | 'audio-recognition';

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  prompt: string;
  morseSequence?: string;
  audioMorse?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  category: 'fundamentals' | 'letters' | 'numbers' | 'punctuation' | 'timing';
}

export interface QuizUserAnswer {
  questionId: string;
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizResultRecord {
  id: string;
  date: string;
  score: number;
  total: number;
  percentage: number;
}

export interface PracticeStreak {
  current: number;
  longest: number;
  lastDate: string; // YYYY-MM-DD format
}

export interface LearningProgress {
  version: 1;
  completedLessons: string[];
  quizHistory: QuizResultRecord[];
  practiceStats: {
    totalAttempts: number;
    correctAttempts: number;
    weakCharacters: Record<string, { attempts: number; correct: number }>;
  };
  streak?: PracticeStreak;
  lastActiveDate: string;
}

