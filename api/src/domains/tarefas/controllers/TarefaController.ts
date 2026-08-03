import type { Request, Response } from "express";
import { TarefaService } from "../services/TarefaService";
import { prisma } from "../../../config/prismaClient.js";

class TarefaController {
    async create(req: Request, res: Response) {
        try {
            const { title, descricao } = req.body;
            const service = new TarefaService();
            const task = await service.create({ title, descricao });
            return res.status(201).json(task);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        const service = new TarefaService();
        const tasks = await service.getAll();
        return res.status(200).json(tasks);
    }

    async findById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const service = new TarefaService;
            const task = await service.findById(id);

            if (!task) {
                return res.status(404).json({ erro: 'Tarefa não encontrada' });
            }

            return res.status(200).json(task);
        } catch (error: any) {
            if (error.message === 'Tarefa não encontrada') {
                return res.status(404).json({ erro: 'Tarefa não encontrada'});
            }
            return res.status(400).json({ erro: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { title, completed, descricao } = req.body;

            const service = new TarefaService();
            const tarefa = await service.update(id, title, completed, descricao);
            return res.status(200).json(tarefa);
        } catch (error: any) {
            if (error.message === 'Tarefa não encontrada') {
                return res.status(404).json({ erro: 'Tarefa não encontrada'});
            }
            if (error.message === 'Ambos campos vazios') {
                return res.status(400).json({ erro: 'Ambos campos vazios' });
            }
            return res.status(400).json({ erro: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const service = new TarefaService();
            await service.delete(id);
            return res.status(204).send();
        } catch (error: any) {
            if (error.message === 'Tarefa não encontrada') {
                return res.status(404).json({ erro: 'Tarefa não encontrada'});
            }
            return res.status(400).json({ erro: error.message });
        }
    }
}

export { TarefaController };