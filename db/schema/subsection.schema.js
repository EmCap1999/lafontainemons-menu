import { relations } from 'drizzle-orm'
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { section } from './section.schema.js'

export const subsection = pgTable('subsection', {
  subsectionId: integer('subsection_id').primaryKey().notNull(),
  sectionId: integer('section_id')
    .notNull()
    .references(() => section.sectionId, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const subsectionRelations = relations(subsection, ({ one, many }) => ({
  section: one(section, {
    fields: [subsection.sectionId],
    references: [section.sectionId],
  }),
  items: many('item'),
}))
