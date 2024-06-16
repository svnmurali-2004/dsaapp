//@desc login
//@route post /api/login
// access public
const jwt=require("jsonwebtoken")
const asyncHandler=require("express-async-handler");
const user = require("../models/userSchema");
const login=asyncHandler(async(req,res,next)=>{
    try{
        const data=req.body;
        const user1=user.find({email:data.email});
        if (!user1){
            res.status(404).send({ok:false,msg:"user not found"})
        }else{
            if (data.password===user1.password){
                const token =jwt.sign({name:data.name,email:data.email},process.env.secretkey,{expiresIn:"1h"})
            }
        }
    }catch(err){
        res.status(500);
        next(err)
    }
})

//@desc signup
//@route post /api/signup
//access public
const signup=asyncHandler(async(req,res)=>{
    try{
        const data=req.body;
        const user1=user.findOne({email:data.email});
        if (user1){
            res.send({ok:false,msg:"user already exists"})

        }
        else{
            const user2=new user(data);
            user2.save();
            res.send({ok:true,msg:"user created"})
        }
    }catch(err){
        next(err)
    }
})
module.exports={login,signup}