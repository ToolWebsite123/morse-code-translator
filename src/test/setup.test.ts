import { describe, it, expect } from 'vitest';
import { COLOR_TOKENS, TYPOGRAPHY, ACCESSIBILITY } from '../styles/tokens';

describe('Phase 1 & 2 Setup & Design Token Tests', () => {
  it('should define all required light theme color tokens', () => {
    expect(COLOR_TOKENS.light.primary).toBe('#0F766E');
    expect(COLOR_TOKENS.light.accent).toBe('#D97706');
    expect(COLOR_TOKENS.light.background).toBe('#F8FAFC');
    expect(COLOR_TOKENS.light.surface).toBe('#FFFFFF');
    expect(COLOR_TOKENS.light.textPrimary).toBe('#0F172A');
    expect(COLOR_TOKENS.light.textMuted).toBe('#475569');
    expect(COLOR_TOKENS.light.border).toBe('#CBD5E1');
    expect(COLOR_TOKENS.light.error).toBe('#B91C1C');
  });

  it('should define all required dark theme color tokens', () => {
    expect(COLOR_TOKENS.dark.primary).toBe('#2DD4BF');
    expect(COLOR_TOKENS.dark.accent).toBe('#FBBF24');
    expect(COLOR_TOKENS.dark.background).toBe('#0B1220');
    expect(COLOR_TOKENS.dark.surface).toBe('#111827');
    expect(COLOR_TOKENS.dark.textPrimary).toBe('#F1F5F9');
    expect(COLOR_TOKENS.dark.textMuted).toBe('#94A3B8');
    expect(COLOR_TOKENS.dark.border).toBe('#334155');
    expect(COLOR_TOKENS.dark.error).toBe('#FCA5A5');
  });

  it('should specify standard 44px minimum touch target for accessibility', () => {
    expect(ACCESSIBILITY.minTouchTarget).toBe('44px');
  });

  it('should define monospace font stack for Morse code rendering', () => {
    expect(TYPOGRAPHY.fontMono).toContain('JetBrains Mono');
  });
});

