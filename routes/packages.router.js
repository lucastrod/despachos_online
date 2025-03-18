import { Router } from "express";
import { PackagesController } from "../controllers/packages.controller.js";
import db from "./../db.js";

export const packagesRouter = Router();
const packagesController = new PackagesController(db);

// Traer todos los paquetes a despachar
packagesRouter.get('/retrieve/a-despachar', packagesController.getPackagesADespachar);

// Traer todos los paquetes despachados
packagesRouter.get('/retrieve/despachados', packagesController.getPackagesDespachados);

// Traer un paquete por id
packagesRouter.get("/retrieve/:id", packagesController.getPackageById);

// Crear un paquete
packagesRouter.post("/scan", packagesController.scanPackage);

// Actualizar un paquete
packagesRouter.put("/update/:id", packagesController.updatePackage);

// Eliminar un paquete
packagesRouter.delete("/delete/:id", packagesController.deletePackage);

// OCA

packagesRouter.post("/oca", packagesController.sendToOca);