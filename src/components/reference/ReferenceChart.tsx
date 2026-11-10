'use client';

import { useState, useMemo } from 'react';
import { CANONICAL_REFERENCE_LIST } from '@/lib/morse';
import type { MorseReferenceItem } from '@/types';

type CategoryFilter = 'all' | 'letter' | 'number' | 'punctuation';

export function ReferenceChart() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [copiedChar, setCopiedChar] = useState<string | null>(null);

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

  return (
    <div className="w-full">
      {/* Search and Category Filter Toolbar */}
      <div className="mb-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        {/* Search Input */}
        <div className="relative flex-1">
          <label htmlFor="reference-search" className="sr-only">
            Search International Morse characters or codes
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
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
            className="w-full rounded-lg border border-slate-300 bg-slate-50/70 py-2.5 pr-4 pl-9 text-sm text-slate-900 placeholder-slate-400 focus:border-teal-700 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-teal-400 dark:focus:bg-slate-900"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Character categories">
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
              className={`touch-target rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus sm:text-sm ${
                category === cat.key
                  ? 'bg-teal-700 text-white shadow-xs dark:bg-teal-600'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accessible Table Container */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-left text-sm text-slate-900 border-collapse dark:text-slate-100">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/90 text-xs font-semibold tracking-wider text-slate-600 uppercase dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
              <th scope="col" className="px-5 py-3.5">
                Character
              </th>
              <th scope="col" className="px-5 py-3.5">
                Morse Sequence
              </th>
              <th scope="col" className="px-5 py-3.5">
                Standard Description
              </th>
              <th scope="col" className="px-5 py-3.5 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr
                  key={item.character}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  {/* Character */}
                  <td className="px-5 py-3.5 font-bold text-base text-slate-900 dark:text-slate-100">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-slate-50 font-mono shadow-2xs dark:border-slate-700 dark:bg-slate-800">
                      {item.character}
                    </span>
                  </td>

                  {/* Morse Sequence */}
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-base font-bold tracking-widest text-teal-800 dark:text-teal-300">
                      {item.morse}
                    </span>
                  </td>

                  {/* Description */}
                  <td className="px-5 py-3.5 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
                    {item.label}
                  </td>

                  {/* Copy Action */}
                  <td className="px-5 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => handleCopyMorse(item)}
                      className="touch-target inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-focus"
                      title={`Copy Morse code for ${item.character}`}
                    >
                      {copiedChar === item.character ? (
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                          Copied!
                        </span>
                      ) : (
                        <span>Copy</span>
                      )}
                    </button>
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

      {/* Standards & Conventions Note */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 text-xs text-slate-600 leading-relaxed dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <h4 className="font-bold text-slate-900 text-sm dark:text-slate-100">International Morse Standard Note</h4>
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
