import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authRoutes } from '../domains/auth/auth.routes';
import { clienteRoutes } from '../domains/clientes/routes/clients.routes';
import { serviceOrderRoutes } from '../domains/serviceorders/routes/serviceorders.routes';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:8080', 'http://localhost:3000'],
    credentials: true,
}));

// Rotas
app.use('/auth', authRoutes);
app.use('/clients', clienteRoutes);
app.use('/service-orders', serviceOrderRoutes);

export { app };