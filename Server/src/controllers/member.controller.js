import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {ValidEmail} from '../utils/ValidEmail.js'
import Member from '../models/member.model.js'
import {uploadonCloudinary} from '../utils/cloudinary.js'
import {ValidNumber} from '../utils/ValidNumber.js'


const registerMember = asyncHandler( async(req,res)=>{
    // data sambhalna h jo aa raha h 
     const {fullName ,email, mobileNumber}= req.body
     console.log(fullName ,email ,mobileNumber);
    // fir check karenge data sahi h nahi
    if([fullName, email,mobileNumber].some((field)=>{
        return field?.trim() === ""
    })){
        throw new ApiError(400,"all fields are required")
    }

    if(!ValidEmail(email)){
        throw new ApiError(400,"email format is incorrect")
    }
    if(!ValidNumber(mobileNumber)){
        throw new ApiError(400,"number format is incorrect")
    }

    // image alag se sambhale ge and check nahi karenge kyuki yeh required field nahi h
     const photoLocalPath= req.files?.photo[0]?.path;
 
    // then upload on cloudinary
       const photo= await uploadonCloudinary(photoLocalPath)

    // ab Owner id bhi to daalni h wo id humamre auth middleware se milegi kyuki wo jwt user deta h hume

    const ownerId = req.jwtuser._id
    //then database ma save karenge 
     const member = await Member.create({
       fullName,
        email,
        ownerId,
        mobileNumber,
        photo: photo?.url || " "
     })
      
     const MemberCreated = await Member.findById(member._id)

     if(!MemberCreated){
        throw new ApiError(500,"Error Occur while registring the Member")
     }
    //then user ko return kar denge value

    return res.status(200).json(new ApiResponse(200,{},"Member Created Successfully"))
})

export {registerMember}