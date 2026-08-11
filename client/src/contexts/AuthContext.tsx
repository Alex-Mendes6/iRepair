import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { api } from "../services/api";

interface Usuario {
    id: number,
    email: string,
}

interface AuthContextType {
    user: Usuario | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    login: (email: string, senha: string) => Promise<void>,
    logout: () => Promise<void>,
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: {children: ReactNode}) {
    const [user, setUser] = useState<Usuario | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Recupera a sessao existente ao recarregar a pagina (quando o cookie ainda e valido)
    useEffect(() => {
        if (window.location.pathname === '/login') {
            setIsLoading(false);
            return;
        }
        api.get('/auth/me')
            .then(res => setUser(res.data.Usuario))
            .catch(() => setUser(null))
            .finally(() => setIsLoading(false))
    }, []);

    async function login(email: string, senha: string) {
        const response = await api.post('/auth/login', { email, senha });
        setUser(response.data.Usuario);
    }

    async function logout() {
        await api.post('/auth/logout');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: user !== null,
            isLoading,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    return context;
}