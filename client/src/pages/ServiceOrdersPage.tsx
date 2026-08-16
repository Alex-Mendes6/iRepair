import React, { useState, useEffect, useCallback } from "react"
import type { ServiceOrder, CreateServiceOrderData, Client } from "../types"
import { createServiceOrder, getAllServiceOrders, deleteServiceOrder } from "../services/serviceOrderService"
import { getAllClients } from "../services/clientService";
import axios from "axios";

export const ServiceOrdersPage = () => {
    const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [deleteId, setDeleteId] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);
    const [newServiceOrder, setNewServiceOrder] = useState<CreateServiceOrderData>({
        client_id: 0,
        device: '',
        issue: '',
        status: false,
    })
    const [clients, setClients] = useState<Client[]>([]);

    // buscando os clientes na API
    useEffect(() => {
        getAllClients().then(setClients).catch(() => setError('Erro ao carregar clientes'));
    }, []);

    // buscando as ordens de servico na API
    const fetchServiceOrders = useCallback(async () => {
        try {
            const data = await getAllServiceOrders();
            setServiceOrders(Array.isArray(data) ? data : []);
        } catch (e) {
            setError('Não foi possível carregar as Ordens de Servico ');
            setServiceOrders([]);
        } finally {
            setIsLoading(false);
        }
    }, [])
    
    // chamando fetchServiceOrderes quando a pagina abrir
    useEffect(() => {
        fetchServiceOrders();
    }, [refreshKey]);

    // criacao de uma nova OS
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreateError(null);

        // veirficando se o id e valido (maior que 0)
        if (newServiceOrder.client_id <= 0) {
            setCreateError('ID do cliente deve ser um número positivo.');
            return;
        }

        // verificando se o id pertence a algum cliente
        if (newServiceOrder.client_id !== 0) {
            const exists = clients.some(c => c.id === newServiceOrder.client_id);
                if (!exists) {
                setCreateError('Cliente não encontrado. Verifique o ID.');
                return;
            }
        }
        
        setIsCreating(true);

        try {
            const payload = {
                client_id: newServiceOrder.client_id,
                device: newServiceOrder.device,
                issue: newServiceOrder.issue,
                status: newServiceOrder.status,
            };
            const createdServiceOrder = await createServiceOrder(payload);
            setServiceOrders(prev => [...prev, createdServiceOrder]);
            setNewServiceOrder({
                client_id: 0,
                device: '',
                issue: '',
                status: false,
            });
            setRefreshKey(prev => prev + 1);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('Payload enviado para criar OS:', newServiceOrder);
                setCreateError(error.response?.data?.message || 'Erro ao criar OS');
            } else {
                setCreateError('Erro inesperado ao criar OS');
            }
        } finally {
            setIsCreating(false);
        }
    }

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        setDeleteError(null);
        setIsDeleting(true);

        const id = Number(deleteId);
        if (!id || id <= 0) {
            setDeleteError('O ID da OS deve ser um número positivo.');
            setIsDeleting(false);
            return;
        }

        try {
            await deleteServiceOrder(id);
            setServiceOrders(prev => prev.filter(order => order.id !== id));
            setDeleteId('');
            setRefreshKey(prev => prev + 1);
        } catch (error) {
            if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 404) {
                setDeleteError('Ordem de serviço não encontrada.');
            } else {
                setDeleteError('Erro ao deletar OS. Tente novamente.');
            }
            } else {
            setDeleteError('Erro inesperado.');
            }
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) return <p>Carregando...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <div>
            <form onSubmit={handleCreate} className="mt-4 p-4 border rounded">
                <h3 className="font-bold mb-2">Nova OS</h3>
                <div className="flex flex-col gap-2">
                    <select
                    value={newServiceOrder.client_id ?? ''}
                    onChange={(e) =>
                        setNewServiceOrder({
                        ...newServiceOrder,
                        client_id:Number(e.target.value),
                        })
                    }
                    required
                    className="border p-2 rounded"
                    >
                    <option value="">Selecione um cliente</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                        {client.name} (ID: {client.id})
                        </option>
                    ))}
                    </select>
                    <input
                    type="text"
                    placeholder="Aparelho"
                    value={newServiceOrder.device}
                    onChange={(e) => setNewServiceOrder({ ...newServiceOrder, device: e.target.value })}
                    required
                    className="border p-2 rounded"
                    />
                    <input
                    type="text"
                    placeholder="Defeito"
                    value={newServiceOrder.issue}
                    onChange={(e) => setNewServiceOrder({ ...newServiceOrder, issue: e.target.value })}
                    required
                    className="border p-2 rounded"
                    />
                    <button
                    type="submit"
                    disabled={isCreating}
                    className="bg-blue-500 text-white p-2 rounded disabled:opacity-50 cursor-pointer"
                    >
                    {isCreating ? 'Criando...' : 'Criar OS'}
                    </button>
                    {createError && <p className="text-red-500 text-sm">{createError}</p>}
                </div>
            </form>
            <div className="p-2">
                <h2 className="text-xl font-semibold mb-2">Lista de OS</h2>
                    <ul className="divide-y divide-gray-200">
                        {serviceOrders.map((os) => (
                            <li key={os.id} className="py-2 flex justify-between items-center">
                                <span>
                                    <strong>{os.device}</strong> - {os.issue}
                                    {os.id && <span className="text-sm text-gray-500 ml-2">(ID da OS: {os.id})</span>}
                                    {os.client_id && <span className="text-sm text-gray-500 ml-2">(ID do Cliente: {os.client_id})</span>}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                    os.status === false ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
                                }`}>
                                    {os.status === false ? 'Aberta' : 'Concluída'}
                                </span>
                            </li>
                        ))}
                    </ul>
            </div>
            <form onSubmit={handleDelete} className="mt-4 p-4 border rounded">
                <h3 className="font-bold mb-2">Deletar OS</h3>
                <div className="flex items-center gap-2">
                    <input
                    type="number"
                    placeholder="ID da OS"
                    value={deleteId}
                    onChange={(e) => setDeleteId(e.target.value)}
                    required
                    className="border p-2 rounded flex-1"
                    />
                    <button
                    type="submit"
                    disabled={isDeleting}
                    className="bg-red-500 text-white p-2 rounded disabled:opacity-50 cursor-pointer"
                    >
                    {isDeleting ? 'Deletando...' : 'Deletar'}
                    </button>
                </div>
                {deleteError && <p className="text-red-500 text-sm mt-2">{deleteError}</p>}
            </form>
        </div>
    )
}