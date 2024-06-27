// src/services/inventoryService.js
import API_BASE_URL from './config.js';

const getAllInventoryItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/inventory`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch inventory items');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    throw error;
  }
};

const getInventoryItemById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/inventory/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch inventory item');
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching inventory item with ID ${id}:`, error);
    throw error;
  }
};

const createInventoryItem = async (item) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/inventory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error('Failed to create inventory item');
    }

    return response.json();
  } catch (error) {
    console.error('Error creating inventory item:', error);
    throw error;
  }
};

const updateInventoryItem = async (id, item) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/inventory/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error('Failed to update inventory item');
    }

    return response.json();
  } catch (error) {
    console.error(`Error updating inventory item with ID ${id}:`, error);
    throw error;
  }
};

const deleteInventoryItem = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/inventory/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete inventory item');
    }

    return true; // Return true or handle success response as needed
  } catch (error) {
    console.error(`Error deleting inventory item with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getAllInventoryItems,
  getInventoryItemById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem
};