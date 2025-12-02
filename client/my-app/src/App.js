import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Chatbot } from './components';
import CartPage from './pages/public/CartPage';
import CheckoutPage from './pages/public/CheckoutPage';
import {
  Home,
  Login,
  Public,
  Services,
  DetailProduct,
  Blogs,
  Faqs,
  Products,
  ResetPassword
} from './pages/public';
import path from './ultils/path';
import { getCategories } from './store/asyncAction';
import { useDispatch } from 'react-redux';
import UserProfile from "./pages/private/UserProfile";
import AdminDashboard from './admin/pages/Dashboard';
import AdminApp from './admin/AdminApp';
import ProductManagement from './admin/pages/ProductManagementPage';
import ProductCreate from './admin/pages/CreateProductPage';
import ProductEdit from './admin/pages/EditProductPage';
import ProductView from './admin/pages/ViewProductPage';
import CouponManager from './admin/pages/CouponManager';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/pages/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/product" element={<ProductManagement />} />
        <Route path="/admin/product/create" element={<ProductCreate />} />
        <Route path="/admin/product/edit/:pid" element={<ProductEdit />} />
        <Route path="/admin/product/view/:pid" element={<ProductView />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/admin/coupons" element={<CouponManager />} />

        {/* Public Routes */}
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PIP__TITLE} element={<DetailProduct />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.FAQs} element={<Faqs />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
      <Chatbot />
    </div>
  );
}

export default App;
