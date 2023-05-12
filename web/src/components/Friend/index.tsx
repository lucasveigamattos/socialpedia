import {PersonAddOutlined, PersonRemoveOutlined} from "@mui/icons-material"
import {IconButton, Typography, useTheme} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

import {setFriends} from "../../pages/state"
import UserImage from "../UserImage"

import {CustomThemeInterface} from "../../theme"

interface FriendProps {
    friendId: string,
    name: string,
    subtitle: string,
    userPicturePath: string
}

function Friend(props: FriendProps) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {id, friends} = useSelector((state: any) => state.user)
    const token = useSelector((state: any) => state.token)

    const theme: CustomThemeInterface = useTheme()
    const primaryLight = theme.pallete.primary.light
    const primaryDark = theme.pallete.primary.dark
    const main = theme.pallete.neutral.main
    const medium = theme.pallete.neutral.medium

    const isFriend = friends.find((friend: any) => JSON.parse(friend).id == props.friendId) ? true : false

    async function addFriend() {
        const response = await fetch(`http://localhost:3000/users/${id}/${props.friendId}/addFriend`, {
            method: "PATCH",
            headers: {
                Authorization: token
            }
        })

        const data = await response.json()

        dispatch(setFriends(data))
    }

    async function removeFriend() {
        const response = await fetch(`http://localhost:3000/users/${id}/${props.friendId}/removeFriend`, {
            method: "PATCH",
            headers: {
                Authorization: token
            }
        })

        const data = await response.json()

        dispatch(setFriends(data))
    }

    return (
        <div className="flex justify-between items-center">
            <div className="flex justify-between items-center gap-[1.6rem]">
                <UserImage image={props.userPicturePath}/>
                <div onClick={() => {navigate(`/profile/${props.friendId}`)}}>
                    <Typography color={main} variant="h5" fontWeight="500" sx={{"&:hover": {color: theme.pallete.primary.light, cursor: "pointer"}}}>{props.name}</Typography>
                    <Typography color={medium} fontSize="1.2rem">{props.subtitle}</Typography>
                </div>
            </div>
            <IconButton onClick={() => {isFriend ? removeFriend() : addFriend()}} sx={{backgroundColor: primaryLight, p: "0.96rem"}}>
                {isFriend ? <PersonRemoveOutlined sx={{color: primaryDark}}/> : <PersonAddOutlined sx={{color: primaryDark}}/>}
            </IconButton>
        </div>
    )
}

export default Friend