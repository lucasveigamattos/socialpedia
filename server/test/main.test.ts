describe("Testing API", () => {
    it("Create a new user", async () => {
        const sampleUser = {
            firstName: "Lucas",
            lastName: "Veiga Mattos",
            email: "lucasveigamattos@gmail.com",
            password: "02032007",
            picturePath: "https://picture.path/Lucas",
            friends: [],
            location: "Curitiba",
            occupation: "Student"
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
        expect(data).toEqual(sampleUser)
    })
})