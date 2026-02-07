import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken')
    {/* to replace stack with signin to not let user go back to /feed page which also redireccts to /signin*/ }
    return token ? children : <Navigate to="/signin" replace />
}

export default PrivateRoute