import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/auth/authService.js";

/**
 * Contexto de autenticação para gerenciar estado global do usuário
 * @typedef {Object} AuthContextType
 * @property {Object|null} user - Dados do usuário logado
 * @property {boolean} isAuthenticated - Estado de autenticação
 * @property {boolean} loading - Estado de carregamento
 * @property {Function} login - Função para realizar login
 * @property {Function} logout - Função para realizar logout
 * @property {Function} refreshUser - Função para atualizar dados do usuário
 */
const AuthContext = createContext();

/**
 * Hook para acessar o contexto de autenticação
 * @returns {AuthContextType} Contexto de autenticação
 * @throws {Error} Se usado fora do AuthProvider
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

/**
 * Provider do contexto de autenticação
 * Gerencia estado global do usuário e integra com authService
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes filhos
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    /**
     * Inicializa o contexto verificando se há usuário logado
     */
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                setLoading(true);
                
                // Verifica se há token válido armazenado
                if (authService.isUserAuthenticated()) {
                    const currentUser = authService.currentUser;
                    if (currentUser) {
                        setUser(currentUser);
                        setIsAuthenticated(true);
                    } else {
                        // Token existe mas usuário não está em cache, tenta buscar
                        await refreshUser();
                    }
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Erro ao inicializar autenticação:', error);
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    /**
     * Realiza login do usuário
     * @param {Object} credentials - Credenciais de login {email, password}
     * @returns {Promise<Object>} Dados do usuário logado
     * @throws {Error} Se o login falhar
     */
    const login = async (credentials) => {
        try {
            setLoading(true);
            const userData = await authService.login(credentials);
            
            setUser(userData);
            setIsAuthenticated(true);
            
            return userData;
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Realiza logout do usuário
     */
    const logout = () => {
        try {
            authService.logout();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            // Mesmo com erro, limpa o estado local
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    /**
     * Atualiza os dados do usuário atual
     * @returns {Promise<Object|null>} Dados atualizados do usuário ou null
     */
    const refreshUser = async () => {
        try {
            if (!authService.isUserAuthenticated()) {
                setUser(null);
                setIsAuthenticated(false);
                return null;
            }

            // Note: authService.getCurrentUser() é privado, então usamos currentUser
            const currentUser = authService.currentUser;
            if (currentUser) {
                setUser(currentUser);
                setIsAuthenticated(true);
                return currentUser;
            } else {
                setUser(null);
                setIsAuthenticated(false);
                return null;
            }
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
            setUser(null);
            setIsAuthenticated(false);
            return null;
        }
    };

    const contextValue = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        refreshUser
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};