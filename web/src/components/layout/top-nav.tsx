import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { UI_TEXT } from '../../constants/ui-text'
import { t } from '../../i18n/localized'
import { useI18n } from '../../i18n/i18n-context'
import { MENU_CATEGORIES, MENU_ORDER } from '../../data/menu'

const linkBase =
  'inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm transition-colors'

function getLinkClassName(isActive: boolean) {
  if (isActive) {
    return `${linkBase} border-transparent bg-[rgb(var(--zi-text))] text-white`
  }

  return `${linkBase} border-[rgb(var(--zi-line))] bg-[rgb(var(--zi-surface))] text-[rgb(var(--zi-text))] hover:bg-white`
}

export function TopNav() {
  const { language } = useI18n()
  return (
    <nav className="mt-7 flex flex-wrap items-center justify-center gap-2 md:gap-3">
      <NavLink to={ROUTES.all} className={({ isActive }) => getLinkClassName(isActive)}>
        {t(UI_TEXT.all, language)}
      </NavLink>
      {MENU_ORDER.map((key) => (
        <NavLink key={key} to={`/c/${key}`} className={({ isActive }) => getLinkClassName(isActive)}>
          {t(MENU_CATEGORIES[key].label, language)}
        </NavLink>
      ))}
    </nav>
  )
}

