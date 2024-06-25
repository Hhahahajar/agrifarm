const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./userSchema'); // Make sure the path to the User model is correct

const Task = sequelize.define('Task', {
  Id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Summary: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  AssigneeId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

// Define the association
User.hasMany(Task, { foreignKey: 'AssigneeId' });
Task.belongsTo(User, { foreignKey: 'AssigneeId' });

module.exports = Task;
