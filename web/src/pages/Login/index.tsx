import {Typography, useTheme, useMediaQuery} from "@mui/material"

import LoginForm from "../../components/LoginForm"

import { CustomThemeInterface } from "../../theme"

function Login() {
    const theme: CustomThemeInterface = useTheme()
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")

    return (
        <div className="h-full" style={{backgroundColor: theme.pallete.background.default}}>
            <nav className="text-center py-[1.6rem] px-[6%]" style={{backgroundColor: theme.pallete.background.alternative}}>
                <Typography fontWeight="bold" fontSize="3.2rem" color="primary" className="cursor-pointer hover:opacity-75 duration-[300ms]">Socialpedia</Typography>
            </nav>

            <div className="p-[3.2rem] rounded-[2.4rem] my-[3.2rem] mx-auto" style={{width: isNonMobileScreen ? "50%" : "93%", backgroundColor: theme.pallete.background.alternative}}>
                <Typography fontWeight="500" variant="h5" sx={{mb: "2.4rem"}}>Welcome to Socialpedia, the social media for you!</Typography>
                <LoginForm/>
            </div>
        </div>
    )
}

export default Login