import axiosInstance from "../api/axiosInstance";

const testConnection = async () => {
    const response = await axiosInstance.get('/feed')
    return response.data;
}

const registerUser = async (userData) => {
    const response = await axiosInstance.post('/register', userData)
    return response.data;
}

const loginUser = async (credentials) => {
    const response = await axiosInstance.post('/login', credentials)
    return response.data;
}

export { testConnection, registerUser, loginUser }