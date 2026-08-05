import type { Request, Response } from "express";
import { ClientsService } from "../services/ClientsService";
import { AppError } from "../../../utils/AppError";

export class ClientsController {
    private service = new ClientsService();

    async create(req: Request, res: Response) {
        try {
            const { name, email, phone } = req.body;
            if (!name || !email || !phone) {
            return res.status(400).json({ error: 'Nome, e-mail e telefonen são obrigatórios' });
            }

            const cliente = await this.service.create({ name, email, phone });
            return res.status(400).json(cliente);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}