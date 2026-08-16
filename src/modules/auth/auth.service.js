const  {
  findUserByEmail,
  findUserByPhone,
  findUserById,
  createUser,
  markUserVerified,
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  deleteAllRefreshTokens,
} = require('./auth.repository')
const {hashPassword,comparePassword} = require("../../utils/password")
const {generateAccessToken,generateRefreshToken,verifyRefreshToken, verifyAccessToken} = require("../../utils/jwt")
const {generateOtp} = require("../../utils/otp")
const ApiError = require("../../utils/ApiError")
const  redisClient = require("../../config/redis")
const { hash } = require('bcryptjs')

const getRefreshTokenExpiry = ()=>{
    const date = new Date()
    date.setDate(date.getDate()+7)
    return date
}
// Email Registration
const registerWithEmail = async({name,email,password})=>{
    const existingUser = await findUserByEmail(email) 
    if(existingUser) throw new ApiError(409,"Email already registered")

    const password_hash = await hashPassword(password)
    const userId = await createUser({name,email, password_hash})
    return userId
}
// Phone Registration — sends OTP
const registerWithPhone = async({name,phone})=>{
    const existingUser  = await findUserByPhone(phone)
    if(existingUser) throw new ApiError(409,"Phone already registered")

    await redisClient.setEx(`register:${phone}`,500,JSON.stringify({name,phone}))

    const otp = generateOtp()
    await redisClient.setEx(`otp:${phone}`,500,otp)

    console.log(`OTP for ${phone}: ${otp}`)

    return {message:"OTP sent SuccessFully"}
}

const verifyOtp = async({phone,otp})=>{
    const storedOtp = await redisClient.get(`otp:${phone}`)
    if(!storedOtp) throw new ApiError(400,"OTP Expired")
    if(storedOtp!==otp) throw new ApiError(400,"Invalid OTP")

    const storedData = await redisClient.get(`register:${phone}`)
    if(!storedData) throw new ApiError(400,"Registeration session Expired")

    const {name} = JSON.parse(storedData)
    const userId = await createUser({name,phone})
    await markUserVerified(userId)

    await redisClient.del(`otp:${phone}`)
    await redisClient.del(`register:${phone}`)

    const user = await findUserById(userId)
    console.log(user)

    const accessToken = await generateAccessToken({id:user.id , role: user.role})
    const refreshToken = await generateRefreshToken({id:user.id , role: user.role})

    await saveRefreshToken({
        user_id:user.id,
        token:refreshToken,
        expires_at:getRefreshTokenExpiry()
    })

    return { accessToken, refreshToken };

}

const loginWithEmail = async({email,password})=>{
    const user = await findUserByEmail(email)
    if(!user) throw new ApiError(401,"Invalid Credentials")
    if(!user.is_active) throw new ApiError(403,"Account is deactivated")
    
    const isMatch = await comparePassword(password,user.password_hash)
    if(!isMatch) throw new ApiError(401,"Invalid Credentials")

    const accessToken = await generateAccessToken({id:user.id , role: user.role})
    const refreshToken = await generateRefreshToken({id:user.id , role: user.role})
    await saveRefreshToken({
        user_id:user.id,
        token:refreshToken,
        expires_at:getRefreshTokenExpiry()
    })

    return { accessToken, refreshToken };
    
}

const loginWithPhone = async({phone})=>{
    const user = await findUserByPhone(phone)
    if(!user) throw new ApiError(404,"Phone Number not registered")
    if(!user.is_active) throw new ApiError(403,"Account is deactivated")

    const otp = generateOtp()
    await redisClient.setEx(`otp:${phone}`,180,otp)

    console.log(`OTP for ${phone} : ${otp}`)

    return {message:"OTP sent Successfully"}
}

const verifyLoginOtp = async({phone,otp})=>{
    const storedOtp = await redisClient.get(`otp:${phone}`)
    if(!storedOtp) throw new ApiError(400,"OTP Expired")
    if(storedOtp!==otp) throw new ApiError(400,"Invalid OTP")

    const user = await findUserByPhone(phone)
    if(!user) throw new ApiError(404,"user not Found")

    await redisClient.del(`otp:${phone}`)

    accessToken = await generateAccessToken({id:user.id , role: user.role})
    refreshToken = await generateRefreshToken({id:user.id , role:user.role})

    await saveRefreshToken({
        user_id:user.id,
        token:refreshToken,
        expires_at:getRefreshTokenExpiry()
    })

    return {accessToken,refreshToken}
}

const refreshToken = async(token)=>{
    const stored = await findRefreshToken(token)
    if(!stored) throw new ApiError(401,"Invalid refresh Token")
    
    let decoded
    try{
        decoded = verifyRefreshToken(token)
    }catch{
        throw new ApiError(401,"refresh token Expired")
    }

    const accessToken = generateAccessToken({id:decoded.id , role:decoded.role})
    return {accessToken}
}

const logout =async(token,accessToken)=>{
    await deleteRefreshToken(token)

    await redisClient.setEx(`blacklist:${accessToken}`, 60*15 , 'revoked')

    return {message:"Logged Out Successfully"}
}

const logoutAll = async(userId,accessToken)=>{
    await deleteAllRefreshTokens(userId)
    await redisClient.setEx(`blacklist:${accessToken}`,60*15,'revoked')

    return {message:"logged Out from all devices"}
}

module.exports = {
  registerWithEmail,
  registerWithPhone,
  verifyOtp,
  loginWithEmail,
  loginWithPhone,
  verifyLoginOtp,
  refreshToken,
  logout,
  logoutAll,
};