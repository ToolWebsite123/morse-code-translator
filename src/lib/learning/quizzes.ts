/**
 * Quiz Engine & Question Bank
 *
 * Implements standardized 10-question evaluation according to PRD Section 6.11, 16.4, and Journey 10.
 */

import type { QuizQuestion, QuizUserAnswer } from '@/types/learning';
import { normalizeTextInput } from '@/lib/morse/normalize';

export const QUIZ_QUESTION_BANK: readonly QuizQuestion[] = [
  // Fundamentals & Timing
  {
    id: 'q-timing-01',
    category: 'timing',
    type: 'multiple-choice',
    prompt: 'In International Morse Code, a dash duration is equal to how many dots?',
    options: ['1 dot', '2 dots', '3 dots', '5 dots'],
    correctAnswer: '3 dots',
    explanation: 'According to Recommendation ITU-R M.1677-1, one dash duration is equal to exactly three dots.',
  },
  {
    id: 'q-timing-02',
    category: 'timing',
    type: 'multiple-choice',
    prompt: 'What pause duration separates two different letters within the same word?',
    options: ['1 dot unit', '3 dot units', '5 dot units', '7 dot units'],
    correctAnswer: '3 dot units',
    explanation: 'The space between letters within a word is 3 dot units. The pause between elements of the same letter is 1 dot unit.',
  },
  {
    id: 'q-timing-03',
    category: 'timing',
    type: 'multiple-choice',
    prompt: 'What 5-letter calibration word is standard worldwide for measuring Morse speed (WPM)?',
    options: ['MORSE', 'PARIS', 'RADIO', 'WORLD'],
    correctAnswer: 'PARIS',
    explanation: 'The word PARIS takes exactly 50 timing units (including standard letter and word pauses), making it the universal reference word for WPM calculations.',
  },
  {
    id: 'q-timing-04',
    category: 'timing',
    type: 'multiple-choice',
    prompt: 'How many timing units of pause separate distinct words in Morse audio transmission?',
    options: ['3 units', '5 units', '7 units', '10 units'],
    correctAnswer: '7 units',
    explanation: 'A 7-unit pause represents the space between words. In written Morse code, this is symbolized by the forward slash (/).',
  },

  // Letters
  {
    id: 'q-letter-01',
    category: 'letters',
    type: 'multiple-choice',
    prompt: 'What letter in the alphabet is represented by a single dot (.) in Morse code?',
    options: ['E', 'T', 'I', 'A'],
    correctAnswer: 'E',
    explanation: 'E is the most common letter in English, so Samuel Morse assigned it the shortest code: a single dot (.).',
  },
  {
    id: 'q-letter-02',
    category: 'letters',
    type: 'multiple-choice',
    prompt: 'What letter is represented by a single dash (-) in Morse code?',
    options: ['M', 'T', 'O', 'N'],
    correctAnswer: 'T',
    explanation: 'The single dash (-) represents the letter T.',
  },
  {
    id: 'q-letter-03',
    category: 'letters',
    type: 'multiple-choice',
    prompt: 'What letter does the Morse sequence .--. represent?',
    options: ['P', 'Q', 'R', 'J'],
    correctAnswer: 'P',
    explanation: '.--. is the letter P (dot-dash-dash-dot).',
  },
  {
    id: 'q-letter-04',
    category: 'letters',
    type: 'multiple-choice',
    prompt: 'Which two letters are exact mirror opposites in Morse code?',
    options: ['A (.-) and N (-.)', 'E (.) and I (..)', 'M (--) and T (-)', 'S (...) and O (---)'],
    correctAnswer: 'A (.-) and N (-.)',
    explanation: 'A is dot-dash (.-) and N is dash-dot (-.), forming an exact inverted mirror pair.',
  },
  {
    id: 'q-letter-05',
    category: 'letters',
    type: 'typed-answer',
    prompt: 'What three-letter emergency distress signal is encoded as: ... --- ... ?',
    correctAnswer: 'SOS',
    explanation: '... is S, --- is O, and ... is S, spelling SOS.',
  },
  {
    id: 'q-letter-06',
    category: 'letters',
    type: 'typed-answer',
    prompt: 'What letter does two dots (..) represent?',
    correctAnswer: 'I',
    explanation: 'Two dots (..) represent the letter I.',
  },
  {
    id: 'q-letter-07',
    category: 'letters',
    type: 'multiple-choice',
    prompt: 'What is the Morse sequence for the letter K?',
    options: ['-.-', '.-.', '--.', '..-'],
    correctAnswer: '-.-',
    explanation: 'K is dash-dot-dash (-.-). Symmetrically opposite to R (.-.).',
  },

  // Numbers
  {
    id: 'q-num-01',
    category: 'numbers',
    type: 'multiple-choice',
    prompt: 'How many elements (dots and dashes) make up every Arabic digit (0 to 9) in Morse code?',
    options: ['3 elements', '4 elements', '5 elements', '6 elements'],
    correctAnswer: '5 elements',
    explanation: 'Every number in International Morse Code is composed of exactly 5 elements.',
  },
  {
    id: 'q-num-02',
    category: 'numbers',
    type: 'typed-answer',
    prompt: 'What number is encoded as five consecutive dots: ..... ?',
    correctAnswer: '5',
    explanation: 'Five dots (.....) represents the number 5, while five dashes (-----) represents 0.',
  },
  {
    id: 'q-num-03',
    category: 'numbers',
    type: 'typed-answer',
    prompt: 'What number is encoded as five consecutive dashes: ----- ?',
    correctAnswer: '0',
    explanation: 'Five dashes (-----) represents the digit 0.',
  },
  {
    id: 'q-num-04',
    category: 'numbers',
    type: 'multiple-choice',
    prompt: 'What is the Morse code for the digit 7?',
    options: ['--...', '---..', '-....', '..---'],
    correctAnswer: '--...',
    explanation: '7 is two dashes followed by three dots (--...).',
  },

  // Punctuation & Boundaries
  {
    id: 'q-punct-01',
    category: 'punctuation',
    type: 'multiple-choice',
    prompt: 'What is the official Morse code sequence for a Question Mark (?)?',
    options: ['..--..', '.-.-.-', '--..--', '-..-.'],
    correctAnswer: '..--..',
    explanation: 'The question mark is ..--.. (two dots, two dashes, two dots).',
  },
  {
    id: 'q-punct-02',
    category: 'punctuation',
    type: 'multiple-choice',
    prompt: 'What punctuation symbol is represented by: .-.-.- ?',
    options: ['Period / Full Stop', 'Comma', 'Exclamation Mark', 'Colon'],
    correctAnswer: 'Period / Full Stop',
    explanation: '.-.-.- is the full stop / period (dot-dash-dot-dash-dot-dash).',
  },
  {
    id: 'q-punct-03',
    category: 'punctuation',
    type: 'multiple-choice',
    prompt: 'In written Morse translators, how is a literal forward slash character (/) in text encoded?',
    options: ['-..-.', '..--..', '/ (as a space)', '.--.-.'],
    correctAnswer: '-..-.',
    explanation: 'A literal slash is transmitted as -..-., ensuring it is not confused with the word space separator.',
  },
  {
    id: 'q-punct-04',
    category: 'punctuation',
    type: 'typed-answer',
    prompt: 'What punctuation symbol is encoded as: --..-- ?',
    correctAnswer: ',',
    explanation: '--..-- is the standard comma symbol.',
  },

  // Audio Recognition
  {
    id: 'q-audio-01',
    category: 'letters',
    type: 'audio-recognition',
    prompt: 'Listen to the audio sequence and identify the letter:',
    audioMorse: '.-',
    options: ['A', 'N', 'T', 'E'],
    correctAnswer: 'A',
    explanation: 'The sequence was .- (dit-dah), which is the letter A.',
  },
  {
    id: 'q-audio-02',
    category: 'letters',
    type: 'audio-recognition',
    prompt: 'Listen to the audio sequence and identify the letter:',
    audioMorse: '...',
    options: ['S', 'O', 'H', 'E'],
    correctAnswer: 'S',
    explanation: 'The sequence was ... (three dots), which is the letter S.',
  },
  {
    id: 'q-audio-03',
    category: 'numbers',
    type: 'audio-recognition',
    prompt: 'Listen to the audio sequence and identify the digit:',
    audioMorse: '.----',
    options: ['1', '2', '3', '5'],
    correctAnswer: '1',
    explanation: 'The sequence was .---- (one dot, four dashes), which is the number 1.',
  },
];

/**
 * Normalizes user answer for quiz evaluation
 */
export function normalizeQuizAnswer(answer: string): string {
  if (!answer) return '';
  return normalizeTextInput(answer).trim().toUpperCase();
}

/**
 * Generates a randomized 10-question quiz selecting a balanced mix across categories
 */
export function generateQuiz(count: number = 10): QuizQuestion[] {
  const shuffled = [...QUIZ_QUESTION_BANK];

  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

/**
 * Evaluates the full quiz submission and produces detailed scoring and answer reviews
 */
export function evaluateQuizSubmission(
  questions: QuizQuestion[],
  userAnswers: Record<string, string>
): {
  score: number;
  total: number;
  percentage: number;
  reviewList: QuizUserAnswer[];
} {
  let score = 0;
  const reviewList: QuizUserAnswer[] = [];

  for (const q of questions) {
    const rawUserAnswer = userAnswers[q.id] || '';
    const normUser = normalizeQuizAnswer(rawUserAnswer);
    const normExpected = normalizeQuizAnswer(q.correctAnswer);

    const isCorrect = normUser === normExpected;
    if (isCorrect) {
      score++;
    }

    reviewList.push({
      questionId: q.id,
      prompt: q.prompt,
      userAnswer: rawUserAnswer || '(No answer)',
      correctAnswer: q.correctAnswer,
      isCorrect,
      explanation: q.explanation,
    });
  }

  const total = questions.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return {
    score,
    total,
    percentage,
    reviewList,
  };
}
