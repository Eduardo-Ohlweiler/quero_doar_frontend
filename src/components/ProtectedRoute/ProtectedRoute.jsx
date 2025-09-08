import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Componente para proteger rotas que exigem autenticação
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes filhos a serem renderizados se autenticado
 * @returns {React.ReactElement} Componente protegido ou redirecionamento
 */
export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

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

    // Redireciona para login se não autenticado
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Renderiza componentes filhos se autenticado
    return children;
}