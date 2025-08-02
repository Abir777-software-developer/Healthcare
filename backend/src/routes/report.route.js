import express from "express"
import { protectRoute } from "../middlwares/auth.middleware.js"
import { handleReport } from "../controllers/report.controller.js"
import { upload } from "../middlwares/multer.middleware.js"

const router = express.Router()

router.use(protectRoute)

router.post("/postReport",
    (req, res, next) => {
        const uploadHandler = upload.fields([{ name: "report", maxCount: 1 }]);
        
        uploadHandler(req, res, (err) => {
            if (err) {
                console.log(err.message)
                return res.status(400).json({ message: "Upload related failure" });
            }
            next();
        });
    },
    handleReport
);


export default router