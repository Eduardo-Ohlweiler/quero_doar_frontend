// Exemplo de uso do ApiService

import apiService from './apiService/apiService';

// Exemplos de autenticação

// 1. Definir token de autenticação
const loginUser = async (credentials) => {
    try {
        const loginResponse = await apiService.post('/auth/login', credentials);
        apiService.setAuthToken(loginResponse.token);
        console.log('Login realizado, token definido');
        return loginResponse;
    } catch (error) {
        console.error('Erro no login:', error);
        throw error;
    }
};

// 2. Fazer requisição autenticada
const fetchUserProfile = async () => {
    try {
        const profile = await apiService.get('/user/profile');
        console.log('Perfil do usuário:', profile);
        return profile;
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        throw error;
    }
};

// 3. Logout e remoção do token
const logoutUser = async () => {
    try {
        await apiService.post('/auth/logout');
        apiService.clearAuthToken();
        console.log('Logout realizado, token removido');
    } catch (error) {
        console.error('Erro no logout:', error);
        apiService.clearAuthToken();
        throw error;
    }
};

// 4. Verificar se usuário está autenticado
const isAuthenticated = () => {
    const token = apiService.getAuthToken();
    return token !== null;
};

// 5. Definir token manualmente (ex: token salvo no localStorage)
const restoreAuthFromStorage = () => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
        apiService.setAuthToken(savedToken);
        console.log('Token restaurado do localStorage');
    }
};

// Exemplos de uso das funções individuais

// 6. GET - Buscar dados
const fetchUsers = async () => {
    try {
        const users = await apiService.get('/users');
        console.log('Usuários:', users);
        return users;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
};

// 7. POST - Criar dados (JSON)
const createUser = async (userData) => {
    try {
        const newUser = await apiService.post('/users', userData);
        console.log('Usuário criado:', newUser);
        return newUser;
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
};

// 8. POST - Upload de foto (FormData - multipart/form-data)
const uploadUserPhoto = async (userId, file, coordinates) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('x', coordinates.x);
        formData.append('y', coordinates.y);
        formData.append('width', coordinates.width);
        formData.append('height', coordinates.height);

        const result = await apiService.post('/user/photo', formData);
        console.log('Foto enviada:', result);
        return result;
    } catch (error) {
        console.error('Erro ao enviar foto:', error);
        throw error;
    }
};

// 9. PUT - Atualizar dados completos
const updateUser = async (userId, userData) => {
    try {
        const updatedUser = await apiService.put(`/users/${userId}`, userData);
        console.log('Usuário atualizado:', updatedUser);
        return updatedUser;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }
};

// 10. PATCH - Atualizar dados parciais
const updateUserPartial = async (userId, partialData) => {
    try {
        const updatedUser = await apiService.patch(`/users/${userId}`, partialData);
        console.log('Usuário atualizado parcialmente:', updatedUser);
        return updatedUser;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }
};

// 11. DELETE - Remover dados
const deleteUser = async (userId) => {
    try {
        const result = await apiService.delete(`/users/${userId}`);
        console.log('Usuário removido:', result);
        return result;
    } catch (error) {
        console.error('Erro ao remover usuário:', error);
        throw error;
    }
};

export {
    loginUser,
    fetchUserProfile,
    logoutUser,
    isAuthenticated,
    restoreAuthFromStorage,
    fetchUsers,
    createUser,
    uploadUserPhoto,
    updateUser,
    updateUserPartial,
    deleteUser
};
