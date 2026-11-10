/**
 * Practice Drills Engine
 *
 * Implements interactive flashcard practice as defined in PRD Section 6.10 & 16.3.
 */

import { CANONICAL_REFERENCE_LIST } from '@/lib/morse';
import { normalizeMorseInput, normalizeTextInput } from '@/lib/morse/normalize';
import type { PracticeDirection, PracticeQuestion } from '@/types/learning';

export interface PracticeFilterOptions {
  category: 'all' | 'letter' | 'number' | 'punctuation' | 'weak';
  direction: PracticeDirection;
  weakCharacters?: string[];
}

/**
 * Normalizes user answer according to exercise direction
 */
export function normalizePracticeAnswer(rawAnswer: string, direction: PracticeDirection): string {
  if (!rawAnswer) return '';

  if (direction === 'text-to-morse') {
    // Normalize unicode dashes/dots and collapse spaces
    return normalizeMorseInput(rawAnswer).trim().replace(/\s+/g, ' ');
  }

  // Morse-to-text and audio-to-text: uppercase text, trimmed
  return normalizeTextInput(rawAnswer).trim().toUpperCase();
}

/**
 * Checks if a user's answer matches the expected answer under canonical rules
 */
export function evaluatePracticeAnswer(
  rawAnswer: string,
  expectedAnswer: string,
  direction: PracticeDirection
): { isCorrect: boolean; normalizedUser: string; normalizedExpected: string } {
  const normalizedUser = normalizePracticeAnswer(rawAnswer, direction);
  const normalizedExpected = normalizePracticeAnswer(expectedAnswer, direction);

  const isCorrect = normalizedUser === normalizedExpected;

  return {
    isCorrect,
    normalizedUser,
    normalizedExpected,
  };
}

/**
 * Generates a practice queue of questions
 */
export function generatePracticeQueue(
  options: PracticeFilterOptions,
  count: number = 10,
  shuffle: boolean = true
): PracticeQuestion[] {
  let pool = [...CANONICAL_REFERENCE_LIST];

  if (options.category === 'weak' && options.weakCharacters && options.weakCharacters.length > 0) {
    const weakSet = new Set(options.weakCharacters.map((c) => c.toUpperCase()));
    const filteredWeak = pool.filter((item) => weakSet.has(item.character.toUpperCase()));
    if (filteredWeak.length > 0) {
      pool = filteredWeak;
    }
  } else if (options.category !== 'all' && options.category !== 'weak') {
    pool = pool.filter((item) => item.category === options.category);
  }

  let selectedItems = pool;
  if (shuffle) {
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    selectedItems = shuffled.slice(0, count);
  } else {
    selectedItems = pool.slice(0, count);
  }

  return selectedItems.map((item, index) => {
    if (options.direction === 'text-to-morse') {
      return {
        id: `drill-${index}-${item.character}`,
        prompt: item.character,
        displayPrompt: item.character,
        expectedAnswer: item.morse,
        direction: options.direction,
        audioMorse: item.morse,
        category: item.category === 'prosign' ? 'punctuation' : item.category,
        explanation: `${item.character} in Morse code is ${item.morse} (${item.label}).`,
      };
    }

    if (options.direction === 'audio-to-text') {
      return {
        id: `drill-${index}-${item.character}`,
        prompt: 'Listen to the acoustic Morse tone',
        displayPrompt: '♪ Sound Signal',
        expectedAnswer: item.character,
        direction: options.direction,
        audioMorse: item.morse,
        category: item.category === 'prosign' ? 'punctuation' : item.category,
        explanation: `The sound was ${item.morse}, which is the character ${item.character} (${item.label}).`,
      };
    }

    // Default: morse-to-text
    return {
      id: `drill-${index}-${item.character}`,
      prompt: item.morse,
      displayPrompt: item.morse,
      expectedAnswer: item.character,
      direction: options.direction,
      audioMorse: item.morse,
      category: item.category === 'prosign' ? 'punctuation' : item.category,
      explanation: `${item.morse} decodes to the character ${item.character} (${item.label}).`,
    };
  });
}
