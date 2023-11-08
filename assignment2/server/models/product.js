const Category = require('./category'); // Import the Category model
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensures the name field is required
  },
  description: String,
  price: {
    type: Number,
    min: 0, // Ensures the price is non-negative
  },
  published: Boolean,
  category: {
    type: String,
    validate: {
      validator: async function (categoryName) {
        const category = await Category.findOne({ name: categoryName });
        return !!category; // Returns true if the category exists
      },
      message: 'Category does not exist.',
    },
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;