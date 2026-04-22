import type { MenuItem } from '../../types/menu'
import { useI18n } from '../../i18n/i18n-context'
import { t } from '../../i18n/localized'
import { formatVnd } from '../../utils/money'

type Props = {
  item: MenuItem
  onOpen: () => void
}

export function MenuItemCard({ item, onOpen }: Props) {
  const { language } = useI18n()
  const name = t(item.name, language)
  const coverImageSrc = item.imageSources?.[0] ?? item.imageSrc
  const hasPrice = typeof item.priceVnd === 'number'

  return (
    <button
      type="button"
      className="group block w-full overflow-hidden rounded-(--zi-radius) border border-[rgb(var(--zi-line))] bg-white text-left shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--zi-accent))]"
      onClick={onOpen}
      aria-label={name}
    >
      <div className="overflow-hidden rounded-[calc(var(--zi-radius)-1px)] border-b border-[rgb(var(--zi-line))] bg-[rgb(var(--zi-surface))]">
        {coverImageSrc ? (
          <img
            src={coverImageSrc}
            alt={name}
            className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            loading="lazy"
          />
        ) : (
          <div className="aspect-16/10 w-full bg-[radial-gradient(700px_220px_at_20%_20%,rgba(var(--zi-accent)/0.18),transparent_55%),radial-gradient(700px_220px_at_80%_55%,rgba(var(--zi-accent)/0.10),transparent_50%)]" />
        )}
      </div>

      <div className="px-5 pb-5 pt-4 md:px-6 md:pb-6">
        <div className="zi-serif truncate text-lg tracking-tight text-[rgb(var(--zi-text))]">{name}</div>

        {hasPrice ? (
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="h-px flex-1 bg-[rgb(var(--zi-line))]" />
            <div className="shrink-0 font-medium tracking-wide text-[rgb(var(--zi-text))]">
              {formatVnd(item.priceVnd)}
            </div>
          </div>
        ) : null}
      </div>
    </button>
  )
}

