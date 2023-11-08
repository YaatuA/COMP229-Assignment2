const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Category = require('./server/models/category'); // Import the Category model
const productRoutes = require('./server/routes/productRoutes'); // Import the product routes
const categoryRoutes = require('./server/routes/categoryRoutes'); // Import the category routes

// Create an Express app
const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware to parse JSON in the request body
app.use(express.json());

// Define a route to display a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the DressStore application.');
});

// MongoDB connection and setup
mongoose.connect('mongodb://localhost/DressStore')
  .then(async () => {
    console.log('Connected to MongoDB');

    // Insert initial categories
    const initialCategories = [
      { name: 'Men' },
      { name: 'Women' },
      { name: 'Teens' },
    ];

    try {
      await Category.insertMany(initialCategories);
      console.log('Initial categories inserted successfully.');
    } catch (error) {
      console.error('Error inserting initial categories:', error);
    }

    // Use the product and category routes
    app.use('/api/products', productRoutes); // Products routes
    app.use('/api/categories', categoryRoutes); // Categories routes

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
