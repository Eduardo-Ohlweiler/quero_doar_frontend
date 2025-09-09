import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext.jsx';
import authService from '../services/auth/authService.js';

// Mock do authService
vi.mock('../services/auth/authService.js', () => ({
    default: {
        login: vi.fn(),
        logout: vi.fn(),
        isUserAuthenticated: vi.fn(),
        initialize: vi.fn().mockResolvedValue(),
        refreshCurrentUser: vi.fn().mockResolvedValue(null),
        currentUser: null
    }
}));

// Componente de teste para consumir o contexto
const TestComponent = () => {
    const { user, isAuthenticated, loading, login, logout, refreshUser } = useAuth();
    
    return (
        <div>
            <div data-testid="user">{user ? JSON.stringify(user) : 'null'}</div>
            <div data-testid="isAuthenticated">{String(isAuthenticated)}</div>
            <div data-testid="loading">{String(loading)}</div>
            <button onClick={() => login({ email: 'test@example.com', password: 'password' })}>
                Login
            </button>
            <button onClick={logout}>Logout</button>
            <button onClick={refreshUser}>Refresh</button>
        </div>
    );
};

// Componente que usa useAuth fora do Provider (para testar erro)
const ComponentWithoutProvider = () => {
    const auth = useAuth();
    return <div>{auth.user}</div>;
};

describe('AuthContext', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Reset do currentUser do authService
        authService.currentUser = null;
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('useAuth Hook', () => {
        it('deve lançar erro quando usado fora do AuthProvider', () => {
            // Mockamos console.error para evitar logs de erro nos testes
            const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
            
            expect(() => {
                render(<ComponentWithoutProvider />);
            }).toThrow('useAuth deve ser usado dentro de um AuthProvider');
            
            consoleError.mockRestore();
        });
    });

    describe('AuthProvider', () => {
        it('CT1: Inicializar a aplicação com usuário autenticado e validar que o contexto contém os dados corretos', async () => {
            // Arrange
            const mockUser = {
                userId: 1,
                name: 'Test User',
                email: 'test@example.com',
                isValid: true
            };

            authService.isUserAuthenticated.mockReturnValue(true);
            authService.currentUser = mockUser;

            // Act
            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );

            // Assert
            await waitFor(() => {
                expect(screen.getByTestId('loading')).toHaveTextContent('false');
            });

            expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser));
            expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
            expect(authService.isUserAuthenticated).toHaveBeenCalled();
        });

        it('CT2: Inicializar a aplicação sem usuário autenticado e validar que o contexto reflete isAuthenticated = false', async () => {
            // Arrange
            authService.isUserAuthenticated.mockReturnValue(false);
            authService.currentUser = null;

            // Act
            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );

            // Assert
            await waitFor(() => {
                expect(screen.getByTestId('loading')).toHaveTextContent('false');
            });

            expect(screen.getByTestId('user')).toHaveTextContent('null');
            expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
            expect(authService.isUserAuthenticated).toHaveBeenCalled();
        });

        it('CT3: Executar login e validar que o contexto é atualizado com os dados do usuário', async () => {
            // Arrange
            const mockUser = {
                userId: 1,
                name: 'Test User',
                email: 'test@example.com',
                isValid: true
            };

            authService.isUserAuthenticated.mockReturnValue(false);
            authService.login.mockResolvedValue(mockUser);

            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );

            // Aguarda inicialização
            await waitFor(() => {
                expect(screen.getByTestId('loading')).toHaveTextContent('false');
            });

            // Act - Clica no botão de login
            await act(async () => {
                screen.getByText('Login').click();
            });

            // Assert
            await waitFor(() => {
                expect(screen.getByTestId('loading')).toHaveTextContent('false');
            });

            expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser));
            expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
            expect(authService.login).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password'
            });
        });

        it('CT4: Executar logout e validar que o contexto é limpo e isAuthenticated = false', async () => {
            // Arrange - Inicia com usuário logado
            const mockUser = {
                userId: 1,
                name: 'Test User',
                email: 'test@example.com',
                isValid: true
            };

            authService.isUserAuthenticated.mockReturnValue(true);
            authService.currentUser = mockUser;

            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );

            // Aguarda inicialização com usuário
            await waitFor(() => {
                expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
            });

            // Act - Clica no botão de logout
            await act(async () => {
                screen.getByText('Logout').click();
            });

            // Assert
            expect(screen.getByTestId('user')).toHaveTextContent('null');
            expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
            expect(authService.logout).toHaveBeenCalled();
        });

        it('CT5: Consumir o contexto em um componente e validar que os dados do usuário são exibidos corretamente', async () => {
            // Arrange
            const mockUser = {
                userId: 1,
                name: 'João Silva',
                email: 'joao@example.com',
                isValid: true
            };

            authService.isUserAuthenticated.mockReturnValue(true);
            authService.currentUser = mockUser;

            // Componente que consome o contexto
            const UserDisplay = () => {
                const { user, isAuthenticated } = useAuth();
                
                if (!isAuthenticated) {
                    return <div data-testid="not-authenticated">Não autenticado</div>;
                }
                
                return (
                    <div data-testid="user-display">
                        <h1>Bem-vindo, {user.name}!</h1>
                        <p>Email: {user.email}</p>
                        <p>ID: {user.userId}</p>
                    </div>
                );
            };

            // Act
            render(
                <AuthProvider>
                    <UserDisplay />
                </AuthProvider>
            );

            // Assert
            await waitFor(() => {
                expect(screen.getByTestId('user-display')).toBeInTheDocument();
            });

            expect(screen.getByText('Bem-vindo, João Silva!')).toBeInTheDocument();
            expect(screen.getByText('Email: joao@example.com')).toBeInTheDocument();
            expect(screen.getByText('ID: 1')).toBeInTheDocument();
        });

        it('deve tratar erro durante login corretamente', async () => {
            // Arrange
            authService.isUserAuthenticated.mockReturnValue(false);
            authService.login.mockRejectedValue(new Error('Credenciais inválidas'));

            const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

            // Componente modificado para tratar erros de login
            const TestComponentWithErrorHandling = () => {
                const { user, isAuthenticated, loading, login, logout, refreshUser } = useAuth();
                const [loginError, setLoginError] = useState(null);
                
                const handleLogin = async () => {
                    try {
                        await login({ email: 'test@example.com', password: 'password' });
                    } catch (error) {
                        setLoginError(error.message);
                    }
                };
                
                return (
                    <div>
                        <div data-testid="user">{user ? JSON.stringify(user) : 'null'}</div>
                        <div data-testid="isAuthenticated">{String(isAuthenticated)}</div>
                        <div data-testid="loading">{String(loading)}</div>
                        <div data-testid="loginError">{loginError || 'null'}</div>
                        <button onClick={handleLogin}>Login</button>
                        <button onClick={logout}>Logout</button>
                        <button onClick={refreshUser}>Refresh</button>
                    </div>
                );
            };

            render(
                <AuthProvider>
                    <TestComponentWithErrorHandling />
                </AuthProvider>
            );

            // Aguarda inicialização
            await waitFor(() => {
                expect(screen.getByTestId('loading')).toHaveTextContent('false');
            });

            // Act - Tenta fazer login com erro
            await act(async () => {
                screen.getByText('Login').click();
            });

            // Assert
            await waitFor(() => {
                expect(screen.getByTestId('loading')).toHaveTextContent('false');
            });

            expect(screen.getByTestId('user')).toHaveTextContent('null');
            expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
            expect(screen.getByTestId('loginError')).toHaveTextContent('Credenciais inválidas');

            consoleError.mockRestore();
        });

        it('deve atualizar dados do usuário com refreshUser', async () => {
            // Arrange
            const mockUser = {
                userId: 1,
                name: 'Test User',
                email: 'test@example.com',
                isValid: true
            };

            authService.isUserAuthenticated.mockReturnValue(false);
            authService.currentUser = null;

            render(
                <AuthProvider>
                    <TestComponent />
                </AuthProvider>
            );

            // Aguarda inicialização
            await waitFor(() => {
                expect(screen.getByTestId('loading')).toHaveTextContent('false');
            });

            // Simula que o usuário foi autenticado externamente
            authService.isUserAuthenticated.mockReturnValue(true);
            authService.currentUser = mockUser;
            // Mocka refreshCurrentUser para retornar o usuário ao ser chamado
            authService.refreshCurrentUser.mockResolvedValue(mockUser);

            // Act - Chama refreshUser
            await act(async () => {
                screen.getByText('Refresh').click();
            });

            // Assert
            expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser));
            expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
        });
    });
});
