import { relations } from 'drizzle-orm'
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const section = pgTable('section', {
  sectionId: integer('section_id').primaryKey().notNull(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const sectionRelations = relations(section, ({ many }) => ({
  subsections: many('subsection'),
  items: many('item'),
}))
