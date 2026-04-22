import { useMemo, useState } from 'react'
import type { MenuCategory } from '../../types/menu'
import { useI18n } from '../../i18n/i18n-context'
import { t } from '../../i18n/localized'
import { MenuItemCard } from './menu-item-card'
import { MenuItemModal } from './menu-item-modal'

type Props = {
  category: MenuCategory
  showHeading?: boolean
}

export function MenuCategoryView({ category, showHeading = true }: Props) {
  const { language } = useI18n()
  const [activeItemId, setActiveItemId] = useState<string | null>(null)

  const activeItem = useMemo(() => {
    if (!activeItemId) return null
    for (const section of category.sections) {
      const found = section.items.find((item) => item.id === activeItemId)
      if (found) return found
    }
    return null
  }, [activeItemId, category.sections])

  return (
    <section>
      {showHeading ? (
        <div className="flex flex-col items-center text-center">
          <div className="text-sm font-medium tracking-[0.32em] text-[rgb(var(--zi-muted))] uppercase">
            {t(category.heading, language)}
          </div>
          <div className="mt-5 h-px w-full bg-[rgb(var(--zi-line))]" />
        </div>
      ) : null}

      <div className={showHeading ? 'mt-10 space-y-10 md:space-y-12' : 'space-y-10 md:space-y-12'}>
        {category.sections.map((section) => (
          <section key={section.id} className="scroll-mt-24">
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm font-medium tracking-[0.28em] text-[rgb(var(--zi-muted))] uppercase">
                {t(section.title, language)}
              </div>
              <div className="h-px flex-1 bg-[rgb(var(--zi-line))]" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {section.items.map((item) => (
                <MenuItemCard key={item.id} item={item} onOpen={() => setActiveItemId(item.id)} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {activeItem ? <MenuItemModal item={activeItem} onClose={() => setActiveItemId(null)} /> : null}
    </section>
  )
}

