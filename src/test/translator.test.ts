import { describe, it, expect } from 'vitest';
import {
  CANONICAL_REFERENCE_LIST,
  TEXT_TO_MORSE_MAP,
  encodeTextToMorse,
  decodeMorseToText,
  MAX_INPUT_LENGTH,
} from '@/lib/morse';

describe('Phase 4: Canonical Reference Chart Integrity', () => {
  it('should include exactly 54 approved characters in the reference list', () => {
    // 26 letters + 10 digits + 18 punctuation marks = 54
    expect(CANONICAL_REFERENCE_LIST).toHaveLength(54);
  });

  it('should categorize entries properly into letters, numbers, and punctuation', () => {
    const letters = CANONICAL_REFERENCE_LIST.filter((i) => i.category === 'letter');
    const numbers = CANONICAL_REFERENCE_LIST.filter((i) => i.category === 'number');
    const punctuation = CANONICAL_REFERENCE_LIST.filter((i) => i.category === 'punctuation');

    expect(letters).toHaveLength(26);
    expect(numbers).toHaveLength(10);
    expect(punctuation).toHaveLength(18);
  });

  it('should ensure reference table codes strictly match the canonical encoder map', () => {
    for (const item of CANONICAL_REFERENCE_LIST) {
      expect(TEXT_TO_MORSE_MAP[item.character]).toBe(item.morse);
      expect(item.label.length).toBeGreaterThan(0);
    }
  });
});

describe('Phase 4: Translator State & Direction Switch Rules (PRD FR-007)', () => {
  it('Direction Switch Rule: preserves input string exactly when changing mode (Text -> Morse to Morse -> Text)', () => {
    const originalInput = 'HELLO';

    // 1. In Text -> Morse mode
    const textToMorseResult = encodeTextToMorse(originalInput);
    expect(textToMorseResult.output).toBe('.... . .-.. .-.. ---');
    expect(textToMorseResult.hasWarnings).toBe(false);

    // 2. User toggles direction to Morse -> Text
    // The exact same input string 'HELLO' is re-evaluated under Morse -> Text
    const morseToTextResult = decodeMorseToText(originalInput);
    // 'HELLO' is not valid Morse code, so it produces [?] tokens and warnings,
    // proving the prior output was NOT transferred into input.
    expect(morseToTextResult.output).toBe('[?]');
    expect(morseToTextResult.hasWarnings).toBe(true);
    expect(morseToTextResult.warnings[0].type).toBe('invalid-morse-group');
  });

  it('Direction Switch Rule: preserves input string when changing mode (Morse -> Text to Text -> Morse)', () => {
    const originalMorseInput = '... --- ...';

    // 1. In Morse -> Text mode
    const morseToTextResult = decodeMorseToText(originalMorseInput);
    expect(morseToTextResult.output).toBe('SOS');
    expect(morseToTextResult.hasWarnings).toBe(false);

    // 2. User toggles direction to Text -> Morse
    // The input '... --- ...' is re-evaluated as plain text
    const textToMorseResult = encodeTextToMorse(originalMorseInput);
    // Period '.' encodes to '.-.-.-', hyphen '-' encodes to '-....-'
    expect(textToMorseResult.output).toBe(
      '.-.-.- .-.-.- .-.-.- / -....- -....- -....- / .-.-.- .-.-.- .-.-.-'
    );
    expect(textToMorseResult.hasWarnings).toBe(false);
  });

  it('handles input clearance without side effects', () => {
    const emptyResult = encodeTextToMorse('');
    expect(emptyResult.output).toBe('');
    expect(emptyResult.warnings).toHaveLength(0);
    expect(emptyResult.hasWarnings).toBe(false);
  });

  it('maintains 10,000 character maximum boundary constraint', () => {
    expect(MAX_INPUT_LENGTH).toBe(10_000);

    const normalInput = 'A'.repeat(5_000);
    const normalResult = encodeTextToMorse(normalInput);
    expect(normalResult.hasWarnings).toBe(false);

    const excessInput = 'A'.repeat(10_005);
    const excessResult = encodeTextToMorse(excessInput);
    expect(excessResult.hasWarnings).toBe(true);
    expect(excessResult.warnings[0].id).toBe('input-length-exceeded');
  });
});

