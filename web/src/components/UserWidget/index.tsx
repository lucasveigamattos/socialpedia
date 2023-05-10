import {ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlined} from "@mui/icons-material"
import {Typography, Divider, useTheme} from "@mui/material"
import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

import UserImage from "../UserImage"

import {CustomThemeInterface} from "../../theme"

interface UserWidgetProps {
    userId: string,
    picturePath: string
}

function UserWidget(Props: UserWidgetProps) {
    const [user, setUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        location: "",
        occupation: "",
        viewedProfile: 0,
        impressions: 0,
        friends: [],
        picturePath: ""
    })

    const theme: CustomThemeInterface = useTheme()
    const navigate = useNavigate()
    const token = useSelector((state: any) => state.token)

    async function getUser() {
        const response = await fetch(`http://localhost:3000/users/${Props.userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await response.json()
        setUser(data)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className="rounded-[1.2rem] pt-[2.4rem] px-[2.4rem] pb-[1.2rem]" style={{backgroundColor: theme.pallete.background.alternative}}>
            <div className="flex justify-between items-center gap-[0.8rem] pb-[1.76rem]" onClick={() => {navigate(`/profile/${Props.userId}`)}}>
                <div className="flex justify-between items-center gap-[1.6rem]">
                    <UserImage image={Props.picturePath}/>
                    <div>
                        <Typography variant="h4" color={theme.pallete.neutral.dark} fontWeight="500" sx={{cursor: "pointer", "&:hover": {color: theme.pallete.primary.light}}}>{user.firstName} {user.lastName}</Typography>
                        <Typography color={theme.pallete.neutral.medium}>{user.friends.length} friends</Typography>
                    </div>
                </div>
                <ManageAccountsOutlined/>
            </div>

            <Divider/>

            <div className="py-[1.6rem]">
                <div className="flex items-center gap-[1.6rem] mb-[0.8rem]">
                    <LocationOnOutlined fontSize="large" sx={{color: theme.pallete.neutral.main}}/>
                    <Typography color={theme.pallete.neutral.medium}>{user.location}</Typography>
                </div>
                <div className="flex items-center gap-[1.6rem]">
                    <WorkOutlined fontSize="large" sx={{color: theme.pallete.neutral.main}}/>
                    <Typography color={theme.pallete.neutral.medium}>{user.occupation}</Typography>
                </div>
            </div>

            <Divider/>

            <div className="py-[1.6rem]">
                <div className="flex justify-between items-center mb-[0.8rem]">
                    <Typography color={theme.pallete.neutral.medium}>Who's viewed your profile</Typography>
                    <Typography color={theme.pallete.neutral.main} fontWeight="500">{user.viewedProfile}</Typography>
                </div>
                <div className="flex justify-between items-center">
                    <Typography color={theme.pallete.neutral.medium}>Impressions of your post</Typography>
                    <Typography color={theme.pallete.neutral.main} fontWeight="500">{user.impressions}</Typography>
                </div>
            </div>

            <Divider/>

            <div className="py-[1.6rem]">
                <Typography fontSize="1.6rem" color={theme.pallete.neutral.main} fontWeight="500" mb="1.6rem">
                    Social Profiles
                </Typography>
                <div className="flex justify-between items-center gap-[1.6rem] mb-[0.8rem]">
                    <div className="flex justify-between items-center gap-[1.6rem]">
                        <img src="/public/assets/twitter.png" alt="twitter"/>
                        <div>
                            <Typography color={theme.pallete.neutral.main} fontWeight="500">Twitter</Typography>
                            <Typography color={theme.pallete.neutral.medium}>Social Network</Typography>
                        </div>
                    </div>
                    <EditOutlined sx={{color: theme.pallete.neutral.main}}/>
                </div>

                <div className="flex justify-between items-center gap-[1.6rem]">
                    <div className="flex justify-between items-center gap-[1.6rem]">
                        <img src="/public/assets/linkedin.png" alt="linkedin"/>
                        <div>
                            <Typography color={theme.pallete.neutral.main} fontWeight="500">Linkedin</Typography>
                            <Typography color={theme.pallete.neutral.medium}>Network Platform</Typography>
                        </div>
                    </div>
                    <EditOutlined sx={{color: theme.pallete.neutral.main}}/>
                </div>
            </div>
        </div>
    )
}

export default UserWidget