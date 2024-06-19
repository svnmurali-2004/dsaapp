const {constants}=require("../constants")

const errorhandler=(err,req,res)=>{
    const status=err.status?err.status:500;
    switch(status){
        case constants.FORBIDDEN:
            res.status(403).json({ok:false,message:"Forbidden"})
            break;
        case constants.SERVER_ERROR:
            res.status(500).json({ok:false,message:"Server error"})
            break;
        case constants.NOT_FOUND:
            res.send({ok:false,mssage:"Not found"})
            break;
        case constants.UNAUTHORIZED:
            res.send({ok:false,message:"Unauthorized"})
            break;
        case constants.BAD_REQUEST: 
            res.send({ok:false,message:"Bad request"})
            break;
        default:
            res.send({ok:false,message:"Something went wrong"})
            break;
    }
    
        next();

}


module.exports=errorhandler;