'use client';

import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import Link from 'next/link';
import { decodeAudioBuffer, type AudioDecodeResult } from '@/lib/audio/audioDecoder';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB limit
const MAX_DURATION_SECONDS = 120; // 2 minutes limit

export function AudioDecoderClient() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<AudioDecodeResult | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [copiedMorse, setCopiedMorse] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    setErrorMessage(null);
    setResult(null);

    // Validate size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage('File size exceeds the 10 MB limit. Please select a smaller audio clip.');
      return;
    }

    // Validate type
    const validTypes = ['audio/wav', 'audio/x-wav', 'audio/mpeg', 'audio/mp3', 'audio/ogg', 'audio/webm', 'audio/flac', 'audio/m4a', 'audio/x-m4a'];
    const isAudioType = validTypes.includes(file.type) || /\.(wav|mp3|ogg|webm|flac|m4a)$/i.test(file.name);
    if (!isAudioType) {
      setErrorMessage('Unsupported file format. Please upload a standard audio file (.wav, .mp3, .ogg, or .webm).');
      return;
    }

    setIsProcessing(true);
    setFileName(file.name);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();

      let audioBuffer: AudioBuffer;
      try {
        audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      } catch {
        throw new Error('Could not decode audio data. The file may be corrupt or encoded in an unsupported codec.');
      } finally {
        await audioCtx.close();
      }

      if (audioBuffer.duration > MAX_DURATION_SECONDS) {
        throw new Error(`Audio duration (${audioBuffer.duration.toFixed(0)}s) exceeds the maximum limit of ${MAX_DURATION_SECONDS} seconds.`);
      }

      // Execute browser-local acoustic decoding
      const decodedResult = decodeAudioBuffer(audioBuffer);

      if (!decodedResult.text && !decodedResult.morse) {
        setErrorMessage('No recognizable Morse code audio signals were detected in this file. Ensure the tone is clear and audible.');
      } else {
        setResult(decodedResult);
        // Set object URL for preview audio
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(URL.createObjectURL(file));
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred while analyzing the audio file.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCopyText = async () => {
    if (!result?.text) return;
    try {
      await navigator.clipboard.writeText(result.text);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyMorse = async () => {
    if (!result?.morse) return;
    try {
      await navigator.clipboard.writeText(result.morse);
      setCopiedMorse(true);
      setTimeout(() => setCopiedMorse(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleReset = () => {
    setResult(null);
    setErrorMessage(null);
    setFileName(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  return (
    <div className="mx-auto max-w-4xl py-2">
      {/* Hero Header */}
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal-200/90 bg-teal-50/90 px-3.5 py-1 text-xs font-semibold text-teal-900 shadow-2xs backdrop-blur-xs dark:border-teal-800/80 dark:bg-teal-950/70 dark:text-teal-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-600 dark:bg-teal-400" />
          </span>
          <span>Acoustic Signal Decoder</span>
          <span className="text-teal-300 dark:text-teal-700">&bull;</span>
          <span className="font-mono text-[11px] font-bold text-teal-800 dark:text-teal-200">WAV / MP3 / OGG</span>
          <span className="hidden text-teal-300 sm:inline dark:text-teal-700">&bull;</span>
          <span className="hidden text-teal-700 sm:inline dark:text-teal-300 font-medium">Browser-Local Web Audio</span>
        </span>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-[42px] sm:leading-tight dark:text-white">
          Morse Code{' '}
          <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-teal-300 dark:via-emerald-300 dark:to-teal-200">
            Audio File Decoder
          </span>
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
          Upload an audio recording (.wav, .mp3, .ogg, .webm) to automatically detect tone frequencies, envelope timing, and transcribe Morse beeps into text.
        </p>
      </div>

      {/* Privacy Disclosure Banner */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50/60 p-4 text-xs text-teal-950 dark:border-teal-900/50 dark:bg-teal-950/40 dark:text-teal-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 shrink-0 text-teal-700 dark:text-teal-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
        </svg>
        <p className="leading-relaxed">
          <strong>Browser-Local Processing:</strong> Audio analysis is executed locally inside your web browser using the Web Audio API. Your audio files remain on your device and are not uploaded to any remote server.
        </p>
      </div>

      {/* Main Upload / Dropzone Card */}
      {!result && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`mt-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
            isDragging
              ? 'border-teal-600 bg-teal-50/50 dark:border-teal-400 dark:bg-teal-950/30'
              : 'border-slate-300 bg-white hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600'
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>

          <p className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
            Choose an audio file or drag &amp; drop it here
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Supports WAV, MP3, OGG, WebM (up to 10 MB, max 120 seconds)
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*,.wav,.mp3,.ogg,.webm,.flac,.m4a"
            onChange={handleFileInputChange}
            disabled={isProcessing}
            className="sr-only"
            id="audio-file-input"
          />

          <label
            htmlFor="audio-file-input"
            className="touch-target mt-5 inline-flex cursor-pointer items-center justify-center rounded-lg bg-teal-700 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500 sm:text-sm"
          >
            {isProcessing ? 'Analyzing Audio Signal...' : 'Browse Audio File'}
          </label>
        </div>
      )}

      {/* Loading Progress State */}
      {isProcessing && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
          <div className="inline-flex h-8 w-8 animate-spin rounded-full border-3 border-teal-600 border-t-transparent dark:border-teal-400 dark:border-t-transparent" />
          <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
            Decoding &bull; {fileName}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Computing acoustic energy envelopes, tone clusters, and timing rhythms...
          </p>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/50 dark:text-rose-200">
          <div className="flex items-center gap-2 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Decoding Notice
          </div>
          <p className="mt-1 leading-relaxed">{errorMessage}</p>
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="mt-6 space-y-6">
          {/* Signal Metrics Bar */}
          <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="text-center">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Estimated Speed</span>
              <p className="mt-0.5 font-mono text-base font-bold text-teal-800 dark:text-teal-400">
                {result.detectedWpm} WPM
              </p>
            </div>
            <div className="text-center border-l border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Tone Pitch</span>
              <p className="mt-0.5 font-mono text-base font-bold text-teal-800 dark:text-teal-400">
                {result.detectedPitchHz} Hz
              </p>
            </div>
            <div className="text-center border-l border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Signal Confidence</span>
              <p className="mt-0.5 font-mono text-base font-bold text-teal-800 dark:text-teal-400">
                {result.confidence}%
              </p>
            </div>
            <div className="text-center border-l border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Audio Duration</span>
              <p className="mt-0.5 font-mono text-base font-bold text-teal-800 dark:text-teal-400">
                {result.durationSeconds.toFixed(1)}s
              </p>
            </div>
          </div>

          {/* Decoded Text Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Decoded English Text
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Source: {fileName}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyText}
                className="touch-target inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {copiedText ? 'Copied!' : 'Copy Text'}
              </button>
            </div>
            <div className="mt-4 min-h-[60px] rounded-lg bg-slate-50 p-4 font-mono text-base font-semibold text-slate-900 dark:bg-slate-800/60 dark:text-slate-100">
              {result.text || <span className="text-slate-400 italic font-sans text-sm">No plain text recognized</span>}
            </div>
          </div>

          {/* Transcribed Morse Code Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Transcribed Morse Sequence
              </h3>
              <button
                type="button"
                onClick={handleCopyMorse}
                className="touch-target inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {copiedMorse ? 'Copied!' : 'Copy Morse'}
              </button>
            </div>
            <div className="mt-4 min-h-[60px] rounded-lg bg-slate-50 p-4 font-mono text-sm leading-relaxed text-slate-800 break-words dark:bg-slate-800/60 dark:text-slate-200">
              {result.morse || <span className="text-slate-400 italic font-sans text-sm">No Morse tokens detected</span>}
            </div>
          </div>

          {/* Audio Player Preview */}
          {audioUrl && (
            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Original Audio Playback
              </span>
              <audio controls src={audioUrl} className="mt-2 w-full" />
            </div>
          )}

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="touch-target inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:text-sm"
            >
              Decode Another Audio File
            </button>
            <Link
              href="/"
              className="text-xs font-semibold text-teal-800 hover:underline dark:text-teal-400"
            >
              &larr; Back to Main Morse Translator
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

