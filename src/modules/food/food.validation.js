const Joi = require("joi")

const createFoodSchema = Joi.object({
    name:Joi.string().min(2).max(150).required(),
    description:Joi.string().max(500).optional(),
    price:Joi.number().positive().precision(2).required(),
    category_id : Joi.number().integer().positive().optional(),
    is_available:Joi.boolean().optional()
})

const updateFoodSchema = Joi.object({
    name:Joi.string().min(2).max(150),
    description:Joi.string().max(500),
    price:Joi.number().positive().precision(2),
    category_id:Joi.number().integer().positive(),
    is_available:Joi.boolean()
}).min(1)

const validate = (schema)=>(req,res,next)=>{
    const {error} = schema.validate(req.body)
    if(error){
        res.status(400).json({success:false,message:error.details[0].message})
    }
    next()
}

module.exports ={
    createFoodSchema,
    updateFoodSchema,
    validate
}