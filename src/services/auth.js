import api from './api';

const expires = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds

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

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

// API call to logout
const logout = async () => {
    try {
        const token = getCookie("token");
        
        if (!token) {
            throw new Error('No token found');
        }
        
        const response = await api.post(`/logout`,null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure`;
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

