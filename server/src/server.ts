import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import {fileURLToPath} from "url"

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

// Mongoose setup
async function start() {
    try {
        const mongoURL: any = process.env.MONGO_URL
        await mongoose.connect(mongoURL)
    
        app.listen(port, () => {
            console.log(`> Server running on port: ${port}`)
        })
    } catch (erorr) {
        console.log(erorr)
    }
}

start()