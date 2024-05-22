import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";
import { memberSubscription } from "../controllers/subscription.controller.js";

const router = Router()

router.route("/subscription").post(upload.none(),VerifyJWT,memberSubscription)

export default router