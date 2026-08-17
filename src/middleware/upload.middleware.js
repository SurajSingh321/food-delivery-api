const multer = require("multer")
const ApiError = require("../utils/ApiError")

const storage = multer.memoryStorage()

const fileFilter = (req,file,cb)=>{
    const allowedMimeTypes =  ["image/jpeg", "image/png", "image/webp"]
    if(!allowedMimeTypes.includes(file.mimetype)){
        return cb(new ApiError(400,"Only JPEG, PNG and WEBP images are allowed"))
    }
    cb(null,true)
}

const upload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize:2*1024*1024
    }
})

module.exports = upload