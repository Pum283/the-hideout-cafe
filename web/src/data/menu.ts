import type { MenuCategory, MenuCategoryKey } from '../types/menu'

export const MENU_ORDER: MenuCategoryKey[] = [
  'healthy-salad',
  'sandwich',
  'all-day-breakfast',
  'the-hideout-cafe',
]

export const MENU_CATEGORIES: Record<MenuCategoryKey, Pick<MenuCategory, 'key' | 'label'>> = {
  'healthy-salad': { key: 'healthy-salad', label: { vi: 'Healthy Salad', en: 'Healthy Salad' } },
  sandwich: { key: 'sandwich', label: { vi: 'Sandwich', en: 'Sandwich' } },
  'all-day-breakfast': { key: 'all-day-breakfast', label: { vi: 'All day breakfast', en: 'All day breakfast' } },
  'the-hideout-cafe': { key: 'the-hideout-cafe', label: { vi: 'The Hideout Café', en: 'The Hideout Cafe' } },
} as const

export const MENU_DATA: Record<MenuCategoryKey, MenuCategory> = {
  'healthy-salad': {
    key: 'healthy-salad',
    label: MENU_CATEGORIES['healthy-salad'].label,
    heading: { vi: 'HEALTHY SALAD', en: 'HEALTHY SALAD' },
    sections: [
      {
        id: 'healthy-salad',
        title: { vi: 'Healthy Salad', en: 'Healthy Salad' },
        items: [],
      },
    ],
  },
  sandwich: {
    key: 'sandwich',
    label: MENU_CATEGORIES.sandwich.label,
    heading: { vi: 'SANDWICH', en: 'SANDWICH' },
    sections: [
      {
        id: 'sandwich',
        title: { vi: 'Sandwich', en: 'Sandwich' },
        items: [],
      },
    ],
  },
  'all-day-breakfast': {
    key: 'all-day-breakfast',
    label: MENU_CATEGORIES['all-day-breakfast'].label,
    heading: { vi: 'ALL DAY BREAKFAST', en: 'ALL DAY BREAKFAST' },
    sections: [
      {
        id: 'all-day-breakfast',
        title: { vi: 'All day breakfast', en: 'All day breakfast' },
        items: [],
      },
    ],
  },
  'the-hideout-cafe': {
    key: 'the-hideout-cafe',
    label: MENU_CATEGORIES['the-hideout-cafe'].label,
    heading: { vi: 'THE HIDEOUT CAFE', en: 'THE HIDEOUT CAFE' },
    sections: [
      {
        id: 'the-hideout-cafe',
        title: { vi: 'The Hideout Café', en: 'The Hideout Cafe' },
        items: [],
      },
    ],
  },
} as const

