const mongoose = require('mongoose');
const Product = require('../models/product');

// Create a new product
async function addNewProduct(req, res) {
  const productData = req.body;
  const product = new Product(productData);
  try {
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
}

// Get all products
async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving products' });
  }
}

// Get product by ID
async function getProductById(req, res) {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving product' });
  }
}

// Update product by ID
async function updateProductById(req, res) {
  const productId = req.params.id;
  const updatedProductData = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
}

// Remove product by ID
async function removeProductById(req, res) {
    try {
        const productId = req.params.id; 
    
        if (!mongoose.Types.ObjectId.isValid(productId)) {
          return res.status(400).json({ error: 'Invalid product ID' });
        }
    
        const product = await Product.findByIdAndDelete(productId);
    
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        return res.json({ message: 'Product deleted successfully' });
      } catch (error) {
        return res.status(500).json({ error: 'Error deleting product' });
      }
}

// Remove all products
async function removeAllProducts(req, res) {
  try {
    await Product.deleteMany({});
    res.json({ message: 'All products deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting all products' });
  }
}

// Find products by name
async function findProductsByName(req, res) {
    try {
        const name = req.query.name;
        const products = await Product.find({ name: { $regex: name, $options: 'i' } });
        res.json(products);
      } catch (error) {
        res.status(500).json({ error: 'Error retrieving products' });
      }
}

module.exports = {
  addNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  removeProductById,
  removeAllProducts,
  findProductsByName
};