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
  name: 'Morse Code Translator',
  shortName: 'MorseTranslator',
  url: normalizedSiteUrl,
  domain: 'morsecodetranslatores.com',
  apexDomain: 'morsecodetranslatores.com',
  canonicalHost: 'https://morsecodetranslatores.com',
  email: 'morecodetranslator@gmail.com',
  locale: 'en_US',
  defaultTitle: 'Morse Code Translator & Decoder — Audio Tone Player',
  titleTemplate: '%s | Morse Code Translator',
  defaultDescription:
    'Translate text to Morse code and decode Morse code to text. Play audio tones with custom speed (WPM) & pitch, flash visual signals, and learn online.',
  standard: 'Recommendation ITU-R M.1677-1',
  author: 'Morse Code Translator Team',
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

