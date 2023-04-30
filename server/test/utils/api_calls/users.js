const API_URL = process.env.API_URL || "http://localhost:3000"

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

module.exports = {
    createUser,
    getToken,
    getUser,
    deleteUser
}