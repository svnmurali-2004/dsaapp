<<<<<<< HEAD
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
=======
const mongoose =require("mongoose")
const connectDB=async()=>{
try{
    await mongoose.connect(process.env.uri)
    console.log("Database connected")
}
catch(err){
    console.log(err)
    process.exit(1)
}
}

module.exports={connectDB,mongoose};
>>>>>>> 890b694717a7aebd94ae64fd500d7960c25e8760
