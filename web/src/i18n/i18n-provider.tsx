import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import type { Language } from '../types/i18n'
import { I18nContext } from './i18n-context'
import { STORAGE_KEYS } from '../constants/storage'

type Props = {
  children: ReactNode
}

function getInitialLanguage(): Language {
  const saved = localStorage.getItem(STORAGE_KEYS.language)
  if (saved === 'vi' || saved === 'en') return saved
  return 'vi'
}

export function I18nProvider({ children }: Props) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'vi'
    return getInitialLanguage()
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.language, language)
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(() => ({ language, setLanguage }), [language])

  return <I18nContext value={value}>{children}</I18nContext>
}

