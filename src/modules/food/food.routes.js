const express = require('express')
const router = express.Router()
const upload = require("../../middleware/upload.middleware")
const {authenticate } = require("../../middleware/auth.middleware")
const {authorize} = require("../../middleware/role.middleware")
const {createFoodSchema,updateFoodSchema,validate} = require("./food.validation")
const foodController = require("./food.controller")

// ppublic
router.get('/restaurant/:restaurantId',foodController.getFoodsByRestaurant)
router.get('/:id',foodController.getFoodById)

// Restaurant Owner Route

router.post('/', authenticate, authorize('restaurant_owner'), validate(createFoodSchema), foodController.createFood);
router.put('/:id', authenticate, authorize('restaurant_owner'), validate(updateFoodSchema), foodController.updateFood);
router.put('/:id/image', authenticate, authorize('restaurant_owner'), upload.single('image'), foodController.uploadFoodImage);
router.delete('/:id', authenticate, authorize('restaurant_owner'), foodController.deleteFood);

module.exports = router