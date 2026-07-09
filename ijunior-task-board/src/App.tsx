import './App.css'
import { Header } from './components/Header'
import { ServiceCard } from './components/ServiceCard'
import { NewServiceForm } from './components/NewServiceForm'

function App() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <main>
        <div className='gap-4 flex'>
            <ServiceCard nomeCliente='Alex' modeloAparelho='TV' defeito='Tela Preta'/>
        </div>
        <div>
            <NewServiceForm />
        </div>
      </main>
    </div>
  )
}

export default App
