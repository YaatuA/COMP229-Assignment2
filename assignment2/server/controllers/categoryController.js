const Category = require('../models/category');

// Get all Categories
async function getAllCategories(req, res) {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving categories' });
  }
}

// Get Category by ID
async function getCategoryById(req, res) {
  const categoryId = req.params.id;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving category' });
  }
}

// Add New Category
async function addNewCategory(req, res) {
  const categoryData = req.body;
  const category = new Category(categoryData);

  try {
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error creating category' });
  }
}

// Update Category by ID
async function updateCategoryById(req, res) {
  const categoryId = req.params.id;
  const updatedCategoryData = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, updatedCategoryData, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error updating category' });
  }
}

// Remove Category by ID
async function removeCategoryById(req, res) {
  const categoryId = req.params.id;

  try {
    const deletedCategory = await Category.findByIdAndRemove(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting category' });
  }
}

// Remove All Categories
async function removeAllCategories(req, res) {
  try {
    await Category.deleteMany({});
    res.json({ message: 'All categories deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting all categories' });
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  addNewCategory,
  updateCategoryById,
  removeCategoryById,
  removeAllCategories
};