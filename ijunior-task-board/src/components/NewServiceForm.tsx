import React, { useState } from "react"

export function NewServiceForm() {
    const [formData, setFormData] = useState({ nomeCliente: '', modeloAparelho: '', defeito: '' });

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!e.currentTarget.checkValidity()) {
            return;
        }

        console.log(formData);

        setFormData({ nomeCliente: '', modeloAparelho: '', defeito: ''})
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white">
                <input type="text" required name="nomeCliente" placeholder="Nome do Cliente" 
                value={formData.nomeCliente} onChange={(e) => setFormData({...formData, nomeCliente: e.target.value})}/>
                <input type="text" required name="modeloAparelho" placeholder="Modelo do Aparelho" 
                value={formData.modeloAparelho} onChange={(e) => setFormData({...formData, modeloAparelho: e.target.value})}/>
                <input type="text" required name="defeito" placeholder="Defeito apresentado" 
                value={formData.defeito} onChange={(e) => setFormData({...formData, defeito: e.target.value})}/>
                <input type="submit" value={`Salvar`}/>
            </form>
        </div>
    )
}