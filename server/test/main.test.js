const dotenv = require("dotenv")

const {createUser, getToken, getUser, deleteUser} = require("./utils/api_calls/users.js")
let {sampleUser1, sampleUser1Token, sampleUser2, sampleUser2Token, sampleUser3, sampleUser3Token, sampleUser4, sampleUser4Token} = require("./utils/samples/users.js")

const {createPost, getFeedPosts, getUserPosts, likePost, unlikePost, deletePost} = require("./utils/api_calls/posts.js")
const {postSample1, postSample2} = require("./utils/samples/posts.js")

dotenv.config()

const API_URL = process.env.API_URL || "http://localhost:3000"

describe("Testing Users", () => {
    it("Create a new user with hashed password", async () => {
        const {response, data} = await createUser(sampleUser1)

        expect(response.status).toBe(201)
        for (const property in sampleUser1) {
            expect(data).toHaveProperty(property)
        }
        expect(data["password"]).not.toBe(sampleUser1.password)
        expect(data).toHaveProperty("id")
        expect(data).toHaveProperty("friends")
        expect(data).toHaveProperty("viewedProfile")
        expect(data).toHaveProperty("impressions")
        expect(data).toHaveProperty("createdAt")

        sampleUser1.id = data.id
    })

    it("Try to create a user with a existing email", async () => {
        const {response, data} = await createUser(sampleUser1)

        expect(response.status).toBe(409)
        expect(data["error"]).toBe("User already exist.")
    })

    it("Return token when login", async () => {
        const {response, data} = await getToken(sampleUser1)

        expect(response.status).toBe(200)
        expect(data).toHaveProperty("user")
        expect(data["user"]).toHaveProperty("id")
        expect(data["user"]).not.toHaveProperty("password")
        expect(data).toHaveProperty("token")

        sampleUser1Token = data.token
    })

    it("Try to login with invalid email", async () => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: "",
                password: sampleUser1.password
            })
        })

        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data["error"]).toBe("User doesn't exist.")
    })

    it("Try to login with invalid password", async () => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: sampleUser1.email,
                password: ""
            })
        })

        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data["error"]).toBe("Invalid password.")
    })

    it("Get a user", async () => {
        const {response, data} = await getUser(sampleUser1, sampleUser1Token)

        expect(response.status).toBe(200)
        expect(data).toHaveProperty("id")
        expect(data).toHaveProperty("firstName")
        expect(data).toHaveProperty("lastName")
        expect(data).toHaveProperty("picturePath")
        expect(data).toHaveProperty("location")
        expect(data).toHaveProperty("occupation")
        expect(data).toHaveProperty("viewedProfile")
        expect(data).toHaveProperty("impressions")
    })

    it("Add a friend", async () => {
        const sampleUser2Account = await createUser(sampleUser2)
        const sampleUser3Account = await createUser(sampleUser3)
        const sampleUser4Account = await createUser(sampleUser4)

        sampleUser2.id = sampleUser2Account.data["id"]
        sampleUser2Token = (await getToken(sampleUser2)).data["token"]

        sampleUser3.id = sampleUser3Account.data.id
        sampleUser3Token = (await getToken(sampleUser3)).data["token"]

        sampleUser4.id = sampleUser4Account.data.id
        sampleUser4Token = (await getToken(sampleUser4)).data["token"]

        let response = await fetch(`${API_URL}/users/${sampleUser1.id}/${sampleUser2.id}/addFriend`, {
            method: "PATCH",
            headers: {
                Authorization: sampleUser1Token
            }
        })

        response = await fetch(`${API_URL}/users/${sampleUser1.id}/${sampleUser3.id}/addFriend`, {
            method: "PATCH",
            headers: {
                Authorization: sampleUser1Token
            }
        })

        response = await fetch(`${API_URL}/users/${sampleUser1.id}/${sampleUser4.id}/addFriend`, {
            method: "PATCH",
            headers: {
                Authorization: sampleUser1Token
            }
        })

        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data["friends"].length).toBe(3)
    })

    it("Removes a friend", async () => {
        const response = await fetch(`${API_URL}/users/${sampleUser1.id}/${sampleUser3.id}/removeFriend`, {
            method: "PATCH",
            headers: {
                Authorization: sampleUser1Token
            }
        })

        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data["friends"].length).toBe(2)
    })

    it("Get users friends", async () => {
        const response = await fetch(`${API_URL}/users/${sampleUser1.id}/friends`, {
            headers: {
                Authorization: sampleUser1Token
            }
        })

        expect(response.status).toBe(200)
    })

    it("Delete a user", async () => {
        let deleteUserResponse = await deleteUser(sampleUser1, sampleUser1Token)
        expect(deleteUserResponse.response.status).toBe(200)
        expect(deleteUserResponse.data["message"]).toBe("User deleted with success.")

        deleteUserResponse = await deleteUser(sampleUser2, sampleUser2Token)
        expect(deleteUserResponse.response.status).toBe(200)
        expect(deleteUserResponse.data["message"]).toBe("User deleted with success.")

        deleteUserResponse = await deleteUser(sampleUser3, sampleUser3Token)
        expect(deleteUserResponse.response.status).toBe(200)
        expect(deleteUserResponse.data["message"]).toBe("User deleted with success.")

        deleteUserResponse = await deleteUser(sampleUser4, sampleUser4Token)
        expect(deleteUserResponse.response.status).toBe(200)
        expect(deleteUserResponse.data["message"]).toBe("User deleted with success.")

        let getUserResponse = await getUser(sampleUser1, sampleUser1Token)
        expect(getUserResponse.response.status).toBe(404)
        expect(getUserResponse.data["error"]).toBe("User doesn't exists.")

        getUserResponse = await getUser(sampleUser2, sampleUser2Token)
        expect(getUserResponse.response.status).toBe(404)
        expect(getUserResponse.data["error"]).toBe("User doesn't exists.")

        getUserResponse = await getUser(sampleUser3, sampleUser3Token)
        expect(getUserResponse.response.status).toBe(404)
        expect(getUserResponse.data["error"]).toBe("User doesn't exists.")

        getUserResponse = await getUser(sampleUser4, sampleUser4Token)
        expect(getUserResponse.response.status).toBe(404)
        expect(getUserResponse.data["error"]).toBe("User doesn't exists.")
    })
})

describe("Testing Posts", () => {
    it("Create two Posts", async () => {
        let createUserResponse = await createUser(sampleUser1)
        let loginUserResponse = await getToken(sampleUser1)
        sampleUser1.id = createUserResponse.data["id"]
        sampleUser1Token = loginUserResponse.data["token"]

        createUserResponse = await createUser(sampleUser2)
        loginUserResponse = await getToken(sampleUser2)
        sampleUser2.id = createUserResponse.data["id"]
        sampleUser2Token = loginUserResponse.data["token"]

        let {response, data} = await createPost(postSample1, sampleUser1, sampleUser1Token)

        postSample1.id = data["post"]["id"]

        expect(response.status).toBe(201)
        expect(data["post"]).toHaveProperty("id")
        expect(data["post"]).toHaveProperty("userId")
        expect(data["post"]).toHaveProperty("firstName")
        expect(data["post"]).toHaveProperty("lastName")
        expect(data["post"]).toHaveProperty("location")
        expect(data["post"]).toHaveProperty("description")
        expect(data["post"]).toHaveProperty("userPicturePath")
        expect(data["post"]).toHaveProperty("picturePath")
        expect(data["post"]).toHaveProperty("likes")
        expect(data["post"]).toHaveProperty("comments")

        expect(data["post"]).not.toHaveProperty("friends")
        expect(data["post"]).not.toHaveProperty("email")
        expect(data["post"]).not.toHaveProperty("password")
        expect(data["post"]).not.toHaveProperty("occupation")
        expect(data["post"]).not.toHaveProperty("viewedProfile")
        expect(data["post"]).not.toHaveProperty("impressions")

        const createPostResponse = await createPost(postSample2, sampleUser2, sampleUser1Token)
        response = createPostResponse.response
        data = createPostResponse.data

        postSample2.id = data["post"]["id"]

        expect(response.status).toBe(201)
        expect(data["post"]).toHaveProperty("id")
        expect(data["post"]).toHaveProperty("userId")
        expect(data["post"]).toHaveProperty("firstName")
        expect(data["post"]).toHaveProperty("lastName")
        expect(data["post"]).toHaveProperty("location")
        expect(data["post"]).toHaveProperty("description")
        expect(data["post"]).toHaveProperty("userPicturePath")
        expect(data["post"]).toHaveProperty("picturePath")
        expect(data["post"]).toHaveProperty("likes")
        expect(data["post"]).toHaveProperty("comments")

        expect(data["post"]).not.toHaveProperty("friends")
        expect(data["post"]).not.toHaveProperty("email")
        expect(data["post"]).not.toHaveProperty("password")
        expect(data["post"]).not.toHaveProperty("occupation")
        expect(data["post"]).not.toHaveProperty("viewedProfile")
        expect(data["post"]).not.toHaveProperty("impressions")
    })

    it("Get feed posts", async () => {
        const {response, data} = await getFeedPosts(sampleUser1Token)

        expect(response.status).toBe(200)
        expect(data["posts"].length).toBe(2)

        expect(data["posts"][0]).toHaveProperty("id")
        expect(data["posts"][0]).toHaveProperty("userId")
        expect(data["posts"][0]).toHaveProperty("firstName")
        expect(data["posts"][0]).toHaveProperty("lastName")
        expect(data["posts"][0]).toHaveProperty("location")
        expect(data["posts"][0]).toHaveProperty("description")
        expect(data["posts"][0]).toHaveProperty("userPicturePath")
        expect(data["posts"][0]).toHaveProperty("picturePath")
        expect(data["posts"][0]).toHaveProperty("likes")
        expect(data["posts"][0]).toHaveProperty("comments")

        expect(data["posts"][0]).not.toHaveProperty("friends")
        expect(data["posts"][0]).not.toHaveProperty("email")
        expect(data["posts"][0]).not.toHaveProperty("password")
        expect(data["posts"][0]).not.toHaveProperty("occupation")
        expect(data["posts"][0]).not.toHaveProperty("viewedProfile")
        expect(data["posts"][0]).not.toHaveProperty("impressions")

        expect(data["posts"][1]).toHaveProperty("id")
        expect(data["posts"][1]).toHaveProperty("userId")
        expect(data["posts"][1]).toHaveProperty("firstName")
        expect(data["posts"][1]).toHaveProperty("lastName")
        expect(data["posts"][1]).toHaveProperty("location")
        expect(data["posts"][1]).toHaveProperty("description")
        expect(data["posts"][1]).toHaveProperty("userPicturePath")
        expect(data["posts"][1]).toHaveProperty("picturePath")
        expect(data["posts"][1]).toHaveProperty("likes")
        expect(data["posts"][1]).toHaveProperty("comments")

        expect(data["posts"][1]).not.toHaveProperty("friends")
        expect(data["posts"][1]).not.toHaveProperty("email")
        expect(data["posts"][1]).not.toHaveProperty("password")
        expect(data["posts"][1]).not.toHaveProperty("occupation")
        expect(data["posts"][1]).not.toHaveProperty("viewedProfile")
        expect(data["posts"][1]).not.toHaveProperty("impressions")
    })

    it("Get posts from a user", async () => {
        const {response, data} = await getUserPosts(sampleUser1, sampleUser1Token)

        expect(response.status).toBe(200)
        expect(data["posts"].length).toBe(1)

        expect(data["posts"][0]).toHaveProperty("id")
        expect(data["posts"][0]).toHaveProperty("userId")
        expect(data["posts"][0]).toHaveProperty("firstName")
        expect(data["posts"][0]).toHaveProperty("lastName")
        expect(data["posts"][0]).toHaveProperty("location")
        expect(data["posts"][0]).toHaveProperty("description")
        expect(data["posts"][0]).toHaveProperty("userPicturePath")
        expect(data["posts"][0]).toHaveProperty("picturePath")
        expect(data["posts"][0]).toHaveProperty("likes")
        expect(data["posts"][0]).toHaveProperty("comments")

        expect(data["posts"][0]).not.toHaveProperty("friends")
        expect(data["posts"][0]).not.toHaveProperty("email")
        expect(data["posts"][0]).not.toHaveProperty("password")
        expect(data["posts"][0]).not.toHaveProperty("occupation")
        expect(data["posts"][0]).not.toHaveProperty("viewedProfile")
        expect(data["posts"][0]).not.toHaveProperty("impressions")
    })

    it("Likes a post", async () => {
        const {response, data} = await likePost(postSample1, sampleUser1Token)

        expect(response.status).toBe(200)

        expect(data["updatedPost"]).toHaveProperty("id")
        expect(data["updatedPost"]).toHaveProperty("userId")
        expect(data["updatedPost"]).toHaveProperty("firstName")
        expect(data["updatedPost"]).toHaveProperty("lastName")
        expect(data["updatedPost"]).toHaveProperty("location")
        expect(data["updatedPost"]).toHaveProperty("description")
        expect(data["updatedPost"]).toHaveProperty("userPicturePath")
        expect(data["updatedPost"]).toHaveProperty("picturePath")
        expect(data["updatedPost"]).toHaveProperty("likes")
        expect(data["updatedPost"]).toHaveProperty("comments")

        expect(data["updatedPost"]).not.toHaveProperty("friends")
        expect(data["updatedPost"]).not.toHaveProperty("email")
        expect(data["updatedPost"]).not.toHaveProperty("password")
        expect(data["updatedPost"]).not.toHaveProperty("occupation")
        expect(data["updatedPost"]).not.toHaveProperty("viewedProfile")
        expect(data["updatedPost"]).not.toHaveProperty("impressions")

        expect(data["updatedPost"]["likes"]).toBe(1)
    })

    it("Unlikes a post", async () => {
        const {response, data} = await unlikePost(postSample1, sampleUser1Token)

        expect(response.status).toBe(200)

        expect(data["updatedPost"]).toHaveProperty("id")
        expect(data["updatedPost"]).toHaveProperty("userId")
        expect(data["updatedPost"]).toHaveProperty("firstName")
        expect(data["updatedPost"]).toHaveProperty("lastName")
        expect(data["updatedPost"]).toHaveProperty("location")
        expect(data["updatedPost"]).toHaveProperty("description")
        expect(data["updatedPost"]).toHaveProperty("userPicturePath")
        expect(data["updatedPost"]).toHaveProperty("picturePath")
        expect(data["updatedPost"]).toHaveProperty("likes")
        expect(data["updatedPost"]).toHaveProperty("comments")

        expect(data["updatedPost"]).not.toHaveProperty("friends")
        expect(data["updatedPost"]).not.toHaveProperty("email")
        expect(data["updatedPost"]).not.toHaveProperty("password")
        expect(data["updatedPost"]).not.toHaveProperty("occupation")
        expect(data["updatedPost"]).not.toHaveProperty("viewedProfile")
        expect(data["updatedPost"]).not.toHaveProperty("impressions")

        expect(data["updatedPost"]["likes"]).toBe(0)
    })

    it("Delete a post", async () => {
        let deletePostResponse = await deletePost(postSample1, sampleUser1Token)

        expect(deletePostResponse.response.status).toBe(200)
        expect(deletePostResponse.data["message"]).toBe("Post deleted with success.")

        deletePostResponse = await deletePost(postSample2, sampleUser2Token)

        expect(deletePostResponse.response.status).toBe(200)
        expect(deletePostResponse.data["message"]).toBe("Post deleted with success.")

        await deleteUser(sampleUser1, sampleUser1Token)
        await deleteUser(sampleUser2, sampleUser2Token)
    })
})