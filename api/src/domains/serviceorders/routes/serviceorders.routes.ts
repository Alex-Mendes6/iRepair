import { Router } from "express";
import { SerivceOrdersController } from "../controllers/ServiceOrdersController";

const serviceOrderRoutes = Router();
const controller = new SerivceOrdersController();

export { serviceOrderRoutes };