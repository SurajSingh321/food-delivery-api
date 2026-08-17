const userRepository = require('./user.repository')
const ApiError = require("../../utils/ApiError")
const cloudinary = require("../../config/cloudinary")
const  uploadToCloudinary  = require('../../utils/uploadToCloudinary')

const getProfile = async(userId)=>{
    const user = await userRepository.findUserById(userId)
    if(!user) throw new ApiError(404,"User not found ")
    return user
}

const updateProfile = async(userId,data)=>{
    const user = await userRepository.findUserById(userId)
    if(!user) throw new ApiError(404,"User not found ")
    
    await userRepository.updateUser(userId,data)
    return await userRepository.findUserById(userId)
}

const uploadProfileImage = async(userId,file)=>{
    if(!file) throw new ApiError(400,"No images found")
    
    const user = await userRepository.findUserById(userId)
    if(!user) throw new ApiError(404,"User not found")

    // delete old Image if eixit
    if(user.profile_image){
        const publicId = user.profile_image.split("/").pop().split('.')[0]
        await cloudinary.uploader.destroy(`food-delivery/profiles/${publicId}`)
    }
    const result = await uploadToCloudinary(file,"food-delivery/profiles")
    await userRepository.updateUser(userId,{profile_image:result.secure_url})

    return await userRepository.findUserById(userId)
}

const deleteUserAccount = async(userId)=>{
    const user = await userRepository.findUserById(userId)
    if(!user) throw new ApiError(404,"User not found")
    await userRepository.deleteUser(userId)
    return {message:"Account successfully deleted"}
}

const getAllUsers = async()=>{
    return await userRepository.findAllUsers()
}

const changeUserRole = async(userId,role)=>{
    const validRoles = ['customer', 'restaurant_owner', 'delivery_partner', 'admin'];
    if (!validRoles.includes(role)) throw new ApiError(400, 'Invalid role');

    const user = await userRepository.findUserById(userId)
    if(!user) throw new ApiError(404,"User not found")

    await userRepository.updateUserRole(userId,role)
    return {message:"Role updated successfully"}
}

const toggleUserStatus = async(userId)=>{
    const user = await userRepository.findUserById(userId)
    if(!user) throw new ApiError(404,"User not found")
    
    await userRepository.updateUserStatus(userId,!user.is_active)

    return {message:`User ${user.is_active ? 'deactivated':'activated'} successfully`}

}

const deleteUser = async(userId)=>{
    const user = await userRepository.findUserById(userId)
    if(!user) throw new ApiError(404,"User not found")
    await userRepository.deleteUser(userId)
    return {message:"User successfully deleted"}
}


module.exports = {
  getProfile,
  updateProfile,
  uploadProfileImage,
  deleteUserAccount,
  getAllUsers,
  changeUserRole,
  toggleUserStatus,
  deleteUser,
};