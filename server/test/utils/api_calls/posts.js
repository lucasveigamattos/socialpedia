const API_URL = process.env.API_URL || "http://localhost:3000"

async function createPost(postData, userData, userToken) {
    const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: userToken
        },
        body: JSON.stringify({
            userId: userData.id,
            description: postData.description,
            picturePath: postData.picturePath
        })
    })

    const data = await response.json()
    return {
        response,
        data
    }
}

async function getFeedPosts(userToken) {
    const response = await fetch(`${API_URL}/posts`, {
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

async function getUserPosts(userData, userToken) {
    const response = await fetch(`${API_URL}/posts/${userData.id}`, {
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

async function likePost(postData, userId, userToken) {
    const response = await fetch(`${API_URL}/posts/${postData.id}/like`, {
        method: "PATCH",
        headers: {
            Authorization: userToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({userId})
    })

    const data = await response.json()

    return {
        response,
        data
    }
}

async function unlikePost(postData, userId, userToken) {
    const response = await fetch(`${API_URL}/posts/${postData.id}/unlike`, {
        method: "PATCH",
        headers: {
            Authorization: userToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({userId})
    })

    const data = await response.json()

    return {
        response,
        data
    }
}

async function deletePost(postData, userToken) {
    const response = await fetch(`${API_URL}/posts/${postData.id}`, {
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
    createPost,
    getFeedPosts,
    getUserPosts,
    likePost,
    unlikePost,
    deletePost
}