import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>FeastRush</h2>
      <div>
        <Link to="/">Home</Link>{" "}
        <Link to="/products">Food</Link>{" "}
        <Link to="/cart">Cart</Link>{" "}
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;