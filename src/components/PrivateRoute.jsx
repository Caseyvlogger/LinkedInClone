import { Spin } from 'antd'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth)
    // const token = localStorage.getItem('accessToken')
    if (loading) return <Spin></Spin>
    {/* to replace stack with signin to not let user go back to /feed page which also redireccts to /signin*/ }
    return isAuthenticated ? children : <Navigate to="/signin" replace />
}

export default PrivateRoute