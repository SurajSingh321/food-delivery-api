const express = require('express');
const router = express.Router();
const categoryController = require('./category.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { authorize } = require('../../middleware/role.middleware');
const { createCategorySchema, updateCategorySchema, validate } = require('./category.validation');

// Public routes
router.get('/', categoryController.getAllCategories);

// Admin routes
router.post('/', authenticate, authorize('admin'), validate(createCategorySchema), categoryController.createCategory);
router.put('/:id', authenticate, authorize('admin'), validate(updateCategorySchema), categoryController.updateCategory);
router.delete('/:id', authenticate, authorize('admin'), categoryController.deleteCategory);

module.exports = router;