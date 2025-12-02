// src/components/Toast.js
import React, { useEffect } from "react";
import "./Toast.css";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Tự đóng sau 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-container">
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;
