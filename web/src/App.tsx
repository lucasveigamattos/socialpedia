import {useMemo} from "react"
import {useSelector} from "react-redux"
import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom"
import {ThemeProvider} from "@mui/material"
import {createTheme} from "@mui/material/styles"

import {themeSettings} from "./theme"

import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Profile from "./pages/Profile"

import "./styles/main.css"
import "./styles/reset.css"

function App() {
  const mode = useSelector((state: any) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector((state: any) => state.token))

  return (
    <div className="h-full">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/signup" element={<Register/>}/>
            <Route path="/home" element={isAuth ? <Home/> : <Navigate to="/"/>}/>
            <Route path="/profile/:id" element={isAuth ? <Profile/> : <Navigate to="/"/>}/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App