import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {ValidEmail} from '../utils/ValidEmail.js'
import Member from '../models/member.model.js'
import {deleteImageCloudinary, uploadonCloudinary} from '../utils/cloudinary.js'
import {ValidNumber} from '../utils/ValidNumber.js'
import Subscription from '../models/subscription.model.js'


const registerMember = asyncHandler( async(req,res)=>{
    // data sambhalna h jo aa raha h 
     const {fullName ,email, mobileNumber}= req.body
     console.log(fullName ,email ,mobileNumber);
    // fir check karenge data sahi h nahi
    if([fullName, email,mobileNumber].some((field)=>{
        return field?.trim() === ""
    })){
       const error= new ApiError(400,"all fields are required")
       const jsonError=error.toJson();
       return res.status(400).json(jsonError);
    }

    if(!ValidEmail(email)){
        const error= new ApiError(400,"email format is incorrect")
        const jsonError=error.toJson();
        return res.status(400).json(jsonError);
    }
    if(!ValidNumber(mobileNumber)){
        const error= new ApiError(400,"number format is incorrect")
        const jsonError=error.toJson();
       return res.status(400).json(jsonError)
    }
    // yeh bhi check karenge ki agar same member wapis register na ho raha ho

    const ExistedMember= await Member.findOne({
        $and:[{fullName},{email},{mobileNumber}]
    })

    if(ExistedMember){
        const error= new ApiError(409,"Member already Exist")
        const jsonError= error.toJson();
       return  res.status(409).json(jsonError);
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

    return res.status(200).json(new ApiResponse(200,{memberId: MemberCreated._id},"Member Created Successfully"))
})

const viewMember= asyncHandler(async(req,res)=>{
     const ownerId = req.jwtuser._id;
     const MemberList = await Subscription.find({ownerId}).populate('memberId');

     if(!MemberList.length){
        const error= new ApiError(500,"issue occur while fetching data from database")
        const jsonError=error.toJson()
        return res.status(500).json(jsonError)
     }
     res.status(200).json(new ApiResponse(200,MemberList,"Member list data fetched successfully"))

})

const deleteMember= asyncHandler(async(req,res)=>{
   const {id,photoid}= req.params;
    const subscription= await Subscription.findById(id)

    if(!subscription){
      throw new ApiError(400,"subscription not found")
    }
    const memberId = subscription.memberId
    await Member.findByIdAndDelete(memberId)
   await Subscription.findByIdAndDelete(id)
   const response = deleteImageCloudinary(photoid)
   if(!response){
   console.log("error occured while deleting image from cloudinary")
   }
   //  console.log(member)
   return res.status(200).json(new ApiResponse(200,{},"Member Deleted Successfully"))


})

export {registerMember, viewMember,deleteMember}