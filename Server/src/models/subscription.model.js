import mongoose from 'mongoose'

const subscriptionSchema= new mongoose.Schema({

    memberId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Member",
        required:true
    },

    startDate:{
        type: Date,
        required:true
    },

    endDate:{
        type:Date,
        required: true
    },

    Durationmonths:{
        type:Number,
        required: true
    },
    price:{
        type:Number,
        required: true
    }
})

// subscriptionSchema.pre('save',function(next){
//     console.log("yaha aa gya hu ma3")
//     if(this.isNew || this.isModified(this.Durationmonths)|| this.isModified(this.startDate)){
//         this.endDate= new Date(this.startDate)
//         this.endDate.setMonth(this.endDate.getMonth()+this.Durationmonths);
//   }
//   next()

// })

const Subscription = mongoose.model("Subscription",subscriptionSchema);

export default Subscription