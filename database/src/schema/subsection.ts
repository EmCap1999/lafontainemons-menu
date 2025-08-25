import * as drizzle from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { section } from './section'

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
  createdAt: drizzle.timestamp('created_at').defaultNow(),
  updatedAt: drizzle.timestamp('updated_at').defaultNow(),
})

export type SubsectionInsert = typeof subsection.$inferInsert
export type SubsectionSelect = typeof subsection.$inferSelect

export const SubsectionInsertZod = createInsertSchema(subsection)
export const SubsectionSelectZod = createSelectSchema(subsection)
export const SubsectionUpdateZod = SubsectionInsertZod.partial()
