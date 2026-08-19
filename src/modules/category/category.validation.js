const Joi = require('joi')

const createCategorySchema = Joi.object({
    name:Joi.string().min(2).max(100).required()
})

const updateCategorySchema = Joi.object({
    name:Joi.string().min(2).max(100).required()
})

const validate = (schema)=>(req,res,next)=>{
    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({success:false,message:error.details[0].message})
    }
    next()
}

module.exports = {createCategorySchema,updateCategorySchema,validate}