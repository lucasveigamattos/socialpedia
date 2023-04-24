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

        if (alreadyExistUserWithPassedEmail) return response.status(409).json({error: "User already exists."})

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

export {
    register
}