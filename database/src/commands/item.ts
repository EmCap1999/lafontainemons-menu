import { asc, eq } from 'drizzle-orm'
import type { DrizzleDatabase } from '../db'
import { type ItemInsert, type ItemSelect, item } from '../schema'

export * as itemCommand from './item.js'

export async function getAllItems(db: DrizzleDatabase): Promise<ItemSelect[]> {
  return db.select().from(item).orderBy(asc(item.displayOrder))
}

export async function getItemsBySection(
  db: DrizzleDatabase,
  sectionId: number
): Promise<ItemSelect[]> {
  return db.select().from(item).where(eq(item.sectionId, sectionId)).orderBy(asc(item.displayOrder))
}

export async function getItemsBySubsection(
  db: DrizzleDatabase,
  subsectionId: number
): Promise<ItemSelect[]> {
  return db
    .select()
    .from(item)
    .where(eq(item.subsectionId, subsectionId))
    .orderBy(asc(item.displayOrder))
}

export async function getItemById(db: DrizzleDatabase, id: number): Promise<ItemSelect | null> {
  const result = await db.select().from(item).where(eq(item.itemId, id))
  return result[0] || null
}

export async function createItem(db: DrizzleDatabase, itemData: ItemInsert): Promise<ItemSelect> {
  const result = await db.insert(item).values(itemData).returning()
  if (result.length === 0) {
    throw new Error('Failed to create item: no data returned')
  }
  return result[0]
}

export async function updateItem(
  db: DrizzleDatabase,
  id: number,
  itemData: Partial<ItemInsert>
): Promise<ItemSelect | null> {
  const updatedData = { ...itemData, updatedAt: new Date() }
  const result = await db.update(item).set(updatedData).where(eq(item.itemId, id)).returning()
  return result[0] || null
}

export async function deleteItem(db: DrizzleDatabase, id: number): Promise<ItemSelect | null> {
  const result = await db.delete(item).where(eq(item.itemId, id)).returning()
  return result[0] || null
}

export async function updateItemAvailability(
  db: DrizzleDatabase,
  id: number,
  isAvailable: boolean
): Promise<ItemSelect | null> {
  const result = await db
    .update(item)
    .set({ isAvailable, updatedAt: new Date() })
    .where(eq(item.itemId, id))
    .returning()
  return result[0] || null
}
