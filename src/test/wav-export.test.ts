import { describe, it, expect } from 'vitest';
import {
  calculateFarnsworthTiming,
  calculateMorseTiming,
} from '@/lib/morse';
import { generateMorseWav } from '@/lib/audio/wavEncoder';

describe('Farnsworth Timing Math (PRD Section 15.8)', () => {
  it('returns standard timing when effective WPM equals character WPM', () => {
    const std = calculateMorseTiming(15);
    const farnsworth = calculateFarnsworthTiming(15, 15);

    expect(farnsworth.isFarnsworth).toBe(false);
    expect(farnsworth.dotDurationMs).toBe(std.dotDurationMs);
    expect(farnsworth.dashDurationMs).toBe(std.dashDurationMs);
    expect(farnsworth.interCharGapMs).toBe(std.interCharGapMs);
    expect(farnsworth.interWordGapMs).toBe(std.interWordGapMs);
    expect(farnsworth.spacingUnitMs).toBe(std.unitDurationMs);
  });

  it('correctly calculates lengthened inter-character and inter-word gaps when effective WPM is lower', () => {
    // Character speed: 20 WPM (T = 1200 / 20 = 60 ms)
    // Effective speed: 10 WPM (PARIS total = 60000 / 10 = 6000 ms)
    // Marks/intra-char: 31 * T = 31 * 60 = 1860 ms
    // Remaining for 19 S units: 6000 - 1860 = 4140 ms
    // S = 4140 / 19 ≈ 217.8947 ms
    const farnsworth = calculateFarnsworthTiming(20, 10);

    expect(farnsworth.isFarnsworth).toBe(true);
    expect(farnsworth.characterWpm).toBe(20);
    expect(farnsworth.effectiveWpm).toBe(10);
    expect(farnsworth.dotDurationMs).toBe(60);
    expect(farnsworth.dashDurationMs).toBe(180);
    expect(farnsworth.intraCharGapMs).toBe(60);

    const expectedS = (60000 / 10 - 31 * 60) / 19;
    expect(farnsworth.spacingUnitMs).toBeCloseTo(expectedS, 3);
    expect(farnsworth.interCharGapMs).toBeCloseTo(3 * expectedS, 3);
    expect(farnsworth.interWordGapMs).toBeCloseTo(7 * expectedS, 3);
  });

  it('clamps effective WPM to not exceed character WPM', () => {
    const farnsworth = calculateFarnsworthTiming(15, 25);
    expect(farnsworth.effectiveWpm).toBe(15);
    expect(farnsworth.isFarnsworth).toBe(false);
  });
});

describe('WAV Audio Synthesis (PRD Section 15.11 & F-033)', () => {
  it('generates a valid RIFF WAVE Blob with audio/wav mime type', async () => {
    const blob = generateMorseWav('.-'); // 'A'
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('audio/wav');

    const arrayBuffer = await blob.arrayBuffer();
    const view = new DataView(arrayBuffer);

    // 1. RIFF header
    const riff = String.fromCharCode(
      view.getUint8(0),
      view.getUint8(1),
      view.getUint8(2),
      view.getUint8(3)
    );
    expect(riff).toBe('RIFF');

    // 2. WAVE header
    const wave = String.fromCharCode(
      view.getUint8(8),
      view.getUint8(9),
      view.getUint8(10),
      view.getUint8(11)
    );
    expect(wave).toBe('WAVE');

    // 3. fmt chunk
    const fmt = String.fromCharCode(
      view.getUint8(12),
      view.getUint8(13),
      view.getUint8(14),
      view.getUint8(15)
    );
    expect(fmt).toBe('fmt ');
    expect(view.getUint32(16, true)).toBe(16); // Subchunk1Size
    expect(view.getUint16(20, true)).toBe(1); // PCM
    expect(view.getUint16(22, true)).toBe(1); // Mono
    expect(view.getUint32(24, true)).toBe(44100); // 44100 Hz
    expect(view.getUint16(34, true)).toBe(16); // 16-bit

    // 4. data chunk
    const data = String.fromCharCode(
      view.getUint8(36),
      view.getUint8(37),
      view.getUint8(38),
      view.getUint8(39)
    );
    expect(data).toBe('data');

    const dataSize = view.getUint32(40, true);
    expect(arrayBuffer.byteLength).toBe(44 + dataSize);
    expect(dataSize).toBeGreaterThan(0);
  });

  it('synthesizes predictable sample lengths based on Morse events', async () => {
    // 'E' = 1 dot = 80ms at 15 WPM
    const sampleRate = 44100;
    const blob = generateMorseWav('.', { wpm: 15, sampleRate });
    const buffer = await blob.arrayBuffer();
    const view = new DataView(buffer);
    const dataSize = view.getUint32(40, true);

    const expectedSamples = Math.round((80 / 1000) * sampleRate);
    const actualSamples = dataSize / 2; // 2 bytes per sample

    expect(actualSamples).toBe(expectedSamples);
  });

  it('handles empty or whitespace-only morse strings safely with default silence buffer', async () => {
    const blob = generateMorseWav('');
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('audio/wav');

    const buffer = await blob.arrayBuffer();
    expect(buffer.byteLength).toBe(44 + Math.round(0.5 * 44100) * 2);
  });

  it('supports Farnsworth timing in WAV generation', async () => {
    // 20 WPM character, 10 WPM effective
    const standardBlob = generateMorseWav('.- -...', { wpm: 20 });
    const farnsworthBlob = generateMorseWav('.- -...', {
      farnsworth: { characterWpm: 20, effectiveWpm: 10 },
    });

    const stdBuffer = await standardBlob.arrayBuffer();
    const farnsBuffer = await farnsworthBlob.arrayBuffer();

    // Farnsworth has longer gaps, so total byte length must be greater
    expect(farnsBuffer.byteLength).toBeGreaterThan(stdBuffer.byteLength);
  });
});

