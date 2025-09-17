import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import useFromTo from "../../hooks/useFromTo";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

export default function MinimalMainLayout() {
    const { fromTo, goBack } = useFromTo();
    const navigation = useNavigate();
    const handleLogoClick = () => {
        navigation('/');
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header
                className="fixed top-0 left-0 right-0 z-30"
                showSearchBar={false}
                showLoginButton={false}
                onLogoClick={handleLogoClick}
            >
                {fromTo && (
                    <Button onClick={goBack} appearance="secondary">
                        Voltar
                    </Button>
                )}
            </Header>
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer variant="minimal" appearance="gradient" />
        </div>
    );
}