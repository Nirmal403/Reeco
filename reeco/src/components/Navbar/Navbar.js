import React from "react";
import { Link } from "react-router-dom"; 
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../../Logo.jpg"
const Navbar = () => {
  return (
    <nav>
      <div className="navbar-logo">
      <a href="/">
        <img src={logo} alt="Logo" />
        </a>
      </div>
      <div className="navbar-links">
        <Link to="/store">Store</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/cart">
        <FaShoppingCart size={32} color="white" />
        </Link>
        <span>Hello User</span>
      </div>
    </nav>
  );
};

export default Navbar;
