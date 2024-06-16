const express=require("express")
const app=express("express")
exports.app = app
const cors=require("cors")
require("dotenv").config()
app.use(express.json())
app.use(cors())
const errorHandler=require("./middlewares/errorHandler")    
const jwt=require("jsonwebtoken")
const {connectDB}=require("./db")
const authmiddleware=require("./middlewares/authmiddleware")
const user=require("./models/userSchema")
const questions=require("./models/questionsSchema")
const userRoute=require("./routers/userRoute")
console.log(process.env.uri)

app.use(userRoute)
function jwttokengenerator(userdetails){
    return jwt.sign(userdetails,process.env.jwtsecret,{expiresIn:"1h"})
}
app.post("/api/verify",authmiddleware,async(req,res)=>{
    console.log("user verified")
    res.send("user verified")
})

app.post("/api/signup",async(req,res)=>{
    try{
        const data=req.body;
        const respo1=await user.findOne({email:data.email});
        if(respo1){
            res.send({ok:false,msg:"user already exists"})
        }else{
        console.log(respo1)
        const user1=new accounts(data);
        // const respo2=await accounts.insertOne(user1);
        user1.save();
        console.log("user created")
        res.send({ok:true,msg:"user created"})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send({ok:false,msg:"server error"})
    }
})

app.post("/api/getquestions",async(req,res)=>{
    try{
        const questionsset=await questions.findOne({});
        res.send({ok:true,msg:"question fetched",questions:questionsset})
    }catch(err){
        console.log(err)
        res.status(500).send({ok:false,msg:"server error"})
    }
}   )

app.post("/api/markassolved",authmiddleware,async(req,res)=>{
    try{
        const userdata=req.userdata;
        const data=req.body;
        const user1=await user.updateOne({email:userdata.email},{$push:{solved:data.item}});
        console.log(user1)
        console.log(data.item)
        console.log(await user.find({email:userdata.email}))
        res.send({ok:true,msg:"solved updated"})

    }catch(err){
        console.log(err)
        res.status(500).send({ok:false,msg:"server error"})
    
    }
})

app.post("/api/markasunsolved",authmiddleware,async(req,res)=>{
    try{
        const userdata=req.userdata;
        const data=req.body;
        const user1=await user.updateOne({email:userdata.email},{$pull:{solved:data.item}});
        console.log(user1)
        res.send({ok:true,msg:"solved updated"})

    }catch(err){
        console.log(err)
        res.status(500).send({ok:false,msg:"server error"})
    
    }
})

app.post("/api/gethomequestions",async(req,res)=>{
    try{
        const questionsset=await questions.findOne({}).select({_id:1,sections:1,categories:1}).exec();
        res.send({ok:true,msg:"question fetched",questions:questionsset})
    }catch(err){
        console.log(err)
        res.status(500).send({ok:false,msg:"server error"})
    
    }
})
app.post("/api/getprofile",authmiddleware,async(req,res,next)=>{
    try{
        const userdata=req.userdata;
        const user1=await user.findOne({email:userdata.email}).select({_id:0,name:1,email:1,solved:1,badges:1}).exec();
        conso
        res.send({ok:true,msg:"profile fetched",profile:user1})
    }catch(err){
        console.log(err)
        res.status(500)
        next(err)
    }

})
connectDB().then(()=>{
    app.listen(5000,()=>{console.log("server is running on the port 5000")})

})
app.use(errorHandler)
 