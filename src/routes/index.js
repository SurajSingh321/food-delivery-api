const express = require("express")
const router  = express.Router()

const authRoutes = require("../modules/auth/auth.routes")
const userRoutes = require("../modules/user/user.routes")
const addressRoutes = require("../modules/address/address.routes")

router.use('/auth',authRoutes)
router.use('/users',userRoutes)
router.use('/addresses',addressRoutes)

module.exports = router