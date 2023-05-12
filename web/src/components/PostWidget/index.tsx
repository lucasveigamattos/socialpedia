import {ChatBubbleOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined} from "@mui/icons-material"
import {Divider, IconButton, Typography, useTheme} from "@mui/material"
import {useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import Friend from "../Friend"
import {setPost} from "../../pages/state"

import {CustomThemeInterface} from "../../theme"

interface PostsWidgetProps {
    id: string,
    postUserId: string,
    firstName: string,
    lastName: string,
    description: string,
    location: string,
    picturePath: string,
    userPicturePath: string,
    likes: any,
    comments: any
}

function PostWidget(props: PostsWidgetProps) {
    const [isComments, setIsComments] = useState(false)
    
    const dispatch = useDispatch()
    const loggedInUserId = useSelector((state: any) => state.user.id)
    const token = useSelector((state: any) => state.token)
    const isLiked = props.likes.indexOf(loggedInUserId) == -1 ? false : true
    const likeCount = props.likes.length

    const theme: CustomThemeInterface = useTheme()
    const main = theme.pallete.neutral.main
    const primary = theme.pallete.primary.main

    async function likePost() {
        const response = await fetch(`http://localhost:3000/posts/${props.id}/like`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({userId: loggedInUserId})
        })

        const data = await response.json()
        dispatch(setPost({post: data.updatedPost}))
    }

    async function unlikePost() {
        const response = await fetch(`http://localhost:3000/posts/${props.id}/unlike`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({userId: loggedInUserId})
        })

        const data = await response.json()
        dispatch(setPost({post: data.updatedPost}))
    }
    
    return (
        <div className="pt-[2.4rem] px-[2.4rem] pb-[1.2rem] my-[3.2rem]">
            <Friend friendId={props.postUserId} name={`${props.firstName} ${props.lastName}`} subtitle={props.location} userPicturePath={props.userPicturePath}/>
            <Typography color={main} sx={{mt: "1.6rem"}}>{props.description}</Typography>
            {props.picturePath && (
                <img src={`http://localhost:3000/assets/${props.picturePath}`} width="100%" height="auto" alt="post picture" className="mt-[1.2rem] rounded-[1.2rem]"/>
            )}
            <div className="flex justify-between items-center mt-[0.4rem]">
                <div className="flex justify-between items-center gap-[1.6rem]">
                    <div className="flex justify-between items-center gap-[0.48rem]">
                        <IconButton onClick={isLiked ? unlikePost : likePost}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{color: primary}}/>
                            ) : (
                                <FavoriteBorderOutlined/>
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </div>
                    <div className="flex justify-between items-center gap-[0.48rem]">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlined/>
                        </IconButton>
                        <Typography>{props.comments.length}</Typography>
                    </div>
                </div>
                <IconButton>
                    <ShareOutlined/>
                </IconButton>
            </div>
            {isComments && (
                <div className="mt-[0.8rem]">
                    {JSON.parse(props.comments).map((comment: string, index: number) => (
                        <div key={`${props.firstName} ${props.lastName}-${index}`}>
                            <Divider/>
                            <Typography sx={{color: main, m: "0.8rem 0", pl: "1.6rem"}}>
                                {comment}
                            </Typography>
                        </div>
                    ))}
                    <Divider/>
                </div>
            )}
        </div>
    )
}

export default PostWidget