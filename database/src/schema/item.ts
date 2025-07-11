import {
  boolean,
  integer,
  numeric,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { section } from './section'
import { subsection } from './subsection'

export const item = pgTable('item', {
  itemId: serial('item_id').primaryKey(),
  sectionId: integer('section_id')
    .notNull()
    .references(() => section.sectionId, { onDelete: 'cascade' }),
  subsectionId: integer('subsection_id').references(() => subsection.subsectionId, {
    onDelete: 'set null',
  }),
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

export type ItemInsert = typeof item.$inferInsert
export type ItemSelect = typeof item.$inferSelect

export const ItemInsertSchema = createInsertSchema(item)
export const ItemSelectSchema = createSelectSchema(item)
