import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export function Login() {
    const [emailLogin, setEmailLogin] = useState('');
    const [senhaLogin, setSenhaLogin] = useState('');
    const [emailRegister, setEmailRegister] = useState('');
    const [senhaRegister, setSenhaRegister] = useState('');
    const [errorLogin, setErrorLogin] = useState<string | null>(null);
    const [errorRegister, setErrorRegister] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { login, register } = useAuth();
    const navigate = useNavigate();

    async function handleLogin(e: FormEvent) {
        e.preventDefault();
        setErrorLogin(null);
        setIsLoading(true);

        try {
            await login(emailLogin, senhaLogin);
            navigate('/');
        } catch (err: unknown) {
            setErrorLogin(err instanceof Error ? err.message : 'Erro ao fazer login.');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleRegister(e: FormEvent) {
        e.preventDefault();
        setErrorRegister(null);
        setIsLoading(true);

        try { 
            await register(emailRegister, senhaRegister);
            alert("Usuário registrado com sucesso!");
            setEmailRegister('');
            setSenhaRegister('');
        } catch (err: unknown) {
            setErrorRegister(err instanceof Error ? err.message : 'Erro ao fazer registro.');
            setEmailRegister('');
            setSenhaRegister('');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-gray rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-200 mb-6">iRepair — Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <input
                        id="emailLogin"
                        type="email"
                        value={emailLogin}
                        onChange={(e) => setEmailLogin(e.target.value)}
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"/>
                </div>
                <div>
                    <input
                        id="senhaLogin"
                        type="password"
                        value={senhaLogin}
                        onChange={(e) => setSenhaLogin(e.target.value)}
                        placeholder="Senha"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"/>
                </div>
                {errorLogin && (
                    <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                        {errorLogin}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
            <h1 className="text-2xl font-bold text-center text-gray-200 mb-6">Registro de Usuário</h1>
            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <input
                        id="emailRegister"
                        type="email"
                        value={emailRegister}
                        onChange={(e) => setEmailRegister(e.target.value)}
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"/>
                </div>
                <div>
                    <input
                        id="senhaRegister"
                        type="password"
                        value={senhaRegister}
                        onChange={(e) => setSenhaRegister(e.target.value)}
                        placeholder="Senha"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"/>
                </div>
                {errorRegister && (
                    <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                        {errorRegister}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? 'Registrando...' : 'Registrar'}
                </button>
            </form>
        </div>
    )
}