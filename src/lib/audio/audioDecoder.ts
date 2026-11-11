/**
 * Browser-Local Morse Code Audio File Decoder
 *
 * Implements deterministic acoustic signal processing and time-domain envelope analysis
 * to decode International Morse Code from audio files (WAV, MP3, OGG) using Web Audio API.
 *
 * 100% browser-local execution — zero bytes transmitted to external servers.
 *
 * PRD Reference: Release 3 — F-030 & Sections 6.13, 15.11
 */

import { decodeMorseToText } from '@/lib/morse';
import type { TranslationResult } from '@/types';

export interface AudioDecodeResult {
  morse: string;
  text: string;
  detectedWpm: number;
  detectedPitchHz: number;
  confidence: number; // 0 to 100%
  durationSeconds: number;
  unrecognizedGroups: string[];
}

export interface AudioDecoderOptions {
  minWpm?: number;
  maxWpm?: number;
  timeStepMs?: number;
}

/**
 * Decodes an AudioBuffer into Morse code and plain English text.
 */
export function decodeAudioBuffer(
  audioBuffer: AudioBuffer,
  options: AudioDecoderOptions = {}
): AudioDecodeResult {
  const { minWpm = 5, maxWpm = 35, timeStepMs = 10 } = options;

  const sampleRate = audioBuffer.sampleRate;
  const channelData = audioBuffer.getChannelData(0); // Analyze primary channel
  const totalDuration = audioBuffer.duration;

  if (channelData.length === 0 || totalDuration === 0) {
    return {
      morse: '',
      text: '',
      detectedWpm: 15,
      detectedPitchHz: 600,
      confidence: 0,
      durationSeconds: 0,
      unrecognizedGroups: [],
    };
  }

  // 1. Estimate Dominant Frequency (Pitch) in audible tone regions
  const detectedPitchHz = estimateDominantFrequency(channelData, sampleRate);

  // 2. Compute RMS Energy Envelope in sliding time windows (10ms steps)
  const windowSize = Math.max(64, Math.round((timeStepMs / 1000) * sampleRate));
  const envelope: number[] = [];

  for (let i = 0; i < channelData.length; i += windowSize) {
    let sumSquares = 0;
    const end = Math.min(i + windowSize, channelData.length);
    const count = end - i;

    for (let j = i; j < end; j++) {
      sumSquares += channelData[j] * channelData[j];
    }
    envelope.push(Math.sqrt(sumSquares / count));
  }

  // 3. Adaptive Thresholding (Otsu-like dynamic threshold)
  const maxEnergy = Math.max(...envelope, 0.0001);
  const minEnergy = Math.min(...envelope);
  const threshold = minEnergy + (maxEnergy - minEnergy) * 0.35;

  // 4. Run-Length Encoding of Tone and Silence Intervals
  interface Interval {
    isTone: boolean;
    durationMs: number;
  }

  const intervals: Interval[] = [];
  let currentTone = envelope[0] >= threshold;
  let currentCount = 0;

  for (let i = 0; i < envelope.length; i++) {
    const isTone = envelope[i] >= threshold;
    if (isTone === currentTone) {
      currentCount++;
    } else {
      intervals.push({
        isTone: currentTone,
        durationMs: currentCount * timeStepMs,
      });
      currentTone = isTone;
      currentCount = 1;
    }
  }

  if (currentCount > 0) {
    intervals.push({
      isTone: currentTone,
      durationMs: currentCount * timeStepMs,
    });
  }

  // Filter out leading/trailing silence
  while (intervals.length > 0 && !intervals[0].isTone) {
    intervals.shift();
  }
  while (intervals.length > 0 && !intervals[intervals.length - 1].isTone) {
    intervals.pop();
  }

  if (intervals.length === 0) {
    return {
      morse: '',
      text: '',
      detectedWpm: 15,
      detectedPitchHz,
      confidence: 0,
      durationSeconds: totalDuration,
      unrecognizedGroups: [],
    };
  }

  // 5. Cluster Tone Durations into Dots (.) and Dashes (-)
  const toneDurations = intervals
    .filter((inv) => inv.isTone && inv.durationMs >= 20)
    .map((inv) => inv.durationMs)
    .sort((a, b) => a - b);

  if (toneDurations.length === 0) {
    return {
      morse: '',
      text: '',
      detectedWpm: 15,
      detectedPitchHz,
      confidence: 0,
      durationSeconds: totalDuration,
      unrecognizedGroups: [],
    };
  }

  // Estimate Unit Dot Duration (T): lowest quartile or median of short tones
  const shortestTones = toneDurations.slice(0, Math.max(1, Math.floor(toneDurations.length / 2)));
  const medianDot = shortestTones[Math.floor(shortestTones.length / 2)];
  
  // PARIS standard: T = 1200 / WPM -> WPM = 1200 / T
  let unitT = medianDot > 0 ? medianDot : 80;
  let estimatedWpm = Math.round(1200 / unitT);
  estimatedWpm = Math.max(minWpm, Math.min(maxWpm, estimatedWpm));
  unitT = 1200 / estimatedWpm;

  const dotMaxThreshold = unitT * 2.0; // Above 2T is a dash

  // Gap Thresholds
  const charGapMinThreshold = unitT * 2.0; // Between 2T and 5T is letter gap
  const wordGapMinThreshold = unitT * 5.0; // Above 5T is word gap (nominal 7T)

  // 6. Assemble Morse String
  let morseResult = '';
  let dotCount = 0;
  let dashCount = 0;

  for (let i = 0; i < intervals.length; i++) {
    const inv = intervals[i];

    if (inv.isTone) {
      if (inv.durationMs < dotMaxThreshold) {
        morseResult += '.';
        dotCount++;
      } else {
        morseResult += '-';
        dashCount++;
      }
    } else {
      // Silence gap
      if (inv.durationMs >= wordGapMinThreshold) {
        // Word boundary
        if (!morseResult.endsWith(' / ') && !morseResult.endsWith('/')) {
          morseResult += ' / ';
        }
      } else if (inv.durationMs >= charGapMinThreshold) {
        // Character boundary
        if (!morseResult.endsWith(' ') && !morseResult.endsWith('/ ')) {
          morseResult += ' ';
        }
      }
      // If below charGapMinThreshold, it is an intra-character gap (no space emitted)
    }
  }

  // Clean trailing and leading spaces
  const cleanedMorse = morseResult.trim().replace(/\s{2,}/g, ' ');

  // 7. Decode using Canonical Morse Engine
  const decodeResult: TranslationResult = decodeMorseToText(cleanedMorse);

  // 8. Estimate Confidence
  const totalSymbols = dotCount + dashCount;
  let confidence = 0;
  if (totalSymbols > 0) {
    const validChars = decodeResult.output.replace(/[^A-Z0-9.,?'/()&:;=+_\-"$@]/g, '').length;
    const unknownCount = decodeResult.warnings.length;
    confidence = Math.max(
      10,
      Math.min(100, Math.round((validChars / Math.max(1, validChars + unknownCount)) * 100))
    );
  }

  return {
    morse: cleanedMorse,
    text: decodeResult.output,
    detectedWpm: estimatedWpm,
    detectedPitchHz,
    confidence,
    durationSeconds: totalDuration,
    unrecognizedGroups: decodeResult.warnings.map((w) => w.character || ''),
  };
}

/**
 * Estimates dominant frequency within 300Hz–1200Hz range using zero-crossing rate
 * on high-energy segments.
 */
function estimateDominantFrequency(data: Float32Array, sampleRate: number): number {
  let zeroCrossings = 0;
  let activeSamples = 0;

  for (let i = 1; i < data.length; i++) {
    // Only analyze active signal regions
    if (Math.abs(data[i]) > 0.1) {
      activeSamples++;
      if ((data[i] >= 0 && data[i - 1] < 0) || (data[i] < 0 && data[i - 1] >= 0)) {
        zeroCrossings++;
      }
    }
  }

  if (activeSamples > 100) {
    // Frequency = (ZeroCrossings / 2) / (ActiveSamples / SampleRate)
    const freq = Math.round((zeroCrossings / 2) / (activeSamples / sampleRate));
    if (freq >= 300 && freq <= 1200) {
      return freq;
    }
  }

  return 600; // Standard fallback
}
