const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('agrifarm', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

module.exports = sequelize;
