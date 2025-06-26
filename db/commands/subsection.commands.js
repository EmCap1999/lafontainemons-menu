import { asc, eq } from 'drizzle-orm'
import { db } from '../connection/index.js'
import { subsection } from '../schema/index.js'
import { SubsectionSchema } from '../validation/index.js'

export const getAllSubsections = async () => {
  const result = await db
    .select()
    .from(subsection)
    .orderBy(asc(subsection.displayOrder))

  return Array.isArray(result)
    ? result.map((item) => SubsectionSchema.parse(item))
    : []
}

export const getSubsectionsBySection = async (sectionId) => {
  const result = await db
    .select()
    .from(subsection)
    .where(eq(subsection.sectionId, sectionId))
    .orderBy(asc(subsection.displayOrder))

  return Array.isArray(result)
    ? result.map((item) => SubsectionSchema.parse(item))
    : []
}

export const getSubsectionById = async (id) => {
  const result = await db
    .select()
    .from(subsection)
    .where(eq(subsection.subsectionId, id))

  return Array.isArray(result)
    ? result.map((item) => SubsectionSchema.parse(item))
    : []
}

export const createSubsection = async (subsectionData) => {
  const validatedData = SubsectionSchema.parse(subsectionData)

  const result = await db.insert(subsection).values(validatedData).returning()

  return result[0] ? SubsectionSchema.parse(result[0]) : null
}

export const updateSubsection = async (id, subsectionData) => {
  const validatedData = SubsectionSchema.partial().parse(subsectionData)
  validatedData.updatedAt = new Date()

  const result = await db
    .update(subsection)
    .set(validatedData)
    .where(eq(subsection.subsectionId, id))
    .returning()

  return result[0] ? SubsectionSchema.parse(result[0]) : null
}

export const deleteSubsection = async (id) => {
  const result = await db
    .delete(subsection)
    .where(eq(subsection.subsectionId, id))
    .returning()

  return result[0] ? SubsectionSchema.parse(result[0]) : null
}
