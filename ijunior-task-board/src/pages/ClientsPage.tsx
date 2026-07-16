import React, { useState, useEffect, useCallback } from "react"
import type { Client } from "../types"
import { deleteClient, getAllClients } from "../services/clientService"
import axios from "axios"

export const ClientsPage = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);
    const [deleteError, setDeleteError] = useState<string | null>(null);

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

    // recarregar a busca na API apos deletar um Client
    useEffect(() => {
        fetchClients();
    }, [refreshKey])

    async function handleDelete(id: number) {
        setDeleteError(null);
        try {
            deleteClient(id);
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
            setDeleteError(null);
        }
    }

    const handleSubmitDelete = (e: React.FormEvent) => {
        e.preventDefault();
        const id: number = Number(deleteId);
        if (id) {
            handleDelete(id);
            setDeleteId('');
        } 
    }

    if (isLoading) return <p>Carregando...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <div className="bg-green-300">Pagina Clientes
            <ul>
                {clients.map(Client => (
                    <li key={Client.id}>{Client.name}: {Client.email} ({Client.phone})</li>
                ))}
            </ul>
            <form action="" onSubmit={handleSubmitDelete}>
                <input type="text" name="delete-input" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} placeholder="Digite o ID do usuario que voce quer deletar" required/>
                <input type="submit" />
            </form>
            {deleteError && <p className="text-red-500 text-sm mt-1">{deleteError}</p>}
        </div>
    )
}