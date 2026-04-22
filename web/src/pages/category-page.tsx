import { Navigate, useParams } from 'react-router-dom'
import { MenuCategoryView } from '../components/menu/menu-category-view'
import { ROUTES } from '../constants/routes'
import { MENU_DATA, MENU_ORDER } from '../data/menu'
import type { MenuCategoryKey } from '../types/menu'

function isMenuCategoryKey(value: string | undefined): value is MenuCategoryKey {
  if (!value) return false
  return (MENU_ORDER as readonly string[]).includes(value)
}

export function CategoryPage() {
  const { categoryKey } = useParams()

  if (!isMenuCategoryKey(categoryKey)) {
    return <Navigate to={ROUTES.all} replace />
  }

  return <MenuCategoryView category={MENU_DATA[categoryKey]} />
}

