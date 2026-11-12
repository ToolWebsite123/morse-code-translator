'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MorseAudioEngine } from '@/features/audio/audioEngine';

interface OpticalBeaconProps {
  initialMorse?: string;
  label?: string;
  showFullscreenOption?: boolean;
}

export function OpticalBeacon({
  initialMorse = '... --- ...',
  label = 'Optical SOS Flasher & Strobe Beacon',
  showFullscreenOption = true,
}: OpticalBeaconProps) {
  const [morseCode, setMorseCode] = useState(initialMorse);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [speedWpm, setSpeedWpm] = useState(12);
  const [repeatMode, setRepeatMode] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const audioEngineRef = useRef<MorseAudioEngine | null>(null);
  const repeatTimeoutRef = useRef<number | null>(null);

  // Initialize audio engine
  useEffect(() => {
    audioEngineRef.current = new MorseAudioEngine();
    return () => {
      audioEngineRef.current?.stop();
      if (repeatTimeoutRef.current) {
        window.clearTimeout(repeatTimeoutRef.current);
      }
    };
  }, []);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setReducedMotion(true);
      }
    }
  }, []);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const handleStop = useCallback(() => {
    if (repeatTimeoutRef.current) {
      window.clearTimeout(repeatTimeoutRef.current);
      repeatTimeoutRef.current = null;
    }
    audioEngineRef.current?.stop();
    setIsPlaying(false);
    setIsFlashing(false);
  }, []);

  const handlePlay = useCallback(() => {
    if (!audioEngineRef.current) return;
    if (isPlaying) {
      handleStop();
      return;
    }

    setIsPlaying(true);

    const playCycle = () => {
      if (!audioEngineRef.current) return;

      audioEngineRef.current.play(
        morseCode,
        speedWpm,
        soundEnabled ? 650 : 0, // frequency
        {
          onFlash: (flash) => {
            if (!reducedMotion) {
              setIsFlashing(flash);
            }
          },
          onEnded: () => {
            if (repeatMode) {
              repeatTimeoutRef.current = window.setTimeout(() => {
                playCycle();
              }, 1200); // 1.2s inter-cycle pause
            } else {
              setIsPlaying(false);
              setIsFlashing(false);
            }
          },
        }
      );
    };

    playCycle();
  }, [isPlaying, morseCode, speedWpm, soundEnabled, reducedMotion, repeatMode, handleStop]);

  return (
    <div className="studio-workbench overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-4 shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 sm:p-6 md:p-8">
      {/* Beacon Title & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5">
              <span className={`h-2.5 w-2.5 rounded-full ${isPlaying ? 'animate-ping bg-amber-400 opacity-75' : 'bg-slate-300 dark:bg-slate-700'}`} />
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Optical Signaling
            </span>
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
            {label}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {showFullscreenOption && (
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="btn-tactile touch-target inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              title="Expand strobe beacon to full screen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0 0l-5-5m-7 11l-5 5m0 0h4m-4 0v-4m16 4l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span>Full Screen</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Strobe Lantern Display Box */}
      <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-slate-200/90 bg-slate-950 p-5 text-center sm:p-8 md:p-10">
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-full transition-all duration-75 sm:h-36 sm:w-36 ${
            isFlashing
              ? 'scale-110 bg-amber-400 shadow-[0_0_60px_rgba(251,191,36,0.95)]'
              : 'bg-slate-800/80 ring-2 ring-slate-700/50'
          }`}
          aria-live="polite"
          aria-label={isFlashing ? 'Beacon Flashing Light Active' : 'Beacon Light Off'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-12 w-12 transition-colors duration-75 sm:h-18 sm:w-18 ${
              isFlashing ? 'text-slate-950' : 'text-slate-600'
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm0 16a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm8-7a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM7 12a1 1 0 01-1 1H4a1 1 0 110-2h2a1 1 0 011 1zm11.364-5.364a1 1 0 010 1.414l-1.414 1.414a1 1 0 11-1.414-1.414l1.414-1.414a1 1 0 011.414 0zm-12.728 0a1 1 0 011.414 0l1.414 1.414a1 1 0 11-1.414 1.414L5.636 8.05a1 1 0 010-1.414zm12.728 11.314a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 111.414-1.414l1.414 1.414a1 1 0 010 1.414zm-12.728 0a1 1 0 010-1.414l1.414-1.414a1 1 0 111.414 1.414l-1.414 1.414a1 1 0 01-1.414 0zM12 7a5 5 0 100 10 5 5 0 000-10z" />
          </svg>
        </div>

        <div className="mt-5 max-w-full px-2 break-all font-mono text-2xl font-black tracking-widest text-white sm:text-3xl">
          {morseCode}
        </div>
        <p className="mt-1 text-xs text-slate-400">
          {isFlashing ? 'EMITTING OPTICAL PULSE' : isPlaying ? 'CYCLE PAUSE / TIMING INTERVAL' : 'STANDBY MODE'}
        </p>
      </div>

      {/* Control Panel Deck */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
        {/* Play / Stop Primary Trigger */}
        <button
          type="button"
          onClick={handlePlay}
          className={`btn-tactile touch-target flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-xs transition-all ${
            isPlaying
              ? 'bg-rose-600 text-white hover:bg-rose-700'
              : 'bg-teal-700 text-white hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500'
          }`}
        >
          {isPlaying ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </svg>
              <span>Stop Beacon</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>Transmit Signal</span>
            </>
          )}
        </button>

        {/* Audio Toggle */}
        <button
          type="button"
          onClick={() => setSoundEnabled((prev) => !prev)}
          className={`btn-tactile touch-target flex min-h-[46px] items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs font-bold transition-all ${
            soundEnabled
              ? 'border-teal-300 bg-teal-50 text-teal-800 dark:border-teal-800 dark:bg-teal-950/60 dark:text-teal-300'
              : 'border-slate-300 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={soundEnabled ? "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" : "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z m12-2l-4-4m0 4l4-4"} />
          </svg>
          <span>{soundEnabled ? 'Acoustic Tone: ON' : 'Acoustic Tone: MUTE'}</span>
        </button>

        {/* Speed Selector */}
        <div className="flex min-h-[46px] items-center justify-between rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <label htmlFor="beacon-speed-select" className="text-xs font-bold text-slate-600 dark:text-slate-300">
            Speed:
          </label>
          <select
            id="beacon-speed-select"
            value={speedWpm}
            onChange={(e) => setSpeedWpm(Number(e.target.value))}
            className="rounded-lg border-0 bg-transparent text-xs font-bold text-teal-800 focus:ring-0 dark:text-teal-300"
          >
            <option value={8}>8 WPM (Slow)</option>
            <option value={12}>12 WPM (Standard)</option>
            <option value={16}>16 WPM (Radio)</option>
            <option value={20}>20 WPM (Rapid)</option>
          </select>
        </div>

        {/* Repeat Toggle */}
        <button
          type="button"
          onClick={() => setRepeatMode((prev) => !prev)}
          className={`btn-tactile touch-target flex min-h-[46px] items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs font-bold transition-all ${
            repeatMode
              ? 'border-teal-300 bg-teal-50 text-teal-800 dark:border-teal-800 dark:bg-teal-950/60 dark:text-teal-300'
              : 'border-slate-300 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{repeatMode ? 'Continuous Loop' : 'Play Once'}</span>
        </button>
      </div>

      {/* Accessibility & Photosensitivity Warning Notice */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <div className="leading-relaxed">
          <strong className="font-bold">Photosensitivity &amp; Visual Warning:</strong> This optical beacon simulator produces repetitive pulsing light sequences. If you have photosensitive epilepsy, visual migraine triggers, or light sensitivity, please enable{' '}
          <button
            type="button"
            onClick={() => setReducedMotion((prev) => !prev)}
            className="font-bold underline hover:text-amber-700 dark:hover:text-amber-300"
          >
            {reducedMotion ? 'Resume Visual Flashes' : 'Reduced Motion (Audio Only)'}
          </button>
          {' '}or avoid full-screen strobe mode.
        </div>
      </div>

      {/* Fullscreen Overlay Mode */}
      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full-Screen Optical Morse Beacon"
          className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-12 transition-colors duration-75 ${
            isFlashing ? 'bg-amber-400 text-slate-950' : 'bg-black text-white'
          }`}
        >
          {/* Top Bar with Close */}
          <div className="flex w-full items-center justify-between gap-2">
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-80 truncate max-w-[65%] sm:max-w-none">
              FULLSCREEN OPTICAL SIGNALING &bull; ITU-R M.1677-1
            </span>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="touch-target inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-slate-900/50 px-3 sm:px-4 py-2 font-mono text-xs font-bold backdrop-blur-md transition-colors hover:bg-slate-900/70"
            >
              <span>Close</span>
              <kbd className="hidden sm:inline rounded bg-white/20 px-1.5 py-0.5 text-[10px]">Esc</kbd>
            </button>
          </div>

          {/* Central Strobe Visual Indicator */}
          <div className="text-center w-full px-2">
            <div className="font-mono text-3xl min-[360px]:text-4xl sm:text-7xl md:text-8xl font-black tracking-wider sm:tracking-widest break-all">
              {morseCode}
            </div>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest opacity-75 sm:text-base">
              {isFlashing ? '••• FLASH ACTIVE •••' : '••• INTERVAL GAP •••'}
            </p>
          </div>

          {/* Bottom Floating Control Bar */}
          <div className="flex w-full sm:w-auto flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={handlePlay}
              className="touch-target w-full sm:w-auto rounded-xl bg-slate-900 px-6 py-3 font-mono text-xs font-bold text-white shadow-lg transition-transform active:scale-95"
            >
              {isPlaying ? 'PAUSE TRANSMISSION' : 'TRANSMIT SIGNAL'}
            </button>
            <button
              type="button"
              onClick={() => setSoundEnabled((prev) => !prev)}
              className="touch-target w-full sm:w-auto rounded-xl bg-slate-900/60 px-4 py-3 font-mono text-xs font-bold text-white backdrop-blur-md"
            >
              {soundEnabled ? 'MUTE SOUND' : 'ENABLE SOUND'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

