  import './App.css'
  import { MainLayout } from './components/MainLayout'
  import { BrowserRouter, Routes, Route } from 'react-router';
  import { AuthProvider } from './contexts/AuthContext';
  import { PrivateRoute } from './routes/PrivateRoute';
  import { Login } from './pages/Login';
  import { DashboardPage } from './pages/DashboardPage';
  import { ClientsPage } from './pages/ClientsPage';
  import { ServiceOrdersPage } from './pages/ServiceOrdersPage';

  const App = () => {
    return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Rota pública */}
            <Route path="/login" element={<Login />} />

            {/* Rotas protegidas — envolvem o layout já existente */}
            <Route element={<PrivateRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/clients" element={<ClientsPage/>} />
                <Route path="/service-orders" element={<ServiceOrdersPage />} />
              </Route>
            </Route>
          </Routes>  
        </AuthProvider>
      </BrowserRouter>  
    )
  }

  export default App
