/**
 * Canonical International Morse Code Mapping Table
 *
 * Source: PRD.md Section 15.2 (Approved Standard)
 *
 * This file is the single source of truth for the entire application:
 * - Translation Encoder & Decoder
 * - Audio Synthesis & Visual Playback
 * - Reference Chart Display
 * - Unit & Integration Test Suites
 */

import type { MorseReferenceItem } from '@/types';

/**
 * Approved Latin Letters (A–Z)
 */
export const LETTER_MAPPINGS: Readonly<Record<string, string>> = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
};

/**
 * Approved Digits (0–9)
 */
export const DIGIT_MAPPINGS: Readonly<Record<string, string>> = {
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
};

/**
 * Approved Punctuation Set (18 symbols)
 * Note: Literal slash '/' encodes to '-..-.' in Morse code.
 * The standalone token '/' is reserved as the word separator.
 */
export const PUNCTUATION_MAPPINGS: Readonly<Record<string, string>> = {
  '.': '.-.-.-',
  ',': '--..--',
  '?': '..--..',
  "'": '.----.',
  '!': '-.-.--',
  '/': '-..-.',
  '(': '-.--.',
  ')': '-.--.-',
  '&': '.-...',
  ':': '---...',
  ';': '-.-.-.',
  '=': '-...-',
  '+': '.-.-.',
  '-': '-....-',
  '_': '..--.-',
  '"': '.-..-.',
  $: '...-..-',
  '@': '.--.-.',
};

/**
 * Master Text-to-Morse dictionary combining Letters, Digits, and Punctuation
 */
export const TEXT_TO_MORSE_MAP: Readonly<Record<string, string>> = {
  ...LETTER_MAPPINGS,
  ...DIGIT_MAPPINGS,
  ...PUNCTUATION_MAPPINGS,
};

/**
 * Inverted Morse-to-Text dictionary for decoding
 */
export const MORSE_TO_TEXT_MAP: Readonly<Record<string, string>> = Object.entries(
  TEXT_TO_MORSE_MAP
).reduce<Record<string, string>>((acc, [char, code]) => {
  acc[code] = char;
  return acc;
}, {});

/**
 * Canonical Reference List with accessibility labels and categories
 */
export const CANONICAL_REFERENCE_LIST: readonly MorseReferenceItem[] = [
  // Letters
  ...Object.entries(LETTER_MAPPINGS).map(([char, morse]) => ({
    character: char,
    morse,
    category: 'letter' as const,
    label: `Letter ${char}`,
  })),
  // Numbers
  ...Object.entries(DIGIT_MAPPINGS).map(([char, morse]) => ({
    character: char,
    morse,
    category: 'number' as const,
    label: `Digit ${char}`,
  })),
  // Punctuation
  ...Object.entries(PUNCTUATION_MAPPINGS).map(([char, morse]) => ({
    character: char,
    morse,
    category: 'punctuation' as const,
    label: getPunctuationLabel(char),
  })),
];

function getPunctuationLabel(char: string): string {
  const labels: Record<string, string> = {
    '.': 'Period / Full Stop',
    ',': 'Comma',
    '?': 'Question Mark',
    "'": 'Apostrophe',
    '!': 'Exclamation Mark',
    '/': 'Slash (Literal)',
    '(': 'Open Parenthesis',
    ')': 'Close Parenthesis',
    '&': 'Ampersand',
    ':': 'Colon',
    ';': 'Semicolon',
    '=': 'Equals Sign',
    '+': 'Plus Sign',
    '-': 'Hyphen / Minus',
    _: 'Underscore',
    '"': 'Quotation Mark',
    $: 'Dollar Sign',
    '@': 'At Sign',
  };
  return labels[char] || `Punctuation ${char}`;
}

/**
 * Checks if a character is supported by the canonical International Morse mapping.
 */
export function isCharacterSupported(char: string): boolean {
  return TEXT_TO_MORSE_MAP[char.toUpperCase()] !== undefined;
}

/**
 * Checks if a Morse sequence is valid under the canonical mapping.
 */
export function isMorseSequenceValid(morse: string): boolean {
  return MORSE_TO_TEXT_MAP[morse] !== undefined;
}

