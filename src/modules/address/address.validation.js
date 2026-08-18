const Joi = require("joi")

const createAddressSchema = Joi.object({
    label:Joi.string().max(50).optional(),
    address_line:Joi.string().max(255).required(),
    city:Joi.string().max(100).required(),
    state:Joi.string().max(100).required(),
    pincode:Joi.string().length(6).pattern(/^\d+$/).required(),
    is_default:Joi.boolean().optional()
})

const updateAddressSchema = Joi.object({
    label:Joi.string().max(50),
    address_line:Joi.string().max(255),
    city:Joi.string().max(100),
    state:Joi.string().max(100),
    pincode:Joi.string().length(6).pattern(/^\d+$/),
    is_default:Joi.boolean()
}).min(1)

const validate = (schema)=>(req,res,next)=>{
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).json({success:false,message:error.details[0].message})
    }
    next()
}

module.exports = {createAddressSchema,updateAddressSchema,validate}