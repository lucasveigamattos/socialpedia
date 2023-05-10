import {Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close} from "@mui/icons-material"
import {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {setMode, setLogout} from "../../pages/state"
import {useNavigate} from "react-router-dom"
import {useMediaQuery, useTheme, Typography, InputBase, IconButton, FormControl, Select, MenuItem, Box} from "@mui/material"

import {CustomThemeInterface} from "../../theme"

function Nav() {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state: any) => state.user)
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")
    
    const theme: CustomThemeInterface = useTheme()
    const neutralLight = theme.pallete.neutral.light
    const dark: string = theme.pallete.neutral.dark as string
    const background = theme.pallete.background.default
    const primaryLight = theme.pallete.primary.light
    const alternativeBackground = theme.pallete.background.alternative

    function fullName() {
        return `${user.firstName} ${user.lastName}`
    }

    return (
        <nav className="flex justify-between items-center py-[1.6rem] px-[6%]" style={{backgroundColor: alternativeBackground}}>
            <div className="flex justify-between items-center gap-[2.8rem]">
                <Typography fontWeight="bold" fontSize="clamp(1.6rem, 3.2rem, 3.6rem)" color="primary" onClick={() => navigate("/home")} className="cursor-pointer hover:opacity-75 duration-[300ms]">Socialpedia</Typography>
                <div className="flex justify-between items-center rounded-[0.9rem] gap-[4.8rem] py-[0.16rem] px-[2.4rem]" style={{backgroundColor: neutralLight}}>
                    <InputBase placeholder="Search..."/>
                    <IconButton>
                        <Search/>
                    </IconButton>
                </div>
            </div>

            {isNonMobileScreen ? (
                <div className="flex justify-between items-center gap-[3.2rem]">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.pallete.mode == "dark" ? (
                            <DarkMode sx={{fontSize: "2.5rem"}}/>
                        ) : (
                            <LightMode sx={{color: dark, fontSize: "2.5rem"}}/>
                        )}
                    </IconButton>
                    <Message sx={{fontSize: "2.5rem"}}/>
                    <Notifications sx={{fontSize: "2.5rem"}}/>
                    <Help sx={{fontSize: "2.5rem"}}/>
                    <FormControl variant="standard">
                        <Select value={fullName()} sx={{width: "15rem", borderRadius: "0.4rem", padding: "0.4rem 1.6rem", backgroundColor: neutralLight, p: "0.4rem 1.6rem", "& .MuiSvgIcon-root": {width: "4.8rem", pr: "0.4rem"}, "& .MuiSelect-select:focus": {backgroundColor: neutralLight}}} input={<InputBase/>}>
                            <MenuItem value={fullName()}>
                                <Typography>{fullName()}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            ) : (
                <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    <Menu/>
                </IconButton>
            )}

            {!isNonMobileScreen && isMobileMenuToggled && (
                <Box position="fixed" right="0" bottom="0" height="100%" zIndex="10" maxWidth="50rem" minWidth="30rem" sx={{backgroundColor: background}}>
                    <Box display="flex" justifyContent="flex-end" p="1.6rem">
                        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close/>
                        </IconButton>
                    </Box>

                    <div className="flex flex-col items-center gap-[4.8rem]">
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.pallete.mode == "dark" ? (
                                <DarkMode sx={{fontSize: "2.5rem"}}/>
                            ) : (
                                <LightMode sx={{color: dark, fontSize: "2.5rem"}}/>
                            )}
                        </IconButton>
                        <Message sx={{fontSize: "2.5rem"}}/>
                        <Notifications sx={{fontSize: "2.5rem"}}/>
                        <Help sx={{fontSize: "2.5rem"}}/>
                        <FormControl variant="standard">
                            <Select value={fullName()} sx={{width: "15rem", borderRadius: "0.4rem", padding: "0.4rem 1.6rem", backgroundColor: neutralLight, p: "0.4rem 1.6rem", "& .MuiSvgIcon-root": {width: "4.8rem", pr: "0.4rem"}, "& .MuiSelect-select:focus": {backgroundColor: neutralLight}}} input={<InputBase/>}>
                                <MenuItem value={fullName()}>
                                    <Typography>{fullName()}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Box>
            )}
        </nav>
    )
}

export default Nav