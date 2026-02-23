import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home.jsx"
import Profile from "./pages/Profile.jsx"
import Feed from "./pages/Feed.jsx"
import SignUp from "./pages/SignUp.jsx"
import SignIn from "./pages/SignIn.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"
import PublicRoute from "./components/PublicRoute.jsx"
import Network from "./pages/Network.jsx"

function App() {

  return (
    <Routes>
      <Route path="/home" element={<Home />} />

      {/* For logged out users only. */}
      {/* Outlet in PublicRoute shows either SignIn or Up. */}
      <Route element={<PublicRoute />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>

      {/* For logged in users only */}
      <Route path='/' element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      } />

      <Route path='/feed' element={
        <PrivateRoute>
          <Feed />
        </PrivateRoute>
      } />

      <Route path='/network' element={
        <PrivateRoute>
          <Network />
        </PrivateRoute>
      } />

      <Route path="/*" element={<p>Not found</p>} />
    </Routes>
  )
}

export default App
