import { Router } from "express";
import { ClientsController } from "../controllers/ClientsController";

const clienteRoutes = Router();
const controller = new ClientsController();

clienteRoutes.post('/', controller.create);
clienteRoutes.get('/', controller.getAll);
clienteRoutes.get('/:id', controller.findById);
clienteRoutes.put('/:id', controller.update);
clienteRoutes.delete('/:id', controller.delete);

export { clienteRoutes };