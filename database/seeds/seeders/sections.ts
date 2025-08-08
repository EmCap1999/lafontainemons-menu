import { sectionsData } from '@lafontaine/database/seeds/data'
import { sectionCommand } from '@lafontaine/database/src/commands'
import type { SectionSelect } from '@lafontaine/database/src/schema'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'

export async function seedSections(
  db: NodePgDatabase<any>
): Promise<SectionSelect[]> {
  const insertedSections: SectionSelect[] = []

  for (const sectionData of sectionsData) {
    const [section] = await sectionCommand.insert(db, sectionData)
    insertedSections.push(section)
  }

  return insertedSections
}
