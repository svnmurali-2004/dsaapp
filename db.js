const mongoose =require("mongoose")
const connectDB=()=>{
try{
    mongoose.connect(process.env.uri,{unifiedTopology:true,useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false})
    console.log("Database connected")
}
catch(err){
    console.log(err)
}
}

module.exports=connectDB;