import express from 'express';
import { tarefaRoutes } from '../routes/tarefa.routes';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/tasks', tarefaRoutes);

export { app };