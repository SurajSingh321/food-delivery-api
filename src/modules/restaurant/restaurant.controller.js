const restaurantService = require('./restaurant.service');
const { successResponse } = require('../../utils/response');

const createRestaurant = async (req, res, next) => {
  try {
    const restaurant = await restaurantService.createRestaurant(req.user.id, req.body);
    successResponse(res, 201, 'Restaurant created successfully', restaurant);
  } catch (err) {
    next(err);
  }
};

const getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await restaurantService.getRestaurantById(req.params.id);
    successResponse(res, 200, 'Restaurant fetched successfully', restaurant);
  } catch (err) {
    next(err);
  }
};

const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await restaurantService.getAllRestaurants(req.query);
    successResponse(res, 200, 'Restaurants fetched successfully', restaurants);
  } catch (err) {
    next(err);
  }
};

const updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await restaurantService.updateRestaurant(req.user.id, req.body);
    successResponse(res, 200, 'Restaurant updated successfully', restaurant);
  } catch (err) {
    next(err);
  }
};

const uploadRestaurantImage = async (req, res, next) => {
  try {
    const restaurant = await restaurantService.uploadRestaurantImage(req.user.id, req.file);
    successResponse(res, 200, 'Restaurant image uploaded successfully', restaurant);
  } catch (err) {
    next(err);
  }
};

const toggleStatus = async (req, res, next) => {
  try {
    const result = await restaurantService.toggleStatus(req.user.id);
    successResponse(res, 200, result.message);
  } catch (err) {
    next(err);
  }
};

const deleteRestaurant = async (req, res, next) => {
  try {
    const result = await restaurantService.deleteRestaurant(req.user.id);
    successResponse(res, 200, result.message);
  } catch (err) {
    next(err);
  }
};

// Admin
const getAllRestaurantsForAdmin = async (req, res, next) => {
  try {
    const restaurants = await restaurantService.getAllRestaurantForAdmin();
    successResponse(res, 200, 'Restaurants fetched successfully', restaurants);
  } catch (err) {
    next(err);
  }
};

const approveRestaurant = async (req, res, next) => {
  try {
    const result = await restaurantService.approveRestaurant(req.params.id);
    successResponse(res, 200, result.message);
  } catch (err) {
    next(err);
  }
};

const adminDeleteRestaurant = async (req, res, next) => {
  try {
    const result = await restaurantService.adminDeleteRestaurant(req.params.id);
    successResponse(res, 200, result.message);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRestaurant,
  getRestaurantById,
  getAllRestaurants,
  updateRestaurant,
  uploadRestaurantImage,
  toggleStatus,
  deleteRestaurant,
  getAllRestaurantsForAdmin,
  approveRestaurant,
  adminDeleteRestaurant,
};