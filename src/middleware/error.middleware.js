const sendError = require("../utils/response")

const errorMiddleware = (err ,res, req, next)=>{
    console.error(err)

    if(err.isOperational){
        return sendError(res, err.statusCode ,err.message)
    }

    return sendError(res , 500 , "Internal Server Error ")
}

module.exports = errorMiddleware