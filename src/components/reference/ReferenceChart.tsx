'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { CANONICAL_REFERENCE_LIST } from '@/lib/morse';
import { morseAudio } from '@/features/audio/audioEngine';
import type { MorseReferenceItem } from '@/types';

type CategoryFilter = 'all' | 'letter' | 'number' | 'punctuation';

function getMorseRhythm(morse: string): string {
  const parts = morse.split(' ');
  return parts
    .map((part) => {
      const chars = part.split('');
      return chars
        .map((c, i) => {
          if (c === '.') {
            return i === chars.length - 1 ? 'dit' : 'di';
          }
          if (c === '-') {
            return 'DAH';
          }
          return c;
        })
        .join('-');
    })
    .join(' / ');
}

export function ReferenceChart() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [playbackWpm, setPlaybackWpm] = useState<number>(15);
  const [copiedChar, setCopiedChar] = useState<string | null>(null);
  const [playingChar, setPlayingChar] = useState<string | null>(null);
  const [sharedChar, setSharedChar] = useState<string | null>(null);

  // Stop audio if component unmounts
  useEffect(() => {
    return () => {
      morseAudio.stop();
    };
  }, []);

  const filteredItems = useMemo(() => {
    return CANONICAL_REFERENCE_LIST.filter((item) => {
      // Category match
      if (category !== 'all' && item.category !== category) {
        return false;
      }

      // Search match (character, Morse code, or description label)
      if (search.trim().length > 0) {
        const query = search.trim().toLowerCase();
        const matchChar = item.character.toLowerCase().includes(query);
        const matchMorse = item.morse.includes(query);
        const matchLabel = item.label.toLowerCase().includes(query);
        return matchChar || matchMorse || matchLabel;
      }

      return true;
    });
  }, [category, search]);

  const handleCopyMorse = async (item: MorseReferenceItem) => {
    try {
      await navigator.clipboard.writeText(item.morse);
      setCopiedChar(item.character);
      setTimeout(() => setCopiedChar(null), 2000);
    } catch {
      // Fallback
    }
  };

  const handleTogglePlay = async (item: MorseReferenceItem) => {
    if (playingChar === item.character) {
      morseAudio.stop();
      setPlayingChar(null);
      return;
    }

    setPlayingChar(item.character);
    try {
      await morseAudio.play(item.morse, playbackWpm, 600, {
        onEnded: () => {
          setPlayingChar((current) => (current === item.character ? null : current));
        },
      });
    } catch {
      setPlayingChar(null);
    }
  };

  const handleShareItem = async (item: MorseReferenceItem) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const shareUrl = `${origin}/?text=${encodeURIComponent(item.character)}`;
    const shareText = `Morse code for "${item.character}" is ${item.morse} (${item.label}).`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Morse Code: ${item.character} (${item.morse})`,
          text: shareText,
          url: shareUrl,
        });
        setSharedChar(item.character);
        setTimeout(() => setSharedChar(null), 2200);
        return;
      } catch {
        // User cancelled or share failed, fallback to copy
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setSharedChar(item.character);
      setTimeout(() => setSharedChar(null), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="w-full">
      {/* Search, Category Filter & WPM Toolbar */}
      <div className="studio-card mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-sm backdrop-blur-xs sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900/95">
        {/* Search Input */}
        <div className="relative flex-1">
          <label htmlFor="reference-search" className="sr-only">
            Search International Morse characters or codes
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 dark:text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id="reference-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by letter, number, symbol or code (e.g. SOS, .-)..."
            className="w-full rounded-xl border border-slate-300/80 bg-slate-50/70 py-2.5 pr-10 pl-10 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-teal-700 focus:bg-white focus:outline-hidden focus:ring-4 focus:ring-teal-700/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-teal-400 dark:focus:bg-slate-900 dark:focus:ring-teal-400/15"
          />
          {search.length > 0 && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Clear search input"
              aria-label="Clear search input"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>

        {/* Speed Controls & Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Audio Preview Speed Selector */}
          <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200/90 bg-slate-100/80 p-1 dark:border-slate-800 dark:bg-slate-950">
            <span className="hidden px-2 font-mono text-[11px] font-bold text-slate-500 md:inline dark:text-slate-400">
              Speed:
            </span>
            {[
              { val: 10, label: '10 WPM' },
              { val: 15, label: '15 WPM' },
              { val: 20, label: '20 WPM' },
            ].map((s) => (
              <button
                key={s.val}
                type="button"
                onClick={() => setPlaybackWpm(s.val)}
                className={`rounded-lg px-2 py-1 font-mono text-xs font-bold transition-all ${
                  playbackWpm === s.val
                    ? 'bg-white text-teal-800 shadow-2xs dark:bg-slate-800 dark:text-teal-300'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
                title={`Set audio preview speed to ${s.label}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Category Tabs */}
          <div className="inline-flex rounded-xl border border-slate-200/90 bg-slate-100/80 p-1 dark:border-slate-800 dark:bg-slate-950" role="tablist" aria-label="Character categories">
            {(
              [
                { key: 'all', label: 'All (54)' },
                { key: 'letter', label: 'Letters (A–Z)' },
                { key: 'number', label: 'Digits (0–9)' },
                { key: 'punctuation', label: 'Punctuation' },
              ] as const
            ).map((cat) => (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={category === cat.key}
                onClick={() => setCategory(cat.key)}
                className={`touch-target rounded-lg px-3 py-1.5 text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus sm:text-sm ${
                  category === cat.key
                    ? 'bg-teal-700 text-white shadow-xs dark:bg-teal-500 dark:text-slate-950'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/70 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Counter Badge */}
          <span className="hidden rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs font-medium text-slate-500 xl:inline-block dark:bg-slate-800 dark:text-slate-400">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {/* Accessible Table Container with Atmospheric Glow */}
      <div className="studio-workbench overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-md shadow-slate-200/50 backdrop-blur-xs dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/50">
        {/* Desktop / Tablet Full Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-900 border-collapse dark:text-slate-100">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/95 text-[11px] font-bold tracking-wider text-slate-600 uppercase dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
                <th scope="col" className="px-5 py-3.5">
                  Character
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Morse Sequence
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Description &amp; Rhythm
                </th>
                <th scope="col" className="px-5 py-3.5 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr
                    key={item.character}
                    className="table-row-hover group"
                  >
                    {/* Character */}
                    <td className="px-5 py-3.5 font-bold text-base text-slate-900 dark:text-slate-100">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50/90 font-mono text-base font-extrabold text-slate-900 shadow-2xs transition-transform group-hover:scale-105 group-hover:border-teal-400 group-hover:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:group-hover:border-teal-400">
                        {item.character}
                      </span>
                    </td>

                    {/* Morse Sequence */}
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-base font-extrabold tracking-[0.2em] text-teal-800 dark:text-teal-300">
                        {item.morse}
                      </span>
                    </td>

                    {/* Description & Spoken Rhythm */}
                    <td className="px-5 py-3.5 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
                      <div className="flex flex-wrap items-center gap-2">
                        <span>{item.label}</span>
                        <span className="rounded-md border border-amber-200/90 bg-amber-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-amber-900 dark:border-amber-800/80 dark:bg-amber-950/60 dark:text-amber-300">
                          {getMorseRhythm(item.morse)}
                        </span>
                        <span className="inline-flex items-center rounded-md border border-slate-200/90 bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 capitalize">
                          {item.category}
                        </span>
                      </div>
                    </td>

                    {/* Actions: Play/Stop, Copy, Share & Studio */}
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        {/* Play / Stop Audio */}
                        <button
                          type="button"
                          onClick={() => handleTogglePlay(item)}
                          className={`touch-target inline-flex items-center justify-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus ${
                            playingChar === item.character
                              ? 'border-amber-400 bg-amber-50 text-amber-800 shadow-xs ring-2 ring-amber-400/30 animate-pulse dark:border-amber-500 dark:bg-amber-950/70 dark:text-amber-300'
                              : 'border-slate-300 bg-white text-slate-700 shadow-2xs hover:border-teal-600 hover:bg-teal-50/50 hover:text-teal-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-teal-400 dark:hover:text-teal-300'
                          }`}
                          title={playingChar === item.character ? `Stop audio for ${item.character}` : `Play audio for ${item.character} at ${playbackWpm} WPM`}
                          aria-label={playingChar === item.character ? `Stop audio for ${item.label}` : `Play audio for ${item.label}`}
                        >
                          {playingChar === item.character ? (
                            <>
                              <span className="flex items-center gap-0.5" aria-hidden="true">
                                <span className="h-2.5 w-0.5 rounded-full bg-amber-700 dark:bg-amber-400 animate-pulse" />
                                <span className="h-3.5 w-0.5 rounded-full bg-amber-700 dark:bg-amber-400 animate-pulse" />
                                <span className="h-2 w-0.5 rounded-full bg-amber-700 dark:bg-amber-400 animate-pulse" />
                              </span>
                              <span>Stop</span>
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 fill-current text-teal-700 dark:text-teal-400" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                              <span>Play</span>
                            </>
                          )}
                        </button>

                        {/* Copy Action */}
                        <button
                          type="button"
                          onClick={() => handleCopyMorse(item)}
                          className={`touch-target inline-flex items-center justify-center gap-1 rounded-xl border px-2.5 py-1.5 text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus ${
                            copiedChar === item.character
                              ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 shadow-xs'
                              : 'border-slate-300 bg-white text-slate-700 shadow-2xs hover:border-teal-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                          }`}
                          title={`Copy Morse code for ${item.character}`}
                          aria-label={`Copy Morse code for ${item.label}`}
                        >
                          {copiedChar === item.character ? (
                            <span className="text-emerald-700 dark:text-emerald-400">Copied!</span>
                          ) : (
                            <span>Copy</span>
                          )}
                        </button>

                        {/* Share Action */}
                        <button
                          type="button"
                          onClick={() => handleShareItem(item)}
                          className={`touch-target inline-flex items-center justify-center gap-1 rounded-xl border px-2.5 py-1.5 text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus ${
                            sharedChar === item.character
                              ? 'border-teal-400 bg-teal-50 text-teal-800 dark:border-teal-700 dark:bg-teal-950/60 dark:text-teal-300 shadow-xs'
                              : 'border-slate-300 bg-white text-slate-700 shadow-2xs hover:border-teal-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                          }`}
                          title={`Share direct link to translate ${item.character}`}
                          aria-label={`Share Morse code for ${item.label}`}
                        >
                          {sharedChar === item.character ? (
                            <span className="text-teal-700 dark:text-teal-300">Shared!</span>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                              </svg>
                              <span>Share</span>
                            </>
                          )}
                        </button>

                        {/* Open in Translator Studio */}
                        <Link
                          href={`/?text=${encodeURIComponent(item.character)}`}
                          className="touch-target inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-2 py-1.5 text-xs font-semibold text-slate-500 shadow-2xs transition-colors hover:border-teal-600 hover:text-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-teal-400 dark:hover:text-teal-300"
                          title={`Open ${item.character} in Morse Translator Studio`}
                          aria-label={`Open ${item.label} in Morse Translator`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                    No matching characters found for &ldquo;{search}&rdquo;. Try another search term.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile-Optimized Card Grid View (Sub-768px Screens) */}
        <div className="block md:hidden divide-y divide-slate-100 dark:divide-slate-800">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.character} className="p-4 transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 font-mono text-lg font-extrabold text-slate-900 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                      {item.character}
                    </span>
                    <div>
                      <div className="font-mono text-lg font-extrabold tracking-widest text-teal-800 dark:text-teal-300">
                        {item.morse}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.label}
                      </div>
                    </div>
                  </div>

                  <span className="rounded-md border border-amber-200/90 bg-amber-50 px-2 py-0.5 font-mono text-[11px] font-bold text-amber-900 dark:border-amber-800/80 dark:bg-amber-950/60 dark:text-amber-300">
                    {getMorseRhythm(item.morse)}
                  </span>
                </div>

                {/* Mobile Touch Action Row */}
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-2.5 dark:border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => handleTogglePlay(item)}
                    className={`btn-tactile touch-target flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                      playingChar === item.character
                        ? 'border-amber-400 bg-amber-50 text-amber-800 animate-pulse dark:border-amber-500 dark:bg-amber-950/70 dark:text-amber-300'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-teal-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {playingChar === item.character ? 'Stop' : 'Play Tone'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopyMorse(item)}
                    className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {copiedChar === item.character ? 'Copied' : 'Copy'}
                  </button>

                  <Link
                    href={`/?text=${encodeURIComponent(item.character)}`}
                    className="btn-tactile touch-target inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:text-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    Translate &rarr;
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
              No matching characters found for &ldquo;{search}&rdquo;. Try another search term.
            </div>
          )}
        </div>
      </div>

      {/* Standards & Conventions Note */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 text-xs text-slate-600 leading-relaxed dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <h3 className="font-bold text-slate-900 text-sm dark:text-slate-100">International Morse Standard Note</h3>
        <p className="mt-1">
          This chart defines the official International Morse Code alphabet according to Recommendation ITU-R M.1677-1.
          It covers 26 uppercase Latin letters, 10 Arabic digits, and 18 standard punctuation symbols.
          In Morse transmission, the forward slash (<code className="font-bold text-slate-900 dark:text-slate-100">/</code>) is used to indicate word spaces,
          while a literal slash is transmitted as <code className="font-bold text-slate-900 dark:text-slate-100">-..-.</code>.
        </p>
      </div>
    </div>
  );
}
