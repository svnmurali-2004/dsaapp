const express = require('express'); 
const router = express.Router();    
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
function authmiddleware (req, res, next){
    const token=req.headers.authtoken;
    console.log(req.headers)
    console.log(token,"token");

    if (!token){
        res.status(401).json({msg:"no aoken was found"})
    }
    try{
        jwt.verify(token,process.env.jwtsecret,(err,user)=>{
            if(err){
                res.status(401).json({msg:"invalid token"})
            }
            req.userdata=user;
            next();
        })
    
    }catch{
         res.status(500).json({msg:"server error"})   
    }

};

module.exports = authmiddleware;