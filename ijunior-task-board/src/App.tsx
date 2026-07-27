  import './App.css'
  import { MainLayout } from './components/MainLayout'
  import { BrowserRouter, Routes, Route } from 'react-router';
  import { DashboardPage } from './pages/DashboardPage';
  import { ClientsPage } from './pages/ClientsPage';
  import { ServiceOrdersPage } from './pages/ServiceOrdersPage';

  const App = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/clients" element={<ClientsPage/>} />
            <Route path="/service-orders" element={<ServiceOrdersPage />} />
          </Route>
        </Routes>  
      </BrowserRouter>  
    )
  }

  export default App
