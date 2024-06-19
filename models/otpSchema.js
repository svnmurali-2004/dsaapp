const mongoose=require("mongoose")

const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        
    },
    expiresAt:{
        type:Date,
        default:Date.now()+60000*5,
    }

});

const otp=mongoose.model("otp",otpSchema);

module.exports=otp