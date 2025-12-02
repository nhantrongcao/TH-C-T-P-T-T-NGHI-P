import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = () => (
  <aside className="admin-sidebar">
    <nav>
      <ul>
        <li><NavLink to="/">Dashboard</NavLink></li>
        <li><NavLink to="/users">Users</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>
        <li><NavLink to="/orders">Orders</NavLink></li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
