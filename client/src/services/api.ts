import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // lido do .env
  withCredentials: true,                 // envia o cookie httpOnly automaticamente
  headers: {
    'Content-Type': 'application/json',
  },
});

// Redireciona para /login sempre que a API retornar 401 (token expirado ou ausente)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);