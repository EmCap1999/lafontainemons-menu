import { db } from '../connection/index.js'
import { item, section, subsection } from '../schema/index.js'
import { itemsData } from './data/items.js'
import { sectionsData } from './data/sections.js'
import { subsectionsData } from './data/subsections.js'

async function clearDatabase() {
  console.log('Clearing existing data...')

  await db.delete(item)
  await db.delete(subsection)
  await db.delete(section)

  console.log('Database cleared')
}

async function seedSections() {
  console.log('Seeding sections...')

  const insertedSections = await db
    .insert(section)
    .values(sectionsData)
    .returning()

  console.log(`Inserted ${insertedSections.length} sections`)
  return insertedSections
}

async function seedSubsections(insertedSections) {
  console.log('Seeding subsections...')

  const sectionNameToId = {}
  for (const s of insertedSections) {
    sectionNameToId[s.name] = s.sectionId
  }

  const subsectionsWithIds = subsectionsData.map((sub) => ({
    ...sub,
    sectionId: sectionNameToId[sub.sectionName],
  }))

  const insertedSubsections = await db
    .insert(subsection)
    .values(subsectionsWithIds)
    .returning()

  console.log(`Inserted ${insertedSubsections.length} subsections`)
  return insertedSubsections
}

async function seedItems(insertedSections, insertedSubsections) {
  console.log('Seeding items...')

  const sectionNameToId = {}
  for (const s of insertedSections) {
    sectionNameToId[s.name] = s.sectionId
  }

  const subsectionNameToId = {}
  for (const s of insertedSubsections) {
    subsectionNameToId[s.name] = s.subsectionId
  }

  const itemsWithIds = itemsData.map((item) => ({
    ...item,
    sectionId: sectionNameToId[item.sectionName],
    subsectionId: item.subsectionName
      ? subsectionNameToId[item.subsectionName]
      : null,
  }))

  const batchSize = 50
  for (let i = 0; i < itemsWithIds.length; i += batchSize) {
    const batch = itemsWithIds.slice(i, i + batchSize)
    await db.insert(item).values(batch)
    console.log(
      `Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(itemsWithIds.length / batchSize)}`
    )
  }

  console.log(`Inserted ${itemsWithIds.length} items`)
}

async function main() {
  try {
    console.log('Starting database seeding...')

    await clearDatabase()
    const insertedSections = await seedSections()
    const insertedSubsections = await seedSubsections(insertedSections)
    await seedItems(insertedSections, insertedSubsections)

    console.log('Database seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error during seeding:', error)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}
