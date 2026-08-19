const express = require("express")
const router  = express.Router()

const authRoutes = require("../modules/auth/auth.routes")
const userRoutes = require("../modules/user/user.routes")
const addressRoutes = require("../modules/address/address.routes")
const restaurantRoutes = require("../modules/restaurant/restaurant.routes")
const categoryRoutes = require("../modules/category/category.routes")

router.use('/auth',authRoutes)
router.use('/users',userRoutes)
router.use('/addresses',addressRoutes)
router.use('/restaurants',restaurantRoutes)
router.use('/categories', categoryRoutes);

module.exports = router