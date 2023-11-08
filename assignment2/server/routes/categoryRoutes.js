const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET all Categories
router.get('/', categoryController.getAllCategories);

// GET Category by ID
router.get('/:id', categoryController.getCategoryById);

// POST add new Category
router.post('/', categoryController.addNewCategory);

// PUT update Category by ID
router.put('/:id', categoryController.updateCategoryById);

// DELETE remove Category by ID
router.delete('/:id', categoryController.removeCategoryById);

// DELETE remove all Categories
router.delete('/', categoryController.removeAllCategories);

module.exports = router;