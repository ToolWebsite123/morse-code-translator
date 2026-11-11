import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MicMorseDecoder } from '@/lib/audio/micDecoder';

describe('Microphone Morse Decoder Engine (PRD Section 6.14 & F-031)', () => {
  let decoder: MicMorseDecoder;

  beforeEach(() => {
    decoder = new MicMorseDecoder();
  });

  it('initializes in an idle, non-listening state', () => {
    expect(decoder.getIsListening()).toBe(false);
  });

  it('safely handles stop calls when not active without throwing', () => {
    expect(() => decoder.stop()).not.toThrow();
    expect(decoder.getIsListening()).toBe(false);
  });

  it('resets accumulated transcription when clear is called', () => {
    const onMorseUpdate = vi.fn();
    decoder.start({ onMorseUpdate });
    decoder.clear();

    expect(onMorseUpdate).toHaveBeenCalledWith('', '', expect.any(Number));
  });

  it('releases media tracks cleanly on stop to turn off recording indicator', () => {
    const mockTrack = {
      stop: vi.fn(),
    };
    const mockStream = {
      getTracks: () => [mockTrack],
    } as unknown as MediaStream;

    // Simulate attached stream
    (decoder as unknown as { mediaStream: MediaStream }).mediaStream = mockStream;
    (decoder as unknown as { isListening: boolean }).isListening = true;

    decoder.stop();

    expect(mockTrack.stop).toHaveBeenCalled();
    expect(decoder.getIsListening()).toBe(false);
    expect((decoder as unknown as { mediaStream: MediaStream | null }).mediaStream).toBeNull();
  });

  it('invokes error callback gracefully when microphone access is unsupported or denied', async () => {
    const onError = vi.fn();
    await decoder.start({ onError });

    expect(onError).toHaveBeenCalledWith(
      expect.stringMatching(/Microphone access is not supported|permission was denied/)
    );
    expect(decoder.getIsListening()).toBe(false);
  });
});
