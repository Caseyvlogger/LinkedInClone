import axios from 'axios';

const axiosInstance = axios.create({
    // This uses your variable from .env, or falls back to localhost:3000/v1
    baseURL: import.meta.env.REACT_APP_API_URL || 'http://localhost:3000/v1',

    // Wait 5 seconds for the server to respond before timing out
    timeout: 5000,

    // Standard header to tell the server we are sending/expecting JSON
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;