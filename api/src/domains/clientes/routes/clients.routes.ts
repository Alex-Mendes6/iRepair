import { Router } from "express";
import { ClientsController } from "../controllers/ClientsController";

const clienteRoutes = Router();
const controller = new ClientsController();

clienteRoutes.post('/', controller.create);
clienteRoutes.get('/', controller.getAll)

export { clienteRoutes };