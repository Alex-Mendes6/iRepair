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
}