import type { LocalizedString } from './i18n'

export type MenuCategoryKey =
  | 'healthy-salad'
  | 'sandwich'
  | 'all-day-breakfast'
  | 'the-hideout-cafe'

export type MenuItem = {
  id: string
  name: LocalizedString
  description: LocalizedString
  priceVnd?: number
  imageSrc?: string
  imageSources?: string[]
}

export type MenuSection = {
  id: string
  title: LocalizedString
  items: MenuItem[]
}

export type MenuCategory = {
  key: MenuCategoryKey
  label: LocalizedString
  heading: LocalizedString
  sections: MenuSection[]
}

