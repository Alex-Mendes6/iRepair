import { Router } from "express";
import { SerivceOrdersController } from "../controllers/ServiceOrdersController";

const serviceOrderRoutes = Router();
const controller = new SerivceOrdersController();

serviceOrderRoutes.post('/', controller.create);
serviceOrderRoutes.get('/', controller.getAll);
serviceOrderRoutes.get('/:id', controller.findById);
serviceOrderRoutes.put('/:id', controller.update);
serviceOrderRoutes.delete('/:id', controller.delete);

export { serviceOrderRoutes };