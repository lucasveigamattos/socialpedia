import {Typography, useTheme} from "@mui/material"
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

import Friend from "../Friend"
import {setFriends} from "../../pages/state"

import {CustomThemeInterface} from "../../theme"

interface FriendListProps {
    userId: string
}

function FriendList(props: FriendListProps) {
    const dispatch = useDispatch()
    const token = useSelector((state: any) => state.token)
    const friends = useSelector((state: any) => state.user.friends)

    const theme: CustomThemeInterface = useTheme()

    async function getUserFriends() {
        const response = await fetch(`http://localhost:3000/users/${props.userId}/friends`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await response.json()

        dispatch(setFriends({friends: data.friends}))
    }

    useEffect(() => {
        getUserFriends()
    }, [])

    return (
        <div className="rounded-[1.2rem] pt-[2.4rem] px-[2.4rem] pb-[1.2rem]" style={{backgroundColor: theme.pallete.background.alternative}}>
            <Typography color={theme.pallete.neutral.dark} variant="h5" fontWeight="500" sx={{mb: "2.4rem"}}>Friend List</Typography>
            <div className="flex flex-col gap-[2.4rem]">
                {friends.map((friend: any) => {
                    friend = JSON.parse(friend)

                    return (
                        <Friend key={friend.id} friendId={friend.id} name={`${friend.firstName} ${friend.lastName}`} subtitle={friend.location} userPicturePath={friend.picturePath}/>
                    )
                })}
            </div>
        </div>
    )
}

export default FriendList