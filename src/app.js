import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { config } from "dotenv";
config();

const app = express();

// CORS should be first
app.use(cors({
    origin: "*",
    // credentials: true
}))

app.use(morgan("tiny"))
// JSON parsing middleware MUST come before routes
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(express.json())
// Routes come AFTER middleware
import userRouter from './routes/user.routes.js'
app.use("/api/v1/users", userRouter)

export {app}
