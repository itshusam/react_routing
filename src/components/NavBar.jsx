import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/browse">Browse Characters</NavLink></li>
        <li><NavLink to="/comics">Comics</NavLink></li>
        <li><NavLink to="/character/1">Character Details</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;