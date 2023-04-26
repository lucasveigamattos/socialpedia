const dotenv = require("dotenv")
dotenv.config()

const API_URL = process.env.API_URL || "http://localhost:3000"

describe("Testing API", () => {
    async function createUser(userData) {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })

        const data = await response.json()

        return {
            response,
            data
        }
    }

    async function getToken(userData) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userData.email,
                password: userData.password
            })
        })

        const data = await response.json()

        return {
            response,
            data
        }
    }

    async function getUser(userData, userToken) {
        const response = await fetch(`${API_URL}/users/${userData.id}`, {
            headers: {
                Authorization: userToken
            }
        })

        const data = await response.json()

        return {
            response,
            data
        }
    }

    async function deleteUser(userData, userToken) {
        const response = await fetch(`${API_URL}/users/${userData.id}`, {
            method: "DELETE",
            headers: {
                Authorization: userToken
            }
        })

        const data = await response.json()

        return {
            response,
            data
        }
    }

    const sampleUser1 = {
        id: "",
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        password: "johndoe",
        picturePath: "https://picture.path/john",
        location: "john's city",
        occupation: "john",
    }

    let sampleUser1Token

    const sampleUser2 = {
        id: "",
        firstName: "Jane",
        lastName: "Doe",
        email: "janedoe@gmail.com",
        password: "janedoe",
        picturePath: "https://picture.path/jane",
        location: "jane's city",
        occupation: "jane"
    }

    let sampleUser2Token

    const sampleUser3 = {
        id: "",
        firstName: "Sample3",
        lastName: "",
        email: "sample3@gmail.com",
        password: "sample3",
        picturePath: "https://picture.path/sample3",
        location: "sample's city",
        occupation: "sample"
    }

    let sampleUser3Token

    const sampleUser4 = {
        id: "",
        firstName: "Sample4",
        lastName: "",
        email: "sample4@gmail.com",
        password: "sample4",
        picturePath: "https://picture.path/sample4",
        location: "sample's city",
        occupation: "sample"
    }

    let sampleUser4Token

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

        sampleUser2.id = sampleUser2Account.data.id
        sampleUser2Token = (await getToken(sampleUser2)).data.token

        sampleUser3.id = sampleUser3Account.data.id
        sampleUser3Token = (await getToken(sampleUser3)).data.token

        sampleUser4.id = sampleUser4Account.data.id
        sampleUser4Token = (await getToken(sampleUser4)).data.token

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
        let deleteUserRequest = await deleteUser(sampleUser1, sampleUser1Token)
        expect(deleteUserRequest.response.status).toBe(200)
        expect(deleteUserRequest.data.message).toBe("User deleted with success.")

        deleteUserRequest = await deleteUser(sampleUser2, sampleUser2Token)
        expect(deleteUserRequest.response.status).toBe(200)
        expect(deleteUserRequest.data.message).toBe("User deleted with success.")

        deleteUserRequest = await deleteUser(sampleUser3, sampleUser3Token)
        expect(deleteUserRequest.response.status).toBe(200)
        expect(deleteUserRequest.data.message).toBe("User deleted with success.")

        deleteUserRequest = await deleteUser(sampleUser4, sampleUser4Token)
        expect(deleteUserRequest.response.status).toBe(200)
        expect(deleteUserRequest.data.message).toBe("User deleted with success.")

        let getUserRequest = await getUser(sampleUser1, sampleUser1Token)
        expect(getUserRequest.response.status).toBe(403)

        getUserRequest = await getUser(sampleUser2, sampleUser2Token)
        expect(getUserRequest.response.status).toBe(403)

        getUserRequest = await getUser(sampleUser3, sampleUser3Token)
        expect(getUserRequest.response.status).toBe(403)

        getUserRequest = await getUser(sampleUser4, sampleUser4Token)
        expect(getUserRequest.response.status).toBe(403)
    })
})