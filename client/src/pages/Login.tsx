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
        <div>
            <h1>iRepair — Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required/>
                <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" required/>
                {erro && <p style={{ color: 'red'}}>{erro}</p>}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
        </div>
    )
}