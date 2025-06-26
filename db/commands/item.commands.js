import { and, asc, eq, isNull } from 'drizzle-orm'
import { db } from '../config/database.config.js'
import { item } from '../schema/index.js'

export const getAllItems = async () => {
  try {
    return await db
      .select()
      .from(item)
      .orderBy(asc(item.displayOrder), asc(item.name))
  } catch (error) {
    throw new Error(`Failed to get all items: ${error.message}`)
  }
}

export const getItemById = async (itemId) => {
  try {
    return await db.select().from(item).where(eq(item.itemId, itemId))
  } catch (error) {
    throw new Error(`Failed to get item by ID ${itemId}: ${error.message}`)
  }
}

export const getItemsBySection = async (sectionId) => {
  try {
    return await db
      .select()
      .from(item)
      .where(eq(item.sectionId, sectionId))
      .orderBy(asc(item.displayOrder), asc(item.name))
  } catch (error) {
    throw new Error(
      `Failed to get items for section ${sectionId}: ${error.message}`,
    )
  }
}

export const getItemsBySubsection = async (subsectionId) => {
  try {
    return await db
      .select()
      .from(item)
      .where(eq(item.subsectionId, subsectionId))
      .orderBy(asc(item.displayOrder), asc(item.name))
  } catch (error) {
    throw new Error(
      `Failed to get items for subsection ${subsectionId}: ${error.message}`,
    )
  }
}

export const getItemsBySectionWithoutSubsection = async (sectionId) => {
  try {
    return await db
      .select()
      .from(item)
      .where(and(eq(item.sectionId, sectionId), isNull(item.subsectionId)))
      .orderBy(asc(item.displayOrder), asc(item.name))
  } catch (error) {
    throw new Error(
      `Failed to get items for section ${sectionId} without subsection: ${error.message}`,
    )
  }
}

export const getAvailableItems = async () => {
  try {
    return await db
      .select()
      .from(item)
      .where(eq(item.isAvailable, true))
      .orderBy(asc(item.displayOrder), asc(item.name))
  } catch (error) {
    throw new Error(`Failed to get available items: ${error.message}`)
  }
}

export const getItemsByName = async (name) => {
  try {
    return await db
      .select()
      .from(item)
      .where(eq(item.name, name))
      .orderBy(asc(item.displayOrder))
  } catch (error) {
    throw new Error(`Failed to get items by name ${name}: ${error.message}`)
  }
}

export const createItem = async (itemData) => {
  try {
    return await db
      .insert(item)
      .values({
        ...itemData,
        updatedAt: new Date(),
      })
      .returning()
  } catch (error) {
    throw new Error(`Failed to create item: ${error.message}`)
  }
}

export const updateItem = async (itemId, updateData) => {
  try {
    return await db
      .update(item)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(item.itemId, itemId))
      .returning()
  } catch (error) {
    throw new Error(`Failed to update item ${itemId}: ${error.message}`)
  }
}

export const updateItemAvailability = async (itemId, isAvailable) => {
  try {
    return await db
      .update(item)
      .set({
        isAvailable,
        updatedAt: new Date(),
      })
      .where(eq(item.itemId, itemId))
      .returning()
  } catch (error) {
    throw new Error(
      `Failed to update item availability ${itemId}: ${error.message}`,
    )
  }
}

export const deleteItem = async (itemId) => {
  try {
    return await db.delete(item).where(eq(item.itemId, itemId)).returning()
  } catch (error) {
    throw new Error(`Failed to delete item ${itemId}: ${error.message}`)
  }
}
