import { createSection } from '../../commands/index.js'
import { SectionSchema } from '../../validation/index.js'
import { sectionsData } from '../data/sections.data.js'
import { logWithTime } from '../utils/seeder.utils.js'

export const runSectionSeeding = async () => {
  logWithTime('Seeding sections...')

  const seededSections = []

  for (const sectionData of sectionsData) {
    try {
      const validatedData = SectionSchema.omit({
        sectionId: true,
        createdAt: true,
        updatedAt: true,
      }).parse(sectionData)

      const [section] = await createSection(validatedData)
      seededSections.push(section)

      console.log(`Section: ${section.name}`)
    } catch (error) {
      console.error(`Failed to seed section: ${sectionData.name}`, error)
      throw error
    }
  }

  logWithTime(`Seeded ${seededSections.length} sections`)
  return seededSections
}
