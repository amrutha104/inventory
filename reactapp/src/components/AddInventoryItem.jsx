import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddInventoryItem.css'; // Import your CSS file for styling
import API_BASE_URL from './config.js'; // Adjust path based on your project structure

const AddInventoryItem = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    quantity: '',
    description: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Reset the specific error when user starts typing
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));

    // Handle state changes for each input
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'quantity':
        setQuantity(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'price':
        setPrice(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields before submission
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name field is required';
    }
    if (!quantity.trim()) {
      newErrors.quantity = 'Quantity field is required';
    } else if (isNaN(quantity) || parseInt(quantity) <= 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }
    if (!description.trim()) {
      newErrors.description = 'Description field is required';
    }
    if (!price.trim()) {
      newErrors.price = 'Price field is required';
    } else if (isNaN(price) || parseFloat(price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    if (Object.keys(newErrors).length > 0) {
      // If there are errors, set them and prevent form submission
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/inventory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, quantity: parseInt(quantity), description, price: parseFloat(price) }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      setMessage('Item added successfully');
      setTimeout(() => navigate('/inventory'), 2000); // Redirect after 2 seconds

    } catch (error) {
      console.error('Error adding item:', error.message);
      // Handle error state or show error message to user
    }
  };

  return (
    <div className="add-inventory-item">
      <h2>Add New Inventory Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={handleChange}
          />
          {errors.quantity && <p className="error-message">{errors.quantity}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={handleChange}
          />
          {errors.price && <p className="error-message">{errors.price}</p>}
        </div>
        <button type="submit" className="submit-button">Add Item</button>
      </form>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default AddInventoryItem;