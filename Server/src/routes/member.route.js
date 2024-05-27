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


// yaha member ko view karna h saarr
router.route("/view-members").get(VerifyJWT,viewMember)

// yaha member ka data and subscription ke data ko delete kar rahe h
router.route('/:id/:photoid').delete(deleteMember)

export default router;