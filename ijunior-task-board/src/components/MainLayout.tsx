import { Outlet, Link } from "react-router";

export const MainLayout = () => {
    return (
        <div>
            <header>
                <h1 className="bg-zinc-800 text-white p-4">iRepair</h1>
                <nav>
                    <Link to="/">Dashboard</Link>
                    <Link to="/clients">Clientes</Link>
                </nav>
            </header>
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    )
}