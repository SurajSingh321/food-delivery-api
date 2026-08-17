const userService = require('./user.service');
const { successResponse } = require('../../utils/response');

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.id);
    successResponse(res, 200, 'Profile fetched successfully', user);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    successResponse(res, 200, 'Profile updated successfully', user);
  } catch (err) {
    next(err);
  }
};

const uploadProfileImage = async (req, res, next) => {
  try {
    const user = await userService.uploadProfileImage(req.user.id, req.file);
    successResponse(res, 200, 'Profile image uploaded successfully', user);
  } catch (err) {
    next(err);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const result = await userService.deleteUserAccount(req.user.id);
    successResponse(res, 200, result.message);
  } catch (err) {
    next(err);
  }
};

// Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    successResponse(res, 200, 'Users fetched successfully', users);
  } catch (err) {
    next(err);
  }
};

const changeUserRole = async (req, res, next) => {
  try {
    const result = await userService.changeUserRole(req.params.id, req.body.role);
    successResponse(res, 200, result.message);
  } catch (err) {
    next(err);
  }
};

const toggleUserStatus = async (req, res, next) => {
  try {
    const result = await userService.toggleUserStatus(req.params.id);
    successResponse(res, 200, result.message);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    successResponse(res, 200, result.message);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadProfileImage,
  deleteAccount,
  getAllUsers,
  changeUserRole,
  toggleUserStatus,
  deleteUser,
};