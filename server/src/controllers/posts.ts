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
                likes: 0
            }
        })

        return response.status(201).json({post})
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) return response.status(500).json({error: error})
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
        if (error instanceof Prisma.PrismaClientKnownRequestError) return response.status(500).json({error: error})
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
        if (error instanceof Prisma.PrismaClientKnownRequestError) return response.status(500).json({error: error})
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
        if (error instanceof Prisma.PrismaClientKnownRequestError) return response.status(500).json({error: error})
    }
}

async function likePost(request: Request, response: Response) {
    try {
        const {id} = request.params

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
                likes: post.likes + 1
            }
        })

        return response.status(200).json({updatedPost})
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) return response.status(500).json({error: error})
    }
}

async function unlikePost(request: Request, response: Response) {
    try {
        const {id} = request.params

        const post = await prisma.post.findFirstOrThrow({
            where: {
                id
            }
        })

        const updatedPost = await prisma.post.update({
            where: {
                id
            },
            data: {
                likes: post.likes - 1
            }
        })

        return response.status(200).json({updatedPost})
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) return response.status(500).json({error: error})
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