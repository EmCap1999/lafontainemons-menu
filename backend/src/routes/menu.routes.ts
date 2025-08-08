import { Router } from 'express'
import * as menuController from '../controllers/menu.controller.js'

const router = Router()

// Routes utilisées par le frontend
router.get('/sections', menuController.getAllSections)
router.get('/sections/:sectionId/items', menuController.getItemsBySection)

export default router