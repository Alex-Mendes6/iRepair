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
}