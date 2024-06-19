const mongoose=require("mongoose")

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.uri);
        console.log("MongoDB connection successfull")

    }catch(err){
        console.log(err)
    }
}

module.exports=connectDB