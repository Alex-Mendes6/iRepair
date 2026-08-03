import { prisma } from "../../../config/prismaClient";

let tarefas: any = [];
interface ICriarTarefa {
    title: string;
    descricao: string;
}

class TarefaService {
    async create({ title, descricao }: ICriarTarefa) {
        if (!title) {
            throw new Error("Nome da tarefa é obrigatório");
        }
        if (!descricao) {
            throw new Error("Descrição da tarefa é obrigatória");
        }

        const novaTarefa = await prisma.task.create({ data: { title, descricao }})

        return novaTarefa;
    }

    async getAll() {
        const tasks = await prisma.task.findMany();
        
        return tasks;
    }

    async findById(id: number) {
        const task = await prisma.task.findUnique({ where: { id } });

        return task;
    }

    async update(id: number, title?: string, completed?: boolean, descricao?: string) {
        if (title === undefined && completed === undefined && descricao === undefined) {
            throw new Error('Todos os campos vazios');
        }

        const task = await prisma.task.findUnique({ where: { id } });
        if (!task) throw new Error('Tarefa não encontrada');
        
        const data: any = {};
        if (title !== undefined) data.title = title;
        if (completed !== undefined) data.completed = completed;
        if (descricao !== undefined) data.descricao = descricao;

        const updatedTask = await prisma.task.update({
            where: { id },
            data,
        });

        return updatedTask;
    }

     async delete(id: number) {
        const task = await prisma.task.findUnique({ where: { id } });
        if (!task) throw new Error('Tarefa não encontrada');

        await prisma.task.delete({ where: { id } });
        return task;
    }
}

export { TarefaService };