import { prisma } from "../../../config/prismaClient";
import { AppError } from "../../../utils/AppError";
import type { Client } from "../models/Clients";
export class ClientsService {
    async create(data: Client) {
        const existe = await prisma.client.findUnique({
            where: { email: data.email }
        })
        if (existe) {
            throw new AppError('E-mail já cadastrado', 409);
        }

        const cliente = await prisma.client.create({
            data: {
                name: data.name,
                phone: data.phone,
                email: data.email,
            }
        })

        return cliente;
    }

    async getAll() {
        const clients = await prisma.client.findMany();

        return clients;
    }

    async findById(id: number) {
        const client = await prisma.client.findUnique({ where: { id } });
        return client;
    }

    async update(id: number, name?: string, phone?: string) {
        if(name === undefined && phone === undefined) {
            throw new AppError('Todos os campos vazios', 400);
        }

        const client = await prisma.client.findUnique({ 
            where: { id }
        });
        if (!client) {
            throw new AppError('Cliente não encontrado', 404);
        }

        const data: any = {};
        if (name !== undefined) data.name = name;
        if (phone !== undefined) data.phone = phone;

        const updatedClient = await prisma.client.update({
            where: { id },
            data,
        });
        return updatedClient;
    }
}