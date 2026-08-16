const express = require("express")
const router = express.Router()
const {
  registerWithEmail,
  registerWithPhone,
  verifyOtp,
  loginWithEmail,
  loginWithPhone,
  verifyLoginOtp,
  refreshToken,
  logout,
  logoutAll,
} = require('./auth.controller')
const {authenticate} = require("../../middleware/auth.middleware")
const {
  registerWithEmailSchema,
  registerWithPhoneSchema,
  loginWithEmailSchema,
  loginWithPhoneSchema,
  verifyOtpSchema,
  validate,
} = require("./auth.validation")


// Register
router.post('/register/email',validate(registerWithEmailSchema),registerWithEmail)
router.post('/register/phone',validate(registerWithPhoneSchema),registerWithPhone)
router.post('/register/verify-otp',validate(verifyOtpSchema),verifyOtp)

// login
router.post('/login/email',validate(loginWithEmailSchema),loginWithEmail)
router.post('/login/phone',validate(loginWithPhoneSchema),loginWithPhone)
router.post('/login/verify-opt',validate(verifyOtpSchema),verifyLoginOtp)

// Token
router.post('/refresh-token',refreshToken)

// logout
router.post('/logout', authenticate, logout);
router.post('/logout-all', authenticate, logoutAll);

module.exports = router