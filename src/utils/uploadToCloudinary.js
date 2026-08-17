const cloudinary = require("../config/cloudinary")
const ApiError = require("../utils/ApiError")

const uploadToCloudinary = (file , folder)=>{
    return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({folder:folder},(error,result)=>{
            if(error)reject(new ApiError(500,"Images upload fails"))
            else resolve(result)
        })
        .end(file.buffer)
    })
}

module.exports = uploadToCloudinary