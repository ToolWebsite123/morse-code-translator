'use client';

import { useState } from 'react';
import { morseAudio } from '@/features/audio/audioEngine';

interface AudioPreviewButtonProps {
  morse: string;
  wpm?: number;
  label?: string;
}

export function AudioPreviewButton({ morse, wpm = 15, label = 'Listen' }: AudioPreviewButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    if (isPlaying) {
      morseAudio.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    try {
      await morseAudio.play(morse, wpm, 600, {
        onEnded: () => setIsPlaying(false),
      });
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePlay}
      className={`touch-target inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus ${
        isPlaying
          ? 'border-amber-400 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
          : 'border-slate-300 bg-white text-teal-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-teal-300 dark:hover:bg-slate-700'
      }`}
      aria-label={`${isPlaying ? 'Stop' : 'Listen to'} Morse audio for ${morse}`}
    >
      {isPlaying ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <rect x="5" y="5" width="10" height="10" rx="1" />
          </svg>
          Stop
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}

