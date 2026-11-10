import { describe, it, expect } from 'vitest';
import {
  TEXT_TO_MORSE_MAP,
  MORSE_TO_TEXT_MAP,
  LETTER_MAPPINGS,
  DIGIT_MAPPINGS,
  PUNCTUATION_MAPPINGS,
  isCharacterSupported,
  isMorseSequenceValid,
  encodeTextToMorse,
  decodeMorseToText,
  calculateMorseTiming,
  parseMorseToPlaybackEvents,
  normalizeTextInput,
  normalizeMorseInput,
  MAX_INPUT_LENGTH,
} from '@/lib/morse';

describe('Canonical Mapping Integrity', () => {
  it('should contain all 26 uppercase Latin letters', () => {
    expect(Object.keys(LETTER_MAPPINGS)).toHaveLength(26);
    expect(LETTER_MAPPINGS.A).toBe('.-');
    expect(LETTER_MAPPINGS.S).toBe('...');
    expect(LETTER_MAPPINGS.Z).toBe('--..');
  });

  it('should contain all 10 Arabic digits (0-9)', () => {
    expect(Object.keys(DIGIT_MAPPINGS)).toHaveLength(10);
    expect(DIGIT_MAPPINGS['0']).toBe('-----');
    expect(DIGIT_MAPPINGS['5']).toBe('.....');
    expect(DIGIT_MAPPINGS['9']).toBe('----.');
  });

  it('should contain all 18 approved punctuation marks', () => {
    expect(Object.keys(PUNCTUATION_MAPPINGS)).toHaveLength(18);
    expect(PUNCTUATION_MAPPINGS['.']).toBe('.-.-.-');
    expect(PUNCTUATION_MAPPINGS[',']).toBe('--..--');
    expect(PUNCTUATION_MAPPINGS['?']).toBe('..--..');
    expect(PUNCTUATION_MAPPINGS['/']).toBe('-..-.');
    expect(PUNCTUATION_MAPPINGS['@']).toBe('.--.-.');
  });

  it('should have exact reciprocal inverted mappings', () => {
    for (const [char, code] of Object.entries(TEXT_TO_MORSE_MAP)) {
      expect(MORSE_TO_TEXT_MAP[code]).toBe(char);
    }
  });

  it('should correctly identify supported characters and codes', () => {
    expect(isCharacterSupported('a')).toBe(true);
    expect(isCharacterSupported('A')).toBe(true);
    expect(isCharacterSupported('7')).toBe(true);
    expect(isCharacterSupported('?')).toBe(true);
    expect(isCharacterSupported('é')).toBe(false);
    expect(isCharacterSupported('🙂')).toBe(false);

    expect(isMorseSequenceValid('.-')).toBe(true);
    expect(isMorseSequenceValid('...')).toBe(true);
    expect(isMorseSequenceValid('...---...')).toBe(false); // Valid prosign, not single char
  });
});

describe('PRD Section 15.6 Canonical Test Fixtures (All 35 Scenarios)', () => {
  // 1: Text -> Morse: 'E' -> '.'
  it('Fixture 1: encodes "E" to "."', () => {
    const res = encodeTextToMorse('E');
    expect(res.output).toBe('.');
    expect(res.hasWarnings).toBe(false);
  });

  // 2: Text -> Morse: 'SOS' -> '... --- ...'
  it('Fixture 2: encodes "SOS" to "... --- ..."', () => {
    const res = encodeTextToMorse('SOS');
    expect(res.output).toBe('... --- ...');
    expect(res.hasWarnings).toBe(false);
  });

  // 3: Text -> Morse: 'HELLO' -> '.... . .-.. .-.. ---'
  it('Fixture 3: encodes "HELLO" to ".... . .-.. .-.. ---"', () => {
    const res = encodeTextToMorse('HELLO');
    expect(res.output).toBe('.... . .-.. .-.. ---');
    expect(res.hasWarnings).toBe(false);
  });

  // 4: Text -> Morse: 'HELLO WORLD' -> '.... . .-.. .-.. --- / .-- --- .-. .-.. -..'
  it('Fixture 4: encodes "HELLO WORLD" with "/" word separator', () => {
    const res = encodeTextToMorse('HELLO WORLD');
    expect(res.output).toBe('.... . .-.. .-.. --- / .-- --- .-. .-.. -..');
    expect(res.hasWarnings).toBe(false);
  });

  // 5: Text -> Morse: 'hello world' -> case-insensitive same as 'HELLO WORLD'
  it('Fixture 5: encodes lowercase "hello world" identically to uppercase', () => {
    const res = encodeTextToMorse('hello world');
    expect(res.output).toBe('.... . .-.. .-.. --- / .-- --- .-. .-.. -..');
    expect(res.hasWarnings).toBe(false);
  });

  // 6: Text -> Morse: 'A B' -> '.- / -...'
  it('Fixture 6: encodes "A B" to ".- / -..."', () => {
    const res = encodeTextToMorse('A B');
    expect(res.output).toBe('.- / -...');
    expect(res.hasWarnings).toBe(false);
  });

  // 7: Text -> Morse: '123' -> '.---- ..--- ...--'
  it('Fixture 7: encodes "123" to ".---- ..--- ...--"', () => {
    const res = encodeTextToMorse('123');
    expect(res.output).toBe('.---- ..--- ...--');
    expect(res.hasWarnings).toBe(false);
  });

  // 8: Text -> Morse: '2026' -> '..--- ----- ..--- -....'
  it('Fixture 8: encodes "2026" to "..--- ----- ..--- -...."', () => {
    const res = encodeTextToMorse('2026');
    expect(res.output).toBe('..--- ----- ..--- -....');
    expect(res.hasWarnings).toBe(false);
  });

  // 9: Text -> Morse: '.' -> '.-.-.-'
  it('Fixture 9: encodes period "." to ".-.-.-"', () => {
    const res = encodeTextToMorse('.');
    expect(res.output).toBe('.-.-.-');
    expect(res.hasWarnings).toBe(false);
  });

  // 10: Text -> Morse: '?' -> '..--..'
  it('Fixture 10: encodes question mark "?" to "..--.."', () => {
    const res = encodeTextToMorse('?');
    expect(res.output).toBe('..--..');
    expect(res.hasWarnings).toBe(false);
  });

  // 11: Text -> Morse: ',' -> '--..--'
  it('Fixture 11: encodes comma "," to "--..--"', () => {
    const res = encodeTextToMorse(',');
    expect(res.output).toBe('--..--');
    expect(res.hasWarnings).toBe(false);
  });

  // 12: Text -> Morse: 'SOS!' -> '... --- ... -.-.--'
  it('Fixture 12: encodes "SOS!" including exclamation mark', () => {
    const res = encodeTextToMorse('SOS!');
    expect(res.output).toBe('... --- ... -.-.--');
    expect(res.hasWarnings).toBe(false);
  });

  // 13: Text -> Morse: 'A  B' -> multiple spaces collapse
  it('Fixture 13: collapses multiple spaces in "A  B" into a single word separator', () => {
    const res = encodeTextToMorse('A  B');
    expect(res.output).toBe('.- / -...');
    expect(res.hasWarnings).toBe(false);
  });

  // 14: Text -> Morse: ' A ' -> outer spaces ignored
  it('Fixture 14: ignores leading and trailing spaces in " A "', () => {
    const res = encodeTextToMorse(' A ');
    expect(res.output).toBe('.-');
    expect(res.hasWarnings).toBe(false);
  });

  // 15: Text -> Morse: 'A🙂B' -> encodes supported characters, warns on emoji
  it('Fixture 15: handles "A🙂B" with warning for emoji without silent loss', () => {
    const res = encodeTextToMorse('A🙂B');
    expect(res.output).toBe('.- -...');
    expect(res.hasWarnings).toBe(true);
    expect(res.warnings[0].type).toBe('unsupported-character');
    expect(res.warnings[0].character).toBe('🙂');
    expect(res.warnings[0].position).toBe(2);
  });

  // 16: Text -> Morse: 'é' -> warning unsupported under Latin A-Z scope
  it('Fixture 16: warns for unsupported accented character "é"', () => {
    const res = encodeTextToMorse('é');
    expect(res.output).toBe('');
    expect(res.hasWarnings).toBe(true);
    expect(res.warnings[0].type).toBe('unsupported-character');
    expect(res.warnings[0].character).toBe('é');
  });

  // 17: Morse -> Text: '.... . .-.. .-.. ---' -> 'HELLO'
  it('Fixture 17: decodes ".... . .-.. .-.. ---" to "HELLO"', () => {
    const res = decodeMorseToText('.... . .-.. .-.. ---');
    expect(res.output).toBe('HELLO');
    expect(res.hasWarnings).toBe(false);
  });

  // 18: Morse -> Text: '.... . .-.. .-.. --- / .-- --- .-. .-.. -..' -> 'HELLO WORLD'
  it('Fixture 18: decodes ".... . .-.. .-.. --- / .-- --- .-. .-.. -.." to "HELLO WORLD"', () => {
    const res = decodeMorseToText('.... . .-.. .-.. --- / .-- --- .-. .-.. -..');
    expect(res.output).toBe('HELLO WORLD');
    expect(res.hasWarnings).toBe(false);
  });

  // 19: Morse -> Text: '... --- ...' -> 'SOS'
  it('Fixture 19: decodes "... --- ..." to "SOS"', () => {
    const res = decodeMorseToText('... --- ...');
    expect(res.output).toBe('SOS');
    expect(res.hasWarnings).toBe(false);
  });

  // 20: Morse -> Text: '.---- ..--- ...--' -> '123'
  it('Fixture 20: decodes ".---- ..--- ...--" to "123"', () => {
    const res = decodeMorseToText('.---- ..--- ...--');
    expect(res.output).toBe('123');
    expect(res.hasWarnings).toBe(false);
  });

  // 21: Morse -> Text: '.- / -...' -> 'A B'
  it('Fixture 21: decodes ".- / -..." to "A B"', () => {
    const res = decodeMorseToText('.- / -...');
    expect(res.output).toBe('A B');
    expect(res.hasWarnings).toBe(false);
  });

  // 22: Morse -> Text: '.-.-.- ..--..' -> '.?'
  it('Fixture 22: decodes ".-.-.- ..--.." to ".?"', () => {
    const res = decodeMorseToText('.-.-.- ..--..');
    expect(res.output).toBe('.?');
    expect(res.hasWarnings).toBe(false);
  });

  // 23: Morse -> Text: '...---...' -> unknown group warning and [?] replacement
  it('Fixture 23: warns for continuous unseparated "...---..." and renders [?]', () => {
    const res = decodeMorseToText('...---...');
    expect(res.output).toBe('[?]');
    expect(res.hasWarnings).toBe(true);
    expect(res.warnings[0].type).toBe('invalid-morse-group');
  });

  // 24: Morse -> Text: '.... .' -> 'HE'
  it('Fixture 24: decodes ".... ." to "HE"', () => {
    const res = decodeMorseToText('.... .');
    expect(res.output).toBe('HE');
    expect(res.hasWarnings).toBe(false);
  });

  // 25: Morse -> Text: '....   .' -> repeated whitespace is single separator
  it('Fixture 25: decodes "....   ." with multiple spaces to "HE"', () => {
    const res = decodeMorseToText('....   .');
    expect(res.output).toBe('HE');
    expect(res.hasWarnings).toBe(false);
  });

  // 26: Morse -> Text: '.... / .' -> 'H E'
  it('Fixture 26: decodes ".... / ." to "H E"', () => {
    const res = decodeMorseToText('.... / .');
    expect(res.output).toBe('H E');
    expect(res.hasWarnings).toBe(false);
  });

  // 27: Morse -> Text: '.... x .' -> warning for 'x', output 'H[?]E'
  it('Fixture 27: handles invalid character group in ".... x ." producing "H[?]E"', () => {
    const res = decodeMorseToText('.... x .');
    expect(res.output).toBe('H[?]E');
    expect(res.hasWarnings).toBe(true);
    expect(res.warnings[0].type).toBe('invalid-morse-group');
    expect(res.warnings[0].rawToken).toBe('x');
  });

  // 28: Morse -> Text: '..--..' -> '?'
  it('Fixture 28: decodes "..--.." to "?"', () => {
    const res = decodeMorseToText('..--..');
    expect(res.output).toBe('?');
    expect(res.hasWarnings).toBe(false);
  });

  // 29: Morse -> Text: '/' -> empty word boundary formatting warning
  it('Fixture 29: handles standalone "/" with formatting warning and empty output', () => {
    const res = decodeMorseToText('/');
    expect(res.output).toBe('');
    expect(res.hasWarnings).toBe(true);
    expect(res.warnings[0].type).toBe('formatting');
  });

  // 30: Either: empty string -> empty output, no error
  it('Fixture 30: empty string produces empty output and zero false errors in both directions', () => {
    const enc = encodeTextToMorse('');
    expect(enc.output).toBe('');
    expect(enc.hasWarnings).toBe(false);

    const dec = decodeMorseToText('');
    expect(dec.output).toBe('');
    expect(dec.hasWarnings).toBe(false);
  });

  // 31: Either: spaces only -> empty output, no false error
  it('Fixture 31: whitespace-only string produces empty output without errors', () => {
    const enc = encodeTextToMorse('     ');
    expect(enc.output).toBe('');
    expect(enc.hasWarnings).toBe(false);

    const dec = decodeMorseToText('     ');
    expect(dec.output).toBe('');
    expect(dec.hasWarnings).toBe(false);
  });

  // 32: Text -> Morse: 'A/B' -> '.- -..-. -...' (literal slash encoded as character)
  it('Fixture 32: encodes "A/B" with literal slash to ".- -..-. -..."', () => {
    const res = encodeTextToMorse('A/B');
    expect(res.output).toBe('.- -..-. -...');
    expect(res.hasWarnings).toBe(false);

    // Verify reciprocal decoding of literal slash
    const dec = decodeMorseToText('.- -..-. -...');
    expect(dec.output).toBe('A/B');
  });

  // 33: Text -> Morse: 'WAIT...' -> '.-- .- .. - .-.-.- .-.-.- .-.-.-'
  it('Fixture 33: encodes "WAIT..." with three periods', () => {
    const res = encodeTextToMorse('WAIT...');
    expect(res.output).toBe('.-- .- .. - .-.-.- .-.-.- .-.-.-');
    expect(res.hasWarnings).toBe(false);
  });

  // 34: Morse -> Text: '-.-.--' -> '!'
  it('Fixture 34: decodes "-.-.--" to "!"', () => {
    const res = decodeMorseToText('-.-.--');
    expect(res.output).toBe('!');
    expect(res.hasWarnings).toBe(false);
  });

  // 35: Morse -> Text: '.-.-.' -> '+'
  it('Fixture 35: decodes ".-.-." to "+"', () => {
    const res = decodeMorseToText('.-.-.');
    expect(res.output).toBe('+');
    expect(res.hasWarnings).toBe(false);
  });
});

describe('Audio Timing Math & PARIS 50-Unit Standard', () => {
  it('should correctly calculate standard durations for 15 WPM (Default)', () => {
    const t = calculateMorseTiming(15);
    expect(t.unitDurationMs).toBe(80);
    expect(t.dotDurationMs).toBe(80);
    expect(t.dashDurationMs).toBe(240);
    expect(t.intraCharGapMs).toBe(80);
    expect(t.interCharGapMs).toBe(240);
    expect(t.interWordGapMs).toBe(560);
  });

  it('should correctly calculate standard durations for 5 WPM (Slowest)', () => {
    const t = calculateMorseTiming(5);
    expect(t.unitDurationMs).toBe(240);
    expect(t.dotDurationMs).toBe(240);
    expect(t.dashDurationMs).toBe(720);
    expect(t.interWordGapMs).toBe(1680);
  });

  it('should correctly calculate standard durations for 30 WPM (Fastest)', () => {
    const t = calculateMorseTiming(30);
    expect(t.unitDurationMs).toBe(40);
    expect(t.dotDurationMs).toBe(40);
    expect(t.dashDurationMs).toBe(120);
    expect(t.interWordGapMs).toBe(280);
  });

  it('should clamp out-of-bounds WPM values safely', () => {
    expect(calculateMorseTiming(1).wpm).toBe(5);
    expect(calculateMorseTiming(100).wpm).toBe(30);
  });

  it('should parse Morse string into ordered tone and silence events', () => {
    // ".- / -..." (A B)
    const events = parseMorseToPlaybackEvents('.- / -...', 15);
    expect(events.length).toBeGreaterThan(0);

    // First event is dot tone (80ms)
    expect(events[0]).toEqual({
      type: 'tone',
      durationMs: 80,
      symbol: '.',
      charIndex: 0,
      wordIndex: 0,
    });

    // Second event is intra-char gap (80ms)
    expect(events[1]).toEqual({
      type: 'gap',
      durationMs: 80,
      charIndex: 0,
      wordIndex: 0,
    });

    // Third event is dash tone (240ms)
    expect(events[2]).toEqual({
      type: 'tone',
      durationMs: 240,
      symbol: '-',
      charIndex: 0,
      wordIndex: 0,
    });
  });
});

describe('Normalization & Robustness Edge Cases', () => {
  it('should normalize non-breaking spaces and tabs into standard spaces', () => {
    const raw = 'A\u00A0B\tC\r\nD';
    expect(normalizeTextInput(raw)).toBe('A B C D');
  });

  it('should normalize Unicode dash variants in Morse input', () => {
    const emDash = '—';
    const enDash = '–';
    const minus = '−';
    const normalized = normalizeMorseInput(`.${emDash} .${enDash} .${minus}`);
    expect(normalized).toBe('.- .- .-');
    expect(decodeMorseToText(`.${emDash}`).output).toBe('A');
  });

  it('should enforce maximum input limit (10,000 chars) with warning', () => {
    const longString = 'A'.repeat(MAX_INPUT_LENGTH + 500);
    const res = encodeTextToMorse(longString);
    expect(res.output.split(' ').length).toBe(MAX_INPUT_LENGTH);
    expect(res.hasWarnings).toBe(true);
    expect(res.warnings[0].type).toBe('formatting');
    expect(res.warnings[0].id).toBe('input-length-exceeded');
  });

  it('should handle tabs, newlines, and non-breaking spaces gracefully', () => {
    const textWithSpecialSpaces = 'HELLO\tWORLD\nFROM\u00A0MORSE';
    const res = encodeTextToMorse(textWithSpecialSpaces);
    expect(res.output).toBe(
      '.... . .-.. .-.. --- / .-- --- .-. .-.. -.. / ..-. .-. --- -- / -- --- .-. ... .'
    );
    expect(res.hasWarnings).toBe(false);
  });
});
