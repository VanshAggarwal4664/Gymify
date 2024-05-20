import dotenv from 'dotenv';
dotenv.config()
import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app=express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
}))

app.use(express.json({limit:"16kb"}));
app.use(urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("Public"));
app.use(cookieParser());

///import routes
import userRouter from './routes/user.routes.js';
import memberRouter from './routes/registerMember.route.js'

// routes declaration 

// yaha Gym owners ko sambhala ja raha h
app.use("/api/v1/users", userRouter)

//yaha gym ke members ko sambhala ja raha h
app.use("/api/v1/members",memberRouter);

export {app};