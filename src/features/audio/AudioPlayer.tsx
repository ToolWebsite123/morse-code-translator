'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { morseAudio } from './audioEngine';
import { calculateMorseTiming, type PlaybackEvent } from '@/lib/morse';

interface AudioPlayerProps {
  morse: string;
}

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

export function AudioPlayer({ morse }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [wpm, setWpm] = useState<number>(15);
  const [frequencyHz, setFrequencyHz] = useState<number>(600);
  const [userFlashPreference, setUserFlashPreference] = useState<boolean>(true);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [activeSymbol, setActiveSymbol] = useState<string | null>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const effectiveFlashEnabled = userFlashPreference && !reducedMotion;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      morseAudio.stop();
    };
  }, []);

  // Stop playback if morse string changes while playing
  const prevMorseRef = useRef(morse);
  useEffect(() => {
    if (prevMorseRef.current !== morse && isPlaying) {
      morseAudio.stop();
      setIsPlaying(false);
      setIsFlashing(false);
      setActiveSymbol(null);
    }
    prevMorseRef.current = morse;
  }, [morse, isPlaying]);

  const timing = calculateMorseTiming(wpm);

  const handlePlay = async () => {
    if (isPlaying) {
      morseAudio.stop();
      setIsPlaying(false);
      setIsFlashing(false);
      setActiveSymbol(null);
      return;
    }

    if (!morse || morse.trim().length === 0) return;

    setIsPlaying(true);

    try {
      await morseAudio.play(morse, wpm, frequencyHz, {
        onProgress: (_index: number, event: PlaybackEvent | null) => {
          if (event && event.type === 'tone') {
            setActiveSymbol(event.symbol || null);
          } else {
            setActiveSymbol(null);
          }
        },
        onFlash: (flashing: boolean) => {
          if (effectiveFlashEnabled) {
            setIsFlashing(flashing);
          }
        },
        onEnded: () => {
          setIsPlaying(false);
          setIsFlashing(false);
          setActiveSymbol(null);
        },
      });
    } catch {
      setIsPlaying(false);
      setIsFlashing(false);
      setActiveSymbol(null);
    }
  };

  const handleStop = () => {
    morseAudio.stop();
    setIsPlaying(false);
    setIsFlashing(false);
    setActiveSymbol(null);
  };

  const isValidMorse = Boolean(morse && morse.trim().length > 0 && !/[a-zA-Z0-9]/.test(morse));

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Top Header & Flash Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-bold tracking-wide text-slate-900 sm:text-base dark:text-slate-100">
            Audio Playback &amp; Visual Timing
          </h3>
          <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
            Acoustic tone generator &bull; Synchronized visual signals
          </p>
        </div>

        {/* On-screen visual flash beacon */}
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-75 ${
              isFlashing
                ? 'border-amber-500 bg-amber-400 shadow-md shadow-amber-300/80 dark:shadow-amber-400/50'
                : 'border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800'
            }`}
            aria-hidden="true"
          >
            <span
              className={`h-3 w-3 rounded-full transition-colors ${
                isFlashing ? 'bg-amber-950' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            />
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            {isFlashing ? (activeSymbol === '.' ? 'Dot (•)' : 'Dash (—)') : isPlaying ? 'Gap' : 'Signal'}
          </span>
        </div>
      </div>

      {/* Playback Controls & Sliders */}
      <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Speed Control (WPM) */}
        <div className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <label htmlFor="wpm-slider" className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Speed: <span className="font-mono text-teal-800 font-bold dark:text-teal-400">{wpm} WPM</span>
            </label>
            <span className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
              {timing.dotDurationMs.toFixed(0)} ms dot
            </span>
          </div>
          <input
            id="wpm-slider"
            type="range"
            min={5}
            max={30}
            step={1}
            value={wpm}
            disabled={isPlaying}
            aria-label="Morse audio playback speed in words per minute"
            aria-valuemin={5}
            aria-valuemax={30}
            aria-valuenow={wpm}
            aria-valuetext={`${wpm} words per minute, ${timing.dotDurationMs.toFixed(0)} milliseconds dot duration`}
            onChange={(e) => setWpm(Number(e.target.value))}
            className="mt-2.5 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-teal-700 disabled:opacity-50 dark:bg-slate-700 dark:accent-teal-400"
          />
          <div className="mt-1 flex justify-between text-[10px] text-slate-500 font-mono dark:text-slate-400">
            <span>5 WPM (Slow)</span>
            <span>15 (Standard)</span>
            <span>30 (Fast)</span>
          </div>
        </div>

        {/* Pitch Control (Hz) */}
        <div className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <label htmlFor="pitch-slider" className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Pitch: <span className="font-mono text-teal-800 font-bold dark:text-teal-400">{frequencyHz} Hz</span>
            </label>
            <span className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
              {frequencyHz === 600 ? 'Standard' : `${frequencyHz} Hz`}
            </span>
          </div>
          <input
            id="pitch-slider"
            type="range"
            min={400}
            max={800}
            step={50}
            value={frequencyHz}
            disabled={isPlaying}
            aria-label="Morse audio tone pitch in Hertz"
            aria-valuemin={400}
            aria-valuemax={800}
            aria-valuenow={frequencyHz}
            aria-valuetext={`${frequencyHz} Hertz`}
            onChange={(e) => setFrequencyHz(Number(e.target.value))}
            className="mt-2.5 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-teal-700 disabled:opacity-50 dark:bg-slate-700 dark:accent-teal-400"
          />
          <div className="mt-1 flex justify-between text-[10px] text-slate-500 font-mono dark:text-slate-400">
            <span>400 Hz (Low)</span>
            <span>600 Hz</span>
            <span>800 Hz (High)</span>
          </div>
        </div>

        {/* Action Buttons & Flash Toggle */}
        <div className="flex flex-col justify-between sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <label htmlFor="screen-flash-toggle" className="cursor-pointer text-xs font-semibold text-slate-800 dark:text-slate-200">
              Screen Flash:
            </label>
            <label htmlFor="screen-flash-toggle" className="relative inline-flex cursor-pointer items-center">
              <input
                id="screen-flash-toggle"
                type="checkbox"
                checked={effectiveFlashEnabled}
                disabled={reducedMotion || isPlaying}
                aria-label="Toggle on-screen visual flash simulation"
                onChange={(e) => setUserFlashPreference(e.target.checked)}
                className="peer sr-only"
              />
              <div className="peer h-5 w-9 rounded-full bg-slate-200 transition-colors peer-checked:bg-teal-700 peer-focus-visible:ring-2 peer-focus-visible:ring-teal-700 peer-focus-visible:ring-offset-2 dark:bg-slate-700 dark:peer-checked:bg-teal-500 dark:peer-focus-visible:ring-teal-400 dark:peer-focus-visible:ring-offset-slate-900" />
              <div className="peer absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-all peer-checked:translate-x-4 shadow-xs" />
            </label>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={handlePlay}
              disabled={!isValidMorse}
              className={`touch-target flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus sm:text-sm ${
                isPlaying
                  ? 'bg-amber-600 text-white shadow-xs hover:bg-amber-700'
                  : isValidMorse
                  ? 'bg-teal-700 text-white shadow-xs hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500'
                  : 'cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-600'
              }`}
            >
              {isPlaying ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" rx="1" />
                  </svg>
                  Stop Audio
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Play Morse
                </>
              )}
            </button>

            {isPlaying && (
              <button
                type="button"
                onClick={handleStop}
                className="touch-target inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:text-sm"
              >
                Stop
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Safety Notice regarding Physical Flashlight */}
      <div className="mt-4 border-t border-slate-200 pt-3 text-[11px] text-slate-600 leading-relaxed dark:border-slate-800 dark:text-slate-400">
        <p>
          &bull; <strong>Note:</strong> The flash is an on-screen visual simulation only. Web browsers cannot control a device&apos;s physical camera LED.
          Reduced motion preferences are automatically respected.
        </p>
      </div>
    </div>
  );
}
