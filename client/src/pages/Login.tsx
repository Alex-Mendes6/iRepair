import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setErro(null);
        setIsLoading(true);

        try {
            await login(email, senha);
            navigate('/');
        } catch (err: unknown) {
            setErro(err instanceof Error ? err.message : 'Erro ao fazer login.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-gray rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-200 mb-6">iRepair — Login</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>
                <div>
                    <input
                        id="senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Senha"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                </div>

                {erro && (
                    <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                        {erro}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
        </div>
    )
}