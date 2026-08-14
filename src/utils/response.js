

const successResponse = (res, statusCode , message , data = null)=>{
    const response = {success:true ,message}
    if(data!==null) response.data = data;
    return res.status(statusCode).json(response)
}

const sendError = (res , statusCode , message , error = null)=>{
    return  res.status(statusCode).json({
        success:false,
        message,
        error
    })
}

module.exports = {successResponse,sendError}