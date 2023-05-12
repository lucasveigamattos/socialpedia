import {Request, Response} from "express"
import {Prisma, PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

async function createPost(request: Request, response: Response) {
    try {
        const {userId, description, picturePath} = request.body

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId
            }
        })

        const post = await prisma.post.create({
            data: {
                userId,
                firstName: user.firstName,
                lastName: user.lastName,
                location: user.location,
                description,
                userPicturePath: user.picturePath,
                picturePath: picturePath,
                likes: []
            }
        })

        return response.status(201).json({post})
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) return response.status(500).json(error)
    }
}

async function deletePost(request: Request, response: Response) {
    try {
        const deletedPost = await prisma.post.delete({
            where: {
                id: request.params["id"]
            }
        })

        return response.status(200).json({deletedPost, message: "Post deleted with success."})
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) return response.status(500).json(error)
    }
}

async function getFeedPosts(request: Request, response: Response) {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc"
            },
            take: 50
        })

        return response.status(200).json({posts})
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) return response.status(500).json(error)
    }
}

async function getUserPosts(reqeust: Request, response: Response) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                userId: reqeust.params["userId"]
            }
        })

        return response.status(200).json({posts})
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) return response.status(500).json(error)
    }
}

async function likePost(request: Request, response: Response) {
    try {
        const {id} = request.params
        const {userId} = request.body

        const post = await prisma.post.findUniqueOrThrow({
            where: {
                id
            }
        })

        const updatedPost = await prisma.post.update({
            where: {
                id
            },
            data: {
                likes: {
                    push: userId
                }
            }
        })

        return response.status(200).json({updatedPost})
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) return response.status(500).json(error)
    }
}

async function unlikePost(request: Request, response: Response) {
    try {
        const {id} = request.params
        const bodyUserId = request.body.userId

        const post = await prisma.post.findFirstOrThrow({
            where: {
                id
            }
        })

        const likes = []

        for (let userId of post.likes) {
            if (userId != bodyUserId) {
                likes.push(userId)
            }
        }

        const updatedPost = await prisma.post.update({
            where: {
                id
            },
            data: {
                likes: likes
            }
        })

        return response.status(200).json({updatedPost})
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) return response.status(500).json(error)
    }
}

export {
    createPost,
    deletePost,
    getFeedPosts,
    getUserPosts,
    likePost,
    unlikePost
}