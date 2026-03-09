import axios from 'axios';
import { message } from 'antd';

const axiosInstance = axios.create({
    baseURL: import.meta.env.REACT_APP_API_URL || 'http://localhost:3000/v1',
    timeout: 60000,
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
        if (error.response) {
            const { status, data } = error.response;

            if (status === 401 && window.location.pathname !== '/signin') {
                localStorage.clear();
                window.location.href = '/signin';
                return Promise.reject(error)
            }
            if (status !== 404) {
                message.error(data?.message || "An error occurred");
            }
        }

        else if (error.request) {
            console.error("No response received from server.");
            message.error({
                content: "Network Error: Server unreachable.",
                key: 'network_error_key'
            });
        }
        else {
            message.error({
                content: "Request Error: " + error.message,
                key: 'request_error_key'
            });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;