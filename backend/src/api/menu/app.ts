import { getDb } from '@/database/db'
import { AppError } from '@/middleware/error-handler.ts'
import { Hono } from 'hono'
import { itemCommand, sectionCommand, subsectionCommand } from '../../../../database/src/commands'

export const menuApp = new Hono()

// GET /sections - Toutes les sections
menuApp.get('/sections', async (c) => {
  const db = await getDb()
  const sections = await sectionCommand.getAllSections(db)
  return c.json({
    status: 'success',
    results: sections.length,
    data: { sections },
  })
})

// GET /sections/:id - Section par ID
menuApp.get('/sections/:id', async (c) => {
  const id = Number.parseInt(c.req.param('id'))
  const db = await getDb()
  const section = await sectionCommand.getSectionById(db, id)

  if (!section) {
    throw new AppError(`Section ID ${id} does not exist.`)
  }

  return c.json({
    status: 'success',
    data: { section },
  })
})

// GET /subsections - Toutes les sous-sections
menuApp.get('/subsections', async (c) => {
  const db = await getDb()
  const subsections = await subsectionCommand.getAllSubsections(db)
  return c.json({
    status: 'success',
    results: subsections.length,
    data: { subsections },
  })
})

// GET /sections/:sectionId/subsections - Sous-sections par section
menuApp.get('/sections/:sectionId/subsections', async (c) => {
  const sectionId = Number.parseInt(c.req.param('sectionId'))
  const db = await getDb()
  const subsections = await subsectionCommand.getSubsectionsBySection(db, sectionId)

  if (subsections.length === 0) {
    throw new AppError(`No subsections found for section ID ${sectionId}`)
  }

  return c.json({
    status: 'success',
    results: subsections.length,
    data: { subsections },
  })
})

// GET /items - Tous les items
menuApp.get('/items', async (c) => {
  const db = await getDb()
  const items = await itemCommand.getAllItems(db)
  return c.json({
    status: 'success',
    results: items.length,
    data: { items },
  })
})

// GET /sections/:sectionId/items - Items par section
menuApp.get('/sections/:sectionId/items', async (c) => {
  const sectionId = Number.parseInt(c.req.param('sectionId'))
  const db = await getDb()
  const items = await itemCommand.getItemsBySection(db, sectionId)

  if (items.length === 0) {
    throw new AppError(`No items found with section ID ${sectionId}`)
  }

  return c.json({
    status: 'success',
    results: items.length,
    data: { items },
  })
})

// GET /subsections/:subsectionId/items - Items par sous-section
menuApp.get('/subsections/:subsectionId/items', async (c) => {
  const subsectionId = Number.parseInt(c.req.param('subsectionId'))
  const db = await getDb()
  const items = await itemCommand.getItemsBySubsection(db, subsectionId)

  if (items.length === 0) {
    throw new AppError(`No items found with subsection ID ${subsectionId}`)
  }

  return c.json({
    status: 'success',
    results: items.length,
    data: { items },
  })
})
