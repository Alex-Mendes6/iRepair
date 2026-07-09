interface TaskCardProps {
    titulo: string;
    categoria: string;
}

export function TaskCard({ titulo, categoria }: TaskCardProps) {
    return (
        <div className="border p-4 rounded-lg shadow-md">
            <span className="text-xs bg-blue-100 text-blue-800 px-2  py-1 rouunded">
                {categoria}
            </span>
            <h3 className="font-bold text-lg mt-2">{titulo}</h3>
        </div>
    )
}