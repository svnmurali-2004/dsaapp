const constants=require("../constants")
const errorHandler = (err, req, res,next) => {
    const statuscode=res.statusCode?res.statusCode:500;
    switch(statuscode){
        case constants.NOT_FOUND:
            res.send({
                ok:false,
                title:'Not Found',
                msg:err.message,
                stackTrace:err.stack
            })
            break;
        case constants.VALIDATION_ERROR:
            res.send({
                ok:false,
                title:'Validation Error',
                msg:err.message,
                stackTrace:err.stack
            })
            break;
        case constants.UNAUTHORIZED:
            res.send({
                ok:false,
                title:'Unauthorized',
                msg:err.message,
                stackTrace:err.stack
            })
            break;
        case constants.SERVER_ERROR:        
            res.send({
                ok:false,
                title:'Server Error',
                msg:err.message,
                stackTrace:err.stack
            })
            break;
        case constants.FORBIDDEN:
            res.send({
                ok:false,
                title:'Forbidden',
                msg:err.message,
                stackTrace:err.stack
            })
            break;
        default:
            res.send({
                ok:false,
                title:'Error',
                msg:err.message,
                stackTrace:err.stack
            }
            )
            break;


        }
       
}

module.exports = errorHandler;  // Export the errorHandler function