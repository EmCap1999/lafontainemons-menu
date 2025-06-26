import { asc, eq } from 'drizzle-orm'
import { db } from '../connection/index.js'
import { section } from '../schema/index.js'
import { SectionSchema } from '../validation/index.js'

export const getAllSections = async () => {
  const result = await db
    .select()
    .from(section)
    .orderBy(asc(section.displayOrder))

  return Array.isArray(result)
    ? result.map((item) => SectionSchema.parse(item))
    : []
}

export const getSectionById = async (id) => {
  const result = await db
    .select()
    .from(section)
    .where(eq(section.sectionId, id))

  return Array.isArray(result)
    ? result.map((item) => SectionSchema.parse(item))
    : []
}

export const createSection = async (sectionData) => {
  const validatedData = SectionSchema.parse(sectionData)

  const result = await db.insert(section).values(validatedData).returning()

  return result[0] ? SectionSchema.parse(result[0]) : null
}

export const updateSection = async (id, sectionData) => {
  const validatedData = SectionSchema.partial().parse(sectionData)
  validatedData.updatedAt = new Date()

  const result = await db
    .update(section)
    .set(validatedData)
    .where(eq(section.sectionId, id))
    .returning()

  return result[0] ? SectionSchema.parse(result[0]) : null
}

export const deleteSection = async (id) => {
  const result = await db
    .delete(section)
    .where(eq(section.sectionId, id))
    .returning()

  return result[0] ? SectionSchema.parse(result[0]) : null
}
