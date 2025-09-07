import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import apiService from './apiService';

describe('ApiService', () => {
    const mockResponse = {
        data: { success: true, message: 'Test data' },
        status: 200,
        statusText: 'OK',
    };

    let mockApiInstance;
    let originalApiInstance;

    beforeEach(() => {
        // Guardar instância original e substituir por mock para evitar chamadas de rede
        originalApiInstance = apiService.getAxiosInstance();

        // Mock da instância do axios
        mockApiInstance = {
            get: vi.fn().mockResolvedValue(mockResponse),
            post: vi.fn().mockResolvedValue(mockResponse),
            put: vi.fn().mockResolvedValue(mockResponse),
            patch: vi.fn().mockResolvedValue(mockResponse),
            delete: vi.fn().mockResolvedValue(mockResponse),
            defaults: {
                headers: {
                    common: {
                        'Authorization': undefined
                    }
                },
                baseURL: 'http://localhost:3000/api',
                withCredentials: true,
            },
        };

        // Substituir a instância real pela mock
        apiService.api = mockApiInstance;
    });

    afterEach(() => {
        // Restaurar instância original e limpar mocks
        apiService.api = originalApiInstance;
        vi.restoreAllMocks();
        vi.clearAllMocks();
    });

    describe('Configuração da instância do axios', () => {
        it('CT4: deve configurar baseURL e headers padrão corretamente', () => {
            const instance = apiService.getAxiosInstance();
            expect(instance.defaults.baseURL).toBe('http://localhost:3000/api');
            expect(instance.defaults.withCredentials).toBe(true);
        });
    });

    describe('Métodos HTTP', () => {
        it('CT1: deve chamar get e retornar response.data corretamente', async () => {
            const result = await apiService.get('/test-endpoint');
            expect(mockApiInstance.get).toHaveBeenCalledWith('/test-endpoint', {});
            expect(result).toEqual(mockResponse.data);
        });

        it('CT2: deve chamar post e retornar response.data corretamente', async () => {
            const data = { name: 'Test' };
            const result = await apiService.post('/test-endpoint', data);
            expect(mockApiInstance.post).toHaveBeenCalledWith('/test-endpoint', data, {});
            expect(result).toEqual(mockResponse.data);
        });

        it('CT3: deve chamar put, patch e delete e validar funcionamento', async () => {
            const data = { name: 'Updated Test' };

            const putResult = await apiService.put('/test-endpoint', data);
            expect(mockApiInstance.put).toHaveBeenCalledWith('/test-endpoint', data, {});
            expect(putResult).toEqual(mockResponse.data);

            const patchResult = await apiService.patch('/test-endpoint', data);
            expect(mockApiInstance.patch).toHaveBeenCalledWith('/test-endpoint', data, {});
            expect(patchResult).toEqual(mockResponse.data);

            const deleteResult = await apiService.delete('/test-endpoint');
            expect(mockApiInstance.delete).toHaveBeenCalledWith('/test-endpoint', {});
            expect(deleteResult).toEqual(mockResponse.data);
        });

        it('CT5: deve propagar erro do backend para o chamador', async () => {
            const mockError = new Error('Backend error');
            mockApiInstance.get.mockRejectedValueOnce(mockError);

            await expect(apiService.get('/error-endpoint')).rejects.toThrow('Backend error');
        });
    });
});
