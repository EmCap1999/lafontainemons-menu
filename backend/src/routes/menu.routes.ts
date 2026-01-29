import { type IRouter, Router } from "express";
import * as menuController from "../controllers/menu.controller.js";

const router: IRouter = Router();

router.get("/sections", menuController.getAllSections);
router.get("/sections/:sectionId/items", menuController.getItemsBySection);

export default router;
