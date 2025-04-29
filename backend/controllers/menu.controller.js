import { AppError } from '../errors/app-errors.js'
import { handleDBError } from '../errors/db-errors.js'
import * as menuService from '../services/menu.service.js'

export const getAllSections = async (req, res, next) => {
  try {
    const sections = await menuService.getAllSections()
    res.status(200).json({
      status: 'success',
      results: sections.length,
      data: { sections },
    })
  } catch (err) {
    next(handleDBError(err))
  }
}

export const getSectionById = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id)
    const section = await menuService.getSectionById(id)

    if (!section) {
      return next(new AppError(`Section ID ${id} does not exist.`, 404))
    }

    res.status(200).json({
      status: 'success',
      data: { section },
    })
  } catch (err) {
    next(handleDBError(err))
  }
}

export const getAllSubsections = async (req, res, next) => {
  try {
    const subsections = await menuService.getAllSubsections()
    res.status(200).json({
      status: 'success',
      results: subsections.length,
      data: { subsections },
    })
  } catch (err) {
    next(handleDBError(err))
  }
}

export const getSubsectionsBySection = async (req, res, next) => {
  try {
    const sectionId = Number.parseInt(req.params.sectionId)
    const subsections = await menuService.getSubsectionsBySection(sectionId)

    if (subsections.length === 0) {
      return next(
        new AppError(
          `Sub-section with Section ID ${sectionId} does not exist.`,
          404,
        ),
      )
    }

    res.status(200).json({
      status: 'success',
      results: subsections.length,
      data: { subsections },
    })
  } catch (err) {
    next(handleDBError(err))
  }
}

export const getAllItems = async (req, res, next) => {
  try {
    const items = await menuService.getAllItems()
    res.status(200).json({
      status: 'success',
      results: items.length,
      data: { items },
    })
  } catch (err) {
    next(handleDBError(err))
  }
}

export const getItemsBySection = async (req, res, next) => {
  try {
    const sectionId = Number.parseInt(req.params.sectionId)
    const items = await menuService.getItemsBySection(sectionId)

    if (items.length === 0) {
      return next(
        new AppError(`No items founded with section ID ${sectionId}`, 404),
      )
    }

    res.status(200).json({
      status: 'success',
      results: items.length,
      data: { items },
    })
  } catch (err) {
    next(handleDBError(err))
  }
}

export const getItemsBySubsection = async (req, res, next) => {
  try {
    const subsectionId = Number.parseInt(req.params.subsectionId)
    const items = await menuService.getItemsBySubsection(subsectionId)

    if (items.length === 0) {
      return next(
        new AppError(
          `No items founded with sub-section ID ${subsectionId}`,
          404,
        ),
      )
    }

    res.status(200).json({
      status: 'success',
      results: items.length,
      data: { items },
    })
  } catch (err) {
    next(handleDBError(err))
  }
}
