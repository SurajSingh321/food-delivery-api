const express = require('express')
const router = express.Router()
const {authenticate} = require("../../middleware/auth.middleware")
const {authorize} = require("../../middleware/role.middleware")
const upload = require("../../middleware/upload.middleware")
const {createRestaurantSchema,updateRestaurantSchema,validate} = require("./restaurant.validation")
const restaurantController = require("./restaurant.controller")

// Public Routes
router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);

// Restaurant owner routes
router.post('/', authenticate, authorize('restaurant_owner'), validate(createRestaurantSchema), restaurantController.createRestaurant);
router.put('/', authenticate, authorize('restaurant_owner'), validate(updateRestaurantSchema), restaurantController.updateRestaurant);
router.put('/image', authenticate, authorize('restaurant_owner'), upload.single('image'), restaurantController.uploadRestaurantImage);
router.patch('/status', authenticate, authorize('restaurant_owner'), restaurantController.toggleStatus);
router.delete('/', authenticate, authorize('restaurant_owner'), restaurantController.deleteRestaurant);

// Admin routes
router.get('/admin/all', authenticate, authorize('admin'), restaurantController.getAllRestaurantsForAdmin);
router.patch('/admin/:id/approve', authenticate, authorize('admin'), restaurantController.approveRestaurant);
router.delete('/admin/:id', authenticate, authorize('admin'), restaurantController.adminDeleteRestaurant);

module.exports = router