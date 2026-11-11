/**
 * Central Site Configuration for Technical & On-Page SEO
 *
 * Adheres to PRD Section 17, FR-020, FR-021.
 * Deployed on Cloudflare Pages.
 * Production Domain: https://morsecodetranslatores.com (Apex Canonical)
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://morsecodetranslatores.com';
const normalizedSiteUrl = rawSiteUrl.replace(/\/+$/, '');

export const SITE_CONFIG = {
  name: 'Morse Code Platform',
  shortName: 'MorseCode',
  url: normalizedSiteUrl,
  domain: 'morsecodetranslatores.com',
  apexDomain: 'morsecodetranslatores.com',
  canonicalHost: 'https://morsecodetranslatores.com',
  email: 'morecodetranslator@gmail.com',
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
  if (path === '/' || path === '') {
    return `${SITE_CONFIG.url}/`;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.url}${cleanPath}`;
}

