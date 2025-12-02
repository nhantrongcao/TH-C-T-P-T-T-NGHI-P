import React, { useEffect, useState } from 'react';
import { apiGetUserProfile } from '../../apis/user';
import moment from 'moment';
import './UserProfile.css';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiGetUserProfile();
        if (res?.success) {
          setProfile(res);
        }
      } catch (error) {
        console.error('❌ Lỗi khi lấy hồ sơ người dùng:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="loading">⏳ Đang tải thông tin người dùng...</div>;
  if (!profile || !profile.user) return <div className="error">❗Không thể tải dữ liệu người dùng.</div>;

  const { user, orders = [] } = profile;

  return (
    <div className="profile-container">
      <h2 className="section-title">👤 Hồ sơ người dùng</h2>
      <div className="user-info">
        <p><strong>Họ tên:</strong> {user.firstname} {user.lastname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Số điện thoại:</strong> {user.mobile}</p>
        <p><strong>Địa chỉ:</strong> {user.address || 'Chưa cập nhật'}</p>
        <p><strong>Ngày đăng ký:</strong> {moment(user.createdAt).format('DD/MM/YYYY HH:mm')}</p>
        <p><strong>Trạng thái:</strong> {user.isActivated ? 'Đã kích hoạt ✅' : 'Chưa kích hoạt ❌'}</p>
      </div>

      <h3 className="section-title">🧾 Lịch sử đơn hàng</h3>
      {orders.length === 0 ? (
        <p className="no-orders">📭 Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="order-list">
          {orders.map((order, idx) => (
            <div className="order-card" key={order._id}>
              <p><strong>Đơn hàng #{idx + 1}</strong></p>
              <p><strong>Mã đơn:</strong> {order._id}</p>
              <p><strong>Ngày đặt:</strong> {moment(order.createdAt).format('DD/MM/YYYY HH:mm')}</p>
              <p><strong>Trạng thái:</strong> {order.status || 'Đang xử lý'}</p>
              <p><strong>Sản phẩm:</strong></p>
              <ul>
                {order.products.map((item) => (
                  <li key={item._id}>
                    🛒 <strong>{item.product?.title || 'Sản phẩm đã xóa'}</strong> - 
                    {item.product?.price?.toLocaleString() || 0}đ × {item.quantity}
                    {item.color && ` (Màu: ${item.color})`}
                  </li>
                ))}
              </ul>
              <p><strong>Tổng tiền:</strong> {order.total?.toLocaleString() || '0'}đ</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
