const express = require('express'); 
const router = express.Router();    
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
router.use((req, res, next) => {
    const token=req.header.authtoken;
    if (!token){
        res.status(401).json({msg:"no aoken was found"})
    }
    try{
        jwt.sign(token,process.env.jwtsecret,(err,decoded)=>{
            if(err){
                res.status(401).json({msg:"token is not valid"})
            }
            req.user=decoded;
            next();
        })
    
    }catch{
         res.status(500).json({msg:"server error"})   
    }

});
