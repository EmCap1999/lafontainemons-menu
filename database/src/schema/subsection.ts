import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { section } from './section'

export const subsection = pgTable('subsection', {
  subsectionId: serial('subsection_id').primaryKey(),
  sectionId: integer('section_id')
    .notNull()
    .references(() => section.sectionId, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type SubsectionInsert = typeof subsection.$inferInsert
export type SubsectionSelect = typeof subsection.$inferSelect

export const SubsectionInsertSchema = createInsertSchema(subsection)
export const SubsectionSelectSchema = createSelectSchema(subsection)
