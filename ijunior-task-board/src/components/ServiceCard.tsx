interface ServiceCardProps {
    nomeCliente: string;
    modeloAparelho: string;
    defeito: string;
}

export function ServiceCard({ nomeCliente, modeloAparelho, defeito }: ServiceCardProps) {
    return (
        <div className="border p-4 rounded-lg shadow-md">
            <h2 className="font-bold text-lg mt-2">{ modeloAparelho} </h2>
            <p>{ defeito }</p>
            <h3 className="font-bold text-lg mt-2">{ nomeCliente }</h3>
        </div>
    )
}