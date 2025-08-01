import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

// CORS should be first
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// JSON parsing middleware MUST come before routes
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Add this debugging middleware to see what's happening
app.use((req, res, next) => {
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Raw Body:', req.body);
    next();
});

// Routes come AFTER middleware
import userRouter from './routes/user.routes.js'
app.use("/api/v1/users", userRouter)

export {app}
