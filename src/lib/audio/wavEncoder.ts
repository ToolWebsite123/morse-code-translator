/**
 * Browser-Local WAV Audio Encoder for Morse Code
 *
 * Synthesizes 16-bit PCM RIFF WAVE audio files (.wav) from Morse code strings.
 * Operates 100% locally in-memory without external libraries or servers.
 * Implements smooth 5ms attack/decay anti-click ramps matching Web Audio synthesis.
 *
 * PRD Reference: Release 3 — F-033: WAV export / advanced timing
 */

import {
  parseMorseToPlaybackEvents,
  calculateMorseTiming,
  calculateFarnsworthTiming,
  type MorseTimingConstants,
} from '@/lib/morse';

export interface WavExportOptions {
  wpm?: number;
  frequencyHz?: number;
  sampleRate?: number;
  volume?: number;
  farnsworth?: {
    characterWpm: number;
    effectiveWpm: number;
  };
}

/**
 * Encodes a Morse string into an in-memory 16-bit PCM Mono WAV Blob.
 */
export function generateMorseWav(
  morse: string,
  options: WavExportOptions = {}
): Blob {
  const {
    wpm = 15,
    frequencyHz = 600,
    sampleRate = 44100,
    volume = 0.7,
    farnsworth,
  } = options;

  const timing: MorseTimingConstants = farnsworth
    ? calculateFarnsworthTiming(farnsworth.characterWpm, farnsworth.effectiveWpm)
    : calculateMorseTiming(wpm);

  const events = parseMorseToPlaybackEvents(morse, timing);

  // If no events, produce 0.5s of silence
  if (events.length === 0) {
    const silenceSamples = Math.round(0.5 * sampleRate);
    const buffer = createWavBuffer(new Int16Array(silenceSamples), sampleRate);
    return new Blob([buffer], { type: 'audio/wav' });
  }

  // Pre-calculate total sample count
  const eventSampleCounts = events.map((ev) =>
    Math.round((ev.durationMs / 1000) * sampleRate)
  );
  const totalSamples = eventSampleCounts.reduce((acc, count) => acc + count, 0);

  const pcm16 = new Int16Array(totalSamples);
  let sampleOffset = 0;

  // 5ms attack and decay ramp samples to prevent speaker click artifacts
  const maxRampSamples = Math.round(0.005 * sampleRate); // ~220 samples at 44.1kHz

  for (let e = 0; e < events.length; e++) {
    const event = events[e];
    const count = eventSampleCounts[e];

    if (event.type === 'tone') {
      const rampLen = Math.min(Math.floor(count / 2), maxRampSamples);

      for (let i = 0; i < count; i++) {
        // Linear envelope calculation
        let envelope = 1.0;
        if (rampLen > 0) {
          if (i < rampLen) {
            envelope = i / rampLen;
          } else if (i > count - rampLen) {
            envelope = (count - i) / rampLen;
          }
        }

        // Generate clean sine wave sample
        const t = i / sampleRate;
        const sine = Math.sin(2 * Math.PI * frequencyHz * t);
        const floatSample = envelope * volume * sine;

        // Convert to 16-bit signed PCM integer (-32768 to 32767)
        const intSample = Math.max(
          -32768,
          Math.min(32767, Math.round(floatSample * 32767))
        );
        pcm16[sampleOffset + i] = intSample;
      }
    } else {
      // Gap: zero silence
      pcm16.fill(0, sampleOffset, sampleOffset + count);
    }

    sampleOffset += count;
  }

  const wavBuffer = createWavBuffer(pcm16, sampleRate);
  return new Blob([wavBuffer], { type: 'audio/wav' });
}

/**
 * Builds a RIFF WAVE ArrayBuffer containing the standard 44-byte header
 * and 16-bit mono PCM audio data.
 */
function createWavBuffer(samples: Int16Array, sampleRate: number): ArrayBuffer {
  const numChannels = 1; // Mono
  const bytesPerSample = 2; // 16-bit PCM
  const dataSize = samples.length * bytesPerSample;
  const headerSize = 44;
  const totalSize = headerSize + dataSize;

  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);

  // 1. RIFF Chunk Descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true); // ChunkSize (total - 8)
  writeString(view, 8, 'WAVE');

  // 2. "fmt " Subchunk (Format description)
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 = PCM)
  view.setUint16(22, numChannels, true); // NumChannels (1 = Mono)
  view.setUint32(24, sampleRate, true); // SampleRate (44100)
  view.setUint32(28, sampleRate * numChannels * bytesPerSample, true); // ByteRate
  view.setUint16(32, numChannels * bytesPerSample, true); // BlockAlign (2)
  view.setUint16(34, 16, true); // BitsPerSample (16)

  // 3. "data" Subchunk (Raw PCM audio bytes)
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true); // Subchunk2Size

  // Write 16-bit sample integers in little-endian order
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    view.setInt16(offset, samples[i], true);
    offset += 2;
  }

  return buffer;
}

function writeString(view: DataView, offset: number, string: string): void {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

/**
 * Triggers a client-side browser file download for the generated WAV audio Blob.
 */
export function downloadWavBlob(blob: Blob, filename: string): void {
  if (typeof window === 'undefined') return;

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename.endsWith('.wav') ? filename : `${filename}.wav`;
  anchor.style.display = 'none';

  document.body.appendChild(anchor);
  anchor.click();

  setTimeout(() => {
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, 1000);
}

