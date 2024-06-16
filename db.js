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