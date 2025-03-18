import { Router } from "express";
import { ViewsController } from "../controllers/views.controller.js";

export const viewsRouter = Router();

viewsRouter.get("/dashboard", ViewsController.renderDashboard);

viewsRouter.get("/form", ViewsController.renderForm);
