import { relations } from 'drizzle-orm'
import { item } from './item.schema.js'
import { section } from './section.schema.js'
import { subsection } from './subsection.schema.js'

export { section, subsection, item }

export const sectionRelations = relations(section, ({ many }) => ({
  subsections: many(subsection),
  items: many(item),
}))

export const subsectionRelations = relations(subsection, ({ one, many }) => ({
  section: one(section, {
    fields: [subsection.sectionId],
    references: [section.sectionId],
  }),
  items: many(item),
}))

export const itemRelations = relations(item, ({ one }) => ({
  section: one(section, {
    fields: [item.sectionId],
    references: [section.sectionId],
  }),
  subsection: one(subsection, {
    fields: [item.subsectionId],
    references: [subsection.subsectionId],
  }),
}))
