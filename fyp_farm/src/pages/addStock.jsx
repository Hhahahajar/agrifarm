/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components';
import '../data/addStock.css'; // Make sure to import the CSS file

const AddStock = () => {
  const [newStock, setNewStock] = useState(
    {
    stockId: '',
    name: '',
    quantity: 1, 
    price: 0,
    totalAmount: '',
  }
);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStock({
      ...newStock,
      [name]: value,
    });
  };

  const handleAddStock = async (e) => {
    e.preventDefault();
    const stockData = {
      ...newStock,
      totalAmount: parseFloat((newStock.quantity * newStock.price).toFixed(2)), // Calculate and format to 2 decimal places
    };

    try {
      const response = await axios.post('http://localhost:5103/agrifarm/Stock/add', stockData);
      console.log('Stock added successfully:', response.data);
      navigate('/stocks'); // Redirect to the stocks page or show a success message
    } catch (error) {
      console.error('Error adding stock:', error.response); // Log the error response
      alert('Failed to submit stock. Please try again later.'); // eslint-disable-line no-alert
    }
  };

  return (
    <div className="container">
      <div className="header-container">
        <Header category="Page" title="Add Stock" />
      </div>
      <form className="form-layout" onSubmit={handleAddStock}>
        {/* <div className="form-group">
          <label htmlFor="stockId">Stock ID</label>
          <input type="text" id="stockId" name="stockId" value={newStock.stockId} onChange={handleChange} />
        </div> */}
        <div className="form-group">
          <label htmlFor="name">Stock Name</label>
          <input type="text" id="name" name="name" value={newStock.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={newStock.quantity}
            onChange={ handleChange }
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newStock.price}
            onChange={ handleChange }
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalAmount">Total Amount</label>
          <input type="text" id="totalAmount" name="totalAmount" value={(newStock.quantity * newStock.price).toFixed(2)} readOnly />
        </div>
        <div className="form-group">
          <button type="submit" className="button-soft-green">Add New Stock</button>
        </div>
      </form>
    </div>
  );
};

export default AddStock;
