const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET Product by ID
router.get('/:id', productController.getProductById);

// POST add new Product
router.post('/', productController.addNewProduct);

// PUT update Product by ID
router.put('/:id', productController.updateProductById);

// DELETE remove Product by ID
router.delete('/:id', productController.removeProductById);

// DELETE remove all Products
router.delete('/', productController.removeAllProducts);

router.get('/', (req, res, next) => {
    if (req.query.name) {
      // Filtering route when 'name' query parameter is present
      productController.findProductsByName(req, res, next);
    } else {
      // General route to get all products when 'name' query parameter is not present
      productController.getAllProducts(req, res, next);
    }
  });

module.exports = router;