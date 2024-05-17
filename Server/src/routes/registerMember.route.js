import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";
import { registerMember } from "../controllers/member.controller.js";


const router = Router();


router.route("/register").post(
    upload.fields(
        [
            {
                name:"photo",
                maxCount:1
            }
        ]
   
),VerifyJWT,registerMember)

export default router;