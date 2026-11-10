/**
 * Design Tokens for Morse Code Translator & Learning Platform
 *
 * All color tokens are vetted against WCAG 2.2 AA contrast standards (minimum 4.5:1 for normal text).
 */

export const COLOR_TOKENS = {
  light: {
    primary: '#0F766E', // Teal-700: ~5.5:1 contrast against white
    primaryHover: '#115E59', // Teal-800
    accent: '#D97706', // Amber-600: used with dark text or as secondary accent
    accentHover: '#B45309', // Amber-700
    background: '#F8FAFC', // Slate-50: clean neutral background
    surface: '#FFFFFF', // Pure White: cards, inputs
    textPrimary: '#0F172A', // Slate-900: ~17.9:1 contrast against white
    textMuted: '#475569', // Slate-600: ~7.6:1 contrast against white
    border: '#CBD5E1', // Slate-300: visible boundary definition
    error: '#B91C1C', // Red-700: ~6.0:1 contrast against white
    focusRing: '#0F766E', // Visible focus indicator
  },
  dark: {
    primary: '#2DD4BF', // Teal-400: high contrast against slate-900/navy
    primaryHover: '#5EEAD4', // Teal-300
    accent: '#FBBF24', // Amber-400: paired with dark text or dark surface
    accentHover: '#F59E0B', // Amber-500
    background: '#0B1220', // Deep Navy: calm, dark backdrop
    surface: '#111827', // Slate-900: elevated surface
    textPrimary: '#F1F5F9', // Slate-100: ~16:1 contrast against navy
    textMuted: '#94A3B8', // Slate-400: ~8.0:1 contrast against navy
    border: '#334155', // Slate-700: clear border definition
    error: '#FCA5A5', // Red-300: high contrast alert text in dark mode
    focusRing: '#2DD4BF', // High visibility focus ring in dark mode
  },
} as const;

export const TYPOGRAPHY = {
  fontSans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontMono: '"JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  scale: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px (minimum recommended body text)
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },
} as const;

export const ACCESSIBILITY = {
  minTouchTarget: '44px',
  focusRingWidth: '2px',
  focusRingOffset: '2px',
  targetContrastRatioNormal: 4.5,
  targetContrastRatioLarge: 3.0,
} as const;

export const SPACING = {
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  12: '3rem', // 48px
  16: '4rem', // 64px
} as const;

