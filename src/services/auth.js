import api from './api';

const expires = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds

// API call to login
const login = async (credentials) => {
    try {
        const response = await api.post('/login', credentials);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// API call to registerPatient
const registerPatient = async (credentials) => {
    try {
        const response = await api.post('/patient/register', credentials);
        console.log(response.data);
        document.cookie = `token=${response.token}; expires=${expires.toUTCString()};`;
        return response.data;
    } catch (error) {
        console.error('Error registring:', error);
        throw error;
    }
};

// API call to registerDoctor
const registerDoctor = async (credentials) => {
    try {
        const response = await api.post('/doctor/register', credentials);
        console.log(response.data);
        document.cookie = `token=${response.token}; expires=${expires.toUTCString()};`;
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
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
};

export {
    login,
    registerPatient,
    registerDoctor,
    logout
}

