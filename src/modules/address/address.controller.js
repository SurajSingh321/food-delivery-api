const addressService = require('./address.service');
const { successResponse } = require('../../utils/response');

const createAddress = async (req, res, next) => {
  try {
    const address = await addressService.createAddress(req.user.id, req.body);
    successResponse(res, 201, 'Address created successfully', address);
  } catch (err) {
    next(err);
  }
};

const getAllAddresses = async (req, res, next) => {
  try {
    const addresses = await addressService.getAllAddresses(req.user.id);
    successResponse(res, 200, 'Addresses fetched successfully', addresses);
  } catch (err) {
    next(err);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const address = await addressService.updateAddress(req.user.id, req.params.id, req.body);
    successResponse(res, 200, 'Address updated successfully', address);
  } catch (err) {
    next(err);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const result = await addressService.deleteAddress(req.user.id, req.params.id);
    successResponse(res, 200, result.message);
  } catch (err) {
    next(err);
  }
};

const setDefaultAddress = async (req, res, next) => {
  try {
    const result = await addressService.setDefaultAddress(req.params.id,req.user.id);
    successResponse(res, 200, result.message);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createAddress,
  getAllAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};