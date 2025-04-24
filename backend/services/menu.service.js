import { asc, eq } from 'drizzle-orm'
import { item, section, subsection } from '../drizzle/src/db/schema.js'
import { db } from '../drizzle/src/index.js'

export const getAllSections = async () => {
  return db.select().from(section).orderBy(asc(section.displayOrder))
}

export const getSectionById = async (id) => {
  const result = await db
    .select()
    .from(section)
    .where(eq(section.sectionId, id))
  return result.length > 0 ? result[0] : null
}

export const getAllSubsections = async () => {
  return db.select().from(subsection).orderBy(asc(subsection.displayOrder))
}

export const getSubsectionsBySection = async (sectionId) => {
  return db
    .select()
    .from(subsection)
    .where(eq(subsection.sectionId, sectionId))
    .orderBy(asc(subsection.displayOrder))
}

export const getAllItems = async () => {
  return db.select().from(item).orderBy(asc(item.displayOrder))
}

export const getItemsBySection = async (sectionId) => {
  return db
    .select()
    .from(item)
    .where(eq(item.sectionId, sectionId))
    .orderBy(asc(item.displayOrder))
}

export const getItemsBySubsection = async (subsectionId) => {
  return db
    .select()
    .from(item)
    .where(eq(item.subsectionId, subsectionId))
    .orderBy(asc(item.displayOrder))
}
