const categoryService = require('./category.service');
const { successResponse } = require('../../utils/response');

const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body.name);
    successResponse(res, 201, 'Category created successfully', category);
  } catch (err) {
    next(err);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    successResponse(res, 200, 'Categories fetched successfully', categories);
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body.name);
    successResponse(res, 200, 'Category updated successfully', category);
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const result = await categoryService.deleteCategory(req.params.id);
    successResponse(res, 200, result.message);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};