import {createSlice} from "@reduxjs/toolkit"

interface InitialStateInterface {
    mode: string,
    user: {
        friends: []
    } | undefined,
    token: string | undefined,
    posts: any
}

const initialState: InitialStateInterface = {
    mode: "light",
    user: undefined,
    token: undefined,
    posts: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode(state) {
            state.mode = state.mode == "light" ? "dark" : "light"
        },
        setLogin(state, action) {
            state.user = action.payload["user"]
            state.token = action.payload["token"]
        },
        setLogout(state) {
            state.user = undefined
            state.token = undefined
        },
        setFriends(state, action) {
            if (state.user) {
                state.user["friends"] = action.payload["friends"]
            } else {
                console.error("User friends non-existent.")
            }
        },
        setPosts(state, action) {
            state.posts = action.payload["posts"]
        },
        setPost(state, aciton) {
            const updatedPosts = state.posts.map((post: any) => {
                if (post.id == aciton.payload["post_id"]) return aciton.payload["post"]
                return post
            })

            state.posts = updatedPosts
        }
    }
})

export const {setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions
export default authSlice.reducer