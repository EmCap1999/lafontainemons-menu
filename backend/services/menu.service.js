import { asc, eq } from 'drizzle-orm'
import { db } from '../../db/connection/index.js'
import { item, section, subsection } from '../../db/schema/index.js'
import {
  ItemSchema,
  SectionSchema,
  SubsectionSchema,
} from '../../db/validation/index.js'

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

export const getAllItems = async () => {
  const result = await db.select().from(item).orderBy(asc(item.displayOrder))
  return Array.isArray(result)
    ? result.map((item) => ItemSchema.parse(item))
    : []
}

export const getItemsBySection = async (sectionId) => {
  const result = await db
    .select()
    .from(item)
    .where(eq(item.sectionId, sectionId))
    .orderBy(asc(item.displayOrder))

  return result.map((row) => ItemSchema.parse(row))
}

export const getItemsBySubsection = async (subsectionId) => {
  const result = await db
    .select()
    .from(item)
    .where(eq(item.subsectionId, subsectionId))
    .orderBy(asc(item.displayOrder))

  return result.map((row) => ItemSchema.parse(row))
}
