import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";
import { memberSubscription, subscriptionReminder, subscriptionUpdate } from "../controllers/subscription.controller.js";

const router = Router()

router.route("/subscription").post(upload.none(),VerifyJWT,memberSubscription)

router.route("/subscription-update").put(upload.none(),subscriptionUpdate)

router.route('/subscription-reminder/:id').get(subscriptionReminder)

export default router