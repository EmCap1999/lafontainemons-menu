import { asc, eq } from 'drizzle-orm'
import type { DrizzleDatabase } from '../db'
import { type SubsectionInsert, type SubsectionSelect, subsection } from '../schema'

export * as subsectionCommand from './subsection.js'

export async function getAllSubsections(db: DrizzleDatabase): Promise<SubsectionSelect[]> {
  return db.select().from(subsection).orderBy(asc(subsection.displayOrder))
}

export async function getSubsectionsBySection(
  db: DrizzleDatabase,
  sectionId: number
): Promise<SubsectionSelect[]> {
  return db
    .select()
    .from(subsection)
    .where(eq(subsection.sectionId, sectionId))
    .orderBy(asc(subsection.displayOrder))
}

export async function getSubsectionById(
  db: DrizzleDatabase,
  id: number
): Promise<SubsectionSelect | null> {
  const result = await db.select().from(subsection).where(eq(subsection.subsectionId, id))
  return result[0] || null
}

export async function createSubsection(
  db: DrizzleDatabase,
  subsectionData: SubsectionInsert
): Promise<SubsectionSelect> {
  const result = await db.insert(subsection).values(subsectionData).returning()
  if (result.length === 0) {
    throw new Error('Failed to create subsection: no data returned')
  }
  return result[0]
}

export async function updateSubsection(
  db: DrizzleDatabase,
  id: number,
  subsectionData: Partial<SubsectionInsert>
): Promise<SubsectionSelect | null> {
  const updatedData = { ...subsectionData, updatedAt: new Date() }
  const result = await db
    .update(subsection)
    .set(updatedData)
    .where(eq(subsection.subsectionId, id))
    .returning()
  return result[0] || null
}

export async function deleteSubsection(
  db: DrizzleDatabase,
  id: number
): Promise<SubsectionSelect | null> {
  const result = await db.delete(subsection).where(eq(subsection.subsectionId, id)).returning()
  return result[0] || null
}
