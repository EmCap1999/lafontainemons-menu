import { asc, eq, getTableColumns } from 'drizzle-orm';
import * as schema from '@lafontaine/database/src/schema';
export * as subsectionCommand from './subsection';
export async function selectAll(db) {
    return db
        .select()
        .from(schema.subsection)
        .orderBy(asc(schema.subsection.displayOrder));
}
export async function selectById(db, subsectionId) {
    const result = await db
        .select(getTableColumns(schema.subsection))
        .from(schema.subsection)
        .where(eq(schema.subsection.subsectionId, subsectionId))
        .limit(1);
    return result.pop();
}
export async function selectBySection(db, sectionId) {
    return db
        .select()
        .from(schema.subsection)
        .where(eq(schema.subsection.sectionId, sectionId))
        .orderBy(asc(schema.subsection.displayOrder));
}
export async function selectWithSection(db, subsectionId) {
    return db.query.subsection.findFirst({
        where: eq(schema.subsection.subsectionId, subsectionId),
        with: {
            section: true,
        },
    });
}
export async function selectWithItems(db) {
    return db.query.subsection.findMany({
        with: {
            items: {
                orderBy: [asc(schema.item.displayOrder)],
            },
        },
        orderBy: [asc(schema.subsection.displayOrder)],
    });
}
export async function selectBySectionWithItems(db, sectionId) {
    return db.query.subsection.findMany({
        where: eq(schema.subsection.sectionId, sectionId),
        with: {
            items: {
                orderBy: [asc(schema.item.displayOrder)],
            },
        },
        orderBy: [asc(schema.subsection.displayOrder)],
    });
}
export async function insert(db, subsection) {
    return db.insert(schema.subsection).values(subsection).returning();
}
export async function update(db, subsectionId, subsection) {
    return db
        .update(schema.subsection)
        .set({
        ...subsection,
        updatedAt: new Date(),
    })
        .where(eq(schema.subsection.subsectionId, subsectionId))
        .returning();
}
export async function remove(db, subsectionId) {
    return db
        .delete(schema.subsection)
        .where(eq(schema.subsection.subsectionId, subsectionId))
        .returning();
}
export async function countBySection(db, sectionId) {
    const result = await db
        .select({ count: schema.subsection.subsectionId })
        .from(schema.subsection)
        .where(eq(schema.subsection.sectionId, sectionId));
    return result.length;
}
//# sourceMappingURL=subsection.js.map