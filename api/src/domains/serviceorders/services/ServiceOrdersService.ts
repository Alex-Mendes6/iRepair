import { prisma } from "../../../config/prismaClient";
import { AppError } from "../../../utils/AppError";
import type { ServiceOrder } from "../models/ServiceOrder";
export class ServiceOrdersService {
    async create(data: ServiceOrder) {
        const id = data.client_id
        const clientExists = await prisma.client.findUnique({ where:{ id }});
        if (!clientExists) {
            throw new AppError('Id de cliente não encontrado', 404);
        }
        const serviceOrder = await prisma.serviceOrder.create({
            data: {
                client_id: data.client_id,
                device: data.device,
                issue: data.issue,
            }
        })

        return serviceOrder;
    }

    async getAll() {
        const serviceOrders = await prisma.serviceOrder.findMany();
        return serviceOrders;
    }

    async findById(id: number) {
        const serviceOrder = await prisma.serviceOrder.findUnique({ where: { id }});
        return serviceOrder;
    }

    async update(id: number, device?: string, issue?: string, status?: boolean) {
        if (device === undefined && issue === undefined && status === undefined) {
            throw new AppError('Todos os campos vazios', 400);
        }

        const serviceOrder = await prisma.serviceOrder.findUnique({
            where: { id }
        });
        if (!serviceOrder) {
            throw new AppError('Ordem de serviço não encontrada', 404);
        }

        const data: any = {};
        if (device !== undefined) data.device = device;
        if (issue !== undefined) data.issue = issue;
        if (status !== undefined) data.status = status;

        const updatedServiceOrder = await prisma.serviceOrder.update({
            where: { id },
            data,
        });
        return updatedServiceOrder;
    }
}