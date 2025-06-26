import { asc, eq } from 'drizzle-orm'
import { db } from '../config/database.config.js'
import { section } from '../schema/index.js'

export const getAllSections = async () => {
  try {
    return await db
      .select()
      .from(section)
      .orderBy(asc(section.displayOrder), asc(section.name))
  } catch (error) {
    throw new Error(`Failed to get all sections: ${error.message}`)
  }
}

export const getSectionById = async (sectionId) => {
  try {
    return await db
      .select()
      .from(section)
      .where(eq(section.sectionId, sectionId))
  } catch (error) {
    throw new Error(
      `Failed to get section by ID ${sectionId}: ${error.message}`,
    )
  }
}

export const getSectionByName = async (name) => {
  try {
    return await db.select().from(section).where(eq(section.name, name))
  } catch (error) {
    throw new Error(`Failed to get section by name ${name}: ${error.message}`)
  }
}

export const createSection = async (sectionData) => {
  try {
    return await db
      .insert(section)
      .values({
        ...sectionData,
        updatedAt: new Date(),
      })
      .returning()
  } catch (error) {
    throw new Error(`Failed to create section: ${error.message}`)
  }
}

export const updateSection = async (sectionId, updateData) => {
  try {
    return await db
      .update(section)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(section.sectionId, sectionId))
      .returning()
  } catch (error) {
    throw new Error(`Failed to update section ${sectionId}: ${error.message}`)
  }
}

export const deleteSection = async (sectionId) => {
  try {
    return await db
      .delete(section)
      .where(eq(section.sectionId, sectionId))
      .returning()
  } catch (error) {
    throw new Error(`Failed to delete section ${sectionId}: ${error.message}`)
  }
}
