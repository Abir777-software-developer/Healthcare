import mongoose from "mongoose"

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`mongoDB connected to ${conn.connection.host}`)
    }catch(error){
        console.log("Error in connecting to mongodb")
        process.exit(1)
    }
}

export default connectDB