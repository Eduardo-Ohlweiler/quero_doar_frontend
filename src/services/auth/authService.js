import apiService from '../apiService/apiService.js';
import userService from '../user/userService.js';
import LoginDTO from './dto/loginDto.js';

const AUTH_LOGIN_ROUTE = import.meta.env.VITE_POST_AUTH_LOGIN_ROUTE || '/auth/login';
const AUTH_TOKEN_STORAGE_KEY = import.meta.env.VITE_AUTH_TOKEN_STORAGE_KEY || 'authToken';

class AuthService {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.initialized = false;
        this.#initializeFromStorage();
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

        this.initialized = true;
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

            //Pega o usuário atual no backend
            const user = await userService.GetUserViewSearch(null, credentials.email);
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
}

const authService = new AuthService();
export default authService;
