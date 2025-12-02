import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navigate } from 'react-router-dom'; 
import Dashboard from './pages/Dashboard';
import Users from './pages/UsersPage';
import Products from './pages/ProductManagementPage';
import Orders from './pages/OrderManagementPage';
import CouponManager from './pages/CouponManager'


import './admin.css';

const AdminApp = () => {
  return (
    <Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="users" element={<Users />} />
  <Route path="coupons" element={<CouponManager />} />

  <Route path="products" element={<Products />} />
  <Route path="orders" element={<Orders />} />
  
  
  <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
</Routes>
  );
};

export default AdminApp;
