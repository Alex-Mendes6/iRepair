import { useState, useEffect } from 'react';
import { getAllServiceOrders } from '../services/serviceOrderService';
import { getAllClients } from '../services/clientService';
import { ServiceCard } from '../components/ServiceCard';
import type { ServiceOrder } from '../types';
import axios from 'axios';

export const DashboardPage = () => {
    const [orders, setOrders] = useState<ServiceOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [clientsMap, setClientsMap] = useState<Map<number, string>>(new Map());

    // usado para buscar as OS
    useEffect(() => {
        async function fetchOrders() {
        try {
            const data = await getAllServiceOrders();
            setOrders(data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
            setError(err.response?.data?.message || 'Erro ao carregar OS');
            } else {
            setError('Erro inesperado');
            }
        } finally {
            setIsLoading(false);
        }
        }
        fetchOrders();
    }, []);

    // useEffect para buscar os clientes 
    useEffect(() => {
        async function fetchData() {
            try {
            const [ordersData, clientsData] = await Promise.all([
                getAllServiceOrders(),
                getAllClients(),
            ]);
            setOrders(ordersData);

            // Cria um mapa: id -> name
            const map = new Map<number, string>();
            clientsData.forEach((client) => map.set(client.id, client.name));
            setClientsMap(map);
            } catch (err) {
            setError('Erro ao carregar dados');
            } finally {
            setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (isLoading) return <p className="text-center mt-8">Carregando ordens de serviço...</p>;
    if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;

    return (
        <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard de Ordens de Serviço</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.length === 0 ? (
            <p className="col-span-full text-gray-500">Nenhuma OS encontrada.</p>
            ) : (
            orders.map((order) => (
                <ServiceCard key={order.id} 
                order={order} 
                clientName={clientsMap.get(order.client_id)}/>
            ))
            )}
        </div>
        </div>
    );
};