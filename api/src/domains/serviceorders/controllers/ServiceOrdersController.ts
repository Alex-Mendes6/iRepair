import type { Request, Response } from "express";
import { ServiceOrdersService } from "../services/ServiceOrdersService";
import { AppError } from "../../../utils/AppError";
import console from "node:console";

export class SerivceOrdersController {
    async create(req: Request, res: Response) {
        try {
            const { client_id, device, issue } = req.body;
            if (!client_id || typeof client_id !== 'number') {
                return res.status(400).json({ error: 'client_id deve ser um número válido' });
            }
            if (!device || typeof device !== 'string') {
                return res.status(400).json({ error: 'device é obrigatório' });
            }
            if (!issue || typeof issue !== 'string') {
                return res.status(400).json({ error: 'issue é obrigatório' });
            }
            const service = new ServiceOrdersService();
            const serviceOrder = await service.create({ client_id, device, issue });
            return res.status(201).json(serviceOrder);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async getAll(req: Request, res: Response) {
        const service = new ServiceOrdersService();
        const serviceOrders = await service.getAll();
        return res.status(200).json(serviceOrders);
    }

    async findById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const service = new ServiceOrdersService();
            const serviceOrder = await service.findById(id);
            if (!serviceOrder) {
                return res.status(404).json({ error: 'Ordem de serviço não encontrada' });
            }
            return res.status(200).json(serviceOrder);
            if (!serviceOrder) {
                return res.status(404).json({ error: 'Ordem de serviço não encontrada' });
            }
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { device, issue, status } = req.body;

            const service = new ServiceOrdersService();
            const serviceOrder = await service.update(id, device, issue, status);
            return res.status(200).json(serviceOrder);
        } catch (error) {
            if(error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const service = new ServiceOrdersService();
            await service.delete(id);
            return res.status(204).send();
        } catch (error) {
            if(error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}