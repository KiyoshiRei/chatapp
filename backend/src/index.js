import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.listen(PORT, ()=> {
    console.log("server is running on port"+ PORT)
    connectDB();
})
