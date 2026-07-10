import React, { useState } from "react"

interface NewServiceFormProps {
    onAddService: (data: {
        nomeCliente: string;
        modeloAparelho: string;
        defeito: string;
    }) => void;
}

export function NewServiceForm({ onAddService }: NewServiceFormProps) {
    const [form, setForm] = useState({ nomeCliente: '', modeloAparelho: '', defeito: '' });

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        // prevenindo que a pagina recarregue automaticamente apos clicar no botao
        e.preventDefault();

        // confetindo se todos os campos estao preenchidos
        if(!e.currentTarget.checkValidity()) {
            return;
        }

        // enviando os valores dos inputs do form para a componente pai (App.tsx)
        onAddService(form);

        // limpando os campos dos inputs
        setForm({ nomeCliente: '', modeloAparelho: '', defeito: ''})
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white">
                <input type="text" required name="nomeCliente" placeholder="Nome do Cliente" 
                value={form.nomeCliente} onChange={(e) => setForm({...form, nomeCliente: e.target.value})}/>
                <input type="text" required name="modeloAparelho" placeholder="Modelo do Aparelho" 
                value={form.modeloAparelho} onChange={(e) => setForm({...form, modeloAparelho: e.target.value})}/>
                <input type="text" required name="defeito" placeholder="Defeito apresentado" 
                value={form.defeito} onChange={(e) => setForm({...form, defeito: e.target.value})}/>
                <input type="submit" value={`Salvar`}/>
            </form>
        </div>
    )
}