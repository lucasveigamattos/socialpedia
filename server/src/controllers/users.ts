import {Request, Response} from "express"
import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()

async function getUser(request: Request, response: Response) {
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: request.params.id
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                picturePath: true,
                location: true,
                occupation: true,
                viewedProfile: true,
                impressions: true
            }
        })

        response.status(200).json(user)
    } catch (error) {
        console.error({error})
    }
}

async function getUserFriends(request: Request, response: Response) {
    try {
        const userFriends = await prisma.user.findUniqueOrThrow({
            where: {
                id: request.params.id
            },
            select: {
                friends: true
            }
        })

        response.status(200).json(userFriends)
    } catch (error) {
        console.error({error})
    }
}

async function addFriend(request: Request, response: Response) {
    try {
        const {id, friendId} = request.params

        const userToAdd = await prisma.user.findUniqueOrThrow({
            where: {
                id: friendId
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                picturePath: true,
                occupation: true,
                location: true
            }
        })

        const userFriends = await prisma.user.update({
            where: {
                id
            },
            data: {
                friends: {
                    push: JSON.stringify(userToAdd)
                }
            },
            select: {
                friends: true
            }
        })

        response.status(200).json(userFriends)
    } catch (error) {
        console.error({error})
    }
}

async function removeFriend(request: Request, response: Response) {
    try {
        const {id, friendId} = request.params

        const userFriends = await prisma.user.findUniqueOrThrow({
            where: {
                id
            },
            select: {
                friends: true
            }
        })

        const friends = []

        for (let friend of userFriends.friends) {
            if (JSON.parse(friend as string).id != friendId) {
                friends.push(friend)
            }
        }

        await prisma.user.update({
            where: {
                id
            },
            data: {
                friends
            }
        })

        response.status(200).json({friends})
    } catch (error) {
        console.error({error})
    }
}

export {
    getUser,
    getUserFriends,
    addFriend,
    removeFriend
}