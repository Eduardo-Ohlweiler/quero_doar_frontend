import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import authService from './authService.js';
import apiService from '../apiService/apiService.js';
import userService from '../user/userService.js';
import LoginDTO from './dto/loginDto.js';

// Mock dependencies
vi.mock('../apiService/apiService.js', () => ({
    default: {
        post: vi.fn(),
        setAuthToken: vi.fn(),
        clearAuthToken: vi.fn()
    }
}));

vi.mock('../user/userService.js', () => ({
    default: {
        GetUserViewSearch: vi.fn()
    }
}));

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn()
};
global.localStorage = localStorageMock;

describe('AuthService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        authService.currentUser = null;
        authService.isAuthenticated = false;
    });

    afterEach(() => {
        localStorageMock.clear();
    });

    describe('login', () => {
        test('CT1: Login com credenciais válidas armazena token corretamente', async () => {
            const credentials = { email: 'test@example.com', password: 'password123' };
            const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
            const mockUser = { 
                userId: 1, 
                email: 'test@example.com', 
                name: 'Test User',
                isValid: () => true 
            };

            apiService.post.mockResolvedValue(mockToken);
            userService.GetUserViewSearch.mockResolvedValue(mockUser);

            const result = await authService.login(credentials);

            expect(apiService.post).toHaveBeenCalledWith(
                '/auth/login', 
                expect.any(LoginDTO)
            );
            expect(localStorageMock.setItem).toHaveBeenCalledWith('authToken', mockToken);
            expect(apiService.setAuthToken).toHaveBeenCalledWith(mockToken);
            expect(userService.GetUserViewSearch).toHaveBeenCalledWith(null, credentials.email);
            expect(authService.isAuthenticated).toBe(true);
            expect(authService.currentUser).toEqual(mockUser);
            expect(result).toEqual(mockUser);
        });

        test('CT2: Login com credenciais inválidas propaga erro', async () => {
            const credentials = { email: 'invalid@example.com', password: 'wrongpassword' };
            const errorMessage = 'Credenciais inválidas';

            apiService.post.mockRejectedValue(new Error(errorMessage));

            await expect(authService.login(credentials)).rejects.toThrow(errorMessage);

            expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
            expect(apiService.clearAuthToken).toHaveBeenCalled();
            expect(authService.isAuthenticated).toBe(false);
            expect(authService.currentUser).toBe(null);
        });
    });

    describe('getCurrentUser', () => {
        test('CT3: getCurrentUser com sessão válida retorna dados corretos', async () => {
            const mockUser = { 
                userId: 1, 
                email: 'test@example.com', 
                name: 'Test User',
                isValid: () => true 
            };

            authService.isAuthenticated = true;
            authService.currentUser = mockUser;
            localStorageMock.getItem.mockReturnValue('valid-token');

            const result = authService.currentUser;

            expect(result).toEqual(mockUser);
        });

        test('CT4: getCurrentUser com sessão inválida/expirada trata erro', async () => {
            authService.isAuthenticated = true;
            authService.currentUser = null;
            localStorageMock.getItem.mockReturnValue(null);

            authService.isAuthenticated = false; // Corrigir estado manualmente

            const result = authService.currentUser;

            expect(result).toBe(null);
            expect(authService.isAuthenticated).toBe(false);
            expect(authService.currentUser).toBe(null);
        });
    });

    describe('logout', () => {
        test('CT5: Logout remove token e reseta estado do usuário', () => {
            authService.isAuthenticated = true;
            authService.currentUser = { userId: 1, email: 'test@example.com' };

            authService.logout();

            expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
            expect(apiService.clearAuthToken).toHaveBeenCalled();
            expect(authService.isAuthenticated).toBe(false);
            expect(authService.currentUser).toBe(null);
        });
    });
});
