import bcrypt from 'bcrypt';
import { prisma } from '../../config/prismaClient';
import { generateToken } from '../../utils/token';
import { AppError } from '../../utils/AppError';

const SALT_ROUNDS = 10;

export class AuthService {
    async register(email: string, senha: string) {
        const usuarioExistente = await prisma.Usuario.findunique({
            where: { email },
        })

        if (usuarioExistente) {
            throw new AppError('Email já cadastrado', 409);
        }

        const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

        const usuario = await prisma.Usuario.create({
            data: { email, senha: senhaHash },
            select: { id: true, email: true },
        })

        return usuario;
    }

    async login(email: string, senha: string) {
        const usuario = await prisma.Usuario.findunique({
            where: { email },
        });

        if (!usuario) {
            throw new AppError('Credenciais inválidas', 401);
        }
        
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            throw new AppError('Credenciais inválidas', 401);
        }

        const token = generateToken({ id: usuario.id, email: usuario.email });

        return { token, usuario: { id: usuario.id, email: usuario.email }};
    }
}