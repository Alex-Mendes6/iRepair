export interface ServiceOrder {
    id: number;
    client_id: number;
    device: string;
    issue: string;
    status: boolean;
    created_at: string;
}

export type CreateServiceOrderData = Omit<ServiceOrder, 'id' | 'created_at'>;