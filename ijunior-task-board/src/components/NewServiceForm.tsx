import React, { useState } from "react"

interface NewServiceFormProps {
    onAddService: (data: {
        nomeCliente: string;
        modeloAparelho: string;
        defeito: string;
        status: boolean
    }) => void;
}

export function NewServiceForm({ onAddService }: NewServiceFormProps) {
    const [form, setForm] = useState({ nomeCliente: '', modeloAparelho: '', defeito: '', });

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        // prevenindo que a pagina recarregue automaticamente apos clicar no botao
        e.preventDefault();

        // confetindo se todos os campos estao preenchidos
        if(!e.currentTarget.checkValidity()) {
            return;
        }

        // enviando os valores dos inputs do form para a componente pai (App.tsx)
        onAddService({...form, status: false});

        // limpando os campos dos inputs
        setForm({ nomeCliente: '', modeloAparelho: '', defeito: ''})
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} 
            className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-3 w-150">
                <input type="text" 
                    required name="nomeCliente" 
                    placeholder="Nome do Cliente" 
                    value={form.nomeCliente} 
                    onChange={(e) => setForm({...form, nomeCliente: e.target.value})}
                    className="bg-gray-900 p-2 border border-black rounded focus:outline-none"
                />
                <input type="text" 
                    required name="modeloAparelho" 
                    placeholder="Modelo do Aparelho" 
                    value={form.modeloAparelho} 
                    onChange={(e) => setForm({...form, modeloAparelho: e.target.value})}
                    className="bg-gray-900 p-2 border border-black rounded focus:outline-none"
                />
                <input type="text" 
                    required name="defeito" 
                    placeholder="Defeito apresentado" 
                    value={form.defeito} 
                    onChange={(e) => setForm({...form, defeito: e.target.value})}
                    className="bg-gray-900 p-2 border border-black rounded focus:outline-none"
                />
                <input type="submit" 
                    value={`Salvar`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer transition w-50 flex self-center"
                />
            </form>
        </div>
    )
}