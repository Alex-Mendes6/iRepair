import express from 'express';
import { tarefaRoutes } from '../domains/tarefas/routes/tarefa.routes';
import cookieParser from 'cookie-parser';
import { authRoutes } from '../domains/auth/auth.routes';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/tasks', tarefaRoutes);
app.use('/auth', authRoutes);

export { app };