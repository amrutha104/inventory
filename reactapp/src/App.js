import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import InventoryItemList from './components/InventoryItemList';
import AddInventoryItem from './components/AddInventoryItem';
import EditInventoryItem from './components/EditInventoryItem';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inventory" element={<InventoryItemList />} />
          <Route path="/add" element={<AddInventoryItem />} />
          <Route path="/edit/:id" element={<EditInventoryItem />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;