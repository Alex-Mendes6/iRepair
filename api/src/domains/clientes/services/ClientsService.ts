import { prisma } from "../../../config/prismaClient";
import { AppError } from "../../../utils/AppError";
import type { Client } from "../models/Clients";
export class ClientsService {
    async create(data: Client) {
        const existe = await prisma.Client.findUnique({
            where: { email: data.email }
        })
        if (existe) {
            throw new AppError('E-mail já cadastrado', 409);
        }

        const cliente = await prisma.Client.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
            }
        })

        return cliente;
    }
}