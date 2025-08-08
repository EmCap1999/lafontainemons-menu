import { asc, eq, getTableColumns } from 'drizzle-orm';
import * as schema from '@lafontaine/database/src/schema';
export * as sectionCommand from './section';
export async function selectAll(db) {
    return db
        .select()
        .from(schema.section)
        .orderBy(asc(schema.section.displayOrder));
}
export async function selectById(db, sectionId) {
    const result = await db
        .select(getTableColumns(schema.section))
        .from(schema.section)
        .where(eq(schema.section.sectionId, sectionId))
        .limit(1);
    return result.pop();
}
export async function selectByName(db, name) {
    const result = await db
        .select(getTableColumns(schema.section))
        .from(schema.section)
        .where(eq(schema.section.name, name))
        .limit(1);
    return result.pop();
}
export async function selectWithSubsections(db) {
    return db.query.section.findMany({
        with: {
            subsections: {
                orderBy: [asc(schema.subsection.displayOrder)],
            },
        },
        orderBy: [asc(schema.section.displayOrder)],
    });
}
export async function selectWithItems(db) {
    return db.query.section.findMany({
        with: {
            items: {
                orderBy: [asc(schema.item.displayOrder)],
            },
        },
        orderBy: [asc(schema.section.displayOrder)],
    });
}
export async function insert(db, section) {
    return db.insert(schema.section).values(section).returning();
}
export async function update(db, sectionId, section) {
    return db
        .update(schema.section)
        .set({
        ...section,
        updatedAt: new Date(),
    })
        .where(eq(schema.section.sectionId, sectionId))
        .returning();
}
export async function remove(db, sectionId) {
    return db
        .delete(schema.section)
        .where(eq(schema.section.sectionId, sectionId))
        .returning();
}
export async function count(db) {
    const result = await db
        .select({ count: schema.section.sectionId })
        .from(schema.section);
    return result.length;
}
//# sourceMappingURL=section.js.map