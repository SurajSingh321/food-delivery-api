const ApiError = require("../utils/ApiError")
const {verifyAccessToken} = require("../utils/jwt")
const redisClient  = require("../config/redis")


const authenticate = async(req ,res ,next)=>{
    try{
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return next(new ApiError(401 , "Access token missing"))
        }

        const token = authHeader.split(" ")[1]

        const isBlacklist = await redisClient.get(`blacklist:${token}`)
        if(isBlacklist){
            next(new ApiError(401 , "Token has been Revoked"))
        }
        
        const decoded = verifyAccessToken(token)
        req.user = decoded
        next()
    }catch(err){
        return next(new ApiError(401,"Inavlid or Expired Token"))
    }
}


module.exports = {authenticate}