import { db, itemCommand, sectionCommand } from '@lafontaine/database'
import type { Request, Response } from 'express'
import { AppError, asyncHandler } from '../errors/app-error.js'
import { toPublicItem, toPublicSection } from '../types'

export const getAllSections = asyncHandler(
  async (_req: Request, res: Response) => {
    const sections = await sectionCommand.selectAll(db)
    const publicSections = sections.map(toPublicSection)

    res.status(200).json({
      status: 'success',
      results: publicSections.length,
      data: { sections: publicSections },
    })
  }
)

export const getItemsBySection = asyncHandler(
  async (req: Request, res: Response) => {
    const sectionId = Number.parseInt(req.params.sectionId)

    if (Number.isNaN(sectionId)) {
      throw new AppError('Invalid section ID', 400)
    }

    const section = await sectionCommand.selectById(db, sectionId)
    if (!section) {
      throw new AppError(`Section ID ${sectionId} does not exist`, 404)
    }

    const items = await itemCommand.selectBySection(db, sectionId)
    const publicItems = items.map(toPublicItem)

    res.status(200).json({
      status: 'success',
      results: publicItems.length,
      data: { items: publicItems },
    })
  }
)
