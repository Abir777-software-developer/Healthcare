import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema =  new mongoose.Schema({
    fullName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
},
    {timestamps:true}
)

// encrypt the password before saving
userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();

    try{
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
        next()
    }catch(error){
        console.log("error while encrypting password")
        next(error)
    }
})

userSchema.methods.comparePassword = async function (password) {
    const isPasswordCorrect = await bcrypt.compare(password,this.password)
    return isPasswordCorrect
}

export const User = mongoose.model("User",userSchema)