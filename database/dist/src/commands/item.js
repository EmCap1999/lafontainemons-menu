import { and, asc, eq, getTableColumns, isNull } from 'drizzle-orm';
import * as schema from '@lafontaine/database/src/schema';
export * as itemCommand from './item';
export async function selectAll(db) {
    return db.select().from(schema.item).orderBy(asc(schema.item.displayOrder));
}
export async function selectById(db, itemId) {
    const result = await db
        .select(getTableColumns(schema.item))
        .from(schema.item)
        .where(eq(schema.item.itemId, itemId))
        .limit(1);
    return result.pop();
}
export async function selectBySection(db, sectionId) {
    return db
        .select()
        .from(schema.item)
        .where(eq(schema.item.sectionId, sectionId))
        .orderBy(asc(schema.item.displayOrder));
}
export async function selectBySubsection(db, subsectionId) {
    return db
        .select()
        .from(schema.item)
        .where(eq(schema.item.subsectionId, subsectionId))
        .orderBy(asc(schema.item.displayOrder));
}
export async function selectBySectionWithoutSubsection(db, sectionId) {
    return db
        .select()
        .from(schema.item)
        .where(and(eq(schema.item.sectionId, sectionId), isNull(schema.item.subsectionId)))
        .orderBy(asc(schema.item.displayOrder));
}
export async function selectWithRelations(db, itemId) {
    return db.query.item.findFirst({
        where: eq(schema.item.itemId, itemId),
        with: {
            section: true,
            subsection: true,
        },
    });
}
export async function selectAvailable(db) {
    return db
        .select()
        .from(schema.item)
        .where(eq(schema.item.isAvailable, true))
        .orderBy(asc(schema.item.displayOrder));
}
export async function selectAvailableBySection(db, sectionId) {
    return db
        .select()
        .from(schema.item)
        .where(and(eq(schema.item.sectionId, sectionId), eq(schema.item.isAvailable, true)))
        .orderBy(asc(schema.item.displayOrder));
}
export async function insert(db, item) {
    return db.insert(schema.item).values(item).returning();
}
export async function update(db, itemId, item) {
    return db
        .update(schema.item)
        .set({
        ...item,
        updatedAt: new Date(),
    })
        .where(eq(schema.item.itemId, itemId))
        .returning();
}
export async function updateAvailability(db, itemId, isAvailable) {
    return db
        .update(schema.item)
        .set({
        isAvailable,
        updatedAt: new Date(),
    })
        .where(eq(schema.item.itemId, itemId))
        .returning();
}
export async function remove(db, itemId) {
    return db
        .delete(schema.item)
        .where(eq(schema.item.itemId, itemId))
        .returning();
}
export async function countBySection(db, sectionId) {
    const result = await db
        .select({ count: schema.item.itemId })
        .from(schema.item)
        .where(eq(schema.item.sectionId, sectionId));
    return result.length;
}
export async function countAvailable(db) {
    const result = await db
        .select({ count: schema.item.itemId })
        .from(schema.item)
        .where(eq(schema.item.isAvailable, true));
    return result.length;
}
//# sourceMappingURL=item.js.map