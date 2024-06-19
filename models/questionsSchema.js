const mongoose=require("mongoose");
<<<<<<< HEAD

const questionSchema=new mongoose.Schema({

    "title": {
        "type": "String",
        default:""
    },
    "qlink": {
        type: "String",
        default:""
    },
    "sollink": {
        type: "String",
        default:""
    },
    "difficulty": {
        type:String,
        required:true
    },
    "description":{
        type:String,
        default:""
    }
},{schema:false})

const questions=mongoose.model("questions",questionSchema);
module.exports=questions
=======
const questionSchema=new mongoose.Schema({
    // questions:{
    //     type:Array,
    //     required:true
    // },
    // sections:{
    //     type:Array,
    //     required:true
    // },
    // categories:{
    //     type:Array,
    //     required:true
    // },
    // totalquestions:{
    //     type:Number,
    //     required:true
    // }
},{strict:false})  
const questions=mongoose.model("questions",questionSchema,'questions');
module.exports =questions;
>>>>>>> 890b694717a7aebd94ae64fd500d7960c25e8760
