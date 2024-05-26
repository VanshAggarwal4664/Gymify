import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";
import { deleteMember, registerMember, viewMember } from "../controllers/member.controller.js";



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

router.route("/view-members").get(VerifyJWT,viewMember)
router.route('/:id/:photoid').delete(deleteMember)

export default router;