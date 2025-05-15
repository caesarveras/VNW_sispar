import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};