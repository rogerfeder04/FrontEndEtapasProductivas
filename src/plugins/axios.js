import axios from 'axios';

const token = localStorage.getItem('token') || '';

const apiClient = axios.create({
    baseURL: 'http://localhost:4600/api',
    // baseURL: 'https://etapasproductivasback.onrender.com/api',
    headers: {
        "token": token 
    }
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
        config.headers['token'] = token; 
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient; 

