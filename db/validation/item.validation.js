import { z } from 'zod'

export const ItemSchema = z.object({
  itemId: z.number().int().positive(),
  sectionId: z.number().int().positive(),
  subsectionId: z.number().int().positive().nullable().optional(),
  name: z.string().min(1).max(100),
  description: z.string().nullable().optional(),
  origin: z.string().max(100).nullable().optional(),
  capacity: z.number().nullable().optional(),
  unit: z.string().max(20).nullable().optional(),
  price: z.coerce.number().positive().multipleOf(0.01),
  isAvailable: z.boolean().default(true),
  picture: z.string().max(255).nullable().optional(),
  displayOrder: z.number().int().default(0),
  createdAt: z.date().optional().or(z.string()),
  updatedAt: z.date().optional().or(z.string()),
})

export const CreateItemSchema = ItemSchema.omit({
  itemId: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateItemSchema = ItemSchema.partial().omit({
  itemId: true,
  createdAt: true,
})
