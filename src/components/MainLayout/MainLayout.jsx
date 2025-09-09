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
        <>
            <Header className="fixed top-0 z-60" showSearchBar={true} showLoginButton={true} onLogin={handleLogin} /> {/* header em variante default para áreas autenticadas */}
            <main>
                <Outlet />
            </main>
            {/* <Footer /> Adicionar footer quando implementado */}
        </>
    );
}
