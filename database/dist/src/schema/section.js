import * as drizzle from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
export const section = drizzle.pgTable('section', {
    sectionId: drizzle.serial('section_id').primaryKey(),
    name: drizzle.text('name').notNull().unique(),
    displayOrder: drizzle.integer('display_order').notNull().default(0),
    createdAt: drizzle.timestamp('created_at').defaultNow(),
    updatedAt: drizzle.timestamp('updated_at').defaultNow(),
});
export const SectionInsertZod = createInsertSchema(section);
export const SectionSelectZod = createSelectSchema(section);
export const SectionUpdateZod = SectionInsertZod.partial();
//# sourceMappingURL=section.js.map