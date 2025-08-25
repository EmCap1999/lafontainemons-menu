import { asc, eq, getTableColumns } from 'drizzle-orm'
import type { DrizzleDatabase } from '../../db.js'
import * as schema from '../schema'

export async function selectAll(db: DrizzleDatabase) {
  return db
    .select()
    .from(schema.section)
    .orderBy(asc(schema.section.displayOrder))
}

export async function selectById(
  db: DrizzleDatabase,
  sectionId: number
): Promise<schema.SectionSelect | undefined> {
  const result = await db
    .select(getTableColumns(schema.section))
    .from(schema.section)
    .where(eq(schema.section.sectionId, sectionId))
    .limit(1)
  return result.pop()
}

export async function selectByName(
  db: DrizzleDatabase,
  name: string
): Promise<schema.SectionSelect | undefined> {
  const result = await db
    .select(getTableColumns(schema.section))
    .from(schema.section)
    .where(eq(schema.section.name, name))
    .limit(1)
  return result.pop()
}

export async function selectWithSubsections(db: DrizzleDatabase) {
  return db.query.section.findMany({
    with: {
      subsections: {
        orderBy: [asc(schema.subsection.name)],
      },
    },
    orderBy: [asc(schema.section.displayOrder)],
  })
}

export async function selectWithItems(db: DrizzleDatabase) {
  return db.query.section.findMany({
    with: {
      items: {
        orderBy: [asc(schema.item.price), asc(schema.item.name)],
      },
    },
    orderBy: [asc(schema.section.displayOrder)],
  })
}

export async function insert(
  db: DrizzleDatabase,
  section: schema.SectionInsert
) {
  return db.insert(schema.section).values(section).returning()
}

export async function update(
  db: DrizzleDatabase,
  sectionId: number,
  section: Partial<Omit<schema.SectionInsert, 'sectionId'>>
) {
  return db
    .update(schema.section)
    .set({
      ...section,
      updatedAt: new Date(),
    })
    .where(eq(schema.section.sectionId, sectionId))
    .returning()
}

export async function remove(db: DrizzleDatabase, sectionId: number) {
  return db
    .delete(schema.section)
    .where(eq(schema.section.sectionId, sectionId))
    .returning()
}

export async function count(db: DrizzleDatabase): Promise<number> {
  const result = await db
    .select({ count: schema.section.sectionId })
    .from(schema.section)
  return result.length
}
