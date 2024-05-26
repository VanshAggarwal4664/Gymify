import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";
import { memberSubscription, subscriptionUpdate } from "../controllers/subscription.controller.js";

const router = Router()

router.route("/subscription").post(upload.none(),VerifyJWT,memberSubscription)

router.route("/subscription-update").put(upload.none(),subscriptionUpdate)

export default router