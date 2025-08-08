import * as drizzle from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { section } from '@lafontaine/database/src/schema/section';
import { subsection } from '@lafontaine/database/src/schema/subsection';
export const item = drizzle.pgTable('item', {
    itemId: drizzle.serial('item_id').primaryKey(),
    sectionId: drizzle
        .integer('section_id')
        .notNull()
        .references(() => section.sectionId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
    }),
    subsectionId: drizzle
        .integer('subsection_id')
        .references(() => subsection.subsectionId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
    }),
    name: drizzle.text('name').notNull(),
    price: drizzle.numeric('price', { precision: 10, scale: 2 }).notNull(),
    capacity: drizzle.integer('capacity'),
    unit: drizzle.text('unit'),
    origin: drizzle.text('origin'),
    description: drizzle.text('description'),
    isAvailable: drizzle.boolean('is_available').notNull().default(true),
    displayOrder: drizzle.integer('display_order').notNull().default(0),
    createdAt: drizzle.timestamp('created_at').defaultNow(),
    updatedAt: drizzle.timestamp('updated_at').defaultNow(),
});
export const ItemInsertZod = createInsertSchema(item);
export const ItemSelectZod = createSelectSchema(item);
export const ItemUpdateZod = ItemInsertZod.partial();
//# sourceMappingURL=item.js.map