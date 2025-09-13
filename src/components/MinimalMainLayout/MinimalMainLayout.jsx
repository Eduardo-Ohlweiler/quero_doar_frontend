//TODO: ADICIONAR FOOTER, na sua variante minima, FUTURAMENTE QUANDO IMPLEMENTADO
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export default function MinimalMainLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header
                className="fixed top-0 left-0 right-0 z-30"
                showSearchBar={false}
                showLoginButton={false}
            />
            <main className="flex-1">
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