import api from './api';

// API call to login
const login = async (credentials) => {
    try {
        const response = await api.post('/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// API call to register
const registerPatient = async (credentials) => {
    try {
        const response = await api.post('/patient/register', credentials);
        return response.data;
    } catch (error) {
        console.error('Error registring:', error);
        throw error;
    }
};

const registerDoctor = async (credentials) => {
    try {
        const response = await api.post('/doctor/register', credentials);
        return response.data;
    } catch (error) {
        console.error('Error registring:', error);
        throw error;
    }
};

// API call to logout
const logout = async () => {
    try {
        const response = await api.post('/logout');
        return response.data;
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
};

