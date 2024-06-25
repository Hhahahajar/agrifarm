const express = require('express');

const router = express.Router();
const Product = require('../models/productSchema'); // Adjust the path as needed

// Route to get a list of available products with prices
router.get('/', async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.findAll();

    // Construct response with product names and prices
    const productsWithPrices = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
    }));

    // Send response
    res.status(200).json(productsWithPrices);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

module.exports = router;
