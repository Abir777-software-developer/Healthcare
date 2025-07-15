import express from "express"
import { login, logout, signup } from "../controllers/auth.controller.js"
import { protectRoute } from "../middlwares/auth.middleware.js"


const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)

//sending the registered user's details
router.get("/registeredUser",protectRoute,(req,res)=>{
    return res
    .status(200)
    .json({user : req.user})
})

export default router