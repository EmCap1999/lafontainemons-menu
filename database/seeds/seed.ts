import { getDb } from '../src/db'
import {
  type ItemInsert,
  type SectionSelect,
  type SubsectionSelect,
  item,
  section,
  subsection,
} from '../src/schema'
import { itemsData } from './data/items.js'
import { sectionsData } from './data/sections.js'
import { subsectionsData } from './data/subsections.js'
import type { ItemDataInput, SubsectionDataInput } from './types.js'

async function clearDatabase() {
  console.log('Clearing existing data...')
  const db = await getDb()

  await db.delete(item)
  await db.delete(subsection)
  await db.delete(section)

  console.log('Database cleared')
}

async function seedSections(): Promise<SectionSelect[]> {
  console.log('Seeding sections...')
  const db = await getDb()

  const insertedSections = await db.insert(section).values(sectionsData).returning()

  console.log(`Inserted ${insertedSections.length} sections`)
  return insertedSections
}

async function seedSubsections(insertedSections: SectionSelect[]): Promise<SubsectionSelect[]> {
  console.log('Seeding subsections...')
  const db = await getDb()

  const sectionNameToId: Record<string, number> = {}
  for (const s of insertedSections) {
    sectionNameToId[s.name] = s.sectionId
  }

  const subsectionsWithIds = (subsectionsData as SubsectionDataInput[]).map((sub) => ({
    name: sub.name,
    displayOrder: sub.displayOrder,
    sectionId: sectionNameToId[sub.sectionName],
  }))

  const insertedSubsections = await db.insert(subsection).values(subsectionsWithIds).returning()

  console.log(`Inserted ${insertedSubsections.length} subsections`)
  return insertedSubsections
}

async function seedItems(
  insertedSections: SectionSelect[],
  insertedSubsections: SubsectionSelect[]
) {
  console.log('Seeding items...')
  const db = await getDb()

  const sectionNameToId: Record<string, number> = {}
  for (const s of insertedSections) {
    sectionNameToId[s.name] = s.sectionId
  }

  const subsectionNameToId: Record<string, number> = {}
  for (const s of insertedSubsections) {
    subsectionNameToId[s.name] = s.subsectionId
  }

  const itemsWithIds: ItemInsert[] = (itemsData as ItemDataInput[]).map((itemData) => ({
    name: itemData.name,
    description: itemData.description || null,
    origin: itemData.origin || null,
    capacity: itemData.capacity || null,
    unit: itemData.unit || null,
    price: itemData.price.toString(), // Convertir number en string pour numeric
    isAvailable: true,
    picture: null,
    displayOrder: itemData.displayOrder,
    sectionId: sectionNameToId[itemData.sectionName],
    subsectionId: itemData.subsectionName ? subsectionNameToId[itemData.subsectionName] : null,
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
