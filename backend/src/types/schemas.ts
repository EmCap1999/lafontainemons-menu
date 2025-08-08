import {
  SectionSelectZod,
  ItemSelectZod,
} from '@lafontaine/database/src/schema'

// Schémas publics avec uniquement les champs exposés via l'API
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

// Types inférés pour TypeScript
export type PublicSection = typeof PublicSectionSchema._type
export type PublicItem = typeof PublicItemSchema._type