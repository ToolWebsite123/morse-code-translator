/**
 * Text-to-Morse Encoder Module
 *
 * Implements canonical International Morse Code encoding as defined in
 * PRD.md Section 15.4 and verified by Section 15.6 fixtures.
 */

import { TEXT_TO_MORSE_MAP, isCharacterSupported } from './mapping';
import { normalizeTextInput } from './normalize';
import type { TranslationResult, TranslationWarning } from '@/types';

export const MAX_INPUT_LENGTH = 10_000;

/**
 * Encodes plain text into International Morse Code.
 *
 * @param input - The raw text entered by the user
 * @param maxLength - Maximum permitted character count (default 10,000)
 * @returns TranslationResult with formatted Morse string and detailed warnings
 */
export function encodeTextToMorse(
  input: string,
  maxLength: number = MAX_INPUT_LENGTH
): TranslationResult {
  const warnings: TranslationWarning[] = [];

  // Guard: Empty or undefined input
  if (!input || input.trim().length === 0) {
    return {
      output: '',
      warnings: [],
      hasWarnings: false,
    };
  }

  // Guard: Enforce maximum input limit
  let processedInput = input;
  if (input.length > maxLength) {
    warnings.push({
      id: 'input-length-exceeded',
      type: 'formatting',
      message: `Input exceeded maximum limit of ${maxLength.toLocaleString()} characters. Truncated to ${maxLength.toLocaleString()}.`,
    });
    processedInput = input.slice(0, maxLength);
  }

  // Track unsupported characters with their 1-based position in original input (surrogate-pair safe)
  let position = 0;
  for (const rawChar of processedInput) {
    position++;
    // Whitespace is a valid word delimiter, not an unsupported character
    if (rawChar <= ' ' || /\s/.test(rawChar)) {
      continue;
    }
    if (!isCharacterSupported(rawChar)) {
      warnings.push({
        id: `unsupported-char-${position}`,
        type: 'unsupported-character',
        message: `Character '${rawChar}' at position ${position} is not in the International Morse Latin set.`,
        character: rawChar,
        position,
      });
    }
  }

  // Normalize text for parsing (NFC, unicode spaces to standard space)
  const normalized = normalizeTextInput(processedInput).trim();
  if (normalized.length === 0) {
    return {
      output: '',
      warnings,
      hasWarnings: warnings.length > 0,
    };
  }

  // Split into words by collapsing consecutive whitespace
  const rawWords = normalized.split(/\s+/);
  const morseWords: string[] = [];

  for (const word of rawWords) {
    const morseCharacters: string[] = [];

    for (const char of word) {
      const upperChar = char.toUpperCase();
      const code = TEXT_TO_MORSE_MAP[upperChar];

      if (code) {
        morseCharacters.push(code);
      }
      // If character is unsupported, it has already been recorded in warnings,
      // and we omit its Morse token so the rest of the message remains valid.
    }

    if (morseCharacters.length > 0) {
      morseWords.push(morseCharacters.join(' '));
    }
  }

  const output = morseWords.join(' / ');

  return {
    output,
    warnings,
    hasWarnings: warnings.length > 0,
  };
}
