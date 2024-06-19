const mongoose=require("mongoose");

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