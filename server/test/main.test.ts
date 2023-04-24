const dotenv = require("dotenv")
dotenv.config()

const API_URL = process.env.API_URL || "http://localhost:3000"

describe("Testing API", () => {
    it("Create a new user with hashed password", async () => {
        const sampleUser = {
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@gmail.com",
            password: "johndoe",
            picturePath: "https://picture.path/john",
            location: "john city",
            occupation: "john"
        }

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
})