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
          <ServiceCard titulo='Aprender Vite' categoria='Estudos' />
          <ServiceCard titulo='Fazer cafe' categoria='Lazer' />
          <ServiceCard titulo='Almocar' categoria='Lazer' />
        </div>
      </main>
    </body>
  )
}

export default App
