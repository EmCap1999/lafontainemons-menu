import { asc, eq, getTableColumns } from 'drizzle-orm'
import type { DrizzleDatabase } from '../../db.js'
import * as schema from '../schema'

export async function selectAll(db: DrizzleDatabase) {
  return db
    .select()
    .from(schema.subsection)
    .orderBy(asc(schema.subsection.displayOrder))
}

export async function selectById(
  db: DrizzleDatabase,
  subsectionId: number
): Promise<schema.SubsectionSelect | undefined> {
  const result = await db
    .select(getTableColumns(schema.subsection))
    .from(schema.subsection)
    .where(eq(schema.subsection.subsectionId, subsectionId))
    .limit(1)
  return result.pop()
}

export async function selectBySection(db: DrizzleDatabase, sectionId: number) {
  return db
    .select()
    .from(schema.subsection)
    .where(eq(schema.subsection.sectionId, sectionId))
    .orderBy(asc(schema.subsection.displayOrder))
}

export async function selectWithSection(
  db: DrizzleDatabase,
  subsectionId: number
) {
  return db.query.subsection.findFirst({
    where: eq(schema.subsection.subsectionId, subsectionId),
    with: {
      section: true,
    },
  })
}

export async function selectWithItems(db: DrizzleDatabase) {
  return db.query.subsection.findMany({
    with: {
      items: {
        orderBy: [asc(schema.item.displayOrder)],
      },
    },
    orderBy: [asc(schema.subsection.displayOrder)],
  })
}

export async function selectBySectionWithItems(
  db: DrizzleDatabase,
  sectionId: number
) {
  return db.query.subsection.findMany({
    where: eq(schema.subsection.sectionId, sectionId),
    with: {
      items: {
        orderBy: [asc(schema.item.displayOrder)],
      },
    },
    orderBy: [asc(schema.subsection.displayOrder)],
  })
}

export async function insert(
  db: DrizzleDatabase,
  subsection: schema.SubsectionInsert
) {
  return db.insert(schema.subsection).values(subsection).returning()
}

export async function update(
  db: DrizzleDatabase,
  subsectionId: number,
  subsection: Partial<Omit<schema.SubsectionInsert, 'subsectionId'>>
) {
  return db
    .update(schema.subsection)
    .set({
      ...subsection,
      updatedAt: new Date(),
    })
    .where(eq(schema.subsection.subsectionId, subsectionId))
    .returning()
}

export async function remove(db: DrizzleDatabase, subsectionId: number) {
  return db
    .delete(schema.subsection)
    .where(eq(schema.subsection.subsectionId, subsectionId))
    .returning()
}

export async function countBySection(
  db: DrizzleDatabase,
  sectionId: number
): Promise<number> {
  const result = await db
    .select({ count: schema.subsection.subsectionId })
    .from(schema.subsection)
    .where(eq(schema.subsection.sectionId, sectionId))
  return result.length
}
