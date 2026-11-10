/**
 * Morse-to-Text Decoder Module
 *
 * Implements canonical International Morse Code decoding as defined in
 * PRD.md Section 15.5 and verified by Section 15.6 fixtures.
 */

import { MORSE_TO_TEXT_MAP } from './mapping';
import { normalizeMorseInput } from './normalize';
import type { TranslationResult, TranslationWarning } from '@/types';

export const INVALID_GROUP_REPLACEMENT = '[?]';

/**
 * Decodes International Morse Code into plain text.
 *
 * @param input - The raw Morse code string entered by the user
 * @param maxLength - Maximum permitted character count (default 10,000)
 * @returns TranslationResult with decoded text and detailed warnings
 */
export function decodeMorseToText(
  input: string,
  maxLength: number = 10_000
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

  // Guard: Input length validation
  let processedInput = input;
  if (input.length > maxLength) {
    warnings.push({
      id: 'morse-length-exceeded',
      type: 'formatting',
      message: `Input exceeded maximum limit of ${maxLength.toLocaleString()} characters. Truncated to ${maxLength.toLocaleString()}.`,
    });
    processedInput = input.slice(0, maxLength);
  }

  // Normalize dash/dot variants and whitespace
  const normalized = normalizeMorseInput(processedInput).trim();
  if (normalized.length === 0) {
    return {
      output: '',
      warnings,
      hasWarnings: warnings.length > 0,
    };
  }

  // Check for edge case: Input consists ONLY of word separator slashes (e.g., '/')
  if (/^[\s/]+$/.test(normalized)) {
    warnings.push({
      id: 'empty-word-boundary',
      type: 'formatting',
      message: 'Word separator "/" provided without Morse code characters.',
    });
    return {
      output: '',
      warnings,
      hasWarnings: true,
    };
  }

  // Check for formatting anomalies: leading, trailing, or consecutive slashes
  if (normalized.startsWith('/')) {
    warnings.push({
      id: 'leading-slash',
      type: 'formatting',
      message: 'Leading word separator "/" detected.',
    });
  }
  if (normalized.endsWith('/')) {
    warnings.push({
      id: 'trailing-slash',
      type: 'formatting',
      message: 'Trailing word separator "/" detected.',
    });
  }
  if (/\/{2,}/.test(normalized)) {
    warnings.push({
      id: 'consecutive-slashes',
      type: 'formatting',
      message: 'Consecutive word separators "//" detected.',
    });
  }

  // Split into words by '/' (word separator)
  // We filter out empty segments caused by leading, trailing, or multiple slashes
  const wordTokens = normalized.split('/').map((w) => w.trim());
  const decodedWords: string[] = [];

  let warningCounter = 0;

  for (let wordIndex = 0; wordIndex < wordTokens.length; wordIndex++) {
    const rawWord = wordTokens[wordIndex];
    if (rawWord.length === 0) {
      continue; // Skip empty words from extra slashes
    }

    // Split word into letter groups by one or more whitespace characters
    const letterGroups = rawWord.split(/\s+/);
    let decodedWord = '';

    for (const group of letterGroups) {
      if (group.length === 0) continue;

      const decodedChar = MORSE_TO_TEXT_MAP[group];

      if (decodedChar) {
        decodedWord += decodedChar;
      } else {
        // Invalid or unknown group
        warningCounter++;
        decodedWord += INVALID_GROUP_REPLACEMENT;

        warnings.push({
          id: `invalid-group-${warningCounter}`,
          type: 'invalid-morse-group',
          message: `Unrecognized Morse group '${group}' at word ${wordIndex + 1} replaced with ${INVALID_GROUP_REPLACEMENT}.`,
          rawToken: group,
        });
      }
    }

    if (decodedWord.length > 0) {
      decodedWords.push(decodedWord);
    }
  }

  const output = decodedWords.join(' ');

  return {
    output,
    warnings,
    hasWarnings: warnings.length > 0,
  };
}

