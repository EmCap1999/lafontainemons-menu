import { ItemSelectZod, SectionSelectZod } from '@lafontaine/database'

export const PublicSectionSchema = SectionSelectZod.pick({
  sectionId: true,
  name: true,
  displayOrder: true,
})

export const PublicItemSchema = ItemSelectZod.pick({
  name: true,
  price: true,
  description: true,
  origin: true,
  capacity: true,
  unit: true,
  isAvailable: true,
  displayOrder: true,
})

export type PublicSection = typeof PublicSectionSchema._type
export type PublicItem = typeof PublicItemSchema._type
