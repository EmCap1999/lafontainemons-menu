import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  numeric,
  pgTable,
  real,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const section = pgTable('section', {
  sectionId: integer('section_id').primaryKey().notNull(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

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

export const item = pgTable('item', {
  itemId: integer('item_id').primaryKey().notNull(),
  sectionId: integer('section_id')
    .notNull()
    .references(() => section.sectionId, { onDelete: 'cascade' }),
  subsectionId: integer('subsection_id').references(
    () => subsection.subsectionId,
    { onDelete: 'set null' },
  ),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  origin: varchar('origin', { length: 100 }),
  capacity: real('capacity'),
  unit: varchar('unit', { length: 20 }),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  isAvailable: boolean('is_available').default(true),
  picture: varchar('picture', { length: 255 }),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

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
