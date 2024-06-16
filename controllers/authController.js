//@desc login
//@route post /api/login
// access public
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const asyncHandler=require("express-async-handler");
const user = require("../models/userSchema");
require("dotenv").config();
const login=asyncHandler(async(req,res,next)=>{
    try{
        const data=req.body;
        const user1=await user.findOne({email:data.email});
        if (!user1){
            res.status(404).send({ok:false,msg:"user not found"})
        }else{
            if (bcrypt.compare(data.password,user1.hashedpassword)){
                
                const token =jwt.sign({name:data.name,email:data.email},process.env.jwtsecret,{expiresIn:"1h"})
                res.send({ok:true,msg:"user found",token:token})
            }
            res.send({ok:false,msg:"password incorrect"})
        }
    }catch(err){
        res.status(500);
        next(err)
    }
})

//@desc signup
//@route post /api/signup
//access public
const signup=asyncHandler(async(req,res,next)=>{
    try{
        const data=req.body;
        const user1=await user.findOne({email:data.email});
        console.log(user1)
        if (user1){
            res.send({ok:false,msg:"user already exists"})

        }
        else{
            console.log(data)
            const hashedpassword=await bcrypt.hash(data.password,10);
            const user2=new user({...data,hashedpassword:hashedpassword});
            user2.save();
            res.send({ok:true,msg:"user created"})
        } 
    }catch(err){
        next(err)
    }
})
module.exports={login,signup} 