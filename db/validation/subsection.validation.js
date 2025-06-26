import { z } from 'zod'

export const SubsectionSchema = z.object({
  subsectionId: z.number().int().positive(),
  sectionId: z.number().int().positive(),
  name: z.string().min(1).max(100),
  displayOrder: z.number().int().default(0),
  createdAt: z.date().optional().or(z.string()),
  updatedAt: z.date().optional().or(z.string()),
})

export const CreateSubsectionSchema = SubsectionSchema.omit({
  subsectionId: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateSubsectionSchema = SubsectionSchema.partial().omit({
  subsectionId: true,
  createdAt: true,
})
