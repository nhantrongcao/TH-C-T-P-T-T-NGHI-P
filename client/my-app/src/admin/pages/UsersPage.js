import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './UsersPage.css';

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

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    password: '',
    role: 'user',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const token = getToken();
      if (!token) return;

      const res = await fetch(`${API_URI}/user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) setUsers(data.users);
    };

    fetchUsers();
  }, [refresh]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return alert('Token không hợp lệ!');

    try {
      const res = await fetch(`${API_URI}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert('Thêm người dùng thành công!');
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          mobile: '',
          password: '',
          role: 'user',
        });
        setRefresh(!refresh);
      } else {
        alert(data.message || 'Thêm thất bại!');
      }
    } catch (err) {
      alert('Lỗi kết nối!');
    }
  };

  const handleDelete = async (id) => {
    const token = getToken();
    if (!token) return;

    if (!window.confirm('Xoá người dùng này?')) return;

    const res = await fetch(`${API_URI}/user?_id=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (data.success) {
      alert('Xoá thành công!');
      setRefresh(!refresh);
    } else {
      alert(data.message || 'Không xoá được!');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API_URI}/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();
      if (data.success) {
        alert('Cập nhật quyền thành công!');
        setRefresh(!refresh);
      } else {
        alert(data.message || 'Không cập nhật được quyền!');
      }
    } catch (err) {
      alert('Lỗi khi cập nhật quyền!');
    }
  };

  return (
    <div className="user-page">
      <h2>📋 Quản lý người dùng</h2>
      <Link to="/admin" className="back-button">← Quay lại trang chính</Link>

      <form className="user-form" onSubmit={handleCreateUser}>
        <h3>➕ Thêm người dùng</h3>
        <input type="text" name="firstname" placeholder="Họ" value={formData.firstname} onChange={handleChange} required />
        <input type="text" name="lastname" placeholder="Tên" value={formData.lastname} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="mobile" placeholder="SĐT" value={formData.mobile} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mật khẩu" value={formData.password} onChange={handleChange} required />
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="user">Người dùng</option>
          <option value="admin">Quản trị viên</option>
        </select>
        <button type="submit" className="add-btn">Thêm người dùng</button>
      </form>

      <table className="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Họ tên</th>
            <th>SĐT</th>
            <th>Địa chỉ</th>
            <th>Quyền</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.firstname} {user.lastname}</td>
                <td>{user.mobile}</td>
                <td>{Array.isArray(user.address) ? user.address.join(', ') : 'Chưa có'}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="user">Người dùng</option>
                    <option value="admin">Quản trị viên</option>
                  </select>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(user._id)}>
                    ❌ Xoá
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>Không có người dùng nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
