const Joi = require('joi');

const registerWithEmailSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(50).required(),
});

const registerWithPhoneSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  phone: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
});

const loginWithEmailSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginWithPhoneSchema = Joi.object({
  phone: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
});

const verifyOtpSchema = Joi.object({
  phone: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
  otp: Joi.string().length(6).required(),
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

module.exports = {
  registerWithEmailSchema,
  registerWithPhoneSchema,
  loginWithEmailSchema,
  loginWithPhoneSchema,
  verifyOtpSchema,
  validate,
};