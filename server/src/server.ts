import express from "express"
import bodyParser from "body-parser"
import {PrismaClient} from "@prisma/client"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import {fileURLToPath} from "url"

import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"

import verifyToken from "./middleware/auth.js"

import {register} from "./controllers/auth.js"
import {createPost} from "./controllers/posts.js"

// Configurations
const __fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__fileName)

dotenv.config()
const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.json({limit: "30mb"}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())
app.use("/assets", express.static(path.join(__dirName, "public/assets")))

// File storage
const storage = multer.diskStorage({
    destination: function(request, file, cb) {
        cb(null, "public/assets")
    },
    filename: function(request, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

// Routes with files
app.post("/auth/register", upload.single("picture"), register)
app.post("/posts", verifyToken, upload.single("picture"), createPost)

// Routes
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)

// Server Startup
app.listen(port, () => {
    console.log(`> Server running on port: ${port}`)
})