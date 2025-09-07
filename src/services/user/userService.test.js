import { describe, test, expect, vi, beforeEach } from 'vitest';
import userService from './userService.js';
import apiService from '../apiService/apiService.js';
import VUser from './view/vUser.js';

// Mock apiService
vi.mock('../apiService/apiService.js', () => ({
    default: {
        get: vi.fn()
    }
}));

// Mock VUser
vi.mock('./view/vUser.js', () => ({
    default: {
        fromJson: vi.fn()
    }
}));

// Mock stringUtil
vi.mock('../util/stringUtil.js', () => ({
    buildLink: vi.fn((segments, params) => {
        const basePath = segments.join('/');
        if (params && Object.keys(params).length > 0) {
            const queryString = Object.entries(params)
                .filter(([key, value]) => value !== null && value !== undefined)
                .map(([key, value]) => `${key}=${value}`)
                .join('&');
            return queryString ? `${basePath}?${queryString}` : basePath;
        }
        return basePath;
    })
}));

describe('UserService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('GetUserViewSearch', () => {
        test('CT1: Busca usuário por userId', async () => {
            const mockUserData = { userId: 123, name: 'João' };
            const mockVUser = { userId: 123, name: 'João', isValid: () => true };
            
            apiService.get.mockResolvedValue(mockUserData);
            VUser.fromJson.mockReturnValue(mockVUser);

            const result = await userService.GetUserViewSearch(123);

            expect(apiService.get).toHaveBeenCalledWith('/user/view/search?userId=123');
            expect(VUser.fromJson).toHaveBeenCalledWith(mockUserData);
            expect(result).toBe(mockVUser);
        });

        test('CT2: Busca usuário por email', async () => {
            const mockUserData = { userId: 456, email: 'joao@test.com' };
            const mockVUser = { userId: 456, email: 'joao@test.com', isValid: () => true };
            
            apiService.get.mockResolvedValue(mockUserData);
            VUser.fromJson.mockReturnValue(mockVUser);

            const result = await userService.GetUserViewSearch(null, 'joao@test.com');

            expect(apiService.get).toHaveBeenCalledWith('/user/view/search?email=joao@test.com');
            expect(VUser.fromJson).toHaveBeenCalledWith(mockUserData);
            expect(result).toBe(mockVUser);
        });

        test('CT3: Busca usuário por userId e email', async () => {
            const mockUserData = { userId: 789, email: 'maria@test.com' };
            const mockVUser = { userId: 789, email: 'maria@test.com', isValid: () => true };
            
            apiService.get.mockResolvedValue(mockUserData);
            VUser.fromJson.mockReturnValue(mockVUser);

            const result = await userService.GetUserViewSearch(789, 'maria@test.com');

            expect(apiService.get).toHaveBeenCalledWith('/user/view/search?userId=789&email=maria@test.com');
            expect(VUser.fromJson).toHaveBeenCalledWith(mockUserData);
            expect(result).toBe(mockVUser);
        });

        test('CT4: Rejeita quando nem userId nem email fornecidos', async () => {
            await expect(userService.GetUserViewSearch())
                .rejects
                .toThrow('userId ou email deve ser fornecido');

            expect(apiService.get).not.toHaveBeenCalled();
            expect(VUser.fromJson).not.toHaveBeenCalled();
        });

        test('CT5: Rejeita quando userId e email são null', async () => {
            await expect(userService.GetUserViewSearch(null, null))
                .rejects
                .toThrow('userId ou email deve ser fornecido');

            expect(apiService.get).not.toHaveBeenCalled();
            expect(VUser.fromJson).not.toHaveBeenCalled();
        });
    });

    describe('GetUserPhoto', () => {
        test('CT6: Busca foto com filename definido', async () => {
            const mockImageBlob = new Blob(['fake-image-data'], { type: 'image/webp' });
            
            apiService.get.mockResolvedValue(mockImageBlob);

            const result = await userService.GetUserPhoto('default.webp');

            expect(apiService.get).toHaveBeenCalledWith(
                '/media/user/default.webp',
                { responseType: 'image/webp' }
            );
            expect(result).toBe(mockImageBlob);
        });

        test('CT7: Busca foto sem filename usa default', async () => {
            const mockImageBlob = new Blob(['fake-image-data'], { type: 'image/webp' });
            
            apiService.get.mockResolvedValue(mockImageBlob);

            const result = await userService.GetUserPhoto();

            expect(apiService.get).toHaveBeenCalledWith(
                '/media/user/default.webp',
                { responseType: 'image/webp' }
            );
            expect(result).toBe(mockImageBlob);
        });

        test('CT8: Busca foto com filename null usa default', async () => {
            const mockImageBlob = new Blob(['fake-image-data'], { type: 'image/webp' });
            
            apiService.get.mockResolvedValue(mockImageBlob);

            const result = await userService.GetUserPhoto(null);

            expect(apiService.get).toHaveBeenCalledWith(
                '/media/user/default.webp',
                { responseType: 'image/webp' }
            );
            expect(result).toBe(mockImageBlob);
        });

        test('CT9: Busca foto com filename undefined usa default', async () => {
            const mockImageBlob = new Blob(['fake-image-data'], { type: 'image/webp' });
            
            apiService.get.mockResolvedValue(mockImageBlob);

            const result = await userService.GetUserPhoto(undefined);

            expect(apiService.get).toHaveBeenCalledWith(
                '/media/user/default.webp',
                { responseType: 'image/webp' }
            );
            expect(result).toBe(mockImageBlob);
        });

        test('CT10: Busca foto com filename vazio usa default', async () => {
            const mockImageBlob = new Blob(['fake-image-data'], { type: 'image/webp' });
            
            apiService.get.mockResolvedValue(mockImageBlob);

            const result = await userService.GetUserPhoto('');

            expect(apiService.get).toHaveBeenCalledWith(
                '/media/user/default.webp',
                { responseType: 'image/webp' }
            );
            expect(result).toBe(mockImageBlob);
        });
    });
});
