import { itemsRawData } from '@lafontaine/database/seeds/data'
import { itemCommand } from '@lafontaine/database/src/commands'
import type {
  ItemInsert,
  SectionSelect,
  SubsectionSelect,
} from '@lafontaine/database/src/schema'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'

export async function seedItems(
  db: NodePgDatabase<any>,
  sections: SectionSelect[],
  subsections: SubsectionSelect[]
): Promise<void> {
  const sectionNameToId = new Map<string, number>()
  for (const section of sections) {
    sectionNameToId.set(section.name, section.sectionId)
  }

  const subsectionNameToId = new Map<string, number>()
  for (const subsection of subsections) {
    subsectionNameToId.set(subsection.name, subsection.subsectionId)
  }

  for (const rawData of itemsRawData) {
    const sectionId = sectionNameToId.get(rawData.sectionName)
    if (!sectionId) {
      throw new Error(`Section not found: ${rawData.sectionName}`)
    }

    const subsectionId = rawData.subsectionName
      ? subsectionNameToId.get(rawData.subsectionName)
      : undefined

    if (rawData.subsectionName && !subsectionId) {
      throw new Error(`Subsection not found: ${rawData.subsectionName}`)
    }

    const { sectionName, subsectionName, ...itemFields } = rawData
    const itemToInsert: ItemInsert = {
      sectionId,
      subsectionId,
      ...itemFields,
    }

    await itemCommand.insert(db, itemToInsert)
  }
}
