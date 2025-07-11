import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const section = pgTable('section', {
  sectionId: serial('section_id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type SectionInsert = typeof section.$inferInsert
export type SectionSelect = typeof section.$inferSelect

export const SectionInsertSchema = createInsertSchema(section)
export const SectionSelectSchema = createSelectSchema(section)
