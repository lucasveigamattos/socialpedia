import {useMediaQuery, useTheme} from "@mui/material"
import {useSelector} from "react-redux"

import Nav from "../../components/Nav"
import UserWidget from "../../components/UserWidget"
import CreatePost from "../../components/CreatePost"
import PostsWidget from "../../components/PostsWidget"
import AdWidget from "../../components/AdWidget"
import FriendList from "../../components/FriendList"

import {CustomThemeInterface} from "../../theme"

export default function Home() {
    const theme: CustomThemeInterface = useTheme()
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")

    const {id, picturePath} = useSelector((state: any) => state.user)

    return (
        <div className="h-full" style={{backgroundColor: theme.pallete.background.default}}>
            <Nav/>
            <div className="justify-between gap-[0.8rem] w-full py-[3.2rem] px-[6%]" style={{display: isNonMobileScreen ? "flex" : "block"}}>
                <div style={{flexBasis: isNonMobileScreen ? "26%" : undefined}}>
                    <UserWidget userId={id} picturePath={picturePath}/>
                </div>
                <div style={{flexBasis: isNonMobileScreen ? "42%" : undefined, marginTop: isNonMobileScreen ? undefined : "3.2rem"}}>
                    <CreatePost picturePath={picturePath}/>
                    <PostsWidget userId={id} isProfile={false}/>
                </div>
                {isNonMobileScreen && (
                    <div style={{flexBasis: "26%"}}>
                        <AdWidget/>
                        <div className="my-[3.2rem]"></div>
                        <FriendList userId={id}/>
                    </div>
                )}
            </div>
        </div>
    )
}