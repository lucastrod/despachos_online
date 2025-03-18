import { Router } from "express";

export const courierRouter = Router();

courierRouter.post("/");

courierRouter.get("/");

courierRouter.get("/:id");

courierRouter.put("/:id");

courierRouter.delete("/:id");
