import React, { useEffect, useState } from 'react';
import './OrderPage.css';

const API_URI = process.env.REACT_APP_API_URI;

const getToken = () => {
  try {
    const raw = localStorage.getItem('persist:shop/user');
    const parsed = JSON.parse(raw);
    return parsed?.token ? JSON.parse(parsed.token) : null;
  } catch (e) {
    return null;
  }
};

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const res = await fetch(`${API_URI}/order`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.success) setOrders(data.response);
      } catch (error) {
        console.error('Lỗi khi lấy đơn hàng:', error);
      }
    };

    fetchOrders();
  }, [refresh]);

  const handleStatusChange = (orderId, value) => {
    setStatusMap(prev => ({ ...prev, [orderId]: value }));
  };

  const updateStatus = async (orderId) => {
    const token = getToken();
    const newStatus = statusMap[orderId];

    if (!newStatus) return alert('Vui lòng chọn trạng thái!');

    try {
      const res = await fetch(`${API_URI}/order/status/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        alert('✅ Trạng thái cập nhật thành công!');
        setRefresh(!refresh);
      } else {
        alert('❌ Cập nhật thất bại!');
      }
    } catch (error) {
      console.error('Lỗi cập nhật trạng thái:', error);
    }
  };

  return (
    <div className="admin-order-page">
      <h2>🧾 Quản lý Đơn hàng</h2>
      <table className="admin-order-table">
        <thead>
          <tr>
            <th>Người đặt</th>
            <th>Sản phẩm</th>
            <th>Tổng</th>
            <th>Vận chuyển</th>
            <th>Thanh toán</th>
            <th>Trạng thái</th>
            <th>Cập nhật</th>
          </tr>
        </thead>
        <tbody>
          {orders.length ? orders.map(order => (
            <tr key={order._id}>
              <td>{order.orderBy}</td>
              <td>
                {order.products.map((p, index) => (
                  <div key={index}>
                    🛒 {p.product?.title || 'Tên không xác định'} - SL: {p.count} - Giá: {p.product?.price?.toLocaleString() || 'N/A'}đ
                  </div>
                ))}
              </td>
              <td>{order.total?.toLocaleString()}đ</td>
              <td>{order.deliveryMethod || 'Không có'}</td>
              <td>{order.paymentMethod} {order.isPaid ? '✅' : '❌'}</td>
              <td>{order.status || 'Chờ xử lý'}</td>
              <td>
                <select onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                  <option value="">-- Trạng thái mới --</option>
                  <option value="Processing">Đang xử lý</option>
                  <option value="Shipping">Đang giao</option>
                  <option value="Delivered">Đã giao</option>
                  <option value="Cancelled">Đã huỷ</option>
                </select>
                <button onClick={() => updateStatus(order._id)}>Cập nhật</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>Không có đơn hàng nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagementPage;
