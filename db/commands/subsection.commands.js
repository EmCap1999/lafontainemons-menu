import { and, asc, eq } from 'drizzle-orm'
import { db } from '../config/database.config.js'
import { subsection } from '../schema/index.js'

export const getAllSubsections = async () => {
  try {
    return await db
      .select()
      .from(subsection)
      .orderBy(asc(subsection.displayOrder), asc(subsection.name))
  } catch (error) {
    throw new Error(`Failed to get all subsections: ${error.message}`)
  }
}

export const getSubsectionById = async (subsectionId) => {
  try {
    return await db
      .select()
      .from(subsection)
      .where(eq(subsection.subsectionId, subsectionId))
  } catch (error) {
    throw new Error(
      `Failed to get subsection by ID ${subsectionId}: ${error.message}`,
    )
  }
}

export const getSubsectionsBySection = async (sectionId) => {
  try {
    return await db
      .select()
      .from(subsection)
      .where(eq(subsection.sectionId, sectionId))
      .orderBy(asc(subsection.displayOrder), asc(subsection.name))
  } catch (error) {
    throw new Error(
      `Failed to get subsections for section ${sectionId}: ${error.message}`,
    )
  }
}

export const getSubsectionByNameAndSection = async (name, sectionId) => {
  try {
    return await db
      .select()
      .from(subsection)
      .where(
        and(eq(subsection.name, name), eq(subsection.sectionId, sectionId)),
      )
  } catch (error) {
    throw new Error(
      `Failed to get subsection by name ${name} in section ${sectionId}: ${error.message}`,
    )
  }
}

export const createSubsection = async (subsectionData) => {
  try {
    return await db
      .insert(subsection)
      .values({
        ...subsectionData,
        updatedAt: new Date(),
      })
      .returning()
  } catch (error) {
    throw new Error(`Failed to create subsection: ${error.message}`)
  }
}

export const updateSubsection = async (subsectionId, updateData) => {
  try {
    return await db
      .update(subsection)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(subsection.subsectionId, subsectionId))
      .returning()
  } catch (error) {
    throw new Error(
      `Failed to update subsection ${subsectionId}: ${error.message}`,
    )
  }
}

export const deleteSubsection = async (subsectionId) => {
  try {
    return await db
      .delete(subsection)
      .where(eq(subsection.subsectionId, subsectionId))
      .returning()
  } catch (error) {
    throw new Error(
      `Failed to delete subsection ${subsectionId}: ${error.message}`,
    )
  }
}
