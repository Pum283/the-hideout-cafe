import { BRAND } from '../../constants/brand'
import { useI18n } from '../../i18n/i18n-context'
import { t } from '../../i18n/localized'

export function BrandHeader() {
  const { language } = useI18n()
  return (
    <header className="flex flex-col items-center text-center">
      <div className="w-full overflow-hidden rounded-(--zi-radius) border border-[rgb(var(--zi-line))] bg-[rgb(var(--zi-surface))]">
        <div className="relative aspect-16/6 w-full bg-[url('/hero.png')] bg-cover bg-center">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18),rgba(0,0,0,0.55))]" />

          <div className="relative flex h-full flex-col items-center justify-end px-5 pb-6 md:px-8 md:pb-8">
            <div className="zi-serif text-balance text-2xl tracking-tight text-white md:text-3xl">
              {t(BRAND.name, language)}
            </div>
            <div className="mt-1 text-xs font-semibold tracking-[0.22em] text-white/90 uppercase md:text-sm">
              {t(BRAND.tagline, language)}
            </div>
          </div>
        </div>

        <div className="px-5 pb-5 pt-5 md:px-8 md:pb-6">
          <p className="mx-auto max-w-2xl text-pretty text-sm leading-6 text-[rgb(var(--zi-muted))]">
            {t(BRAND.note, language)}
          </p>
        </div>
      </div>

      <div className="mt-6 h-px w-full bg-[rgb(var(--zi-line))]" />
    </header>
  )
}

