import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard1.css";  // Đảm bảo sử dụng một file CSS khác để tránh xung đột
import { renderStarFromNumber } from "../ultils/helper";
import path from "../ultils/path"; // Đảm bảo import đúng
// Hàm định dạng giá tiền
const formatPrice = (price) => price.toLocaleString("vi-VN");

const ProductCard1 = ({  pid, image, title, totalRating, price, category }) => {
     const navigate = useNavigate();
     const handleClick = () => {
        // Điều hướng sử dụng path từ file path.js
        navigate(`/${category}/${pid}/${title}`);
      };
  return (
    <div className="product-card1"onClick={handleClick}>
      {/* Phần bên trái chứa hình ảnh */}
      <div className="product-image-container1">
        <img src={image} alt="product" className="product-image-card1" />
      </div>

      {/* Phần bên phải chứa thông tin sản phẩm */}
      <div className="product-info-card1">
        <span className="product-title-card1">{title}</span>
        <span className="product-rating-card1">{renderStarFromNumber(totalRating)}</span>
        <span className="product-price-card1">{formatPrice(price)} VNĐ</span>
      </div>
    </div>
  );
};

export default ProductCard1;
