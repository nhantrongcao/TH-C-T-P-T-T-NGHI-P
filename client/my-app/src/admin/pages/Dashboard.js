import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="logo">SHOPPHONE</div>

        <nav className="menu">
          <NavLink to="/admin/products" activeclassname="active">Sản phẩm</NavLink>
          <NavLink to="/admin/orders" activeclassname="active">Đơn hàng</NavLink>
          <NavLink to="/admin/users" activeclassname="active">Người dùng</NavLink>
          <NavLink to="/admin/categories" activeclassname="active">Danh mục</NavLink>
          <NavLink to="/admin/coupons" activeclassname="active">Mã giảm giá</NavLink>
          <NavLink to="/admin/statistics" activeclassname="active">Thống kê</NavLink>
        </nav>

        <button className="logout-button" onClick={handleLogout}>Đăng xuất</button>
      </aside>

      <main className="main-content">
        <h2 className="dashboard-title">Bảng điều khiển quản trị</h2>

        <div className="dashboard-grid">
          <NavLink to="/admin/products" className="dashboard-card">
            <h3>Quản lý Sản phẩm</h3>
            <p>Thêm, sửa, xoá sản phẩm</p>
          </NavLink>

          <NavLink to="/admin/orders" className="dashboard-card">
            <h3>Quản lý Đơn hàng</h3>
            <p>Xem và xử lý đơn hàng</p>
          </NavLink>

          <NavLink to="/admin/users" className="dashboard-card">
            <h3>Quản lý Người dùng</h3>
            <p>Xem danh sách và phân quyền</p>
          </NavLink>

          <NavLink to="/admin/categories" className="dashboard-card">
            <h3>Danh mục sản phẩm</h3>
            <p>Tạo và chỉnh sửa danh mục</p>
          </NavLink>

          <NavLink to="/admin/coupons" className="dashboard-card">
            <h3>Mã giảm giá</h3>
            <p>Thêm và quản lý mã khuyến mãi</p>
          </NavLink>

          <NavLink to="/admin/statistics" className="dashboard-card">
            <h3>Thống kê</h3>
            <p>Tổng quan doanh thu, đơn hàng</p>
          </NavLink>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
