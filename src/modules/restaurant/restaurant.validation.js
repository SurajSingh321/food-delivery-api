const Joi = require("joi")

const createRestaurantSchema = Joi.object({
    name:Joi.string().min(2).max(50).required(),
    description:Joi.string().max(500).optional(),
    phone:Joi.string().pattern(/^[6-9]\d{9}/).required(),
    address:Joi.string().max(225).required(),
    city:Joi.string().max(255).required(),
    pincode: Joi.string().length(6).pattern(/^\d+$/).required()
})

const updateRestaurantSchema = Joi.object({
    name:Joi.string().min(2).max(50),
    description:Joi.string().max(500),
    phone:Joi.string().pattern(/^[6-9]\d{9}/),
    address:Joi.string().max(225),
    city:Joi.string().max(255),
    pincode: Joi.string().length(6).pattern(/^\d+$/)
}).min(1)


const validate = (schema)=>(req,res,next)=>{
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).json({success:false,message:error.details[0].message})
    }
    next()
}

module.exports = {createRestaurantSchema,updateRestaurantSchema,validate}