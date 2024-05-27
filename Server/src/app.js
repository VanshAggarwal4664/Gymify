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
import memberRouter from './routes/member.route.js'
import planRouter from './routes/subscription.routes.js'
// routes declaration 

// yaha Gym owners ko sambhala ja raha h
app.use("/api/v1/users", userRouter)

//yaha gym ke members ko sambhala ja raha h
app.use("/api/v1/members",memberRouter);

//yaha members ki subscription sambhali ja rahi h
app.use("/api/v1/plan",planRouter);

export {app};