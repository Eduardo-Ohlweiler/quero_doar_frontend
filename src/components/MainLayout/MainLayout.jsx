//TODO: ADICIONAR UM CONTEXT PARA GERENCIAR A PESQUISA NO HEADER 

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useAuth } from "../../context/AuthContext";
import { user as userMenuUser } from "../UserMenu/UserMenu";

export default function MainLayout() {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const origin = encodeURIComponent(useLocation().pathname + useLocation().search);
    const handleLogin = () => {
        navigate('/login?fromTo=' + origin);
    }
    const handleLogoClick = () => {
        navigate('/');
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header
                className="fixed top-0 left-0 right-0 z-30"
                showSearchBar={true}
                showLoginButton={true}
                onLogin={handleLogin}
                isAuthenticated={isAuthenticated}
                user={userMenuUser.fromVUser(user)}
                onLogoClick={handleLogoClick}
            />
            <main className={`flex-1`}>
                <Outlet />
            </main>
            <Footer variant="full" appearance="gradient" />
            {/* Fake Footer */}
            {/* <div className="h-14 bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">© 2024 Quero Doar. Todos os direitos reservados.</p>
            </div> */}
            {/* <Footer /> */}
        </div>
    );
}
