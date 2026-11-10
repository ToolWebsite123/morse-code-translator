/**
 * Input Normalization Module for International Morse Code
 *
 * Handles Unicode NFC normalization, whitespace handling, and dash variants.
 */

/**
 * Normalizes user text input:
 * 1. Converts to Unicode NFC form.
 * 2. Normalizes non-breaking spaces, tabs, and newlines into standard spaces.
 */
export function normalizeTextInput(input: string): string {
  if (!input) return '';
  return input
    .normalize('NFC')
    .replace(/[\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/g, ' ') // Unicode spaces
    .replace(/[\r\n\t]+/g, ' '); // Linebreaks and tabs become spaces
}

/**
 * Normalizes Morse code input:
 * 1. Maps Unicode dashes (en-dash, em-dash, minus, horizontal bar) to standard ASCII '-'
 * 2. Maps Unicode bullets/dots (•, ․, ●) to standard ASCII '.'
 * 3. Normalizes Unicode slashes (／, ⁄) to standard ASCII '/'
 * 4. Normalizes whitespace (tabs, newlines, multiple spaces)
 */
export function normalizeMorseInput(input: string): string {
  if (!input) return '';
  return input
    .normalize('NFC')
    .replace(/[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/g, '-') // Dash variants -> '-'
    .replace(/[\u2022\u2024\u25CF\u2219\u00B7]/g, '.') // Bullet/dot variants -> '.'
    .replace(/[\u2044\u2215\uFF0F]/g, '/') // Slash variants -> '/'
    .replace(/[\r\n\t]+/g, ' '); // Newlines/tabs -> spaces
}

