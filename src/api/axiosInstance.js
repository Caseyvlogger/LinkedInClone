import axios from 'axios';

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

        if (error.response?.status === 401) {
            console.log("401 detected. Path is:", window.location.pathname);
            if (window.location.pathname !== '/signin') {
                console.log("Redirecting now...");
                localStorage.clear();
                window.location.href = '/signin';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;