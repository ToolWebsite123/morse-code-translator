/**
 * Core Type Definitions for Morse Code Translator & Learning Platform
 */

export type ThemeMode = 'light' | 'dark' | 'system';

export type TranslationDirection = 'text-to-morse' | 'morse-to-text';

export interface AudioSettings {
  wpm: number; // 5 to 30 WPM, default 15
  frequencyHz: number; // 400 to 800 Hz, default 600
}

export type WarningType = 'unsupported-character' | 'invalid-morse-group' | 'formatting';

export interface TranslationWarning {
  id: string;
  type: WarningType;
  message: string;
  character?: string;
  position?: number;
  rawToken?: string;
}

export interface TranslationResult {
  output: string;
  warnings: TranslationWarning[];
  hasWarnings: boolean;
}

export interface MorseReferenceItem {
  character: string;
  morse: string;
  category: 'letter' | 'number' | 'punctuation' | 'prosign';
  label: string;
}

export * from './learning';


