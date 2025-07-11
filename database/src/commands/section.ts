import { asc, eq } from 'drizzle-orm'
import type { DrizzleDatabase } from '../db'
import { type SectionInsert, type SectionSelect, section } from '../schema'

export * as sectionCommand from './section.js'

export async function getAllSections(db: DrizzleDatabase): Promise<SectionSelect[]> {
  return await db.select().from(section).orderBy(asc(section.displayOrder))
}

export async function getSectionById(
  db: DrizzleDatabase,
  id: number
): Promise<SectionSelect | null> {
  const result = await db.select().from(section).where(eq(section.sectionId, id))
  return result[0] || null
}

export async function createSection(
  db: DrizzleDatabase,
  sectionData: SectionInsert
): Promise<SectionSelect> {
  const result = await db.insert(section).values(sectionData).returning()
  if (result.length === 0) {
    throw new Error('Failed to create section: no data returned')
  }
  return result[0]
}

export async function updateSection(
  db: DrizzleDatabase,
  id: number,
  sectionData: Partial<SectionInsert>
): Promise<SectionSelect | null> {
  const updatedData = { ...sectionData, updatedAt: new Date() }
  const result = await db
    .update(section)
    .set(updatedData)
    .where(eq(section.sectionId, id))
    .returning()
  return result[0] || null
}

export async function deleteSection(
  db: DrizzleDatabase,
  id: number
): Promise<SectionSelect | null> {
  const result = await db.delete(section).where(eq(section.sectionId, id)).returning()
  return result[0] || null
}
