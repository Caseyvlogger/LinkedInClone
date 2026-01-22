import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Profile from "./pages/Profile.jsx"
import Feed from "./pages/Feed.jsx"
import SignUp from "./pages/SignUp.jsx"
import SignIn from "./pages/SignIn.jsx"

function App() {

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Profile />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  )
}

export default App
