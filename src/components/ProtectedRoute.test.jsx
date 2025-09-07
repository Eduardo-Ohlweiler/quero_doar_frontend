import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import { AuthProvider, useAuth } from '../context/AuthContext.jsx';

// Mock do authService
vi.mock('../services/auth/authService.js', () => ({
    default: {
        login: vi.fn(),
        logout: vi.fn(),
        isUserAuthenticated: vi.fn(),
        currentUser: null
    }
}));

// Mock do useAuth para controlar os estados nos testes
vi.mock('../context/AuthContext .jsx', async () => {
    const actual = await vi.importActual('../context/AuthContext .jsx');
    return {
        ...actual,
        useAuth: vi.fn()
    };
});

// Componente de teste
const TestComponent = () => <div data-testid="protected-content">Conteúdo Protegido</div>;
const LoginComponent = () => <div data-testid="login-page">Página de Login</div>;

// Helper para renderizar com router
const renderWithRouter = (component, initialEntries = ['/protected']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <Routes>
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/protected" element={component} />
            </Routes>
        </MemoryRouter>
    );
};

describe('ProtectedRoute', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve mostrar loading quando loading é true', () => {
        // Arrange
        useAuth.mockReturnValue({
            isAuthenticated: false,
            loading: true,
            user: null
        });

        // Act
        renderWithRouter(
            <ProtectedRoute>
                <TestComponent />
            </ProtectedRoute>
        );

        // Assert
        expect(screen.getByText('Verificando autenticação...')).toBeInTheDocument();
        expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
        expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
    });

    it('deve redirecionar para login quando usuário não está autenticado', () => {
        // Arrange
        useAuth.mockReturnValue({
            isAuthenticated: false,
            loading: false,
            user: null
        });

        // Act
        renderWithRouter(
            <ProtectedRoute>
                <TestComponent />
            </ProtectedRoute>
        );

        // Assert
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
        expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    });

    it('deve renderizar conteúdo protegido quando usuário está autenticado', () => {
        // Arrange
        const mockUser = {
            userId: 1,
            name: 'Test User',
            email: 'test@example.com'
        };

        useAuth.mockReturnValue({
            isAuthenticated: true,
            loading: false,
            user: mockUser
        });

        // Act
        renderWithRouter(
            <ProtectedRoute>
                <TestComponent />
            </ProtectedRoute>
        );

        // Assert
        expect(screen.getByTestId('protected-content')).toBeInTheDocument();
        expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
    });

    it('deve aguardar carregamento antes de redirecionar', () => {
        // Arrange - Primeiro com loading
        const { rerender } = render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route path="/login" element={<LoginComponent />} />
                    <Route 
                        path="/protected" 
                        element={
                            <ProtectedRoute>
                                <TestComponent />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </MemoryRouter>
        );

        // Mock inicial com loading
        useAuth.mockReturnValue({
            isAuthenticated: false,
            loading: true,
            user: null
        });

        rerender(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route path="/login" element={<LoginComponent />} />
                    <Route 
                        path="/protected" 
                        element={
                            <ProtectedRoute>
                                <TestComponent />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </MemoryRouter>
        );

        // Assert - Deve mostrar loading
        expect(screen.getByText('Verificando autenticação...')).toBeInTheDocument();

        // Act - Termina o loading sem autenticação
        useAuth.mockReturnValue({
            isAuthenticated: false,
            loading: false,
            user: null
        });

        rerender(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route path="/login" element={<LoginComponent />} />
                    <Route 
                        path="/protected" 
                        element={
                            <ProtectedRoute>
                                <TestComponent />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </MemoryRouter>
        );

        // Assert - Deve redirecionar para login
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });

    it('deve aplicar estilos de loading corretamente', () => {
        // Arrange
        useAuth.mockReturnValue({
            isAuthenticated: false,
            loading: true,
            user: null
        });

        // Act
        renderWithRouter(
            <ProtectedRoute>
                <TestComponent />
            </ProtectedRoute>
        );

        // Assert
        const loadingContainer = screen.getByText('Verificando autenticação...').parentElement;
        expect(loadingContainer).toHaveStyle({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        });
    });
});
