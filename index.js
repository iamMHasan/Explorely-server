import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import userRouter from "./routes/user.js"
import tourRouter from "./routes/tour.js"

dotenv.config()
const  port = process.env.PORT || 5000
const app = express()

// app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

app.use("/users", userRouter)
app.use("/tours", tourRouter)


mongoose.connect(process.env.DATABASE)
.then(()=> console.log("database connected"))

app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})