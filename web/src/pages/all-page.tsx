import { MENU_DATA } from '../data/menu'
import { MENU_ORDER } from '../data/menu'
import { MenuCategoryView } from '../components/menu/menu-category-view'

export function AllPage() {
  return (
    <div className="space-y-12 md:space-y-14">
      {MENU_ORDER.map((key) => (
        <MenuCategoryView key={key} category={MENU_DATA[key]} />
      ))}
    </div>
  )
}

