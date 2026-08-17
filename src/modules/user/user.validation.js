const Joi  = require("joi")
const ApiError = require("../../utils/ApiError")

const updateProfileSchema = Joi.object({
    name:Joi.string().min(2).max(100),
    email:Joi.string().email(),
    phone:Joi.string().pattern(/^[6-9]\d{9}$/)
}).min(1)

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

module.exports = { updateProfileSchema, validate };