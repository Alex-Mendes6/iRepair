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
    status: boolean
  }

    const [servicos, setServicos] = useState<Servico[]>([]);

    const handleAddServicos = (novoServico: Servico) => {
      setServicos([...servicos, novoServico]);
    };

    const alteraStatus = (index: number) => {
      const novaLista = [...servicos];
      novaLista[index].status =!novaLista[index].status;
      setServicos(novaLista);
    }

    return (
      <div>
        <div>
          <Header />
        </div>
        <main className='flex flex-col gap-6'>
          <div className='mt-4'>
              <NewServiceForm onAddService={handleAddServicos}/>
          </div>
          <div className='flex flex-wrap gap-4 p-2'>
              {servicos.map((servico, index) => (
                <ServiceCard 
                key={index}
                nomeCliente={servico.nomeCliente}
                modeloAparelho={servico.modeloAparelho}
                defeito={servico.defeito}
                status={servico.status}
                mudaEstado={() => alteraStatus(index)}
                />
              ))}
          </div>
        </main>
      </div>
    )
  }

  export default App
