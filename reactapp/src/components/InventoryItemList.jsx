import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './InventoryItemList.css';
import API_BASE_URL from './config.js';

const InventoryItemList = () => {
  const [items, setItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/inventory`);
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error.message);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/inventory/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setItems(items.filter(item => item.id !== id));
        setSuccessMessage('Item deleted successfully');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
      } else {
        throw new Error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  return (
    <div className="inventory-list">
      <h2>Inventory Items</h2>
      {items.length === 0 ? (
        <div className="no-items-message">
          <p>No Items Found</p>
        </div>
      ) : (
        items.map((item) => (
          <div key={item.id} className="inventory-item">
            <p>{item.name}</p>
            <p>{item.quantity}</p>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <div className="item-actions">
              <Link to={`/edit/${item.id}`} className="edit-button">Edit</Link>
              <button onClick={() => handleDelete(item.id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))
      )}
      {successMessage && (
        <p className="success-message" style={{ marginTop: items.length > 0 ? '20px' : '0' }}>
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default InventoryItemList;