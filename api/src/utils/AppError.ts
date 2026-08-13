export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(
        message: string,
        statusCode: number = 500,
        isOperational: boolean = true,
    ) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        // Garante que o nome da classe seja exibido corretamente
        this.name = this.constructor.name;

        // Mantém a pilha de execução (stack trace) correta
        Error.captureStackTrace(this, this.constructor);
    }
}