import type { ServiceOrder } from '../types';

interface ServiceCardProps {
  order: ServiceOrder;
  clientName?: string;
}

export const ServiceCard = ({ order, clientName }: ServiceCardProps) => {
  const statusColors: Record<string, string> = {
    open: 'bg-yellow-200 text-yellow-800',
    in_progress: 'bg-blue-200 text-blue-800',
    done: 'bg-green-200 text-green-800',
  };

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h3 className="font-bold text-lg">{order.device}</h3>
      <p className="text-gray-600">{order.issue}</p>
        <p className="text-sm text-gray-500">Cliente: {clientName || `ID: ${order.client_id}`}</p>
      <span className={`inline-block mt-2 px-2 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}>
        {order.status}
      </span>
    </div>
  );
};