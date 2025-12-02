import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiResetPassword } from '../../apis/user';
import path from "../../ultils/path";
const ResetPassword = () => {
  const { token } = useParams(); // Lấy token từ URL
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleResetPassword = async () => {
    if (!password) {
      Swal.fire('Lỗi', 'Vui lòng nhập mật khẩu mới', 'error');
      return;
    }

    const response = await apiResetPassword({ token, password });
    if (response.success) {
      Swal.fire('Thành công', 'Mật khẩu đã được đặt lại', 'success').then(() => {
        navigate(`/${path.LOGIN}`);
      });
    } else {
      Swal.fire('Lỗi', response.message, 'error');
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Đặt lại mật khẩu</h1>
      <input
        type="password"
        placeholder="Nhập mật khẩu mới"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Xác nhận</button>
    </div>
  );
};

export default ResetPassword;