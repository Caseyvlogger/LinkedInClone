import axios from 'axios';
import { message } from 'antd';

const axiosInstance = axios.create({
    baseURL: import.meta.env.REACT_APP_API_URL || 'http://localhost:3000/v1',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("INTERCEPTOR HIT!");
        console.log("Status Code:", error.response?.status);
        //server sent response but some error happened.
        if (error.response) {
            if (error.response?.status === 401) {
                if (window.location.pathname !== '/signin') {
                    localStorage.clear();
                    window.location.href = '/signin';
                }
            }
        }
        //server off or no internet.
        if (error.request) {
            console.error("Server unreachable.")
            message.error("Server down.")
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;