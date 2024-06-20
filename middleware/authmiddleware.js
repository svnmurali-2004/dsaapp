const jwt=require('jsonwebtoken');


const authmiddleware=(req,res,next)=>{
    try{
    let token=req.headers.token;
    token = token.replace(/"/g, '');
    if (!token){
        res.status(401).json({ok:false,message:"No token found"})
    }else{
        jwt.verify(token,process.env.secretkey,(err,userdata)=>{
            if(err){
                res.status(401).send({ok:false,message:"Invalid token"})
            }else{
                req.userdata=userdata;
                next()
            }
        })
    }
    }catch(err){
        console.log(err)
    }
}

module.exports=authmiddleware