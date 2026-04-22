import type { MenuCategory } from '../../types/menu'
import { MENU_DATA } from '../../data/menu'
import { MenuCategoryView } from './menu-category-view'

type Props = {
  categoryKey: MenuCategory['key']
}

export function MenuPage({ categoryKey }: Props) {
  const category = MENU_DATA[categoryKey]

  return <MenuCategoryView category={category} />
}

