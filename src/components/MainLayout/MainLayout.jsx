//TODO: ADICIONAR FOOTER FUTURAMENTE QUANDO IMPLEMENTADO
//TODO: ADICIONAR UM CONTEXT PARA GERENCIAR A PESQUISA NO HEADER 

import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header/Header";

export default function MainLayout() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header
                className="fixed top-0 left-0 right-0 z-60"
                showSearchBar={true}
                showLoginButton={true}
                onLogin={handleLogin}
            />
            <main className={`flex-1`}>
                <Outlet />
            </main>
            {/* Fake Footer */}
            <div className="h-14 bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">© 2024 Quero Doar. Todos os direitos reservados.</p>
            </div>
            {/* <Footer /> */}
        </div>
    );
}
