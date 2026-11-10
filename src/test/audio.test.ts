import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  calculateMorseTiming,
  parseMorseToPlaybackEvents,
} from '@/lib/morse';
import { morseAudio, MorseAudioEngine } from '@/features/audio/audioEngine';

describe('Phase 5: Audio Engine & Timing Standards', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    morseAudio.stop();
  });

  it('verifies standard speed bounds: 5 WPM to 30 WPM with default 15 WPM', () => {
    const defaultTiming = calculateMorseTiming(15);
    expect(defaultTiming.wpm).toBe(15);
    expect(defaultTiming.dotDurationMs).toBe(80);
    expect(defaultTiming.dashDurationMs).toBe(240);

    const minTiming = calculateMorseTiming(5);
    expect(minTiming.wpm).toBe(5);
    expect(minTiming.dotDurationMs).toBe(240);

    const maxTiming = calculateMorseTiming(30);
    expect(maxTiming.wpm).toBe(30);
    expect(maxTiming.dotDurationMs).toBe(40);
  });

  it('correctly schedules event sequences for SOS (... --- ...)', () => {
    const events = parseMorseToPlaybackEvents('... --- ...', 15);
    expect(events.length).toBeGreaterThan(0);

    // Filter tones
    const tones = events.filter((e) => e.type === 'tone');
    expect(tones).toHaveLength(9); // 3 dots + 3 dashes + 3 dots = 9 tones

    // Verify dot durations (80ms at 15 WPM)
    expect(tones[0].durationMs).toBe(80);
    expect(tones[0].symbol).toBe('.');

    // Verify dash durations (240ms at 15 WPM)
    expect(tones[3].durationMs).toBe(240);
    expect(tones[3].symbol).toBe('-');
  });

  it('correctly includes 7-unit inter-word gaps for "/" word boundary', () => {
    const events = parseMorseToPlaybackEvents('.- / -...', 15);
    const wordGap = events.find((e) => e.type === 'gap' && e.durationMs === 560); // 7 * 80ms = 560ms
    expect(wordGap).toBeDefined();
    expect(wordGap?.durationMs).toBe(560);
  });

  it('handles empty or whitespace-only Morse gracefully without throwing', () => {
    expect(parseMorseToPlaybackEvents('')).toEqual([]);
    expect(parseMorseToPlaybackEvents('   ')).toEqual([]);
    expect(parseMorseToPlaybackEvents(' / ')).toEqual([]);
  });

  it('MorseAudioEngine stops cleanly and resets playing state', () => {
    const engine = new MorseAudioEngine();
    expect(engine.getIsPlaying()).toBe(false);

    engine.stop();
    expect(engine.getIsPlaying()).toBe(false);
  });
});

