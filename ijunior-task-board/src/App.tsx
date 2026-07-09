import './App.css'
import { Header } from './components/Header'
import { ServiceCard } from './components/ServiceCard'

function App() {
  return (
    <body>
      <div>
        <Header />
      </div>
      <main>
        <div className='gap-4 flex'>
            <ServiceCard nomeCliente='Alex' modeloAparelho='TV' defeito='Tela Preta'/>
        </div>
      </main>
    </body>
  )
}

export default App
