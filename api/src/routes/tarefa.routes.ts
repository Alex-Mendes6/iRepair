import { Router } from "express";
import { TarefaController } from "../domains/tarefas/controllers/TarefaController.js";

const tarefaRoutes = Router();
const controller = new TarefaController();

tarefaRoutes.post('/', controller.create);

tarefaRoutes.get('/', controller.getAll);

tarefaRoutes.get('/:id', controller.findById);

tarefaRoutes.put('/:id', controller.update);

tarefaRoutes.delete('/:id', controller.delete);

export { tarefaRoutes };