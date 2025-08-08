import type { Request, Response } from 'express'
import {
  itemCommands,
  sectionCommands,
  subsectionCommands,
} from '../db/commands.js'
import { AppError, asyncHandler } from '../errors/app-error.js'

export const getAllSections = asyncHandler(async (_req: Request, res: Response) => {
  const sections = await sectionCommands.getAllSections()
  res.status(200).json({
    status: 'success',
    results: sections.length,
    data: { sections },
  })
})

export const getSectionById = asyncHandler(async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id)
  const section = await sectionCommands.getSectionById(id)

  if (!section) {
    throw new AppError(`Section ID ${id} does not exist.`, 404)
  }

  res.status(200).json({
    status: 'success',
    data: { section },
  })
})

export const getAllSubsections = asyncHandler(async (_req: Request, res: Response) => {
  const subsections = await subsectionCommands.getAllSubsections()
  res.status(200).json({
    status: 'success',
    results: subsections.length,
    data: { subsections },
  })
})

export const getSubsectionsBySection = asyncHandler(async (req: Request, res: Response) => {
  const sectionId = Number.parseInt(req.params.sectionId)
  const subsections = await subsectionCommands.getSubsectionsBySection(sectionId)

  if (subsections.length === 0) {
    throw new AppError(`Sub-section with Section ID ${sectionId} does not exist.`, 404)
  }

  res.status(200).json({
    status: 'success',
    results: subsections.length,
    data: { subsections },
  })
})

export const getAllItems = asyncHandler(async (_req: Request, res: Response) => {
  const items = await itemCommands.getAllItems()
  res.status(200).json({
    status: 'success',
    results: items.length,
    data: { items },
  })
})

export const getItemsBySection = asyncHandler(async (req: Request, res: Response) => {
  const sectionId = Number.parseInt(req.params.sectionId)
  const items = await itemCommands.getItemsBySection(sectionId)

  if (items.length === 0) {
    throw new AppError(`No items found with section ID ${sectionId}`, 404)
  }

  res.status(200).json({
    status: 'success',
    results: items.length,
    data: { items },
  })
})

export const getItemsBySubsection = asyncHandler(async (req: Request, res: Response) => {
  const subsectionId = Number.parseInt(req.params.subsectionId)
  const items = await itemCommands.getItemsBySubsection(subsectionId)

  if (items.length === 0) {
    throw new AppError(`No items found with sub-section ID ${subsectionId}`, 404)
  }

  res.status(200).json({
    status: 'success',
    results: items.length,
    data: { items },
  })
})