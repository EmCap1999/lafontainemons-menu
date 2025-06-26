import { createSubsection } from '../../commands/index.js'
import { getSectionByName } from '../../commands/index.js'
import { SubsectionSchema } from '../../validation/index.js'
import { subsectionsData } from '../data/subsections.data.js'
import { logWithTime } from '../utils/seeder.utils.js'

export const runSubsectionSeeding = async () => {
  logWithTime('Seeding subsections...')

  const seededSubsections = []

  for (const subsectionData of subsectionsData) {
    try {
      const [parentSection] = await getSectionByName(subsectionData.sectionName)
      if (!parentSection) {
        throw new Error(
          `Parent section '${subsectionData.sectionName}' not found`,
        )
      }

      const dataToInsert = {
        sectionId: parentSection.sectionId,
        name: subsectionData.name,
        displayOrder: subsectionData.displayOrder,
      }

      const validatedData = SubsectionSchema.omit({
        subsectionId: true,
        createdAt: true,
        updatedAt: true,
      }).parse(dataToInsert)

      const [subsection] = await createSubsection(validatedData)
      seededSubsections.push(subsection)

      console.log(`  ✅ Subsection: ${subsection.name} (${parentSection.name})`)
    } catch (error) {
      console.error(
        `  ❌ Failed to seed subsection: ${subsectionData.name}`,
        error,
      )
      throw error
    }
  }

  logWithTime(`✅ Seeded ${seededSubsections.length} subsections`)
  return seededSubsections
}
