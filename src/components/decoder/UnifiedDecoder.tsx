'use client';

import { useState } from 'react';
import { MicDecoderClient } from './MicDecoderClient';
import { AudioDecoderClient } from './AudioDecoderClient';

export function UnifiedDecoder() {
  const [activeTab, setActiveTab] = useState<'mic' | 'file'>('mic');

  return (
    <div className="w-full">
      {/* Mode Selector Tabs */}
      <div className="mx-auto max-w-4xl px-4 pt-2 sm:px-6">
        <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => setActiveTab('mic')}
            className={`flex-1 rounded-lg py-2.5 text-xs font-bold transition-all sm:text-sm ${
              activeTab === 'mic'
                ? 'bg-teal-700 text-white shadow-xs dark:bg-teal-600'
                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Live Microphone Decoder
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('file')}
            className={`flex-1 rounded-lg py-2.5 text-xs font-bold transition-all sm:text-sm ${
              activeTab === 'file'
                ? 'bg-teal-700 text-white shadow-xs dark:bg-teal-600'
                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Audio File Upload (.wav, .mp3)
            </span>
          </button>
        </div>
      </div>

      {/* Render Selected Tool */}
      {activeTab === 'mic' ? <MicDecoderClient /> : <AudioDecoderClient />}
    </div>
  );
}
