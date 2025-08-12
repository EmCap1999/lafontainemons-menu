import type { ItemSelect, SectionSelect } from '@lafontaine/database'

const PUBLIC_SECTION_KEYS = ['sectionId', 'name', 'displayOrder'] as const
const PUBLIC_ITEM_KEYS = [
  'name',
  'price',
  'description',
  'origin',
  'capacity',
  'unit',
  'isAvailable',
  'displayOrder',
] as const

export type PublicSection = Pick<
  SectionSelect,
  (typeof PUBLIC_SECTION_KEYS)[number]
>
export type PublicItem = Pick<ItemSelect, (typeof PUBLIC_ITEM_KEYS)[number]>

const pick = <T, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>
  keys.forEach((key) => {
    result[key] = obj[key]
  })
  return result
}

export const toPublicSection = (section: SectionSelect): PublicSection =>
  pick(section, PUBLIC_SECTION_KEYS)

export const toPublicItem = (item: ItemSelect): PublicItem =>
  pick(item, PUBLIC_ITEM_KEYS)
