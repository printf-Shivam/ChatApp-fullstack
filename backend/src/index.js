import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import path from "path"
import {app, server} from "./lib/socket.js"

import {connectDB} from "./lib/db.js"
import authRouter from "./routes/auth.route.js"
import messageRouter from "./routes/message.route.js"
import cookieParser from "cookie-parser"


dotenv.config();

const __dirname=path.resolve();
// const app = express();

const PORT = process.env.PORT;
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))



// mongoose
//   .connect("mongodb+srv://shivamkrsingh:EkG92RE3sZ37gJRn@cluster0.dgt7e.mongodb.net/chatdb?retryWrites=true&w=majority&appName=Cluster0")
//   .then((e) => console.log("MongoDB Connected"));

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}


server.listen(PORT,()=>{
    console.log("server running at port: "+ PORT);
    connectDB();
})