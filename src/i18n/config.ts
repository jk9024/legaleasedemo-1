/**
 * Internationalization configuration for LegalEase.
 * Supports English, Hindi, and Telugu per AGENTS.md.
 */

export const locales = ['en', 'hi', 'te'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिंदी (Hindi)',
  te: 'తెలుగు (Telugu)'
}
