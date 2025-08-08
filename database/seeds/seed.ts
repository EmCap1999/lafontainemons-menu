import { db } from '@lafontaine/database/db'
import {
  seedItems,
  seedSections,
  seedSubsections,
} from '@lafontaine/database/seeds/seeders'
import { itemCommand, sectionCommand } from '@lafontaine/database/src/commands'
import { item, section, subsection } from '@lafontaine/database/src/schema'

async function clearDatabase() {
  await db.delete(item)
  await db.delete(subsection)
  await db.delete(section)
}

async function main(): Promise<void> {
  try {
    await clearDatabase()
    const sections = await seedSections(db)
    const subsections = await seedSubsections(db, sections)
    await seedItems(db, sections, subsections)

    console.log('🎉 Seeding completed successfully!')

    const totalSections = await sectionCommand.count(db)
    const totalItems = await itemCommand.countAvailable(db)

    console.log(`   - Sections: ${totalSections}`)
    console.log(`   - Sub-sections: ${subsections.length}`)
    console.log(`   - Items: ${totalItems}`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

void main()
