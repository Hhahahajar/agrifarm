/* eslint-disable consistent-return */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('../../config/database');
const Stock = require('../models/stockSchema');

const app = express();
const PORT = 3001;
// Using port 3001 to avoid conflict with React's default port 3000

app.use(bodyParser.json());
app.use(cors());

// Sync model with database
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Add a new stock item
app.post('/stocks', async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const stock = await Stock.create({ name, quantity, price });
    res.status(201).send(stock);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a stock item
app.put('/stocks/:id', async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const stock = await Stock.findByPk(req.params.id);
    if (!stock) {
      return res.status(404).send();
    }
    await stock.update({ name, quantity, price });
    res.send(stock);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Remove a stock item
app.delete('/stocks/:id', async (req, res) => {
  try {
    const stock = await Stock.findByPk(req.params.id);
    if (!stock) {
      return res.status(404).send();
    }
    await stock.destroy();
    res.send(stock);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all stock items
app.get('/stocks', async (req, res) => {
  try {
    const stocks = await Stock.findAll();
    res.send(stocks);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
