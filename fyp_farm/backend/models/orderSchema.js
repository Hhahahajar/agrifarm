const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Product = require('./productSchema'); // Adjust the path as needed

const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Define the join table
const OrderProduct = sequelize.define('OrderProduct', {
  orderProductId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Define associations
Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

// Adjust the retrieval of orders to include product names
Order.getOrdersWithProducts = async () => {
  try {
    const orders = await Order.findAll({
      include: [{
        model: Product,
        attributes: ['name'],
        through: {
          attributes: ['quantity'],
        },
      }],
    });
    return orders;
  } catch (error) {
    throw new Error('Error retrieving orders with products');
  }
};

module.exports = { Order, Product, OrderProduct };
