import { Router } from "express";
import { authMiddleware } from "../../../middlewares/authMiddleware";
import { SerivceOrdersController } from "../controllers/ServiceOrdersController";

const serviceOrderRoutes = Router();
const controller = new SerivceOrdersController();

serviceOrderRoutes.use(authMiddleware);

serviceOrderRoutes.post('/', controller.create.bind(controller));
serviceOrderRoutes.get('/', controller.getAll.bind(controller));
serviceOrderRoutes.get('/:id', controller.findById.bind(controller));
serviceOrderRoutes.put('/:id', controller.update.bind(controller));
serviceOrderRoutes.delete('/:id', controller.delete.bind(controller));

export { serviceOrderRoutes };