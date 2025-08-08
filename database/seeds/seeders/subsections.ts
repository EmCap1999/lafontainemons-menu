import { subsectionsRawData } from '@lafontaine/database/seeds/data'
import { subsectionCommand } from '@lafontaine/database/src/commands'
import type {
  SectionSelect,
  SubsectionInsert,
  SubsectionSelect,
} from '@lafontaine/database/src/schema'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'

export async function seedSubsections(
  db: NodePgDatabase<any>,
  sections: SectionSelect[]
): Promise<SubsectionSelect[]> {
  const sectionNameToId = new Map<string, number>()
  for (const section of sections) {
    sectionNameToId.set(section.name, section.sectionId)
  }

  const insertedSubsections: SubsectionSelect[] = []

  for (const rawData of subsectionsRawData) {
    const sectionId = sectionNameToId.get(rawData.sectionName)
    if (!sectionId) {
      throw new Error(`Section not found: ${rawData.sectionName}`)
    }

    const subsectionToInsert: SubsectionInsert = {
      sectionId,
      name: rawData.name,
      displayOrder: rawData.displayOrder,
    }

    const [subsection] = await subsectionCommand.insert(db, subsectionToInsert)
    insertedSubsections.push(subsection)
  }

  return insertedSubsections
}
