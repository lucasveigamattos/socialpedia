import {Typography, useTheme} from "@mui/material"
import {CustomThemeInterface} from "../../theme"

function AdWidget() {
    const theme: CustomThemeInterface = useTheme()
    const dark = theme.pallete.neutral.dark
    const main = theme.pallete.neutral.main
    const medium = theme.pallete.neutral.medium

    return (
        <div className="rounded-[1.2rem] pt-[2.4rem] px-[2.4rem] pb-[1.2rem]" style={{backgroundColor: theme.pallete.background.alternative}}>
            <div className="flex justify-between items-center">
                <Typography color={dark} variant="h5" fontWeight="500">Sponsored</Typography>
                <Typography color={medium}>Create Ad</Typography>
            </div>
            <img src="http://localhost:3000/assets/info4.jpg" width="100%" height="auto" alt="Advertisement" className="my-[1.2rem] rounded-[1.2rem]"/>
            <div className="flex justify-between items-center">
                <Typography color={main}>StarShip</Typography>
                <Typography color={medium}>spacex.com</Typography>
            </div>
            <Typography color={medium} m="0.8rem 0">The spacecraft of the future!</Typography>
            <div className="my-[3.2rem]"></div>
        </div>
    )
}

export default AdWidget