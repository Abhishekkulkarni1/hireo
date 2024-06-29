import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import applicationRoute from "./routes/applicationRoute.js"
import jobRoute from "./routes/jobRoute.js"
import userRoute from "./routes/userRoute.js"
import {dbConnection} from "./database/dbConnection.js"
import { errorMiddleware } from "./middlewares/error.js";


const app = express()
dotenv.config({path: "./config/config.env"})

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}))

app.use('/api/v1/user', userRoute)
app.use('/api/v1/application', applicationRoute)
app.use('/api/v1/job', jobRoute)

dbConnection();

app.use(errorMiddleware)

export default app;