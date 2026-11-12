'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { micMorseDecoder } from '@/lib/audio/micDecoder';

export function MicDecoderClient() {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isToneActive, setIsToneActive] = useState<boolean>(false);
  const [signalLevel, setSignalLevel] = useState<number>(0);
  const [morseText, setMorseText] = useState<string>('');
  const [decodedText, setDecodedText] = useState<string>('');
  const [estimatedWpm, setEstimatedWpm] = useState<number>(15);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [copiedMorse, setCopiedMorse] = useState<boolean>(false);

  // Stop listening and release media tracks on unmount (PRD FR-029)
  useEffect(() => {
    return () => {
      micMorseDecoder.stop();
    };
  }, []);

  const handleStart = async () => {
    setErrorMessage(null);

    await micMorseDecoder.start({
      onToneChange: (active) => {
        setIsToneActive(active);
      },
      onMorseUpdate: (morse, text, wpm) => {
        setMorseText(morse);
        setDecodedText(text);
        setEstimatedWpm(wpm);
      },
      onSignalLevel: (level) => {
        setSignalLevel(level);
      },
      onError: (err) => {
        setIsListening(false);
        setIsToneActive(false);
        setSignalLevel(0);
        setErrorMessage(err);
      },
    });

    if (micMorseDecoder.getIsListening()) {
      setIsListening(true);
    }
  };

  const handleStop = () => {
    micMorseDecoder.stop();
    setIsListening(false);
    setIsToneActive(false);
    setSignalLevel(0);
  };

  const handleClear = () => {
    micMorseDecoder.clear();
    setMorseText('');
    setDecodedText('');
  };

  const handleCopyText = async () => {
    if (!decodedText) return;
    try {
      await navigator.clipboard.writeText(decodedText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyMorse = async () => {
    if (!morseText) return;
    try {
      await navigator.clipboard.writeText(morseText);
      setCopiedMorse(true);
      setTimeout(() => setCopiedMorse(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-900 dark:border-teal-900/50 dark:bg-teal-950/60 dark:text-teal-300">
          Release 3 &bull; Real-Time Acoustic Decoder
        </span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          Live Microphone Morse Code Decoder
        </h1>
        <p className="mt-3 text-sm text-slate-600 sm:text-base dark:text-slate-400">
          Listen to Morse code audio in real time through your microphone or device speaker and transcribe it into text instantly.
        </p>
      </div>

      {/* Privacy Banner */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50/50 p-4 text-xs text-teal-950 dark:border-teal-900/40 dark:bg-teal-950/30 dark:text-teal-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 shrink-0 text-teal-700 dark:text-teal-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
        </svg>
        <p className="leading-relaxed">
          <strong>100% In-Browser Privacy:</strong> Audio streams are analyzed live in your browser&apos;s memory and are never recorded, saved to disk, or sent to any server. Microphone access stops immediately when you click Stop or leave this page.
        </p>
      </div>

      {/* Control Card & Visualizer */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            {/* Status indicator dot */}
            <span className="relative flex h-3.5 w-3.5">
              {isListening && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75 dark:bg-rose-500" />
              )}
              <span
                className={`relative inline-flex h-3.5 w-3.5 rounded-full ${
                  isListening ? 'bg-rose-600 dark:bg-rose-500' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {isListening ? 'Microphone Active &bull; Listening Live' : 'Microphone Ready'}
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {isListening ? 'Acoustic bandpass filter: 600 Hz' : 'Requires explicit microphone permission'}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {!isListening ? (
              <button
                type="button"
                onClick={handleStart}
                className="touch-target inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 sm:text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                Start Listening
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStop}
                className="touch-target inline-flex items-center gap-2 rounded-lg bg-rose-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-rose-700 focus-visible:outline-2 focus-visible:outline-rose-600 sm:text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="6" y="6" width="12" height="12" rx="1" fill="currentColor" />
                </svg>
                Stop Listening
              </button>
            )}

            <button
              type="button"
              onClick={handleClear}
              className="touch-target inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:text-sm"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Live Signal Visualizer & Tone Beacon */}
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {/* Audio Input Level Bar */}
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>Acoustic Input Level</span>
              <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                {isListening ? `${Math.round(signalLevel * 100)}%` : 'Idle'}
              </span>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className={`h-full transition-all duration-75 ${
                  signalLevel > 0.7 ? 'bg-amber-500' : 'bg-teal-600 dark:bg-teal-500'
                }`}
                style={{ width: `${Math.min(100, Math.max(0, signalLevel * 100))}%` }}
              />
            </div>
          </div>

          {/* Real-time Tone Detected Beacon */}
          <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-2.5 sm:justify-center sm:gap-3 dark:border-slate-800 dark:bg-slate-800/60">
            <div className="flex items-center gap-2">
              <div
                className={`h-4 w-4 rounded-full border transition-all duration-75 ${
                  isToneActive
                    ? 'border-amber-500 bg-amber-400 shadow-md shadow-amber-400/80 dark:shadow-amber-400/60'
                    : 'border-slate-300 bg-slate-200 dark:border-slate-700 dark:bg-slate-700'
                }`}
              />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {isToneActive ? 'Tone Active (Beep)' : 'Tone Inactive (Silence)'}
              </span>
            </div>
            <span className="font-mono text-[11px] text-teal-800 font-semibold dark:text-teal-400">
              ~{estimatedWpm} WPM
            </span>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/50 dark:text-rose-200">
          <div className="flex items-center gap-2 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Microphone Notice
          </div>
          <p className="mt-1 leading-relaxed">{errorMessage}</p>
        </div>
      )}

      {/* Transcribed Output Section */}
      <div className="mt-6 space-y-6">
        {/* Decoded Plain Text */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Decoded English Text
              </h3>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Transcribed live from acoustic beeps
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyText}
              disabled={!decodedText}
              className="touch-target inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 disabled:opacity-50 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {copiedText ? 'Copied!' : 'Copy Text'}
            </button>
          </div>
          <div className="mt-4 min-h-[70px] rounded-lg bg-slate-50 p-4 font-mono text-base font-semibold text-slate-900 break-words dark:bg-slate-800/60 dark:text-slate-100">
            {decodedText || (
              <span className="text-slate-400 italic font-sans text-xs">
                {isListening
                  ? 'Listening for Morse code beeps... Hold your speaker or audio source near the microphone.'
                  : 'Click "Start Listening" above to begin acoustic transcription.'}
              </span>
            )}
          </div>
        </div>

        {/* Live Morse Code Stream */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Live Morse Sequence
            </h3>
            <button
              type="button"
              onClick={handleCopyMorse}
              disabled={!morseText}
              className="touch-target inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 disabled:opacity-50 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {copiedMorse ? 'Copied!' : 'Copy Morse'}
            </button>
          </div>
          <div className="mt-4 min-h-[60px] rounded-lg bg-slate-50 p-4 font-mono text-sm leading-relaxed text-slate-800 break-words dark:bg-slate-800/60 dark:text-slate-200">
            {morseText || (
              <span className="text-slate-400 italic font-sans text-xs">
                No Morse elements detected yet
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4 dark:border-slate-800">
        <Link
          href="/morse-code-audio-decoder"
          className="text-xs font-semibold text-teal-800 hover:underline dark:text-teal-400"
        >
          &larr; Switch to Audio File Decoder (WAV/MP3 upload)
        </Link>
        <Link
          href="/"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
        >
          Back to Main Morse Translator
        </Link>
      </div>
    </div>
  );
}
