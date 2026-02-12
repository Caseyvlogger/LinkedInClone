import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const token = localStorage.getItem('accessToken')
    //If signed in, show /feed, else show other
    return token ? <Navigate to='/feed' replace /> : <Outlet />
}

export default PublicRoute;