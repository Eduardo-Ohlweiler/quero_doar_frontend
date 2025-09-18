// TODO:2025-09-17:KSG Rever o nome auth, acredito que o ideal seria algo como IAM (Identity and Access Management) ou similar, tanto no frontend quanto no backend

import apiService from '../apiService/apiService.js';
import userService from '../user/userService.js';
import LoginDTO from './dto/loginDto.js';
import RegisterDTO from './dto/registerDTO.js';

const AUTH_LOGIN_ROUTE = import.meta.env.VITE_POST_AUTH_LOGIN_ROUTE || '/auth/login';
const AUTH_TOKEN_STORAGE_KEY = import.meta.env.VITE_AUTH_TOKEN_STORAGE_KEY || 'authToken';
const AUTH_REGISTER_USER_ROUTE = import.meta.env.VITE_POST_AUTH_USER_CREATE_ROUTE || '/auth/user/create';
const AUTH_VERIFY_ACCOUNT_ROUTE = import.meta.env.VITE_POST_AUTH_VERIFY_ACCOUNT_ROUTE || '/auth/user/verification';
const RESEND_VERIFICATION_ROUTE = import.meta.env.VITE_POST_AUTH_RESEND_VERIFICATION_ROUTE || '/auth/user/resend-verification';
const AUTH_REQUEST_RESET_PASSWORD_ROUTE = import.meta.env.VITE_POST_AUTH_REQUEST_RESET_PASSWORD_ROUTE || '/api/auth/user/request-reset-password';
const AUTH_RESET_PASSWORD_ROUTE = import.meta.env.VITE_POST_AUTH_RESET_PASSWORD_ROUTE || '/api/auth/user/reset-password';

class AuthService {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.initialized = false;
    }

    /**
     * Inicializa o serviço (carrega token do storage se existir e válido)
     * @returns {Promise<void>}
     */
    async initialize() {
        if (!this.initialized) {
            await this.#initializeFromStorage();
        }

        this.initialized = true;
    }

    /**
     * Inicializa o serviço verificando se há token armazenado e valida o token
     * @private
     */
    async #initializeFromStorage() {
        if (this.#isAccessTokenValid()) {
            const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
            apiService.setAuthToken(token);
            this.isAuthenticated = true;
            this.currentUser = await this.#getCurrentUser();
        }
    }

    /**
     * Armazena o token de forma segura
     * @private
     * @param {string} token 
     */
    #storeToken(token) {
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
        apiService.setAuthToken(token);
        this.isAuthenticated = true;
    }

    /**
     * Remove o token armazenado
     * @private
     */
    #clearToken() {
        localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
        apiService.clearAuthToken();
        this.isAuthenticated = false;
        this.currentUser = null;
    }

    /**
     * Autentica o usuário na API e armazena o token/sessão
     * @param {Object} credentials - Credenciais do usuário {email, password}
     * @returns {Promise<VUser>} Dados do usuário autenticado
     */
    async login(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
            throw new Error('Email e senha são obrigatórios');
        }

        try {
            const loginDto = new LoginDTO(credentials.email, credentials.password);
            const token = await apiService.post(AUTH_LOGIN_ROUTE, loginDto);

            if (!token || typeof token !== 'string') {
                console.error('Token inválido recebido do servidor:', token);
                throw new Error('Token inválido recebido do servidor');
            }

            this.#storeToken(token);

            const user = await userService.GetUserViewSearch(null, credentials.email);
            this.currentUser = user; // Atualiza o currentUser

            return user;
        } catch (error) {
            this.#clearToken();
            throw error;
        }
    }

    async register(userData) {
        if (!userData || !userData.email || !userData.password || !userData.name) {
            throw new Error('Nome, e-mail e senha são obrigatórios');
        }

        try {
            const registerDto = new RegisterDTO(userData.name, userData.email, userData.password);
            await apiService.post(AUTH_REGISTER_USER_ROUTE, registerDto);
        } catch (error) {
            throw error;
        }
    }

    async validAccountVerificationToken(token) {
        if (!token) {
            throw new Error('Token é obrigatório');
        }

        try {
            await apiService.post(AUTH_VERIFY_ACCOUNT_ROUTE, { token });
        } catch (error) {
            throw error;
        }
    }

    async resendVerificationEmail(email) {
        if (!email) {
            throw new Error('Email é obrigatório');
        }

        try {
            await apiService.post(RESEND_VERIFICATION_ROUTE, { email });
        } catch (error) {
            throw error;
        }
    }

    async requestPasswordReset(email) {
        if (!email) {
            throw new Error('Email é obrigatório');
        }
        try {
            await apiService.post(AUTH_REQUEST_RESET_PASSWORD_ROUTE, { email });
        } catch (error) {
            throw error;
        }
    }

    async resetPassword(token, newPassword) {
        if (!token || !newPassword) {
            throw new Error('Token e nova senha são obrigatórios');
        }
        try {
            await apiService.post(AUTH_RESET_PASSWORD_ROUTE, { token, newPassword });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Encerra a sessão do usuário (limpar token/sessão)
     */
    logout() {
        this.#clearToken();
    }

    /**
     * Busca os dados do usuário logado na API
     * @returns {Promise<VUser|null>} Dados do usuário ou null se não autenticado
     */
    async #getCurrentUser() {
        if (!this.isAuthenticated) {
            return null;
        }

        try {
            // Se já temos o usuário em cache, retornar
            if (this.currentUser) {
                return this.currentUser;
            }

            // Se não temos usuário em cache, mas temos token, tentar buscar
            const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
            if (!token) {
                this.#clearToken();
                return null;
            }

            // Pegar sub do token jwt
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.sub;

            //Pega o usuário atual no backend
            const user = await userService.GetUserViewSearch(userId, null);
            this.currentUser = user;

            return this.currentUser;
        } catch (error) {
            
            this.#clearToken();
            throw new Error('Sessão expirada ou inválida');
        }
    }

    /**
     * Verifica se o usuário está autenticado
     * @returns {boolean}
     */
    isUserAuthenticated() {
        return this.isAuthenticated && !!localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    }

    /**
     * Obtém o token atual
     * @returns {string|null}
     */
    getToken() {
        return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    }

    /**
     * Verifica se o token atual é válido (existe e não expirou)
     * @returns {boolean}
     */
    #isAccessTokenValid() {
        let token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
        if(!token) {
            return false;
        }

        try {
            // Decodifica o payload
            const payload = JSON.parse(atob(token.split('.')[1])); 
            // Pega a data de expiração
            let expDate = payload.exp ? new Date(payload.exp * 1000) : null; 
            // Verifica se expirou
            return expDate ? expDate > new Date() : true;
        } catch (error) {
            console.error('Erro ao decodificar JWT:', error);
            return false;
        }
    }

    /**
     * Atualiza os dados do usuário logado
     * @returns {Promise<VUser|null>}
     */
    async refreshCurrentUser() {
        this.currentUser = await this.#getCurrentUser();
        return this.currentUser;
    }
}

const authService = new AuthService();
export default authService;
