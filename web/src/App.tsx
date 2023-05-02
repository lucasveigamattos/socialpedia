import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"

import "./styles/main.css"
import "./styles/reset.css"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App