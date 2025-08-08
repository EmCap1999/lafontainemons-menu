import type { DrizzleDatabase } from '@lafontaine/database/db'
import * as schema from '@lafontaine/database/src/schema'
import { and, asc, eq, getTableColumns, isNull } from 'drizzle-orm'

export * as itemCommand from './item'

export async function selectAll(db: DrizzleDatabase) {
  return db.select().from(schema.item).orderBy(asc(schema.item.displayOrder))
}

export async function selectById(
  db: DrizzleDatabase,
  itemId: number
): Promise<schema.ItemSelect | undefined> {
  const result = await db
    .select(getTableColumns(schema.item))
    .from(schema.item)
    .where(eq(schema.item.itemId, itemId))
    .limit(1)
  return result.pop()
}

export async function selectBySection(db: DrizzleDatabase, sectionId: number) {
  return db
    .select()
    .from(schema.item)
    .where(eq(schema.item.sectionId, sectionId))
    .orderBy(asc(schema.item.displayOrder))
}

export async function selectBySubsection(
  db: DrizzleDatabase,
  subsectionId: number
) {
  return db
    .select()
    .from(schema.item)
    .where(eq(schema.item.subsectionId, subsectionId))
    .orderBy(asc(schema.item.displayOrder))
}

export async function selectBySectionWithoutSubsection(
  db: DrizzleDatabase,
  sectionId: number
) {
  return db
    .select()
    .from(schema.item)
    .where(
      and(
        eq(schema.item.sectionId, sectionId),
        isNull(schema.item.subsectionId)
      )
    )
    .orderBy(asc(schema.item.displayOrder))
}

export async function selectWithRelations(db: DrizzleDatabase, itemId: number) {
  return db.query.item.findFirst({
    where: eq(schema.item.itemId, itemId),
    with: {
      section: true,
      subsection: true,
    },
  })
}

export async function selectAvailable(db: DrizzleDatabase) {
  return db
    .select()
    .from(schema.item)
    .where(eq(schema.item.isAvailable, true))
    .orderBy(asc(schema.item.displayOrder))
}

export async function selectAvailableBySection(
  db: DrizzleDatabase,
  sectionId: number
) {
  return db
    .select()
    .from(schema.item)
    .where(
      and(
        eq(schema.item.sectionId, sectionId),
        eq(schema.item.isAvailable, true)
      )
    )
    .orderBy(asc(schema.item.displayOrder))
}

export async function insert(db: DrizzleDatabase, item: schema.ItemInsert) {
  return db.insert(schema.item).values(item).returning()
}

export async function update(
  db: DrizzleDatabase,
  itemId: number,
  item: Partial<Omit<schema.ItemInsert, 'itemId'>>
) {
  return db
    .update(schema.item)
    .set({
      ...item,
      updatedAt: new Date(),
    })
    .where(eq(schema.item.itemId, itemId))
    .returning()
}

export async function updateAvailability(
  db: DrizzleDatabase,
  itemId: number,
  isAvailable: boolean
) {
  return db
    .update(schema.item)
    .set({
      isAvailable,
      updatedAt: new Date(),
    })
    .where(eq(schema.item.itemId, itemId))
    .returning()
}

export async function remove(db: DrizzleDatabase, itemId: number) {
  return db
    .delete(schema.item)
    .where(eq(schema.item.itemId, itemId))
    .returning()
}

export async function countBySection(
  db: DrizzleDatabase,
  sectionId: number
): Promise<number> {
  const result = await db
    .select({ count: schema.item.itemId })
    .from(schema.item)
    .where(eq(schema.item.sectionId, sectionId))
  return result.length
}

export async function countAvailable(db: DrizzleDatabase): Promise<number> {
  const result = await db
    .select({ count: schema.item.itemId })
    .from(schema.item)
    .where(eq(schema.item.isAvailable, true))
  return result.length
}
