//@desc login user
//@route post /api/users/login
//@access public
const user = require("../models/userSchema");
const questions=require("../models/questionsSchema")
const bcrypt = require("bcrypt");
const asyncHandler=require("express-async-handler")
const otpMailTemplate = require("../mailtemplates/otpMailTemplate");
const otp=require("../models/otpSchema")
const sendMail=require("../middleware/mailSender1")
const jwt=require("jsonwebtoken")


require("dotenv").config()
const login=asyncHandler(async(req,res,next)=>{
    try{
        const data=req.body;
        console.log(data)
        const user1=await user.findOne({email:data.email});
        
        if(!user1){
            res.status(400).send({ok:false,msg:"user not found"})
        }else{
            if(bcrypt.compare(data.password,user1.password)){
                console.log("password matched")
                const token=await jwt.sign({name:data.name,email:data.email},process.env.secretkey,{expiresIn:"1h"})
                res.status(200).send({ok:true,token:token})
            }else{
                res.status(400);
                res.send({ok:false,msg:"invalid password"})
            }
        }
    }catch(err){
        res.status(500);
        next(err)
    }
})

//@desc signup user
//@route /api/users/signup
//@access public
const signup=asyncHandler(async(req,res,next)=>{
    try{
        const data=req.body;
        console.log(data)
        const user1=await user.findOne({email:data.email})
        if(user1){
            res.status(400).send({ok:false,msg:"user aldready exits"}) 
        }else{
            const hashedpassword=await bcrypt.hash(data.password,10)
            const user2=new user({name:data.name,email:data.email,password:hashedpassword})
            
            await user2.save()
            res.status(200).send({ok:true,msg:"sign up success"})
        }
        }catch(err){
            next(err)
        }
    
})  

//@desc google auth
//@route post /api/users/googleauth
//@access public

const googleauth=asyncHandler(async(req,res,next)=>{
    try{
        const data=req.body;
        const user1=await user.findOne({email:data.email})
        if(user1){
            const token=await jwt.sign({name:data.name,email:data.email},process.env.secretkey,{expiresIn:"1h"})
            res.status(200).send({ok:true,token:token})
        }else{
        const user2=new user({name:data.name,email:data.email,verified:true,picture:data.picture,password:Date.now().toString()})
        const respo=await user2.save()
        if(respo){
            const token=await jwt.sign({name:data.name,email:data.email},process.env.secretkey,{expiresIn:"1h"})
            res.status(200).send({ok:true,token:token})
        }else{
            res.status(400).send({ok:false,msg:"signup failed"})
        }
        }
    }
    catch(err){
        next(err)
    }
})

//@desc get otp
//@route /api/user/getotp
//@access public

const getotp=asyncHandler(async(req,res,next)=>{
    try{
        const data=req.body;
        const user1=await user.findOne({email:data.email})
        if(user1){
            res.status(200).send({ok:false,msg:"user already exists"})
        }
        const temp=(Math.random()*10000 +10000).toString().substring(0,4)
        const otp1=await otp.updateOne({email:data.email},{name:data.name,otp:temp,expiresAt:Date.now()+60000*5},{upsert:true})
        console.log(otp1)
        const respo=await sendMail({from:"codebox012@gmail.com",to:data.email,subject:"otp verification",text:`your otp is ${temp}`,html:otpMailTemplate({name:data.name,otp:temp})})
        if(respo){
            res.send({ok:true,msg:"otpsent successfully"})
        }else{
            res.send({ok:false,msg:"otp sending failed"})
        }
    }catch(err){
        next(err)
    }
})
//@desc otpverify
//@Route /api/users/otpverify
//@access public
const otpverify=asyncHandler(async(req,res,next)=>{
    try{
        const data=req.body;
        const otp1=await otp.findOne({email:data.email})
        console.log(otp1)
        if(!otp1){
            res.send({ok:false,msg:"otp expired"})
        }
        
        if(Date.now()<otp1.expiresAt){
                if(otp1.otp==data.otp){
                res.send({ok:true,msg:"otp verified"})
                }else{
                    console.log('hello')
                    res.send({ok:false,msg:"otp invalid"})               
                }
            }
        else{
            res.send({ok:false,msg:"otp expired"})
        }
    }catch(err){
        next(err)
    }
})
module.exports={login,signup,googleauth,getotp,otpverify}
