import { z } from 'zod'

export const SectionSchema = z.object({
  sectionId: z.number().int().positive(),
  name: z.string().min(1).max(100),
  displayOrder: z.number().int().default(0),
  createdAt: z.union([z.date(), z.string()]).optional(),
  updatedAt: z.union([z.date(), z.string()]).optional(),
})

export const SubsectionSchema = z.object({
  subsectionId: z.number().int().positive(),
  sectionId: z.number().int().positive(),
  name: z.string().min(1).max(100),
  displayOrder: z.number().int().default(0),
  createdAt: z.union([z.date(), z.string()]).optional(),
  updatedAt: z.union([z.date(), z.string()]).optional(),
})

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
  createdAt: z.union([z.date(), z.string()]).optional(),
  updatedAt: z.union([z.date(), z.string()]).optional(),
})

export type Section = z.infer<typeof SectionSchema>
export type Subsection = z.infer<typeof SubsectionSchema>
export type Item = z.infer<typeof ItemSchema>
