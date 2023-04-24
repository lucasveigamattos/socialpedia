const dotenv = require("dotenv")
dotenv.config()

const API_URL = process.env.API_URL || "http://localhost:3000"

describe("Testing API", () => {
    const sampleUser = {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        password: "johndoe",
        picturePath: "https://picture.path/john",
        location: "john city",
        occupation: "john"
    }

    it("Create a new user with hashed password", async () => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sampleUser)
        })

        const data = await response.json()

        expect(response.status).toBe(201)
        for (const property in sampleUser) {
            expect(data).toHaveProperty(property)
        }
        expect(data["password"]).not.toBe(sampleUser.password)
        expect(data).toHaveProperty("id")
        expect(data).toHaveProperty("friends")
        expect(data).toHaveProperty("viewedProfile")
        expect(data).toHaveProperty("impressions")
    })

    it("Try to create a user with a existing email", async () => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sampleUser)
        })

        const data = await response.json()
        expect(response.status).toBe(409)
        expect(data["error"]).toBe("User already exist.")
    })

    it("Return token when login", async () => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sampleUser)
        })

        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data).toHaveProperty("user")
        expect(data["user"]).toHaveProperty("id")
        expect(data["user"]).not.toHaveProperty("password")
        expect(data).toHaveProperty("token")
    })

    it("Try to login with invalid email", async () => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: "",
                password: sampleUser.password
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
                email: sampleUser.email,
                password: ""
            })
        })

        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data["error"]).toBe("Invalid password.")
    })
})