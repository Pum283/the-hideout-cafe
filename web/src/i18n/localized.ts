import type { Language, LocalizedString } from '../types/i18n'

export function t(value: LocalizedString, language: Language) {
  // Normalize Unicode (NFC) to avoid “lệch dấu” Vietnamese text when data is pasted in decomposed form.
  return value[language].normalize('NFC')
}

