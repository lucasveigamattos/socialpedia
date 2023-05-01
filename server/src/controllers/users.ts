import {Request, Response} from "express"
import {Prisma, PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()

async function getUser(request: Request, response: Response) {
    try {
        const user = await prisma.user.findUnique({
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

        if (!user) return response.status(404).json({error: "User doesn't exists."})

        return response.status(200).json(user)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) return response.status(500).json(error)
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

        return response.status(200).json(userFriends)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) return response.status(500).json(error)
    }
}

async function deleteUser(request: Request, response: Response) {
    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id: request.params.id
            }
        })

        return response.status(200).json({deletedUser, message: "User deleted with success."})
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) return response.status(500).json(error)
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

        return response.status(200).json(userFriends)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) return response.status(500).json(error)
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

        return response.status(200).json({friends})
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) return response.status(500).json(error)
    }
}

export {
    getUser,
    getUserFriends,
    deleteUser,
    addFriend,
    removeFriend
}