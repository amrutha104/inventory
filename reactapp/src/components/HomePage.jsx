import React from "react";
import "./HomePage.css"; // Import the CSS file for HomePage

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="homepage-content">
        <h1>Welcome to the Inventory Management System</h1>
        <p>Manage your inventory efficiently and effectively!</p>
        <a href="/add" className="cta-button">Add Inventory Item</a>
      </div>
    </div>
  );
};

export default HomePage;