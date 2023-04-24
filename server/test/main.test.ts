describe("Testing API", () => {
    it("Create a new user", async () => {
        const sampleUser = {
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@gmail.com",
            password: "johndoe",
            picturePath: "https://picture.path/john",
            location: "john city",
            occupation: "john"
        }

        const response = await fetch("http://localhost:3000/auth/register", {
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
        expect(data).toHaveProperty("id")
        expect(data).toHaveProperty("friends")
        expect(data).toHaveProperty("viewedProfile")
        expect(data).toHaveProperty("impressions")
    })
})