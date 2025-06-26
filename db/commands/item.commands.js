import { asc, eq } from 'drizzle-orm'
import { db } from '../connection/index.js'
import { item } from '../schema/index.js'
import { ItemSchema } from '../validation/index.js'

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

export const getItemById = async (id) => {
  const result = await db.select().from(item).where(eq(item.itemId, id))

  return Array.isArray(result) && result.length > 0
    ? ItemSchema.parse(result[0])
    : null
}

export const createItem = async (itemData) => {
  const validatedData = ItemSchema.parse(itemData)

  const result = await db.insert(item).values(validatedData).returning()

  return result[0] ? ItemSchema.parse(result[0]) : null
}

export const updateItem = async (id, itemData) => {
  const validatedData = ItemSchema.partial().parse(itemData)
  validatedData.updatedAt = new Date()

  const result = await db
    .update(item)
    .set(validatedData)
    .where(eq(item.itemId, id))
    .returning()

  return result[0] ? ItemSchema.parse(result[0]) : null
}

export const deleteItem = async (id) => {
  const result = await db.delete(item).where(eq(item.itemId, id)).returning()

  return result[0] ? ItemSchema.parse(result[0]) : null
}

export const updateItemAvailability = async (id, isAvailable) => {
  const result = await db
    .update(item)
    .set({
      isAvailable,
      updatedAt: new Date(),
    })
    .where(eq(item.itemId, id))
    .returning()

  return result[0] ? ItemSchema.parse(result[0]) : null
}
