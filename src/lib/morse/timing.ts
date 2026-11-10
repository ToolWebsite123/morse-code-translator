/**
 * Morse Timing & Audio Unit Scheduling Module
 *
 * Implements standard international Morse timing based on the 50-unit
 * PARIS reference calibration word (PRD.md Section 15.7).
 */

export interface MorseTimingConstants {
  wpm: number;
  unitDurationMs: number; // T = 1200 / WPM
  dotDurationMs: number; // 1T
  dashDurationMs: number; // 3T
  intraCharGapMs: number; // 1T (gap between dots/dashes within same character)
  interCharGapMs: number; // 3T (gap between letters)
  interWordGapMs: number; // 7T (gap between words)
}

export type PlaybackEventType = 'tone' | 'gap';

export interface PlaybackEvent {
  type: PlaybackEventType;
  durationMs: number;
  symbol?: '.' | '-';
  character?: string;
  charIndex?: number;
  wordIndex?: number;
}

/**
 * Calculates standard Morse timing durations based on Words Per Minute (WPM).
 *
 * Standard formula: T = 1200 / WPM
 * Clamped between 5 WPM and 30 WPM.
 */
export function calculateMorseTiming(wpm: number): MorseTimingConstants {
  const clampedWpm = Math.max(5, Math.min(30, Math.round(wpm)));
  const unitDurationMs = 1200 / clampedWpm;

  return {
    wpm: clampedWpm,
    unitDurationMs,
    dotDurationMs: unitDurationMs,
    dashDurationMs: unitDurationMs * 3,
    intraCharGapMs: unitDurationMs,
    interCharGapMs: unitDurationMs * 3,
    interWordGapMs: unitDurationMs * 7,
  };
}

/**
 * Parses a Morse code string into an ordered sequence of tone and silence
 * events suitable for Web Audio synthesis and synchronized visual timeline playback.
 *
 * @param morse - Normalized Morse string (e.g. ".... . / .--")
 * @param wpm - Words per minute (5–30, default 15)
 * @returns Array of playback events with millisecond durations
 */
export function parseMorseToPlaybackEvents(
  morse: string,
  wpm: number = 15
): PlaybackEvent[] {
  if (!morse || morse.trim().length === 0) {
    return [];
  }

  const timing = calculateMorseTiming(wpm);
  const events: PlaybackEvent[] = [];

  // Split into words by '/'
  const words = morse.trim().split(/\s*\/\s*/);

  for (let w = 0; w < words.length; w++) {
    const word = words[w];
    if (!word) continue;

    // Split word into letters by spaces
    const letters = word.trim().split(/\s+/);

    for (let l = 0; l < letters.length; l++) {
      const letterMorse = letters[l];
      if (!letterMorse) continue;

      for (let s = 0; s < letterMorse.length; s++) {
        const symbol = letterMorse[s];

        if (symbol === '.' || symbol === '-') {
          // Tone event
          events.push({
            type: 'tone',
            durationMs: symbol === '.' ? timing.dotDurationMs : timing.dashDurationMs,
            symbol,
            charIndex: l,
            wordIndex: w,
          });

          // Intra-character gap (between symbols of the same letter)
          if (s < letterMorse.length - 1) {
            events.push({
              type: 'gap',
              durationMs: timing.intraCharGapMs,
              charIndex: l,
              wordIndex: w,
            });
          }
        }
      }

      // Inter-character gap (between letters of the same word)
      if (l < letters.length - 1) {
        events.push({
          type: 'gap',
          durationMs: timing.interCharGapMs,
          charIndex: l,
          wordIndex: w,
        });
      }
    }

    // Inter-word gap (between words)
    if (w < words.length - 1) {
      events.push({
        type: 'gap',
        durationMs: timing.interWordGapMs,
        wordIndex: w,
      });
    }
  }

  return events;
}

