/**
 * Central Site Configuration for Technical & On-Page SEO
 *
 * Adheres to PRD Section 17, FR-020, FR-021.
 * No fabricated keyword volumes or artificial ranking claims.
 */

export const SITE_CONFIG = {
  name: 'Morse Code Platform',
  shortName: 'MorseCode',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://morsecodetranslator.org',
  locale: 'en_US',
  defaultTitle: 'Morse Code Translator, Audio Player & Learning Platform',
  titleTemplate: '%s | Morse Code Platform',
  defaultDescription:
    'Free, private International Morse Code translator with audio tone playback, visual signals, alphabet reference chart, and interactive beginner lessons.',
  standard: 'Recommendation ITU-R M.1677-1',
  author: 'Morse Code Platform Team',
};

/**
 * Generates an absolute canonical URL from a relative pathname
 */
export function getAbsoluteUrl(path: string = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.url}${cleanPath}`;
}

