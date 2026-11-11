/**
 * Real-Time Microphone Morse Code Stream Decoder
 *
 * Implements real-time acoustic signal analysis via Web Audio API (AnalyserNode + Bandpass Filter).
 * Processes live audio input locally in the browser to transcribe audio beeps into Morse code and text.
 *
 * Enforces strict lifecycle discipline:
 * - Permission requested only upon user action.
 * - All MediaStream tracks stopped immediately on Stop or unmount.
 * - Zero audio recorded or sent to any server (PRD FR-029 & Section 6.14).
 */

import { decodeMorseToText } from '@/lib/morse';

export interface MicDecoderCallbacks {
  onToneChange?: (isTone: boolean) => void;
  onMorseUpdate?: (morse: string, text: string, estimatedWpm: number) => void;
  onSignalLevel?: (level: number) => void; // 0.0 to 1.0
  onError?: (errorMessage: string) => void;
}

export class MicMorseDecoder {
  private audioCtx: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private analyser: AnalyserNode | null = null;
  private isListening: boolean = false;
  private animationFrameId: number | null = null;

  // Stream accumulation
  private morseString: string = '';
  private currentToneStart: number | null = null;
  private currentGapStart: number | null = null;
  private isToneActive: boolean = false;

  // Timing estimation (PARIS standard)
  private estimatedUnitMs: number = 80; // default 15 WPM (80ms dot)
  private detectedToneDurations: number[] = [];

  // Callbacks
  private callbacks: MicDecoderCallbacks = {};

  /**
   * Starts listening to the microphone after an explicit user interaction.
   */
  public async start(callbacks: MicDecoderCallbacks = {}): Promise<void> {
    this.stop(); // Ensure clean state
    this.callbacks = callbacks;

    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      this.callbacks.onError?.('Microphone access is not supported in this browser environment.');
      return;
    }

    try {
      // 1. Request user permission
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      // 2. Initialize AudioContext
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtx();

      if (this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume();
      }

      const source = this.audioCtx.createMediaStreamSource(this.mediaStream);

      // 3. Bandpass filter centered at 600 Hz (Morse tone sweet spot)
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, this.audioCtx.currentTime);
      filter.Q.setValueAtTime(4, this.audioCtx.currentTime);

      // 4. Analyser node for FFT/Time-domain energy
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.3;

      source.connect(filter);
      filter.connect(this.analyser);

      this.isListening = true;
      this.currentGapStart = performance.now();

      // 5. Start signal analysis loop
      this.processAudioLoop();
    } catch (err: unknown) {
      this.stop();
      if (err instanceof DOMException && (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError')) {
        this.callbacks.onError?.('Microphone permission was denied. Please allow microphone access in your browser settings.');
      } else if (err instanceof DOMException && err.name === 'NotFoundError') {
        this.callbacks.onError?.('No audio input device (microphone) was found on your system.');
      } else {
        const msg = err instanceof Error ? err.message : 'Failed to access audio input device.';
        this.callbacks.onError?.(msg);
      }
    }
  }

  /**
   * Continuous processing loop analyzing audio energy in real time.
   */
  private processAudioLoop = (): void => {
    if (!this.isListening || !this.analyser) return;

    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteTimeDomainData(dataArray);

    // Compute RMS amplitude of filtered signal
    let sumSquares = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const normalized = (dataArray[i] - 128) / 128; // -1 to 1
      sumSquares += normalized * normalized;
    }
    const rms = Math.sqrt(sumSquares / dataArray.length);

    // Normalize level for UI volume meter (0.0 to 1.0)
    const level = Math.min(1.0, rms * 4.0);
    this.callbacks.onSignalLevel?.(level);

    // Dynamic hysteresis threshold
    const toneThreshold = 0.08;
    const isToneDetected = rms >= toneThreshold;
    const now = performance.now();

    if (isToneDetected !== this.isToneActive) {
      if (isToneDetected) {
        // Transition: Gap -> Tone
        if (this.currentGapStart !== null) {
          const gapDuration = now - this.currentGapStart;
          this.handleGapComplete(gapDuration);
        }
        this.currentToneStart = now;
        this.isToneActive = true;
        this.callbacks.onToneChange?.(true);
      } else {
        // Transition: Tone -> Gap
        if (this.currentToneStart !== null) {
          const toneDuration = now - this.currentToneStart;
          this.handleToneComplete(toneDuration);
        }
        this.currentGapStart = now;
        this.isToneActive = false;
        this.callbacks.onToneChange?.(false);
      }
    } else {
      // Check for prolonged silence while idle (word gap)
      if (!this.isToneActive && this.currentGapStart !== null) {
        const gapDuration = now - this.currentGapStart;
        const wordThreshold = this.estimatedUnitMs * 5.0; // ~5T gap
        if (
          gapDuration >= wordThreshold &&
          this.morseString.length > 0 &&
          !this.morseString.endsWith(' / ') &&
          !this.morseString.endsWith('/')
        ) {
          this.morseString += ' / ';
          this.notifyMorseUpdate();
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(this.processAudioLoop);
  };

  private handleToneComplete(durationMs: number): void {
    // Debounce noise spikes < 25ms
    if (durationMs < 25) return;

    // Track for adaptive timing
    this.detectedToneDurations.push(durationMs);
    if (this.detectedToneDurations.length > 30) {
      this.detectedToneDurations.shift();
    }
    this.updateTimingCalibration();

    const dotMaxThreshold = this.estimatedUnitMs * 2.0;

    if (durationMs < dotMaxThreshold) {
      this.morseString += '.';
    } else {
      this.morseString += '-';
    }

    this.notifyMorseUpdate();
  }

  private handleGapComplete(durationMs: number): void {
    const charGapThreshold = this.estimatedUnitMs * 2.0;
    const wordGapThreshold = this.estimatedUnitMs * 5.0;

    if (durationMs >= wordGapThreshold) {
      if (!this.morseString.endsWith(' / ') && !this.morseString.endsWith('/')) {
        this.morseString += ' / ';
        this.notifyMorseUpdate();
      }
    } else if (durationMs >= charGapThreshold) {
      if (!this.morseString.endsWith(' ') && !this.morseString.endsWith('/ ')) {
        this.morseString += ' ';
        this.notifyMorseUpdate();
      }
    }
  }

  private updateTimingCalibration(): void {
    if (this.detectedToneDurations.length < 3) return;

    const sorted = [...this.detectedToneDurations].sort((a, b) => a - b);
    const shortestHalf = sorted.slice(0, Math.ceil(sorted.length / 2));
    const medianDot = shortestHalf[Math.floor(shortestHalf.length / 2)];

    if (medianDot >= 30 && medianDot <= 250) {
      this.estimatedUnitMs = medianDot;
    }
  }

  private notifyMorseUpdate(): void {
    const cleaned = this.morseString.trim().replace(/\s{2,}/g, ' ');
    const decoded = decodeMorseToText(cleaned);
    const estimatedWpm = Math.max(5, Math.min(30, Math.round(1200 / this.estimatedUnitMs)));

    this.callbacks.onMorseUpdate?.(cleaned, decoded.output, estimatedWpm);
  }

  /**
   * Resets accumulated transcription text.
   */
  public clear(): void {
    this.morseString = '';
    this.detectedToneDurations = [];
    this.notifyMorseUpdate();
  }

  /**
   * Stops listening, releases all microphone tracks, and disconnects Web Audio nodes.
   * Adheres strictly to PRD FR-029.
   */
  public stop(): void {
    this.isListening = false;
    this.isToneActive = false;
    this.callbacks.onToneChange?.(false);
    this.callbacks.onSignalLevel?.(0);

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    // Release all MediaStream tracks (turns off browser recording dot)
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // Track already stopped
        }
      });
      this.mediaStream = null;
    }

    if (this.analyser) {
      try {
        this.analyser.disconnect();
      } catch {
        // Already disconnected
      }
      this.analyser = null;
    }

    if (this.audioCtx) {
      try {
        this.audioCtx.close();
      } catch {
        // Already closed
      }
      this.audioCtx = null;
    }
  }

  public getIsListening(): boolean {
    return this.isListening;
  }
}

export const micMorseDecoder = new MicMorseDecoder();

