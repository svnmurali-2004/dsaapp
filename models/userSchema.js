<<<<<<< HEAD
const mongoose=require("mongoose")

=======
const mongoose=require('mongoose')
>>>>>>> 890b694717a7aebd94ae64fd500d7960c25e8760
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
<<<<<<< HEAD
    },password:{
        type:String,
        required:true
    },solved:{
        type:Array,
        default:[]
    },badges:{
        type:Array,
        default:[]
    },
    verified:{
        type:Boolean,
        default:false
    
    },
    picture:{
        type:String,
        default:"https://www.gravatar.com/avatar/"
    }
    }
,{timestamps:true});
const user=mongoose.model("user",userSchema)
module.exports=user
=======
    },
    hashedpassword:{
        type:String,
        required:true
    },
    solved:{
        type:Array,
        default:[]
    },
    badges:{
        type:Array,
        default:[]
    }
})
const user=mongoose.model("user",userSchema);
module.exports=user;
>>>>>>> 890b694717a7aebd94ae64fd500d7960c25e8760
