'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { morseAudio } from './audioEngine';
import {
  calculateMorseTiming,
  calculateFarnsworthTiming,
  type PlaybackEvent,
} from '@/lib/morse';
import { generateMorseWav, downloadWavBlob } from '@/lib/audio/wavEncoder';

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
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [useFarnsworth, setUseFarnsworth] = useState<boolean>(false);
  const [effectiveWpm, setEffectiveWpm] = useState<number>(10);
  const [isLooping, setIsLooping] = useState<boolean>(false);

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
  const isLoopingRef = useRef(isLooping);

  useEffect(() => {
    isLoopingRef.current = isLooping;
  }, [isLooping]);

  useEffect(() => {
    if (prevMorseRef.current !== morse && isPlaying) {
      morseAudio.stop();
      setIsPlaying(false);
      setIsFlashing(false);
      setActiveSymbol(null);
    }
    prevMorseRef.current = morse;
  }, [morse, isPlaying]);

  const timing = useFarnsworth
    ? calculateFarnsworthTiming(wpm, effectiveWpm)
    : calculateMorseTiming(wpm);

  const startPlayback = async () => {
    if (!morse || morse.trim().length === 0) return;

    setIsPlaying(true);

    try {
      await morseAudio.play(morse, timing, frequencyHz, {
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
          if (isLoopingRef.current) {
            // Small pause between loops
            setTimeout(() => {
              if (isLoopingRef.current) {
                startPlayback();
              } else {
                setIsPlaying(false);
                setIsFlashing(false);
                setActiveSymbol(null);
              }
            }, 600);
          } else {
            setIsPlaying(false);
            setIsFlashing(false);
            setActiveSymbol(null);
          }
        },
      });
    } catch {
      setIsPlaying(false);
      setIsFlashing(false);
      setActiveSymbol(null);
    }
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      morseAudio.stop();
      setIsPlaying(false);
      setIsFlashing(false);
      setActiveSymbol(null);
    } else {
      startPlayback();
    }
  };

  const handleStop = () => {
    morseAudio.stop();
    setIsPlaying(false);
    setIsFlashing(false);
    setActiveSymbol(null);
  };

  const handleDownloadWav = () => {
    if (!isValidMorse) return;
    setIsExporting(true);
    try {
      const blob = generateMorseWav(morse, {
        wpm,
        frequencyHz,
        farnsworth: useFarnsworth ? { characterWpm: wpm, effectiveWpm } : undefined,
      });
      const filename = `morse_${wpm}wpm_${frequencyHz}hz.wav`;
      downloadWavBlob(blob, filename);
    } catch (err) {
      console.error('Failed to export WAV:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const isValidMorse = Boolean(morse && morse.trim().length > 0 && !/[a-zA-Z0-9]/.test(morse));

  return (
    <div className="audio-dock border-t border-slate-200/90 bg-slate-50/90 p-4 sm:p-6 text-slate-900 transition-colors dark:border-slate-800/90 dark:bg-slate-950/80 dark:text-white">
      {/* Header bar of the audio dock */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white shadow-xs dark:bg-teal-500 dark:text-slate-950">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight text-slate-900 sm:text-base dark:text-white">
                Audio Synthesis &amp; Optical Beacon
              </h3>
              <span className="rounded-full border border-teal-300/80 bg-teal-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-teal-900 dark:border-teal-500/30 dark:bg-teal-400/10 dark:text-teal-300">
                Web Audio CW
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Accurate ITU-R M.1677-1 timing &bull; Sine wave audio sidetone
            </p>
          </div>
        </div>

        {/* Optical hardware beacon simulation */}
        <div className="flex items-center gap-2.5 rounded-full border border-slate-300/80 bg-white px-3 sm:px-3.5 py-1.5 shadow-2xs dark:border-slate-700/80 dark:bg-slate-800/90">
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-full transition-all duration-75 ${
              isFlashing
                ? 'bg-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.95)] ring-2 ring-amber-300 scale-110'
                : 'bg-slate-300 dark:bg-slate-700'
            }`}
            aria-hidden="true"
          >
            {isFlashing && <span className="h-1.5 w-1.5 rounded-full bg-amber-950" />}
          </span>
          <span className="font-mono text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-200">
            {isFlashing
              ? activeSymbol === '.'
                ? 'DOT (•)'
                : 'DASH (—)'
              : isPlaying
              ? 'GAP'
              : 'OPTICAL READY'}
          </span>
        </div>
      </div>

      {/* Control Sliders & Interactive Actions */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Speed (WPM) Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700">
          <div className="flex items-center justify-between">
            <label htmlFor="wpm-slider" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Speed: <span className="font-mono text-sm font-extrabold text-teal-700 dark:text-teal-400">{wpm} WPM</span>
            </label>
            <span className="rounded-md border border-teal-200 bg-teal-50 px-2 py-0.5 font-mono text-[11px] font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-900/80 dark:text-teal-300">
              {timing.dotDurationMs.toFixed(0)} ms / dot
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
            className="mt-3.5 w-full cursor-pointer accent-teal-600 dark:accent-teal-400"
          />
          <div className="mt-2 flex justify-between font-mono text-[10px] font-medium text-slate-600 dark:text-slate-300">
            <span>5 WPM (Slow)</span>
            <span>15 WPM (Standard)</span>
            <span>30 WPM (Fast)</span>
          </div>
        </div>

        {/* Pitch (Hz) Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700">
          <div className="flex items-center justify-between">
            <label htmlFor="pitch-slider" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Pitch: <span className="font-mono text-sm font-extrabold text-teal-700 dark:text-teal-400">{frequencyHz} Hz</span>
            </label>
            <span className="rounded-md border border-teal-200 bg-teal-50 px-2 py-0.5 font-mono text-[11px] font-semibold text-teal-800 dark:border-slate-700 dark:bg-slate-900/80 dark:text-teal-300">
              {frequencyHz === 600 ? 'Standard CW' : `${frequencyHz} Hz`}
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
            className="mt-3.5 w-full cursor-pointer accent-teal-600 dark:accent-teal-400"
          />
          <div className="mt-2 flex justify-between font-mono text-[10px] font-medium text-slate-600 dark:text-slate-300">
            <span>400 Hz (Low)</span>
            <span>600 Hz (CW)</span>
            <span>800 Hz (High)</span>
          </div>
        </div>

        {/* Action Controls, Loop & Flash Toggle Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs sm:col-span-2 lg:col-span-1 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="flex items-center justify-between gap-2">
            {/* Loop Toggle */}
            <button
              type="button"
              onClick={() => setIsLooping((prev) => !prev)}
              aria-pressed={isLooping}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                isLooping
                  ? 'bg-teal-50 text-teal-800 border border-teal-300 shadow-2xs dark:bg-teal-500/20 dark:text-teal-300 dark:border-teal-500/40'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
              }`}
              title="Repeat audio continuously for ear training"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Loop: {isLooping ? 'On' : 'Off'}</span>
            </button>

            {/* Flash Beacon Toggle */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="screen-flash-toggle"
                className="cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Flash:
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
                <div className="peer h-5 w-9 rounded-full bg-slate-300 transition-colors peer-checked:bg-teal-600 peer-focus-visible:ring-2 peer-focus-visible:ring-teal-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:bg-slate-700 dark:peer-checked:bg-teal-500 dark:peer-focus-visible:ring-offset-slate-900" />
                <div className="peer absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-xs transition-all peer-checked:translate-x-4" />
              </label>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            {/* Prominent Play / Stop Button */}
            <button
              type="button"
              onClick={handlePlayToggle}
              disabled={!isValidMorse}
              className={`btn-tactile touch-target flex flex-1 items-center justify-center gap-1.5 sm:gap-2 rounded-xl px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${
                isPlaying
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25 hover:bg-amber-400 active:scale-[0.98]'
                  : isValidMorse
                  ? 'bg-teal-700 text-white shadow-sm hover:bg-teal-800 active:scale-[0.98] dark:bg-teal-400 dark:text-slate-950 dark:hover:bg-teal-300'
                  : 'cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-500'
              }`}
            >
              {isPlaying ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="6" y="6" width="12" height="12" rx="1" />
                  </svg>
                  <span>Stop Audio</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Play Morse</span>
                </>
              )}
            </button>

            {isPlaying && (
              <button
                type="button"
                onClick={handleStop}
                className="btn-tactile touch-target inline-flex items-center rounded-xl border border-slate-300 bg-white px-2.5 sm:px-3 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Reset
              </button>
            )}

            {/* Export WAV Button */}
            <button
              type="button"
              onClick={handleDownloadWav}
              disabled={!isValidMorse || isExporting}
              className="btn-tactile touch-target inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 sm:px-3.5 py-2.5 text-xs font-bold text-slate-800 shadow-2xs transition-colors hover:border-teal-600 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-teal-500 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:bg-slate-700"
              title="Download synthesized audio as a WAV file"
              aria-label="Download synthesized Morse audio as a WAV file"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-700 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{isExporting ? 'Saving...' : 'WAV'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Timing Mode (Farnsworth) Drawer & Optical Safety Note */}
      <div className="mt-4 flex flex-col gap-2.5 border-t border-slate-200/80 pt-3.5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800/80">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setUseFarnsworth((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200/70 hover:text-teal-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-teal-300"
            aria-expanded={useFarnsworth}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-3.5 w-3.5 transition-transform ${useFarnsworth ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>Farnsworth Timing Mode</span>
            <span
              className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                useFarnsworth
                  ? 'bg-teal-100 text-teal-900 border border-teal-300 dark:bg-teal-500/20 dark:text-teal-300 dark:border-teal-500/30'
                  : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {useFarnsworth ? 'Active' : 'Off'}
            </span>
          </button>
          {useFarnsworth && (
            <span className="font-mono text-[11px] font-semibold text-teal-700 dark:text-teal-300">
              Effective: {effectiveWpm} WPM
            </span>
          )}
        </div>

        <p className="text-[11px] text-slate-600 dark:text-slate-300">
          On-screen optical beacon &bull; Reduced-motion safe
        </p>
      </div>

      {useFarnsworth && (
        <div className="mt-3 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center justify-between">
            <label htmlFor="farnsworth-slider" className="text-xs font-bold text-slate-700 dark:text-slate-200">
              Effective Overall Rhythm:
            </label>
            <span className="font-mono text-xs font-bold text-teal-700 dark:text-teal-300">
              {effectiveWpm} WPM
            </span>
          </div>
          <input
            id="farnsworth-slider"
            type="range"
            min={5}
            max={wpm}
            step={1}
            value={Math.min(effectiveWpm, wpm)}
            disabled={isPlaying}
            aria-label="Farnsworth effective speed in words per minute"
            onChange={(e) => setEffectiveWpm(Number(e.target.value))}
            className="mt-2.5 w-full cursor-pointer accent-teal-600 dark:accent-teal-400"
          />
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
            Plays individual characters crisp at {wpm} WPM while extending letter and word pauses to match {effectiveWpm} WPM overall rhythm — ideal for ear training.
          </p>
        </div>
      )}
    </div>
  );
}
