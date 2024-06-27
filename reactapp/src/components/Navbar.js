import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="title">Inventory Management System</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/inventory">Inventory</Link>
      </div>
    </nav>
  );
};

export default Navbar;