import { useState, useEffect } from "react"
import type { ServiceOrder } from "../types"
import { getAllServiceOrders } from "../services/serviceOrderService"

export const ServiceOrdersPage = () => {
    const [serviceOrders, setSertviceOrders] = useState<ServiceOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // buscando as ordens de servico na API
    useEffect(() => {
        async function fetchServiceOrders() {
            try {
                setSertviceOrders(await getAllServiceOrders());
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