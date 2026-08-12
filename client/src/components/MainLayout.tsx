import { Outlet, Link } from "react-router";

export const MainLayout = () => {
    return (
        <div>
            <header className="bg-zinc-800 text-white p-4">
                <h1>iRepair</h1>
                <nav>
                    <Link className="p-3" to="/">Dashboard</Link>
                    <Link className="p-3" to="/clients">Clientes</Link>
                    <Link className="p-3" to="/service-orders">Ordens de Servico</Link>
                </nav>
            </header>
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    )
}