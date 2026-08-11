import { Router } from "express";
import { authMiddleware } from "../../../middlewares/authMiddleware";
import { ClientsController } from "../controllers/ClientsController";

const clienteRoutes = Router();
const controller = new ClientsController();

clienteRoutes.use(authMiddleware);

clienteRoutes.post('/', controller.create.bind(controller));
clienteRoutes.get('/', controller.getAll.bind(controller));
clienteRoutes.get('/:id', controller.findById.bind(controller));
clienteRoutes.put('/:id', controller.update.bind(controller));
clienteRoutes.delete('/:id', controller.delete.bind(controller));

export { clienteRoutes };