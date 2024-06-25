const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Adjust the path as needed

const Notification = sequelize.define('Notification', {
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Notification;
