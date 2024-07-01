import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditInventoryItem.css';
import API_BASE_URL from './config.js';

const EditInventoryItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the existing item details
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/inventory/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch item details');
        }
        const data = await response.json();
        setName(data.name || '');
        setQuantity(data.quantity || '');
        setDescription(data.description || '');
        setPrice(data.price || '');
      } catch (error) {
        console.error('Error fetching item:', error.message);
        //setError('Failed to fetch item details');
      }
    };
    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !quantity || !description || !price) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/inventory/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, quantity: parseInt(quantity), description, price: parseFloat(price) }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      setMessage('Item updated successfully');
      setTimeout(() => navigate('/inventory'), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error updating item:', error.message);
      //setError('Failed to update item: Please try again later');
    }
  };

  return (
    <div className="edit-inventory-item">
      <h2>Edit Inventory Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Update Item</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default EditInventoryItem;
