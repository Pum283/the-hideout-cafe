import { UI_TEXT } from '../../constants/ui-text'
import { t } from '../../i18n/localized'
import { useI18n } from '../../i18n/i18n-context'

export function LanguageSwitch() {
  const { language, setLanguage } = useI18n()

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className={
          language === 'vi'
            ? 'rounded-full bg-[rgb(var(--zi-text))] px-3 py-2 text-xs font-medium tracking-[0.18em] text-white'
            : 'rounded-full border border-[rgb(var(--zi-line))] bg-white px-3 py-2 text-xs font-medium tracking-[0.18em] text-[rgb(var(--zi-text))] hover:bg-[rgb(var(--zi-surface))]'
        }
        onClick={() => setLanguage('vi')}
        aria-label={t(UI_TEXT.languageVi, language)}
      >
        {t(UI_TEXT.languageVi, language)}
      </button>
      <button
        type="button"
        className={
          language === 'en'
            ? 'rounded-full bg-[rgb(var(--zi-text))] px-3 py-2 text-xs font-medium tracking-[0.18em] text-white'
            : 'rounded-full border border-[rgb(var(--zi-line))] bg-white px-3 py-2 text-xs font-medium tracking-[0.18em] text-[rgb(var(--zi-text))] hover:bg-[rgb(var(--zi-surface))]'
        }
        onClick={() => setLanguage('en')}
        aria-label={t(UI_TEXT.languageEn, language)}
      >
        {t(UI_TEXT.languageEn, language)}
      </button>
    </div>
  )
}

