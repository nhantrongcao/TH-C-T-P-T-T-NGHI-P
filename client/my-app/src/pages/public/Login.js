import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { apiRegister, apiLogin, apiForgotPassword, apiFinalRegister,apiGetCurrent } from "../../apis/user";
import path from "../../ultils/path";
import { register } from "../../store/user/userSlice";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [email, setEmail] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [loading, setLoading] = useState(false); // Thêm state loading

  const resetPayload = () => {
    setPayload({ firstname: "", lastname: "", email: "", password: "", mobile: "" });
  };

  const validateInput = () => {
    if (!payload.email || !payload.password) {
      Swal.fire("Lỗi", "Email và mật khẩu là bắt buộc", "error");
      return false;
    }
    if (isRegister && (!payload.firstname || !payload.lastname || !payload.mobile)) {
      Swal.fire("Lỗi", "Họ, tên và số điện thoại là bắt buộc", "error");
      return false;
    }
    return true;
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Swal.fire("Lỗi", "Vui lòng nhập email để đặt lại mật khẩu", "error");
      return;
    }
    try {
      setLoading(true);  // Bắt đầu loading
      const response = await apiForgotPassword({ email });
      Swal.fire(response.success ? "Hãy kiểm tra email của bạn" : "Lỗi", response.mes, response.success ? "success" : "error");
    } catch (error) {
      Swal.fire("Lỗi", "Có lỗi xảy ra, vui lòng thử lại sau", "error");
    } finally {
      setLoading(false);  // Dừng loading sau khi API trả về
    }
  };

  const handleLogin = async () => {
    if (!validateInput()) return;
  
    try {
      const { firstname, lastname, mobile, ...data } = payload;
      const response = await apiLogin(data);
  
      if (response.success) {
        const { accessToken, userData } = response;
  
        dispatch(register({
          userData,
          token: accessToken,
        }));
  
        // ✅ Điều hướng tùy theo vai trò
        if (userData.role === "admin") {
          navigate(`/admin/pages/dashboard`);
        } else {
          navigate(`/${path.HOME}`);
        }
  
      } else {
        Swal.fire("Lỗi", response.message, "error");
      }
    } catch (error) {
      Swal.fire("Lỗi", "Đăng nhập thất bại, vui lòng thử lại", "error");
    }
  };
  
  const handleRegister = async () => {
    if (!validateInput()) return;
    try {
      setLoading(true);  // Bắt đầu loading
      const response = await apiRegister(payload);
      if (response.success) {
        setIsVerifiedEmail(true);
        Swal.fire("Thành công", "Mã xác thực đã được gửi đến email của bạn", "success");
      } else {
        Swal.fire("Lỗi", response.mes, "error");
      }
    } catch (error) {
      Swal.fire("Lỗi", "Đăng ký thất bại, vui lòng thử lại", "error");
    } finally {
      setLoading(false);  // Dừng loading sau khi API trả về
    }
  };

  const [token, setToken] = useState('');

  
  const finalRegister = async () => {
    if (!token) {
      return Swal.fire("Lỗi", "Vui lòng nhập mã xác thực", "error");
    }

    try {
      setLoading(true);  // Bắt đầu loading
      const data = await apiFinalRegister(token);
      console.log(data);

      if (data?.success) {
        const result = await Swal.fire({
          title: "Thành công",
          text: data.mes,
          icon: "success",
          confirmButtonText: "Đăng nhập ngay",
        });

        if (result.isConfirmed) {
          setIsRegister(false);
          resetPayload();
          setIsVerifiedEmail(false); // Tắt form xác thực
          navigate(`/${path.LOGIN}`); // Chuyển trang login
        }
      } else {
        Swal.fire("Lỗi", data?.mes || "Đã có lỗi xảy ra", "error");
      }
    } catch (error) {
      console.error("Lỗi API:", error);
      Swal.fire("Lỗi", error.response?.data?.mes || "Mã xác thực không hợp lệ hoặc đã hết hạn", "error");
    } finally {
      setLoading(false);  // Dừng loading sau khi API trả về
    }
  };


  return (
    <div className="auth-container">
      {isVerifiedEmail ? (
        <div className="verify-email-container">
          <h2>Xác thực Email</h2>
          <p>Chúng tôi đã gửi mã xác thực đến email của bạn. Vui lòng nhập mã bên dưới.</p>
          <input  
  type="text"
  value={token}
  onChange={e => setToken(e.target.value)}
  className=""
/>
<Button name="Xác thực" handleOnClick={finalRegister} />

          <span className="auth-link" onClick={() => setIsVerifiedEmail(false)}>Quay lại</span>
        </div>
      ) : isForgotPassword ? (
        <div className="forgot-password-container">
          <h2>Quên mật khẩu</h2>
          <InputField value={email} setValue={setEmail} nameKey="email" placeholder="Nhập email của bạn" />
          <Button name="Gửi yêu cầu" handleOnClick={handleForgotPassword} />
          <span className="auth-link" onClick={() => setIsForgotPassword(false)}>Quay lại đăng nhập</span>
        </div>
      ) : (
        <>
          <h1 className="auth-title">{isRegister ? "Đăng ký" : "Đăng nhập"}</h1>

          {isRegister && (
            <div className="name-fields">
  <div className="input-group">
    <InputField value={payload.firstname} setValue={(value) => setPayload((prev) => ({ ...prev, firstname: value }))} nameKey="firstname" placeholder="Họ" />
  </div>
  <div className="input-group">
    <InputField value={payload.lastname} setValue={(value) => setPayload((prev) => ({ ...prev, lastname: value }))} nameKey="lastname" placeholder="Tên" />
  </div>
  <div className="input-group full-width">
    <InputField value={payload.mobile} setValue={(value) => setPayload((prev) => ({ ...prev, mobile: value }))} nameKey="mobile" placeholder="Số điện thoại" />
  </div>
</div>

          )}

          <InputField value={payload.email} setValue={(value) => setPayload((prev) => ({ ...prev, email: value }))} nameKey="email" />
          <InputField value={payload.password} setValue={(value) => setPayload((prev) => ({ ...prev, password: value }))} nameKey="password" type="password" />

          <div className="auth-button-container">
            <Button name={isRegister ? "Đăng ký" : "Đăng nhập"} handleOnClick={isRegister ? handleRegister : handleLogin} />
          </div>

          <div className="auth-footer">
            {!isRegister && <span className="auth-link" onClick={() => setIsForgotPassword(true)}>Quên mật khẩu?</span>}
            <span className="auth-link" onClick={() => { setIsRegister(!isRegister); resetPayload(); }}>
              {isRegister ? "Quay lại đăng nhập?" : "Tạo tài khoản?"}
            </span>
            <Link to={`/${path.HOME}`}>Go Home?</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;


