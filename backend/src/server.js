import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import  dotenv from "dotenv"
import connectDB from "./db/db.js"
import authRoutes from "./routes/auth.route.js"
import reportRoutes from "./routes/report.route.js"

dotenv.config({
    path : "./env"
})

const app = express()
const PORT = process.env.SERVER_PORT

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

//to access req just as a simple object
app.use(express.json())
//to access and store files in public directory
app.use(express.static("public"))
//to access cookies
app.use(cookieParser())


// api routes
app.use("/api/auth",authRoutes)
app.use("/api/report",reportRoutes)

// app.use()

// database connection
app.listen(PORT, ()=>{
    console.log(`Server is running on port : ${PORT}`)
    connectDB()
})