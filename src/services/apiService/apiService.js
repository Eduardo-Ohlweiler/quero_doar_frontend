import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL,
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });     
    }

    setAuthToken(token) {
        if (token && typeof token === 'string') {
            this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete this.api.defaults.headers.common['Authorization'];
        }
    }

    clearAuthToken() {
        delete this.api.defaults.headers.common['Authorization'];
    }

    getAuthToken() {
        const authHeader = this.api.defaults.headers.common['Authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.substring(7);
        }
        return null;
    }

    async get(url, config = {}) {
        const response = await this.api.get(url, config);
        return response.data;
    }

    async post(url, data = {}, config = {}) {
        if (data instanceof FormData) {
            config.headers = {
                ...config.headers,
                'Content-Type': 'multipart/form-data',
            };
        }
        const response = await this.api.post(url, data, config);
        return response.data;
    }

    async put(url, data = {}, config = {}) {
        if (data instanceof FormData) {
            config.headers = {
                ...config.headers,
                'Content-Type': 'multipart/form-data',
            };
        }
        const response = await this.api.put(url, data, config);
        return response.data;
    }

    async patch(url, data = {}, config = {}) {
        if (data instanceof FormData) {
            config.headers = {
                ...config.headers,
                'Content-Type': 'multipart/form-data',
            };
        }
        const response = await this.api.patch(url, data, config);
        return response.data;
    }

    async delete(url, config = {}) {
        const response = await this.api.delete(url, config);
        return response.data;
    }
}

const apiService = new ApiService();
export default apiService;
