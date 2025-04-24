import express from 'express'
import * as menuController from '../controllers/menu.controller.js'

const router = express.Router()

router.get('/sections', menuController.getAllSections)
router.get('/sections/:id', menuController.getSectionById)

router.get('/subsections', menuController.getAllSubsections)
router.get(
  '/sections/:sectionId/subsections',
  menuController.getSubsectionsBySection,
)

router.get('/items', menuController.getAllItems)
router.get('/sections/:sectionId/items', menuController.getItemsBySection)
router.get(
  '/subsections/:subsectionId/items',
  menuController.getItemsBySubsection,
)

export default router
