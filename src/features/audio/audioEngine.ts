/**
 * Web Audio API Acoustic Synthesizer for Morse Code
 *
 * Implements standard International Morse tone generation using browser-native
 * Web Audio API (OscillatorNode + GainNode) with click-free audio envelopes.
 */

import {
  parseMorseToPlaybackEvents,
  type PlaybackEvent,
  type MorseTimingConstants,
} from '@/lib/morse';

export interface AudioPlaybackCallbacks {
  onProgress?: (eventIndex: number, currentEvent: PlaybackEvent | null) => void;
  onFlash?: (isFlashing: boolean) => void;
  onEnded?: () => void;
}

export class MorseAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private activeOscillators: OscillatorNode[] = [];
  private activeGainNodes: GainNode[] = [];
  private activeTimeouts: number[] = [];

  /**
   * Initializes or resumes the AudioContext after a user gesture.
   */
  private async getContext(): Promise<AudioContext> {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    return this.ctx;
  }

  /**
   * Plays a Morse code string acoustically with synchronized callbacks.
   *
   * @param morse - The Morse string (e.g. "... --- ...")
   * @param timingOrWpm - Speed in WPM (number 5–30) or a custom MorseTimingConstants/Farnsworth object
   * @param frequencyHz - Tone frequency in Hertz (400–800, default 600)
   * @param callbacks - Event callbacks for visual timeline and screen flash synchronization
   */
  public async play(
    morse: string,
    timingOrWpm: number | MorseTimingConstants = 15,
    frequencyHz: number = 600,
    callbacks?: AudioPlaybackCallbacks
  ): Promise<void> {
    // Exclusivity Rule (PRD FR-014): Stop any currently active playback before starting new
    this.stop();

    if (!morse || morse.trim().length === 0) {
      return;
    }

    const events = parseMorseToPlaybackEvents(morse, timingOrWpm);
    if (events.length === 0) return;

    const ctx = await this.getContext();
    this.isPlaying = true;

    // Lead time buffer to ensure smooth scheduling without jitter
    const startTime = ctx.currentTime + 0.05;
    let currentEventTime = startTime;

    // Master volume node
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.3, ctx.currentTime);
    masterGain.connect(ctx.destination);
    this.activeGainNodes.push(masterGain);

    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const durationSeconds = event.durationMs / 1000;
      const eventStartTime = currentEventTime;
      const eventEndTime = eventStartTime + durationSeconds;

      if (event.type === 'tone') {
        const osc = ctx.createOscillator();
        const toneGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequencyHz, eventStartTime);

        // Click-free audio envelope (smooth attack and release to avoid acoustic pop)
        const envelopeRamp = Math.min(0.005, durationSeconds / 4); // 5ms ramp
        toneGain.gain.setValueAtTime(0, eventStartTime);
        toneGain.gain.linearRampToValueAtTime(1, eventStartTime + envelopeRamp);
        toneGain.gain.setValueAtTime(1, eventEndTime - envelopeRamp);
        toneGain.gain.linearRampToValueAtTime(0, eventEndTime);

        osc.connect(toneGain);
        toneGain.connect(masterGain);

        osc.start(eventStartTime);
        osc.stop(eventEndTime);

        this.activeOscillators.push(osc);
        this.activeGainNodes.push(toneGain);
      }

      // Schedule Visual Timeline & Flash Callbacks
      const delayToStartMs = Math.max(0, (eventStartTime - ctx.currentTime) * 1000);
      const delayToEndMs = Math.max(0, (eventEndTime - ctx.currentTime) * 1000);

      const startTimeout = window.setTimeout(() => {
        if (!this.isPlaying) return;
        callbacks?.onProgress?.(i, event);
        if (event.type === 'tone') {
          callbacks?.onFlash?.(true);
        } else {
          callbacks?.onFlash?.(false);
        }
      }, delayToStartMs);

      const endTimeout = window.setTimeout(() => {
        if (!this.isPlaying) return;
        if (event.type === 'tone') {
          callbacks?.onFlash?.(false);
        }
      }, delayToEndMs);

      this.activeTimeouts.push(startTimeout, endTimeout);

      currentEventTime = eventEndTime;
    }

    // Schedule Completion Callback
    const totalDurationMs = Math.max(0, (currentEventTime - ctx.currentTime) * 1000);
    const finishTimeout = window.setTimeout(() => {
      this.stop();
      callbacks?.onProgress?.(-1, null);
      callbacks?.onFlash?.(false);
      callbacks?.onEnded?.();
    }, totalDurationMs);

    this.activeTimeouts.push(finishTimeout);
  }

  /**
   * Stops all active playback immediately and releases resources.
   */
  public stop(): void {
    this.isPlaying = false;

    // Clear all pending visual timeouts
    for (const timeoutId of this.activeTimeouts) {
      window.clearTimeout(timeoutId);
    }
    this.activeTimeouts = [];

    // Stop and disconnect all active oscillators
    for (const osc of this.activeOscillators) {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Oscillator may already be stopped
      }
    }
    this.activeOscillators = [];

    // Disconnect all gain nodes
    for (const gain of this.activeGainNodes) {
      try {
        gain.disconnect();
      } catch {
        // Gain node may already be disconnected
      }
    }
    this.activeGainNodes = [];
  }

  /**
   * Check if audio is currently playing.
   */
  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

// Export singleton instance for app-wide single playback exclusivity
export const morseAudio = new MorseAudioEngine();

