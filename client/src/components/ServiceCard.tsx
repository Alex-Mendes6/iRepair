import type { ServiceOrder } from '../types';

interface ServiceCardProps {
    order: ServiceOrder;
    clientName?: string;
    onStatusChange: (id: number, newStatus: boolean) => void;
    isUpdating?: boolean;
}

export const ServiceCard = ({ order, clientName, onStatusChange, isUpdating }: ServiceCardProps) => {
    const statusColors = {
        false: 'bg-yellow-200 text-yellow-800',
        true: 'bg-green-200 text-green-800',
    }

    const statusLabels = {
        false: 'Aberta',
        true: 'Concluída',
    };

    const handleStatusClick = () => {
        if (isUpdating) return;
        onStatusChange(order.id, !order.status);
    };

    return (
        <div className={`border rounded-lg shadow-md p-4 ${statusColors[String(order.status) as 'true' | 'false']}}`}>
        <h3 className="font-bold text-lg">{order.device}</h3>
        <p className="text-gray-600">{order.issue}</p>
            <p className="text-sm text-gray-500">Cliente: {clientName || `ID: ${order.client_id}`}</p>
            <div className="mt-2">
                <button
                onClick={handleStatusClick}
                disabled={isUpdating}
                className={`px-3 py-1 rounded-full text-sm font-semibold cursor-pointer hover:opacity-80 transition ${statusColors[String(order.status) as 'true' | 'false']} border-2`}
                >
                {isUpdating ? 'Atualizando...' : statusLabels[String(order.status) as 'true' | 'false']}
                </button>
            </div>
        </div>
    );
};