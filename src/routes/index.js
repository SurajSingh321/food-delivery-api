const express = require("express")
const router  = express.Router()

const authRoutes = require("../modules/auth/auth.routes")
const userRoutes = require("../modules/user/user.routes")
const addressRoutes = require("../modules/address/address.routes")
const restaurantRoutes = require("../modules/restaurant/restaurant.routes")
const categoryRoutes = require("../modules/category/category.routes")
const foodRoutes = require('../modules/food/food.routes');
const cartRoutes = require("../modules/cart/cart.routes")


router.use('/auth',authRoutes)
router.use('/users',userRoutes)
router.use('/addresses',addressRoutes)
router.use('/restaurants',restaurantRoutes)
router.use('/categories', categoryRoutes);
router.use('/foods',foodRoutes)
router.use('/cart',cartRoutes)

module.exports = router