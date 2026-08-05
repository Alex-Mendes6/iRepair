import type { Request, Response } from "express";
import { ClientsService } from "../services/ClientsService";
import { AppError } from "../../../utils/AppError";

export class ClientsController {
    private service = new ClientsService();

    constructor() {
        this.create = this.create.bind(this);
    }


    async create(req: Request, res: Response) {
        try {
            const { name, phone, email  } = req.body;
            if (!name || !email || !phone) {
            return res.status(400).json({ error: 'Nome, e-mail e telefone são obrigatórios' });
            }

            const cliente = await this.service.create({ name, email, phone });
            return res.status(201).json(cliente);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async getAll(req: Request, res: Response) {
        const service = new ClientsService();
        const clients = await service.getAll();
        return res.status(200).json(clients);
    }
}