import Subscription from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const memberSubscription = asyncHandler(async (req, res) => {
    // subscription ka data aayega front end se usko manage karna h

    const { memberId, startDate, Durationmonths, price, endDate } = req.body
    // validate karna h data ko
    if ([memberId, startDate, Durationmonths, price, endDate].some((field) => {
        if (typeof field === 'string') {
            return field.trim() === ""
        }
        if (typeof field === 'number') {
            return isNaN(field)
        }
        if (field instanceof Date) {
            return isNaN(field.getTime());
        }

        return field === null || field === undefined;
    })) {
        const error = new ApiError(409, "All fields are required")
        const jsonError = error.toJson();
        return res.status(409).json(jsonError)
    }
    // data upload karne se pehle check karna padega ki wapis same memberid se to kuch change nahi kar raha

    const existedSubscription = await Subscription.findOne({ memberId })

    if (existedSubscription) {
        const error = new ApiError(409, "this member already have subscription")
        const jsonError = error.toJson()
        return res.status(409).json(jsonError);
    }


    // ab data backend ma daalna h 
    console.log("yaha aa gya hu ma 2")
    console.log(startDate, Durationmonths, price, memberId);
    const ownerId = req.jwtuser._id

    const subscription = await Subscription.create({
        memberId,
        ownerId,
        startDate,
        Durationmonths,
        price,
        endDate
    })

    const subscriptionCreated = await Subscription.findById(subscription._id)
    console.log("yaha aa gya hu ma 22")

    if (!subscriptionCreated) {
        const error = new ApiError(500, "error occured while storing the subsciption data")
        const jsonError = error.toJson();
        return res.status(500).json(jsonError)
    }

    return res.status(200).json(new ApiResponse(200, {}, "Now the member subsciption is active"))

})

const subscriptionUpdate = asyncHandler(async (req, res) => {
    const { subscriptionId, startDate, Durationmonths, price, endDate } = req.body

    if ([subscriptionId, startDate, Durationmonths, price, endDate].some((field) => {
        if (typeof field === 'string') {
            return field.trim() === ""
        }
        if (typeof field === 'number') {
            return isNaN(field)
        }
        if (field instanceof Date) {
            return isNaN(field.getTime());
        }

        return field === null || field === undefined;
    })) {
        const error = new ApiError(409, "All fields are required")
        const jsonError = error.toJson();
        return res.status(409).json(jsonError)
    }

    const response = await Subscription.findByIdAndUpdate(subscriptionId,
        {
            $set: { startDate, Durationmonths, price, endDate }
        },
        {
            new: true
        }
    )
    if (!response) {
        throw new ApiError(200, "error occured while updating subscription details")
    }
    return res.status(200).json(new ApiResponse(200, {}, "Subscription Details Update Successfully"))
})


export { memberSubscription, subscriptionUpdate }