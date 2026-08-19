const categoryRepository = require('./category.repository');
const ApiError = require('../../utils/ApiError');

const createCategory = async (name) => {
  const existing = await categoryRepository.findCategoryByName(name);
  if (existing) throw new ApiError(409, 'Category already exists');

  const categoryId = await categoryRepository.createCategory(name);
  return await categoryRepository.findCategoryById(categoryId);
};

const getAllCategories = async () => {
  return await categoryRepository.findAllCategories();
};

const updateCategory = async (id, name) => {
  const category = await categoryRepository.findCategoryById(id);
  if (!category) throw new ApiError(404, 'Category not found');

  const existing = await categoryRepository.findCategoryByName(name);
  if (existing && existing.id !== parseInt(id)) throw new ApiError(409, 'Category name already exists');

  await categoryRepository.updateCategory(id, name);
  return await categoryRepository.findCategoryById(id);
};

const deleteCategory = async (id) => {
  const category = await categoryRepository.findCategoryById(id);
  if (!category) throw new ApiError(404, 'Category not found');

  await categoryRepository.deleteCategory(id);
  return { message: 'Category deleted successfully' };
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};