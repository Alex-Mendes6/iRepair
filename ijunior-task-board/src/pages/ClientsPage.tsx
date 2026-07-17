import React, { useState, useEffect, useCallback } from "react"
import type { Client, CreateClientData } from "../types"
import { deleteClient, getAllClients, createClient } from "../services/clientService"
import axios from "axios"

export const ClientsPage = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [newClient, setNewClient] = useState<CreateClientData>({
        name: '',
        phone: '',
        email: '',
    });
    const [isCreating, setIsCreating] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);

    // funcao global para buscar os clientes
    const fetchClients = useCallback(async () => {
        try {
            setClients(await getAllClients());
        } catch (e) {
            setError('Não foi possível carregar os clientes');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // buscando todos os clientes na API
    useEffect(() => {
        fetchClients();
    }, []) // [] = busca somente uma vez, quando a pagina abrir

    // recarregar a busca na API apos deletar ou criar um Client
    useEffect(() => {
        fetchClients();
    }, [refreshKey])

    // funcao para lidar com a funcionalidade deleteClient
    const handleSubmitDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        setDeleteError(null);
        setIsDeleting(true);

        const id: number = Number(deleteId);
        if (id) {
            try {
                await deleteClient(id);
                setRefreshKey(prev => prev + 1);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 404) {
                        setDeleteError('Cliente não encontrado. Verifique o Id');
                    } else {
                        setDeleteError('Erro ao deletar cliente. Tente novamente');
                    }
                }
            } finally {
                setIsDeleting(false);
            }
            setDeleteId('');
        } 
    }

    // funcao que lida com a funcionalidade createClient
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreateError(null);
        setIsCreating(true);

        try {
            const createdClient = await createClient(newClient);
            setClients(prev => [...prev, createdClient]);
            setNewClient({name: '', phone: '', email: ''});
            setRefreshKey(prev => prev + 1); // recarrega a lista completa com fetchClient
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setCreateError(error.response?.data?.message || 'Erro ao criar cliente');
            } else {
                setCreateError('Erro inesperado');
            }
        }  finally {
            setIsCreating(false);
        }
    };

    if (isLoading) return <p>Carregando...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <div className="bg-green-300">
            <form onSubmit={handleCreate} className="mt-4 p-4 border rounded">
            <h3 className="font-bold mb-2">Novo Cliente</h3>
            <div className="flex flex-col gap-2">
                <input
                type="text"
                placeholder="Nome"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                required
                className="border p-2 rounded"
                />
                <input
                type="text"
                placeholder="Telefone"
                value={newClient.phone}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                required
                className="border p-2 rounded"
                />
                <input
                type="email"
                placeholder="E-mail"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                required
                className="border p-2 rounded"
                />
                <button
                type="submit"
                disabled={isCreating}
                className="bg-blue-500 text-white p-2 rounded disabled:opacity-50 cursor-pointer"
                >
                {isCreating ? 'Criando...' : 'Criar Cliente'}
                </button>
                {createError && <p className="text-red-500 text-sm">{createError}</p>}
            </div>
            </form >
                <ul className="gap-1">
                    <li>Clientes cadastrados:</li>
                    {clients.map(Client => (
                        <li key={Client.id}>{Client.name}: {Client.email} ({Client.phone})</li>
                    ))}
                </ul>
                <form action="" onSubmit={handleSubmitDelete} className="mt-4 p-4 border rounded">
                    <div className="flex flex-col gap-2">
                    <input 
                    type="number" 
                    className="border p-2 rounded" 
                    name="delete-input" 
                    value={deleteId} 
                    onChange={(e) => setDeleteId(e.target.value)} 
                    placeholder="Digite o ID para deleta-lo" required/>
                    <button 
                    type="submit" 
                    className="bg-red-400 text-white p-2 rounded disabled:opacity-50 cursor-pointer" 
                    disabled={isDeleting}>
                    {isDeleting ? 'Deletando...' : 'Deletar Cliente'}
                    </button>
                    </div>
                </form>
                {deleteError && <p className="text-red-500 text-sm mt-1">{deleteError}</p>}
        </div>
    )
}