//TODO: ADICIONAR FOOTER, na sua variante minima, FUTURAMENTE QUANDO IMPLEMENTADO
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export default function MinimalMainLayout() {
    return (
        <>
            <Header className="fixed top-0 z-60" showSearchBar={false} showLoginButton={false} /> {/* header em variante minimal para login */}
            <main>
                <Outlet />
            </main>
            {/* <Footer /> Adicionar footer quando implementado */}
        </>
    );
}