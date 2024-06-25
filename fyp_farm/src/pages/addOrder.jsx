/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components';
import '../data/addOrder.css'; // Make sure to import the CSS file

const AddOrder = () => {
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    productId: '',
    quantity: 1,
    price: 0.00,
    location: '',
    status: '',
    telephone: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({
      ...newOrder,
      [name]: name === 'productId' ? parseInt(value, 10) || '' : value, // Convert productId to integer
    });
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    const orderData = {
      ...newOrder,
      totalAmount: parseFloat((newOrder.quantity * newOrder.price).toFixed(2)), // Calculate and format to 2 decimal places
    };

    try {
      const response = await axios.post('http://localhost:5103/agrifarm/Order/add', orderData);
      console.log('Order added successfully:', response.data);
      navigate('/orders'); // Redirect to the orders page or show a success message
    } catch (error) {
      console.error('Error adding order:', error.response); // Log the error response
      alert('Failed to submit order. Please try again later.'); // eslint-disable-line no-alert
    }
  };

  return (
    <div className="container">
      <div className="header-container">
        <Header category="Page" title="Add Order" />
      </div>
      <form className="form-layout" onSubmit={handleAddOrder}>
        {/* Remove orderId input field */}
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input type="text" id="customerName" name="customerName" value={newOrder.customerName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="productId">Product ID</label>
          <input
            type="text"
            id="productId"
            name="productId"
            value={newOrder.productId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity (Kg)</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={newOrder.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (RM)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newOrder.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" value={newOrder.location} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input type="text" id="status" name="status" value={newOrder.status} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="telephone">Telephone (+60)</label>
          <input type="text" id="telephone" name="telephone" value={newOrder.telephone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="totalAmount">Total Amount (RM)</label>
          <input type="text" id="totalAmount" name="totalAmount" value={(newOrder.quantity * newOrder.price).toFixed(2)} readOnly />
        </div>
        <div className="form-group">
          <button type="submit" className="button-soft-green">Add New Order</button>
        </div>
      </form>
    </div>
  );
};

export default AddOrder;
