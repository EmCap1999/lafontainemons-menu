import { z } from 'zod'

export const SectionSchema = z.object({
  sectionId: z.number().int().positive(),
  name: z.string().min(1).max(100),
  displayOrder: z.number().int().default(0),
  createdAt: z.date().optional().or(z.string()),
  updatedAt: z.date().optional().or(z.string()),
})

export const CreateSectionSchema = SectionSchema.omit({
  sectionId: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateSectionSchema = SectionSchema.partial().omit({
  sectionId: true,
  createdAt: true,
})
