const express = require('express');
const cors = require('cors');
const sequelize = require('../config/database'); // Adjust the path as needed
const Routes = require('./route/route');
// const orderRouter = require('./controller/orderController'); // Adjust the path as needed
// const productRouter = require('./controller/productController'); // Adjust the path as needed

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use('/orders', orderRouter); // Mount orderRouter under '/orders'
// app.use('/products', productRouter); // Mount productRouter under '/products'

app.use('/', Routes);

// Database synchronization
sequelize.sync({ force: false }) // Use { force: false } to avoid dropping existing tables
  .then(() => {
    console.log('Database synced successfully');
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch((error) => {
    console.error('Error syncing with the database:', error);
  });
