import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"

// interface RequestObject extends Request {
//     user: string | jwt.JwtPayload
// }

export default async function verifyToken(request: Request, response: Response, next: NextFunction) {
    try {
        let token: string | undefined = request.header("Authorization")

        if (!token) {
            return response.status(403).json({error: "No token has been set."})
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimStart()
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET as string)
        // request.user = verified
        
        next()
    } catch (error) {
        return response.status(500).json({error})
    }
}