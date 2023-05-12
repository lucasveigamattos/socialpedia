import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

import {setPost, setPosts} from "../../pages/state"
import PostWidget from "../PostWidget"

interface PostWidgetProps {
    userId: string,
    isProfile: boolean
}

function PostsWidget(props: PostWidgetProps) {
    const dispatch = useDispatch()
    const posts = useSelector((state: any) => state.posts)
    const token = useSelector((state: any) => state.token)

    async function getFeedPosts() {
        const response = await fetch("http://localhost:3000/posts/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await response.json()
        dispatch(setPosts({posts: data.posts}))
    }

    async function getUserPosts() {
        const response = await fetch(`http://localhost:3000/posts/${props.userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await response.json()
        dispatch(setPosts({posts: data.posts}))
    }

    useEffect(() => {
        if (props.isProfile) {
            getUserPosts()
            return
        }
        getFeedPosts()
    }, [])

    return (
        <>
            {posts.map(({id, userId, firstName, lastName, description, location, picturePath, userPicturePath, likes, comments}: any) => {
                return <PostWidget id={id} key={id} postUserId={userId} firstName={firstName} lastName={lastName} description={description} location={location} picturePath={picturePath} userPicturePath={userPicturePath} likes={likes} comments={comments}/>
            })}
        </>
    )
}

export default PostsWidget