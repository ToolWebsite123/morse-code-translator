import { describe, it, expect } from 'vitest';
import { decodeAudioBuffer } from '@/lib/audio/audioDecoder';
import { generateMorseWav } from '@/lib/audio/wavEncoder';

function wavBlobToMockAudioBuffer(blob: Blob, sampleRate = 44100): Promise<AudioBuffer> {
  return blob.arrayBuffer().then((buffer) => {
    const view = new DataView(buffer);
    const dataSize = view.getUint32(40, true);
    const sampleCount = dataSize / 2;
    const channelData = new Float32Array(sampleCount);

    let offset = 44;
    for (let i = 0; i < sampleCount; i++) {
      const intSample = view.getInt16(offset, true);
      channelData[i] = intSample / 32768.0;
      offset += 2;
    }

    const duration = sampleCount / sampleRate;

    return {
      sampleRate,
      duration,
      length: sampleCount,
      numberOfChannels: 1,
      getChannelData: () => channelData,
      copyFromChannel: () => {},
      copyToChannel: () => {},
    } as unknown as AudioBuffer;
  });
}

describe('Audio File Morse Decoder Engine (PRD Section 6.13 & F-030)', () => {
  it('accurately decodes synthesized "SOS" Morse audio to text', async () => {
    const wavBlob = generateMorseWav('... --- ...', { wpm: 15, frequencyHz: 600 });
    const audioBuffer = await wavBlobToMockAudioBuffer(wavBlob);

    const result = decodeAudioBuffer(audioBuffer);

    expect(result.morse).toBe('... --- ...');
    expect(result.text).toBe('SOS');
    expect(result.detectedWpm).toBeGreaterThanOrEqual(13);
    expect(result.detectedWpm).toBeLessThanOrEqual(17);
    expect(result.confidence).toBeGreaterThanOrEqual(80);
  });

  it('accurately decodes synthesized words with space separator "HELLO WORLD"', async () => {
    const wavBlob = generateMorseWav('.... . .-.. .-.. --- / .-- --- .-. .-.. -..', {
      wpm: 15,
      frequencyHz: 600,
    });
    const audioBuffer = await wavBlobToMockAudioBuffer(wavBlob);

    const result = decodeAudioBuffer(audioBuffer);

    expect(result.morse).toBe('.... . .-.. .-.. --- / .-- --- .-. .-.. -..');
    expect(result.text).toBe('HELLO WORLD');
    expect(result.confidence).toBe(100);
  });

  it('handles silence safely without crashing or emitting false text', async () => {
    const emptyBlob = generateMorseWav('');
    const audioBuffer = await wavBlobToMockAudioBuffer(emptyBlob);

    const result = decodeAudioBuffer(audioBuffer);

    expect(result.morse).toBe('');
    expect(result.text).toBe('');
    expect(result.confidence).toBe(0);
  });
});

