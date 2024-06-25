/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();
const { Order, Product, OrderProduct } = require('../models/orderSchema'); // Adjust the path as needed

// Controller function to handle adding a new order
const addOrder = async (req, res) => {
  try {
    const { orderId, customerName, products, totalAmount, status, location, telephone } = req.body;

    // Validate the input data
    if (!orderId || !customerName || !products || !status || !location || !telephone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new order in the database
    const newOrder = await Order.create({
      orderId,
      customerName,
      location,
      totalAmount,
      status,
      telephone,
    });

    // Add products to the order
    await Promise.all(products.map(async (product) => {
      // Find or create the product in the database
      const [dbProduct] = await Product.findOrCreate({
        where: { name: product.name }, // Assuming product name is unique
        defaults: { quantity: product.quantity, price: product.price },
      });

      // Associate the product with the new order
      await newOrder.addProduct(dbProduct, { through: { quantity: product.quantity } });
    }));

    // Send a success response
    res.status(201).json({ message: 'Order added successfully', order: newOrder });
  } catch (error) {
    // Handle errors
    console.error('Error adding order:', error);
    res.status(500).json({ message: 'Error adding order', error: error.message });
  }
};

// Controller function to fetch all orders
const getOrders = async (req, res) => {
  try {
    // Retrieve all orders from the database, including associated products
    const orders = await Order.getOrdersWithProducts();

    // Send response
    res.status(200).json(orders);
  } catch (error) {
    // Handle errors
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Route to handle adding a new order
router.post('/add', addOrder);

// Route to fetch all orders
router.get('/', getOrders);

module.exports = router;
