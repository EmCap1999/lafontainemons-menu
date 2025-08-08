import { section } from '@lafontaine/database/src/schema/section'
import * as drizzle from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const subsection = drizzle.pgTable('subsection', {
  subsectionId: drizzle.serial('subsection_id').primaryKey(),
  sectionId: drizzle
    .integer('section_id')
    .notNull()
    .references(() => section.sectionId, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  name: drizzle.text('name').notNull(),
  displayOrder: drizzle.integer('display_order').notNull().default(0),
  createdAt: drizzle.timestamp('created_at').defaultNow(),
  updatedAt: drizzle.timestamp('updated_at').defaultNow(),
})

export type SubsectionInsert = typeof subsection.$inferInsert
export type SubsectionSelect = typeof subsection.$inferSelect

export const SubsectionInsertZod = createInsertSchema(subsection)
export const SubsectionSelectZod = createSelectSchema(subsection)
export const SubsectionUpdateZod = SubsectionInsertZod.partial()
