/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components';
import '../data/addProduct.css'; // Make sure to import the CSS file

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: 1,
    price: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5103/agrifarm/Product/add', newProduct);
      console.log('Product added successfully:', response.data);
      navigate('/products'); // Redirect to the products page or show a success message
    } catch (error) {
      console.error('Error adding product:', error.response); // Log the error response
      alert('Failed to submit product. Please try again later.'); // eslint-disable-line no-alert
    }
  };

  return (
    <div className="container">
      <div className="header-container">
        <Header category="Page" title="Add Product" />
      </div>
      <form className="form-layout" onSubmit={handleAddProduct}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value, 10) })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="button-soft-green">Add New Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
