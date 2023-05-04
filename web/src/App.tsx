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

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Register/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/profile/:id" element={<Profile/>}/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App