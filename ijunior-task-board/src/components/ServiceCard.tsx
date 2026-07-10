import React, { useState } from "react";
interface ServiceCardProps {
    nomeCliente: string;
    modeloAparelho: string;
    defeito: string;
    status: boolean;
    mudaEstado: () => void;
}

export function ServiceCard({ nomeCliente, modeloAparelho, defeito, status, mudaEstado}: ServiceCardProps) {
    return (
        <div className="border p-4 rounded-lg shadow-md">
            <h2 className="font-bold text-lg mt-2">{ modeloAparelho} </h2>
            <p>{ defeito }</p>
            <h3 className="font-bold text-lg mt-2">{ nomeCliente }</h3>
            <button className={`${status ? 'bg-green-500' : 'bg-red-600'}`} onClick={mudaEstado}>
                {status ? 'Finalizado' : 'Em aberto'}
            </button>
        </div>
    )
}