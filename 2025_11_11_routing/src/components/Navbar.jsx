import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Navbar.css';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/user/123">User 123</Link>
    </nav>
  );
}

export default Navbar;