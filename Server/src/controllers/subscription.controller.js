import Subscription from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { RegisterContent, ReminderContent } from "../utils/genrateEmailContent.js";
import sendEmail from "../utils/nodemailer.js";


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

    const subscriptionCreated = await Subscription.findById(subscription._id).populate('memberId')
    // console.log("yaha aa gya hu ma 22")

    if (!subscriptionCreated) {
        const error = new ApiError(500, "error occured while storing the subsciption data")
        const jsonError = error.toJson();
        return res.status(500).json(jsonError)
    }

    // ab hume mail send karni h to hume subscription or member data dono chahiye jo hume mil chuka h populate() method ki wajah se
      
       // pehle email content hona chahiye
       const emailContent= RegisterContent(subscriptionCreated)

       // ab hume mail options chahiye
       const mailOptions={
        from:process.env.user,
        to: subscriptionCreated?.memberId?.email,
        subject:"Subscription Confirmation",
        html: emailContent
       }
    // ab email send karna h
    try {
        console.log("yaah aa gya hu ma 22")
        await sendEmail(mailOptions);
        return res.status(200).json(new ApiResponse(200, {}, " Member subsciption is active and Confirmation mail is sent"))
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Subscription Created but failed to send confirmation mail"})

    }


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

const subscriptionReminder= asyncHandler(async(req,res)=>{
const {id} = req.params

 // ab hume mail send karni h to hume subscription or member data dono chahiye
const subscriptionMemberData= await Subscription.findById(id).populate("memberId")

// ab hume mail content chahiye
const emailContent= ReminderContent(subscriptionMemberData)

// email options chahiye hume
const mailOptions={
    from:process.env.user,
    to: subscriptionMemberData?.memberId?.email,
    subject:"Subscription End",
    html: emailContent
   }

//    ab send karni h email
try {
    await sendEmail(mailOptions)
    return res.status(200).json(new ApiResponse(200, {}, "Reminder Email is Sent Successfully"))
} catch (error) {
    console.log(error)
    return res.status(500).json({message:"Reminder Email is not sent"})
}
})


export { memberSubscription, subscriptionUpdate,subscriptionReminder }