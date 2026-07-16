import { useState, useEffect } from "react"
import type { Client } from "../types"
import { getAllClients } from "../services/clientService"

export const ClientsPage = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // buscando todos os clientes na API
    useEffect(() => {
        async function fetchClients() {
            try {
                setClients(await getAllClients());
            } catch (e) {
                setError('Não foi possível carregar os clientes');
            } finally {
                setIsLoading(false);
            }
        }

        fetchClients();
    }, []) // [] = busca somente uma vez, quando a pagina abrir

    if (isLoading) return <p>Carregando...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <div className="bg-red-500">Pagina Clientes
            <ul>
                {clients.map(Client => (
                    <li key={Client.id}>{Client.name}: {Client.email} ({Client.phone})</li>
                ))}
            </ul>
        </div>
    )
}