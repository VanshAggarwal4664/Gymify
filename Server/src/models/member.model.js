import mongoose, { Schema }  from "mongoose";

const memberSchema= new mongoose.Schema(
  {
   fullName:{
    type: String,
    required:true,
    lowercase:true
   },

   email:{
    type: String,
    required: true,
    unique:true
   },

   mobileNumber:{
       type:Number,
       required: true,
   },
 
   ownerId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User",
     required:true
   },

   photo:{
        type:String      // cloudinary url
   },
  
},
 
{
  timestamps:true,
}
)


 const Member = mongoose.model("Member",memberSchema)

 export default Member