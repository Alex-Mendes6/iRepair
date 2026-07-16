import { useState, useEffect } from "react"
import { api } from "../services/api"
import type { ServiceOrder } from "../types"

export const ServiceOrdersPage = () => {
    const [serviceOrders, setSertviceOrders] = useState<ServiceOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchServiceOrders() {
            try {
                const response = await api.get('/service-orders');
                setSertviceOrders(response.data);
            } catch (e) {
                setError('Não foi possível carregar as Ordens de Servico ');
            } finally {
                setIsLoading(false);
            }
        }

        fetchServiceOrders();
    }, []) // [] = busca somente uma vez, quando a pagina abrir

    if (isLoading) return <p>Carregando...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <div className="bg-yellow-300">Pagina OS
            <ul>
                {serviceOrders.map(ServiceOrder => (
                    <li key={ServiceOrder.id}>{ServiceOrder.device} - {ServiceOrder.issue}</li>
                ))}
            </ul>
        </div>
    )
}