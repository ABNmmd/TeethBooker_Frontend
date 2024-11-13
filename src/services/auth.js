import api from './api';

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

