// src/components/Header/Header.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../store/user/userSlice";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, current } = useSelector((state) => state.user);
  const { totalQuantity } = useSelector((state) => state.cart);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [lastname, setLastname] = useState("");

  useEffect(() => {
    if (current) {
      setLastname(current.lastname || "");
    }
  }, [current]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);

  return (
    <header className="header">
      <div className="top-bar">
        <div className="logo">
          SHOP <span>PHONE</span>
        </div>

        <p className="contact-info1">
          📲 Liên hệ: <a href="mailto:shopphone@gmail.com">shopphone@gmail.com</a>
        </p>

        <div className="top-links">
          {isLoggedIn && current ? (
            <>
              <span className="welcome-msg">
                👋 Xin chào, <strong>{lastname}</strong>
              </span>

              <div className="profile-menu">
                <button className="profile-btn" onClick={toggleProfileMenu}>
                  <i className="fas fa-user-circle"></i> {current.firstname}
                </button>

                {isProfileOpen && (
                  <div className="profile-dropdown">
                    <p className="profile-email">{current.email}</p>
                    <Link to="/profile" className="profile-link">
                      👤 Hồ sơ
                    </Link>
                    <button className="logout-btn" onClick={handleLogout}>
                      🚪 Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login">
              <i className="fas fa-sign-in-alt"></i> Đăng nhập hoặc Tạo tài khoản
            </Link>
          )}
        </div>

        <div className="cart">
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i> Giỏ hàng
            <span className="cart-count">{totalQuantity}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
