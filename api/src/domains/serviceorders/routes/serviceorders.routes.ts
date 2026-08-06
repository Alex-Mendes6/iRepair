import { Router } from "express";
import { SerivceOrdersController } from "../controllers/ServiceOrdersController";

const serviceOrderRoutes = Router();
const controller = new SerivceOrdersController();

serviceOrderRoutes.post('/', controller.create);
serviceOrderRoutes.get('/', controller.getAll);

export { serviceOrderRoutes };