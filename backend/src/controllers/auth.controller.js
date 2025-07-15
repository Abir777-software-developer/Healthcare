import { User } from "../models/User.model.js"
import jwt from "jsonwebtoken"

const signup = async (req,res)=>{
    try {
        const {fullName,email,password} = req.body

        //checking all fields 
        if([fullName,email,password].some((field)=>field?.trim()=== "")){
            return res
            .status(400)
            .json({message : "all fields are required"})
        }

        // checking password
        if(password.length < 6){
            return res
            .status(400)
            .json({message : "password must have atleast 6 characters"})
        }

        //checking email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res
            .status(400)
            .json({message : "invalid email format"})
        }

        //now checking user already exists or not
        const existedUser = await User.findOne({email})

        if(existedUser){
            return res
            .status(400)
            .json({message : "email already exists"})
        }

        // user create
        const newUser = await User.create({
            fullName,
            email,
            password
        })

        if(!newUser){
            return res
            .status(400)
            .json({message : "can not create user"})
        }

        //setting cookies

        // 1. making token
        const token = jwt.sign(
            {
                userId : newUser?._id
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn : "7d"
            }
        )

        // 2. setting options
        const options = {
            maxAge: 7*24*60*60*1000,
            httpOnly: true, //xss attack
            sameSite: "strict", //csrf attack
            secure: true
        }

        return res
        .cookie("jwt",token,options)
        .status(200)
        .json({user : newUser})

    } catch (error) {
        console.log("error is signup controller : ",error.message)
       return res
        .status(500)
        .json({message : "internal server error"})
    }
}

const login = async (req,res)=>{
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res
            .status(400)
            .json({message : "all fields are required"})
        }

        const user = await User.findOne({email})

        if(!user){
            return res
            .status(401)
            .json({message : "invalid email or password"})
        }

        const isPasswordCorrect = await user.comparePassword(password)

        if(!isPasswordCorrect){
            return res
            .status(401)
            .json({message : "invalid password"})
        }

        //cookie
        const token = jwt.sign(
            {
                userId : user._id
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "7d"
            }
        )

        const options = {
            maxAge: 7*24*24*60*1000,
            httpOnly: true,
            sameSite: "strict",
            secure: true
        }

        return res
        .cookie("jwt",token,options)
        .json({user : user})
        
    }catch(error){
        console.log("error in login controller : ",error.message)
        return res
        .status(500)
        .json({message : "internal server error"})
    }
}

const logout = async (req,res) => {
    try{
        return res
        .clearCookie("jwt")
        .json({message:"user logout successfully"})
    }catch(error){
        console.log("error in logout controller : ",error.message)
        return res
        .status(500)
        .json({message : "internal server error"})
    }
}

export {signup,login,logout}