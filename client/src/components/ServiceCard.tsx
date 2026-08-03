import type { ServiceOrder, ServiceOrderStatus } from '../types';

interface ServiceCardProps {
    order: ServiceOrder;
    clientName?: string;
    onStatusChange: (id: number, newStatus: ServiceOrderStatus) => void;
    isUpdating?: boolean;
}

export const ServiceCard = ({ order, clientName, onStatusChange, isUpdating }: ServiceCardProps) => {
    const statusColors: Record<string, string> = {
        open: 'bg-yellow-200 text-yellow-800',
        in_progress: 'bg-blue-200 text-blue-800',
        done: 'bg-green-200 text-green-800',
    };

    const statusLabels = {
        open: 'Aberta',
        in_progress: 'Em andamento',
        done: 'Concluída',
    };

    const statusOrder: ServiceOrderStatus[] = ['open', 'in_progress', 'done'];

    const handleStatusClick = () => {
        if (isUpdating) return;
        const currentIndex = statusOrder.indexOf(order.status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        const nextStatus = statusOrder[nextIndex];
        onStatusChange(order.id, nextStatus);
    };

    return (
        <div className={`border rounded-lg shadow-md p-4 ${statusColors[order.status]}`}>
        <h3 className="font-bold text-lg">{order.device}</h3>
        <p className="text-gray-600">{order.issue}</p>
            <p className="text-sm text-gray-500">Cliente: {clientName || `ID: ${order.client_id}`}</p>
            <div className="mt-2">
                <button
                onClick={handleStatusClick}
                disabled={isUpdating}
                className={`px-3 py-1 rounded-full text-sm font-semibold cursor-pointer hover:opacity-80 transition ${statusColors[order.status]} border-2`}
                >
                {isUpdating ? 'Atualizando...' : statusLabels[order.status]}
                </button>
            </div>
        </div>
    );
};