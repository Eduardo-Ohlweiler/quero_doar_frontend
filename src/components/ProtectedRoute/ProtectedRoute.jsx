import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Componente para proteger rotas que exigem autenticação
 * Pode ser usado como:
 *  - <Route element={<ProtectedRoute/>}><Route path="..." element={<Comp/>} /></Route>
 *  - <Route path="/x" element={<ProtectedRoute><Comp/></ProtectedRoute>} />
 */
export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Mostra loading enquanto verifica autenticação
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div>Verificando autenticação...</div>
            </div>
        );
    }

    // Redireciona para login se não autenticado, preservando origem via fromTo
    if (!isAuthenticated) {
        const fromTo = encodeURIComponent(location.pathname + location.search);
        return <Navigate to={`/login?fromTo=${fromTo}`} replace />;
    }

    // Se foram passados children (ex: element={<ProtectedRoute><Comp/></ProtectedRoute>}) renderiza-os.
    // Caso contrário, usado como element para rotas aninhadas, renderiza <Outlet />.
    return children ?? <Outlet />;
}