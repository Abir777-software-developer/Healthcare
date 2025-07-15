import express from "express"
import { protectRoute } from "../middlwares/auth.middleware.js"
import { handleReport } from "../controllers/report.controller.js"
import { upload } from "../middlwares/multer.middleware.js"

const router = express.Router()

router.use(protectRoute)

router.post("/postReport",
    upload.fields([
        {
            name : "report",
            maxCount : 1
        }
    ]),
    handleReport
)


export default router