import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

async function register(request: any, response: any) {
    try {
        const {firstName, lastName, email, password, picturePath, location, occupation} = request.body

        const alreadyExistUserWithPassedEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (alreadyExistUserWithPassedEmail) return response.status(409).json({error: "User already exist."})

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                friends: [],
                email,
                password: passwordHash,
                picturePath,
                location,
                occupation,
                viewedProfile: 0,
                impressions: 0
            }
        })

        return response.status(201).json(user)
    } catch (error) {
        console.error({error})
    }
}

async function login(request: any, response: any) {
    try {
        const {email, password} = request.body

        const user: {id: string, password?: string} | null = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) return response.status(400).json({error: "User doesn't exist."})

        const isMatch = await bcrypt.compare(password, user.password as string)
        if (!isMatch) return response.status(400).json({error: "Invalid password."})

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as string)
        delete user.password

        return response.status(200).json({user, token})
    } catch (error) {
        console.error({error})
    }
}

export {
    register,
    login
}