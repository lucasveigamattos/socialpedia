import {useMediaQuery, useTheme} from "@mui/material"
import {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import {useParams} from "react-router-dom"

import Nav from "../../components/Nav"
import FriendList from "../../components/FriendList"
import CreatePost from "../../components/CreatePost"
import PostsWidget from "../../components/PostsWidget"
import UserWidget from "../../components/UserWidget"

import {CustomThemeInterface} from "../../theme"

function Profile() {
    const [user, setUser] = useState({
        picturePath: ""
    })
    const {id} = useParams()
    const token = useSelector((state: any) => state.token)

    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")
    const theme: CustomThemeInterface = useTheme()

    async function getUser() {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
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

    if (!user) return null

    return (
        <div className="h-full" style={{backgroundColor: theme.pallete.background.default}}>
            <Nav/>
            <div className="justify-center gap-[3.2rem] w-full py-[3.2rem] px-[6%]" style={{display: isNonMobileScreen ? "flex" : "block"}}>
                <div style={{flexBasis: isNonMobileScreen ? "26%" : undefined}}>
                    <UserWidget userId={id as string} picturePath={user.picturePath}/>
                    <div className="my-[3.2rem]"/>
                    <FriendList userId={id as string}/>
                </div>
                <div style={{flexBasis: isNonMobileScreen ? "42%" : undefined, marginTop: isNonMobileScreen ? undefined : "3.2rem"}}>
                    <CreatePost picturePath={user.picturePath}/>
                    <div className="my-[3.2rem]"/>
                    <PostsWidget userId={id as string} isProfile={true}/>
                </div>
            </div>
        </div>
    )
}

export default Profile