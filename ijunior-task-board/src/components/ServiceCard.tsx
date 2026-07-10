interface ServiceCardProps {
    nomeCliente: string;
    modeloAparelho: string;
    defeito: string;
    status: boolean;
    mudaEstado: () => void;
}

export function ServiceCard({ nomeCliente, modeloAparelho, defeito, status, mudaEstado}: ServiceCardProps) {
    return (
        <div className={`border-3 border-black p-4 rounded-lg shadow-md ${status ? 'bg-green-700' : 'bg-red-700'}`}>
            <h2 className="font-serif font-bold text-xl text-white mt-2">{ modeloAparelho} </h2>
            <p className="font-sans font-normal text-base text-gray-300">{ defeito }</p>
            <h3 className="font-serif font-semibold text-lg text-blue-300 mt-2">{ nomeCliente }</h3>
            <button className="border-2 rounded-md border-black w-25 text-black bg-gray-600 font-mono font-medium text-sm" onClick={mudaEstado}>
                {status ? 'Finalizado' : 'Em aberto'}
            </button>
        </div>
    )
}