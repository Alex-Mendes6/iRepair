import './App.css'
import { Header } from './components/Header'
import { TaskCard } from './components/TaskCard'

function App() {
  return (
    <body>
      <div>
        <Header />
      </div>
      <main>
        <div className='gap-4 flex'>
          <TaskCard titulo='Aprender Vite' categoria='Estudos' />
          <TaskCard titulo='Fazer cafe' categoria='Lazer' />
          <TaskCard titulo='Almocar' categoria='Lazer' />
        </div>
      </main>
    </body>
  )
}

export default App
