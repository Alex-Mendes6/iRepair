import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { ServiceCard } from './components/ServiceCard'
import { NewServiceForm } from './components/NewServiceForm'

function App() {
  interface Servico {
  nomeCliente: string;
  modeloAparelho: string;
  defeito: string;
}

  const [servicos, setServicos] = useState<Servico[]>([]);

  const handleAddServicos = (novoServico: Servico) => {
    setServicos([...servicos, novoServico]);
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <main>
        <div>
            <NewServiceForm onAddService={handleAddServicos}/>
        </div>
        <div className='gap-4 flex'>
            {servicos.map((servico, index) => (
              <ServiceCard 
              key={index}
              nomeCliente={servico.nomeCliente}
              modeloAparelho={servico.modeloAparelho}
              defeito={servico.defeito}
              />
            ))}
        </div>
      </main>
    </div>
  )
}

export default App
